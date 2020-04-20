import { ensureVector, withDefault, matchKeysFromObject } from './utils'
import {
  Vector2,
  GenericOptions,
  InternalGenericOptions,
  DragConfig,
  GestureOptions,
  InternalDragOptions,
  InternalGestureOptions,
  CoordinatesConfig,
  CoordinatesOptions,
  InternalCoordinatesOptions,
  DistanceAngleConfig,
  InternalDistanceAngleOptions,
} from '../types'

const DEFAULT_DRAG_DELAY = 180
const DEFAULT_RUBBERBAND = 0.15
const DEFAULT_SWIPE_VELOCITY = 0.5
const DEFAULT_SWIPE_DISTANCE = 60

const defaultWindow = typeof window !== 'undefined' ? window : undefined

const defaultCoordinatesOptions: CoordinatesOptions = {
  lockDirection: false,
  axis: undefined,
  bounds: undefined,
}

/**
 * @private
 *
 * Returns the internal generic option object.
 *
 * @param {Partial<GenericOptions>} [config={}]
 * @returns {InternalGenericOptions}
 */
export function getInternalGenericOptions(config: Partial<GenericOptions> = {}): InternalGenericOptions {
  let {
    eventOptions: { passive = true, capture = false, pointer = false } = {},
    window = defaultWindow,
    domTarget = undefined,
    enabled = true,
    ...restConfig
  } = config

  return {
    ...restConfig,
    enabled,
    domTarget,
    window,
    // passive is always true if there's no domTarget
    eventOptions: { passive: !domTarget || !!passive, capture: !!capture },
    captureString: capture ? 'Capture' : '',
    pointer: !!pointer,
  }
}

export function getInternalGestureOptions(gestureConfig: Partial<GestureOptions>): InternalGestureOptions {
  let { threshold = undefined, rubberband = 0, enabled = true, initial = [0, 0] } = gestureConfig

  if (typeof rubberband === 'boolean') rubberband = rubberband ? DEFAULT_RUBBERBAND : 0
  if (threshold === void 0) threshold = 0

  return {
    enabled,
    initial,
    threshold: ensureVector(threshold),
    rubberband: ensureVector(rubberband),
  }
}

export function getInternalCoordinatesOptions(coordinatesConfig: CoordinatesConfig = {}): InternalCoordinatesOptions {
  const { axis, lockDirection, bounds = {}, ...internalOptions } = coordinatesConfig

  const boundsArray = [
    [withDefault(bounds.left, -Infinity), withDefault(bounds.right, Infinity)],
    [withDefault(bounds.top, -Infinity), withDefault(bounds.bottom, Infinity)],
  ]

  return {
    ...getInternalGestureOptions(internalOptions),
    ...defaultCoordinatesOptions,
    ...matchKeysFromObject({ axis, lockDirection }, coordinatesConfig),
    bounds: boundsArray as [ Vector2, Vector2 ],
  }
}

export function getInternalDistanceAngleOptions(
  distanceAngleConfig: DistanceAngleConfig = {}
): InternalDistanceAngleOptions {
  const { distanceBounds = {}, angleBounds = {}, ...internalOptions } = distanceAngleConfig

  const boundsArray = [
    [withDefault(distanceBounds.min, -Infinity), withDefault(distanceBounds.max, Infinity)],
    [withDefault(angleBounds.min, -Infinity), withDefault(angleBounds.max, Infinity)],
  ]

  return {
    ...getInternalGestureOptions(internalOptions),
    bounds: boundsArray as [ Vector2, Vector2 ],
  }
}

export function getInternalDragOptions(dragConfig: DragConfig = {}): InternalDragOptions {
  let { enabled, threshold, bounds, rubberband, initial, ...dragOptions } = dragConfig
  let {
    swipeVelocity = DEFAULT_SWIPE_VELOCITY,
    swipeDistance = DEFAULT_SWIPE_DISTANCE,
    delay = 0,
    filterTaps = false,
    axis,
    lockDirection,
  } = dragOptions

  if (delay === true)  delay = DEFAULT_DRAG_DELAY
  if (delay === false) delay = 0

  if (threshold === undefined) {
    threshold = Math.max(0, filterTaps ? 3 : 0, lockDirection || axis ? 1 : 0)
  } else {
    filterTaps = true
  }

  const internalCoordinatesOptions = getInternalCoordinatesOptions(
    matchKeysFromObject({ enabled, threshold, bounds, rubberband, axis, lockDirection, initial }, dragConfig)
  )
  

  return {
    ...internalCoordinatesOptions,
    filterTaps: filterTaps || internalCoordinatesOptions.threshold[0] + internalCoordinatesOptions.threshold[1] > 0,
    swipeVelocity: ensureVector(swipeVelocity),
    swipeDistance: ensureVector(swipeDistance),
    delay,
  }
}
