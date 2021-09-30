'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
var matches = require('./matches.js');
var closest = require('./closest.js');
var getActiveElement = require('./getActiveElement.js');

/** @module tabbable */
var selector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), " + "textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], " + "iframe, object, embed, area[href], audio[controls], video[controls], " + "[contenteditable]:not([contenteditable='false'])";

function isVisible(element) {
  var htmlElement = element;
  return htmlElement.offsetWidth > 0 || htmlElement.offsetHeight > 0 || element.getClientRects().length > 0;
}

function hasNegativeTabIndex(element) {
  var tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
/**
 * Checks whether `element` is focusable or not.
 *
 * @memberof tabbable
 *
 * @example
 * import { isFocusable } from "reakit-utils";
 *
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 */


function isFocusable(element) {
  return matches.matches(element, selector) && isVisible(element);
}
/**
 * Checks whether `element` is tabbable or not.
 *
 * @memberof tabbable
 *
 * @example
 * import { isTabbable } from "reakit-utils";
 *
 * isTabbable(document.querySelector("input")); // true
 * isTabbable(document.querySelector("input[tabindex='-1']")); // false
 * isTabbable(document.querySelector("input[hidden]")); // false
 * isTabbable(document.querySelector("input:disabled")); // false
 */

function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
/**
 * Returns all the focusable elements in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element[]}
 */

function getAllFocusableIn(container) {
  var allFocusable = Array.from(container.querySelectorAll(selector));
  allFocusable.unshift(container);
  return allFocusable.filter(isFocusable);
}
/**
 * Returns the first focusable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element|null}
 */

function getFirstFocusableIn(container) {
  var _getAllFocusableIn = getAllFocusableIn(container),
      first = _getAllFocusableIn[0];

  return first || null;
}
/**
 * Returns all the tabbable elements in `container`, including the container
 * itself.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return focusable elements if there are no tabbable ones.
 *
 * @returns {Element[]}
 */

function getAllTabbableIn(container, fallbackToFocusable) {
  var allFocusable = Array.from(container.querySelectorAll(selector));
  var allTabbable = allFocusable.filter(isTabbable);

  if (isTabbable(container)) {
    allTabbable.unshift(container);
  }

  if (!allTabbable.length && fallbackToFocusable) {
    return allFocusable;
  }

  return allTabbable;
}
/**
 * Returns the first tabbable element in `container`, including the container
 * itself if it's tabbable.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the first focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */

function getFirstTabbableIn(container, fallbackToFocusable) {
  var _getAllTabbableIn = getAllTabbableIn(container, fallbackToFocusable),
      first = _getAllTabbableIn[0];

  return first || null;
}
/**
 * Returns the last tabbable element in `container`, including the container
 * itself if it's tabbable.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the last focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */

function getLastTabbableIn(container, fallbackToFocusable) {
  var allTabbable = getAllTabbableIn(container, fallbackToFocusable);
  return allTabbable[allTabbable.length - 1] || null;
}
/**
 * Returns the next tabbable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the next focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */

function getNextTabbableIn(container, fallbackToFocusable) {
  var activeElement = getActiveElement.getActiveElement(container);
  var allFocusable = getAllFocusableIn(container);
  var index = allFocusable.indexOf(activeElement);
  var slice = allFocusable.slice(index + 1);
  return slice.find(isTabbable) || allFocusable.find(isTabbable) || (fallbackToFocusable ? slice[0] : null);
}
/**
 * Returns the previous tabbable element in `container`.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 * @param fallbackToFocusable If `true`, it'll return the previous focusable element if there are no tabbable ones.
 *
 * @returns {Element|null}
 */

function getPreviousTabbableIn(container, fallbackToFocusable) {
  var activeElement = getActiveElement.getActiveElement(container);
  var allFocusable = getAllFocusableIn(container).reverse();
  var index = allFocusable.indexOf(activeElement);
  var slice = allFocusable.slice(index + 1);
  return slice.find(isTabbable) || allFocusable.find(isTabbable) || (fallbackToFocusable ? slice[0] : null);
}
/**
 * Returns the closest focusable element.
 *
 * @memberof tabbable
 *
 * @param {Element} container
 *
 * @returns {Element|null}
 */

function getClosestFocusable(element) {
  while (element && !isFocusable(element)) {
    element = closest.closest(element, selector);
  }

  return element;
}

exports.getAllFocusableIn = getAllFocusableIn;
exports.getAllTabbableIn = getAllTabbableIn;
exports.getClosestFocusable = getClosestFocusable;
exports.getFirstFocusableIn = getFirstFocusableIn;
exports.getFirstTabbableIn = getFirstTabbableIn;
exports.getLastTabbableIn = getLastTabbableIn;
exports.getNextTabbableIn = getNextTabbableIn;
exports.getPreviousTabbableIn = getPreviousTabbableIn;
exports.isFocusable = isFocusable;
exports.isTabbable = isTabbable;
