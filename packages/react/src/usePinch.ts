import { registerEngine, PinchEngine, UserPinchConfig, Handler, EventTypes } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('pinch', PinchEngine)

/**
 * Pinch hook.
 *
 * @param {Handler<'pinch'>} handler - the function fired every time the pinch gesture updates
 * @param {UserPinchConfig} [config={}] - the config object including generic options and pinch options
 */
export function usePinch<EventType = EventTypes['pinch'], Config = UserPinchConfig>(
  handler: Handler<'pinch', EventType>,
  config: Config | {} = {}
) {
  return useRecognizers({ pinch: handler }, config, 'pinch')
}
