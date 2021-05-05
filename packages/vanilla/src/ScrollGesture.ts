import { registerEngine, ScrollEngine, Handler, UserScrollConfig, EventTypes } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('scroll', ScrollEngine)

interface ScrollGestureConstructor {
  new <EventType = EventTypes['scroll']>(
    target: EventTarget,
    handler: Handler<'scroll', EventType>,
    config?: UserScrollConfig
  ): ScrollGesture
}

export interface ScrollGesture extends Recognizer {}

export const ScrollGesture: ScrollGestureConstructor = function <EventType = EventTypes['scroll']>(
  target: Element,
  handler: Handler<'scroll', EventType>,
  config: UserScrollConfig | {} = {}
) {
  return new Recognizer(target, { scroll: handler }, config, 'scroll')
} as any
