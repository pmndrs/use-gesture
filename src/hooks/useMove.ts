import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, UseMoveConfig } from '../types'
import { buildMoveConfig } from './buildConfig'

/**
 * Move hook.
 *
 * @param handler - the function fired every time the move gesture updates
 * @param [config={}] - the config object including generic options and move options
 */
export function useMove<Config = UseMoveConfig>(handler: Handler<'move'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ move: handler }, [MoveRecognizer], buildMoveConfig(config))
}
