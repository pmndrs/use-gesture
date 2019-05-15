export const noop = () => {}

// vector add
export const addV = (v1, v2) => v1.map((v, i) => v + v2[i])

// vector substract
export const subV = (v1, v2) => v1.map((v, i) => v - v2[i])

// returns a function that chains all functions given as parameters
export const chainFns = (...fns) => (...args) => fns.forEach(fn => fn(...args))

// utility function that pushes values in object keys which are in fact arrays
export const pushInKeys = (obj, keys, value) => {
  if (!Array.isArray(keys)) keys = [keys]
  keys.forEach(key => (obj[key] = obj[key] ? [...obj[key], value] : [value]))
}

const setListeners = add => (el, listeners, options) => {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

export const addListeners = setListeners(true)
export const removeListeners = setListeners(false)

export function getScrollEventData(event) {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], shiftKey, altKey, metaKey, ctrlKey }
}

export function getWheelEventData({ deltaX, deltaY, shiftKey, altKey, metaKey, ctrlKey }) {
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { values: [deltaX, deltaY], shiftKey, altKey, metaKey, ctrlKey }
}

export function getPointerEventData(event) {
  const { touches, changedTouches, shiftKey, altKey, metaKey, ctrlKey } = event
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX, clientY, buttons } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons % 2 === 1 // makes sure main button is pressed
  return { values: [clientX, clientY], touches: (touchEvents && touchEvents.length) || 0, down, shiftKey, altKey, metaKey, ctrlKey }
}

export const getVelocity = (diff, delta_t, len) => {
  len = len || Math.hypot(...diff)
  return delta_t ? len / delta_t : 0
}

export const getVelocities = (diff, delta_t) => {
  return delta_t ? diff.map(v => v / delta_t) : Array(diff.length).fill(0)
}

export const getDistance = delta => Math.hypot(...delta)
export const getDirection = (diff, len) => {
  len = len || Math.hypot(...diff) || 1
  return diff.map(v => v / len)
}

export const getAllKinematics = (delta, diff, delta_t) => {
  const len = Math.hypot(...diff)

  return {
    velocities: getVelocities(diff, delta_t),
    velocity: getVelocity(diff, delta_t, len),
    distance: getDistance(delta),
    direction: getDirection(diff, len)
  }
}

export const supportsGestureEvent = () => {
  try {
    return 'constructor' in GestureEvent // eslint-disable-line no-undef
  } catch (e) {
    return false
  }
}
