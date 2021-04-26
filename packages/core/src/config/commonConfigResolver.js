import { V } from '../utils/maths'

export const commonConfigResolver = {
  enabled(value = true) {
    return value
  },
  threshold(value = 0) {
    return V.toVector(value)
  },
  from(value) {
    if (typeof value === 'function') return value
    // eslint-disable-next-line eqeqeq
    if (value != null) return V.toVector(value)
  }
}
