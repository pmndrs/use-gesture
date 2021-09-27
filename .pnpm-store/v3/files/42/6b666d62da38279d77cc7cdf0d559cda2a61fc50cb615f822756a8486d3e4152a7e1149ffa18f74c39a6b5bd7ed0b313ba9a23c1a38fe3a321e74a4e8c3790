'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/**
 * React custom hook that returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 */
function useSealedState(initialState) {
  var _React$useState = React.useState(initialState),
      sealed = _React$useState[0];

  return sealed;
}

exports.useSealedState = useSealedState;
