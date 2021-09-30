'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var canUseDom_dist_reachUtilsCanUseDom = require('../../can-use-dom/dist/reach-utils-can-use-dom.cjs.dev.js');

/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */

function getOwnerDocument(element) {
  return canUseDom_dist_reachUtilsCanUseDom.canUseDOM() ? element ? element.ownerDocument : document : null;
}
/**
 * TODO: Remove in 1.0
 */

function getOwnerWindow(element) {
  var ownerDocument = getOwnerDocument(element);
  return ownerDocument ? ownerDocument.defaultView || window : null;
}

exports.getOwnerDocument = getOwnerDocument;
exports.getOwnerWindow = getOwnerWindow;
