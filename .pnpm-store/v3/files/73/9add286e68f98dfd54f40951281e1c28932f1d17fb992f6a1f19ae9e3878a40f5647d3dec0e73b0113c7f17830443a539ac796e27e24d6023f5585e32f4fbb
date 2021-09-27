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

function useMenuBarState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "horizontal" : _useSealedState$orien,
      _useSealedState$unsta = _useSealedState.unstable_values,
      initialValues = _useSealedState$unsta === void 0 ? {} : _useSealedState$unsta,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["orientation", "unstable_values"]);

  var _React$useState = React.useState(initialValues),
      values = _React$useState[0],
      setValues = _React$useState[1];

  var composite = Composite_CompositeState.useCompositeState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sealed), {}, {
    orientation: orientation
  }));
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, composite), {}, {
    unstable_values: values,
    unstable_setValue: React.useCallback(function (name, value) {
      setValues(function (vals) {
        var _objectSpread2;

        return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, vals), {}, (_objectSpread2 = {}, _objectSpread2[name] = typeof value === "function" ? value(vals) : value, _objectSpread2));
      });
    }, [])
  });
}

exports.useMenuBarState = useMenuBarState;
