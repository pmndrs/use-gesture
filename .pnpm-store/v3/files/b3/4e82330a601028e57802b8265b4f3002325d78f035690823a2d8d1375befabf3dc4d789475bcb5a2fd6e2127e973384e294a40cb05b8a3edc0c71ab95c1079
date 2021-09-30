'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
require('reakit-utils/useForkRef');
require('reakit-utils/isButton');
require('reakit-warning');
var useLiveRef = require('reakit-utils/useLiveRef');
require('reakit-utils/isSelfTarget');
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
require('../Clickable/Clickable.js');
var Button_Button = require('../Button/Button.js');
var __keys = require('../__keys-f41a441b.js');

var useDisclosure = createHook.createHook({
  name: "Disclosure",
  compose: Button_Button.useButton,
  keys: __keys.DISCLOSURE_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        ariaControls = _ref["aria-controls"],
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onClick", "aria-controls"]);

    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var controls = ariaControls ? ariaControls + " " + options.baseId : options.baseId;
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current, _options$toggle;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$toggle = options.toggle) === null || _options$toggle === void 0 ? void 0 : _options$toggle.call(options);
    }, [options.toggle]);
    return _rollupPluginBabelHelpers._objectSpread2({
      "aria-expanded": !!options.visible,
      "aria-controls": controls,
      onClick: onClick
    }, htmlProps);
  }
});
var Disclosure = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useDisclosure
});

exports.Disclosure = Disclosure;
exports.useDisclosure = useDisclosure;
