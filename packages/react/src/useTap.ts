import { registerAction, tapAction } from '@use-gesture/core/actions'
import { EventTypes, UserTapConfig, Handler } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

/**
 * Tap hook.
 *
 * @param {Handler<'tap'>} handler - the function fired every time the tap gesture updates
 * @param {UserTapConfig} config - the config object including generic options and tap options
 */
export function useTap<EventType = EventTypes['tap'], Config extends UserTapConfig = UserTapConfig>(
  handler: Handler<'tap', EventType>,
  config?: Config
) {
  registerAction(tapAction)
  return useRecognizers({ tap: handler }, config || {}, 'tap')
}
