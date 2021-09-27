'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useStatefulRefValue(ref, initialState) {
  var _useState = react.useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = react.useCallback(function (refValue) {
    ref.current = refValue;
    setState(refValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state, callbackRef];
}

exports.useStatefulRefValue = useStatefulRefValue;
