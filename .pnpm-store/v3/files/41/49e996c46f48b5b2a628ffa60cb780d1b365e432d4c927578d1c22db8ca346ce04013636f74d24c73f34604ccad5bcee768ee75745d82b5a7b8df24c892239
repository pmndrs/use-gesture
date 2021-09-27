'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-087914ef.js');

var useMenuGroup = createHook.createHook({
  name: "MenuGroup",
  compose: Role_Role.useRole,
  keys: __keys.MENU_GROUP_KEYS,
  useProps: function useProps(_, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "group"
    }, htmlProps);
  }
});
var MenuGroup = createComponent.createComponent({
  as: "div",
  useHook: useMenuGroup
});

exports.MenuGroup = MenuGroup;
exports.useMenuGroup = useMenuGroup;
