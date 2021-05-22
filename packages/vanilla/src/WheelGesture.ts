import { registerEngine, WheelEngine, wheelConfigResolver } from '@use-gesture/core'
import { UserWheelConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

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
  registerEngine('wheel', WheelEngine, wheelConfigResolver)
  return new Recognizer(target, { wheel: handler }, config, 'wheel')
} as any
