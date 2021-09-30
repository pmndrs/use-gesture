import * as React from "react";

function isUpdater<T>(
  argument: React.SetStateAction<T>
): argument is React.ReducerWithoutAction<T> {
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
export function applyState<T>(
  argument: React.SetStateAction<T>,
  currentValue: T
) {
  if (isUpdater(argument)) {
    return argument(currentValue);
  }
  return argument;
}
