/// <reference types="react" />
import { Vector2, WebKitGestureEvent, DomEvents } from '../types';
/**
 * Whether the browser supports GestureEvent (ie Safari)
 * @returns true if the browser supports gesture event
 */
export declare function supportsGestureEvents(): boolean;
export declare function supportsTouchEvents(): boolean;
export declare function supportsPointerEvents(): boolean;
export declare function getTouchIds(event: TouchEvent | React.TouchEvent): number[];
export declare function getGenericEventData(event: DomEvents): {
    buttons: number;
    shiftKey: any;
    altKey: any;
    metaKey: any;
    ctrlKey: any;
};
/**
 * Gets pointer event values.
 * @param event
 * @returns pointer event values
 */
export declare function getPointerEventValues(event: TouchEvent | React.TouchEvent | React.PointerEvent | PointerEvent, transform?: (xy: Vector2) => Vector2): Vector2;
/**
 * Gets two touches event data
 * @param event
 * @returns two touches event data
 */
export declare function getTwoTouchesEventValues(event: React.TouchEvent | TouchEvent, pointerIds: [number, number], transform?: (xy: Vector2) => Vector2): {
    values: Vector2;
    origin: Vector2;
};
/**
 * Gets scroll event values
 * @param event
 * @returns scroll event values
 */
export declare function getScrollEventValues(event: React.UIEvent | UIEvent, transform?: (xy: Vector2) => Vector2): Vector2;
/**
 * Gets wheel event values.
 * @param event
 * @returns wheel event values
 */
export declare function getWheelEventValues(event: React.WheelEvent | WheelEvent, transform?: (xy: Vector2) => Vector2): Vector2;
/**
 * Gets webkit gesture event values.
 * @param event
 * @returns webkit gesture event values
 */
export declare function getWebkitGestureEventValues(event: WebKitGestureEvent, transform?: (xy: Vector2) => Vector2): Vector2;
