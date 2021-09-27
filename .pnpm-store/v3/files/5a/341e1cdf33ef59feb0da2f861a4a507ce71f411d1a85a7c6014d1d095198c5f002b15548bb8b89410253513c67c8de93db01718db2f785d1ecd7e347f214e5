import { isObject } from "./isObject";

/**
 * Checks whether `arg` is a plain object or not.
 *
 * @returns {boolean}
 */
export function isPlainObject(arg: any): arg is object {
  if (!isObject(arg)) return false;
  const proto = Object.getPrototypeOf(arg);
  if (proto == null) return true;
  return proto.constructor?.toString() === Object.toString();
}
