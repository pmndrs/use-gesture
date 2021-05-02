import { registerEngine, WheelEngine, UserWheelConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('wheel', WheelEngine)

/**
 * Wheel hook.
 *
 * @param {Handler<'wheel'>} handler - the function fired every time the wheel gesture updates
 * @param {UserWheelConfig} [config={}] - the config object including generic options and wheel options
 */
export function useWheel<Config extends UserWheelConfig>(handler: Handler<'wheel'>, config: Config | {} = {}) {
  return useRecognizers({ wheel: handler }, config, 'wheel')
}
