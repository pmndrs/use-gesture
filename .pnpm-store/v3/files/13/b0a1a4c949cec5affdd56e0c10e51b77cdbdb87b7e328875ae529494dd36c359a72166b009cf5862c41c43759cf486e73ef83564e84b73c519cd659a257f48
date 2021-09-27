'use strict';

var WebSocket = require('ws');
var graphql_1 = require('graphql');
var fs = require('fs-extra');
var path = require('path');
var mkdirp = require('mkdirp');
var Joi = require('@hapi/joi');
var isUrl = require('is-url');
var fetch = require('node-fetch');
var isBinaryPath = require('is-binary-path');
var gatsbyCoreUtils = require('gatsby-core-utils');
var require$$0 = require('@babel/core');
var t$1 = require('@babel/types');
var require$$0$1 = require('@babel/helper-plugin-utils');
var glob = require('glob');
var prettier = require('prettier');
var template$1 = require('@babel/template');
var execa = require('execa');
var _ = require('lodash');
var resolveFrom = require('resolve-from');
var generate = require('@babel/generator');
var lock$1 = require('lock');
var singleTrailingNewline = require('single-trailing-newline');
var schema$e = require('@graphql-tools/schema');
var utils = require('@graphql-tools/utils');
var contentfulManagement = require('contentful-management');
var diff = require('jest-diff');
var os = require('os');
var tty = require('tty');
var stripAnsi = require('strip-ansi');

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

var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var graphql_1__default = /*#__PURE__*/_interopDefaultLegacy(graphql_1);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var mkdirp__default = /*#__PURE__*/_interopDefaultLegacy(mkdirp);
var Joi__namespace = /*#__PURE__*/_interopNamespace(Joi);
var isUrl__default = /*#__PURE__*/_interopDefaultLegacy(isUrl);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var isBinaryPath__default = /*#__PURE__*/_interopDefaultLegacy(isBinaryPath);
var t__namespace = /*#__PURE__*/_interopNamespace(t$1);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var prettier__default = /*#__PURE__*/_interopDefaultLegacy(prettier);
var template__default = /*#__PURE__*/_interopDefaultLegacy(template$1);
var execa__default = /*#__PURE__*/_interopDefaultLegacy(execa);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var resolveFrom__default = /*#__PURE__*/_interopDefaultLegacy(resolveFrom);
var generate__default = /*#__PURE__*/_interopDefaultLegacy(generate);
var singleTrailingNewline__default = /*#__PURE__*/_interopDefaultLegacy(singleTrailingNewline);
var diff__default = /*#__PURE__*/_interopDefaultLegacy(diff);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
var stripAnsi__default = /*#__PURE__*/_interopDefaultLegacy(stripAnsi);

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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

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

var hasFlag = (flag, argv = process.argv) => {
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf('--');
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

const {
  env
} = process;
let forceColor;

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
  forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
  forceColor = 1;
}

if ('FORCE_COLOR' in env) {
  if (env.FORCE_COLOR === 'true') {
    forceColor = 1;
  } else if (env.FORCE_COLOR === 'false') {
    forceColor = 0;
  } else {
    forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
  }
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}

function supportsColor(haveStream, streamIsTTY) {
  if (forceColor === 0) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (haveStream && !streamIsTTY && forceColor === undefined) {
    return 0;
  }

  const min = forceColor || 0;

  if (env.TERM === 'dumb') {
    return min;
  }

  if (process.platform === 'win32') {
    // Windows 10 build 10586 is the first Windows release that supports 256 colors.
    // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
    const osRelease = os__default['default'].release().split('.');

    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }

  if ('GITHUB_ACTIONS' in env) {
    return 1;
  }

  if (env.COLORTERM === 'truecolor') {
    return 3;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;

      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  return min;
}

function getSupportLevel(stream) {
  const level = supportsColor(stream, stream && stream.isTTY);
  return translateLevel(level);
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: translateLevel(supportsColor(true, tty__default['default'].isatty(1))),
  stderr: translateLevel(supportsColor(true, tty__default['default'].isatty(2)))
};

const InputContext = /*#__PURE__*/react.createContext({});
const useInputByKey = key => {
  const context = react.useContext(InputContext) || {};
  const result = context[key];
  return result === null || result === void 0 ? void 0 : result.value;
};
const useInput = ({
  type = `text`,
  label,
  key = `123`
}) => {
  const contextVal = useInputByKey(key) || ``;
  const [val, setVal] = react.useState(contextVal);

  const Input = props => /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", null, label), /*#__PURE__*/react.createElement("input", _extends({}, props, {
    type: type,
    value: val,
    onChange: e => setVal(e.target.value)
  })));

  return [Input, val];
};
const InputProvider = InputContext.Provider;

const ResourceContext = /*#__PURE__*/react.createContext([]);
const useResourceContext = () => {
  const context = react.useContext(ResourceContext);
  return context;
};
const useResource = key => {
  const context = react.useContext(ResourceContext);
  const result = context.find(c => c.resourceDefinitions._key === key);
  return result || {};
};
const useResourceByUUID = uuid => {
  const context = react.useContext(ResourceContext);
  const result = context.find(c => c._uuid === uuid);
  return result;
};
const ResourceProvider = ResourceContext.Provider;

// this file has the best name
const useProvider = provider => {
  // const context = useContext(ResourceContext)
  // const result = context.find(c => c.resourceDefinitions._key === key)
  // return result
  const providers = {
    contentful: {
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    }
  };
  return providers[provider];
}; // export const ResourceProvider = ResourceContext.Provider

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind = Object.freeze({
  // Name
  NAME: 'Name',
  // Document
  DOCUMENT: 'Document',
  OPERATION_DEFINITION: 'OperationDefinition',
  VARIABLE_DEFINITION: 'VariableDefinition',
  SELECTION_SET: 'SelectionSet',
  FIELD: 'Field',
  ARGUMENT: 'Argument',
  // Fragments
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_FRAGMENT: 'InlineFragment',
  FRAGMENT_DEFINITION: 'FragmentDefinition',
  // Values
  VARIABLE: 'Variable',
  INT: 'IntValue',
  FLOAT: 'FloatValue',
  STRING: 'StringValue',
  BOOLEAN: 'BooleanValue',
  NULL: 'NullValue',
  ENUM: 'EnumValue',
  LIST: 'ListValue',
  OBJECT: 'ObjectValue',
  OBJECT_FIELD: 'ObjectField',
  // Directives
  DIRECTIVE: 'Directive',
  // Types
  NAMED_TYPE: 'NamedType',
  LIST_TYPE: 'ListType',
  NON_NULL_TYPE: 'NonNullType',
  // Type System Definitions
  SCHEMA_DEFINITION: 'SchemaDefinition',
  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
  // Type Definitions
  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
  FIELD_DEFINITION: 'FieldDefinition',
  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
  // Directive Definitions
  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
  // Type System Extensions
  SCHEMA_EXTENSION: 'SchemaExtension',
  // Type Extensions
  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
});
/**
 * The enum type representing the possible kind values of AST nodes.
 */

function invariant(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
  }
}

// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;

/**
 * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
 */

function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === 'function' || invariant(0);
  classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')

  if (nodejsCustomInspectSymbol) {
    classObject.prototype[nodejsCustomInspectSymbol] = fn;
  }
}

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */

var Location = /*#__PURE__*/function () {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  function Location(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  var _proto = Location.prototype;

  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };

  return Location;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

defineInspect(Location);
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

var Token = /*#__PURE__*/function () {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  function Token(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }

  var _proto2 = Token.prototype;

  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };

  return Token;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.

defineInspect(Token);
/**
 * @internal
 */

function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === 'string';
}
/**
 * The list of all possible AST node types.
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return '[Circular]';
  }

  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);

  if (customInspectFn !== undefined) {
    var customValue = customInspectFn.call(value); // check for infinite recursion

    if (customValue !== value) {
      return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function formatObject(object, seenValues) {
  var keys = Object.keys(object);

  if (keys.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  var properties = keys.map(function (key) {
    var value = formatValue(object[key], seenValues);
    return key + ': ' + value;
  });
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];

  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }

  return '[' + items.join(', ') + ']';
}

function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol)];

  if (typeof customInspectFn === 'function') {
    return customInspectFn;
  }

  if (typeof object.inspect === 'function') {
    return object.inspect;
  }
}

function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    var name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */
function dedentBlockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

  var commonIndent = getBlockStringIndentation(rawString);

  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  } // Remove leading and trailing blank lines.


  var startLine = 0;

  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }

  var endLine = lines.length;

  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  } // Return a string of the lines joined with U+000A.


  return lines.slice(startLine, endLine).join('\n');
}

function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== ' ' && str[i] !== '\t') {
      return false;
    }
  }

  return true;
}
/**
 * @internal
 */


function getBlockStringIndentation(value) {
  var _commonIndent;

  var isFirstLine = true;
  var isEmptyLine = true;
  var indent = 0;
  var commonIndent = null;

  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        //  \r
        if (value.charCodeAt(i + 1) === 10) {
          ++i; // skip \r\n as one symbol
        }

      // falls through

      case 10:
        //  \n
        isFirstLine = false;
        isEmptyLine = true;
        indent = 0;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        ++indent;
        break;

      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
          commonIndent = indent;
        }

        isEmptyLine = false;
    }
  }

  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSingleLine = value.indexOf('\n') === -1;
  var hasLeadingSpace = value[0] === ' ' || value[0] === '\t';
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === '\\';
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = ''; // Format a multi-line block quote to account for leading space.

  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += '\n' + indentation;
  }

  result += indentation ? value.replace(/\n/g, '\n' + indentation) : value;

  if (printAsMultipleLines) {
    result += '\n';
  }

  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}

/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;
  /* eslint-disable no-undef-init */

  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */

function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80; // TODO: provide better type coverage in future

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    var prefix = wrap('', alias, ': ') + name;
    var argsLine = prefix + wrap('(', join(args, ', '), ')');

    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
    }

    return join([argsLine, join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function (_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        interfaces = _ref26.interfaces,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        repeatable = _ref31.repeatable,
        locations = _ref31.locations;
    return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        interfaces = _ref35.interfaces,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray) {
  var _maybeArray$filter$jo;

  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function (x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */


function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return maybeString != null && maybeString !== '' ? start + maybeString + end : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function isMultiline(str) {
  return str.indexOf('\n') !== -1;
}

function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}

var printer = /*#__PURE__*/Object.freeze({
  __proto__: null,
  print: print
});

/**
 * Expose `Backoff`.
 */
var backo2 = Backoff;
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */


Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);

  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }

  return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */


Backoff.prototype.reset = function () {
  this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */


Backoff.prototype.setMin = function (min) {
  this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */


Backoff.prototype.setMax = function (max) {
  this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */


Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty,
    prefix = '~';
/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */

function Events() {} //
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//


if (Object.create) {
  Events.prototype = Object.create(null); //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //

  if (!new Events().__proto__) prefix = false;
}
/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */


function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}
/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */


function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once),
      evt = prefix ? prefix + event : event;
  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];
  return emitter;
}
/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */


function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
}
/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */


function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}
/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */


EventEmitter.prototype.eventNames = function eventNames() {
  var names = [],
      events,
      name;
  if (this._eventsCount === 0) return names;

  for (name in events = this._events) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};
/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */


EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event,
      handlers = this._events[evt];
  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};
/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */


EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event,
      listeners = this._events[evt];
  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};
/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */


EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return false;
  var listeners = this._events[evt],
      len = arguments.length,
      args,
      i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1:
        return listeners.fn.call(listeners.context), true;

      case 2:
        return listeners.fn.call(listeners.context, a1), true;

      case 3:
        return listeners.fn.call(listeners.context, a1, a2), true;

      case 4:
        return listeners.fn.call(listeners.context, a1, a2, a3), true;

      case 5:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;

      case 6:
        return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len - 1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length,
        j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1:
          listeners[i].fn.call(listeners[i].context);
          break;

        case 2:
          listeners[i].fn.call(listeners[i].context, a1);
          break;

        case 3:
          listeners[i].fn.call(listeners[i].context, a1, a2);
          break;

        case 4:
          listeners[i].fn.call(listeners[i].context, a1, a2, a3);
          break;

        default:
          if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
            args[j - 1] = arguments[j];
          }
          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};
/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};
/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};
/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;
  if (!this._events[evt]) return this;

  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
        events.push(listeners[i]);
      }
    } //
    // Reset the array, or remove it completely if we have no more listeners.
    //


    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
  }

  return this;
};
/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */


EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
}; //
// Alias methods names because people roll like that.
//


EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on; //
// Expose the prefix.
//

EventEmitter.prefixed = prefix; //
// Allow `EventEmitter` to be imported as module namespace.
//

EventEmitter.EventEmitter = EventEmitter; //
// Expose the module.
//

{
  module.exports = EventEmitter;
}
});

function isString(value) {
  return typeof value === 'string';
}

var _default$2 = isString;

var isString_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$2
}, '__esModule', {value: true});

function isObject(value) {
  return value !== null && typeof value === 'object';
}

var _default$1 = isObject;

var isObject_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$1
}, '__esModule', {value: true});

/**
 * Returns an operation AST given a document AST and optionally an operation
 * name. If a name is not provided, an operation is only returned if only one is
 * provided in the document.
 */

function getOperationAST(documentAST, operationName) {
  var operation = null;

  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var definition = _documentAST$definiti2[_i2];

    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;

      if (operationName == null) {
        // If no operation name was provided, only return an Operation if there
        // is one defined in the document. Upon encountering the second, return
        // null.
        if (operation) {
          return null;
        }

        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }

  return operation;
}

var getOperationAST$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getOperationAST: getOperationAST
});

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else {
  root = module;
}

var result = symbolObservablePonyfill(root);

var es = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': result
});

var protocol = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRAPHQL_SUBSCRIPTIONS = exports.GRAPHQL_WS = void 0;
var GRAPHQL_WS = 'graphql-ws';
exports.GRAPHQL_WS = GRAPHQL_WS;
var GRAPHQL_SUBSCRIPTIONS = 'graphql-subscriptions';
exports.GRAPHQL_SUBSCRIPTIONS = GRAPHQL_SUBSCRIPTIONS;
});

var defaults = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WS_TIMEOUT = exports.MIN_WS_TIMEOUT = void 0;
var MIN_WS_TIMEOUT = 1000;
exports.MIN_WS_TIMEOUT = MIN_WS_TIMEOUT;
var WS_TIMEOUT = 30000;
exports.WS_TIMEOUT = WS_TIMEOUT;
});

var MessageTypes = function () {
  function MessageTypes() {
    throw new Error('Static Class');
  }

  MessageTypes.GQL_CONNECTION_INIT = 'connection_init';
  MessageTypes.GQL_CONNECTION_ACK = 'connection_ack';
  MessageTypes.GQL_CONNECTION_ERROR = 'connection_error';
  MessageTypes.GQL_CONNECTION_KEEP_ALIVE = 'ka';
  MessageTypes.GQL_CONNECTION_TERMINATE = 'connection_terminate';
  MessageTypes.GQL_START = 'start';
  MessageTypes.GQL_DATA = 'data';
  MessageTypes.GQL_ERROR = 'error';
  MessageTypes.GQL_COMPLETE = 'complete';
  MessageTypes.GQL_STOP = 'stop';
  MessageTypes.SUBSCRIPTION_START = 'subscription_start';
  MessageTypes.SUBSCRIPTION_DATA = 'subscription_data';
  MessageTypes.SUBSCRIPTION_SUCCESS = 'subscription_success';
  MessageTypes.SUBSCRIPTION_FAIL = 'subscription_fail';
  MessageTypes.SUBSCRIPTION_END = 'subscription_end';
  MessageTypes.INIT = 'init';
  MessageTypes.INIT_SUCCESS = 'init_success';
  MessageTypes.INIT_FAIL = 'init_fail';
  MessageTypes.KEEP_ALIVE = 'keepalive';
  return MessageTypes;
}();

var _default = MessageTypes;

var messageTypes = /*#__PURE__*/Object.defineProperty({
	default: _default
}, '__esModule', {value: true});

var printer_1 = /*@__PURE__*/getAugmentedNamespace(printer);

var getOperationAST_1 = /*@__PURE__*/getAugmentedNamespace(getOperationAST$1);

var symbol_observable_1 = /*@__PURE__*/getAugmentedNamespace(es);

