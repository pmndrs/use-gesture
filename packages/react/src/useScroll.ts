import { registerEngine, ScrollEngine, UserScrollConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('scroll', ScrollEngine)

export function useScroll<Config extends UserScrollConfig>(handler: Handler<'scroll'>, config: Config | {} = {}) {
  return useRecognizers({ scroll: handler }, config, 'scroll')
}
