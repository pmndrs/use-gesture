import { getDocument } from "./getDocument";

/**
 * Returns `element.ownerDocument.activeElement`.
 */
export function getActiveElement(element?: Element | Document | null) {
  const { activeElement } = getDocument(element);
  if (!activeElement?.nodeName) {
    // In IE11, activeElement might be an empty object if we're interacting
    // with elements inside of an iframe.
    return null;
  }
  return activeElement;
}
