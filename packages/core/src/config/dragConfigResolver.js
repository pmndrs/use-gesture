import { V } from '../utils/maths'
import { commonConfigResolver } from './commonConfigResolver'
import { SUPPORT } from './support'

export const dragConfigResolver = {
  ...commonConfigResolver,
  pointerLock(_v, _k, { pointer: { lock = false } = {} }) {
    return SUPPORT.pointerLock && lock
  },
  useTouch(_v, _k, { pointer: { touch = false } = {} }) {
    return SUPPORT.touch && touch
  },
  r3f(value = false) {
    return value
  },
  device() {
    if (this.r3f) return 'pointer'
    if (this.useTouch) return 'touch'
    if (this.pointerLock) return 'mouse'
    if (SUPPORT.pointer) return 'pointer'
    if (SUPPORT.touch) return 'touch'
    return 'mouse'
  },
  pointerCapture(_v, _k, { pointer: { capture = true } = {} }) {
    return !this.pointerLock && this.device === 'pointer' && capture
  },
  bounds(value = {}) {
    if (typeof value === 'function') {
      return (state) => dragConfigResolver.bounds(value(state))
    }

    if ('current' in value) {
      return () => value.current
    }

    if (typeof HTMLElement === 'function' && value instanceof HTMLElement) {
      return value
    }

    const { left = -Infinity, right = Infinity, top = -Infinity, bottom = Infinity } = value

    return [
      [left, right],
      [top, bottom]
    ]
  },
  lockDirection(_v, _k, { axis }) {
    return axis === 'lock'
  },
  threshold(value, _key, { filterTaps = false, axis = undefined }) {
    const threshold = V.toVector(value, filterTaps ? 3 : axis ? 1 : 0)
    this.filterTaps = filterTaps
    return threshold
  }
}
