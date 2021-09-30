/**
 * Transforms an array with multiple levels into a flattened one.
 *
 * @example
 * import { flatten } from "reakit-utils";
 *
 * flatten([0, 1, [2, [3, 4], 5], 6]);
 * // => [0, 1, 2, 3, 4, 5, 6]
 */
export function flatten<T>(array: T[]) {
  const flat: T[] = [];
  for (const maybeArray of array) {
    if (Array.isArray(maybeArray)) {
      flat.push(...flatten(maybeArray));
    } else {
      flat.push(maybeArray);
    }
  }
  return flat;
}
