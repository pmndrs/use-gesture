import { registerEngine, MoveEngine, moveConfigResolver } from '@use-gesture/core'
import { UserMoveConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface MoveGestureConstructor {
  new <EventType = EventTypes['move']>(
    target: EventTarget,
    handler: Handler<'move', EventType>,
    config?: UserMoveConfig
  ): MoveGesture
}

export interface MoveGesture extends Recognizer {}

export const MoveGesture: MoveGestureConstructor = function <EventType = EventTypes['move']>(
  target: Element,
  handler: Handler<'move', EventType>,
  config: UserMoveConfig | {} = {}
) {
  registerEngine('move', MoveEngine, moveConfigResolver)
  return new Recognizer(target, { move: handler }, config, 'move')
} as any
