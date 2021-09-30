'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose');
var prettyFormat = require('pretty-format');
var domAccessibilityApi = require('dom-accessibility-api');
var ariaQuery = require('aria-query');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var lzString = require('lz-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutPropertiesLoose__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutPropertiesLoose);
var prettyFormat__namespace = /*#__PURE__*/_interopNamespace(prettyFormat);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

/**
 * Source: https://github.com/facebook/jest/blob/e7bb6a1e26ffab90611b2593912df15b69315611/packages/pretty-format/src/plugins/DOMElement.ts
 */

/* eslint-disable -- trying to stay as close to the original as possible */

/* istanbul ignore file */
function escapeHTML(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
} // Return empty string if keys is empty.


var printProps = function printProps(keys, props, config, indentation, depth, refs, printer) {
  var indentationNext = indentation + config.indent;
  var colors = config.colors;
  return keys.map(function (key) {
    var value = props[key];
    var printed = printer(value, config, indentationNext, depth, refs);

    if (typeof value !== 'string') {
      if (printed.indexOf('\n') !== -1) {
        printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
      }

      printed = '{' + printed + '}';
    }

    return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
  }).join('');
}; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants


var NodeTypeTextNode = 3; // Return empty string if children is empty.

var printChildren = function printChildren(children, config, indentation, depth, refs, printer) {
  return children.map(function (child) {
    var printedChild = typeof child === 'string' ? printText(child, config) : printer(child, config, indentation, depth, refs);

    if (printedChild === '' && typeof child === 'object' && child !== null && child.nodeType !== NodeTypeTextNode) {
      // A plugin serialized this Node to '' meaning we should ignore it.
      return '';
    }

    return config.spacingOuter + indentation + printedChild;
  }).join('');
};

var printText = function printText(text, config) {
  var contentColor = config.colors.content;
  return contentColor.open + escapeHTML(text) + contentColor.close;
};

var printComment = function printComment(comment, config) {
  var commentColor = config.colors.comment;
  return commentColor.open + '<!--' + escapeHTML(comment) + '-->' + commentColor.close;
}; // Separate the functions to format props, children, and element,
// so a plugin could override a particular function, if needed.
// Too bad, so sad: the traditional (but unnecessary) space
// in a self-closing tagColor requires a second test of printedProps.


var printElement = function printElement(type, printedProps, printedChildren, config, indentation) {
  var tagColor = config.colors.tag;
  return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
};

var printElementAsLeaf = function printElementAsLeaf(type, config) {
  var tagColor = config.colors.tag;
  return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
};

var ELEMENT_NODE$1 = 1;
var TEXT_NODE$1 = 3;
var COMMENT_NODE$1 = 8;
var FRAGMENT_NODE = 11;
var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

var testNode = function testNode(val) {
  var constructorName = val.constructor.name;
  var nodeType = val.nodeType,
      tagName = val.tagName;
  var isCustomElement = typeof tagName === 'string' && tagName.includes('-') || typeof val.hasAttribute === 'function' && val.hasAttribute('is');
  return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === 'Text' || nodeType === COMMENT_NODE$1 && constructorName === 'Comment' || nodeType === FRAGMENT_NODE && constructorName === 'DocumentFragment';
};

function nodeIsText(node) {
  return node.nodeType === TEXT_NODE$1;
}

function nodeIsComment(node) {
  return node.nodeType === COMMENT_NODE$1;
}

function nodeIsFragment(node) {
  return node.nodeType === FRAGMENT_NODE;
}

function createDOMElementFilter(filterNode) {
  return {
    test: function test(val) {
      var _val$constructor2;

      return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
    },
    serialize: function serialize(node, config, indentation, depth, refs, printer) {
      if (nodeIsText(node)) {
        return printText(node.data, config);
      }

      if (nodeIsComment(node)) {
        return printComment(node.data, config);
      }

      var type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();

      if (++depth > config.maxDepth) {
        return printElementAsLeaf(type, config);
      }

      return printElement(type, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map(function (attr) {
        return attr.name;
      }).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce(function (props, attribute) {
        props[attribute.name] = attribute.value;
        return props;
      }, {}), config, indentation + config.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config, indentation + config.indent, depth, refs, printer), config, indentation);
    }
  };
}

// We try to load node dependencies
var chalk = null;
var readFileSync = null;
var codeFrameColumns = null;

try {
  var nodeRequire = module && module.require;
  readFileSync = nodeRequire.call(module, 'fs').readFileSync;
  codeFrameColumns = nodeRequire.call(module, '@babel/code-frame').codeFrameColumns;
  chalk = nodeRequire.call(module, 'chalk');
} catch (_unused) {// We're in a browser environment
} // frame has the form "at myMethod (location/to/my/file.js:10:2)"


function getCodeFrame(frame) {
  var locationStart = frame.indexOf('(') + 1;
  var locationEnd = frame.indexOf(')');
  var frameLocation = frame.slice(locationStart, locationEnd);
  var frameLocationElements = frameLocation.split(':');
  var _ref = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)],
      filename = _ref[0],
      line = _ref[1],
      column = _ref[2];
  var rawFileContents = '';

  try {
    rawFileContents = readFileSync(filename, 'utf-8');
  } catch (_unused2) {
    return '';
  }

  var codeFrame = codeFrameColumns(rawFileContents, {
    start: {
      line: line,
      column: column
    }
  }, {
    highlightCode: true,
    linesBelow: 0
  });
  return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
}

function getUserCodeFrame() {
  // If we couldn't load dependencies, we can't generate the user trace

  /* istanbul ignore next */
  if (!readFileSync || !codeFrameColumns) {
    return '';
  }

  var err = new Error();
  var firstClientCodeFrame = err.stack.split('\n').slice(1) // Remove first line which has the form "Error: TypeError"
  .find(function (frame) {
    return !frame.includes('node_modules/');
  }); // Ignore frames from 3rd party libraries

  return getCodeFrame(firstClientCodeFrame);
}

// Constant node.nodeType for text nodes, see:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants
var TEXT_NODE = 3;

function jestFakeTimersAreEnabled() {
  /* istanbul ignore else */
  if (typeof jest !== 'undefined' && jest !== null) {
    return (// legacy timers
      setTimeout._isMockFunction === true || // modern timers
      Object.prototype.hasOwnProperty.call(setTimeout, 'clock')
    );
  } // istanbul ignore next


  return false;
}

function getDocument() {
  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    throw new Error('Could not find default container');
  }

  return window.document;
}

function getWindowFromNode(node) {
  if (node.defaultView) {
    // node is document
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    // node is a DOM node
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    // node is window
    return node.window;
  } else if (node.then instanceof Function) {
    throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
  } else if (Array.isArray(node)) {
    throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
  } else if (typeof node.debug === 'function' && typeof node.logTestingPlaygroundURL === 'function') {
    throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
  } else {
    // The user passed something unusual to a calling function
    throw new Error("Unable to find the \"window\" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new");
  }
}

function checkContainerType(container) {
  if (!container || !(typeof container.querySelector === 'function') || !(typeof container.querySelectorAll === 'function')) {
    throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
  }

  function getTypeName(object) {
    if (typeof object === 'object') {
      return object === null ? 'null' : object.constructor.name;
    }

    return typeof object;
  }
}

var DEFAULT_IGNORE_TAGS = 'script, style';

var _excluded$1 = ["filterNode"];

var inNode = function inNode() {
  return typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;
};

var DOMCollection = prettyFormat__namespace.plugins.DOMCollection; // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants

var ELEMENT_NODE = 1;
var COMMENT_NODE = 8; // https://github.com/facebook/jest/blob/615084195ae1ae61ddd56162c62bbdda17587569/packages/pretty-format/src/plugins/DOMElement.ts#L50

function filterCommentsAndDefaultIgnoreTagsTags(value) {
  return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(DEFAULT_IGNORE_TAGS));
}

