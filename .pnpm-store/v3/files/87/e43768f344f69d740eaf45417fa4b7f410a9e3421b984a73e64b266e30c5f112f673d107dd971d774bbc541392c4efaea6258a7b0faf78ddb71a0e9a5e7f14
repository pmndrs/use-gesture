'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('react');
require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
var reakitWarning = require('reakit-warning');
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
require('reakit-utils/removeItemFromArray');
require('../MenuContext-2d32bb3e.js');
require('../__keys-0c8e6398.js');
require('../__keys-eddd3051.js');
require('../Disclosure/Disclosure.js');
require('../Dialog/DialogDisclosure.js');
require('../__keys-087914ef.js');
require('../Popover/PopoverDisclosure.js');
require('../findVisibleSubmenu-d8b7eeab.js');
var Menu_MenuButton = require('./MenuButton.js');

var useMenuDisclosure = createHook.createHook({
  name: "MenuDisclosure",
  compose: Menu_MenuButton.useMenuButton,
  useProps: function useProps(_, htmlProps) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(true, "`MenuDisclosure` has been renamed to `MenuButton`. Using `<MenuDisclosure />` will no longer work in future versions.", "See https://reakit.io/docs/menu") : void 0;
    return htmlProps;
  }
});
var MenuDisclosure = createComponent.createComponent({
  as: "button",
  useHook: useMenuDisclosure
});

exports.MenuDisclosure = MenuDisclosure;
exports.useMenuDisclosure = useMenuDisclosure;
