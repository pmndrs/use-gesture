import { registerAction, pinchAction } from '@use-gesture/core/actions'
import { UserPinchConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface PinchGestureConstructor {
  new <EventType = EventTypes['pinch']>(
    target: EventTarget,
    handler: Handler<'pinch', EventType>,
    config?: UserPinchConfig
  ): PinchGesture
}

export interface PinchGesture extends Recognizer {}

export const PinchGesture: PinchGestureConstructor = function <EventType = EventTypes['pinch']>(
  target: EventTarget,
  handler: Handler<'pinch', EventType>,
  config?: UserPinchConfig
) {
  registerAction(pinchAction)
  return new Recognizer(target, { pinch: handler }, config || {}, 'pinch')
} as any
