import { registerEngine, HoverEngine, Handler, UserHoverConfig } from '@use-gesture/core'
import { Recognizer } from './Recognizer'

registerEngine('hover', HoverEngine)

interface HoverGestureConstructor {
  new (target: EventTarget, handler: Handler<'hover'>, config: UserHoverConfig): HoverGesture
}

export interface HoverGesture extends Recognizer {}

export const HoverGesture: HoverGestureConstructor = function (
  target: Element,
  handler: Handler<'hover'>,
  config: UserHoverConfig | {} = {}
) {
  return new Recognizer(target, { hover: handler }, config, 'hover')
} as any
