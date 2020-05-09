import useRecognizers from './useRecognizers'
import {
  Handler,
  UseDragConfig,
  UseHoverConfig,
  UseScrollConfig,
  UseWheelConfig,
  UseMoveConfig,
  UsePinchConfig,
} from '../types'
import {
  buildDragConfig,
  buildHoverConfig,
  buildScrollConfig,
  buildWheelConfig,
  buildMoveConfig,
  buildPinchConfig,
} from './buildConfig'
/**
 * Drag hook.
 *
 * @param handler - the function fired every time the drag gesture updates
 * @param [config={}] - the config object including generic options and drag options
 */
export function useDrag<Config = UseDragConfig>(handler: Handler<'drag'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ drag: handler }, buildDragConfig(config))
}

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover<Config = UseHoverConfig>(handler: Handler<'hover'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ hover: handler }, buildHoverConfig(config))
}

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<Config = UsePinchConfig>(handler: Handler<'pinch'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ pinch: handler }, buildPinchConfig(config))
}

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */
export function useScroll<Config = UseScrollConfig>(handler: Handler<'scroll'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ scroll: handler }, buildScrollConfig(config))
}

/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */
export function useWheel<Config = UseWheelConfig>(handler: Handler<'wheel'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ wheel: handler }, buildWheelConfig(config))
}

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<Config = UseMoveConfig>(handler: Handler<'move'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ move: handler }, buildMoveConfig(config))
}

export { useGesture } from './useGesture'
