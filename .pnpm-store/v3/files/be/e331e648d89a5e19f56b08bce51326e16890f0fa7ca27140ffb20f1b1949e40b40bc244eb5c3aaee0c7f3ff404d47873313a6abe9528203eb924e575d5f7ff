import { FluidValue } from '@react-spring/shared';
import { Animated } from '@react-spring/animated';
import { Animation } from './Animation';
import { RunAsyncState, RunAsyncProps } from './runAsync';
import { FrameValue } from './FrameValue';
import { AnimationRange, AnimationResolver, PickEventFns } from './types/internal';
import { AsyncResult, SpringUpdate, VelocityProp, SpringProps } from './types';
interface DefaultSpringProps<T> extends Pick<SpringProps<T>, 'pause' | 'cancel' | 'immediate' | 'config'>, PickEventFns<SpringProps<T>> {
}
/**
 * Only numbers, strings, and arrays of numbers/strings are supported.
 * Non-animatable strings are also supported.
 */
export declare class SpringValue<T = any> extends FrameValue<T> {
    /** The property name used when `to` or `from` is an object. Useful when debugging too. */
    key?: string;
    /** The animation state */
    animation: Animation<T>;
    /** The queue of pending props */
    queue?: SpringUpdate<T>[];
    /** Some props have customizable default values */
    defaultProps: DefaultSpringProps<T>;
    /** The state for `runAsync` calls */
    protected _state: RunAsyncState<SpringValue<T>>;
    /** The promise resolvers of pending `start` calls */
    protected _pendingCalls: Set<AnimationResolver<this>>;
    /** The counter for tracking `scheduleProps` calls */
    protected _lastCallId: number;
    /** The last `scheduleProps` call that changed the `to` prop */
    protected _lastToId: number;
    protected _memoizedDuration: number;
    constructor(from: Exclude<T, object>, props?: SpringUpdate<T>);
    constructor(props?: SpringUpdate<T>);
    /** Equals true when not advancing on each frame. */
    get idle(): boolean;
    get goal(): T;
    get velocity(): VelocityProp<T>;
    /**
     * When true, this value has been animated at least once.
     */
    get hasAnimated(): boolean;
    /**
     * When true, this value has an unfinished animation,
     * which is either active or paused.
     */
    get isAnimating(): boolean;
    /**
     * When true, all current and future animations are paused.
     */
    get isPaused(): boolean;
    /** Advance the current animation by a number of milliseconds */
    advance(dt: number): void;
    /** Set the current value, while stopping the current animation */
    set(value: T | FluidValue<T>): this;
    /**
     * Freeze the active animation in time, as well as any updates merged
     * before `resume` is called.
     */
    pause(): void;
    /** Resume the animation if paused. */
    resume(): void;
    /** Skip to the end of the current animation. */
    finish(): this;
    /** Push props into the pending queue. */
    update(props: SpringUpdate<T>): this;
    /**
     * Update this value's animation using the queue of pending props,
     * and unpause the current animation (if one is frozen).
     *
     * When arguments are passed, a new animation is created, and the
     * queued animations are left alone.
     */
    start(): AsyncResult<this>;
    start(props: SpringUpdate<T>): AsyncResult<this>;
    start(to: T, props?: SpringProps<T>): AsyncResult<this>;
    /**
     * Stop the current animation, and cancel any delayed updates.
     *
     * Pass `true` to call `onRest` with `cancelled: true`.
     */
    stop(cancel?: boolean): this;
    /** Restart the animation. */
    reset(): void;
    /** @internal */
    eventObserved(event: FrameValue.Event): void;
    /**
     * Parse the `to` and `from` range from the given `props` object.
     *
     * This also ensures the initial value is available to animated components
     * during the render phase.
     */
    protected _prepareNode(props: {
        to?: any;
        from?: any;
        reverse?: boolean;
        default?: any;
    }): {
        to: any;
        from: any;
    };
    /** Every update is processed by this method before merging. */
    protected _update({ ...props }: SpringProps<T>, isLoop?: boolean): AsyncResult<SpringValue<T>>;
    /** Merge props into the current animation */
    protected _merge(range: AnimationRange<T>, props: RunAsyncProps<SpringValue<T>>, resolve: AnimationResolver<SpringValue<T>>): void;
    /** Update the `animation.to` value, which might be a `FluidValue` */
    protected _focus(value: T | FluidValue<T>): void;
    protected _attach(): void;
    protected _detach(): void;
    /**
     * Update the current value from outside the frameloop,
     * and return the `Animated` node.
     */
    protected _set(arg: T | FluidValue<T>, idle?: boolean): Animated | undefined;
    protected _onStart(): void;
    protected _onChange(value: T, idle?: boolean): void;
    protected _start(): void;
    protected _resume(): void;
    /**
     * Exit the frameloop and notify `onRest` listeners.
     *
     * Always wrap `_stop` calls with `batchedUpdates`.
     */
    protected _stop(goal?: any, cancel?: boolean): void;
}
export declare function createLoopUpdate<T>(props: T & {
    loop?: any;
    to?: any;
    from?: any;
    reverse?: any;
}, loop?: any, to?: any): T | undefined;
/**
 * Return a new object based on the given `props`.
 *
 * - All non-reserved props are moved into the `to` prop object.
 * - The `keys` prop is set to an array of affected keys,
 *   or `null` if all keys are affected.
 */
export declare function createUpdate(props: any): any;
/**
 * A modified version of `createUpdate` meant for declarative APIs.
 */
export declare function declareUpdate(props: any): any;
export {};
