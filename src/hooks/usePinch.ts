import PinchRecognizer from '../recognizers/PinchRecognizer'
import { RecognizersMap } from '../recognizers/Recognizer'
import { UsePinchConfig, Handler } from '../types'
import { buildPinchConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<Config = UsePinchConfig>(handler: Handler<'pinch'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ pinch: handler }, buildPinchConfig(config))
}

RecognizersMap.set('pinch', PinchRecognizer)
