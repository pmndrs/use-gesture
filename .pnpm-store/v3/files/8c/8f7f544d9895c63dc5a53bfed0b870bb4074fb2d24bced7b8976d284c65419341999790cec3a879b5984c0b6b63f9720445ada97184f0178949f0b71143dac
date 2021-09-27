'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../_rollupPluginBabelHelpers-8f9a8751.js');
require('reakit-utils/shallowEqual');
require('react');
require('reakit-warning');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/dom');
var useSealedState = require('reakit-utils/useSealedState');
require('reakit-utils/getDocument');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../Id/IdProvider.js');
require('reakit-utils/applyState');
require('../Id/IdState.js');
require('../Composite/CompositeState.js');
require('../Grid/GridState.js');
require('../ComboboxBaseState-cfd43319.js');
var Combobox_ComboboxListGridState = require('./ComboboxListGridState.js');
require('@popperjs/core');
require('../Disclosure/DisclosureState.js');
require('../Dialog/DialogState.js');
require('../Popover/PopoverState.js');
var ComboboxPopoverState = require('../ComboboxPopoverState-98e3f717.js');

function unstable_useComboboxGridState(initialState) {
  if (initialState === void 0) {
    initialState = {};
  }

  var sealed = useSealedState.useSealedState(initialState);
  var combobox = Combobox_ComboboxListGridState.unstable_useComboboxListGridState(sealed);
  return ComboboxPopoverState.useComboboxPopoverState(combobox, sealed);
}

exports.unstable_useComboboxGridState = unstable_useComboboxGridState;
