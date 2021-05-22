import { registerEngine, DragEngine, dragConfigResolver } from '@use-gesture/core'
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
  target: Element,
  handler: Handler<'drag', EventType>,
  config: UserDragConfig | {} = {}
) {
  registerEngine('drag', DragEngine, dragConfigResolver)
  return new Recognizer(target, { drag: handler }, config, 'drag')
} as any
