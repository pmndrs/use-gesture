import {
  registerEngine,
  DragEngine,
  PinchEngine,
  ScrollEngine,
  WheelEngine,
  MoveEngine,
  HoverEngine,
  parseMergedHandlers,
  GestureHandlers,
  UserGestureConfig
} from '@use-gesture/core'
import { useRecognizers } from './useRecognizers'

registerEngine('drag', DragEngine)
registerEngine('pinch', PinchEngine)
registerEngine('scroll', ScrollEngine)
registerEngine('wheel', WheelEngine)
registerEngine('move', MoveEngine)
registerEngine('hover', HoverEngine)

export function useGesture<Config extends UserGestureConfig>(_handlers: GestureHandlers, _config: Config | {} = {}) {
  const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
  return useRecognizers<Config>(handlers, config, undefined, nativeHandlers)
}
