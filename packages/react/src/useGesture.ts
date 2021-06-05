import { dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction } from '@use-gesture/core/actions'
import { GestureHandlers, UserGestureConfig } from '@use-gesture/core/types'
import { createUseGesture } from './createUseGesture'

/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {GestureHandlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 */
export function useGesture<Config extends UserGestureConfig = UserGestureConfig>(
  handlers: GestureHandlers,
  config: Config | {} = {}
) {
  const hook = createUseGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction])
  return hook(handlers, config)
}
