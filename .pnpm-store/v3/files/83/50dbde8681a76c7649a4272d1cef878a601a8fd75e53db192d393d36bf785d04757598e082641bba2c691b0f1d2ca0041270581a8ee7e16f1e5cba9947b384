import './getDocument.js';
import { a as _objectSpread2 } from './_rollupPluginBabelHelpers-1f0bf8c2.js';
import { createEvent } from './createEvent.js';

function createFocusEvent(element, type, eventInit) {
  if (eventInit === void 0) {
    eventInit = {};
  }

  if (typeof FocusEvent === "function") {
    return new FocusEvent(type, eventInit);
  }

  return createEvent(element, type, eventInit);
}
/**
 * Creates and dispatches a blur event in a way that also works on IE 11.
 *
 * @example
 * import { fireBlurEvent } from "reakit-utils";
 *
 * fireBlurEvent(document.getElementById("id"));
 */


function fireBlurEvent(element, eventInit) {
  var event = createFocusEvent(element, "blur", eventInit);
  var defaultAllowed = element.dispatchEvent(event);

  var bubbleInit = _objectSpread2(_objectSpread2({}, eventInit), {}, {
    bubbles: true
  });

  element.dispatchEvent(createFocusEvent(element, "focusout", bubbleInit));
  return defaultAllowed;
}

export { fireBlurEvent };