function prettyDOM(dom, maxLength, options) {
  if (options === void 0) {
    options = {};
  }

  if (!dom) {
    dom = getDocument().body;
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

  var domTypeName = typeof dom;

  if (domTypeName === 'object') {
    domTypeName = dom.constructor.name;
  } else {
    // To don't fall with `in` operator
    dom = {};
  }

  if (!('outerHTML' in dom)) {
    throw new TypeError("Expected an element or document but got " + domTypeName);
  }

  var _options = options,
      _options$filterNode = _options.filterNode,
      filterNode = _options$filterNode === void 0 ? filterCommentsAndDefaultIgnoreTagsTags : _options$filterNode,
      prettyFormatOptions = _objectWithoutPropertiesLoose__default['default'](_options, _excluded$1);

  var debugContent = prettyFormat__namespace.format(dom, _extends__default['default']({
    plugins: [createDOMElementFilter(filterNode), DOMCollection],
    printFunctionName: false,
    highlight: inNode()
  }, prettyFormatOptions));
  return maxLength !== undefined && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
}

var logDOM = function logDOM() {
  var userCodeFrame = getUserCodeFrame();

  if (userCodeFrame) {
    console.log(prettyDOM.apply(void 0, arguments) + "\n\n" + userCodeFrame);
  } else {
    console.log(prettyDOM.apply(void 0, arguments));
  }
};

// It would be cleaner for this to live inside './queries', but
// other parts of the code assume that all exports from
// './queries' are query functions.
var config = {
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 1000,
  // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
  // forcing react-testing-library to wrap all async functions would've been
  // a total nightmare (consider wrapping every findBy* query and then also
  // updating `within` so those would be wrapped too. Total nightmare).
  // so we have this config option that's really only intended for
  // react-testing-library to use. For that reason, this feature will remain
  // undocumented.
  asyncWrapper: function asyncWrapper(cb) {
    return cb();
  },
  unstable_advanceTimersWrapper: function unstable_advanceTimersWrapper(cb) {
    return cb();
  },
  eventWrapper: function eventWrapper(cb) {
    return cb();
  },
  // default value for the `hidden` option in `ByRole` queries
  defaultHidden: false,
  // showOriginalStackTrace flag to show the full error stack traces for async errors
  showOriginalStackTrace: false,
  // throw errors w/ suggestions for better queries. Opt in so off by default.
  throwSuggestions: false,
  // called when getBy* queries fail. (message, container) => Error
  getElementError: function getElementError(message, container) {
    var prettifiedDOM = prettyDOM(container);
    var error = new Error([message, "Ignored nodes: comments, <script />, <style />\n" + prettifiedDOM].filter(Boolean).join('\n\n'));
    error.name = 'TestingLibraryElementError';
    return error;
  },
  _disableExpensiveErrorDiagnostics: false,
  computedStyleSupportsPseudoElements: false
};
function runWithExpensiveErrorDiagnosticsDisabled(callback) {
  try {
    config._disableExpensiveErrorDiagnostics = true;
    return callback();
  } finally {
    config._disableExpensiveErrorDiagnostics = false;
  }
}
function configure(newConfig) {
  if (typeof newConfig === 'function') {
    // Pass the existing config out to the provided function
    // and accept a delta in return
    newConfig = newConfig(config);
  } // Merge the incoming config delta


  config = _extends__default['default']({}, config, newConfig);
}
function getConfig() {
  return config;
}

var labelledNodeNames = ['button', 'meter', 'output', 'progress', 'select', 'textarea', 'input'];

function getTextContent(node) {
  if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
    return '';
  }

  if (node.nodeType === TEXT_NODE) return node.textContent;
  return Array.from(node.childNodes).map(function (childNode) {
    return getTextContent(childNode);
  }).join('');
}

function getLabelContent(element) {
  var textContent;

  if (element.tagName.toLowerCase() === 'label') {
    textContent = getTextContent(element);
  } else {
    textContent = element.value || element.textContent;
  }

  return textContent;
} // Based on https://github.com/eps1lon/dom-accessibility-api/pull/352


function getRealLabels(element) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- types are not aware of older browsers that don't implement `labels`
  if (element.labels !== undefined) {
    var _labels;

    return (_labels = element.labels) != null ? _labels : [];
  }

  if (!isLabelable(element)) return [];
  var labels = element.ownerDocument.querySelectorAll('label');
  return Array.from(labels).filter(function (label) {
    return label.control === element;
  });
}

function isLabelable(element) {
  return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === 'INPUT' && element.getAttribute('type') !== 'hidden';
}

function getLabels(container, element, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$selector = _ref.selector,
      selector = _ref$selector === void 0 ? '*' : _ref$selector;

  var ariaLabelledBy = element.getAttribute('aria-labelledby');
  var labelsId = ariaLabelledBy ? ariaLabelledBy.split(' ') : [];
  return labelsId.length ? labelsId.map(function (labelId) {
    var labellingElement = container.querySelector("[id=\"" + labelId + "\"]");
    return labellingElement ? {
      content: getLabelContent(labellingElement),
      formControl: null
    } : {
      content: '',
      formControl: null
    };
  }) : Array.from(getRealLabels(element)).map(function (label) {
    var textToMatch = getLabelContent(label);
    var formControlSelector = 'button, input, meter, output, progress, select, textarea';
    var labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter(function (formControlElement) {
      return formControlElement.matches(selector);
    })[0];
    return {
      content: textToMatch,
      formControl: labelledFormControl
    };
  });
}

function assertNotNullOrUndefined(matcher) {
  if (matcher === null || matcher === undefined) {
    throw new Error( // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
    "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?");
  }
}

function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== 'string') {
    return false;
  }

  assertNotNullOrUndefined(matcher);
  var normalizedText = normalizer(textToMatch);

  if (typeof matcher === 'string' || typeof matcher === 'number') {
    return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
  } else if (typeof matcher === 'function') {
    return matcher(normalizedText, node);
  } else {
    return matcher.test(normalizedText);
  }
}

function matches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== 'string') {
    return false;
  }

  assertNotNullOrUndefined(matcher);
  var normalizedText = normalizer(textToMatch);

  if (matcher instanceof Function) {
    return matcher(normalizedText, node);
  } else if (matcher instanceof RegExp) {
    return matcher.test(normalizedText);
  } else {
    return normalizedText === String(matcher);
  }
}

function getDefaultNormalizer(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$trim = _ref.trim,
      trim = _ref$trim === void 0 ? true : _ref$trim,
      _ref$collapseWhitespa = _ref.collapseWhitespace,
      collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;

  return function (text) {
    var normalizedText = text;
    normalizedText = trim ? normalizedText.trim() : normalizedText;
    normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
    return normalizedText;
  };
}
/**
 * Constructs a normalizer to pass to functions in matches.js
 * @param {boolean|undefined} trim The user-specified value for `trim`, without
 * any defaulting having been applied
 * @param {boolean|undefined} collapseWhitespace The user-specified value for
 * `collapseWhitespace`, without any defaulting having been applied
 * @param {Function|undefined} normalizer The user-specified normalizer
 * @returns {Function} A normalizer
 */


function makeNormalizer(_ref2) {
  var trim = _ref2.trim,
      collapseWhitespace = _ref2.collapseWhitespace,
      normalizer = _ref2.normalizer;

  if (normalizer) {
    // User has specified a custom normalizer
    if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
      // They've also specified a value for trim or collapseWhitespace
      throw new Error('trim and collapseWhitespace are not supported with a normalizer. ' + 'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' + 'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
    }

    return normalizer;
  } else {
    // No custom normalizer specified. Just use default.
    return getDefaultNormalizer({
      trim: trim,
      collapseWhitespace: collapseWhitespace
    });
  }
}

function getNodeText(node) {
  if (node.matches('input[type=submit], input[type=button], input[type=reset]')) {
    return node.value;
  }

  return Array.from(node.childNodes).filter(function (child) {
    return child.nodeType === TEXT_NODE && Boolean(child.textContent);
  }).map(function (c) {
    return c.textContent;
  }).join('');
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var elementRoleList = buildElementRoleList(ariaQuery.elementRoles);
/**
 * @param {Element} element -
 * @returns {boolean} - `true` if `element` and its subtree are inaccessible
 */

function isSubtreeInaccessible(element) {
  if (element.hidden === true) {
    return true;
  }

  if (element.getAttribute('aria-hidden') === 'true') {
    return true;
  }

  var window = element.ownerDocument.defaultView;

  if (window.getComputedStyle(element).display === 'none') {
    return true;
  }

  return false;
}
/**
 * Partial implementation https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion
 * which should only be used for elements with a non-presentational role i.e.
 * `role="none"` and `role="presentation"` will not be excluded.
 *
 * Implements aria-hidden semantics (i.e. parent overrides child)
 * Ignores "Child Presentational: True" characteristics
 *
 * @param {Element} element -
 * @param {object} [options] -
 * @param {function (element: Element): boolean} options.isSubtreeInaccessible -
 * can be used to return cached results from previous isSubtreeInaccessible calls
 * @returns {boolean} true if excluded, otherwise false
 */


function isInaccessible(element, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$isSubtreeIna = _options.isSubtreeInaccessible,
      isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
  var window = element.ownerDocument.defaultView; // since visibility is inherited we can exit early

  if (window.getComputedStyle(element).visibility === 'hidden') {
    return true;
  }

  var currentElement = element;

  while (currentElement) {
    if (isSubtreeInaccessibleImpl(currentElement)) {
      return true;
    }

    currentElement = currentElement.parentElement;
  }

  return false;
}

function getImplicitAriaRoles(currentNode) {
  // eslint bug here:
  // eslint-disable-next-line no-unused-vars
  for (var _iterator = _createForOfIteratorHelperLoose(elementRoleList), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        match = _step$value.match,
        roles = _step$value.roles;

    if (match(currentNode)) {
      return [].concat(roles);
    }
  }

  return [];
}

function buildElementRoleList(elementRolesMap) {
  function makeElementSelector(_ref) {
    var name = _ref.name,
        attributes = _ref.attributes;
    return "" + name + attributes.map(function (_ref2) {
      var attributeName = _ref2.name,
          value = _ref2.value,
          _ref2$constraints = _ref2.constraints,
          constraints = _ref2$constraints === void 0 ? [] : _ref2$constraints;
      var shouldNotExist = constraints.indexOf('undefined') !== -1;

      if (shouldNotExist) {
        return ":not([" + attributeName + "])";
      } else if (value) {
        return "[" + attributeName + "=\"" + value + "\"]";
      } else {
        return "[" + attributeName + "]";
      }
    }).join('');
  }

  function getSelectorSpecificity(_ref3) {
    var _ref3$attributes = _ref3.attributes,
        attributes = _ref3$attributes === void 0 ? [] : _ref3$attributes;
    return attributes.length;
  }

  function bySelectorSpecificity(_ref4, _ref5) {
    var leftSpecificity = _ref4.specificity;
    var rightSpecificity = _ref5.specificity;
    return rightSpecificity - leftSpecificity;
  }

  function match(element) {
    return function (node) {
      var _element$attributes = element.attributes,
          attributes = _element$attributes === void 0 ? [] : _element$attributes; // https://github.com/testing-library/dom-testing-library/issues/814

      var typeTextIndex = attributes.findIndex(function (attribute) {
        return attribute.value && attribute.name === 'type' && attribute.value === 'text';
      });

      if (typeTextIndex >= 0) {
        // not using splice to not mutate the attributes array
        attributes = [].concat(attributes.slice(0, typeTextIndex), attributes.slice(typeTextIndex + 1));

        if (node.type !== 'text') {
          return false;
        }
      }

      return node.matches(makeElementSelector(_extends__default['default']({}, element, {
        attributes: attributes
      })));
    };
  }

  var result = []; // eslint bug here:
  // eslint-disable-next-line no-unused-vars

  for (var _iterator2 = _createForOfIteratorHelperLoose(elementRolesMap.entries()), _step2; !(_step2 = _iterator2()).done;) {
    var _step2$value = _step2.value,
        element = _step2$value[0],
        roles = _step2$value[1];
    result = [].concat(result, [{
      match: match(element),
      roles: Array.from(roles),
      specificity: getSelectorSpecificity(element)
    }]);
  }

  return result.sort(bySelectorSpecificity);
}

function getRoles(container, _temp) {
  var _ref6 = _temp === void 0 ? {} : _temp,
      _ref6$hidden = _ref6.hidden,
      hidden = _ref6$hidden === void 0 ? false : _ref6$hidden;

  function flattenDOM(node) {
    return [node].concat(Array.from(node.children).reduce(function (acc, child) {
      return [].concat(acc, flattenDOM(child));
    }, []));
  }

  return flattenDOM(container).filter(function (element) {
    return hidden === false ? isInaccessible(element) === false : true;
  }).reduce(function (acc, node) {
    var roles = []; // TODO: This violates html-aria which does not allow any role on every element

    if (node.hasAttribute('role')) {
      roles = node.getAttribute('role').split(' ').slice(0, 1);
    } else {
      roles = getImplicitAriaRoles(node);
    }

    return roles.reduce(function (rolesAcc, role) {
      var _extends2, _extends3;

      return Array.isArray(rolesAcc[role]) ? _extends__default['default']({}, rolesAcc, (_extends2 = {}, _extends2[role] = [].concat(rolesAcc[role], [node]), _extends2)) : _extends__default['default']({}, rolesAcc, (_extends3 = {}, _extends3[role] = [node], _extends3));
    }, acc);
  }, {});
}

function prettyRoles(dom, _ref7) {
  var hidden = _ref7.hidden;
  var roles = getRoles(dom, {
    hidden: hidden
  }); // We prefer to skip generic role, we don't recommend it

  return Object.entries(roles).filter(function (_ref8) {
    var role = _ref8[0];
    return role !== 'generic';
  }).map(function (_ref9) {
    var role = _ref9[0],
        elements = _ref9[1];
    var delimiterBar = '-'.repeat(50);
    var elementsString = elements.map(function (el) {
      var nameString = "Name \"" + domAccessibilityApi.computeAccessibleName(el, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      }) + "\":\n";
      var domString = prettyDOM(el.cloneNode(false));
      return "" + nameString + domString;
    }).join('\n\n');
    return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
  }).join('\n');
}

