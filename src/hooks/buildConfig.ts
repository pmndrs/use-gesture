import isEqual from '../utils/react-fast-compare'
import memoize from '../utils/memoize-one'

import {
  InternalConfig,
  UseMoveConfig,
  UseHoverConfig,
  UseDragConfig,
  UsePinchConfig,
  UseScrollConfig,
  UseWheelConfig,
} from '../types'

import {
  getInternalGenericOptions,
  getInternalCoordinatesOptions,
  getInternalDragOptions,
  getInternalDistanceAngleOptions,
} from '../utils/config'

import { UseGestureConfig } from '../types'

function _buildMoveConfig({ domTarget, eventOptions, window, enabled, ...rest }: UseMoveConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.move = getInternalCoordinatesOptions(rest)
  return opts
}

function _buildHoverConfig({ domTarget, eventOptions, window, enabled, ...rest }: UseHoverConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.hover = { enabled: true, ...rest }
  return opts
}

function _buildDragConfig({ domTarget, eventOptions, window, enabled, ...rest }: UseDragConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.drag = getInternalDragOptions(rest)
  return opts
}

function _buildPinchConfig({ domTarget, eventOptions, window, enabled, ...rest }: UsePinchConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.pinch = getInternalDistanceAngleOptions(rest)
  return opts
}

function _buildScrollConfig({ domTarget, eventOptions, window, enabled, ...rest }: UseScrollConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.scroll = getInternalCoordinatesOptions(rest)
  return opts
}

function _buildWheelConfig({ domTarget, eventOptions, window, enabled, ...rest }: UseWheelConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window, enabled })
  opts.wheel = getInternalCoordinatesOptions(rest)
  return opts
}

export const buildMoveConfig = memoize(_buildMoveConfig, isEqual)
export const buildHoverConfig = memoize(_buildHoverConfig, isEqual)
export const buildDragConfig = memoize(_buildDragConfig, isEqual)
export const buildPinchConfig = memoize(_buildPinchConfig, isEqual)
export const buildScrollConfig = memoize(_buildScrollConfig, isEqual)
export const buildWheelConfig = memoize(_buildWheelConfig, isEqual)

export function buildComplexConfig(config: UseGestureConfig = {}, actions: Set<string> = new Set()) {
  const { drag, wheel, move, scroll, pinch, hover, eventOptions, window, domTarget, enabled } = config

  const mergedConfig: InternalConfig = getInternalGenericOptions({ eventOptions, window, domTarget, enabled })

  if (actions.has('onDrag')) mergedConfig.drag = getInternalDragOptions(drag)
  if (actions.has('onWheel')) mergedConfig.wheel = getInternalCoordinatesOptions(wheel)
  if (actions.has('onScroll')) mergedConfig.scroll = getInternalCoordinatesOptions(scroll)
  if (actions.has('onMove')) mergedConfig.move = getInternalCoordinatesOptions(move)
  if (actions.has('onPinch')) mergedConfig.pinch = getInternalDistanceAngleOptions(pinch)
  if (actions.has('onHover')) mergedConfig.hover = { enabled: true, ...hover }

  return mergedConfig
}
