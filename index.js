import React from 'react'

const touchStart = 'touchstart'
const touchMove = 'touchmove'
const touchEnd = 'touchend'
const mouseMove = 'mousemove'
const mouseUp = 'mouseup'
const mouseDown = 'mousedown'
const mouseEnter = 'mouseenter'
const mouseLeave = 'mouseleave'
const scroll = 'scroll'
const wheel = 'wheel'

const defaultConfig = {
  // [V5] events should allow for multiple events supports
  hover: false,
  scroll: false,
  wheel: false,
  window: false, // [V5] attaches events to the window
  mouse: true, // [V5]parameter taken into account for drag only
  touch: true, // [V5] parameter taken into account for drag only
  event: { passive: true, capture: false },
  transform: { x: x => x, y: y => y },
  domElement: undefined
}

const states = {
  shared: {
    event: undefined,
    args: undefined,
    temp: undefined,
    target: undefined,
    time: undefined,
    type: undefined, // [v5] type of the event
    xy: [0, 0],
    local: [0, 0],
    lastLocal: [0, 0],
    delta: [0, 0],
    velocity: 0,
    vxvy: [0, 0],
    distance: 0,
    initial: [0, 0],
    previous: [0, 0],
    active: 0,
    first: true,
    last: false
  },
  scrollwheel: {
    scrolling: false
  },
  touchmove: {
    buttons: 0,
    touches: 0,
    down: false, // TODO: change to 1 or 0?
    shiftKey: false,
    dragging: false,
    moving: false
  }
}

const initialState = {
  onMove: {
    ...states.shared,
    ...states.touchmove,
    hovering: false
  },
  onDrag: {
    ...states.shared,
    ...states.touchmove
  },
  onScroll: {
    ...states.shared,
    ...states.scrollwheel
  },
  onWheel: {
    ...states.shared,
    ...states.scrollwheel
  }
}

// [v5] returns events attributes depending on the event type
function getEventAttributes(event) {
  const { target, shiftKey, type, currentTarget } = event

  if (event.type === 'scroll') {
    // if the currentTarget is the window then we return
    // the scrollX/Y position. If not (ie the currentTarget is HTML DOM
    // element), then we return scrollLeft/scrollTop
    const { scrollX, scrollY, scrollLeft, scrollTop } = currentTarget
    return {
      mov_x: scrollX || scrollLeft || 0,
      mov_y: scrollY || scrollTop || 0,
      target,
      type
    }
  }
  if (event.type === 'wheel') {
    // TODO: implement polyfill for wheel?
    // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
    const { deltaX: mov_x, deltaY: mov_y } = event
    return { mov_x, mov_y, target, shiftKey, type }
  }

  // [v5] changed pageX/Y to clientX/Y to reflect mouse
  // position according to the viewport

  const { touches, changedTouches } = event
  const { clientX: mov_x, clientY: mov_y, buttons } =
    touches && touches.length > 0
      ? touches[0]
      : changedTouches && changedTouches.length > 0
      ? changedTouches[0]
      : event
  return {
    mov_x,
    mov_y,
    buttons,
    touches: event.touches && event.touches.length,
    target,
    type
  }
}

