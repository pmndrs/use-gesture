import { dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction } from '@use-gesture/core/actions'
import { GestureHandlers, UserGestureConfig } from '@use-gesture/core/types'
import { Recognizer } from './Recognizer'
import { createGesture } from './createGesture'

interface GestureConstructor {
  new (target: EventTarget, handlers: GestureHandlers, config?: UserGestureConfig): Gesture
}

export interface Gesture extends Recognizer {}

export const Gesture: GestureConstructor = function (
  target: EventTarget,
  handlers: GestureHandlers,
  config: UserGestureConfig | {} = {}
) {
  const gestureFunction = createGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction])

  return gestureFunction(target, handlers, config)
} as any
