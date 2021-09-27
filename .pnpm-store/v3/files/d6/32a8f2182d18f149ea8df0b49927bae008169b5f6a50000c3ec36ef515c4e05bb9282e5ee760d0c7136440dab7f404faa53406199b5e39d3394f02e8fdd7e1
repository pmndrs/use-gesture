import * as React from "react";
import { isObject } from "reakit-utils/isObject";
import { warning } from "./warning";

function isRefObject(ref: any): ref is React.RefObject<any> {
  return isObject(ref) && "current" in ref;
}

/**
 * Logs `messages` to the console using `console.warn` based on a `condition`.
 * This should be used inside components.
 */
export function useWarning(condition: boolean, ...messages: any[]) {
  if (process.env.NODE_ENV !== "production") {
    React.useEffect(() => {
      warning(
        condition,
        ...messages.map((message) =>
          isRefObject(message) ? message.current : message
        )
      );
    }, [condition]);
  }
}
