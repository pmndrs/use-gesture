import { UseMoveConfig, Handler, EventTypes } from '../types'
import { buildMoveConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { MoveRecognizer } from '../recognizers/MoveRecognizer'

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<K = EventTypes['move']>(handler: Handler<'move', K>, config: UseMoveConfig | {} = {}) {
  RecognizersMap.set('move', MoveRecognizer)
  
  return useRecognizers<UseMoveConfig>({ move: handler }, buildMoveConfig(config))
}
