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
export function useMove(handler: Handler<'move'>, config: UseMoveConfig | {} = {}) {
  const handlers = { move: handler }
  const classes = [MoveRecognizer]
  const options = buildMoveConfig(config)

  return useRecognizers<UseMoveConfig>(handlers, classes, options)
}
