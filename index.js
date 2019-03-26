import React from 'react'

const touchMove = 'touchmove'
const touchEnd = 'touchend'
const mouseMove = 'mousemove'
const mouseUp = 'mouseup'
const scroll = 'scroll'
const wheel = 'wheel'

const defaultProps = {
  // [V5] events should allow for multiple events supports
  // ie: events: 'drag hover scroll' although it might not be a good idea
  // after all
  events: 'drag',
  drag: false,
  hover: false,
  scroll: false,
  wheel: false,
  window: false, // [V5] attaches events to the window
  mouse: true, // [V5]parameter taken into account for drag only
  touch: true, // [V5] parameter taken into account for drag only
  config: { passive: true, capture: false },
  onAction: undefined,
  onGestureStart: undefined, // [V5] old onDown
  onGestureEnd: undefined, // [V5] old onUp
  onGesture: undefined, // [V5] old onMove
  transform: {
    x: x => x,
    y: y => y
  }
}

const initialState = {
  event: undefined,
  args: undefined,
  temp: undefined,
  target: undefined,
  time: undefined,
  type: undefined, // [v5] type of the event
  xy: [0, 0],
  delta: [0, 0],
  initial: [0, 0],
  previous: [0, 0],
  direction: [0, 0],
  local: [0, 0],
  lastLocal: [0, 0],
  velocity: 0,
  vxvy: [0, 0], // [v5] shows velocity on x and y axis
  distance: 0,
  down: false, // TODO: change to 1 or 0?
  active: 0, // [v5] active = 1 means the gesture is in progress
  first: true,
  shiftKey: false
}

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

// [v5] returns events attributes depending on the event type
function getEventAttributes(event) {
  if (event.type === 'scroll') {
    const el = event.currentTarget
    // if the currentTarget is the window then we return
    // the scrollX/Y position. If not (ie the currentTarget is HTML DOM
    // element), then we return scrollLeft/scrollTop
    return {
      mov_x: el === window ? el.scrollX : el.scrollLeft,
      mov_y: el === window ? el.scrollY : el.scrollTop,
      target: event.target,
      shiftKey: event.shiftKey,
      type: event.type
    }
  }
  if (event.type === 'wheel') {
    // TODO: implement polyfill for wheel?
    // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
    return {
      mov_x: event.deltaX,
      mov_y: event.deltaY,
      target: event.target,
      shiftKey: event.shiftKey,
      type: event.type
    }
  }
  const {
    // [v5] changed pageX/Y to clientX/Y to reflect mouse
    // position according to the viewport
    clientX: mov_x,
    clientY: mov_y,
    shiftKey,
    target,
    type
  } = event.touches ? event.touches[0] : event
  return { mov_x, mov_y, shiftKey, target, type }
}

