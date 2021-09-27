'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('../Box/Box.js');
require('react');
require('reakit-utils/useForkRef');
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
var __keys = require('../__keys-a7141fdd.js');
require('../getMenuId-ae301adb.js');
require('reakit-utils/ensureFocus');
var Combobox_ComboboxList = require('./ComboboxList.js');
require('../__keys-f41a441b.js');
require('../Disclosure/DisclosureContent.js');
require('react-dom');
require('../Portal/Portal.js');
require('reakit-utils/removeItemFromArray');
require('../MenuContext-2d32bb3e.js');
require('../Dialog/Dialog.js');
require('body-scroll-lock');
require('reakit-utils/closest');
require('reakit-utils/getActiveElement');
require('reakit-utils/contains');
require('../DialogBackdropContext-b43e21d7.js');
require('reakit-utils/isEmpty');
require('../__keys-0c8e6398.js');
require('../__keys-eddd3051.js');
var Popover_Popover = require('../Popover/Popover.js');

var unstable_useComboboxPopover = createHook.createHook({
  name: "ComboboxPopover",
  compose: [Combobox_ComboboxList.unstable_useComboboxList, Popover_Popover.usePopover],
  keys: __keys.COMBOBOX_POPOVER_KEYS,
  useOptions: function useOptions(options) {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      unstable_disclosureRef: options.unstable_referenceRef,
      unstable_autoFocusOnShow: false,
      unstable_autoFocusOnHide: false
    });
  },
  useComposeProps: function useComposeProps(options, _ref) {
    var tabIndex = _ref.tabIndex,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["tabIndex"]);

    htmlProps = Combobox_ComboboxList.unstable_useComboboxList(options, htmlProps, true);
    htmlProps = Popover_Popover.usePopover(options, htmlProps, true);
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, htmlProps), {}, {
      tabIndex: tabIndex != null ? tabIndex : undefined
    });
  }
});
var unstable_ComboboxPopover = createComponent.createComponent({
  as: "div",
  useHook: unstable_useComboboxPopover,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/combobox") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.unstable_ComboboxPopover = unstable_ComboboxPopover;
exports.unstable_useComboboxPopover = unstable_useComboboxPopover;
