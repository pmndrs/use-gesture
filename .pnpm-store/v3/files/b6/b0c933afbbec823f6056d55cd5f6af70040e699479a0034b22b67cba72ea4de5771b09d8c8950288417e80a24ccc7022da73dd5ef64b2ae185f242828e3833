'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
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
var useCreateElement = require('reakit-system/useCreateElement');
require('reakit-utils/getDocument');
require('reakit-utils/fireBlurEvent');
require('reakit-utils/fireKeyboardEvent');
require('reakit-utils/canUseDOM');
require('reakit-utils/getNextActiveElementOnBlur');
require('../reverse-4756a49e.js');
require('../getCurrentId-eade2850.js');
require('../findEnabledItemById-03112678.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
var Composite_Composite = require('../Composite/Composite.js');
var __keys = require('../__keys-403ff944.js');

var useToolbar = createHook.createHook({
  name: "Toolbar",
  compose: Composite_Composite.useComposite,
  keys: __keys.TOOLBAR_KEYS,
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "toolbar",
      "aria-orientation": options.orientation
    }, htmlProps);
  }
});
var Toolbar = createComponent.createComponent({
  as: "div",
  useHook: useToolbar,
  useCreateElement: function useCreateElement$1(type, props, children) {
    process.env.NODE_ENV !== "production" ? reakitWarning.useWarning(!props["aria-label"] && !props["aria-labelledby"], "You should provide either `aria-label` or `aria-labelledby` props.", "See https://reakit.io/docs/toolbar") : void 0;
    return useCreateElement.useCreateElement(type, props, children);
  }
});

exports.Toolbar = Toolbar;
exports.useToolbar = useToolbar;
