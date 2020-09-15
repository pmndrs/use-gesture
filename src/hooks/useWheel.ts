import '../recognizers/WheelRecognizer'
import { UseWheelConfig, Handler } from '../types'
import { buildWheelConfig } from './buildConfig'
import useRecognizers from './useRecognizers'

/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */
export function useWheel<Config = UseWheelConfig>(handler: Handler<'wheel'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ wheel: handler }, buildWheelConfig(config))
}
