import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, HookReturnType, UseMoveConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'

const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseMoveConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  move: getInternalCoordinatesOptions(rest),
}) as InternalConfig, isEqual)

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
  return useRecognizers<Config>({ move: handler }, [MoveRecognizer], buildConfig(config))
}
