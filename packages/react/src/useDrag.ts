import { registerEngine, DragEngine, Handler, UserDragConfig, EventTypes } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)

/**
 * Drag hook.
 *
 * @param {Handler<'drag'>} handler - the function fired every time the drag gesture updates
 * @param {UserDragConfig} [config={}] - the config object including generic options and drag options
 */
export function useDrag<EventType = EventTypes['drag'], Config = UserDragConfig>(
  handler: Handler<'drag', EventType>,
  config: Config | {} = {}
) {
  return useRecognizers({ drag: handler }, config, 'drag')
}
