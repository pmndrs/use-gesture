import { useRef, useEffect } from 'react';

/**
 * Returns the previous value of a reference after a component update.
 *
 * @param value
 */

function usePrevious(value) {
  var ref = useRef(null);
  useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export { usePrevious };
