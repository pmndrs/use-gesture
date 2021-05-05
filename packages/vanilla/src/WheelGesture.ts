import { registerEngine, WheelEngine, Handler, UserWheelConfig, EventTypes } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('wheel', WheelEngine)

interface WheelGestureConstructor {
  new <EventType = EventTypes['wheel']>(
    target: EventTarget,
    handler: Handler<'wheel', EventType>,
    config?: UserWheelConfig
  ): WheelGesture
}

export interface WheelGesture extends Recognizer {}

export const WheelGesture: WheelGestureConstructor = function <EventType = EventTypes['wheel']>(
  target: Element,
  handler: Handler<'wheel', EventType>,
  config: UserWheelConfig | {} = {}
) {
  return new Recognizer(target, { wheel: handler }, config, 'wheel')
} as any
