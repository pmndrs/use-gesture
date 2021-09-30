import { useRef, useEffect } from 'react';

/**
 * A `React.useEffect` that will not run on the first render.
 */

function useUpdateEffect(effect, deps) {
  var mounted = useRef(false);
  useEffect(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined;
  }, deps);
}

export { useUpdateEffect };
