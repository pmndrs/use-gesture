import {
  registerEngine,
  HoverEngine,
  UserHoverConfig,
  Handler,
  EventTypes,
  hoverConfigResolver
} from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

/**
 * Hover hook.
 *
 * @param {Handler<'hover'>} handler - the function fired every time the hover gesture updates
 * @param {UserHoverConfig} [config={}] - the config object including generic options and hover options
 */
export function useHover<EventType = EventTypes['hover'], Config = UserHoverConfig>(
  handler: Handler<'hover', EventType>,
  config: Config | {} = {}
) {
  registerEngine('hover', HoverEngine, hoverConfigResolver)
  return useRecognizers({ hover: handler }, config, 'hover')
}
