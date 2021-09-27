'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Detects right clicks
 *
 * @param nativeEvent
 */
function isRightClick(nativeEvent) {
  return "which" in nativeEvent ? nativeEvent.which === 3 : "button" in nativeEvent ? nativeEvent.button === 2 : false;
}

exports.isRightClick = isRightClick;
