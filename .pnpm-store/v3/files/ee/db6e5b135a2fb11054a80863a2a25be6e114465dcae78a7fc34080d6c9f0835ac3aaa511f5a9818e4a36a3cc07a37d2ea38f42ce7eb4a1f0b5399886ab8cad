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
var getDocument = require('reakit-utils/getDocument');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
var Form_utils_getIn = require('./utils/getIn.js');
var getPushButtonId = require('../getPushButtonId-7a4ebc40.js');

var unstable_useFormPushButton = createHook.createHook({
  name: "FormPushButton",
  compose: Button_Button.useButton,
  keys: __keys.FORM_PUSH_BUTTON_KEYS,
  useOptions: function useOptions(options, _ref) {
    var _options$value;

    var name = _ref.name,
        value = _ref.value;
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      name: options.name || name,
      value: (_options$value = options.value) != null ? _options$value : value
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["onClick"]);

    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current, _options$push;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$push = options.push) === null || _options$push === void 0 ? void 0 : _options$push.call(options, options.name, options.value);

      var _unstable_getIn = Form_utils_getIn.unstable_getIn(options.values, options.name, []),
          length = _unstable_getIn.length;

      var inputId = getInputId.getInputId(getInputId.formatInputName(options.name, "-") + "-" + length, options.baseId);
      if (!inputId) return;
      var element = event.currentTarget;
      window.requestAnimationFrame(function () {
        var selector = "[id^=\"" + inputId + "\"]";
        var document = getDocument.getDocument(element);
        var input = document.querySelector(selector);
        input === null || input === void 0 ? void 0 : input.focus();
      });
    }, [options.push, options.name, options.value, options.values, options.baseId]);
    return _rollupPluginBabelHelpers._objectSpread2({
      id: getPushButtonId.getPushButtonId(options.name, options.baseId),
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormPushButton = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormPushButton
});

exports.unstable_FormPushButton = unstable_FormPushButton;
exports.unstable_useFormPushButton = unstable_useFormPushButton;
