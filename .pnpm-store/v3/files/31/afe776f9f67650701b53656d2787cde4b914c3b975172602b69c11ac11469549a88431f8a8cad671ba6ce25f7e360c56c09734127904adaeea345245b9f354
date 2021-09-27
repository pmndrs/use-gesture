'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
require('./getWindow.js');
var canUseDOM = require('./canUseDOM.js');
var getActiveElement = require('./getActiveElement.js');

var isIE11 = canUseDOM.canUseDOM && "msCrypto" in window;
/**
 * Cross-browser method that returns the next active element (the element that
 * is receiving focus) after a blur event is dispatched. It receives the blur
 * event object as the argument.
 *
 * @example
 * import { getNextActiveElementOnBlur } from "reakit-utils";
 *
 * const element = document.getElementById("id");
 * element.addEventListener("blur", (event) => {
 *   const nextActiveElement = getNextActiveElementOnBlur(event);
 * });
 */

function getNextActiveElementOnBlur(event) {
  // IE 11 doesn't support event.relatedTarget on blur.
  // document.activeElement points the the next active element.
  // On modern browsers, document.activeElement points to the current target.
  if (isIE11) {
    var activeElement = getActiveElement.getActiveElement(event.currentTarget);
    return activeElement;
  }

  return event.relatedTarget;
}

exports.getNextActiveElementOnBlur = getNextActiveElementOnBlur;
