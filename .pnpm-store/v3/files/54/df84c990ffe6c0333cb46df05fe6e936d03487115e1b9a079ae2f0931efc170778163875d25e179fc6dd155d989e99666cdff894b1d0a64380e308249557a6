import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import 'react';
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
import { u as useComboboxBaseState } from '../ComboboxBaseState-73fabcba.js';

function unstable_useComboboxListState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$curre = _useSealedState.currentId,
      currentId = _useSealedState$curre === void 0 ? null : _useSealedState$curre,
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "vertical" : _useSealedState$orien,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["currentId", "orientation", "loop"]);

  var composite = useCompositeState(_objectSpread2(_objectSpread2({
    currentId: currentId,
    orientation: orientation,
    loop: loop
  }, sealed), {}, {
    unstable_virtual: true,
    unstable_includesBaseElement: true
  }));
  return useComboboxBaseState(composite, sealed);
}

export { unstable_useComboboxListState };
