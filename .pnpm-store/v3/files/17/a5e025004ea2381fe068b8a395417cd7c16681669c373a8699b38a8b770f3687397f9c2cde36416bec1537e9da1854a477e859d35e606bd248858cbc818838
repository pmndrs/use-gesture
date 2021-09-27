import { useCallback, useRef, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../../use-isomorphic-layout-effect/dist/reach-utils-use-isomorphic-layout-effect.esm.js';
import '../../can-use-dom/dist/reach-utils-can-use-dom.esm.js';

/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when
 * passed as a dependency.
 */
function createStableCallbackHook(useEffectHook, callback) {
  var callbackRef = useRef(callback);
  useEffectHook(function () {
    callbackRef.current = callback;
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return useCallback(function () {
    callbackRef.current && callbackRef.current.apply(callbackRef, arguments);
  }, []);
}
/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when passed
 * as a dependency.
 */


function useStableCallback(callback) {
  return createStableCallbackHook(useEffect, callback);
}
/**
 * Converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop and exposed as a stable function to avoid executing effects when passed
 * as a dependency.
 *
 * Use this over `useStableCallback` when you want the callback to be cached in
 * `useLayoutEffect` instead of `useEffect` to deal with timing issues only when
 * needed.
 */

function useStableLayoutCallback(callback) {
  return createStableCallbackHook(useIsomorphicLayoutEffect, callback);
}

export { useStableCallback, useStableLayoutCallback };