function handlers(state, props = {}, args) {
  // Common handlers
  // [v5] handlers have been renamed to handleGesture/Start/End

  // [v5] debounced handleGestureEnd function used for
  // move, scroll and wheel events
  const handleGestureEnd = debounce((eventAttributes, action) => {
    eventAttributes.debounced = true
    handleGesture(action)(eventAttributes)
  }, 100)

  const injectTouchMouseState = action => eventAttributes => {
    const { buttons, touches, shiftKey, type } = eventAttributes

    const stateKey =
      action === 'onHover' ? (props.onDrag ? 'onDrag' : 'onMove') : action
    const down = buttons % 2 === 1 || touches > 0
    const first =
      (action === 'onHover' && type === mouseEnter && stateKey === 'onMove') ||
      (action === 'onMove' && !state.current[stateKey].moving) ||
      (action === 'onDrag' && down && !state.current[stateKey].dragging)
    const last =
      (action === 'onMove' && eventAttributes.debounced) ||
      (action === 'onDrag' && !down)
    const hovering =
      type === mouseEnter ||
      (type === mouseMove && !eventAttributes.debounced) ||
      (state.current[stateKey].hovering && type !== mouseLeave)

    const dragging = down
    const moving = !eventAttributes.debounced

    return {
      down,
      moving,
      dragging,
      hovering,
      active:
        (action === 'onDrag' && dragging) || (action === 'onMove' && moving)
          ? 1
          : 0,
      shiftKey,
      first,
      last
    }
  }

  const injectScrollWheelState = action => eventAttributes => {
    const first = !state.current[action].scrolling
    const last = eventAttributes.debounced
    const scrolling = !eventAttributes.debounced
    return {
      scrolling,
      active: scrolling ? 1 : 0,
      first,
      last
    }
  }

  const handleGesture = action => event => {
    const eventAttributes = event.debounced ? event : getEventAttributes(event)
    const stateKey = action === 'onHover' ? 'onMove' : action

    // TODO: not sure debouncing handleGestureEnd is necessary for drag
    // if (!event.debounced && action !== 'onHover') handleGestureEnd(eventAttributes, action)

    const { mov_x, mov_y, target, type } = eventAttributes

    const lastLocal =
      state.current[stateKey].lastLocal || initialState[stateKey].lastLocal

    const now = Date.now()

    const { transform, xy, initial, delta, time } = state.current[stateKey]
    const t = transform || event.transform || props.config.transform

    // [v5] because wheel events returns deltas since the last event,
    // we need to increment x, y delta_x and delta_y accordingly

    const x = type === 'wheel' ? mov_x + xy[0] : mov_x
    const y = type === 'wheel' ? mov_y + xy[1] : mov_y

    const delta_x = t.x(type === 'wheel' ? mov_x + delta[0] : x - initial[0])
    const delta_y = t.y(type === 'wheel' ? mov_y + delta[1] : y - initial[1])

    const x_dist = t.x(x - xy[0])
    const y_dist = t.y(y - xy[1])
    const delta_t = now - time
    const local_x = lastLocal[0] + delta_x
    const local_y = lastLocal[1] + delta_y
    const distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
    const len = Math.hypot(x_dist, y_dist)
    const scalar = 1 / (len || 1)

    const injectSpecificEventState =
      ['onDrag', 'onMove'].indexOf(stateKey) > -1
        ? injectTouchMouseState
        : injectScrollWheelState
    const specificEventState = injectSpecificEventState(action)(eventAttributes)

    const startState = specificEventState.first
      ? {
          ...initialState[stateKey],
          lastLocal: state.current[stateKey].local,
          local: state.current[stateKey].local,
          initial: [x, y],
          previous: [x, y],
          cancel: action === 'onDrag' ? cancelDrag : () => {}
        }
      : {}

    // TODO: should handle the cancel method
    state.current = {
      ...state.current,
      [stateKey]: {
        ...state.current[stateKey],
        xy: [x, y],
        delta: [delta_x, delta_y],
        local: [local_x, local_y],
        velocity: len / delta_t,
        vxvy: [x_dist / delta_t, y_dist / delta_t],
        distance: distance,
        direction: [x_dist * scalar, y_dist * scalar],
        previous: xy,
        ...startState,
        ...specificEventState,
        transform: t,
        time: now,
        event,
        target,
        type
      }
    }

    state.current[stateKey].temp =
      props[action](state.current[stateKey]) || state.current[stateKey].temp
  }

  const handleHover = handleGesture('onHover')
  const handleMove = handleGesture('onMove')
  const handleDrag = handleGesture('onDrag')
  const handleScroll = handleGesture('onScroll')
  const handleWheel = handleGesture('onWheel')

  const dragListeners = []

  const onDragStart = event => {
    if (props.config.mouse) {
      dragListeners.push([mouseMove, handleDrag])
      dragListeners.push([mouseUp, onDragEnd])
    }
    if (props.config.touch) {
      dragListeners.push([touchMove, handleDrag])
      dragListeners.push([touchEnd, onDragEnd])
    }
    setListeners(window, dragListeners, props.config.event, true)
    handleDrag(event)
  }

  const onDragEnd = event => {
    setListeners(window, dragListeners, props.config.event, false)
    handleDrag(event)
  }

  const cancelDrag = () => {
    setListeners(window, dragListeners, props.config.event, false)
    state.current = {
      ...state.current,
      drag: {
        ...state.current.drag,
        moving: false,
        dragging: false
      }
    }
    state.current.drag.temp =
      props.onDrag(state.current.drag) || state.current.drag.temp
  }

  const output = {}
  const capture = props.config.event.capture ? 'Capture' : ''

  const { domElement } = props.config
  if (domElement) {
    const listeners = []
    if (props.onHover) {
      listeners.push([mouseEnter, handleHover])
      listeners.push([mouseLeave, handleHover])
    }
    if (props.onMove) {
      listeners.push([mouseMove, handleMove])
    }
    if (props.onDrag) {
      if (props.config.mouse) listeners.push([mouseDown, onDragStart])
      if (props.config.touch) listeners.push([touchStart, onDragStart])
    }
    if (props.onScroll) {
      listeners.push([scroll, handleScroll])
    }
    if (props.onWheel) {
      listeners.push([wheel, handleWheel])
    }
    setListeners(domElement, listeners, props.config.event, true)
    return () => setListeners(domElement, listeners, props.config.event, false)
  }

  if (props.onMove) {
    output[`onMouseMove${capture}`] = handleMove
  }

  if (props.onDrag) {
    if (props.config.mouse) output[`onMouseDown${capture}`] = onDragStart
    if (props.config.touch) output[`onTouchStart${capture}`] = onDragStart
  }

  if (props.onHover) {
    output[`onMouseEnter${capture}`] = handleHover
    output[`onMouseLeave${capture}`] = handleHover
  }

  if (props.onScroll) {
    output[`onScroll${capture}`] = handleScroll
  }

  if (props.onWheel) {
    output[`onWheel${capture}`] = handleWheel
  }

  return output
}

export default function useGesture(props) {
  const state = React.useRef(initialState)
  // React.useEffect(() => state.current.stop, []) // TODO: add later
  if (typeof props === 'function') props = { onAction: props }
  props = { ...props, config: { ...defaultConfig, ...props.config } }
  const [bind] = React.useState(() => (...args) => handlers(state, props, args))
  return bind
}

/*** UTILS ***/

// [v5] Debounce function for scroll events
// stolen from: https://gist.github.com/beaucharman/1f93fdd7c72860736643d1ab274fee1a
function debounce(callback, wait, immediate = false) {
  let timeout = null
  return function() {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
    if (callNow) {
      next()
    }
  }
}

function setListeners(el, listeners, options, add) {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}
