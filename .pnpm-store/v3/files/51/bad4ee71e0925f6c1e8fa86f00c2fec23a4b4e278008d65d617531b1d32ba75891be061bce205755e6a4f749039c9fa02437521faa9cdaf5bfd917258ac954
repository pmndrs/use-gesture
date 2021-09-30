import { getActiveElement } from "./getActiveElement";
import { contains } from "./contains";

/**
 * Checks if `element` has focus within. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 *
 * @example
 * import { hasFocusWithin } from "reakit-utils";
 *
 * hasFocusWithin(document.getElementById("id"));
 */
export function hasFocusWithin(element: Element): boolean {
  const activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (contains(element, activeElement)) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector(`#${activeDescendant}`);
}
