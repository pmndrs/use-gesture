import { useRef, useState, useCallback } from 'react';

/**
 * Check if a component is controlled or uncontrolled and return the correct
 * state value and setter accordingly. If the component state is controlled by
 * the app, the setter is a noop.
 *
 * @param controlledValue
 * @param defaultValue
 */
function useControlledState(controlledValue, defaultValue) {
  var controlledRef = useRef(controlledValue != null);

  var _useState = useState(defaultValue),
      valueState = _useState[0],
      setValue = _useState[1];

  var set = useCallback(function (n) {
    if (!controlledRef.current) {
      setValue(n);
    }
  }, []);
  return [controlledRef.current ? controlledValue : valueState, set];
}

export { useControlledState };
