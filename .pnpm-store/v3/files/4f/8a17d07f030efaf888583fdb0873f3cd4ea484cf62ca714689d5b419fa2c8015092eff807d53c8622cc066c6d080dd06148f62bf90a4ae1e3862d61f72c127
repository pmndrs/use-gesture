/**
 * MIT License
 * Copyright (c) Alec Larson
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
declare const $get: unique symbol;
declare const $observers: unique symbol;
export { FluidValue, hasFluidValue, getFluidValue, getFluidObservers, callFluidObserver, callFluidObservers, setFluidGetter, addFluidObserver, removeFluidObserver, };
/** Returns true if `arg` can be observed. */
declare const hasFluidValue: (arg: any) => arg is FluidValue<any, any>;
/**
 * Get the current value.
 * If `arg` is not observable, `arg` is returned.
 */
declare const getFluidValue: GetFluidValue;
/** Get the current observer set. Never mutate it directly! */
declare const getFluidObservers: GetFluidObservers;
/** Send an event to an observer. */
declare function callFluidObserver<E extends FluidEvent>(observer: FluidObserver<E>, event: E): void;
/** Send an event to all observers. */
declare function callFluidObservers<E extends FluidEvent>(target: FluidValue<any, E>, event: E): void;
declare function callFluidObservers(target: object, event: FluidEvent): void;
declare type GetFluidValue = {
    <T, U = never>(target: T | FluidValue<U>): Exclude<T, FluidValue> | U;
};
declare type GetFluidObservers = {
    <E extends FluidEvent>(target: FluidValue<any, E>): ReadonlySet<FluidObserver<E>> | null;
    (target: object): ReadonlySet<FluidObserver> | null;
};
/** An event sent to `FluidObserver` objects. */
export interface FluidEvent<T = any> {
    type: string;
    parent: FluidValue<T>;
}
/**
 * Extend this class for automatic TypeScript support when passing this
 * value to `fluids`-compatible libraries.
 */
declare abstract class FluidValue<T = any, E extends FluidEvent<T> = any> {
    private [$get];
    private [$observers]?;
    constructor(get?: () => T);
    /** Get the current value. */
    protected get?(): T;
    /** Called after an observer is added. */
    protected observerAdded?(count: number, observer: FluidObserver<E>): void;
    /** Called after an observer is removed. */
    protected observerRemoved?(count: number, observer: FluidObserver<E>): void;
}
/** An observer of `FluidValue` objects. */
export declare type FluidObserver<E extends FluidEvent = any> = {
    eventObserved(event: E): void;
} | {
    (event: E): void;
};
/** Add the `FluidValue` type to every property. */
export declare type FluidProps<T> = T extends object ? {
    [P in keyof T]: T[P] | FluidValue<Exclude<T[P], void>>;
} : unknown;
/** Remove the `FluidValue` type from every property. */
export declare type StaticProps<T extends object> = {
    [P in keyof T]: T[P] extends FluidValue<infer U> ? U : T[P];
};
/** Define the getter called by `getFluidValue`. */
declare const setFluidGetter: (target: object, get: () => any) => any;
/** Observe a `fluids`-compatible object. */
declare function addFluidObserver<T, E extends FluidEvent>(target: FluidValue<T, E>, observer: FluidObserver<E>): typeof observer;
declare function addFluidObserver<E extends FluidEvent>(target: object, observer: FluidObserver<E>): typeof observer;
/** Stop observing a `fluids`-compatible object. */
declare function removeFluidObserver<E extends FluidEvent>(target: FluidValue<any, E>, observer: FluidObserver<E>): void;
declare function removeFluidObserver<E extends FluidEvent>(target: object, observer: FluidObserver<E>): void;
