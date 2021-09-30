import { a as _objectSpread2 } from '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import { useRole } from '../Role/Role.js';
import { d as MENU_GROUP_KEYS } from '../__keys-f74df4e0.js';

var useMenuGroup = createHook({
  name: "MenuGroup",
  compose: useRole,
  keys: MENU_GROUP_KEYS,
  useProps: function useProps(_, htmlProps) {
    return _objectSpread2({
      role: "group"
    }, htmlProps);
  }
});
var MenuGroup = createComponent({
  as: "div",
  useHook: useMenuGroup
});

export { MenuGroup, useMenuGroup };
