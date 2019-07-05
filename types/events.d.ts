import {
  MouseEventHandler,
  PointerEventHandler,
  UIEventHandler,
  WheelEventHandler,
  TouchEventHandler,
  SyntheticEvent,
  MouseEvent,
  TouchEvent,
  WheelEvent,
  PointerEvent,
} from 'react'

import { TransformType, Fn } from './common.d'

export enum GestureFlag {
  OnStart = 'start',
  OnChange = 'change',
  OnEnd = 'end',
}

export type GestureEvent = PointerEvent & { scale: number; rotation: number }
export type TransformedEvent<T extends SyntheticEvent = MouseEvent | TouchEvent | WheelEvent | PointerEvent | GestureEvent> = T & {
  transform?: TransformType
}

export interface ReactEventHandlers {
  // Mouse Events
  onMouseDown?: MouseEventHandler
  onMouseDownCapture?: MouseEventHandler
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  onMouseMove?: MouseEventHandler
  onMouseMoveCapture?: MouseEventHandler
  onMouseOut?: MouseEventHandler
  onMouseOutCapture?: MouseEventHandler
  onMouseOver?: MouseEventHandler
  onMouseOverCapture?: MouseEventHandler
  onMouseUp?: MouseEventHandler
  onMouseUpCapture?: MouseEventHandler
  // Touch Events
  onTouchCancel?: TouchEventHandler
  onTouchCancelCapture?: TouchEventHandler
  onTouchEnd?: TouchEventHandler
  onTouchEndCapture?: TouchEventHandler
  onTouchMove?: TouchEventHandler
  onTouchMoveCapture?: TouchEventHandler
  onTouchStart?: TouchEventHandler
  onTouchStartCapture?: TouchEventHandler

  // Pointer Events
  onPointerDown?: PointerEventHandler
  onPointerDownCapture?: PointerEventHandler
  onPointerMove?: PointerEventHandler
  onPointerMoveCapture?: PointerEventHandler
  onPointerUp?: PointerEventHandler
  onPointerUpCapture?: PointerEventHandler
  onPointerCancel?: PointerEventHandler
  onPointerCancelCapture?: PointerEventHandler
  onPointerEnter?: PointerEventHandler
  onPointerEnterCapture?: PointerEventHandler
  onPointerLeave?: PointerEventHandler
  onPointerLeaveCapture?: PointerEventHandler
  onPointerOver?: PointerEventHandler
  onPointerOverCapture?: PointerEventHandler
  onPointerOut?: PointerEventHandler
  onPointerOutCapture?: PointerEventHandler
  onGotPointerCapture?: PointerEventHandler
  onGotPointerCaptureCapture?: PointerEventHandler
  onLostPointerCapture?: PointerEventHandler
  onLostPointerCaptureCapture?: PointerEventHandler

  // UI Events
  onScroll?: UIEventHandler
  onScrollCapture?: UIEventHandler

  // Wheel Events
  onWheel?: WheelEventHandler
  onWheelCapture?: WheelEventHandler

  // Cheat mode for Gesture Events
  onGestureStart?: Fn
  onGestureChange?: Fn
  onGestureEnd?: Fn
}

export type ReactEventHandlerKey = keyof ReactEventHandlers
