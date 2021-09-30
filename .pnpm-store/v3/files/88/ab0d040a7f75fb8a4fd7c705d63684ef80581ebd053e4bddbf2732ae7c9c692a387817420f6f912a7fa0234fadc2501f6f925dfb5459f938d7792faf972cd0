import { UseGestureConfig, Handlers, EventTypes, AnyGestureEventTypes } from '../types';
export declare function wrapStart(fn: Function): (this: any, { first }: any) => void;
export declare function wrapEnd(fn: Function): (this: any, { last }: any) => void;
/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {Handlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} [config={}] - the full config object
 * @returns {(...args: any[]) => HookReturnType<Config>}
 */
export declare function useGesture<T extends AnyGestureEventTypes = EventTypes>(_handlers: Handlers<T>, config?: UseGestureConfig): (...args: any[]) => import("../types").ReactEventHandlers;
