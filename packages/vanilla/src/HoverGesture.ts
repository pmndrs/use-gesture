import { registerEngine, HoverEngine, hoverConfigResolver } from '@use-gesture/core'
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
  target: Element,
  handler: Handler<'hover', EventType>,
  config: UserHoverConfig | {} = {}
) {
  registerEngine('hover', HoverEngine, hoverConfigResolver)
  return new Recognizer(target, { hover: handler }, config, 'hover')
} as any
