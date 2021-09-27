import { useRef, useEffect } from 'react';

/**
 * Call an effect after a component update, skipping the initial mount.
 *
 * @param effect Effect to call
 * @param deps Effect dependency list
 */
function useUpdateEffect(effect, deps) {
  var mounted = useRef(false);
  useEffect(function () {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
}

export { useUpdateEffect };