var logRoles = function logRoles(dom, _temp2) {
  var _ref10 = _temp2 === void 0 ? {} : _temp2,
      _ref10$hidden = _ref10.hidden,
      hidden = _ref10$hidden === void 0 ? false : _ref10$hidden;

  return console.log(prettyRoles(dom, {
    hidden: hidden
  }));
};
/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)selected, undefined if not selectable
 */


function computeAriaSelected(element) {
  // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
  // https://www.w3.org/TR/html-aam-1.0/#details-id-97
  if (element.tagName === 'OPTION') {
    return element.selected;
  } // explicit value


  return checkBooleanAttribute(element, 'aria-selected');
}
/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)checked, undefined if not checked-able
 */


function computeAriaChecked(element) {
  // implicit value from html-aam mappings: https://www.w3.org/TR/html-aam-1.0/#html-attribute-state-and-property-mappings
  // https://www.w3.org/TR/html-aam-1.0/#details-id-56
  // https://www.w3.org/TR/html-aam-1.0/#details-id-67
  if ('indeterminate' in element && element.indeterminate) {
    return undefined;
  }

  if ('checked' in element) {
    return element.checked;
  } // explicit value


  return checkBooleanAttribute(element, 'aria-checked');
}
/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)pressed, undefined if not press-able
 */


function computeAriaPressed(element) {
  // https://www.w3.org/TR/wai-aria-1.1/#aria-pressed
  return checkBooleanAttribute(element, 'aria-pressed');
}
/**
 * @param {Element} element -
 * @returns {boolean | string | null} -
 */


function computeAriaCurrent(element) {
  var _ref11, _checkBooleanAttribut;

  // https://www.w3.org/TR/wai-aria-1.1/#aria-current
  return (_ref11 = (_checkBooleanAttribut = checkBooleanAttribute(element, 'aria-current')) != null ? _checkBooleanAttribut : element.getAttribute('aria-current')) != null ? _ref11 : false;
}
/**
 * @param {Element} element -
 * @returns {boolean | undefined} - false/true if (not)expanded, undefined if not expand-able
 */


function computeAriaExpanded(element) {
  // https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
  return checkBooleanAttribute(element, 'aria-expanded');
}

function checkBooleanAttribute(element, attribute) {
  var attributeValue = element.getAttribute(attribute);

  if (attributeValue === 'true') {
    return true;
  }

  if (attributeValue === 'false') {
    return false;
  }

  return undefined;
}
/**
 * @param {Element} element -
 * @returns {number | undefined} - number if implicit heading or aria-level present, otherwise undefined
 */


function computeHeadingLevel(element) {
  // https://w3c.github.io/html-aam/#el-h1-h6
  // https://w3c.github.io/html-aam/#el-h1-h6
  var implicitHeadingLevels = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6
  }; // explicit aria-level value
  // https://www.w3.org/TR/wai-aria-1.2/#aria-level

  var ariaLevelAttribute = element.getAttribute('aria-level') && Number(element.getAttribute('aria-level'));
  return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
}

var normalize = getDefaultNormalizer();

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getRegExpMatcher(string) {
  return new RegExp(escapeRegExp(string.toLowerCase()), 'i');
}

function makeSuggestion(queryName, element, content, _ref) {
  var variant = _ref.variant,
      name = _ref.name;
  var warning = '';
  var queryOptions = {};
  var queryArgs = [['Role', 'TestId'].includes(queryName) ? content : getRegExpMatcher(content)];

  if (name) {
    queryOptions.name = getRegExpMatcher(name);
  }

  if (queryName === 'Role' && isInaccessible(element)) {
    queryOptions.hidden = true;
    warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
  }

  if (Object.keys(queryOptions).length > 0) {
    queryArgs.push(queryOptions);
  }

  var queryMethod = variant + "By" + queryName;
  return {
    queryName: queryName,
    queryMethod: queryMethod,
    queryArgs: queryArgs,
    variant: variant,
    warning: warning,
    toString: function toString() {
      if (warning) {
        console.warn(warning);
      }

      var text = queryArgs[0],
          options = queryArgs[1];
      text = typeof text === 'string' ? "'" + text + "'" : text;
      options = options ? ", { " + Object.entries(options).map(function (_ref2) {
        var k = _ref2[0],
            v = _ref2[1];
        return k + ": " + v;
      }).join(', ') + " }" : '';
      return queryMethod + "(" + text + options + ")";
    }
  };
}

function canSuggest(currentMethod, requestedMethod, data) {
  return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
}

function getSuggestedQuery(element, variant, method) {
  var _element$getAttribute, _getImplicitAriaRoles;

  if (variant === void 0) {
    variant = 'get';
  }

  // don't create suggestions for script and style elements
  if (element.matches(DEFAULT_IGNORE_TAGS)) {
    return undefined;
  } //We prefer to suggest something else if the role is generic


  var role = (_element$getAttribute = element.getAttribute('role')) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];

  if (role !== 'generic' && canSuggest('Role', method, role)) {
    return makeSuggestion('Role', element, role, {
      variant: variant,
      name: domAccessibilityApi.computeAccessibleName(element, {
        computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
      })
    });
  }

  var labelText = getLabels(document, element).map(function (label) {
    return label.content;
  }).join(' ');

  if (canSuggest('LabelText', method, labelText)) {
    return makeSuggestion('LabelText', element, labelText, {
      variant: variant
    });
  }

  var placeholderText = element.getAttribute('placeholder');

  if (canSuggest('PlaceholderText', method, placeholderText)) {
    return makeSuggestion('PlaceholderText', element, placeholderText, {
      variant: variant
    });
  }

  var textContent = normalize(getNodeText(element));

  if (canSuggest('Text', method, textContent)) {
    return makeSuggestion('Text', element, textContent, {
      variant: variant
    });
  }

  if (canSuggest('DisplayValue', method, element.value)) {
    return makeSuggestion('DisplayValue', element, normalize(element.value), {
      variant: variant
    });
  }

  var alt = element.getAttribute('alt');

  if (canSuggest('AltText', method, alt)) {
    return makeSuggestion('AltText', element, alt, {
      variant: variant
    });
  }

  var title = element.getAttribute('title');

  if (canSuggest('Title', method, title)) {
    return makeSuggestion('Title', element, title, {
      variant: variant
    });
  }

  var testId = element.getAttribute(getConfig().testIdAttribute);

  if (canSuggest('TestId', method, testId)) {
    return makeSuggestion('TestId', element, testId, {
      variant: variant
    });
  }

  return undefined;
}

