import { dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction } from '@use-gesture/core/actions'
import { AnyHandlerEventTypes, EventTypes, GestureHandlers, UserGestureConfig } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'
import { createGesture } from './createGesture'

interface GestureConstructor {
  new <HandlerTypes extends AnyHandlerEventTypes = EventTypes>(
    target: EventTarget,
    handlers: GestureHandlers<HandlerTypes>,
    config?: UserGestureConfig
  ): Gesture
}

export interface Gesture extends Recognizer {}

export const Gesture: GestureConstructor = function <HandlerTypes extends AnyHandlerEventTypes = EventTypes>(
  target: EventTarget,
  handlers: GestureHandlers<HandlerTypes>,
  config?: UserGestureConfig
) {
  const gestureFunction = createGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction])
  return gestureFunction(target, handlers, config || ({} as UserGestureConfig))
} as any
