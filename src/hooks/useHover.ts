import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, HookReturnType, UseHoverConfig } from '../types'
import { getInternalGenericOptions } from '../utils/config'

const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseHoverConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  hover: { enabled: true, ...rest }
}) as InternalConfig, isEqual)


/**
 * @public
 *
 * Hover hook.
 *
 * @param {Handler<'hover'>} handler - the function fired every time the hover gesture updates
 * @param {(Config | {})} [config={}] - the config object including generic options and hover options
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export function useHover<Config extends UseHoverConfig>(
  handler: Handler<'hover'>,
  config: Config | {} = {}
): (...args: any[]) => HookReturnType<Config> {
  return useRecognizers<Config>({ hover: handler }, [MoveRecognizer], buildConfig(config))
}
