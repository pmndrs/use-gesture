import { stateKeys, initialState, genericEndState } from './default'
import { noop } from './utils'

export default class Handler {
  props = null
  config = null
  state = initialState
  timeouts = {}
  domListeners = []
  dragListeners = []

  constructor(props, config) {
    this.props = props
    this.config = config
  }

  clean = () => {
    clearTimeouts(this.timeouts)
    const { domTarget } = this.config
    const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
    removeListeners(realDomTarget, this.domListeners, this.config.event)
    removeListeners(this.config.window, this.dragListeners, this.config.event)
  }

  updateState = newState => {
    const updatedState = Object.entries(newState).reduce((acc, [k, v]) => ({ ...acc, [k]: { ...this.state[k], ...v } }), {})
    this.state = { ...this.state, ...updatedState }
  }

  isGestureEnabled = gesture => {
    return this.config.enabled && this.config[gesture]
  }

  getStartState = (stateKey, { values, args, event }) => {
    const transform = this.state[stateKey].transform || event.transform || this.config.transform
    const lastLocal = this.state[stateKey].local || initialState[stateKey].local

    return {
      ...initialState[stateKey],
      event,
      values,
      initial: values,
      previous: values,
      local: lastLocal,
      lastLocal,
      transform,
      time: event.timeStamp,
      args
    }
  }

  getStateKinematics = (stateKey, { values: eventValues, event }, isDelta = false) => {
    const { values: xy, initial, lastLocal, time } = this.state[stateKey]
    const transform = this.state[stateKey].transform || event.transform || this.config.transform

    const delta_t = event.timeStamp - time

    const values = isDelta ? addV(eventValues, xy) : eventValues

    const { velocities, delta, velocity, distance, direction } = calculateKinematics(values, xy, initial, transform, delta_t)

    return {
      values,
      delta,
      velocity,
      velocities,
      distance,
      direction,
      local: addV(lastLocal, delta),
      previous: xy,
      transform,
      time: event.timeStamp
    }
  }

  handleGesture = action => {
    const stateKey = stateKeys[action]
    const actionState = { ...this.state.shared, ...this.state[stateKey] }
    if (this.props[action]) {
      this.state[stateKey].temp = this.props[action](actionState) || this.state[stateKey].temp
    }
  }

  handleGestureStart = action => {
    const stateKey = stateKeys[action]
    const actionState = { ...this.state.shared, ...this.state[stateKey] }
    const actionStart = `${action}Start`
    this.props[actionStart] && this.props[actionStart](actionState)
    if (this.props[action]) {
      this.state[stateKey].temp = this.props[action](actionState) || this.state[stateKey].temp
    }
  }

  handleGestureEnd = (action, callDefaultAction = true) => {
    const stateKey = stateKeys[action]
    const actionState = { ...this.state.shared, ...this.state[stateKey] }
    if (callDefaultAction && this.props[action]) {
      this.state[stateKey].temp = this.props[action](actionState) || this.state[stateKey].temp
    }
    const actionEnd = `${action}End`
    this.props[actionEnd] && this.props[actionEnd](actionState)
  }

  onDragStart = (args, event) => {
    if (!this.isGestureEnabled('drag')) return

    const { values, ...rest } = getPointerEventData(event)
    // making sure we're not dragging the element when more than one finger press the screen
    if (rest.touches > 1) return

    const { currentTarget, pointerId } = event
    if (this.config.event.pointerEvents) {
      currentTarget.setPointerCapture(pointerId)
    } else {
      this.dragListeners = []
      this.dragListeners.push(['mousemove', this.onDragMove])
      this.dragListeners.push(['mouseup', this.onDragEnd])
      this.dragListeners.push(['touchmove', this.onDragMove])
      this.dragListeners.push(['touchend', this.onDragEnd])
      this.dragListeners.push(['touchcancel', this.onDragEnd])
      addListeners(this.config.window, this.dragListeners, this.config.event)
    }

    const startState = this.getStartState('drag', { args, event, values })

    this.updateState({
      shared: { ...rest, dragging: true, down: true },
      drag: { ...startState, currentTarget, pointerId, cancel: () => this.cancelDrag(event) }
    })

    this.handleGestureStart('onDrag')
  }

