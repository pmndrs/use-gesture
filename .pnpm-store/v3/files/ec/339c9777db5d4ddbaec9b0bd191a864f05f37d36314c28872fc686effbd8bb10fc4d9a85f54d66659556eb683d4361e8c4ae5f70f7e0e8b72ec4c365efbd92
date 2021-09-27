// https://github.com/mui-org/material-ui/blob/2bcc874cf07b81202968f769cb9c2398c7c11311/packages/material-ui/src/utils/useForkRef.js
import * as React from "react";

function setRef(ref?: React.Ref<any>, value: any = null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    (ref as React.MutableRefObject<any>).current = value;
  }
}

/**
 * Merges up to two React Refs into a single memoized function React Ref so you
 * can pass it to an element.
 *
 * @example
 * import React from "react";
 * import { useForkRef } from "reakit-utils";
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */
export function useForkRef(refA?: React.Ref<any>, refB?: React.Ref<any>) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (value: any) => {
      setRef(refA, value);
      setRef(refB, value);
    };
  }, [refA, refB]);
}
