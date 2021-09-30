/**
 * Picks specific keys from an object.
 *
 * @example
 * import { pick } from "reakit-utils";
 *
 * pick({ a: "a", b: "b" }, ["a"]); // { a: "a" }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  paths: ReadonlyArray<K> | K[]
) {
  const keys = Object.keys(object) as K[];
  const result = {} as { [P in K]: T[P] };

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (paths.indexOf(key) >= 0) {
      result[key] = object[key];
    }
  }

  return result;
}
