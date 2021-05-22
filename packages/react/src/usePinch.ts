import { registerEngine, PinchEngine, pinchConfigResolver } from '@use-gesture/core'
import { UserPinchConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

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
  registerEngine('pinch', PinchEngine, pinchConfigResolver)
  return useRecognizers({ pinch: handler }, config, 'pinch')
}
