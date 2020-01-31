import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, HookReturnType, UseMoveConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'

/**
 * @public
 *
 * Move hook.
 *
 * @param {Handler<'move'>} handler - the function fired every time the move gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and move options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useMove<Config extends UseMoveConfig>(
  handler: Handler<'move'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  const { domTarget, eventOptions, window, ...move } = config as UseMoveConfig

  /**
   * TODO: at the moment we recompute the config object at every render
   * this could probably be optimized
   */
  const mergedConfig: InternalConfig = {
    ...getInternalGenericOptions({
      domTarget,
      eventOptions,
      window,
    }),
    move: getInternalCoordinatesOptions(move),
  }

  return useRecognizers<Config>({ move: handler }, [MoveRecognizer], mergedConfig)
}
