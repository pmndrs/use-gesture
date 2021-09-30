import { useRef } from 'react';
import './getDocument.js';
import './getWindow.js';
import './canUseDOM.js';
import { useIsomorphicEffect } from './useIsomorphicEffect.js';

/**
 * A `React.Ref` that keeps track of the passed `value`.
 */

function useLiveRef(value) {
  var ref = useRef(value);
  useIsomorphicEffect(function () {
    ref.current = value;
  });
  return ref;
}

export { useLiveRef };
