import { getOwnerWindow } from '../../owner-document/dist/reach-utils-owner-document.esm.js';
import '../../can-use-dom/dist/reach-utils-can-use-dom.esm.js';

/**
 * Get the scoll position of the global window object relative to a given node.
 *
 * @param element
 */

function getScrollPosition(element) {
  var ownerWindow = getOwnerWindow(element);

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

export { getScrollPosition };
