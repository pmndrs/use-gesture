import { registerAction, scrollAction } from '@use-gesture/core/actions'
import type { EventTypes, Handler, UserScrollConfig } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

/**
 * Scroll composable.
 *
 * @param {Handler<'scroll'>} handler - the function fired every time the scroll gesture updates
 * @param {UserScrollConfig} config - the config object including generic options and scroll options
 */
export function useScroll<EventType = EventTypes['scroll'], Config extends UserScrollConfig = UserScrollConfig>(
  handler: Handler<'scroll', EventType>,
  config?: Config
) {
  registerAction(scrollAction)
  return useRecognizers({ scroll: handler }, config || {}, 'scroll')
}
