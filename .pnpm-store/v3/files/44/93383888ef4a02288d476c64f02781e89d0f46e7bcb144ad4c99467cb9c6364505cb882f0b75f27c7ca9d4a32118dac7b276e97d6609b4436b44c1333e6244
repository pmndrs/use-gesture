'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
require('react');
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
var ComboboxBaseState = require('../ComboboxBaseState-cfd43319.js');

function unstable_useComboboxListState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$curre = _useSealedState.currentId,
      currentId = _useSealedState$curre === void 0 ? null : _useSealedState$curre,
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "vertical" : _useSealedState$orien,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["currentId", "orientation", "loop"]);

  var composite = Composite_CompositeState.useCompositeState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    currentId: currentId,
    orientation: orientation,
    loop: loop
  }, sealed), {}, {
    unstable_virtual: true,
    unstable_includesBaseElement: true
  }));
  return ComboboxBaseState.useComboboxBaseState(composite, sealed);
}

exports.unstable_useComboboxListState = unstable_useComboboxListState;
