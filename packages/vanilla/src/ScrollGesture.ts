import { registerAction, scrollAction } from '@use-gesture/core/actions'
import { UserScrollConfig, Handler, EventTypes } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface ScrollGestureConstructor {
  new <EventType = EventTypes['scroll']>(
    target: EventTarget,
    handler: Handler<'scroll', EventType>,
    config?: UserScrollConfig
  ): ScrollGesture
}

export interface ScrollGesture extends Recognizer<'scroll'> {}

export const ScrollGesture: ScrollGestureConstructor = function <EventType = EventTypes['scroll']>(
  target: EventTarget,
  handler: Handler<'scroll', EventType>,
  config?: UserScrollConfig
) {
  registerAction(scrollAction)
  return new Recognizer(target, { scroll: handler }, config || {}, 'scroll')
} as any
