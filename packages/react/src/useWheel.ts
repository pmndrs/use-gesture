import { registerEngine, WheelEngine, wheelConfigResolver } from '@use-gesture/core'
import { UserWheelConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

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
  registerEngine('wheel', WheelEngine, wheelConfigResolver)
  return useRecognizers({ wheel: handler }, config, 'wheel')
}
