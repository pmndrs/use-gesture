import './getDocument.js';
import { getActiveElement } from './getActiveElement.js';
import { contains } from './contains.js';

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
  var activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (contains(element, activeElement)) return true;
  var activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector("#" + activeDescendant);
}

export { hasFocusWithin };
