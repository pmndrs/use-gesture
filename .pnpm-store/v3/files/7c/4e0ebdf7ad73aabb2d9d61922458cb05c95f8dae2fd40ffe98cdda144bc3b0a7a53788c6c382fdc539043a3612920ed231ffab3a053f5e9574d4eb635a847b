/**
 * Immutably removes an index from an array.
 *
 * @example
 * import { removeIndexFromArray } from "reakit-utils";
 *
 * removeIndexFromArray(["a", "b", "c"], 1); // ["a", "c"]
 *
 * @returns {Array} A new array without the item in the passed index.
 */
function removeIndexFromArray(array, index) {
  if (index === -1) return array;
  return [].concat(array.slice(0, index), array.slice(index + 1));
}

export { removeIndexFromArray };
