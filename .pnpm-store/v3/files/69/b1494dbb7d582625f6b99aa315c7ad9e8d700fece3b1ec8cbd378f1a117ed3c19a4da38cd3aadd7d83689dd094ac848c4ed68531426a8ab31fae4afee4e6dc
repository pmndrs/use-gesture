'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns an `onKeyDown` handler to be passed to a component.
 *
 * @param options
 */
function createOnKeyDown(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      keyMap = _ref.keyMap,
      onKey = _ref.onKey,
      stopPropagation = _ref.stopPropagation,
      onKeyDown = _ref.onKeyDown,
      _ref$shouldKeyDown = _ref.shouldKeyDown,
      shouldKeyDown = _ref$shouldKeyDown === void 0 ? function () {
    return true;
  } : _ref$shouldKeyDown,
      _ref$preventDefault = _ref.preventDefault,
      preventDefault = _ref$preventDefault === void 0 ? true : _ref$preventDefault;

  return function (event) {
    if (!keyMap) return;
    var finalKeyMap = typeof keyMap === "function" ? keyMap(event) : keyMap;
    var shouldPreventDefault = typeof preventDefault === "function" ? preventDefault(event) : preventDefault;
    var shouldStopPropagation = typeof stopPropagation === "function" ? stopPropagation(event) : stopPropagation;

    if (event.key in finalKeyMap) {
      var action = finalKeyMap[event.key];

      if (typeof action === "function" && shouldKeyDown(event)) {
        if (shouldPreventDefault) event.preventDefault();
        if (shouldStopPropagation) event.stopPropagation();
        if (onKey) onKey(event);
        action(event); // Prevent onKeyDown from being called twice for the same keys

        return;
      }
    }

    if (onKeyDown && "current" in onKeyDown) {
      var _onKeyDown$current;

      (_onKeyDown$current = onKeyDown.current) === null || _onKeyDown$current === void 0 ? void 0 : _onKeyDown$current.call(onKeyDown, event);
    } else {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
    }
  };
}

exports.createOnKeyDown = createOnKeyDown;