  onDragMove = event => {
    if (this.state.drag.canceled || !this.state.shared.dragging) return

    const { values, ...rest } = getPointerEventData(event)
    const kinematics = this.getStateKinematics('drag', { values, event })
    const cancel = () => this.cancelDrag(event)

    this.updateState({ shared: { moving: true, ...rest }, drag: { ...kinematics, first: false, event, cancel } })
    this.handleGesture('onDrag')
  }

  onDragEnd = event => {
    if (!this.state.shared.dragging) return

    const { currentTarget, pointerId } = this.state.drag
    if (this.config.event.pointerEvents) {
      currentTarget.releasePointerCapture(pointerId)
    } else {
      removeListeners(this.config.window, this.dragListeners, this.config.event)
    }
    this.updateState({ shared: { dragging: false, down: false, touches: 0 }, drag: { ...genericEndState, event } })

    this.handleGestureEnd('onDrag')
  }

  cancelDrag = event => {
    this.updateState({ drag: { canceled: true, cancel: noop } })
    requestAnimationFrame(() => this.onDragEnd(event))
  }

  onPinchStart = (args, event) => {
    if (!this.isGestureEnabled('pinch') || event.touches.length !== 2) return

    const dx = event.touches[1].clientX - event.touches[0].clientX
    const dy = event.touches[1].clientY - event.touches[0].clientY

    const da = [Math.hypot(dx, dy), (Math.atan2(dx, dy) * 180) / Math.PI]

    const startState = this.getStartState('pinch', { args, event, values: da })

    this.updateState({
      shared: { pinching: true, down: true, touches: 2 },
      pinch: { ...startState, cancel: () => this.cancelPinch(event) }
    })

    this.handleGestureStart('onPinch')
  }

  onPinchMove = event => {
    if (this.state.pinch.canceled || event.touches.length !== 2) return
    const { values: da, turns, initial, lastLocal, time } = this.state.pinch

    const dx = event.touches[1].clientX - event.touches[0].clientX
    const dy = event.touches[1].clientY - event.touches[0].clientY
    const d = Math.hypot(dx, dy)
    const a = (Math.atan2(dx, dy) * 180) / Math.PI

    const d_dist = d - da[0]
    const a_dist = a - da[1]

    const newTurns = Math.abs(a_dist) > 300 ? turns + Math.sign(a_dist) : turns

    const delta_t = event.timeStamp - time
    const delta_d = Math.hypot(dx, dy) - initial[0]
    const delta_a = initial[1] - a + 360 * newTurns

    const cancel = () => this.cancelPinch(event)

    this.updateState({
      pinch: {
        values: [d, a],
        delta: [delta_d, delta_a],
        velocities: [delta_t ? d_dist / delta_t : 0, delta_t ? a_dist / delta_t : 0],
        turns: newTurns,
        previous: da,
        local: addV(lastLocal, [delta_d, delta_a]),
        first: false,
        event,
        time: event.timeStamp,
        cancel
      }
    })
    this.handleGesture('onPinch')
  }

  cancelPinch = event => {
    this.updateState({ pinch: { canceled: true, cancel: noop } })
    requestAnimationFrame(() => this.onPinchEnd(event))
  }

  onPinchEnd = event => {
    if (!this.state.shared.pinching) return
    this.updateState({ shared: { pinching: false, down: false, touches: 0 }, pinch: { ...genericEndState, event } })
    this.handleGestureEnd('onPinch')
  }

  onMove = (args, event) => {
    if (!this.isGestureEnabled('move')) return

    clearTimeout(this.timeouts.move)
    this.timeouts.move = setTimeout(this.onMoveEnd, 100)

    const { values, ...rest } = getPointerEventData(event)

    if (!this.state.shared.moving) {
      const startState = this.getStartState('move', { args, event, values })
      this.updateState({ shared: { moving: true, ...rest }, move: startState })
      this.handleGestureStart('onMove')
    } else {
      const kinematics = this.getStateKinematics('move', { values, event })
      this.updateState({ shared: rest, move: { ...kinematics, first: false, event } })
      this.handleGesture('onMove')
    }
  }

