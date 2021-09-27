/**
 * Omits specific keys from an object.
 *
 * @example
 * import { omit } from "reakit-utils";
 *
 * omit({ a: "a", b: "b" }, ["a"]); // { b: "b" }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  paths: ReadonlyArray<K> | K[]
): Omit<T, K> {
  const keys = Object.keys(object);
  const result = {} as Omit<T, K>;

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (paths.indexOf(key as K) === -1) {
      result[key as Exclude<keyof T, K>] = object[key];
    }
  }

  return result;
}
