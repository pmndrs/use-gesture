import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState, useMemo } from 'react';
import 'reakit-utils/useIsomorphicEffect';
import { useSealedState } from 'reakit-utils/useSealedState';
import 'reakit-utils/getDocument';
import '../reverse-30eaa122.js';
import '../getCurrentId-5aa9849e.js';
import '../findEnabledItemById-8ddca752.js';
import '../Id/IdProvider.js';
import 'reakit-utils/applyState';
import '../Id/IdState.js';
import '../Composite/CompositeState.js';
import { unstable_useGridState } from '../Grid/GridState.js';
import { u as useComboboxBaseState } from '../ComboboxBaseState-73fabcba.js';

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

  var _useSealedState = useSealedState(initialState),
      _useSealedState$colum = _useSealedState.columns,
      initialColumns = _useSealedState$colum === void 0 ? 1 : _useSealedState$colum,
      _useSealedState$curre = _useSealedState.currentId,
      currentId = _useSealedState$curre === void 0 ? null : _useSealedState$curre,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["columns", "currentId", "loop"]);

  var _React$useState = useState(initialColumns),
      columns = _React$useState[0],
      setColumns = _React$useState[1];

  var grid = unstable_useGridState(_objectSpread2(_objectSpread2({
    currentId: currentId,
    loop: loop
  }, sealed), {}, {
    unstable_virtual: true,
    unstable_includesBaseElement: true
  }));
  var combobox = useComboboxBaseState(grid, sealed);
  var matches = useMemo(function () {
    return chunk(combobox.matches, columns);
  }, [combobox.matches, columns]);
  return _objectSpread2(_objectSpread2({}, combobox), {}, {
    menuRole: "grid",
    columns: columns,
    matches: matches,
    setColumns: setColumns
  });
}

export { unstable_useComboboxListGridState };