  onMoveEnd = () => {
    if (!this.state.shared.moving) return

    this.updateState({ shared: { moving: false }, move: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.handleGestureEnd('onMove')
  }

  onScroll = (args, event) => {
    if (!this.isGestureEnabled('scroll')) return

    clearTimeout(this.timeouts.scroll)
    this.timeouts.scroll = setTimeout(this.onScrollEnd, 100)
    const { values, ...rest } = getScrollEventData(event)

    if (!this.state.shared.scrolling) {
      const startState = this.getStartState('scroll', { args, event, values })
      this.updateState({ shared: { scrolling: true }, scroll: startState })
      this.handleGestureStart('onScroll')
    } else {
      const kinematics = this.getStateKinematics('scroll', { values, event })
      this.updateState({ shared: rest, scroll: { ...kinematics, first: false, event } })
      this.handleGesture('onScroll')
    }
  }

  onScrollEnd = () => {
    if (!this.state.shared.scrolling) return

    this.updateState({ shared: { scrolling: false }, scroll: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.handleGestureEnd('onScroll')
  }

  onWheel = (args, event) => {
    if (!this.isGestureEnabled('wheel')) return

    clearTimeout(this.timeouts.wheel)
    this.timeouts.wheel = setTimeout(this.onWheelEnd, 100)
    const { values, ...rest } = getWheelEventData(event)

    if (!this.state.shared.wheeling) {
      const startState = this.getStartState('wheel', { args, event, values })
      this.updateState({ shared: { wheeling: true, ...rest }, wheel: startState })
      this.handleGestureStart('onWheel')
    } else {
      const kinematics = this.getStateKinematics('wheel', { values, event }, true)
      this.updateState({ shared: rest, wheel: { ...kinematics, first: false, event } })
      this.handleGesture('onWheel')
    }
  }

  onWheelEnd = () => {
    if (!this.state.shared.wheeling) return

    this.updateState({ shared: { wheeling: false }, wheel: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.handleGestureEnd('onWheel')
  }

  onPointerEnter = (args, event) => {
    if (!this.isGestureEnabled('hover')) return

    const { values, down, touches, shiftKey } = getPointerEventData(event)
    this.updateState({
      shared: { hovering: true, down, touches, shiftKey },
      move: { values, active: true, event, args }
    })
    this.handleGesture('onHover')
  }

  onPointerLeave = (args, event) => {
    if (!this.isGestureEnabled('hover')) return

    const { values, down, touches, shiftKey } = getPointerEventData(event)
    const kinematics = this.getStateKinematics('move', { values, event })
    this.updateState({
      shared: { hovering: false, moving: false, down, touches, shiftKey },
      move: { ...kinematics, ...genericEndState, event, args }
    })
    this.handleGestureEnd('onMove')
    this.handleGesture('onHover')
  }

  bind = (...args) => {
    const {
      domTarget,
      event: { capture, pointerEvents }
    } = this.config

    // if props contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
    // actions will skip on[Gesture]["Start"|"End"] functions and include
    // ['onDrag', 'onMove']
    const actions = new Set(
      Object.keys(this.props)
        .filter(k => k.indexOf('on') === 0)
        .map(k => k.match(/(on[A-Z][a-z]+)/)[1])
    )

    const onMove = this.onMove.bind(this, args)
    const onDragStart = this.onDragStart.bind(this, args)
    const onWheel = this.onWheel.bind(this, args)
    const onPinchStart = this.onPinchStart.bind(this, args)
    const onScroll = this.onScroll.bind(this, args)
    const onPointerEnter = this.onPointerEnter.bind(this, args)
    const onPointerLeave = this.onPointerLeave.bind(this, args)

    const output = {}
    const captureString = capture ? 'Capture' : ''
    const listeners = {}

    if (actions.has('onMove')) {
      pushInKeys(listeners, pointerEvents ? 'onPointerMove' : 'onMouseMove', onMove)
    }

    if (actions.has('onDrag')) {
      if (pointerEvents) {
        pushInKeys(listeners, 'onPointerDown', onDragStart)
        pushInKeys(listeners, 'onPointerMove', this.onDragMove)
        pushInKeys(listeners, ['onPointerUp', 'onPointerCancel'], this.onDragEnd)
      } else {
        pushInKeys(listeners, ['onMouseDown', 'onTouchStart'], onDragStart)
      }
    }

    if (actions.has('onPinch')) {
      pushInKeys(listeners, 'onTouchStart', onPinchStart)
      pushInKeys(listeners, 'onTouchMove', this.onPinchMove)
      pushInKeys(listeners, ['onTouchEnd', 'onTouchCancel'], this.onPinchEnd)
    }

    if (actions.has('onHover')) {
      pushInKeys(listeners, pointerEvents ? 'onPointerEnter' : 'onMouseEnter', onPointerEnter)
      pushInKeys(listeners, pointerEvents ? 'onPointerLeave' : 'onMouseLeave', onPointerLeave)
    }

    if (actions.has('onScroll')) {
      pushInKeys(listeners, 'onScroll', onScroll)
    }

    if (actions.has('onWheel')) {
      pushInKeys(listeners, 'onWheel', onWheel)
    }

    if (domTarget) {
      this.domListeners = []
      const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
      Object.entries(listeners).forEach(([k, fns]) => this.domListeners.push([k.substr(2).toLowerCase(), chain(...fns)]))
      addListeners(realDomTarget, this.domListeners, this.config.event)
      return this.clean
    }

    Object.entries(listeners).forEach(([k, fns]) => (output[k + captureString] = chain(...fns)))
    return output
  }
}

/*** UTILS ***/

// vector add
const addV = (v1, v2) => v1.map((v, i) => v + v2[i])

// vector substract
const subV = (v1, v2) => v1.map((v, i) => v - v2[i])

// returns a function that chains all functions given as parameters
const chain = (...fns) => (...args) => fns.forEach(fn => fn(...args))

// utility function that pushes values in object keys which are in fact arrays
const pushInKeys = (obj, keys, value) => {
  if (!Array.isArray(keys)) keys = [keys]
  keys.forEach(key => (obj[key] = obj[key] ? [...obj[key], value] : [value]))
}

// clears timeouts in keys
const clearTimeouts = timeoutsObj => Object.values(timeoutsObj).forEach(clearTimeout)

const setListeners = add => (el, listeners, options) => {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

const addListeners = setListeners(true)
const removeListeners = setListeners(false)

function getScrollEventData(event) {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], shiftKey, altKey, metaKey, ctrlKey }
}

function getWheelEventData({ deltaX, deltaY, shiftKey, altKey, metaKey, ctrlKey }) {
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { values: [deltaX, deltaY], shiftKey, altKey, metaKey, ctrlKey }
}

function getPointerEventData(event) {
  const { touches, changedTouches, shiftKey, altKey, metaKey, ctrlKey } = event
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX, clientY, buttons } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons % 2 === 1 // makes sure main button is pressed
  return { values: [clientX, clientY], touches: (touchEvents && touchEvents.length) || 0, down, shiftKey, altKey, metaKey, ctrlKey }
}

const calculateKinematics = (values, previousValues, initialValues, transform, delta_t) => {
  const delta = subV(values, initialValues).map((v, i) => transform[i](v))
  const diff = subV(values, previousValues).map((v, i) => transform[i](v))
  const len = Math.hypot(...diff)

  return {
    delta,
    velocities: delta_t ? diff.map(v => v / delta_t) : Array(values.length).fill(0),
    velocity: delta_t ? len / delta_t : 0,
    distance: Math.hypot(...delta),
    direction: diff.map(v => v / (len || 1))
  }
}
