import {
  registerEngine,
  DragEngine,
  PinchEngine,
  ScrollEngine,
  WheelEngine,
  parseMergedHandlers
} from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)
registerEngine('pinch', PinchEngine)
registerEngine('scroll', ScrollEngine)
registerEngine('wheel', WheelEngine)

export function useGesture(_handlers, _config = {}) {
  const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
  return useRecognizers(handlers, config, undefined, nativeHandlers)
}
