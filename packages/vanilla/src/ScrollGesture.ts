import { registerEngine, ScrollEngine, scrollConfigResolver } from '@use-gesture/core'
import { UserScrollConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

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
  registerEngine('scroll', ScrollEngine, scrollConfigResolver)
  return new Recognizer(target, { scroll: handler }, config, 'scroll')
} as any