var client$2 = createCommonjsModule(function (module, exports) {

var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = commonjsGlobal && commonjsGlobal.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionClient = void 0;

var _global = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : {};

var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;





















var SubscriptionClient = function () {
  function SubscriptionClient(url, options, webSocketImpl, webSocketProtocols) {
    var _a = options || {},
        _b = _a.connectionCallback,
        connectionCallback = _b === void 0 ? undefined : _b,
        _c = _a.connectionParams,
        connectionParams = _c === void 0 ? {} : _c,
        _d = _a.minTimeout,
        minTimeout = _d === void 0 ? defaults.MIN_WS_TIMEOUT : _d,
        _e = _a.timeout,
        timeout = _e === void 0 ? defaults.WS_TIMEOUT : _e,
        _f = _a.reconnect,
        reconnect = _f === void 0 ? false : _f,
        _g = _a.reconnectionAttempts,
        reconnectionAttempts = _g === void 0 ? Infinity : _g,
        _h = _a.lazy,
        lazy = _h === void 0 ? false : _h,
        _j = _a.inactivityTimeout,
        inactivityTimeout = _j === void 0 ? 0 : _j,
        _k = _a.wsOptionArguments,
        wsOptionArguments = _k === void 0 ? [] : _k;

    this.wsImpl = webSocketImpl || NativeWebSocket;

    if (!this.wsImpl) {
      throw new Error('Unable to find native implementation, or alternative implementation for WebSocket!');
    }

    this.wsProtocols = webSocketProtocols || protocol.GRAPHQL_WS;
    this.connectionCallback = connectionCallback;
    this.url = url;
    this.operations = {};
    this.nextOperationId = 0;
    this.minWsTimeout = minTimeout;
    this.wsTimeout = timeout;
    this.unsentMessagesQueue = [];
    this.reconnect = reconnect;
    this.reconnecting = false;
    this.reconnectionAttempts = reconnectionAttempts;
    this.lazy = !!lazy;
    this.inactivityTimeout = inactivityTimeout;
    this.closedByUser = false;
    this.backoff = new backo2({
      jitter: 0.5
    });
    this.eventEmitter = new eventemitter3.EventEmitter();
    this.middlewares = [];
    this.client = null;
    this.maxConnectTimeGenerator = this.createMaxConnectTimeGenerator();
    this.connectionParams = this.getConnectionParams(connectionParams);
    this.wsOptionArguments = wsOptionArguments;

    if (!this.lazy) {
      this.connect();
    }
  }

  Object.defineProperty(SubscriptionClient.prototype, "status", {
    get: function () {
      if (this.client === null) {
        return this.wsImpl.CLOSED;
      }

      return this.client.readyState;
    },
    enumerable: false,
    configurable: true
  });

  SubscriptionClient.prototype.close = function (isForced, closedByUser) {
    if (isForced === void 0) {
      isForced = true;
    }

    if (closedByUser === void 0) {
      closedByUser = true;
    }

    this.clearInactivityTimeout();

    if (this.client !== null) {
      this.closedByUser = closedByUser;

      if (isForced) {
        this.clearCheckConnectionInterval();
        this.clearMaxConnectTimeout();
        this.clearTryReconnectTimeout();
        this.unsubscribeAll();
        this.sendMessage(undefined, messageTypes.default.GQL_CONNECTION_TERMINATE, null);
      }

      this.client.close();
      this.client.onopen = null;
      this.client.onclose = null;
      this.client.onerror = null;
      this.client.onmessage = null;
      this.client = null;
      this.eventEmitter.emit('disconnected');

      if (!isForced) {
        this.tryReconnect();
      }
    }
  };

  SubscriptionClient.prototype.request = function (request) {
    var _a;

    var getObserver = this.getObserver.bind(this);
    var executeOperation = this.executeOperation.bind(this);
    var unsubscribe = this.unsubscribe.bind(this);
    var opId;
    this.clearInactivityTimeout();
    return _a = {}, _a[symbol_observable_1.default] = function () {
      return this;
    }, _a.subscribe = function (observerOrNext, onError, onComplete) {
      var observer = getObserver(observerOrNext, onError, onComplete);
      opId = executeOperation(request, function (error, result) {
        if (error === null && result === null) {
          if (observer.complete) {
            observer.complete();
          }
        } else if (error) {
          if (observer.error) {
            observer.error(error[0]);
          }
        } else {
          if (observer.next) {
            observer.next(result);
          }
        }
      });
      return {
        unsubscribe: function () {
          if (opId) {
            unsubscribe(opId);
            opId = null;
          }
        }
      };
    }, _a;
  };

  SubscriptionClient.prototype.on = function (eventName, callback, context) {
    var handler = this.eventEmitter.on(eventName, callback, context);
    return function () {
      handler.off(eventName, callback, context);
    };
  };

  SubscriptionClient.prototype.onConnected = function (callback, context) {
    return this.on('connected', callback, context);
  };

  SubscriptionClient.prototype.onConnecting = function (callback, context) {
    return this.on('connecting', callback, context);
  };

  SubscriptionClient.prototype.onDisconnected = function (callback, context) {
    return this.on('disconnected', callback, context);
  };

  SubscriptionClient.prototype.onReconnected = function (callback, context) {
    return this.on('reconnected', callback, context);
  };

  SubscriptionClient.prototype.onReconnecting = function (callback, context) {
    return this.on('reconnecting', callback, context);
  };

  SubscriptionClient.prototype.onError = function (callback, context) {
    return this.on('error', callback, context);
  };

  SubscriptionClient.prototype.unsubscribeAll = function () {
    var _this = this;

    Object.keys(this.operations).forEach(function (subId) {
      _this.unsubscribe(subId);
    });
  };

  SubscriptionClient.prototype.applyMiddlewares = function (options) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var queue = function (funcs, scope) {
        var next = function (error) {
          if (error) {
            reject(error);
          } else {
            if (funcs.length > 0) {
              var f = funcs.shift();

              if (f) {
                f.applyMiddleware.apply(scope, [options, next]);
              }
            } else {
              resolve(options);
            }
          }
        };

        next();
      };

      queue(__spreadArrays(_this.middlewares), _this);
    });
  };

  SubscriptionClient.prototype.use = function (middlewares) {
    var _this = this;

    middlewares.map(function (middleware) {
      if (typeof middleware.applyMiddleware === 'function') {
        _this.middlewares.push(middleware);
      } else {
        throw new Error('Middleware must implement the applyMiddleware function.');
      }
    });
    return this;
  };

  SubscriptionClient.prototype.getConnectionParams = function (connectionParams) {
    return function () {
      return new Promise(function (resolve, reject) {
        if (typeof connectionParams === 'function') {
          try {
            return resolve(connectionParams.call(null));
          } catch (error) {
            return reject(error);
          }
        }

        resolve(connectionParams);
      });
    };
  };

  SubscriptionClient.prototype.executeOperation = function (options, handler) {
    var _this = this;

    if (this.client === null) {
      this.connect();
    }

    var opId = this.generateOperationId();
    this.operations[opId] = {
      options: options,
      handler: handler
    };
    this.applyMiddlewares(options).then(function (processedOptions) {
      _this.checkOperationOptions(processedOptions, handler);

      if (_this.operations[opId]) {
        _this.operations[opId] = {
          options: processedOptions,
          handler: handler
        };

        _this.sendMessage(opId, messageTypes.default.GQL_START, processedOptions);
      }
    }).catch(function (error) {
      _this.unsubscribe(opId);

      handler(_this.formatErrors(error));
    });
    return opId;
  };

  SubscriptionClient.prototype.getObserver = function (observerOrNext, error, complete) {
    if (typeof observerOrNext === 'function') {
      return {
        next: function (v) {
          return observerOrNext(v);
        },
        error: function (e) {
          return error && error(e);
        },
        complete: function () {
          return complete && complete();
        }
      };
    }

    return observerOrNext;
  };

  SubscriptionClient.prototype.createMaxConnectTimeGenerator = function () {
    var minValue = this.minWsTimeout;
    var maxValue = this.wsTimeout;
    return new backo2({
      min: minValue,
      max: maxValue,
      factor: 1.2
    });
  };

  SubscriptionClient.prototype.clearCheckConnectionInterval = function () {
    if (this.checkConnectionIntervalId) {
      clearInterval(this.checkConnectionIntervalId);
      this.checkConnectionIntervalId = null;
    }
  };

  SubscriptionClient.prototype.clearMaxConnectTimeout = function () {
    if (this.maxConnectTimeoutId) {
      clearTimeout(this.maxConnectTimeoutId);
      this.maxConnectTimeoutId = null;
    }
  };

  SubscriptionClient.prototype.clearTryReconnectTimeout = function () {
    if (this.tryReconnectTimeoutId) {
      clearTimeout(this.tryReconnectTimeoutId);
      this.tryReconnectTimeoutId = null;
    }
  };

  SubscriptionClient.prototype.clearInactivityTimeout = function () {
    if (this.inactivityTimeoutId) {
      clearTimeout(this.inactivityTimeoutId);
      this.inactivityTimeoutId = null;
    }
  };

  SubscriptionClient.prototype.setInactivityTimeout = function () {
    var _this = this;

    if (this.inactivityTimeout > 0 && Object.keys(this.operations).length === 0) {
      this.inactivityTimeoutId = setTimeout(function () {
        if (Object.keys(_this.operations).length === 0) {
          _this.close();
        }
      }, this.inactivityTimeout);
    }
  };

  SubscriptionClient.prototype.checkOperationOptions = function (options, handler) {
    var query = options.query,
        variables = options.variables,
        operationName = options.operationName;

    if (!query) {
      throw new Error('Must provide a query.');
    }

    if (!handler) {
      throw new Error('Must provide an handler.');
    }

    if (!isString_1.default(query) && !getOperationAST_1.getOperationAST(query, operationName) || operationName && !isString_1.default(operationName) || variables && !isObject_1.default(variables)) {
      throw new Error('Incorrect option types. query must be a string or a document,' + '`operationName` must be a string, and `variables` must be an object.');
    }
  };

  SubscriptionClient.prototype.buildMessage = function (id, type, payload) {
    var payloadToReturn = payload && payload.query ? __assign(__assign({}, payload), {
      query: typeof payload.query === 'string' ? payload.query : printer_1.print(payload.query)
    }) : payload;
    return {
      id: id,
      type: type,
      payload: payloadToReturn
    };
  };

  SubscriptionClient.prototype.formatErrors = function (errors) {
    if (Array.isArray(errors)) {
      return errors;
    }

    if (errors && errors.errors) {
      return this.formatErrors(errors.errors);
    }

    if (errors && errors.message) {
      return [errors];
    }

    return [{
      name: 'FormatedError',
      message: 'Unknown error',
      originalError: errors
    }];
  };

  SubscriptionClient.prototype.sendMessage = function (id, type, payload) {
    this.sendMessageRaw(this.buildMessage(id, type, payload));
  };

  SubscriptionClient.prototype.sendMessageRaw = function (message) {
    switch (this.status) {
      case this.wsImpl.OPEN:
        var serializedMessage = JSON.stringify(message);

        try {
          JSON.parse(serializedMessage);
        } catch (e) {
          this.eventEmitter.emit('error', new Error("Message must be JSON-serializable. Got: " + message));
        }

        this.client.send(serializedMessage);
        break;

      case this.wsImpl.CONNECTING:
        this.unsentMessagesQueue.push(message);
        break;

      default:
        if (!this.reconnecting) {
          this.eventEmitter.emit('error', new Error('A message was not sent because socket is not connected, is closing or ' + 'is already closed. Message was: ' + JSON.stringify(message)));
        }

    }
  };

  SubscriptionClient.prototype.generateOperationId = function () {
    return String(++this.nextOperationId);
  };

  SubscriptionClient.prototype.tryReconnect = function () {
    var _this = this;

    if (!this.reconnect || this.backoff.attempts >= this.reconnectionAttempts) {
      return;
    }

    if (!this.reconnecting) {
      Object.keys(this.operations).forEach(function (key) {
        _this.unsentMessagesQueue.push(_this.buildMessage(key, messageTypes.default.GQL_START, _this.operations[key].options));
      });
      this.reconnecting = true;
    }

    this.clearTryReconnectTimeout();
    var delay = this.backoff.duration();
    this.tryReconnectTimeoutId = setTimeout(function () {
      _this.connect();
    }, delay);
  };

  SubscriptionClient.prototype.flushUnsentMessagesQueue = function () {
    var _this = this;

    this.unsentMessagesQueue.forEach(function (message) {
      _this.sendMessageRaw(message);
    });
    this.unsentMessagesQueue = [];
  };

  SubscriptionClient.prototype.checkConnection = function () {
    if (this.wasKeepAliveReceived) {
      this.wasKeepAliveReceived = false;
      return;
    }

    if (!this.reconnecting) {
      this.close(false, true);
    }
  };

  SubscriptionClient.prototype.checkMaxConnectTimeout = function () {
    var _this = this;

    this.clearMaxConnectTimeout();
    this.maxConnectTimeoutId = setTimeout(function () {
      if (_this.status !== _this.wsImpl.OPEN) {
        _this.reconnecting = true;

        _this.close(false, true);
      }
    }, this.maxConnectTimeGenerator.duration());
  };

  SubscriptionClient.prototype.connect = function () {
    var _a;

    var _this = this;

    this.client = new ((_a = this.wsImpl).bind.apply(_a, __spreadArrays([void 0, this.url, this.wsProtocols], this.wsOptionArguments)))();
    this.checkMaxConnectTimeout();

    this.client.onopen = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var connectionParams, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(this.status === this.wsImpl.OPEN)) return [3, 4];
              this.clearMaxConnectTimeout();
              this.closedByUser = false;
              this.eventEmitter.emit(this.reconnecting ? 'reconnecting' : 'connecting');
              _a.label = 1;

            case 1:
              _a.trys.push([1, 3,, 4]);

              return [4, this.connectionParams()];

            case 2:
              connectionParams = _a.sent();
              this.sendMessage(undefined, messageTypes.default.GQL_CONNECTION_INIT, connectionParams);
              this.flushUnsentMessagesQueue();
              return [3, 4];

            case 3:
              error_1 = _a.sent();
              this.sendMessage(undefined, messageTypes.default.GQL_CONNECTION_ERROR, error_1);
              this.flushUnsentMessagesQueue();
              return [3, 4];

            case 4:
              return [2];
          }
        });
      });
    };

    this.client.onclose = function () {
      if (!_this.closedByUser) {
        _this.close(false, false);
      }
    };

    this.client.onerror = function (err) {
      _this.eventEmitter.emit('error', err);
    };

    this.client.onmessage = function (_a) {
      var data = _a.data;

      _this.processReceivedData(data);
    };
  };

  SubscriptionClient.prototype.processReceivedData = function (receivedData) {
    var parsedMessage;
    var opId;

    try {
      parsedMessage = JSON.parse(receivedData);
      opId = parsedMessage.id;
    } catch (e) {
      throw new Error("Message must be JSON-parseable. Got: " + receivedData);
    }

    if ([messageTypes.default.GQL_DATA, messageTypes.default.GQL_COMPLETE, messageTypes.default.GQL_ERROR].indexOf(parsedMessage.type) !== -1 && !this.operations[opId]) {
      this.unsubscribe(opId);
      return;
    }

    switch (parsedMessage.type) {
      case messageTypes.default.GQL_CONNECTION_ERROR:
        if (this.connectionCallback) {
          this.connectionCallback(parsedMessage.payload);
        }

        break;

      case messageTypes.default.GQL_CONNECTION_ACK:
        this.eventEmitter.emit(this.reconnecting ? 'reconnected' : 'connected', parsedMessage.payload);
        this.reconnecting = false;
        this.backoff.reset();
        this.maxConnectTimeGenerator.reset();

        if (this.connectionCallback) {
          this.connectionCallback();
        }

        break;

      case messageTypes.default.GQL_COMPLETE:
        var handler = this.operations[opId].handler;
        delete this.operations[opId];
        handler.call(this, null, null);
        break;

      case messageTypes.default.GQL_ERROR:
        this.operations[opId].handler(this.formatErrors(parsedMessage.payload), null);
        delete this.operations[opId];
        break;

      case messageTypes.default.GQL_DATA:
        var parsedPayload = !parsedMessage.payload.errors ? parsedMessage.payload : __assign(__assign({}, parsedMessage.payload), {
          errors: this.formatErrors(parsedMessage.payload.errors)
        });
        this.operations[opId].handler(null, parsedPayload);
        break;

      case messageTypes.default.GQL_CONNECTION_KEEP_ALIVE:
        var firstKA = typeof this.wasKeepAliveReceived === 'undefined';
        this.wasKeepAliveReceived = true;

        if (firstKA) {
          this.checkConnection();
        }

        if (this.checkConnectionIntervalId) {
          clearInterval(this.checkConnectionIntervalId);
          this.checkConnection();
        }

        this.checkConnectionIntervalId = setInterval(this.checkConnection.bind(this), this.wsTimeout);
        break;

      default:
        throw new Error('Invalid message type!');
    }
  };

  SubscriptionClient.prototype.unsubscribe = function (opId) {
    if (this.operations[opId]) {
      delete this.operations[opId];
      this.setInactivityTimeout();
      this.sendMessage(opId, messageTypes.default.GQL_STOP, undefined);
    }
  };

  return SubscriptionClient;
}();

