import { ensureVector, assignDefault } from './utils'
import { resolveWith } from './resolveOptionsWith'

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


const InternalGestureOptionsNormalizers = {

  threshold(v: number | Vector2 = 0, _k: string, _p: object) {
    return ensureVector(v)
  },

  rubberband(v: number | boolean | Vector2 = 0): Vector2 {
    if (v === true)  v = DEFAULT_RUBBERBAND;
    if (v === false) v = 0;
    return ensureVector(v)
  },

  enabled(value = true) { return value },
  initial(value = 0) {
    if (typeof value === "function") return value;
    return ensureVector(value)
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
  window(value = typeof window !== 'undefined' ? window : undefined) { 
    return value 
  },
  eventOptions({ passive = true, capture = false } = {}) {
    return { passive, capture }
  }
}


const InternalDistanceAngleOptionsNormalizers = {
  ...InternalGestureOptionsNormalizers,

  bounds(_value: undefined, _key: string, { distanceBounds = {}, angleBounds = {} }: any = {}) {
    const D = assignDefault(distanceBounds, { min: -Infinity, max: Infinity })
    const A = assignDefault(angleBounds,    { min: -Infinity, max: Infinity })
    return [[D.min, D.max], [A.min, A.max]]
  }
}

const InternalDragOptionsNormalizers = {
    
  ...InternalCoordinatesOptionsNormalizers,

  threshold(this: any, v: number | Vector2 | undefined, _k: string, { filterTaps = false, lockDirection = false, axis = undefined  }: any) {
    const A = ensureVector(v, filterTaps ? 3 : lockDirection ? 1 : axis ? 1 : 0) as Vector2;
    this.filterTaps = filterTaps || (A[0] + A[1] > 0)
    return A
  },

  swipeVelocity(v: number | Vector2 = DEFAULT_SWIPE_VELOCITY) { return ensureVector(v) },
  swipeDistance(v: number | Vector2 = DEFAULT_SWIPE_DISTANCE) { return ensureVector(v) },

  delay(value: number|boolean = 0) {
    switch (value) {
      case true : return DEFAULT_DRAG_DELAY;
      case false: return 0;
      default: return value
    }
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
export function getInternalDragOptions(config: DragConfig = {}): InternalDragOptions {
  return resolveWith<DragConfig, InternalDragOptions>(config, InternalDragOptionsNormalizers)
}