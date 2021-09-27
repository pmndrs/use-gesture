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

function useToolbarState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "horizontal" : _useSealedState$orien,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["orientation"]);

  return useCompositeState(_objectSpread2({
    orientation: orientation
  }, sealed));
}

export { useToolbarState };
