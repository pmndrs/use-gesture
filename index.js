import React from 'react'

const noop = () => {}

// Pointer Events attempt on commit below
// https://github.com/react-spring/react-use-gesture/commit/37cc4192a5ff53f54c93595ebf80385ef7cd7340

const touchMove = 'touchmove'
const touchStart = 'touchstart'
const touchEnd = 'touchend'
const touchCancel = 'touchcancel'
const mouseMove = 'mousemove'
const mouseUp = 'mouseup'
const mouseDown = 'mousedown'
const mouseEnter = 'mouseenter'
const mouseLeave = 'mouseleave'
const scroll = 'scroll'
const wheel = 'wheel'

const stateKeys = { onDrag: 'drag', onHover: 'move', onMove: 'move', onScroll: 'scroll', onWheel: 'wheel' }

const defaultConfig = {
  domTarget: undefined,
  event: { passive: true, capture: false },
  window: typeof window !== 'undefined' ? window : undefined,
  transform: { x: x => x, y: y => y }
}

const initialCommon = {
  event: undefined,
  target: undefined,
  currentTarget: undefined,
  type: undefined,
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
  cancel: noop
}

const initialState = {
  shared: {
    args: undefined,
    hovering: undefined,
    scrolling: undefined,
    dragging: undefined,
    moving: undefined,
    touches: undefined,
    down: undefined,
    shiftKey: undefined
  },
  move: { ...initialCommon },
  drag: { ...initialCommon },
  scroll: { ...initialCommon },
  wheel: { ...initialCommon }
}

const genericEndState = { last: true, active: false }

