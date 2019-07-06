import { MouseEvent, TouchEvent, WheelEvent, PointerEvent } from 'react'
import { Fn, Vector2 } from './types/common'
import { EventOptions } from './types/config'
import { Coordinates, FullGestureState, DistanceAngle } from './types/states'
import { TransformedEvent } from './types/events'

// blank function
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

/**
 * Gets modifier keys from event
 * @param event
 * @returns modifier keys
 */
export function getModifierKeys(event: TransformedEvent): ModifierKeys {
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { shiftKey, altKey, metaKey, ctrlKey }
}
type ScrollEventData = Pick<FullGestureState<Coordinates>, 'values'> & ModifierKeys

/**
 * Gets scroll event data
 * @param event
 * @returns scroll event data
 */
export function getScrollEventData(event: TransformedEvent): ScrollEventData {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = <Element & Window>event.currentTarget
  return { values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], ...getModifierKeys(event) }
}

type WheelEventData = Pick<FullGestureState<Coordinates>, 'values'> & ModifierKeys

/**
 * Gets wheel event data
 * @param event
 * @returns wheel event data
 */
export function getWheelEventData(event: TransformedEvent<WheelEvent>): WheelEventData {
  const { deltaX, deltaY } = event
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { values: [deltaX, deltaY], ...getModifierKeys(event) }
}
type PointerEventData = Pick<FullGestureState<Coordinates>, 'values' | 'touches' | 'down' | 'buttons'> & ModifierKeys

/**
 * Gets pointer event data
 * @param event
 * @returns pointer event data
 */
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

/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */
export function getTwoTouchesEventData(event: TouchEvent): TwoTouchesEventData {
  const { touches } = event
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY

  const da: Vector2 = [Math.hypot(dx, dy), -(Math.atan2(dx, dy) * 180) / Math.PI]
  const origin: Vector2 = [(touches[1].clientX + touches[0].clientX) / 2, (touches[1].clientY + touches[0].clientY) / 2]

  return { values: da, origin, touches: 2, down: touches.length > 0, ...getModifierKeys(event) }
}

/**
 * Calculates velocity
 * @param diff the difference between current and previous vectors
 * @param delta_t the time delta
 * @param len the length of the diff vector
 * @returns velocity
 */
export function calculateVelocity(diff: number[], delta_t: number, len: number): number {
  len = len || Math.hypot(...diff)
  return delta_t ? len / delta_t : 0
}

/**
 * Calculates velocities vector
 * @template T the expected vector type
 * @param diff the previous value
 * @param delta_t the time delta
 * @returns velocities vector
 */
export function calculateVelocities<T extends number[]>(diff: T, delta_t: number): T {
  return delta_t ? <T>diff.map(v => v / delta_t) : <T>Array(diff.length).fill(0)
}

/**
 * Calculates distance
 * @param delta the difference between current and initial vectors
 * @returns distance
 */
export function calculateDistance(delta: number[]): number {
  return Math.hypot(...delta)
}

/**
 * Calculates direction
 * @template T the expected vector type
 * @param diff
 * @param len
 * @returns direction
 */
export function calculateDirection<T extends number[]>(diff: T, len: number): T {
  len = len || Math.hypot(...diff) || 1
  return <T>diff.map(v => v / len)
}

interface Kinematics<T extends number[]> {
  velocities: T
  velocity: number
  distance: number
  direction: T
}

/**
 * Calculates all kinematics
 * @template T the expected vector type
 * @param delta the difference between current and initial vectors
 * @param diff the difference between current and previous vectors
 * @param delta_t the time delta between current and previous timestamps
 * @returns all kinematics
 */
export function calculateAllKinematics<T extends number[]>(delta: T, diff: T, delta_t: number): Kinematics<T> {
  const len = Math.hypot(...diff)

  return {
    velocities: calculateVelocities(diff, delta_t),
    velocity: calculateVelocity(diff, delta_t, len),
    distance: calculateDistance(delta),
    direction: calculateDirection(diff, len),
  }
}

/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
export function supportsGestureEvent(): boolean {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: Unreachable code error
    return 'constructor' in GestureEvent
  } catch (e) {
    return false
  }
}