// closer to their code (because async stack traces are hard to follow).

function copyStackTrace(target, source) {
  target.stack = source.stack.replace(source.message, target.message);
}

function waitFor(callback, _ref) {
  var _ref$container = _ref.container,
      container = _ref$container === void 0 ? getDocument() : _ref$container,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
      _ref$showOriginalStac = _ref.showOriginalStackTrace,
      showOriginalStackTrace = _ref$showOriginalStac === void 0 ? getConfig().showOriginalStackTrace : _ref$showOriginalStac,
      stackTraceError = _ref.stackTraceError,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 50 : _ref$interval,
      _ref$onTimeout = _ref.onTimeout,
      onTimeout = _ref$onTimeout === void 0 ? function (error) {
    error.message = getConfig().getElementError(error.message, container).message;
    return error;
  } : _ref$onTimeout,
      _ref$mutationObserver = _ref.mutationObserverOptions,
      mutationObserverOptions = _ref$mutationObserver === void 0 ? {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  } : _ref$mutationObserver;

  if (typeof callback !== 'function') {
    throw new TypeError('Received `callback` arg must be a function');
  }

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee2(resolve, reject) {
      var lastError, intervalId, observer, finished, promiseStatus, overallTimeoutTimer, usingJestFakeTimers, _getConfig, advanceTimersWrapper, error, _getWindowFromNode, MutationObserver, onDone, checkRealTimersCallback, checkCallback, handleTimeout;

      return _regeneratorRuntime__default['default'].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              handleTimeout = function _handleTimeout() {
                var error;

                if (lastError) {
                  error = lastError;

                  if (!showOriginalStackTrace && error.name === 'TestingLibraryElementError') {
                    copyStackTrace(error, stackTraceError);
                  }
                } else {
                  error = new Error('Timed out in waitFor.');

                  if (!showOriginalStackTrace) {
                    copyStackTrace(error, stackTraceError);
                  }
                }

                onDone(onTimeout(error), null);
              };

              checkCallback = function _checkCallback() {
                if (promiseStatus === 'pending') return;

                try {
                  var result = runWithExpensiveErrorDiagnosticsDisabled(callback);

                  if (typeof (result == null ? void 0 : result.then) === 'function') {
                    promiseStatus = 'pending';
                    result.then(function (resolvedValue) {
                      promiseStatus = 'resolved';
                      onDone(null, resolvedValue);
                    }, function (rejectedValue) {
                      promiseStatus = 'rejected';
                      lastError = rejectedValue;
                    });
                  } else {
                    onDone(null, result);
                  } // If `callback` throws, wait for the next mutation, interval, or timeout.

                } catch (error) {
                  // Save the most recent callback error to reject the promise with it in the event of a timeout
                  lastError = error;
                }
              };

              checkRealTimersCallback = function _checkRealTimersCallb() {
                if (jestFakeTimersAreEnabled()) {
                  var _error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");

                  if (!showOriginalStackTrace) copyStackTrace(_error, stackTraceError);
                  return reject(_error);
                } else {
                  return checkCallback();
                }
              };

              onDone = function _onDone(error, result) {
                finished = true;
                clearTimeout(overallTimeoutTimer);

                if (!usingJestFakeTimers) {
                  clearInterval(intervalId);
                  observer.disconnect();
                }

                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              };

              finished = false;
              promiseStatus = 'idle';
              overallTimeoutTimer = setTimeout(handleTimeout, timeout);
              usingJestFakeTimers = jestFakeTimersAreEnabled();

              if (!usingJestFakeTimers) {
                _context2.next = 25;
                break;
              }

              _getConfig = getConfig(), advanceTimersWrapper = _getConfig.unstable_advanceTimersWrapper;
              checkCallback(); // this is a dangerous rule to disable because it could lead to an
              // infinite loop. However, eslint isn't smart enough to know that we're
              // setting finished inside `onDone` which will be called when we're done
              // waiting or when we've timed out.
              // eslint-disable-next-line no-unmodified-loop-condition

            case 11:
              if (finished) {
                _context2.next = 23;
                break;
              }

              if (jestFakeTimersAreEnabled()) {
                _context2.next = 17;
                break;
              }

              error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
              if (!showOriginalStackTrace) copyStackTrace(error, stackTraceError);
              reject(error);
              return _context2.abrupt("return");

            case 17:
              // we *could* (maybe should?) use `advanceTimersToNextTimer` but it's
              // possible that could make this loop go on forever if someone is using
              // third party code that's setting up recursive timers so rapidly that
              // the user's timer's don't get a chance to resolve. So we'll advance
              // by an interval instead. (We have a test for this case).
              advanceTimersWrapper(function () {
                jest.advanceTimersByTime(interval);
              }); // It's really important that checkCallback is run *before* we flush
              // in-flight promises. To be honest, I'm not sure why, and I can't quite
              // think of a way to reproduce the problem in a test, but I spent
              // an entire day banging my head against a wall on this.

              checkCallback(); // In this rare case, we *need* to wait for in-flight promises
              // to resolve before continuing. We don't need to take advantage
              // of parallelization so we're fine.
              // https://stackoverflow.com/a/59243586/971592
              // eslint-disable-next-line no-await-in-loop

              _context2.next = 21;
              return advanceTimersWrapper( /*#__PURE__*/_asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
                return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return new Promise(function (r) {
                          setTimeout(r, 0);
                          jest.advanceTimersByTime(0);
                        });

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 21:
              _context2.next = 11;
              break;

            case 23:
              _context2.next = 38;
              break;

            case 25:
              _context2.prev = 25;
              checkContainerType(container);
              _context2.next = 33;
              break;

            case 29:
              _context2.prev = 29;
              _context2.t0 = _context2["catch"](25);
              reject(_context2.t0);
              return _context2.abrupt("return");

            case 33:
              intervalId = setInterval(checkRealTimersCallback, interval);
              _getWindowFromNode = getWindowFromNode(container), MutationObserver = _getWindowFromNode.MutationObserver;
              observer = new MutationObserver(checkRealTimersCallback);
              observer.observe(container, mutationObserverOptions);
              checkCallback();

            case 38:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[25, 29]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function waitForWrapper(callback, options) {
  // create the error here so its stack trace is as close to the
  // calling code as possible
  var stackTraceError = new Error('STACK_TRACE_MESSAGE');
  return getConfig().asyncWrapper(function () {
    return waitFor(callback, _extends__default['default']({
      stackTraceError: stackTraceError
    }, options));
  });
}
/*
eslint
  max-lines-per-function: ["error", {"max": 200}],
*/

function getElementError(message, container) {
  return getConfig().getElementError(message, container);
}

function getMultipleElementsFoundError(message, container) {
  return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
}

function queryAllByAttribute(attribute, container, text, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      trim = _ref.trim,
      normalizer = _ref.normalizer;

  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  return Array.from(container.querySelectorAll("[" + attribute + "]")).filter(function (node) {
    return matcher(node.getAttribute(attribute), node, text, matchNormalizer);
  });
}

function queryByAttribute(attribute, container, text, options) {
  var els = queryAllByAttribute(attribute, container, text, options);

  if (els.length > 1) {
    throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
  }

  return els[0] || null;
} // this accepts a query function and returns a function which throws an error
// if more than one elements is returned, otherwise it returns the first
// element or null


function makeSingleQuery(allQuery, getMultipleError) {
  return function (container) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var els = allQuery.apply(void 0, [container].concat(args));

    if (els.length > 1) {
      var elementStrings = els.map(function (element) {
        return getElementError(null, element).message;
      }).join('\n\n');
      throw getMultipleElementsFoundError(getMultipleError.apply(void 0, [container].concat(args)) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
    }

    return els[0] || null;
  };
}

function getSuggestionError(suggestion, container) {
  return getConfig().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
} // this accepts a query function and returns a function which throws an error
// if an empty list of elements is returned


function makeGetAllQuery(allQuery, getMissingError) {
  return function (container) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var els = allQuery.apply(void 0, [container].concat(args));

    if (!els.length) {
      throw getConfig().getElementError(getMissingError.apply(void 0, [container].concat(args)), container);
    }

    return els;
  };
} // this accepts a getter query function and returns a function which calls
// waitFor and passing a function which invokes the getter.


function makeFindQuery(getter) {
  return function (container, text, options, waitForOptions) {
    return waitForWrapper(function () {
      return getter(container, text, options);
    }, _extends__default['default']({
      container: container
    }, waitForOptions));
  };
}

var wrapSingleQueryWithSuggestion = function wrapSingleQueryWithSuggestion(query, queryAllByName, variant) {
  return function (container) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    var element = query.apply(void 0, [container].concat(args));

    var _ref2 = args.slice(-1),
        _ref2$ = _ref2[0];

    _ref2$ = _ref2$ === void 0 ? {} : _ref2$;
    var _ref2$$suggest = _ref2$.suggest,
        suggest = _ref2$$suggest === void 0 ? getConfig().throwSuggestions : _ref2$$suggest;

    if (element && suggest) {
      var suggestion = getSuggestedQuery(element, variant);

      if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
        throw getSuggestionError(suggestion.toString(), container);
      }
    }

    return element;
  };
};

