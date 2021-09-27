'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
require('./getWindow.js');
var canUseDOM = require('./canUseDOM.js');

/**
 * Checks if a given string exists in the user agent string.
 */

function isUA(string) {
  if (!canUseDOM.canUseDOM) return false;
  return window.navigator.userAgent.indexOf(string) !== -1;
}

exports.isUA = isUA;
