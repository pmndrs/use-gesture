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
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const move = getInternalCoordinatesOptions(rest)
  const options: InternalConfig = { ...opts, move }
  return options
}

function _buildHoverConfig({ domTarget, eventOptions, window, ...rest }: UseHoverConfig) {
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const hover = { enabled: true, ...rest }
  return { ...opts, hover } as InternalConfig
}

function _buildDragConfig({ domTarget, eventOptions, window, ...rest }: UseDragConfig) {
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const drag = getInternalDragOptions(rest)
  const options: InternalConfig = { ...opts, drag }
  return options
}

function _buildPinchConfig({ domTarget, eventOptions, window, ...rest }: UsePinchConfig) {
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const pinch = getInternalDistanceAngleOptions(rest)
  const options: InternalConfig = { ...opts, pinch }
  return options
}

function _buildScrollConfig({ domTarget, eventOptions, window, ...rest }: UseScrollConfig) {
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const scroll = getInternalCoordinatesOptions(rest)
  const options: InternalConfig = { ...opts, scroll }
  return options
}

function _buildWheelConfig({ domTarget, eventOptions, window, ...rest }: UseWheelConfig) {
  const opts = getInternalGenericOptions({ domTarget, eventOptions, window })
  const wheel = getInternalCoordinatesOptions(rest)
  const options: InternalConfig = { ...opts, wheel }
  return options
}

export const buildMoveConfig = memoize(_buildMoveConfig, isEqual)
export const buildHoverConfig = memoize(_buildHoverConfig, isEqual)
export const buildDragConfig = memoize(_buildDragConfig, isEqual)
export const buildPinchConfig = memoize(_buildPinchConfig, isEqual)
export const buildScrollConfig = memoize(_buildScrollConfig, isEqual)
export const buildWheelConfig = memoize(_buildWheelConfig, isEqual)
