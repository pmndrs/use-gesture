import { registerEngine, DragEngine, dragConfigResolver } from '@use-gesture/core'
import { EventTypes, Handler, UserDragConfig } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

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
  registerEngine('drag', DragEngine, dragConfigResolver)
  return useRecognizers({ drag: handler }, config, 'drag')
}
