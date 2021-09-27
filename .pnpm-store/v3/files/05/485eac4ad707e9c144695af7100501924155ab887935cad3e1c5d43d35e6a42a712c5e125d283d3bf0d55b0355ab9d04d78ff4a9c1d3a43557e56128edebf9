'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

// https://github.com/mui-org/material-ui/blob/2bcc874cf07b81202968f769cb9c2398c7c11311/packages/material-ui/src/utils/useForkRef.js

function setRef(ref, value) {
  if (value === void 0) {
    value = null;
  }

  if (!ref) return;

  if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
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


function useForkRef(refA, refB) {
  return React.useMemo(function () {
    if (refA == null && refB == null) {
      return null;
    }

    return function (value) {
      setRef(refA, value);
      setRef(refB, value);
    };
  }, [refA, refB]);
}

exports.useForkRef = useForkRef;
