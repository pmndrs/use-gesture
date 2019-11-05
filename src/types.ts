import React from 'react'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOneOf<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type Vector2 = [number, number]
export type Fn = (...args: any[]) => any

export type EventOptions = { capture?: boolean; passive?: boolean }

export interface GenericConfig {
  domTarget?: EventTarget | React.RefObject<EventTarget> | null
  window?: EventTarget
  eventOptions: EventOptions & { pointer: boolean }
  enabled: boolean
}

export interface DragConfig {
  enabled: boolean
  filterClick: boolean
  intentionalThreshold: Vector2
  swipeVelocity: Vector2
  delay: boolean | number
}

export type PartialUserConfig = Partial<GenericConfig> & { drag?: Partial<DragConfig> }
export type FullUserConfig = GenericConfig & { drag: DragConfig }

export interface InternalConfig {
  domTarget?: EventTarget | React.RefObject<EventTarget> | null
  eventOptions: EventOptions
  window?: EventTarget
  pointer: boolean
  captureString: string
  enabled: boolean
  drag: DragConfig
}

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

export type StateObject = { shared: SharedGestureState } & { [K in StateKey]: GestureState<Coordinates | DistanceAngle> }

export type Handler<T extends Coordinates | DistanceAngle> = (state: FullGestureState<T>) => any | void
export type HandlerKey = 'onDrag' | 'onPinch' | 'onMove' | 'onHover' | 'onScroll' | 'onWheel'

export type GestureHandlers = {
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
