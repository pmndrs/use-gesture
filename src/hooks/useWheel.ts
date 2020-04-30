import useRecognizers from './useRecognizers'
import WheelRecognizer from '../recognizers/WheelRecognizer'
import { Handler, UseWheelConfig } from '../types'
import { buildWheelConfig } from './buildConfig'

/**
 * Wheel hook.
 *
 * @param handler - the function fired every time the wheel gesture updates
 * @param the config object including generic options and wheel options
 */
export function useWheel<Config = UseWheelConfig>(handler: Handler<'wheel'>, config: Config | {} = {}) {
  return useRecognizers<Config>({ wheel: handler }, [WheelRecognizer], buildWheelConfig(config))
}
