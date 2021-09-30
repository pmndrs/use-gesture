'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
var getActiveElement = require('./getActiveElement.js');

/**
 * Checks if `element` has focus. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 *
 * @example
 * import { hasFocus } from "reakit-utils";
 *
 * hasFocus(document.getElementById("id"));
 */

function hasFocus(element) {
  var activeElement = getActiveElement.getActiveElement(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  var activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}

exports.hasFocus = hasFocus;
