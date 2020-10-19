export function noop() {}

/**
 * TODO Beware that only optimized cases are covered in tests =)
 * TODO Need to cover general case as well
 *
 * @param fns
 */
export function chainFns(...fns: Function[]): Function {
  if (fns.length === 0) return noop
  if (fns.length === 1) return fns[0]

  return function (this: any) {
    var result
    for (let fn of fns) {
      result = fn.apply(this, arguments) || result
    }
    return result
  }
}

/**
 * Expects a simple value or 2D vector (an array with 2 elements) and
 * always returns 2D vector. If simple value is passed, returns a
 * vector with this value as both coordinates.
 *
 * @param value
 */
export function ensureVector<T>(value: T | [T, T] | undefined, fallback?: T | [T, T]): [T, T] {
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error('Must define fallback value if undefined is expected')
    }
    value = fallback
  }

  if (Array.isArray(value)) return value
  return [value, value]
}

/**
 * Helper for defining a default value
 *
 * @param value
 * @param fallback
 */
export function assignDefault<T extends Object>(value: Partial<T> | undefined, fallback: T): T {
  return Object.assign({}, fallback, value || {})
}

/**
 * Resolves getters (functions) by calling them
 * If simple value is given it just passes through
 *
 * @param v
 */
export function valueFn<T>(v: T | ((...args: any[]) => T), ...args: any[]): T {
  if (typeof v === 'function') {
    // @ts-ignore
    return v(...args)
  } else {
    return v
  }
}
