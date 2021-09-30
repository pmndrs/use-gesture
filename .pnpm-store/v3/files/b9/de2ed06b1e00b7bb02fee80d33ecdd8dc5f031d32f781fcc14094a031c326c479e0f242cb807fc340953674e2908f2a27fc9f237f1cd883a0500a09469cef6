'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-8f9a8751.js');
var createComponent = require('reakit-system/createComponent');
var createHook = require('reakit-system/createHook');
require('reakit-utils/shallowEqual');
var Role_Role = require('../Role/Role.js');
var __keys = require('../__keys-4b3c7cdc.js');
require('../getInputId-cbd3bbcc.js');
var Form_utils_getIn = require('./utils/getIn.js');
var shouldShowError = require('../shouldShowError-880a39c9.js');

function shouldShowMessage(_ref, name) {
  var touched = _ref.touched,
      messages = _ref.messages;
  return !!(Form_utils_getIn.unstable_getIn(touched, name) && Form_utils_getIn.unstable_getIn(messages, name));
}

var unstable_useFormMessage = createHook.createHook({
  name: "FormMessage",
  compose: Role_Role.useRole,
  keys: __keys.FORM_MESSAGE_KEYS,
  useProps: function useProps(options, htmlProps) {
    var children = shouldShowError.shouldShowError(options, options.name) ? Form_utils_getIn.unstable_getIn(options.errors, options.name) : undefined;
    children = children || (shouldShowMessage(options, options.name) ? Form_utils_getIn.unstable_getIn(options.messages, options.name) : undefined);
    return _rollupPluginBabelHelpers._objectSpread2({
      role: "alert",
      id: shouldShowError.getMessageId(options.name, options.baseId),
      children: children
    }, htmlProps);
  }
});
var unstable_FormMessage = createComponent.createComponent({
  as: "div",
  memo: true,
  useHook: unstable_useFormMessage
});

exports.unstable_FormMessage = unstable_FormMessage;
exports.unstable_useFormMessage = unstable_useFormMessage;
