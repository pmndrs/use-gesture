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

/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {GestureHandlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 */
export function useGesture<Config = UserGestureConfig>(_handlers: GestureHandlers, _config: Config | {} = {}) {
  const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
  return useRecognizers<Config>(handlers, config, undefined, nativeHandlers)
}
