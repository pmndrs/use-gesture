/// <reference types="react" />
import { StateKey, State, Fn, ReactEventHandlers, InternalConfig, InternalHandlers, RecognizerClass } from './types';
/**
 * The controller will keep track of the state for all gestures and also keep
 * track of timeouts, and window listeners.
 */
export default class Controller {
    private classes;
    nativeRefs: any;
    config: InternalConfig;
    handlers: InternalHandlers;
    state: State;
    timeouts: {
        [stateKey in StateKey]?: number;
    };
    domListeners: [string, Fn][];
    windowListeners: {
        [stateKey in StateKey]?: [string, Function][];
    };
    pointerIds: Set<number>;
    touchIds: Set<number>;
    supportsTouchEvents: boolean;
    supportsGestureEvents: boolean;
    constructor(classes: Set<RecognizerClass>);
    bind: (...args: any[]) => void | ReactEventHandlers;
    effect: () => () => void;
    /**
     * Function ran on component unmount: cleans timeouts and removes dom listeners set by the bind function.
     */
    clean: () => void;
}
export declare function addEventIds(controller: Controller, event: React.TouchEvent | TouchEvent | React.PointerEvent | PointerEvent): void;
export declare function removeEventIds(controller: Controller, event: React.TouchEvent | TouchEvent | React.PointerEvent | PointerEvent): void;
export declare function clearAllWindowListeners(controller: Controller): void;
export declare function clearWindowListeners({ config, windowListeners }: Controller, stateKey: StateKey, options?: {
    capture?: boolean | undefined;
    passive?: boolean | undefined;
}): void;
export declare function updateWindowListeners({ config, windowListeners }: Controller, stateKey: StateKey, listeners?: [string, Fn][], options?: {
    capture?: boolean | undefined;
    passive?: boolean | undefined;
}): void;
/**
 * bindings is an object which keys match ReactEventHandlerKeys.
 * Since a recognizer might want to bind a handler function to an event key already used by a previously
 * added recognizer, we need to make sure that each event key is an array of all the functions mapped for
 * that key.
 */
export declare function addBindings(bindings: any, name: string, fn: Fn): void;
