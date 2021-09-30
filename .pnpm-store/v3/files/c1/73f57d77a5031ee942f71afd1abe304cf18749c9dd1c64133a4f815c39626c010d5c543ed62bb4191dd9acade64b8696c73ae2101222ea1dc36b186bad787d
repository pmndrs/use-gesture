import * as React from "react";

export type SealedInitialState<T> = T | (() => T);

/**
 * React custom hook that returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 */
export function useSealedState<T>(initialState: SealedInitialState<T>) {
  const [sealed] = React.useState(initialState);
  return sealed;
}
