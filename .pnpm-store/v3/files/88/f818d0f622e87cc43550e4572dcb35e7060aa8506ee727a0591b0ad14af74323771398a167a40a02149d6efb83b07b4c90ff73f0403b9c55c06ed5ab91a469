'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var React = require('react');
require('reakit-utils/useIsomorphicEffect');
var useSealedState = require('reakit-utils/useSealedState');
require('reakit-utils/getDocument');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../Id/IdProvider.js');
require('reakit-utils/applyState');
require('../Id/IdState.js');
var Composite_CompositeState = require('../Composite/CompositeState.js');

function useRadioState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      initialValue = _useSealedState.state,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["state", "loop"]);

  var _React$useState = React.useState(initialValue),
      state = _React$useState[0],
      setState = _React$useState[1];

  var composite = Composite_CompositeState.useCompositeState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sealed), {}, {
    loop: loop
  }));
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, composite), {}, {
    state: state,
    setState: setState
  });
}

exports.useRadioState = useRadioState;
