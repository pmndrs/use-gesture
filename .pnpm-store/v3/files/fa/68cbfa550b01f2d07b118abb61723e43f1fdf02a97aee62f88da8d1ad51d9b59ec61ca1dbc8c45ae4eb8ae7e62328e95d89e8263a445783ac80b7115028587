'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useSealedState = require('reakit-utils/useSealedState');
var Id_IdProvider = require('./IdProvider.js');

function unstable_useIdState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      initialBaseId = _useSealedState.baseId;

  var generateId = React.useContext(Id_IdProvider.unstable_IdContext);
  var idCountRef = React.useRef(0);

  var _React$useState = React.useState(function () {
    return initialBaseId || generateId();
  }),
      baseId = _React$useState[0],
      setBaseId = _React$useState[1];

  return {
    baseId: baseId,
    setBaseId: setBaseId,
    unstable_idCountRef: idCountRef
  };
}

exports.unstable_useIdState = unstable_useIdState;
