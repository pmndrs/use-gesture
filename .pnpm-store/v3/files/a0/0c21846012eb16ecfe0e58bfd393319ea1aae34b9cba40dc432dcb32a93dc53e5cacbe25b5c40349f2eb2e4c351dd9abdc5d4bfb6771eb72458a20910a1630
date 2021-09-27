'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getDocument = require('./getDocument.js');

// Thanks to Fluent UI for doing the [research on IE11 memery leak](https://github.com/microsoft/fluentui/pull/9010#issuecomment-490768427)

var _window; // Note: Accessing "window" in IE11 is somewhat expensive, and calling "typeof window"
// hits a memory leak, whereas aliasing it and calling "typeof _window" does not.
// Caching the window value at the file scope lets us minimize the impact.


try {
  _window = window;
} catch (e) {
  /* no-op */
}
/**
 * Returns `element.ownerDocument.defaultView || window`.
 */


function getWindow(element) {
  if (!element) {
    return _window;
  }

  return getDocument.getDocument(element).defaultView || _window;
}

exports.getWindow = getWindow;
