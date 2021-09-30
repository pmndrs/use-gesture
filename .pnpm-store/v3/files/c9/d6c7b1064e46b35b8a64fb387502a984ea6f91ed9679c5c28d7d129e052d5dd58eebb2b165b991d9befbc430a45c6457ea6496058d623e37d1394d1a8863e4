import { Lookup, Arrify, AnyFn, Any } from '@react-spring/types';
export declare function noop(): void;
export declare const defineHidden: (obj: any, key: any, value: any) => any;
declare type IsType<U> = <T>(arg: T & any) => arg is Narrow<T, U>;
declare type Narrow<T, U> = [T] extends [Any] ? U : [T] extends [U] ? Extract<T, U> : U;
export declare const is: {
    arr: IsType<readonly any[]>;
    obj: <T extends unknown>(a: any) => a is Exclude<T & Lookup<any>, Function | readonly any[]>;
    fun: IsType<Function>;
    str: (a: unknown) => a is string;
    num: (a: unknown) => a is number;
    und: (a: unknown) => a is undefined;
};
/** Compare animatable values */
export declare function isEqual(a: any, b: any): boolean;
declare type EachFn<Value, Key, This> = (this: This, value: Value, key: Key) => void;
declare type Eachable<Value = any, Key = any, This = any> = {
    forEach(cb: EachFn<Value, Key, This>, ctx?: This): void;
};
/** Minifiable `.forEach` call */
export declare const each: <Value, Key, This>(obj: Eachable<Value, Key, This>, fn: EachFn<Value, Key, This>) => void;
/** Iterate the properties of an object */
export declare function eachProp<T extends object, This>(obj: T, fn: (this: This, value: T extends any[] ? T[number] : T[keyof T], key: string) => void, ctx?: This): void;
export declare const toArray: <T>(a: T) => Exclude<T, void> extends readonly any[] ? (readonly any[] & Exclude<T, void>)[number][] extends readonly any[] & Exclude<T, void> ? readonly (Exclude<T, void> extends readonly (infer U)[] ? U : Exclude<T, void>)[] : readonly any[] & Exclude<T, void> : readonly (Exclude<T, void> extends readonly (infer U_1)[] ? U_1 : Exclude<T, void>)[];
/** Copy the `queue`, then iterate it after the `queue` is cleared */
export declare function flush<P, T>(queue: Map<P, T>, iterator: (entry: [P, T]) => void): void;
export declare function flush<T>(queue: Set<T>, iterator: (value: T) => void): void;
/** Call every function in the queue with the same arguments. */
export declare const flushCalls: <T extends AnyFn<any[], any>>(queue: Set<T>, ...args: Parameters<T>) => void;
export {};
