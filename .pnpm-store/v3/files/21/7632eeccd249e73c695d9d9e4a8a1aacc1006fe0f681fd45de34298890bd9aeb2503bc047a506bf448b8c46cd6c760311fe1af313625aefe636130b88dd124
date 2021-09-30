'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useForkRef = require('reakit-utils/useForkRef');
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
var createEvent = require('reakit-utils/createEvent');
require('reakit-utils/getDocument');
require('../getCurrentId-eade2850.js');
require('../__keys-3b597476.js');
require('../userFocus-0afea51a.js');
require('reakit-utils/isTextField');
require('reakit-utils/ensureFocus');
require('../Id/IdProvider.js');
require('../Id/Id.js');
require('reakit-utils/fireEvent');
require('../setTextFieldValue-b0584ae1.js');
var Composite_CompositeItem = require('../Composite/CompositeItem.js');
var warning = require('reakit-warning/warning');
var __keys = require('../__keys-a6d5cee4.js');

function getChecked(options) {
  if (typeof options.checked !== "undefined") {
    return options.checked;
  }

  return typeof options.value !== "undefined" && options.state === options.value;
}

function useInitialChecked(options) {
  var _React$useState = React.useState(function () {
    return getChecked(options);
  }),
      initialChecked = _React$useState[0];

  var _React$useState2 = React.useState(options.currentId),
      initialCurrentId = _React$useState2[0];

  var id = options.id,
      setCurrentId = options.setCurrentId;
  React.useEffect(function () {
    if (initialChecked && id && initialCurrentId !== id) {
      setCurrentId === null || setCurrentId === void 0 ? void 0 : setCurrentId(id);
    }
  }, [initialChecked, id, setCurrentId, initialCurrentId]);
}

function fireChange(element, onChange) {
  var event = createEvent.createEvent(element, "change");
  Object.defineProperties(event, {
    type: {
      value: "change"
    },
    target: {
      value: element
    },
    currentTarget: {
      value: element
    }
  });
  onChange === null || onChange === void 0 ? void 0 : onChange(event);
}

var useRadio = createHook.createHook({
  name: "Radio",
  compose: Composite_CompositeItem.useCompositeItem,
  keys: __keys.RADIO_KEYS,
  useOptions: function useOptions(_ref, _ref2) {
    var _options$value;

    var value = _ref2.value,
        checked = _ref2.checked;

    var _ref$unstable_clickOn = _ref.unstable_clickOnEnter,
        unstable_clickOnEnter = _ref$unstable_clickOn === void 0 ? false : _ref$unstable_clickOn,
        _ref$unstable_checkOn = _ref.unstable_checkOnFocus,
        unstable_checkOnFocus = _ref$unstable_checkOn === void 0 ? true : _ref$unstable_checkOn,
        options = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["unstable_clickOnEnter", "unstable_checkOnFocus"]);

    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      checked: checked,
      unstable_clickOnEnter: unstable_clickOnEnter,
      unstable_checkOnFocus: unstable_checkOnFocus
    }, options), {}, {
      value: (_options$value = options.value) != null ? _options$value : value
    });
  },
  useProps: function useProps(options, _ref3) {
    var htmlRef = _ref3.ref,
        htmlOnChange = _ref3.onChange,
        htmlOnClick = _ref3.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref3, ["ref", "onChange", "onClick"]);

    var ref = React.useRef(null);

    var _React$useState3 = React.useState(true),
        isNativeRadio = _React$useState3[0],
        setIsNativeRadio = _React$useState3[1];

    var checked = getChecked(options);
    var isCurrentItemRef = useLiveRef.useLiveRef(options.currentId === options.id);
    var onChangeRef = useLiveRef.useLiveRef(htmlOnChange);
    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    useInitialChecked(options);
    React.useEffect(function () {
      var element = ref.current;

      if (!element) {
        process.env.NODE_ENV !== "production" ? warning.warning(true, "Can't determine whether the element is a native radio because `ref` wasn't passed to the component", "See https://reakit.io/docs/radio") : void 0;
        return;
      }

      if (element.tagName !== "INPUT" || element.type !== "radio") {
        setIsNativeRadio(false);
      }
    }, []);
    var onChange = React.useCallback(function (event) {
      var _onChangeRef$current, _options$setState;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      if (options.disabled) return;
      (_options$setState = options.setState) === null || _options$setState === void 0 ? void 0 : _options$setState.call(options, options.value);
    }, [options.disabled, options.setState, options.value]);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      if (isNativeRadio) return;
      fireChange(event.currentTarget, onChange);
    }, [onChange, isNativeRadio]);
    React.useEffect(function () {
      var element = ref.current;
      if (!element) return;

      if (options.unstable_moves && isCurrentItemRef.current && options.unstable_checkOnFocus) {
        fireChange(element, onChange);
      }
    }, [options.unstable_moves, options.unstable_checkOnFocus, onChange]);
    return _rollupPluginBabelHelpers._objectSpread2({
      ref: useForkRef.useForkRef(ref, htmlRef),
      role: !isNativeRadio ? "radio" : undefined,
      type: isNativeRadio ? "radio" : undefined,
      value: isNativeRadio ? options.value : undefined,
      name: isNativeRadio ? options.baseId : undefined,
      "aria-checked": checked,
      checked: checked,
      onChange: onChange,
      onClick: onClick
    }, htmlProps);
  }
});
var Radio = createComponent.createComponent({
  as: "input",
  memo: true,
  useHook: useRadio
});

exports.Radio = Radio;
exports.useRadio = useRadio;
