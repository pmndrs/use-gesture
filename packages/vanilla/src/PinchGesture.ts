import { registerEngine, PinchEngine, Handler, UserPinchConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('pinch', PinchEngine)

interface PinchGestureConstructor {
  new (target: EventTarget, handler: Handler<'pinch'>, config: UserPinchConfig): PinchGesture
}

export interface PinchGesture extends Recognizer {}

export const PinchGesture: PinchGestureConstructor = function (
  target: Element,
  handler: Handler<'pinch'>,
  config: UserPinchConfig | {} = {}
) {
  return new Recognizer(target, { pinch: handler }, config, 'pinch')
} as any
