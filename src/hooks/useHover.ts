import { Handler, UseHoverConfig, EventTypes } from '../types'
import { buildHoverConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { MoveRecognizer } from '../recognizers/MoveRecognizer'

/**
 * Hover hook.
 *
 * @param handler - the function fired every time the hover gesture updates
 * @param [config={}] - the config object including generic options and hover options
 */
export function useHover<K = EventTypes['hover']>(handler: Handler<'hover', K>, config: UseHoverConfig | {} = {}) {
  RecognizersMap.set('hover', MoveRecognizer)
  return useRecognizers<UseHoverConfig>({ hover: handler }, buildHoverConfig(config))
}
