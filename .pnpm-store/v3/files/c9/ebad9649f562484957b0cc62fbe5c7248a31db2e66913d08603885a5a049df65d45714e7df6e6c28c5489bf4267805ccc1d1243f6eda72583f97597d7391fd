'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var lodash_1 = require('lodash');
var signalExit = require('signal-exit');
var require$$0$1 = require('yoga-layout-prebuilt');
var stripAnsi = require('strip-ansi');
var require$$0$2 = require('chalk');
var stream_1 = require('stream');
var require$$0$4 = require('fs');
var require$$0$3 = require('module');
var redux = require('../../redux');
var gatsbyCoreUtils = require('gatsby-core-utils');
var gatsbyTelemetry = require('gatsby-telemetry');
var convertHrtime = require('convert-hrtime');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var lodash_1__default = /*#__PURE__*/_interopDefaultLegacy(lodash_1);
var signalExit__default = /*#__PURE__*/_interopDefaultLegacy(signalExit);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var stripAnsi__default = /*#__PURE__*/_interopDefaultLegacy(stripAnsi);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var stream_1__default = /*#__PURE__*/_interopDefaultLegacy(stream_1);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$4);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);
var convertHrtime__default = /*#__PURE__*/_interopDefaultLegacy(convertHrtime);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var n = "function" === typeof Symbol && Symbol.for,
    p = n ? Symbol.for("react.element") : 60103,
    q = n ? Symbol.for("react.portal") : 60106,
    r = n ? Symbol.for("react.fragment") : 60107,
    t = n ? Symbol.for("react.strict_mode") : 60108,
    u = n ? Symbol.for("react.profiler") : 60114,
    v = n ? Symbol.for("react.provider") : 60109,
    w = n ? Symbol.for("react.context") : 60110,
    x = n ? Symbol.for("react.forward_ref") : 60112,
    y = n ? Symbol.for("react.suspense") : 60113,
    z = n ? Symbol.for("react.memo") : 60115,
    A = n ? Symbol.for("react.lazy") : 60116,
    B = "function" === typeof Symbol && Symbol.iterator;

function C(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var D = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
},
    E = {};

