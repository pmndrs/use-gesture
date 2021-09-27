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
var getPushButtonId = require('../getPushButtonId-7a4ebc40.js');

var unstable_useFormRemoveButton = createHook.createHook({
  name: "FormRemoveButton",
  compose: Button_Button.useButton,
  keys: __keys.FORM_REMOVE_BUTTON_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnClick = _ref2.onClick,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["onClick"]);

    var onClickRef = useLiveRef.useLiveRef(htmlOnClick);
    var onClick = React.useCallback(function (event) {
      var _onClickRef$current, _options$remove;

      (_onClickRef$current = onClickRef.current) === null || _onClickRef$current === void 0 ? void 0 : _onClickRef$current.call(onClickRef, event);
      if (event.defaultPrevented) return;
      (_options$remove = options.remove) === null || _options$remove === void 0 ? void 0 : _options$remove.call(options, options.name, options.index);
      var inputId = getInputId.getInputId(options.name, options.baseId);
      if (!inputId) return;
      var document = getDocument.getDocument(event.currentTarget);
      window.requestAnimationFrame(function () {
        var selector = "[id^=\"" + inputId + "-\"]";
        var inputs = document.querySelectorAll(selector);

        if (inputs.length) {
          var inputsArray = Array.from(inputs);
          var nextIdx = inputsArray.reduce(function (final, input) {
            var match = input.id.match(new RegExp(inputId + "-([0-9]+)"));
            if (!match) return final;
            var idx = match[1];

            if (Number(idx) > final && options.index >= final) {
              return Number(idx);
            }

            return final;
          }, 0);
          var nextSelector = "[id^=\"" + inputId + "-" + nextIdx + "\"]";
          var input = document.querySelector(nextSelector);

          if (input) {
            input.focus();
            return;
          }
        }

        var pushButtonId = getPushButtonId.getPushButtonId(options.name, options.baseId);

        if (pushButtonId) {
          var pushButton = document.getElementById(pushButtonId);
          pushButton === null || pushButton === void 0 ? void 0 : pushButton.focus();
        }
      });
    }, [options.remove, options.name, options.index, options.baseId]);
    return _rollupPluginBabelHelpers._objectSpread2({
      onClick: onClick
    }, htmlProps);
  }
});
var unstable_FormRemoveButton = createComponent.createComponent({
  as: "button",
  memo: true,
  useHook: unstable_useFormRemoveButton
});

exports.unstable_FormRemoveButton = unstable_FormRemoveButton;
exports.unstable_useFormRemoveButton = unstable_useFormRemoveButton;
