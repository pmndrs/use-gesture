import { def, matchKeysFromObject } from './utils'
import {
  Vector2,
  GenericOptions,
  InternalGenericOptions,
  DragConfig,
  Tuple,
  GestureOptions,
  DragOptions,
  InternalDragOptions,
  InternalGestureOptions,
  CoordinatesConfig,
  CoordinatesOptions,
  InternalCoordinatesOptions,
} from '../types'

const DEFAULT_DRAG_DELAY = 180
const DEFAULT_RUBBERBAND = 0.15

const defaultOptions: GenericOptions = {
  domTarget: undefined,
  eventOptions: { passive: true, capture: false, pointer: false },
  window: typeof window !== 'undefined' ? window : undefined,
  enabled: true,
}

const defaultGestureOptions: GestureOptions = {
  enabled: true,
  threshold: undefined,
  bounds: undefined,
  rubberband: 0,
}

const defaultCoordinatesOptions: CoordinatesOptions = {
  lockDirection: false,
  axis: undefined,
}

const defaultDragOptions: DragOptions = {
  filterClicks: false,
  swipeVelocity: 0.5,
  swipeDistance: 100,
  delay: false,
}
/**
 * @private
 *
 * Returns the internal generic option object.
 *
 * @param {Partial<GenericOptions>} [config={}]
 * @returns {InternalGenericOptions}
 */
export const getInternalGenericOptions = (config: Partial<GenericOptions> = {}): InternalGenericOptions => {
  const { eventOptions: defaultEventOptions, window: defaultWindow, ...restDefault } = defaultOptions
  const { eventOptions, window, ...restConfig } = config
  const { passive, capture, pointer } = { ...defaultEventOptions, ...eventOptions }

  return {
    ...restDefault,
    ...restConfig,
    window: window || defaultWindow,
    // passive is always true if there's no domTarget
    eventOptions: { passive: !config.domTarget || !!passive, capture: !!capture },
    captureString: capture ? 'Capture' : '',
    pointer: !!pointer,
  }
}

const getInternalGestureOptions = (gestureConfig: Partial<GestureOptions>): InternalGestureOptions => {
  const config = { ...defaultGestureOptions, ...gestureConfig }
  let { threshold, bounds, rubberband, enabled } = config

  bounds = bounds || {}

  const boundsArray = [
    [bounds.left || Infinity, bounds!.right || Infinity],
    [bounds.bottom || Infinity, bounds!.top || Infinity],
  ]

  if (typeof rubberband === 'boolean') rubberband = rubberband ? DEFAULT_RUBBERBAND : 0

  return {
    enabled,
    threshold: def.array(threshold) as Vector2,
    bounds: boundsArray as Tuple<Vector2>,
    rubberband: def.array(rubberband) as Vector2,
  }
}

export const getInternalCoordinatesOptions = (
  coordinatesConfig: Partial<CoordinatesConfig>
): InternalCoordinatesOptions => {
  const { axis, lockDirection, ...internalOptions } = coordinatesConfig
  return {
    ...getInternalGestureOptions(internalOptions),
    ...defaultCoordinatesOptions,
    ...matchKeysFromObject({ axis, lockDirection }, coordinatesConfig),
  }
}

export const getInternalDragOptions = (dragConfig: DragConfig = {}): InternalDragOptions => {
  let { enabled, threshold, bounds, rubberband, ...dragOptions } = dragConfig
  let { swipeVelocity, swipeDistance, delay, filterClicks, axis, lockDirection } = {
    ...defaultDragOptions,
    ...dragOptions,
  }

  if (threshold === void 0) {
    threshold = Math.max(0, filterClicks ? 3 : 0, lockDirection || axis ? 1 : 0)
  } else {
    filterClicks = true
  }

  const internalCoordinatesOptions = getInternalCoordinatesOptions(
    matchKeysFromObject({ enabled, threshold, bounds, rubberband, axis, lockDirection }, dragConfig)
  )

  return {
    ...internalCoordinatesOptions,
    filterClicks: filterClicks || internalCoordinatesOptions.threshold[0] + internalCoordinatesOptions.threshold[1] > 0,
    swipeVelocity: def.array(swipeVelocity) as Vector2,
    swipeDistance: def.array(swipeDistance) as Vector2,
    delay: typeof delay === 'number' ? delay : delay ? DEFAULT_DRAG_DELAY : 0,
  }
}
