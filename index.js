import React from 'react'

const noop = () => {}

// Pointer Events attempt on commit below
// https://github.com/react-spring/react-use-gesture/commit/37cc4192a5ff53f54c93595ebf80385ef7cd7340

const touchMove = 'touchmove'
const touchEnd = 'touchend'
const touchCancel = 'touchcancel'
const mouseMove = 'mousemove'
const mouseUp = 'mouseup'

const stateKeys = { onDrag: 'drag', onHover: 'move', onMove: 'move', onPinch: 'pinch', onScroll: 'scroll', onWheel: 'wheel' }

const defaultConfig = {
  domTarget: undefined,
  event: { passive: true, capture: false },
  window: typeof window !== 'undefined' ? window : undefined,
  transform: { x: x => x, y: y => y }
}

const initialCommon = {
  event: undefined,
  xy: [0, 0],
  delta: [0, 0],
  velocity: 0,
  vxvy: [0, 0],
  distance: 0,
  direction: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  transform: undefined,
  local: [0, 0],
  lastLocal: [0, 0],
  first: true,
  last: false,
  active: true,
  time: undefined,
  temp: undefined,
  cancel: noop,
  canceled: false
}

const initialState = {
  shared: {
    args: undefined,
    hovering: undefined,
    scrolling: undefined,
    dragging: undefined,
    moving: undefined,
    pinching: undefined,
    touches: undefined,
    down: undefined,
    shiftKey: undefined,
    altKey: undefined,
    metaKey: undefined,
    ctrlKey: undefined
  },
  move: { ...initialCommon },
  drag: { ...initialCommon },
  pinch: { ...initialCommon },
  scroll: { ...initialCommon },
  wheel: { ...initialCommon }
}

const genericEndState = { last: true, active: false }

