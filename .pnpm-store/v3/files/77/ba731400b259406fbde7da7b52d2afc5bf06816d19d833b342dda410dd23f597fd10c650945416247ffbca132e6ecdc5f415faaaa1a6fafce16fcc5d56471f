import './getDocument.js';
import './getWindow.js';
import { canUseDOM } from './canUseDOM.js';
import { getActiveElement } from './getActiveElement.js';

var isIE11 = canUseDOM && "msCrypto" in window;
/**
 * Cross-browser method that returns the next active element (the element that
 * is receiving focus) after a blur event is dispatched. It receives the blur
 * event object as the argument.
 *
 * @example
 * import { getNextActiveElementOnBlur } from "reakit-utils";
 *
 * const element = document.getElementById("id");
 * element.addEventListener("blur", (event) => {
 *   const nextActiveElement = getNextActiveElementOnBlur(event);
 * });
 */

function getNextActiveElementOnBlur(event) {
  // IE 11 doesn't support event.relatedTarget on blur.
  // document.activeElement points the the next active element.
  // On modern browsers, document.activeElement points to the current target.
  if (isIE11) {
    var activeElement = getActiveElement(event.currentTarget);
    return activeElement;
  }

  return event.relatedTarget;
}

export { getNextActiveElementOnBlur };
