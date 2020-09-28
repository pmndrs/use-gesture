import { UseScrollConfig, Handler, EventTypes } from '../types'
import { buildScrollConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { ScrollRecognizer } from '../recognizers/ScrollRecognizer'

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */
export function useScroll<K = EventTypes['scroll']>(handler: Handler<'scroll', K>, config: UseScrollConfig | {} = {}) {
  RecognizersMap.set('scroll', ScrollRecognizer)
  return useRecognizers<UseScrollConfig>({ scroll: handler }, buildScrollConfig(config))
}