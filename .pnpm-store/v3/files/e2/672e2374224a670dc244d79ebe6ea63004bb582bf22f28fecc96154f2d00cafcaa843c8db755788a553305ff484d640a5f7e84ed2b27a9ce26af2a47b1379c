'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var contains = require('./contains.js');

/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */

function isPortalEvent(event) {
  return !contains.contains(event.currentTarget, event.target);
}

exports.isPortalEvent = isPortalEvent;
