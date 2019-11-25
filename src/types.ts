import React from 'react'
import Controller from './Controller'
import Recognizer from './recognizers/Recognizer'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type Tuple<T> = [T, T]
export type Vector2 = Tuple<number>
export type Fn = (...args: any[]) => any
export type FalseOrNumber = false | number

export interface AxisBounds {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface Bounds {
  min?: number
  max?: number
}

export interface EventOptions {
  capture: boolean
  passive: boolean
}

type DomTarget = EventTarget | React.RefObject<EventTarget>

export interface GenericOptions {
  domTarget?: DomTarget
  window?: EventTarget
  eventOptions: Partial<EventOptions & { pointer: boolean }>
  enabled: boolean
}

export interface GestureOptions {
  enabled: boolean
  threshold?: number | Vector2
  bounds?: AxisBounds
  rubberband: boolean | number | Vector2
}

export interface CoordinatesOptions {
  axis?: 'x' | 'y'
  lockDirection: boolean
}

export interface DragOptions {
  filterClicks: boolean
  swipeVelocity: number | Vector2
  swipeDistance: number | Vector2
  delay: boolean | number
}

export type CoordinatesConfig = Partial<GestureOptions & CoordinatesOptions>
export type DragConfig = CoordinatesConfig & Partial<DragOptions>

export type UseDragConfig = Partial<GenericOptions> & DragConfig
export type UseWheelConfig = Partial<GenericOptions> & CoordinatesConfig
export type UseGestureConfig = Partial<GenericOptions> & {
  drag?: DragConfig
  wheel?: CoordinatesConfig
}

export interface InternalGenericOptions {
  domTarget?: DomTarget
  eventOptions: EventOptions
  window?: EventTarget
  pointer: boolean
  captureString: string
  enabled: boolean
}

export interface InternalGestureOptions {
  enabled: boolean
  threshold: Vector2
  bounds: Tuple<Vector2>
  rubberband: Vector2
}

export interface InternalCoordinatesOptions extends InternalGestureOptions {
  axis?: 'x' | 'y'
  lockDirection: boolean
}

export interface InternalDragOptions extends InternalCoordinatesOptions {
  filterClicks: boolean
  swipeVelocity: Vector2
  swipeDistance: Vector2
  delay: number
}

export type InternalConfig = InternalGenericOptions & {
  drag?: InternalDragOptions
  wheel?: InternalCoordinatesOptions
  pinch?: InternalGestureOptions
}

export type WebKitGestureEvent = React.PointerEvent & { scale: number; rotation: number }
export type UseGestureEvent<
  T extends React.SyntheticEvent =
    | React.MouseEvent
    | React.TouchEvent
    | React.WheelEvent
    | React.PointerEvent
    | WebKitGestureEvent
> = T & {
  gesture?: GestureKey
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

export type IngKey = 'hovering' | 'scrolling' | 'wheeling' | 'dragging' | 'moving' | 'pinching'

export type CoordinatesKey = 'drag' | 'wheel'
export type DistanceAngleKey = 'pinch'
export type GestureKey = CoordinatesKey | DistanceAngleKey
export type StateKey<T extends GestureKey = GestureKey> = T extends 'hover' ? 'move' : T

export type SharedGestureState = { [ingKey in IngKey]: boolean } & {
  touches: number
  down: boolean
  buttons: number
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

export interface CommonGestureState {
  _active: boolean
  _blocked: boolean
  _intentional: [FalseOrNumber, FalseOrNumber]
  _movement: Vector2
  event?: UseGestureEvent
  currentTarget?: EventTarget | null
  pointerId?: number | null
  values: Vector2
  delta: Vector2
  movement: Vector2
  offset: Vector2
  initial: Vector2
  previous: Vector2
  direction: Vector2
  first: boolean
  last: boolean
  active: boolean
  startTime?: number
  timeStamp?: number
  elapsedTime: number
  cancel?(): void
  canceled: boolean
  memo?: any
  args?: any
}

export interface Coordinates {
  axis?: 'x' | 'y'
  xy: Vector2
  velocity: number
  vxvy: Vector2
  distance: number
}

export interface DragState {
  _isClick?: boolean
  _delayedEvent?: boolean
  click?: boolean
  swipe?: Vector2
}

export interface DistanceAngle {
  da: Vector2
  vdva: Vector2
  origin?: Vector2
  turns: number
}

export type State = { shared: SharedGestureState } & {
  drag: CommonGestureState & Coordinates & DragState
  wheel: CommonGestureState & Coordinates
  pinch: CommonGestureState & DistanceAngle
}

export type GestureState<T extends GestureKey> = State[StateKey<T>]
export type PartialGestureState<T extends GestureKey> = Partial<GestureState<T>>

export type FullGestureState<T extends GestureKey> = SharedGestureState & State[StateKey<T>]

export type Handler<T extends GestureKey> = (state: FullGestureState<T>) => any | void
// export type HandlerKey = 'onDrag' | 'onPinch' | 'onMove' | 'onHover' | 'onScroll' | 'onWheel'
export type HandlerKey = 'onDrag' | 'onPinch' | 'onWheel'

export type UserHandlers = {
  onDrag: Handler<'drag'>
  onDragStart: Handler<'drag'>
  onDragEnd: Handler<'drag'>
  onPinch: Handler<'pinch'>
  onPinchStart: Handler<'pinch'>
  onPinchEnd: Handler<'pinch'>
  onWheel: Handler<'wheel'>
  onWheelStart: Handler<'wheel'>
  onWheelEnd: Handler<'wheel'>
  // onHover: Handler<'hover'>
  // onMove: Handler<'move'>
  // onMoveStart: Handler<'move'>
  // onMoveEnd: Handler<'move'>
  // onScroll: Handler<'scroll'>
  // onScrollStart: Handler<'scroll'>
  // onScrollEnd: Handler<'scroll'>
}

export type InternalHandlers = {
  drag: Handler<'drag'>
  pinch: Handler<'pinch'>
  wheel: Handler<'wheel'>
  // move: Handler<'move'>
  // hover: Handler<'hover'>
  // scroll: Handler<'scroll'>
}

export type RecognizerClass<T extends GestureKey> = { new (controller: Controller, args: any[]): Recognizer<T> }
// export type RecognizerClasses = RecognizerClass<GestureKey>[]
export type RecognizerClasses = (RecognizerClass<'drag'> | RecognizerClass<'pinch'> | RecognizerClass<'wheel'>)[]

/* Handlers should also accept DomAttributes to prevent overrides */
export type UserHandlersPartial = AtLeastOneOf<UserHandlers> &
  Partial<Omit<React.DOMAttributes<Element>, 'onDrag' | 'onScroll' | 'onWheel'>>

export type HookReturnType<T extends { domTarget?: DomTarget }> = T['domTarget'] extends object
  ? Fn
  : ReactEventHandlers
