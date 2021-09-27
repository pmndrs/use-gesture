"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncAct = asyncAct;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var testUtils = _interopRequireWildcard(require("react-dom/test-utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const reactAct = testUtils.act;
const actSupported = reactAct !== undefined; // act is supported react-dom@16.8.0
// so for versions that don't have act from test utils
// we do this little polyfill. No warnings, but it's
// better than nothing.

function actPolyfill(cb) {
  _reactDom.default.unstable_batchedUpdates(cb);

  _reactDom.default.render( /*#__PURE__*/React.createElement("div", null), document.createElement('div'));
}

const act = reactAct || actPolyfill;
let youHaveBeenWarned = false;
let isAsyncActSupported = null;

function asyncAct(cb) {
  if (actSupported === true) {
    if (isAsyncActSupported === null) {
      return new Promise((resolve, reject) => {
        // patch console.error here
        const originalConsoleError = console.error;

        console.error = function error(...args) {
          /* if console.error fired *with that specific message* */

          /* istanbul ignore next */
          const firstArgIsString = typeof args[0] === 'string';

          if (firstArgIsString && args[0].indexOf('Warning: Do not await the result of calling ReactTestUtils.act') === 0) {
            // v16.8.6
            isAsyncActSupported = false;
          } else if (firstArgIsString && args[0].indexOf('Warning: The callback passed to ReactTestUtils.act(...) function must not return anything') === 0) {// no-op
          } else {
            originalConsoleError.apply(console, args);
          }
        };

        let cbReturn, result;

        try {
          result = reactAct(() => {
            cbReturn = cb();
            return cbReturn;
          });
        } catch (err) {
          console.error = originalConsoleError;
          reject(err);
          return;
        }

        result.then(() => {
          console.error = originalConsoleError; // if it got here, it means async act is supported

          isAsyncActSupported = true;
          resolve();
        }, err => {
          console.error = originalConsoleError;
          isAsyncActSupported = true;
          reject(err);
        }); // 16.8.6's act().then() doesn't call a resolve handler, so we need to manually flush here, sigh

        if (isAsyncActSupported === false) {
          console.error = originalConsoleError;
          /* istanbul ignore next */

          if (!youHaveBeenWarned) {
            // if act is supported and async act isn't and they're trying to use async
            // act, then they need to upgrade from 16.8 to 16.9.
            // This is a seamless upgrade, so we'll add a warning
            console.error(`It looks like you're using a version of react-dom that supports the "act" function, but not an awaitable version of "act" which you will need. Please upgrade to at least react-dom@16.9.0 to remove this warning.`);
            youHaveBeenWarned = true;
          }

          cbReturn.then(() => {
            // a faux-version.
            // todo - copy https://github.com/facebook/react/blob/master/packages/shared/enqueueTask.js
            Promise.resolve().then(() => {
              // use sync act to flush effects
              act(() => {});
              resolve();
            });
          }, reject);
        }
      });
    } else if (isAsyncActSupported === false) {
      // use the polyfill directly
      let result;
      act(() => {
        result = cb();
      });
      return result.then(() => {
        return Promise.resolve().then(() => {
          // use sync act to flush effects
          act(() => {});
        });
      });
    } // all good! regular act


    return act(cb);
  } // use the polyfill


  let result;
  act(() => {
    result = cb();
  });
  return result.then(() => {
    return Promise.resolve().then(() => {
      // use sync act to flush effects
      act(() => {});
    });
  });
}

var _default = act;
/* eslint no-console:0 */

exports.default = _default;