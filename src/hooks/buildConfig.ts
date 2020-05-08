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

function _buildMoveConfig({ domTarget, eventOptions, window, ...rest }: UseMoveConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.move = getInternalCoordinatesOptions(rest)
  return opts
}

function _buildHoverConfig({ domTarget, eventOptions, window, ...rest }: UseHoverConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.hover = { enabled: true, ...rest }
  return opts
}

function _buildDragConfig({ domTarget, eventOptions, window, ...rest }: UseDragConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.drag = getInternalDragOptions(rest)
  return opts
}

function _buildPinchConfig({ domTarget, eventOptions, window, ...rest }: UsePinchConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.pinch = getInternalDistanceAngleOptions(rest)
  return opts
}

function _buildScrollConfig({ domTarget, eventOptions, window, ...rest }: UseScrollConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.scroll = getInternalCoordinatesOptions(rest)
  return opts
}

function _buildWheelConfig({ domTarget, eventOptions, window, ...rest }: UseWheelConfig) {
  const opts: InternalConfig = getInternalGenericOptions({ domTarget, eventOptions, window })
  opts.wheel = getInternalCoordinatesOptions(rest)
  return opts
}

export const buildMoveConfig = memoize(_buildMoveConfig, isEqual)
export const buildHoverConfig = memoize(_buildHoverConfig, isEqual)
export const buildDragConfig = memoize(_buildDragConfig, isEqual)
export const buildPinchConfig = memoize(_buildPinchConfig, isEqual)
export const buildScrollConfig = memoize(_buildScrollConfig, isEqual)
export const buildWheelConfig = memoize(_buildWheelConfig, isEqual)
