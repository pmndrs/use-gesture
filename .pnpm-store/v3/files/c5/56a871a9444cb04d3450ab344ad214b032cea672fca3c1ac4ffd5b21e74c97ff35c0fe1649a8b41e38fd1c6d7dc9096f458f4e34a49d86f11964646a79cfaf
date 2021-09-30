'use strict';

var getInputId = require('./getInputId-cbd3bbcc.js');
var Form_utils_getIn = require('./Form/utils/getIn.js');

function getMessageId(name, baseId) {
  return getInputId.getInputId(name, baseId, "-message");
}

function shouldShowError(_ref, name) {
  var touched = _ref.touched,
      errors = _ref.errors;
  return !!(Form_utils_getIn.unstable_getIn(touched, name) && Form_utils_getIn.unstable_getIn(errors, name));
}

exports.getMessageId = getMessageId;
exports.shouldShowError = shouldShowError;
