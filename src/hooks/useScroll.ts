
import isEqual from "../utils/react-fast-compare"
import memoize from '../utils/memoize-one'

import useRecognizers from './useRecognizers'
import ScrollRecognizer from '../recognizers/ScrollRecognizer'
import { Handler, InternalConfig, UseScrollConfig } from '../types'
import { getInternalGenericOptions, getInternalCoordinatesOptions } from '../utils/config'

const buildScrollConfig = memoize(({ domTarget, eventOptions, window, ...rest }: UseScrollConfig) => ({
  ...getInternalGenericOptions({ domTarget, eventOptions, window }),
  scroll: getInternalCoordinatesOptions(rest),
}) as InternalConfig, isEqual)

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */
export function useScroll(handler: Handler<'scroll'>, config: UseScrollConfig | {} = {}) {
  return useRecognizers<UseScrollConfig>({ scroll: handler }, [ScrollRecognizer], buildScrollConfig(config))
}
