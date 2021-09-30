import './getDocument.js';
import './getWindow.js';
import { canUseDOM } from './canUseDOM.js';

/**
 * Checks if a given string exists in the user agent string.
 */

function isUA(string) {
  if (!canUseDOM) return false;
  return window.navigator.userAgent.indexOf(string) !== -1;
}

export { isUA };
