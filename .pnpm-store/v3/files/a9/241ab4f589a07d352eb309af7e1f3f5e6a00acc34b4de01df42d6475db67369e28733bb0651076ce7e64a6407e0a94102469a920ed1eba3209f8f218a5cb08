import { removeIndexFromArray } from "./removeIndexFromArray";

/**
 * Immutably removes an item from an array.
 *
 * @example
 * import { removeItemFromArray } from "reakit-utils";
 *
 * removeItemFromArray(["a", "b", "c"], "b"); // ["a", "c"]
 *
 * // This only works by reference
 * const obj = {};
 * removeItemFromArray([obj], {}); // [obj]
 * removeItemFromArray([obj], obj); // []
 *
 * @returns {Array} A new array without the passed item.
 */
export function removeItemFromArray<A extends any[]>(
  array: A,
  item: A[number]
) {
  const index = array.indexOf(item);
  return removeIndexFromArray(array, index);
}
