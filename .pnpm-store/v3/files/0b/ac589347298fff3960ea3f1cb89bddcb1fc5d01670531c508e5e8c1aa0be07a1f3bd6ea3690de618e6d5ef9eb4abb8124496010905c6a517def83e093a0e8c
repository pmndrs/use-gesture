import { getOwnerWindow } from '../../owner-document/dist/reach-utils-owner-document.esm.js';
import '../../can-use-dom/dist/reach-utils-can-use-dom.esm.js';

/**
 * Get computed style properties of a DOM element.
 *
 * @param element
 * @param styleProp
 */

function getComputedStyles(element) {
  var ownerWindow = getOwnerWindow(element);

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

export { getComputedStyle, getComputedStyles };
