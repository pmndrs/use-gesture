'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ownerDocument_dist_reachUtilsOwnerDocument = require('../../owner-document/dist/reach-utils-owner-document.cjs.prod.js');
require('../../can-use-dom/dist/reach-utils-can-use-dom.cjs.prod.js');

/**
 * Get the size of the working document minus the scrollbar offset.
 *
 * @param element
 */

function getDocumentDimensions(element) {
  var _ownerDocument$docume, _ownerDocument$docume2;

  var ownerDocument = ownerDocument_dist_reachUtilsOwnerDocument.getOwnerDocument(element);
  var ownerWindow = ownerDocument.defaultView || window;

  if (!ownerDocument) {
    return {
      width: 0,
      height: 0
    };
  }

  return {
    width: (_ownerDocument$docume = ownerDocument.documentElement.clientWidth) != null ? _ownerDocument$docume : ownerWindow.innerWidth,
    height: (_ownerDocument$docume2 = ownerDocument.documentElement.clientHeight) != null ? _ownerDocument$docume2 : ownerWindow.innerHeight
  };
}

exports.getDocumentDimensions = getDocumentDimensions;
