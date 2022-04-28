import { registerAction, dragAction } from '@use-gesture/core/actions'
import { EventTypes, Handler, UserDragConfig } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface DragGestureConstructor {
  new <EventType = EventTypes['drag']>(
    target: EventTarget,
    handler: Handler<'drag', EventType>,
    config?: UserDragConfig
  ): DragGesture
}

export interface DragGesture extends Recognizer {}

export const DragGesture: DragGestureConstructor = function <EventType = EventTypes['drag']>(
  target: EventTarget,
  handler: Handler<'drag', EventType>,
  config?: UserDragConfig
) {
  registerAction(dragAction)
  return new Recognizer(target, { drag: handler }, config || {}, 'drag')
} as any
