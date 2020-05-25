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

type Resolver = (x: any, key: string, obj: object) => any;
type ResolverMap = { [k: string]: Resolver | ResolverMap|boolean }

export function resolveWith<T extends { [k: string]: any }, V extends { [k: string]: any }>(config: Partial<T> = {}, resolvers: ResolverMap): V {
  const result: any = {}

  for (const [key, resolver] of Object.entries(resolvers)) switch (typeof resolver) {
    case "function": result[key] = resolver(config[key], key, config); break;
    case "object"  : result[key] = resolveWith(config[key], resolver); break;
    case "boolean" : if (resolver) result[key] = config[key]; break;
  }

  return result;
}



const InternalGestureOptionsNormalizers = {

  threshold(v: number | Vector2 | undefined, _k: string, _p: object): Vector2 {
    return ensureVector(v, 0)
  },

  rubberband(v: number | boolean | Vector2 | undefined, _k: string, _p: object): Vector2 {
    if (Array.isArray(v)) return v
    if (v === true) return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND]
    if (v === undefined || v === false) return [0, 0]
    return [v, v]
  },

  enabled(value = true): boolean {
    return value
  },

  initial(value = [ 0, 0 ] as Vector2): Vector2 {
    return value
  }
}


const InternalCoordinatesOptionsNormalizers = {
  ...InternalGestureOptionsNormalizers,
  axis: true,
  lockDirection(value = false) {
    return value
  }, 
  bounds({ left = -Infinity, right = Infinity, top = -Infinity, bottom = Infinity, } = {}) {
    return [ [left, right], [top, bottom] ]
  }
}


const InternalGenericOptionsNormalizers = {
  enabled(value = true) { 
    return value 
  },
  domTarget: true,
  window(value = defaultWindow) { 
    return value 
  },
  eventOptions({ passive = true, capture = false } = {}) {
    return { passive, capture }
  }
}


const InternalDistanceAngleOptionsNormalizers = {
  ...InternalGestureOptionsNormalizers,

  bounds(_value: undefined, _key: string, { distanceBounds = {}, angleBounds = {} }: any = {}) {
    distanceBounds = assignDefault(distanceBounds, { min: -Infinity, max: Infinity })
    angleBounds    = assignDefault(angleBounds,    { min: -Infinity, max: Infinity })

    return [
      [distanceBounds.min, distanceBounds.max],
      [angleBounds.min, angleBounds.max],
    ]
  }
}




export function getInternalGestureOptions(config: Partial<GestureOptions> = {}): InternalGestureOptions {
  return resolveWith<GestureOptions, InternalGestureOptions>(config, InternalGestureOptionsNormalizers)
}
export function getInternalGenericOptions(config: Partial<GenericOptions> = {}): InternalGenericOptions {
  return resolveWith<GenericOptions, InternalGenericOptions>(config, InternalGenericOptionsNormalizers)
}
export function getInternalCoordinatesOptions(config: CoordinatesConfig = {}): InternalCoordinatesOptions {
  return resolveWith<CoordinatesConfig, InternalCoordinatesOptions>(config, InternalCoordinatesOptionsNormalizers)
}
export function getInternalDistanceAngleOptions(config: DistanceAngleConfig = {}): InternalDistanceAngleOptions {
  return resolveWith<DistanceAngleConfig, InternalDistanceAngleOptions>(config, InternalDistanceAngleOptionsNormalizers)
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
