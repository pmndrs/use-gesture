import { Fn, Vector2 } from '../types/common.d'
import { EventOptions } from '../types/config.d'
import { Coordinates, FullGestureState, DistanceAngle } from '../types/states.d'
import { TransformedEvent } from '../types/events.d'

export const noop = () => {}

// returns a function that chains all functions given as parameters
export const chainFns = (...fns: Fn[]): Fn => (...args: any[]) => fns.forEach(fn => fn(...args))

// vector add
export const addV = <T extends number[]>(v1: T, v2: T): T => <T>v1.map((v, i) => v + v2[i])

// vector substract
export const subV = <T extends number[]>(v1: T, v2: T): T => <T>v1.map((v, i) => v - v2[i])

const setListeners = (add: boolean) => (el: EventTarget, listeners: [string, Fn][], options: EventOptions): void => {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

export const addListeners = setListeners(true)
export const removeListeners = setListeners(false)

interface ModifierKeys {
  shiftKey: boolean
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
}

export function getModifierKeys(event: TransformedEvent): ModifierKeys {
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { shiftKey, altKey, metaKey, ctrlKey }
}
type ScrollEventData = Pick<FullGestureState<Coordinates>, 'values'> & ModifierKeys

export function getScrollEventData(event: TransformedEvent): ScrollEventData {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = <Element & Window>event.currentTarget
  return { values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], ...getModifierKeys(event) }
}

type WheelEventData = Pick<FullGestureState<Coordinates>, 'values'> & ModifierKeys

export function getWheelEventData(event: TransformedEvent<WheelEvent>): WheelEventData {
  const { deltaX, deltaY } = event
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { values: [deltaX, deltaY], ...getModifierKeys(event) }
}
type PointerEventData = Pick<FullGestureState<Coordinates>, 'values' | 'touches' | 'down' | 'buttons'> & ModifierKeys

export function getPointerEventData(event: MouseEvent | TouchEvent | PointerEvent): PointerEventData {
  const { touches, buttons, changedTouches } = event as any
  const touchEvents = touches && touches.length > 0 ? touches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX, clientY } = touchEvents ? touchEvents[0] : event
  const down = (touchEvents && touchEvents.length > 0) || buttons > 0
  return {
    values: [clientX, clientY],
    touches: (touchEvents && touchEvents.length) || 0,
    down,
    buttons,
    ...getModifierKeys(event),
  }
}

type TwoTouchesEventData = Pick<FullGestureState<DistanceAngle>, 'values' | 'touches' | 'down' | 'origin'> & ModifierKeys

export function getTwoTouchesEventData(event: TouchEvent): TwoTouchesEventData {
  const { touches } = event
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY

  const da: Vector2 = [Math.hypot(dx, dy), -(Math.atan2(dx, dy) * 180) / Math.PI]
  const origin: Vector2 = [(touches[1].clientX + touches[0].clientX) / 2, (touches[1].clientY + touches[0].clientY) / 2]

  return { values: da, origin, touches: 2, down: touches.length > 0, ...getModifierKeys(event) }
}

export const calculateVelocity = (diff: number[], delta_t: number, len: number): number => {
  len = len || Math.hypot(...diff)
  return delta_t ? len / delta_t : 0
}

export const calculateVelocities = <T extends number[]>(diff: T, delta_t: number): T => {
  return delta_t ? <T>diff.map(v => v / delta_t) : <T>Array(diff.length).fill(0)
}

export const calculateDistance = (delta: number[]): number => Math.hypot(...delta)

export const calculateDirection = <T extends number[]>(diff: T, len: number): T => {
  len = len || Math.hypot(...diff) || 1
  return <T>diff.map(v => v / len)
}

interface Kinematics<T extends number[]> {
  velocities: T
  velocity: number
  distance: number
  direction: T
}

export const calculateAllKinematics = <T extends number[]>(delta: T, diff: T, delta_t: number): Kinematics<T> => {
  const len = Math.hypot(...diff)

  return {
    velocities: calculateVelocities(diff, delta_t),
    velocity: calculateVelocity(diff, delta_t, len),
    distance: calculateDistance(delta),
    direction: calculateDirection(diff, len),
  }
}

export const supportsGestureEvent = (): boolean => {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: Unreachable code error
    return 'constructor' in GestureEvent
  } catch (e) {
    return false
  }
}
