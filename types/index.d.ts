// TypeScript Version: 3.0
import * as React from 'react'

// Helper type, taken from: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type vector2 = [number, number]

export interface CommonGestureState {
  hovering?: boolean
  scrolling?: boolean
  dragging?: boolean
  moving?: boolean
  pinching?: boolean
  touches?: number
  down?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  ctrlKey?: boolean
  event: MouseEvent | TouchEvent
  delta: vector2
  initial: vector2
  previous: vector2
  transform(): vector2
  local: vector2
  lastLocal: vector2
  first: boolean
  last: boolean
  active: boolean
  time: number
  temp: any
  cancel?(): void
  canceled: boolean
  args: any
}

export interface CoordinatesGestureState extends CommonGestureState {
  xy: vector2
  velocity: number
  vxvy: vector2
  distance: number
  direction: vector2
}

export interface DistanceAngleGestureState extends CommonGestureState {
  da: vector2
  vdva: vector2
  turns: number
}

export interface EventConfig {
  passive: boolean
  capture: boolean
  pointerEvents: boolean
}

export interface GestureConfig {
  domTarget: EventTarget
  event: Partial<EventConfig>
  window: EventTarget
  transform(): vector2
  enabled: boolean
  drag: boolean
  pinch: boolean
  scroll: boolean
  wheel: boolean
  hover: boolean
  move: boolean
}

export type CoordinatesHandler = (state: CoordinatesGestureState) => any
export type DistanceAngleHandler = (state: DistanceAngleGestureState) => any

export interface GestureHandlers {
  onDrag: CoordinatesHandler
  onDragStart: CoordinatesHandler
  onDragEnd: CoordinatesHandler
  onMove: CoordinatesHandler
  onMoveStart: CoordinatesHandler
  onMoveEnd: CoordinatesHandler
  onScroll: CoordinatesHandler
  onScrollStart: CoordinatesHandler
  onScrollEnd: CoordinatesHandler
  onWheel: CoordinatesHandler
  onWheelStart: CoordinatesHandler
  onWheelEnd: CoordinatesHandler
  onPinch: DistanceAngleHandler
  onPinchStart: DistanceAngleHandler
  onPinchEnd: DistanceAngleHandler
}

export interface GestureEvents {
  onMouseDown: React.MouseEventHandler
  onMouseUp: React.MouseEventHandler
  onMouseEnter: React.MouseEventHandler
  onMouseLeave: React.MouseEventHandler
  onMouseMove: React.MouseEventHandler
  onTouchStart: React.TouchEventHandler
  onTouchMove: React.TouchEventHandler
  onTouchEnd: React.TouchEventHandler
  onTouchCancel: React.TouchEventHandler
}

export function useGesture(
  handlers: AtLeastOne<GestureHandlers> | CoordinatesHandler,
  config?: Partial<GestureConfig>
): (...args: any[]) => Partial<GestureEvents>
