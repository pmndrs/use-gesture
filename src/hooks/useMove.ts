import MoveRecognizer from '../recognizers/MoveRecognizer'
import { RecognizersMap } from '../recognizers/Recognizer'
import { UseMoveConfig, Handler } from '../types'
import { buildMoveConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<Config = UseMoveConfig>(handler: Handler<'move'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ move: handler }, buildMoveConfig(config))
}

RecognizersMap.set('move', MoveRecognizer)
