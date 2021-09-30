'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-4b3c7cdc.js');
var getInputId = require('../getInputId-cbd3bbcc.js');
var getLabelId = require('../getLabelId-eba7e47b.js');

var unstable_useFormLabel = createHook.createHook({
  name: "FormLabel",
  compose: Role_Role.useRole,
  keys: __keys.FORM_LABEL_KEYS,
  useProps: function useProps(options, htmlProps) {
    return _rollupPluginBabelHelpers._objectSpread2({
      children: options.label,
      id: getLabelId.getLabelId(options.name, options.baseId),
      htmlFor: getInputId.getInputId(options.name, options.baseId)
    }, htmlProps);
  }
});
var unstable_FormLabel = createComponent.createComponent({
  as: "label",
  memo: true,
  useHook: unstable_useFormLabel
});

exports.unstable_FormLabel = unstable_FormLabel;
exports.unstable_useFormLabel = unstable_useFormLabel;
