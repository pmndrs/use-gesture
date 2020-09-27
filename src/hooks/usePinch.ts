import '../recognizers/PinchRecognizer'
import { UsePinchConfig, Handler, EventTypes } from '../types'
import { buildPinchConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<K = EventTypes['pinch']>(handler: Handler<'pinch', K>, config: UsePinchConfig | {} = {}) {
  return useRecognizers<UsePinchConfig>({ pinch: handler }, buildPinchConfig(config))
}
