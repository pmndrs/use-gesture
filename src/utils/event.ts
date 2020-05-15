import { Fn, EventOptions, UseGestureEvent, Vector2, WebKitGestureEvent } from '../types'

const WEBKIT_DISTANCE_SCALE_FACTOR = 260

/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
export function supportsGestureEvents(): boolean {
  try {
    // TODO [TS] possibly find GestureEvent definitions?
    // @ts-ignore: no type definitions for webkit GestureEvents
    return 'constructor' in GestureEvent
  } catch (e) {
    return false
  }
}

export function addListeners(el: EventTarget, listeners: Array<[string, Fn]>, options: EventOptions) {
  for (let [eventName, eventHandler] of listeners) {
    el.addEventListener(eventName, eventHandler, options)
  }
}

export function removeListeners(el: EventTarget, listeners: Array<[string, Fn]>, options: EventOptions) {
  for (let [eventName, eventHandler] of listeners) {
    el.removeEventListener(eventName, eventHandler, options)
  }
}

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
export function getModifierKeys({ shiftKey, altKey, metaKey, ctrlKey }: UseGestureEvent): ModifierKeys {
  return { shiftKey, altKey, metaKey, ctrlKey }
}

function getTouchEvents(event: UseGestureEvent) {
  if ('touches' in event) {
    const { targetTouches, changedTouches } = event
    return targetTouches.length > 0 ? targetTouches : changedTouches
  }
  return null
}

export function getGenericEventData(event: React.MouseEvent | React.TouchEvent | React.PointerEvent) {
  const buttons = 'buttons' in event ? event.buttons : 0
  const touchEvents = getTouchEvents(event)
  const touches = (touchEvents && touchEvents.length) || 0
  const down = touches > 0 || buttons > 0
  return { touches, down, buttons, ...getModifierKeys(event) }
}

/**
 * Gets scroll event values
 * @param event
 * @returns scroll event values
 */
export function getScrollEventValues(event: UseGestureEvent): Vector2 {
  // If the currentTarget is the window then we return the scrollX/Y position.
  // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
  const { scrollX, scrollY, scrollLeft, scrollTop } = event.currentTarget as Element & Window
  return [scrollX || scrollLeft || 0, scrollY || scrollTop || 0]
}

/**
 * Gets wheel event values.
 * @param event
 * @returns wheel event values
 */
export function getWheelEventValues(event: UseGestureEvent<React.WheelEvent>): Vector2 {
  const { deltaX, deltaY } = event
  //TODO implement polyfill ?
  // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  return [deltaX, deltaY]
}

/**
 * Gets pointer event values.
 * @param event
 * @returns pointer event values
 */
export function getPointerEventValues(event: React.MouseEvent | React.TouchEvent | React.PointerEvent): Vector2 {
  const touchEvents = getTouchEvents(event)
  const { clientX, clientY } = touchEvents ? touchEvents[0] : (event as React.PointerEvent)
  return [clientX, clientY]
}

/**
 * Gets webkit gesture event values.
 * @param event
 * @returns webkit gesture event values
 */
export function getWebkitGestureEventValues(event: WebKitGestureEvent): Vector2 {
  return [event.scale * WEBKIT_DISTANCE_SCALE_FACTOR, event.rotation]
}

/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */
export function getTwoTouchesEventData({ targetTouches }: React.TouchEvent) {
  const A = targetTouches[0],
    B = targetTouches[1]

  const dx = B.clientX - A.clientX
  const dy = B.clientY - A.clientY
  const cx = (B.clientX + A.clientX) / 2
  const cy = (B.clientY + A.clientY) / 2

  const distance = Math.hypot(dx, dy)
  const angle = -(Math.atan2(dx, dy) * 180) / Math.PI

  const values: Vector2 = [distance, angle]
  const origin: Vector2 = [cx, cy]

  return { values, origin }
}
