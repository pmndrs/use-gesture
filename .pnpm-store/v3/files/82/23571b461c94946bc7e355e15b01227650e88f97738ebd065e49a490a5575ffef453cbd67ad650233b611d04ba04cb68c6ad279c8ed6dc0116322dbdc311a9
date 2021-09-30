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

function getFirstInvalidInput(baseId, target) {
  var document = getDocument.getDocument(target);
  var selector = "[aria-invalid=true][id^=" + baseId + "]";
  return document.querySelector(selector);
}

var unstable_useFormSubmitButton = createHook.createHook({
  name: "FormSubmitButton",
  compose: Button_Button.useButton,
  keys: __keys.FORM_SUBMIT_BUTTON_KEYS,
  useOptions: function useOptions(options) {
    return _rollupPluginBabelHelpers._objectSpread2({
      disabled: options.submitting
    }, options);
  },
  useProps: function useProps(options, _ref) {
    var htmlOnClick = _ref.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onClick"]);

    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      var element = event.currentTarget;
      window.requestAnimationFrame(function () {
        var input = getFirstInvalidInput(options.baseId, element);
        input === null || input === void 0 ? void 0 : input.focus();

        if (input && "select" in input) {
          input.select();
        }
      });
    }, [options.baseId]);
    return _rollupPluginBabelHelpers._objectSpread2({
      type: "submit",
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormSubmitButton = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormSubmitButton
});

exports.unstable_FormSubmitButton = unstable_FormSubmitButton;
exports.unstable_useFormSubmitButton = unstable_useFormSubmitButton;
