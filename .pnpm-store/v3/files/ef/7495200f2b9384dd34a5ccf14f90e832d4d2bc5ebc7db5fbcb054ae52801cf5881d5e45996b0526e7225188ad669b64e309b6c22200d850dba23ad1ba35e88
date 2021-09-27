import { FluidValue } from '@react-spring/shared';
import { InterpolatorArgs } from '@react-spring/types';
import { Interpolation } from './Interpolation';
export declare const isFrameValue: (value: any) => value is FrameValue<any>;
/**
 * A kind of `FluidValue` that manages an `AnimatedValue` node.
 *
 * Its underlying value can be accessed and even observed.
 */
export declare abstract class FrameValue<T = any> extends FluidValue<T, FrameValue.Event<T>> {
    readonly id: number;
    abstract key?: string;
    abstract get idle(): boolean;
    protected _priority: number;
    get priority(): number;
    set priority(priority: number);
    /** Get the current value */
    get(): T;
    /** Create a spring that maps our value to another value */
    to<Out>(...args: InterpolatorArgs<T, Out>): Interpolation<T, Out>;
    /** @deprecated Use the `to` method instead. */
    interpolate<Out>(...args: InterpolatorArgs<T, Out>): Interpolation<T, Out>;
    toJSON(): T;
    protected observerAdded(count: number): void;
    protected observerRemoved(count: number): void;
    /** @internal */
    abstract advance(dt: number): void;
    /** @internal */
    abstract eventObserved(_event: FrameValue.Event): void;
    /** Called when the first child is added. */
    protected _attach(): void;
    /** Called when the last child is removed. */
    protected _detach(): void;
    /** Tell our children about our new value */
    protected _onChange(value: T, idle?: boolean): void;
    /** Tell our children about our new priority */
    protected _onPriorityChange(priority: number): void;
}
export declare namespace FrameValue {
    /** A parent changed its value */
    interface ChangeEvent<T = any> {
        parent: FrameValue<T>;
        type: 'change';
        value: T;
        idle: boolean;
    }
    /** A parent changed its priority */
    interface PriorityEvent<T = any> {
        parent: FrameValue<T>;
        type: 'priority';
        priority: number;
    }
    /** A parent is done animating */
    interface IdleEvent<T = any> {
        parent: FrameValue<T>;
        type: 'idle';
    }
    /** Events sent to children of `FrameValue` objects */
    type Event<T = any> = ChangeEvent<T> | PriorityEvent<T> | IdleEvent<T>;
}
