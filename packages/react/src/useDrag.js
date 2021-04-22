import { registerEngine, DragEngine } from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)

export function useDrag(dragHandler, config = {}) {
  return useRecognizers({ drag: dragHandler }, config, 'drag')
}
