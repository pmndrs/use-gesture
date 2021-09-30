'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
var isButton = require('reakit-utils/isButton');
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
var Clickable_Clickable = require('../Clickable/Clickable.js');

// Automatically generated
var BUTTON_KEYS = [];

var useButton = createHook.createHook({
  name: "Button",
  compose: Clickable_Clickable.useClickable,
  keys: BUTTON_KEYS,
  useProps: function useProps(_, _ref) {
    var htmlRef = _ref.ref,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["ref"]);

    var ref = React.useRef(null);

    var _React$useState = React.useState(undefined),
        role = _React$useState[0],
        setRole = _React$useState[1];

    var _React$useState2 = React.useState("button"),
        type = _React$useState2[0],
        setType = _React$useState2[1];

    React.useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? reakitWarning.warning(true, "Can't determine whether the element is a native button because `ref` wasn't passed to the component", "See https://reakit.io/docs/button") : void 0;
        return;
      }

      if (!isButton.isButton(element)) {
        if (element.tagName !== "A") {
          setRole("button");
        }

        setType(undefined);
      }
    }, []);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      role: role,
      type: type
    }, htmlProps);
  }
});
var Button = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: useButton
});

exports.Button = Button;
exports.useButton = useButton;
