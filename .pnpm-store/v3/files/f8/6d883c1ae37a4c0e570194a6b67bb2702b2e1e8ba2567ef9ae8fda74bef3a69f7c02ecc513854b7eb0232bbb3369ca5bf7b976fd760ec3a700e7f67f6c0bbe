import { getDocument } from './getDocument.js';

/**
 * Returns `element.ownerDocument.activeElement`.
 */

function getActiveElement(element) {
  var _getDocument = getDocument(element),
      activeElement = _getDocument.activeElement;

  if (!(activeElement !== null && activeElement !== void 0 && activeElement.nodeName)) {
    // In IE11, activeElement might be an empty object if we're interacting
    // with elements inside of an iframe.
    return null;
  }

  return activeElement;
}

export { getActiveElement };
