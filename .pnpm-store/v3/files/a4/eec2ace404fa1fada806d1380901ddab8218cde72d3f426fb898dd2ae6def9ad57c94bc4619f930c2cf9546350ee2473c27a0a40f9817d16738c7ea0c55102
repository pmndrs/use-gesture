'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
require('./getActiveElement.js');
var hasFocus = require('./hasFocus.js');

/**
 * Ensures `element` will receive focus if it's not already.
 *
 * @example
 * import { ensureFocus } from "reakit-utils";
 *
 * ensureFocus(document.activeElement); // does nothing
 *
 * const element = document.querySelector("input");
 *
 * ensureFocus(element); // focuses element
 * ensureFocus(element, { preventScroll: true }); // focuses element preventing scroll jump
 *
 * function isActive(el) {
 *   return el.dataset.active === "true";
 * }
 *
 * ensureFocus(document.querySelector("[data-active='true']"), { isActive }); // does nothing
 *
 * @returns {number} `requestAnimationFrame` call ID so it can be passed to `cancelAnimationFrame` if needed.
 */
function ensureFocus(element, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      preventScroll = _ref.preventScroll,
      _ref$isActive = _ref.isActive,
      isActive = _ref$isActive === void 0 ? hasFocus.hasFocus : _ref$isActive;

  if (isActive(element)) return -1;
  element.focus({
    preventScroll: preventScroll
  });
  if (isActive(element)) return -1;
  return requestAnimationFrame(function () {
    element.focus({
      preventScroll: preventScroll
    });
  });
}

exports.ensureFocus = ensureFocus;