exports.SubscriptionClient = SubscriptionClient;
});

/**
 * Copyright (c) 2016, Lee Byron
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @ignore
 */

/**
 * [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)
 * is a *protocol* which describes a standard way to produce a sequence of
 * values, typically the values of the Iterable represented by this Iterator.
 *
 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterator-interface)
 * it can be utilized by any version of JavaScript.
 *
 * @external Iterator
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator|MDN Iteration protocols}
 */

/**
 * [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
 * is a *protocol* which when implemented allows a JavaScript object to define
 * their iteration behavior, such as what values are looped over in a
 * [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
 * loop or `iterall`'s `forEach` function. Many [built-in types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables)
 * implement the Iterable protocol, including `Array` and `Map`.
 *
 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)
 * it can be utilized by any version of JavaScript.
 *
 * @external Iterable
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable|MDN Iteration protocols}
 */
// In ES2015 environments, Symbol exists
var SYMBOL
/*: any */
= typeof Symbol === 'function' ? Symbol : void 0; // In ES2015 (or a polyfilled) environment, this will be Symbol.iterator

var SYMBOL_ITERATOR = SYMBOL && SYMBOL.iterator;
/**
 * A property name to be used as the name of an Iterable's method responsible
 * for producing an Iterator, referred to as `@@iterator`. Typically represents
 * the value `Symbol.iterator` but falls back to the string `"@@iterator"` when
 * `Symbol.iterator` is not defined.
 *
 * Use `$$iterator` for defining new Iterables instead of `Symbol.iterator`,
 * but do not use it for accessing existing Iterables, instead use
 * {@link getIterator} or {@link isIterable}.
 *
 * @example
 *
 * var $$iterator = require('iterall').$$iterator
 *
 * function Counter (to) {
 *   this.to = to
 * }
 *
 * Counter.prototype[$$iterator] = function () {
 *   return {
 *     to: this.to,
 *     num: 0,
 *     next () {
 *       if (this.num >= this.to) {
 *         return { value: undefined, done: true }
 *       }
 *       return { value: this.num++, done: false }
 *     }
 *   }
 * }
 *
 * var counter = new Counter(3)
 * for (var number of counter) {
 *   console.log(number) // 0 ... 1 ... 2
 * }
 *
 * @type {Symbol|string}
 */

/*:: declare export var $$iterator: '@@iterator'; */

var $$iterator = SYMBOL_ITERATOR || '@@iterator';
/**
 * Returns true if the provided object implements the Iterator protocol via
 * either implementing a `Symbol.iterator` or `"@@iterator"` method.
 *
 * @example
 *
 * var isIterable = require('iterall').isIterable
 * isIterable([ 1, 2, 3 ]) // true
 * isIterable('ABC') // true
 * isIterable({ length: 1, 0: 'Alpha' }) // false
 * isIterable({ key: 'value' }) // false
 * isIterable(new Map()) // true
 *
 * @param obj
 *   A value which might implement the Iterable protocol.
 * @return {boolean} true if Iterable.
 */

/*:: declare export function isIterable(obj: any): boolean; */

function isIterable(obj) {
  return !!getIteratorMethod(obj);
}
/**
 * Returns true if the provided object implements the Array-like protocol via
 * defining a positive-integer `length` property.
 *
 * @example
 *
 * var isArrayLike = require('iterall').isArrayLike
 * isArrayLike([ 1, 2, 3 ]) // true
 * isArrayLike('ABC') // true
 * isArrayLike({ length: 1, 0: 'Alpha' }) // true
 * isArrayLike({ key: 'value' }) // false
 * isArrayLike(new Map()) // false
 *
 * @param obj
 *   A value which might implement the Array-like protocol.
 * @return {boolean} true if Array-like.
 */

/*:: declare export function isArrayLike(obj: any): boolean; */

function isArrayLike(obj) {
  var length = obj != null && obj.length;
  return typeof length === 'number' && length >= 0 && length % 1 === 0;
}
/**
 * Returns true if the provided object is an Object (i.e. not a string literal)
 * and is either Iterable or Array-like.
 *
 * This may be used in place of [Array.isArray()][isArray] to determine if an
 * object should be iterated-over. It always excludes string literals and
 * includes Arrays (regardless of if it is Iterable). It also includes other
 * Array-like objects such as NodeList, TypedArray, and Buffer.
 *
 * @example
 *
 * var isCollection = require('iterall').isCollection
 * isCollection([ 1, 2, 3 ]) // true
 * isCollection('ABC') // false
 * isCollection({ length: 1, 0: 'Alpha' }) // true
 * isCollection({ key: 'value' }) // false
 * isCollection(new Map()) // true
 *
 * @example
 *
 * var forEach = require('iterall').forEach
 * if (isCollection(obj)) {
 *   forEach(obj, function (value) {
 *     console.log(value)
 *   })
 * }
 *
 * @param obj
 *   An Object value which might implement the Iterable or Array-like protocols.
 * @return {boolean} true if Iterable or Array-like Object.
 */

/*:: declare export function isCollection(obj: any): boolean; */

function isCollection(obj) {
  return Object(obj) === obj && (isArrayLike(obj) || isIterable(obj));
}
/**
 * If the provided object implements the Iterator protocol, its Iterator object
 * is returned. Otherwise returns undefined.
 *
 * @example
 *
 * var getIterator = require('iterall').getIterator
 * var iterator = getIterator([ 1, 2, 3 ])
 * iterator.next() // { value: 1, done: false }
 * iterator.next() // { value: 2, done: false }
 * iterator.next() // { value: 3, done: false }
 * iterator.next() // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>} iterable
 *   An Iterable object which is the source of an Iterator.
 * @return {Iterator<T>} new Iterator instance.
 */

/*:: declare export var getIterator:
  & (<+TValue>(iterable: Iterable<TValue>) => Iterator<TValue>)
  & ((iterable: mixed) => void | Iterator<mixed>); */

function getIterator(iterable) {
  var method = getIteratorMethod(iterable);

  if (method) {
    return method.call(iterable);
  }
}
/**
 * If the provided object implements the Iterator protocol, the method
 * responsible for producing its Iterator object is returned.
 *
 * This is used in rare cases for performance tuning. This method must be called
 * with obj as the contextual this-argument.
 *
 * @example
 *
 * var getIteratorMethod = require('iterall').getIteratorMethod
 * var myArray = [ 1, 2, 3 ]
 * var method = getIteratorMethod(myArray)
 * if (method) {
 *   var iterator = method.call(myArray)
 * }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>} iterable
 *   An Iterable object which defines an `@@iterator` method.
 * @return {function(): Iterator<T>} `@@iterator` method.
 */

/*:: declare export var getIteratorMethod:
  & (<+TValue>(iterable: Iterable<TValue>) => (() => Iterator<TValue>))
  & ((iterable: mixed) => (void | (() => Iterator<mixed>))); */

function getIteratorMethod(iterable) {
  if (iterable != null) {
    var method = SYMBOL_ITERATOR && iterable[SYMBOL_ITERATOR] || iterable['@@iterator'];

    if (typeof method === 'function') {
      return method;
    }
  }
}
/**
 * Similar to {@link getIterator}, this method returns a new Iterator given an
 * Iterable. However it will also create an Iterator for a non-Iterable
 * Array-like collection, such as Array in a non-ES2015 environment.
 *
 * `createIterator` is complimentary to `forEach`, but allows a "pull"-based
 * iteration as opposed to `forEach`'s "push"-based iteration.
 *
 * `createIterator` produces an Iterator for Array-likes with the same behavior
 * as ArrayIteratorPrototype described in the ECMAScript specification, and
 * does *not* skip over "holes".
 *
 * @example
 *
 * var createIterator = require('iterall').createIterator
 *
 * var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
 * var iterator = createIterator(myArraylike)
 * iterator.next() // { value: 'Alpha', done: false }
 * iterator.next() // { value: 'Bravo', done: false }
 * iterator.next() // { value: 'Charlie', done: false }
 * iterator.next() // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>|{ length: number }} collection
 *   An Iterable or Array-like object to produce an Iterator.
 * @return {Iterator<T>} new Iterator instance.
 */

/*:: declare export var createIterator:
  & (<+TValue>(collection: Iterable<TValue>) => Iterator<TValue>)
  & ((collection: {length: number}) => Iterator<mixed>)
  & ((collection: mixed) => (void | Iterator<mixed>)); */

function createIterator(collection) {
  if (collection != null) {
    var iterator = getIterator(collection);

    if (iterator) {
      return iterator;
    }

    if (isArrayLike(collection)) {
      return new ArrayLikeIterator(collection);
    }
  }
} // When the object provided to `createIterator` is not Iterable but is
// Array-like, this simple Iterator is created.

function ArrayLikeIterator(obj) {
  this._o = obj;
  this._i = 0;
} // Note: all Iterators are themselves Iterable.


ArrayLikeIterator.prototype[$$iterator] = function () {
  return this;
}; // A simple state-machine determines the IteratorResult returned, yielding
// each value in the Array-like object in order of their indicies.


ArrayLikeIterator.prototype.next = function () {
  if (this._o === void 0 || this._i >= this._o.length) {
    this._o = void 0;
    return {
      value: void 0,
      done: true
    };
  }

  return {
    value: this._o[this._i++],
    done: false
  };
};
/**
 * Given an object which either implements the Iterable protocol or is
 * Array-like, iterate over it, calling the `callback` at each iteration.
 *
 * Use `forEach` where you would expect to use a `for ... of` loop in ES6.
 * However `forEach` adheres to the behavior of [Array#forEach][] described in
 * the ECMAScript specification, skipping over "holes" in Array-likes. It will
 * also delegate to a `forEach` method on `collection` if one is defined,
 * ensuring native performance for `Arrays`.
 *
 * Similar to [Array#forEach][], the `callback` function accepts three
 * arguments, and is provided with `thisArg` as the calling context.
 *
 * Note: providing an infinite Iterator to forEach will produce an error.
 *
 * [Array#forEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 *
 * @example
 *
 * var forEach = require('iterall').forEach
 *
 * forEach(myIterable, function (value, index, iterable) {
 *   console.log(value, index, iterable === myIterable)
 * })
 *
 * @example
 *
 * // ES6:
 * for (let value of myIterable) {
 *   console.log(value)
 * }
 *
 * // Any JavaScript environment:
 * forEach(myIterable, function (value) {
 *   console.log(value)
 * })
 *
 * @template T the type of each iterated value
 * @param {Iterable<T>|{ length: number }} collection
 *   The Iterable or array to iterate over.
 * @param {function(T, number, object)} callback
 *   Function to execute for each iteration, taking up to three arguments
 * @param [thisArg]
 *   Optional. Value to use as `this` when executing `callback`.
 */

/*:: declare export var forEach:
  & (<+TValue, TCollection: Iterable<TValue>>(
      collection: TCollection,
      callbackFn: (value: TValue, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => void)
  & (<TCollection: {length: number}>(
      collection: TCollection,
      callbackFn: (value: mixed, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => void); */


function forEach(collection, callback, thisArg) {
  if (collection != null) {
    if (typeof collection.forEach === 'function') {
      return collection.forEach(callback, thisArg);
    }

    var i = 0;
    var iterator = getIterator(collection);

    if (iterator) {
      var step;

      while (!(step = iterator.next()).done) {
        callback.call(thisArg, step.value, i++, collection); // Infinite Iterators could cause forEach to run forever.
        // After a very large number of iterations, produce an error.

        /* istanbul ignore if */

        if (i > 9999999) {
          throw new TypeError('Near-infinite iteration.');
        }
      }
    } else if (isArrayLike(collection)) {
      for (; i < collection.length; i++) {
        if (collection.hasOwnProperty(i)) {
          callback.call(thisArg, collection[i], i, collection);
        }
      }
    }
  }
} /////////////////////////////////////////////////////
//                                                 //
//                 ASYNC ITERATORS                 //
//                                                 //
/////////////////////////////////////////////////////

/**
 * [AsyncIterable](https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface)
 * is a *protocol* which when implemented allows a JavaScript object to define
 * an asynchronous iteration behavior, such as what values are looped over in
 * a [`for-await-of`](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements)
 * loop or `iterall`'s {@link forAwaitEach} function.
 *
 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
 * it can be utilized by any version of JavaScript.
 *
 * @external AsyncIterable
 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface|Async Iteration Proposal}
 * @template T The type of each iterated value
 * @property {function (): AsyncIterator<T>} Symbol.asyncIterator
 *   A method which produces an AsyncIterator for this AsyncIterable.
 */

/**
 * [AsyncIterator](https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface)
 * is a *protocol* which describes a standard way to produce and consume an
 * asynchronous sequence of values, typically the values of the
 * {@link AsyncIterable} represented by this {@link AsyncIterator}.
 *
 * AsyncIterator is similar to Observable or Stream. Like an {@link Iterator} it
 * also as a `next()` method, however instead of an IteratorResult,
 * calling this method returns a {@link Promise} for a IteratorResult.
 *
 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
 * it can be utilized by any version of JavaScript.
 *
 * @external AsyncIterator
 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface|Async Iteration Proposal}
 */
// In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator

var SYMBOL_ASYNC_ITERATOR = SYMBOL && SYMBOL.asyncIterator;
/**
 * A property name to be used as the name of an AsyncIterable's method
 * responsible for producing an Iterator, referred to as `@@asyncIterator`.
 * Typically represents the value `Symbol.asyncIterator` but falls back to the
 * string `"@@asyncIterator"` when `Symbol.asyncIterator` is not defined.
 *
 * Use `$$asyncIterator` for defining new AsyncIterables instead of
 * `Symbol.asyncIterator`, but do not use it for accessing existing Iterables,
 * instead use {@link getAsyncIterator} or {@link isAsyncIterable}.
 *
 * @example
 *
 * var $$asyncIterator = require('iterall').$$asyncIterator
 *
 * function Chirper (to) {
 *   this.to = to
 * }
 *
 * Chirper.prototype[$$asyncIterator] = function () {
 *   return {
 *     to: this.to,
 *     num: 0,
 *     next () {
 *       return new Promise(resolve => {
 *         if (this.num >= this.to) {
 *           resolve({ value: undefined, done: true })
 *         } else {
 *           setTimeout(() => {
 *             resolve({ value: this.num++, done: false })
 *           }, 1000)
 *         }
 *       })
 *     }
 *   }
 * }
 *
 * var chirper = new Chirper(3)
 * for await (var number of chirper) {
 *   console.log(number) // 0 ...wait... 1 ...wait... 2
 * }
 *
 * @type {Symbol|string}
 */

/*:: declare export var $$asyncIterator: '@@asyncIterator'; */

var $$asyncIterator = SYMBOL_ASYNC_ITERATOR || '@@asyncIterator';
/**
 * Returns true if the provided object implements the AsyncIterator protocol via
 * either implementing a `Symbol.asyncIterator` or `"@@asyncIterator"` method.
 *
 * @example
 *
 * var isAsyncIterable = require('iterall').isAsyncIterable
 * isAsyncIterable(myStream) // true
 * isAsyncIterable('ABC') // false
 *
 * @param obj
 *   A value which might implement the AsyncIterable protocol.
 * @return {boolean} true if AsyncIterable.
 */

/*:: declare export function isAsyncIterable(obj: any): boolean; */

function isAsyncIterable(obj) {
  return !!getAsyncIteratorMethod(obj);
}
/**
 * If the provided object implements the AsyncIterator protocol, its
 * AsyncIterator object is returned. Otherwise returns undefined.
 *
 * @example
 *
 * var getAsyncIterator = require('iterall').getAsyncIterator
 * var asyncIterator = getAsyncIterator(myStream)
 * asyncIterator.next().then(console.log) // { value: 1, done: false }
 * asyncIterator.next().then(console.log) // { value: 2, done: false }
 * asyncIterator.next().then(console.log) // { value: 3, done: false }
 * asyncIterator.next().then(console.log) // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>} asyncIterable
 *   An AsyncIterable object which is the source of an AsyncIterator.
 * @return {AsyncIterator<T>} new AsyncIterator instance.
 */

/*:: declare export var getAsyncIterator:
  & (<+TValue>(asyncIterable: AsyncIterable<TValue>) => AsyncIterator<TValue>)
  & ((asyncIterable: mixed) => (void | AsyncIterator<mixed>)); */