var wrapAllByQueryWithSuggestion = function wrapAllByQueryWithSuggestion(query, queryAllByName, variant) {
  return function (container) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var els = query.apply(void 0, [container].concat(args));

    var _ref3 = args.slice(-1),
        _ref3$ = _ref3[0];

    _ref3$ = _ref3$ === void 0 ? {} : _ref3$;
    var _ref3$$suggest = _ref3$.suggest,
        suggest = _ref3$$suggest === void 0 ? getConfig().throwSuggestions : _ref3$$suggest;

    if (els.length && suggest) {
      // get a unique list of all suggestion messages.  We are only going to make a suggestion if
      // all the suggestions are the same
      var uniqueSuggestionMessages = [].concat(new Set(els.map(function (element) {
        var _getSuggestedQuery;

        return (_getSuggestedQuery = getSuggestedQuery(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
      })));

      if ( // only want to suggest if all the els have the same suggestion.
      uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith( // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
      getSuggestedQuery(els[0], variant).queryName)) {
        throw getSuggestionError(uniqueSuggestionMessages[0], container);
      }
    }

    return els;
  };
}; // TODO: This deviates from the published declarations
// However, the implementation always required a dyadic (after `container`) not variadic `queryAllBy` considering the implementation of `makeFindQuery`
// This is at least statically true and can be verified by accepting `QueryMethod<Arguments, HTMLElement[]>`


function buildQueries(queryAllBy, getMultipleError, getMissingError) {
  var queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError), queryAllBy.name, 'query');
  var getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
  var getBy = makeSingleQuery(getAllBy, getMultipleError);
  var getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'get');
  var getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace('query', 'get'), 'getAll');
  var findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, 'findAll'));
  var findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, 'find'));
  return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
}

var queryHelpers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getElementError: getElementError,
  wrapAllByQueryWithSuggestion: wrapAllByQueryWithSuggestion,
  wrapSingleQueryWithSuggestion: wrapSingleQueryWithSuggestion,
  getMultipleElementsFoundError: getMultipleElementsFoundError,
  queryAllByAttribute: queryAllByAttribute,
  queryByAttribute: queryByAttribute,
  makeSingleQuery: makeSingleQuery,
  makeGetAllQuery: makeGetAllQuery,
  makeFindQuery: makeFindQuery,
  buildQueries: buildQueries
});

function queryAllLabels(container) {
  return Array.from(container.querySelectorAll('label,input')).map(function (node) {
    return {
      node: node,
      textToMatch: getLabelContent(node)
    };
  }).filter(function (_ref) {
    var textToMatch = _ref.textToMatch;
    return textToMatch !== null;
  });
}

var queryAllLabelsByText = function queryAllLabelsByText(container, text, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$exact = _ref2.exact,
      exact = _ref2$exact === void 0 ? true : _ref2$exact,
      trim = _ref2.trim,
      collapseWhitespace = _ref2.collapseWhitespace,
      normalizer = _ref2.normalizer;

  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  var textToMatchByLabels = queryAllLabels(container);
  return textToMatchByLabels.filter(function (_ref3) {
    var node = _ref3.node,
        textToMatch = _ref3.textToMatch;
    return matcher(textToMatch, node, text, matchNormalizer);
  }).map(function (_ref4) {
    var node = _ref4.node;
    return node;
  });
};

var queryAllByLabelText = function queryAllByLabelText(container, text, _temp2) {
  var _ref5 = _temp2 === void 0 ? {} : _temp2,
      _ref5$selector = _ref5.selector,
      selector = _ref5$selector === void 0 ? '*' : _ref5$selector,
      _ref5$exact = _ref5.exact,
      exact = _ref5$exact === void 0 ? true : _ref5$exact,
      collapseWhitespace = _ref5.collapseWhitespace,
      trim = _ref5.trim,
      normalizer = _ref5.normalizer;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  var matchingLabelledElements = Array.from(container.querySelectorAll('*')).filter(function (element) {
    return getRealLabels(element).length || element.hasAttribute('aria-labelledby');
  }).reduce(function (labelledElements, labelledElement) {
    var labelList = getLabels(container, labelledElement, {
      selector: selector
    });
    labelList.filter(function (label) {
      return Boolean(label.formControl);
    }).forEach(function (label) {
      if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) labelledElements.push(label.formControl);
    });
    var labelsValue = labelList.filter(function (label) {
      return Boolean(label.content);
    }).map(function (label) {
      return label.content;
    });
    if (matcher(labelsValue.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);

    if (labelsValue.length > 1) {
      labelsValue.forEach(function (labelValue, index) {
        if (matcher(labelValue, labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
        var labelsFiltered = [].concat(labelsValue);
        labelsFiltered.splice(index, 1);

        if (labelsFiltered.length > 1) {
          if (matcher(labelsFiltered.join(' '), labelledElement, text, matchNormalizer)) labelledElements.push(labelledElement);
        }
      });
    }

    return labelledElements;
  }, []).concat(queryAllByAttribute('aria-label', container, text, {
    exact: exact,
    normalizer: matchNormalizer
  }));
  return Array.from(new Set(matchingLabelledElements)).filter(function (element) {
    return element.matches(selector);
  });
}; // the getAll* query would normally look like this:
// const getAllByLabelText = makeGetAllQuery(
//   queryAllByLabelText,
//   (c, text) => `Unable to find a label with the text of: ${text}`,
// )
// however, we can give a more helpful error message than the generic one,
// so we're writing this one out by hand.


var getAllByLabelText = function getAllByLabelText(container, text) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  var els = queryAllByLabelText.apply(void 0, [container, text].concat(rest));

  if (!els.length) {
    var labels = queryAllLabelsByText.apply(void 0, [container, text].concat(rest));

    if (labels.length) {
      var tagNames = labels.map(function (label) {
        return getTagNameOfElementAssociatedWithLabelViaFor(container, label);
      }).filter(function (tagName) {
        return !!tagName;
      });

      if (tagNames.length) {
        throw getConfig().getElementError(tagNames.map(function (tagName) {
          return "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.";
        }).join('\n\n'), container);
      } else {
        throw getConfig().getElementError("Found a label with the text of: " + text + ", however no form control was found associated to that label. Make sure you're using the \"for\" attribute or \"aria-labelledby\" attribute correctly.", container);
      }
    } else {
      throw getConfig().getElementError("Unable to find a label with the text of: " + text, container);
    }
  }

  return els;
};

function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
  var htmlFor = label.getAttribute('for');

  if (!htmlFor) {
    return null;
  }

  var element = container.querySelector("[id=\"" + htmlFor + "\"]");
  return element ? element.tagName.toLowerCase() : null;
} // the reason mentioned above is the same reason we're not using buildQueries


var getMultipleError$7 = function getMultipleError(c, text) {
  return "Found multiple elements with the text of: " + text;
};

var queryByLabelText = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText, getMultipleError$7), queryAllByLabelText.name, 'query');
var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$7);
var findAllByLabelText = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'findAll'));
var findByLabelText = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'find'));
var getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText, getAllByLabelText.name, 'getAll');
var getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText, getAllByLabelText.name, 'get');
var queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText, queryAllByLabelText.name, 'queryAll');

var queryAllByPlaceholderText = function queryAllByPlaceholderText() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  checkContainerType(args[0]);
  return queryAllByAttribute.apply(void 0, ['placeholder'].concat(args));
};

var getMultipleError$6 = function getMultipleError(c, text) {
  return "Found multiple elements with the placeholder text of: " + text;
};

var getMissingError$6 = function getMissingError(c, text) {
  return "Unable to find an element with the placeholder text of: " + text;
};

var queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText, queryAllByPlaceholderText.name, 'queryAll');

var _buildQueries$6 = buildQueries(queryAllByPlaceholderText, getMultipleError$6, getMissingError$6),
    queryByPlaceholderText = _buildQueries$6[0],
    getAllByPlaceholderText = _buildQueries$6[1],
    getByPlaceholderText = _buildQueries$6[2],
    findAllByPlaceholderText = _buildQueries$6[3],
    findByPlaceholderText = _buildQueries$6[4];

var queryAllByText = function queryAllByText(container, text, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$selector = _ref.selector,
      selector = _ref$selector === void 0 ? '*' : _ref$selector,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      trim = _ref.trim,
      _ref$ignore = _ref.ignore,
      ignore = _ref$ignore === void 0 ? DEFAULT_IGNORE_TAGS : _ref$ignore,
      normalizer = _ref.normalizer;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  var baseArray = [];

  if (typeof container.matches === 'function' && container.matches(selector)) {
    baseArray = [container];
  }

  return [].concat(baseArray, Array.from(container.querySelectorAll(selector))) // TODO: `matches` according lib.dom.d.ts can get only `string` but according our code it can handle also boolean :)
  .filter(function (node) {
    return !ignore || !node.matches(ignore);
  }).filter(function (node) {
    return matcher(getNodeText(node), node, text, matchNormalizer);
  });
};

var getMultipleError$5 = function getMultipleError(c, text) {
  return "Found multiple elements with the text: " + text;
};

var getMissingError$5 = function getMissingError(c, text) {
  return "Unable to find an element with the text: " + text + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
};

var queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText, queryAllByText.name, 'queryAll');

var _buildQueries$5 = buildQueries(queryAllByText, getMultipleError$5, getMissingError$5),
    queryByText = _buildQueries$5[0],
    getAllByText = _buildQueries$5[1],
    getByText = _buildQueries$5[2],
    findAllByText = _buildQueries$5[3],
    findByText = _buildQueries$5[4];

