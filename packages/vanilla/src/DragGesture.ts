import { registerEngine, DragEngine, Handler, UserDragConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('drag', DragEngine)

interface DragGestureConstructor {
  new (target: EventTarget, handler: Handler<'drag'>, config: UserDragConfig): DragGesture
}

export interface DragGesture extends Recognizer {}

export const DragGesture: DragGestureConstructor = function (
  target: Element,
  handler: Handler<'drag'>,
  config: UserDragConfig | {} = {}
) {
  return new Recognizer(target, { drag: handler }, config, 'drag')
} as any
