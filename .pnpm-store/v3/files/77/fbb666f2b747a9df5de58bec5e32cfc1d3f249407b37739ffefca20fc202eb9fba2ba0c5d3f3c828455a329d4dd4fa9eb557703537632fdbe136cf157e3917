'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/**
 * A `React.useEffect` that will not run on the first render.
 */

function useUpdateEffect(effect, deps) {
  var mounted = React.useRef(false);
  React.useEffect(function () {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
    return undefined;
  }, deps);
}

exports.useUpdateEffect = useUpdateEffect;
