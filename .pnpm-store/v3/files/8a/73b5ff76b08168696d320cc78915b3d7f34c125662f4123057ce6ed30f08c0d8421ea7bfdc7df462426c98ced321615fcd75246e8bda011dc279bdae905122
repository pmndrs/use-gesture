'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('react');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('../Role/Role.js');
require('reakit-utils/canUseDOM');
require('../__keys-f41a441b.js');
require('../Disclosure/DisclosureContent.js');
require('react-dom');
require('../Portal/Portal.js');
require('../DialogBackdropContext-b43e21d7.js');
require('../__keys-0c8e6398.js');
var __keys = require('../__keys-eddd3051.js');
var Dialog_DialogBackdrop = require('../Dialog/DialogBackdrop.js');

var usePopoverBackdrop = createHook.createHook({
  name: "PopoverBackdrop",
  compose: Dialog_DialogBackdrop.useDialogBackdrop,
  keys: __keys.POPOVER_BACKDROP_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? false : _ref$modal,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      modal: modal
    }, options);
  }
});
var PopoverBackdrop = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: usePopoverBackdrop
});

exports.PopoverBackdrop = PopoverBackdrop;
exports.usePopoverBackdrop = usePopoverBackdrop;
