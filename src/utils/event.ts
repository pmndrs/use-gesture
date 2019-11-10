import { Fn, EventOptions, UseGestureEvent, FullGestureState, Coordinates, DistanceAngle, Vector2 } from '../types'

const setListeners = (add: boolean) => (el: EventTarget, listeners: [string, Fn][], options: EventOptions): void => {
  const action = add ? 'addEventListener' : 'removeEventListener'
  listeners.forEach(([type, fn]) => el[action](type, fn, options))
}

/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
export function gestureEventSupported(): boolean {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: no type definitions for webkit GestureEvents
    return 'constructor' in GestureEvent
  } catch (e) {
    return false
  }
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
export function getModifierKeys(event: UseGestureEvent): ModifierKeys {
  const { shiftKey, altKey, metaKey, ctrlKey } = event
  return { shiftKey, altKey, metaKey, ctrlKey }
}
type ScrollEventData = Pick<FullGestureState<Coordinates>, 'xy'> & ModifierKeys

/**
 * Gets scroll event data
 * @param event
 * @returns scroll event data
 */
export function getScrollEventData(event: UseGestureEvent): ScrollEventData {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = <Element & Window>event.currentTarget
  return { xy: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0], ...getModifierKeys(event) }
}

type WheelEventData = Pick<FullGestureState<Coordinates>, 'xy'> & ModifierKeys

/**
 * Gets wheel event data
 * @param event
 * @returns wheel event data
 */
export function getWheelEventData(event: UseGestureEvent<React.WheelEvent>): WheelEventData {
  const { deltaX, deltaY } = event
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return { xy: [deltaX, deltaY], ...getModifierKeys(event) }
}

type PointerEventData = Pick<FullGestureState<Coordinates>, 'xy' | 'touches' | 'down' | 'buttons'> & ModifierKeys
/**
 * Gets pointer event data
 * @param event
 * @returns pointer event data
 */
export function getPointerEventData(event: React.MouseEvent | React.TouchEvent | React.PointerEvent): PointerEventData {
  const { touches: eventTouches, buttons, changedTouches } = event as any
  const touchEvents =
    eventTouches && eventTouches.length > 0 ? eventTouches : changedTouches && changedTouches.length > 0 ? changedTouches : null
  const { clientX, clientY } = touchEvents ? touchEvents[0] : event
  const touches = (touchEvents && touchEvents.length) || 0
  const down = touches > 0 || buttons > 0
  return {
    xy: [clientX, clientY],
    touches,
    down,
    buttons,
    ...getModifierKeys(event),
  }
}

type TwoTouchesEventData = Pick<FullGestureState<DistanceAngle>, 'da' | 'touches' | 'down' | 'origin'> & ModifierKeys

/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */
export function getTwoTouchesEventData(event: React.TouchEvent): TwoTouchesEventData {
  const { touches } = event
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY

  const da: Vector2 = [Math.hypot(dx, dy), -(Math.atan2(dx, dy) * 180) / Math.PI]
  const origin: Vector2 = [(touches[1].clientX + touches[0].clientX) / 2, (touches[1].clientY + touches[0].clientY) / 2]

  return { da, origin, touches: 2, down: touches.length > 0, ...getModifierKeys(event) }
}
