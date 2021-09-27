import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState } from 'react';
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

function useRadioState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      initialValue = _useSealedState.state,
      _useSealedState$loop = _useSealedState.loop,
      loop = _useSealedState$loop === void 0 ? true : _useSealedState$loop,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["state", "loop"]);

  var _React$useState = useState(initialValue),
      state = _React$useState[0],
      setState = _React$useState[1];

  var composite = useCompositeState(_objectSpread2(_objectSpread2({}, sealed), {}, {
    loop: loop
  }));
  return _objectSpread2(_objectSpread2({}, composite), {}, {
    state: state,
    setState: setState
  });
}

export { useRadioState };