export default function useGesture(props) {
  if (typeof props === 'function') props = { onDrag: props }
  if (props.onAction) {
    props.onDrag = props.onAction
    delete props.onAction
  }
  props = { ...props, config: { ...defaultConfig, ...props.config } }

  const state = React.useRef(initialState)
  const oldArgs = React.useRef(null)
  const oldResult = React.useRef(null)
  const timeouts = React.useRef({})
  const domListeners = React.useRef([])
  const dragListeners = React.useRef([])
  const { domTarget } = props.config

  const clean = () => {
    clearTimeouts(timeouts.current)
    setListeners(domTarget, domListeners.current, props.config.event, false)
    setListeners(props.config.window, dragListeners.current, props.config.event, false)
  }

  React.useEffect(() => clean, [])

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
      Object.keys(props)
        .filter(k => k.indexOf('on') === 0)
        .map(k => k.match(/(on[A-Z][a-z]+)/)[1])
    )

    const updateState = newState => {
      const updatedState = Object.entries(newState).reduce((acc, [k, v]) => ({ ...acc, [k]: { ...state.current[k], ...v } }), {})
      state.current = { ...state.current, ...updatedState }
    }

    const getGenericStartState = (event, stateKey, xy) => {
      const transform = state.current[stateKey].transform || event.transform || props.config.transform
      const lastLocal = state.current[stateKey].lastLocal || initialState[stateKey].lastLocal
      return {
        ...initialState[stateKey],
        xy,
        initial: xy,
        previous: xy,
        lastLocal,
        local: lastLocal,
        transform,
        time: Date.now()
      }
    }

    const getKinematics = (mov_x, mov_y, eventTransform, stateKey, isDelta = false) => {
      const lastLocal = state.current[stateKey].lastLocal || initialState[stateKey].lastLocal
      const { xy, initial, delta, time, local, transform } = state.current[stateKey]
      const t = transform || eventTransform || props.config.transform

      const now = Date.now()
      const delta_t = now - time

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
        lastLocal: local,
        transform,
        time: now
      }
    }

    const handleGesture = action => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      if (props[action]) {
        state.current[stateKey].temp = props[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureStart = action => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      const actionStart = `${action}Start`
      props[actionStart] && props[actionStart](actionState)
      if (props[action]) {
        state.current[stateKey].temp = props[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureEnd = (action, callDefaultAction = true) => {
      const stateKey = stateKeys[action]
      const actionState = { ...state.current.shared, ...state.current[stateKey] }
      if (callDefaultAction && props[action]) {
        state.current[stateKey].temp = props[action](actionState) || state.current[stateKey].temp
      }
      const actionEnd = `${action}End`
      props[actionEnd] && props[actionEnd](actionState)
    }

    const onDragStart = event => {
      dragListeners.current.push([mouseMove, onDragMove])
      dragListeners.current.push([mouseUp, onDragEnd])
      dragListeners.current.push([touchMove, onDragMove])
      dragListeners.current.push([touchEnd, onDragEnd])
      dragListeners.current.push([touchCancel, onDragEnd])

      setListeners(props.config.window, dragListeners.current, props.config.event, true)

      const { mov_x, mov_y, touches, shiftKey } = getPointerEventData(event)
      const startState = getGenericStartState(event, 'drag', [mov_x, mov_y])

      updateState({
        shared: { args, dragging: true, down: true, touches, shiftKey },
        drag: { ...startState, ...getEventGenericData(event), cancel: () => cancelDrag(event) }
      })

      handleGestureStart('onDrag')
    }

    const onDragEnd = event => {
      setListeners(props.config.window, dragListeners.current, props.config.event, false)
      updateState({
        shared: { dragging: false, down: false, touches: 0 },
        drag: { ...genericEndState, ...getEventGenericData(event), cancel: noop }
      })

      handleGestureEnd('onDrag')
    }

    const onDragMove = event => {
      const { mov_x, mov_y, touches, shiftKey } = getPointerEventData(event)
      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'drag')
      const cancel = () => cancelDrag(event)

      updateState({ shared: { moving: true, touches, shiftKey }, drag: { ...kinematics, ...getEventGenericData(event), cancel } })
      handleGesture('onDrag')
    }

    const cancelDrag = event => requestAnimationFrame(onDragEnd(event))

    const onMoveEnd = () => {
      updateState({ shared: { moving: false }, move: { ...genericEndState, velocity: 0, vxvy: [0, 0] } })
      handleGestureEnd('onMove')
    }

    const onMove = event => {
      clearTimeout(timeouts.current.move)
      timeouts.current.move = setTimeout(onMoveEnd, 100)

      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(event)

      if (!state.current.shared.moving) {
        const startState = getGenericStartState(event, 'move', [mov_x, mov_y])
        updateState({ shared: { args, moving: true, down, touches, shiftKey }, move: { ...startState, ...getEventGenericData(event) } })
        return handleGestureStart('onMove')
      }

      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'move')
      updateState({ shared: { down, touches, shiftKey }, move: { ...kinematics, ...getEventGenericData(event) } })
      handleGesture('onMove')
    }

    const onScrollEnd = () => {
      updateState({ shared: { scrolling: false }, scroll: { ...genericEndState, velocity: 0, vxvy: [0, 0] } })
      handleGestureEnd('onScroll')
    }

    const onScroll = event => {
      clearTimeout(timeouts.current.scroll)
      timeouts.current.scroll = setTimeout(onScrollEnd, 100)
      const { mov_x, mov_y } = getScrollEventData(event)

      if (!state.current.shared.scrolling) {
        const startState = getGenericStartState(event, 'scroll', [mov_x, mov_y])
        updateState({ shared: { args, scrolling: true }, scroll: { ...startState, ...getEventGenericData(event) } })
        return handleGestureStart('onScroll')
      }

      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'scroll')
      updateState({ scroll: { ...kinematics, ...getEventGenericData(event) } })
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
      clearTimeout(timeouts.current.wheel)
      timeouts.current.wheel = setTimeout(onWheelEnd, 100)
      const { mov_x, mov_y } = getWheelEventData(event)

      if (!state.current.shared.wheeling) {
        const startState = getGenericStartState(event, 'wheel', [mov_x, mov_y])
        updateState({ shared: { args, wheeling: true }, wheel: { ...startState, ...getEventGenericData(event) } })
        return handleGestureStart('onWheel')
      }

      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'wheel', true)
      updateState({ wheel: { ...kinematics, ...getEventGenericData(event) } })
      handleGesture('onWheel')
    }

    const onEnter = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(event)
      updateState({
        shared: { args, hovering: true, down, touches, shiftKey },
        move: { xy: [mov_x, mov_y], ...getEventGenericData(event) }
      })
      handleGesture('onHover')
    }

    const onLeave = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(event)
      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'move')
      updateState({ shared: { args, hovering: false, down, touches, shiftKey }, move: { ...kinematics, ...getEventGenericData(event) } })
      handleGesture('onHover')
    }

    const output = {}
    const capture = props.config.event.capture ? 'Capture' : ''

    if (domTarget) {
      if (actions.has('onHover')) {
        domListeners.current.push([mouseEnter, onEnter])
        domListeners.current.push([mouseLeave, onLeave])
      }
      if (actions.has('onMove')) {
        domListeners.current.push([mouseMove, onMove])
      }
      if (actions.has('onDrag')) {
        domListeners.push([mouseDown, onDragStart])
        domListeners.push([touchStart, onDragStart])
      }
      if (actions.has('onScroll')) {
        domListeners.current.push([scroll, onScroll])
      }
      if (actions.has('onWheel')) {
        domListeners.current.push([wheel, onWheel])
      }
      setListeners(domTarget, domListeners.current, props.config.event, true)
      return clean
    }

    if (actions.has('onMove')) {
      output[`onPointerMove`] = onMove
    }

    if (actions.has('onDrag')) {
      output[`onMouseDown${capture}`] = onDragStart
      output[`onTouchStart${capture}`] = onDragStart
    }

    if (actions.has('onHover')) {
      output[`onMouseEnter${capture}`] = onEnter
      output[`onMouseLeave${capture}`] = onLeave
    }

    if (actions.has('onScroll')) {
      output[`onScroll${capture}`] = onScroll
    }

    if (actions.has('onWheel')) {
      output[`onWheel${capture}`] = onWheel
    }

    return output
  }
}

/*** UTILS ***/

function clearTimeouts(timeouts) {
  Object.values(timeouts).forEach(clearTimeout)
}

function setListeners(el, listeners, options, add) {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

function getEventGenericData(event) {
  const { target, currentTarget, type } = event
  return { event, target, currentTarget, type }
}

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
  const { shiftKey, touches, changedTouches } = event
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX: mov_x, clientY: mov_y, buttons } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons % 2 === 1 // makes sure main button is pressed
  return { mov_x, mov_y, shiftKey, touches: (touchEvents && touchEvents.length) || 0, down }
}
