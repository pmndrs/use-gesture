import { registerEngine, MoveEngine, UserMoveConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('move', MoveEngine)

/**
 * Move hook.
 *
 * @param {Handler<'move'>} handler - the function fired every time the move gesture updates
 * @param {UserMoveConfig} [config={}] - the config object including generic options and move options
 */
export function useMove<Config extends UserMoveConfig>(handler: Handler<'move'>, config: Config | {} = {}) {
  return useRecognizers({ move: handler }, config, 'move')
}
