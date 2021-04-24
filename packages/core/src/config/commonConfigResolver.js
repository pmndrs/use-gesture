import { V } from '../utils/maths'

export const commonConfigResolver = {
  enabled(value = true) {
    return value
  },
  threshold(value = 0) {
    return V.toVector(value)
  }
}
