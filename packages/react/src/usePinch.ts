import { registerEngine, PinchEngine, UserPinchConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('pinch', PinchEngine)

export function usePinch<Config extends UserPinchConfig>(handler: Handler<'pinch'>, config: Config | {} = {}) {
  return useRecognizers({ pinch: handler }, config, 'pinch')
}
