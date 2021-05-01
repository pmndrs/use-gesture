import { registerEngine, DragEngine, Handler, UserDragConfig } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)

export function useDrag<Config extends UserDragConfig>(handler: Handler<'drag'>, config: Config | {} = {}) {
  return useRecognizers({ drag: handler }, config, 'drag')
}
