'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ownerDocument_dist_reachUtilsOwnerDocument = require('../../owner-document/dist/reach-utils-owner-document.cjs.prod.js');
require('../../can-use-dom/dist/reach-utils-can-use-dom.cjs.prod.js');

/**
 * Get the scoll position of the global window object relative to a given node.
 *
 * @param element
 */

function getScrollPosition(element) {
  var ownerWindow = ownerDocument_dist_reachUtilsOwnerDocument.getOwnerWindow(element);

  if (!ownerWindow) {
    return {
      scrollX: 0,
      scrollY: 0
    };
  }

  return {
    scrollX: ownerWindow.scrollX,
    scrollY: ownerWindow.scrollY
  };
}

exports.getScrollPosition = getScrollPosition;
