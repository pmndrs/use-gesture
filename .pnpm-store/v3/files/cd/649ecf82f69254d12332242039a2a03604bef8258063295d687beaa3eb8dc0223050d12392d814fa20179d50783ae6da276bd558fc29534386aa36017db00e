import './getDocument.js';
import { getActiveElement } from './getActiveElement.js';

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
  var activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  var activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}

export { hasFocus };
