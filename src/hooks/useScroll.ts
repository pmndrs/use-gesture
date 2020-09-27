import '../recognizers/ScrollRecognizer'
import { UseScrollConfig, Handler, EventTypes } from '../types'
import { buildScrollConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */
export function useScroll<K = EventTypes['scroll']>(handler: Handler<'scroll', K>, config: UseScrollConfig | {} = {}) {
  return useRecognizers<UseScrollConfig>({ scroll: handler }, buildScrollConfig(config))
}
