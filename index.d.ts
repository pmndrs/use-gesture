import * as React from 'react'

// Helper type, taken from: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type vector2 = [number, number]

interface GestureSharedState {
  args: any
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
}

interface GestureCommonState extends GestureSharedState {
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
}

export interface GestureXYState extends GestureCommonState {
  xy: vector2
  velocity: number
  vxvy: vector2
  distance: number
  direction: vector2
}

export interface GestureDAState extends GestureCommonState {
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

export interface GestureOptions {
  onDrag(state: GestureXYState): any
  onDragStart(state: GestureXYState): any
  onDragEnd(state: GestureXYState): any
  onMove(state: GestureXYState): any
  onMoveStart(state: GestureXYState): any
  onMoveEnd(state: GestureXYState): any
  onScroll(state: GestureXYState): any
  onScrollStart(state: GestureXYState): any
  onScrollEnd(state: GestureXYState): any
  onWheel(state: GestureXYState): any
  onWheelStart(state: GestureXYState): any
  onWheelEnd(state: GestureXYState): any
  onPinch(state: GestureDAState): any
  onPinchStart(state: GestureDAState): any
  onPinchEnd(state: GestureDAState): any
}

type GestureEvents = {
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
  onDrag: (state: GestureXYState) => any,
  config?: Partial<GestureConfig>
): (...args: any[]) => Partial<GestureEvents>
export function useGesture(options: AtLeastOne<GestureOptions>, config?: Partial<GestureConfig>): (...args: any[]) => Partial<GestureEvents>
