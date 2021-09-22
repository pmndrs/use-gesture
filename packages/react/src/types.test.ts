/* eslint-disable react-hooks/rules-of-hooks */
/* Type tests for @use-gesture/react */

import { expectType } from 'tsd'
import { ReactDOMAttributes, useDrag, useGesture } from '.'

/* Checks that gesture hooks return event props handlers */
expectType<(...args: any[]) => ReactDOMAttributes>(useDrag(() => {}))

/* Checks that gesture hooks don't return any value when used with config option `target` */
expectType<void>(useDrag(() => {}, { target: window }))

/* Checks that hooks accept generics to cast event type */
useDrag<MouseEvent>(({ event }) => expectType<MouseEvent>(event))

/* Checks that useGesture returns event props handler */
expectType<(...args: any[]) => ReactDOMAttributes>(useGesture({ onPinch: () => {} }))

/* Checks that useGesture doesn't return any value when used with config option `target` */
expectType<void>(useGesture({ onPinch: () => {} }, { target: window }))

/* Checks that useGesture accepts generics to cast event type */
useGesture<{ drag: MouseEvent; pinch: WheelEvent; onClick: PointerEvent }>({
  onDrag: ({ event }) => expectType<MouseEvent>(event),
  onPinch: ({ event }) => expectType<WheelEvent>(event),
  onClick: ({ event }) => expectType<PointerEvent>(event)
})
