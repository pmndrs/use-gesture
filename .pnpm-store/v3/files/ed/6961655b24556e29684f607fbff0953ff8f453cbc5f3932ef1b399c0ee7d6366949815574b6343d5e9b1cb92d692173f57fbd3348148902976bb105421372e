type ToArray<T> = T extends any[] ? T : T[];

/**
 * Transforms `arg` into an array if it's not already.
 *
 * @example
 * import { toArray } from "reakit-utils";
 *
 * toArray("a"); // ["a"]
 * toArray(["a"]); // ["a"]
 */
export function toArray<T>(arg: T) {
  if (Array.isArray(arg)) {
    return arg as ToArray<T>;
  }
  return (typeof arg !== "undefined" ? [arg] : []) as ToArray<T>;
}
