import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, UseMoveConfig } from '../types'
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
export function useMove(handler: Handler<'move'>, config: UseMoveConfig | {} = {}) {
  return useRecognizers<UseMoveConfig>({ move: handler }, [MoveRecognizer], buildConfig(config))
}
