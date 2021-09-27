'use strict';

function userFocus(element) {
  element.userFocus = true;
  element.focus();
  element.userFocus = false;
}
function hasUserFocus(element) {
  return !!element.userFocus;
}
function setUserFocus(element, value) {
  element.userFocus = value;
}

exports.hasUserFocus = hasUserFocus;
exports.setUserFocus = setUserFocus;
exports.userFocus = userFocus;
