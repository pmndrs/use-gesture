"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueriesForElement = getQueriesForElement;

var defaultQueries = _interopRequireWildcard(require("./queries"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @typedef {{[key: string]: Function}} FuncMap
 */

/**
 * @param {HTMLElement} element container
 * @param {FuncMap} queries object of functions
 * @param {Object} initialValue for reducer
 * @returns {FuncMap} returns object of functions bound to container
 */
function getQueriesForElement(element, queries = defaultQueries, initialValue = {}) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, element);
    return helpers;
  }, initialValue);
}