import { Fn } from '../types'

// blank function
export const noop = () => {}
// returns a function that chains all functions given as parameters
export const chainFns = (...fns: Fn[]): Fn => (...args: any[]) => fns.forEach(fn => fn(...args))

export const def = {
  array: <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value, value]),
}

export const clone = <T>(arr: T): T => {
  const cloned: T = {} as T
  Object.entries(arr).forEach(([name, value]) => {
    // @ts-ignore
    cloned[name] = typeof value !== 'object' ? value : Array.isArray(value) ? [...value] : clone(value)
  })
  return cloned
}
