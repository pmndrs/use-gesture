import { OneOrMore, UnknownProps, Lookup, Falsy } from '@react-spring/types';
import { FrameValue } from './FrameValue';
import type { SpringRef } from './SpringRef';
import { SpringValue } from './SpringValue';
import { RunAsyncState } from './runAsync';
import { AnimationResult, AsyncResult, ControllerFlushFn, ControllerUpdate, SpringValues } from './types';
/** Queue of pending updates for a `Controller` instance. */
export interface ControllerQueue<State extends Lookup = Lookup> extends Array<ControllerUpdate<State, any> & {
    /** The keys affected by this update. When null, all keys are affected. */
    keys: string[] | null;
}> {
}
export declare class Controller<State extends Lookup = Lookup> {
    readonly id: number;
    /** The animated values */
    springs: SpringValues<State>;
    /** The queue of props passed to the `update` method. */
    queue: ControllerQueue<State>;
    /**
     * The injected ref. When defined, render-based updates are pushed
     * onto the `queue` instead of being auto-started.
     */
    ref?: SpringRef<State>;
    /** Custom handler for flushing update queues */
    protected _flush?: ControllerFlushFn<this>;
    /** These props are used by all future spring values */
    protected _initialProps?: Lookup;
    /** The counter for tracking `scheduleProps` calls */
    protected _lastAsyncId: number;
    /** The values currently being animated */
    protected _active: Set<FrameValue<any>>;
    /** The values that changed recently */
    protected _changed: Set<FrameValue<any>>;
    /** Equals false when `onStart` listeners can be called */
    protected _started: boolean;
    private _item?;
    /** State used by the `runAsync` function */
    protected _state: RunAsyncState<this>;
    /** The event queues that are flushed once per frame maximum */
    protected _events: {
        onStart: Map<((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item?: any) => void) | ((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item: any) => void), AnimationResult<any>>;
        onChange: Map<((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item?: any) => void) | ((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item: any) => void), AnimationResult<any>>;
        onRest: Map<((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item?: any) => void) | ((result: AnimationResult<SpringValue<State>>, ctrl: Controller<State>, item: any) => void), AnimationResult<any>>;
    };
    constructor(props?: ControllerUpdate<State> | null, flush?: ControllerFlushFn<any>);
    /**
     * Equals `true` when no spring values are in the frameloop, and
     * no async animation is currently active.
     */
    get idle(): boolean;
    get item(): any;
    set item(item: any);
    /** Get the current values of our springs */
    get(): State & UnknownProps;
    /** Set the current values without animating. */
    set(values: Partial<State>): void;
    /** Push an update onto the queue of each value. */
    update(props: ControllerUpdate<State> | Falsy): this;
    /**
     * Start the queued animations for every spring, and resolve the returned
     * promise once all queued animations have finished or been cancelled.
     *
     * When you pass a queue (instead of nothing), that queue is used instead of
     * the queued animations added with the `update` method, which are left alone.
     */
    start(props?: OneOrMore<ControllerUpdate<State>> | null): AsyncResult<this>;
    /** Stop all animations. */
    stop(): this;
    /** Stop animations for the given keys. */
    stop(keys: OneOrMore<string>): this;
    /** Cancel all animations. */
    stop(cancel: boolean): this;
    /** Cancel animations for the given keys. */
    stop(cancel: boolean, keys: OneOrMore<string>): this;
    /** Stop some or all animations. */
    stop(keys?: OneOrMore<string>): this;
    /** Cancel some or all animations. */
    stop(cancel: boolean, keys?: OneOrMore<string>): this;
    /** Freeze the active animation in time */
    pause(keys?: OneOrMore<string>): this;
    /** Resume the animation if paused. */
    resume(keys?: OneOrMore<string>): this;
    /** Call a function once per spring value */
    each(iterator: (spring: SpringValue, key: string) => void): void;
    /** @internal Called at the end of every animation frame */
    protected _onFrame(): void;
    /** @internal */
    eventObserved(event: FrameValue.Event): void;
}
/**
 * Warning: Props might be mutated.
 */
export declare function flushUpdateQueue(ctrl: Controller<any>, queue: ControllerQueue): Promise<AnimationResult<any>>;
/**
 * Warning: Props might be mutated.
 *
 * Process a single set of props using the given controller.
 *
 * The returned promise resolves to `true` once the update is
 * applied and any animations it starts are finished without being
 * stopped or cancelled.
 */
export declare function flushUpdate(ctrl: Controller<any>, props: ControllerQueue[number], isLoop?: boolean): AsyncResult;
/**
 * From an array of updates, get the map of `SpringValue` objects
 * by their keys. Springs are created when any update wants to
 * animate a new key.
 *
 * Springs created by `getSprings` are neither cached nor observed
 * until they're given to `setSprings`.
 */
export declare function getSprings<State extends Lookup>(ctrl: Controller<Lookup<any>>, props?: OneOrMore<ControllerUpdate<State>>): {
    [x: string]: any;
};
/**
 * Tell a controller to manage the given `SpringValue` objects
 * whose key is not already in use.
 */
export declare function setSprings(ctrl: Controller<Lookup<any>>, springs: SpringValues<UnknownProps>): void;
