"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyDOM = prettyDOM;
Object.defineProperty(exports, "prettyFormat", {
  enumerable: true,
  get: function () {
    return _prettyFormat.default;
  }
});
exports.logDOM = void 0;

var _prettyFormat = _interopRequireDefault(require("pretty-format"));

var _getUserCodeFrame = require("./get-user-code-frame");

var _helpers = require("./helpers");

function inCypress(dom) {
  const window = dom.ownerDocument && dom.ownerDocument.defaultView || undefined;
  return typeof global !== 'undefined' && global.Cypress || typeof window !== 'undefined' && window.Cypress;
}

const inNode = () => typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;

const getMaxLength = dom => inCypress(dom) ? 0 : typeof process !== 'undefined' && process.env.DEBUG_PRINT_LIMIT || 7000;

const {
  DOMElement,
  DOMCollection
} = _prettyFormat.default.plugins;

function prettyDOM(dom, maxLength, options) {
  if (!dom) {
    dom = (0, _helpers.getDocument)().body;
  }

  if (typeof maxLength !== 'number') {
    maxLength = getMaxLength(dom);
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

  const debugContent = (0, _prettyFormat.default)(dom, {
    plugins: [DOMElement, DOMCollection],
    printFunctionName: false,
    highlight: inNode(),
    ...options
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