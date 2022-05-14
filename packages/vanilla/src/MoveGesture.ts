import { registerAction, moveAction } from '@use-gesture/core/actions'
import { UserMoveConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface MoveGestureConstructor {
  new <EventType = EventTypes['move']>(
    target: EventTarget,
    handler: Handler<'move', EventType>,
    config?: UserMoveConfig
  ): MoveGesture
}

export interface MoveGesture extends Recognizer<'move'> {}

export const MoveGesture: MoveGestureConstructor = function <EventType = EventTypes['move']>(
  target: EventTarget,
  handler: Handler<'move', EventType>,
  config?: UserMoveConfig
) {
  registerAction(moveAction)
  return new Recognizer(target, { move: handler }, config || {}, 'move')
} as any
