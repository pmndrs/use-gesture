'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
require('../Role/Role.js');
var Group_Group = require('../Group/Group.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
var getLabelId = require('../getLabelId-eba7e47b.js');
require('./utils/getIn.js');
var shouldShowError = require('../shouldShowError-880a39c9.js');

var unstable_useFormGroup = createHook.createHook({
  name: "FormGroup",
  compose: Group_Group.useGroup,
  keys: __keys.FORM_GROUP_KEYS,
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      id: getInputId.getInputId(options.name, options.baseId),
      tabIndex: -1,
      "aria-describedby": shouldShowError.getMessageId(options.name, options.baseId),
      "aria-labelledby": getLabelId.getLabelId(options.name, options.baseId),
      "aria-invalid": shouldShowError.shouldShowError(options, options.name)
    }, htmlProps);
  }
});
var unstable_FormGroup = createComponent.createComponent({
  as: "fieldset",
  useHook: unstable_useFormGroup
});

exports.unstable_FormGroup = unstable_FormGroup;
exports.unstable_useFormGroup = unstable_useFormGroup;