function getAsyncIterator(asyncIterable) {
  var method = getAsyncIteratorMethod(asyncIterable);

  if (method) {
    return method.call(asyncIterable);
  }
}
/**
 * If the provided object implements the AsyncIterator protocol, the method
 * responsible for producing its AsyncIterator object is returned.
 *
 * This is used in rare cases for performance tuning. This method must be called
 * with obj as the contextual this-argument.
 *
 * @example
 *
 * var getAsyncIteratorMethod = require('iterall').getAsyncIteratorMethod
 * var method = getAsyncIteratorMethod(myStream)
 * if (method) {
 *   var asyncIterator = method.call(myStream)
 * }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>} asyncIterable
 *   An AsyncIterable object which defines an `@@asyncIterator` method.
 * @return {function(): AsyncIterator<T>} `@@asyncIterator` method.
 */

/*:: declare export var getAsyncIteratorMethod:
  & (<+TValue>(asyncIterable: AsyncIterable<TValue>) => (() => AsyncIterator<TValue>))
  & ((asyncIterable: mixed) => (void | (() => AsyncIterator<mixed>))); */

function getAsyncIteratorMethod(asyncIterable) {
  if (asyncIterable != null) {
    var method = SYMBOL_ASYNC_ITERATOR && asyncIterable[SYMBOL_ASYNC_ITERATOR] || asyncIterable['@@asyncIterator'];

    if (typeof method === 'function') {
      return method;
    }
  }
}
/**
 * Similar to {@link getAsyncIterator}, this method returns a new AsyncIterator
 * given an AsyncIterable. However it will also create an AsyncIterator for a
 * non-async Iterable as well as non-Iterable Array-like collection, such as
 * Array in a pre-ES2015 environment.
 *
 * `createAsyncIterator` is complimentary to `forAwaitEach`, but allows a
 * buffering "pull"-based iteration as opposed to `forAwaitEach`'s
 * "push"-based iteration.
 *
 * `createAsyncIterator` produces an AsyncIterator for non-async Iterables as
 * described in the ECMAScript proposal [Async-from-Sync Iterator Objects](https://tc39.github.io/proposal-async-iteration/#sec-async-from-sync-iterator-objects).
 *
 * > Note: Creating `AsyncIterator`s requires the existence of `Promise`.
 * > While `Promise` has been available in modern browsers for a number of
 * > years, legacy browsers (like IE 11) may require a polyfill.
 *
 * @example
 *
 * var createAsyncIterator = require('iterall').createAsyncIterator
 *
 * var myArraylike = { length: 3, 0: 'Alpha', 1: 'Bravo', 2: 'Charlie' }
 * var iterator = createAsyncIterator(myArraylike)
 * iterator.next().then(console.log) // { value: 'Alpha', done: false }
 * iterator.next().then(console.log) // { value: 'Bravo', done: false }
 * iterator.next().then(console.log) // { value: 'Charlie', done: false }
 * iterator.next().then(console.log) // { value: undefined, done: true }
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>|Iterable<T>|{ length: number }} source
 *   An AsyncIterable, Iterable, or Array-like object to produce an Iterator.
 * @return {AsyncIterator<T>} new AsyncIterator instance.
 */

/*:: declare export var createAsyncIterator:
  & (<+TValue>(
      collection: Iterable<Promise<TValue> | TValue> | AsyncIterable<TValue>
    ) => AsyncIterator<TValue>)
  & ((collection: {length: number}) => AsyncIterator<mixed>)
  & ((collection: mixed) => (void | AsyncIterator<mixed>)); */

function createAsyncIterator(source) {
  if (source != null) {
    var asyncIterator = getAsyncIterator(source);

    if (asyncIterator) {
      return asyncIterator;
    }

    var iterator = createIterator(source);

    if (iterator) {
      return new AsyncFromSyncIterator(iterator);
    }
  }
} // When the object provided to `createAsyncIterator` is not AsyncIterable but is
// sync Iterable, this simple wrapper is created.

function AsyncFromSyncIterator(iterator) {
  this._i = iterator;
} // Note: all AsyncIterators are themselves AsyncIterable.


AsyncFromSyncIterator.prototype[$$asyncIterator] = function () {
  return this;
}; // A simple state-machine determines the IteratorResult returned, yielding
// each value in the Array-like object in order of their indicies.


AsyncFromSyncIterator.prototype.next = function (value) {
  return unwrapAsyncFromSync(this._i, 'next', value);
};

AsyncFromSyncIterator.prototype.return = function (value) {
  return this._i.return ? unwrapAsyncFromSync(this._i, 'return', value) : Promise.resolve({
    value: value,
    done: true
  });
};

AsyncFromSyncIterator.prototype.throw = function (value) {
  return this._i.throw ? unwrapAsyncFromSync(this._i, 'throw', value) : Promise.reject(value);
};

function unwrapAsyncFromSync(iterator, fn, value) {
  var step;
  return new Promise(function (resolve) {
    step = iterator[fn](value);
    resolve(step.value);
  }).then(function (value) {
    return {
      value: value,
      done: step.done
    };
  });
}
/**
 * Given an object which either implements the AsyncIterable protocol or is
 * Array-like, iterate over it, calling the `callback` at each iteration.
 *
 * Use `forAwaitEach` where you would expect to use a [for-await-of](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements) loop.
 *
 * Similar to [Array#forEach][], the `callback` function accepts three
 * arguments, and is provided with `thisArg` as the calling context.
 *
 * > Note: Using `forAwaitEach` requires the existence of `Promise`.
 * > While `Promise` has been available in modern browsers for a number of
 * > years, legacy browsers (like IE 11) may require a polyfill.
 *
 * @example
 *
 * var forAwaitEach = require('iterall').forAwaitEach
 *
 * forAwaitEach(myIterable, function (value, index, iterable) {
 *   console.log(value, index, iterable === myIterable)
 * })
 *
 * @example
 *
 * // ES2017:
 * for await (let value of myAsyncIterable) {
 *   console.log(await doSomethingAsync(value))
 * }
 * console.log('done')
 *
 * // Any JavaScript environment:
 * forAwaitEach(myAsyncIterable, function (value) {
 *   return doSomethingAsync(value).then(console.log)
 * }).then(function () {
 *   console.log('done')
 * })
 *
 * @template T the type of each iterated value
 * @param {AsyncIterable<T>|Iterable<Promise<T> | T>|{ length: number }} source
 *   The AsyncIterable or array to iterate over.
 * @param {function(T, number, object)} callback
 *   Function to execute for each iteration, taking up to three arguments
 * @param [thisArg]
 *   Optional. Value to use as `this` when executing `callback`.
 */

/*:: declare export var forAwaitEach:
  & (<+TValue, TCollection: Iterable<Promise<TValue> | TValue> | AsyncIterable<TValue>>(
      collection: TCollection,
      callbackFn: (value: TValue, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => Promise<void>)
  & (<TCollection: { length: number }>(
      collection: TCollection,
      callbackFn: (value: mixed, index: number, collection: TCollection) => any,
      thisArg?: any
    ) => Promise<void>); */


function forAwaitEach(source, callback, thisArg) {
  var asyncIterator = createAsyncIterator(source);

  if (asyncIterator) {
    var i = 0;
    return new Promise(function (resolve, reject) {
      function next() {
        asyncIterator.next().then(function (step) {
          if (!step.done) {
            Promise.resolve(callback.call(thisArg, step.value, i++, source)).then(next).catch(reject);
          } else {
            resolve();
          } // Explicitly return null, silencing bluebird-style warnings.


          return null;
        }).catch(reject); // Explicitly return null, silencing bluebird-style warnings.

        return null;
      }

      next();
    });
  }
}

var iterall = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $$iterator: $$iterator,
  isIterable: isIterable,
  isArrayLike: isArrayLike,
  isCollection: isCollection,
  getIterator: getIterator,
  getIteratorMethod: getIteratorMethod,
  createIterator: createIterator,
  forEach: forEach,
  $$asyncIterator: $$asyncIterator,
  isAsyncIterable: isAsyncIterable,
  getAsyncIterator: getAsyncIterator,
  getAsyncIteratorMethod: getAsyncIteratorMethod,
  createAsyncIterator: createAsyncIterator,
  forAwaitEach: forAwaitEach
});

var iterall_1 = /*@__PURE__*/getAugmentedNamespace(iterall);

var emptyIterable = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyIterable = void 0;



exports.createEmptyIterable = function () {
  var _a;

  return _a = {
    next: function () {
      return Promise.resolve({
        value: undefined,
        done: true
      });
    },
    return: function () {
      return Promise.resolve({
        value: undefined,
        done: true
      });
    },
    throw: function (e) {
      return Promise.reject(e);
    }
  }, _a[iterall_1.$$asyncIterator] = function () {
    return this;
  }, _a;
};
});

var isSubscriptions = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isASubscriptionOperation = void 0;



exports.isASubscriptionOperation = function (document, operationName) {
  var operationAST = graphql_1__default['default'].getOperationAST(document, operationName);
  return !!operationAST && operationAST.operation === 'subscription';
};
});

var parseLegacyProtocol = createCommonjsModule(function (module, exports) {

var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLegacyProtocolMessage = void 0;



exports.parseLegacyProtocolMessage = function (connectionContext, message) {
  var messageToReturn = message;

  switch (message.type) {
    case messageTypes.default.INIT:
      connectionContext.isLegacy = true;
      messageToReturn = __assign(__assign({}, message), {
        type: messageTypes.default.GQL_CONNECTION_INIT
      });
      break;

    case messageTypes.default.SUBSCRIPTION_START:
      messageToReturn = {
        id: message.id,
        type: messageTypes.default.GQL_START,
        payload: {
          query: message.query,
          operationName: message.operationName,
          variables: message.variables
        }
      };
      break;

    case messageTypes.default.SUBSCRIPTION_END:
      messageToReturn = __assign(__assign({}, message), {
        type: messageTypes.default.GQL_STOP
      });
      break;

    case messageTypes.default.GQL_CONNECTION_ACK:
      if (connectionContext.isLegacy) {
        messageToReturn = __assign(__assign({}, message), {
          type: messageTypes.default.INIT_SUCCESS
        });
      }

      break;

    case messageTypes.default.GQL_CONNECTION_ERROR:
      if (connectionContext.isLegacy) {
        messageToReturn = __assign(__assign({}, message), {
          type: messageTypes.default.INIT_FAIL,
          payload: message.payload.message ? {
            error: message.payload.message
          } : message.payload
        });
      }

      break;

    case messageTypes.default.GQL_ERROR:
      if (connectionContext.isLegacy) {
        messageToReturn = __assign(__assign({}, message), {
          type: messageTypes.default.SUBSCRIPTION_FAIL
        });
      }

      break;

    case messageTypes.default.GQL_DATA:
      if (connectionContext.isLegacy) {
        messageToReturn = __assign(__assign({}, message), {
          type: messageTypes.default.SUBSCRIPTION_DATA
        });
      }

      break;

    case messageTypes.default.GQL_COMPLETE:
      if (connectionContext.isLegacy) {
        messageToReturn = null;
      }

      break;

    case messageTypes.default.SUBSCRIPTION_SUCCESS:
      if (!connectionContext.isLegacy) {
        messageToReturn = null;
      }

      break;
  }

  return messageToReturn;
};
});

var server = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionServer = void 0;



















var isWebSocketServer = function (socket) {
  return socket.on;
};

var SubscriptionServer = function () {
  function SubscriptionServer(options, socketOptionsOrServer) {
    var _this = this;

    var onOperation = options.onOperation,
        onOperationComplete = options.onOperationComplete,
        onConnect = options.onConnect,
        onDisconnect = options.onDisconnect,
        keepAlive = options.keepAlive;
    this.specifiedRules = options.validationRules || graphql_1__default['default'].specifiedRules;
    this.loadExecutor(options);
    this.onOperation = onOperation;
    this.onOperationComplete = onOperationComplete;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.keepAlive = keepAlive;

    if (isWebSocketServer(socketOptionsOrServer)) {
      this.wsServer = socketOptionsOrServer;
    } else {
      this.wsServer = new WebSocket__default['default'].Server(socketOptionsOrServer || {});
    }

    var connectionHandler = function (socket, request) {
      socket.upgradeReq = request;

      if (socket.protocol === undefined || socket.protocol.indexOf(protocol.GRAPHQL_WS) === -1 && socket.protocol.indexOf(protocol.GRAPHQL_SUBSCRIPTIONS) === -1) {
        socket.close(1002);
        return;
      }

      var connectionContext = Object.create(null);
      connectionContext.initPromise = Promise.resolve(true);
      connectionContext.isLegacy = false;
      connectionContext.socket = socket;
      connectionContext.request = request;
      connectionContext.operations = {};

      var connectionClosedHandler = function (error) {
        if (error) {
          _this.sendError(connectionContext, '', {
            message: error.message ? error.message : error
          }, messageTypes.default.GQL_CONNECTION_ERROR);

          setTimeout(function () {
            connectionContext.socket.close(1011);
          }, 10);
        }

        _this.onClose(connectionContext);

        if (_this.onDisconnect) {
          _this.onDisconnect(socket, connectionContext);
        }
      };

      socket.on('error', connectionClosedHandler);
      socket.on('close', connectionClosedHandler);
      socket.on('message', _this.onMessage(connectionContext));
    };

    this.wsServer.on('connection', connectionHandler);

    this.closeHandler = function () {
      _this.wsServer.removeListener('connection', connectionHandler);

      _this.wsServer.close();
    };
  }

  SubscriptionServer.create = function (options, socketOptionsOrServer) {
    return new SubscriptionServer(options, socketOptionsOrServer);
  };

  Object.defineProperty(SubscriptionServer.prototype, "server", {
    get: function () {
      return this.wsServer;
    },
    enumerable: false,
    configurable: true
  });

  SubscriptionServer.prototype.close = function () {
    this.closeHandler();
  };

  SubscriptionServer.prototype.loadExecutor = function (options) {
    var execute = options.execute,
        subscribe = options.subscribe,
        schema = options.schema,
        rootValue = options.rootValue;

    if (!execute) {
      throw new Error('Must provide `execute` for websocket server constructor.');
    }

    this.schema = schema;
    this.rootValue = rootValue;
    this.execute = execute;
    this.subscribe = subscribe;
  };

  SubscriptionServer.prototype.unsubscribe = function (connectionContext, opId) {
    if (connectionContext.operations && connectionContext.operations[opId]) {
      if (connectionContext.operations[opId].return) {
        connectionContext.operations[opId].return();
      }

      delete connectionContext.operations[opId];

      if (this.onOperationComplete) {
        this.onOperationComplete(connectionContext.socket, opId);
      }
    }
  };

  SubscriptionServer.prototype.onClose = function (connectionContext) {
    var _this = this;

    Object.keys(connectionContext.operations).forEach(function (opId) {
      _this.unsubscribe(connectionContext, opId);
    });
  };

  SubscriptionServer.prototype.onMessage = function (connectionContext) {
    var _this = this;

    return function (message) {
      var parsedMessage;

      try {
        parsedMessage = parseLegacyProtocol.parseLegacyProtocolMessage(connectionContext, JSON.parse(message));
      } catch (e) {
        _this.sendError(connectionContext, null, {
          message: e.message
        }, messageTypes.default.GQL_CONNECTION_ERROR);

        return;
      }

      var opId = parsedMessage.id;

      switch (parsedMessage.type) {
        case messageTypes.default.GQL_CONNECTION_INIT:
          if (_this.onConnect) {
            connectionContext.initPromise = new Promise(function (resolve, reject) {
              try {
                resolve(_this.onConnect(parsedMessage.payload, connectionContext.socket, connectionContext));
              } catch (e) {
                reject(e);
              }
            });
          }

          connectionContext.initPromise.then(function (result) {
            if (result === false) {
              throw new Error('Prohibited connection!');
            }

            _this.sendMessage(connectionContext, undefined, messageTypes.default.GQL_CONNECTION_ACK, undefined);

            if (_this.keepAlive) {
              _this.sendKeepAlive(connectionContext);

              var keepAliveTimer_1 = setInterval(function () {
                if (connectionContext.socket.readyState === WebSocket__default['default'].OPEN) {
                  _this.sendKeepAlive(connectionContext);
                } else {
                  clearInterval(keepAliveTimer_1);
                }
              }, _this.keepAlive);
            }
          }).catch(function (error) {
            _this.sendError(connectionContext, opId, {
              message: error.message
            }, messageTypes.default.GQL_CONNECTION_ERROR);

            setTimeout(function () {
              connectionContext.socket.close(1011);
            }, 10);
          });
          break;

        case messageTypes.default.GQL_CONNECTION_TERMINATE:
          connectionContext.socket.close();
          break;

        case messageTypes.default.GQL_START:
          connectionContext.initPromise.then(function (initResult) {
            if (connectionContext.operations && connectionContext.operations[opId]) {
              _this.unsubscribe(connectionContext, opId);
            }

            var baseParams = {
              query: parsedMessage.payload.query,
              variables: parsedMessage.payload.variables,
              operationName: parsedMessage.payload.operationName,
              context: isObject_1.default(initResult) ? Object.assign(Object.create(Object.getPrototypeOf(initResult)), initResult) : {},
              formatResponse: undefined,
              formatError: undefined,
              callback: undefined,
              schema: _this.schema
            };
            var promisedParams = Promise.resolve(baseParams);
            connectionContext.operations[opId] = emptyIterable.createEmptyIterable();

            if (_this.onOperation) {
              var messageForCallback = parsedMessage;
              promisedParams = Promise.resolve(_this.onOperation(messageForCallback, baseParams, connectionContext.socket));
            }

            return promisedParams.then(function (params) {
              if (typeof params !== 'object') {
                var error = "Invalid params returned from onOperation! return values must be an object!";

                _this.sendError(connectionContext, opId, {
                  message: error
                });

                throw new Error(error);
              }

              if (!params.schema) {
                var error = 'Missing schema information. The GraphQL schema should be provided either statically in' + ' the `SubscriptionServer` constructor or as a property on the object returned from onOperation!';

                _this.sendError(connectionContext, opId, {
                  message: error
                });

                throw new Error(error);
              }

              var document = typeof baseParams.query !== 'string' ? baseParams.query : graphql_1__default['default'].parse(baseParams.query);
              var executionPromise;
              var validationErrors = graphql_1__default['default'].validate(params.schema, document, _this.specifiedRules);

              if (validationErrors.length > 0) {
                executionPromise = Promise.resolve({
                  errors: validationErrors
                });
              } else {
                var executor = _this.execute;

                if (_this.subscribe && isSubscriptions.isASubscriptionOperation(document, params.operationName)) {
                  executor = _this.subscribe;
                }

                executionPromise = Promise.resolve(executor(params.schema, document, _this.rootValue, params.context, params.variables, params.operationName));
              }

              return executionPromise.then(function (executionResult) {
                return {
                  executionIterable: iterall_1.isAsyncIterable(executionResult) ? executionResult : iterall_1.createAsyncIterator([executionResult]),
                  params: params
                };
              });
            }).then(function (_a) {
              var executionIterable = _a.executionIterable,
                  params = _a.params;
              iterall_1.forAwaitEach(executionIterable, function (value) {
                var result = value;

                if (params.formatResponse) {
                  try {
                    result = params.formatResponse(value, params);
                  } catch (err) {
                    console.error('Error in formatResponse function:', err);
                  }
                }

                _this.sendMessage(connectionContext, opId, messageTypes.default.GQL_DATA, result);
              }).then(function () {
                _this.sendMessage(connectionContext, opId, messageTypes.default.GQL_COMPLETE, null);
              }).catch(function (e) {
                var error = e;

                if (params.formatError) {
                  try {
                    error = params.formatError(e, params);
                  } catch (err) {
                    console.error('Error in formatError function: ', err);
                  }
                }

                if (Object.keys(error).length === 0) {
                  error = {
                    name: error.name,
                    message: error.message
                  };
                }

                _this.sendError(connectionContext, opId, error);
              });
              return executionIterable;
            }).then(function (subscription) {
              connectionContext.operations[opId] = subscription;
            }).then(function () {
              _this.sendMessage(connectionContext, opId, messageTypes.default.SUBSCRIPTION_SUCCESS, undefined);
            }).catch(function (e) {
              if (e.errors) {
                _this.sendMessage(connectionContext, opId, messageTypes.default.GQL_DATA, {
                  errors: e.errors
                });
              } else {
                _this.sendError(connectionContext, opId, {
                  message: e.message
                });
              }

              _this.unsubscribe(connectionContext, opId);

              return;
            });
          }).catch(function (error) {
            _this.sendError(connectionContext, opId, {
              message: error.message
            });

            _this.unsubscribe(connectionContext, opId);
          });
          break;

        case messageTypes.default.GQL_STOP:
          _this.unsubscribe(connectionContext, opId);

          break;

        default:
          _this.sendError(connectionContext, opId, {
            message: 'Invalid message type!'
          });

      }
    };
  };

  SubscriptionServer.prototype.sendKeepAlive = function (connectionContext) {
    if (connectionContext.isLegacy) {
      this.sendMessage(connectionContext, undefined, messageTypes.default.KEEP_ALIVE, undefined);
    } else {
      this.sendMessage(connectionContext, undefined, messageTypes.default.GQL_CONNECTION_KEEP_ALIVE, undefined);
    }
  };

  SubscriptionServer.prototype.sendMessage = function (connectionContext, opId, type, payload) {
    var parsedMessage = parseLegacyProtocol.parseLegacyProtocolMessage(connectionContext, {
      type: type,
      id: opId,
      payload: payload
    });

    if (parsedMessage && connectionContext.socket.readyState === WebSocket__default['default'].OPEN) {
      connectionContext.socket.send(JSON.stringify(parsedMessage));
    }
  };

  SubscriptionServer.prototype.sendError = function (connectionContext, opId, errorPayload, overrideDefaultErrorType) {
    var sanitizedOverrideDefaultErrorType = overrideDefaultErrorType || messageTypes.default.GQL_ERROR;

    if ([messageTypes.default.GQL_CONNECTION_ERROR, messageTypes.default.GQL_ERROR].indexOf(sanitizedOverrideDefaultErrorType) === -1) {
      throw new Error('overrideDefaultErrorType should be one of the allowed error messages' + ' GQL_CONNECTION_ERROR or GQL_ERROR');
    }

    this.sendMessage(connectionContext, opId, sanitizedOverrideDefaultErrorType, errorPayload);
  };

  return SubscriptionServer;
}();

