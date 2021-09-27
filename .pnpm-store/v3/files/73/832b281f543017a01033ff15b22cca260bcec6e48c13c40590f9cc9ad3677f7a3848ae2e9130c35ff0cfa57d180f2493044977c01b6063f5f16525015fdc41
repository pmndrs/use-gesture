'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var matches = require('./matches.js');

/**
 * Ponyfill for `Element.prototype.closest`
 *
 * @example
 * import { closest } from "reakit-utils";
 *
 * closest(document.getElementById("id"), "div");
 * // same as
 * document.getElementById("id").closest("div");
 */
function closest(element, selectors) {
  if ("closest" in element) return element.closest(selectors);

  do {
    if (matches.matches(element, selectors)) return element;
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);

  return null;
}

exports.closest = closest;
