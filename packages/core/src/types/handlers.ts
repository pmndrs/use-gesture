import { FullGestureState, State } from './state'
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

export type ReactDOMAttributes = React.DOMAttributes<EventTarget>

type NativeHandlersKeys = keyof Omit<ReactDOMAttributes, keyof UserHandlers | 'children' | 'dangerouslySetInnerHTML'>

type GetEventType<Key extends NativeHandlersKeys> = ReactDOMAttributes[Key] extends
  | React.EventHandler<infer EventType>
  | undefined
  ? EventType
  : UIEvent

export type NativeHandlers = {
  [key in NativeHandlersKeys]?: (state: State['shared'] & { event: GetEventType<key>; args: any }, ...args: any) => void
}

export type GestureHandlers = Partial<NativeHandlers & UserHandlers>

export type InternalHandlers = { [Key in GestureKey]?: Handler<Key> }