export default function useGesture(_props) {
  if (typeof _props === 'function') _props = { onDrag: _props }
  if (_props.onAction) {
    _props.onDrag = _props.onAction
    delete _props.onAction
  }
  _props = { ..._props, config: { ...defaultConfig, ..._props.config } }

  const props = React.useRef(_props)
  props.current = _props

  const state = React.useRef(initialState)
  const oldArgs = React.useRef(null)
  const oldResult = React.useRef(null)
  const timeouts = React.useRef({})
  const domListeners = React.useRef([])
  const dragListeners = React.useRef([])

  const clean = React.useCallback(() => {
    clearTimeouts(timeouts.current)
    removeListeners(props.current.config.domTarget, domListeners.current, props.current.config.event)
    removeListeners(props.current.config.window, dragListeners.current, props.current.config.event)
  }, [])

  React.useEffect(() => clean, [clean])

  const [bind] = React.useState(() => (...args) => {
    const unchanged =
      Array.isArray(oldArgs.current) && oldArgs.current.length === args.length && args.every((arg, index) => arg === oldArgs.current[index])
    oldArgs.current = args
    if (!unchanged) {
      clean()
      oldResult.current = handlers(args)
    }
    return oldResult.current
  })

  return bind

  /*** HANDLERS ***/

  function handlers(args) {
    const actions = new Set(
      Object.keys(props.current)
        .filter(k => k.indexOf('on') === 0)
        .map(k => k.match(/(on[A-Z][a-z]+)/)[1])
    )

    const updateState = newState => {
      const updatedState = Object.entries(newState).reduce((acc, [k, v]) => ({ ...acc, [k]: { ...state.current[k], ...v } }), {})
      state.current = { ...state.current, ...updatedState }
    }

    const getGenericStartState = (event, stateKey, xy) => {
      const transform = state.current[stateKey].transform || event.transform || props.current.config.transform
      const lastLocal = state.current[stateKey].local || initialState[stateKey].local
      return {
        ...initialState[stateKey],
        xy,
        initial: xy,
        previous: xy,
        local: lastLocal,
        lastLocal,
        transform,
        time: event.timeStamp
      }
    }

    const getKinematics = (mov_x, mov_y, event, stateKey, isDelta = false) => {
      const lastLocal = state.current[stateKey].lastLocal || initialState[stateKey].lastLocal
      const { xy, initial, delta, time, transform } = state.current[stateKey]
      const t = transform || event.transform || props.current.config.transform

      const delta_t = event.timeStamp - time

      const x = isDelta ? mov_x + xy[0] : mov_x
      const y = isDelta ? mov_y + xy[1] : mov_y
      const delta_x = t.x(isDelta ? mov_x + delta[0] : x - initial[0])
      const delta_y = t.y(isDelta ? mov_y + delta[1] : y - initial[1])

      const x_dist = t.x(x - xy[0])
      const y_dist = t.y(y - xy[1])
      const len = Math.hypot(x_dist, y_dist)
      const scalar = 1 / (len || 1)

      const local_x = lastLocal[0] + delta_x
      const local_y = lastLocal[1] + delta_y

      return {
        xy: [x, y],
        delta: [delta_x, delta_y],
        velocity: len / delta_t,
        vxvy: [x_dist / delta_t, y_dist / delta_t],
        distance: Math.hypot(delta_x, delta_y),
        direction: [x_dist * scalar, y_dist * scalar],
        local: [local_x, local_y],
        previous: xy,
        transform,
        time: event.timeStamp
      }
    }

    const handleGesture = action => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      if (props.current[action]) {
        state.current[stateKey].temp = props.current[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureStart = action => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      const actionStart = `${action}Start`
      props.current[actionStart] && props.current[actionStart](actionState)
      if (props.current[action]) {
        state.current[stateKey].temp = props.current[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureEnd = (action, callDefaultAction = true) => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      if (callDefaultAction && props.current[action]) {
        state.current[stateKey].temp = props.current[action](actionState) || state.current[stateKey].temp
      }
      const actionEnd = `${action}End`
      props.current[actionEnd] && props.current[actionEnd](actionState)
    }

    const onDragStart = event => {
      if (!props.current.onDrag) return

      const { mov_x, mov_y, ...rest } = getPointerEventData(event)
      // making sure we're not dragging the element when more than one finger press the screen
      if (rest.touches > 1) return

      dragListeners.current.push([mouseMove, onDragMove])
      dragListeners.current.push([mouseUp, onDragEnd])
      dragListeners.current.push([touchMove, onDragMove])
      dragListeners.current.push([touchEnd, onDragEnd])
      dragListeners.current.push([touchCancel, onDragEnd])

      addListeners(props.current.config.window, dragListeners.current, props.current.config.event)

      const startState = getGenericStartState(event, 'drag', [mov_x, mov_y])

      updateState({
        shared: { args, ...rest, dragging: true, down: true },
        drag: { ...startState, event, cancel: () => cancelDrag(event) }
      })

      handleGestureStart('onDrag')
    }

    const onDragEnd = (event, canceled = false) => {
      if (!state.current.shared.dragging) return
      removeListeners(props.current.config.window, dragListeners.current, props.current.config.event)
      updateState({ shared: { dragging: false, down: false, touches: 0 }, drag: { ...genericEndState, event, cancel: noop, canceled } })

      handleGestureEnd('onDrag')
    }

    const onDragMove = event => {
      if (state.current.drag.canceled) return
      const { mov_x, mov_y, ...rest } = getPointerEventData(event)
      const kinematics = getKinematics(mov_x, mov_y, event, 'drag')
      const cancel = () => cancelDrag(event)

      updateState({ shared: { moving: true, ...rest }, drag: { ...kinematics, event, cancel } })
      handleGesture('onDrag')
    }

    const cancelDrag = event => requestAnimationFrame(() => onDragEnd(event, true))

    const onPinchStart = event => {
      if (!props.current.onPinch) return
      if (event.touches.length !== 2) return
      const mov_x = event.touches[1].clientX - event.touches[0].clientX
      const mov_y = event.touches[1].clientY - event.touches[0].clientY

      const startState = getGenericStartState(event, 'pinch', [mov_x, mov_y])

      updateState({
        shared: { args, pinching: true, down: true, touches: 2 },
        pinch: { ...startState, event, cancel: () => cancelPinch(event) }
      })

      handleGestureStart('onPinch')
    }

    const onPinchEnd = (event, canceled = false) => {
      if (!state.current.shared.pinching) return
      updateState({ shared: { pinching: false, down: false, touches: 0 }, pinch: { ...genericEndState, event, cancel: noop, canceled } })
      handleGestureEnd('onPinch')
    }

    const onPinchMove = event => {
      if (state.current.pinch.canceled || event.touches.length !== 2) return

      const mov_x = event.touches[1].clientX - event.touches[0].clientX
      const mov_y = event.touches[1].clientY - event.touches[0].clientY

      const kinematics = getKinematics(mov_x, mov_y, event, 'pinch')

      const { initial } = state.current.pinch
      kinematics.distance = Math.hypot(mov_x, mov_y) - Math.hypot(...initial)
      const cancel = () => cancelPinch(event)

      updateState({ pinch: { ...kinematics, event, cancel } })
      handleGesture('onPinch')
    }

    const cancelPinch = event => requestAnimationFrame(() => onPinchEnd(event, true))

    const onMoveEnd = () => {
      updateState({ shared: { moving: false }, move: { ...genericEndState, velocity: 0, vxvy: [0, 0] } })
      handleGestureEnd('onMove', false)
    }

    const onMove = event => {
      if (!props.current.onMove) return
      clearTimeout(timeouts.current.move)
      timeouts.current.move = setTimeout(onMoveEnd, 100)

      const { mov_x, mov_y, ...rest } = getPointerEventData(event)

      if (!state.current.shared.moving) {
        const startState = getGenericStartState(event, 'move', [mov_x, mov_y])
        updateState({ shared: { args, moving: true, ...rest }, move: { ...startState, event } })
        return handleGestureStart('onMove')
      }

      const kinematics = getKinematics(mov_x, mov_y, event, 'move')
      updateState({ shared: rest, move: { ...kinematics, event } })
      handleGesture('onMove')
    }

    const onScrollEnd = () => {
      updateState({ shared: { scrolling: false }, scroll: { ...genericEndState, velocity: 0, vxvy: [0, 0] } })
      handleGestureEnd('onScroll')
    }

    const onScroll = event => {
      if (!props.current.onScroll) return
      clearTimeout(timeouts.current.scroll)
      timeouts.current.scroll = setTimeout(onScrollEnd, 100)
      const { mov_x, mov_y } = getScrollEventData(event)

      if (!state.current.shared.scrolling) {
        const startState = getGenericStartState(event, 'scroll', [mov_x, mov_y])
        updateState({ shared: { args, scrolling: true }, scroll: { ...startState, event } })
        return handleGestureStart('onScroll')
      }

      const kinematics = getKinematics(mov_x, mov_y, event, 'scroll')
      updateState({ scroll: { ...kinematics, event } })
      handleGesture('onScroll')
    }

    const onWheelEnd = () => {
      updateState({
        shared: { wheeling: false },
        wheel: { ...genericEndState, velocity: 0, vxvy: [0, 0] }
      })
      handleGestureEnd('onWheel')
    }

    const onWheel = event => {
      if (!props.current.onWheel) return
      clearTimeout(timeouts.current.wheel)
      timeouts.current.wheel = setTimeout(onWheelEnd, 100)
      const { mov_x, mov_y } = getWheelEventData(event)

      if (!state.current.shared.wheeling) {
        const startState = getGenericStartState(event, 'wheel', [mov_x, mov_y])
        updateState({ shared: { args, wheeling: true }, wheel: { ...startState, event } })
        return handleGestureStart('onWheel')
      }

      const kinematics = getKinematics(mov_x, mov_y, event, 'wheel', true)
      updateState({ wheel: { ...kinematics, event } })
      handleGesture('onWheel')
    }

    const onEnter = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(event)
      updateState({
        shared: { args, hovering: true, down, touches, shiftKey },
        move: { xy: [mov_x, mov_y], event }
      })
      handleGesture('onHover')
    }

    const onLeave = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(event)
      const kinematics = getKinematics(mov_x, mov_y, event, 'move')
      updateState({ shared: { args, hovering: false, down, touches, shiftKey }, move: { ...kinematics, event } })
      handleGesture('onHover')
    }

    const output = {}
    const capture = props.current.config.event.capture ? 'Capture' : ''
    const { domTarget } = props.current.config
    const listeners = {}

    if (actions.has('onMove')) {
      pushEventProp(listeners, `onMouseMove`, onMove)
    }

    if (actions.has('onDrag')) {
      pushEventProp(listeners, `onMouseDown`, onDragStart)
      pushEventProp(listeners, `onTouchStart`, onDragStart)
    }

    if (actions.has('onPinch')) {
      pushEventProp(listeners, `onTouchStart`, onPinchStart)
      pushEventProp(listeners, `onTouchMove`, onPinchMove)
      pushEventProp(listeners, `onTouchEnd`, onPinchEnd)
      pushEventProp(listeners, `onTouchCancel`, onPinchEnd)
    }

    if (actions.has('onHover')) {
      pushEventProp(listeners, `onMouseEnter`, onEnter)
      pushEventProp(listeners, `onMouseLeave`, onLeave)
    }

    if (actions.has('onScroll')) {
      pushEventProp(listeners, `onScroll`, onScroll)
    }

    if (actions.has('onWheel')) {
      pushEventProp(listeners, `onWheel`, onWheel)
    }
    if (domTarget) {
      Object.entries(listeners).forEach(([k, fns]) => domListeners.current.push([k.substr(2).toLowerCase(), chain(...fns)]))
      addListeners(domTarget, domListeners.current, props.current.config.event)
      return clean
    }

    Object.entries(listeners).forEach(([k, fns]) => (output[k + capture] = chain(...fns)))
    return output
  }
}

/*** UTILS ***/

const chain = (...fns) => (...args) => fns.forEach(a => a(...args))
const pushEventProp = (l, key, fn) => void (l[key] = l[key] ? [...l[key], fn] : [fn])

const clearTimeouts = timeouts => Object.values(timeouts).forEach(clearTimeout)

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
  return { mov_x: scrollX || scrollLeft || 0, mov_y: scrollY || scrollTop || 0 }
}

function getWheelEventData(event) {
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { mov_x: event.deltaX, mov_y: event.deltaY }
}

function getPointerEventData(event) {
  const { touches, changedTouches, shiftKey, altKey, metaKey, ctrlKey } = event
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX: mov_x, clientY: mov_y, buttons } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons % 2 === 1 // makes sure main button is pressed
  return { mov_x, mov_y, touches: (touchEvents && touchEvents.length) || 0, down, shiftKey, altKey, metaKey, ctrlKey }
}
