import { FullGestureState } from './state'
import { GestureKey } from './config'

export type Handler<Key extends GestureKey> = (state: FullGestureState<Key>) => any | void

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

export type NativeHandlers = React.DOMAttributes<EventTarget>

export type GestureHandlers = Partial<UserHandlers & NativeHandlers>

export type InternalHandlers = { [Key in GestureKey]?: Handler<Key> }
