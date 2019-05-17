import { stateKeys, initialState, genericEndState } from './default'
import {
  noop,
  addV,
  subV,
  removeListeners,
  addListeners,
  pushInKeys,
  chainFns,
  getVelocities,
  getAllKinematics,
  getPointerEventData,
  getScrollEventData,
  getWheelEventData,
  supportsGestureEvent
} from './utils'

const GESTURE_END = 'gestureEnd'
const GESTURE_START = 'gestureStart'

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

  // removes listeners and clears timeouts
  // used on component unmount
  clean = () => {
    Object.values(this.timeouts).forEach(clearTimeout)
    const { domTarget } = this.config
    const realDomTarget = domTarget && 'current' in domTarget ? domTarget.current : domTarget
    removeListeners(realDomTarget, this.domListeners, this.config.event)
    removeListeners(this.config.window, this.dragListeners, this.config.event)
  }

  // utility function to update state
  updateState = newState => {
    const updatedState = Object.entries(newState).reduce((acc, [k, v]) => ({ ...acc, [k]: { ...this.state[k], ...v } }), {})
    this.state = { ...this.state, ...updatedState }
  }

  // fire the gesture handler defined by the user
  fireGestureHandler = (action, flag) => {
    const stateKey = stateKeys[action]
    const actionState = { ...this.state.shared, ...this.state[stateKey] }

    actionState.xy = actionState.values // legacy state attribute for xy gestures
    actionState.vxvy = actionState.velocities // legacy state attribute for xy gestures
    actionState.da = actionState.values // legacy state attribute for pinch gestures
    actionState.vdva = actionState.velocities // legacy state attribute for pinch gestures

    if (flag === GESTURE_START) {
      const actionStart = `${action}Start`
      this.props[actionStart] && this.props[actionStart](actionState)
    }
    if (this.props[action]) {
      this.state[stateKey].temp = this.props[action](actionState) || this.state[stateKey].temp
    }
    if (flag === GESTURE_END) {
      const actionEnd = `${action}End`
      this.props[actionEnd] && this.props[actionEnd](actionState)
    }
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

  getXYKinematics = (stateKey, { values, event }) => {
    const { values: xy, initial, lastLocal, time } = this.state[stateKey]
    const transform = this.state[stateKey].transform || event.transform || this.config.transform

    const delta = subV(values, initial).map((v, i) => Object.values(transform)[i](v))
    const diff = subV(values, xy).map((v, i) => Object.values(transform)[i](v))

    const delta_t = event.timeStamp - time
    const { velocity, velocities, distance, direction } = getAllKinematics(delta, diff, delta_t)

    return {
      event,
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

  getDAKinematics = (stateKey, { values: [d, a], event }) => {
    const { values: da, turns, initial, lastLocal, time } = this.state[stateKey]

    a = a === undefined ? da[1] : a // when angle is not defined by onCtrlWheel

    const diff_d = d - da[0]
    let diff_a = a - da[1]

    const newTurns = Math.abs(diff_a) > 300 ? turns + Math.sign(diff_a) : turns

    diff_a -= 360 * newTurns
    const delta_d = d - initial[0]
    const delta_a = a - 360 * newTurns - initial[1]

    const delta = [delta_d, delta_a]

    const delta_t = event.timeStamp - time
    const velocities = getVelocities([diff_d, diff_a], delta_t)

    return {
      event,
      values: [d, a],
      delta,
      velocities,
      turns: newTurns,
      local: addV(lastLocal, delta),
      previous: da,
      time: event.timeStamp
    }
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
      this.dragListeners = [
        ['mousemove', this.onDragMove],
        ['mouseup', this.onDragEnd],
        ['touchmove', this.onDragMove],
        ['touchend', this.onDragEnd],
        ['touchcancel', this.onDragEnd]
      ]
      addListeners(this.config.window, this.dragListeners, this.config.event)
    }

    const startState = this.getStartState('drag', { args, event, values })

    this.updateState({
      shared: { ...rest, dragging: true, down: true },
      drag: { ...startState, currentTarget, pointerId, cancel: () => this.cancelDrag(event) }
    })

    this.fireGestureHandler('onDrag', GESTURE_START)
  }

  onDragMove = event => {
    if (this.state.drag.canceled || !this.state.shared.dragging) return

    const { values, ...rest } = getPointerEventData(event)

    if (rest.buttons === 0 && rest.touches === 0) {
      this.onDragEnd(event)
      return
    }

    const xyKinematics = this.getXYKinematics('drag', { values, event })
    const cancel = () => this.cancelDrag(event)

    this.updateState({ shared: { moving: true, ...rest }, drag: { ...xyKinematics, first: false, cancel } })
    this.fireGestureHandler('onDrag')
  }

  onDragEnd = event => {
    if (!this.state.shared.dragging) return

    const { currentTarget, pointerId } = this.state.drag
    if (this.config.event.pointerEvents) currentTarget.releasePointerCapture(pointerId)
    else removeListeners(this.config.window, this.dragListeners, this.config.event)

    let eventAttributes
    if (event instanceof Event) {
      const { values, ...rest } = getPointerEventData(event)
      eventAttributes = rest
    } else {
      eventAttributes = { down: false, buttons: 0, touches: 0 }
    }

    this.updateState({ shared: { dragging: false, ...eventAttributes }, drag: { ...genericEndState, event } })
    this.fireGestureHandler('onDrag', GESTURE_END)
  }

  cancelDrag = event => {
    this.updateState({ drag: { canceled: true, cancel: noop } })
    requestAnimationFrame(() => this.onDragEnd(event))
  }

  onPinchStart = (args, event) => {
    if (!this.isGestureEnabled('pinch') || event.touches.length !== 2) return

    const { shiftKey, altKey, metaKey, ctrlKey } = event

    const dx = event.touches[1].clientX - event.touches[0].clientX
    const dy = event.touches[1].clientY - event.touches[0].clientY

    const da = [Math.hypot(dx, dy), (Math.atan2(dx, dy) * 180) / Math.PI]
    const origin = [(event.touches[1].clientX + event.touches[0].clientX) / 2, (event.touches[1].clientY + event.touches[0].clientY) / 2]

    const startState = this.getStartState('pinch', { args, event, values: da })

    this.updateState({
      shared: { pinching: true, down: true, touches: 2, shiftKey, altKey, metaKey, ctrlKey },
      pinch: { ...startState, origin, cancel: () => this.cancelPinch(event) }
    })
    this.fireGestureHandler('onPinch', GESTURE_START)
  }

  onPinchMove = event => {
    if (this.state.pinch.canceled || event.touches.length !== 2) return
    const { shiftKey, altKey, metaKey, ctrlKey } = event

    const dx = event.touches[1].clientX - event.touches[0].clientX
    const dy = event.touches[1].clientY - event.touches[0].clientY
    const d = Math.hypot(dx, dy)
    const a = -(Math.atan2(dx, dy) * 180) / Math.PI

    const daKinematics = this.getDAKinematics('pinch', { values: [d, a], event })
    const origin = [(event.touches[1].clientX + event.touches[0].clientX) / 2, (event.touches[1].clientY + event.touches[0].clientY) / 2]

    const cancel = () => this.cancelPinch(event)

    this.updateState({
      shared: { shiftKey, altKey, metaKey, ctrlKey },
      pinch: { ...daKinematics, origin, first: false, cancel }
    })
    this.fireGestureHandler('onPinch')
  }

  cancelPinch = event => {
    this.updateState({ pinch: { canceled: true, cancel: noop } })
    requestAnimationFrame(() => this.onPinchEnd(event))
  }

  onPinchEnd = event => {
    if (!this.state.shared.pinching) return

    let eventAttributes
    if (event instanceof Event) {
      const { values, ...rest } = getPointerEventData(event)
      eventAttributes = rest
    } else {
      eventAttributes = { down: false, touches: 0 }
    }

    this.updateState({ shared: { pinching: false, ...eventAttributes }, pinch: { ...genericEndState, event } })
    this.fireGestureHandler('onPinch', GESTURE_END)
  }

  onCtrlWheel = (args, event) => {
    if (!this.isGestureEnabled('pinch') || !event.ctrlKey) return
    event.preventDefault()

    clearTimeout(this.timeouts.pinch)
    this.timeouts.pinch = setTimeout(this.onPinchEnd, 100)

    const { values, ...rest } = getWheelEventData(event)

    if (!this.state.shared.pinching) {
      const startState = this.getStartState('pinch', { args, event, values: [0, 0] })
      this.updateState({ shared: { pinching: true, ...rest }, pinch: startState })
      return this.fireGestureHandler('onPinch', GESTURE_START)
    }

    const d = this.state.pinch.values[0] - values[1]
    const daKinematics = this.getDAKinematics('pinch', { values: [d], event }, true)

    this.updateState({
      shared: rest,
      pinch: { ...daKinematics, first: false }
    })
    this.fireGestureHandler('onPinch')
  }

  onWebKitGestureStart = (args, event) => {
    if (!this.isGestureEnabled('pinch')) return
    event.preventDefault()

    const da = [event.scale * 100, event.rotation]
    const startState = this.getStartState('pinch', { args, event, values: da })

    this.updateState({
      shared: { pinching: true, down: true, touches: 2 },
      pinch: { ...startState, cancel: () => this.cancelPinch(event) }
    })

    this.fireGestureHandler('onPinch', GESTURE_START)
  }

  onWebKitGestureChange = event => {
    if (this.state.pinch.canceled) return
    event.preventDefault()

    const d = event.scale * 100
    const a = event.rotation

    const daKinematics = this.getDAKinematics('pinch', { values: [d, a], event })
    const cancel = () => this.cancelPinch(event)

    this.updateState({ pinch: { ...daKinematics, first: false, cancel } })
    this.fireGestureHandler('onPinch')
  }

  onWebKitGestureEnd = event => {
    if (!this.state.shared.pinching) return
    event.preventDefault()

    this.updateState({ shared: { pinching: false, down: false, touches: 0 }, pinch: { ...genericEndState, event, cancel: noop } })
    this.fireGestureHandler('onPinch', GESTURE_END)
  }

  onMove = (args, event) => {
    if (!this.isGestureEnabled('move')) return

    clearTimeout(this.timeouts.move)
    this.timeouts.move = setTimeout(this.onMoveEnd, 100)

    const { values, ...rest } = getPointerEventData(event)

    if (!this.state.shared.moving) {
      const startState = this.getStartState('move', { args, event, values })
      this.updateState({ shared: { moving: true, ...rest }, move: startState })
      this.fireGestureHandler('onMove', GESTURE_START)
    } else {
      const xyKinematics = this.getXYKinematics('move', { values, event })
      this.updateState({ shared: rest, move: { ...xyKinematics, first: false } })
      this.fireGestureHandler('onMove')
    }
  }

  onMoveEnd = () => {
    if (!this.state.shared.moving) return

    this.updateState({ shared: { moving: false }, move: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.fireGestureHandler('onMove', GESTURE_END)
  }

  onScroll = (args, event) => {
    if (!this.isGestureEnabled('scroll')) return

    clearTimeout(this.timeouts.scroll)
    this.timeouts.scroll = setTimeout(this.onScrollEnd, 100)
    const { values, ...rest } = getScrollEventData(event)

    if (!this.state.shared.scrolling) {
      const startState = this.getStartState('scroll', { args, event, values })
      this.updateState({ shared: { scrolling: true }, scroll: startState })
      this.fireGestureHandler('onScroll', GESTURE_START)
    } else {
      const xyKinematics = this.getXYKinematics('scroll', { values, event })
      this.updateState({ shared: rest, scroll: { ...xyKinematics, first: false } })
      this.fireGestureHandler('onScroll')
    }
  }

  onScrollEnd = () => {
    if (!this.state.shared.scrolling) return

    this.updateState({ shared: { scrolling: false }, scroll: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.fireGestureHandler('onScroll', GESTURE_END)
  }

  onWheel = (args, event) => {
    if (!this.isGestureEnabled('wheel')) return

    clearTimeout(this.timeouts.wheel)
    this.timeouts.wheel = setTimeout(this.onWheelEnd, 100)
    const { values: eventValues, ...rest } = getWheelEventData(event)
    const values = addV(eventValues, this.state.wheel.values)

    if (!this.state.shared.wheeling) {
      const startState = this.getStartState('wheel', { args, event, values })
      this.updateState({ shared: { wheeling: true, ...rest }, wheel: startState })
      this.fireGestureHandler('onWheel', GESTURE_START)
    } else {
      const xyKinematics = this.getXYKinematics('wheel', { values, event })
      this.updateState({ shared: rest, wheel: { ...xyKinematics, first: false } })
      this.fireGestureHandler('onWheel')
    }
  }

  onWheelEnd = () => {
    if (!this.state.shared.wheeling) return

    this.updateState({ shared: { wheeling: false }, wheel: { ...genericEndState, velocity: 0, velocities: [0, 0] } })
    this.fireGestureHandler('onWheel', GESTURE_END)
  }

  onPointerEnter = (args, event) => {
    if (!this.isGestureEnabled('hover')) return

    const { values, down, touches, shiftKey } = getPointerEventData(event)
    this.updateState({
      shared: { hovering: true, down, touches, shiftKey },
      move: { values, active: true, event, args }
    })
    this.fireGestureHandler('onHover')
  }

  onPointerLeave = (args, event) => {
    if (!this.isGestureEnabled('hover')) return

    const { values, down, touches, shiftKey } = getPointerEventData(event)
    const xyKinematics = this.getXYKinematics('move', { values, event })
    this.updateState({
      shared: { hovering: false, moving: false, down, touches, shiftKey },
      move: { ...xyKinematics, ...genericEndState, event, args }
    })
    this.fireGestureHandler('onMove', GESTURE_END)
    this.fireGestureHandler('onHover')
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
    const onCtrlWheel = this.onCtrlWheel.bind(this, args)
    const onWebKitGestureStart = this.onWebKitGestureStart.bind(this, args)

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
      if (domTarget && supportsGestureEvent()) {
        // TODO also use touch events to calculate distance
        pushInKeys(listeners, 'onGestureStart', onWebKitGestureStart)
        pushInKeys(listeners, 'onGestureChange', this.onWebKitGestureChange)
        pushInKeys(listeners, 'onGestureEnd', this.onWebKitGestureEnd)
      } else {
        pushInKeys(listeners, 'onWheel', onCtrlWheel)
        pushInKeys(listeners, 'onTouchStart', onPinchStart)
        pushInKeys(listeners, 'onTouchMove', this.onPinchMove)
        pushInKeys(listeners, ['onTouchEnd', 'onTouchCancel'], this.onPinchEnd)
      }
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
      Object.entries(listeners).forEach(([k, fns]) => this.domListeners.push([k.substr(2).toLowerCase(), chainFns(...fns)]))
      addListeners(realDomTarget, this.domListeners, this.config.event)
      return this.clean
    }

    Object.entries(listeners).forEach(([k, fns]) => (output[k + captureString] = chainFns(...fns)))
    return output
  }
}
