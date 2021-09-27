"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitForDomChange = waitForDomChangeWrapper;

var _helpers = require("./helpers");

var _config = require("./config");

let hasWarned = false; // deprecated... TODO: remove this method. People should use wait instead
// the reasoning is that waiting for just any DOM change is an implementation
// detail. People should be waiting for a specific thing to change.

function waitForDomChange({
  container = (0, _helpers.getDocument)(),
  timeout = (0, _config.getConfig)().asyncUtilTimeout,
  mutationObserverOptions = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  }
} = {}) {
  if (!hasWarned) {
    hasWarned = true;
    console.warn(`\`waitForDomChange\` has been deprecated. Use \`waitFor\` instead: https://testing-library.com/docs/dom-testing-library/api-async#waitfor.`);
  }

  return new Promise((resolve, reject) => {
    const timer = (0, _helpers.setTimeout)(onTimeout, timeout);
    const {
      MutationObserver
    } = (0, _helpers.getWindowFromNode)(container);
    const observer = new MutationObserver(onMutation);
    (0, _helpers.runWithRealTimers)(() => observer.observe(container, mutationObserverOptions));

    function onDone(error, result) {
      (0, _helpers.clearTimeout)(timer);
      (0, _helpers.setImmediate)(() => observer.disconnect());

      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }

    function onMutation(mutationsList) {
      onDone(null, mutationsList);
    }

    function onTimeout() {
      onDone(new Error('Timed out in waitForDomChange.'), null);
    }
  });
}

function waitForDomChangeWrapper(...args) {
  return (0, _config.getConfig)().asyncWrapper(() => waitForDomChange(...args));
}