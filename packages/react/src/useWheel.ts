import { registerEngine, WheelEngine, UserWheelConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('wheel', WheelEngine)

export function useWheel<Config extends UserWheelConfig>(handler: Handler<'wheel'>, config: Config | {} = {}) {
  return useRecognizers({ wheel: handler }, config, 'wheel')
}
