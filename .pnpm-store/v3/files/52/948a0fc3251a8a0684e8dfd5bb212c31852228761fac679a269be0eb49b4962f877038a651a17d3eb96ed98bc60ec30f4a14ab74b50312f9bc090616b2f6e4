'use strict';

var fireEvent = require('reakit-utils/fireEvent');

function setTextFieldValue(element, value) {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    var _Object$getOwnPropert;

    var proto = Object.getPrototypeOf(element);
    var setValue = (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(proto, "value")) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.set;

    if (setValue) {
      setValue.call(element, value);
      fireEvent.fireEvent(element, "input", {
        bubbles: true
      });
    }
  }
}

exports.setTextFieldValue = setTextFieldValue;
