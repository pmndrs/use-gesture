import { registerEngine, MoveEngine, UserMoveConfig, Handler, EventTypes } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('move', MoveEngine)

/**
 * Move hook.
 *
 * @param {Handler<'move'>} handler - the function fired every time the move gesture updates
 * @param {UserMoveConfig} [config={}] - the config object including generic options and move options
 */
export function useMove<EventType = EventTypes['move'], Config = UserMoveConfig>(
  handler: Handler<'move', EventType>,
  config: Config | {} = {}
) {
  return useRecognizers({ move: handler }, config, 'move')
}
