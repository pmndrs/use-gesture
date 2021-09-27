'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
require('reakit-warning');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
require('../Button/Button.js');
require('../__keys-f41a441b.js');
require('../__keys-0c8e6398.js');
var __keys = require('../__keys-eddd3051.js');
require('../Disclosure/Disclosure.js');
var Dialog_DialogDisclosure = require('../Dialog/DialogDisclosure.js');

var usePopoverDisclosure = createHook.createHook({
  name: "PopoverDisclosure",
  compose: Dialog_DialogDisclosure.useDialogDisclosure,
  keys: __keys.POPOVER_DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(options.unstable_referenceRef, htmlRef)
    }, htmlProps);
  }
});
var PopoverDisclosure = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: usePopoverDisclosure
});

exports.PopoverDisclosure = PopoverDisclosure;
exports.usePopoverDisclosure = usePopoverDisclosure;
