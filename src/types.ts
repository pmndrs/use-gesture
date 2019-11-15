import React from 'react'
import Controller from './Controller'
import Recognizer from './recognizers/Recognizer'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type Vector2 = [number, number]
export type Fn = (...args: any[]) => any

export type EventOptions = { capture: boolean; passive: boolean }

type DomTarget = EventTarget | React.RefObject<EventTarget>

export interface GenericConfig {
  domTarget?: DomTarget
  window?: EventTarget
  eventOptions: Partial<EventOptions & { pointer: boolean }>
  enabled: boolean
}

export interface DragConfig {
  enabled: boolean
  filterClicks: boolean
  threshold?: number | Vector2
  swipeVelocity: number | Vector2
  swipeDistance: number | Vector2
  lockDirection: boolean
  delay: boolean | number
  axis?: 'x' | 'y'
}

export type PartialUserConfig = Partial<GenericConfig> & { drag?: Partial<DragConfig> }

export interface InternalGenericConfig {
  domTarget?: DomTarget
  eventOptions: EventOptions
  window?: EventTarget
  pointer: boolean
  captureString: string
  enabled: boolean
}

export interface InternalDragConfig {
  enabled: boolean
  filterClicks: boolean
  lockDirection: boolean
  threshold: Vector2
  swipeVelocity: Vector2
  swipeDistance: Vector2
  delay: number
  axis?: 'x' | 'y'
}

export type InternalFullConfig = InternalGenericConfig & { drag?: InternalDragConfig }

export type WebKitGestureEvent = React.PointerEvent & { scale: number; rotation: number }
export type UseGestureEvent<
  T extends React.SyntheticEvent = React.MouseEvent | React.TouchEvent | React.WheelEvent | React.PointerEvent | WebKitGestureEvent
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

// export type GestureKey = 'drag' | 'pinch' | 'move' | 'scroll' | 'wheel' | 'hover'
export type GestureKey = 'drag'
export type StateKey = Exclude<GestureKey, 'hover'>

export type IngKey = 'hovering' | 'scrolling' | 'wheeling' | 'dragging' | 'moving' | 'pinching'

export type SharedGestureState = { [ingKey in IngKey]: boolean } & {
  touches: number
  down: boolean
  buttons: number
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

type Intentional = false | number

export interface CommonGestureState {
  _active: boolean
  _blocked: boolean
  _intentional: [Intentional, Intentional]
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
  time?: number
  cancel?(): void
  canceled: boolean
  memo?: any
  args?: any
}

export interface Coordinates {
  _isClick?: boolean
  _delayedEvent?: boolean
  axis?: 'x' | 'y'
  xy: Vector2
  velocity: number
  vxvy: Vector2
  distance: number
  click?: boolean
  swipe?: Vector2
}

export interface DistanceAngle {
  da: Vector2
  vdva: Vector2
  origin?: Vector2
  turns: number
}

export type GestureState<T extends Coordinates | DistanceAngle = Coordinates | DistanceAngle> = T & CommonGestureState
export type FullGestureState<T extends Coordinates | DistanceAngle> = SharedGestureState & GestureState<T>

export type StateObject = { shared: SharedGestureState } & {
  drag: GestureState<Coordinates>
}

export type Handler<T extends Coordinates | DistanceAngle> = (state: FullGestureState<T>) => any | void
export type HandlerKey = 'onDrag' | 'onPinch' | 'onMove' | 'onHover' | 'onScroll' | 'onWheel'

export type UserHandlers = {
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

export type InternalHandlers = {
  drag: Handler<Coordinates>
  move: Handler<Coordinates>
  hover: Handler<Coordinates>
  scroll: Handler<Coordinates>
  wheel: Handler<Coordinates>
  pinch: Handler<DistanceAngle>
}

export type RecognizerClass<T extends Coordinates | DistanceAngle> = { new (controller: Controller, args: any[]): Recognizer<T> }

/* Handlers should also accept DomAttributes to prevent overrides */
export type UserHandlersPartial = AtLeastOneOf<UserHandlers> &
  Partial<Omit<React.DOMAttributes<Element>, 'onDrag' | 'onScroll' | 'onWheel'>>

export type HookReturnType<T extends { domTarget?: DomTarget }> = T['domTarget'] extends object ? Fn : ReactEventHandlers
