'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */

function useForceUpdate() {
  var _useState = react.useState(Object.create(null)),
      dispatch = _useState[1];

  return react.useCallback(function () {
    dispatch(Object.create(null));
  }, []);
}

exports.useForceUpdate = useForceUpdate;
