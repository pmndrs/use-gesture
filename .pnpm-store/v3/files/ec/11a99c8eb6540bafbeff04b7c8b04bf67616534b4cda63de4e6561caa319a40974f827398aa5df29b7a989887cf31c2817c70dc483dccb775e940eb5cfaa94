import { useState, useCallback } from 'react';

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */

function useForceUpdate() {
  var _useState = useState(Object.create(null)),
      dispatch = _useState[1];

  return useCallback(function () {
    dispatch(Object.create(null));
  }, []);
}

export { useForceUpdate };
