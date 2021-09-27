'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var React = require('react');
var useLiveRef = require('reakit-utils/useLiveRef');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-4b3c7cdc.js');

var unstable_useForm = createHook.createHook({
  name: "Form",
  compose: Role_Role.useRole,
  keys: __keys.FORM_KEYS,
  useProps: function useProps(options, _ref) {
    var htmlOnSubmit = _ref.onSubmit,
        htmlProps = _rollupPluginBabelHelpers._objectWithoutPropertiesLoose(_ref, ["onSubmit"]);

    var onSubmitRef = useLiveRef.useLiveRef(htmlOnSubmit);
    var onSubmit = React.useCallback(function (event) {
      var _onSubmitRef$current, _options$submit;

      (_onSubmitRef$current = onSubmitRef.current) === null || _onSubmitRef$current === void 0 ? void 0 : _onSubmitRef$current.call(onSubmitRef, event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      (_options$submit = options.submit) === null || _options$submit === void 0 ? void 0 : _options$submit.call(options);
    }, [options.submit]);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "form",
      noValidate: true,
      onSubmit: onSubmit
    }, htmlProps);
  }
});
var unstable_Form = createComponent.createComponent({
  as: "form",
  useHook: unstable_useForm
});

exports.unstable_Form = unstable_Form;
exports.unstable_useForm = unstable_useForm;
