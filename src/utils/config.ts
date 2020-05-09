import { ensureVector, assignDefault } from './utils'
import {
  GenericOptions,
  InternalGenericOptions,
  DragConfig,
  GestureOptions,
  InternalDragOptions,
  InternalGestureOptions,
  CoordinatesConfig,
  InternalCoordinatesOptions,
  DistanceAngleConfig,
  InternalDistanceAngleOptions,
  Vector2,
} from '../types'

export const DEFAULT_DRAG_DELAY = 180
export const DEFAULT_RUBBERBAND = 0.15
export const DEFAULT_SWIPE_VELOCITY = 0.5
export const DEFAULT_SWIPE_DISTANCE = 60

const defaultWindow = typeof window !== 'undefined' ? window : undefined

export function resolveWith<T extends { [k: string]: any }, V extends { [k: string]: any }>(resolvers: { [k: string]: (x: any, key: string, obj: object) => any }, config: Partial<T> = {}): V {
  const result: any = {}
  for (let key in resolvers) {
    const provided = config[key]
    const resolver = resolvers[key]
    result[key] = resolver(provided, key, result)
  }
  return result;
}



const InternalGestureOptionsNormalizers =  {

  threshold(v: number|Vector2|undefined, _k: string, _p: object): Vector2 {
    return ensureVector(v, 0)
  }, 

  rubberband(v: number|boolean|Vector2|undefined, _k: string, _p: object): Vector2 {
    if (Array.isArray(v)) return v
    if (v === true ) return [ DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND ]
    if (v === undefined || v === false) return [ 0, 0 ]
    return [ v, v ]
  },

  enabled(v: boolean|undefined, _k: string, _p: object): boolean {
    if (v === undefined) return true
    return v
  },

  initial(v: Vector2|undefined, _k: string, _p: object): Vector2 {
    if (v === undefined) return [0, 0]
    return v
  }

}

const InternalGenericOptionsNormalizers =  {

  enabled(v: boolean|undefined, _k: string, _p: object) {
    if (v === undefined) return true
    return v
  },

  domTarget(v: any, _k: string, _p: object) {
    return v
  },

  window(v: any, _k: string, _p: object) {
    if (v) return v
    return defaultWindow
  },

  eventOptions(v: any, _k: string, _p: object) {
    if (!v) return { passive: true, capture: false }
    const { passive = true, capture = false }  = v;
    return { passive, capture }
  },

}



export function getInternalGestureOptions(config: Partial<GestureOptions> = {}): InternalGestureOptions {
  return resolveWith<GestureOptions, InternalGestureOptions>(InternalGestureOptionsNormalizers, config)
}

/**
 * @private
 *
 * Returns the internal generic option object.
 */
export function getInternalGenericOptions(config: Partial<GenericOptions> = {}): InternalGenericOptions {
  return resolveWith<GenericOptions, InternalGenericOptions>(InternalGenericOptionsNormalizers, config)
}

export function getInternalCoordinatesOptions(coordinatesConfig: CoordinatesConfig = {}): InternalCoordinatesOptions {
  let { axis, lockDirection = false, threshold, rubberband, enabled, initial } = coordinatesConfig

  const bounds = assignDefault(coordinatesConfig.bounds, {
    left: -Infinity,
    right: Infinity,
    top: -Infinity,
    bottom: Infinity,
  })

  return {
    ...getInternalGestureOptions({ threshold, rubberband, enabled, initial }),
    lockDirection,
    axis,
    bounds: [
      [bounds.left, bounds.right],
      [bounds.top, bounds.bottom],
    ],
  }
}

export function getInternalDistanceAngleOptions(config: DistanceAngleConfig = {}): InternalDistanceAngleOptions {
  const { threshold, rubberband, enabled, initial } = config

  const distanceBounds = assignDefault(config.distanceBounds, {
    min: -Infinity,
    max: Infinity,
  })

  const angleBounds = assignDefault(config.angleBounds, {
    min: -Infinity,
    max: Infinity,
  })

  return {
    ...getInternalGestureOptions({ threshold, rubberband, enabled, initial }),
    bounds: [
      [distanceBounds.min, distanceBounds.max],
      [angleBounds.min, angleBounds.max],
    ],
  }
}

export function getInternalDragOptions(dragConfig: DragConfig = {}): InternalDragOptions {
  let {
    enabled,
    threshold,
    bounds,
    rubberband,
    initial,
    swipeVelocity = DEFAULT_SWIPE_VELOCITY,
    swipeDistance = DEFAULT_SWIPE_DISTANCE,
    delay = false,
    filterTaps = false,
    axis,
    lockDirection,
  } = dragConfig

  if (delay === true) delay = DEFAULT_DRAG_DELAY
  if (delay === false) delay = 0

  if (threshold === undefined) {
    threshold = Math.max(0, filterTaps ? 3 : 0, lockDirection || axis ? 1 : 0)
  } else {
    filterTaps = true
  }

  const internalCoordinatesOptions = getInternalCoordinatesOptions({
    enabled,
    threshold,
    bounds,
    rubberband,
    axis,
    lockDirection,
    initial,
  })

  return {
    ...internalCoordinatesOptions,
    filterTaps: filterTaps || internalCoordinatesOptions.threshold[0] + internalCoordinatesOptions.threshold[1] > 0,
    swipeVelocity: ensureVector(swipeVelocity),
    swipeDistance: ensureVector(swipeDistance),
    delay,
  }
}
