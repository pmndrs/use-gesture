import React from 'react'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type Vector2 = [number, number]
export type Fn = (...args: any[]) => any
export type TransformType = { x(x: number): number; y(y: number): number }

export type EventOptions = { capture: boolean; passive: boolean }

export interface GestureConfig {
  domTarget?: EventTarget | React.RefObject<EventTarget> | null
  event: EventOptions
  window?: EventTarget | null
  pointerEvents: boolean
  transform: TransformType
  enabled: boolean
  drag: boolean
  pinch: boolean
  scroll: boolean
  wheel: boolean
  hover: boolean
  move: boolean
}

export enum GestureFlag {
  OnStart = 'start',
  OnChange = 'change',
  OnEnd = 'end',
}

export type GestureEvent = React.TouchEvent & { scale: number; rotation: number }
export type TransformedEvent<
  T extends React.SyntheticEvent = React.MouseEvent | React.TouchEvent | React.WheelEvent | React.PointerEvent | GestureEvent
> = T & {
  transform?: TransformType
}

export interface ReactEventHandlers {
  // Mouse Events
  onMouseDown?: React.MouseEventHandler
  onMouseDownCapture?: React.MouseEventHandler
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onMouseMove?: React.MouseEventHandler
  onMouseMoveCapture?: React.MouseEventHandler
  onMouseOut?: React.MouseEventHandler
  onMouseOutCapture?: React.MouseEventHandler
  onMouseOver?: React.MouseEventHandler
  onMouseOverCapture?: React.MouseEventHandler
  onMouseUp?: React.MouseEventHandler
  onMouseUpCapture?: React.MouseEventHandler
  // Touch Events
  onTouchCancel?: React.TouchEventHandler
  onTouchCancelCapture?: React.TouchEventHandler
  onTouchEnd?: React.TouchEventHandler
  onTouchEndCapture?: React.TouchEventHandler
  onTouchMove?: React.TouchEventHandler
  onTouchMoveCapture?: React.TouchEventHandler
  onTouchStart?: React.TouchEventHandler
  onTouchStartCapture?: React.TouchEventHandler

  // Pointer Events
  onPointerDown?: React.PointerEventHandler
  onPointerDownCapture?: React.PointerEventHandler
  onPointerMove?: React.PointerEventHandler
  onPointerMoveCapture?: React.PointerEventHandler
  onPointerUp?: React.PointerEventHandler
  onPointerUpCapture?: React.PointerEventHandler
  onPointerCancel?: React.PointerEventHandler
  onPointerCancelCapture?: React.PointerEventHandler
  onPointerEnter?: React.PointerEventHandler
  onPointerEnterCapture?: React.PointerEventHandler
  onPointerLeave?: React.PointerEventHandler
  onPointerLeaveCapture?: React.PointerEventHandler
  onPointerOver?: React.PointerEventHandler
  onPointerOverCapture?: React.PointerEventHandler
  onPointerOut?: React.PointerEventHandler
  onPointerOutCapture?: React.PointerEventHandler
  onGotPointerCapture?: React.PointerEventHandler
  onGotPointerCaptureCapture?: React.PointerEventHandler
  onLostPointerCapture?: React.PointerEventHandler
  onLostPointerCaptureCapture?: React.PointerEventHandler

  // UI Events
  onScroll?: React.UIEventHandler
  onScrollCapture?: React.UIEventHandler

  // Wheel Events
  onWheel?: React.WheelEventHandler
  onWheelCapture?: React.WheelEventHandler

  // Cheat mode for Gesture Events
  onGestureStart?: Fn
  onGestureChange?: Fn
  onGestureEnd?: Fn
}

export type ReactEventHandlerKey = keyof ReactEventHandlers

export type GestureKey = 'drag' | 'pinch' | 'move' | 'scroll' | 'wheel' | 'hover'
export type StateKey = Exclude<GestureKey, 'hover'>

export interface SharedGestureState {
  hovering: boolean
  scrolling: boolean
  wheeling: boolean
  dragging: boolean
  moving: boolean
  pinching: boolean
  touches: number
  down: boolean
  buttons: number
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

export interface CommonGestureState {
  event?: TransformedEvent
  currentTarget?: EventTarget | null
  pointerId?: number | null
  values: Vector2
  velocities: Vector2
  delta: Vector2
  initial: Vector2
  previous: Vector2
  transform?: TransformType
  local: Vector2
  lastLocal: Vector2
  first: boolean
  last: boolean
  active: boolean
  time?: number
  cancel?(): void
  canceled: boolean
  memo?: any
  temp?: any // TODO to be removed in future versions
  args?: any
}

export interface Coordinates {
  xy: Vector2
  velocity: number
  vxvy: Vector2
  distance: number
  direction: Vector2
}

export interface DistanceAngle {
  da: Vector2
  vdva: Vector2
  origin: Vector2
  turns: number
}

export type GestureState<T extends Coordinates | DistanceAngle> = T & CommonGestureState
export type FullGestureState<T extends Coordinates | DistanceAngle> = SharedGestureState & GestureState<T>

export type StateObject = { shared: SharedGestureState } & { [K in StateKey]: GestureState<Coordinates | DistanceAngle> }

export type Handler<T extends Coordinates | DistanceAngle> = (state: FullGestureState<T>) => any | void
export type HandlerKey = 'onDrag' | 'onPinch' | 'onMove' | 'onHover' | 'onScroll' | 'onWheel'

export type GestureHandlers = {
  onAction: Handler<Coordinates>
  onDrag: Handler<Coordinates>
  onDragStart: Handler<Coordinates>
  onDragEnd: Handler<Coordinates>
  onHover: Handler<Coordinates>
  onMove: Handler<Coordinates>
  onMoveStart: Handler<Coordinates>
  onMoveEnd: Handler<Coordinates>
  onScroll: Handler<Coordinates>
  onScrollStart: Handler<Coordinates>
  onScrollEnd: Handler<Coordinates>
  onWheel: Handler<Coordinates>
  onWheelStart: Handler<Coordinates>
  onWheelEnd: Handler<Coordinates>
  onPinch: Handler<DistanceAngle>
  onPinchStart: Handler<DistanceAngle>
  onPinchEnd: Handler<DistanceAngle>
}

/* Handlers should also accept DomAttributes to prevent overrides */
export type GestureHandlersPartial = AtLeastOneOf<GestureHandlers> &
  Partial<Omit<React.DOMAttributes<Element>, 'onDrag' | 'onScroll' | 'onWheel'>>
