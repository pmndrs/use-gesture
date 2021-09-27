'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./getDocument.js');
var getWindow = require('./getWindow.js');

function checkIsBrowser() {
  var _window = getWindow.getWindow();

  return Boolean(typeof _window !== "undefined" && _window.document && _window.document.createElement);
}
/**
 * It's `true` if it is running in a browser environment or `false` if it is not (SSR).
 *
 * @example
 * import { canUseDOM } from "reakit-utils";
 *
 * const title = canUseDOM ? document.title : "";
 */


var canUseDOM = checkIsBrowser();

exports.canUseDOM = canUseDOM;
