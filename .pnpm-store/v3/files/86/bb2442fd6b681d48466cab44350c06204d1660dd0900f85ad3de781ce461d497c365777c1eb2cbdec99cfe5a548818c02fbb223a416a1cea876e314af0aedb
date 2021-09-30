import { useState, useCallback } from 'react';

function useStatefulRefValue(ref, initialState) {
  var _useState = useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = useCallback(function (refValue) {
    ref.current = refValue;
    setState(refValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state, callbackRef];
}

export { useStatefulRefValue };
