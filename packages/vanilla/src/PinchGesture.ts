import { registerEngine, PinchEngine, Handler, UserPinchConfig, EventTypes } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('pinch', PinchEngine)

interface PinchGestureConstructor {
  new <EventType = EventTypes['pinch']>(
    target: EventTarget,
    handler: Handler<'pinch', EventType>,
    config?: UserPinchConfig
  ): PinchGesture
}

export interface PinchGesture extends Recognizer {}

export const PinchGesture: PinchGestureConstructor = function <EventType = EventTypes['pinch']>(
  target: Element,
  handler: Handler<'pinch', EventType>,
  config: UserPinchConfig | {} = {}
) {
  return new Recognizer(target, { pinch: handler }, config, 'pinch')
} as any
