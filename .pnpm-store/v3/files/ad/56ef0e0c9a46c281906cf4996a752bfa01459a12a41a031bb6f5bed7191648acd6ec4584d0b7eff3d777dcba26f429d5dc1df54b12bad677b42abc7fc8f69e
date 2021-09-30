import { Thunk, ObjMap } from './definitions';

export function resolveMaybeThunk<T>(thingOrThunk: Thunk<T>): T;

export function camelCase(str: string): string;

export function getPluralName(name: string): string;

export function upperFirst(str: string): string;

export function clearName(str: string): string;

export function omit(obj: object, keys: string[]): object;

export function only(obj: object, keys: string[]): object;

/**
 * Used to print values in error messages.
 */
export function inspect(value: any): string;

export function forEachKey<V>(
  arrayOrObject: { [key: string]: V },
  callback: (value: V, key: string) => void
): void;

/**
 * Traverse object like Array.forEach
 *
 * @example
 *     const obj = { a: 1, b: 2, c: 3 };
 *     let result = '';
 *     forEachKey(obj, (v, k) => { result += `${v},${k};`; });
 *     // result = '1,a;2,b;3,c;'
 */
export function forEachKey<V>(
  obj: { [key: string]: V },
  callback: (value: V, key: string) => void
): void;

/**
 * Traverse object like Array.map
 *
 * @example
 *      const obj = { a: 1, b: 2, c: 3 };
 *      const result = mapEachKey(obj, (v, k) => `${v}${k}`);
 *      // result = { a: '1a', b: '2b', c: '3c' }
 */
export function mapEachKey<V, NewV, NonObjectValue>(
  obj: { [key: string]: V } | ObjMap<V> | NonObjectValue,
  callback: (value: V, key: string) => NewV
): ObjMap<NewV> | NonObjectValue;
