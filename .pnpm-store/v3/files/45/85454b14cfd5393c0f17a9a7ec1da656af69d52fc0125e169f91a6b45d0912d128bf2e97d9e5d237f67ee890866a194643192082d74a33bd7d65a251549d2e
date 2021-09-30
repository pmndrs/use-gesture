"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.screen = void 0;

var _lzString = require("lz-string");

var queries = _interopRequireWildcard(require("./queries"));

var _getQueriesForElement = require("./get-queries-for-element");

var _prettyDom = require("./pretty-dom");

var _helpers = require("./helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function unindent(string) {
  // remove white spaces first, to save a few bytes.
  // testing-playground will reformat on load any ways.
  return string.replace(/[ \t]*[\n][ \t]*/g, '\n');
}

function encode(value) {
  return (0, _lzString.compressToEncodedURIComponent)(unindent(value));
}

function getPlaygroundUrl(markup) {
  return `https://testing-playground.com/#markup=${encode(markup)}`;
}

const debug = (element, maxLength, options) => Array.isArray(element) ? element.forEach(el => (0, _prettyDom.logDOM)(el, maxLength, options)) : (0, _prettyDom.logDOM)(element, maxLength, options);

const logTestingPlaygroundURL = (element = (0, _helpers.getDocument)().body) => {
  if (!element || !('innerHTML' in element)) {
    console.log(`The element you're providing isn't a valid DOM element.`);
    return;
  }

  if (!element.innerHTML) {
    console.log(`The provided element doesn't have any children.`);
    return;
  }

  console.log(`Open this URL in your browser\n\n${getPlaygroundUrl(element.innerHTML)}`);
};

const initialValue = {
  debug,
  logTestingPlaygroundURL
};
const screen = typeof document !== 'undefined' && document.body ? (0, _getQueriesForElement.getQueriesForElement)(document.body, queries, initialValue) : Object.keys(queries).reduce((helpers, key) => {
  helpers[key] = () => {
    throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
  };

  return helpers;
}, initialValue);
exports.screen = screen;