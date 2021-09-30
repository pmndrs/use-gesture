import { _ as _objectWithoutPropertiesLoose, a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { useState, useRef } from 'react';
import 'reakit-warning';
import 'reakit-utils/useIsomorphicEffect';
import { useSealedState } from 'reakit-utils/useSealedState';
import '../Id/IdProvider.js';
import '../Id/IdState.js';
import { useDisclosureState } from '../Disclosure/DisclosureState.js';

function useDialogState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState(initialState),
      _useSealedState$modal = _useSealedState.modal,
      initialModal = _useSealedState$modal === void 0 ? true : _useSealedState$modal,
      sealed = _objectWithoutPropertiesLoose(_useSealedState, ["modal"]);

  var disclosure = useDisclosureState(sealed);

  var _React$useState = useState(initialModal),
      modal = _React$useState[0],
      setModal = _React$useState[1];

  var disclosureRef = useRef(null);
  return _objectSpread2(_objectSpread2({}, disclosure), {}, {
    modal: modal,
    setModal: setModal,
    unstable_disclosureRef: disclosureRef
  });
}

export { useDialogState };