var queryAllByDisplayValue = function queryAllByDisplayValue(container, value, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      trim = _ref.trim,
      normalizer = _ref.normalizer;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  return Array.from(container.querySelectorAll("input,textarea,select")).filter(function (node) {
    if (node.tagName === 'SELECT') {
      var selectedOptions = Array.from(node.options).filter(function (option) {
        return option.selected;
      });
      return selectedOptions.some(function (optionNode) {
        return matcher(getNodeText(optionNode), optionNode, value, matchNormalizer);
      });
    } else {
      return matcher(node.value, node, value, matchNormalizer);
    }
  });
};

var getMultipleError$4 = function getMultipleError(c, value) {
  return "Found multiple elements with the display value: " + value + ".";
};

var getMissingError$4 = function getMissingError(c, value) {
  return "Unable to find an element with the display value: " + value + ".";
};

var queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue, queryAllByDisplayValue.name, 'queryAll');

var _buildQueries$4 = buildQueries(queryAllByDisplayValue, getMultipleError$4, getMissingError$4),
    queryByDisplayValue = _buildQueries$4[0],
    getAllByDisplayValue = _buildQueries$4[1],
    getByDisplayValue = _buildQueries$4[2],
    findAllByDisplayValue = _buildQueries$4[3],
    findByDisplayValue = _buildQueries$4[4];

var queryAllByAltText = function queryAllByAltText(container, alt, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      trim = _ref.trim,
      normalizer = _ref.normalizer;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  return Array.from(container.querySelectorAll('img,input,area')).filter(function (node) {
    return matcher(node.getAttribute('alt'), node, alt, matchNormalizer);
  });
};

var getMultipleError$3 = function getMultipleError(c, alt) {
  return "Found multiple elements with the alt text: " + alt;
};

var getMissingError$3 = function getMissingError(c, alt) {
  return "Unable to find an element with the alt text: " + alt;
};

var queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText, queryAllByAltText.name, 'queryAll');

var _buildQueries$3 = buildQueries(queryAllByAltText, getMultipleError$3, getMissingError$3),
    queryByAltText = _buildQueries$3[0],
    getAllByAltText = _buildQueries$3[1],
    getByAltText = _buildQueries$3[2],
    findAllByAltText = _buildQueries$3[3],
    findByAltText = _buildQueries$3[4];

var isSvgTitle = function isSvgTitle(node) {
  var _node$parentElement;

  return node.tagName.toLowerCase() === 'title' && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === 'svg';
};

var queryAllByTitle = function queryAllByTitle(container, text, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      trim = _ref.trim,
      normalizer = _ref.normalizer;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });
  return Array.from(container.querySelectorAll('[title], svg > title')).filter(function (node) {
    return matcher(node.getAttribute('title'), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText(node), node, text, matchNormalizer);
  });
};

var getMultipleError$2 = function getMultipleError(c, title) {
  return "Found multiple elements with the title: " + title + ".";
};

var getMissingError$2 = function getMissingError(c, title) {
  return "Unable to find an element with the title: " + title + ".";
};

var queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle, queryAllByTitle.name, 'queryAll');

var _buildQueries$2 = buildQueries(queryAllByTitle, getMultipleError$2, getMissingError$2),
    queryByTitle = _buildQueries$2[0],
    getAllByTitle = _buildQueries$2[1],
    getByTitle = _buildQueries$2[2],
    findAllByTitle = _buildQueries$2[3],
    findByTitle = _buildQueries$2[4];

