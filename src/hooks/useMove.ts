import '../recognizers/MoveRecognizer'
import { UseMoveConfig, Handler, EventTypes } from '../types'
import { buildMoveConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<K = EventTypes['move']>(handler: Handler<'move', K>, config: UseMoveConfig | {} = {}) {
  return useRecognizers<UseMoveConfig>({ move: handler }, buildMoveConfig(config))
}
