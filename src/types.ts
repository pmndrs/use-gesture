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
  initial: Vector2 | (() => Vector2)
  threshold?: number | Vector2
  rubberband: boolean | number | Vector2
}

export interface CoordinatesOptions {
  axis?: 'x' | 'y'
  lockDirection: boolean
  bounds?: AxisBounds
}

export interface DistanceAngleOptions {
  distanceBounds?: Bounds
  angleBounds?: Bounds
}

export interface DragOptions {
  filterTaps: boolean
  swipeVelocity: number | Vector2
  swipeDistance: number | Vector2
  delay: boolean | number
}

export type CoordinatesConfig = Partial<GestureOptions & CoordinatesOptions>
export type DistanceAngleConfig = Partial<GestureOptions & DistanceAngleOptions>
export type DragConfig = CoordinatesConfig & Partial<DragOptions>

export type UseDragConfig = Partial<GenericOptions> & DragConfig
export type UsePinchConfig = Partial<GenericOptions> & DragConfig
export type UseWheelConfig = Partial<GenericOptions> & CoordinatesConfig
export type UseScrollConfig = Partial<GenericOptions> & CoordinatesConfig
export type UseMoveConfig = Partial<GenericOptions> & CoordinatesConfig
export type UseHoverConfig = Partial<GenericOptions>
export type UseGestureConfig = Partial<GenericOptions> & {
  drag?: DragConfig
  wheel?: CoordinatesConfig
  scroll?: CoordinatesConfig
  move?: CoordinatesConfig
  pinch?: DistanceAngleConfig
  hover?: { enabled?: boolean }
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
  initial: Vector2 | (() => Vector2)
  threshold: Vector2
  rubberband: Vector2
}

export interface InternalCoordinatesOptions extends InternalGestureOptions {
  axis?: 'x' | 'y'
  bounds: Tuple<Vector2>
  lockDirection: boolean
}

export interface InternalDistanceAngleOptions extends InternalGestureOptions {
  bounds: Tuple<Vector2>
}

export interface InternalDragOptions extends InternalCoordinatesOptions {
  filterTaps: boolean
  swipeVelocity: Vector2
  swipeDistance: Vector2
  delay: number
}

export type InternalConfig = InternalGenericOptions & {
  drag?: InternalDragOptions
  wheel?: InternalCoordinatesOptions
  scroll?: InternalCoordinatesOptions
  move?: InternalCoordinatesOptions
  pinch?: InternalDistanceAngleOptions
  hover?: { enabled: boolean }
}

export type WebKitGestureEvent = React.PointerEvent & { scale: number; rotation: number }
export type UseGestureEvent<
  T extends React.SyntheticEvent =
    | React.MouseEvent
    | React.TouchEvent
    | React.WheelEvent
    | React.PointerEvent
    | WebKitGestureEvent
> = T & { sourceCapabilities?: { firesTouchEvents: boolean } }

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

export type CoordinatesKey = 'drag' | 'wheel' | 'move' | 'scroll'
export type DistanceAngleKey = 'pinch'
export type GestureKey = CoordinatesKey | DistanceAngleKey | 'hover'
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
  _initial: Vector2
  event?: UseGestureEvent
  currentTarget?: EventTarget | null
  pointerId?: number | null
  values: Vector2
  velocities: Vector2
  delta: Vector2
  movement: Vector2
  offset: Vector2
  lastOffset: Vector2
  initial: Vector2
  previous: Vector2
  direction: Vector2
  first: boolean
  last: boolean
  active: boolean
  startTime: number
  timeStamp: number
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
  _isTap: boolean
  _delayedEvent: boolean
  tap: boolean
  swipe: Vector2
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
  scroll: CommonGestureState & Coordinates
  move: CommonGestureState & Coordinates
  pinch: CommonGestureState & DistanceAngle
}

export type GestureState<T extends StateKey> = State[T]
export type PartialGestureState<T extends StateKey> = Partial<GestureState<T>>

export type FullGestureState<T extends StateKey> = SharedGestureState & State[T]

export type Handler<T extends GestureKey> = (state: FullGestureState<StateKey<T>>) => any | void

export type HandlerKey = 'onDrag' | 'onPinch' | 'onWheel' | 'onMove' | 'onScroll' | 'onHover'

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
  onMove: Handler<'move'>
  onMoveStart: Handler<'move'>
  onMoveEnd: Handler<'move'>
  onScroll: Handler<'scroll'>
  onScrollStart: Handler<'scroll'>
  onScrollEnd: Handler<'scroll'>
  onHover: Handler<'hover'>
}

export type InternalHandlers = { [Key in GestureKey]: Handler<Key> }

export type RecognizerClass<T extends StateKey> = { new (controller: Controller, args: any[]): Recognizer<T> }

export type RecognizerClasses = (
  | RecognizerClass<'drag'>
  | RecognizerClass<'pinch'>
  | RecognizerClass<'wheel'>
  | RecognizerClass<'move'>
  | RecognizerClass<'scroll'>
)[]

export type NativeHandlersPartial = Partial<Omit<React.DOMAttributes<Element>, 'onDrag' | 'onScroll' | 'onWheel'>>
/* Handlers should also accept DomAttributes to prevent overrides */
export type UserHandlersPartial = AtLeastOneOf<UserHandlers> & NativeHandlersPartial

export type HookReturnType<T extends { domTarget?: DomTarget }> = T['domTarget'] extends object
  ? Fn
  : ReactEventHandlers
