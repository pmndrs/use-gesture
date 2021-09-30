"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByAltText = exports.findAllByAltText = exports.getAllByAltText = exports.getByAltText = exports.queryAllByAltText = exports.queryByAltText = void 0;

var _queryHelpers = require("../query-helpers");

var _helpers = require("../helpers");

var _allUtils = require("./all-utils");

const queryAllByAltText = (container, alt, {
  exact = true,
  collapseWhitespace,
  trim,
  normalizer
} = {}) => {
  (0, _helpers.checkContainerType)(container);
  const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll('img,input,area')).filter(node => matcher(node.getAttribute('alt'), node, alt, matchNormalizer));
};

const getMultipleError = (c, alt) => `Found multiple elements with the alt text: ${alt}`;

const getMissingError = (c, alt) => `Unable to find an element with the alt text: ${alt}`;

const queryAllByAltTextWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByAltText, queryAllByAltText.name, 'queryAll');
exports.queryAllByAltText = queryAllByAltTextWithSuggestions;
const [queryByAltText, getAllByAltText, getByAltText, findAllByAltText, findByAltText] = (0, _allUtils.buildQueries)(queryAllByAltText, getMultipleError, getMissingError);
exports.findByAltText = findByAltText;
exports.findAllByAltText = findAllByAltText;
exports.getByAltText = getByAltText;
exports.getAllByAltText = getAllByAltText;
exports.queryByAltText = queryByAltText;