'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useSealedState = require('reakit-utils/useSealedState');

/**
 * As simple as `React.useState(false)`
 */
function useCheckboxState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$state = _useSealedState.state,
      initialValue = _useSealedState$state === void 0 ? false : _useSealedState$state;

  var _React$useState = React.useState(initialValue),
      state = _React$useState[0],
      setState = _React$useState[1];

  return {
    state: state,
    setState: setState
  };
}

exports.useCheckboxState = useCheckboxState;
