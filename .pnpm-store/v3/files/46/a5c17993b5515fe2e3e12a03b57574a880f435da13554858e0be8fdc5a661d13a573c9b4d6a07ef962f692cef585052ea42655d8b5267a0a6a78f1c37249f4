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

function useTabState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      initialSelectedId = _useSealedState.selectedId,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      _useSealedState$manua = _useSealedState.manual,
      manual = _useSealedState$manua === void 0 ? false : _useSealedState$manua,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["selectedId", "loop", "manual"]);

  var composite = Composite_CompositeState.useCompositeState(_rollupPluginBabelHelpers._objectSpread2({
    loop: loop,
    currentId: initialSelectedId
  }, sealed));
  var panels = Composite_CompositeState.useCompositeState();

  var _React$useState = React.useState(initialSelectedId),
      selectedId = _React$useState[0],
      setSelectedId = _React$useState[1];

  var select = React.useCallback(function (id) {
    composite.move(id);
    setSelectedId(id);
  }, [composite.move]); // If selectedId is not set, use the currentId. It's still possible to have
  // no selected tab with useTabState({ selectedId: null });

  React.useEffect(function () {
    if (selectedId === null) return;
    var selectedItem = composite.items.find(function (item) {
      return item.id === selectedId;
    });
    if (selectedItem) return;

    if (composite.currentId) {
      setSelectedId(composite.currentId);
    }
  }, [selectedId, composite.items, composite.currentId]);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, composite), {}, {
    selectedId: selectedId,
    panels: panels.items,
    manual: manual,
    select: select,
    setSelectedId: setSelectedId,
    registerPanel: React.useCallback(function (panel) {
      return panels.registerItem(panel);
    }, [panels.registerItem]),
    unregisterPanel: React.useCallback(function (id) {
      return panels.unregisterItem(id);
    }, [panels.unregisterItem])
  });
}

exports.useTabState = useTabState;
