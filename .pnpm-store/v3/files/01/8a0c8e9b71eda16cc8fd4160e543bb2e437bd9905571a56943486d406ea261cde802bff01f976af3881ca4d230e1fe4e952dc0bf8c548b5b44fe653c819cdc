'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('react');
var useForkRef = require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('reakit-utils/useUpdateEffect');
var useCreateElement = require('reakit-system/useCreateElement');
require('reakit-utils/getDocument');
require('reakit-utils/canUseDOM');
require('reakit-utils/getNextActiveElementOnBlur');
require('reakit-utils/ensureFocus');
require('../__keys-f41a441b.js');
require('../Disclosure/DisclosureContent.js');
require('react-dom');
require('../Portal/Portal.js');
require('reakit-utils/removeItemFromArray');
require('../MenuContext-2d32bb3e.js');
var Dialog_Dialog = require('../Dialog/Dialog.js');
require('body-scroll-lock');
require('reakit-utils/closest');
require('reakit-utils/getActiveElement');
require('reakit-utils/contains');
require('../DialogBackdropContext-b43e21d7.js');
require('reakit-utils/isEmpty');
require('../__keys-0c8e6398.js');
var __keys = require('../__keys-eddd3051.js');

var usePopover = createHook.createHook({
  name: "Popover",
  compose: Dialog_Dialog.useDialog,
  keys: __keys.POPOVER_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$modal = _ref.modal,
        modal = _ref$modal === void 0 ? false : _ref$modal,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["modal"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      modal: modal
    }, options);
  },
  useProps: function useProps(options, _ref2) {
    var htmlRef = _ref2.ref,
        htmlStyle = _ref2.style,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["ref", "style"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(options.unstable_popoverRef, htmlRef),
      style: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options.unstable_popoverStyles), htmlStyle)
    }, htmlProps);
  }
});
var Popover = createComponent.createComponent({
  as: "div",
  useHook: usePopover,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/popover") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.Popover = Popover;
exports.usePopover = usePopover;