exports.SubscriptionServer = SubscriptionServer;
});

var dist = createCommonjsModule(function (module, exports) {

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

var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(client$2, exports);

__exportStar(server, exports);



Object.defineProperty(exports, "MessageTypes", {
  enumerable: true,
  get: function () {
    return messageTypes.default;
  }
});

__exportStar(protocol, exports);
});

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
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

var conversions = convert$1;

// Hide .channels and .labels properties
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

	const {channels, labels} = convert$1[model];
	delete convert$1[model].channels;
	delete convert$1[model].labels;
	Object.defineProperty(convert$1[model], 'channels', {value: channels});
	Object.defineProperty(convert$1[model], 'labels', {value: labels});
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
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
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
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert$1.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(colorName)) {
		const value = colorName[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
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
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

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

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
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
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert$1.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
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
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert$1.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
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
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
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

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

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

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
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

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

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
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert$1.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

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
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert$1.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

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
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert$1.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
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

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

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
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
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
	} else
	if (l >= 0.5 && l < 1.0) {
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
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert$1.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
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
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
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
}

// https://en.wikipedia.org/wiki/Breadth-first_search
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
	};

	// Preserve .conversion property if there is one
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

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

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
	};

	// Alias bright black as gray (and grey)
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
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});
});

const stringReplaceAll$1 = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex$1 = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

var util = {
	stringReplaceAll: stringReplaceAll$1,
	stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
};

const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	const u = c[0] === 'u';
	const bracket = c[1] === '{';

	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	if (u && bracket) {
		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, arguments_) {
	const results = [];
	const chunks = arguments_.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		const number = Number(chunk);
		if (!Number.isNaN(number)) {
			results.push(number);
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const [styleName, styles] of Object.entries(enabled)) {
		if (!Array.isArray(styles)) {
			continue;
		}

		if (!(styleName in current)) {
			throw new Error(`Unknown Chalk style: ${styleName}`);
		}

		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
	}

	return current;
}

var templates = (chalk, temporary) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
		if (escapeCharacter) {
			chunk.push(unescape(escapeCharacter));
		} else if (style) {
			const string = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(character);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};

const {stdout: stdoutColor, stderr: stderrColor} = supportsColor_1;
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = util;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level > 3 || options.level < 0) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!Array.isArray(firstString)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = templates;
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

// For TypeScript
chalk.Level = {
	None: 0,
	Basic: 1,
	Ansi256: 2,
	TrueColor: 3,
	0: 'None',
	1: 'Basic',
	2: 'Ansi256',
	3: 'TrueColor'
};

var source = chalk;

function getDiff(oldVal, newVal) {
  const options = {
    aAnnotation: `Original`,
    bAnnotation: `Modified`,
    aColor: source.red,
    bColor: source.green,
    includeChangeCounts: true,
    contextLines: 3,
    expand: false
  };
  let diffText = diff__default['default'](oldVal, newVal, options);

  if (process.env.GATSBY_RECIPES_NO_COLOR) {
    diffText = stripAnsi__default['default'](diffText);
  }

  return diffText;
}

var resourceSchema = {
  id: Joi__namespace.string(),
  key: Joi__namespace.string(),
  _key: Joi__namespace.string(),
  _message: Joi__namespace.string()
};

const makePath$2 = (root, relativePath) => path__default['default'].join(root, relativePath);

