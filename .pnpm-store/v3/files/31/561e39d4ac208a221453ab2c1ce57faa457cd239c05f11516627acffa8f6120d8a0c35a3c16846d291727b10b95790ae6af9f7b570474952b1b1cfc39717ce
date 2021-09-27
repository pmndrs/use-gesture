import '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import 'reakit-utils/useForkRef';
import '../Role/Role.js';
import '../__keys-26bb1730.js';
import { a as MENU_ARROW_KEYS } from '../__keys-f74df4e0.js';
import { usePopoverArrow } from '../Popover/PopoverArrow.js';

var useMenuArrow = createHook({
  name: "MenuArrow",
  compose: usePopoverArrow,
  keys: MENU_ARROW_KEYS
});
var MenuArrow = createComponent({
  as: "div",
  memo: true,
  useHook: useMenuArrow
});

export { MenuArrow, useMenuArrow };
