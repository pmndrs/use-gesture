import { registerEngine, HoverEngine, UserHoverConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('hover', HoverEngine)

export function useHover<Config extends UserHoverConfig>(handler: Handler<'hover'>, config: Config | {} = {}) {
  return useRecognizers({ hover: handler }, config, 'hover')
}
