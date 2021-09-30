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
require('reakit-utils/useIsomorphicEffect');
require('reakit-utils/hasFocusWithin');
require('reakit-utils/isPortalEvent');
require('reakit-utils/dom');
require('reakit-utils/tabbable');
require('../Role/Role.js');
require('../Tabbable/Tabbable.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
var getLabelId = require('../getLabelId-eba7e47b.js');
var Form_utils_getIn = require('./utils/getIn.js');
var shouldShowError = require('../shouldShowError-880a39c9.js');
var Input_Input = require('../Input/Input.js');

var unstable_useFormInput = createHook.createHook({
  name: "FormInput",
  compose: Input_Input.useInput,
  keys: __keys.FORM_INPUT_KEYS,
  useOptions: function useOptions(options, _ref) {
    var name = _ref.name;
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      name: options.name || name
    });
  },
  useProps: function useProps(options, _ref2) {
    var htmlOnChange = _ref2.onChange,
        htmlOnBlur = _ref2.onBlur,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref2, ["onChange", "onBlur"]);

    var onChangeRef = useLiveRef.useLiveRef(htmlOnChange);
    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var onChange = React.useCallback(function (event) {
      var _onChangeRef$current, _options$update;

      (_onChangeRef$current = onChangeRef.current) === null || _onChangeRef$current === void 0 ? void 0 : _onChangeRef$current.call(onChangeRef, event);
      if (event.defaultPrevented) return;
      (_options$update = options.update) === null || _options$update === void 0 ? void 0 : _options$update.call(options, options.name, event.target.value);
    }, [options.update, options.name]);
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _rollupPluginBabelHelpers._objectSpread2({
      id: getInputId.getInputId(options.name, options.baseId),
      name: getInputId.formatInputName(options.name),
      value: Form_utils_getIn.unstable_getIn(options.values, options.name, ""),
      "aria-describedby": shouldShowError.getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId.getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError.shouldShowError(options, options.name),
      onChange: onChange,
      onBlur: onBlur
    }, htmlProps);
  }
});
var unstable_FormInput = createComponent.createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormInput
});

exports.unstable_FormInput = unstable_FormInput;
exports.unstable_useFormInput = unstable_useFormInput;
