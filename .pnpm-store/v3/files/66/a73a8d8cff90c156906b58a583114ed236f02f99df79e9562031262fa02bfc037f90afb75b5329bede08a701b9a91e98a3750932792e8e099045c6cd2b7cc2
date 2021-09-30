import { useState } from 'react';

/**
 * React custom hook that returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 */
function useSealedState(initialState) {
  var _React$useState = useState(initialState),
      sealed = _React$useState[0];

  return sealed;
}

export { useSealedState };
