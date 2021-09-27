import { useRef } from 'react';

function useLazyRef(fn) {
  var isSet = useRef(false);
  var ref = useRef();

  if (!isSet.current) {
    isSet.current = true;
    ref.current = fn();
  }

  return ref;
}

export { useLazyRef };
