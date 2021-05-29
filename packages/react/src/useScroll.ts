import { registerEngine, ScrollEngine, scrollConfigResolver } from '@use-gesture/core'
import { UserScrollConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { useRecognizers } from './useRecognizers'

/**
 * Scroll hook.
 *
 * @param {Handler<'scroll'>} handler - the function fired every time the scroll gesture updates
 * @param {UserScrollConfig} [config={}] - the config object including generic options and scroll options
 */
export function useScroll<EventType = EventTypes['scroll'], Config extends UserScrollConfig = UserScrollConfig>(
  handler: Handler<'scroll', EventType>,
  config: Config | {} = {}
) {
  registerEngine('scroll', ScrollEngine, scrollConfigResolver)
  return useRecognizers({ scroll: handler }, config, 'scroll')
}
