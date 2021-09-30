import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState, useCallback, useEffect } from 'react';
import 'reakit-utils/useIsomorphicEffect';
import { useSealedState } from 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../Id/IdProvider.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import { useCompositeState } from '../Composite/CompositeState.js';

function useTabState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      initialSelectedId = _useSealedState.selectedId,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      _useSealedState$manua = _useSealedState.manual,
      manual = _useSealedState$manua === void 0 ? false : _useSealedState$manua,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["selectedId", "loop", "manual"]);

  var composite = useCompositeState(_objectSpread2({
    loop: loop,
    currentId: initialSelectedId
  }, sealed));
  var panels = useCompositeState();

  var _React$useState = useState(initialSelectedId),
      selectedId = _React$useState[0],
      setSelectedId = _React$useState[1];

  var select = useCallback(function (id) {
    composite.move(id);
    setSelectedId(id);
  }, [composite.move]); // If selectedId is not set, use the currentId. It's still possible to have
  // no selected tab with useTabState({ selectedId: null });

  useEffect(function () {
    if (selectedId === null) return;
    var selectedItem = composite.items.find(function (item) {
      return item.id === selectedId;
    });
    if (selectedItem) return;

    if (composite.currentId) {
      setSelectedId(composite.currentId);
    }
  }, [selectedId, composite.items, composite.currentId]);
  return _objectSpread2(_objectSpread2({}, composite), {}, {
    selectedId: selectedId,
    panels: panels.items,
    manual: manual,
    select: select,
    setSelectedId: setSelectedId,
    registerPanel: useCallback(function (panel) {
      return panels.registerItem(panel);
    }, [panels.registerItem]),
    unregisterPanel: useCallback(function (id) {
      return panels.unregisterItem(id);
    }, [panels.unregisterItem])
  });
}

export { useTabState };