const fileExists$3 = fullPath => {
  try {
    fs__default['default'].accessSync(fullPath, fs__default['default'].constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const downloadFile = async (url, filePath) => fetch__default['default'](url).then(res => new Promise((resolve, reject) => {
  const dest = fs__default['default'].createWriteStream(filePath);
  res.body.pipe(dest);
  dest.on(`finish`, () => {
    resolve(true);
  });
  dest.on(`error`, reject);
}));

const create$d = async ({
  root
}, {
  id,
  path: filePath,
  content
}) => {
  const fullPath = makePath$2(root, filePath);
  const {
    dir
  } = path__default['default'].parse(fullPath);
  await mkdirp__default['default'](dir);

  if (isUrl__default['default'](content)) {
    await downloadFile(content, fullPath);
  } else {
    await fs__default['default'].ensureFile(fullPath);
    await fs__default['default'].writeFile(fullPath, content);
  }

  return await read$d({
    root
  }, filePath);
};

const update$3 = async (context, resource) => {
  const fullPath = makePath$2(context.root, resource.id);
  await fs__default['default'].writeFile(fullPath, resource.content);
  return await read$d(context, resource.id);
};

const read$d = async (context, id) => {
  const fullPath = makePath$2(context.root, id);
  let content = ``;

  if (fileExists$3(fullPath)) {
    content = await fs__default['default'].readFile(fullPath, `utf8`);
  } else {
    return undefined;
  }

  const resource = {
    id,
    path: id,
    content
  };
  resource._message = message$7(resource);
  return resource;
};

const destroy$d = async (context, fileResource) => {
  const fullPath = makePath$2(context.root, fileResource.id);
  await fs__default['default'].unlink(fullPath);
  return fileResource;
}; // TODO pass action to plan


const plan$d = async (context, {
  id,
  path: filePath,
  content
}) => {
  let currentResource;

  if (!isBinaryPath__default['default'](filePath)) {
    currentResource = await read$d(context, filePath);
  } else {
    currentResource = `Binary file`;
  }

  let newState = content;

  if (isUrl__default['default'](content)) {
    if (!isBinaryPath__default['default'](filePath)) {
      const res = await fetch__default['default'](content);
      newState = await res.text();
    } else {
      newState = `Binary file`;
    }
  }

  const plan = {
    currentState: currentResource && currentResource.content || ``,
    newState,
    describe: `Write ${filePath}`,
    diff: ``
  };

  if (plan.currentState !== plan.newState) {
    plan.diff = getDiff(plan.currentState, plan.newState);
  }

  return plan;
};

const message$7 = resource => `Wrote file ${resource.path}`;

const schema$d = {
  path: Joi__namespace.string(),
  content: Joi__namespace.string(),
  ...resourceSchema
};
const validate$d = resource => Joi__namespace.validate(resource, schema$d, {
  abortEarly: false
});

var file = /*#__PURE__*/Object.freeze({
  __proto__: null,
  plan: plan$d,
  validate: validate$d,
  schema: schema$d,
  exists: fileExists$3,
  create: create$d,
  update: update$3,
  read: read$d,
  destroy: destroy$d
});

const makePath$1 = (root, relativePath) => path__default['default'].join(root, relativePath);

const directoryExists = fullPath => {
  try {
    fs__default['default'].accessSync(fullPath, fs__default['default'].constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const create$c = async ({
  root
}, {
  id,
  path: directoryPath
}) => {
  const fullPath = makePath$1(root, directoryPath);
  await fs__default['default'].ensureDir(fullPath);
  return read$c({
    root
  }, directoryPath);
};

const update$2 = async (context, resource) => {
  // TODO figure out how to move directories when it shifts
  // probably update needs to be called with the previous version
  // of the resource.
  //
  // Also Directory needs a key.
  const fullPath = makePath$1(context.root, resource.id);
  await fs__default['default'].ensureDir(fullPath);
  return read$c(context, resource.id);
};

const read$c = async (context, id) => {
  const fullPath = makePath$1(context.root, id);

  if (!directoryExists(fullPath)) {
    return undefined;
  }

  const resource = {
    id,
    path: id
  };
  resource._message = message$6(resource);
  return resource;
};

const destroy$c = async (context, directoryResource) => {
  const fullPath = makePath$1(context.root, directoryResource.id);
  await fs__default['default'].rmdir(fullPath);
  return directoryResource;
};

const plan$c = async (context, {
  id,
  path: directoryPath
}) => {
  const plan = {
    describe: `Create directory "${directoryPath}"`
  };
  return plan;
};

const message$6 = resource => `Created directory "${resource.path}"`;

const schema$c = {
  path: Joi__namespace.string(),
  ...resourceSchema
};
const validate$c = resource => Joi__namespace.validate(resource, schema$c, {
  abortEarly: false
});

var directory = /*#__PURE__*/Object.freeze({
  __proto__: null,
  plan: plan$c,
  validate: validate$c,
  schema: schema$c,
  create: create$c,
  update: update$2,
  read: read$c,
  destroy: destroy$c
});

const REQUIRES_KEYS = [`gatsby-source-filesystem`, `gatsby-plugin-page-creator`];

const create$b = () => {};
const update$1 = () => {};
const read$b = async ({
  root
}, id) => {
  const result = await queryDevelopAPI({
    root
  }, `
  {
    sitePage(id: { eq: "${id}" }) {
        path
        component
        internalComponentName
        componentChunkName
        matchPath
        id
        componentPath
        isCreatedByStatefulCreatePages
        pluginCreator {
          name
        }
  }
  }
  `);
  return result.data.sitePage;
};
const destroy$b = () => {};
const config$5 = {};

const queryDevelopAPI = async ({
  root
}, query) => {
  const {
    port
  } = await gatsbyCoreUtils.getService(root, `developproxy`);
  const res = await fetch__default['default'](`http://localhost:${port}/___graphql`, {
    method: `POST`,
    body: JSON.stringify({
      query
    }),
    headers: {
      Accept: `application/json`,
      "Content-Type": `application/json`
    }
  });
  const body = await res.json();
  return body;
};

const all$9 = async ({
  root
}) => {
  const result = await queryDevelopAPI({
    root
  }, `
  {
    allSitePage {
      nodes {
        path
        component
        internalComponentName
        componentChunkName
        matchPath
        id
        componentPath
        isCreatedByStatefulCreatePages
        pluginCreator {
          name
        }
      }
    }
  }
  `);
  return result.data.allSitePage.nodes;
};
const schema$b = {
  internalComponentName: Joi__namespace.string(),
  path: Joi__namespace.string(),
  matchPath: Joi__namespace.string().optional(),
  component: Joi__namespace.string(),
  componentChunkName: Joi__namespace.string(),
  isCreatedByStatefulCreatePages: Joi__namespace.boolean(),
  pluginCreatorId: Joi__namespace.string(),
  componentPath: Joi__namespace.string(),
  pluginCreator: Joi__namespace.object({
    name: Joi__namespace.string()
  }),
  ...resourceSchema
};

const validate$b = resource => {
  if (REQUIRES_KEYS.includes(resource.name) && !resource.key) {
    return {
      error: `${resource.name} requires a key to be set`
    };
  }

  if (resource.key && resource.key === resource.name) {
    return {
      error: `${resource.name} requires a key to be different than the plugin name`
    };
  }

  return Joi__namespace.validate(resource, schema$b, {
    abortEarly: false
  });
};
const plan$b = async () => {
  return {};
};

var page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$b,
  update: update$1,
  read: read$b,
  destroy: destroy$b,
  config: config$5,
  all: all$9,
  schema: schema$b,
  validate: validate$b,
  plan: plan$b
});

const lockInstance = lock$1.Lock();
function lock(resources) {
  return new Promise(resolve => lockInstance(resources, release => {
    const releaseLock = release(() => {});
    resolve(releaseLock);
  }));
}

function isDefaultExport(node) {
  if (!node || !t__namespace.isMemberExpression(node)) {
    return false;
  }

  const {
    object,
    property
  } = node;
  if (!t__namespace.isIdentifier(object) || object.name !== `module`) return false;
  if (!t__namespace.isIdentifier(property) || property.name !== `exports`) return false;
  return true;
}

function buildPluginNode({
  name,
  options,
  key
}) {
  if (!options && !key) {
    return t__namespace.stringLiteral(name);
  }

  const pluginWithOptions = template__default['default'](`
    const foo = {
      resolve: '${name}',
      options: ${JSON.stringify(options, null, 2)},
      ${key ? `__key: "` + key + `"` : ``}
    }
  `, {
    placeholderPattern: false
  })();
  return pluginWithOptions.declarations[0].init;
}

const getKeyNameFromAttribute = node => node.key.name || node.key.value;

const unwrapTemplateLiteral = str => str.trim().replace(/^`/, ``).replace(/`$/, ``);

const isLiteral = node => t__namespace.isLiteral(node) || t__namespace.isStringLiteral(node) || t__namespace.isNumericLiteral(node);

const getValueFromNode = node => {
  if (t__namespace.isTemplateLiteral(node)) {
    delete node.leadingComments;
    delete node.trailingComments;
    const literalContents = generate__default['default'](node).code;
    return unwrapTemplateLiteral(literalContents);
  }

  if (isLiteral(node)) {
    return node.value;
  }

  if (node.type === `ArrayExpression`) {
    return node.elements.map(getObjectFromNode);
  }

  if (node.type === `ObjectExpression`) {
    return getObjectFromNode(node);
  }

  return null;
};

const getObjectFromNode = nodeValue => {
  if (!nodeValue || !nodeValue.properties) {
    return getValueFromNode(nodeValue);
  }

  const props = nodeValue.properties.reduce((acc, curr) => {
    let value = null;

    if (curr.value) {
      value = getValueFromNode(curr.value);
    } else if (t__namespace.isObjectExpression(curr.value)) {
      value = curr.value.expression.properties.reduce((acc, curr) => {
        acc[getKeyNameFromAttribute(curr)] = getObjectFromNode(curr);
        return acc;
      }, {});
    } else {
      throw new Error(`Did not recognize ${curr}`);
    }

    acc[getKeyNameFromAttribute(curr)] = value;
    return acc;
  }, {});
  return props;
};

const packageMangerConfigKey = `cli.packageManager`;
const PACKAGE_MANGER = gatsbyCoreUtils.getConfigStore().get(packageMangerConfigKey) || `yarn`;

const readPackageJson$2 = async (root, pkg) => {
  let obj;

  try {
    const fullPath = resolveFrom__default['default'](root, path__default['default'].join(pkg, `package.json`));
    const contents = await fs__default['default'].readFile(fullPath, `utf8`);
    obj = JSON.parse(contents);
  } catch (e) {// ignore
  }

  return obj;
};

const getPackageNames = packages => packages.map(n => `${n.name}@${n.version}`); // Generate install commands


const generateClientComands = ({
  packageManager,
  depType,
  packageNames
}) => {
  const commands = [];

  if (packageManager === `yarn`) {
    commands.push(`add`); // Needed for Yarn Workspaces and is a no-opt elsewhere.

    commands.push(`-W`);

    if (depType === `development`) {
      commands.push(`--dev`);
    }

    return commands.concat(packageNames);
  } else if (packageManager === `npm`) {
    commands.push(`install`);

    if (depType === `development`) {
      commands.push(`--save-dev`);
    }

    return commands.concat(packageNames);
  }

  return undefined;
};
let installs = [];

const executeInstalls = async root => {
  const types = ___default['default'].groupBy(installs, c => c.resource.dependencyType); // Grab the key of the first install & delete off installs these packages
  // then run intall
  // when done, check again & call executeInstalls again.


  const depType = installs[0].resource.dependencyType;
  const packagesToInstall = types[depType];
  installs = installs.filter(i => !packagesToInstall.some(p => i.resource.name === p.resource.name));
  const pkgs = packagesToInstall.map(p => p.resource);
  const packageNames = getPackageNames(pkgs);
  const commands = generateClientComands({
    packageNames,
    depType,
    packageManager: PACKAGE_MANGER
  });
  const release = await lock(`package.json`);

  try {
    await execa__default['default'](PACKAGE_MANGER, commands, {
      cwd: root
    });
  } catch (e) {
    // A package failed so call the rejects
    return packagesToInstall.forEach(p => {
      p.outsideReject(JSON.stringify({
        message: e.shortMessage,
        installationError: `Could not install package`
      }));
    });
  }

  release();
  packagesToInstall.forEach(p => p.outsideResolve()); // Run again if there's still more installs.

  if (installs.length > 0) {
    executeInstalls(root);
  }

  return undefined;
};

const debouncedExecute = ___default['default'].debounce(executeInstalls, 25); // Collect installs run at the same time so we can batch them.


const createInstall = async ({
  root
}, resource) => {
  let outsideResolve;
  let outsideReject;
  const promise = new Promise((resolve, reject) => {
    outsideResolve = resolve;
    outsideReject = reject;
  });
  installs.push({
    outsideResolve,
    outsideReject,
    resource
  });
  debouncedExecute(root);
  return promise;
};

const create$a = async ({
  root
}, resource) => {
  const {
    err,
    value
  } = validate$a(resource);

  if (err) {
    return err;
  }

  await createInstall({
    root
  }, value);
  return read$a({
    root
  }, value.name);
};

const read$a = async ({
  root
}, id) => {
  const pkg = await readPackageJson$2(root, id);

  if (pkg) {
    return {
      id,
      name: id,
      description: pkg.description,
      version: pkg.version,
      _message: `Installed NPM package ${id}@${pkg.version}`
    };
  } else {
    return undefined;
  }
};

const schema$a = {
  name: Joi__namespace.string().required(),
  version: Joi__namespace.string().default(`latest`, `Defaults to "latest"`),
  dependencyType: Joi__namespace.string().default(`dependency`, `defaults to regular dependency`),
  description: Joi__namespace.string(),
  ...resourceSchema
};
const validate$a = resource => Joi__namespace.validate(resource, schema$a, {
  abortEarly: false
});

const destroy$a = async ({
  root
}, resource) => {
  const readResource = await read$a({
    root
  }, resource.id);

  if (!readResource) {
    return undefined;
  }

  await execa__default['default'](`yarn`, [`remove`, resource.name, `-W`], {
    cwd: root
  });
  return readResource;
};
const config$4 = {};
const plan$a = async (context, resource) => {
  const {
    value: {
      name,
      version
    }
  } = validate$a(resource);
  const currentState = await read$a(context, resource.name);
  return {
    currentState: currentState && `${currentState.name}@${currentState.version}`,
    newState: `${name}@${version}`,
    describe: `Install ${name}@${version}`
  };
};

var _package = /*#__PURE__*/Object.freeze({
  __proto__: null,
  generateClientComands: generateClientComands,
  validate: validate$a,
  schema: schema$a,
  create: create$a,
  update: create$a,
  read: read$a,
  destroy: destroy$a,
  config: config$4,
  plan: plan$a
});

const fileExists$2 = filePath => fs__default['default'].existsSync(filePath);

const listShadowableFilesForTheme = (directory, theme) => {
  const themePath = path__default['default'].dirname(require.resolve(gatsbyCoreUtils.slash(path__default['default'].join(theme, `package.json`)), {
    paths: [directory]
  }));
  const themeSrcPath = path__default['default'].join(themePath, `src`);
  const shadowableThemeFiles = glob__default['default'].sync(themeSrcPath + `/**/*.*`, {
    follow: true
  });

  const toShadowPath = filePath => {
    const relativeFilePath = gatsbyCoreUtils.slash(filePath).replace(gatsbyCoreUtils.slash(themeSrcPath), ``);
    return path__default['default'].join(`src`, theme, relativeFilePath);
  };

  const shadowPaths = shadowableThemeFiles.map(toShadowPath);
  const shadowedFiles = shadowPaths.filter(fileExists$2);
  const shadowableFiles = shadowPaths.filter(filePath => !fileExists$2(filePath));
  return {
    shadowedFiles,
    shadowableFiles
  };
};

const getOptionsForPlugin = node => {
  if (!t__namespace.isObjectExpression(node) && !t__namespace.isLogicalExpression(node)) {
    return undefined;
  }

  let options; // When a plugin is added conditionally with && {}

  if (t__namespace.isLogicalExpression(node)) {
    options = node.right.properties.find(property => property.key.name === `options`);
  } else {
    options = node.properties.find(property => property.key.name === `options`);
  }

  if (options) {
    return getObjectFromNode(options.value);
  }

  return undefined;
};

const getPlugin = node => {
  const plugin = {
    name: getNameForPlugin(node),
    options: getOptionsForPlugin(node)
  };
  const key = getKeyForPlugin(node);

  if (key) {
    return { ...plugin,
      key
    };
  }

  return plugin;
};

const getKeyForPlugin = node => {
  if (t__namespace.isObjectExpression(node)) {
    const key = node.properties.find(p => p.key.name === `__key`);
    return key ? getValueFromNode(key.value) : null;
  } // When a plugin is added conditionally with && {}


  if (t__namespace.isLogicalExpression(node)) {
    const key = node.right.properties.find(p => p.key.name === `__key`);
    return key ? getValueFromNode(key.value) : null;
  }

  return null;
};

const getNameForPlugin = node => {
  if (t__namespace.isStringLiteral(node) || t__namespace.isTemplateLiteral(node)) {
    return getValueFromNode(node);
  }

  if (t__namespace.isObjectExpression(node)) {
    const resolve = node.properties.find(p => p.key.name === `resolve`);
    return resolve ? getValueFromNode(resolve.value) : null;
  } // When a plugin is added conditionally with && {}


  if (t__namespace.isLogicalExpression(node)) {
    const resolve = node.right.properties.find(p => p.key.name === `resolve`);
    return resolve ? getValueFromNode(resolve.value) : null;
  }

  return null;
};

const getDescriptionForPlugin = async (root, name) => {
  const pkg = await read$a(root, name);
  return (pkg === null || pkg === void 0 ? void 0 : pkg.description) || ``;
};

const readmeCache = new Map();

const getPath = (module, file, root) => {
  try {
    return require.resolve(`${module}/${file}`, {
      paths: [root]
    });
  } catch (e) {
    return undefined;
  }
};

const getReadmeForPlugin = async (root, name) => {
  if (readmeCache.has(name)) {
    return readmeCache.get(name);
  }

  let readmePath;
  const readmes = [`readme.txt`, `readme`, `readme.md`, `README`, `README.md`];

  while (!readmePath && readmes.length) {
    readmePath = getPath(name, readmes.pop(), root);
  }

  try {
    if (readmePath) {
      const readme = await fs__default['default'].readFile(readmePath, `utf8`);

      if (readme) {
        readmeCache.set(name, readme);
      }

      return readme;
    }

    const readme = await fetch__default['default'](`https://unpkg.com/${name}/README.md`).then(res => res.text()).catch(() => null);

    if (readme) {
      readmeCache.set(name, readme);
    }

    return readme || ``;
  } catch (err) {
    return ``;
  }
};

const addPluginToConfig = (src, {
  name,
  options,
  key
}) => {
  const addPlugins = new BabelPluginAddPluginsToGatsbyConfig({
    pluginOrThemeName: name,
    options,
    shouldAdd: true,
    key
  });
  const {
    code
  } = require$$0.transform(src, {
    plugins: [addPlugins.plugin],
    configFile: false
  });
  return code;
};

const removePluginFromConfig = (src, {
  id,
  name,
  key
}) => {
  const addPlugins = new BabelPluginAddPluginsToGatsbyConfig({
    pluginOrThemeName: name || id,
    key,
    shouldAdd: false
  });
  const {
    code
  } = require$$0.transform(src, {
    plugins: [addPlugins.plugin],
    configFile: false
  });
  return code;
};

const getPluginsFromConfig = src => {
  const getPlugins = new BabelPluginGetPluginsFromGatsbyConfig();
  require$$0.transform(src, {
    plugins: [getPlugins.plugin],
    configFile: false
  });
  return getPlugins.state;
};

const getConfigPath$1 = root => path__default['default'].join(root, `gatsby-config.js`);

const defaultConfig = `/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  plugins: [],
}`;

const readConfigFile$1 = async root => {
  let src;

  try {
    src = await fs__default['default'].readFile(getConfigPath$1(root), `utf8`);
  } catch (e) {
    if (e.code === `ENOENT`) {
      src = defaultConfig;
    } else {
      throw e;
    }
  }

  if (src === ``) {
    src = defaultConfig;
  }

  return src;
};

class MissingInfoError extends Error {
  constructor(foo = `bar`, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params); // Maintains proper stack trace for where our error was thrown (only available on V8)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingInfoError);
    }

    this.name = `MissingInfoError`; // Custom debugging information

    this.foo = foo;
    this.date = new Date();
  }

}

const create$9 = async ({
  root
}, {
  name,
  options,
  key
}) => {
  const release = await lock(`gatsby-config.js`); // TODO generalize this — it's for the demo.

  if ((options === null || options === void 0 ? void 0 : options.accessToken) === `(Known after install)`) {
    throw new MissingInfoError({
      name,
      options,
      key
    });
  }

  const configSrc = await readConfigFile$1(root);
  const prettierConfig = await prettier__default['default'].resolveConfig(root);
  let code = addPluginToConfig(configSrc, {
    name,
    options,
    key
  });
  code = prettier__default['default'].format(code, { ...prettierConfig,
    parser: `babel`
  });
  await fs__default['default'].writeFile(getConfigPath$1(root), code);
  const config = await read$9({
    root
  }, key || name);
  release();
  return config;
};

const read$9 = async ({
  root
}, id) => {
  try {
    const configSrc = await readConfigFile$1(root);
    const plugin = getPluginsFromConfig(configSrc).find(plugin => plugin.key === id || plugin.name === id);

    if (plugin !== null && plugin !== void 0 && plugin.name) {
      const [description, readme] = await Promise.all([getDescriptionForPlugin(root, id), getReadmeForPlugin(root, id)]);
      const {
        shadowedFiles,
        shadowableFiles
      } = listShadowableFilesForTheme(root, plugin.name);
      return {
        id,
        description,
        readme,
        ...plugin,
        shadowedFiles,
        shadowableFiles,
        _message: `Installed ${id} in gatsby-config.js`
      };
    } else {
      return undefined;
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const destroy$9 = async ({
  root
}, resource) => {
  const configSrc = await readConfigFile$1(root);
  const newSrc = removePluginFromConfig(configSrc, resource);
  await fs__default['default'].writeFile(getConfigPath$1(root), newSrc);
};

class BabelPluginAddPluginsToGatsbyConfig {
  constructor({
    pluginOrThemeName,
    shouldAdd,
    options,
    key
  }) {
    this.plugin = require$$0$1.declare(api => {
      api.assertVersion(7);
      return {
        visitor: {
          ExpressionStatement(path) {
            const {
              node
            } = path;
            const {
              left,
              right
            } = node.expression;

            if (!isDefaultExport(left)) {
              return;
            }

            const pluginNodes = right.properties.find(p => p.key.name === `plugins`);

            if (shouldAdd) {
              if (t__namespace.isCallExpression(pluginNodes.value)) {
                const plugins = pluginNodes.value.callee.object.elements.map(getPlugin);
                const matches = plugins.filter(plugin => {
                  if (!key) {
                    return plugin.name === pluginOrThemeName;
                  }

                  return plugin.key === key;
                });

                if (!matches.length) {
                  const pluginNode = buildPluginNode({
                    name: pluginOrThemeName,
                    options,
                    key
                  });
                  pluginNodes.value.callee.object.elements.push(pluginNode);
                } else {
                  pluginNodes.value.callee.object.elements = pluginNodes.value.callee.object.elements.map(node => {
                    const plugin = getPlugin(node);

                    if (plugin.key !== key) {
                      return node;
                    }

                    if (!plugin.key && plugin.name !== pluginOrThemeName) {
                      return node;
                    }

                    return buildPluginNode({
                      name: pluginOrThemeName,
                      options,
                      key
                    });
                  });
                }
              } else {
                const plugins = pluginNodes.value.elements.map(getPlugin);
                const matches = plugins.filter(plugin => {
                  if (!key) {
                    return plugin.name === pluginOrThemeName;
                  }

                  return plugin.key === key;
                });

                if (!matches.length) {
                  const pluginNode = buildPluginNode({
                    name: pluginOrThemeName,
                    options,
                    key
                  });
                  pluginNodes.value.elements.push(pluginNode);
                } else {
                  pluginNodes.value.elements = pluginNodes.value.elements.map(node => {
                    const plugin = getPlugin(node);

                    if (plugin.key !== key) {
                      return node;
                    }

                    if (!plugin.key && plugin.name !== pluginOrThemeName) {
                      return node;
                    }

                    return buildPluginNode({
                      name: pluginOrThemeName,
                      options,
                      key
                    });
                  });
                }
              }
            } else {
              if (t__namespace.isCallExpression(pluginNodes.value)) {
                pluginNodes.value.callee.object.elements = pluginNodes.value.callee.object.elements.filter(node => {
                  const plugin = getPlugin(node);

                  if (key) {
                    return plugin.key !== key;
                  }

                  return plugin.name !== pluginOrThemeName;
                });
              } else {
                pluginNodes.value.elements = pluginNodes.value.elements.filter(node => {
                  const plugin = getPlugin(node);

                  if (key) {
                    return plugin.key !== key;
                  }

                  return plugin.name !== pluginOrThemeName;
                });
              }
            }

            path.stop();
          }

        }
      };
    });
  }

}

class BabelPluginGetPluginsFromGatsbyConfig {
  constructor() {
    this.state = [];
    this.plugin = require$$0$1.declare(api => {
      api.assertVersion(7);
      return {
        visitor: {
          ExpressionStatement: path => {
            const {
              node
            } = path;
            const {
              left,
              right
            } = node.expression;

            if (!isDefaultExport(left)) {
              return;
            }

            const plugins = right.properties.find(p => p.key.name === `plugins`);
            let pluginsList = [];

            if (t__namespace.isCallExpression(plugins.value)) {
              var _plugins$value$callee;

              pluginsList = (_plugins$value$callee = plugins.value.callee.object) === null || _plugins$value$callee === void 0 ? void 0 : _plugins$value$callee.elements;
            } else {
              pluginsList = plugins.value.elements;
            }

            if (!pluginsList) {
              throw new Error(`Your gatsby-config.js format is currently not supported by Gatsby Admin. Please share your gatsby-config.js file via the "Send feedback" button. Thanks!`);
            }

            pluginsList.map(node => {
              this.state.push(getPlugin(node));
            });
          }
        }
      };
    });
  }

}
const config$3 = {};
const all$8 = async ({
  root
}, processPlugins = true) => {
  const configSrc = await readConfigFile$1(root);
  const plugins = getPluginsFromConfig(configSrc);
  return Promise.all(plugins.map(({
    name
  }) => processPlugins ? read$9({
    root
  }, name) : name));
};
const schema$9 = {
  name: Joi__namespace.string(),
  description: Joi__namespace.string().optional().allow(null).allow(``),
  options: Joi__namespace.object(),
  isLocal: Joi__namespace.boolean(),
  readme: Joi__namespace.string().optional().allow(null).allow(``),
  shadowableFiles: Joi__namespace.array().items(Joi__namespace.string()),
  shadowedFiles: Joi__namespace.array().items(Joi__namespace.string()),
  ...resourceSchema
};

const validate$9 = resource => {
  if (REQUIRES_KEYS.includes(resource.name) && !resource._key) {
    return {
      error: `${resource.name} requires a key to be set`
    };
  }

  if (resource._key && resource._key === resource.name) {
    return {
      error: `${resource.name} requires a key to be different than the plugin name`
    };
  }

  return Joi__namespace.validate(resource, schema$9, {
    abortEarly: false
  });
};
const plan$9 = async ({
  root
}, {
  id,
  key,
  name,
  options,
  isLocal = false
}) => {
  const fullName = id || name;
  const prettierConfig = await prettier__default['default'].resolveConfig(root);
  let configSrc = await readConfigFile$1(root);
  configSrc = prettier__default['default'].format(configSrc, { ...prettierConfig,
    parser: `babel`
  });
  let newContents = addPluginToConfig(configSrc, {
    id,
    key: id || key,
    name: fullName,
    options
  });
  newContents = prettier__default['default'].format(newContents, { ...prettierConfig,
    parser: `babel`
  });
  const diff = await getDiff(configSrc, newContents);
  return {
    id: fullName,
    name,
    diff,
    currentState: configSrc,
    newState: newContents,
    describe: `Install ${fullName} in gatsby-config.js`,
    dependsOn: isLocal ? null : [{
      resourceName: `NPMPackage`,
      name
    }]
  };
};

var plugin = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addPluginToConfig: addPluginToConfig,
  getPluginsFromConfig: getPluginsFromConfig,
  removePluginFromConfig: removePluginFromConfig,
  create: create$9,
  update: create$9,
  read: read$9,
  destroy: destroy$9,
  config: config$3,
  all: all$8,
  schema: schema$9,
  validate: validate$9,
  plan: plan$9
});

const fileExists$1 = filePath => fs__default['default'].existsSync(filePath);

const relativePathForShadowedFile = ({
  theme,
  filePath
}) => {
  // eslint-disable-next-line
  const [_src, ...filePathParts] = filePath.split(`/`);
  const relativePath = path__default['default'].join(`src`, theme, path__default['default'].join(...filePathParts));
  return gatsbyCoreUtils.slash(relativePath);
};
const createPathToThemeFile = ({
  root,
  theme,
  filePath
}) => {
  // eslint-disable-next-line
  const fullPath = path__default['default'].join(root, `node_modules`, theme, filePath);
  return gatsbyCoreUtils.slash(fullPath);
};
const splitId = id => {
  // Remove src
  // eslint-disable-next-line
  const [_src, ...filePathParts] = id.split(`/`);
  let theme;
  let filePath; // Check if npm package is scoped

  if (filePathParts[0][0] === `@`) {
    theme = path__default['default'].join(filePathParts[0], filePathParts[1]);
    filePath = path__default['default'].join(...filePathParts.slice(2));
  } else {
    theme = filePathParts[0];
    filePath = path__default['default'].join(...filePathParts.slice(1));
  }

  return {
    theme: gatsbyCoreUtils.slash(theme),
    filePath: gatsbyCoreUtils.slash(filePath)
  };
};

const create$8 = async ({
  root
}, {
  theme,
  path: filePath
}) => {
  const id = relativePathForShadowedFile({
    filePath,
    theme
  });
  const fullFilePathToShadow = createPathToThemeFile({
    root,
    theme,
    filePath
  });
  const contents = await fs__default['default'].readFile(fullFilePathToShadow, `utf8`);
  const shadowedFilePath = path__default['default'].join(root, id);
  await fs__default['default'].ensureFile(shadowedFilePath);
  await fs__default['default'].writeFile(shadowedFilePath, contents);
  const result = await read$8({
    root
  }, id);
  return result;
};

const read$8 = async ({
  root
}, id) => {
  // eslint-disable-next-line
  const {
    theme,
    filePath
  } = splitId(id);
  const shadowedFilePath = path__default['default'].join(root, id);

  if (!fileExists$1(shadowedFilePath)) {
    return undefined;
  }

  const contents = await fs__default['default'].readFile(shadowedFilePath, `utf8`);
  const resource = {
    id,
    theme,
    path: id,
    contents
  };
  resource._message = message$5(resource);
  return resource;
};

const destroy$8 = async ({
  root
}, {
  id
}) => {
  const resource = await read$8({
    root
  }, id);
  await fs__default['default'].unlink(path__default['default'].join(root, id));
  return resource;
};

const schema$8 = {
  theme: Joi__namespace.string(),
  path: Joi__namespace.string(),
  contents: Joi__namespace.string(),
  ...resourceSchema
};
const validate$8 = resource => Joi__namespace.validate(resource, schema$8, {
  abortEarly: false
});

const message$5 = resource => `Shadowed ${resource.id || resource.path} from ${resource.theme}`;

const plan$8 = async ({
  root
}, {
  theme,
  path: filePath,
  id
}) => {
  var _currentResource;

  let currentResource = ``;
  let newContents = ``;

  if (!id) {
    // eslint-disable-next-line
    id = relativePathForShadowedFile({
      theme,
      filePath
    });
  }

  currentResource = (await read$8({
    root
  }, id)) || {}; // eslint-disable-next-line

  const fullFilePathToShadow = path__default['default'].join(root, `node_modules`, theme, filePath);

  try {
    newContents = await fs__default['default'].readFile(fullFilePathToShadow, `utf8`);
  } catch (e) {// We couldn't read the specified ShadowFile while planning. Probably just doesn't
    // exist yet because the theme's NPMPackage isn't yet installed
  }

  const newResource = {
    id,
    theme,
    path: filePath,
    contents: newContents
  };
  const diff = await getDiff(((_currentResource = currentResource) === null || _currentResource === void 0 ? void 0 : _currentResource.contents) || ``, newContents);
  return {
    id,
    theme,
    path: filePath,
    diff,
    currentState: currentResource,
    dependsOn: [{
      resourceName: `NPMPackage`,
      name: theme
    }],
    newState: newResource,
    describe: `Shadow ${filePath} from the theme ${theme}`
  };
};

var shadowFile = /*#__PURE__*/Object.freeze({
  __proto__: null,
  relativePathForShadowedFile: relativePathForShadowedFile,
  createPathToThemeFile: createPathToThemeFile,
  splitId: splitId,
  validate: validate$8,
  schema: schema$8,
  create: create$8,
  update: create$8,
  read: read$8,
  destroy: destroy$8,
  plan: plan$8
});

const addFieldToSiteMetadata = (src, {
  name,
  value
}) => {
  const setSiteMetadata = new BabelPluginSetSiteMetadataField({
    key: name,
    value
  });
  const {
    code
  } = require$$0.transform(src, {
    plugins: [setSiteMetadata.plugin],
    configFile: false
  });
  return code;
};

const removeFieldFromSiteMetadata = (src, {
  name
}) => {
  const setSiteMetadata = new BabelPluginSetSiteMetadataField({
    key: name,
    value: undefined
  });
  const {
    code
  } = require$$0.transform(src, {
    plugins: [setSiteMetadata.plugin],
    configFile: false
  });
  return code;
};

const getSiteMetdataFromConfig = src => {
  const getSiteMetadata = new BabelPluginGetSiteMetadataFromConfig();
  require$$0.transform(src, {
    plugins: [getSiteMetadata.plugin],
    configFile: false
  });
  return getSiteMetadata.state;
};

const getConfigPath = root => path__default['default'].join(root, `gatsby-config.js`);

const readConfigFile = async root => {
  let src;

  try {
    src = await fs__default['default'].readFile(getConfigPath(root), `utf8`);
  } catch (e) {
    if (e.code === `ENOENT`) {
      src = `/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [],
}`;
    } else {
      throw e;
    }
  }

  return src;
};

const create$7 = async ({
  root
}, {
  name,
  value
}) => {
  const release = await lock(`gatsby-config.js`);
  const configSrc = await readConfigFile(root);
  const prettierConfig = await prettier__default['default'].resolveConfig(root);
  let code = addFieldToSiteMetadata(configSrc, {
    name,
    value
  });
  code = prettier__default['default'].format(code, { ...prettierConfig,
    parser: `babel`
  });
  await fs__default['default'].writeFile(getConfigPath(root), code);
  const resource = await read$7({
    root
  }, name);
  release();
  return resource;
};

const read$7 = async ({
  root
}, id) => {
  try {
    const configSrc = await readConfigFile(root);
    const siteMetadata = getSiteMetdataFromConfig(configSrc);

    if (!siteMetadata || typeof siteMetadata[id] === `undefined`) {
      return undefined;
    }

    return {
      id,
      name: id,
      value: JSON.stringify(siteMetadata[id])
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const destroy$7 = async ({
  root
}, resource) => {
  const configSrc = await readConfigFile(root);
  const newSrc = removeFieldFromSiteMetadata(configSrc, resource);
  await fs__default['default'].writeFile(getConfigPath(root), newSrc);
};

class BabelPluginSetSiteMetadataField {
  constructor({
    key,
    value
  }) {
    this.plugin = require$$0$1.declare(api => {
      api.assertVersion(7);
      return {
        visitor: {
          ExpressionStatement(path) {
            const {
              node
            } = path;
            const {
              left,
              right
            } = node.expression;

            if (!isDefaultExport(left)) {
              return;
            }

            let siteMetadataExists = false;
            const siteMetadata = right.properties.find(p => p.key.name === `siteMetadata`);
            let siteMetadataObj = {};

            if (siteMetadata !== null && siteMetadata !== void 0 && siteMetadata.value) {
              siteMetadataExists = true;
              siteMetadataObj = getObjectFromNode(siteMetadata === null || siteMetadata === void 0 ? void 0 : siteMetadata.value);
            }

            const valueType = typeof value;
            const shouldParse = valueType !== `string` && valueType !== `undefined`;
            const newSiteMetadataObj = { ...siteMetadataObj,
              [key]: shouldParse ? JSON.parse(value) : value
            };
            const newSiteMetadataTemplate = template__default['default'](`
              const foo = ${JSON.stringify(newSiteMetadataObj, null, 2)}
            `)();
            const newSiteMetadata = newSiteMetadataTemplate.declarations[0].init;

            if (siteMetadataExists) {
              right.properties = right.properties.map(p => {
                if (p.key.name !== `siteMetadata`) return p;
                return { ...p,
                  value: newSiteMetadata
                };
              });
            } else {
              right.properties.unshift(t__namespace.objectProperty(t__namespace.identifier(`siteMetadata`), newSiteMetadata));
            }

            path.stop();
          }

        }
      };
    });
  }

}

class BabelPluginGetSiteMetadataFromConfig {
  constructor() {
    this.state = {};
    this.plugin = require$$0$1.declare(api => {
      api.assertVersion(7);
      return {
        visitor: {
          ExpressionStatement: path => {
            const {
              node
            } = path;
            const {
              left,
              right
            } = node.expression;

            if (!isDefaultExport(left)) {
              return;
            }

            const siteMetadata = right.properties.find(p => p.key.name === `siteMetadata`);
            if (!siteMetadata || !siteMetadata.value) return;
            this.state = getObjectFromNode(siteMetadata.value);
          }
        }
      };
    });
  }

}
const config$2 = {};
const all$7 = async ({
  root
}) => {
  const configSrc = await readConfigFile(root);
  const siteMetadata = getSiteMetdataFromConfig(configSrc);
  return Object.keys(siteMetadata).map(key => {
    return {
      name: key,
      value: JSON.stringify(siteMetadata[key])
    };
  });
};
const schema$7 = {
  value: Joi__namespace.string(),
  name: Joi__namespace.string(),
  ...resourceSchema
};

const validate$7 = resource => {
  if (REQUIRES_KEYS.includes(resource.name) && !resource.key) {
    return {
      error: `${resource.name} requires a key to be set`
    };
  }

  if (resource.key && resource.key === resource.name) {
    return {
      error: `${resource.name} requires a key to be different than the plugin name`
    };
  }

  return Joi__namespace.validate(resource, schema$7, {
    abortEarly: false
  });
};
const plan$7 = async ({
  root
}, {
  id,
  key,
  name,
  value
}) => {
  const fullName = id || name;
  const prettierConfig = await prettier__default['default'].resolveConfig(root);
  let configSrc = await readConfigFile(root);
  configSrc = prettier__default['default'].format(configSrc, { ...prettierConfig,
    parser: `babel`
  });
  let newContents = addFieldToSiteMetadata(configSrc, {
    name: fullName,
    value
  });
  newContents = prettier__default['default'].format(newContents, { ...prettierConfig,
    parser: `babel`
  });
  const diff = await getDiff(configSrc, newContents);
  return {
    id: fullName,
    name,
    diff,
    currentState: configSrc,
    newState: newContents,
    describe: `Add ${fullName}: ${value} to the siteMetadata`
  };
};

var siteMetadata = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addFieldToSiteMetadata: addFieldToSiteMetadata,
  getSiteMetdataFromConfig: getSiteMetdataFromConfig,
  removeFieldFromSiteMetadata: removeFieldFromSiteMetadata,
  create: create$7,
  update: create$7,
  read: read$7,
  destroy: destroy$7,
  config: config$2,
  all: all$7,
  schema: schema$7,
  validate: validate$7,
  plan: plan$7
});

const readPackageJson$1 = async root => {
  const fullPath = path__default['default'].join(root, `package.json`);
  const contents = await fs__default['default'].readFile(fullPath, `utf8`);
  const obj = JSON.parse(contents);
  return obj;
};

const writePackageJson$1 = async (root, obj) => {
  const fullPath = path__default['default'].join(root, `package.json`);
  const contents = JSON.stringify(obj, null, 2);
  await fs__default['default'].writeFile(fullPath, contents);
};

const create$6 = async ({
  root
}, {
  name,
  command
}) => {
  const release = await lock(`package.json`);
  const pkg = await readPackageJson$1(root);
  pkg.scripts = pkg.scripts || {};
  pkg.scripts[name] = command;
  await writePackageJson$1(root, pkg);
  const readPackagejson = await read$6({
    root
  }, name);
  release();
  return readPackagejson;
};

const read$6 = async ({
  root
}, id) => {
  const pkg = await readPackageJson$1(root);

  if (pkg.scripts && pkg.scripts[id]) {
    return {
      id,
      name: id,
      command: pkg.scripts[id],
      _message: `Added script "${id}" to your package.json`
    };
  }

  return undefined;
};

const destroy$6 = async ({
  root
}, {
  name
}) => {
  const pkg = await readPackageJson$1(root);
  pkg.scripts = pkg.scripts || {};
  delete pkg.scripts[name];
  await writePackageJson$1(root, pkg);
};

const schema$6 = {
  name: Joi__namespace.string(),
  command: Joi__namespace.string(),
  ...resourceSchema
};

const validate$6 = resource => Joi__namespace.validate(resource, schema$6, {
  abortEarly: false
});
const all$6 = async ({
  root
}) => {
  const pkg = await readPackageJson$1(root);
  const scripts = pkg.scripts || {};
  return Object.entries(scripts).map(arr => {
    return {
      name: arr[0],
      command: arr[1],
      id: arr[0]
    };
  });
};
const plan$6 = async ({
  root
}, {
  name,
  command
}) => {
  const resource = await read$6({
    root
  }, name);
  const pkg = await readPackageJson$1(root);

  const scriptDescription = (name, command) => `"${name}": "${command}"`;

  let currentState = ``;

  if (resource) {
    currentState = scriptDescription(resource.name, resource.command);
  }

  const oldState = JSON.parse(JSON.stringify(pkg));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts[name] = command;
  const diff = await getDiff(oldState, pkg);
  return {
    currentState,
    newState: scriptDescription(name, command),
    diff,
    describe: `Add script "${name}" to your package.json`
  };
};
const config$1 = {
  serial: true
};

var script = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema$6,
  validate: validate$6,
  all: all$6,
  plan: plan$6,
  create: create$6,
  update: create$6,
  read: read$6,
  destroy: destroy$6,
  config: config$1
});

const readPackageJson = async root => {
  const fullPath = path__default['default'].join(root, `package.json`);
  const contents = await fs__default['default'].readFile(fullPath, `utf8`);
  const obj = JSON.parse(contents);
  return obj;
};

const writePackageJson = async (root, obj) => {
  const fullPath = path__default['default'].join(root, `package.json`);
  const contents = JSON.stringify(obj, null, 2);
  await fs__default['default'].writeFile(fullPath, contents);
};

const create$5 = async ({
  root
}, {
  name,
  value
}) => {
  const release = await lock(`package.json`);
  const pkg = await readPackageJson(root);
  pkg[name] = value;
  await writePackageJson(root, pkg);
  const newPkg = await read$5({
    root
  }, name);
  release();
  return newPkg;
};

const read$5 = async ({
  root
}, id) => {
  const pkg = await readPackageJson(root);

  if (!pkg[id]) {
    return undefined;
  }

  return {
    id,
    name: id,
    value: JSON.stringify(pkg[id], null, 2),
    _message: `Wrote key "${id}" to package.json`
  };
};

const destroy$5 = async ({
  root
}, {
  id
}) => {
  const pkg = await readPackageJson(root);
  delete pkg[id];
  await writePackageJson(root, pkg);
};

const schema$5 = {
  name: Joi__namespace.string(),
  value: Joi__namespace.string(),
  ...resourceSchema
};

const validate$5 = resource => {
  // value can be both a string or an object. Internally we
  // always just treat it as a string to simplify handling it.
  resource.value = JSON.stringify(resource.value);
  return Joi__namespace.validate(resource, schema$5, {
    abortEarly: false
  });
};
const plan$5 = async ({
  root
}, {
  id,
  name,
  value
}) => {
  const key = id || name;
  const currentState = await readPackageJson(root);
  const newState = { ...currentState,
    [key]: value
  };
  const diff = await getDiff(currentState, newState);
  return {
    id: key,
    name,
    currentState: JSON.stringify(currentState, null, 2),
    newState: JSON.stringify(newState, null, 2),
    describe: `Add ${key} to package.json`,
    diff
  };
};
const all$5 = async ({
  root
}) => {
  const pkg = await readPackageJson(root);
  return Object.keys(pkg).map(key => {
    return {
      name: key,
      value: JSON.stringify(pkg[key])
    };
  });
};
const config = {
  serial: true
};

var packageJson = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema$5,
  validate: validate$5,
  plan: plan$5,
  all: all$5,
  create: create$5,
  update: create$5,
  read: read$5,
  destroy: destroy$5,
  config: config
});

