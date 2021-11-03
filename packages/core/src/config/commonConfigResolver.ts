import { Vector2, State, GenericOptions } from '../types'
import { V } from '../utils/maths'

export const DEFAULT_RUBBERBAND = 0.15

export const commonConfigResolver = {
  enabled(value = true) {
    return value
  },
  preventDefault(value = false) {
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
  },
  transform(value: any, _k: string, config: { shared: GenericOptions }) {
    return value || config.shared.transform
  },
  threshold(value: any) {
    return V.toVector(value, 0)
  }
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(commonConfigResolver, {
    domTarget(value: any) {
      if (value !== undefined) {
        throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`)
      }
    },
    lockDirection(value: any) {
      if (value !== undefined) {
        throw Error(
          `[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``
        )
      }
    },
    initial(value: any) {
      if (value !== undefined) {
        throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`)
      }
    }
  })
}
