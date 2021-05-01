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
import { Recognizer } from './Recognizer'

registerEngine('drag', DragEngine)
registerEngine('pinch', PinchEngine)
registerEngine('scroll', ScrollEngine)
registerEngine('wheel', WheelEngine)
registerEngine('move', MoveEngine)
registerEngine('hover', HoverEngine)

interface GestureConstructor {
  new (target: HTMLElement, _handlers: GestureHandlers, _config: UserGestureConfig): Gesture
}

export interface Gesture extends Recognizer {}

export const Gesture: GestureConstructor = function (
  target: HTMLElement,
  _handlers: GestureHandlers,
  _config: UserGestureConfig | {} = {}
) {
  const { handlers, nativeHandlers, config } = parseMergedHandlers(_handlers, _config)
  return new Recognizer(target, handlers, config, undefined, nativeHandlers)
} as any
