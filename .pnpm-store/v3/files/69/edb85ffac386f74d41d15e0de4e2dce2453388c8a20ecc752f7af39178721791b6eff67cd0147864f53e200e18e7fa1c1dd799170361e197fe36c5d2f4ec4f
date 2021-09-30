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
require('reakit-utils/removeIndexFromArray');
require('reakit-utils/createEvent');
var Checkbox_Checkbox = require('../Checkbox/Checkbox.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
var getLabelId = require('../getLabelId-eba7e47b.js');
var Form_utils_getIn = require('./utils/getIn.js');
var shouldShowError = require('../shouldShowError-880a39c9.js');

var unstable_useFormCheckbox = createHook.createHook({
  name: "FormCheckbox",
  compose: Checkbox_Checkbox.useCheckbox,
  keys: __keys.FORM_CHECKBOX_KEYS,
  useOptions: function useOptions(options, htmlProps) {
    var name = options.name || htmlProps.name;
    var value = typeof options.value !== "undefined" ? options.value : htmlProps.value;
    var state = Form_utils_getIn.unstable_getIn(options.values, name);

    var setState = function setState(val) {
      return options.update(name, val);
    };

    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, options), {}, {
      state: state,
      setState: setState,
      name: name,
      value: value
    });
  },
  useProps: function useProps(options, _ref) {
    var htmlOnBlur = _ref.onBlur,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onBlur"]);

    var onBlurRef = useLiveRef.useLiveRef(htmlOnBlur);
    var isBoolean = typeof options.value === "undefined";
    var onBlur = React.useCallback(function (event) {
      var _onBlurRef$current, _options$blur;

      (_onBlurRef$current = onBlurRef.current) === null || _onBlurRef$current === void 0 ? void 0 : _onBlurRef$current.call(onBlurRef, event);
      if (event.defaultPrevented) return;
      (_options$blur = options.blur) === null || _options$blur === void 0 ? void 0 : _options$blur.call(options, options.name);
    }, [options.blur, options.name]);
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      "aria-invalid": shouldShowError.shouldShowError(options, options.name),
      name: getInputId.formatInputName(options.name),
      onBlur: onBlur
    }, isBoolean ? {
      id: getInputId.getInputId(options.name, options.baseId),
      "aria-describedby": shouldShowError.getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId.getLabelId(options.name, options.baseId)
    } : {}), htmlProps);
  }
});
var unstable_FormCheckbox = createComponent.createComponent({
  as: "input",
  memo: true,
  useHook: unstable_useFormCheckbox
});

exports.unstable_FormCheckbox = unstable_FormCheckbox;
exports.unstable_useFormCheckbox = unstable_useFormCheckbox;
