"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyDOM = prettyDOM;
exports.prettyFormat = exports.logDOM = void 0;

var prettyFormat = _interopRequireWildcard(require("pretty-format"));

exports.prettyFormat = prettyFormat;

var _DOMElementFilter = _interopRequireDefault(require("./DOMElementFilter"));

var _getUserCodeFrame = require("./get-user-code-frame");

var _helpers = require("./helpers");

var _shared = require("./shared");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const inNode = () => typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;

const {
  DOMCollection
} = prettyFormat.plugins; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants

const ELEMENT_NODE = 1;
const COMMENT_NODE = 8; // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50

function filterCommentsAndDefaultIgnoreTagsTags(value) {
  return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(_shared.DEFAULT_IGNORE_TAGS));
}

function prettyDOM(dom, maxLength, options = {}) {
  if (!dom) {
    dom = (0, _helpers.getDocument)().body;
  }

  if (typeof maxLength !== 'number') {
    maxLength = typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT || 7000;
  }

  if (maxLength === 0) {
    return '';
  }

  if (dom.documentElement) {
    dom = dom.documentElement;
  }

  let domTypeName = typeof dom;

  if (domTypeName === 'object') {
    domTypeName = dom.constructor.name;
  } else {
    // To don't fall with `in` operator
    dom = {};
  }

  if (!('outerHTML' in dom)) {
    throw new TypeError(`Expected an element or document but got ${domTypeName}`);
  }

  const {
    filterNode = filterCommentsAndDefaultIgnoreTagsTags,
    ...prettyFormatOptions
  } = options;
  const debugContent = prettyFormat.format(dom, {
    plugins: [(0, _DOMElementFilter.default)(filterNode), DOMCollection],
    printFunctionName: false,
    highlight: inNode(),
    ...prettyFormatOptions
  });
  return maxLength !== undefined && dom.outerHTML.length > maxLength ? `${debugContent.slice(0, maxLength)}...` : debugContent;
}

const logDOM = (...args) => {
  const userCodeFrame = (0, _getUserCodeFrame.getUserCodeFrame)();

  if (userCodeFrame) {
    console.log(`${prettyDOM(...args)}\n\n${userCodeFrame}`);
  } else {
    console.log(prettyDOM(...args));
  }
};

exports.logDOM = logDOM;