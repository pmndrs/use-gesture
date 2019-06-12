import { DistanceAngle, FullGestureState, Coordinates } from './states'
import { AtLeastOneOf, Fn, Omit } from './common'
import { DOMAttributes, ReactEventHandler } from 'react'
import { GestureConfig } from './config'
import { ReactEventHandlers } from './events'

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
  Partial<Omit<DOMAttributes<Element>, 'onDrag' | 'onScroll' | 'onWheel'>>

export type GetBinderTypeFromDomTarget<T extends Partial<GestureConfig>> = T['domTarget'] extends object ? Fn : ReactEventHandlers

export function useGesture<Config extends Partial<GestureConfig>>(
  handlers: GestureHandlersPartial,
  config?: Config
): (...args: any[]) => GetBinderTypeFromDomTarget<Config>

export function useGesture<Config extends Partial<GestureConfig>>(
  handlers: Handler<Coordinates>,
  config?: Config
): (...args: any[]) => GetBinderTypeFromDomTarget<Config>