function handlers(set, props = {}, args) {
  // [v5] we split the events props and set event flags accordingly
  props.events
    .split(' ')
    .forEach(k =>
      k in defaultProps
        ? (props[k] = true)
        : console.warn(`Event ${k} is not supported yet :(`)
    )

  // [v5] support for onDown and onUp legacy functions
  if (props.onDown) props.onGestureStart = props.onDown
  if (props.onUp) props.onGestureEnd = props.onUp
  if (props.onUp) props.onGesture = props.onMove

  // [v5] isScrolling is needed to trigger handleGestureStart
  // for sroll and wheel events without relaying on state.
  let isScrolling = false

  // Common handlers
  // [v5] handlers have been renamed to handleGesture/Start/End
  const handleGestureEnd = (event, shiftKey) => {
    set(state => {
      const newProps = { ...state, down: false, active: 0, first: false }
      const temp = props.onAction && props.onAction(newProps)
      if (props.onGestureEnd) props.onGestureEnd(newProps)
      return {
        ...newProps,
        event,
        shiftKey,
        lastLocal: state.local,
        temp: temp || newProps.temp
      }
    })
  }

  // [v5] debounced handleGestureEnd function used for
  // scroll and wheel events
  const debouncedScrollEnd = debounce(event => {
    handleGestureEnd(event)
    isScrolling = false
  }, 100)

  const handleGestureStart = event => {
    const { mov_x, mov_y, shiftKey, target, type } = getEventAttributes(event)
    set(state => {
      const lastLocal = state.lastLocal || initialState.lastLocal

      // TODO: technically scroll and wheel events are losing one frame
      // ie delta should increment right away

      const newProps = {
        ...initialState,
        transform: event.transform || props.transform || defaultProps.transform,
        event,
        target,
        args,
        lastLocal,
        shiftKey,
        local: lastLocal,
        xy: [mov_x, mov_y],
        initial: [mov_x, mov_y],
        previous: [mov_x, mov_y],
        down: type === 'mousedown' || type === 'touchstart',
        active: 1,
        type,
        time: Date.now(),
        cancel: () => {
          // TODO: needs to be documented
          stop()
          requestAnimationFrame(() => handleGestureEnd(event))
        }
      }
      const temp = props.onAction && props.onAction(newProps)
      if (props.onGestureStart) props.onGestureStart(newProps)
      return { ...newProps, temp }
    })
  }
  const handleGesture = event => {
    const { mov_x, mov_y, shiftKey, type } = getEventAttributes(event)
    if (type === 'wheel' || type === 'scroll') {
      if (!isScrolling) {
        handleGestureStart(event)
        isScrolling = true
        return
      }
      debouncedScrollEnd(event)
    }
    set(state => {
      const time = Date.now()

      // [v5] because wheel events returns deltas since the last event,
      // we need to increment x, y delta_x and delta_y accordingly

      const x = type === 'wheel' ? mov_x + state.xy[0] : mov_x
      const y = type === 'wheel' ? mov_y + state.xy[1] : mov_y

      const x_dist = state.transform.x(x - state.xy[0])
      const y_dist = state.transform.y(y - state.xy[1])

      const delta_x = state.transform.x(
        type === 'wheel' ? mov_x + state.delta[0] : x - state.initial[0]
      )
      const delta_y = state.transform.y(
        type === 'wheel' ? mov_y + state.delta[1] : y - state.initial[1]
      )
      const delta_t = time - state.time

      const local_x = state.lastLocal[0] + delta_x
      const local_y = state.lastLocal[1] + delta_y

      const distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
      const len = Math.hypot(x_dist, y_dist)
      const scalar = 1 / (len || 1)

      const newProps = {
        ...state,
        event,
        time,
        shiftKey,
        xy: [x, y],
        delta: [delta_x, delta_y],
        local: [local_x, local_y],
        velocity: len / delta_t,
        vxvy: [x_dist / delta_t, y_dist / delta_t],
        distance: distance,
        direction: [x_dist * scalar, y_dist * scalar],
        previous: state.xy,
        first: false,
        type
      }
      const temp = props.onAction && props.onAction(newProps)
      if (props.onGesture) props.onGesture(newProps)
      return { ...newProps, temp: temp || newProps.temp }
    })
  }

  const onGestureStart = event => {
    if (props.drag) {
      if (props.mouse) {
        window.addEventListener(mouseMove, handleGesture, props.config)
        window.addEventListener(mouseUp, onGestureEnd, props.config)
      }
      if (props.touch) {
        window.addEventListener(touchMove, handleGesture, props.config)
        window.addEventListener(touchEnd, onGestureEnd, props.config)
      }
    }
    handleGestureStart(event)
  }

  const stop = () => {
    // [v5] makes sure we only remove event listeners for drag
    if (props.drag) {
      if (props.mouse) {
        window.removeEventListener(mouseMove, handleGesture, props.config)
        window.removeEventListener(mouseUp, onGestureEnd, props.config)
      }
      if (props.touch) {
        window.removeEventListener(touchMove, handleGesture, props.config)
        window.removeEventListener(touchEnd, onGestureEnd, props.config)
      }
    }
  }

  const onGestureEnd = event => {
    const { shiftKey } = event
    stop()
    handleGestureEnd(event, shiftKey)
  }

  const output = {}
  const capture = props.config.capture ? 'Capture' : ''

  if (props.scroll) {
    if (props.window) {
      // [v5] if the window property is set on a scroll gesture
      // then we add listeners to the window element. If you're using hooks
      // make sure you attach it like this:
      // React.useEffect(bind, [bind])
      window.addEventListener(scroll, handleGesture, props.config)
      return () => {
        window.removeEventListener(scroll, handleGesture, props.config)
      }
    }
    output[`onScroll${capture}`] = handleGesture
  }

  if (props.wheel) {
    if (props.window) {
      window.addEventListener(wheel, handleGesture, props.config)
      return () => {
        window.removeEventListener(wheel, handleGesture, props.config)
      }
    }
    output[`onWheel${capture}`] = handleGesture
  }

  if (props.hover) {
    if (props.window) {
      window.addEventListener('mousemove', handleGesture, props.config)
      window.addEventListener('mouseenter', onGestureStart, props.config)
      window.addEventListener('mouseleave', onGestureEnd, props.config)
      return () => {
        window.removeEventListener('mousemove', handleGesture, props.config)
        window.removeEventListener('mouseenter', onGestureStart, props.config)
        window.removeEventListener('mouseleave', onGestureEnd, props.config)
      }
    }

    output[`onMouseMove${capture}`] = handleGesture
    output[`onMouseEnter${capture}`] = onGestureStart
    output[`onMouseLeave${capture}`] = onGestureEnd
  }

  if (props.drag) {
    if (props.mouse) {
      output[`onMouseDown${capture}`] = onGestureStart
    }
    if (props.touch) {
      output[`onTouchStart${capture}`] = onGestureStart
    }
  }
  return output
}

export default function useGesture(props) {
  const [state, set] = React.useState(initialState)
  const transientState = React.useRef(initialState)
  if (typeof props === 'function') props = { onAction: props }
  props = { ...defaultProps, ...props }
  const [spread] = React.useState(() => (...args) =>
    handlers(
      props.onAction
        ? cb => (transientState.current = cb(transientState.current))
        : set,
      props,
      args
    )
  )
  return props.onAction ? spread : [spread, state]
}