function F(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

F.prototype.isReactComponent = {};

F.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(C(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

F.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function G() {}

G.prototype = F.prototype;

function H(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = E;
  this.updater = c || D;
}

var I = H.prototype = new G();
I.constructor = H;
objectAssign(I, F.prototype);
I.isPureReactComponent = !0;
var J = {
  current: null
},
    K = Object.prototype.hasOwnProperty,
    L = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function M(a, b, c) {
  var e,
      d = {},
      g = null,
      k = null;
  if (null != b) for (e in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
  var f = arguments.length - 2;
  if (1 === f) d.children = c;else if (1 < f) {
    for (var h = Array(f), m = 0; m < f; m++) h[m] = arguments[m + 2];

    d.children = h;
  }
  if (a && a.defaultProps) for (e in f = a.defaultProps, f) void 0 === d[e] && (d[e] = f[e]);
  return {
    $$typeof: p,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: J.current
  };
}

function N(a, b) {
  return {
    $$typeof: p,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function O(a) {
  return "object" === typeof a && null !== a && a.$$typeof === p;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var P = /\/+/g,
    Q = [];

function R(a, b, c, e) {
  if (Q.length) {
    var d = Q.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = c;
    d.context = e;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: c,
    context: e,
    count: 0
  };
}

function S(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > Q.length && Q.push(a);
}

function T(a, b, c, e) {
  var d = typeof a;
  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case p:
        case q:
          g = !0;
      }

  }
  if (g) return c(e, a, "" === b ? "." + U(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + U(d, k);
    g += T(d, f, c, e);
  } else if (null === a || "object" !== typeof a ? f = null : (f = B && a[B] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) d = d.value, f = b + U(d, k++), g += T(d, f, c, e);else if ("object" === d) throw c = "" + a, Error(C(31, "[object Object]" === c ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
  return g;
}

function V(a, b, c) {
  return null == a ? 0 : T(a, "", b, c);
}

function U(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}

function W(a, b) {
  a.func.call(a.context, b, a.count++);
}

function aa(a, b, c) {
  var e = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? X(a, e, c, function (a) {
    return a;
  }) : null != a && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
}

function X(a, b, c, e, d) {
  var g = "";
  null != c && (g = ("" + c).replace(P, "$&/") + "/");
  b = R(b, g, e, d);
  V(a, aa, b);
  S(b);
}

var Y = {
  current: null
};

function Z() {
  var a = Y.current;
  if (null === a) throw Error(C(321));
  return a;
}

var ba = {
  ReactCurrentDispatcher: Y,
  ReactCurrentBatchConfig: {
    suspense: null
  },
  ReactCurrentOwner: J,
  IsSomeRendererActing: {
    current: !1
  },
  assign: objectAssign
};
var Children = {
  map: function (a, b, c) {
    if (null == a) return a;
    var e = [];
    X(a, e, null, b, c);
    return e;
  },
  forEach: function (a, b, c) {
    if (null == a) return a;
    b = R(null, null, b, c);
    V(a, W, b);
    S(b);
  },
  count: function (a) {
    return V(a, function () {
      return null;
    }, null);
  },
  toArray: function (a) {
    var b = [];
    X(a, b, null, function (a) {
      return a;
    });
    return b;
  },
  only: function (a) {
    if (!O(a)) throw Error(C(143));
    return a;
  }
};
var Component = F;
var Fragment = r;
var Profiler = u;
var PureComponent = H;
var StrictMode = t;
var Suspense = y;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;

var cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(C(267, a));
  var e = objectAssign({}, a.props),
      d = a.key,
      g = a.ref,
      k = a._owner;

  if (null != b) {
    void 0 !== b.ref && (g = b.ref, k = J.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

    for (h in b) K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
  }

  var h = arguments.length - 2;
  if (1 === h) e.children = c;else if (1 < h) {
    f = Array(h);

    for (var m = 0; m < h; m++) f[m] = arguments[m + 2];

    e.children = f;
  }
  return {
    $$typeof: p,
    type: a.type,
    key: d,
    ref: g,
    props: e,
    _owner: k
  };
};

var createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: w,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: v,
    _context: a
  };
  return a.Consumer = a;
};

var createElement = M;

var createFactory = function (a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};

var createRef = function () {
  return {
    current: null
  };
};

var forwardRef = function (a) {
  return {
    $$typeof: x,
    render: a
  };
};

var isValidElement = O;

var lazy = function (a) {
  return {
    $$typeof: A,
    _ctor: a,
    _status: -1,
    _result: null
  };
};

var memo = function (a, b) {
  return {
    $$typeof: z,
    type: a,
    compare: void 0 === b ? null : b
  };
};

var useCallback = function (a, b) {
  return Z().useCallback(a, b);
};

var useContext = function (a, b) {
  return Z().useContext(a, b);
};

var useDebugValue = function () {};

var useEffect = function (a, b) {
  return Z().useEffect(a, b);
};

var useImperativeHandle = function (a, b, c) {
  return Z().useImperativeHandle(a, b, c);
};

var useLayoutEffect = function (a, b) {
  return Z().useLayoutEffect(a, b);
};

var useMemo = function (a, b) {
  return Z().useMemo(a, b);
};

var useReducer = function (a, b, c) {
  return Z().useReducer(a, b, c);
};

var useRef = function (a) {
  return Z().useRef(a);
};

var useState = function (a) {
  return Z().useState(a);
};

var version = "16.14.0";

var react_production_min = {
	Children: Children,
	Component: Component,
	Fragment: Fragment,
	Profiler: Profiler,
	PureComponent: PureComponent,
	StrictMode: StrictMode,
	Suspense: Suspense,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
	cloneElement: cloneElement,
	createContext: createContext,
	createElement: createElement,
	createFactory: createFactory,
	createRef: createRef,
	forwardRef: forwardRef,
	isValidElement: isValidElement,
	lazy: lazy,
	memo: memo,
	useCallback: useCallback,
	useContext: useContext,
	useDebugValue: useDebugValue,
	useEffect: useEffect,
	useImperativeHandle: useImperativeHandle,
	useLayoutEffect: useLayoutEffect,
	useMemo: useMemo,
	useReducer: useReducer,
	useRef: useRef,
	useState: useState,
	version: version
};

var react = createCommonjsModule(function (module) {

{
  module.exports = react_production_min;
}
});

var ansiEscapes_1 = createCommonjsModule(function (module) {

const ansiEscapes = module.exports; // TODO: remove this in the next major version

module.exports.default = ansiEscapes;
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = process.env.TERM_PROGRAM === 'Apple_Terminal';

ansiEscapes.cursorTo = (x, y) => {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  if (typeof y !== 'number') {
    return ESC + (x + 1) + 'G';
  }

  return ESC + (y + 1) + ';' + (x + 1) + 'H';
};

ansiEscapes.cursorMove = (x, y) => {
  if (typeof x !== 'number') {
    throw new TypeError('The `x` argument is required');
  }

  let ret = '';

  if (x < 0) {
    ret += ESC + -x + 'D';
  } else if (x > 0) {
    ret += ESC + x + 'C';
  }

  if (y < 0) {
    ret += ESC + -y + 'A';
  } else if (y > 0) {
    ret += ESC + y + 'B';
  }

  return ret;
};

ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';

ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';

ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';

ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

ansiEscapes.cursorLeft = ESC + 'G';
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
ansiEscapes.cursorGetPosition = ESC + '6n';
ansiEscapes.cursorNextLine = ESC + 'E';
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

ansiEscapes.eraseLines = count => {
  let clear = '';

  for (let i = 0; i < count; i++) {
    clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
  }

  if (count) {
    clear += ansiEscapes.cursorLeft;
  }

  return clear;
};

ansiEscapes.eraseEndLine = ESC + 'K';
ansiEscapes.eraseStartLine = ESC + '1K';
ansiEscapes.eraseLine = ESC + '2K';
ansiEscapes.eraseDown = ESC + 'J';
ansiEscapes.eraseUp = ESC + '1J';
ansiEscapes.eraseScreen = ESC + '2J';
ansiEscapes.scrollUp = ESC + 'S';
ansiEscapes.scrollDown = ESC + 'T';
ansiEscapes.clearScreen = '\u001Bc';
ansiEscapes.clearTerminal = process.platform === 'win32' ? `${ansiEscapes.eraseScreen}${ESC}0f` : // 1. Erases the screen (Only done in case `2` is not supported)
// 2. Erases the whole screen including scrollback buffer
// 3. Moves cursor to the top-left position
// More info: https://www.real-world-systems.com/docs/ANSIcode.html
`${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;
ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => {
  return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
};

ansiEscapes.image = (buffer, options = {}) => {
  let ret = `${OSC}1337;File=inline=1`;

  if (options.width) {
    ret += `;width=${options.width}`;
  }

  if (options.height) {
    ret += `;height=${options.height}`;
  }

  if (options.preserveAspectRatio === false) {
    ret += ';preserveAspectRatio=0';
  }

  return ret + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
  setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
  annotation: (message, options = {}) => {
    let ret = `${OSC}1337;`;
    const hasX = typeof options.x !== 'undefined';
    const hasY = typeof options.y !== 'undefined';

    if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
      throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
    }

    message = message.replace(/\|/g, '');
    ret += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

    if (options.length > 0) {
      ret += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join('|');
    } else {
      ret += message;
    }

    return ret + BEL;
  }
};
});

const mimicFn = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
  }

  return to;
};

var mimicFn_1 = mimicFn; // TODO: Remove this for the next major release

var _default$J = mimicFn;
mimicFn_1.default = _default$J;

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
  if (typeof function_ !== 'function') {
    throw new TypeError('Expected a function');
  }

  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || '<anonymous>';

  const onetime = function (...arguments_) {
    calledFunctions.set(onetime, ++callCount);

    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }

    return returnValue;
  };

  mimicFn_1(onetime, function_);
  calledFunctions.set(onetime, callCount);
  return onetime;
};

var onetime_1 = onetime; // TODO: Remove this for the next major release

var _default$I = onetime;

var callCount = function_ => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }

  return calledFunctions.get(function_);
};
onetime_1.default = _default$I;
onetime_1.callCount = callCount;

var restoreCursor = onetime_1(() => {
  signalExit__default['default'](() => {
    process.stderr.write('\u001B[?25h');
  }, {
    alwaysLast: true
  });
});

var cliCursor = createCommonjsModule(function (module, exports) {



let isHidden = false;

exports.show = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }

  isHidden = false;
  writableStream.write('\u001B[?25h');
};

exports.hide = (writableStream = process.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }

  restoreCursor();
  isHidden = true;
  writableStream.write('\u001B[?25l');
};

exports.toggle = (force, writableStream) => {
  if (force !== undefined) {
    isHidden = force;
  }

  if (isHidden) {
    exports.show(writableStream);
  } else {
    exports.hide(writableStream);
  }
};
});

var __importDefault$p = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const ansi_escapes_1$1 = __importDefault$p(ansiEscapes_1);

const cli_cursor_1$1 = __importDefault$p(cliCursor);

const create = (stream, {
  showCursor = false
} = {}) => {
  let previousLineCount = 0;
  let previousOutput = '';
  let hasHiddenCursor = false;

  const render = str => {
    if (!showCursor && !hasHiddenCursor) {
      cli_cursor_1$1.default.hide();
      hasHiddenCursor = true;
    }

    const output = str + '\n';

    if (output === previousOutput) {
      return;
    }

    previousOutput = output;
    stream.write(ansi_escapes_1$1.default.eraseLines(previousLineCount) + output);
    previousLineCount = output.split('\n').length;
  };

  render.clear = () => {
    stream.write(ansi_escapes_1$1.default.eraseLines(previousLineCount));
    previousOutput = '';
    previousLineCount = 0;
  };

  render.done = () => {
    previousOutput = '';
    previousLineCount = 0;

    if (!showCursor) {
      cli_cursor_1$1.default.show();
      hasHiddenCursor = false;
    }
  };

  return render;
};

var _default$H = {
  create
};

var logUpdate = /*#__PURE__*/Object.defineProperty({
	default: _default$H
}, '__esModule', {value: true});

var vendors = [{
  name: "AppVeyor",
  constant: "APPVEYOR",
  env: "APPVEYOR",
  pr: "APPVEYOR_PULL_REQUEST_NUMBER"
}, {
  name: "Azure Pipelines",
  constant: "AZURE_PIPELINES",
  env: "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",
  pr: "SYSTEM_PULLREQUEST_PULLREQUESTID"
}, {
  name: "Bamboo",
  constant: "BAMBOO",
  env: "bamboo_planKey"
}, {
  name: "Bitbucket Pipelines",
  constant: "BITBUCKET",
  env: "BITBUCKET_COMMIT",
  pr: "BITBUCKET_PR_ID"
}, {
  name: "Bitrise",
  constant: "BITRISE",
  env: "BITRISE_IO",
  pr: "BITRISE_PULL_REQUEST"
}, {
  name: "Buddy",
  constant: "BUDDY",
  env: "BUDDY_WORKSPACE_ID",
  pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
}, {
  name: "Buildkite",
  constant: "BUILDKITE",
  env: "BUILDKITE",
  pr: {
    env: "BUILDKITE_PULL_REQUEST",
    ne: "false"
  }
}, {
  name: "CircleCI",
  constant: "CIRCLE",
  env: "CIRCLECI",
  pr: "CIRCLE_PULL_REQUEST"
}, {
  name: "Cirrus CI",
  constant: "CIRRUS",
  env: "CIRRUS_CI",
  pr: "CIRRUS_PR"
}, {
  name: "AWS CodeBuild",
  constant: "CODEBUILD",
  env: "CODEBUILD_BUILD_ARN"
}, {
  name: "Codeship",
  constant: "CODESHIP",
  env: {
    CI_NAME: "codeship"
  }
}, {
  name: "Drone",
  constant: "DRONE",
  env: "DRONE",
  pr: {
    DRONE_BUILD_EVENT: "pull_request"
  }
}, {
  name: "dsari",
  constant: "DSARI",
  env: "DSARI"
}, {
  name: "GitLab CI",
  constant: "GITLAB",
  env: "GITLAB_CI"
}, {
  name: "GoCD",
  constant: "GOCD",
  env: "GO_PIPELINE_LABEL"
}, {
  name: "Hudson",
  constant: "HUDSON",
  env: "HUDSON_URL"
}, {
  name: "Jenkins",
  constant: "JENKINS",
  env: ["JENKINS_URL", "BUILD_ID"],
  pr: {
    any: ["ghprbPullId", "CHANGE_ID"]
  }
}, {
  name: "Magnum CI",
  constant: "MAGNUM",
  env: "MAGNUM"
}, {
  name: "Netlify CI",
  constant: "NETLIFY",
  env: "NETLIFY_BUILD_BASE",
  pr: {
    env: "PULL_REQUEST",
    ne: "false"
  }
}, {
  name: "Sail CI",
  constant: "SAIL",
  env: "SAILCI",
  pr: "SAIL_PULL_REQUEST_NUMBER"
}, {
  name: "Semaphore",
  constant: "SEMAPHORE",
  env: "SEMAPHORE",
  pr: "PULL_REQUEST_NUMBER"
}, {
  name: "Shippable",
  constant: "SHIPPABLE",
  env: "SHIPPABLE",
  pr: {
    IS_PULL_REQUEST: "true"
  }
}, {
  name: "Solano CI",
  constant: "SOLANO",
  env: "TDDIUM",
  pr: "TDDIUM_PR_ID"
}, {
  name: "Strider CD",
  constant: "STRIDER",
  env: "STRIDER"
}, {
  name: "TaskCluster",
  constant: "TASKCLUSTER",
  env: ["TASK_ID", "RUN_ID"]
}, {
  name: "TeamCity",
  constant: "TEAMCITY",
  env: "TEAMCITY_VERSION"
}, {
  name: "Travis CI",
  constant: "TRAVIS",
  env: "TRAVIS",
  pr: {
    env: "TRAVIS_PULL_REQUEST",
    ne: "false"
  }
}];

var ciInfo = createCommonjsModule(function (module, exports) {



var env = process.env; // Used for testing only

Object.defineProperty(exports, '_vendors', {
  value: vendors.map(function (v) {
    return v.constant;
  })
});
exports.name = null;
exports.isPR = null;
vendors.forEach(function (vendor) {
  var envs = Array.isArray(vendor.env) ? vendor.env : [vendor.env];
  var isCI = envs.every(function (obj) {
    return checkEnv(obj);
  });
  exports[vendor.constant] = isCI;

  if (isCI) {
    exports.name = vendor.name;

    switch (typeof vendor.pr) {
      case 'string':
        // "pr": "CIRRUS_PR"
        exports.isPR = !!env[vendor.pr];
        break;

      case 'object':
        if ('env' in vendor.pr) {
          // "pr": { "env": "BUILDKITE_PULL_REQUEST", "ne": "false" }
          exports.isPR = vendor.pr.env in env && env[vendor.pr.env] !== vendor.pr.ne;
        } else if ('any' in vendor.pr) {
          // "pr": { "any": ["ghprbPullId", "CHANGE_ID"] }
          exports.isPR = vendor.pr.any.some(function (key) {
            return !!env[key];
          });
        } else {
          // "pr": { "DRONE_BUILD_EVENT": "pull_request" }
          exports.isPR = checkEnv(vendor.pr);
        }

        break;

      default:
        // PR detection not supported for this vendor
        exports.isPR = null;
    }
  }
});
exports.isCI = !!(env.CI || // Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
env.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
env.BUILD_NUMBER || // Jenkins, TeamCity
env.RUN_ID || // TaskCluster, dsari
exports.name || false);

function checkEnv(obj) {
  if (typeof obj === 'string') return !!env[obj];
  return Object.keys(obj).every(function (k) {
    return env[k] === obj[k];
  });
}
});

var isCi = ciInfo.isCI;

const getAllProperties = object => {
  const properties = new Set();

  do {
    for (const key of Reflect.ownKeys(object)) {
      properties.add([object, key]);
    }
  } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

  return properties;
};

var autoBind = (self, {
  include,
  exclude
} = {}) => {
  const filter = key => {
    const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);

    if (include) {
      return include.some(match);
    }

    if (exclude) {
      return !exclude.some(match);
    }

    return true;
  };

  for (const [object, key] of getAllProperties(self.constructor.prototype)) {
    if (key === 'constructor' || !filter(key)) {
      continue;
    }

    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);

    if (descriptor && typeof descriptor.value === 'function') {
      self[key] = self[key].bind(self);
    }
  }

  return self;
};

/** @license React v0.18.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var scheduler_production_min = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: !0
});
var f, g, h, k, l;

if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var p = null,
      q = null,
      t = function () {
    if (null !== p) try {
      var a = exports.unstable_now();
      p(!0, a);
      p = null;
    } catch (b) {
      throw setTimeout(t, 0), b;
    }
  },
      u = Date.now();

  exports.unstable_now = function () {
    return Date.now() - u;
  };

  f = function (a) {
    null !== p ? setTimeout(f, 0, a) : (p = a, setTimeout(t, 0));
  };

  g = function (a, b) {
    q = setTimeout(a, b);
  };

  h = function () {
    clearTimeout(q);
  };

  k = function () {
    return !1;
  };

  l = exports.unstable_forceFrameRate = function () {};
} else {
  var w = window.performance,
      x = window.Date,
      y = window.setTimeout,
      z = window.clearTimeout;

  if ("undefined" !== typeof console) {
    var A = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
    "function" !== typeof A && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }

  if ("object" === typeof w && "function" === typeof w.now) exports.unstable_now = function () {
    return w.now();
  };else {
    var B = x.now();

    exports.unstable_now = function () {
      return x.now() - B;
    };
  }
  var C = !1,
      D = null,
      E = -1,
      F = 5,
      G = 0;

  k = function () {
    return exports.unstable_now() >= G;
  };

  l = function () {};

  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1E3 / a) : 5;
  };

  var H = new MessageChannel(),
      I = H.port2;

  H.port1.onmessage = function () {
    if (null !== D) {
      var a = exports.unstable_now();
      G = a + F;

      try {
        D(!0, a) ? I.postMessage(null) : (C = !1, D = null);
      } catch (b) {
        throw I.postMessage(null), b;
      }
    } else C = !1;
  };

  f = function (a) {
    D = a;
    C || (C = !0, I.postMessage(null));
  };

  g = function (a, b) {
    E = y(function () {
      a(exports.unstable_now());
    }, b);
  };

  h = function () {
    z(E);
    E = -1;
  };
}

function J(a, b) {
  var c = a.length;
  a.push(b);

  a: for (;;) {
    var d = Math.floor((c - 1) / 2),
        e = a[d];
    if (void 0 !== e && 0 < K(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}

function L(a) {
  a = a[0];
  return void 0 === a ? null : a;
}

function M(a) {
  var b = a[0];

  if (void 0 !== b) {
    var c = a.pop();

    if (c !== b) {
      a[0] = c;

      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
            n = a[m],
            v = m + 1,
            r = a[v];
        if (void 0 !== n && 0 > K(n, c)) void 0 !== r && 0 > K(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > K(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }

    return b;
  }

  return null;
}

function K(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}

var N = [],
    O = [],
    P = 1,
    Q = null,
    R = 3,
    S = !1,
    T = !1,
    U = !1;

function V(a) {
  for (var b = L(O); null !== b;) {
    if (null === b.callback) M(O);else if (b.startTime <= a) M(O), b.sortIndex = b.expirationTime, J(N, b);else break;
    b = L(O);
  }
}

function W(a) {
  U = !1;
  V(a);
  if (!T) if (null !== L(N)) T = !0, f(X);else {
    var b = L(O);
    null !== b && g(W, b.startTime - a);
  }
}

function X(a, b) {
  T = !1;
  U && (U = !1, h());
  S = !0;
  var c = R;

  try {
    V(b);

    for (Q = L(N); null !== Q && (!(Q.expirationTime > b) || a && !k());) {
      var d = Q.callback;

      if (null !== d) {
        Q.callback = null;
        R = Q.priorityLevel;
        var e = d(Q.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? Q.callback = e : Q === L(N) && M(N);
        V(b);
      } else M(N);

      Q = L(N);
    }

    if (null !== Q) var m = !0;else {
      var n = L(O);
      null !== n && g(W, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    Q = null, R = c, S = !1;
  }
}

function Y(a) {
  switch (a) {
    case 1:
      return -1;

    case 2:
      return 250;

    case 5:
      return 1073741823;

    case 4:
      return 1E4;

    default:
      return 5E3;
  }
}

var Z = l;
exports.unstable_ImmediatePriority = 1;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_NormalPriority = 3;
exports.unstable_IdlePriority = 5;
exports.unstable_LowPriority = 4;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = R;
  R = a;

  try {
    return b();
  } finally {
    R = c;
  }
};

exports.unstable_next = function (a) {
  switch (R) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = R;
  }

  var c = R;
  R = b;

  try {
    return a();
  } finally {
    R = c;
  }
};

exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();

  if ("object" === typeof c && null !== c) {
    var e = c.delay;
    e = "number" === typeof e && 0 < e ? d + e : d;
    c = "number" === typeof c.timeout ? c.timeout : Y(a);
  } else c = Y(a), e = d;

  c = e + c;
  a = {
    id: P++,
    callback: b,
    priorityLevel: a,
    startTime: e,
    expirationTime: c,
    sortIndex: -1
  };
  e > d ? (a.sortIndex = e, J(O, a), null === L(N) && a === L(O) && (U ? h() : U = !0, g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = !0, f(X)));
  return a;
};

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_wrapCallback = function (a) {
  var b = R;
  return function () {
    var c = R;
    R = b;

    try {
      return a.apply(this, arguments);
    } finally {
      R = c;
    }
  };
};

exports.unstable_getCurrentPriorityLevel = function () {
  return R;
};

exports.unstable_shouldYield = function () {
  var a = exports.unstable_now();
  V(a);
  var b = L(N);
  return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
};

exports.unstable_requestPaint = Z;

exports.unstable_continueExecution = function () {
  T || S || (T = !0, f(X));
};

exports.unstable_pauseExecution = function () {};

exports.unstable_getFirstCallbackNode = function () {
  return L(N);
};

exports.unstable_Profiling = null;
});

var scheduler = createCommonjsModule(function (module) {

{
  module.exports = scheduler_production_min;
}
});

/** @license React v0.24.0
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var reactReconciler_production_min = createCommonjsModule(function (module) {
module.exports = function $$$reconciler($$$hostConfig) {

  var aa = objectAssign,
      ba = react,
      m = scheduler;

  function n(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  var q = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  q.hasOwnProperty("ReactCurrentDispatcher") || (q.ReactCurrentDispatcher = {
    current: null
  });
  q.hasOwnProperty("ReactCurrentBatchConfig") || (q.ReactCurrentBatchConfig = {
    suspense: null
  });
  var u = "function" === typeof Symbol && Symbol.for,
      ca = u ? Symbol.for("react.element") : 60103,
      da = u ? Symbol.for("react.portal") : 60106,
      ea = u ? Symbol.for("react.fragment") : 60107,
      fa = u ? Symbol.for("react.strict_mode") : 60108,
      ha = u ? Symbol.for("react.profiler") : 60114,
      ia = u ? Symbol.for("react.provider") : 60109,
      ja = u ? Symbol.for("react.context") : 60110,
      ka = u ? Symbol.for("react.concurrent_mode") : 60111,
      la = u ? Symbol.for("react.forward_ref") : 60112,
      ma = u ? Symbol.for("react.suspense") : 60113,
      na = u ? Symbol.for("react.suspense_list") : 60120,
      oa = u ? Symbol.for("react.memo") : 60115,
      pa = u ? Symbol.for("react.lazy") : 60116;
  var qa = "function" === typeof Symbol && Symbol.iterator;

  function ra(a) {
    if (null === a || "object" !== typeof a) return null;
    a = qa && a[qa] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }

  function sa(a) {
    if (-1 === a._status) {
      a._status = 0;
      var b = a._ctor;
      b = b();
      a._result = b;
      b.then(function (b) {
        0 === a._status && (b = b.default, a._status = 1, a._result = b);
      }, function (b) {
        0 === a._status && (a._status = 2, a._result = b);
      });
    }
  }

  function ta(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;

    switch (a) {
      case ea:
        return "Fragment";

      case da:
        return "Portal";

      case ha:
        return "Profiler";

      case fa:
        return "StrictMode";

      case ma:
        return "Suspense";

      case na:
        return "SuspenseList";
    }

    if ("object" === typeof a) switch (a.$$typeof) {
      case ja:
        return "Context.Consumer";

      case ia:
        return "Context.Provider";

      case la:
        var b = a.render;
        b = b.displayName || b.name || "";
        return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

      case oa:
        return ta(a.type);

      case pa:
        if (a = 1 === a._status ? a._result : null) return ta(a);
    }
    return null;
  }

  function ua(a) {
    var b = a,
        c = a;
    if (a.alternate) for (; b.return;) b = b.return;else {
      a = b;

      do b = a, 0 !== (b.effectTag & 1026) && (c = b.return), a = b.return; while (a);
    }
    return 3 === b.tag ? c : null;
  }

  function va(a) {
    if (ua(a) !== a) throw Error(n(188));
  }

  function wa(a) {
    var b = a.alternate;

    if (!b) {
      b = ua(a);
      if (null === b) throw Error(n(188));
      return b !== a ? null : a;
    }

    for (var c = a, d = b;;) {
      var e = c.return;
      if (null === e) break;
      var f = e.alternate;

      if (null === f) {
        d = e.return;

        if (null !== d) {
          c = d;
          continue;
        }

        break;
      }

      if (e.child === f.child) {
        for (f = e.child; f;) {
          if (f === c) return va(e), a;
          if (f === d) return va(e), b;
          f = f.sibling;
        }

        throw Error(n(188));
      }

      if (c.return !== d.return) c = e, d = f;else {
        for (var g = !1, l = e.child; l;) {
          if (l === c) {
            g = !0;
            c = e;
            d = f;
            break;
          }

          if (l === d) {
            g = !0;
            d = e;
            c = f;
            break;
          }

          l = l.sibling;
        }

        if (!g) {
          for (l = f.child; l;) {
            if (l === c) {
              g = !0;
              c = f;
              d = e;
              break;
            }

            if (l === d) {
              g = !0;
              d = f;
              c = e;
              break;
            }

            l = l.sibling;
          }

          if (!g) throw Error(n(189));
        }
      }
      if (c.alternate !== d) throw Error(n(190));
    }

    if (3 !== c.tag) throw Error(n(188));
    return c.stateNode.current === c ? a : b;
  }

  function xa(a) {
    a = wa(a);
    if (!a) return null;

    for (var b = a;;) {
      if (5 === b.tag || 6 === b.tag) return b;
      if (b.child) b.child.return = b, b = b.child;else {
        if (b === a) break;

        for (; !b.sibling;) {
          if (!b.return || b.return === a) return null;
          b = b.return;
        }

        b.sibling.return = b.return;
        b = b.sibling;
      }
    }

    return null;
  }

  function ya(a) {
    a = wa(a);
    if (!a) return null;

    for (var b = a;;) {
      if (5 === b.tag || 6 === b.tag) return b;
      if (b.child && 4 !== b.tag) b.child.return = b, b = b.child;else {
        if (b === a) break;

        for (; !b.sibling;) {
          if (!b.return || b.return === a) return null;
          b = b.return;
        }

        b.sibling.return = b.return;
        b = b.sibling;
      }
    }

    return null;
  }

  var za = $$$hostConfig.getPublicInstance,
      Aa = $$$hostConfig.getRootHostContext,
      Ba = $$$hostConfig.getChildHostContext,
      Ca = $$$hostConfig.prepareForCommit,
      Da = $$$hostConfig.resetAfterCommit,
      Ea = $$$hostConfig.createInstance,
      Fa = $$$hostConfig.appendInitialChild,
      Ga = $$$hostConfig.finalizeInitialChildren,
      Ia = $$$hostConfig.prepareUpdate,
      Ja = $$$hostConfig.shouldSetTextContent,
      Ka = $$$hostConfig.shouldDeprioritizeSubtree,
      La = $$$hostConfig.createTextInstance,
      Ma = $$$hostConfig.setTimeout,
      Na = $$$hostConfig.clearTimeout,
      Oa = $$$hostConfig.noTimeout,
      Pa = $$$hostConfig.isPrimaryRenderer,
      Qa = $$$hostConfig.supportsMutation,
      Ra = $$$hostConfig.supportsPersistence,
      Sa = $$$hostConfig.supportsHydration,
      Ta = $$$hostConfig.appendChild,
      Ua = $$$hostConfig.appendChildToContainer,
      Va = $$$hostConfig.commitTextUpdate,
      Wa = $$$hostConfig.commitMount,
      Xa = $$$hostConfig.commitUpdate,
      Ya = $$$hostConfig.insertBefore,
      Za = $$$hostConfig.insertInContainerBefore,
      $a = $$$hostConfig.removeChild,
      ab = $$$hostConfig.removeChildFromContainer,
      bb = $$$hostConfig.resetTextContent,
      cb = $$$hostConfig.hideInstance,
      db = $$$hostConfig.hideTextInstance,
      eb = $$$hostConfig.unhideInstance,
      fb = $$$hostConfig.unhideTextInstance,
      gb = $$$hostConfig.cloneInstance,
      hb = $$$hostConfig.createContainerChildSet,
      ib = $$$hostConfig.appendChildToContainerChildSet,
      kb = $$$hostConfig.finalizeContainerChildren,
      lb = $$$hostConfig.replaceContainerChildren,
      mb = $$$hostConfig.cloneHiddenInstance,
      nb = $$$hostConfig.cloneHiddenTextInstance,
      ob = $$$hostConfig.canHydrateInstance,
      pb = $$$hostConfig.canHydrateTextInstance,
      qb = $$$hostConfig.isSuspenseInstancePending,
      rb = $$$hostConfig.isSuspenseInstanceFallback,
      sb = $$$hostConfig.getNextHydratableSibling,
      tb = $$$hostConfig.getFirstHydratableChild,
      ub = $$$hostConfig.hydrateInstance,
      vb = $$$hostConfig.hydrateTextInstance,
      wb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
      xb = $$$hostConfig.commitHydratedContainer,
      yb = $$$hostConfig.commitHydratedSuspenseInstance,
      zb = /^(.*)[\\\/]/;

  function Ab(a) {
    var b = "";

    do {
      a: switch (a.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var c = "";
          break a;

        default:
          var d = a._debugOwner,
              e = a._debugSource,
              f = ta(a.type);
          c = null;
          d && (c = ta(d.type));
          d = f;
          f = "";
          e ? f = " (at " + e.fileName.replace(zb, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
          c = "\n    in " + (d || "Unknown") + f;
      }

      b += c;
      a = a.return;
    } while (a);

    return b;
  }
  var Bb = [],
      Cb = -1;

  function y(a) {
    0 > Cb || (a.current = Bb[Cb], Bb[Cb] = null, Cb--);
  }

  function z(a, b) {
    Cb++;
    Bb[Cb] = a.current;
    a.current = b;
  }

  var Db = {},
      A = {
    current: Db
  },
      B = {
    current: !1
  },
      Eb = Db;

  function Fb(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Db;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {},
        f;

    for (f in c) e[f] = b[f];

    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }

  function C(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }

  function Gb(a) {
    y(B);
    y(A);
  }

  function Hb(a) {
    y(B);
    y(A);
  }

  function Ib(a, b, c) {
    if (A.current !== Db) throw Error(n(168));
    z(A, b);
    z(B, c);
  }

  function Jb(a, b, c) {
    var d = a.stateNode;
    a = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();

    for (var e in d) if (!(e in a)) throw Error(n(108, ta(b) || "Unknown", e));

    return aa({}, c, {}, d);
  }

  function Kb(a) {
    var b = a.stateNode;
    b = b && b.__reactInternalMemoizedMergedChildContext || Db;
    Eb = A.current;
    z(A, b);
    z(B, B.current);
    return !0;
  }

  function Lb(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(n(169));
    c ? (b = Jb(a, b, Eb), d.__reactInternalMemoizedMergedChildContext = b, y(B), y(A), z(A, b)) : y(B);
    z(B, c);
  }

  var Mb = m.unstable_runWithPriority,
      Nb = m.unstable_scheduleCallback,
      Ob = m.unstable_cancelCallback,
      Pb = m.unstable_shouldYield,
      Qb = m.unstable_requestPaint,
      Rb = m.unstable_now,
      Ub = m.unstable_getCurrentPriorityLevel,
      Vb = m.unstable_ImmediatePriority,
      Wb = m.unstable_UserBlockingPriority,
      Xb = m.unstable_NormalPriority,
      Yb = m.unstable_LowPriority,
      Zb = m.unstable_IdlePriority,
      $b = {},
      ac = void 0 !== Qb ? Qb : function () {},
      bc = null,
      cc = null,
      dc = !1,
      ec = Rb(),
      E = 1E4 > ec ? Rb : function () {
    return Rb() - ec;
  };

  function fc() {
    switch (Ub()) {
      case Vb:
        return 99;

      case Wb:
        return 98;

      case Xb:
        return 97;

      case Yb:
        return 96;

      case Zb:
        return 95;

      default:
        throw Error(n(332));
    }
  }

  function gc(a) {
    switch (a) {
      case 99:
        return Vb;

      case 98:
        return Wb;

      case 97:
        return Xb;

      case 96:
        return Yb;

      case 95:
        return Zb;

      default:
        throw Error(n(332));
    }
  }

  function hc(a, b) {
    a = gc(a);
    return Mb(a, b);
  }

  function ic(a, b, c) {
    a = gc(a);
    return Nb(a, b, c);
  }

  function jc(a) {
    null === bc ? (bc = [a], cc = Nb(Vb, kc)) : bc.push(a);
    return $b;
  }

  function F() {
    if (null !== cc) {
      var a = cc;
      cc = null;
      Ob(a);
    }

    kc();
  }

  function kc() {
    if (!dc && null !== bc) {
      dc = !0;
      var a = 0;

      try {
        var b = bc;
        hc(99, function () {
          for (; a < b.length; a++) {
            var c = b[a];

            do c = c(!0); while (null !== c);
          }
        });
        bc = null;
      } catch (c) {
        throw null !== bc && (bc = bc.slice(a + 1)), Nb(Vb, F), c;
      } finally {
        dc = !1;
      }
    }
  }

  var lc = 3;

  function mc(a, b, c) {
    c /= 10;
    return 1073741821 - (((1073741821 - a + b / 10) / c | 0) + 1) * c;
  }

  function nc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }

  var oc = "function" === typeof Object.is ? Object.is : nc,
      pc = Object.prototype.hasOwnProperty;

  function qc(a, b) {
    if (oc(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
        d = Object.keys(b);
    if (c.length !== d.length) return !1;

    for (d = 0; d < c.length; d++) if (!pc.call(b, c[d]) || !oc(a[c[d]], b[c[d]])) return !1;

    return !0;
  }

  function rc(a, b) {
    if (a && a.defaultProps) {
      b = aa({}, b);
      a = a.defaultProps;

      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    }

    return b;
  }

  var sc = {
    current: null
  },
      tc = null,
      uc = null,
      vc = null;

  function wc() {
    vc = uc = tc = null;
  }

  function xc(a, b) {
    var c = a.type._context;
    Pa ? (z(sc, c._currentValue), c._currentValue = b) : (z(sc, c._currentValue2), c._currentValue2 = b);
  }

  function yc(a) {
    var b = sc.current;
    y(sc);
    a = a.type._context;
    Pa ? a._currentValue = b : a._currentValue2 = b;
  }

  function zc(a, b) {
    for (; null !== a;) {
      var c = a.alternate;
      if (a.childExpirationTime < b) a.childExpirationTime = b, null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);else if (null !== c && c.childExpirationTime < b) c.childExpirationTime = b;else break;
      a = a.return;
    }
  }

  function Ac(a, b) {
    tc = a;
    vc = uc = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (a.expirationTime >= b && (Bc = !0), a.firstContext = null);
  }

  function Cc(a, b) {
    if (vc !== a && !1 !== b && 0 !== b) {
      if ("number" !== typeof b || 1073741823 === b) vc = a, b = 1073741823;
      b = {
        context: a,
        observedBits: b,
        next: null
      };

      if (null === uc) {
        if (null === tc) throw Error(n(308));
        uc = b;
        tc.dependencies = {
          expirationTime: 0,
          firstContext: b,
          responders: null
        };
      } else uc = uc.next = b;
    }

    return Pa ? a._currentValue : a._currentValue2;
  }

  var Dc = !1;

  function Ec(a) {
    return {
      baseState: a,
      firstUpdate: null,
      lastUpdate: null,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function Fc(a) {
    return {
      baseState: a.baseState,
      firstUpdate: a.firstUpdate,
      lastUpdate: a.lastUpdate,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function Gc(a, b) {
    return {
      expirationTime: a,
      suspenseConfig: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
      nextEffect: null
    };
  }

  function Hc(a, b) {
    null === a.lastUpdate ? a.firstUpdate = a.lastUpdate = b : (a.lastUpdate.next = b, a.lastUpdate = b);
  }

  function Ic(a, b) {
    var c = a.alternate;

    if (null === c) {
      var d = a.updateQueue;
      var e = null;
      null === d && (d = a.updateQueue = Ec(a.memoizedState));
    } else d = a.updateQueue, e = c.updateQueue, null === d ? null === e ? (d = a.updateQueue = Ec(a.memoizedState), e = c.updateQueue = Ec(c.memoizedState)) : d = a.updateQueue = Fc(e) : null === e && (e = c.updateQueue = Fc(d));

    null === e || d === e ? Hc(d, b) : null === d.lastUpdate || null === e.lastUpdate ? (Hc(d, b), Hc(e, b)) : (Hc(d, b), e.lastUpdate = b);
  }

  function Jc(a, b) {
    var c = a.updateQueue;
    c = null === c ? a.updateQueue = Ec(a.memoizedState) : Kc(a, c);
    null === c.lastCapturedUpdate ? c.firstCapturedUpdate = c.lastCapturedUpdate = b : (c.lastCapturedUpdate.next = b, c.lastCapturedUpdate = b);
  }

  function Kc(a, b) {
    var c = a.alternate;
    null !== c && b === c.updateQueue && (b = a.updateQueue = Fc(b));
    return b;
  }

  function Lc(a, b, c, d, e, f) {
    switch (c.tag) {
      case 1:
        return a = c.payload, "function" === typeof a ? a.call(f, d, e) : a;

      case 3:
        a.effectTag = a.effectTag & -4097 | 64;

      case 0:
        a = c.payload;
        e = "function" === typeof a ? a.call(f, d, e) : a;
        if (null === e || void 0 === e) break;
        return aa({}, d, e);

      case 2:
        Dc = !0;
    }

    return d;
  }

  function Nc(a, b, c, d, e) {
    Dc = !1;
    b = Kc(a, b);

    for (var f = b.baseState, g = null, l = 0, h = b.firstUpdate, k = f; null !== h;) {
      var p = h.expirationTime;
      p < e ? (null === g && (g = h, f = k), l < p && (l = p)) : (Oc(p, h.suspenseConfig), k = Lc(a, b, h, k, c, d), null !== h.callback && (a.effectTag |= 32, h.nextEffect = null, null === b.lastEffect ? b.firstEffect = b.lastEffect = h : (b.lastEffect.nextEffect = h, b.lastEffect = h)));
      h = h.next;
    }

    p = null;

    for (h = b.firstCapturedUpdate; null !== h;) {
      var D = h.expirationTime;
      D < e ? (null === p && (p = h, null === g && (f = k)), l < D && (l = D)) : (k = Lc(a, b, h, k, c, d), null !== h.callback && (a.effectTag |= 32, h.nextEffect = null, null === b.lastCapturedEffect ? b.firstCapturedEffect = b.lastCapturedEffect = h : (b.lastCapturedEffect.nextEffect = h, b.lastCapturedEffect = h)));
      h = h.next;
    }

    null === g && (b.lastUpdate = null);
    null === p ? b.lastCapturedUpdate = null : a.effectTag |= 32;
    null === g && null === p && (f = k);
    b.baseState = f;
    b.firstUpdate = g;
    b.firstCapturedUpdate = p;
    Pc(l);
    a.expirationTime = l;
    a.memoizedState = k;
  }

  function Qc(a, b, c) {
    null !== b.firstCapturedUpdate && (null !== b.lastUpdate && (b.lastUpdate.next = b.firstCapturedUpdate, b.lastUpdate = b.lastCapturedUpdate), b.firstCapturedUpdate = b.lastCapturedUpdate = null);
    Rc(b.firstEffect, c);
    b.firstEffect = b.lastEffect = null;
    Rc(b.firstCapturedEffect, c);
    b.firstCapturedEffect = b.lastCapturedEffect = null;
  }

  function Rc(a, b) {
    for (; null !== a;) {
      var c = a.callback;

      if (null !== c) {
        a.callback = null;
        var d = b;
        if ("function" !== typeof c) throw Error(n(191, c));
        c.call(d);
      }

      a = a.nextEffect;
    }
  }

  var Sc = q.ReactCurrentBatchConfig,
      Tc = new ba.Component().refs;

  function Uc(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : aa({}, b, c);
    a.memoizedState = c;
    d = a.updateQueue;
    null !== d && 0 === a.expirationTime && (d.baseState = c);
  }

  var Xc = {
    isMounted: function (a) {
      return (a = a._reactInternalFiber) ? ua(a) === a : !1;
    },
    enqueueSetState: function (a, b, c) {
      a = a._reactInternalFiber;
      var d = G(),
          e = Sc.suspense;
      d = Vc(d, a, e);
      e = Gc(d, e);
      e.payload = b;
      void 0 !== c && null !== c && (e.callback = c);
      Ic(a, e);
      Wc(a, d);
    },
    enqueueReplaceState: function (a, b, c) {
      a = a._reactInternalFiber;
      var d = G(),
          e = Sc.suspense;
      d = Vc(d, a, e);
      e = Gc(d, e);
      e.tag = 1;
      e.payload = b;
      void 0 !== c && null !== c && (e.callback = c);
      Ic(a, e);
      Wc(a, d);
    },
    enqueueForceUpdate: function (a, b) {
      a = a._reactInternalFiber;
      var c = G(),
          d = Sc.suspense;
      c = Vc(c, a, d);
      d = Gc(c, d);
      d.tag = 2;
      void 0 !== b && null !== b && (d.callback = b);
      Ic(a, d);
      Wc(a, c);
    }
  };

  function Yc(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !qc(c, d) || !qc(e, f) : !0;
  }

  function Zc(a, b, c) {
    var d = !1,
        e = Db;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = Cc(f) : (e = C(b) ? Eb : A.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Fb(a, e) : Db);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Xc;
    a.stateNode = b;
    b._reactInternalFiber = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }

  function $c(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Xc.enqueueReplaceState(b, b.state, null);
  }

  function ad(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = Tc;
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = Cc(f) : (f = C(b) ? Eb : A.current, e.context = Fb(a, f));
    f = a.updateQueue;
    null !== f && (Nc(a, f, c, e, d), e.state = a.memoizedState);
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Uc(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Xc.enqueueReplaceState(e, e.state, null), f = a.updateQueue, null !== f && (Nc(a, f, c, e, d), e.state = a.memoizedState));
    "function" === typeof e.componentDidMount && (a.effectTag |= 4);
  }

  var bd = Array.isArray;

  function cd(a, b, c) {
    a = c.ref;

    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;

        if (c) {
          if (1 !== c.tag) throw Error(n(309));
          var d = c.stateNode;
        }

        if (!d) throw Error(n(147, a));
        var e = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

        b = function (b) {
          var a = d.refs;
          a === Tc && (a = d.refs = {});
          null === b ? delete a[e] : a[e] = b;
        };

        b._stringRef = e;
        return b;
      }

      if ("string" !== typeof a) throw Error(n(284));
      if (!c._owner) throw Error(n(290, a));
    }

    return a;
  }

  function dd(a, b) {
    if ("textarea" !== a.type) throw Error(n(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, ""));
  }

  function ed(a) {
    function b(b, c) {
      if (a) {
        var d = b.lastEffect;
        null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
        c.nextEffect = null;
        c.effectTag = 8;
      }
    }

    function c(c, d) {
      if (!a) return null;

      for (; null !== d;) b(c, d), d = d.sibling;

      return null;
    }

    function d(b, a) {
      for (b = new Map(); null !== a;) null !== a.key ? b.set(a.key, a) : b.set(a.index, a), a = a.sibling;

      return b;
    }

    function e(b, a, c) {
      b = fd(b, a);
      b.index = 0;
      b.sibling = null;
      return b;
    }

    function f(b, c, d) {
      b.index = d;
      if (!a) return c;
      d = b.alternate;
      if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;
      b.effectTag = 2;
      return c;
    }

    function g(b) {
      a && null === b.alternate && (b.effectTag = 2);
      return b;
    }

    function l(b, a, c, d) {
      if (null === a || 6 !== a.tag) return a = gd(c, b.mode, d), a.return = b, a;
      a = e(a, c);
      a.return = b;
      return a;
    }

    function h(b, a, c, d) {
      if (null !== a && a.elementType === c.type) return d = e(a, c.props), d.ref = cd(b, a, c), d.return = b, d;
      d = hd(c.type, c.key, c.props, null, b.mode, d);
      d.ref = cd(b, a, c);
      d.return = b;
      return d;
    }

    function k(b, a, c, d) {
      if (null === a || 4 !== a.tag || a.stateNode.containerInfo !== c.containerInfo || a.stateNode.implementation !== c.implementation) return a = id(c, b.mode, d), a.return = b, a;
      a = e(a, c.children || []);
      a.return = b;
      return a;
    }

    function p(b, a, c, d, f) {
      if (null === a || 7 !== a.tag) return a = jd(c, b.mode, d, f), a.return = b, a;
      a = e(a, c);
      a.return = b;
      return a;
    }

    function D(b, a, c) {
      if ("string" === typeof a || "number" === typeof a) return a = gd("" + a, b.mode, c), a.return = b, a;

      if ("object" === typeof a && null !== a) {
        switch (a.$$typeof) {
          case ca:
            return c = hd(a.type, a.key, a.props, null, b.mode, c), c.ref = cd(b, null, a), c.return = b, c;

          case da:
            return a = id(a, b.mode, c), a.return = b, a;
        }

        if (bd(a) || ra(a)) return a = jd(a, b.mode, c, null), a.return = b, a;
        dd(b, a);
      }

      return null;
    }

    function x(b, a, c, d) {
      var e = null !== a ? a.key : null;
      if ("string" === typeof c || "number" === typeof c) return null !== e ? null : l(b, a, "" + c, d);

      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case ca:
            return c.key === e ? c.type === ea ? p(b, a, c.props.children, d, e) : h(b, a, c, d) : null;

          case da:
            return c.key === e ? k(b, a, c, d) : null;
        }

        if (bd(c) || ra(c)) return null !== e ? null : p(b, a, c, d, null);
        dd(b, c);
      }

      return null;
    }

    function K(b, a, c, d, e) {
      if ("string" === typeof d || "number" === typeof d) return b = b.get(c) || null, l(a, b, "" + d, e);

      if ("object" === typeof d && null !== d) {
        switch (d.$$typeof) {
          case ca:
            return b = b.get(null === d.key ? c : d.key) || null, d.type === ea ? p(a, b, d.props.children, e, d.key) : h(a, b, d, e);

          case da:
            return b = b.get(null === d.key ? c : d.key) || null, k(a, b, d, e);
        }

        if (bd(d) || ra(d)) return b = b.get(c) || null, p(a, b, d, e, null);
        dd(a, d);
      }

      return null;
    }

    function Ha(e, g, h, l) {
      for (var k = null, w = null, t = g, r = g = 0, p = null; null !== t && r < h.length; r++) {
        t.index > r ? (p = t, t = null) : p = t.sibling;
        var v = x(e, t, h[r], l);

        if (null === v) {
          null === t && (t = p);
          break;
        }

        a && t && null === v.alternate && b(e, t);
        g = f(v, g, r);
        null === w ? k = v : w.sibling = v;
        w = v;
        t = p;
      }

      if (r === h.length) return c(e, t), k;

      if (null === t) {
        for (; r < h.length; r++) t = D(e, h[r], l), null !== t && (g = f(t, g, r), null === w ? k = t : w.sibling = t, w = t);

        return k;
      }

      for (t = d(e, t); r < h.length; r++) p = K(t, e, r, h[r], l), null !== p && (a && null !== p.alternate && t.delete(null === p.key ? r : p.key), g = f(p, g, r), null === w ? k = p : w.sibling = p, w = p);

      a && t.forEach(function (a) {
        return b(e, a);
      });
      return k;
    }

    function O(e, g, h, l) {
      var k = ra(h);
      if ("function" !== typeof k) throw Error(n(150));
      h = k.call(h);
      if (null == h) throw Error(n(151));

      for (var t = k = null, r = g, w = g = 0, p = null, v = h.next(); null !== r && !v.done; w++, v = h.next()) {
        r.index > w ? (p = r, r = null) : p = r.sibling;
        var N = x(e, r, v.value, l);

        if (null === N) {
          null === r && (r = p);
          break;
        }

        a && r && null === N.alternate && b(e, r);
        g = f(N, g, w);
        null === t ? k = N : t.sibling = N;
        t = N;
        r = p;
      }

      if (v.done) return c(e, r), k;

      if (null === r) {
        for (; !v.done; w++, v = h.next()) v = D(e, v.value, l), null !== v && (g = f(v, g, w), null === t ? k = v : t.sibling = v, t = v);

        return k;
      }

      for (r = d(e, r); !v.done; w++, v = h.next()) v = K(r, e, w, v.value, l), null !== v && (a && null !== v.alternate && r.delete(null === v.key ? w : v.key), g = f(v, g, w), null === t ? k = v : t.sibling = v, t = v);

      a && r.forEach(function (a) {
        return b(e, a);
      });
      return k;
    }

    return function (a, d, f, h) {
      var k = "object" === typeof f && null !== f && f.type === ea && null === f.key;
      k && (f = f.props.children);
      var l = "object" === typeof f && null !== f;
      if (l) switch (f.$$typeof) {
        case ca:
          a: {
            l = f.key;

            for (k = d; null !== k;) {
              if (k.key === l) {
                if (7 === k.tag ? f.type === ea : k.elementType === f.type) {
                  c(a, k.sibling);
                  d = e(k, f.type === ea ? f.props.children : f.props);
                  d.ref = cd(a, k, f);
                  d.return = a;
                  a = d;
                  break a;
                } else {
                  c(a, k);
                  break;
                }
              } else b(a, k);
              k = k.sibling;
            }

            f.type === ea ? (d = jd(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = hd(f.type, f.key, f.props, null, a.mode, h), h.ref = cd(a, d, f), h.return = a, a = h);
          }

          return g(a);

        case da:
          a: {
            for (k = f.key; null !== d;) {
              if (d.key === k) {
                if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                  c(a, d.sibling);
                  d = e(d, f.children || []);
                  d.return = a;
                  a = d;
                  break a;
                } else {
                  c(a, d);
                  break;
                }
              } else b(a, d);
              d = d.sibling;
            }

            d = id(f, a.mode, h);
            d.return = a;
            a = d;
          }

          return g(a);
      }
      if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = gd(f, a.mode, h), d.return = a, a = d), g(a);
      if (bd(f)) return Ha(a, d, f, h);
      if (ra(f)) return O(a, d, f, h);
      l && dd(a, f);
      if ("undefined" === typeof f && !k) switch (a.tag) {
        case 1:
        case 0:
          throw a = a.type, Error(n(152, a.displayName || a.name || "Component"));
      }
      return c(a, d);
    };
  }

  var kd = ed(!0),
      ld = ed(!1),
      md = {},
      H = {
    current: md
  },
      nd = {
    current: md
  },
      od = {
    current: md
  };

  function pd(a) {
    if (a === md) throw Error(n(174));
    return a;
  }

  function qd(a, b) {
    z(od, b);
    z(nd, a);
    z(H, md);
    b = Aa(b);
    y(H);
    z(H, b);
  }

  function rd(a) {
    y(H);
    y(nd);
    y(od);
  }

  function sd(a) {
    var b = pd(od.current),
        c = pd(H.current);
    b = Ba(c, a.type, b);
    c !== b && (z(nd, a), z(H, b));
  }

  function td(a) {
    nd.current === a && (y(H), y(nd));
  }

  var I = {
    current: 0
  };

  function ud(a) {
    for (var b = a; null !== b;) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || qb(c) || rb(c))) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.effectTag & 64)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }

      if (b === a) break;

      for (; null === b.sibling;) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }

    return null;
  }

  function vd(a, b) {
    return {
      responder: a,
      props: b
    };
  }

  var wd = q.ReactCurrentDispatcher,
      J = q.ReactCurrentBatchConfig,
      xd = 0,
      yd = null,
      L = null,
      zd = null,
      Ad = null,
      M = null,
      Bd = null,
      Cd = 0,
      Dd = null,
      Ed = 0,
      Fd = !1,
      Gd = null,
      Hd = 0;

  function P() {
    throw Error(n(321));
  }

  function Id(a, b) {
    if (null === b) return !1;

    for (var c = 0; c < b.length && c < a.length; c++) if (!oc(a[c], b[c])) return !1;

    return !0;
  }

  function Jd(a, b, c, d, e, f) {
    xd = f;
    yd = b;
    zd = null !== a ? a.memoizedState : null;
    wd.current = null === zd ? Kd : Ld;
    b = c(d, e);

    if (Fd) {
      do Fd = !1, Hd += 1, zd = null !== a ? a.memoizedState : null, Bd = Ad, Dd = M = L = null, wd.current = Ld, b = c(d, e); while (Fd);

      Gd = null;
      Hd = 0;
    }

    wd.current = Md;
    a = yd;
    a.memoizedState = Ad;
    a.expirationTime = Cd;
    a.updateQueue = Dd;
    a.effectTag |= Ed;
    a = null !== L && null !== L.next;
    xd = 0;
    Bd = M = Ad = zd = L = yd = null;
    Cd = 0;
    Dd = null;
    Ed = 0;
    if (a) throw Error(n(300));
    return b;
  }

  function Nd() {
    wd.current = Md;
    xd = 0;
    Bd = M = Ad = zd = L = yd = null;
    Cd = 0;
    Dd = null;
    Ed = 0;
    Fd = !1;
    Gd = null;
    Hd = 0;
  }

  function Od() {
    var a = {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
    null === M ? Ad = M = a : M = M.next = a;
    return M;
  }

  function Pd() {
    if (null !== Bd) M = Bd, Bd = M.next, L = zd, zd = null !== L ? L.next : null;else {
      if (null === zd) throw Error(n(310));
      L = zd;
      var a = {
        memoizedState: L.memoizedState,
        baseState: L.baseState,
        queue: L.queue,
        baseUpdate: L.baseUpdate,
        next: null
      };
      M = null === M ? Ad = a : M.next = a;
      zd = L.next;
    }
    return M;
  }

  function Qd(a, b) {
    return "function" === typeof b ? b(a) : b;
  }

  function Rd(a) {
    var b = Pd(),
        c = b.queue;
    if (null === c) throw Error(n(311));
    c.lastRenderedReducer = a;

    if (0 < Hd) {
      var d = c.dispatch;

      if (null !== Gd) {
        var e = Gd.get(c);

        if (void 0 !== e) {
          Gd.delete(c);
          var f = b.memoizedState;

          do f = a(f, e.action), e = e.next; while (null !== e);

          oc(f, b.memoizedState) || (Bc = !0);
          b.memoizedState = f;
          b.baseUpdate === c.last && (b.baseState = f);
          c.lastRenderedState = f;
          return [f, d];
        }
      }

      return [b.memoizedState, d];
    }

    d = c.last;
    var g = b.baseUpdate;
    f = b.baseState;
    null !== g ? (null !== d && (d.next = null), d = g.next) : d = null !== d ? d.next : null;

    if (null !== d) {
      var l = e = null,
          h = d,
          k = !1;

      do {
        var p = h.expirationTime;
        p < xd ? (k || (k = !0, l = g, e = f), p > Cd && (Cd = p, Pc(Cd))) : (Oc(p, h.suspenseConfig), f = h.eagerReducer === a ? h.eagerState : a(f, h.action));
        g = h;
        h = h.next;
      } while (null !== h && h !== d);

      k || (l = g, e = f);
      oc(f, b.memoizedState) || (Bc = !0);
      b.memoizedState = f;
      b.baseUpdate = l;
      b.baseState = e;
      c.lastRenderedState = f;
    }

    return [b.memoizedState, c.dispatch];
  }

  function Sd(a) {
    var b = Od();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: Qd,
      lastRenderedState: a
    };
    a = a.dispatch = Td.bind(null, yd, a);
    return [b.memoizedState, a];
  }

  function Ud(a) {
    return Rd(Qd);
  }

  function Vd(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    null === Dd ? (Dd = {
      lastEffect: null
    }, Dd.lastEffect = a.next = a) : (b = Dd.lastEffect, null === b ? Dd.lastEffect = a.next = a : (c = b.next, b.next = a, a.next = c, Dd.lastEffect = a));
    return a;
  }

  function Wd(a, b, c, d) {
    var e = Od();
    Ed |= a;
    e.memoizedState = Vd(b, c, void 0, void 0 === d ? null : d);
  }

  function Xd(a, b, c, d) {
    var e = Pd();
    d = void 0 === d ? null : d;
    var f = void 0;

    if (null !== L) {
      var g = L.memoizedState;
      f = g.destroy;

      if (null !== d && Id(d, g.deps)) {
        Vd(0, c, f, d);
        return;
      }
    }

    Ed |= a;
    e.memoizedState = Vd(b, c, f, d);
  }

  function Yd(a, b) {
    return Wd(516, 192, a, b);
  }

  function Zd(a, b) {
    return Xd(516, 192, a, b);
  }

  function $d(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }

  function ae() {}

  function be(a, b) {
    Od().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }

  function ce(a, b) {
    var c = Pd();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Id(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }

  function Td(a, b, c) {
    if (!(25 > Hd)) throw Error(n(301));
    var d = a.alternate;
    if (a === yd || null !== d && d === yd) {
      if (Fd = !0, a = {
        expirationTime: xd,
        suspenseConfig: null,
        action: c,
        eagerReducer: null,
        eagerState: null,
        next: null
      }, null === Gd && (Gd = new Map()), c = Gd.get(b), void 0 === c) Gd.set(b, a);else {
        for (b = c; null !== b.next;) b = b.next;

        b.next = a;
      }
    } else {
      var e = G(),
          f = Sc.suspense;
      e = Vc(e, a, f);
      f = {
        expirationTime: e,
        suspenseConfig: f,
        action: c,
        eagerReducer: null,
        eagerState: null,
        next: null
      };
      var g = b.last;
      if (null === g) f.next = f;else {
        var l = g.next;
        null !== l && (f.next = l);
        g.next = f;
      }
      b.last = f;
      if (0 === a.expirationTime && (null === d || 0 === d.expirationTime) && (d = b.lastRenderedReducer, null !== d)) try {
        var h = b.lastRenderedState,
            k = d(h, c);
        f.eagerReducer = d;
        f.eagerState = k;
        if (oc(k, h)) return;
      } catch (p) {} finally {}
      Wc(a, e);
    }
  }

  var Md = {
    readContext: Cc,
    useCallback: P,
    useContext: P,
    useEffect: P,
    useImperativeHandle: P,
    useLayoutEffect: P,
    useMemo: P,
    useReducer: P,
    useRef: P,
    useState: P,
    useDebugValue: P,
    useResponder: P,
    useDeferredValue: P,
    useTransition: P
  },
      Kd = {
    readContext: Cc,
    useCallback: be,
    useContext: Cc,
    useEffect: Yd,
    useImperativeHandle: function (a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return Wd(4, 36, $d.bind(null, b, a), c);
    },
    useLayoutEffect: function (a, b) {
      return Wd(4, 36, a, b);
    },
    useMemo: function (a, b) {
      var c = Od();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function (a, b, c) {
      var d = Od();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = d.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: b
      };
      a = a.dispatch = Td.bind(null, yd, a);
      return [d.memoizedState, a];
    },
    useRef: function (a) {
      var b = Od();
      a = {
        current: a
      };
      return b.memoizedState = a;
    },
    useState: Sd,
    useDebugValue: ae,
    useResponder: vd,
    useDeferredValue: function (a, b) {
      var c = Sd(a),
          d = c[0],
          e = c[1];
      Yd(function () {
        m.unstable_next(function () {
          var c = J.suspense;
          J.suspense = void 0 === b ? null : b;

          try {
            e(a);
          } finally {
            J.suspense = c;
          }
        });
      }, [a, b]);
      return d;
    },
    useTransition: function (a) {
      var b = Sd(!1),
          c = b[0],
          d = b[1];
      return [be(function (b) {
        d(!0);
        m.unstable_next(function () {
          var c = J.suspense;
          J.suspense = void 0 === a ? null : a;

          try {
            d(!1), b();
          } finally {
            J.suspense = c;
          }
        });
      }, [a, c]), c];
    }
  },
      Ld = {
    readContext: Cc,
    useCallback: ce,
    useContext: Cc,
    useEffect: Zd,
    useImperativeHandle: function (a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return Xd(4, 36, $d.bind(null, b, a), c);
    },
    useLayoutEffect: function (a, b) {
      return Xd(4, 36, a, b);
    },
    useMemo: function (a, b) {
      var c = Pd();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && Id(b, d[1])) return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: Rd,
    useRef: function () {
      return Pd().memoizedState;
    },
    useState: Ud,
    useDebugValue: ae,
    useResponder: vd,
    useDeferredValue: function (a, b) {
      var c = Ud(),
          d = c[0],
          e = c[1];
      Zd(function () {
        m.unstable_next(function () {
          var c = J.suspense;
          J.suspense = void 0 === b ? null : b;

          try {
            e(a);
          } finally {
            J.suspense = c;
          }
        });
      }, [a, b]);
      return d;
    },
    useTransition: function (a) {
      var b = Ud(),
          c = b[0],
          d = b[1];
      return [ce(function (b) {
        d(!0);
        m.unstable_next(function () {
          var c = J.suspense;
          J.suspense = void 0 === a ? null : a;

          try {
            d(!1), b();
          } finally {
            J.suspense = c;
          }
        });
      }, [a, c]), c];
    }
  },
      de = null,
      ee = null,
      fe = !1;

  function ge(a, b) {
    var c = he(5, null, null, 0);
    c.elementType = "DELETED";
    c.type = "DELETED";
    c.stateNode = b;
    c.return = a;
    c.effectTag = 8;
    null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }

  function ie(a, b) {
    switch (a.tag) {
      case 5:
        return b = ob(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 6:
        return b = pb(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 13:
        return !1;

      default:
        return !1;
    }
  }

  function je(a) {
    if (fe) {
      var b = ee;

      if (b) {
        var c = b;

        if (!ie(a, b)) {
          b = sb(c);

          if (!b || !ie(a, b)) {
            a.effectTag = a.effectTag & -1025 | 2;
            fe = !1;
            de = a;
            return;
          }

          ge(de, c);
        }

        de = a;
        ee = tb(b);
      } else a.effectTag = a.effectTag & -1025 | 2, fe = !1, de = a;
    }
  }

  function ke(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;

    de = a;
  }

  function ne(a) {
    if (!Sa || a !== de) return !1;
    if (!fe) return ke(a), fe = !0, !1;
    var b = a.type;
    if (5 !== a.tag || "head" !== b && "body" !== b && !Ja(b, a.memoizedProps)) for (b = ee; b;) ge(a, b), b = sb(b);
    ke(a);

    if (13 === a.tag) {
      if (!Sa) throw Error(n(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(n(317));
      ee = wb(a);
    } else ee = de ? sb(a.stateNode) : null;

    return !0;
  }

  function oe() {
    Sa && (ee = de = null, fe = !1);
  }

  var pe = q.ReactCurrentOwner,
      Bc = !1;

  function Q(a, b, c, d) {
    b.child = null === a ? ld(b, null, c, d) : kd(b, a.child, c, d);
  }

  function qe(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    Ac(b, e);
    d = Jd(a, b, c, d, f, e);
    if (null !== a && !Bc) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), re(a, b, e);
    b.effectTag |= 1;
    Q(a, b, d, e);
    return b.child;
  }

  function se(a, b, c, d, e, f) {
    if (null === a) {
      var g = c.type;
      if ("function" === typeof g && !te(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ue(a, b, g, d, e, f);
      a = hd(c.type, null, d, null, b.mode, f);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }

    g = a.child;
    if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : qc, c(e, d) && a.ref === b.ref)) return re(a, b, f);
    b.effectTag |= 1;
    a = fd(g, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  function ue(a, b, c, d, e, f) {
    return null !== a && qc(a.memoizedProps, d) && a.ref === b.ref && (Bc = !1, e < f) ? re(a, b, f) : ve(a, b, c, d, f);
  }

  function we(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
  }

  function ve(a, b, c, d, e) {
    var f = C(c) ? Eb : A.current;
    f = Fb(b, f);
    Ac(b, e);
    c = Jd(a, b, c, d, f, e);
    if (null !== a && !Bc) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), re(a, b, e);
    b.effectTag |= 1;
    Q(a, b, c, e);
    return b.child;
  }

  function xe(a, b, c, d, e) {
    if (C(c)) {
      var f = !0;
      Kb(b);
    } else f = !1;

    Ac(b, e);
    if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), Zc(b, c, d), ad(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
          l = b.memoizedProps;
      g.props = l;
      var h = g.context,
          k = c.contextType;
      "object" === typeof k && null !== k ? k = Cc(k) : (k = C(c) ? Eb : A.current, k = Fb(b, k));
      var p = c.getDerivedStateFromProps,
          D = "function" === typeof p || "function" === typeof g.getSnapshotBeforeUpdate;
      D || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (l !== d || h !== k) && $c(b, g, d, k);
      Dc = !1;
      var x = b.memoizedState;
      h = g.state = x;
      var K = b.updateQueue;
      null !== K && (Nc(b, K, d, g, e), h = b.memoizedState);
      l !== d || x !== h || B.current || Dc ? ("function" === typeof p && (Uc(b, c, p, d), h = b.memoizedState), (l = Dc || Yc(b, c, l, d, x, h, k)) ? (D || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = h), g.props = d, g.state = h, g.context = k, d = l) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
    } else g = b.stateNode, l = b.memoizedProps, g.props = b.type === b.elementType ? l : rc(b.type, l), h = g.context, k = c.contextType, "object" === typeof k && null !== k ? k = Cc(k) : (k = C(c) ? Eb : A.current, k = Fb(b, k)), p = c.getDerivedStateFromProps, (D = "function" === typeof p || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (l !== d || h !== k) && $c(b, g, d, k), Dc = !1, h = b.memoizedState, x = g.state = h, K = b.updateQueue, null !== K && (Nc(b, K, d, g, e), x = b.memoizedState), l !== d || h !== x || B.current || Dc ? ("function" === typeof p && (Uc(b, c, p, d), x = b.memoizedState), (p = Dc || Yc(b, c, l, d, h, x, k)) ? (D || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || l === a.memoizedProps && h === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || l === a.memoizedProps && h === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = p) : ("function" !== typeof g.componentDidUpdate || l === a.memoizedProps && h === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || l === a.memoizedProps && h === a.memoizedState || (b.effectTag |= 256), d = !1);
    return ye(a, b, c, d, f, e);
  }

  function ye(a, b, c, d, e, f) {
    we(a, b);
    var g = 0 !== (b.effectTag & 64);
    if (!d && !g) return e && Lb(b, c, !1), re(a, b, f);
    d = b.stateNode;
    pe.current = b;
    var l = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.effectTag |= 1;
    null !== a && g ? (b.child = kd(b, a.child, null, f), b.child = kd(b, null, l, f)) : Q(a, b, l, f);
    b.memoizedState = d.state;
    e && Lb(b, c, !0);
    return b.child;
  }

  function ze(a) {
    var b = a.stateNode;
    b.pendingContext ? Ib(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Ib(a, b.context, !1);
    qd(a, b.containerInfo);
  }

  var Ae = {
    dehydrated: null,
    retryTime: 0
  };

  function Be(a, b, c) {
    var d = b.mode,
        e = b.pendingProps,
        f = I.current,
        g = !1,
        l;
    (l = 0 !== (b.effectTag & 64)) || (l = 0 !== (f & 2) && (null === a || null !== a.memoizedState));
    l ? (g = !0, b.effectTag &= -65) : null !== a && null === a.memoizedState || void 0 === e.fallback || !0 === e.unstable_avoidThisFallback || (f |= 1);
    z(I, f & 1);

    if (null === a) {
      void 0 !== e.fallback && je(b);

      if (g) {
        g = e.fallback;
        e = jd(null, d, 0, null);
        e.return = b;
        if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) a.return = e, a = a.sibling;
        c = jd(g, d, c, null);
        c.return = b;
        e.sibling = c;
        b.memoizedState = Ae;
        b.child = e;
        return c;
      }

      d = e.children;
      b.memoizedState = null;
      return b.child = ld(b, null, d, c);
    }

    if (null !== a.memoizedState) {
      a = a.child;
      d = a.sibling;

      if (g) {
        e = e.fallback;
        c = fd(a, a.pendingProps);
        c.return = b;
        if (0 === (b.mode & 2) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== a.child)) for (c.child = g; null !== g;) g.return = c, g = g.sibling;
        d = fd(d, e, d.expirationTime);
        d.return = b;
        c.sibling = d;
        c.childExpirationTime = 0;
        b.memoizedState = Ae;
        b.child = c;
        return d;
      }

      c = kd(b, a.child, e.children, c);
      b.memoizedState = null;
      return b.child = c;
    }

    a = a.child;

    if (g) {
      g = e.fallback;
      e = jd(null, d, 0, null);
      e.return = b;
      e.child = a;
      null !== a && (a.return = e);
      if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) a.return = e, a = a.sibling;
      c = jd(g, d, c, null);
      c.return = b;
      e.sibling = c;
      c.effectTag |= 2;
      e.childExpirationTime = 0;
      b.memoizedState = Ae;
      b.child = e;
      return c;
    }

    b.memoizedState = null;
    return b.child = kd(b, a, e.children, c);
  }

  function Ce(a, b) {
    a.expirationTime < b && (a.expirationTime = b);
    var c = a.alternate;
    null !== c && c.expirationTime < b && (c.expirationTime = b);
    zc(a.return, b);
  }

  function De(a, b, c, d, e, f) {
    var g = a.memoizedState;
    null === g ? a.memoizedState = {
      isBackwards: b,
      rendering: null,
      last: d,
      tail: c,
      tailExpiration: 0,
      tailMode: e,
      lastEffect: f
    } : (g.isBackwards = b, g.rendering = null, g.last = d, g.tail = c, g.tailExpiration = 0, g.tailMode = e, g.lastEffect = f);
  }

  function Ee(a, b, c) {
    var d = b.pendingProps,
        e = d.revealOrder,
        f = d.tail;
    Q(a, b, d.children, c);
    d = I.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.effectTag |= 64;else {
      if (null !== a && 0 !== (a.effectTag & 64)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && Ce(a, c);else if (19 === a.tag) Ce(a, c);else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;

        for (; null === a.sibling;) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }

        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    z(I, d);
    if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;

        for (e = null; null !== c;) a = c.alternate, null !== a && null === ud(a) && (e = c), c = c.sibling;

        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        De(b, !1, e, c, f, b.lastEffect);
        break;

      case "backwards":
        c = null;
        e = b.child;

        for (b.child = null; null !== e;) {
          a = e.alternate;

          if (null !== a && null === ud(a)) {
            b.child = e;
            break;
          }

          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }

        De(b, !0, c, null, f, b.lastEffect);
        break;

      case "together":
        De(b, !1, null, null, void 0, b.lastEffect);
        break;

      default:
        b.memoizedState = null;
    }
    return b.child;
  }

  function re(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    var d = b.expirationTime;
    0 !== d && Pc(d);
    if (b.childExpirationTime < c) return null;
    if (null !== a && b.child !== a.child) throw Error(n(153));

    if (null !== b.child) {
      a = b.child;
      c = fd(a, a.pendingProps, a.expirationTime);
      b.child = c;

      for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = fd(a, a.pendingProps, a.expirationTime), c.return = b;

      c.sibling = null;
    }

    return b.child;
  }

  function Fe(a) {
    a.effectTag |= 4;
  }

  var Ge, He, Ie, Je;
  if (Qa) Ge = function (a, b) {
    for (var c = b.child; null !== c;) {
      if (5 === c.tag || 6 === c.tag) Fa(a, c.stateNode);else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;

      for (; null === c.sibling;) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }

      c.sibling.return = c.return;
      c = c.sibling;
    }
  }, He = function () {}, Ie = function (a, b, c, d, e) {
    a = a.memoizedProps;

    if (a !== d) {
      var f = b.stateNode,
          g = pd(H.current);
      c = Ia(f, c, a, d, e, g);
      (b.updateQueue = c) && Fe(b);
    }
  }, Je = function (a, b, c, d) {
    c !== d && Fe(b);
  };else if (Ra) {
    Ge = function (a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = mb(f, e.type, e.memoizedProps, e));
          Fa(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = nb(f, e.memoizedProps, e)), Fa(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.effectTag & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child.return = g, Ge(a, g, !0, f)), f = g.sibling, null !== f)) {
              f.return = e;
              e = f;
              continue;
            }
          }

          if (null !== e.child) {
            e.child.return = e;
            e = e.child;
            continue;
          }
        }

        if (e === b) break;

        for (; null === e.sibling;) {
          if (null === e.return || e.return === b) return;
          e = e.return;
        }

        e.sibling.return = e.return;
        e = e.sibling;
      }
    };

    var Ke = function (a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = mb(f, e.type, e.memoizedProps, e));
          ib(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = nb(f, e.memoizedProps, e)), ib(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.effectTag & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child.return = g, Ke(a, g, !0, f)), f = g.sibling, null !== f)) {
              f.return = e;
              e = f;
              continue;
            }
          }

          if (null !== e.child) {
            e.child.return = e;
            e = e.child;
            continue;
          }
        }

        if (e === b) break;

        for (; null === e.sibling;) {
          if (null === e.return || e.return === b) return;
          e = e.return;
        }

        e.sibling.return = e.return;
        e = e.sibling;
      }
    };

    He = function (a) {
      var b = a.stateNode;

      if (null !== a.firstEffect) {
        var c = b.containerInfo,
            d = hb(c);
        Ke(d, a, !1, !1);
        b.pendingChildren = d;
        Fe(a);
        kb(c, d);
      }
    };

    Ie = function (a, b, c, d, e) {
      var f = a.stateNode,
          g = a.memoizedProps;
      if ((a = null === b.firstEffect) && g === d) b.stateNode = f;else {
        var l = b.stateNode,
            h = pd(H.current),
            k = null;
        g !== d && (k = Ia(l, c, g, d, e, h));
        a && null === k ? b.stateNode = f : (f = gb(f, k, c, g, d, b, a, l), Ga(f, c, d, e, h) && Fe(b), b.stateNode = f, a ? Fe(b) : Ge(f, b, !1, !1));
      }
    };

    Je = function (a, b, c, d) {
      c !== d && (a = pd(od.current), c = pd(H.current), b.stateNode = La(d, a, c, b), Fe(b));
    };
  } else He = function () {}, Ie = function () {}, Je = function () {};

  function Le(a, b) {
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;

        for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;

        null === c ? a.tail = null : c.sibling = null;
        break;

      case "collapsed":
        c = a.tail;

        for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;

        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }

  function Me(a) {
    switch (a.tag) {
      case 1:
        C(a.type) && Gb();
        var b = a.effectTag;
        return b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

      case 3:
        rd();
        Hb();
        b = a.effectTag;
        if (0 !== (b & 64)) throw Error(n(285));
        a.effectTag = b & -4097 | 64;
        return a;

      case 5:
        return td(a), null;

      case 13:
        return y(I), b = a.effectTag, b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

      case 19:
        return y(I), null;

      case 4:
        return rd(), null;

      case 10:
        return yc(a), null;

      default:
        return null;
    }
  }

  function Ne(a, b) {
    return {
      value: a,
      source: b,
      stack: Ab(b)
    };
  }

  var Oe = "function" === typeof WeakSet ? WeakSet : Set;

  function Pe(a, b) {
    var c = b.source,
        d = b.stack;
    null === d && null !== c && (d = Ab(c));
    null !== c && ta(c.type);
    b = b.value;
    null !== a && 1 === a.tag && ta(a.type);

    try {
      console.error(b);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function Qe(a, b) {
    try {
      b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
    } catch (c) {
      Re(a, c);
    }
  }

  function Se(a) {
    var b = a.ref;
    if (null !== b) if ("function" === typeof b) try {
      b(null);
    } catch (c) {
      Re(a, c);
    } else b.current = null;
  }

  function Te(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 15:
        Ue(2, 0, b);
        break;

      case 1:
        if (b.effectTag & 256 && null !== a) {
          var c = a.memoizedProps,
              d = a.memoizedState;
          a = b.stateNode;
          b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : rc(b.type, c), d);
          a.__reactInternalSnapshotBeforeUpdate = b;
        }

        break;

      case 3:
      case 5:
      case 6:
      case 4:
      case 17:
        break;

      default:
        throw Error(n(163));
    }
  }

  function Ue(a, b, c) {
    c = c.updateQueue;
    c = null !== c ? c.lastEffect : null;

    if (null !== c) {
      var d = c = c.next;

      do {
        if (0 !== (d.tag & a)) {
          var e = d.destroy;
          d.destroy = void 0;
          void 0 !== e && e();
        }

        0 !== (d.tag & b) && (e = d.create, d.destroy = e());
        d = d.next;
      } while (d !== c);
    }
  }

  function Ve(a, b, c) {
    "function" === typeof We && We(b);

    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        a = b.updateQueue;

        if (null !== a && (a = a.lastEffect, null !== a)) {
          var d = a.next;
          hc(97 < c ? 97 : c, function () {
            var a = d;

            do {
              var c = a.destroy;

              if (void 0 !== c) {
                var g = b;

                try {
                  c();
                } catch (l) {
                  Re(g, l);
                }
              }

              a = a.next;
            } while (a !== d);
          });
        }

        break;

      case 1:
        Se(b);
        c = b.stateNode;
        "function" === typeof c.componentWillUnmount && Qe(b, c);
        break;

      case 5:
        Se(b);
        break;

      case 4:
        Qa ? Xe(a, b, c) : Ra && Ye(b);
    }
  }

  function Ze(a, b, c) {
    for (var d = b;;) if (Ve(a, d, c), null === d.child || Qa && 4 === d.tag) {
      if (d === b) break;

      for (; null === d.sibling;) {
        if (null === d.return || d.return === b) return;
        d = d.return;
      }

      d.sibling.return = d.return;
      d = d.sibling;
    } else d.child.return = d, d = d.child;
  }

  function $e(a) {
    var b = a.alternate;
    a.return = null;
    a.child = null;
    a.memoizedState = null;
    a.updateQueue = null;
    a.dependencies = null;
    a.alternate = null;
    a.firstEffect = null;
    a.lastEffect = null;
    a.pendingProps = null;
    a.memoizedProps = null;
    null !== b && $e(b);
  }

  function Ye(a) {
    if (Ra) {
      a = a.stateNode.containerInfo;
      var b = hb(a);
      lb(a, b);
    }
  }

  function af(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }

  function bf(a) {
    if (Qa) {
      a: {
        for (var b = a.return; null !== b;) {
          if (af(b)) {
            var c = b;
            break a;
          }

          b = b.return;
        }

        throw Error(n(160));
      }

      b = c.stateNode;

      switch (c.tag) {
        case 5:
          var d = !1;
          break;

        case 3:
          b = b.containerInfo;
          d = !0;
          break;

        case 4:
          b = b.containerInfo;
          d = !0;
          break;

        default:
          throw Error(n(161));
      }

      c.effectTag & 16 && (bb(b), c.effectTag &= -17);

      a: b: for (c = a;;) {
        for (; null === c.sibling;) {
          if (null === c.return || af(c.return)) {
            c = null;
            break a;
          }

          c = c.return;
        }

        c.sibling.return = c.return;

        for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
          if (c.effectTag & 2) continue b;
          if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
        }

        if (!(c.effectTag & 2)) {
          c = c.stateNode;
          break a;
        }
      }

      for (var e = a;;) {
        var f = 5 === e.tag || 6 === e.tag;
        if (f) f = f ? e.stateNode : e.stateNode.instance, c ? d ? Za(b, f, c) : Ya(b, f, c) : d ? Ua(b, f) : Ta(b, f);else if (4 !== e.tag && null !== e.child) {
          e.child.return = e;
          e = e.child;
          continue;
        }
        if (e === a) break;

        for (; null === e.sibling;) {
          if (null === e.return || e.return === a) return;
          e = e.return;
        }

        e.sibling.return = e.return;
        e = e.sibling;
      }
    }
  }

  function Xe(a, b, c) {
    for (var d = b, e = !1, f, g;;) {
      if (!e) {
        e = d.return;

        a: for (;;) {
          if (null === e) throw Error(n(160));
          f = e.stateNode;

          switch (e.tag) {
            case 5:
              g = !1;
              break a;

            case 3:
              f = f.containerInfo;
              g = !0;
              break a;

            case 4:
              f = f.containerInfo;
              g = !0;
              break a;
          }

          e = e.return;
        }

        e = !0;
      }

      if (5 === d.tag || 6 === d.tag) Ze(a, d, c), g ? ab(f, d.stateNode) : $a(f, d.stateNode);else if (4 === d.tag) {
        if (null !== d.child) {
          f = d.stateNode.containerInfo;
          g = !0;
          d.child.return = d;
          d = d.child;
          continue;
        }
      } else if (Ve(a, d, c), null !== d.child) {
        d.child.return = d;
        d = d.child;
        continue;
      }
      if (d === b) break;

      for (; null === d.sibling;) {
        if (null === d.return || d.return === b) return;
        d = d.return;
        4 === d.tag && (e = !1);
      }

      d.sibling.return = d.return;
      d = d.sibling;
    }
  }

  function cf(a, b) {
    if (Qa) switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(4, 8, b);
        break;

      case 1:
        break;

      case 5:
        var c = b.stateNode;

        if (null != c) {
          var d = b.memoizedProps;
          a = null !== a ? a.memoizedProps : d;
          var e = b.type,
              f = b.updateQueue;
          b.updateQueue = null;
          null !== f && Xa(c, f, e, a, d, b);
        }

        break;

      case 6:
        if (null === b.stateNode) throw Error(n(162));
        c = b.memoizedProps;
        Va(b.stateNode, null !== a ? a.memoizedProps : c, c);
        break;

      case 3:
        Sa && (b = b.stateNode, b.hydrate && (b.hydrate = !1, xb(b.containerInfo)));
        break;

      case 12:
        break;

      case 13:
        df(b);
        ef(b);
        break;

      case 19:
        ef(b);
        break;

      case 17:
        break;

      case 20:
        break;

      case 21:
        break;

      default:
        throw Error(n(163));
    } else {
      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ue(4, 8, b);
          return;

        case 12:
          return;

        case 13:
          df(b);
          ef(b);
          return;

        case 19:
          ef(b);
          return;

        case 3:
          Sa && (c = b.stateNode, c.hydrate && (c.hydrate = !1, xb(c.containerInfo)));
      }

      a: if (Ra) switch (b.tag) {
        case 1:
        case 5:
        case 6:
        case 20:
          break a;

        case 3:
        case 4:
          b = b.stateNode;
          lb(b.containerInfo, b.pendingChildren);
          break a;

        default:
          throw Error(n(163));
      }
    }
  }

  function df(a) {
    var b = a;
    if (null === a.memoizedState) var c = !1;else c = !0, b = a.child, ff = E();
    if (Qa && null !== b) a: if (a = b, Qa) for (b = a;;) {
      if (5 === b.tag) {
        var d = b.stateNode;
        c ? cb(d) : eb(b.stateNode, b.memoizedProps);
      } else if (6 === b.tag) d = b.stateNode, c ? db(d) : fb(d, b.memoizedProps);else if (13 === b.tag && null !== b.memoizedState && null === b.memoizedState.dehydrated) {
        d = b.child.sibling;
        d.return = b;
        b = d;
        continue;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }

      if (b === a) break a;

      for (; null === b.sibling;) {
        if (null === b.return || b.return === a) break a;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  function ef(a) {
    var b = a.updateQueue;

    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Oe());
      b.forEach(function (b) {
        var d = gf.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }

  var hf = "function" === typeof WeakMap ? WeakMap : Map;

  function jf(a, b, c) {
    c = Gc(c, null);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;

    c.callback = function () {
      kf || (kf = !0, lf = d);
      Pe(a, b);
    };

    return c;
  }

  function mf(a, b, c) {
    c = Gc(c, null);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;

    if ("function" === typeof d) {
      var e = b.value;

      c.payload = function () {
        Pe(a, b);
        return d(e);
      };
    }

    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      "function" !== typeof d && (null === nf ? nf = new Set([this]) : nf.add(this), Pe(a, b));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }

  var of = Math.ceil,
      pf = q.ReactCurrentDispatcher,
      qf = q.ReactCurrentOwner,
      R = 0,
      rf = 8,
      S = 16,
      sf = 32,
      tf = 0,
      uf = 1,
      vf = 2,
      wf = 3,
      xf = 4,
      yf = 5,
      T = R,
      U = null,
      V = null,
      W = 0,
      X = tf,
      zf = null,
      Af = 1073741823,
      Bf = 1073741823,
      Cf = null,
      Df = 0,
      Ef = !1,
      ff = 0,
      Ff = 500,
      Y = null,
      kf = !1,
      lf = null,
      nf = null,
      Gf = !1,
      Hf = null,
      If = 90,
      Jf = null,
      Kf = 0,
      Lf = null,
      Mf = 0;

  function G() {
    return (T & (S | sf)) !== R ? 1073741821 - (E() / 10 | 0) : 0 !== Mf ? Mf : Mf = 1073741821 - (E() / 10 | 0);
  }

  function Vc(a, b, c) {
    b = b.mode;
    if (0 === (b & 2)) return 1073741823;
    var d = fc();
    if (0 === (b & 4)) return 99 === d ? 1073741823 : 1073741822;
    if ((T & S) !== R) return W;
    if (null !== c) a = mc(a, c.timeoutMs | 0 || 5E3, 250);else switch (d) {
      case 99:
        a = 1073741823;
        break;

      case 98:
        a = mc(a, 150, 100);
        break;

      case 97:
      case 96:
        a = mc(a, 5E3, 250);
        break;

      case 95:
        a = 2;
        break;

      default:
        throw Error(n(326));
    }
    null !== U && a === W && --a;
    return a;
  }

  function Wc(a, b) {
    if (50 < Kf) throw Kf = 0, Lf = null, Error(n(185));
    a = Nf(a, b);

    if (null !== a) {
      var c = fc();
      1073741823 === b ? (T & rf) !== R && (T & (S | sf)) === R ? Of(a) : (Z(a), T === R && F()) : Z(a);
      (T & 4) === R || 98 !== c && 99 !== c || (null === Jf ? Jf = new Map([[a, b]]) : (c = Jf.get(a), (void 0 === c || c > b) && Jf.set(a, b)));
    }
  }

  function Nf(a, b) {
    a.expirationTime < b && (a.expirationTime = b);
    var c = a.alternate;
    null !== c && c.expirationTime < b && (c.expirationTime = b);
    var d = a.return,
        e = null;
    if (null === d && 3 === a.tag) e = a.stateNode;else for (; null !== d;) {
      c = d.alternate;
      d.childExpirationTime < b && (d.childExpirationTime = b);
      null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);

      if (null === d.return && 3 === d.tag) {
        e = d.stateNode;
        break;
      }

      d = d.return;
    }
    null !== e && (U === e && (Pc(b), X === xf && Pf(e, W)), Qf(e, b));
    return e;
  }

  function Rf(a) {
    var b = a.lastExpiredTime;
    if (0 !== b) return b;
    b = a.firstPendingTime;
    if (!Sf(a, b)) return b;
    b = a.lastPingedTime;
    a = a.nextKnownPendingLevel;
    return b > a ? b : a;
  }

  function Z(a) {
    if (0 !== a.lastExpiredTime) a.callbackExpirationTime = 1073741823, a.callbackPriority = 99, a.callbackNode = jc(Of.bind(null, a));else {
      var b = Rf(a),
          c = a.callbackNode;
      if (0 === b) null !== c && (a.callbackNode = null, a.callbackExpirationTime = 0, a.callbackPriority = 90);else {
        var d = G();
        1073741823 === b ? d = 99 : 1 === b || 2 === b ? d = 95 : (d = 10 * (1073741821 - b) - 10 * (1073741821 - d), d = 0 >= d ? 99 : 250 >= d ? 98 : 5250 >= d ? 97 : 95);

        if (null !== c) {
          var e = a.callbackPriority;
          if (a.callbackExpirationTime === b && e >= d) return;
          c !== $b && Ob(c);
        }

        a.callbackExpirationTime = b;
        a.callbackPriority = d;
        b = 1073741823 === b ? jc(Of.bind(null, a)) : ic(d, Tf.bind(null, a), {
          timeout: 10 * (1073741821 - b) - E()
        });
        a.callbackNode = b;
      }
    }
  }

  function Tf(a, b) {
    Mf = 0;
    if (b) return b = G(), Uf(a, b), Z(a), null;
    var c = Rf(a);

    if (0 !== c) {
      b = a.callbackNode;
      if ((T & (S | sf)) !== R) throw Error(n(327));
      Vf();
      a === U && c === W || Wf(a, c);

      if (null !== V) {
        var d = T;
        T |= S;
        var e = Xf();

        do try {
          Yf();
          break;
        } catch (l) {
          Zf(a, l);
        } while (1);

        wc();
        T = d;
        pf.current = e;
        if (X === uf) throw b = zf, Wf(a, c), Pf(a, c), Z(a), b;
        if (null === V) switch (e = a.finishedWork = a.current.alternate, a.finishedExpirationTime = c, d = X, U = null, d) {
          case tf:
          case uf:
            throw Error(n(345));

          case vf:
            Uf(a, 2 < c ? 2 : c);
            break;

          case wf:
            Pf(a, c);
            d = a.lastSuspendedTime;
            c === d && (a.nextKnownPendingLevel = $f(e));

            if (1073741823 === Af && (e = ff + Ff - E(), 10 < e)) {
              if (Ef) {
                var f = a.lastPingedTime;

                if (0 === f || f >= c) {
                  a.lastPingedTime = c;
                  Wf(a, c);
                  break;
                }
              }

              f = Rf(a);
              if (0 !== f && f !== c) break;

              if (0 !== d && d !== c) {
                a.lastPingedTime = d;
                break;
              }

              a.timeoutHandle = Ma(ag.bind(null, a), e);
              break;
            }

            ag(a);
            break;

          case xf:
            Pf(a, c);
            d = a.lastSuspendedTime;
            c === d && (a.nextKnownPendingLevel = $f(e));

            if (Ef && (e = a.lastPingedTime, 0 === e || e >= c)) {
              a.lastPingedTime = c;
              Wf(a, c);
              break;
            }

            e = Rf(a);
            if (0 !== e && e !== c) break;

            if (0 !== d && d !== c) {
              a.lastPingedTime = d;
              break;
            }

            1073741823 !== Bf ? d = 10 * (1073741821 - Bf) - E() : 1073741823 === Af ? d = 0 : (d = 10 * (1073741821 - Af) - 5E3, e = E(), c = 10 * (1073741821 - c) - e, d = e - d, 0 > d && (d = 0), d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * of(d / 1960)) - d, c < d && (d = c));

            if (10 < d) {
              a.timeoutHandle = Ma(ag.bind(null, a), d);
              break;
            }

            ag(a);
            break;

          case yf:
            if (1073741823 !== Af && null !== Cf) {
              f = Af;
              var g = Cf;
              d = g.busyMinDurationMs | 0;
              0 >= d ? d = 0 : (e = g.busyDelayMs | 0, f = E() - (10 * (1073741821 - f) - (g.timeoutMs | 0 || 5E3)), d = f <= e ? 0 : e + d - f);

              if (10 < d) {
                Pf(a, c);
                a.timeoutHandle = Ma(ag.bind(null, a), d);
                break;
              }
            }

            ag(a);
            break;

          default:
            throw Error(n(329));
        }
        Z(a);
        if (a.callbackNode === b) return Tf.bind(null, a);
      }
    }

    return null;
  }

  function Of(a) {
    var b = a.lastExpiredTime;
    b = 0 !== b ? b : 1073741823;
    if (a.finishedExpirationTime === b) ag(a);else {
      if ((T & (S | sf)) !== R) throw Error(n(327));
      Vf();
      a === U && b === W || Wf(a, b);

      if (null !== V) {
        var c = T;
        T |= S;
        var d = Xf();

        do try {
          bg();
          break;
        } catch (e) {
          Zf(a, e);
        } while (1);

        wc();
        T = c;
        pf.current = d;
        if (X === uf) throw c = zf, Wf(a, b), Pf(a, b), Z(a), c;
        if (null !== V) throw Error(n(261));
        a.finishedWork = a.current.alternate;
        a.finishedExpirationTime = b;
        U = null;
        ag(a);
        Z(a);
      }
    }
    return null;
  }

  function cg(a, b) {
    Uf(a, b);
    Z(a);
    (T & (S | sf)) === R && F();
  }

  function dg() {
    if (null !== Jf) {
      var a = Jf;
      Jf = null;
      a.forEach(function (a, c) {
        Uf(c, a);
        Z(c);
      });
      F();
    }
  }

  function eg(a, b) {
    if ((T & (S | sf)) !== R) throw Error(n(187));
    var c = T;
    T |= 1;

    try {
      return hc(99, a.bind(null, b));
    } finally {
      T = c, F();
    }
  }

  function Wf(a, b) {
    a.finishedWork = null;
    a.finishedExpirationTime = 0;
    var c = a.timeoutHandle;
    c !== Oa && (a.timeoutHandle = Oa, Na(c));
    if (null !== V) for (c = V.return; null !== c;) {
      var d = c;

      switch (d.tag) {
        case 1:
          var e = d.type.childContextTypes;
          null !== e && void 0 !== e && Gb();
          break;

        case 3:
          rd();
          Hb();
          break;

        case 5:
          td(d);
          break;

        case 4:
          rd();
          break;

        case 13:
          y(I);
          break;

        case 19:
          y(I);
          break;

        case 10:
          yc(d);
      }

      c = c.return;
    }
    U = a;
    V = fd(a.current, null);
    W = b;
    X = tf;
    zf = null;
    Bf = Af = 1073741823;
    Cf = null;
    Df = 0;
    Ef = !1;
  }

  function Zf(a, b) {
    do {
      try {
        wc();
        Nd();
        if (null === V || null === V.return) return X = uf, zf = b, null;

        a: {
          var c = a,
              d = V.return,
              e = V,
              f = b;
          b = W;
          e.effectTag |= 2048;
          e.firstEffect = e.lastEffect = null;

          if (null !== f && "object" === typeof f && "function" === typeof f.then) {
            var g = f,
                l = 0 !== (I.current & 1),
                h = d;

            do {
              var k;

              if (k = 13 === h.tag) {
                var p = h.memoizedState;
                if (null !== p) k = null !== p.dehydrated ? !0 : !1;else {
                  var D = h.memoizedProps;
                  k = void 0 === D.fallback ? !1 : !0 !== D.unstable_avoidThisFallback ? !0 : l ? !1 : !0;
                }
              }

              if (k) {
                var x = h.updateQueue;

                if (null === x) {
                  var K = new Set();
                  K.add(g);
                  h.updateQueue = K;
                } else x.add(g);

                if (0 === (h.mode & 2)) {
                  h.effectTag |= 64;
                  e.effectTag &= -2981;
                  if (1 === e.tag) if (null === e.alternate) e.tag = 17;else {
                    var Ha = Gc(1073741823, null);
                    Ha.tag = 2;
                    Ic(e, Ha);
                  }
                  e.expirationTime = 1073741823;
                  break a;
                }

                f = void 0;
                e = b;
                var O = c.pingCache;
                null === O ? (O = c.pingCache = new hf(), f = new Set(), O.set(g, f)) : (f = O.get(g), void 0 === f && (f = new Set(), O.set(g, f)));

                if (!f.has(e)) {
                  f.add(e);
                  var w = fg.bind(null, c, g, e);
                  g.then(w, w);
                }

                h.effectTag |= 4096;
                h.expirationTime = b;
                break a;
              }

              h = h.return;
            } while (null !== h);

            f = Error((ta(e.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + Ab(e));
          }

          X !== yf && (X = vf);
          f = Ne(f, e);
          h = d;

          do {
            switch (h.tag) {
              case 3:
                g = f;
                h.effectTag |= 4096;
                h.expirationTime = b;
                var r = jf(h, g, b);
                Jc(h, r);
                break a;

              case 1:
                g = f;
                var t = h.type,
                    N = h.stateNode;

                if (0 === (h.effectTag & 64) && ("function" === typeof t.getDerivedStateFromError || null !== N && "function" === typeof N.componentDidCatch && (null === nf || !nf.has(N)))) {
                  h.effectTag |= 4096;
                  h.expirationTime = b;
                  var Mc = mf(h, g, b);
                  Jc(h, Mc);
                  break a;
                }

            }

            h = h.return;
          } while (null !== h);
        }

        V = gg(V);
      } catch (Sb) {
        b = Sb;
        continue;
      }

      break;
    } while (1);
  }

  function Xf() {
    var a = pf.current;
    pf.current = Md;
    return null === a ? Md : a;
  }

  function Oc(a, b) {
    a < Af && 2 < a && (Af = a);
    null !== b && a < Bf && 2 < a && (Bf = a, Cf = b);
  }

  function Pc(a) {
    a > Df && (Df = a);
  }

  function bg() {
    for (; null !== V;) V = hg(V);
  }

  function Yf() {
    for (; null !== V && !Pb();) V = hg(V);
  }

  function hg(a) {
    var b = ig(a.alternate, a, W);
    a.memoizedProps = a.pendingProps;
    null === b && (b = gg(a));
    qf.current = null;
    return b;
  }

  function gg(a) {
    V = a;

    do {
      var b = V.alternate;
      a = V.return;

      if (0 === (V.effectTag & 2048)) {
        a: {
          var c = b;
          b = V;
          var d = W,
              e = b.pendingProps;

          switch (b.tag) {
            case 2:
              break;

            case 16:
              break;

            case 15:
            case 0:
              break;

            case 1:
              C(b.type) && Gb();
              break;

            case 3:
              rd();
              Hb();
              e = b.stateNode;
              e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null);
              (null === c || null === c.child) && ne(b) && Fe(b);
              He(b);
              break;

            case 5:
              td(b);
              var f = pd(od.current);
              d = b.type;
              if (null !== c && null != b.stateNode) Ie(c, b, d, e, f), c.ref !== b.ref && (b.effectTag |= 128);else if (e) {
                c = pd(H.current);

                if (ne(b)) {
                  e = b;
                  if (!Sa) throw Error(n(175));
                  c = ub(e.stateNode, e.type, e.memoizedProps, f, c, e);
                  e.updateQueue = c;
                  c = null !== c ? !0 : !1;
                  c && Fe(b);
                } else {
                  var g = Ea(d, e, f, c, b);
                  Ge(g, b, !1, !1);
                  b.stateNode = g;
                  Ga(g, d, e, f, c) && Fe(b);
                }

                null !== b.ref && (b.effectTag |= 128);
              } else if (null === b.stateNode) throw Error(n(166));
              break;

            case 6:
              if (c && null != b.stateNode) Je(c, b, c.memoizedProps, e);else {
                if ("string" !== typeof e && null === b.stateNode) throw Error(n(166));
                c = pd(od.current);
                f = pd(H.current);

                if (ne(b)) {
                  c = b;
                  if (!Sa) throw Error(n(176));
                  (c = vb(c.stateNode, c.memoizedProps, c)) && Fe(b);
                } else b.stateNode = La(e, c, f, b);
              }
              break;

            case 11:
              break;

            case 13:
              y(I);
              e = b.memoizedState;

              if (0 !== (b.effectTag & 64)) {
                b.expirationTime = d;
                break a;
              }

              e = null !== e;
              f = !1;
              null === c ? void 0 !== b.memoizedProps.fallback && ne(b) : (d = c.memoizedState, f = null !== d, e || null === d || (d = c.child.sibling, null !== d && (g = b.firstEffect, null !== g ? (b.firstEffect = d, d.nextEffect = g) : (b.firstEffect = b.lastEffect = d, d.nextEffect = null), d.effectTag = 8)));
              if (e && !f && 0 !== (b.mode & 2)) if (null === c && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (I.current & 1)) X === tf && (X = wf);else {
                if (X === tf || X === wf) X = xf;
                0 !== Df && null !== U && (Pf(U, W), Qf(U, Df));
              }
              Ra && e && (b.effectTag |= 4);
              Qa && (e || f) && (b.effectTag |= 4);
              break;

            case 7:
              break;

            case 8:
              break;

            case 12:
              break;

            case 4:
              rd();
              He(b);
              break;

            case 10:
              yc(b);
              break;

            case 9:
              break;

            case 14:
              break;

            case 17:
              C(b.type) && Gb();
              break;

            case 19:
              y(I);
              e = b.memoizedState;
              if (null === e) break;
              f = 0 !== (b.effectTag & 64);
              g = e.rendering;
              if (null === g) {
                if (f) Le(e, !1);else {
                  if (X !== tf || null !== c && 0 !== (c.effectTag & 64)) for (c = b.child; null !== c;) {
                    g = ud(c);

                    if (null !== g) {
                      b.effectTag |= 64;
                      Le(e, !1);
                      c = g.updateQueue;
                      null !== c && (b.updateQueue = c, b.effectTag |= 4);
                      null === e.lastEffect && (b.firstEffect = null);
                      b.lastEffect = e.lastEffect;
                      c = d;

                      for (e = b.child; null !== e;) f = e, d = c, f.effectTag &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childExpirationTime = 0, f.expirationTime = d, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null) : (f.childExpirationTime = g.childExpirationTime, f.expirationTime = g.expirationTime, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, d = g.dependencies, f.dependencies = null === d ? null : {
                        expirationTime: d.expirationTime,
                        firstContext: d.firstContext,
                        responders: d.responders
                      }), e = e.sibling;

                      z(I, I.current & 1 | 2);
                      b = b.child;
                      break a;
                    }

                    c = c.sibling;
                  }
                }
              } else {
                if (!f) if (c = ud(g), null !== c) {
                  if (b.effectTag |= 64, f = !0, c = c.updateQueue, null !== c && (b.updateQueue = c, b.effectTag |= 4), Le(e, !0), null === e.tail && "hidden" === e.tailMode && !g.alternate) {
                    b = b.lastEffect = e.lastEffect;
                    null !== b && (b.nextEffect = null);
                    break;
                  }
                } else E() > e.tailExpiration && 1 < d && (b.effectTag |= 64, f = !0, Le(e, !1), b.expirationTime = b.childExpirationTime = d - 1);
                e.isBackwards ? (g.sibling = b.child, b.child = g) : (c = e.last, null !== c ? c.sibling = g : b.child = g, e.last = g);
              }

              if (null !== e.tail) {
                0 === e.tailExpiration && (e.tailExpiration = E() + 500);
                c = e.tail;
                e.rendering = c;
                e.tail = c.sibling;
                e.lastEffect = b.lastEffect;
                c.sibling = null;
                e = I.current;
                e = f ? e & 1 | 2 : e & 1;
                z(I, e);
                b = c;
                break a;
              }

              break;

            case 20:
              break;

            case 21:
              break;

            default:
              throw Error(n(156, b.tag));
          }

          b = null;
        }

        c = V;

        if (1 === W || 1 !== c.childExpirationTime) {
          e = 0;

          for (f = c.child; null !== f;) d = f.expirationTime, g = f.childExpirationTime, d > e && (e = d), g > e && (e = g), f = f.sibling;

          c.childExpirationTime = e;
        }

        if (null !== b) return b;
        null !== a && 0 === (a.effectTag & 2048) && (null === a.firstEffect && (a.firstEffect = V.firstEffect), null !== V.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = V.firstEffect), a.lastEffect = V.lastEffect), 1 < V.effectTag && (null !== a.lastEffect ? a.lastEffect.nextEffect = V : a.firstEffect = V, a.lastEffect = V));
      } else {
        b = Me(V);
        if (null !== b) return b.effectTag &= 2047, b;
        null !== a && (a.firstEffect = a.lastEffect = null, a.effectTag |= 2048);
      }

      b = V.sibling;
      if (null !== b) return b;
      V = a;
    } while (null !== V);

    X === tf && (X = yf);
    return null;
  }

  function $f(a) {
    var b = a.expirationTime;
    a = a.childExpirationTime;
    return b > a ? b : a;
  }

  function ag(a) {
    var b = fc();
    hc(99, jg.bind(null, a, b));
    return null;
  }

  function jg(a, b) {
    do Vf(); while (null !== Hf);

    if ((T & (S | sf)) !== R) throw Error(n(327));
    var c = a.finishedWork,
        d = a.finishedExpirationTime;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedExpirationTime = 0;
    if (c === a.current) throw Error(n(177));
    a.callbackNode = null;
    a.callbackExpirationTime = 0;
    a.callbackPriority = 90;
    a.nextKnownPendingLevel = 0;
    var e = $f(c);
    a.firstPendingTime = e;
    d <= a.lastSuspendedTime ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : d <= a.firstSuspendedTime && (a.firstSuspendedTime = d - 1);
    d <= a.lastPingedTime && (a.lastPingedTime = 0);
    d <= a.lastExpiredTime && (a.lastExpiredTime = 0);
    a === U && (V = U = null, W = 0);
    1 < c.effectTag ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, e = c.firstEffect) : e = c : e = c.firstEffect;

    if (null !== e) {
      var f = T;
      T |= sf;
      qf.current = null;
      Ca(a.containerInfo);
      Y = e;

      do try {
        kg();
      } catch (jb) {
        if (null === Y) throw Error(n(330));
        Re(Y, jb);
        Y = Y.nextEffect;
      } while (null !== Y);

      Y = e;

      do try {
        for (var g = a, l = b; null !== Y;) {
          var h = Y.effectTag;
          h & 16 && Qa && bb(Y.stateNode);

          if (h & 128) {
            var k = Y.alternate;

            if (null !== k) {
              var p = k.ref;
              null !== p && ("function" === typeof p ? p(null) : p.current = null);
            }
          }

          switch (h & 1038) {
            case 2:
              bf(Y);
              Y.effectTag &= -3;
              break;

            case 6:
              bf(Y);
              Y.effectTag &= -3;
              cf(Y.alternate, Y);
              break;

            case 1024:
              Y.effectTag &= -1025;
              break;

            case 1028:
              Y.effectTag &= -1025;
              cf(Y.alternate, Y);
              break;

            case 4:
              cf(Y.alternate, Y);
              break;

            case 8:
              var D = g,
                  x = Y,
                  K = l;
              Qa ? Xe(D, x, K) : Ze(D, x, K);
              $e(x);
          }

          Y = Y.nextEffect;
        }
      } catch (jb) {
        if (null === Y) throw Error(n(330));
        Re(Y, jb);
        Y = Y.nextEffect;
      } while (null !== Y);

      Da(a.containerInfo);
      a.current = c;
      Y = e;

      do try {
        for (h = d; null !== Y;) {
          var Ha = Y.effectTag;

          if (Ha & 36) {
            var O = Y.alternate;
            k = Y;
            p = h;

            switch (k.tag) {
              case 0:
              case 11:
              case 15:
                Ue(16, 32, k);
                break;

              case 1:
                var w = k.stateNode;
                if (k.effectTag & 4) if (null === O) w.componentDidMount();else {
                  var r = k.elementType === k.type ? O.memoizedProps : rc(k.type, O.memoizedProps);
                  w.componentDidUpdate(r, O.memoizedState, w.__reactInternalSnapshotBeforeUpdate);
                }
                var t = k.updateQueue;
                null !== t && Qc(k, t, w, p);
                break;

              case 3:
                var N = k.updateQueue;

                if (null !== N) {
                  g = null;
                  if (null !== k.child) switch (k.child.tag) {
                    case 5:
                      g = za(k.child.stateNode);
                      break;

                    case 1:
                      g = k.child.stateNode;
                  }
                  Qc(k, N, g, p);
                }

                break;

              case 5:
                var Mc = k.stateNode;
                null === O && k.effectTag & 4 && Wa(Mc, k.type, k.memoizedProps, k);
                break;

              case 6:
                break;

              case 4:
                break;

              case 12:
                break;

              case 13:
                if (Sa && null === k.memoizedState) {
                  var Sb = k.alternate;

                  if (null !== Sb) {
                    var le = Sb.memoizedState;

                    if (null !== le) {
                      var me = le.dehydrated;
                      null !== me && yb(me);
                    }
                  }
                }

                break;

              case 19:
              case 17:
              case 20:
              case 21:
                break;

              default:
                throw Error(n(163));
            }
          }

          if (Ha & 128) {
            k = void 0;
            var Tb = Y.ref;

            if (null !== Tb) {
              var v = Y.stateNode;

              switch (Y.tag) {
                case 5:
                  k = za(v);
                  break;

                default:
                  k = v;
              }

              "function" === typeof Tb ? Tb(k) : Tb.current = k;
            }
          }

          Y = Y.nextEffect;
        }
      } catch (jb) {
        if (null === Y) throw Error(n(330));
        Re(Y, jb);
        Y = Y.nextEffect;
      } while (null !== Y);

      Y = null;
      ac();
      T = f;
    } else a.current = c;

    if (Gf) Gf = !1, Hf = a, If = b;else for (Y = e; null !== Y;) b = Y.nextEffect, Y.nextEffect = null, Y = b;
    b = a.firstPendingTime;
    0 === b && (nf = null);
    1073741823 === b ? a === Lf ? Kf++ : (Kf = 0, Lf = a) : Kf = 0;
    "function" === typeof lg && lg(c.stateNode, d);
    Z(a);
    if (kf) throw kf = !1, a = lf, lf = null, a;
    if ((T & rf) !== R) return null;
    F();
    return null;
  }

  function kg() {
    for (; null !== Y;) {
      var a = Y.effectTag;
      0 !== (a & 256) && Te(Y.alternate, Y);
      0 === (a & 512) || Gf || (Gf = !0, ic(97, function () {
        Vf();
        return null;
      }));
      Y = Y.nextEffect;
    }
  }

  function Vf() {
    if (90 !== If) {
      var a = 97 < If ? 97 : If;
      If = 90;
      return hc(a, mg);
    }
  }

  function mg() {
    if (null === Hf) return !1;
    var a = Hf;
    Hf = null;
    if ((T & (S | sf)) !== R) throw Error(n(331));
    var b = T;
    T |= sf;

    for (a = a.current.firstEffect; null !== a;) {
      try {
        var c = a;
        if (0 !== (c.effectTag & 512)) switch (c.tag) {
          case 0:
          case 11:
          case 15:
            Ue(128, 0, c), Ue(0, 64, c);
        }
      } catch (d) {
        if (null === a) throw Error(n(330));
        Re(a, d);
      }

      c = a.nextEffect;
      a.nextEffect = null;
      a = c;
    }

    T = b;
    F();
    return !0;
  }

  function ng(a, b, c) {
    b = Ne(c, b);
    b = jf(a, b, 1073741823);
    Ic(a, b);
    a = Nf(a, 1073741823);
    null !== a && Z(a);
  }

  function Re(a, b) {
    if (3 === a.tag) ng(a, a, b);else for (var c = a.return; null !== c;) {
      if (3 === c.tag) {
        ng(c, a, b);
        break;
      } else if (1 === c.tag) {
        var d = c.stateNode;

        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === nf || !nf.has(d))) {
          a = Ne(b, a);
          a = mf(c, a, 1073741823);
          Ic(c, a);
          c = Nf(c, 1073741823);
          null !== c && Z(c);
          break;
        }
      }

      c = c.return;
    }
  }

  function fg(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    U === a && W === c ? X === xf || X === wf && 1073741823 === Af && E() - ff < Ff ? Wf(a, W) : Ef = !0 : Sf(a, c) && (b = a.lastPingedTime, 0 !== b && b < c || (a.lastPingedTime = c, a.finishedExpirationTime === c && (a.finishedExpirationTime = 0, a.finishedWork = null), Z(a)));
  }

  function gf(a, b) {
    var c = a.stateNode;
    null !== c && c.delete(b);
    b = 0;
    0 === b && (b = G(), b = Vc(b, a, null));
    a = Nf(a, b);
    null !== a && Z(a);
  }

  var ig;

  ig = function (a, b, c) {
    var d = b.expirationTime;

    if (null !== a) {
      var e = b.pendingProps;
      if (a.memoizedProps !== e || B.current) Bc = !0;else {
        if (d < c) {
          Bc = !1;

          switch (b.tag) {
            case 3:
              ze(b);
              oe();
              break;

            case 5:
              sd(b);
              if (b.mode & 4 && 1 !== c && Ka(b.type, e)) return b.expirationTime = b.childExpirationTime = 1, null;
              break;

            case 1:
              C(b.type) && Kb(b);
              break;

            case 4:
              qd(b, b.stateNode.containerInfo);
              break;

            case 10:
              xc(b, b.memoizedProps.value);
              break;

            case 13:
              if (null !== b.memoizedState) {
                d = b.child.childExpirationTime;
                if (0 !== d && d >= c) return Be(a, b, c);
                z(I, I.current & 1);
                b = re(a, b, c);
                return null !== b ? b.sibling : null;
              }

              z(I, I.current & 1);
              break;

            case 19:
              d = b.childExpirationTime >= c;

              if (0 !== (a.effectTag & 64)) {
                if (d) return Ee(a, b, c);
                b.effectTag |= 64;
              }

              e = b.memoizedState;
              null !== e && (e.rendering = null, e.tail = null);
              z(I, I.current);
              if (!d) return null;
          }

          return re(a, b, c);
        }

        Bc = !1;
      }
    } else Bc = !1;

    b.expirationTime = 0;

    switch (b.tag) {
      case 2:
        d = b.type;
        null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
        a = b.pendingProps;
        e = Fb(b, A.current);
        Ac(b, c);
        e = Jd(null, b, d, a, e, c);
        b.effectTag |= 1;

        if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
          b.tag = 1;
          Nd();

          if (C(d)) {
            var f = !0;
            Kb(b);
          } else f = !1;

          b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
          var g = d.getDerivedStateFromProps;
          "function" === typeof g && Uc(b, d, g, a);
          e.updater = Xc;
          b.stateNode = e;
          e._reactInternalFiber = b;
          ad(b, d, a, c);
          b = ye(null, b, d, !0, f, c);
        } else b.tag = 0, Q(null, b, e, c), b = b.child;

        return b;

      case 16:
        e = b.elementType;
        null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
        a = b.pendingProps;
        sa(e);
        if (1 !== e._status) throw e._result;
        e = e._result;
        b.type = e;
        f = b.tag = og(e);
        a = rc(e, a);

        switch (f) {
          case 0:
            b = ve(null, b, e, a, c);
            break;

          case 1:
            b = xe(null, b, e, a, c);
            break;

          case 11:
            b = qe(null, b, e, a, c);
            break;

          case 14:
            b = se(null, b, e, rc(e.type, a), d, c);
            break;

          default:
            throw Error(n(306, e, ""));
        }

        return b;

      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : rc(d, e), ve(a, b, d, e, c);

      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : rc(d, e), xe(a, b, d, e, c);

      case 3:
        ze(b);
        d = b.updateQueue;
        if (null === d) throw Error(n(282));
        e = b.memoizedState;
        e = null !== e ? e.element : null;
        Nc(b, d, b.pendingProps, null, c);
        d = b.memoizedState.element;
        if (d === e) oe(), b = re(a, b, c);else {
          if (e = b.stateNode.hydrate) Sa ? (ee = tb(b.stateNode.containerInfo), de = b, e = fe = !0) : e = !1;
          if (e) for (c = ld(b, null, d, c), b.child = c; c;) c.effectTag = c.effectTag & -3 | 1024, c = c.sibling;else Q(a, b, d, c), oe();
          b = b.child;
        }
        return b;

      case 5:
        return sd(b), null === a && je(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ja(d, e) ? g = null : null !== f && Ja(d, f) && (b.effectTag |= 16), we(a, b), b.mode & 4 && 1 !== c && Ka(d, e) ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (Q(a, b, g, c), b = b.child), b;

      case 6:
        return null === a && je(b), null;

      case 13:
        return Be(a, b, c);

      case 4:
        return qd(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = kd(b, null, d, c) : Q(a, b, d, c), b.child;

      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : rc(d, e), qe(a, b, d, e, c);

      case 7:
        return Q(a, b, b.pendingProps, c), b.child;

      case 8:
        return Q(a, b, b.pendingProps.children, c), b.child;

      case 12:
        return Q(a, b, b.pendingProps.children, c), b.child;

      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          g = b.memoizedProps;
          f = e.value;
          xc(b, f);

          if (null !== g) {
            var l = g.value;
            f = oc(l, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(l, f) : 1073741823) | 0;

            if (0 === f) {
              if (g.children === e.children && !B.current) {
                b = re(a, b, c);
                break a;
              }
            } else for (l = b.child, null !== l && (l.return = b); null !== l;) {
              var h = l.dependencies;

              if (null !== h) {
                g = l.child;

                for (var k = h.firstContext; null !== k;) {
                  if (k.context === d && 0 !== (k.observedBits & f)) {
                    1 === l.tag && (k = Gc(c, null), k.tag = 2, Ic(l, k));
                    l.expirationTime < c && (l.expirationTime = c);
                    k = l.alternate;
                    null !== k && k.expirationTime < c && (k.expirationTime = c);
                    zc(l.return, c);
                    h.expirationTime < c && (h.expirationTime = c);
                    break;
                  }

                  k = k.next;
                }
              } else g = 10 === l.tag ? l.type === b.type ? null : l.child : l.child;

              if (null !== g) g.return = l;else for (g = l; null !== g;) {
                if (g === b) {
                  g = null;
                  break;
                }

                l = g.sibling;

                if (null !== l) {
                  l.return = g.return;
                  g = l;
                  break;
                }

                g = g.return;
              }
              l = g;
            }
          }

          Q(a, b, e.children, c);
          b = b.child;
        }

        return b;

      case 9:
        return e = b.type, f = b.pendingProps, d = f.children, Ac(b, c), e = Cc(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, Q(a, b, d, c), b.child;

      case 14:
        return e = b.type, f = rc(e, b.pendingProps), f = rc(e.type, f), se(a, b, e, f, d, c);

      case 15:
        return ue(a, b, b.type, b.pendingProps, d, c);

      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : rc(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, C(d) ? (a = !0, Kb(b)) : a = !1, Ac(b, c), Zc(b, d, e), ad(b, d, e, c), ye(null, b, d, !0, a, c);

      case 19:
        return Ee(a, b, c);
    }

    throw Error(n(156, b.tag));
  };

  var lg = null,
      We = null;

  function pg(a) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
    var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (b.isDisabled || !b.supportsFiber) return !0;

    try {
      var c = b.inject(a);

      lg = function (a) {
        try {
          b.onCommitFiberRoot(c, a, void 0, 64 === (a.current.effectTag & 64));
        } catch (e) {}
      };

      We = function (a) {
        try {
          b.onCommitFiberUnmount(c, a);
        } catch (e) {}
      };
    } catch (d) {}

    return !0;
  }

  function qg(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.effectTag = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childExpirationTime = this.expirationTime = 0;
    this.alternate = null;
  }

  function he(a, b, c, d) {
    return new qg(a, b, c, d);
  }

  function te(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }

  function og(a) {
    if ("function" === typeof a) return te(a) ? 1 : 0;

    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === la) return 11;
      if (a === oa) return 14;
    }

    return 2;
  }

  function fd(a, b) {
    var c = a.alternate;
    null === c ? (c = he(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
    c.childExpirationTime = a.childExpirationTime;
    c.expirationTime = a.expirationTime;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : {
      expirationTime: b.expirationTime,
      firstContext: b.firstContext,
      responders: b.responders
    };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }

  function hd(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) te(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case ea:
        return jd(c.children, e, f, b);

      case ka:
        g = 8;
        e |= 7;
        break;

      case fa:
        g = 8;
        e |= 1;
        break;

      case ha:
        return a = he(12, c, b, e | 8), a.elementType = ha, a.type = ha, a.expirationTime = f, a;

      case ma:
        return a = he(13, c, b, e), a.type = ma, a.elementType = ma, a.expirationTime = f, a;

      case na:
        return a = he(19, c, b, e), a.elementType = na, a.expirationTime = f, a;

      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case ia:
            g = 10;
            break a;

          case ja:
            g = 9;
            break a;

          case la:
            g = 11;
            break a;

          case oa:
            g = 14;
            break a;

          case pa:
            g = 16;
            d = null;
            break a;
        }
        throw Error(n(130, null == a ? a : typeof a, ""));
    }
    b = he(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.expirationTime = f;
    return b;
  }

  function jd(a, b, c, d) {
    a = he(7, a, d, b);
    a.expirationTime = c;
    return a;
  }

  function gd(a, b, c) {
    a = he(6, a, null, b);
    a.expirationTime = c;
    return a;
  }

  function id(a, b, c) {
    b = he(4, null !== a.children ? a.children : [], a.key, b);
    b.expirationTime = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }

  function rg(a, b, c) {
    this.tag = b;
    this.current = null;
    this.containerInfo = a;
    this.pingCache = this.pendingChildren = null;
    this.finishedExpirationTime = 0;
    this.finishedWork = null;
    this.timeoutHandle = Oa;
    this.pendingContext = this.context = null;
    this.hydrate = c;
    this.callbackNode = null;
    this.callbackPriority = 90;
    this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
  }

  function Sf(a, b) {
    var c = a.firstSuspendedTime;
    a = a.lastSuspendedTime;
    return 0 !== c && c >= b && a <= b;
  }

  function Pf(a, b) {
    var c = a.firstSuspendedTime,
        d = a.lastSuspendedTime;
    c < b && (a.firstSuspendedTime = b);
    if (d > b || 0 === c) a.lastSuspendedTime = b;
    b <= a.lastPingedTime && (a.lastPingedTime = 0);
    b <= a.lastExpiredTime && (a.lastExpiredTime = 0);
  }

  function Qf(a, b) {
    b > a.firstPendingTime && (a.firstPendingTime = b);
    var c = a.firstSuspendedTime;
    0 !== c && (b >= c ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : b >= a.lastSuspendedTime && (a.lastSuspendedTime = b + 1), b > a.nextKnownPendingLevel && (a.nextKnownPendingLevel = b));
  }

  function Uf(a, b) {
    var c = a.lastExpiredTime;
    if (0 === c || c > b) a.lastExpiredTime = b;
  }

  function sg(a) {
    var b = a._reactInternalFiber;

    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(n(188));
      throw Error(n(268, Object.keys(a)));
    }

    a = xa(b);
    return null === a ? null : a.stateNode;
  }

  function tg(a, b) {
    a = a.memoizedState;
    null !== a && null !== a.dehydrated && a.retryTime < b && (a.retryTime = b);
  }

  function ug(a, b) {
    tg(a, b);
    (a = a.alternate) && tg(a, b);
  }

  var vg = {
    createContainer: function (a, b, c) {
      a = new rg(a, b, c);
      b = he(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
      a.current = b;
      return b.stateNode = a;
    },
    updateContainer: function (a, b, c, d) {
      var e = b.current,
          f = G(),
          g = Sc.suspense;
      f = Vc(f, e, g);

      a: if (c) {
        c = c._reactInternalFiber;

        b: {
          if (ua(c) !== c || 1 !== c.tag) throw Error(n(170));
          var l = c;

          do {
            switch (l.tag) {
              case 3:
                l = l.stateNode.context;
                break b;

              case 1:
                if (C(l.type)) {
                  l = l.stateNode.__reactInternalMemoizedMergedChildContext;
                  break b;
                }

            }

            l = l.return;
          } while (null !== l);

          throw Error(n(171));
        }

        if (1 === c.tag) {
          var h = c.type;

          if (C(h)) {
            c = Jb(c, h, l);
            break a;
          }
        }

        c = l;
      } else c = Db;

      null === b.context ? b.context = c : b.pendingContext = c;
      b = Gc(f, g);
      b.payload = {
        element: a
      };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      Ic(e, b);
      Wc(e, f);
      return f;
    },
    batchedEventUpdates: function (a, b) {
      var c = T;
      T |= 2;

      try {
        return a(b);
      } finally {
        T = c, T === R && F();
      }
    },
    batchedUpdates: function (a, b) {
      var c = T;
      T |= 1;

      try {
        return a(b);
      } finally {
        T = c, T === R && F();
      }
    },
    unbatchedUpdates: function (a, b) {
      var c = T;
      T &= -2;
      T |= rf;

      try {
        return a(b);
      } finally {
        T = c, T === R && F();
      }
    },
    deferredUpdates: function (a) {
      return hc(97, a);
    },
    syncUpdates: function (a, b, c, d) {
      return hc(99, a.bind(null, b, c, d));
    },
    discreteUpdates: function (a, b, c, d) {
      var e = T;
      T |= 4;

      try {
        return hc(98, a.bind(null, b, c, d));
      } finally {
        T = e, T === R && F();
      }
    },
    flushDiscreteUpdates: function () {
      (T & (1 | S | sf)) === R && (dg(), Vf());
    },
    flushControlled: function (a) {
      var b = T;
      T |= 1;

      try {
        hc(99, a);
      } finally {
        T = b, T === R && F();
      }
    },
    flushSync: eg,
    flushPassiveEffects: Vf,
    IsThisRendererActing: {
      current: !1
    },
    getPublicRootInstance: function (a) {
      a = a.current;
      if (!a.child) return null;

      switch (a.child.tag) {
        case 5:
          return za(a.child.stateNode);

        default:
          return a.child.stateNode;
      }
    },
    attemptSynchronousHydration: function (a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          b.hydrate && cg(b, b.firstPendingTime);
          break;

        case 13:
          eg(function () {
            return Wc(a, 1073741823);
          }), b = mc(G(), 150, 100), ug(a, b);
      }
    },
    attemptUserBlockingHydration: function (a) {
      if (13 === a.tag) {
        var b = mc(G(), 150, 100);
        Wc(a, b);
        ug(a, b);
      }
    },
    attemptContinuousHydration: function (a) {
      if (13 === a.tag) {
        G();
        var b = lc++;
        Wc(a, b);
        ug(a, b);
      }
    },
    attemptHydrationAtCurrentPriority: function (a) {
      if (13 === a.tag) {
        var b = G();
        b = Vc(b, a, null);
        Wc(a, b);
        ug(a, b);
      }
    },
    findHostInstance: sg,
    findHostInstanceWithWarning: function (a) {
      return sg(a);
    },
    findHostInstanceWithNoPortals: function (a) {
      a = ya(a);
      return null === a ? null : 20 === a.tag ? a.stateNode.instance : a.stateNode;
    },
    shouldSuspend: function () {
      return !1;
    },
    injectIntoDevTools: function (a) {
      var b = a.findFiberByHostInstance;
      return pg(aa({}, a, {
        overrideHookState: null,
        overrideProps: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: q.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (a) {
          a = xa(a);
          return null === a ? null : a.stateNode;
        },
        findFiberByHostInstance: function (a) {
          return b ? b(a) : null;
        },
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null
      }));
    }
  };
  module.exports = vg.default || vg;
  var $$$renderer = module.exports;
  module.exports = $$$reconciler;
  return $$$renderer;
};
});

var reactReconciler = createCommonjsModule(function (module) {

{
  module.exports = reactReconciler_production_min;
}
});

/* eslint-disable yoda */

const isFullwidthCodePoint$1 = codePoint => {
  if (Number.isNaN(codePoint)) {
    return false;
  } // Code points are derived from:
  // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt


  if (codePoint >= 0x1100 && (codePoint <= 0x115F || // Hangul Jamo
  codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
  codePoint === 0x232A || 0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F || 0x3250 <= codePoint && codePoint <= 0x4DBF || 0x4E00 <= codePoint && codePoint <= 0xA4C6 || 0xA960 <= codePoint && codePoint <= 0xA97C || 0xAC00 <= codePoint && codePoint <= 0xD7A3 || 0xF900 <= codePoint && codePoint <= 0xFAFF || 0xFE10 <= codePoint && codePoint <= 0xFE19 || 0xFE30 <= codePoint && codePoint <= 0xFE6B || 0xFF01 <= codePoint && codePoint <= 0xFF60 || 0xFFE0 <= codePoint && codePoint <= 0xFFE6 || 0x1B000 <= codePoint && codePoint <= 0x1B001 || 0x1F200 <= codePoint && codePoint <= 0x1F251 || 0x20000 <= codePoint && codePoint <= 0x3FFFD)) {
    return true;
  }

  return false;
};

var isFullwidthCodePoint_1$1 = isFullwidthCodePoint$1;
var _default$G = isFullwidthCodePoint$1;
isFullwidthCodePoint_1$1.default = _default$G;

var emojiRegex = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};

const stringWidth = string => {
  string = string.replace(emojiRegex(), '  ');

  if (typeof string !== 'string' || string.length === 0) {
    return 0;
  }

  string = stripAnsi__default['default'](string);
  let width = 0;

  for (let i = 0; i < string.length; i++) {
    const code = string.codePointAt(i); // Ignore control characters

    if (code <= 0x1F || code >= 0x7F && code <= 0x9F) {
      continue;
    } // Ignore combining characters


    if (code >= 0x300 && code <= 0x36F) {
      continue;
    } // Surrogates


    if (code > 0xFFFF) {
      i++;
    }

    width += isFullwidthCodePoint_1$1(code) ? 2 : 1;
  }

  return width;
};

var stringWidth_1 = stringWidth; // TODO: remove this in the next major version

var _default$F = stringWidth;
stringWidth_1.default = _default$F;

const widestLine = input => {
  let max = 0;

  for (const line of input.split('\n')) {
    max = Math.max(max, stringWidth_1(line));
  }

  return max;
};

var widestLine_1 = widestLine; // TODO: remove this in the next major version

var _default$E = widestLine;
widestLine_1.default = _default$E;

var __importDefault$o = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const widest_line_1$1 = __importDefault$o(widestLine_1);

const cache$1 = {};

var _default$D = text => {
  if (text.length === 0) {
    return {
      width: 0,
      height: 0
    };
  }

  if (cache$1[text]) {
    return cache$1[text];
  }

  const width = widest_line_1$1.default(text);
  const height = text.split('\n').length;
  cache$1[text] = {
    width,
    height
  };
  return {
    width,
    height
  };
};

var measureText = /*#__PURE__*/Object.defineProperty({
	default: _default$D
}, '__esModule', {value: true});

var __importDefault$n = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};


/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const yoga_layout_prebuilt_1$4 = __importDefault$n(require$$0__default['default']);

const applyPositionStyles = (node, style) => {
  if ('position' in style) {
    node.setPositionType(style.position === 'absolute' ? yoga_layout_prebuilt_1$4.default.POSITION_TYPE_ABSOLUTE : yoga_layout_prebuilt_1$4.default.POSITION_TYPE_RELATIVE);
  }
};

const applyMarginStyles = (node, style) => {
  if ('marginLeft' in style) {
    node.setMargin(yoga_layout_prebuilt_1$4.default.EDGE_START, style.marginLeft || 0);
  }

  if ('marginRight' in style) {
    node.setMargin(yoga_layout_prebuilt_1$4.default.EDGE_END, style.marginRight || 0);
  }

  if ('marginTop' in style) {
    node.setMargin(yoga_layout_prebuilt_1$4.default.EDGE_TOP, style.marginTop || 0);
  }

  if ('marginBottom' in style) {
    node.setMargin(yoga_layout_prebuilt_1$4.default.EDGE_BOTTOM, style.marginBottom || 0);
  }
};

const applyPaddingStyles = (node, style) => {
  if ('paddingLeft' in style) {
    node.setPadding(yoga_layout_prebuilt_1$4.default.EDGE_LEFT, style.paddingLeft || 0);
  }

  if ('paddingRight' in style) {
    node.setPadding(yoga_layout_prebuilt_1$4.default.EDGE_RIGHT, style.paddingRight || 0);
  }

  if ('paddingTop' in style) {
    node.setPadding(yoga_layout_prebuilt_1$4.default.EDGE_TOP, style.paddingTop || 0);
  }

  if ('paddingBottom' in style) {
    node.setPadding(yoga_layout_prebuilt_1$4.default.EDGE_BOTTOM, style.paddingBottom || 0);
  }
};

const applyFlexStyles = (node, style) => {
  var _a;

  if ('flexGrow' in style) {
    node.setFlexGrow((_a = style.flexGrow) !== null && _a !== void 0 ? _a : 0);
  }

  if ('flexShrink' in style) {
    node.setFlexShrink(typeof style.flexShrink === 'number' ? style.flexShrink : 1);
  }

  if ('flexDirection' in style) {
    if (style.flexDirection === 'row') {
      node.setFlexDirection(yoga_layout_prebuilt_1$4.default.FLEX_DIRECTION_ROW);
    }

    if (style.flexDirection === 'row-reverse') {
      node.setFlexDirection(yoga_layout_prebuilt_1$4.default.FLEX_DIRECTION_ROW_REVERSE);
    }

    if (style.flexDirection === 'column') {
      node.setFlexDirection(yoga_layout_prebuilt_1$4.default.FLEX_DIRECTION_COLUMN);
    }

    if (style.flexDirection === 'column-reverse') {
      node.setFlexDirection(yoga_layout_prebuilt_1$4.default.FLEX_DIRECTION_COLUMN_REVERSE);
    }
  }

  if ('flexBasis' in style) {
    if (typeof style.flexBasis === 'number') {
      node.setFlexBasis(style.flexBasis);
    } else if (typeof style.flexBasis === 'string') {
      node.setFlexBasisPercent(Number.parseInt(style.flexBasis, 10));
    } else {
      // This should be replaced with node.setFlexBasisAuto() when new Yoga release is out
      node.setFlexBasis(NaN);
    }
  }

  if ('alignItems' in style) {
    if (style.alignItems === 'stretch' || !style.alignItems) {
      node.setAlignItems(yoga_layout_prebuilt_1$4.default.ALIGN_STRETCH);
    }

    if (style.alignItems === 'flex-start') {
      node.setAlignItems(yoga_layout_prebuilt_1$4.default.ALIGN_FLEX_START);
    }

    if (style.alignItems === 'center') {
      node.setAlignItems(yoga_layout_prebuilt_1$4.default.ALIGN_CENTER);
    }

    if (style.alignItems === 'flex-end') {
      node.setAlignItems(yoga_layout_prebuilt_1$4.default.ALIGN_FLEX_END);
    }
  }

  if ('alignSelf' in style) {
    if (style.alignSelf === 'auto' || !style.alignSelf) {
      node.setAlignSelf(yoga_layout_prebuilt_1$4.default.ALIGN_AUTO);
    }

    if (style.alignSelf === 'flex-start') {
      node.setAlignSelf(yoga_layout_prebuilt_1$4.default.ALIGN_FLEX_START);
    }

    if (style.alignSelf === 'center') {
      node.setAlignSelf(yoga_layout_prebuilt_1$4.default.ALIGN_CENTER);
    }

    if (style.alignSelf === 'flex-end') {
      node.setAlignSelf(yoga_layout_prebuilt_1$4.default.ALIGN_FLEX_END);
    }
  }

  if ('justifyContent' in style) {
    if (style.justifyContent === 'flex-start' || !style.justifyContent) {
      node.setJustifyContent(yoga_layout_prebuilt_1$4.default.JUSTIFY_FLEX_START);
    }

    if (style.justifyContent === 'center') {
      node.setJustifyContent(yoga_layout_prebuilt_1$4.default.JUSTIFY_CENTER);
    }

    if (style.justifyContent === 'flex-end') {
      node.setJustifyContent(yoga_layout_prebuilt_1$4.default.JUSTIFY_FLEX_END);
    }

    if (style.justifyContent === 'space-between') {
      node.setJustifyContent(yoga_layout_prebuilt_1$4.default.JUSTIFY_SPACE_BETWEEN);
    }

    if (style.justifyContent === 'space-around') {
      node.setJustifyContent(yoga_layout_prebuilt_1$4.default.JUSTIFY_SPACE_AROUND);
    }
  }
};

const applyDimensionStyles = (node, style) => {
  var _a, _b;

  if ('width' in style) {
    if (typeof style.width === 'number') {
      node.setWidth(style.width);
    } else if (typeof style.width === 'string') {
      node.setWidthPercent(Number.parseInt(style.width, 10));
    } else {
      node.setWidthAuto();
    }
  }

  if ('height' in style) {
    if (typeof style.height === 'number') {
      node.setHeight(style.height);
    } else if (typeof style.height === 'string') {
      node.setHeightPercent(Number.parseInt(style.height, 10));
    } else {
      node.setHeightAuto();
    }
  }

  if ('minWidth' in style) {
    if (typeof style.minWidth === 'string') {
      node.setMinWidthPercent(Number.parseInt(style.minWidth, 10));
    } else {
      node.setMinWidth((_a = style.minWidth) !== null && _a !== void 0 ? _a : 0);
    }
  }

  if ('minHeight' in style) {
    if (typeof style.minHeight === 'string') {
      node.setMinHeightPercent(Number.parseInt(style.minHeight, 10));
    } else {
      node.setMinHeight((_b = style.minHeight) !== null && _b !== void 0 ? _b : 0);
    }
  }
};

const applyDisplayStyles = (node, style) => {
  if ('display' in style) {
    node.setDisplay(style.display === 'flex' ? yoga_layout_prebuilt_1$4.default.DISPLAY_FLEX : yoga_layout_prebuilt_1$4.default.DISPLAY_NONE);
  }
};

const applyBorderStyles = (node, style) => {
  if ('borderStyle' in style) {
    const borderWidth = typeof style.borderStyle === 'string' ? 1 : 0;
    node.setBorder(yoga_layout_prebuilt_1$4.default.EDGE_TOP, borderWidth);
    node.setBorder(yoga_layout_prebuilt_1$4.default.EDGE_BOTTOM, borderWidth);
    node.setBorder(yoga_layout_prebuilt_1$4.default.EDGE_LEFT, borderWidth);
    node.setBorder(yoga_layout_prebuilt_1$4.default.EDGE_RIGHT, borderWidth);
  }
};

var _default$C = (node, style = {}) => {
  applyPositionStyles(node, style);
  applyMarginStyles(node, style);
  applyPaddingStyles(node, style);
  applyFlexStyles(node, style);
  applyDimensionStyles(node, style);
  applyDisplayStyles(node, style);
  applyBorderStyles(node, style);
};

var styles = /*#__PURE__*/Object.defineProperty({
	default: _default$C
}, '__esModule', {value: true});

var colorName = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};

/* MIT license */

/* eslint-disable no-mixed-operators */
 // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


const reverseKeywords$1 = {};

for (const key of Object.keys(colorName)) {
  reverseKeywords$1[colorName[key]] = key;
}

const convert$3 = {
  rgb: {
    channels: 3,
    labels: 'rgb'
  },
  hsl: {
    channels: 3,
    labels: 'hsl'
  },
  hsv: {
    channels: 3,
    labels: 'hsv'
  },
  hwb: {
    channels: 3,
    labels: 'hwb'
  },
  cmyk: {
    channels: 4,
    labels: 'cmyk'
  },
  xyz: {
    channels: 3,
    labels: 'xyz'
  },
  lab: {
    channels: 3,
    labels: 'lab'
  },
  lch: {
    channels: 3,
    labels: 'lch'
  },
  hex: {
    channels: 1,
    labels: ['hex']
  },
  keyword: {
    channels: 1,
    labels: ['keyword']
  },
  ansi16: {
    channels: 1,
    labels: ['ansi16']
  },
  ansi256: {
    channels: 1,
    labels: ['ansi256']
  },
  hcg: {
    channels: 3,
    labels: ['h', 'c', 'g']
  },
  apple: {
    channels: 3,
    labels: ['r16', 'g16', 'b16']
  },
  gray: {
    channels: 1,
    labels: ['gray']
  }
};
var conversions$1 = convert$3; // Hide .channels and .labels properties

for (const model of Object.keys(convert$3)) {
  if (!('channels' in convert$3[model])) {
    throw new Error('missing channels property: ' + model);
  }

  if (!('labels' in convert$3[model])) {
    throw new Error('missing channel labels property: ' + model);
  }

  if (convert$3[model].labels.length !== convert$3[model].channels) {
    throw new Error('channel and label counts mismatch: ' + model);
  }

  const {
    channels,
    labels
  } = convert$3[model];
  delete convert$3[model].channels;
  delete convert$3[model].labels;
  Object.defineProperty(convert$3[model], 'channels', {
    value: channels
  });
  Object.defineProperty(convert$3[model], 'labels', {
    value: labels
  });
}

convert$3.rgb.hsl = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

convert$3.rgb.hsv = function (rgb) {
  let rdif;
  let gdif;
  let bdif;
  let h;
  let s;
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);

  const diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [h * 360, s * 100, v * 100];
};

convert$3.rgb.hwb = function (rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = convert$3.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};

convert$3.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance$1(x, y) {
  /*
  	See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
  */
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}

convert$3.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords$1[rgb];

  if (reversed) {
    return reversed;
  }

  let currentClosestDistance = Infinity;
  let currentClosestKeyword;

  for (const keyword of Object.keys(colorName)) {
    const value = colorName[keyword]; // Compute comparative distance

    const distance = comparativeDistance$1(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert$3.keyword.rgb = function (keyword) {
  return colorName[keyword];
};

convert$3.rgb.xyz = function (rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255; // Assume sRGB

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};

convert$3.rgb.lab = function (rgb) {
  const xyz = convert$3.rgb.xyz(rgb);
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};

convert$3.hsl.rgb = function (hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;
  const rgb = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);

    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

convert$3.hsl.hsv = function (hsl) {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;
  let smin = s;
  const lmin = Math.max(l, 0.01);
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (l + s) / 2;
  const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};

convert$3.hsv.rgb = function (hsv) {
  const h = hsv[0] / 60;
  const s = hsv[1] / 100;
  let v = hsv[2] / 100;
  const hi = Math.floor(h) % 6;
  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  switch (hi) {
    case 0:
      return [v, t, p];

    case 1:
      return [q, v, p];

    case 2:
      return [p, v, t];

    case 3:
      return [p, q, v];

    case 4:
      return [t, p, v];

    case 5:
      return [v, p, q];
  }
};

convert$3.hsv.hsl = function (hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const vmin = Math.max(v, 0.01);
  let sl;
  let l;
  l = (2 - s) * v;
  const lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


convert$3.hwb.rgb = function (hwb) {
  const h = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f; // Wh + bl cant be > 1

  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  const i = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  const n = wh + f * (v - wh); // Linear interpolation

  let r;
  let g;
  let b;
  /* eslint-disable max-statements-per-line,no-multi-spaces */

  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;

    case 1:
      r = n;
      g = v;
      b = wh;
      break;

    case 2:
      r = wh;
      g = v;
      b = n;
      break;

    case 3:
      r = wh;
      g = n;
      b = v;
      break;

    case 4:
      r = n;
      g = wh;
      b = v;
      break;

    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  /* eslint-enable max-statements-per-line,no-multi-spaces */


  return [r * 255, g * 255, b * 255];
};

convert$3.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};

convert$3.xyz.rgb = function (xyz) {
  const x = xyz[0] / 100;
  const y = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r;
  let g;
  let b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.2040 + z * 1.0570; // Assume sRGB

  r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};

convert$3.xyz.lab = function (xyz) {
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};

convert$3.lab.xyz = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let x;
  let y;
  let z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  const y2 = y ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};

convert$3.lab.lch = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let h;
  const hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  const c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};

convert$3.lch.lab = function (lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];
  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  return [l, a, b];
};

convert$3.rgb.ansi16 = function (args, saturation = null) {
  const [r, g, b] = args;
  let value = saturation === null ? convert$3.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

  value = Math.round(value / 50);

  if (value === 0) {
    return 30;
  }

  let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return ansi;
};

convert$3.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$3.rgb.ansi16(convert$3.hsv.rgb(args), args[2]);
};

convert$3.rgb.ansi256 = function (args) {
  const r = args[0];
  const g = args[1];
  const b = args[2]; // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.

  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round((r - 8) / 247 * 24) + 232;
  }

  const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};

convert$3.ansi16.rgb = function (args) {
  let color = args % 10; // Handle greyscale

  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }

    color = color / 10.5 * 255;
    return [color, color, color];
  }

  const mult = (~~(args > 50) + 1) * 0.5;
  const r = (color & 1) * mult * 255;
  const g = (color >> 1 & 1) * mult * 255;
  const b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};

convert$3.ansi256.rgb = function (args) {
  // Handle greyscale
  if (args >= 232) {
    const c = (args - 232) * 10 + 8;
    return [c, c, c];
  }

  args -= 16;
  let rem;
  const r = Math.floor(args / 36) / 5 * 255;
  const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b = rem % 6 / 5 * 255;
  return [r, g, b];
};

convert$3.rgb.hex = function (args) {
  const integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$3.hex.rgb = function (args) {
  const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString.split('').map(char => {
      return char + char;
    }).join('');
  }

  const integer = parseInt(colorString, 16);
  const r = integer >> 16 & 0xFF;
  const g = integer >> 8 & 0xFF;
  const b = integer & 0xFF;
  return [r, g, b];
};

convert$3.rgb.hcg = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = max - min;
  let grayscale;
  let hue;

  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma;
  }

  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};

convert$3.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
  let f = 0;

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

convert$3.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const c = s * v;
  let f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

convert$3.hcg.rgb = function (hcg) {
  const h = hcg[0] / 360;
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255];
  }

  const pure = [0, 0, 0];
  const hi = h % 1 * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;
  /* eslint-disable max-statements-per-line */

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;

    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;

    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;

    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;

    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;

    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  /* eslint-enable max-statements-per-line */


  mg = (1.0 - c) * g;
  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
};

convert$3.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  let f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

convert$3.hcg.hsl = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const l = g * (1.0 - c) + 0.5 * c;
  let s = 0;

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l));
  }

  return [hcg[0], s * 100, l * 100];
};

convert$3.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert$3.hwb.hcg = function (hwb) {
  const w = hwb[1] / 100;
  const b = hwb[2] / 100;
  const v = 1 - b;
  const c = v - w;
  let g = 0;

  if (c < 1) {
    g = (v - c) / (1 - c);
  }

  return [hwb[0], c * 100, g * 100];
};

convert$3.apple.rgb = function (apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert$3.rgb.apple = function (rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert$3.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert$3.gray.hsl = function (args) {
  return [0, 0, args[0]];
};

convert$3.gray.hsv = convert$3.gray.hsl;

convert$3.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

convert$3.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

convert$3.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

convert$3.gray.hex = function (gray) {
  const val = Math.round(gray[0] / 100 * 255) & 0xFF;
  const integer = (val << 16) + (val << 8) + val;
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$3.rgb.gray = function (rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/


function buildGraph$1() {
  const graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

  const models = Object.keys(conversions$1);

  for (let len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }

  return graph;
} // https://en.wikipedia.org/wiki/Breadth-first_search


function deriveBFS$1(fromModel) {
  const graph = buildGraph$1();
  const queue = [fromModel]; // Unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions$1[current]);

    for (let len = adjacents.length, i = 0; i < len; i++) {
      const adjacent = adjacents[i];
      const node = graph[adjacent];

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }

  return graph;
}

function link$1(from, to) {
  return function (args) {
    return to(from(args));
  };
}

function wrapConversion$1(toModel, graph) {
  const path = [graph[toModel].parent, toModel];
  let fn = conversions$1[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;

  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link$1(conversions$1[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
}

var route$1 = function (fromModel) {
  const graph = deriveBFS$1(fromModel);
  const conversion = {};
  const models = Object.keys(graph);

  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i];
    const node = graph[toModel];

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion$1(toModel, graph);
  }

  return conversion;
};

const convert$2 = {};
const models$1 = Object.keys(conversions$1);

function wrapRaw$1(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    return fn(args);
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

function wrapRounded$1(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    const result = fn(args); // We're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.

    if (typeof result === 'object') {
      for (let len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

models$1.forEach(fromModel => {
  convert$2[fromModel] = {};
  Object.defineProperty(convert$2[fromModel], 'channels', {
    value: conversions$1[fromModel].channels
  });
  Object.defineProperty(convert$2[fromModel], 'labels', {
    value: conversions$1[fromModel].labels
  });
  const routes = route$1(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach(toModel => {
    const fn = routes[toModel];
    convert$2[fromModel][toModel] = wrapRounded$1(fn);
    convert$2[fromModel][toModel].raw = wrapRaw$1(fn);
  });
});
var colorConvert$1 = convert$2;

var ansiStyles$1 = createCommonjsModule(function (module) {

const wrapAnsi16 = (fn, offset) => (...args) => {
  const code = fn(...args);
  return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
  const code = fn(...args);
  return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
  const rgb = fn(...args);
  return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;

const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
  Object.defineProperty(object, property, {
    get: () => {
      const value = get();
      Object.defineProperty(object, property, {
        value,
        enumerable: true,
        configurable: true
      });
      return value;
    },
    enumerable: true,
    configurable: true
  });
};
/** @type {typeof import('color-convert')} */


let colorConvert;

const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
  if (colorConvert === undefined) {
    colorConvert = colorConvert$1;
  }

  const offset = isBackground ? 10 : 0;
  const styles = {};

  for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
    const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;

    if (sourceSpace === targetSpace) {
      styles[name] = wrap(identity, offset);
    } else if (typeof suite === 'object') {
      styles[name] = wrap(suite[targetSpace], offset);
    }
  }

  return styles;
};

function assembleStyles() {
  const codes = new Map();
  const styles = {
    modifier: {
      reset: [0, 0],
      // 21 isn't widely supported and 22 does the same thing
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      // Bright color
      blackBright: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      // Bright color
      bgBlackBright: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  }; // Alias bright black as gray (and grey)

  styles.color.gray = styles.color.blackBright;
  styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
  styles.color.grey = styles.color.blackBright;
  styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\u001B[${style[0]}m`,
        close: `\u001B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }

    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }

  Object.defineProperty(styles, 'codes', {
    value: codes,
    enumerable: false
  });
  styles.color.close = '\u001B[39m';
  styles.bgColor.close = '\u001B[49m';
  setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
  setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
  setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
  setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
  setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
  setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));
  return styles;
} // Make the export immutable


Object.defineProperty(module, 'exports', {
  enumerable: true,
  get: assembleStyles
});
});

const ESCAPES$1 = new Set(['\u001B', '\u009B']);
const END_CODE = 39;

const wrapAnsi$1 = code => `${ESCAPES$1.values().next().value}[${code}m`; // Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes


const wordLengths = string => string.split(' ').map(character => stringWidth_1(character)); // Wrap a long word across multiple rows
// Ansi escape codes do not count towards length


const wrapWord = (rows, word, columns) => {
  const characters = [...word];
  let isInsideEscape = false;
  let visible = stringWidth_1(stripAnsi__default['default'](rows[rows.length - 1]));

  for (const [index, character] of characters.entries()) {
    const characterLength = stringWidth_1(character);

    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }

    if (ESCAPES$1.has(character)) {
      isInsideEscape = true;
    } else if (isInsideEscape && character === 'm') {
      isInsideEscape = false;
      continue;
    }

    if (isInsideEscape) {
      continue;
    }

    visible += characterLength;

    if (visible === columns && index < characters.length - 1) {
      rows.push('');
      visible = 0;
    }
  } // It's possible that the last row we copy over is only
  // ansi escape characters, handle this edge-case


  if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
}; // Trims spaces from a string ignoring invisible sequences


const stringVisibleTrimSpacesRight = str => {
  const words = str.split(' ');
  let last = words.length;

  while (last > 0) {
    if (stringWidth_1(words[last - 1]) > 0) {
      break;
    }

    last--;
  }

  if (last === words.length) {
    return str;
  }

  return words.slice(0, last).join(' ') + words.slice(last).join('');
}; // The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode
//
// 'hard' will never allow a string to take up more than columns characters
//
// 'soft' allows long words to expand past the column length


const exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === '') {
    return '';
  }

  let pre = '';
  let ret = '';
  let escapeCode;
  const lengths = wordLengths(string);
  let rows = [''];

  for (const [index, word] of string.split(' ').entries()) {
    if (options.trim !== false) {
      rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
    }

    let rowLength = stringWidth_1(rows[rows.length - 1]);

    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        // If we start with a new word but the current row length equals the length of the columns, add a new row
        rows.push('');
        rowLength = 0;
      }

      if (rowLength > 0 || options.trim === false) {
        rows[rows.length - 1] += ' ';
        rowLength++;
      }
    } // In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'


    if (options.hard && lengths[index] > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);

      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push('');
      }

      wrapWord(rows, word, columns);
      continue;
    }

    if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        continue;
      }

      rows.push('');
    }

    if (rowLength + lengths[index] > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      continue;
    }

    rows[rows.length - 1] += word;
  }

  if (options.trim !== false) {
    rows = rows.map(stringVisibleTrimSpacesRight);
  }

  pre = rows.join('\n');

  for (const [index, character] of [...pre].entries()) {
    ret += character;

    if (ESCAPES$1.has(character)) {
      const code = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
      escapeCode = code === END_CODE ? null : code;
    }

    const code = ansiStyles$1.codes.get(Number(escapeCode));

    if (escapeCode && code) {
      if (pre[index + 1] === '\n') {
        ret += wrapAnsi$1(code);
      } else if (character === '\n') {
        ret += wrapAnsi$1(escapeCode);
      }
    }
  }

  return ret;
}; // For each newline, invoke the method separately


var wrapAnsi_1 = (string, columns, options) => {
  return String(string).normalize().replace(/\r\n/g, '\n').split('\n').map(line => exec(line, columns, options)).join('\n');
};

/* eslint-disable yoda */

const isFullwidthCodePoint = codePoint => {
  if (Number.isNaN(codePoint)) {
    return false;
  } // Code points are derived from:
  // http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt


  if (codePoint >= 0x1100 && (codePoint <= 0x115F || // Hangul Jamo
  codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
  codePoint === 0x232A || 0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F || 0x3250 <= codePoint && codePoint <= 0x4DBF || 0x4E00 <= codePoint && codePoint <= 0xA4C6 || 0xA960 <= codePoint && codePoint <= 0xA97C || 0xAC00 <= codePoint && codePoint <= 0xD7A3 || 0xF900 <= codePoint && codePoint <= 0xFAFF || 0xFE10 <= codePoint && codePoint <= 0xFE19 || 0xFE30 <= codePoint && codePoint <= 0xFE6B || 0xFF01 <= codePoint && codePoint <= 0xFF60 || 0xFFE0 <= codePoint && codePoint <= 0xFFE6 || 0x1B000 <= codePoint && codePoint <= 0x1B001 || 0x1F200 <= codePoint && codePoint <= 0x1F251 || 0x20000 <= codePoint && codePoint <= 0x3FFFD)) {
    return true;
  }

  return false;
};

var isFullwidthCodePoint_1 = isFullwidthCodePoint;
var _default$B = isFullwidthCodePoint;
isFullwidthCodePoint_1.default = _default$B;

const regex$1 = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

const astralRegex$1 = options => options && options.exact ? new RegExp(`^${regex$1}$`) : new RegExp(regex$1, 'g');

var astralRegex_1 = astralRegex$1;

/* MIT license */

/* eslint-disable no-mixed-operators */
 // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


const reverseKeywords = {};

for (const key of Object.keys(colorName)) {
  reverseKeywords[colorName[key]] = key;
}

const convert$1 = {
  rgb: {
    channels: 3,
    labels: 'rgb'
  },
  hsl: {
    channels: 3,
    labels: 'hsl'
  },
  hsv: {
    channels: 3,
    labels: 'hsv'
  },
  hwb: {
    channels: 3,
    labels: 'hwb'
  },
  cmyk: {
    channels: 4,
    labels: 'cmyk'
  },
  xyz: {
    channels: 3,
    labels: 'xyz'
  },
  lab: {
    channels: 3,
    labels: 'lab'
  },
  lch: {
    channels: 3,
    labels: 'lch'
  },
  hex: {
    channels: 1,
    labels: ['hex']
  },
  keyword: {
    channels: 1,
    labels: ['keyword']
  },
  ansi16: {
    channels: 1,
    labels: ['ansi16']
  },
  ansi256: {
    channels: 1,
    labels: ['ansi256']
  },
  hcg: {
    channels: 3,
    labels: ['h', 'c', 'g']
  },
  apple: {
    channels: 3,
    labels: ['r16', 'g16', 'b16']
  },
  gray: {
    channels: 1,
    labels: ['gray']
  }
};
var conversions = convert$1; // Hide .channels and .labels properties

for (const model of Object.keys(convert$1)) {
  if (!('channels' in convert$1[model])) {
    throw new Error('missing channels property: ' + model);
  }

  if (!('labels' in convert$1[model])) {
    throw new Error('missing channel labels property: ' + model);
  }

  if (convert$1[model].labels.length !== convert$1[model].channels) {
    throw new Error('channel and label counts mismatch: ' + model);
  }

  const {
    channels,
    labels
  } = convert$1[model];
  delete convert$1[model].channels;
  delete convert$1[model].labels;
  Object.defineProperty(convert$1[model], 'channels', {
    value: channels
  });
  Object.defineProperty(convert$1[model], 'labels', {
    value: labels
  });
}

convert$1.rgb.hsl = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
};

convert$1.rgb.hsv = function (rgb) {
  let rdif;
  let gdif;
  let bdif;
  let h;
  let s;
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);

  const diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return [h * 360, s * 100, v * 100];
};

convert$1.rgb.hwb = function (rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = convert$1.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};

convert$1.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
  /*
  	See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
  */
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}

convert$1.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords[rgb];

  if (reversed) {
    return reversed;
  }

  let currentClosestDistance = Infinity;
  let currentClosestKeyword;

  for (const keyword of Object.keys(colorName)) {
    const value = colorName[keyword]; // Compute comparative distance

    const distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert$1.keyword.rgb = function (keyword) {
  return colorName[keyword];
};

convert$1.rgb.xyz = function (rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255; // Assume sRGB

  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};

convert$1.rgb.lab = function (rgb) {
  const xyz = convert$1.rgb.xyz(rgb);
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};

convert$1.hsl.rgb = function (hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;
  const rgb = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1);

    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
};

convert$1.hsl.hsv = function (hsl) {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;
  let smin = s;
  const lmin = Math.max(l, 0.01);
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (l + s) / 2;
  const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};

convert$1.hsv.rgb = function (hsv) {
  const h = hsv[0] / 60;
  const s = hsv[1] / 100;
  let v = hsv[2] / 100;
  const hi = Math.floor(h) % 6;
  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  switch (hi) {
    case 0:
      return [v, t, p];

    case 1:
      return [q, v, p];

    case 2:
      return [p, v, t];

    case 3:
      return [p, q, v];

    case 4:
      return [t, p, v];

    case 5:
      return [v, p, q];
  }
};

convert$1.hsv.hsl = function (hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const vmin = Math.max(v, 0.01);
  let sl;
  let l;
  l = (2 - s) * v;
  const lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


convert$1.hwb.rgb = function (hwb) {
  const h = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f; // Wh + bl cant be > 1

  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  const i = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  const n = wh + f * (v - wh); // Linear interpolation

  let r;
  let g;
  let b;
  /* eslint-disable max-statements-per-line,no-multi-spaces */

  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;

    case 1:
      r = n;
      g = v;
      b = wh;
      break;

    case 2:
      r = wh;
      g = v;
      b = n;
      break;

    case 3:
      r = wh;
      g = n;
      b = v;
      break;

    case 4:
      r = n;
      g = wh;
      b = v;
      break;

    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  /* eslint-enable max-statements-per-line,no-multi-spaces */


  return [r * 255, g * 255, b * 255];
};

convert$1.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};

convert$1.xyz.rgb = function (xyz) {
  const x = xyz[0] / 100;
  const y = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r;
  let g;
  let b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.2040 + z * 1.0570; // Assume sRGB

  r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;
  g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;
  b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};

convert$1.xyz.lab = function (xyz) {
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};

convert$1.lab.xyz = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let x;
  let y;
  let z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  const y2 = y ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};

convert$1.lab.lch = function (lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let h;
  const hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;

  if (h < 0) {
    h += 360;
  }

  const c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};

convert$1.lch.lab = function (lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];
  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  return [l, a, b];
};

convert$1.rgb.ansi16 = function (args, saturation = null) {
  const [r, g, b] = args;
  let value = saturation === null ? convert$1.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

  value = Math.round(value / 50);

  if (value === 0) {
    return 30;
  }

  let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return ansi;
};

convert$1.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2]);
};

convert$1.rgb.ansi256 = function (args) {
  const r = args[0];
  const g = args[1];
  const b = args[2]; // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.

  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }

    if (r > 248) {
      return 231;
    }

    return Math.round((r - 8) / 247 * 24) + 232;
  }

  const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};

convert$1.ansi16.rgb = function (args) {
  let color = args % 10; // Handle greyscale

  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }

    color = color / 10.5 * 255;
    return [color, color, color];
  }

  const mult = (~~(args > 50) + 1) * 0.5;
  const r = (color & 1) * mult * 255;
  const g = (color >> 1 & 1) * mult * 255;
  const b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};

convert$1.ansi256.rgb = function (args) {
  // Handle greyscale
  if (args >= 232) {
    const c = (args - 232) * 10 + 8;
    return [c, c, c];
  }

  args -= 16;
  let rem;
  const r = Math.floor(args / 36) / 5 * 255;
  const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b = rem % 6 / 5 * 255;
  return [r, g, b];
};

convert$1.rgb.hex = function (args) {
  const integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$1.hex.rgb = function (args) {
  const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString.split('').map(char => {
      return char + char;
    }).join('');
  }

  const integer = parseInt(colorString, 16);
  const r = integer >> 16 & 0xFF;
  const g = integer >> 8 & 0xFF;
  const b = integer & 0xFF;
  return [r, g, b];
};

convert$1.rgb.hcg = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = max - min;
  let grayscale;
  let hue;

  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma;
  }

  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};

convert$1.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
  let f = 0;

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

convert$1.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const c = s * v;
  let f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

convert$1.hcg.rgb = function (hcg) {
  const h = hcg[0] / 360;
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255];
  }

  const pure = [0, 0, 0];
  const hi = h % 1 * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;
  /* eslint-disable max-statements-per-line */

  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;

    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;

    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;

    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;

    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;

    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  /* eslint-enable max-statements-per-line */


  mg = (1.0 - c) * g;
  return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
};

convert$1.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  let f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

convert$1.hcg.hsl = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const l = g * (1.0 - c) + 0.5 * c;
  let s = 0;

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l));
  }

  return [hcg[0], s * 100, l * 100];
};

convert$1.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert$1.hwb.hcg = function (hwb) {
  const w = hwb[1] / 100;
  const b = hwb[2] / 100;
  const v = 1 - b;
  const c = v - w;
  let g = 0;

  if (c < 1) {
    g = (v - c) / (1 - c);
  }

  return [hwb[0], c * 100, g * 100];
};

convert$1.apple.rgb = function (apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert$1.rgb.apple = function (rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert$1.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert$1.gray.hsl = function (args) {
  return [0, 0, args[0]];
};

convert$1.gray.hsv = convert$1.gray.hsl;

convert$1.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

convert$1.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

convert$1.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

convert$1.gray.hex = function (gray) {
  const val = Math.round(gray[0] / 100 * 255) & 0xFF;
  const integer = (val << 16) + (val << 8) + val;
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$1.rgb.gray = function (rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/


function buildGraph() {
  const graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

  const models = Object.keys(conversions);

  for (let len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null
    };
  }

  return graph;
} // https://en.wikipedia.org/wiki/Breadth-first_search


function deriveBFS(fromModel) {
  const graph = buildGraph();
  const queue = [fromModel]; // Unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions[current]);

    for (let len = adjacents.length, i = 0; i < len; i++) {
      const adjacent = adjacents[i];
      const node = graph[adjacent];

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }

  return graph;
}

function link(from, to) {
  return function (args) {
    return to(from(args));
  };
}

function wrapConversion(toModel, graph) {
  const path = [graph[toModel].parent, toModel];
  let fn = conversions[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;

  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link(conversions[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
}

var route = function (fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};
  const models = Object.keys(graph);

  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i];
    const node = graph[toModel];

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion(toModel, graph);
  }

  return conversion;
};

const convert = {};
const models = Object.keys(conversions);

function wrapRaw(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    return fn(args);
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

function wrapRounded(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0];

    if (arg0 === undefined || arg0 === null) {
      return arg0;
    }

    if (arg0.length > 1) {
      args = arg0;
    }

    const result = fn(args); // We're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.

    if (typeof result === 'object') {
      for (let len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i]);
      }
    }

    return result;
  }; // Preserve .conversion property if there is one


  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion;
  }

  return wrappedFn;
}

models.forEach(fromModel => {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], 'channels', {
    value: conversions[fromModel].channels
  });
  Object.defineProperty(convert[fromModel], 'labels', {
    value: conversions[fromModel].labels
  });
  const routes = route(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach(toModel => {
    const fn = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn);
    convert[fromModel][toModel].raw = wrapRaw(fn);
  });
});
var colorConvert = convert;

var ansiStyles = createCommonjsModule(function (module) {

const wrapAnsi16 = (fn, offset) => (...args) => {
  const code = fn(...args);
  return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
  const code = fn(...args);
  return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
  const rgb = fn(...args);
  return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;

const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
  Object.defineProperty(object, property, {
    get: () => {
      const value = get();
      Object.defineProperty(object, property, {
        value,
        enumerable: true,
        configurable: true
      });
      return value;
    },
    enumerable: true,
    configurable: true
  });
};
/** @type {typeof import('color-convert')} */


let colorConvert$1;

const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
  if (colorConvert$1 === undefined) {
    colorConvert$1 = colorConvert;
  }

  const offset = isBackground ? 10 : 0;
  const styles = {};

  for (const [sourceSpace, suite] of Object.entries(colorConvert$1)) {
    const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;

    if (sourceSpace === targetSpace) {
      styles[name] = wrap(identity, offset);
    } else if (typeof suite === 'object') {
      styles[name] = wrap(suite[targetSpace], offset);
    }
  }

  return styles;
};

function assembleStyles() {
  const codes = new Map();
  const styles = {
    modifier: {
      reset: [0, 0],
      // 21 isn't widely supported and 22 does the same thing
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      // Bright color
      blackBright: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      // Bright color
      bgBlackBright: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  }; // Alias bright black as gray (and grey)

  styles.color.gray = styles.color.blackBright;
  styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
  styles.color.grey = styles.color.blackBright;
  styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\u001B[${style[0]}m`,
        close: `\u001B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }

    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }

  Object.defineProperty(styles, 'codes', {
    value: codes,
    enumerable: false
  });
  styles.color.close = '\u001B[39m';
  styles.bgColor.close = '\u001B[49m';
  setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
  setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
  setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
  setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
  setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
  setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));
  return styles;
} // Make the export immutable


Object.defineProperty(module, 'exports', {
  enumerable: true,
  get: assembleStyles
});
});

const ESCAPES = ['\u001B', '\u009B'];

const wrapAnsi = code => `${ESCAPES[0]}[${code}m`;

const checkAnsi = (ansiCodes, isEscapes, endAnsiCode) => {
  let output = [];
  ansiCodes = [...ansiCodes];

  for (let ansiCode of ansiCodes) {
    const ansiCodeOrigin = ansiCode;

    if (ansiCode.match(';')) {
      ansiCode = ansiCode.split(';')[0][0] + '0';
    }

    const item = ansiStyles.codes.get(parseInt(ansiCode, 10));

    if (item) {
      const indexEscape = ansiCodes.indexOf(item.toString());

      if (indexEscape >= 0) {
        ansiCodes.splice(indexEscape, 1);
      } else {
        output.push(wrapAnsi(isEscapes ? item : ansiCodeOrigin));
      }
    } else if (isEscapes) {
      output.push(wrapAnsi(0));
      break;
    } else {
      output.push(wrapAnsi(ansiCodeOrigin));
    }
  }

  if (isEscapes) {
    output = output.filter((element, index) => output.indexOf(element) === index);

    if (endAnsiCode !== undefined) {
      const fistEscapeCode = wrapAnsi(ansiStyles.codes.get(parseInt(endAnsiCode, 10)));
      output = output.reduce((current, next) => next === fistEscapeCode ? [next, ...current] : [...current, next], []);
    }
  }

  return output.join('');
};

var sliceAnsi = (string, begin, end) => {
  const characters = [...string.normalize()];
  const ansiCodes = [];
  end = typeof end === 'number' ? end : characters.length;
  let isInsideEscape = false;
  let ansiCode;
  let visible = 0;
  let output = '';

  for (const [index, character] of characters.entries()) {
    let leftEscape = false;

    if (ESCAPES.includes(character)) {
      const code = /\d[^m]*/.exec(string.slice(index, index + 18));
      ansiCode = code && code.length > 0 ? code[0] : undefined;

      if (visible < end) {
        isInsideEscape = true;

        if (ansiCode !== undefined) {
          ansiCodes.push(ansiCode);
        }
      }
    } else if (isInsideEscape && character === 'm') {
      isInsideEscape = false;
      leftEscape = true;
    }

    if (!isInsideEscape && !leftEscape) {
      ++visible;
    }

    if (!astralRegex_1({
      exact: true
    }).test(character) && isFullwidthCodePoint_1(character.codePointAt())) {
      ++visible;
    }

    if (visible > begin && visible <= end) {
      output += character;
    } else if (visible === begin && !isInsideEscape && ansiCode !== undefined) {
      output = checkAnsi(ansiCodes);
    } else if (visible >= end) {
      output += checkAnsi(ansiCodes, true, ansiCode);
      break;
    }
  }

  return output;
};

function getIndexOfNearestSpace(string, index, shouldSearchRight) {
  if (string.charAt(index) === ' ') {
    return index;
  }

  for (let i = 1; i <= 3; i++) {
    if (shouldSearchRight) {
      if (string.charAt(index + i) === ' ') {
        return index + i;
      }
    } else if (string.charAt(index - i) === ' ') {
      return index - i;
    }
  }

  return index;
}

var cliTruncate = (text, columns, options) => {
  options = {
    position: 'end',
    preferTruncationOnSpace: false,
    ...options
  };
  const {
    position,
    space,
    preferTruncationOnSpace
  } = options;
  let ellipsis = '…';
  let ellipsisWidth = 1;

  if (typeof text !== 'string') {
    throw new TypeError(`Expected \`input\` to be a string, got ${typeof text}`);
  }

  if (typeof columns !== 'number') {
    throw new TypeError(`Expected \`columns\` to be a number, got ${typeof columns}`);
  }

  if (columns < 1) {
    return '';
  }

  if (columns === 1) {
    return ellipsis;
  }

  const length = stringWidth_1(text);

  if (length <= columns) {
    return text;
  }

  if (position === 'start') {
    if (preferTruncationOnSpace) {
      const nearestSpace = getIndexOfNearestSpace(text, length - columns + 1, true);
      return ellipsis + sliceAnsi(text, nearestSpace, length).trim();
    }

    if (space === true) {
      ellipsis += ' ';
      ellipsisWidth = 2;
    }

    return ellipsis + sliceAnsi(text, length - columns + ellipsisWidth, length);
  }

  if (position === 'middle') {
    if (space === true) {
      ellipsis = ' ' + ellipsis + ' ';
      ellipsisWidth = 3;
    }

    const half = Math.floor(columns / 2);

    if (preferTruncationOnSpace) {
      const spaceNearFirstBreakPoint = getIndexOfNearestSpace(text, half);
      const spaceNearSecondBreakPoint = getIndexOfNearestSpace(text, length - (columns - half) + 1, true);
      return sliceAnsi(text, 0, spaceNearFirstBreakPoint) + ellipsis + sliceAnsi(text, spaceNearSecondBreakPoint, length).trim();
    }

    return sliceAnsi(text, 0, half) + ellipsis + sliceAnsi(text, length - (columns - half) + ellipsisWidth, length);
  }

  if (position === 'end') {
    if (preferTruncationOnSpace) {
      const nearestSpace = getIndexOfNearestSpace(text, columns - 1);
      return sliceAnsi(text, 0, nearestSpace) + ellipsis;
    }

    if (space === true) {
      ellipsis = ' ' + ellipsis;
      ellipsisWidth = 2;
    }

    return sliceAnsi(text, 0, columns - ellipsisWidth) + ellipsis;
  }

  throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${position}`);
};

var __importDefault$m = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const wrap_ansi_1 = __importDefault$m(wrapAnsi_1);

const cli_truncate_1 = __importDefault$m(cliTruncate);

const cache = {};

var _default$A = (text, maxWidth, wrapType) => {
  const cacheKey = text + String(maxWidth) + String(wrapType);

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let wrappedText = text;

  if (wrapType === 'wrap') {
    wrappedText = wrap_ansi_1.default(text, maxWidth, {
      trim: false,
      hard: true
    });
  }

  if (wrapType.startsWith('truncate')) {
    let position = 'end';

    if (wrapType === 'truncate-middle') {
      position = 'middle';
    }

    if (wrapType === 'truncate-start') {
      position = 'start';
    }

    wrappedText = cli_truncate_1.default(text, maxWidth, {
      position
    });
  }

  cache[cacheKey] = wrappedText;
  return wrappedText;
};

var wrapText = /*#__PURE__*/Object.defineProperty({
	default: _default$A
}, '__esModule', {value: true});

// Squashing text nodes allows to combine multiple text nodes into one and write
// to `Output` instance only once. For example, <Text>hello{' '}world</Text>
// is actually 3 text nodes, which would result 3 writes to `Output`.
//
// Also, this is necessary for libraries like ink-link (https://github.com/sindresorhus/ink-link),
// which need to wrap all children at once, instead of wrapping 3 text nodes separately.

const squashTextNodes = node => {
  let text = '';

  if (node.childNodes.length > 0) {
    for (const childNode of node.childNodes) {
      let nodeText = '';

      if (childNode.nodeName === '#text') {
        nodeText = childNode.nodeValue;
      } else {
        if (childNode.nodeName === 'ink-text' || childNode.nodeName === 'ink-virtual-text') {
          nodeText = squashTextNodes(childNode);
        } // Since these text nodes are being concatenated, `Output` instance won't be able to
        // apply children transform, so we have to do it manually here for each text node


        if (nodeText.length > 0 && typeof childNode.internal_transform === 'function') {
          nodeText = childNode.internal_transform(nodeText);
        }
      }

      text += nodeText;
    }
  }

  return text;
};

var _default$z = squashTextNodes;

var squashTextNodes_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$z
}, '__esModule', {value: true});

var dom$1 = createCommonjsModule(function (module, exports) {

var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTextNodeValue = exports.createTextNode = exports.setStyle = exports.setAttribute = exports.removeChildNode = exports.insertBeforeNode = exports.appendChildNode = exports.createNode = exports.TEXT_NAME = void 0;

const yoga_layout_prebuilt_1 = __importDefault(require$$0__default['default']);

const measure_text_1 = __importDefault(measureText);

const styles_1 = __importDefault(styles);

const wrap_text_1 = __importDefault(wrapText);

const squash_text_nodes_1 = __importDefault(squashTextNodes_1);

exports.TEXT_NAME = '#text';

exports.createNode = nodeName => {
  var _a;

  const node = {
    nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: null,
    yogaNode: nodeName === 'ink-virtual-text' ? undefined : yoga_layout_prebuilt_1.default.Node.create()
  };

  if (nodeName === 'ink-text') {
    (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setMeasureFunc(measureTextNode.bind(null, node));
  }

  return node;
};

exports.appendChildNode = (node, childNode) => {
  var _a;

  if (childNode.parentNode) {
    exports.removeChildNode(childNode.parentNode, childNode);
  }

  childNode.parentNode = node;
  node.childNodes.push(childNode);

  if (childNode.yogaNode) {
    (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.insertChild(childNode.yogaNode, node.yogaNode.getChildCount());
  }

  if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
    markNodeAsDirty(node);
  }
};

exports.insertBeforeNode = (node, newChildNode, beforeChildNode) => {
  var _a, _b;

  if (newChildNode.parentNode) {
    exports.removeChildNode(newChildNode.parentNode, newChildNode);
  }

  newChildNode.parentNode = node;
  const index = node.childNodes.indexOf(beforeChildNode);

  if (index >= 0) {
    node.childNodes.splice(index, 0, newChildNode);

    if (newChildNode.yogaNode) {
      (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.insertChild(newChildNode.yogaNode, index);
    }

    return;
  }

  node.childNodes.push(newChildNode);

  if (newChildNode.yogaNode) {
    (_b = node.yogaNode) === null || _b === void 0 ? void 0 : _b.insertChild(newChildNode.yogaNode, node.yogaNode.getChildCount());
  }

  if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
    markNodeAsDirty(node);
  }
};

exports.removeChildNode = (node, removeNode) => {
  var _a, _b;

  if (removeNode.yogaNode) {
    (_b = (_a = removeNode.parentNode) === null || _a === void 0 ? void 0 : _a.yogaNode) === null || _b === void 0 ? void 0 : _b.removeChild(removeNode.yogaNode);
  }

  removeNode.parentNode = null;
  const index = node.childNodes.indexOf(removeNode);

  if (index >= 0) {
    node.childNodes.splice(index, 1);
  }

  if (node.nodeName === 'ink-text' || node.nodeName === 'ink-virtual-text') {
    markNodeAsDirty(node);
  }
};

exports.setAttribute = (node, key, value) => {
  node.attributes[key] = value;
};

exports.setStyle = (node, style) => {
  node.style = style;

  if (node.yogaNode) {
    styles_1.default(node.yogaNode, style);
  }
};

exports.createTextNode = text => {
  const node = {
    nodeName: '#text',
    nodeValue: text,
    yogaNode: undefined,
    parentNode: null,
    style: {}
  };
  exports.setTextNodeValue(node, text);
  return node;
};

const measureTextNode = function (node, width) {
  var _a, _b;

  const text = node.nodeName === '#text' ? node.nodeValue : squash_text_nodes_1.default(node);
  const dimensions = measure_text_1.default(text); // Text fits into container, no need to wrap

  if (dimensions.width <= width) {
    return dimensions;
  } // This is happening when <Box> is shrinking child nodes and Yoga asks
  // if we can fit this text node in a <1px space, so we just tell Yoga "no"


  if (dimensions.width >= 1 && width > 0 && width < 1) {
    return dimensions;
  }

  const textWrap = (_b = (_a = node.style) === null || _a === void 0 ? void 0 : _a.textWrap) !== null && _b !== void 0 ? _b : 'wrap';
  const wrappedText = wrap_text_1.default(text, width, textWrap);
  return measure_text_1.default(wrappedText);
};

const findClosestYogaNode = node => {
  var _a;

  if (!node || !node.parentNode) {
    return undefined;
  }

  return (_a = node.yogaNode) !== null && _a !== void 0 ? _a : findClosestYogaNode(node.parentNode);
};

const markNodeAsDirty = node => {
  // Mark closest Yoga node as dirty to measure text dimensions again
  const yogaNode = findClosestYogaNode(node);
  yogaNode === null || yogaNode === void 0 ? void 0 : yogaNode.markDirty();
};

exports.setTextNodeValue = (node, text) => {
  if (typeof text !== 'string') {
    text = String(text);
  }

  node.nodeValue = text;
  markNodeAsDirty(node);
};
});

var __importDefault$l = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const react_reconciler_1 = __importDefault$l(reactReconciler);

const yoga_layout_prebuilt_1$3 = __importDefault$l(require$$0__default['default']);

 // We need to conditionally perform devtools connection to avoid
// accidentally breaking other third-party code.
// See https://github.com/vadimdemedes/ink/issues/384


if (process.env.DEV === 'true') ;

const cleanupYogaNode = node => {
  node === null || node === void 0 ? void 0 : node.unsetMeasureFunc();
  node === null || node === void 0 ? void 0 : node.freeRecursive();
};

var _default$y = react_reconciler_1.default({
  // @ts-ignore
  schedulePassiveEffects: scheduler.unstable_scheduleCallback,
  cancelPassiveEffects: scheduler.unstable_cancelCallback,
  now: Date.now,
  getRootHostContext: () => ({
    isInsideText: false
  }),
  prepareForCommit: () => {},
  resetAfterCommit: rootNode => {
    // Since renders are throttled at the instance level and <Static> component children
    // are rendered only once and then get deleted, we need an escape hatch to
    // trigger an immediate render to ensure <Static> children are written to output before they get erased
    if (rootNode.isStaticDirty) {
      rootNode.isStaticDirty = false;

      if (typeof rootNode.onImmediateRender === 'function') {
        rootNode.onImmediateRender();
      }

      return;
    }

    if (typeof rootNode.onRender === 'function') {
      rootNode.onRender();
    }
  },
  getChildHostContext: (parentHostContext, type) => {
    const previousIsInsideText = parentHostContext.isInsideText;
    const isInsideText = type === 'ink-text' || type === 'ink-virtual-text';

    if (previousIsInsideText === isInsideText) {
      return parentHostContext;
    }

    return {
      isInsideText
    };
  },
  shouldSetTextContent: () => false,
  createInstance: (originalType, newProps, _root, hostContext) => {
    if (hostContext.isInsideText && originalType === 'ink-box') {
      throw new Error(`<Box> can’t be nested inside <Text> component`);
    }

    const type = originalType === 'ink-text' && hostContext.isInsideText ? 'ink-virtual-text' : originalType;
    const node = dom$1.createNode(type);

    for (const [key, value] of Object.entries(newProps)) {
      if (key === 'children') {
        continue;
      } else if (key === 'style') {
        dom$1.setStyle(node, value);
      } else if (key === 'internal_transform') {
        node.internal_transform = value;
      } else if (key === 'internal_static') {
        node.internal_static = true;
      } else {
        dom$1.setAttribute(node, key, value);
      }
    }

    return node;
  },
  createTextInstance: (text, _root, hostContext) => {
    if (!hostContext.isInsideText) {
      throw new Error(`Text string "${text}" must be rendered inside <Text> component`);
    }

    return dom$1.createTextNode(text);
  },
  resetTextContent: () => {},
  hideTextInstance: node => {
    dom$1.setTextNodeValue(node, '');
  },
  unhideTextInstance: (node, text) => {
    dom$1.setTextNodeValue(node, text);
  },
  getPublicInstance: instance => instance,
  hideInstance: node => {
    var _a;

    (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setDisplay(yoga_layout_prebuilt_1$3.default.DISPLAY_NONE);
  },
  unhideInstance: node => {
    var _a;

    (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.setDisplay(yoga_layout_prebuilt_1$3.default.DISPLAY_FLEX);
  },
  appendInitialChild: dom$1.appendChildNode,
  appendChild: dom$1.appendChildNode,
  insertBefore: dom$1.insertBeforeNode,
  finalizeInitialChildren: (node, _type, _props, rootNode) => {
    if (node.internal_static) {
      rootNode.isStaticDirty = true; // Save reference to <Static> node to skip traversal of entire
      // node tree to find it

      rootNode.staticNode = node;
    }

    return false;
  },
  supportsMutation: true,
  appendChildToContainer: dom$1.appendChildNode,
  insertInContainerBefore: dom$1.insertBeforeNode,
  removeChildFromContainer: (node, removeNode) => {
    dom$1.removeChildNode(node, removeNode);
    cleanupYogaNode(removeNode.yogaNode);
  },
  prepareUpdate: (node, _type, oldProps, newProps, rootNode) => {
    if (node.internal_static) {
      rootNode.isStaticDirty = true;
    }

    const updatePayload = {};
    const keys = Object.keys(newProps);

    for (const key of keys) {
      if (newProps[key] !== oldProps[key]) {
        const isStyle = key === 'style' && typeof newProps.style === 'object' && typeof oldProps.style === 'object';

        if (isStyle) {
          const newStyle = newProps.style;
          const oldStyle = oldProps.style;
          const styleKeys = Object.keys(newStyle);

          for (const styleKey of styleKeys) {
            // Always include `borderColor` and `borderStyle` to ensure border is rendered,
            // otherwise resulting `updatePayload` may not contain them
            // if they weren't changed during this update
            if (styleKey === 'borderStyle' || styleKey === 'borderColor') {
              if (typeof updatePayload.style !== 'object') {
                // Linter didn't like `= {} as Style`
                const style = {};
                updatePayload.style = style;
              }

              updatePayload.style.borderStyle = newStyle.borderStyle;
              updatePayload.style.borderColor = newStyle.borderColor;
            }

            if (newStyle[styleKey] !== oldStyle[styleKey]) {
              if (typeof updatePayload.style !== 'object') {
                // Linter didn't like `= {} as Style`
                const style = {};
                updatePayload.style = style;
              }

              updatePayload.style[styleKey] = newStyle[styleKey];
            }
          }

          continue;
        }

        updatePayload[key] = newProps[key];
      }
    }

    return updatePayload;
  },
  commitUpdate: (node, updatePayload) => {
    for (const [key, value] of Object.entries(updatePayload)) {
      if (key === 'children') {
        continue;
      } else if (key === 'style') {
        dom$1.setStyle(node, value);
      } else if (key === 'internal_transform') {
        node.internal_transform = value;
      } else if (key === 'internal_static') {
        node.internal_static = true;
      } else {
        dom$1.setAttribute(node, key, value);
      }
    }
  },
  commitTextUpdate: (node, _oldText, newText) => {
    dom$1.setTextNodeValue(node, newText);
  },
  removeChild: (node, removeNode) => {
    dom$1.removeChildNode(node, removeNode);
    cleanupYogaNode(removeNode.yogaNode);
  }
});

var reconciler = /*#__PURE__*/Object.defineProperty({
	default: _default$y
}, '__esModule', {value: true});

var indentString = (string, count = 1, options) => {
  options = {
    indent: ' ',
    includeEmptyLines: false,
    ...options
  };

  if (typeof string !== 'string') {
    throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
  }

  if (typeof count !== 'number') {
    throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
  }

  if (typeof options.indent !== 'string') {
    throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``);
  }

  if (count === 0) {
    return string;
  }

  const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return string.replace(regex, options.indent.repeat(count));
};

var __importDefault$k = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const yoga_layout_prebuilt_1$2 = __importDefault$k(require$$0__default['default']);

var _default$x = yogaNode => {
  return yogaNode.getComputedWidth() - yogaNode.getComputedPadding(yoga_layout_prebuilt_1$2.default.EDGE_LEFT) - yogaNode.getComputedPadding(yoga_layout_prebuilt_1$2.default.EDGE_RIGHT) - yogaNode.getComputedBorder(yoga_layout_prebuilt_1$2.default.EDGE_LEFT) - yogaNode.getComputedBorder(yoga_layout_prebuilt_1$2.default.EDGE_RIGHT);
};

var getMaxWidth = /*#__PURE__*/Object.defineProperty({
	default: _default$x
}, '__esModule', {value: true});

var single = {
  topLeft: "┌",
  topRight: "┐",
  bottomRight: "┘",
  bottomLeft: "└",
  vertical: "│",
  horizontal: "─"
};
var double = {
  topLeft: "╔",
  topRight: "╗",
  bottomRight: "╝",
  bottomLeft: "╚",
  vertical: "║",
  horizontal: "═"
};
var round = {
  topLeft: "╭",
  topRight: "╮",
  bottomRight: "╯",
  bottomLeft: "╰",
  vertical: "│",
  horizontal: "─"
};
var bold = {
  topLeft: "┏",
  topRight: "┓",
  bottomRight: "┛",
  bottomLeft: "┗",
  vertical: "┃",
  horizontal: "━"
};
var singleDouble = {
  topLeft: "╓",
  topRight: "╖",
  bottomRight: "╜",
  bottomLeft: "╙",
  vertical: "║",
  horizontal: "─"
};
var doubleSingle = {
  topLeft: "╒",
  topRight: "╕",
  bottomRight: "╛",
  bottomLeft: "╘",
  vertical: "│",
  horizontal: "═"
};
var classic = {
  topLeft: "+",
  topRight: "+",
  bottomRight: "+",
  bottomLeft: "+",
  vertical: "|",
  horizontal: "-"
};
var cliBoxes = {
  single: single,
  double: double,
  round: round,
  bold: bold,
  singleDouble: singleDouble,
  doubleSingle: doubleSingle,
  classic: classic
};

var cliBoxes_1 = cliBoxes; // TODO: Remove this for the next major release

var _default$w = cliBoxes;
cliBoxes_1.default = _default$w;

var __importDefault$j = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const chalk_1$1 = __importDefault$j(require$$0__default$1['default']);

const RGB_LIKE_REGEX = /^(rgb|hsl|hsv|hwb)\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/;
const ANSI_REGEX = /^(ansi|ansi256)\(\s?(\d+)\s?\)$/;

const getMethod = (name, type) => {
  if (type === 'foreground') {
    return name;
  }

  return 'bg' + name[0].toUpperCase() + name.slice(1);
};

var _default$v = (str, color, type) => {
  if (!color) {
    return str;
  }

  if (color in chalk_1$1.default) {
    const method = getMethod(color, type);
    return chalk_1$1.default[method](str);
  }

  if (color.startsWith('#')) {
    const method = getMethod('hex', type);
    return chalk_1$1.default[method](color)(str);
  }

  if (color.startsWith('ansi')) {
    const matches = ANSI_REGEX.exec(color);

    if (!matches) {
      return str;
    }

    const method = getMethod(matches[1], type);
    const value = Number(matches[2]);
    return chalk_1$1.default[method](value)(str);
  }

  const isRgbLike = color.startsWith('rgb') || color.startsWith('hsl') || color.startsWith('hsv') || color.startsWith('hwb');

  if (isRgbLike) {
    const matches = RGB_LIKE_REGEX.exec(color);

    if (!matches) {
      return str;
    }

    const method = getMethod(matches[1], type);
    const firstValue = Number(matches[2]);
    const secondValue = Number(matches[3]);
    const thirdValue = Number(matches[4]);
    return chalk_1$1.default[method](firstValue, secondValue, thirdValue)(str);
  }

  return str;
};

var colorize = /*#__PURE__*/Object.defineProperty({
	default: _default$v
}, '__esModule', {value: true});

var __importDefault$i = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const cli_boxes_1 = __importDefault$i(cliBoxes_1);

const colorize_1$1 = __importDefault$i(colorize);

var _default$u = (x, y, node, output) => {
  if (typeof node.style.borderStyle === 'string') {
    const width = node.yogaNode.getComputedWidth();
    const height = node.yogaNode.getComputedHeight();
    const color = node.style.borderColor;
    const box = cli_boxes_1.default[node.style.borderStyle];
    const topBorder = colorize_1$1.default(box.topLeft + box.horizontal.repeat(width - 2) + box.topRight, color, 'foreground');
    const verticalBorder = (colorize_1$1.default(box.vertical, color, 'foreground') + '\n').repeat(height - 2);
    const bottomBorder = colorize_1$1.default(box.bottomLeft + box.horizontal.repeat(width - 2) + box.bottomRight, color, 'foreground');
    output.write(x, y, topBorder, {
      transformers: []
    });
    output.write(x, y + 1, verticalBorder, {
      transformers: []
    });
    output.write(x + width - 1, y + 1, verticalBorder, {
      transformers: []
    });
    output.write(x, y + height - 1, bottomBorder, {
      transformers: []
    });
  }
};

var renderBorder = /*#__PURE__*/Object.defineProperty({
	default: _default$u
}, '__esModule', {value: true});

var __importDefault$h = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const yoga_layout_prebuilt_1$1 = __importDefault$h(require$$0__default['default']);

const widest_line_1 = __importDefault$h(widestLine_1);

const indent_string_1 = __importDefault$h(indentString);

const wrap_text_1 = __importDefault$h(wrapText);

const get_max_width_1 = __importDefault$h(getMaxWidth);

const squash_text_nodes_1 = __importDefault$h(squashTextNodes_1);

const render_border_1 = __importDefault$h(renderBorder); // If parent container is `<Box>`, text nodes will be treated as separate nodes in
// the tree and will have their own coordinates in the layout.
// To ensure text nodes are aligned correctly, take X and Y of the first text node
// and use it as offset for the rest of the nodes
// Only first node is taken into account, because other text nodes can't have margin or padding,
// so their coordinates will be relative to the first node anyway


const applyPaddingToText = (node, text) => {
  var _a;

  const yogaNode = (_a = node.childNodes[0]) === null || _a === void 0 ? void 0 : _a.yogaNode;

  if (yogaNode) {
    const offsetX = yogaNode.getComputedLeft();
    const offsetY = yogaNode.getComputedTop();
    text = '\n'.repeat(offsetY) + indent_string_1.default(text, offsetX);
  }

  return text;
}; // After nodes are laid out, render each to output object, which later gets rendered to terminal


const renderNodeToOutput = (node, output, options) => {
  var _a;

  const {
    offsetX = 0,
    offsetY = 0,
    transformers = [],
    skipStaticElements
  } = options;

  if (skipStaticElements && node.internal_static) {
    return;
  }

  const {
    yogaNode
  } = node;

  if (yogaNode) {
    if (yogaNode.getDisplay() === yoga_layout_prebuilt_1$1.default.DISPLAY_NONE) {
      return;
    } // Left and top positions in Yoga are relative to their parent node


    const x = offsetX + yogaNode.getComputedLeft();
    const y = offsetY + yogaNode.getComputedTop(); // Transformers are functions that transform final text output of each component
    // See Output class for logic that applies transformers

    let newTransformers = transformers;

    if (typeof node.internal_transform === 'function') {
      newTransformers = [node.internal_transform, ...transformers];
    }

    if (node.nodeName === 'ink-text') {
      let text = squash_text_nodes_1.default(node);

      if (text.length > 0) {
        const currentWidth = widest_line_1.default(text);
        const maxWidth = get_max_width_1.default(yogaNode);

        if (currentWidth > maxWidth) {
          const textWrap = (_a = node.style.textWrap) !== null && _a !== void 0 ? _a : 'wrap';
          text = wrap_text_1.default(text, maxWidth, textWrap);
        }

        text = applyPaddingToText(node, text);
        output.write(x, y, text, {
          transformers: newTransformers
        });
      }

      return;
    }

    if (node.nodeName === 'ink-box') {
      render_border_1.default(x, y, node, output);
    }

    if (node.nodeName === 'ink-root' || node.nodeName === 'ink-box') {
      for (const childNode of node.childNodes) {
        renderNodeToOutput(childNode, output, {
          offsetX: x,
          offsetY: y,
          transformers: newTransformers,
          skipStaticElements
        });
      }
    }
  }
};

var _default$t = renderNodeToOutput;

var renderNodeToOutput_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$t
}, '__esModule', {value: true});

const regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

var astralRegex = opts => opts && opts.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

const stringLength = string => stripAnsi__default['default'](string).replace(astralRegex(), ' ').length;

var stringLength_1 = stringLength; // TODO: Remove this for the next major release

var _default$s = stringLength;
stringLength_1.default = _default$s;

var __importDefault$g = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const slice_ansi_1 = __importDefault$g(sliceAnsi);

const string_length_1 = __importDefault$g(stringLength_1);

class Output {
  constructor(options) {
    // Initialize output array with a specific set of rows, so that margin/padding at the bottom is preserved
    this.writes = [];
    const {
      width,
      height
    } = options;
    this.width = width;
    this.height = height;
  }

  write(x, y, text, options) {
    const {
      transformers
    } = options;

    if (!text) {
      return;
    }

    this.writes.push({
      x,
      y,
      text,
      transformers
    });
  }

  get() {
    const output = [];

    for (let y = 0; y < this.height; y++) {
      output.push(' '.repeat(this.width));
    }

    for (const write of this.writes) {
      const {
        x,
        y,
        text,
        transformers
      } = write;
      const lines = text.split('\n');
      let offsetY = 0;

      for (let line of lines) {
        const currentLine = output[y + offsetY]; // Line can be missing if `text` is taller than height of pre-initialized `this.output`

        if (!currentLine) {
          continue;
        }

        const length = string_length_1.default(line);

        for (const transformer of transformers) {
          line = transformer(line);
        }

        output[y + offsetY] = slice_ansi_1.default(currentLine, 0, x) + line + slice_ansi_1.default(currentLine, x + length);
        offsetY++;
      }
    } // eslint-disable-next-line unicorn/prefer-trim-start-end


    const generatedOutput = output.map(line => line.trimRight()).join('\n');
    return {
      output: generatedOutput,
      height: output.length
    };
  }

}

var _default$r = Output;

var output = /*#__PURE__*/Object.defineProperty({
	default: _default$r
}, '__esModule', {value: true});

var __importDefault$f = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const yoga_layout_prebuilt_1 = __importDefault$f(require$$0__default['default']);

const render_node_to_output_1 = __importDefault$f(renderNodeToOutput_1);

const output_1 = __importDefault$f(output);

var _default$q = (node, terminalWidth) => {
  var _a;

  node.yogaNode.setWidth(terminalWidth);

  if (node.yogaNode) {
    node.yogaNode.calculateLayout(undefined, undefined, yoga_layout_prebuilt_1.default.DIRECTION_LTR);
    const output = new output_1.default({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });
    render_node_to_output_1.default(node, output, {
      skipStaticElements: true
    });
    let staticOutput;

    if ((_a = node.staticNode) === null || _a === void 0 ? void 0 : _a.yogaNode) {
      staticOutput = new output_1.default({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight()
      });
      render_node_to_output_1.default(node.staticNode, staticOutput, {
        skipStaticElements: false
      });
    }

    const {
      output: generatedOutput,
      height: outputHeight
    } = output.get();
    return {
      output: generatedOutput,
      outputHeight,
      // Newline at the end is needed, because static output doesn't have one, so
      // interactive output will override last line of static output
      staticOutput: staticOutput ? `${staticOutput.get().output}\n` : ''
    };
  }

  return {
    output: '',
    outputHeight: 0,
    staticOutput: ''
  };
};

var renderer = /*#__PURE__*/Object.defineProperty({
	default: _default$q
}, '__esModule', {value: true});

const CONSOLE_METHODS = ['assert', 'count', 'countReset', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'table', 'time', 'timeEnd', 'timeLog', 'trace', 'warn'];
let originalMethods = {};

const patchConsole = callback => {
  const stdout = new stream_1__default['default'].PassThrough();
  const stderr = new stream_1__default['default'].PassThrough();

  stdout.write = data => callback('stdout', data);

  stderr.write = data => callback('stderr', data);

  const internalConsole = new console.Console(stdout, stderr);

  for (const method of CONSOLE_METHODS) {
    originalMethods[method] = console[method];
    console[method] = internalConsole[method];
  }

  return () => {
    for (const method of CONSOLE_METHODS) {
      console[method] = originalMethods[method];
    }

    originalMethods = {};
  };
};

var build$1 = patchConsole;

// Store all instances of Ink (instance.js) to ensure that consecutive render() calls
// use the same instance of Ink and don't create a new one
//
// This map has to be stored in a separate file, because render.js creates instances,
// but instance.js should delete itself from the map on unmount

var _default$p = new WeakMap();

var instances = /*#__PURE__*/Object.defineProperty({
	default: _default$p
}, '__esModule', {value: true});

/**
 * `AppContext` is a React context, which exposes a method to manually exit the app (unmount).
 */


const AppContext = react.createContext({
  exit: () => {}
});
AppContext.displayName = 'InternalAppContext';
var _default$o = AppContext;

var AppContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$o
}, '__esModule', {value: true});

/**
 * `StdinContext` is a React context, which exposes input stream.
 */


const StdinContext = react.createContext({
  stdin: undefined,
  setRawMode: () => {},
  isRawModeSupported: false,
  internal_exitOnCtrlC: true
});
StdinContext.displayName = 'InternalStdinContext';
var _default$n = StdinContext;

var StdinContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$n
}, '__esModule', {value: true});

/**
 * `StdoutContext` is a React context, which exposes stdout stream, where Ink renders your app.
 */


const StdoutContext = react.createContext({
  stdout: undefined,
  write: () => {}
});
StdoutContext.displayName = 'InternalStdoutContext';
var _default$m = StdoutContext;

var StdoutContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$m
}, '__esModule', {value: true});

/**
 * `StderrContext` is a React context, which exposes stderr stream.
 */


const StderrContext = react.createContext({
  stderr: undefined,
  write: () => {}
});
StderrContext.displayName = 'InternalStderrContext';
var _default$l = StderrContext;

var StderrContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$l
}, '__esModule', {value: true});

const FocusContext = react.createContext({
  activeId: undefined,
  add: () => {},
  remove: () => {},
  activate: () => {},
  deactivate: () => {},
  enableFocus: () => {},
  disableFocus: () => {},
  focusNext: () => {},
  focusPrevious: () => {}
});
FocusContext.displayName = 'InternalFocusContext';
var _default$k = FocusContext;

var FocusContext_1$3 = /*#__PURE__*/Object.defineProperty({
	default: _default$k
}, '__esModule', {value: true});

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

var escapeStringRegexp = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(matchOperatorsRegex, '\\$&');
};

const natives = [].concat(require$$0__default$2['default'].builtinModules, 'bootstrap_node', 'node').map(n => new RegExp(`(?:\\(${n}\\.js:\\d+:\\d+\\)$|^\\s*at ${n}\\.js:\\d+:\\d+$)`));
natives.push(/\(internal\/[^:]+:\d+:\d+\)$/, /\s*at internal\/[^:]+:\d+:\d+$/, /\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/);

class StackUtils {
  constructor(opts) {
    opts = {
      ignoredPackages: [],
      ...opts
    };

    if ('internals' in opts === false) {
      opts.internals = StackUtils.nodeInternals();
    }

    if ('cwd' in opts === false) {
      opts.cwd = process.cwd();
    }

    this._cwd = opts.cwd.replace(/\\/g, '/');
    this._internals = [].concat(opts.internals, ignoredPackagesRegExp(opts.ignoredPackages));
    this._wrapCallSite = opts.wrapCallSite || false;
  }

  static nodeInternals() {
    return [...natives];
  }

  clean(stack, indent = 0) {
    indent = ' '.repeat(indent);

    if (!Array.isArray(stack)) {
      stack = stack.split('\n');
    }

    if (!/^\s*at /.test(stack[0]) && /^\s*at /.test(stack[1])) {
      stack = stack.slice(1);
    }

    let outdent = false;
    let lastNonAtLine = null;
    const result = [];
    stack.forEach(st => {
      st = st.replace(/\\/g, '/');

      if (this._internals.some(internal => internal.test(st))) {
        return;
      }

      const isAtLine = /^\s*at /.test(st);

      if (outdent) {
        st = st.trimEnd().replace(/^(\s+)at /, '$1');
      } else {
        st = st.trim();

        if (isAtLine) {
          st = st.slice(3);
        }
      }

      st = st.replace(`${this._cwd}/`, '');

      if (st) {
        if (isAtLine) {
          if (lastNonAtLine) {
            result.push(lastNonAtLine);
            lastNonAtLine = null;
          }

          result.push(st);
        } else {
          outdent = true;
          lastNonAtLine = st;
        }
      }
    });
    return result.map(line => `${indent}${line}\n`).join('');
  }

  captureString(limit, fn = this.captureString) {
    if (typeof limit === 'function') {
      fn = limit;
      limit = Infinity;
    }

    const {
      stackTraceLimit
    } = Error;

    if (limit) {
      Error.stackTraceLimit = limit;
    }

    const obj = {};
    Error.captureStackTrace(obj, fn);
    const {
      stack
    } = obj;
    Error.stackTraceLimit = stackTraceLimit;
    return this.clean(stack);
  }

  capture(limit, fn = this.capture) {
    if (typeof limit === 'function') {
      fn = limit;
      limit = Infinity;
    }

    const {
      prepareStackTrace,
      stackTraceLimit
    } = Error;

    Error.prepareStackTrace = (obj, site) => {
      if (this._wrapCallSite) {
        return site.map(this._wrapCallSite);
      }

      return site;
    };

    if (limit) {
      Error.stackTraceLimit = limit;
    }

    const obj = {};
    Error.captureStackTrace(obj, fn);
    const {
      stack
    } = obj;
    Object.assign(Error, {
      prepareStackTrace,
      stackTraceLimit
    });
    return stack;
  }

  at(fn = this.at) {
    const [site] = this.capture(1, fn);

    if (!site) {
      return {};
    }

    const res = {
      line: site.getLineNumber(),
      column: site.getColumnNumber()
    };
    setFile(res, site.getFileName(), this._cwd);

    if (site.isConstructor()) {
      res.constructor = true;
    }

    if (site.isEval()) {
      res.evalOrigin = site.getEvalOrigin();
    } // Node v10 stopped with the isNative() on callsites, apparently

    /* istanbul ignore next */


    if (site.isNative()) {
      res.native = true;
    }

    let typename;

    try {
      typename = site.getTypeName();
    } catch (_) {}

    if (typename && typename !== 'Object' && typename !== '[object Object]') {
      res.type = typename;
    }

    const fname = site.getFunctionName();

    if (fname) {
      res.function = fname;
    }

    const meth = site.getMethodName();

    if (meth && fname !== meth) {
      res.method = meth;
    }

    return res;
  }

  parseLine(line) {
    const match = line && line.match(re);

    if (!match) {
      return null;
    }

    const ctor = match[1] === 'new';
    let fname = match[2];
    const evalOrigin = match[3];
    const evalFile = match[4];
    const evalLine = Number(match[5]);
    const evalCol = Number(match[6]);
    let file = match[7];
    const lnum = match[8];
    const col = match[9];
    const native = match[10] === 'native';
    const closeParen = match[11] === ')';
    let method;
    const res = {};

    if (lnum) {
      res.line = Number(lnum);
    }

    if (col) {
      res.column = Number(col);
    }

    if (closeParen && file) {
      // make sure parens are balanced
      // if we have a file like "asdf) [as foo] (xyz.js", then odds are
      // that the fname should be += " (asdf) [as foo]" and the file
      // should be just "xyz.js"
      // walk backwards from the end to find the last unbalanced (
      let closes = 0;

      for (let i = file.length - 1; i > 0; i--) {
        if (file.charAt(i) === ')') {
          closes++;
        } else if (file.charAt(i) === '(' && file.charAt(i - 1) === ' ') {
          closes--;

          if (closes === -1 && file.charAt(i - 1) === ' ') {
            const before = file.slice(0, i - 1);
            const after = file.slice(i + 1);
            file = after;
            fname += ` (${before}`;
            break;
          }
        }
      }
    }

    if (fname) {
      const methodMatch = fname.match(methodRe);

      if (methodMatch) {
        fname = methodMatch[1];
        method = methodMatch[2];
      }
    }

    setFile(res, file, this._cwd);

    if (ctor) {
      res.constructor = true;
    }

    if (evalOrigin) {
      res.evalOrigin = evalOrigin;
      res.evalLine = evalLine;
      res.evalColumn = evalCol;
      res.evalFile = evalFile && evalFile.replace(/\\/g, '/');
    }

    if (native) {
      res.native = true;
    }

    if (fname) {
      res.function = fname;
    }

    if (method && fname !== method) {
      res.method = method;
    }

    return res;
  }

}

function setFile(result, filename, cwd) {
  if (filename) {
    filename = filename.replace(/\\/g, '/');

    if (filename.startsWith(`${cwd}/`)) {
      filename = filename.slice(cwd.length + 1);
    }

    result.file = filename;
  }
}

function ignoredPackagesRegExp(ignoredPackages) {
  if (ignoredPackages.length === 0) {
    return [];
  }

  const packages = ignoredPackages.map(mod => escapeStringRegexp(mod));
  return new RegExp(`[\/\\\\]node_modules[\/\\\\](?:${packages.join('|')})[\/\\\\][^:]+:\\d+:\\d+`);
}

const re = new RegExp('^' + // Sometimes we strip out the '    at' because it's noisy
'(?:\\s*at )?' + // $1 = ctor if 'new'
'(?:(new) )?' + // $2 = function name (can be literally anything)
// May contain method at the end as [as xyz]
'(?:(.*?) \\()?' + // (eval at <anonymous> (file.js:1:1),
// $3 = eval origin
// $4:$5:$6 are eval file/line/col, but not normally reported
'(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?' + // file:line:col
// $7:$8:$9
// $10 = 'native' if native
'(?:(.+?):(\\d+):(\\d+)|(native))' + // maybe close the paren, then end
// if $11 is ), then we only allow balanced parens in the filename
// any imbalance is placed on the fname.  This is a heuristic, and
// bound to be incorrect in some edge cases.  The bet is that
// having weird characters in method names is more common than
// having weird characters in filenames, which seems reasonable.
'(\\)?)$');
const methodRe = /^(.*?) \[as (.*?)\]$/;
var stackUtils$1 = StackUtils;

var convertToSpaces = (str, spaces) => {
  return str.replace(/^\t+/gm, $1 => ' '.repeat($1.length * (spaces || 2)));
};

const generateLineNumbers = (line, around) => {
  const lineNumbers = [];
  const min = line - around;
  const max = line + around;

  for (let lineNumber = min; lineNumber <= max; lineNumber++) {
    lineNumbers.push(lineNumber);
  }

  return lineNumbers;
};

var codeExcerpt = (source, line, options) => {
  if (typeof source !== 'string') {
    throw new TypeError('Source code is missing.');
  }

  if (!line || line < 1) {
    throw new TypeError('Line number must start from `1`.');
  }

  source = convertToSpaces(source).split(/\r?\n/);

  if (line > source.length) {
    return;
  }

  options = {
    around: 3,
    ...options
  };
  return generateLineNumbers(line, options.around).filter(line => source[line - 1] !== undefined).map(line => ({
    line,
    value: source[line - 1]
  }));
};

var __createBinding$4 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault$4 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$4 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);

  __setModuleDefault$4(result, mod);

  return result;
};

var __rest = commonjsGlobal && commonjsGlobal.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const react_1$9 = __importStar$4(react);
/**
 * `<Box>` is an essential Ink component to build your layout. It's like `<div style="display: flex">` in the browser.
 */


const Box = react_1$9.forwardRef((_a, ref) => {
  var {
    children
  } = _a,
      style = __rest(_a, ["children"]);

  const transformedStyle = Object.assign(Object.assign({}, style), {
    marginLeft: style.marginLeft || style.marginX || style.margin || 0,
    marginRight: style.marginRight || style.marginX || style.margin || 0,
    marginTop: style.marginTop || style.marginY || style.margin || 0,
    marginBottom: style.marginBottom || style.marginY || style.margin || 0,
    paddingLeft: style.paddingLeft || style.paddingX || style.padding || 0,
    paddingRight: style.paddingRight || style.paddingX || style.padding || 0,
    paddingTop: style.paddingTop || style.paddingY || style.padding || 0,
    paddingBottom: style.paddingBottom || style.paddingY || style.padding || 0
  });
  return react_1$9.default.createElement("ink-box", {
    ref: ref,
    style: transformedStyle
  }, children);
});
Box.displayName = 'Box';
Box.defaultProps = {
  flexDirection: 'row',
  flexGrow: 0,
  flexShrink: 1
};
var _default$j = Box;

var Box_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$j
}, '__esModule', {value: true});

var __importDefault$e = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$8 = __importDefault$e(react);

const chalk_1 = __importDefault$e(require$$0__default$1['default']);

const colorize_1 = __importDefault$e(colorize);
/**
 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
 */


const Text = ({
  color,
  backgroundColor,
  dimColor,
  bold,
  italic,
  underline,
  strikethrough,
  inverse,
  wrap,
  children
}) => {
  if (children === undefined || children === null) {
    return null;
  }

  const transform = children => {
    if (dimColor) {
      children = chalk_1.default.dim(children);
    }

    if (color) {
      children = colorize_1.default(children, color, 'foreground');
    }

    if (backgroundColor) {
      children = colorize_1.default(children, backgroundColor, 'background');
    }

    if (bold) {
      children = chalk_1.default.bold(children);
    }

    if (italic) {
      children = chalk_1.default.italic(children);
    }

    if (underline) {
      children = chalk_1.default.underline(children);
    }

    if (strikethrough) {
      children = chalk_1.default.strikethrough(children);
    }

    if (inverse) {
      children = chalk_1.default.inverse(children);
    }

    return children;
  };

  return react_1$8.default.createElement("ink-text", {
    style: {
      flexGrow: 0,
      flexShrink: 1,
      flexDirection: 'row',
      textWrap: wrap
    },
    internal_transform: transform
  }, children);
};

Text.displayName = 'Text';
Text.defaultProps = {
  dimColor: false,
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  wrap: 'wrap'
};
var _default$i = Text;

var Text_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$i
}, '__esModule', {value: true});

var __createBinding$3 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault$3 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$3 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);

  __setModuleDefault$3(result, mod);

  return result;
};

var __importDefault$d = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const fs = __importStar$3(require$$0__default$3['default']);

const react_1$7 = __importDefault$d(react);

const stack_utils_1 = __importDefault$d(stackUtils$1);

const code_excerpt_1 = __importDefault$d(codeExcerpt);

const Box_1$1 = __importDefault$d(Box_1$2);

const Text_1 = __importDefault$d(Text_1$1);

const stackUtils = new stack_utils_1.default({
  cwd: process.cwd(),
  internals: stack_utils_1.default.nodeInternals()
});

const ErrorOverview = ({
  error
}) => {
  const stack = error.stack ? error.stack.split('\n').slice(1) : undefined;
  const origin = stack ? stackUtils.parseLine(stack[0]) : undefined;
  let excerpt;
  let lineWidth = 0;

  if ((origin === null || origin === void 0 ? void 0 : origin.file) && (origin === null || origin === void 0 ? void 0 : origin.line) && fs.existsSync(origin.file)) {
    const sourceCode = fs.readFileSync(origin.file, 'utf8');
    excerpt = code_excerpt_1.default(sourceCode, origin.line);

    if (excerpt) {
      for (const {
        line
      } of excerpt) {
        lineWidth = Math.max(lineWidth, String(line).length);
      }
    }
  }

  return react_1$7.default.createElement(Box_1$1.default, {
    flexDirection: "column",
    padding: 1
  }, react_1$7.default.createElement(Box_1$1.default, null, react_1$7.default.createElement(Text_1.default, {
    backgroundColor: "red",
    color: "white"
  }, ' ', "ERROR", ' '), react_1$7.default.createElement(Text_1.default, null, " ", error.message)), origin && react_1$7.default.createElement(Box_1$1.default, {
    marginTop: 1
  }, react_1$7.default.createElement(Text_1.default, {
    dimColor: true
  }, origin.file, ":", origin.line, ":", origin.column)), origin && excerpt && react_1$7.default.createElement(Box_1$1.default, {
    marginTop: 1,
    flexDirection: "column"
  }, excerpt.map(({
    line,
    value
  }) => react_1$7.default.createElement(Box_1$1.default, {
    key: line
  }, react_1$7.default.createElement(Box_1$1.default, {
    width: lineWidth + 1
  }, react_1$7.default.createElement(Text_1.default, {
    dimColor: line !== origin.line,
    backgroundColor: line === origin.line ? 'red' : undefined,
    color: line === origin.line ? 'white' : undefined
  }, String(line).padStart(lineWidth, ' '), ":")), react_1$7.default.createElement(Text_1.default, {
    key: line,
    backgroundColor: line === origin.line ? 'red' : undefined,
    color: line === origin.line ? 'white' : undefined
  }, ' ' + value)))), error.stack && react_1$7.default.createElement(Box_1$1.default, {
    marginTop: 1,
    flexDirection: "column"
  }, error.stack.split('\n').slice(1).map(line => {
    const parsedLine = stackUtils.parseLine(line); // If the line from the stack cannot be parsed, we print out the unparsed line.

    if (!parsedLine) {
      return react_1$7.default.createElement(Box_1$1.default, {
        key: line
      }, react_1$7.default.createElement(Text_1.default, {
        dimColor: true
      }, "- "), react_1$7.default.createElement(Text_1.default, {
        dimColor: true,
        bold: true
      }, line));
    }

    return react_1$7.default.createElement(Box_1$1.default, {
      key: line
    }, react_1$7.default.createElement(Text_1.default, {
      dimColor: true
    }, "- "), react_1$7.default.createElement(Text_1.default, {
      dimColor: true,
      bold: true
    }, parsedLine.function), react_1$7.default.createElement(Text_1.default, {
      dimColor: true,
      color: "gray"
    }, ' ', "(", parsedLine.file, ":", parsedLine.line, ":", parsedLine.column, ")"));
  })));
};

var _default$h = ErrorOverview;

var ErrorOverview_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$h
}, '__esModule', {value: true});

var __createBinding$2 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault$2 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$2 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);

  __setModuleDefault$2(result, mod);

  return result;
};

var __importDefault$c = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};


/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const react_1$6 = __importStar$2(react);

const cli_cursor_1 = __importDefault$c(cliCursor);

const AppContext_1$1 = __importDefault$c(AppContext_1$2);

const StdinContext_1$1 = __importDefault$c(StdinContext_1$2);

const StdoutContext_1$1 = __importDefault$c(StdoutContext_1$2);

const StderrContext_1$1 = __importDefault$c(StderrContext_1$2);

const FocusContext_1$2 = __importDefault$c(FocusContext_1$3);

const ErrorOverview_1 = __importDefault$c(ErrorOverview_1$1);

const TAB = '\t';
const SHIFT_TAB = '\u001B[Z';
const ESC = '\u001B'; // Root component for all Ink apps
// It renders stdin and stdout contexts, so that children can access them if needed
// It also handles Ctrl+C exiting and cursor visibility

class App extends react_1$6.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isFocusEnabled: true,
      activeFocusId: undefined,
      focusables: [],
      error: undefined
    }; // Count how many components enabled raw mode to avoid disabling
    // raw mode until all components don't need it anymore

    this.rawModeEnabledCount = 0;

    this.handleSetRawMode = isEnabled => {
      const {
        stdin
      } = this.props;

      if (!this.isRawModeSupported()) {
        if (stdin === process.stdin) {
          throw new Error('Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported');
        } else {
          throw new Error('Raw mode is not supported on the stdin provided to Ink.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported');
        }
      }

      stdin.setEncoding('utf8');

      if (isEnabled) {
        // Ensure raw mode is enabled only once
        if (this.rawModeEnabledCount === 0) {
          stdin.addListener('data', this.handleInput);
          stdin.resume();
          stdin.setRawMode(true);
        }

        this.rawModeEnabledCount++;
        return;
      } // Disable raw mode only when no components left that are using it


      if (--this.rawModeEnabledCount === 0) {
        stdin.setRawMode(false);
        stdin.removeListener('data', this.handleInput);
        stdin.pause();
      }
    };

    this.handleInput = input => {
      // Exit on Ctrl+C
      // eslint-disable-next-line unicorn/no-hex-escape
      if (input === '\x03' && this.props.exitOnCtrlC) {
        this.handleExit();
      } // Reset focus when there's an active focused component on Esc


      if (input === ESC && this.state.activeFocusId) {
        this.setState({
          activeFocusId: undefined
        });
      }

      if (this.state.isFocusEnabled && this.state.focusables.length > 0) {
        if (input === TAB) {
          this.focusNext();
        }

        if (input === SHIFT_TAB) {
          this.focusPrevious();
        }
      }
    };

    this.handleExit = error => {
      if (this.isRawModeSupported()) {
        this.handleSetRawMode(false);
      }

      this.props.onExit(error);
    };

    this.enableFocus = () => {
      this.setState({
        isFocusEnabled: true
      });
    };

    this.disableFocus = () => {
      this.setState({
        isFocusEnabled: false
      });
    };

    this.focusNext = () => {
      this.setState(previousState => {
        const firstFocusableId = previousState.focusables[0].id;
        const nextFocusableId = this.findNextFocusable(previousState);
        return {
          activeFocusId: nextFocusableId || firstFocusableId
        };
      });
    };

    this.focusPrevious = () => {
      this.setState(previousState => {
        const lastFocusableId = previousState.focusables[previousState.focusables.length - 1].id;
        const previousFocusableId = this.findPreviousFocusable(previousState);
        return {
          activeFocusId: previousFocusableId || lastFocusableId
        };
      });
    };

    this.addFocusable = (id, {
      autoFocus
    }) => {
      this.setState(previousState => {
        let nextFocusId = previousState.activeFocusId;

        if (!nextFocusId && autoFocus) {
          nextFocusId = id;
        }

        return {
          activeFocusId: nextFocusId,
          focusables: [...previousState.focusables, {
            id,
            isActive: true
          }]
        };
      });
    };

    this.removeFocusable = id => {
      this.setState(previousState => ({
        activeFocusId: previousState.activeFocusId === id ? undefined : previousState.activeFocusId,
        focusables: previousState.focusables.filter(focusable => {
          return focusable.id !== id;
        })
      }));
    };

    this.activateFocusable = id => {
      this.setState(previousState => ({
        focusables: previousState.focusables.map(focusable => {
          if (focusable.id !== id) {
            return focusable;
          }

          return {
            id,
            isActive: true
          };
        })
      }));
    };

    this.deactivateFocusable = id => {
      this.setState(previousState => ({
        activeFocusId: previousState.activeFocusId === id ? undefined : previousState.activeFocusId,
        focusables: previousState.focusables.map(focusable => {
          if (focusable.id !== id) {
            return focusable;
          }

          return {
            id,
            isActive: false
          };
        })
      }));
    };

    this.findNextFocusable = state => {
      const activeIndex = state.focusables.findIndex(focusable => {
        return focusable.id === state.activeFocusId;
      });

      for (let index = activeIndex + 1; index < state.focusables.length; index++) {
        if (state.focusables[index].isActive) {
          return state.focusables[index].id;
        }
      }

      return undefined;
    };

    this.findPreviousFocusable = state => {
      const activeIndex = state.focusables.findIndex(focusable => {
        return focusable.id === state.activeFocusId;
      });

      for (let index = activeIndex - 1; index >= 0; index--) {
        if (state.focusables[index].isActive) {
          return state.focusables[index].id;
        }
      }

      return undefined;
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  } // Determines if TTY is supported on the provided stdin


  isRawModeSupported() {
    return this.props.stdin.isTTY;
  }

  render() {
    return react_1$6.default.createElement(AppContext_1$1.default.Provider, {
      value: {
        exit: this.handleExit
      }
    }, react_1$6.default.createElement(StdinContext_1$1.default.Provider, {
      value: {
        stdin: this.props.stdin,
        setRawMode: this.handleSetRawMode,
        isRawModeSupported: this.isRawModeSupported(),
        internal_exitOnCtrlC: this.props.exitOnCtrlC
      }
    }, react_1$6.default.createElement(StdoutContext_1$1.default.Provider, {
      value: {
        stdout: this.props.stdout,
        write: this.props.writeToStdout
      }
    }, react_1$6.default.createElement(StderrContext_1$1.default.Provider, {
      value: {
        stderr: this.props.stderr,
        write: this.props.writeToStderr
      }
    }, react_1$6.default.createElement(FocusContext_1$2.default.Provider, {
      value: {
        activeId: this.state.activeFocusId,
        add: this.addFocusable,
        remove: this.removeFocusable,
        activate: this.activateFocusable,
        deactivate: this.deactivateFocusable,
        enableFocus: this.enableFocus,
        disableFocus: this.disableFocus,
        focusNext: this.focusNext,
        focusPrevious: this.focusPrevious
      }
    }, this.state.error ? react_1$6.default.createElement(ErrorOverview_1.default, {
      error: this.state.error
    }) : this.props.children)))));
  }

  componentDidMount() {
    cli_cursor_1.default.hide(this.props.stdout);
  }

  componentWillUnmount() {
    cli_cursor_1.default.show(this.props.stdout); // ignore calling setRawMode on an handle stdin it cannot be called

    if (this.isRawModeSupported()) {
      this.handleSetRawMode(false);
    }
  }

  componentDidCatch(error) {
    this.handleExit(error);
  }

}

var _default$g = App;
App.displayName = 'InternalApp';

var App_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$g
}, '__esModule', {value: true});

var __createBinding$1 = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault$1 = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$1 = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);

  __setModuleDefault$1(result, mod);

  return result;
};

var __importDefault$b = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$5 = __importDefault$b(react);



const log_update_1 = __importDefault$b(logUpdate);

const ansi_escapes_1 = __importDefault$b(ansiEscapes_1);

const is_ci_1 = __importDefault$b(isCi);

const auto_bind_1 = __importDefault$b(autoBind);

const reconciler_1 = __importDefault$b(reconciler);

const renderer_1 = __importDefault$b(renderer);

const signal_exit_1 = __importDefault$b(signalExit__default['default']);

const patch_console_1 = __importDefault$b(build$1);

const dom = __importStar$1(dom$1);

const instances_1$1 = __importDefault$b(instances);

const App_1 = __importDefault$b(App_1$1);

const isCI = process.env.CI === 'false' ? false : is_ci_1.default;

const noop = () => {};

class Ink {
  constructor(options) {
    this.resolveExitPromise = () => {};

    this.rejectExitPromise = () => {};

    this.unsubscribeExit = () => {};

    this.onRender = () => {
      if (this.isUnmounted) {
        return;
      }

      const {
        output,
        outputHeight,
        staticOutput
      } = renderer_1.default(this.rootNode, // The 'columns' property can be undefined or 0 when not using a TTY.
      // In that case we fall back to 80.
      this.options.stdout.columns || 80); // If <Static> output isn't empty, it means new children have been added to it

      const hasStaticOutput = staticOutput && staticOutput !== '\n';

      if (this.options.debug) {
        if (hasStaticOutput) {
          this.fullStaticOutput += staticOutput;
        }

        this.options.stdout.write(this.fullStaticOutput + output);
        return;
      }

      if (isCI) {
        if (hasStaticOutput) {
          this.options.stdout.write(staticOutput);
        }

        this.lastOutput = output;
        return;
      }

      if (hasStaticOutput) {
        this.fullStaticOutput += staticOutput;
      }

      if (outputHeight >= this.options.stdout.rows) {
        this.options.stdout.write(ansi_escapes_1.default.clearTerminal + this.fullStaticOutput + output);
        this.lastOutput = output;
        return;
      } // To ensure static output is cleanly rendered before main output, clear main output first


      if (hasStaticOutput) {
        this.log.clear();
        this.options.stdout.write(staticOutput);
        this.log(output);
      }

      if (!hasStaticOutput && output !== this.lastOutput) {
        this.throttledLog(output);
      }

      this.lastOutput = output;
    };

    auto_bind_1.default(this);
    this.options = options;
    this.rootNode = dom.createNode('ink-root');
    this.rootNode.onRender = options.debug ? this.onRender : lodash_1__default['default'].throttle(this.onRender, 32, {
      leading: true,
      trailing: true
    });
    this.rootNode.onImmediateRender = this.onRender;
    this.log = log_update_1.default.create(options.stdout);
    this.throttledLog = options.debug ? this.log : lodash_1__default['default'].throttle(this.log, undefined, {
      leading: true,
      trailing: true
    }); // Ignore last render after unmounting a tree to prevent empty output before exit

    this.isUnmounted = false; // Store last output to only rerender when needed

    this.lastOutput = ''; // This variable is used only in debug mode to store full static output
    // so that it's rerendered every time, not just new static parts, like in non-debug mode

    this.fullStaticOutput = '';
    this.container = reconciler_1.default.createContainer(this.rootNode, false, false); // Unmount when process exits

    this.unsubscribeExit = signal_exit_1.default(this.unmount, {
      alwaysLast: false
    });

    if (process.env.DEV === 'true') {
      reconciler_1.default.injectIntoDevTools({
        bundleType: 0,
        // Reporting React DOM's version, not Ink's
        // See https://github.com/facebook/react/issues/16666#issuecomment-532639905
        version: '16.13.1',
        rendererPackageName: 'ink'
      });
    }

    if (options.patchConsole) {
      this.patchConsole();
    }

    if (!isCI) {
      options.stdout.on('resize', this.onRender);

      this.unsubscribeResize = () => {
        options.stdout.off('resize', this.onRender);
      };
    }
  }

  render(node) {
    const tree = react_1$5.default.createElement(App_1.default, {
      stdin: this.options.stdin,
      stdout: this.options.stdout,
      stderr: this.options.stderr,
      writeToStdout: this.writeToStdout,
      writeToStderr: this.writeToStderr,
      exitOnCtrlC: this.options.exitOnCtrlC,
      onExit: this.unmount
    }, node);
    reconciler_1.default.updateContainer(tree, this.container, null, noop);
  }

  writeToStdout(data) {
    if (this.isUnmounted) {
      return;
    }

    if (this.options.debug) {
      this.options.stdout.write(data + this.fullStaticOutput + this.lastOutput);
      return;
    }

    if (isCI) {
      this.options.stdout.write(data);
      return;
    }

    this.log.clear();
    this.options.stdout.write(data);
    this.log(this.lastOutput);
  }

  writeToStderr(data) {
    if (this.isUnmounted) {
      return;
    }

    if (this.options.debug) {
      this.options.stderr.write(data);
      this.options.stdout.write(this.fullStaticOutput + this.lastOutput);
      return;
    }

    if (isCI) {
      this.options.stderr.write(data);
      return;
    }

    this.log.clear();
    this.options.stderr.write(data);
    this.log(this.lastOutput);
  }

  unmount(error) {
    if (this.isUnmounted) {
      return;
    }

    this.onRender();
    this.unsubscribeExit();

    if (typeof this.restoreConsole === 'function') {
      this.restoreConsole();
    }

    if (typeof this.unsubscribeResize === 'function') {
      this.unsubscribeResize();
    } // CIs don't handle erasing ansi escapes well, so it's better to
    // only render last frame of non-static output


    if (isCI) {
      this.options.stdout.write(this.lastOutput + '\n');
    } else if (!this.options.debug) {
      this.log.done();
    }

    this.isUnmounted = true;
    reconciler_1.default.updateContainer(null, this.container, null, noop);
    instances_1$1.default.delete(this.options.stdout);

    if (error instanceof Error) {
      this.rejectExitPromise(error);
    } else {
      this.resolveExitPromise();
    }
  }

  waitUntilExit() {
    if (!this.exitPromise) {
      this.exitPromise = new Promise((resolve, reject) => {
        this.resolveExitPromise = resolve;
        this.rejectExitPromise = reject;
      });
    }

    return this.exitPromise;
  }

  clear() {
    if (!isCI && !this.options.debug) {
      this.log.clear();
    }
  }

  patchConsole() {
    if (this.options.debug) {
      return;
    }

    this.restoreConsole = patch_console_1.default((stream, data) => {
      if (stream === 'stdout') {
        this.writeToStdout(data);
      }

      if (stream === 'stderr') {
        const isReactMessage = data.startsWith('The above error occurred');

        if (!isReactMessage) {
          this.writeToStderr(data);
        }
      }
    });
  }

}

var _default$f = Ink;

var ink = /*#__PURE__*/Object.defineProperty({
	default: _default$f
}, '__esModule', {value: true});

var __importDefault$a = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const ink_1 = __importDefault$a(ink);

const instances_1 = __importDefault$a(instances);


/**
 * Mount a component and render the output.
 */


const render = (node, options) => {
  const inkOptions = Object.assign({
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true
  }, getOptions(options));
  const instance = getInstance(inkOptions.stdout, () => new ink_1.default(inkOptions));
  instance.render(node);
  return {
    rerender: instance.render,
    unmount: () => instance.unmount(),
    waitUntilExit: instance.waitUntilExit,
    cleanup: () => instances_1.default.delete(inkOptions.stdout),
    clear: instance.clear
  };
};

var _default$e = render;

const getOptions = (stdout = {}) => {
  if (stdout instanceof stream_1__default['default'].Stream) {
    return {
      stdout,
      stdin: process.stdin
    };
  }

  return stdout;
};

const getInstance = (stdout, createInstance) => {
  let instance;

  if (instances_1.default.has(stdout)) {
    instance = instances_1.default.get(stdout);
  } else {
    instance = createInstance();
    instances_1.default.set(stdout, instance);
  }

  return instance;
};

var render_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$e
}, '__esModule', {value: true});

var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};



const react_1$4 = __importStar(react);
/**
 * `<Static>` component permanently renders its output above everything else.
 * It's useful for displaying activity like completed tasks or logs - things that
 * are not changing after they're rendered (hence the name "Static").
 *
 * It's preferred to use `<Static>` for use cases like these, when you can't know
 * or control the amount of items that need to be rendered.
 *
 * For example, [Tap](https://github.com/tapjs/node-tap) uses `<Static>` to display
 * a list of completed tests. [Gatsby](https://github.com/gatsbyjs/gatsby) uses it
 * to display a list of generated pages, while still displaying a live progress bar.
 */


const Static = props => {
  const {
    items,
    children: render,
    style: customStyle
  } = props;
  const [index, setIndex] = react_1$4.useState(0);
  const itemsToRender = react_1$4.useMemo(() => {
    return items.slice(index);
  }, [items, index]);
  react_1$4.useLayoutEffect(() => {
    setIndex(items.length);
  }, [items.length]);
  const children = itemsToRender.map((item, itemIndex) => {
    return render(item, index + itemIndex);
  });
  const style = react_1$4.useMemo(() => Object.assign({
    position: 'absolute',
    flexDirection: 'column'
  }, customStyle), [customStyle]);
  return react_1$4.default.createElement("ink-box", {
    // @ts-ignore
    internal_static: true,
    style: style
  }, children);
};

Static.displayName = 'Static';
var _default$d = Static;

var Static_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$d
}, '__esModule', {value: true});

var __importDefault$9 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$3 = __importDefault$9(react);
/**
 * Transform a string representation of React components before they are written to output.
 * For example, you might want to apply a gradient to text, add a clickable link or create some text effects.
 * These use cases can't accept React nodes as input, they are expecting a string.
 * That's what <Transform> component does, it gives you an output string of its child components and lets you transform it in any way.
 */


const Transform = ({
  children,
  transform
}) => {
  if (children === undefined || children === null) {
    return null;
  }

  return react_1$3.default.createElement("ink-text", {
    style: {
      flexGrow: 0,
      flexShrink: 1,
      flexDirection: 'row'
    },
    internal_transform: transform
  }, children);
};

Transform.displayName = 'Transform';
var _default$c = Transform;

var Transform_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$c
}, '__esModule', {value: true});

var __importDefault$8 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$2 = __importDefault$8(react);
/**
 * Adds one or more newline (\n) characters. Must be used within <Text> components.
 */


const Newline = ({
  count = 1
}) => react_1$2.default.createElement("ink-text", null, '\n'.repeat(count));

Newline.displayName = 'Newline';
var _default$b = Newline;

var Newline_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$b
}, '__esModule', {value: true});

var __importDefault$7 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$1 = __importDefault$7(react);

const Box_1 = __importDefault$7(Box_1$2);
/**
 * A flexible space that expands along the major axis of its containing layout.
 * It's useful as a shortcut for filling all the available spaces between elements.
 */


const Spacer = () => react_1$1.default.createElement(Box_1.default, {
  flexGrow: 1
});

Spacer.displayName = 'Spacer';
var _default$a = Spacer;

var Spacer_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$a
}, '__esModule', {value: true});

var __importDefault$6 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StdinContext_1 = __importDefault$6(StdinContext_1$2);
/**
 * `useStdin` is a React hook, which exposes stdin stream.
 */


const useStdin = () => react.useContext(StdinContext_1.default);

var _default$9 = useStdin;

var useStdin_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$9
}, '__esModule', {value: true});

var __importDefault$5 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const use_stdin_1$1 = __importDefault$5(useStdin_1);
/**
 * This hook is used for handling user input.
 * It's a more convienient alternative to using `StdinContext` and listening to `data` events.
 * The callback you pass to `useInput` is called for each character when user enters any input.
 * However, if user pastes text and it's more than one character, the callback will be called only once and the whole string will be passed as `input`.
 *
 * ```
 * import {useInput} from 'ink';
 *
 * const UserInput = () => {
 *   useInput((input, key) => {
 *     if (input === 'q') {
 *       // Exit program
 *     }
 *
 *     if (key.leftArrow) {
 *       // Left arrow key pressed
 *     }
 *   });
 *
 *   return …
 * };
 * ```
 */


const useInput = (inputHandler, options = {}) => {
  const {
    stdin,
    setRawMode,
    internal_exitOnCtrlC
  } = use_stdin_1$1.default();
  react.useEffect(() => {
    if (options.isActive === false) {
      return;
    }

    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, [options.isActive, setRawMode]);
  react.useEffect(() => {
    if (options.isActive === false) {
      return;
    }

    const handleData = data => {
      let input = String(data);
      const key = {
        upArrow: input === '\u001B[A',
        downArrow: input === '\u001B[B',
        leftArrow: input === '\u001B[D',
        rightArrow: input === '\u001B[C',
        pageDown: input === '\u001B[6~',
        pageUp: input === '\u001B[5~',
        return: input === '\r',
        escape: input === '\u001B',
        ctrl: false,
        shift: false,
        tab: input === '\t' || input === '\u001B[Z',
        backspace: input === '\u0008',
        delete: input === '\u007F' || input === '\u001B[3~',
        meta: false
      }; // Copied from `keypress` module

      if (input <= '\u001A' && !key.return) {
        input = String.fromCharCode(input.charCodeAt(0) + 'a'.charCodeAt(0) - 1);
        key.ctrl = true;
      }

      if (input.startsWith('\u001B')) {
        input = input.slice(1);
        key.meta = true;
      }

      const isLatinUppercase = input >= 'A' && input <= 'Z';
      const isCyrillicUppercase = input >= 'А' && input <= 'Я';

      if (input.length === 1 && (isLatinUppercase || isCyrillicUppercase)) {
        key.shift = true;
      } // Shift+Tab


      if (key.tab && input === '[Z') {
        key.shift = true;
      }

      if (key.tab || key.backspace || key.delete) {
        input = '';
      } // If app is not supposed to exit on Ctrl+C, then let input listener handle it


      if (!(input === 'c' && key.ctrl) || !internal_exitOnCtrlC) {
        inputHandler(input, key);
      }
    };

    stdin === null || stdin === void 0 ? void 0 : stdin.on('data', handleData);
    return () => {
      stdin === null || stdin === void 0 ? void 0 : stdin.off('data', handleData);
    };
  }, [options.isActive, stdin, internal_exitOnCtrlC, inputHandler]);
};

var _default$8 = useInput;

var useInput_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$8
}, '__esModule', {value: true});

var __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const AppContext_1 = __importDefault$4(AppContext_1$2);
/**
 * `useApp` is a React hook, which exposes a method to manually exit the app (unmount).
 */


const useApp = () => react.useContext(AppContext_1.default);

var _default$7 = useApp;

var useApp_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$7
}, '__esModule', {value: true});

var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StdoutContext_1 = __importDefault$3(StdoutContext_1$2);
/**
 * `useStdout` is a React hook, which exposes stdout stream.
 */


const useStdout = () => react.useContext(StdoutContext_1.default);

var _default$6 = useStdout;

var useStdout_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$6
}, '__esModule', {value: true});

var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StderrContext_1 = __importDefault$2(StderrContext_1$2);
/**
 * `useStderr` is a React hook, which exposes stderr stream.
 */


const useStderr = () => react.useContext(StderrContext_1.default);

var _default$5 = useStderr;

var useStderr_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$5
}, '__esModule', {value: true});

var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const FocusContext_1$1 = __importDefault$1(FocusContext_1$3);

const use_stdin_1 = __importDefault$1(useStdin_1);
/**
 * Component that uses `useFocus` hook becomes "focusable" to Ink,
 * so when user presses <kbd>Tab</kbd>, Ink will switch focus to this component.
 * If there are multiple components that execute `useFocus` hook, focus will be
 * given to them in the order that these components are rendered in.
 * This hook returns an object with `isFocused` boolean property, which
 * determines if this component is focused or not.
 */


const useFocus = ({
  isActive = true,
  autoFocus = false
} = {}) => {
  const {
    isRawModeSupported,
    setRawMode
  } = use_stdin_1.default();
  const {
    activeId,
    add,
    remove,
    activate,
    deactivate
  } = react.useContext(FocusContext_1$1.default);
  const id = react.useMemo(() => Math.random().toString().slice(2, 7), []);
  react.useEffect(() => {
    add(id, {
      autoFocus
    });
    return () => {
      remove(id);
    };
  }, [id, autoFocus]);
  react.useEffect(() => {
    if (isActive) {
      activate(id);
    } else {
      deactivate(id);
    }
  }, [isActive, id]);
  react.useEffect(() => {
    if (!isRawModeSupported || !isActive) {
      return;
    }

    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, [isActive]);
  return {
    isFocused: Boolean(id) && activeId === id
  };
};

var _default$4 = useFocus;

var useFocus_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$4
}, '__esModule', {value: true});

var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const FocusContext_1 = __importDefault(FocusContext_1$3);
/**
 * This hook exposes methods to enable or disable focus management for all
 * components or manually switch focus to next or previous components.
 */


const useFocusManager = () => {
  const focusContext = react.useContext(FocusContext_1.default);
  return {
    enableFocus: focusContext.enableFocus,
    disableFocus: focusContext.disableFocus,
    focusNext: focusContext.focusNext,
    focusPrevious: focusContext.focusPrevious
  };
};

var _default$3 = useFocusManager;

var useFocusManager_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$3
}, '__esModule', {value: true});

/**
 * Measure the dimensions of a particular `<Box>` element.
 */

var _default$2 = node => {
  var _a, _b, _c, _d;

  return {
    width: (_b = (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.getComputedWidth()) !== null && _b !== void 0 ? _b : 0,
    height: (_d = (_c = node.yogaNode) === null || _c === void 0 ? void 0 : _c.getComputedHeight()) !== null && _d !== void 0 ? _d : 0
  };
};

var measureElement = /*#__PURE__*/Object.defineProperty({
	default: _default$2
}, '__esModule', {value: true});

var build = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return render_1.default;
  }
});



Object.defineProperty(exports, "Box", {
  enumerable: true,
  get: function () {
    return Box_1$2.default;
  }
});



Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return Text_1$1.default;
  }
});



Object.defineProperty(exports, "Static", {
  enumerable: true,
  get: function () {
    return Static_1.default;
  }
});



Object.defineProperty(exports, "Transform", {
  enumerable: true,
  get: function () {
    return Transform_1.default;
  }
});



Object.defineProperty(exports, "Newline", {
  enumerable: true,
  get: function () {
    return Newline_1.default;
  }
});



Object.defineProperty(exports, "Spacer", {
  enumerable: true,
  get: function () {
    return Spacer_1.default;
  }
});



Object.defineProperty(exports, "useInput", {
  enumerable: true,
  get: function () {
    return useInput_1.default;
  }
});



Object.defineProperty(exports, "useApp", {
  enumerable: true,
  get: function () {
    return useApp_1.default;
  }
});



Object.defineProperty(exports, "useStdin", {
  enumerable: true,
  get: function () {
    return useStdin_1.default;
  }
});



Object.defineProperty(exports, "useStdout", {
  enumerable: true,
  get: function () {
    return useStdout_1.default;
  }
});



Object.defineProperty(exports, "useStderr", {
  enumerable: true,
  get: function () {
    return useStderr_1.default;
  }
});



Object.defineProperty(exports, "useFocus", {
  enumerable: true,
  get: function () {
    return useFocus_1.default;
  }
});



Object.defineProperty(exports, "useFocusManager", {
  enumerable: true,
  get: function () {
    return useFocusManager_1.default;
  }
});



Object.defineProperty(exports, "measureElement", {
  enumerable: true,
  get: function () {
    return measureElement.default;
  }
});
});

// These weird castings we are doing in this file is because the way gatsby-cli works is that it starts with it's own store
// but then quickly swaps it out with the store from the installed gatsby. This would benefit from a refactor later on
// to not use it's own store temporarily.
// By the time this is actually running, it will become an `IGatsbyState`
const StoreStateContext = /*#__PURE__*/react.createContext(redux.getStore().getState());
const StoreStateProvider = ({
  children
}) => {
  const [state, setState] = react.useState(redux.getStore().getState());
  react.useLayoutEffect(() => redux.onLogAction(() => {
    setState(redux.getStore().getState());
  }), []);
  return /*#__PURE__*/react.createElement(StoreStateContext.Provider, {
    value: state
  }, children);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// which causes unwanted lines in the output. An additional check for isCI helps.
// @see https://github.com/prettier/prettier/blob/36aeb4ce4f620023c8174e826d7208c0c64f1a0b/src/utils/is-tty.js

const isTTY = () => process.stdout.isTTY && !gatsbyCoreUtils.isCI();

var dots = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
};
var dots2 = {
  interval: 80,
  frames: ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"]
};
var dots3 = {
  interval: 80,
  frames: ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"]
};
var dots4 = {
  interval: 80,
  frames: ["⠄", "⠆", "⠇", "⠋", "⠙", "⠸", "⠰", "⠠", "⠰", "⠸", "⠙", "⠋", "⠇", "⠆"]
};
var dots5 = {
  interval: 80,
  frames: ["⠋", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋"]
};
var dots6 = {
  interval: 80,
  frames: ["⠁", "⠉", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠤", "⠄", "⠄", "⠤", "⠴", "⠲", "⠒", "⠂", "⠂", "⠒", "⠚", "⠙", "⠉", "⠁"]
};
var dots7 = {
  interval: 80,
  frames: ["⠈", "⠉", "⠋", "⠓", "⠒", "⠐", "⠐", "⠒", "⠖", "⠦", "⠤", "⠠", "⠠", "⠤", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋", "⠉", "⠈"]
};
var dots8 = {
  interval: 80,
  frames: ["⠁", "⠁", "⠉", "⠙", "⠚", "⠒", "⠂", "⠂", "⠒", "⠲", "⠴", "⠤", "⠄", "⠄", "⠤", "⠠", "⠠", "⠤", "⠦", "⠖", "⠒", "⠐", "⠐", "⠒", "⠓", "⠋", "⠉", "⠈", "⠈"]
};
var dots9 = {
  interval: 80,
  frames: ["⢹", "⢺", "⢼", "⣸", "⣇", "⡧", "⡗", "⡏"]
};
var dots10 = {
  interval: 80,
  frames: ["⢄", "⢂", "⢁", "⡁", "⡈", "⡐", "⡠"]
};
var dots11 = {
  interval: 100,
  frames: ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"]
};
var dots12 = {
  interval: 80,
  frames: ["⢀⠀", "⡀⠀", "⠄⠀", "⢂⠀", "⡂⠀", "⠅⠀", "⢃⠀", "⡃⠀", "⠍⠀", "⢋⠀", "⡋⠀", "⠍⠁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⢈⠩", "⡀⢙", "⠄⡙", "⢂⠩", "⡂⢘", "⠅⡘", "⢃⠨", "⡃⢐", "⠍⡐", "⢋⠠", "⡋⢀", "⠍⡁", "⢋⠁", "⡋⠁", "⠍⠉", "⠋⠉", "⠋⠉", "⠉⠙", "⠉⠙", "⠉⠩", "⠈⢙", "⠈⡙", "⠈⠩", "⠀⢙", "⠀⡙", "⠀⠩", "⠀⢘", "⠀⡘", "⠀⠨", "⠀⢐", "⠀⡐", "⠀⠠", "⠀⢀", "⠀⡀"]
};
var dots8Bit = {
  interval: 80,
  frames: ["⠀", "⠁", "⠂", "⠃", "⠄", "⠅", "⠆", "⠇", "⡀", "⡁", "⡂", "⡃", "⡄", "⡅", "⡆", "⡇", "⠈", "⠉", "⠊", "⠋", "⠌", "⠍", "⠎", "⠏", "⡈", "⡉", "⡊", "⡋", "⡌", "⡍", "⡎", "⡏", "⠐", "⠑", "⠒", "⠓", "⠔", "⠕", "⠖", "⠗", "⡐", "⡑", "⡒", "⡓", "⡔", "⡕", "⡖", "⡗", "⠘", "⠙", "⠚", "⠛", "⠜", "⠝", "⠞", "⠟", "⡘", "⡙", "⡚", "⡛", "⡜", "⡝", "⡞", "⡟", "⠠", "⠡", "⠢", "⠣", "⠤", "⠥", "⠦", "⠧", "⡠", "⡡", "⡢", "⡣", "⡤", "⡥", "⡦", "⡧", "⠨", "⠩", "⠪", "⠫", "⠬", "⠭", "⠮", "⠯", "⡨", "⡩", "⡪", "⡫", "⡬", "⡭", "⡮", "⡯", "⠰", "⠱", "⠲", "⠳", "⠴", "⠵", "⠶", "⠷", "⡰", "⡱", "⡲", "⡳", "⡴", "⡵", "⡶", "⡷", "⠸", "⠹", "⠺", "⠻", "⠼", "⠽", "⠾", "⠿", "⡸", "⡹", "⡺", "⡻", "⡼", "⡽", "⡾", "⡿", "⢀", "⢁", "⢂", "⢃", "⢄", "⢅", "⢆", "⢇", "⣀", "⣁", "⣂", "⣃", "⣄", "⣅", "⣆", "⣇", "⢈", "⢉", "⢊", "⢋", "⢌", "⢍", "⢎", "⢏", "⣈", "⣉", "⣊", "⣋", "⣌", "⣍", "⣎", "⣏", "⢐", "⢑", "⢒", "⢓", "⢔", "⢕", "⢖", "⢗", "⣐", "⣑", "⣒", "⣓", "⣔", "⣕", "⣖", "⣗", "⢘", "⢙", "⢚", "⢛", "⢜", "⢝", "⢞", "⢟", "⣘", "⣙", "⣚", "⣛", "⣜", "⣝", "⣞", "⣟", "⢠", "⢡", "⢢", "⢣", "⢤", "⢥", "⢦", "⢧", "⣠", "⣡", "⣢", "⣣", "⣤", "⣥", "⣦", "⣧", "⢨", "⢩", "⢪", "⢫", "⢬", "⢭", "⢮", "⢯", "⣨", "⣩", "⣪", "⣫", "⣬", "⣭", "⣮", "⣯", "⢰", "⢱", "⢲", "⢳", "⢴", "⢵", "⢶", "⢷", "⣰", "⣱", "⣲", "⣳", "⣴", "⣵", "⣶", "⣷", "⢸", "⢹", "⢺", "⢻", "⢼", "⢽", "⢾", "⢿", "⣸", "⣹", "⣺", "⣻", "⣼", "⣽", "⣾", "⣿"]
};
var line = {
  interval: 130,
  frames: ["-", "\\", "|", "/"]
};
var line2 = {
  interval: 100,
  frames: ["⠂", "-", "–", "—", "–", "-"]
};
var pipe = {
  interval: 100,
  frames: ["┤", "┘", "┴", "└", "├", "┌", "┬", "┐"]
};
var simpleDots = {
  interval: 400,
  frames: [".  ", ".. ", "...", "   "]
};
var simpleDotsScrolling = {
  interval: 200,
  frames: [".  ", ".. ", "...", " ..", "  .", "   "]
};
var star = {
  interval: 70,
  frames: ["✶", "✸", "✹", "✺", "✹", "✷"]
};
var star2 = {
  interval: 80,
  frames: ["+", "x", "*"]
};
var flip = {
  interval: 70,
  frames: ["_", "_", "_", "-", "`", "`", "'", "´", "-", "_", "_", "_"]
};
var hamburger = {
  interval: 100,
  frames: ["☱", "☲", "☴"]
};
var growVertical = {
  interval: 120,
  frames: ["▁", "▃", "▄", "▅", "▆", "▇", "▆", "▅", "▄", "▃"]
};
var growHorizontal = {
  interval: 120,
  frames: ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "▊", "▋", "▌", "▍", "▎"]
};
var balloon = {
  interval: 140,
  frames: [" ", ".", "o", "O", "@", "*", " "]
};
var balloon2 = {
  interval: 120,
  frames: [".", "o", "O", "°", "O", "o", "."]
};
var noise = {
  interval: 100,
  frames: ["▓", "▒", "░"]
};
var bounce = {
  interval: 120,
  frames: ["⠁", "⠂", "⠄", "⠂"]
};
var boxBounce = {
  interval: 120,
  frames: ["▖", "▘", "▝", "▗"]
};
var boxBounce2 = {
  interval: 100,
  frames: ["▌", "▀", "▐", "▄"]
};
var triangle = {
  interval: 50,
  frames: ["◢", "◣", "◤", "◥"]
};
var arc = {
  interval: 100,
  frames: ["◜", "◠", "◝", "◞", "◡", "◟"]
};
var circle = {
  interval: 120,
  frames: ["◡", "⊙", "◠"]
};
var squareCorners = {
  interval: 180,
  frames: ["◰", "◳", "◲", "◱"]
};
var circleQuarters = {
  interval: 120,
  frames: ["◴", "◷", "◶", "◵"]
};
var circleHalves = {
  interval: 50,
  frames: ["◐", "◓", "◑", "◒"]
};
var squish = {
  interval: 100,
  frames: ["╫", "╪"]
};
var toggle = {
  interval: 250,
  frames: ["⊶", "⊷"]
};
var toggle2 = {
  interval: 80,
  frames: ["▫", "▪"]
};
var toggle3 = {
  interval: 120,
  frames: ["□", "■"]
};
var toggle4 = {
  interval: 100,
  frames: ["■", "□", "▪", "▫"]
};
var toggle5 = {
  interval: 100,
  frames: ["▮", "▯"]
};
var toggle6 = {
  interval: 300,
  frames: ["ဝ", "၀"]
};
var toggle7 = {
  interval: 80,
  frames: ["⦾", "⦿"]
};
var toggle8 = {
  interval: 100,
  frames: ["◍", "◌"]
};
var toggle9 = {
  interval: 100,
  frames: ["◉", "◎"]
};
var toggle10 = {
  interval: 100,
  frames: ["㊂", "㊀", "㊁"]
};
var toggle11 = {
  interval: 50,
  frames: ["⧇", "⧆"]
};
var toggle12 = {
  interval: 120,
  frames: ["☗", "☖"]
};
var toggle13 = {
  interval: 80,
  frames: ["=", "*", "-"]
};
var arrow = {
  interval: 100,
  frames: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"]
};
var arrow2 = {
  interval: 80,
  frames: ["⬆️ ", "↗️ ", "➡️ ", "↘️ ", "⬇️ ", "↙️ ", "⬅️ ", "↖️ "]
};
var arrow3 = {
  interval: 120,
  frames: ["▹▹▹▹▹", "▸▹▹▹▹", "▹▸▹▹▹", "▹▹▸▹▹", "▹▹▹▸▹", "▹▹▹▹▸"]
};
var bouncingBar = {
  interval: 80,
  frames: ["[    ]", "[=   ]", "[==  ]", "[=== ]", "[ ===]", "[  ==]", "[   =]", "[    ]", "[   =]", "[  ==]", "[ ===]", "[====]", "[=== ]", "[==  ]", "[=   ]"]
};
var bouncingBall = {
  interval: 80,
  frames: ["( ●    )", "(  ●   )", "(   ●  )", "(    ● )", "(     ●)", "(    ● )", "(   ●  )", "(  ●   )", "( ●    )", "(●     )"]
};
var smiley = {
  interval: 200,
  frames: ["😄 ", "😝 "]
};
var monkey = {
  interval: 300,
  frames: ["🙈 ", "🙈 ", "🙉 ", "🙊 "]
};
var hearts = {
  interval: 100,
  frames: ["💛 ", "💙 ", "💜 ", "💚 ", "❤️ "]
};
var clock = {
  interval: 100,
  frames: ["🕛 ", "🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "]
};
var earth = {
  interval: 180,
  frames: ["🌍 ", "🌎 ", "🌏 "]
};
var material = {
  interval: 17,
  frames: ["█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "███████▁▁▁▁▁▁▁▁▁▁▁▁▁", "████████▁▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "██████████▁▁▁▁▁▁▁▁▁▁", "███████████▁▁▁▁▁▁▁▁▁", "█████████████▁▁▁▁▁▁▁", "██████████████▁▁▁▁▁▁", "██████████████▁▁▁▁▁▁", "▁██████████████▁▁▁▁▁", "▁██████████████▁▁▁▁▁", "▁██████████████▁▁▁▁▁", "▁▁██████████████▁▁▁▁", "▁▁▁██████████████▁▁▁", "▁▁▁▁█████████████▁▁▁", "▁▁▁▁██████████████▁▁", "▁▁▁▁██████████████▁▁", "▁▁▁▁▁██████████████▁", "▁▁▁▁▁██████████████▁", "▁▁▁▁▁██████████████▁", "▁▁▁▁▁▁██████████████", "▁▁▁▁▁▁██████████████", "▁▁▁▁▁▁▁█████████████", "▁▁▁▁▁▁▁█████████████", "▁▁▁▁▁▁▁▁████████████", "▁▁▁▁▁▁▁▁████████████", "▁▁▁▁▁▁▁▁▁███████████", "▁▁▁▁▁▁▁▁▁███████████", "▁▁▁▁▁▁▁▁▁▁██████████", "▁▁▁▁▁▁▁▁▁▁██████████", "▁▁▁▁▁▁▁▁▁▁▁▁████████", "▁▁▁▁▁▁▁▁▁▁▁▁▁███████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████", "█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████", "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███", "██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███", "███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███", "████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██", "█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█", "█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█", "██████▁▁▁▁▁▁▁▁▁▁▁▁▁█", "████████▁▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "█████████▁▁▁▁▁▁▁▁▁▁▁", "███████████▁▁▁▁▁▁▁▁▁", "████████████▁▁▁▁▁▁▁▁", "████████████▁▁▁▁▁▁▁▁", "██████████████▁▁▁▁▁▁", "██████████████▁▁▁▁▁▁", "▁██████████████▁▁▁▁▁", "▁██████████████▁▁▁▁▁", "▁▁▁█████████████▁▁▁▁", "▁▁▁▁▁████████████▁▁▁", "▁▁▁▁▁████████████▁▁▁", "▁▁▁▁▁▁███████████▁▁▁", "▁▁▁▁▁▁▁▁█████████▁▁▁", "▁▁▁▁▁▁▁▁█████████▁▁▁", "▁▁▁▁▁▁▁▁▁█████████▁▁", "▁▁▁▁▁▁▁▁▁█████████▁▁", "▁▁▁▁▁▁▁▁▁▁█████████▁", "▁▁▁▁▁▁▁▁▁▁▁████████▁", "▁▁▁▁▁▁▁▁▁▁▁████████▁", "▁▁▁▁▁▁▁▁▁▁▁▁███████▁", "▁▁▁▁▁▁▁▁▁▁▁▁███████▁", "▁▁▁▁▁▁▁▁▁▁▁▁▁███████", "▁▁▁▁▁▁▁▁▁▁▁▁▁███████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁", "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"]
};
var moon = {
  interval: 80,
  frames: ["🌑 ", "🌒 ", "🌓 ", "🌔 ", "🌕 ", "🌖 ", "🌗 ", "🌘 "]
};
var runner = {
  interval: 140,
  frames: ["🚶 ", "🏃 "]
};
var pong = {
  interval: 80,
  frames: ["▐⠂       ▌", "▐⠈       ▌", "▐ ⠂      ▌", "▐ ⠠      ▌", "▐  ⡀     ▌", "▐  ⠠     ▌", "▐   ⠂    ▌", "▐   ⠈    ▌", "▐    ⠂   ▌", "▐    ⠠   ▌", "▐     ⡀  ▌", "▐     ⠠  ▌", "▐      ⠂ ▌", "▐      ⠈ ▌", "▐       ⠂▌", "▐       ⠠▌", "▐       ⡀▌", "▐      ⠠ ▌", "▐      ⠂ ▌", "▐     ⠈  ▌", "▐     ⠂  ▌", "▐    ⠠   ▌", "▐    ⡀   ▌", "▐   ⠠    ▌", "▐   ⠂    ▌", "▐  ⠈     ▌", "▐  ⠂     ▌", "▐ ⠠      ▌", "▐ ⡀      ▌", "▐⠠       ▌"]
};
var shark = {
  interval: 120,
  frames: ["▐|\\____________▌", "▐_|\\___________▌", "▐__|\\__________▌", "▐___|\\_________▌", "▐____|\\________▌", "▐_____|\\_______▌", "▐______|\\______▌", "▐_______|\\_____▌", "▐________|\\____▌", "▐_________|\\___▌", "▐__________|\\__▌", "▐___________|\\_▌", "▐____________|\\▌", "▐____________/|▌", "▐___________/|_▌", "▐__________/|__▌", "▐_________/|___▌", "▐________/|____▌", "▐_______/|_____▌", "▐______/|______▌", "▐_____/|_______▌", "▐____/|________▌", "▐___/|_________▌", "▐__/|__________▌", "▐_/|___________▌", "▐/|____________▌"]
};
var dqpb = {
  interval: 100,
  frames: ["d", "q", "p", "b"]
};
var weather = {
  interval: 100,
  frames: ["☀️ ", "☀️ ", "☀️ ", "🌤 ", "⛅️ ", "🌥 ", "☁️ ", "🌧 ", "🌨 ", "🌧 ", "🌨 ", "🌧 ", "🌨 ", "⛈ ", "🌨 ", "🌧 ", "🌨 ", "☁️ ", "🌥 ", "⛅️ ", "🌤 ", "☀️ ", "☀️ "]
};
var christmas = {
  interval: 400,
  frames: ["🌲", "🎄"]
};
var grenade = {
  interval: 80,
  frames: ["،  ", "′  ", " ´ ", " ‾ ", "  ⸌", "  ⸊", "  |", "  ⁎", "  ⁕", " ෴ ", "  ⁓", "   ", "   ", "   "]
};
var point = {
  interval: 125,
  frames: ["∙∙∙", "●∙∙", "∙●∙", "∙∙●", "∙∙∙"]
};
var layer = {
  interval: 150,
  frames: ["-", "=", "≡"]
};
var betaWave = {
  interval: 80,
  frames: ["ρββββββ", "βρβββββ", "ββρββββ", "βββρβββ", "ββββρββ", "βββββρβ", "ββββββρ"]
};
var fingerDance = {
  interval: 160,
  frames: ["🤘 ", "🤟 ", "🖖 ", "✋ ", "🤚 ", "👆 "]
};
var fistBump = {
  interval: 80,
  frames: ["🤜　　　　🤛 ", "🤜　　　　🤛 ", "🤜　　　　🤛 ", "　🤜　　🤛　 ", "　　🤜🤛　　 ", "　🤜✨🤛　　 ", "🤜　✨　🤛　 "]
};
var soccerHeader = {
  interval: 80,
  frames: [" 🧑⚽️       🧑 ", "🧑  ⚽️      🧑 ", "🧑   ⚽️     🧑 ", "🧑    ⚽️    🧑 ", "🧑     ⚽️   🧑 ", "🧑      ⚽️  🧑 ", "🧑       ⚽️🧑  ", "🧑      ⚽️  🧑 ", "🧑     ⚽️   🧑 ", "🧑    ⚽️    🧑 ", "🧑   ⚽️     🧑 ", "🧑  ⚽️      🧑 "]
};
var mindblown = {
  interval: 160,
  frames: ["😐 ", "😐 ", "😮 ", "😮 ", "😦 ", "😦 ", "😧 ", "😧 ", "🤯 ", "💥 ", "✨ ", "　 ", "　 ", "　 "]
};
var speaker = {
  interval: 160,
  frames: ["🔈 ", "🔉 ", "🔊 ", "🔉 "]
};
var orangePulse = {
  interval: 100,
  frames: ["🔸 ", "🔶 ", "🟠 ", "🟠 ", "🔶 "]
};
var bluePulse = {
  interval: 100,
  frames: ["🔹 ", "🔷 ", "🔵 ", "🔵 ", "🔷 "]
};
var orangeBluePulse = {
  interval: 100,
  frames: ["🔸 ", "🔶 ", "🟠 ", "🟠 ", "🔶 ", "🔹 ", "🔷 ", "🔵 ", "🔵 ", "🔷 "]
};
var timeTravel = {
  interval: 100,
  frames: ["🕛 ", "🕚 ", "🕙 ", "🕘 ", "🕗 ", "🕖 ", "🕕 ", "🕔 ", "🕓 ", "🕒 ", "🕑 ", "🕐 "]
};
var aesthetic = {
  interval: 80,
  frames: ["▰▱▱▱▱▱▱", "▰▰▱▱▱▱▱", "▰▰▰▱▱▱▱", "▰▰▰▰▱▱▱", "▰▰▰▰▰▱▱", "▰▰▰▰▰▰▱", "▰▰▰▰▰▰▰", "▰▱▱▱▱▱▱"]
};
var require$$0 = {
  dots: dots,
  dots2: dots2,
  dots3: dots3,
  dots4: dots4,
  dots5: dots5,
  dots6: dots6,
  dots7: dots7,
  dots8: dots8,
  dots9: dots9,
  dots10: dots10,
  dots11: dots11,
  dots12: dots12,
  dots8Bit: dots8Bit,
  line: line,
  line2: line2,
  pipe: pipe,
  simpleDots: simpleDots,
  simpleDotsScrolling: simpleDotsScrolling,
  star: star,
  star2: star2,
  flip: flip,
  hamburger: hamburger,
  growVertical: growVertical,
  growHorizontal: growHorizontal,
  balloon: balloon,
  balloon2: balloon2,
  noise: noise,
  bounce: bounce,
  boxBounce: boxBounce,
  boxBounce2: boxBounce2,
  triangle: triangle,
  arc: arc,
  circle: circle,
  squareCorners: squareCorners,
  circleQuarters: circleQuarters,
  circleHalves: circleHalves,
  squish: squish,
  toggle: toggle,
  toggle2: toggle2,
  toggle3: toggle3,
  toggle4: toggle4,
  toggle5: toggle5,
  toggle6: toggle6,
  toggle7: toggle7,
  toggle8: toggle8,
  toggle9: toggle9,
  toggle10: toggle10,
  toggle11: toggle11,
  toggle12: toggle12,
  toggle13: toggle13,
  arrow: arrow,
  arrow2: arrow2,
  arrow3: arrow3,
  bouncingBar: bouncingBar,
  bouncingBall: bouncingBall,
  smiley: smiley,
  monkey: monkey,
  hearts: hearts,
  clock: clock,
  earth: earth,
  material: material,
  moon: moon,
  runner: runner,
  pong: pong,
  shark: shark,
  dqpb: dqpb,
  weather: weather,
  christmas: christmas,
  grenade: grenade,
  point: point,
  layer: layer,
  betaWave: betaWave,
  fingerDance: fingerDance,
  fistBump: fistBump,
  soccerHeader: soccerHeader,
  mindblown: mindblown,
  speaker: speaker,
  orangePulse: orangePulse,
  bluePulse: bluePulse,
  orangeBluePulse: orangeBluePulse,
  timeTravel: timeTravel,
  aesthetic: aesthetic
};

const spinners = Object.assign({}, require$$0);
const spinnersList = Object.keys(spinners);
Object.defineProperty(spinners, 'random', {
  get() {
    const randomIndex = Math.floor(Math.random() * spinnersList.length);
    const spinnerName = spinnersList[randomIndex];
    return spinners[spinnerName];
  }

});
var cliSpinners = spinners; // TODO: Remove this for the next major release

var _default$1 = spinners;
cliSpinners.default = _default$1;

const react_1 = react;




/**
 * Spinner.
 */


const Spinner$1 = ({
  type = 'dots'
}) => {
  const [frame, setFrame] = react_1.useState(0);
  const spinner = cliSpinners.default[type];
  react_1.useEffect(() => {
    const timer = setInterval(() => {
      setFrame(previousFrame => {
        const isLastFrame = previousFrame === spinner.frames.length - 1;
        return isLastFrame ? 0 : previousFrame + 1;
      });
    }, spinner.interval);
    return () => {
      clearInterval(timer);
    };
  }, [spinner]);
  return react.createElement(build.Text, null, spinner.frames[frame]);
};

var _default = Spinner$1;

function Spinner({
  text,
  statusText
}) {
  let label = text;

  if (statusText) {
    label += ` — ${statusText}`;
  }

  return /*#__PURE__*/react.createElement(build.Box, null, /*#__PURE__*/react.createElement(build.Text, null, /*#__PURE__*/react.createElement(_default, {
    type: "dots"
  }), " ", label));
}

function calcElapsedTime(startTime) {
  const elapsed = process.hrtime(startTime);
  return convertHrtime__default['default'](elapsed)[`seconds`].toFixed(3);
}

const maxWidth = 30;
const minWidth = 10;

const getLength = prop => String(prop).length;

function ProgressBar({
  message,
  current,
  total,
  startTime
}) {
  const percentage = total ? Math.round(current / total * 100) : 0;
  const terminalWidth = process.stdout.columns || 80;
  const availableWidth = terminalWidth - getLength(message) - getLength(current) - getLength(total) - getLength(percentage) - 11; // margins + extra characters

  const progressBarWidth = Math.max(minWidth, Math.min(maxWidth, availableWidth));
  return /*#__PURE__*/react.createElement(build.Box, {
    flexDirection: "row"
  }, /*#__PURE__*/react.createElement(build.Box, {
    marginRight: 3,
    width: progressBarWidth
  }, /*#__PURE__*/react.createElement(build.Text, null, "["), /*#__PURE__*/react.createElement(build.Box, {
    width: progressBarWidth - 2
  }, /*#__PURE__*/react.createElement(build.Text, null, `=`.repeat((progressBarWidth - 2) * percentage / 100))), /*#__PURE__*/react.createElement(build.Text, null, "]")), /*#__PURE__*/react.createElement(build.Box, {
    marginRight: 1
  }, /*#__PURE__*/react.createElement(build.Text, null, calcElapsedTime(startTime), " s")), /*#__PURE__*/react.createElement(build.Box, {
    marginRight: 1
  }, /*#__PURE__*/react.createElement(build.Text, null, current, "/", total)), /*#__PURE__*/react.createElement(build.Box, {
    marginRight: 1
  }, /*#__PURE__*/react.createElement(build.Text, null, `` + percentage, "%")), /*#__PURE__*/react.createElement(build.Box, null, /*#__PURE__*/react.createElement(build.Text, {
    wrap: "truncate"
  }, message)));
}

const createLabel = (text, color) => (...props) => /*#__PURE__*/react.createElement(build.Text, _extends({
  color: color
}, props), text);

let Actions;

(function (Actions) {
  Actions["LogAction"] = "LOG_ACTION";
  Actions["SetStatus"] = "SET_STATUS";
  Actions["Log"] = "LOG";
  Actions["SetLogs"] = "SET_LOGS";
  Actions["StartActivity"] = "ACTIVITY_START";
  Actions["EndActivity"] = "ACTIVITY_END";
  Actions["UpdateActivity"] = "ACTIVITY_UPDATE";
  Actions["PendingActivity"] = "ACTIVITY_PENDING";
  Actions["CancelActivity"] = "ACTIVITY_CANCEL";
  Actions["ActivityErrored"] = "ACTIVITY_ERRORED";
})(Actions || (Actions = {}));

let LogLevels;

(function (LogLevels) {
  LogLevels["Debug"] = "DEBUG";
  LogLevels["Success"] = "SUCCESS";
  LogLevels["Info"] = "INFO";
  LogLevels["Warning"] = "WARNING";
  LogLevels["Log"] = "LOG";
  LogLevels["Error"] = "ERROR";
})(LogLevels || (LogLevels = {}));

let ActivityLogLevels;

(function (ActivityLogLevels) {
  ActivityLogLevels["Success"] = "ACTIVITY_SUCCESS";
  ActivityLogLevels["Failed"] = "ACTIVITY_FAILED";
  ActivityLogLevels["Interrupted"] = "ACTIVITY_INTERRUPTED";
})(ActivityLogLevels || (ActivityLogLevels = {}));

let ActivityStatuses;

(function (ActivityStatuses) {
  ActivityStatuses["InProgress"] = "IN_PROGRESS";
  ActivityStatuses["NotStarted"] = "NOT_STARTED";
  ActivityStatuses["Interrupted"] = "INTERRUPTED";
  ActivityStatuses["Failed"] = "FAILED";
  ActivityStatuses["Success"] = "SUCCESS";
  ActivityStatuses["Cancelled"] = "CANCELLED";
})(ActivityStatuses || (ActivityStatuses = {}));

let ActivityTypes;

(function (ActivityTypes) {
  ActivityTypes["Spinner"] = "spinner";
  ActivityTypes["Hidden"] = "hidden";
  ActivityTypes["Progress"] = "progress";
  ActivityTypes["Pending"] = "pending";
})(ActivityTypes || (ActivityTypes = {}));

const getLabel$1 = level => {
  switch (level) {
    case ActivityLogLevels.Success:
    case LogLevels.Success:
      return createLabel(`success`, `green`);

    case LogLevels.Warning:
      return createLabel(`warn`, `yellow`);

    case LogLevels.Debug:
      return createLabel(`verbose`, `gray`);

    case LogLevels.Info:
      return createLabel(`info`, `blue`);

    case ActivityLogLevels.Failed:
      return createLabel(`failed`, `red`);

    case ActivityLogLevels.Interrupted:
      return createLabel(`not finished`, `gray`);

    default:
      return createLabel(level, `blue`);
  }
};

const Message = /*#__PURE__*/react.memo(({
  level,
  text,
  duration,
  statusText
}) => {
  let message = text;

  if (duration) {
    message += ` - ${duration.toFixed(3)}s`;
  }

  if (statusText) {
    message += ` - ${statusText}`;
  }

  if (!level || level === `LOG`) {
    return /*#__PURE__*/react.createElement(build.Text, null, message);
  }

  const TextLabel = getLabel$1(level);
  return /*#__PURE__*/react.createElement(build.Box, {
    flexDirection: "row"
  }, /*#__PURE__*/react.createElement(build.Text, {
    wrap: "wrap"
  }, /*#__PURE__*/react.createElement(TextLabel, null), ` `, message));
});

const File = ({
  filePath,
  location
}) => {
  const lineNumber = location === null || location === void 0 ? void 0 : location.start.line;
  let locString = ``;

  if (typeof lineNumber !== `undefined`) {
    locString += `:${lineNumber}`;
    const columnNumber = location === null || location === void 0 ? void 0 : location.start.column;

    if (typeof columnNumber !== `undefined`) {
      locString += `:${columnNumber}`;
    }
  }

  return /*#__PURE__*/react.createElement(build.Text, {
    color: "blue"
  }, path__default['default'].relative(process.cwd(), filePath), locString);
};

const DocsLink = ({
  docsUrl
}) => {
  // TODO: when there's no specific docsUrl, add helpful message describing how
  // to submit an issue
  if (docsUrl === `https://gatsby.dev/issue-how-to`) return null;
  return /*#__PURE__*/react.createElement(build.Box, {
    marginTop: 1
  }, /*#__PURE__*/react.createElement(build.Text, null, "See our docs page for more info on this error: ", docsUrl));
};

const Error$1 = /*#__PURE__*/react.memo(({
  details
}) =>
/*#__PURE__*/
// const stackLength = get(details, `stack.length`, 0
react.createElement(build.Box, {
  marginY: 1,
  flexDirection: "column"
}, /*#__PURE__*/react.createElement(build.Box, {
  flexDirection: "column"
}, /*#__PURE__*/react.createElement(build.Box, {
  flexDirection: "column"
}, /*#__PURE__*/react.createElement(build.Box, null, /*#__PURE__*/react.createElement(build.Box, {
  marginRight: 1
}, /*#__PURE__*/react.createElement(build.Text, {
  color: "black",
  backgroundColor: "red"
}, ` ${details.level} `, details.code ? `#${details.code} ` : ``), /*#__PURE__*/react.createElement(build.Text, {
  color: "red"
}, details.type ? ` ` + details.type : ``))), /*#__PURE__*/react.createElement(build.Box, {
  marginTop: 1
}, /*#__PURE__*/react.createElement(build.Text, null, details.text)), details.filePath && /*#__PURE__*/react.createElement(build.Box, {
  marginTop: 1
}, /*#__PURE__*/react.createElement(build.Text, null, "File:", ` `), /*#__PURE__*/react.createElement(File, {
  filePath: details.filePath,
  location: details.location
}))), /*#__PURE__*/react.createElement(DocsLink, {
  docsUrl: details.docsUrl
}))));

const getLabel = level => {
  switch (level) {
    case ActivityStatuses.InProgress:
      return createLabel(`In Progress`, `white`);

    case ActivityStatuses.Interrupted:
      return createLabel(`Interrupted`, `gray`);

    case ActivityStatuses.Failed:
      return createLabel(`Failed`, `red`);

    case ActivityStatuses.Success:
      return createLabel(`Success`, `green`);

    default:
      return createLabel(level, `white`);
  }
}; // Track the width and height of the terminal. Responsive app design baby!


const useTerminalResize = () => {
  const {
    stdout
  } = build.useStdout(); // stdout type is nullable, so we need to handle case where it is undefined for type checking.
  // In practice this shouldn't happen ever, because AFAIK type is only nullable
  // because Ink's StdoutContext is initiated with `undefined`:
  // https://github.com/vadimdemedes/ink/blob/83894963727cf40ccac2256ec346e5ff3381c918/src/components/StdoutContext.ts#L20-L23
  // but ContextProvider requires stdout to be set:
  // https://github.com/vadimdemedes/ink/blob/83894963727cf40ccac2256ec346e5ff3381c918/src/components/App.tsx#L18
  // https://github.com/vadimdemedes/ink/blob/83894963727cf40ccac2256ec346e5ff3381c918/src/components/App.tsx#L79-L84

  if (!stdout) {
    return [0];
  }

  const [sizes, setSizes] = react.useState([stdout.columns, stdout.rows]);
  react.useEffect(() => {
    const resizeListener = () => {
      setSizes([stdout.columns, stdout.rows]);
    };

    stdout.on(`resize`, resizeListener);
    return () => {
      stdout.off(`resize`, resizeListener);
    };
  }, [stdout]);
  return sizes;
};

const Develop = ({
  pagesCount,
  appName,
  status
}) => {
  const [width] = useTerminalResize();
  const StatusLabel = getLabel(status);
  return /*#__PURE__*/react.createElement(build.Box, {
    flexDirection: "column",
    marginTop: 2
  }, /*#__PURE__*/react.createElement(build.Box, null, /*#__PURE__*/react.createElement(build.Text, {
    wrap: "truncate"
  }, `—`.repeat(width))), /*#__PURE__*/react.createElement(build.Box, {
    height: 1,
    flexDirection: "row"
  }, /*#__PURE__*/react.createElement(StatusLabel, null), /*#__PURE__*/react.createElement(build.Box, {
    flexGrow: 1
  }), /*#__PURE__*/react.createElement(build.Text, null, appName), /*#__PURE__*/react.createElement(build.Box, {
    flexGrow: 1
  }), /*#__PURE__*/react.createElement(build.Text, null, pagesCount, " pages")));
};

const ConnectedDevelop = () => {
  var _state$pages, _state$program, _state$logs;

  const state = react.useContext(StoreStateContext);
  return /*#__PURE__*/react.createElement(Develop, {
    pagesCount: ((_state$pages = state.pages) === null || _state$pages === void 0 ? void 0 : _state$pages.size) || 0,
    appName: ((_state$program = state.program) === null || _state$program === void 0 ? void 0 : _state$program.sitePackageJson.name) || ``,
    status: ((_state$logs = state.logs) === null || _state$logs === void 0 ? void 0 : _state$logs.status) || ``
  });
};

const showProgress = isTTY();

class CLI extends react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      hasError: false
    });

    _defineProperty(this, "memoizedReactElementsForMessages", []);
  }

  componentDidCatch(error, info) {
    gatsbyTelemetry.trackBuildError(`INK`, {
      error: {
        error: {
          stack: info.componentStack
        },
        text: error.message
      }
    });
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  render() {
    const {
      logs: {
        messages,
        activities
      },
      showStatusBar
    } = this.props;
    const {
      hasError,
      error
    } = this.state;

    if (hasError && error) {
      // You can render any custom fallback UI
      return /*#__PURE__*/react.createElement(build.Box, {
        flexDirection: "row"
      }, /*#__PURE__*/react.createElement(Message, {
        level: ActivityLogLevels.Failed,
        text: `We've encountered an error: ${error.message}`
      }));
    }

    const spinners = [];
    const progressBars = [];

    if (showProgress) {
      Object.keys(activities).forEach(activityName => {
        const activity = activities[activityName];

        if (activity.status !== `IN_PROGRESS`) {
          return;
        }

        if (activity.type === `spinner`) {
          spinners.push(activity);
        }

        if (activity.type === `progress` && activity.startTime) {
          progressBars.push(activity);
        }
      });
    }

    return /*#__PURE__*/react.createElement(build.Box, {
      flexDirection: "column"
    }, /*#__PURE__*/react.createElement(build.Box, {
      flexDirection: "column"
    }, /*#__PURE__*/react.createElement(build.Static, {
      items: messages
    }, message => message.level === `ERROR` ? /*#__PURE__*/react.createElement(Error$1, {
      details: message,
      key: messages.indexOf(message)
    }) : /*#__PURE__*/react.createElement(Message, _extends({
      key: messages.indexOf(message)
    }, message))), spinners.map(activity => /*#__PURE__*/react.createElement(Spinner, _extends({
      key: activity.id
    }, activity))), progressBars.map(activity => /*#__PURE__*/react.createElement(ProgressBar, {
      key: activity.id,
      message: activity.text,
      total: activity.total || 0,
      current: activity.current || 0,
      startTime: activity.startTime || [0, 0]
    }))), showStatusBar && /*#__PURE__*/react.createElement(ConnectedDevelop, null));
  }

}

const ConnectedCLI = () => {
  var _state$program, _state$program$_, _state$program2;

  const state = react.useContext(StoreStateContext);
  const showStatusBar = ((_state$program = state.program) === null || _state$program === void 0 ? void 0 : (_state$program$_ = _state$program._) === null || _state$program$_ === void 0 ? void 0 : _state$program$_[0]) === `develop` && ((_state$program2 = state.program) === null || _state$program2 === void 0 ? void 0 : _state$program2.status) === `BOOTSTRAP_FINISHED`;
  return /*#__PURE__*/react.createElement(CLI, {
    showStatusBar: Boolean(showStatusBar),
    logs: state.logs
  });
};

function initializeINKLogger() {
  build.render( /*#__PURE__*/react.createElement(StoreStateProvider, null, /*#__PURE__*/react.createElement(ConnectedCLI, null)));
}

exports.initializeINKLogger = initializeINKLogger;
