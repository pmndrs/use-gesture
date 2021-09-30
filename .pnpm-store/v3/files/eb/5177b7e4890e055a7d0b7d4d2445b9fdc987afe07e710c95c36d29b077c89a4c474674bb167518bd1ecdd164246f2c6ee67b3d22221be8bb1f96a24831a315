'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Ponyfill for `Element.prototype.matches`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */
function matches(element, selectors) {
  if ("matches" in element) {
    return element.matches(selectors);
  }

  if ("msMatchesSelector" in element) {
    return element.msMatchesSelector(selectors);
  }

  return element.webkitMatchesSelector(selectors);
}

exports.matches = matches;
