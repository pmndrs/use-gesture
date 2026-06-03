/* Type tests for @use-gesture/vanilla */

import { expectType } from 'tsd'
import { DragGesture, Gesture } from '.'

/* Checks that hooks accept generics to cast event type */
new DragGesture<MouseEvent>(window, ({ event }) => expectType<MouseEvent>(event))

/* Checks that useGesture accepts generics to cast event type */
new Gesture<{ drag: MouseEvent; pinch: WheelEvent; onClick: PointerEvent }>(window, {
  onDrag: ({ event }) => expectType<MouseEvent>(event),
  onPinch: ({ event }) => expectType<WheelEvent>(event),
  onClick: ({ event }) => expectType<PointerEvent>(event)
})
