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
require('../Composite/CompositeState.js');
var Grid_GridState = require('../Grid/GridState.js');
var ComboboxBaseState = require('../ComboboxBaseState-cfd43319.js');

function chunk(array, size) {
  var chunks = [];

  for (var i = 0, j = array.length; i < j; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

function unstable_useComboboxListGridState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$colum = _useSealedState.columns,
      initialColumns = _useSealedState$colum === void 0 ? 1 : _useSealedState$colum,
      _useSealedState$curre = _useSealedState.currentId,
      currentId = _useSealedState$curre === void 0 ? null : _useSealedState$curre,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["columns", "currentId", "loop"]);

  var _React$useState = React.useState(initialColumns),
      columns = _React$useState[0],
      setColumns = _React$useState[1];

  var grid = Grid_GridState.unstable_useGridState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    currentId: currentId,
    loop: loop
  }, sealed), {}, {
    unstable_virtual: true,
    unstable_includesBaseElement: true
  }));
  var combobox = ComboboxBaseState.useComboboxBaseState(grid, sealed);
  var matches = React.useMemo(function () {
    return chunk(combobox.matches, columns);
  }, [combobox.matches, columns]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, combobox), {}, {
    menuRole: "grid",
    columns: columns,
    matches: matches,
    setColumns: setColumns
  });
}

exports.unstable_useComboboxListGridState = unstable_useComboboxListGridState;
