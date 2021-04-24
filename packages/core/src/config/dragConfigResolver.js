import { V } from '../utils/maths'
import { commonConfigResolver } from './commonConfigResolver'
import { SUPPORT } from './support'

export const dragConfigResolver = {
  ...commonConfigResolver,
  lock(value = false) {
    return SUPPORT.lock && value
  },
  touch(value = false) {
    return SUPPORT.touch && value
  },
  r3f(value = false) {
    return value
  },
  device() {
    if (this.r3f) return 'pointer'
    if (this.touch) return 'touch'
    if (this.lock) return 'mouse'
    if (SUPPORT.pointer) return 'pointer'
    if (SUPPORT.touch) return 'touch'
    return 'mouse'
  },
  capture(value = true) {
    return !this.lock && this.device === 'pointer' && value
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
  threshold(value = [0, 0]) {
    return V.toVector(value)
  }
}
