import { registerEngine, MoveEngine, Handler, UserMoveConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('move', MoveEngine)

interface MoveGestureConstructor {
  new (target: EventTarget, handler: Handler<'move'>, config: UserMoveConfig): MoveGesture
}

export interface MoveGesture extends Recognizer {}

export const DragGesture: MoveGestureConstructor = function (
  target: Element,
  handler: Handler<'move'>,
  config: UserMoveConfig | {} = {}
) {
  return new Recognizer(target, { move: handler }, config, 'move')
} as any
