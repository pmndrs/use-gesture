import { registerEngine, MoveEngine, UserMoveConfig, Handler } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('move', MoveEngine)

export function useMove<Config extends UserMoveConfig>(handler: Handler<'move'>, config: Config | {} = {}) {
  return useRecognizers({ move: handler }, config, 'move')
}
