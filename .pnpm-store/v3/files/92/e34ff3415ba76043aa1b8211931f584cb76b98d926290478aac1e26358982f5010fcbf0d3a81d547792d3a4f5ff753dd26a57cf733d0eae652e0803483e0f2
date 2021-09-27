import '../_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createComponent } from 'reakit-system/createComponent';
import { createHook } from 'reakit-system/createHook';
import 'reakit-utils/shallowEqual';
import 'react';
import 'reakit-utils/useForkRef';
import 'reakit-utils/isButton';
import { useWarning } from 'reakit-warning';
import 'reakit-utils/useLiveRef';
import 'reakit-utils/isSelfTarget';
import 'reakit-utils/useIsomorphicEffect';
import 'reakit-utils/hasFocusWithin';
import 'reakit-utils/isPortalEvent';
import 'reakit-utils/dom';
import 'reakit-utils/tabbable';
import '../Role/Role.js';
import '../Tabbable/Tabbable.js';
import '../Clickable/Clickable.js';
import '../Button/Button.js';
import '../__keys-e6a5cfbe.js';
import 'reakit-utils/removeItemFromArray';
import '../MenuContext-6af6cf92.js';
import '../__keys-ed7b48af.js';
import '../__keys-26bb1730.js';
import '../Disclosure/Disclosure.js';
import '../Dialog/DialogDisclosure.js';
import '../__keys-f74df4e0.js';
import '../Popover/PopoverDisclosure.js';
import '../findVisibleSubmenu-1553e354.js';
import { useMenuButton } from './MenuButton.js';

var useMenuDisclosure = createHook({
  name: "MenuDisclosure",
  compose: useMenuButton,
  useProps: function useProps(_, htmlProps) {
    process.env.NODE_ENV !== "production" ? useWarning(true, "`MenuDisclosure` has been renamed to `MenuButton`. Using `<MenuDisclosure />` will no longer work in future versions.", "See https://reakit.io/docs/menu") : void 0;
    return htmlProps;
  }
});
var MenuDisclosure = createComponent({
  as: "button",
  useHook: useMenuDisclosure
});

export { MenuDisclosure, useMenuDisclosure };
