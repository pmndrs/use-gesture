"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  render: true,
  cleanup: true,
  act: true,
  fireEvent: true
};
exports.render = render;
exports.cleanup = cleanup;
Object.defineProperty(exports, "act", {
  enumerable: true,
  get: function () {
    return _actCompat.default;
  }
});
Object.defineProperty(exports, "fireEvent", {
  enumerable: true,
  get: function () {
    return _fireEvent.fireEvent;
  }
});

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _dom = require("@testing-library/dom");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _dom[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});

var _actCompat = _interopRequireWildcard(require("./act-compat"));

var _fireEvent = require("./fire-event");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _dom.configure)({
  asyncWrapper: async cb => {
    let result;
    await (0, _actCompat.asyncAct)(async () => {
      result = await cb();
    });
    return result;
  },
  eventWrapper: cb => {
    let result;
    (0, _actCompat.default)(() => {
      result = cb();
    });
    return result;
  }
});
const mountedContainers = new Set();

function render(ui, {
  container,
  baseElement = container,
  queries,
  hydrate = false,
  wrapper: WrapperComponent
} = {}) {
  if (!baseElement) {
    // default to document.body instead of documentElement to avoid output of potentially-large
    // head elements (such as JSS style blocks) in debug output
    baseElement = document.body;
  }

  if (!container) {
    container = baseElement.appendChild(document.createElement('div'));
  } // we'll add it to the mounted containers regardless of whether it's actually
  // added to document.body so the cleanup method works regardless of whether
  // they're passing us a custom container or not.


  mountedContainers.add(container);

  const wrapUiIfNeeded = innerElement => WrapperComponent ? /*#__PURE__*/React.createElement(WrapperComponent, null, innerElement) : innerElement;

  (0, _actCompat.default)(() => {
    if (hydrate) {
      _reactDom.default.hydrate(wrapUiIfNeeded(ui), container);
    } else {
      _reactDom.default.render(wrapUiIfNeeded(ui), container);
    }
  });
  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options) => Array.isArray(el) ? // eslint-disable-next-line no-console
    el.forEach(e => console.log((0, _dom.prettyDOM)(e, maxLength, options))) : // eslint-disable-next-line no-console,
    console.log((0, _dom.prettyDOM)(el, maxLength, options)),
    unmount: () => {
      (0, _actCompat.default)(() => {
        _reactDom.default.unmountComponentAtNode(container);
      });
    },
    rerender: rerenderUi => {
      render(wrapUiIfNeeded(rerenderUi), {
        container,
        baseElement
      }); // Intentionally do not return anything to avoid unnecessarily complicating the API.
      // folks can use all the same utilities we return in the first place that are bound to the container
    },
    asFragment: () => {
      /* istanbul ignore else (old jsdom limitation) */
      if (typeof document.createRange === 'function') {
        return document.createRange().createContextualFragment(container.innerHTML);
      } else {
        const template = document.createElement('template');
        template.innerHTML = container.innerHTML;
        return template.content;
      }
    },
    ...(0, _dom.getQueriesForElement)(baseElement, queries)
  };
}

function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
} // maybe one day we'll expose this (perhaps even as a utility returned by render).
// but let's wait until someone asks for it.


function cleanupAtContainer(container) {
  (0, _actCompat.default)(() => {
    _reactDom.default.unmountComponentAtNode(container);
  });

  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }

  mountedContainers.delete(container);
} // just re-export everything from dom-testing-library
// NOTE: we're not going to export asyncAct because that's our own compatibility
// thing for people using react-dom@16.8.0. Anyone else doesn't need it and
// people should just upgrade anyway.

/* eslint func-name-matching:0 */