import { Vector2, State } from '../types'
import { V } from '../utils/maths'

export const DEFAULT_RUBBERBAND = 0.15

export const commonConfigResolver = {
  enabled(value = true) {
    return value
  },
  triggerAllEvents(value = false) {
    return value
  },
  rubberband(value: number | boolean | Vector2 = 0): Vector2 {
    switch (value) {
      case true:
        return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND]
      case false:
        return [0, 0]
      default:
        return V.toVector(value)
    }
  },
  from(value: number | Vector2 | ((s: State) => Vector2)) {
    if (typeof value === 'function') return value
    // eslint-disable-next-line eqeqeq
    if (value != null) return V.toVector(value)
  }
}
