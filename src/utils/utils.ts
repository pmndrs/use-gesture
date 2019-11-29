import { Fn } from '../types'

// blank function
export function noop() {}
// returns a function that chains all functions given as parameters
export const chainFns = (...fns: Fn[]): Fn => (...args: any[]) => fns.forEach(fn => fn(...args))

export const def = {
  array: <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value, value]),
  withDefault: <T>(value: T | undefined, defaultIfUndefined: T): T => (value !== void 0 ? value : defaultIfUndefined),
}

export function matchKeysFromObject<T extends object, K extends object>(obj: T, matchingObject: K): Partial<T> {
  const o: Partial<T> = {}
  Object.entries(obj).forEach(
    ([key, value]) => (value !== void 0 || key in matchingObject) && (o[key as keyof T] = value)
  )
  return o
}
