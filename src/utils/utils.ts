import { Vector2 } from '../types'

// blank function
export function noop() {}


/**
 * TODO Beware that only optimized cases are covered in tests =)
 * TODO Need to cover general case as well
 * 
 * @param fns 
 */
export function chainFns(...fns: Function[]): Function {
  if (fns.length === 0) return noop;
  if (fns.length === 1) return fns[0];

  return function (this: any) {
    for (let fn of fns) fn.apply(this, arguments)
  }
}


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

export function valueFn(v: Vector2 | (() => Vector2)) {
  return typeof v === 'function' ? v() : v
}
