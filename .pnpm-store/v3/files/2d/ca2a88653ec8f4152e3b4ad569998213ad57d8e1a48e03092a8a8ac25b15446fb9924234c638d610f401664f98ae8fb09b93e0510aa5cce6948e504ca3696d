import { AnimatedValue } from './AnimatedValue';
export declare const isAnimated: <T = any>(value: any) => value is Animated<T>;
/** Get the owner's `Animated` node. */
export declare const getAnimated: <T = any>(owner: any) => Animated<T> | undefined;
/** Set the owner's `Animated` node. */
export declare const setAnimated: (owner: any, node: Animated) => any;
/** Get every `AnimatedValue` in the owner's `Animated` node. */
export declare const getPayload: (owner: any) => AnimatedValue[] | undefined;
export declare abstract class Animated<T = any> {
    /** The cache of animated values */
    protected payload?: Payload;
    constructor();
    /** Get the current value. Pass `true` for only animated values. */
    abstract getValue(animated?: boolean): T;
    /** Set the current value. Returns `true` if the value changed. */
    abstract setValue(value: T): boolean | void;
    /** Reset any animation state. */
    abstract reset(goal?: T): void;
    /** Get every `AnimatedValue` used by this node. */
    getPayload(): Payload;
}
export declare type Payload = readonly AnimatedValue[];
