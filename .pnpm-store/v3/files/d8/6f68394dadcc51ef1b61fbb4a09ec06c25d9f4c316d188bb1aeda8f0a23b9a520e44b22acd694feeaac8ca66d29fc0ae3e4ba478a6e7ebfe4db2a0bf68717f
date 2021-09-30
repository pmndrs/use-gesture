'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8f9a8751.js');
require('./isObject.js');
var isPlainObject = require('./isPlainObject.js');

/**
 * This higher order functions take `propsAreEqual` function and
 * returns a new function which normalizes the props.
 *
 * Normalizing in our case is making sure the `propsAreEqual` works with
 * both version 1 (object spreading) and version 2 (state object) state passing.
 *
 * To achieve this, the returned function in case of a state object
 * will spread the state object in both `prev` and `next props.
 *
 * Other case it just returns the function as is which makes sure
 * that we are still backward compatible
 */
function normalizePropsAreEqual(propsAreEqual) {
  if (propsAreEqual.name === "normalizePropsAreEqualInner") {
    return propsAreEqual;
  }

  return function normalizePropsAreEqualInner(prev, next) {
    if (!isPlainObject.isPlainObject(prev.state) || !isPlainObject.isPlainObject(next.state)) {
      return propsAreEqual(prev, next);
    }

    return propsAreEqual(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, prev.state), prev), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, next.state), next));
  };
}

exports.normalizePropsAreEqual = normalizePropsAreEqual;
