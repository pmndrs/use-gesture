/**
 *
 * utils
 *
 */
import { GraphQLError } from 'graphql';
/** @private */
export declare function isObject(val: unknown): val is Record<PropertyKey, unknown>;
/** @private */
export declare function isAsyncIterable<T = unknown>(val: unknown): val is AsyncIterableIterator<T>;
/** @private */
export declare function areGraphQLErrors(obj: unknown): obj is readonly GraphQLError[];
/** @private */
export declare function hasOwnProperty<O extends Record<PropertyKey, unknown>, P extends PropertyKey>(obj: O, prop: P): obj is O & Record<P, unknown>;
/** @private */
export declare function hasOwnObjectProperty<O extends Record<PropertyKey, unknown>, P extends PropertyKey>(obj: O, prop: P): obj is O & Record<P, Record<PropertyKey, unknown>>;
/** @private */
export declare function hasOwnArrayProperty<O extends Record<PropertyKey, unknown>, P extends PropertyKey>(obj: O, prop: P): obj is O & Record<P, unknown[]>;
/** @private */
export declare function hasOwnStringProperty<O extends Record<PropertyKey, unknown>, P extends PropertyKey>(obj: O, prop: P): obj is O & Record<P, string>;
