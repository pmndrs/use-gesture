'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
var createEvent = require('./createEvent.js');

function createFocusEvent(element, type, eventInit) {
  if (eventInit === void 0) {
    eventInit = {};
  }

  if (typeof FocusEvent === "function") {
    return new FocusEvent(type, eventInit);
  }

  return createEvent.createEvent(element, type, eventInit);
}
/**
 * Creates and dispatches a blur event in a way that also works on IE 11.
 *
 * @example
 * import { fireBlurEvent } from "reakit-utils";
 *
 * fireBlurEvent(document.getElementById("id"));
 */


function fireBlurEvent(element, eventInit) {
  var event = createFocusEvent(element, "blur", eventInit);
  var defaultAllowed = element.dispatchEvent(event);

  var bubbleInit = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, eventInit), {}, {
    bubbles: true
  });

  element.dispatchEvent(createFocusEvent(element, "focusout", bubbleInit));
  return defaultAllowed;
}

exports.fireBlurEvent = fireBlurEvent;
