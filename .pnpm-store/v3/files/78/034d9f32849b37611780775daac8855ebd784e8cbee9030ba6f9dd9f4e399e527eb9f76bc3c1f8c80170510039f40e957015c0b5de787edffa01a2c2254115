'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
var getActiveElement = require('./getActiveElement.js');
var contains = require('./contains.js');

/**
 * Checks if `element` has focus within. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 *
 * @example
 * import { hasFocusWithin } from "reakit-utils";
 *
 * hasFocusWithin(document.getElementById("id"));
 */

function hasFocusWithin(element) {
  var activeElement = getActiveElement.getActiveElement(element);
  if (!activeElement) return false;
  if (contains.contains(element, activeElement)) return true;
  var activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector("#" + activeDescendant);
}

exports.hasFocusWithin = hasFocusWithin;
