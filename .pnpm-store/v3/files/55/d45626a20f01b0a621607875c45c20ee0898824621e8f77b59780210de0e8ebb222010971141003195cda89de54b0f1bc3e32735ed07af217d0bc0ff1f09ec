import * as React from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

/**
 * A `React.Ref` that keeps track of the passed `value`.
 */
export function useLiveRef<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef(value);
  useIsomorphicEffect(() => {
    ref.current = value;
  });
  return ref;
}
