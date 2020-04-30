import useRecognizers from './useRecognizers'
import PinchRecognizer from '../recognizers/PinchRecognizer'
import { Handler, UsePinchConfig } from '../types'
import { buildPinchConfig } from './buildConfig'

/**
 * Pinch hook.
 *
 * @param handler - the function fired every time the pinch gesture updates
 * @param [config={}] - the config object including generic options and pinch options
 */
export function usePinch<Config = UsePinchConfig>(handler: Handler<'pinch'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ pinch: handler }, [PinchRecognizer], buildPinchConfig(config))
}