const makePath = root => path__default['default'].join(root, `.gitignore`);

const gitignoresAsArray = async root => {
  const fullPath = makePath(root);

  if (!fileExists(fullPath)) {
    return [];
  }

  const ignoresStr = await fs__default['default'].readFile(fullPath, `utf8`);
  const ignores = ignoresStr.split(`\n`);
  const last = ignores.pop();

  if (last.trim() === ``) {
    return ignores;
  } else {
    return [...ignores, last];
  }
};

const ignoresToString = ignores => singleTrailingNewline__default['default'](ignores.map(n => n.name).join(`\n`));

const fileExists = fullPath => {
  try {
    fs__default['default'].accessSync(fullPath, fs__default['default'].constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const create$4 = async ({
  root
}, {
  name
}) => {
  const fullPath = makePath(root);
  const ignores = await all$4({
    root
  });
  const exists = ignores.find(n => n.id === name);

  if (!exists) {
    ignores.push({
      id: name,
      name
    });
  }

  await fs__default['default'].writeFile(fullPath, ignoresToString(ignores));
  const result = await read$4({
    root
  }, name);
  return result;
};

const update = async ({
  root
}, {
  id,
  name
}) => {
  const fullPath = makePath(root);
  let ignores = await all$4({
    root
  });
  const exists = ignores.find(n => n.id === id);

  if (!exists) {
    ignores.push({
      id,
      name
    });
  } else {
    ignores = ignores.map(n => {
      if (n.id === id) {
        return { ...n,
          name
        };
      }

      return n;
    });
  }

  await fs__default['default'].writeFile(fullPath, ignoresToString(ignores));
  return await read$4({
    root
  }, name);
};

const read$4 = async (context, id) => {
  const ignores = await gitignoresAsArray(context.root);
  const name = ignores.find(n => n === id);

  if (!name) {
    return undefined;
  }

  const resource = {
    id,
    name
  };
  resource._message = message$4(resource);
  return resource;
};

const all$4 = async context => {
  const ignores = await gitignoresAsArray(context.root);
  return ignores.map((name, i) => {
    const id = name || i.toString(); // Handle newlines

    return {
      id,
      name
    };
  });
};

const destroy$4 = async (context, {
  id,
  name
}) => {
  const fullPath = makePath(context.root);
  const ignores = await all$4(context);
  const newIgnores = ignores.filter(n => n.id !== id);
  await fs__default['default'].writeFile(fullPath, ignoresToString(newIgnores));
  return {
    id,
    name
  };
}; // TODO pass action to plan


const plan$4 = async (context, args) => {
  const name = args.id || args.name;
  const currentResource = (await all$4(context)) || [];
  const alreadyIgnored = currentResource.find(n => n.id === name);
  const contents = ignoresToString(currentResource);
  const plan = {
    currentState: contents,
    newState: alreadyIgnored ? contents : contents + name,
    describe: `Add ${name} to gitignore`,
    diff: ``
  };

  if (plan.currentState !== plan.newState) {
    plan.diff = await getDiff(plan.currentState, plan.newState);
  }

  return plan;
};

const message$4 = resource => `Added ${resource.id || resource.name} to gitignore`;

const schema$4 = {
  name: Joi__namespace.string(),
  ...resourceSchema
};
const validate$4 = resource => Joi__namespace.validate(resource, schema$4, {
  abortEarly: false
});

var ignore = /*#__PURE__*/Object.freeze({
  __proto__: null,
  plan: plan$4,
  validate: validate$4,
  schema: schema$4,
  create: create$4,
  update: update,
  read: read$4,
  destroy: destroy$4,
  all: all$4
});

let client;

if (process.env.CONTENTFUL_ACCESS_TOKEN) {
  client = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });
}

var client$1 = client;

const create$3 = async (_context, {
  name
}) => {
  const space = await client$1.createSpace({
    name
  });
  const deliveryAccessToken = await space.createApiKey({
    name: `gatsby`
  });
  return {
    name: space.name,
    id: space.sys.id,
    deliveryAccessToken: deliveryAccessToken.accessToken,
    _message: message$3(space)
  };
};

const read$3 = async (_context, name) => {
  const spaces = await all$3();
  console.log(`all spaces`, spaces);

  if (!spaces) {
    return null;
  }

  const space = spaces.find(s => s.name === name);
  return { ...space,
    id: space.sys.id
  };
};

const destroy$3 = async (_context, id) => {
  const space = await client$1.getSpace(id);
  const spaceResource = {
    name: space.name,
    id: space.sys.id
  };
  await space.delete();
  return spaceResource;
};

const all$3 = async () => {
  const spaces = client$1.getSpaces();
  return spaces.items;
};

const schema$3 = {
  name: Joi__namespace.string(),
  ...resourceSchema
};

const validate$3 = resource => Joi__namespace.validate(resource, schema$3, {
  abortEarly: false
});

const plan$3 = async (context, {
  id,
  name
}) => {
  const currentResource = await read$3(context, id || name);

  if (!currentResource) {
    return {
      name,
      id: `(Known after install)`,
      deliveryAccessToken: `(Known after install)`,
      currentState: ``,
      describe: `Create Contentful space "${name}"`,
      diffExists: true,
      skipDiff: true
    };
  } else {
    return {
      currentState: currentResource,
      describe: `Contentful space ${name} already exists`,
      diff: ``
    };
  }
};

const message$3 = resource => `Created Contentful space ${resource.name}`;

var space = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema$3,
  validate: validate$3,
  plan: plan$3,
  create: create$3,
  update: create$3,
  read: read$3,
  destroy: destroy$3,
  all: all$3
});

