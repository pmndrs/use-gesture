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
} from '../types'

export const DEFAULT_DRAG_DELAY = 180
export const DEFAULT_RUBBERBAND = 0.15
export const DEFAULT_SWIPE_VELOCITY = 0.5
export const DEFAULT_SWIPE_DISTANCE = 60

const defaultWindow = typeof window !== 'undefined' ? window : undefined

export function getInternalGestureOptions(gestureConfig: Partial<GestureOptions>): InternalGestureOptions {
  let { threshold, rubberband, enabled = true, initial = [0, 0] } = gestureConfig

  if (typeof rubberband === 'boolean') rubberband = rubberband ? DEFAULT_RUBBERBAND : 0

  return {
    enabled,
    initial,
    threshold: ensureVector(threshold, 0),
    rubberband: ensureVector(rubberband, 0),
  }
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
    eventOptions: { passive = true, capture = false } = {},
    window = defaultWindow,
    domTarget = undefined,
    enabled = true,
  } = config

  return {
    enabled,
    domTarget,
    window,
    // passive is always true if there's no domTarget
    eventOptions: { passive: !domTarget || !!passive, capture: !!capture },
    captureString: capture ? 'Capture' : '',
  }
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
