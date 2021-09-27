/**
 * Checks whether `arg` is a promise or not.
 *
 * @returns {boolean}
 */
export function isPromise<T>(arg: T | Promise<T>): arg is Promise<T> {
  return Boolean(arg && "then" in arg && arg.then);
}
