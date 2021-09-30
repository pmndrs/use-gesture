"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowFromNode = getWindowFromNode;
exports.getDocument = getDocument;
exports.runWithRealTimers = runWithRealTimers;
exports.checkContainerType = checkContainerType;
exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
exports.TEXT_NODE = exports.setTimeout = exports.setImmediate = exports.clearTimeout = void 0;
const globalObj = typeof window === 'undefined' ? global : window; // Constant node.nodeType for text nodes, see:
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants

const TEXT_NODE = 3; // Currently this fn only supports jest timers, but it could support other test runners in the future.

exports.TEXT_NODE = TEXT_NODE;

function runWithRealTimers(callback) {
  return hasJestTimers() ? runWithJestRealTimers(callback).callbackReturnValue : // istanbul ignore next
  callback();
}

function hasJestTimers() {
  return typeof jest !== 'undefined' && jest !== null && typeof jest.useRealTimers === 'function';
}

function runWithJestRealTimers(callback) {
  const timerAPI = {
    clearInterval,
    clearTimeout,
    setInterval,
    setTimeout
  }; // For more on why we have the check here,
  // checkout https://github.com/testing-library/dom-testing-library/issues/914

  if (typeof setImmediate === 'function') {
    timerAPI.setImmediate = setImmediate;
  }

  if (typeof clearImmediate === 'function') {
    timerAPI.clearImmediate = clearImmediate;
  }

  jest.useRealTimers();
  const callbackReturnValue = callback();
  const usedFakeTimers = Object.entries(timerAPI).some(([name, func]) => func !== globalObj[name]);

  if (usedFakeTimers) {
    var _timerAPI$setTimeout;

    jest.useFakeTimers((_timerAPI$setTimeout = timerAPI.setTimeout) != null && _timerAPI$setTimeout.clock ? 'modern' : 'legacy');
  }

  return {
    callbackReturnValue,
    usedFakeTimers
  };
}

function jestFakeTimersAreEnabled() {
  return hasJestTimers() ? runWithJestRealTimers(() => {}).usedFakeTimers : // istanbul ignore next
  false;
} // we only run our tests in node, and setImmediate is supported in node.
// istanbul ignore next


function setImmediatePolyfill(fn) {
  return globalObj.setTimeout(fn, 0);
}

function getTimeFunctions() {
  // istanbul ignore next
  return {
    clearTimeoutFn: globalObj.clearTimeout,
    setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
    setTimeoutFn: globalObj.setTimeout
  };
}

const {
  clearTimeoutFn,
  setImmediateFn,
  setTimeoutFn
} = runWithRealTimers(getTimeFunctions);
exports.setTimeout = setTimeoutFn;
exports.setImmediate = setImmediateFn;
exports.clearTimeout = clearTimeoutFn;

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
    throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
  } else if (Array.isArray(node)) {
    throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
  } else if (typeof node.debug === 'function' && typeof node.logTestingPlaygroundURL === 'function') {
    throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
  } else {
    // The user passed something unusual to a calling function
    throw new Error(`Unable to find the "window" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new`);
  }
}

function checkContainerType(container) {
  if (!container || !(typeof container.querySelector === 'function') || !(typeof container.querySelectorAll === 'function')) {
    throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
  }

  function getTypeName(object) {
    if (typeof object === 'object') {
      return object === null ? 'null' : object.constructor.name;
    }

    return typeof object;
  }
}