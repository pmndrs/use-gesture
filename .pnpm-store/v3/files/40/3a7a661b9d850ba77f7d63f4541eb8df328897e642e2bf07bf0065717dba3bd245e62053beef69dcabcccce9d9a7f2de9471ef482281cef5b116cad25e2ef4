function isUpdater(argument) {
  return typeof argument === "function";
}
/**
 * Receives a `setState` argument and calls it with `currentValue` if it's a
 * function. Otherwise return the argument as the new value.
 *
 * @example
 * import { applyState } from "reakit-utils";
 *
 * applyState((value) => value + 1, 1); // 2
 * applyState(2, 1); // 2
 */


function applyState(argument, currentValue) {
  if (isUpdater(argument)) {
    return argument(currentValue);
  }

  return argument;
}

export { applyState };
