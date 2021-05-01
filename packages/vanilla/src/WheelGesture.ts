import { registerEngine, WheelEngine, Handler, UserWheelConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('wheel', WheelEngine)

interface WheelGestureConstructor {
  new (target: EventTarget, handler: Handler<'wheel'>, config: UserWheelConfig): WheelGesture
}

export interface WheelGesture extends Recognizer {}

export const WheelGesture: WheelGestureConstructor = function (
  target: Element,
  handler: Handler<'wheel'>,
  config: UserWheelConfig | {} = {}
) {
  return new Recognizer(target, { wheel: handler }, config, 'wheel')
} as any
