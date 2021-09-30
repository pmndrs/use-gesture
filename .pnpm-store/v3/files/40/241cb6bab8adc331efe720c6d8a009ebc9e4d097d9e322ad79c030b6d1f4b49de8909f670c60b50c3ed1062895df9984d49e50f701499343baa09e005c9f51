import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState, useCallback } from 'react';
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

function useMenuBarState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$orien = _useSealedState.orientation,
      orientation = _useSealedState$orien === void 0 ? "horizontal" : _useSealedState$orien,
      _useSealedState$unsta = _useSealedState.unstable_values,
      initialValues = _useSealedState$unsta === void 0 ? {} : _useSealedState$unsta,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["orientation", "unstable_values"]);

  var _React$useState = useState(initialValues),
      values = _React$useState[0],
      setValues = _React$useState[1];

  var composite = useCompositeState(_objectSpread2(_objectSpread2({}, sealed), {}, {
    orientation: orientation
  }));
  return _objectSpread2(_objectSpread2({}, composite), {}, {
    unstable_values: values,
    unstable_setValue: useCallback(function (name, value) {
      setValues(function (vals) {
        var _objectSpread2$1;

        return _objectSpread2(_objectSpread2({}, vals), {}, (_objectSpread2$1 = {}, _objectSpread2$1[name] = typeof value === "function" ? value(vals) : value, _objectSpread2$1));
      });
    }, [])
  });
}

export { useMenuBarState };
