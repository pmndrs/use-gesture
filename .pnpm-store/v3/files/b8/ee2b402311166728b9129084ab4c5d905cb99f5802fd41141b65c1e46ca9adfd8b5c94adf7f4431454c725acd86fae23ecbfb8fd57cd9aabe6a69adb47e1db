'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var React = require('react');
require('reakit-warning');
require('reakit-utils/useIsomorphicEffect');
var useSealedState = require('reakit-utils/useSealedState');
require('../Id/IdProvider.js');
require('../Id/IdState.js');
var Disclosure_DisclosureState = require('../Disclosure/DisclosureState.js');

function useDialogState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var _useSealedState = useSealedState.useSealedState(initialState),
      _useSealedState$modal = _useSealedState.modal,
      initialModal = _useSealedState$modal === void 0 ? true : _useSealedState$modal,
      sealed = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_useSealedState, ["modal"]);

  var disclosure = Disclosure_DisclosureState.useDisclosureState(sealed);

  var _React$useState = React.useState(initialModal),
      modal = _React$useState[0],
      setModal = _React$useState[1];

  var disclosureRef = React.useRef(null);
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, disclosure), {}, {
    modal: modal,
    setModal: setModal,
    unstable_disclosureRef: disclosureRef
  });
}

exports.useDialogState = useDialogState;