function queryAllByRole(container, role, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$exact = _ref.exact,
      exact = _ref$exact === void 0 ? true : _ref$exact,
      collapseWhitespace = _ref.collapseWhitespace,
      _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? getConfig().defaultHidden : _ref$hidden,
      name = _ref.name,
      trim = _ref.trim,
      normalizer = _ref.normalizer,
      _ref$queryFallbacks = _ref.queryFallbacks,
      queryFallbacks = _ref$queryFallbacks === void 0 ? false : _ref$queryFallbacks,
      selected = _ref.selected,
      checked = _ref.checked,
      pressed = _ref.pressed,
      current = _ref.current,
      level = _ref.level,
      expanded = _ref.expanded;

  checkContainerType(container);
  var matcher = exact ? matches : fuzzyMatches;
  var matchNormalizer = makeNormalizer({
    collapseWhitespace: collapseWhitespace,
    trim: trim,
    normalizer: normalizer
  });

  if (selected !== undefined) {
    var _allRoles$get;

    // guard against unknown roles
    if (((_allRoles$get = ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get.props['aria-selected']) === undefined) {
      throw new Error("\"aria-selected\" is not supported on role \"" + role + "\".");
    }
  }

  if (checked !== undefined) {
    var _allRoles$get2;

    // guard against unknown roles
    if (((_allRoles$get2 = ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get2.props['aria-checked']) === undefined) {
      throw new Error("\"aria-checked\" is not supported on role \"" + role + "\".");
    }
  }

  if (pressed !== undefined) {
    var _allRoles$get3;

    // guard against unknown roles
    if (((_allRoles$get3 = ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get3.props['aria-pressed']) === undefined) {
      throw new Error("\"aria-pressed\" is not supported on role \"" + role + "\".");
    }
  }

  if (current !== undefined) {
    var _allRoles$get4;

    /* istanbul ignore next */
    // guard against unknown roles
    // All currently released ARIA versions support `aria-current` on all roles.
    // Leaving this for symetry and forward compatibility
    if (((_allRoles$get4 = ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get4.props['aria-current']) === undefined) {
      throw new Error("\"aria-current\" is not supported on role \"" + role + "\".");
    }
  }

  if (level !== undefined) {
    // guard against using `level` option with any role other than `heading`
    if (role !== 'heading') {
      throw new Error("Role \"" + role + "\" cannot have \"level\" property.");
    }
  }

  if (expanded !== undefined) {
    var _allRoles$get5;

    // guard against unknown roles
    if (((_allRoles$get5 = ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get5.props['aria-expanded']) === undefined) {
      throw new Error("\"aria-expanded\" is not supported on role \"" + role + "\".");
    }
  }

  var subtreeIsInaccessibleCache = new WeakMap();

  function cachedIsSubtreeInaccessible(element) {
    if (!subtreeIsInaccessibleCache.has(element)) {
      subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
    }

    return subtreeIsInaccessibleCache.get(element);
  }

  return Array.from(container.querySelectorAll('*')).filter(function (node) {
    var isRoleSpecifiedExplicitly = node.hasAttribute('role');

    if (isRoleSpecifiedExplicitly) {
      var roleValue = node.getAttribute('role');

      if (queryFallbacks) {
        return roleValue.split(' ').filter(Boolean).some(function (text) {
          return matcher(text, node, role, matchNormalizer);
        });
      } // if a custom normalizer is passed then let normalizer handle the role value


      if (normalizer) {
        return matcher(roleValue, node, role, matchNormalizer);
      } // other wise only send the first word to match


      var _roleValue$split = roleValue.split(' '),
          firstWord = _roleValue$split[0];

      return matcher(firstWord, node, role, matchNormalizer);
    }

    var implicitRoles = getImplicitAriaRoles(node);
    return implicitRoles.some(function (implicitRole) {
      return matcher(implicitRole, node, role, matchNormalizer);
    });
  }).filter(function (element) {
    if (selected !== undefined) {
      return selected === computeAriaSelected(element);
    }

    if (checked !== undefined) {
      return checked === computeAriaChecked(element);
    }

    if (pressed !== undefined) {
      return pressed === computeAriaPressed(element);
    }

    if (current !== undefined) {
      return current === computeAriaCurrent(element);
    }

    if (expanded !== undefined) {
      return expanded === computeAriaExpanded(element);
    }

    if (level !== undefined) {
      return level === computeHeadingLevel(element);
    } // don't care if aria attributes are unspecified


    return true;
  }).filter(function (element) {
    return hidden === false ? isInaccessible(element, {
      isSubtreeInaccessible: cachedIsSubtreeInaccessible
    }) === false : true;
  }).filter(function (element) {
    if (name === undefined) {
      // Don't care
      return true;
    }

    return matches(domAccessibilityApi.computeAccessibleName(element, {
      computedStyleSupportsPseudoElements: getConfig().computedStyleSupportsPseudoElements
    }), element, name, function (text) {
      return text;
    });
  });
}

var getMultipleError$1 = function getMultipleError(c, role, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      name = _ref2.name;

  var nameHint = '';

  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = " and name \"" + name + "\"";
  } else {
    nameHint = " and name `" + name + "`";
  }

  return "Found multiple elements with the role \"" + role + "\"" + nameHint;
};

var getMissingError$1 = function getMissingError(container, role, _temp3) {
  var _ref3 = _temp3 === void 0 ? {} : _temp3,
      _ref3$hidden = _ref3.hidden,
      hidden = _ref3$hidden === void 0 ? getConfig().defaultHidden : _ref3$hidden,
      name = _ref3.name;

  if (getConfig()._disableExpensiveErrorDiagnostics) {
    return "Unable to find role=\"" + role + "\"";
  }

  var roles = '';
  Array.from(container.children).forEach(function (childElement) {
    roles += prettyRoles(childElement, {
      hidden: hidden,
      includeName: name !== undefined
    });
  });
  var roleMessage;

  if (roles.length === 0) {
    if (hidden === false) {
      roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
    } else {
      roleMessage = 'There are no available roles.';
    }
  } else {
    roleMessage = ("\nHere are the " + (hidden === false ? 'accessible' : 'available') + " roles:\n\n  " + roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n') + "\n").trim();
  }

  var nameHint = '';

  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = " and name \"" + name + "\"";
  } else {
    nameHint = " and name `" + name + "`";
  }

  return ("\nUnable to find an " + (hidden === false ? 'accessible ' : '') + "element with the role \"" + role + "\"" + nameHint + "\n\n" + roleMessage).trim();
};

var queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole, queryAllByRole.name, 'queryAll');

var _buildQueries$1 = buildQueries(queryAllByRole, getMultipleError$1, getMissingError$1),
    queryByRole = _buildQueries$1[0],
    getAllByRole = _buildQueries$1[1],
    getByRole = _buildQueries$1[2],
    findAllByRole = _buildQueries$1[3],
    findByRole = _buildQueries$1[4];

var getTestIdAttribute = function getTestIdAttribute() {
  return getConfig().testIdAttribute;
};

var queryAllByTestId = function queryAllByTestId() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  checkContainerType(args[0]);
  return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
};

var getMultipleError = function getMultipleError(c, id) {
  return "Found multiple elements by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
};

var getMissingError = function getMissingError(c, id) {
  return "Unable to find an element by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
};

var queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId, queryAllByTestId.name, 'queryAll');

var _buildQueries = buildQueries(queryAllByTestId, getMultipleError, getMissingError),
    queryByTestId = _buildQueries[0],
    getAllByTestId = _buildQueries[1],
    getByTestId = _buildQueries[2],
    findAllByTestId = _buildQueries[3],
    findByTestId = _buildQueries[4];

var queries = /*#__PURE__*/Object.freeze({
  __proto__: null,
  queryAllByLabelText: queryAllByLabelTextWithSuggestions,
  queryByLabelText: queryByLabelText,
  getAllByLabelText: getAllByLabelTextWithSuggestions,
  getByLabelText: getByLabelTextWithSuggestions,
  findAllByLabelText: findAllByLabelText,
  findByLabelText: findByLabelText,
  queryByPlaceholderText: queryByPlaceholderText,
  queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
  getByPlaceholderText: getByPlaceholderText,
  getAllByPlaceholderText: getAllByPlaceholderText,
  findAllByPlaceholderText: findAllByPlaceholderText,
  findByPlaceholderText: findByPlaceholderText,
  queryByText: queryByText,
  queryAllByText: queryAllByTextWithSuggestions,
  getByText: getByText,
  getAllByText: getAllByText,
  findAllByText: findAllByText,
  findByText: findByText,
  queryByDisplayValue: queryByDisplayValue,
  queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
  getByDisplayValue: getByDisplayValue,
  getAllByDisplayValue: getAllByDisplayValue,
  findAllByDisplayValue: findAllByDisplayValue,
  findByDisplayValue: findByDisplayValue,
  queryByAltText: queryByAltText,
  queryAllByAltText: queryAllByAltTextWithSuggestions,
  getByAltText: getByAltText,
  getAllByAltText: getAllByAltText,
  findAllByAltText: findAllByAltText,
  findByAltText: findByAltText,
  queryByTitle: queryByTitle,
  queryAllByTitle: queryAllByTitleWithSuggestions,
  getByTitle: getByTitle,
  getAllByTitle: getAllByTitle,
  findAllByTitle: findAllByTitle,
  findByTitle: findByTitle,
  queryByRole: queryByRole,
  queryAllByRole: queryAllByRoleWithSuggestions,
  getAllByRole: getAllByRole,
  getByRole: getByRole,
  findAllByRole: findAllByRole,
  findByRole: findByRole,
  queryByTestId: queryByTestId,
  queryAllByTestId: queryAllByTestIdWithSuggestions,
  getByTestId: getByTestId,
  getAllByTestId: getAllByTestId,
  findAllByTestId: findAllByTestId,
  findByTestId: findByTestId
});

/**
 * @typedef {{[key: string]: Function}} FuncMap
 */

/**
 * @param {HTMLElement} element container
 * @param {FuncMap} queries object of functions
 * @param {Object} initialValue for reducer
 * @returns {FuncMap} returns object of functions bound to container
 */

function getQueriesForElement(element, queries$1, initialValue) {
  if (queries$1 === void 0) {
    queries$1 = queries;
  }

  if (initialValue === void 0) {
    initialValue = {};
  }

  return Object.keys(queries$1).reduce(function (helpers, key) {
    var fn = queries$1[key];
    helpers[key] = fn.bind(null, element);
    return helpers;
  }, initialValue);
}

var isRemoved = function isRemoved(result) {
  return !result || Array.isArray(result) && !result.length;
}; // Check if the element is not present.
// As the name implies, waitForElementToBeRemoved should check `present` --> `removed`


function initialCheck(elements) {
  if (isRemoved(elements)) {
    throw new Error('The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.');
  }
}

function waitForElementToBeRemoved(_x, _x2) {
  return _waitForElementToBeRemoved.apply(this, arguments);
}

function _waitForElementToBeRemoved() {
  _waitForElementToBeRemoved = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee(callback, options) {
    var timeoutError, elements, getRemainingElements;
    return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // created here so we get a nice stacktrace
            timeoutError = new Error('Timed out in waitForElementToBeRemoved.');

            if (typeof callback !== 'function') {
              initialCheck(callback);
              elements = Array.isArray(callback) ? callback : [callback];
              getRemainingElements = elements.map(function (element) {
                var parent = element.parentElement;
                if (parent === null) return function () {
                  return null;
                };

                while (parent.parentElement) {
                  parent = parent.parentElement;
                }

                return function () {
                  return parent.contains(element) ? element : null;
                };
              });

              callback = function callback() {
                return getRemainingElements.map(function (c) {
                  return c();
                }).filter(Boolean);
              };
            }

            initialCheck(callback());
            return _context.abrupt("return", waitForWrapper(function () {
              var result;

              try {
                result = callback();
              } catch (error) {
                if (error.name === 'TestingLibraryElementError') {
                  return undefined;
                }

                throw error;
              }

              if (!isRemoved(result)) {
                throw timeoutError;
              }

              return undefined;
            }, options));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _waitForElementToBeRemoved.apply(this, arguments);
}
/*
eslint
  require-await: "off"
*/

var eventMap = {
  // Clipboard Events
  copy: {
    EventType: 'ClipboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  cut: {
    EventType: 'ClipboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  paste: {
    EventType: 'ClipboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Composition Events
  compositionEnd: {
    EventType: 'CompositionEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionStart: {
    EventType: 'CompositionEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionUpdate: {
    EventType: 'CompositionEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Keyboard Events
  keyDown: {
    EventType: 'KeyboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyPress: {
    EventType: 'KeyboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyUp: {
    EventType: 'KeyboardEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  // Focus Events
  focus: {
    EventType: 'FocusEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  blur: {
    EventType: 'FocusEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  focusIn: {
    EventType: 'FocusEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  focusOut: {
    EventType: 'FocusEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  // Form Events
  change: {
    EventType: 'Event',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  input: {
    EventType: 'InputEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  invalid: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: true
    }
  },
  submit: {
    EventType: 'Event',
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  reset: {
    EventType: 'Event',
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  // Mouse Events
  click: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      button: 0,
      composed: true
    }
  },
  contextMenu: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dblClick: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drag: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragEnd: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragEnter: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragExit: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragLeave: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragOver: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragStart: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drop: {
    EventType: 'DragEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseDown: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseEnter: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseLeave: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseMove: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOut: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOver: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseUp: {
    EventType: 'MouseEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Selection Events
  select: {
    EventType: 'Event',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // Touch Events
  touchCancel: {
    EventType: 'TouchEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  touchEnd: {
    EventType: 'TouchEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchMove: {
    EventType: 'TouchEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchStart: {
    EventType: 'TouchEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // UI Events
  resize: {
    EventType: 'UIEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  scroll: {
    EventType: 'UIEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Wheel Events
  wheel: {
    EventType: 'WheelEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Media Events
  abort: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlay: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlayThrough: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  durationChange: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  emptied: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  encrypted: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  ended: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedData: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedMetadata: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadStart: {
    EventType: 'ProgressEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pause: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  play: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  playing: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  progress: {
    EventType: 'ProgressEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  rateChange: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeked: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeking: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  stalled: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  suspend: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  timeUpdate: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  volumeChange: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  waiting: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Image Events
  load: {
    EventType: 'UIEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  error: {
    EventType: 'Event',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Animation Events
  animationStart: {
    EventType: 'AnimationEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationEnd: {
    EventType: 'AnimationEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationIteration: {
    EventType: 'AnimationEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // Transition Events
  transitionEnd: {
    EventType: 'TransitionEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  // pointer events
  pointerOver: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerEnter: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pointerDown: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerMove: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerUp: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerCancel: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  pointerOut: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerLeave: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  gotPointerCapture: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  lostPointerCapture: {
    EventType: 'PointerEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  // history events
  popState: {
    EventType: 'PopStateEvent',
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  }
};
var eventAliasMap = {
  doubleClick: 'dblClick'
};

var _excluded = ["value", "files"],
    _excluded2 = ["bubbles", "cancelable", "detail"];

function fireEvent(element, event) {
  return getConfig().eventWrapper(function () {
    if (!event) {
      throw new Error("Unable to fire an event - please provide an event object.");
    }

    if (!element) {
      throw new Error("Unable to fire a \"" + event.type + "\" event - please provide a DOM element.");
    }

    return element.dispatchEvent(event);
  });
}

function createEvent(eventName, node, init, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$EventType = _ref.EventType,
      EventType = _ref$EventType === void 0 ? 'Event' : _ref$EventType,
      _ref$defaultInit = _ref.defaultInit,
      defaultInit = _ref$defaultInit === void 0 ? {} : _ref$defaultInit;

  if (!node) {
    throw new Error("Unable to fire a \"" + eventName + "\" event - please provide a DOM element.");
  }

  var eventInit = _extends__default['default']({}, defaultInit, init);

  var _eventInit$target = eventInit.target;
  _eventInit$target = _eventInit$target === void 0 ? {} : _eventInit$target;

  var value = _eventInit$target.value,
      files = _eventInit$target.files,
      targetProperties = _objectWithoutPropertiesLoose__default['default'](_eventInit$target, _excluded);

  if (value !== undefined) {
    setNativeValue(node, value);
  }

  if (files !== undefined) {
    // input.files is a read-only property so this is not allowed:
    // input.files = [file]
    // so we have to use this workaround to set the property
    Object.defineProperty(node, 'files', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: files
    });
  }

  Object.assign(node, targetProperties);
  var window = getWindowFromNode(node);
  var EventConstructor = window[EventType] || window.Event;
  var event;
  /* istanbul ignore else  */

  if (typeof EventConstructor === 'function') {
    event = new EventConstructor(eventName, eventInit);
  } else {
    // IE11 polyfill from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    event = window.document.createEvent(EventType);

    var bubbles = eventInit.bubbles,
        cancelable = eventInit.cancelable,
        detail = eventInit.detail,
        otherInit = _objectWithoutPropertiesLoose__default['default'](eventInit, _excluded2);

    event.initEvent(eventName, bubbles, cancelable, detail);
    Object.keys(otherInit).forEach(function (eventKey) {
      event[eventKey] = otherInit[eventKey];
    });
  } // DataTransfer is not supported in jsdom: https://github.com/jsdom/jsdom/issues/1568


  var dataTransferProperties = ['dataTransfer', 'clipboardData'];
  dataTransferProperties.forEach(function (dataTransferKey) {
    var dataTransferValue = eventInit[dataTransferKey];

    if (typeof dataTransferValue === 'object') {
      /* istanbul ignore if  */
      if (typeof window.DataTransfer === 'function') {
        Object.defineProperty(event, dataTransferKey, {
          value: Object.getOwnPropertyNames(dataTransferValue).reduce(function (acc, propName) {
            Object.defineProperty(acc, propName, {
              value: dataTransferValue[propName]
            });
            return acc;
          }, new window.DataTransfer())
        });
      } else {
        Object.defineProperty(event, dataTransferKey, {
          value: dataTransferValue
        });
      }
    }
  });
  return event;
}

Object.keys(eventMap).forEach(function (key) {
  var _eventMap$key = eventMap[key],
      EventType = _eventMap$key.EventType,
      defaultInit = _eventMap$key.defaultInit;
  var eventName = key.toLowerCase();

  createEvent[key] = function (node, init) {
    return createEvent(eventName, node, init, {
      EventType: EventType,
      defaultInit: defaultInit
    });
  };

  fireEvent[key] = function (node, init) {
    return fireEvent(node, createEvent[key](node, init));
  };
}); // function written after some investigation here:
// https://github.com/facebook/react/issues/10135#issuecomment-401496776

function setNativeValue(element, value) {
  var _ref2 = Object.getOwnPropertyDescriptor(element, 'value') || {},
      valueSetter = _ref2.set;

  var prototype = Object.getPrototypeOf(element);

  var _ref3 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
      prototypeValueSetter = _ref3.set;

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    /* istanbul ignore if */
    // eslint-disable-next-line no-lonely-if -- Can't be ignored by istanbul otherwise
    if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      throw new Error('The given element does not have a value setter');
    }
  }
}

Object.keys(eventAliasMap).forEach(function (aliasKey) {
  var key = eventAliasMap[aliasKey];

  fireEvent[aliasKey] = function () {
    return fireEvent[key].apply(fireEvent, arguments);
  };
});
/* eslint complexity:["error", 9] */

function unindent(string) {
  // remove white spaces first, to save a few bytes.
  // testing-playground will reformat on load any ways.
  return string.replace(/[ \t]*[\n][ \t]*/g, '\n');
}

function encode(value) {
  return lzString.compressToEncodedURIComponent(unindent(value));
}

function getPlaygroundUrl(markup) {
  return "https://testing-playground.com/#markup=" + encode(markup);
}

var debug = function debug(element, maxLength, options) {
  return Array.isArray(element) ? element.forEach(function (el) {
    return logDOM(el, maxLength, options);
  }) : logDOM(element, maxLength, options);
};

var logTestingPlaygroundURL = function logTestingPlaygroundURL(element) {
  if (element === void 0) {
    element = getDocument().body;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!element || !('innerHTML' in element)) {
    console.log("The element you're providing isn't a valid DOM element.");
    return;
  } // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition


  if (!element.innerHTML) {
    console.log("The provided element doesn't have any children.");
    return;
  }

  console.log("Open this URL in your browser\n\n" + getPlaygroundUrl(element.innerHTML));
};

var initialValue = {
  debug: debug,
  logTestingPlaygroundURL: logTestingPlaygroundURL
};
var screen = typeof document !== 'undefined' && document.body // eslint-disable-line @typescript-eslint/no-unnecessary-condition
? getQueriesForElement(document.body, queries, initialValue) : Object.keys(queries).reduce(function (helpers, key) {
  // `key` is for all intents and purposes the type of keyof `helpers`, which itself is the type of `initialValue` plus incoming properties from `queries`
  // if `Object.keys(something)` returned Array<keyof typeof something> this explicit type assertion would not be necessary
  // see https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
  helpers[key] = function () {
    throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
  };

  return helpers;
}, initialValue);

exports.prettyFormat = prettyFormat__namespace;
exports.buildQueries = buildQueries;
exports.configure = configure;
exports.createEvent = createEvent;
exports.findAllByAltText = findAllByAltText;
exports.findAllByDisplayValue = findAllByDisplayValue;
exports.findAllByLabelText = findAllByLabelText;
exports.findAllByPlaceholderText = findAllByPlaceholderText;
exports.findAllByRole = findAllByRole;
exports.findAllByTestId = findAllByTestId;
exports.findAllByText = findAllByText;
exports.findAllByTitle = findAllByTitle;
exports.findByAltText = findByAltText;
exports.findByDisplayValue = findByDisplayValue;
exports.findByLabelText = findByLabelText;
exports.findByPlaceholderText = findByPlaceholderText;
exports.findByRole = findByRole;
exports.findByTestId = findByTestId;
exports.findByText = findByText;
exports.findByTitle = findByTitle;
exports.fireEvent = fireEvent;
exports.getAllByAltText = getAllByAltText;
exports.getAllByDisplayValue = getAllByDisplayValue;
exports.getAllByLabelText = getAllByLabelTextWithSuggestions;
exports.getAllByPlaceholderText = getAllByPlaceholderText;
exports.getAllByRole = getAllByRole;
exports.getAllByTestId = getAllByTestId;
exports.getAllByText = getAllByText;
exports.getAllByTitle = getAllByTitle;
exports.getByAltText = getByAltText;
exports.getByDisplayValue = getByDisplayValue;
exports.getByLabelText = getByLabelTextWithSuggestions;
exports.getByPlaceholderText = getByPlaceholderText;
exports.getByRole = getByRole;
exports.getByTestId = getByTestId;
exports.getByText = getByText;
exports.getByTitle = getByTitle;
exports.getConfig = getConfig;
exports.getDefaultNormalizer = getDefaultNormalizer;
exports.getElementError = getElementError;
exports.getMultipleElementsFoundError = getMultipleElementsFoundError;
exports.getNodeText = getNodeText;
exports.getQueriesForElement = getQueriesForElement;
exports.getRoles = getRoles;
exports.getSuggestedQuery = getSuggestedQuery;
exports.isInaccessible = isInaccessible;
exports.logDOM = logDOM;
exports.logRoles = logRoles;
exports.makeFindQuery = makeFindQuery;
exports.makeGetAllQuery = makeGetAllQuery;
exports.makeSingleQuery = makeSingleQuery;
exports.prettyDOM = prettyDOM;
exports.queries = queries;
exports.queryAllByAltText = queryAllByAltTextWithSuggestions;
exports.queryAllByAttribute = queryAllByAttribute;
exports.queryAllByDisplayValue = queryAllByDisplayValueWithSuggestions;
exports.queryAllByLabelText = queryAllByLabelTextWithSuggestions;
exports.queryAllByPlaceholderText = queryAllByPlaceholderTextWithSuggestions;
exports.queryAllByRole = queryAllByRoleWithSuggestions;
exports.queryAllByTestId = queryAllByTestIdWithSuggestions;
exports.queryAllByText = queryAllByTextWithSuggestions;
exports.queryAllByTitle = queryAllByTitleWithSuggestions;
exports.queryByAltText = queryByAltText;
exports.queryByAttribute = queryByAttribute;
exports.queryByDisplayValue = queryByDisplayValue;
exports.queryByLabelText = queryByLabelText;
exports.queryByPlaceholderText = queryByPlaceholderText;
exports.queryByRole = queryByRole;
exports.queryByTestId = queryByTestId;
exports.queryByText = queryByText;
exports.queryByTitle = queryByTitle;
exports.queryHelpers = queryHelpers;
exports.screen = screen;
exports.waitFor = waitForWrapper;
exports.waitForElementToBeRemoved = waitForElementToBeRemoved;
exports.within = getQueriesForElement;
exports.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
exports.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;
