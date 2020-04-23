import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import MoveRecognizer from '../recognizers/MoveRecognizer'
import { Handler, InternalConfig, UseHoverConfig } from '../types'
import { getInternalGenericOptions } from '../utils/config'

const buildConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseHoverConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  hover: { enabled: true, ...rest }
}) as InternalConfig, isEqual)


/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover(handler: Handler<'hover'>, config: UseHoverConfig | {} = {}) {
  return useRecognizers<UseHoverConfig>({ hover: handler }, [MoveRecognizer], buildConfig(config))
}
