import { registerAction, hoverAction } from '@use-gesture/core/actions'
import { EventTypes, UserHoverConfig, Handler } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'

interface HoverGestureConstructor {
  new <EventType = EventTypes['hover']>(
    target: EventTarget,
    handler: Handler<'hover', EventType>,
    config?: UserHoverConfig
  ): HoverGesture
}

export interface HoverGesture extends Recognizer {}

export const HoverGesture: HoverGestureConstructor = function <EventType = EventTypes['hover']>(
  target: EventTarget,
  handler: Handler<'hover', EventType>,
  config?: UserHoverConfig
) {
  registerAction(hoverAction)
  return new Recognizer(target, { hover: handler }, config || {}, 'hover')
} as any
