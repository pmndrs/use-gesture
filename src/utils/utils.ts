import { Fn } from '../types'

// blank function
export const noop = () => {}
// returns a function that chains all functions given as parameters
export const chainFns = (...fns: Fn[]): Fn => (...args: any[]) => fns.forEach(fn => fn(...args))
