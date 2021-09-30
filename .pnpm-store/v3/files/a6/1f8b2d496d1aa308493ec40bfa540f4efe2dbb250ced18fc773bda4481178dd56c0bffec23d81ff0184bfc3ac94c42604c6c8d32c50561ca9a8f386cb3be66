'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Box_Box = require('../Box/Box.js');
var reakitWarning = require('reakit-warning');
var useCreateElement = require('reakit-system/useCreateElement');
var __keys = require('../__keys-a7141fdd.js');
var getMenuId = require('../getMenuId-ae301adb.js');

var unstable_useComboboxList = createHook.createHook({
  name: "ComboboxList",
  compose: Box_Box.useBox,
  keys: __keys.COMBOBOX_LIST_KEYS,
  useOptions: function useOptions(_ref) {
    var _ref$menuRole = _ref.menuRole,
        menuRole = _ref$menuRole === void 0 ? "listbox" : _ref$menuRole,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["menuRole"]);

    return _rollupPluginBabelHelpers._objectSpread2({
      menuRole: menuRole
    }, options);
  },
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      role: options.menuRole,
      id: getMenuId.getMenuId(options.baseId)
    }, htmlProps);
  }
});
var unstable_ComboboxList = createComponent.createComponent({
  as: "div",
  useHook: unstable_useComboboxList,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/combobox") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.unstable_ComboboxList = unstable_ComboboxList;
exports.unstable_useComboboxList = unstable_useComboboxList;
