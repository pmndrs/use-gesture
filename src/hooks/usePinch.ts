import { UsePinchConfig, Handler, EventTypes } from '../types'
import { buildPinchConfig } from './buildConfig'
import useRecognizers from './useRecognizers'
import { RecognizersMap } from '../recognizers/Recognizer'
import { PinchRecognizer } from '../recognizers/PinchRecognizer'

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<K = EventTypes['pinch']>(handler: Handler<'pinch', K>, config: UsePinchConfig | {} = {}) {
  RecognizersMap.set('pinch', PinchRecognizer)

  return useRecognizers<UsePinchConfig>({ pinch: handler }, buildPinchConfig(config))
}
