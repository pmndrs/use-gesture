import { UseScrollConfig, Handler, EventTypes } from '../types'
import { _buildScrollConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { ScrollRecognizer } from '../recognizers/ScrollRecognizer'
import memoize from '../utils/memoize-one'
import isEqual from '../utils/react-fast-compare'
import { useRef } from 'react'

/**
 * Scroll hook.
 *
 * @param handler - the function fired every time the scroll gesture updates
 * @param [config={}] - the config object including generic options and scroll options
 */
export function useScroll<K = EventTypes['scroll']>(handler: Handler<'scroll', K>, config: UseScrollConfig | {} = {}) {
  RecognizersMap.set('scroll', ScrollRecognizer)
  const buildScrollConfig = useRef<any>()
  if (!buildScrollConfig.current) {
    buildScrollConfig.current = memoize(_buildScrollConfig, isEqual)
  }
  return useRecognizers<UseScrollConfig>({ scroll: handler }, buildScrollConfig.current(config))
}
