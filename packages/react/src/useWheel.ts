import { registerEngine, WheelEngine, UserWheelConfig, Handler, EventTypes } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('wheel', WheelEngine)

/**
 * Wheel hook.
 *
 * @param {Handler<'wheel'>} handler - the function fired every time the wheel gesture updates
 * @param {UserWheelConfig} [config={}] - the config object including generic options and wheel options
 */
export function useWheel<EventType = EventTypes['wheel'], Config = UserWheelConfig>(
  handler: Handler<'wheel', EventType>,
  config: Config | {} = {}
) {
  return useRecognizers({ wheel: handler }, config, 'wheel')
}
