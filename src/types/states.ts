import { Vector2, TransformType } from './common'
import { TransformedEvent } from './events'

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
  temp?: any
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
