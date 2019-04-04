import React from 'react'

const noop = () => {}

const pointerMove = 'pointermove'
const pointerUp = 'pointerup'
const pointerDown = 'pointerdown'
const pointerCancel = 'pointercancel'
const pointerEnter = 'pointerenter'
const pointerLeave = 'pointerleave'
const scroll = 'scroll'
const wheel = 'wheel'

const stateKeys = {
  onDrag: 'drag',
  onHover: 'move',
  onMove: 'move',
  onScroll: 'scroll',
  onWheel: 'wheel'
}

const defaultConfig = {
  // [V5] events should allow for multiple events supports
  hover: false,
  scroll: false,
  wheel: false,
  event: { passive: true, capture: false },
  transform: { x: x => x, y: y => y },
  domElement: undefined
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
  temp: undefined
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
    shiftKey: undefined,
    cancel: noop
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
  const listeners = React.useRef([])
  const { domElement } = props.config

  const clean = () => {
    clearTimeouts(timeouts.current)
    setListeners(domElement, listeners.current, props.config.event, false)
  }

  React.useEffect(() => clean, [])

  const [bind] = React.useState(() => (...args) => {
    const unchanged =
      Array.isArray(oldArgs.current) &&
      oldArgs.current.length === args.length &&
      args.every((arg, index) => arg === oldArgs.current[index])
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
      const updatedState = Object.entries(newState).reduce(
        (acc, [k, v]) => ({ ...acc, [k]: { ...state.current[k], ...v } }),
        {}
      )
      state.current = { ...state.current, ...updatedState }
    }

    const getGenericStartState = (event, stateKey, xy) => {
      const transform =
        state.current[stateKey].transform ||
        event.transform ||
        props.config.transform
      const lastLocal =
        state.current[stateKey].lastLocal || initialState[stateKey].lastLocal
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

    const getKinematics = (
      mov_x,
      mov_y,
      eventTransform,
      stateKey,
      isDelta = false
    ) => {
      const lastLocal =
        state.current[stateKey].lastLocal || initialState[stateKey].lastLocal
      const { xy, initial, delta, time, local, transform } = state.current[
        stateKey
      ]
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
      const actionState = {
        ...state.current.shared,
        ...state.current[stateKey]
      }
      if (props[action]) {
        state.current[stateKey].temp =
          props[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureStart = action => {
      const stateKey = stateKeys[action]
      const actionState = {
        ...state.current.shared,
        ...state.current[stateKey]
      }
      const actionStart = `${action}Start`
      props[actionStart] && props[actionStart](actionState)
      if (props[action]) {
        state.current[stateKey].temp =
          props[action](actionState) || state.current[stateKey].temp
      }
    }

    const handleGestureEnd = (action, callDefaultAction = true) => {
      const stateKey = stateKeys[action]
      const actionState = {
        ...state.current.shared,
        ...state.current[stateKey]
      }
      if (callDefaultAction && props[action]) {
        state.current[stateKey].temp =
          props[action](actionState) || state.current[stateKey].temp
      }
      const actionEnd = `${action}End`
      props[actionEnd] && props[actionEnd](actionState)
    }

    const onDragStart = event => {
      event.currentTarget.setPointerCapture(event.pointerId)
      const {
        mov_x,
        mov_y,
        touches,
        shiftKey,
        pointerId
      } = getPointerEventData(event)
      const startState = getGenericStartState(event, 'drag', [mov_x, mov_y])

      updateState({
        shared: { args, dragging: true, down: true, touches, shiftKey },
        drag: {
          ...startState,
          ...getEventGenericData(event),
          pointerId,
          cancel: () => cancelDrag(event)
        }
      })

      handleGestureStart('onDrag')
    }

    const onDragEnd = event => {
      const { currentTarget, pointerId } = state.current.drag
      currentTarget.releasePointerCapture(pointerId)

      updateState({
        shared: { dragging: false, down: false, touches: 0 },
        drag: {
          ...genericEndState,
          ...getEventGenericData(event),
          cancel: noop
        }
      })

      handleGestureEnd('onDrag')
    }

    const onDragMove = event => {
      if (!state.current.shared.dragging) return
      const {
        mov_x,
        mov_y,
        touches,
        shiftKey,
        pointerId
      } = getPointerEventData(event)
      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'drag')
      const cancel = () => cancelDrag(event)

      updateState({
        shared: { moving: true, touches, shiftKey },
        drag: {
          ...kinematics,
          ...getEventGenericData(event),
          pointerId,
          cancel
        }
      })
      handleGesture('onDrag')
    }

    const cancelDrag = event => requestAnimationFrame(onDragEnd(event))

    const onMoveEnd = () => {
      updateState({
        shared: { moving: false },
        move: { ...genericEndState, velocity: 0, vxvy: [0, 0] }
      })
      handleGestureEnd('onMove')
    }

    const onMove = event => {
      clearTimeout(timeouts.current.move)
      timeouts.current.move = setTimeout(onMoveEnd, 100)

      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(
        event
      )

      if (!state.current.shared.moving) {
        const startState = getGenericStartState(event, 'move', [mov_x, mov_y])
        updateState({
          shared: { args, moving: true, down, touches, shiftKey },
          move: { ...startState, ...getEventGenericData(event) }
        })
        return handleGestureStart('onMove')
      }

      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'move')
      updateState({
        shared: { down, touches, shiftKey },
        move: { ...kinematics, ...getEventGenericData(event) }
      })
      handleGesture('onMove')
    }

    const onScrollEnd = () => {
      updateState({
        shared: { scrolling: false },
        scroll: { ...genericEndState, velocity: 0, vxvy: [0, 0] }
      })
      handleGestureEnd('onScroll')
    }

    const onScroll = event => {
      clearTimeout(timeouts.current.scroll)
      timeouts.current.scroll = setTimeout(onScrollEnd, 100)
      const { mov_x, mov_y } = getScrollEventData(event)

      if (!state.current.shared.scrolling) {
        const startState = getGenericStartState(event, 'scroll', [mov_x, mov_y])
        updateState({
          shared: { args, scrolling: true },
          scroll: { ...startState, ...getEventGenericData(event) }
        })
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
        updateState({
          shared: { args, wheeling: true },
          wheel: { ...startState, ...getEventGenericData(event) }
        })
        return handleGestureStart('onWheel')
      }

      const kinematics = getKinematics(
        mov_x,
        mov_y,
        event.transform,
        'wheel',
        true
      )
      updateState({ wheel: { ...kinematics, ...getEventGenericData(event) } })
      handleGesture('onWheel')
    }

    const onEnter = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(
        event
      )
      updateState({
        shared: { args, hovering: true, down, touches, shiftKey },
        move: { xy: [mov_x, mov_y], ...getEventGenericData(event) }
      })
      handleGesture('onHover')
    }

    const onLeave = event => {
      const { mov_x, mov_y, down, touches, shiftKey } = getPointerEventData(
        event
      )
      const kinematics = getKinematics(mov_x, mov_y, event.transform, 'move')
      updateState({
        shared: { args, hovering: false, down, touches, shiftKey },
        move: { ...kinematics, ...getEventGenericData(event) }
      })
      handleGesture('onHover')
    }

    const output = {}
    const capture = props.config.event.capture ? 'Capture' : ''

    if (domElement) {
      if (actions.has('onHover')) {
        listeners.current.push([pointerEnter, onEnter])
        listeners.current.push([pointerLeave, onLeave])
      }
      if (actions.has('onMove')) {
        listeners.current.push([pointerMove, onMove])
      }
      if (actions.has('onDrag')) {
        listeners.current.push([pointerDown, onDragStart])
        listeners.current.push([pointerMove, onDragMove])
        listeners.current.push([pointerUp, onDragEnd])
        listeners.current.push([pointerCancel, onDragEnd])
      }
      if (actions.has('onScroll')) {
        listeners.current.push([scroll, onScroll])
      }
      if (actions.has('onWheel')) {
        listeners.current.push([wheel, onWheel])
      }
      setListeners(domElement, listeners.current, props.config.event, true)
      return clean
    }

    if (actions.has('onMove')) {
      output[`onPointerMove`] = onMove
    }

    if (actions.has('onDrag')) {
      output['onPointerDown'] = onDragStart
      output['onPointerMove'] = onDragMove
      output['onPointerUp'] = onDragEnd
      output['onPointerCancel'] = onDragEnd
    }

    if (actions.has('onHover')) {
      output[`onPointerEnter`] = onEnter
      output[`onPointerLeave`] = onLeave
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
  const { pointerId, shiftKey, touches, changedTouches } = event
  const touchEvents =
    touches && touches.length > 0
      ? touches
      : changedTouches && changedTouches.length > 0
      ? changedTouches
      : null
  const { clientX: mov_x, clientY: mov_y, buttons } = touchEvents
    ? touchEvents[0]
    : event
  const down = (touchEvents && touchEvents.length > 0) || buttons % 2 === 1 // makes sure main button is pressed
  return {
    mov_x,
    mov_y,
    shiftKey,
    touches: (touchEvents && touchEvents.length) || 0,
    down,
    pointerId
  }
}
