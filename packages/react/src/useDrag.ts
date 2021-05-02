import { registerEngine, DragEngine, Handler, UserDragConfig } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)

/**
 * Drag hook.
 *
 * @param {Handler<'drag'>} handler - the function fired every time the drag gesture updates
 * @param {UserDragConfig} [config={}] - the config object including generic options and drag options
 */
export function useDrag<Config extends UserDragConfig>(handler: Handler<'drag'>, config: Config | {} = {}) {
  return useRecognizers({ drag: handler }, config, 'drag')
}
