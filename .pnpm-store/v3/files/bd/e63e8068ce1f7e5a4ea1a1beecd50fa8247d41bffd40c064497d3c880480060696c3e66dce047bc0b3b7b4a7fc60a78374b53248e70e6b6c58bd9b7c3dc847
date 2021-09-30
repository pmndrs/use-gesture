export declare function noop(): void;
/**
 * TODO Beware that only optimized cases are covered in tests =)
 * TODO Need to cover general case as well
 *
 * @param fns
 */
export declare function chainFns(...fns: Function[]): Function;
/**
 * Expects a simple value or 2D vector (an array with 2 elements) and
 * always returns 2D vector. If simple value is passed, returns a
 * vector with this value as both coordinates.
 *
 * @param value
 */
export declare function ensureVector<T>(value: T | [T, T] | undefined, fallback?: T | [T, T]): [T, T];
/**
 * Helper for defining a default value
 *
 * @param value
 * @param fallback
 */
export declare function assignDefault<T extends Object>(value: Partial<T> | undefined, fallback: T): T;
/**
 * Resolves getters (functions) by calling them
 * If simple value is given it just passes through
 *
 * @param v
 */
export declare function valueFn<T>(v: T | ((...args: any[]) => T), ...args: any[]): T;
