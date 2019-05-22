export const GESTURE_ONCHANGE = 'GESTURE_ONCHANGE'
export const GESTURE_ONEND = 'GESTURE_ONEND'
export const GESTURE_ONSTART = 'GESTURE_ONSTART'

export const noop = () => {}

// vector add
export const addV = (v1, v2) => v1.map((v, i) => v + v2[i])

// vector substract
export const subV = (v1, v2) => v1.map((v, i) => v - v2[i])

const setListeners = add => (el, listeners, options) => {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

export const addListeners = setListeners(true)
export const removeListeners = setListeners(false)

export function getModifierKeys(event) {
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { shiftKey, altKey, metaKey, ctrlKey }
}

export function getScrollEventData(event) {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget
  return { values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], ...getModifierKeys(event) }
}

export function getWheelEventData({ deltaX, deltaY, ...rest }) {
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { values: [deltaX, deltaY], ...getModifierKeys(rest) }
}

export function getPointerEventData(event) {
  const { touches, buttons, changedTouches } = event
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX, clientY } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons > 0
  return {
    values: [clientX, clientY],
    touches: (touchEvents && touchEvents.length) || 0,
    down,
    buttons,
    ...getModifierKeys(event)
  }
}

export function getTwoTouchesEventData(event) {
  const { touches } = event
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY

  const da = [Math.hypot(dx, dy), -(Math.atan2(dx, dy) * 180) / Math.PI]
  const origin = [(touches[1].clientX + touches[0].clientX) / 2, (touches[1].clientY + touches[0].clientY) / 2]

  return {
    values: da,
    origin,
    touches: 2,
    down: touches > 0,
    ...getModifierKeys(event)
  }
}

export const calculateVelocity = (diff, delta_t, len) => {
  len = len || Math.hypot(...diff)
  return delta_t ? len / delta_t : 0
}

export const calculateVelocities = (diff, delta_t) => {
  return delta_t ? diff.map(v => v / delta_t) : Array(diff.length).fill(0)
}

export const calculateDistance = delta => Math.hypot(...delta)
export const calculateDirection = (diff, len) => {
  len = len || Math.hypot(...diff) || 1
  return diff.map(v => v / len)
}

export const calculateAllKinematics = (delta, diff, delta_t) => {
  const len = Math.hypot(...diff)

  return {
    velocities: calculateVelocities(diff, delta_t),
    velocity: calculateVelocity(diff, delta_t, len),
    distance: calculateDistance(delta),
    direction: calculateDirection(diff, len)
  }
}

export const supportsGestureEvent = () => {
  try {
    return 'constructor' in GestureEvent // eslint-disable-line no-undef
  } catch (e) {
    return false
  }
}