const create$2 = async (context, {
  name
}) => {
  const spaceId = context.ContentfulSpace.id;
  const space = await client$1.getSpace(spaceId);
  const environment = await space.createEnvironment({
    name
  });
  return {
    name: environment.name,
    id: environment.sys.id,
    _message: message$2(environment)
  };
};

const read$2 = async (context, name) => {
  console.log({
    context,
    name
  });
  return undefined;
};

const destroy$2 = async (_context, id) => {};

const all$2 = async () => {};

const schema$2 = {
  name: Joi__namespace.string(),
  ...resourceSchema
};

const validate$2 = resource => Joi__namespace.validate(resource, schema$2, {
  abortEarly: false
});

const plan$2 = async (context, {
  id,
  name
}) => {
  console.log({
    context,
    name,
    id
  });
  const currentResource = await read$2(context, id || name);

  if (!currentResource) {
    return {
      currentState: ``,
      describe: `Create Contentful environment ${name}`,
      diffExists: true,
      skipDiff: true
    };
  } else {
    return {
      currentState: currentResource,
      describe: `Contentful environment ${name} already exists`,
      diff: ``
    };
  }
};

const message$2 = resource => `Created Contentful environment "${resource.name}"`;

var environment = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema$2,
  validate: validate$2,
  plan: plan$2,
  create: create$2,
  update: create$2,
  read: read$2,
  destroy: destroy$2,
  all: all$2
});

const gqlFieldsToArray = fields => Object.entries(fields).reduce((acc, [key, value]) => {
  const metadata = value.metadata || {};
  const field = {
    id: key,
    type: value.type,
    name: key,
    ...metadata
  };
  return [...acc, field];
}, []);

class MetadataDirective extends utils.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.metadata = this.args;
  }

}

const makeMetadataDirective = metadata => {
  if (!metadata || !metadata.length) {
    return ``;
  }

  const metadataArgs = metadata.map(tag => `${tag}: String`).join(`\n`);
  return `
    directive @metadata(
      ${metadataArgs}
    ) on FIELD_DEFINITION
  `;
}; // TODO: Support relations/collections for mapping schema to CMS
//       content models for providers.


function getGraphQLFields(typeDefs, {
  metadata
} = {}) {
  const metadataDirective = makeMetadataDirective(metadata);
  const {
    _typeMap: typeMap
  } = schema$e.makeExecutableSchema({
    typeDefs: metadataDirective + typeDefs,
    schemaDirectives: {
      metadata: MetadataDirective
    }
  });
  return Object.entries(typeMap).filter(([key, value]) => {
    if (key.startsWith(`_`) || !value._fields) {
      return false;
    }

    return true;
  }).map(([key, value]) => {
    return {
      name: key,
      fields: gqlFieldsToArray(value._fields)
    };
  });
}

const GRAPHQL_FIELD_OPTIONS = {
  metadata: [`type`, `name`]
};

const create$1 = async (context, {
  schema
}) => {
  const spaceId = context.ContentfulSpace.id;
  const space = await client$1.getSpace(spaceId);
  const fields = getGraphQLFields(schema, GRAPHQL_FIELD_OPTIONS)[0];
  const contentType = await space.createContentTypeWithId(fields.name, fields);
  await contentType.publish();
  return {
    name: contentType.name,
    id: contentType.sys.id,
    _message: message$1(contentType)
  };
};

const read$1 = async (context, name) => {};

const destroy$1 = async (_context, id) => {};

const all$1 = async () => {};

const schema$1 = {
  schema: Joi__namespace.string(),
  ...resourceSchema
};

const validate$1 = resource => Joi__namespace.validate(resource, schema$1, {
  abortEarly: false
});

const plan$1 = async (context, {
  id,
  schema
}) => {
  const currentResource = await read$1();
  const fields = getGraphQLFields(schema, GRAPHQL_FIELD_OPTIONS)[0];
  console.log(`contentful type`, {
    currentResource,
    schema,
    id,
    fields
  });

  if (!currentResource) {
    return {
      id: `(Known after install)`,
      name: fields.name,
      currentState: ``,
      describe: `Create Contentful type "${fields.name}"`,
      diff: getDiff({}, fields) // diffExists: true,
      // skipDiff: true,

    };
  } else {
    return {
      currentState: currentResource,
      describe: `Contentful type ${currentResource.name} already exists` // diff: getDiff(plan.currentState, plan.newState),

    };
  }
};

const message$1 = resource => `Created Contentful type "${resource.name}"`;

var type = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema$1,
  validate: validate$1,
  plan: plan$1,
  create: create$1,
  update: create$1,
  read: read$1,
  destroy: destroy$1,
  all: all$1
});

const create = async (context, {
  fields
}) => {
  const spaceId = context.ContentfulSpace.id;
  const contentTypeId = context.ContentfulType.id;
  const space = await client$1.getSpace(spaceId);
  const entry = await space.createEntryWithId(contentTypeId, `pizza-face`, {
    fields: {
      title: {
        "en-US": fields.title
      },
      body: {
        "en-US": fields.body
      }
    }
  });
  await entry.publish();
  console.log(`new entry`, entry);
  return { ...entry,
    id: entry.sys.id,
    _message: message(entry)
  };
};

const read = async (context, name) => {};

const destroy = async (_context, id) => {};

const all = async () => {};

const schema = {
  fields: Joi__namespace.object(),
  sys: Joi__namespace.object(),
  ...resourceSchema
};

const validate = resource => Joi__namespace.validate(resource, schema, {
  abortEarly: false
});

const plan = async (context, {
  id,
  fields
}) => {
  console.log({
    context
  });

  {
    return {
      currentState: ``,
      describe: `Create Contentful entry for "${context.ContentfulType.name}"`,
      diff: getDiff({}, fields) // diffExists: true,
      // skipDiff: true,

    };
  }
};

const message = resource => `Created Contentful Entry "${resource.name}"`;

var entry = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema,
  validate: validate,
  plan: plan,
  create: create,
  update: create,
  read: read,
  destroy: destroy,
  all: all
});

exports.InputProvider = InputProvider;
exports.Kind = Kind;
exports.Location = Location;
exports.ResourceProvider = ResourceProvider;
exports.Token = Token;
exports._extends = _extends;
exports._package = _package;
exports.colorName = colorName;
exports.commonjsGlobal = commonjsGlobal;
exports.createCommonjsModule = createCommonjsModule;
exports.dedentBlockStringValue = dedentBlockStringValue;
exports.directory = directory;
exports.dist = dist;
exports.entry = entry;
exports.environment = environment;
exports.file = file;
exports.getDefaultExportFromCjs = getDefaultExportFromCjs;
exports.hasFlag = hasFlag;
exports.ignore = ignore;
exports.inspect = inspect;
exports.objectAssign = objectAssign;
exports.packageJson = packageJson;
exports.page = page;
exports.plugin = plugin;
exports.print = print;
exports.react = react;
exports.script = script;
exports.shadowFile = shadowFile;
exports.siteMetadata = siteMetadata;
exports.space = space;
exports.supportsColor_1 = supportsColor_1;
exports.type = type;
exports.useInput = useInput;
exports.useInputByKey = useInputByKey;
exports.useProvider = useProvider;
exports.useResource = useResource;
exports.useResourceByUUID = useResourceByUUID;
exports.useResourceContext = useResourceContext;
exports.visit = visit;
//# sourceMappingURL=entry-ee5bfdba.js.map
