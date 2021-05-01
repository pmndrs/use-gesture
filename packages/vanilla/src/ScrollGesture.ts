import { registerEngine, ScrollEngine, Handler, UserScrollConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('scroll', ScrollEngine)

interface ScrollGestureConstructor {
  new (target: EventTarget, handler: Handler<'scroll'>, config: UserScrollConfig): ScrollGesture
}

export interface ScrollGesture extends Recognizer {}

export const ScrollGesture: ScrollGestureConstructor = function (
  target: Element,
  handler: Handler<'scroll'>,
  config: UserScrollConfig | {} = {}
) {
  return new Recognizer(target, { scroll: handler }, config, 'scroll')
} as any
