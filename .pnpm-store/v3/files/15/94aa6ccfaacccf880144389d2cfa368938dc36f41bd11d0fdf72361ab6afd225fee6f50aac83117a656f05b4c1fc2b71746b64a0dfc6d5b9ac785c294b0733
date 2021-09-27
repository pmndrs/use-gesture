'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ownerDocument_dist_reachUtilsOwnerDocument = require('../../owner-document/dist/reach-utils-owner-document.cjs.dev.js');
require('../../can-use-dom/dist/reach-utils-can-use-dom.cjs.dev.js');

/**
 * Get computed style properties of a DOM element.
 *
 * @param element
 * @param styleProp
 */

function getComputedStyles(element) {
  var ownerWindow = ownerDocument_dist_reachUtilsOwnerDocument.getOwnerWindow(element);

  if (ownerWindow) {
    return ownerWindow.getComputedStyle(element, null);
  }

  return null;
}
/**
 * Get a computed style value by property.
 *
 * @param element
 * @param styleProp
 */

function getComputedStyle(element, styleProp) {
  var _getComputedStyles;

  return ((_getComputedStyles = getComputedStyles(element)) == null ? void 0 : _getComputedStyles.getPropertyValue(styleProp)) || null;
}

exports.getComputedStyle = getComputedStyle;
exports.getComputedStyles = getComputedStyles;
