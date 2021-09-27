'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * Call an effect after a component update, skipping the initial mount.
 *
 * @param effect Effect to call
 * @param deps Effect dependency list
 */
function useUpdateEffect(effect, deps) {
  var mounted = react.useRef(false);
  react.useEffect(function () {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
}

exports.useUpdateEffect = useUpdateEffect;
