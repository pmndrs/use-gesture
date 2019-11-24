import { Fn } from '../types'

// blank function
export const noop = () => {}
// returns a function that chains all functions given as parameters
export const chainFns = (...fns: Fn[]): Fn => (...args: any[]) => fns.forEach(fn => fn(...args))

export const def = {
  array: <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value, value]),
}

export const clone = <T>(obj: T): T => {
  const cloned: T = {} as T
  Object.entries(obj).forEach(([name, value]) => {
    cloned[name as keyof T] = typeof value !== 'object' ? value : Array.isArray(value) ? [...value] : clone(value)
  })
  return cloned
}

export const matchKeysFromObject = <T extends object, K extends object>(obj: T, matchingObject: K): Partial<T> => {
  const o: Partial<T> = {}
  Object.entries(obj).forEach(
    ([key, value]) => (value !== void 0 || key in matchingObject) && (o[key as keyof T] = value)
  )
  return o
}
