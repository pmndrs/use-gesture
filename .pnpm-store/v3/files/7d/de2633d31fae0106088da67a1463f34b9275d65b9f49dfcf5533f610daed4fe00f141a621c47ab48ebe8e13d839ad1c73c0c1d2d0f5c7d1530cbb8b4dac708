'use strict';

var dotenv = require('dotenv');
var express = require('express');
var chokidar = require('chokidar');
var graphqlHTTP = require('express-graphql');
var uuid$1 = require('uuid');
var graphql_1 = require('graphql');
var graphqlSubscriptions = require('graphql-subscriptions');
var entry = require('../entry-ee5bfdba.js');
var http = require('http');
var xstate = require('xstate');
var pkgDir = require('pkg-dir');
var cors = require('cors');
var _ = require('lodash');
var debugCtor = require('debug');
var Queue = require('better-queue');
var mitt = require('mitt');
var require$$0$2 = require('@babel/standalone');
var babelPluginTransformReactJsx = require('@babel/plugin-transform-react-jsx');
var babelChainingPlugin = require('@babel/plugin-proposal-optional-chaining');
var unified = require('unified');
var toMDAST = require('remark-parse');
var remarkMdx = require('remark-mdx');
var remarkMdxJs = require('remark-mdxjs');
var remove = require('unist-util-remove');
var visit = require('unist-util-visit');
var style$1 = require('style-to-object');
var require$$0 = require('@babel/core');
var require$$0$1 = require('@babel/helper-plugin-utils');
var remarkStringify = require('remark-stringify');
var fs = require('fs-extra');
var path = require('path');
var isUrl = require('is-url');
var fetch = require('node-fetch');
var Hoek = require('@hapi/hoek');
var Joi = require('@hapi/joi');
var graphqlTypeJson = require('graphql-type-json');
var graphqlCompose = require('graphql-compose');
require('ws');
require('mkdirp');
require('is-binary-path');
require('gatsby-core-utils');
require('@babel/types');
require('glob');
require('prettier');
require('@babel/template');
require('execa');
require('resolve-from');
require('@babel/generator');
require('lock');
require('single-trailing-newline');
require('@graphql-tools/schema');
require('@graphql-tools/utils');
require('contentful-management');
require('jest-diff');
require('os');
require('tty');
require('strip-ansi');

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

var dotenv__default = /*#__PURE__*/_interopDefaultLegacy(dotenv);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var chokidar__default = /*#__PURE__*/_interopDefaultLegacy(chokidar);
var graphqlHTTP__default = /*#__PURE__*/_interopDefaultLegacy(graphqlHTTP);
var pkgDir__default = /*#__PURE__*/_interopDefaultLegacy(pkgDir);
var cors__default = /*#__PURE__*/_interopDefaultLegacy(cors);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var debugCtor__default = /*#__PURE__*/_interopDefaultLegacy(debugCtor);
var Queue__default = /*#__PURE__*/_interopDefaultLegacy(Queue);
var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var babelPluginTransformReactJsx__default = /*#__PURE__*/_interopDefaultLegacy(babelPluginTransformReactJsx);
var babelChainingPlugin__default = /*#__PURE__*/_interopDefaultLegacy(babelChainingPlugin);
var unified__default = /*#__PURE__*/_interopDefaultLegacy(unified);
var toMDAST__default = /*#__PURE__*/_interopDefaultLegacy(toMDAST);
var remarkMdx__default = /*#__PURE__*/_interopDefaultLegacy(remarkMdx);
var remarkMdxJs__default = /*#__PURE__*/_interopDefaultLegacy(remarkMdxJs);
var remove__default = /*#__PURE__*/_interopDefaultLegacy(remove);
var visit__default = /*#__PURE__*/_interopDefaultLegacy(visit);
var style__default = /*#__PURE__*/_interopDefaultLegacy(style$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var remarkStringify__default = /*#__PURE__*/_interopDefaultLegacy(remarkStringify);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var isUrl__default = /*#__PURE__*/_interopDefaultLegacy(isUrl);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var Hoek__default = /*#__PURE__*/_interopDefaultLegacy(Hoek);
var Joi__namespace = /*#__PURE__*/_interopNamespace(Joi);

var resources = /*#__PURE__*/Object.freeze({
  __proto__: null,
  File: entry.file,
  Directory: entry.directory,
  GatsbyPage: entry.page,
  GatsbyPlugin: entry.plugin,
  GatsbyShadowFile: entry.shadowFile,
  GatsbySiteMetadata: entry.siteMetadata,
  NPMPackage: entry._package,
  NPMScript: entry.script,
  NPMPackageJson: entry.packageJson,
  GitIgnore: entry.ignore,
  ContentfulSpace: entry.space,
  ContentfulEnvironment: entry.environment,
  ContentfulType: entry.type,
  ContentfulEntry: entry.entry
});

/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var scheduler_production_min = entry.createCommonjsModule(function (module, exports) {

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
    var d = c - 1 >>> 1,
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
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_continueExecution = function () {
  T || S || (T = !0, f(X));
};

exports.unstable_getCurrentPriorityLevel = function () {
  return R;
};

exports.unstable_getFirstCallbackNode = function () {
  return L(N);
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

exports.unstable_pauseExecution = function () {};

exports.unstable_requestPaint = Z;

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

exports.unstable_shouldYield = function () {
  var a = exports.unstable_now();
  V(a);
  var b = L(N);
  return b !== Q && null !== Q && null !== b && null !== b.callback && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
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
});

var scheduler = entry.createCommonjsModule(function (module) {

{
  module.exports = scheduler_production_min;
}
});

/** @license React v0.25.1
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var reactReconciler_production_min = entry.createCommonjsModule(function (module) {
module.exports = function $$$reconciler($$$hostConfig) {

  var aa = entry.objectAssign,
      ba = entry.react,
      m = scheduler;

  function n(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }

  var p = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  p.hasOwnProperty("ReactCurrentDispatcher") || (p.ReactCurrentDispatcher = {
    current: null
  });
  p.hasOwnProperty("ReactCurrentBatchConfig") || (p.ReactCurrentBatchConfig = {
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
      pa = u ? Symbol.for("react.lazy") : 60116,
      qa = u ? Symbol.for("react.block") : 60121,
      ra = "function" === typeof Symbol && Symbol.iterator;

  function sa(a) {
    if (null === a || "object" !== typeof a) return null;
    a = ra && a[ra] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }

  function ta(a) {
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

  function ua(a) {
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
        return ua(a.type);

      case qa:
        return ua(a.render);

      case pa:
        if (a = 1 === a._status ? a._result : null) return ua(a);
    }
    return null;
  }

  function va(a) {
    var b = a,
        c = a;
    if (a.alternate) for (; b.return;) b = b.return;else {
      a = b;

      do b = a, 0 !== (b.effectTag & 1026) && (c = b.return), a = b.return; while (a);
    }
    return 3 === b.tag ? c : null;
  }

  function wa(a) {
    if (va(a) !== a) throw Error(n(188));
  }

  function xa(a) {
    var b = a.alternate;

    if (!b) {
      b = va(a);
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
          if (f === c) return wa(e), a;
          if (f === d) return wa(e), b;
          f = f.sibling;
        }

        throw Error(n(188));
      }

      if (c.return !== d.return) c = e, d = f;else {
        for (var g = !1, h = e.child; h;) {
          if (h === c) {
            g = !0;
            c = e;
            d = f;
            break;
          }

          if (h === d) {
            g = !0;
            d = e;
            c = f;
            break;
          }

          h = h.sibling;
        }

        if (!g) {
          for (h = f.child; h;) {
            if (h === c) {
              g = !0;
              c = f;
              d = e;
              break;
            }

            if (h === d) {
              g = !0;
              d = f;
              c = e;
              break;
            }

            h = h.sibling;
          }

          if (!g) throw Error(n(189));
        }
      }
      if (c.alternate !== d) throw Error(n(190));
    }

    if (3 !== c.tag) throw Error(n(188));
    return c.stateNode.current === c ? a : b;
  }

  function ya(a) {
    a = xa(a);
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

  function za(a) {
    a = xa(a);
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

  var Aa = $$$hostConfig.getPublicInstance,
      Ba = $$$hostConfig.getRootHostContext,
      Ca = $$$hostConfig.getChildHostContext,
      Da = $$$hostConfig.prepareForCommit,
      Ea = $$$hostConfig.resetAfterCommit,
      Fa = $$$hostConfig.createInstance,
      Ga = $$$hostConfig.appendInitialChild,
      Ha = $$$hostConfig.finalizeInitialChildren,
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
      jb = $$$hostConfig.finalizeContainerChildren,
      kb = $$$hostConfig.replaceContainerChildren,
      lb = $$$hostConfig.cloneHiddenInstance,
      mb = $$$hostConfig.cloneHiddenTextInstance,
      nb = $$$hostConfig.canHydrateInstance,
      ob = $$$hostConfig.canHydrateTextInstance,
      pb = $$$hostConfig.isSuspenseInstancePending,
      qb = $$$hostConfig.isSuspenseInstanceFallback,
      rb = $$$hostConfig.getNextHydratableSibling,
      sb = $$$hostConfig.getFirstHydratableChild,
      tb = $$$hostConfig.hydrateInstance,
      ub = $$$hostConfig.hydrateTextInstance,
      vb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
      wb = $$$hostConfig.commitHydratedContainer,
      xb = $$$hostConfig.commitHydratedSuspenseInstance,
      yb = /^(.*)[\\\/]/;

  function zb(a) {
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
              f = ua(a.type);
          c = null;
          d && (c = ua(d.type));
          d = f;
          f = "";
          e ? f = " (at " + e.fileName.replace(yb, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
          c = "\n    in " + (d || "Unknown") + f;
      }

      b += c;
      a = a.return;
    } while (a);

    return b;
  }

  var Ab = [],
      Bb = -1;

  function B(a) {
    0 > Bb || (a.current = Ab[Bb], Ab[Bb] = null, Bb--);
  }

  function C(a, b) {
    Bb++;
    Ab[Bb] = a.current;
    a.current = b;
  }

  var Cb = {},
      D = {
    current: Cb
  },
      E = {
    current: !1
  },
      Db = Cb;

  function Eb(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Cb;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {},
        f;

    for (f in c) e[f] = b[f];

    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }

  function F(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }

  function Fb() {
    B(E);
    B(D);
  }

  function Gb(a, b, c) {
    if (D.current !== Cb) throw Error(n(168));
    C(D, b);
    C(E, c);
  }

  function Hb(a, b, c) {
    var d = a.stateNode;
    a = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();

    for (var e in d) if (!(e in a)) throw Error(n(108, ua(b) || "Unknown", e));

    return aa({}, c, {}, d);
  }

  function Ib(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cb;
    Db = D.current;
    C(D, a);
    C(E, E.current);
    return !0;
  }

  function Jb(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(n(169));
    c ? (a = Hb(a, b, Db), d.__reactInternalMemoizedMergedChildContext = a, B(E), B(D), C(D, a)) : B(E);
    C(E, c);
  }

  var Kb = m.unstable_runWithPriority,
      Lb = m.unstable_scheduleCallback,
      Mb = m.unstable_cancelCallback,
      Nb = m.unstable_requestPaint,
      Ob = m.unstable_now,
      Pb = m.unstable_getCurrentPriorityLevel,
      Qb = m.unstable_ImmediatePriority,
      Rb = m.unstable_UserBlockingPriority,
      Sb = m.unstable_NormalPriority,
      Tb = m.unstable_LowPriority,
      Ub = m.unstable_IdlePriority,
      Vb = {},
      Wb = m.unstable_shouldYield,
      Xb = void 0 !== Nb ? Nb : function () {},
      Yb = null,
      Zb = null,
      $b = !1,
      ac = Ob(),
      G = 1E4 > ac ? Ob : function () {
    return Ob() - ac;
  };

  function bc() {
    switch (Pb()) {
      case Qb:
        return 99;

      case Rb:
        return 98;

      case Sb:
        return 97;

      case Tb:
        return 96;

      case Ub:
        return 95;

      default:
        throw Error(n(332));
    }
  }

  function cc(a) {
    switch (a) {
      case 99:
        return Qb;

      case 98:
        return Rb;

      case 97:
        return Sb;

      case 96:
        return Tb;

      case 95:
        return Ub;

      default:
        throw Error(n(332));
    }
  }

  function dc(a, b) {
    a = cc(a);
    return Kb(a, b);
  }

  function ec(a, b, c) {
    a = cc(a);
    return Lb(a, b, c);
  }

  function fc(a) {
    null === Yb ? (Yb = [a], Zb = Lb(Qb, gc)) : Yb.push(a);
    return Vb;
  }

  function H() {
    if (null !== Zb) {
      var a = Zb;
      Zb = null;
      Mb(a);
    }

    gc();
  }

  function gc() {
    if (!$b && null !== Yb) {
      $b = !0;
      var a = 0;

      try {
        var b = Yb;
        dc(99, function () {
          for (; a < b.length; a++) {
            var c = b[a];

            do c = c(!0); while (null !== c);
          }
        });
        Yb = null;
      } catch (c) {
        throw null !== Yb && (Yb = Yb.slice(a + 1)), Lb(Qb, H), c;
      } finally {
        $b = !1;
      }
    }
  }

  function hc(a, b, c) {
    c /= 10;
    return 1073741821 - (((1073741821 - a + b / 10) / c | 0) + 1) * c;
  }

  function ic(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }

  var jc = "function" === typeof Object.is ? Object.is : ic,
      kc = Object.prototype.hasOwnProperty;

  function lc(a, b) {
    if (jc(a, b)) return !0;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
    var c = Object.keys(a),
        d = Object.keys(b);
    if (c.length !== d.length) return !1;

    for (d = 0; d < c.length; d++) if (!kc.call(b, c[d]) || !jc(a[c[d]], b[c[d]])) return !1;

    return !0;
  }

  function mc(a, b) {
    if (a && a.defaultProps) {
      b = aa({}, b);
      a = a.defaultProps;

      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    }

    return b;
  }

  var nc = {
    current: null
  },
      oc = null,
      pc = null,
      qc = null;

  function rc() {
    qc = pc = oc = null;
  }

  function sc(a, b) {
    a = a.type._context;
    Pa ? (C(nc, a._currentValue), a._currentValue = b) : (C(nc, a._currentValue2), a._currentValue2 = b);
  }

  function tc(a) {
    var b = nc.current;
    B(nc);
    a = a.type._context;
    Pa ? a._currentValue = b : a._currentValue2 = b;
  }

  function uc(a, b) {
    for (; null !== a;) {
      var c = a.alternate;
      if (a.childExpirationTime < b) a.childExpirationTime = b, null !== c && c.childExpirationTime < b && (c.childExpirationTime = b);else if (null !== c && c.childExpirationTime < b) c.childExpirationTime = b;else break;
      a = a.return;
    }
  }

  function vc(a, b) {
    oc = a;
    qc = pc = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (a.expirationTime >= b && (wc = !0), a.firstContext = null);
  }

  function I(a, b) {
    if (qc !== a && !1 !== b && 0 !== b) {
      if ("number" !== typeof b || 1073741823 === b) qc = a, b = 1073741823;
      b = {
        context: a,
        observedBits: b,
        next: null
      };

      if (null === pc) {
        if (null === oc) throw Error(n(308));
        pc = b;
        oc.dependencies = {
          expirationTime: 0,
          firstContext: b,
          responders: null
        };
      } else pc = pc.next = b;
    }

    return Pa ? a._currentValue : a._currentValue2;
  }

  var xc = !1;

  function yc(a) {
    a.updateQueue = {
      baseState: a.memoizedState,
      baseQueue: null,
      shared: {
        pending: null
      },
      effects: null
    };
  }

  function zc(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = {
      baseState: a.baseState,
      baseQueue: a.baseQueue,
      shared: a.shared,
      effects: a.effects
    });
  }

  function Ac(a, b) {
    a = {
      expirationTime: a,
      suspenseConfig: b,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
    return a.next = a;
  }

  function Bc(a, b) {
    a = a.updateQueue;

    if (null !== a) {
      a = a.shared;
      var c = a.pending;
      null === c ? b.next = b : (b.next = c.next, c.next = b);
      a.pending = b;
    }
  }

  function Cc(a, b) {
    var c = a.alternate;
    null !== c && zc(c, a);
    a = a.updateQueue;
    c = a.baseQueue;
    null === c ? (a.baseQueue = b.next = b, b.next = b) : (b.next = c.next, c.next = b);
  }

  function Dc(a, b, c, d) {
    var e = a.updateQueue;
    xc = !1;
    var f = e.baseQueue,
        g = e.shared.pending;

    if (null !== g) {
      if (null !== f) {
        var h = f.next;
        f.next = g.next;
        g.next = h;
      }

      f = g;
      e.shared.pending = null;
      h = a.alternate;
      null !== h && (h = h.updateQueue, null !== h && (h.baseQueue = g));
    }

    if (null !== f) {
      h = f.next;
      var k = e.baseState,
          l = 0,
          q = null,
          r = null,
          w = null;

      if (null !== h) {
        var z = h;

        do {
          g = z.expirationTime;

          if (g < d) {
            var Q = {
              expirationTime: z.expirationTime,
              suspenseConfig: z.suspenseConfig,
              tag: z.tag,
              payload: z.payload,
              callback: z.callback,
              next: null
            };
            null === w ? (r = w = Q, q = k) : w = w.next = Q;
            g > l && (l = g);
          } else {
            null !== w && (w = w.next = {
              expirationTime: 1073741823,
              suspenseConfig: z.suspenseConfig,
              tag: z.tag,
              payload: z.payload,
              callback: z.callback,
              next: null
            });
            Ec(g, z.suspenseConfig);

            a: {
              var A = a,
                  v = z;
              g = b;
              Q = c;

              switch (v.tag) {
                case 1:
                  A = v.payload;

                  if ("function" === typeof A) {
                    k = A.call(Q, k, g);
                    break a;
                  }

                  k = A;
                  break a;

                case 3:
                  A.effectTag = A.effectTag & -4097 | 64;

                case 0:
                  A = v.payload;
                  g = "function" === typeof A ? A.call(Q, k, g) : A;
                  if (null === g || void 0 === g) break a;
                  k = aa({}, k, g);
                  break a;

                case 2:
                  xc = !0;
              }
            }

            null !== z.callback && (a.effectTag |= 32, g = e.effects, null === g ? e.effects = [z] : g.push(z));
          }

          z = z.next;
          if (null === z || z === h) if (g = e.shared.pending, null === g) break;else z = f.next = g.next, g.next = h, e.baseQueue = f = g, e.shared.pending = null;
        } while (1);
      }

      null === w ? q = k : w.next = r;
      e.baseState = q;
      e.baseQueue = w;
      Gc(l);
      a.expirationTime = l;
      a.memoizedState = k;
    }
  }

  function Hc(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b],
          e = d.callback;

      if (null !== e) {
        d.callback = null;
        d = e;
        e = c;
        if ("function" !== typeof d) throw Error(n(191, d));
        d.call(e);
      }
    }
  }

  var Ic = p.ReactCurrentBatchConfig,
      Jc = new ba.Component().refs;

  function Kc(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : aa({}, b, c);
    a.memoizedState = c;
    0 === a.expirationTime && (a.updateQueue.baseState = c);
  }

  var Oc = {
    isMounted: function (a) {
      return (a = a._reactInternalFiber) ? va(a) === a : !1;
    },
    enqueueSetState: function (a, b, c) {
      a = a._reactInternalFiber;
      var d = Lc(),
          e = Ic.suspense;
      d = Mc(d, a, e);
      e = Ac(d, e);
      e.payload = b;
      void 0 !== c && null !== c && (e.callback = c);
      Bc(a, e);
      Nc(a, d);
    },
    enqueueReplaceState: function (a, b, c) {
      a = a._reactInternalFiber;
      var d = Lc(),
          e = Ic.suspense;
      d = Mc(d, a, e);
      e = Ac(d, e);
      e.tag = 1;
      e.payload = b;
      void 0 !== c && null !== c && (e.callback = c);
      Bc(a, e);
      Nc(a, d);
    },
    enqueueForceUpdate: function (a, b) {
      a = a._reactInternalFiber;
      var c = Lc(),
          d = Ic.suspense;
      c = Mc(c, a, d);
      d = Ac(c, d);
      d.tag = 2;
      void 0 !== b && null !== b && (d.callback = b);
      Bc(a, d);
      Nc(a, c);
    }
  };

  function Pc(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !lc(c, d) || !lc(e, f) : !0;
  }

  function Qc(a, b, c) {
    var d = !1,
        e = Cb;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = I(f) : (e = F(b) ? Db : D.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Eb(a, e) : Cb);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Oc;
    a.stateNode = b;
    b._reactInternalFiber = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }

  function Rc(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Oc.enqueueReplaceState(b, b.state, null);
  }

  function Sc(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = Jc;
    yc(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = I(f) : (f = F(b) ? Db : D.current, e.context = Eb(a, f));
    Dc(a, c, e, d);
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Kc(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Oc.enqueueReplaceState(e, e.state, null), Dc(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.effectTag |= 4);
  }

  var Tc = Array.isArray;

  function Uc(a, b, c) {
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

        b = function (a) {
          var b = d.refs;
          b === Jc && (b = d.refs = {});
          null === a ? delete b[e] : b[e] = a;
        };

        b._stringRef = e;
        return b;
      }

      if ("string" !== typeof a) throw Error(n(284));
      if (!c._owner) throw Error(n(290, a));
    }

    return a;
  }

  function Vc(a, b) {
    if ("textarea" !== a.type) throw Error(n(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, ""));
  }

  function Wc(a) {
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

    function e(a, b) {
      a = Xc(a, b);
      a.index = 0;
      a.sibling = null;
      return a;
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

    function h(b, a, c, d) {
      if (null === a || 6 !== a.tag) return a = Yc(c, b.mode, d), a.return = b, a;
      a = e(a, c);
      a.return = b;
      return a;
    }

    function k(a, b, c, d) {
      if (null !== b && b.elementType === c.type) return d = e(b, c.props), d.ref = Uc(a, b, c), d.return = a, d;
      d = Zc(c.type, c.key, c.props, null, a.mode, d);
      d.ref = Uc(a, b, c);
      d.return = a;
      return d;
    }

    function l(a, b, c, d) {
      if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = $c(c, a.mode, d), b.return = a, b;
      b = e(b, c.children || []);
      b.return = a;
      return b;
    }

    function q(b, a, c, d, f) {
      if (null === a || 7 !== a.tag) return a = ad(c, b.mode, d, f), a.return = b, a;
      a = e(a, c);
      a.return = b;
      return a;
    }

    function r(a, b, c) {
      if ("string" === typeof b || "number" === typeof b) return b = Yc("" + b, a.mode, c), b.return = a, b;

      if ("object" === typeof b && null !== b) {
        switch (b.$$typeof) {
          case ca:
            return c = Zc(b.type, b.key, b.props, null, a.mode, c), c.ref = Uc(a, null, b), c.return = a, c;

          case da:
            return b = $c(b, a.mode, c), b.return = a, b;
        }

        if (Tc(b) || sa(b)) return b = ad(b, a.mode, c, null), b.return = a, b;
        Vc(a, b);
      }

      return null;
    }

    function w(b, a, c, d) {
      var e = null !== a ? a.key : null;
      if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(b, a, "" + c, d);

      if ("object" === typeof c && null !== c) {
        switch (c.$$typeof) {
          case ca:
            return c.key === e ? c.type === ea ? q(b, a, c.props.children, d, e) : k(b, a, c, d) : null;

          case da:
            return c.key === e ? l(b, a, c, d) : null;
        }

        if (Tc(c) || sa(c)) return null !== e ? null : q(b, a, c, d, null);
        Vc(b, c);
      }

      return null;
    }

    function z(b, a, c, d, e) {
      if ("string" === typeof d || "number" === typeof d) return b = b.get(c) || null, h(a, b, "" + d, e);

      if ("object" === typeof d && null !== d) {
        switch (d.$$typeof) {
          case ca:
            return b = b.get(null === d.key ? c : d.key) || null, d.type === ea ? q(a, b, d.props.children, e, d.key) : k(a, b, d, e);

          case da:
            return b = b.get(null === d.key ? c : d.key) || null, l(a, b, d, e);
        }

        if (Tc(d) || sa(d)) return b = b.get(c) || null, q(a, b, d, e, null);
        Vc(a, d);
      }

      return null;
    }

    function Q(e, g, h, k) {
      for (var l = null, v = null, t = g, x = g = 0, q = null; null !== t && x < h.length; x++) {
        t.index > x ? (q = t, t = null) : q = t.sibling;
        var y = w(e, t, h[x], k);

        if (null === y) {
          null === t && (t = q);
          break;
        }

        a && t && null === y.alternate && b(e, t);
        g = f(y, g, x);
        null === v ? l = y : v.sibling = y;
        v = y;
        t = q;
      }

      if (x === h.length) return c(e, t), l;

      if (null === t) {
        for (; x < h.length; x++) t = r(e, h[x], k), null !== t && (g = f(t, g, x), null === v ? l = t : v.sibling = t, v = t);

        return l;
      }

      for (t = d(e, t); x < h.length; x++) q = z(t, e, x, h[x], k), null !== q && (a && null !== q.alternate && t.delete(null === q.key ? x : q.key), g = f(q, g, x), null === v ? l = q : v.sibling = q, v = q);

      a && t.forEach(function (a) {
        return b(e, a);
      });
      return l;
    }

    function A(e, g, h, k) {
      var t = sa(h);
      if ("function" !== typeof t) throw Error(n(150));
      h = t.call(h);
      if (null == h) throw Error(n(151));

      for (var l = t = null, v = g, x = g = 0, q = null, y = h.next(); null !== v && !y.done; x++, y = h.next()) {
        v.index > x ? (q = v, v = null) : q = v.sibling;
        var A = w(e, v, y.value, k);

        if (null === A) {
          null === v && (v = q);
          break;
        }

        a && v && null === A.alternate && b(e, v);
        g = f(A, g, x);
        null === l ? t = A : l.sibling = A;
        l = A;
        v = q;
      }

      if (y.done) return c(e, v), t;

      if (null === v) {
        for (; !y.done; x++, y = h.next()) y = r(e, y.value, k), null !== y && (g = f(y, g, x), null === l ? t = y : l.sibling = y, l = y);

        return t;
      }

      for (v = d(e, v); !y.done; x++, y = h.next()) y = z(v, e, x, y.value, k), null !== y && (a && null !== y.alternate && v.delete(null === y.key ? x : y.key), g = f(y, g, x), null === l ? t = y : l.sibling = y, l = y);

      a && v.forEach(function (a) {
        return b(e, a);
      });
      return t;
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
                switch (k.tag) {
                  case 7:
                    if (f.type === ea) {
                      c(a, k.sibling);
                      d = e(k, f.props.children);
                      d.return = a;
                      a = d;
                      break a;
                    }

                    break;

                  default:
                    if (k.elementType === f.type) {
                      c(a, k.sibling);
                      d = e(k, f.props);
                      d.ref = Uc(a, k, f);
                      d.return = a;
                      a = d;
                      break a;
                    }

                }

                c(a, k);
                break;
              } else b(a, k);

              k = k.sibling;
            }

            f.type === ea ? (d = ad(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Zc(f.type, f.key, f.props, null, a.mode, h), h.ref = Uc(a, d, f), h.return = a, a = h);
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

            d = $c(f, a.mode, h);
            d.return = a;
            a = d;
          }

          return g(a);
      }
      if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Yc(f, a.mode, h), d.return = a, a = d), g(a);
      if (Tc(f)) return Q(a, d, f, h);
      if (sa(f)) return A(a, d, f, h);
      l && Vc(a, f);
      if ("undefined" === typeof f && !k) switch (a.tag) {
        case 1:
        case 0:
          throw a = a.type, Error(n(152, a.displayName || a.name || "Component"));
      }
      return c(a, d);
    };
  }

  var bd = Wc(!0),
      cd = Wc(!1),
      dd = {},
      J = {
    current: dd
  },
      ed = {
    current: dd
  },
      fd = {
    current: dd
  };

  function gd(a) {
    if (a === dd) throw Error(n(174));
    return a;
  }

  function hd(a, b) {
    C(fd, b);
    C(ed, a);
    C(J, dd);
    a = Ba(b);
    B(J);
    C(J, a);
  }

  function id() {
    B(J);
    B(ed);
    B(fd);
  }

  function jd(a) {
    var b = gd(fd.current),
        c = gd(J.current);
    b = Ca(c, a.type, b);
    c !== b && (C(ed, a), C(J, b));
  }

  function kd(a) {
    ed.current === a && (B(J), B(ed));
  }

  var K = {
    current: 0
  };

  function ld(a) {
    for (var b = a; null !== b;) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || pb(c) || qb(c))) return b;
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

  function md(a, b) {
    return {
      responder: a,
      props: b
    };
  }

  var nd = p.ReactCurrentDispatcher,
      L = p.ReactCurrentBatchConfig,
      od = 0,
      M = null,
      N = null,
      O = null,
      pd = !1;

  function P() {
    throw Error(n(321));
  }

  function qd(a, b) {
    if (null === b) return !1;

    for (var c = 0; c < b.length && c < a.length; c++) if (!jc(a[c], b[c])) return !1;

    return !0;
  }

  function rd(a, b, c, d, e, f) {
    od = f;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.expirationTime = 0;
    nd.current = null === a || null === a.memoizedState ? sd : td;
    a = c(d, e);

    if (b.expirationTime === od) {
      f = 0;

      do {
        b.expirationTime = 0;
        if (!(25 > f)) throw Error(n(301));
        f += 1;
        O = N = null;
        b.updateQueue = null;
        nd.current = ud;
        a = c(d, e);
      } while (b.expirationTime === od);
    }

    nd.current = vd;
    b = null !== N && null !== N.next;
    od = 0;
    O = N = M = null;
    pd = !1;
    if (b) throw Error(n(300));
    return a;
  }

  function wd() {
    var a = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }

  function xd() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;

    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a;else {
      if (null === a) throw Error(n(310));
      N = a;
      a = {
        memoizedState: N.memoizedState,
        baseState: N.baseState,
        baseQueue: N.baseQueue,
        queue: N.queue,
        next: null
      };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }

  function yd(a, b) {
    return "function" === typeof b ? b(a) : b;
  }

  function zd(a) {
    var b = xd(),
        c = b.queue;
    if (null === c) throw Error(n(311));
    c.lastRenderedReducer = a;
    var d = N,
        e = d.baseQueue,
        f = c.pending;

    if (null !== f) {
      if (null !== e) {
        var g = e.next;
        e.next = f.next;
        f.next = g;
      }

      d.baseQueue = e = f;
      c.pending = null;
    }

    if (null !== e) {
      e = e.next;
      d = d.baseState;
      var h = g = f = null,
          k = e;

      do {
        var l = k.expirationTime;

        if (l < od) {
          var q = {
            expirationTime: k.expirationTime,
            suspenseConfig: k.suspenseConfig,
            action: k.action,
            eagerReducer: k.eagerReducer,
            eagerState: k.eagerState,
            next: null
          };
          null === h ? (g = h = q, f = d) : h = h.next = q;
          l > M.expirationTime && (M.expirationTime = l, Gc(l));
        } else null !== h && (h = h.next = {
          expirationTime: 1073741823,
          suspenseConfig: k.suspenseConfig,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        }), Ec(l, k.suspenseConfig), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);

        k = k.next;
      } while (null !== k && k !== e);

      null === h ? f = d : h.next = g;
      jc(d, b.memoizedState) || (wc = !0);
      b.memoizedState = d;
      b.baseState = f;
      b.baseQueue = h;
      c.lastRenderedState = d;
    }

    return [b.memoizedState, c.dispatch];
  }

  function Ad(a) {
    var b = xd(),
        c = b.queue;
    if (null === c) throw Error(n(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch,
        e = c.pending,
        f = b.memoizedState;

    if (null !== e) {
      c.pending = null;
      var g = e = e.next;

      do f = a(f, g.action), g = g.next; while (g !== e);

      jc(f, b.memoizedState) || (wc = !0);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }

    return [f, d];
  }

  function Bd(a) {
    var b = wd();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = b.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: yd,
      lastRenderedState: a
    };
    a = a.dispatch = Cd.bind(null, M, a);
    return [b.memoizedState, a];
  }

  function Dd(a, b, c, d) {
    a = {
      tag: a,
      create: b,
      destroy: c,
      deps: d,
      next: null
    };
    b = M.updateQueue;
    null === b ? (b = {
      lastEffect: null
    }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }

  function Ed() {
    return xd().memoizedState;
  }

  function Fd(a, b, c, d) {
    var e = wd();
    M.effectTag |= a;
    e.memoizedState = Dd(1 | b, c, void 0, void 0 === d ? null : d);
  }

  function Gd(a, b, c, d) {
    var e = xd();
    d = void 0 === d ? null : d;
    var f = void 0;

    if (null !== N) {
      var g = N.memoizedState;
      f = g.destroy;

      if (null !== d && qd(d, g.deps)) {
        Dd(b, c, f, d);
        return;
      }
    }

    M.effectTag |= a;
    e.memoizedState = Dd(1 | b, c, f, d);
  }

  function Hd(a, b) {
    return Fd(516, 4, a, b);
  }

  function Id(a, b) {
    return Gd(516, 4, a, b);
  }

  function Jd(a, b) {
    return Gd(4, 2, a, b);
  }

  function Kd(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function () {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
      b.current = null;
    };
  }

  function Ld(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Gd(4, 2, Kd.bind(null, b, a), c);
  }

  function Md() {}

  function Nd(a, b) {
    wd().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }

  function Od(a, b) {
    var c = xd();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && qd(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }

  function Pd(a, b) {
    var c = xd();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && qd(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }

  function Qd(a, b, c) {
    var d = bc();
    dc(98 > d ? 98 : d, function () {
      a(!0);
    });
    dc(97 < d ? 97 : d, function () {
      var d = L.suspense;
      L.suspense = void 0 === b ? null : b;

      try {
        a(!1), c();
      } finally {
        L.suspense = d;
      }
    });
  }

  function Cd(a, b, c) {
    var d = Lc(),
        e = Ic.suspense;
    d = Mc(d, a, e);
    e = {
      expirationTime: d,
      suspenseConfig: e,
      action: c,
      eagerReducer: null,
      eagerState: null,
      next: null
    };
    var f = b.pending;
    null === f ? e.next = e : (e.next = f.next, f.next = e);
    b.pending = e;
    f = a.alternate;
    if (a === M || null !== f && f === M) pd = !0, e.expirationTime = od, M.expirationTime = od;else {
      if (0 === a.expirationTime && (null === f || 0 === f.expirationTime) && (f = b.lastRenderedReducer, null !== f)) try {
        var g = b.lastRenderedState,
            h = f(g, c);
        e.eagerReducer = f;
        e.eagerState = h;
        if (jc(h, g)) return;
      } catch (k) {} finally {}
      Nc(a, d);
    }
  }

  var vd = {
    readContext: I,
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
      sd = {
    readContext: I,
    useCallback: Nd,
    useContext: I,
    useEffect: Hd,
    useImperativeHandle: function (a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return Fd(4, 2, Kd.bind(null, b, a), c);
    },
    useLayoutEffect: function (a, b) {
      return Fd(4, 2, a, b);
    },
    useMemo: function (a, b) {
      var c = wd();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function (a, b, c) {
      var d = wd();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = d.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: b
      };
      a = a.dispatch = Cd.bind(null, M, a);
      return [d.memoizedState, a];
    },
    useRef: function (a) {
      var b = wd();
      a = {
        current: a
      };
      return b.memoizedState = a;
    },
    useState: Bd,
    useDebugValue: Md,
    useResponder: md,
    useDeferredValue: function (a, b) {
      var c = Bd(a),
          d = c[0],
          e = c[1];
      Hd(function () {
        var c = L.suspense;
        L.suspense = void 0 === b ? null : b;

        try {
          e(a);
        } finally {
          L.suspense = c;
        }
      }, [a, b]);
      return d;
    },
    useTransition: function (a) {
      var b = Bd(!1),
          c = b[0];
      b = b[1];
      return [Nd(Qd.bind(null, b, a), [b, a]), c];
    }
  },
      td = {
    readContext: I,
    useCallback: Od,
    useContext: I,
    useEffect: Id,
    useImperativeHandle: Ld,
    useLayoutEffect: Jd,
    useMemo: Pd,
    useReducer: zd,
    useRef: Ed,
    useState: function () {
      return zd(yd);
    },
    useDebugValue: Md,
    useResponder: md,
    useDeferredValue: function (a, b) {
      var c = zd(yd),
          d = c[0],
          e = c[1];
      Id(function () {
        var c = L.suspense;
        L.suspense = void 0 === b ? null : b;

        try {
          e(a);
        } finally {
          L.suspense = c;
        }
      }, [a, b]);
      return d;
    },
    useTransition: function (a) {
      var b = zd(yd),
          c = b[0];
      b = b[1];
      return [Od(Qd.bind(null, b, a), [b, a]), c];
    }
  },
      ud = {
    readContext: I,
    useCallback: Od,
    useContext: I,
    useEffect: Id,
    useImperativeHandle: Ld,
    useLayoutEffect: Jd,
    useMemo: Pd,
    useReducer: Ad,
    useRef: Ed,
    useState: function () {
      return Ad(yd);
    },
    useDebugValue: Md,
    useResponder: md,
    useDeferredValue: function (a, b) {
      var c = Ad(yd),
          d = c[0],
          e = c[1];
      Id(function () {
        var c = L.suspense;
        L.suspense = void 0 === b ? null : b;

        try {
          e(a);
        } finally {
          L.suspense = c;
        }
      }, [a, b]);
      return d;
    },
    useTransition: function (a) {
      var b = Ad(yd),
          c = b[0];
      b = b[1];
      return [Od(Qd.bind(null, b, a), [b, a]), c];
    }
  },
      Rd = null,
      Sd = null,
      Td = !1;

  function Ud(a, b) {
    var c = Vd(5, null, null, 0);
    c.elementType = "DELETED";
    c.type = "DELETED";
    c.stateNode = b;
    c.return = a;
    c.effectTag = 8;
    null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }

  function Wd(a, b) {
    switch (a.tag) {
      case 5:
        return b = nb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 6:
        return b = ob(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

      case 13:
        return !1;

      default:
        return !1;
    }
  }

  function Xd(a) {
    if (Td) {
      var b = Sd;

      if (b) {
        var c = b;

        if (!Wd(a, b)) {
          b = rb(c);

          if (!b || !Wd(a, b)) {
            a.effectTag = a.effectTag & -1025 | 2;
            Td = !1;
            Rd = a;
            return;
          }

          Ud(Rd, c);
        }

        Rd = a;
        Sd = sb(b);
      } else a.effectTag = a.effectTag & -1025 | 2, Td = !1, Rd = a;
    }
  }

  function Yd(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;

    Rd = a;
  }

  function Zd(a) {
    if (!Sa || a !== Rd) return !1;
    if (!Td) return Yd(a), Td = !0, !1;
    var b = a.type;
    if (5 !== a.tag || "head" !== b && "body" !== b && !Ja(b, a.memoizedProps)) for (b = Sd; b;) Ud(a, b), b = rb(b);
    Yd(a);

    if (13 === a.tag) {
      if (!Sa) throw Error(n(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(n(317));
      Sd = vb(a);
    } else Sd = Rd ? rb(a.stateNode) : null;

    return !0;
  }

  function $d() {
    Sa && (Sd = Rd = null, Td = !1);
  }

  var ae = p.ReactCurrentOwner,
      wc = !1;

  function R(a, b, c, d) {
    b.child = null === a ? cd(b, null, c, d) : bd(b, a.child, c, d);
  }

  function be(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    vc(b, e);
    d = rd(a, b, c, d, f, e);
    if (null !== a && !wc) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), ce(a, b, e);
    b.effectTag |= 1;
    R(a, b, d, e);
    return b.child;
  }

  function de(a, b, c, d, e, f) {
    if (null === a) {
      var g = c.type;
      if ("function" === typeof g && !ee(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, fe(a, b, g, d, e, f);
      a = Zc(c.type, null, d, null, b.mode, f);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }

    g = a.child;
    if (e < f && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : lc, c(e, d) && a.ref === b.ref)) return ce(a, b, f);
    b.effectTag |= 1;
    a = Xc(g, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  function fe(a, b, c, d, e, f) {
    return null !== a && lc(a.memoizedProps, d) && a.ref === b.ref && (wc = !1, e < f) ? (b.expirationTime = a.expirationTime, ce(a, b, f)) : ge(a, b, c, d, f);
  }

  function he(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.effectTag |= 128;
  }

  function ge(a, b, c, d, e) {
    var f = F(c) ? Db : D.current;
    f = Eb(b, f);
    vc(b, e);
    c = rd(a, b, c, d, f, e);
    if (null !== a && !wc) return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), ce(a, b, e);
    b.effectTag |= 1;
    R(a, b, c, e);
    return b.child;
  }

  function ie(a, b, c, d, e) {
    if (F(c)) {
      var f = !0;
      Ib(b);
    } else f = !1;

    vc(b, e);
    if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), Qc(b, c, d), Sc(b, c, d, e), d = !0;else if (null === a) {
      var g = b.stateNode,
          h = b.memoizedProps;
      g.props = h;
      var k = g.context,
          l = c.contextType;
      "object" === typeof l && null !== l ? l = I(l) : (l = F(c) ? Db : D.current, l = Eb(b, l));
      var q = c.getDerivedStateFromProps,
          r = "function" === typeof q || "function" === typeof g.getSnapshotBeforeUpdate;
      r || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Rc(b, g, d, l);
      xc = !1;
      var w = b.memoizedState;
      g.state = w;
      Dc(b, d, g, e);
      k = b.memoizedState;
      h !== d || w !== k || E.current || xc ? ("function" === typeof q && (Kc(b, c, q, d), k = b.memoizedState), (h = xc || Pc(b, c, h, d, w, k, l)) ? (r || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.effectTag |= 4)) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.effectTag |= 4), d = !1);
    } else g = b.stateNode, zc(a, b), h = b.memoizedProps, g.props = b.type === b.elementType ? h : mc(b.type, h), k = g.context, l = c.contextType, "object" === typeof l && null !== l ? l = I(l) : (l = F(c) ? Db : D.current, l = Eb(b, l)), q = c.getDerivedStateFromProps, (r = "function" === typeof q || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Rc(b, g, d, l), xc = !1, k = b.memoizedState, g.state = k, Dc(b, d, g, e), w = b.memoizedState, h !== d || k !== w || E.current || xc ? ("function" === typeof q && (Kc(b, c, q, d), w = b.memoizedState), (q = xc || Pc(b, c, h, d, k, w, l)) ? (r || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w, l), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w, l)), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.effectTag |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = l, d = q) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), d = !1);
    return je(a, b, c, d, f, e);
  }

  function je(a, b, c, d, e, f) {
    he(a, b);
    var g = 0 !== (b.effectTag & 64);
    if (!d && !g) return e && Jb(b, c, !1), ce(a, b, f);
    d = b.stateNode;
    ae.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.effectTag |= 1;
    null !== a && g ? (b.child = bd(b, a.child, null, f), b.child = bd(b, null, h, f)) : R(a, b, h, f);
    b.memoizedState = d.state;
    e && Jb(b, c, !0);
    return b.child;
  }

  function le(a) {
    var b = a.stateNode;
    b.pendingContext ? Gb(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Gb(a, b.context, !1);
    hd(a, b.containerInfo);
  }

  var me = {
    dehydrated: null,
    retryTime: 0
  };

  function ne(a, b, c) {
    var d = b.mode,
        e = b.pendingProps,
        f = K.current,
        g = !1,
        h;
    (h = 0 !== (b.effectTag & 64)) || (h = 0 !== (f & 2) && (null === a || null !== a.memoizedState));
    h ? (g = !0, b.effectTag &= -65) : null !== a && null === a.memoizedState || void 0 === e.fallback || !0 === e.unstable_avoidThisFallback || (f |= 1);
    C(K, f & 1);

    if (null === a) {
      void 0 !== e.fallback && Xd(b);

      if (g) {
        g = e.fallback;
        e = ad(null, d, 0, null);
        e.return = b;
        if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) a.return = e, a = a.sibling;
        c = ad(g, d, c, null);
        c.return = b;
        e.sibling = c;
        b.memoizedState = me;
        b.child = e;
        return c;
      }

      d = e.children;
      b.memoizedState = null;
      return b.child = cd(b, null, d, c);
    }

    if (null !== a.memoizedState) {
      a = a.child;
      d = a.sibling;

      if (g) {
        e = e.fallback;
        c = Xc(a, a.pendingProps);
        c.return = b;
        if (0 === (b.mode & 2) && (g = null !== b.memoizedState ? b.child.child : b.child, g !== a.child)) for (c.child = g; null !== g;) g.return = c, g = g.sibling;
        d = Xc(d, e);
        d.return = b;
        c.sibling = d;
        c.childExpirationTime = 0;
        b.memoizedState = me;
        b.child = c;
        return d;
      }

      c = bd(b, a.child, e.children, c);
      b.memoizedState = null;
      return b.child = c;
    }

    a = a.child;

    if (g) {
      g = e.fallback;
      e = ad(null, d, 0, null);
      e.return = b;
      e.child = a;
      null !== a && (a.return = e);
      if (0 === (b.mode & 2)) for (a = null !== b.memoizedState ? b.child.child : b.child, e.child = a; null !== a;) a.return = e, a = a.sibling;
      c = ad(g, d, c, null);
      c.return = b;
      e.sibling = c;
      c.effectTag |= 2;
      e.childExpirationTime = 0;
      b.memoizedState = me;
      b.child = e;
      return c;
    }

    b.memoizedState = null;
    return b.child = bd(b, a, e.children, c);
  }

  function oe(a, b) {
    a.expirationTime < b && (a.expirationTime = b);
    var c = a.alternate;
    null !== c && c.expirationTime < b && (c.expirationTime = b);
    uc(a.return, b);
  }

  function pe(a, b, c, d, e, f) {
    var g = a.memoizedState;
    null === g ? a.memoizedState = {
      isBackwards: b,
      rendering: null,
      renderingStartTime: 0,
      last: d,
      tail: c,
      tailExpiration: 0,
      tailMode: e,
      lastEffect: f
    } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailExpiration = 0, g.tailMode = e, g.lastEffect = f);
  }

  function qe(a, b, c) {
    var d = b.pendingProps,
        e = d.revealOrder,
        f = d.tail;
    R(a, b, d.children, c);
    d = K.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.effectTag |= 64;else {
      if (null !== a && 0 !== (a.effectTag & 64)) a: for (a = b.child; null !== a;) {
        if (13 === a.tag) null !== a.memoizedState && oe(a, c);else if (19 === a.tag) oe(a, c);else if (null !== a.child) {
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
    C(K, d);
    if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
      case "forwards":
        c = b.child;

        for (e = null; null !== c;) a = c.alternate, null !== a && null === ld(a) && (e = c), c = c.sibling;

        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        pe(b, !1, e, c, f, b.lastEffect);
        break;

      case "backwards":
        c = null;
        e = b.child;

        for (b.child = null; null !== e;) {
          a = e.alternate;

          if (null !== a && null === ld(a)) {
            b.child = e;
            break;
          }

          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }

        pe(b, !0, c, null, f, b.lastEffect);
        break;

      case "together":
        pe(b, !1, null, null, void 0, b.lastEffect);
        break;

      default:
        b.memoizedState = null;
    }
    return b.child;
  }

  function ce(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    var d = b.expirationTime;
    0 !== d && Gc(d);
    if (b.childExpirationTime < c) return null;
    if (null !== a && b.child !== a.child) throw Error(n(153));

    if (null !== b.child) {
      a = b.child;
      c = Xc(a, a.pendingProps);
      b.child = c;

      for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Xc(a, a.pendingProps), c.return = b;

      c.sibling = null;
    }

    return b.child;
  }

  function re(a) {
    a.effectTag |= 4;
  }

  var se, te, ue, ve;
  if (Qa) se = function (a, b) {
    for (var c = b.child; null !== c;) {
      if (5 === c.tag || 6 === c.tag) Ga(a, c.stateNode);else if (4 !== c.tag && null !== c.child) {
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
  }, te = function () {}, ue = function (a, b, c, d, e) {
    a = a.memoizedProps;

    if (a !== d) {
      var f = b.stateNode,
          g = gd(J.current);
      c = Ia(f, c, a, d, e, g);
      (b.updateQueue = c) && re(b);
    }
  }, ve = function (a, b, c, d) {
    c !== d && re(b);
  };else if (Ra) {
    se = function (a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = lb(f, e.type, e.memoizedProps, e));
          Ga(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = mb(f, e.memoizedProps, e)), Ga(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.effectTag & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child.return = g, se(a, g, !0, f)), f = g.sibling, null !== f)) {
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

    var we = function (a, b, c, d) {
      for (var e = b.child; null !== e;) {
        if (5 === e.tag) {
          var f = e.stateNode;
          c && d && (f = lb(f, e.type, e.memoizedProps, e));
          ib(a, f);
        } else if (6 === e.tag) f = e.stateNode, c && d && (f = mb(f, e.memoizedProps, e)), ib(a, f);else if (4 !== e.tag) {
          if (13 === e.tag && 0 !== (e.effectTag & 4) && (f = null !== e.memoizedState)) {
            var g = e.child;

            if (null !== g && (null !== g.child && (g.child.return = g, we(a, g, !0, f)), f = g.sibling, null !== f)) {
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

    te = function (a) {
      var b = a.stateNode;

      if (null !== a.firstEffect) {
        var c = b.containerInfo,
            d = hb(c);
        we(d, a, !1, !1);
        b.pendingChildren = d;
        re(a);
        jb(c, d);
      }
    };

    ue = function (a, b, c, d, e) {
      var f = a.stateNode,
          g = a.memoizedProps;
      if ((a = null === b.firstEffect) && g === d) b.stateNode = f;else {
        var h = b.stateNode,
            k = gd(J.current),
            l = null;
        g !== d && (l = Ia(h, c, g, d, e, k));
        a && null === l ? b.stateNode = f : (f = gb(f, l, c, g, d, b, a, h), Ha(f, c, d, e, k) && re(b), b.stateNode = f, a ? re(b) : se(f, b, !1, !1));
      }
    };

    ve = function (a, b, c, d) {
      c !== d ? (a = gd(fd.current), c = gd(J.current), b.stateNode = La(d, a, c, b), re(b)) : b.stateNode = a.stateNode;
    };
  } else te = function () {}, ue = function () {}, ve = function () {};

  function xe(a, b) {
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

  function ye(a, b, c) {
    var d = b.pendingProps;

    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return null;

      case 1:
        return F(b.type) && Fb(), null;

      case 3:
        return id(), B(E), B(D), d = b.stateNode, d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (null === a || null === a.child) && Zd(b) && re(b), te(b), null;

      case 5:
        kd(b);
        var e = gd(fd.current);
        c = b.type;
        if (null !== a && null != b.stateNode) ue(a, b, c, d, e), a.ref !== b.ref && (b.effectTag |= 128);else {
          if (!d) {
            if (null === b.stateNode) throw Error(n(166));
            return null;
          }

          a = gd(J.current);

          if (Zd(b)) {
            if (!Sa) throw Error(n(175));
            a = tb(b.stateNode, b.type, b.memoizedProps, e, a, b);
            b.updateQueue = a;
            null !== a && re(b);
          } else {
            var f = Fa(c, d, e, a, b);
            se(f, b, !1, !1);
            b.stateNode = f;
            Ha(f, c, d, e, a) && re(b);
          }

          null !== b.ref && (b.effectTag |= 128);
        }
        return null;

      case 6:
        if (a && null != b.stateNode) ve(a, b, a.memoizedProps, d);else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(n(166));
          a = gd(fd.current);
          e = gd(J.current);

          if (Zd(b)) {
            if (!Sa) throw Error(n(176));
            ub(b.stateNode, b.memoizedProps, b) && re(b);
          } else b.stateNode = La(d, a, e, b);
        }
        return null;

      case 13:
        B(K);
        d = b.memoizedState;
        if (0 !== (b.effectTag & 64)) return b.expirationTime = c, b;
        d = null !== d;
        e = !1;
        null === a ? void 0 !== b.memoizedProps.fallback && Zd(b) : (c = a.memoizedState, e = null !== c, d || null === c || (c = a.child.sibling, null !== c && (f = b.firstEffect, null !== f ? (b.firstEffect = c, c.nextEffect = f) : (b.firstEffect = b.lastEffect = c, c.nextEffect = null), c.effectTag = 8)));
        if (d && !e && 0 !== (b.mode & 2)) if (null === a && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (K.current & 1)) S === ze && (S = Ae);else {
          if (S === ze || S === Ae) S = Be;
          0 !== Ce && null !== T && (De(T, U), Ee(T, Ce));
        }
        Ra && d && (b.effectTag |= 4);
        Qa && (d || e) && (b.effectTag |= 4);
        return null;

      case 4:
        return id(), te(b), null;

      case 10:
        return tc(b), null;

      case 17:
        return F(b.type) && Fb(), null;

      case 19:
        B(K);
        d = b.memoizedState;
        if (null === d) return null;
        e = 0 !== (b.effectTag & 64);
        f = d.rendering;
        if (null === f) {
          if (e) xe(d, !1);else {
            if (S !== ze || null !== a && 0 !== (a.effectTag & 64)) for (a = b.child; null !== a;) {
              f = ld(a);

              if (null !== f) {
                b.effectTag |= 64;
                xe(d, !1);
                a = f.updateQueue;
                null !== a && (b.updateQueue = a, b.effectTag |= 4);
                null === d.lastEffect && (b.firstEffect = null);
                b.lastEffect = d.lastEffect;
                a = c;

                for (d = b.child; null !== d;) e = d, c = a, e.effectTag &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, f = e.alternate, null === f ? (e.childExpirationTime = 0, e.expirationTime = c, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null) : (e.childExpirationTime = f.childExpirationTime, e.expirationTime = f.expirationTime, e.child = f.child, e.memoizedProps = f.memoizedProps, e.memoizedState = f.memoizedState, e.updateQueue = f.updateQueue, c = f.dependencies, e.dependencies = null === c ? null : {
                  expirationTime: c.expirationTime,
                  firstContext: c.firstContext,
                  responders: c.responders
                }), d = d.sibling;

                C(K, K.current & 1 | 2);
                return b.child;
              }

              a = a.sibling;
            }
          }
        } else {
          if (!e) if (a = ld(f), null !== a) {
            if (b.effectTag |= 64, e = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.effectTag |= 4), xe(d, !0), null === d.tail && "hidden" === d.tailMode && !f.alternate) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
          } else 2 * G() - d.renderingStartTime > d.tailExpiration && 1 < c && (b.effectTag |= 64, e = !0, xe(d, !1), b.expirationTime = b.childExpirationTime = c - 1);
          d.isBackwards ? (f.sibling = b.child, b.child = f) : (a = d.last, null !== a ? a.sibling = f : b.child = f, d.last = f);
        }
        return null !== d.tail ? (0 === d.tailExpiration && (d.tailExpiration = G() + 500), a = d.tail, d.rendering = a, d.tail = a.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = G(), a.sibling = null, b = K.current, C(K, e ? b & 1 | 2 : b & 1), a) : null;
    }

    throw Error(n(156, b.tag));
  }

  function Fe(a) {
    switch (a.tag) {
      case 1:
        F(a.type) && Fb();
        var b = a.effectTag;
        return b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

      case 3:
        id();
        B(E);
        B(D);
        b = a.effectTag;
        if (0 !== (b & 64)) throw Error(n(285));
        a.effectTag = b & -4097 | 64;
        return a;

      case 5:
        return kd(a), null;

      case 13:
        return B(K), b = a.effectTag, b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;

      case 19:
        return B(K), null;

      case 4:
        return id(), null;

      case 10:
        return tc(a), null;

      default:
        return null;
    }
  }

  function Ge(a, b) {
    return {
      value: a,
      source: b,
      stack: zb(b)
    };
  }

  var He = "function" === typeof WeakSet ? WeakSet : Set;

  function Ie(a, b) {
    var c = b.source,
        d = b.stack;
    null === d && null !== c && (d = zb(c));
    null !== c && ua(c.type);
    b = b.value;
    null !== a && 1 === a.tag && ua(a.type);

    try {
      console.error(b);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function Je(a, b) {
    try {
      b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
    } catch (c) {
      Ke(a, c);
    }
  }

  function Le(a) {
    var b = a.ref;
    if (null !== b) if ("function" === typeof b) try {
      b(null);
    } catch (c) {
      Ke(a, c);
    } else b.current = null;
  }

  function Me(a, b) {
    switch (b.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return;

      case 1:
        if (b.effectTag & 256 && null !== a) {
          var c = a.memoizedProps,
              d = a.memoizedState;
          a = b.stateNode;
          b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : mc(b.type, c), d);
          a.__reactInternalSnapshotBeforeUpdate = b;
        }

        return;

      case 3:
      case 5:
      case 6:
      case 4:
      case 17:
        return;
    }

    throw Error(n(163));
  }

  function Ne(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;

    if (null !== b) {
      var c = b = b.next;

      do {
        if ((c.tag & a) === a) {
          var d = c.destroy;
          c.destroy = void 0;
          void 0 !== d && d();
        }

        c = c.next;
      } while (c !== b);
    }
  }

  function Oe(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;

    if (null !== b) {
      var c = b = b.next;

      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }

        c = c.next;
      } while (c !== b);
    }
  }

  function Pe(a, b, c) {
    switch (c.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        Oe(3, c);
        return;

      case 1:
        a = c.stateNode;
        if (c.effectTag & 4) if (null === b) a.componentDidMount();else {
          var d = c.elementType === c.type ? b.memoizedProps : mc(c.type, b.memoizedProps);
          a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
        }
        b = c.updateQueue;
        null !== b && Hc(c, b, a);
        return;

      case 3:
        b = c.updateQueue;

        if (null !== b) {
          a = null;
          if (null !== c.child) switch (c.child.tag) {
            case 5:
              a = Aa(c.child.stateNode);
              break;

            case 1:
              a = c.child.stateNode;
          }
          Hc(c, b, a);
        }

        return;

      case 5:
        a = c.stateNode;
        null === b && c.effectTag & 4 && Wa(a, c.type, c.memoizedProps, c);
        return;

      case 6:
        return;

      case 4:
        return;

      case 12:
        return;

      case 13:
        Sa && null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && xb(c))));
        return;

      case 19:
      case 17:
      case 20:
      case 21:
        return;
    }

    throw Error(n(163));
  }

  function Qe(a, b, c) {
    "function" === typeof Re && Re(b);

    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        a = b.updateQueue;

        if (null !== a && (a = a.lastEffect, null !== a)) {
          var d = a.next;
          dc(97 < c ? 97 : c, function () {
            var a = d;

            do {
              var c = a.destroy;

              if (void 0 !== c) {
                var g = b;

                try {
                  c();
                } catch (h) {
                  Ke(g, h);
                }
              }

              a = a.next;
            } while (a !== d);
          });
        }

        break;

      case 1:
        Le(b);
        c = b.stateNode;
        "function" === typeof c.componentWillUnmount && Je(b, c);
        break;

      case 5:
        Le(b);
        break;

      case 4:
        Qa ? Se(a, b, c) : Ra && Te(b);
    }
  }

  function Ue(a, b, c) {
    for (var d = b;;) if (Qe(a, d, c), null === d.child || Qa && 4 === d.tag) {
      if (d === b) break;

      for (; null === d.sibling;) {
        if (null === d.return || d.return === b) return;
        d = d.return;
      }

      d.sibling.return = d.return;
      d = d.sibling;
    } else d.child.return = d, d = d.child;
  }

  function Ve(a) {
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
    a.stateNode = null;
    null !== b && Ve(b);
  }

  function Te(a) {
    if (Ra) {
      a = a.stateNode.containerInfo;
      var b = hb(a);
      kb(a, b);
    }
  }

  function We(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }

  function Xe(a) {
    if (Qa) {
      a: {
        for (var b = a.return; null !== b;) {
          if (We(b)) {
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
          if (null === c.return || We(c.return)) {
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

      d ? Ye(a, c, b) : Ze(a, c, b);
    }
  }

  function Ye(a, b, c) {
    var d = a.tag,
        e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? Za(c, a, b) : Ua(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Ye(a, b, c), a = a.sibling; null !== a;) Ye(a, b, c), a = a.sibling;
  }

  function Ze(a, b, c) {
    var d = a.tag,
        e = 5 === d || 6 === d;
    if (e) a = e ? a.stateNode : a.stateNode.instance, b ? Ya(c, a, b) : Ta(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Ze(a, b, c), a = a.sibling; null !== a;) Ze(a, b, c), a = a.sibling;
  }

  function Se(a, b, c) {
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

      if (5 === d.tag || 6 === d.tag) Ue(a, d, c), g ? ab(f, d.stateNode) : $a(f, d.stateNode);else if (4 === d.tag) {
        if (null !== d.child) {
          f = d.stateNode.containerInfo;
          g = !0;
          d.child.return = d;
          d = d.child;
          continue;
        }
      } else if (Qe(a, d, c), null !== d.child) {
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

  function $e(a, b) {
    if (Qa) {
      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          Ne(3, b);
          return;

        case 1:
          return;

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

          return;

        case 6:
          if (null === b.stateNode) throw Error(n(162));
          c = b.memoizedProps;
          Va(b.stateNode, null !== a ? a.memoizedProps : c, c);
          return;

        case 3:
          Sa && (b = b.stateNode, b.hydrate && (b.hydrate = !1, wb(b.containerInfo)));
          return;

        case 12:
          return;

        case 13:
          af(b);
          bf(b);
          return;

        case 19:
          bf(b);
          return;

        case 17:
          return;
      }

      throw Error(n(163));
    }

    switch (b.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        Ne(3, b);
        return;

      case 12:
        return;

      case 13:
        af(b);
        bf(b);
        return;

      case 19:
        bf(b);
        return;

      case 3:
        Sa && (c = b.stateNode, c.hydrate && (c.hydrate = !1, wb(c.containerInfo)));
    }

    a: if (Ra) {
      switch (b.tag) {
        case 1:
        case 5:
        case 6:
        case 20:
          break a;

        case 3:
        case 4:
          b = b.stateNode;
          kb(b.containerInfo, b.pendingChildren);
          break a;
      }

      throw Error(n(163));
    }
  }

  function af(a) {
    var b = a;
    if (null === a.memoizedState) var c = !1;else c = !0, b = a.child, cf = G();
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

  function bf(a) {
    var b = a.updateQueue;

    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new He());
      b.forEach(function (b) {
        var d = df.bind(null, a, b);
        c.has(b) || (c.add(b), b.then(d, d));
      });
    }
  }

  var ef = "function" === typeof WeakMap ? WeakMap : Map;

  function ff(a, b, c) {
    c = Ac(c, null);
    c.tag = 3;
    c.payload = {
      element: null
    };
    var d = b.value;

    c.callback = function () {
      gf || (gf = !0, hf = d);
      Ie(a, b);
    };

    return c;
  }

  function jf(a, b, c) {
    c = Ac(c, null);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;

    if ("function" === typeof d) {
      var e = b.value;

      c.payload = function () {
        Ie(a, b);
        return d(e);
      };
    }

    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
      "function" !== typeof d && (null === kf ? kf = new Set([this]) : kf.add(this), Ie(a, b));
      var c = b.stack;
      this.componentDidCatch(b.value, {
        componentStack: null !== c ? c : ""
      });
    });
    return c;
  }

  var lf = Math.ceil,
      mf = p.ReactCurrentDispatcher,
      nf = p.ReactCurrentOwner,
      V = 0,
      of = 8,
      pf = 16,
      qf = 32,
      ze = 0,
      rf = 1,
      sf = 2,
      Ae = 3,
      Be = 4,
      tf = 5,
      W = V,
      T = null,
      X = null,
      U = 0,
      S = ze,
      uf = null,
      vf = 1073741823,
      wf = 1073741823,
      xf = null,
      Ce = 0,
      yf = !1,
      cf = 0,
      zf = 500,
      Y = null,
      gf = !1,
      hf = null,
      kf = null,
      Af = !1,
      Bf = null,
      Cf = 90,
      Df = null,
      Ef = 0,
      Ff = null,
      Gf = 0;

  function Lc() {
    return (W & (pf | qf)) !== V ? 1073741821 - (G() / 10 | 0) : 0 !== Gf ? Gf : Gf = 1073741821 - (G() / 10 | 0);
  }

  function Mc(a, b, c) {
    b = b.mode;
    if (0 === (b & 2)) return 1073741823;
    var d = bc();
    if (0 === (b & 4)) return 99 === d ? 1073741823 : 1073741822;
    if ((W & pf) !== V) return U;
    if (null !== c) a = hc(a, c.timeoutMs | 0 || 5E3, 250);else switch (d) {
      case 99:
        a = 1073741823;
        break;

      case 98:
        a = hc(a, 150, 100);
        break;

      case 97:
      case 96:
        a = hc(a, 5E3, 250);
        break;

      case 95:
        a = 2;
        break;

      default:
        throw Error(n(326));
    }
    null !== T && a === U && --a;
    return a;
  }

  function Nc(a, b) {
    if (50 < Ef) throw Ef = 0, Ff = null, Error(n(185));
    a = Hf(a, b);

    if (null !== a) {
      var c = bc();
      1073741823 === b ? (W & of) !== V && (W & (pf | qf)) === V ? If(a) : (Z(a), W === V && H()) : Z(a);
      (W & 4) === V || 98 !== c && 99 !== c || (null === Df ? Df = new Map([[a, b]]) : (c = Df.get(a), (void 0 === c || c > b) && Df.set(a, b)));
    }
  }

  function Hf(a, b) {
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
    null !== e && (T === e && (Gc(b), S === Be && De(e, U)), Ee(e, b));
    return e;
  }

  function Jf(a) {
    var b = a.lastExpiredTime;
    if (0 !== b) return b;
    b = a.firstPendingTime;
    if (!Kf(a, b)) return b;
    var c = a.lastPingedTime;
    a = a.nextKnownPendingLevel;
    a = c > a ? c : a;
    return 2 >= a && b !== a ? 0 : a;
  }

  function Z(a) {
    if (0 !== a.lastExpiredTime) a.callbackExpirationTime = 1073741823, a.callbackPriority = 99, a.callbackNode = fc(If.bind(null, a));else {
      var b = Jf(a),
          c = a.callbackNode;
      if (0 === b) null !== c && (a.callbackNode = null, a.callbackExpirationTime = 0, a.callbackPriority = 90);else {
        var d = Lc();
        1073741823 === b ? d = 99 : 1 === b || 2 === b ? d = 95 : (d = 10 * (1073741821 - b) - 10 * (1073741821 - d), d = 0 >= d ? 99 : 250 >= d ? 98 : 5250 >= d ? 97 : 95);

        if (null !== c) {
          var e = a.callbackPriority;
          if (a.callbackExpirationTime === b && e >= d) return;
          c !== Vb && Mb(c);
        }

        a.callbackExpirationTime = b;
        a.callbackPriority = d;
        b = 1073741823 === b ? fc(If.bind(null, a)) : ec(d, Lf.bind(null, a), {
          timeout: 10 * (1073741821 - b) - G()
        });
        a.callbackNode = b;
      }
    }
  }

  function Lf(a, b) {
    Gf = 0;
    if (b) return b = Lc(), Mf(a, b), Z(a), null;
    var c = Jf(a);

    if (0 !== c) {
      b = a.callbackNode;
      if ((W & (pf | qf)) !== V) throw Error(n(327));
      Nf();
      a === T && c === U || Of(a, c);

      if (null !== X) {
        var d = W;
        W |= pf;
        var e = Pf();

        do try {
          Qf();
          break;
        } catch (h) {
          Rf(a, h);
        } while (1);

        rc();
        W = d;
        mf.current = e;
        if (S === rf) throw b = uf, Of(a, c), De(a, c), Z(a), b;
        if (null === X) switch (e = a.finishedWork = a.current.alternate, a.finishedExpirationTime = c, d = S, T = null, d) {
          case ze:
          case rf:
            throw Error(n(345));

          case sf:
            Mf(a, 2 < c ? 2 : c);
            break;

          case Ae:
            De(a, c);
            d = a.lastSuspendedTime;
            c === d && (a.nextKnownPendingLevel = Sf(e));

            if (1073741823 === vf && (e = cf + zf - G(), 10 < e)) {
              if (yf) {
                var f = a.lastPingedTime;

                if (0 === f || f >= c) {
                  a.lastPingedTime = c;
                  Of(a, c);
                  break;
                }
              }

              f = Jf(a);
              if (0 !== f && f !== c) break;

              if (0 !== d && d !== c) {
                a.lastPingedTime = d;
                break;
              }

              a.timeoutHandle = Ma(Tf.bind(null, a), e);
              break;
            }

            Tf(a);
            break;

          case Be:
            De(a, c);
            d = a.lastSuspendedTime;
            c === d && (a.nextKnownPendingLevel = Sf(e));

            if (yf && (e = a.lastPingedTime, 0 === e || e >= c)) {
              a.lastPingedTime = c;
              Of(a, c);
              break;
            }

            e = Jf(a);
            if (0 !== e && e !== c) break;

            if (0 !== d && d !== c) {
              a.lastPingedTime = d;
              break;
            }

            1073741823 !== wf ? d = 10 * (1073741821 - wf) - G() : 1073741823 === vf ? d = 0 : (d = 10 * (1073741821 - vf) - 5E3, e = G(), c = 10 * (1073741821 - c) - e, d = e - d, 0 > d && (d = 0), d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * lf(d / 1960)) - d, c < d && (d = c));

            if (10 < d) {
              a.timeoutHandle = Ma(Tf.bind(null, a), d);
              break;
            }

            Tf(a);
            break;

          case tf:
            if (1073741823 !== vf && null !== xf) {
              f = vf;
              var g = xf;
              d = g.busyMinDurationMs | 0;
              0 >= d ? d = 0 : (e = g.busyDelayMs | 0, f = G() - (10 * (1073741821 - f) - (g.timeoutMs | 0 || 5E3)), d = f <= e ? 0 : e + d - f);

              if (10 < d) {
                De(a, c);
                a.timeoutHandle = Ma(Tf.bind(null, a), d);
                break;
              }
            }

            Tf(a);
            break;

          default:
            throw Error(n(329));
        }
        Z(a);
        if (a.callbackNode === b) return Lf.bind(null, a);
      }
    }

    return null;
  }

  function If(a) {
    var b = a.lastExpiredTime;
    b = 0 !== b ? b : 1073741823;
    if ((W & (pf | qf)) !== V) throw Error(n(327));
    Nf();
    a === T && b === U || Of(a, b);

    if (null !== X) {
      var c = W;
      W |= pf;
      var d = Pf();

      do try {
        Uf();
        break;
      } catch (e) {
        Rf(a, e);
      } while (1);

      rc();
      W = c;
      mf.current = d;
      if (S === rf) throw c = uf, Of(a, b), De(a, b), Z(a), c;
      if (null !== X) throw Error(n(261));
      a.finishedWork = a.current.alternate;
      a.finishedExpirationTime = b;
      T = null;
      Tf(a);
      Z(a);
    }

    return null;
  }

  function Vf(a, b) {
    Mf(a, b);
    Z(a);
    (W & (pf | qf)) === V && H();
  }

  function Wf() {
    if (null !== Df) {
      var a = Df;
      Df = null;
      a.forEach(function (a, c) {
        Mf(c, a);
        Z(c);
      });
      H();
    }
  }

  function Xf(a, b) {
    var c = W;
    W |= 1;

    try {
      return a(b);
    } finally {
      W = c, W === V && H();
    }
  }

  function Yf(a, b) {
    if ((W & (pf | qf)) !== V) throw Error(n(187));
    var c = W;
    W |= 1;

    try {
      return dc(99, a.bind(null, b));
    } finally {
      W = c, H();
    }
  }

  function Of(a, b) {
    a.finishedWork = null;
    a.finishedExpirationTime = 0;
    var c = a.timeoutHandle;
    c !== Oa && (a.timeoutHandle = Oa, Na(c));
    if (null !== X) for (c = X.return; null !== c;) {
      var d = c;

      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && Fb();
          break;

        case 3:
          id();
          B(E);
          B(D);
          break;

        case 5:
          kd(d);
          break;

        case 4:
          id();
          break;

        case 13:
          B(K);
          break;

        case 19:
          B(K);
          break;

        case 10:
          tc(d);
      }

      c = c.return;
    }
    T = a;
    X = Xc(a.current, null);
    U = b;
    S = ze;
    uf = null;
    wf = vf = 1073741823;
    xf = null;
    Ce = 0;
    yf = !1;
  }

  function Rf(a, b) {
    do {
      try {
        rc();
        nd.current = vd;
        if (pd) for (var c = M.memoizedState; null !== c;) {
          var d = c.queue;
          null !== d && (d.pending = null);
          c = c.next;
        }
        od = 0;
        O = N = M = null;
        pd = !1;
        if (null === X || null === X.return) return S = rf, uf = b, X = null;

        a: {
          var e = a,
              f = X.return,
              g = X,
              h = b;
          b = U;
          g.effectTag |= 2048;
          g.firstEffect = g.lastEffect = null;

          if (null !== h && "object" === typeof h && "function" === typeof h.then) {
            var k = h;

            if (0 === (g.mode & 2)) {
              var l = g.alternate;
              l ? (g.updateQueue = l.updateQueue, g.memoizedState = l.memoizedState, g.expirationTime = l.expirationTime) : (g.updateQueue = null, g.memoizedState = null);
            }

            var q = 0 !== (K.current & 1),
                r = f;

            do {
              var w;

              if (w = 13 === r.tag) {
                var z = r.memoizedState;
                if (null !== z) w = null !== z.dehydrated ? !0 : !1;else {
                  var Q = r.memoizedProps;
                  w = void 0 === Q.fallback ? !1 : !0 !== Q.unstable_avoidThisFallback ? !0 : q ? !1 : !0;
                }
              }

              if (w) {
                var A = r.updateQueue;

                if (null === A) {
                  var v = new Set();
                  v.add(k);
                  r.updateQueue = v;
                } else A.add(k);

                if (0 === (r.mode & 2)) {
                  r.effectTag |= 64;
                  g.effectTag &= -2981;
                  if (1 === g.tag) if (null === g.alternate) g.tag = 17;else {
                    var t = Ac(1073741823, null);
                    t.tag = 2;
                    Bc(g, t);
                  }
                  g.expirationTime = 1073741823;
                  break a;
                }

                h = void 0;
                g = b;
                var x = e.pingCache;
                null === x ? (x = e.pingCache = new ef(), h = new Set(), x.set(k, h)) : (h = x.get(k), void 0 === h && (h = new Set(), x.set(k, h)));

                if (!h.has(g)) {
                  h.add(g);
                  var ke = cg.bind(null, e, k, g);
                  k.then(ke, ke);
                }

                r.effectTag |= 4096;
                r.expirationTime = b;
                break a;
              }

              r = r.return;
            } while (null !== r);

            h = Error((ua(g.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + zb(g));
          }

          S !== tf && (S = sf);
          h = Ge(h, g);
          r = f;

          do {
            switch (r.tag) {
              case 3:
                k = h;
                r.effectTag |= 4096;
                r.expirationTime = b;
                var Zf = ff(r, k, b);
                Cc(r, Zf);
                break a;

              case 1:
                k = h;
                var $f = r.type,
                    Fc = r.stateNode;

                if (0 === (r.effectTag & 64) && ("function" === typeof $f.getDerivedStateFromError || null !== Fc && "function" === typeof Fc.componentDidCatch && (null === kf || !kf.has(Fc)))) {
                  r.effectTag |= 4096;
                  r.expirationTime = b;
                  var ag = jf(r, k, b);
                  Cc(r, ag);
                  break a;
                }

            }

            r = r.return;
          } while (null !== r);
        }

        X = dg(X);
      } catch (bg) {
        b = bg;
        continue;
      }

      break;
    } while (1);
  }

  function Pf() {
    var a = mf.current;
    mf.current = vd;
    return null === a ? vd : a;
  }

  function Ec(a, b) {
    a < vf && 2 < a && (vf = a);
    null !== b && a < wf && 2 < a && (wf = a, xf = b);
  }

  function Gc(a) {
    a > Ce && (Ce = a);
  }

  function Uf() {
    for (; null !== X;) X = eg(X);
  }

  function Qf() {
    for (; null !== X && !Wb();) X = eg(X);
  }

  function eg(a) {
    var b = fg(a.alternate, a, U);
    a.memoizedProps = a.pendingProps;
    null === b && (b = dg(a));
    nf.current = null;
    return b;
  }

  function dg(a) {
    X = a;

    do {
      var b = X.alternate;
      a = X.return;

      if (0 === (X.effectTag & 2048)) {
        b = ye(b, X, U);

        if (1 === U || 1 !== X.childExpirationTime) {
          for (var c = 0, d = X.child; null !== d;) {
            var e = d.expirationTime,
                f = d.childExpirationTime;
            e > c && (c = e);
            f > c && (c = f);
            d = d.sibling;
          }

          X.childExpirationTime = c;
        }

        if (null !== b) return b;
        null !== a && 0 === (a.effectTag & 2048) && (null === a.firstEffect && (a.firstEffect = X.firstEffect), null !== X.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = X.firstEffect), a.lastEffect = X.lastEffect), 1 < X.effectTag && (null !== a.lastEffect ? a.lastEffect.nextEffect = X : a.firstEffect = X, a.lastEffect = X));
      } else {
        b = Fe(X);
        if (null !== b) return b.effectTag &= 2047, b;
        null !== a && (a.firstEffect = a.lastEffect = null, a.effectTag |= 2048);
      }

      b = X.sibling;
      if (null !== b) return b;
      X = a;
    } while (null !== X);

    S === ze && (S = tf);
    return null;
  }

  function Sf(a) {
    var b = a.expirationTime;
    a = a.childExpirationTime;
    return b > a ? b : a;
  }

  function Tf(a) {
    var b = bc();
    dc(99, gg.bind(null, a, b));
    return null;
  }

  function gg(a, b) {
    do Nf(); while (null !== Bf);

    if ((W & (pf | qf)) !== V) throw Error(n(327));
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
    var e = Sf(c);
    a.firstPendingTime = e;
    d <= a.lastSuspendedTime ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : d <= a.firstSuspendedTime && (a.firstSuspendedTime = d - 1);
    d <= a.lastPingedTime && (a.lastPingedTime = 0);
    d <= a.lastExpiredTime && (a.lastExpiredTime = 0);
    a === T && (X = T = null, U = 0);
    1 < c.effectTag ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, e = c.firstEffect) : e = c : e = c.firstEffect;

    if (null !== e) {
      var f = W;
      W |= qf;
      nf.current = null;
      Da(a.containerInfo);
      Y = e;

      do try {
        hg();
      } catch (t) {
        if (null === Y) throw Error(n(330));
        Ke(Y, t);
        Y = Y.nextEffect;
      } while (null !== Y);

      Y = e;

      do try {
        for (var g = a, h = b; null !== Y;) {
          var k = Y.effectTag;
          k & 16 && Qa && bb(Y.stateNode);

          if (k & 128) {
            var l = Y.alternate;

            if (null !== l) {
              var q = l.ref;
              null !== q && ("function" === typeof q ? q(null) : q.current = null);
            }
          }

          switch (k & 1038) {
            case 2:
              Xe(Y);
              Y.effectTag &= -3;
              break;

            case 6:
              Xe(Y);
              Y.effectTag &= -3;
              $e(Y.alternate, Y);
              break;

            case 1024:
              Y.effectTag &= -1025;
              break;

            case 1028:
              Y.effectTag &= -1025;
              $e(Y.alternate, Y);
              break;

            case 4:
              $e(Y.alternate, Y);
              break;

            case 8:
              var r = g,
                  w = Y,
                  z = h;
              Qa ? Se(r, w, z) : Ue(r, w, z);
              Ve(w);
          }

          Y = Y.nextEffect;
        }
      } catch (t) {
        if (null === Y) throw Error(n(330));
        Ke(Y, t);
        Y = Y.nextEffect;
      } while (null !== Y);

      Ea(a.containerInfo);
      a.current = c;
      Y = e;

      do try {
        for (k = a; null !== Y;) {
          var Q = Y.effectTag;
          Q & 36 && Pe(k, Y.alternate, Y);

          if (Q & 128) {
            l = void 0;
            var A = Y.ref;

            if (null !== A) {
              var v = Y.stateNode;

              switch (Y.tag) {
                case 5:
                  l = Aa(v);
                  break;

                default:
                  l = v;
              }

              "function" === typeof A ? A(l) : A.current = l;
            }
          }

          Y = Y.nextEffect;
        }
      } catch (t) {
        if (null === Y) throw Error(n(330));
        Ke(Y, t);
        Y = Y.nextEffect;
      } while (null !== Y);

      Y = null;
      Xb();
      W = f;
    } else a.current = c;

    if (Af) Af = !1, Bf = a, Cf = b;else for (Y = e; null !== Y;) b = Y.nextEffect, Y.nextEffect = null, Y = b;
    b = a.firstPendingTime;
    0 === b && (kf = null);
    1073741823 === b ? a === Ff ? Ef++ : (Ef = 0, Ff = a) : Ef = 0;
    "function" === typeof ig && ig(c.stateNode, d);
    Z(a);
    if (gf) throw gf = !1, a = hf, hf = null, a;
    if ((W & of) !== V) return null;
    H();
    return null;
  }

  function hg() {
    for (; null !== Y;) {
      var a = Y.effectTag;
      0 !== (a & 256) && Me(Y.alternate, Y);
      0 === (a & 512) || Af || (Af = !0, ec(97, function () {
        Nf();
        return null;
      }));
      Y = Y.nextEffect;
    }
  }

  function Nf() {
    if (90 !== Cf) {
      var a = 97 < Cf ? 97 : Cf;
      Cf = 90;
      return dc(a, jg);
    }
  }

  function jg() {
    if (null === Bf) return !1;
    var a = Bf;
    Bf = null;
    if ((W & (pf | qf)) !== V) throw Error(n(331));
    var b = W;
    W |= qf;

    for (a = a.current.firstEffect; null !== a;) {
      try {
        var c = a;
        if (0 !== (c.effectTag & 512)) switch (c.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            Ne(5, c), Oe(5, c);
        }
      } catch (d) {
        if (null === a) throw Error(n(330));
        Ke(a, d);
      }

      c = a.nextEffect;
      a.nextEffect = null;
      a = c;
    }

    W = b;
    H();
    return !0;
  }

  function kg(a, b, c) {
    b = Ge(c, b);
    b = ff(a, b, 1073741823);
    Bc(a, b);
    a = Hf(a, 1073741823);
    null !== a && Z(a);
  }

  function Ke(a, b) {
    if (3 === a.tag) kg(a, a, b);else for (var c = a.return; null !== c;) {
      if (3 === c.tag) {
        kg(c, a, b);
        break;
      } else if (1 === c.tag) {
        var d = c.stateNode;

        if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === kf || !kf.has(d))) {
          a = Ge(b, a);
          a = jf(c, a, 1073741823);
          Bc(c, a);
          c = Hf(c, 1073741823);
          null !== c && Z(c);
          break;
        }
      }

      c = c.return;
    }
  }

  function cg(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    T === a && U === c ? S === Be || S === Ae && 1073741823 === vf && G() - cf < zf ? Of(a, U) : yf = !0 : Kf(a, c) && (b = a.lastPingedTime, 0 !== b && b < c || (a.lastPingedTime = c, Z(a)));
  }

  function df(a, b) {
    var c = a.stateNode;
    null !== c && c.delete(b);
    b = 0;
    0 === b && (b = Lc(), b = Mc(b, a, null));
    a = Hf(a, b);
    null !== a && Z(a);
  }

  var fg;

  fg = function (a, b, c) {
    var d = b.expirationTime;

    if (null !== a) {
      var e = b.pendingProps;
      if (a.memoizedProps !== e || E.current) wc = !0;else {
        if (d < c) {
          wc = !1;

          switch (b.tag) {
            case 3:
              le(b);
              $d();
              break;

            case 5:
              jd(b);
              if (b.mode & 4 && 1 !== c && Ka(b.type, e)) return b.expirationTime = b.childExpirationTime = 1, null;
              break;

            case 1:
              F(b.type) && Ib(b);
              break;

            case 4:
              hd(b, b.stateNode.containerInfo);
              break;

            case 10:
              sc(b, b.memoizedProps.value);
              break;

            case 13:
              if (null !== b.memoizedState) {
                d = b.child.childExpirationTime;
                if (0 !== d && d >= c) return ne(a, b, c);
                C(K, K.current & 1);
                b = ce(a, b, c);
                return null !== b ? b.sibling : null;
              }

              C(K, K.current & 1);
              break;

            case 19:
              d = b.childExpirationTime >= c;

              if (0 !== (a.effectTag & 64)) {
                if (d) return qe(a, b, c);
                b.effectTag |= 64;
              }

              e = b.memoizedState;
              null !== e && (e.rendering = null, e.tail = null);
              C(K, K.current);
              if (!d) return null;
          }

          return ce(a, b, c);
        }

        wc = !1;
      }
    } else wc = !1;

    b.expirationTime = 0;

    switch (b.tag) {
      case 2:
        d = b.type;
        null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
        a = b.pendingProps;
        e = Eb(b, D.current);
        vc(b, c);
        e = rd(null, b, d, a, e, c);
        b.effectTag |= 1;

        if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
          b.tag = 1;
          b.memoizedState = null;
          b.updateQueue = null;

          if (F(d)) {
            var f = !0;
            Ib(b);
          } else f = !1;

          b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
          yc(b);
          var g = d.getDerivedStateFromProps;
          "function" === typeof g && Kc(b, d, g, a);
          e.updater = Oc;
          b.stateNode = e;
          e._reactInternalFiber = b;
          Sc(b, d, a, c);
          b = je(null, b, d, !0, f, c);
        } else b.tag = 0, R(null, b, e, c), b = b.child;

        return b;

      case 16:
        a: {
          e = b.elementType;
          null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
          a = b.pendingProps;
          ta(e);
          if (1 !== e._status) throw e._result;
          e = e._result;
          b.type = e;
          f = b.tag = lg(e);
          a = mc(e, a);

          switch (f) {
            case 0:
              b = ge(null, b, e, a, c);
              break a;

            case 1:
              b = ie(null, b, e, a, c);
              break a;

            case 11:
              b = be(null, b, e, a, c);
              break a;

            case 14:
              b = de(null, b, e, mc(e.type, a), d, c);
              break a;
          }

          throw Error(n(306, e, ""));
        }

        return b;

      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), ge(a, b, d, e, c);

      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), ie(a, b, d, e, c);

      case 3:
        le(b);
        d = b.updateQueue;
        if (null === a || null === d) throw Error(n(282));
        d = b.pendingProps;
        e = b.memoizedState;
        e = null !== e ? e.element : null;
        zc(a, b);
        Dc(b, d, null, c);
        d = b.memoizedState.element;
        if (d === e) $d(), b = ce(a, b, c);else {
          if (e = b.stateNode.hydrate) Sa ? (Sd = sb(b.stateNode.containerInfo), Rd = b, e = Td = !0) : e = !1;
          if (e) for (c = cd(b, null, d, c), b.child = c; c;) c.effectTag = c.effectTag & -3 | 1024, c = c.sibling;else R(a, b, d, c), $d();
          b = b.child;
        }
        return b;

      case 5:
        return jd(b), null === a && Xd(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ja(d, e) ? g = null : null !== f && Ja(d, f) && (b.effectTag |= 16), he(a, b), b.mode & 4 && 1 !== c && Ka(d, e) ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (R(a, b, g, c), b = b.child), b;

      case 6:
        return null === a && Xd(b), null;

      case 13:
        return ne(a, b, c);

      case 4:
        return hd(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = bd(b, null, d, c) : R(a, b, d, c), b.child;

      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), be(a, b, d, e, c);

      case 7:
        return R(a, b, b.pendingProps, c), b.child;

      case 8:
        return R(a, b, b.pendingProps.children, c), b.child;

      case 12:
        return R(a, b, b.pendingProps.children, c), b.child;

      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          g = b.memoizedProps;
          f = e.value;
          sc(b, f);

          if (null !== g) {
            var h = g.value;
            f = jc(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

            if (0 === f) {
              if (g.children === e.children && !E.current) {
                b = ce(a, b, c);
                break a;
              }
            } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
              var k = h.dependencies;

              if (null !== k) {
                g = h.child;

                for (var l = k.firstContext; null !== l;) {
                  if (l.context === d && 0 !== (l.observedBits & f)) {
                    1 === h.tag && (l = Ac(c, null), l.tag = 2, Bc(h, l));
                    h.expirationTime < c && (h.expirationTime = c);
                    l = h.alternate;
                    null !== l && l.expirationTime < c && (l.expirationTime = c);
                    uc(h.return, c);
                    k.expirationTime < c && (k.expirationTime = c);
                    break;
                  }

                  l = l.next;
                }
              } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

              if (null !== g) g.return = h;else for (g = h; null !== g;) {
                if (g === b) {
                  g = null;
                  break;
                }

                h = g.sibling;

                if (null !== h) {
                  h.return = g.return;
                  g = h;
                  break;
                }

                g = g.return;
              }
              h = g;
            }
          }

          R(a, b, e.children, c);
          b = b.child;
        }

        return b;

      case 9:
        return e = b.type, f = b.pendingProps, d = f.children, vc(b, c), e = I(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, R(a, b, d, c), b.child;

      case 14:
        return e = b.type, f = mc(e, b.pendingProps), f = mc(e.type, f), de(a, b, e, f, d, c);

      case 15:
        return fe(a, b, b.type, b.pendingProps, d, c);

      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), null !== a && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, F(d) ? (a = !0, Ib(b)) : a = !1, vc(b, c), Qc(b, d, e), Sc(b, d, e, c), je(null, b, d, !0, a, c);

      case 19:
        return qe(a, b, c);
    }

    throw Error(n(156, b.tag));
  };

  var mg = {
    current: !1
  },
      ig = null,
      Re = null;

  function ng(a) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
    var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (b.isDisabled || !b.supportsFiber) return !0;

    try {
      var c = b.inject(a);

      ig = function (a) {
        try {
          b.onCommitFiberRoot(c, a, void 0, 64 === (a.current.effectTag & 64));
        } catch (e) {}
      };

      Re = function (a) {
        try {
          b.onCommitFiberUnmount(c, a);
        } catch (e) {}
      };
    } catch (d) {}

    return !0;
  }

  function og(a, b, c, d) {
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

  function Vd(a, b, c, d) {
    return new og(a, b, c, d);
  }

  function ee(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }

  function lg(a) {
    if ("function" === typeof a) return ee(a) ? 1 : 0;

    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === la) return 11;
      if (a === oa) return 14;
    }

    return 2;
  }

  function Xc(a, b) {
    var c = a.alternate;
    null === c ? (c = Vd(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
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

  function Zc(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) ee(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
      case ea:
        return ad(c.children, e, f, b);

      case ka:
        g = 8;
        e |= 7;
        break;

      case fa:
        g = 8;
        e |= 1;
        break;

      case ha:
        return a = Vd(12, c, b, e | 8), a.elementType = ha, a.type = ha, a.expirationTime = f, a;

      case ma:
        return a = Vd(13, c, b, e), a.type = ma, a.elementType = ma, a.expirationTime = f, a;

      case na:
        return a = Vd(19, c, b, e), a.elementType = na, a.expirationTime = f, a;

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

          case qa:
            g = 22;
            break a;
        }
        throw Error(n(130, null == a ? a : typeof a, ""));
    }
    b = Vd(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.expirationTime = f;
    return b;
  }

  function ad(a, b, c, d) {
    a = Vd(7, a, d, b);
    a.expirationTime = c;
    return a;
  }

  function Yc(a, b, c) {
    a = Vd(6, a, null, b);
    a.expirationTime = c;
    return a;
  }

  function $c(a, b, c) {
    b = Vd(4, null !== a.children ? a.children : [], a.key, b);
    b.expirationTime = c;
    b.stateNode = {
      containerInfo: a.containerInfo,
      pendingChildren: null,
      implementation: a.implementation
    };
    return b;
  }

  function pg(a, b, c) {
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

  function Kf(a, b) {
    var c = a.firstSuspendedTime;
    a = a.lastSuspendedTime;
    return 0 !== c && c >= b && a <= b;
  }

  function De(a, b) {
    var c = a.firstSuspendedTime,
        d = a.lastSuspendedTime;
    c < b && (a.firstSuspendedTime = b);
    if (d > b || 0 === c) a.lastSuspendedTime = b;
    b <= a.lastPingedTime && (a.lastPingedTime = 0);
    b <= a.lastExpiredTime && (a.lastExpiredTime = 0);
  }

  function Ee(a, b) {
    b > a.firstPendingTime && (a.firstPendingTime = b);
    var c = a.firstSuspendedTime;
    0 !== c && (b >= c ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : b >= a.lastSuspendedTime && (a.lastSuspendedTime = b + 1), b > a.nextKnownPendingLevel && (a.nextKnownPendingLevel = b));
  }

  function Mf(a, b) {
    var c = a.lastExpiredTime;
    if (0 === c || c > b) a.lastExpiredTime = b;
  }

  var qg = null;

  function rg(a) {
    if (null === qg) try {
      var b = ("require" + Math.random()).slice(0, 7);
      qg = (module && module[b])("timers").setImmediate;
    } catch (c) {
      qg = function (a) {
        var b = new MessageChannel();
        b.port1.onmessage = a;
        b.port2.postMessage(void 0);
      };
    }
    return qg(a);
  }

  function sg(a) {
    var b = a._reactInternalFiber;

    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(n(188));
      throw Error(n(268, Object.keys(a)));
    }

    a = ya(b);
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

  var vg = p.IsSomeRendererActing,
      wg = "function" === typeof m.unstable_flushAllWithoutAsserting,
      xg = m.unstable_flushAllWithoutAsserting || function () {
    for (var a = !1; Nf();) a = !0;

    return a;
  };

  function yg(a) {
    try {
      xg(), rg(function () {
        xg() ? yg(a) : a();
      });
    } catch (b) {
      a(b);
    }
  }

  var zg = 0,
      Ag = !1,
      Bg = {
    __proto__: null,
    createContainer: function (a, b, c) {
      a = new pg(a, b, c);
      b = Vd(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
      a.current = b;
      b.stateNode = a;
      yc(b);
      return a;
    },
    updateContainer: function (a, b, c, d) {
      var e = b.current,
          f = Lc(),
          g = Ic.suspense;
      f = Mc(f, e, g);

      a: if (c) {
        c = c._reactInternalFiber;

        b: {
          if (va(c) !== c || 1 !== c.tag) throw Error(n(170));
          var h = c;

          do {
            switch (h.tag) {
              case 3:
                h = h.stateNode.context;
                break b;

              case 1:
                if (F(h.type)) {
                  h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                  break b;
                }

            }

            h = h.return;
          } while (null !== h);

          throw Error(n(171));
        }

        if (1 === c.tag) {
          var k = c.type;

          if (F(k)) {
            c = Hb(c, k, h);
            break a;
          }
        }

        c = h;
      } else c = Cb;

      null === b.context ? b.context = c : b.pendingContext = c;
      b = Ac(f, g);
      b.payload = {
        element: a
      };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      Bc(e, b);
      Nc(e, f);
      return f;
    },
    batchedEventUpdates: function (a, b) {
      var c = W;
      W |= 2;

      try {
        return a(b);
      } finally {
        W = c, W === V && H();
      }
    },
    batchedUpdates: Xf,
    unbatchedUpdates: function (a, b) {
      var c = W;
      W &= -2;
      W |= of;

      try {
        return a(b);
      } finally {
        W = c, W === V && H();
      }
    },
    deferredUpdates: function (a) {
      return dc(97, a);
    },
    syncUpdates: function (a, b, c, d) {
      return dc(99, a.bind(null, b, c, d));
    },
    discreteUpdates: function (a, b, c, d, e) {
      var f = W;
      W |= 4;

      try {
        return dc(98, a.bind(null, b, c, d, e));
      } finally {
        W = f, W === V && H();
      }
    },
    flushDiscreteUpdates: function () {
      (W & (1 | pf | qf)) === V && (Wf(), Nf());
    },
    flushControlled: function (a) {
      var b = W;
      W |= 1;

      try {
        dc(99, a);
      } finally {
        W = b, W === V && H();
      }
    },
    flushSync: Yf,
    flushPassiveEffects: Nf,
    IsThisRendererActing: mg,
    getPublicRootInstance: function (a) {
      a = a.current;
      if (!a.child) return null;

      switch (a.child.tag) {
        case 5:
          return Aa(a.child.stateNode);

        default:
          return a.child.stateNode;
      }
    },
    attemptSynchronousHydration: function (a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;
          b.hydrate && Vf(b, b.firstPendingTime);
          break;

        case 13:
          Yf(function () {
            return Nc(a, 1073741823);
          }), b = hc(Lc(), 150, 100), ug(a, b);
      }
    },
    attemptUserBlockingHydration: function (a) {
      if (13 === a.tag) {
        var b = hc(Lc(), 150, 100);
        Nc(a, b);
        ug(a, b);
      }
    },
    attemptContinuousHydration: function (a) {
      13 === a.tag && (Nc(a, 3), ug(a, 3));
    },
    attemptHydrationAtCurrentPriority: function (a) {
      if (13 === a.tag) {
        var b = Lc();
        b = Mc(b, a, null);
        Nc(a, b);
        ug(a, b);
      }
    },
    findHostInstance: sg,
    findHostInstanceWithWarning: function (a) {
      return sg(a);
    },
    findHostInstanceWithNoPortals: function (a) {
      a = za(a);
      return null === a ? null : 20 === a.tag ? a.stateNode.instance : a.stateNode;
    },
    shouldSuspend: function () {
      return !1;
    },
    injectIntoDevTools: function (a) {
      var b = a.findFiberByHostInstance;
      return ng(aa({}, a, {
        overrideHookState: null,
        overrideProps: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: p.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (a) {
          a = ya(a);
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
    },
    act: function (a) {
      function b() {
        zg--;
        vg.current = c;
        mg.current = d;
      }

      !1 === Ag && (Ag = !0, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
      zg++;
      var c = vg.current;
      var d = mg.current;
      vg.current = !0;
      mg.current = !0;

      try {
        var e = Xf(a);
      } catch (f) {
        throw b(), f;
      }

      if (null !== e && "object" === typeof e && "function" === typeof e.then) return {
        then: function (a, d) {
          e.then(function () {
            1 < zg || !0 === wg && !0 === c ? (b(), a()) : yg(function (c) {
              b();
              c ? d(c) : a();
            });
          }, function (a) {
            b();
            d(a);
          });
        }
      };

      try {
        1 !== zg || !1 !== wg && !1 !== c || xg(), b();
      } catch (f) {
        throw b(), f;
      }

      return {
        then: function (a) {
          a();
        }
      };
    }
  },
      Cg = Bg && Bg["default"] || Bg;
  module.exports = Cg.default || Cg;
  var $$$renderer = module.exports;
  module.exports = $$$reconciler;
  return $$$renderer;
};
});

var reactReconciler = entry.createCommonjsModule(function (module) {

{
  module.exports = reactReconciler_production_min;
}
});

const debug$1 = (title, data) => {
  if (process.env.DEBUG) {
    console.log(title, data);
  } // debugInner(title, JSON.stringify(data, null, 2))

};

const reconciler = reactReconciler({
  finalizeInitialChildren(element, type, props) {},

  getChildHostContext(parentContext, fiberType, rootInstance) {},

  getRootHostContext(rootInstance) {
    return {
      type: `recipes-root`
    };
  },

  shouldSetTextContent(type, props) {},

  resetTextContent(element) {},

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    const instance = {
      type,
      props
    };
    debug$1(`creating instance`, instance);
    return instance;
  },

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    debug$1(`creating text instance`, text);
    return {
      text
    };
  },

  commitTextUpdate(textInstance, oldText, newText) {
    debug$1(`updating text instance`, newText);
    textInstance.text = newText;
    return textInstance;
  },

  appendChildToContainer(container, child) {
    container.children = container.children || [];
    const propName = child.key ? `key` : `_uuid`;
    const index = container.children.findIndex(c => c[propName] === child[propName]);
    debug$1(`appending child to container at index ${index}`);

    if (index === -1) {
      container.children.push(child);
    } else {
      container.children[index] = child;
    }

    return container;
  },

  appendChild(parent, child) {
    debug$1(`appending child`, {
      parent,
      child
    });
    parent.children = parent.children || [];
    parent.children.push(child);
  },

  appendInitialChild(parent, child) {
    debug$1(`appending initial child`, {
      parent,
      child
    });
    parent.children = parent.children || [];
    parent.children.push(child);
  },

  removeChildFromContainer(container, child) {},

  removeChild(parent, child) {},

  insertInContainerBefore(container, child, before) {},

  insertBefore(parent, child, before) {},

  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext) {},

  commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork) {},

  hideInstance() {},

  unhideInstance() {},

  prepareForCommit(...args) {},

  resetAfterCommit(...args) {},

  getPublicInstance(...args) {},

  supportsMutation: true
});
const RecipesRenderer = {
  render(whatToRender, currState) {
    debug$1(`rendering recipe`);
    const container = reconciler.createContainer(currState, false, false);
    reconciler.updateContainer(whatToRender, container, null, null);
    return currState;
  }

};

class ErrorBoundary extends entry.react.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }

}

const isResource = type => type && (type === `Input` || resources[type]);

const extractPlan = (node, type) => {
  if (!isResource(type)) {
    return null;
  }

  let text = {};

  if (node.text) {
    try {
      text = JSON.parse(node.text);
    } catch {
      return null;
    }
  }

  const {
    _props: props,
    ...plan
  } = text;
  return {
    resourceName: type,
    resourceDefinitions: props,
    ...plan
  };
};

const transform$2 = (props = {}, type) => {
  if (!props.children) {
    const plan = extractPlan(props, type);
    return plan ? [plan] : [];
  }

  const plan = props.children.filter(Boolean).reduce((acc, curr) => {
    const childType = curr.type || type;
    let currText = {};

    if (curr.text) {
      try {
        currText = JSON.parse(curr.text);
      } catch {} // eslint-disable-line

    }

    if (childType === `Input`) {
      currText.resourceName = `Input`;
      return [...acc, currText];
    }

    if (!resources[childType]) {
      return [...acc, ...transform$2(curr, childType)];
    }

    const [rawResource, ...resourceChildren] = curr.children || [];
    const {
      _props,
      ...plan
    } = JSON.parse(rawResource.text);
    const resourcePlan = {
      resourceName: childType,
      resourceDefinitions: _props,
      ...plan
    };

    if (resourceChildren.length) {
      resourcePlan.resourceChildren = transform$2({
        children: resourceChildren
      }, childType);
    }

    return [...acc, resourcePlan];
  }, []);
  return plan;
};

function transformToPlanStructure(renderTree) {
  const [doc] = renderTree.children;
  return transform$2(doc);
}

const ParentResourceContext = /*#__PURE__*/entry.react.createContext({});
const useParentResourceContext = () => {
  const context = entry.react.useContext(ParentResourceContext);
  return context;
};
const ParentResourceProvider = ({
  data: providedData,
  children
}) => {
  const parentData = useParentResourceContext();
  const data = { ...parentData,
    ...providedData
  };
  return /*#__PURE__*/entry.react.createElement(ParentResourceContext.Provider, {
    value: data
  }, children);
};

const StepContext = /*#__PURE__*/entry.react.createContext({});
const useRecipeStep = () => {
  const context = entry.react.useContext(StepContext);
  return context;
};
const StepProvider = ({
  step,
  totalSteps,
  children
}) => /*#__PURE__*/entry.react.createElement(StepContext.Provider, {
  value: {
    step,
    totalSteps
  }
}, children);
const RecipeStep = ({
  step,
  totalSteps,
  children
}) => /*#__PURE__*/entry.react.createElement(StepProvider, {
  step: step,
  totalSteps: totalSteps
}, children);
const RecipeIntroduction = `div`;

// Match a resource's defined dependencies against all resources
// defined in the recipe.
function findDependencyMatch(resources, resourceWithDependencies) {
  // Resource doesn't have a dependsOn key so we return
  if (!resourceWithDependencies.dependsOn) {
    return [];
  } else {
    return resourceWithDependencies.dependsOn.map(dependency => {
      const {
        resourceName,
        ...otherValues
      } = dependency;
      const keys = Object.keys(otherValues);
      const match = resources.find(resource => {
        // Is this the right resourceName?
        if (resourceName !== resource.resourceName) {
          return false;
        } // Do keys match?


        if (!keys.every(key => Object.keys(resource.resourceDefinitions).indexOf(key) >= 0)) {
          return false;
        } // Do values match?


        if (!keys.every(key => resource.resourceDefinitions[key] === dependency[key])) {
          return false;
        }

        return resource;
      });

      if (match) {
        return match;
      } else {
        const {
          // eslint-disable-next-line
          mdxType,
          ...resourceDefinition
        } = resourceWithDependencies.resourceDefinitions;
        return {
          error: `A resource (${resourceWithDependencies.resourceName}: ${JSON.stringify(resourceDefinition)}) is missing its dependency on ${JSON.stringify(resourceWithDependencies.dependsOn[0])}`
        };
      }
    });
  }
}

const errorCache = new Map();
const GlobalsContext = /*#__PURE__*/entry.react.createContext({});

const useGlobals = () => entry.react.useContext(GlobalsContext);

const GlobalsProvider = GlobalsContext.Provider;

const getUserProps = props => {
  // eslint-disable-next-line
  const {
    mdxType,
    children,
    ...userProps
  } = props;
  return userProps;
};

const Wrapper = ({
  children,
  inputs,
  isApply,
  resultCache,
  inFlightCache,
  blockedResources,
  queue,
  plan
}) => /*#__PURE__*/entry.react.createElement(ErrorBoundary, null, /*#__PURE__*/entry.react.createElement(GlobalsProvider, {
  value: {
    mode: isApply ? `apply` : `plan`,
    resultCache,
    inFlightCache,
    blockedResources,
    queue
  }
}, /*#__PURE__*/entry.react.createElement(entry.ResourceProvider, {
  value: plan
}, /*#__PURE__*/entry.react.createElement(entry.InputProvider, {
  value: inputs
}, /*#__PURE__*/entry.react.createElement(entry.react.Suspense, {
  fallback: /*#__PURE__*/entry.react.createElement("p", null, "Loading recipe 1/2...")
}, children)))));

const ResourceComponent = ({
  _resourceName: Resource,
  _uuid,
  _type,
  children,
  ...props
}) => {
  const {
    mode,
    resultCache,
    inFlightCache,
    blockedResources,
    queue
  } = useGlobals();
  const step = useRecipeStep();
  const parentResourceContext = useParentResourceContext(); // TODO add provider onto context

  const resourceData = handleResource(Resource, { ...parentResourceContext,
    root: process.cwd(),
    _uuid,
    mode,
    resultCache,
    inFlightCache,
    blockedResources,
    queue
  }, props);
  return /*#__PURE__*/entry.react.createElement(ParentResourceProvider, {
    data: {
      [Resource]: resourceData
    }
  }, /*#__PURE__*/entry.react.createElement(Resource, null, JSON.stringify({ ...resourceData,
    _props: props,
    _stepMetadata: step,
    _uuid,
    _type
  }), children));
};

const validateResource = (resourceName, context, props) => {
  const userProps = getUserProps(props);
  const {
    error
  } = resources[resourceName].validate(userProps);

  if (error) {
    error.resourceUuid = context._uuid;
  }

  return error;
};

const handleResource = (resourceName, context, props) => {
  // Initialize
  const {
    mode,
    resultCache,
    inFlightCache,
    blockedResources,
    queue
  } = context; // TODO use session ID to ensure the IDs are unique..

  const trueKey = props._key ? props._key : context._uuid;
  let cacheKey; // Only run apply once per resource

  if (mode === `apply`) {
    cacheKey = mode + ` ` + resourceName + ` ` + trueKey;
  } else {
    cacheKey = JSON.stringify({
      resourceName,
      ...props,
      mode
    });
  }

  if (!errorCache.has(trueKey)) {
    const error = validateResource(resourceName, context, props);
    errorCache.set(trueKey, error);

    if (error) {
      const result = {
        error: `Validation error: ${error.details[0].message}`
      };
      resultCache.set(cacheKey, result);
      return result;
    }
  }

  const cachedResult = resultCache.get(cacheKey);
  const inFlightPromise = inFlightCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  if (inFlightPromise) {
    throw inFlightPromise;
  } // If this resource requires another resource to be created before it,
  // check to see if they're created. The first time this is called,
  // create a promise which we cache and keep throwing until
  // all the dependencies are created & then we reject the promise
  // to trigger andother render where we finally can create the
  // now no-longer-blocked resource.
  //
  // TODO test this when we can mock resources by varying what
  // resources depend on what & which return first and ensuring
  // resources end in right order.


  const allResources = entry.useResourceContext();
  const resourcePlan = allResources === null || allResources === void 0 ? void 0 : allResources.find(a => a.resourceDefinitions._key === trueKey || a._uuid === trueKey);

  if (mode === `apply` && resourcePlan.dependsOn) {
    const matches = findDependencyMatch(allResources, resourcePlan);
    let outsideReject;

    if (!matches.every(m => m.isDone)) {
      // Probably we're going to need a state machine
      // just for installing things, sheesh.
      if (blockedResources.get(cacheKey)) {
        throw blockedResources.get(cacheKey).promise;
      }

      const promise = new Promise((resolve, reject) => {
        outsideReject = reject;
      });
      blockedResources.set(cacheKey, {
        promise,
        outsideReject
      });
      throw promise;
    } else {
      blockedResources.get(cacheKey).outsideReject();
      blockedResources.delete(cacheKey);
    }
  }

  const fn = mode === `apply` ? `create` : `plan`;
  const promise = new Promise((resolve, reject) => {
    // Multiple of the same promises can be queued due to re-rendering
    // so this first checks for the cached result again before executing
    // the request.
    const cachedValue = resultCache.get(cacheKey);

    if (cachedValue) {
      resolve(cachedValue);
    } else {
      resources[resourceName][fn](context, props).then(result => {
        if (fn === `create`) {
          result.isDone = true;
        }

        inFlightCache.set(cacheKey, false);
        return result;
      }).then(result => {
        resultCache.set(cacheKey, result);
        return result;
      }).then(resolve).catch(e => {
        if (e.name === `MissingInfoError`) {
          inFlightCache.delete(cacheKey);
        }

        reject(e);
      });
    }
  });
  inFlightCache.set(cacheKey, promise);
  queue.push(promise);
  throw promise;
};

const render$1 = (recipe, cb, context = {}, isApply, isStream, name) => {
  const {
    inputs
  } = context;
  const emitter = mitt__default['default']();
  const renderState = {};
  const queue = new Queue__default['default'](async (job, cb) => {
    const result = await job;
    cb(null, result);
  }, {
    concurrent: 10000
  });
  const resultCache = new Map();
  const inFlightCache = new Map();
  const blockedResources = new Map();
  let result;
  let resourcesArray = [];
  const recipeWithWrapper = /*#__PURE__*/entry.react.createElement(Wrapper, {
    inputs: inputs,
    plan: context.plan,
    isApply: isApply,
    resultCache: resultCache,
    inFlightCache: inFlightCache,
    blockedResources: blockedResources,
    queue: queue
  }, recipe); // Keep calling render until there's remaining resources to render.
  // This let's resources that depend on other resources to pause until one finishes.

  const renderResources = isDrained => {
    result = RecipesRenderer.render(recipeWithWrapper, renderState, name);
    resourcesArray = transformToPlanStructure(result); // Tell UI about updates.

    emitter.emit(`update`, resourcesArray);

    const isDone = () => {
      let result; // Mostly for validation stage that checks that there's no resources
      // in the initial step — this done condition says no resources were found
      // and there's no inflight resource work (resources will be empty until the
      // first resource returns).
      //
      // We use "inFlightCache" because the queue doesn't immediately show up
      // as having things in it.

      if (resourcesArray.length === 0 && ![...inFlightCache.values()].some(a => a)) {
        result = true; // If there's still nothing on the queue and we've drained the queue, that means we're done.
      } else if (isDrained && queue.length === 0 && blockedResources.size === 0) {
        result = true; // If there's one resource & it fails validation, it doesn't go into the queue
        // so we check if inFlightCache is empty & all resources have an error.
      } else if (!resourcesArray.some(r => !r.error) && ![...inFlightCache.values()].some(a => a)) {
        result = true;
      } else {
        result = false;
      }

      return result;
    };

    if (isDone()) {
      // Rerender with the resources and resolve the data from the cache.
      emitter.emit(`done`, resourcesArray);
    }
  };

  const throttledRenderResources = ___default['default'].throttle(renderResources, 100);
  queue.on(`task_finish`, function (taskId, r, stats) {
    throttledRenderResources();
  });
  queue.on(`drain`, () => {
    renderResources(true);
  }); // When there's no resources, renderResources finishes synchronously
  // so wait for the next tick so the emitter listeners can be setup first.

  process.nextTick(() => renderResources());

  if (isStream) {
    return emitter;
  } else {
    return new Promise((resolve, reject) => {
      emitter.on(`*`, (type, e) => {
        if (type === `done`) {
          resolve(e);
        }

        if (type === `error`) {
          reject(e);
        }
      });
    });
  }
};

const resourceComponents = Object.keys(resources).reduce((acc, resourceName) => {
  acc[resourceName] = props => /*#__PURE__*/entry.react.createElement(entry.react.Suspense, {
    fallback: /*#__PURE__*/entry.react.createElement("p", null, "Reading ", resourceName, "...")
  }, /*#__PURE__*/entry.react.createElement(ResourceComponent, entry._extends({
    _resourceName: resourceName
  }, props))); // Make sure the component is pretty printed in reconciler output


  acc[resourceName].displayName = resourceName;
  return acc;
}, {});

// eslint-disable-next-line no-unused-vars

function Input(props) {
  const step = useRecipeStep();
  return JSON.stringify({ ...props,
    describe: props.label,
    _stepMetadata: {
      step: step.step
    }
  });
}

var remarkFootnotes = footnotes;
var tab$1 = 9; // '\t'

var lineFeed$3 = 10; // '\n'

var space$3 = 32;
var exclamationMark = 33; // '!'

var colon = 58; // ':'

var leftSquareBracket = 91; // '['

var backslash = 92; // '\'

var rightSquareBracket = 93; // ']'

var caret = 94; // '^'

var graveAccent = 96; //  '`'

var tabSize = 4;
var maxSlice = 1024;

function footnotes(options) {
  var parser = this.Parser;
  var compiler = this.Compiler;

  if (isRemarkParser(parser)) {
    attachParser(parser, options);
  }

  if (isRemarkCompiler(compiler)) {
    attachCompiler(compiler);
  }
}

function isRemarkParser(parser) {
  return Boolean(parser && parser.prototype && parser.prototype.blockTokenizers);
}

function isRemarkCompiler(compiler) {
  return Boolean(compiler && compiler.prototype && compiler.prototype.visitors);
}

function attachParser(parser, options) {
  var settings = options || {};
  var proto = parser.prototype;
  var blocks = proto.blockTokenizers;
  var spans = proto.inlineTokenizers;
  var blockMethods = proto.blockMethods;
  var inlineMethods = proto.inlineMethods;
  var originalDefinition = blocks.definition;
  var originalReference = spans.reference;
  var interruptors = [];
  var index = -1;
  var length = blockMethods.length;
  var method; // Interrupt by anything except for indented code or paragraphs.

  while (++index < length) {
    method = blockMethods[index];

    if (method === 'newline' || method === 'indentedCode' || method === 'paragraph' || method === 'footnoteDefinition') {
      continue;
    }

    interruptors.push([method]);
  }

  interruptors.push(['footnoteDefinition']); // Insert tokenizers.

  if (settings.inlineNotes) {
    before$1(inlineMethods, 'reference', 'inlineNote');
    spans.inlineNote = footnote;
  }

  before$1(blockMethods, 'definition', 'footnoteDefinition');
  before$1(inlineMethods, 'reference', 'footnoteCall');
  blocks.definition = definition;
  blocks.footnoteDefinition = footnoteDefinition;
  spans.footnoteCall = footnoteCall;
  spans.reference = reference;
  proto.interruptFootnoteDefinition = interruptors;
  reference.locator = originalReference.locator;
  footnoteCall.locator = locateFootnoteCall;
  footnote.locator = locateFootnote;

  function footnoteDefinition(eat, value, silent) {
    var self = this;
    var interruptors = self.interruptFootnoteDefinition;
    var offsets = self.offset;
    var length = value.length + 1;
    var index = 0;
    var content = [];
    var label;
    var labelStart;
    var labelEnd;
    var code;
    var now;
    var add;
    var exit;
    var children;
    var start;
    var indent;
    var contentStart;
    var lines;
    var line; // Skip initial whitespace.

    while (index < length) {
      code = value.charCodeAt(index);
      if (code !== tab$1 && code !== space$3) break;
      index++;
    } // Parse `[^`.


    if (value.charCodeAt(index++) !== leftSquareBracket) return;
    if (value.charCodeAt(index++) !== caret) return; // Parse label.

    labelStart = index;

    while (index < length) {
      code = value.charCodeAt(index); // Exit on white space.

      if (code !== code || code === lineFeed$3 || code === tab$1 || code === space$3) {
        return;
      }

      if (code === rightSquareBracket) {
        labelEnd = index;
        index++;
        break;
      }

      index++;
    } // Exit if we didn’t find an end, no label, or there’s no colon.


    if (labelEnd === undefined || labelStart === labelEnd || value.charCodeAt(index++) !== colon) {
      return;
    } // Found it!

    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    label = value.slice(labelStart, labelEnd); // Now, to get all lines.

    now = eat.now();
    start = 0;
    indent = 0;
    contentStart = index;
    lines = [];

    while (index < length) {
      code = value.charCodeAt(index);

      if (code !== code || code === lineFeed$3) {
        line = {
          start: start,
          contentStart: contentStart || index,
          contentEnd: index,
          end: index
        };
        lines.push(line); // Prepare a new line.

        if (code === lineFeed$3) {
          start = index + 1;
          indent = 0;
          contentStart = undefined;
          line.end = start;
        }
      } else if (indent !== undefined) {
        if (code === space$3 || code === tab$1) {
          indent += code === space$3 ? 1 : tabSize - indent % tabSize;

          if (indent > tabSize) {
            indent = undefined;
            contentStart = index;
          }
        } else {
          // If this line is not indented and it’s either preceded by a blank
          // line or starts a new block, exit.
          if (indent < tabSize && line && (line.contentStart === line.contentEnd || interrupt(interruptors, blocks, self, [eat, value.slice(index, maxSlice), true]))) {
            break;
          }

          indent = undefined;
          contentStart = index;
        }
      }

      index++;
    } // Remove trailing lines without content.


    index = -1;
    length = lines.length;

    while (length > 0) {
      line = lines[length - 1];

      if (line.contentStart !== line.contentEnd) {
        break;
      }

      length--;
    } // Add all, but ignore the final line feed.


    add = eat(value.slice(0, line.contentEnd)); // Add indent offsets and get content w/o indents.

    while (++index < length) {
      line = lines[index];
      offsets[now.line + index] = (offsets[now.line + index] || 0) + (line.contentStart - line.start);
      content.push(value.slice(line.contentStart, line.end));
    } // Parse content.


    exit = self.enterBlock();
    children = self.tokenizeBlock(content.join(''), now);
    exit();
    return add({
      type: 'footnoteDefinition',
      identifier: label.toLowerCase(),
      label: label,
      children: children
    });
  } // Parse a footnote call / footnote reference, such as `[^label]`


  function footnoteCall(eat, value, silent) {
    var length = value.length + 1;
    var index = 0;
    var label;
    var labelStart;
    var labelEnd;
    var code;
    if (value.charCodeAt(index++) !== leftSquareBracket) return;
    if (value.charCodeAt(index++) !== caret) return;
    labelStart = index;

    while (index < length) {
      code = value.charCodeAt(index);

      if (code !== code || code === lineFeed$3 || code === tab$1 || code === space$3) {
        return;
      }

      if (code === rightSquareBracket) {
        labelEnd = index;
        index++;
        break;
      }

      index++;
    }

    if (labelEnd === undefined || labelStart === labelEnd) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    label = value.slice(labelStart, labelEnd);
    return eat(value.slice(0, index))({
      type: 'footnoteReference',
      identifier: label.toLowerCase(),
      label: label
    });
  } // Parse an inline note / footnote, such as `^[text]`


  function footnote(eat, value, silent) {
    var self = this;
    var length = value.length + 1;
    var index = 0;
    var balance = 0;
    var now;
    var code;
    var contentStart;
    var contentEnd;
    var fenceStart;
    var fenceOpenSize;
    var fenceCloseSize;
    if (value.charCodeAt(index++) !== caret) return;
    if (value.charCodeAt(index++) !== leftSquareBracket) return;
    contentStart = index;

    while (index < length) {
      code = value.charCodeAt(index); // EOF:

      if (code !== code) {
        return;
      } // If we’re not in code:


      if (fenceOpenSize === undefined) {
        if (code === backslash) {
          index += 2;
        } else if (code === leftSquareBracket) {
          balance++;
          index++;
        } else if (code === rightSquareBracket) {
          if (balance === 0) {
            contentEnd = index;
            index++;
            break;
          } else {
            balance--;
            index++;
          }
        } else if (code === graveAccent) {
          fenceStart = index;
          fenceOpenSize = 1;

          while (value.charCodeAt(fenceStart + fenceOpenSize) === graveAccent) {
            fenceOpenSize++;
          }

          index += fenceOpenSize;
        } else {
          index++;
        }
      } // We’re in code:
      else {
        if (code === graveAccent) {
          fenceStart = index;
          fenceCloseSize = 1;

          while (value.charCodeAt(fenceStart + fenceCloseSize) === graveAccent) {
            fenceCloseSize++;
          }

          index += fenceCloseSize; // Found it, we’re no longer in code!

          if (fenceOpenSize === fenceCloseSize) {
            fenceOpenSize = undefined;
          }

          fenceCloseSize = undefined;
        } else {
          index++;
        }
      }
    }

    if (contentEnd === undefined) {
      return;
    }
    /* istanbul ignore if - never used (yet) */


    if (silent) {
      return true;
    }

    now = eat.now();
    now.column += 2;
    now.offset += 2;
    return eat(value.slice(0, index))({
      type: 'footnote',
      children: self.tokenizeInline(value.slice(contentStart, contentEnd), now)
    });
  } // Do not allow `![^` or `[^` as a normal reference, do pass all other values
  // through.


  function reference(eat, value, silent) {
    var index = 0;
    if (value.charCodeAt(index) === exclamationMark) index++;
    if (value.charCodeAt(index) !== leftSquareBracket) return;
    if (value.charCodeAt(index + 1) === caret) return;
    return originalReference.call(this, eat, value, silent);
  } // Do not allow `[^` as a normal definition, do pass all other values through.


  function definition(eat, value, silent) {
    var index = 0;
    var code = value.charCodeAt(index);

    while (code === space$3 || code === tab$1) code = value.charCodeAt(++index);

    if (code !== leftSquareBracket) return;
    if (value.charCodeAt(index + 1) === caret) return;
    return originalDefinition.call(this, eat, value, silent);
  }

  function locateFootnoteCall(value, from) {
    return value.indexOf('[', from);
  }

  function locateFootnote(value, from) {
    return value.indexOf('^[', from);
  }
}

function attachCompiler(compiler) {
  var serializers = compiler.prototype.visitors;
  var indent = '    ';
  serializers.footnote = footnote;
  serializers.footnoteReference = footnoteReference;
  serializers.footnoteDefinition = footnoteDefinition;

  function footnote(node) {
    return '^[' + this.all(node).join('') + ']';
  }

  function footnoteReference(node) {
    return '[^' + (node.label || node.identifier) + ']';
  }

  function footnoteDefinition(node) {
    var lines = this.all(node).join('\n\n').split('\n');
    var index = 0;
    var length = lines.length;
    var line; // Indent each line, except the first, that is not empty.

    while (++index < length) {
      line = lines[index];
      if (line === '') continue;
      lines[index] = indent + line;
    }

    return '[^' + (node.label || node.identifier) + ']: ' + lines.join('\n');
  }
}

function before$1(list, before, value) {
  list.splice(list.indexOf(before), 0, value);
} // Mimics <https://github.com/remarkjs/remark/blob/b4c993e/packages/remark-parse/lib/util/interrupt.js>,
// but simplified for our needs.


function interrupt(list, tokenizers, ctx, parameters) {
  var length = list.length;
  var index = -1;

  while (++index < length) {
    if (tokenizers[list[index][0]].apply(ctx, parameters)) {
      return true;
    }
  }

  return false;
}

var mdastSqueezeParagraphs = squeeze;
var whiteSpaceOnly = /^\s*$/;

function squeeze(tree) {
  return remove__default['default'](tree, {
    cascade: false
  }, isEmptyParagraph);
} // Whether paragraph is empty or composed only of whitespace.


function isEmptyParagraph(node) {
  return node.type === 'paragraph' && node.children.every(isEmptyText);
}

function isEmptyText(node) {
  return node.type === 'text' && whiteSpaceOnly.test(node.value);
}

var remarkSqueezeParagraphs = function () {
  return mdastSqueezeParagraphs;
};

const UNDEFINED_CODE_POINTS = [0xfffe, 0xffff, 0x1fffe, 0x1ffff, 0x2fffe, 0x2ffff, 0x3fffe, 0x3ffff, 0x4fffe, 0x4ffff, 0x5fffe, 0x5ffff, 0x6fffe, 0x6ffff, 0x7fffe, 0x7ffff, 0x8fffe, 0x8ffff, 0x9fffe, 0x9ffff, 0xafffe, 0xaffff, 0xbfffe, 0xbffff, 0xcfffe, 0xcffff, 0xdfffe, 0xdffff, 0xefffe, 0xeffff, 0xffffe, 0xfffff, 0x10fffe, 0x10ffff];
var REPLACEMENT_CHARACTER = '\uFFFD';
var CODE_POINTS = {
  EOF: -1,
  NULL: 0x00,
  TABULATION: 0x09,
  CARRIAGE_RETURN: 0x0d,
  LINE_FEED: 0x0a,
  FORM_FEED: 0x0c,
  SPACE: 0x20,
  EXCLAMATION_MARK: 0x21,
  QUOTATION_MARK: 0x22,
  NUMBER_SIGN: 0x23,
  AMPERSAND: 0x26,
  APOSTROPHE: 0x27,
  HYPHEN_MINUS: 0x2d,
  SOLIDUS: 0x2f,
  DIGIT_0: 0x30,
  DIGIT_9: 0x39,
  SEMICOLON: 0x3b,
  LESS_THAN_SIGN: 0x3c,
  EQUALS_SIGN: 0x3d,
  GREATER_THAN_SIGN: 0x3e,
  QUESTION_MARK: 0x3f,
  LATIN_CAPITAL_A: 0x41,
  LATIN_CAPITAL_F: 0x46,
  LATIN_CAPITAL_X: 0x58,
  LATIN_CAPITAL_Z: 0x5a,
  RIGHT_SQUARE_BRACKET: 0x5d,
  GRAVE_ACCENT: 0x60,
  LATIN_SMALL_A: 0x61,
  LATIN_SMALL_F: 0x66,
  LATIN_SMALL_X: 0x78,
  LATIN_SMALL_Z: 0x7a,
  REPLACEMENT_CHARACTER: 0xfffd
};
var CODE_POINT_SEQUENCES = {
  DASH_DASH_STRING: [0x2d, 0x2d],
  //--
  DOCTYPE_STRING: [0x44, 0x4f, 0x43, 0x54, 0x59, 0x50, 0x45],
  //DOCTYPE
  CDATA_START_STRING: [0x5b, 0x43, 0x44, 0x41, 0x54, 0x41, 0x5b],
  //[CDATA[
  SCRIPT_STRING: [0x73, 0x63, 0x72, 0x69, 0x70, 0x74],
  //script
  PUBLIC_STRING: [0x50, 0x55, 0x42, 0x4c, 0x49, 0x43],
  //PUBLIC
  SYSTEM_STRING: [0x53, 0x59, 0x53, 0x54, 0x45, 0x4d] //SYSTEM

}; //Surrogates

var isSurrogate = function (cp) {
  return cp >= 0xd800 && cp <= 0xdfff;
};

var isSurrogatePair = function (cp) {
  return cp >= 0xdc00 && cp <= 0xdfff;
};

var getSurrogatePairCodePoint = function (cp1, cp2) {
  return (cp1 - 0xd800) * 0x400 + 0x2400 + cp2;
}; //NOTE: excluding NULL and ASCII whitespace


var isControlCodePoint = function (cp) {
  return cp !== 0x20 && cp !== 0x0a && cp !== 0x0d && cp !== 0x09 && cp !== 0x0c && cp >= 0x01 && cp <= 0x1f || cp >= 0x7f && cp <= 0x9f;
};

var isUndefinedCodePoint = function (cp) {
  return cp >= 0xfdd0 && cp <= 0xfdef || UNDEFINED_CODE_POINTS.indexOf(cp) > -1;
};

var unicode = {
	REPLACEMENT_CHARACTER: REPLACEMENT_CHARACTER,
	CODE_POINTS: CODE_POINTS,
	CODE_POINT_SEQUENCES: CODE_POINT_SEQUENCES,
	isSurrogate: isSurrogate,
	isSurrogatePair: isSurrogatePair,
	getSurrogatePairCodePoint: getSurrogatePairCodePoint,
	isControlCodePoint: isControlCodePoint,
	isUndefinedCodePoint: isUndefinedCodePoint
};

var errorCodes = {
  controlCharacterInInputStream: 'control-character-in-input-stream',
  noncharacterInInputStream: 'noncharacter-in-input-stream',
  surrogateInInputStream: 'surrogate-in-input-stream',
  nonVoidHtmlElementStartTagWithTrailingSolidus: 'non-void-html-element-start-tag-with-trailing-solidus',
  endTagWithAttributes: 'end-tag-with-attributes',
  endTagWithTrailingSolidus: 'end-tag-with-trailing-solidus',
  unexpectedSolidusInTag: 'unexpected-solidus-in-tag',
  unexpectedNullCharacter: 'unexpected-null-character',
  unexpectedQuestionMarkInsteadOfTagName: 'unexpected-question-mark-instead-of-tag-name',
  invalidFirstCharacterOfTagName: 'invalid-first-character-of-tag-name',
  unexpectedEqualsSignBeforeAttributeName: 'unexpected-equals-sign-before-attribute-name',
  missingEndTagName: 'missing-end-tag-name',
  unexpectedCharacterInAttributeName: 'unexpected-character-in-attribute-name',
  unknownNamedCharacterReference: 'unknown-named-character-reference',
  missingSemicolonAfterCharacterReference: 'missing-semicolon-after-character-reference',
  unexpectedCharacterAfterDoctypeSystemIdentifier: 'unexpected-character-after-doctype-system-identifier',
  unexpectedCharacterInUnquotedAttributeValue: 'unexpected-character-in-unquoted-attribute-value',
  eofBeforeTagName: 'eof-before-tag-name',
  eofInTag: 'eof-in-tag',
  missingAttributeValue: 'missing-attribute-value',
  missingWhitespaceBetweenAttributes: 'missing-whitespace-between-attributes',
  missingWhitespaceAfterDoctypePublicKeyword: 'missing-whitespace-after-doctype-public-keyword',
  missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: 'missing-whitespace-between-doctype-public-and-system-identifiers',
  missingWhitespaceAfterDoctypeSystemKeyword: 'missing-whitespace-after-doctype-system-keyword',
  missingQuoteBeforeDoctypePublicIdentifier: 'missing-quote-before-doctype-public-identifier',
  missingQuoteBeforeDoctypeSystemIdentifier: 'missing-quote-before-doctype-system-identifier',
  missingDoctypePublicIdentifier: 'missing-doctype-public-identifier',
  missingDoctypeSystemIdentifier: 'missing-doctype-system-identifier',
  abruptDoctypePublicIdentifier: 'abrupt-doctype-public-identifier',
  abruptDoctypeSystemIdentifier: 'abrupt-doctype-system-identifier',
  cdataInHtmlContent: 'cdata-in-html-content',
  incorrectlyOpenedComment: 'incorrectly-opened-comment',
  eofInScriptHtmlCommentLikeText: 'eof-in-script-html-comment-like-text',
  eofInDoctype: 'eof-in-doctype',
  nestedComment: 'nested-comment',
  abruptClosingOfEmptyComment: 'abrupt-closing-of-empty-comment',
  eofInComment: 'eof-in-comment',
  incorrectlyClosedComment: 'incorrectly-closed-comment',
  eofInCdata: 'eof-in-cdata',
  absenceOfDigitsInNumericCharacterReference: 'absence-of-digits-in-numeric-character-reference',
  nullCharacterReference: 'null-character-reference',
  surrogateCharacterReference: 'surrogate-character-reference',
  characterReferenceOutsideUnicodeRange: 'character-reference-outside-unicode-range',
  controlCharacterReference: 'control-character-reference',
  noncharacterCharacterReference: 'noncharacter-character-reference',
  missingWhitespaceBeforeDoctypeName: 'missing-whitespace-before-doctype-name',
  missingDoctypeName: 'missing-doctype-name',
  invalidCharacterSequenceAfterDoctypeName: 'invalid-character-sequence-after-doctype-name',
  duplicateAttribute: 'duplicate-attribute',
  nonConformingDoctype: 'non-conforming-doctype',
  missingDoctype: 'missing-doctype',
  misplacedDoctype: 'misplaced-doctype',
  endTagWithoutMatchingOpenElement: 'end-tag-without-matching-open-element',
  closingOfElementWithOpenChildElements: 'closing-of-element-with-open-child-elements',
  disallowedContentInNoscriptInHead: 'disallowed-content-in-noscript-in-head',
  openElementsLeftAfterEof: 'open-elements-left-after-eof',
  abandonedHeadElementChild: 'abandoned-head-element-child',
  misplacedStartTagForHeadElement: 'misplaced-start-tag-for-head-element',
  nestedNoscriptInHead: 'nested-noscript-in-head',
  eofInElementThatCanContainOnlyText: 'eof-in-element-that-can-contain-only-text'
};

//Aliases


const $$4 = unicode.CODE_POINTS; //Const

const DEFAULT_BUFFER_WATERLINE = 1 << 16; //Preprocessor
//NOTE: HTML input preprocessing
//(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#preprocessing-the-input-stream)

class Preprocessor {
  constructor() {
    this.html = null;
    this.pos = -1;
    this.lastGapPos = -1;
    this.lastCharPos = -1;
    this.gapStack = [];
    this.skipNextNewLine = false;
    this.lastChunkWritten = false;
    this.endOfChunkHit = false;
    this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
  }

  _err() {// NOTE: err reporting is noop by default. Enabled by mixin.
  }

  _addGap() {
    this.gapStack.push(this.lastGapPos);
    this.lastGapPos = this.pos;
  }

  _processSurrogate(cp) {
    //NOTE: try to peek a surrogate pair
    if (this.pos !== this.lastCharPos) {
      const nextCp = this.html.charCodeAt(this.pos + 1);

      if (unicode.isSurrogatePair(nextCp)) {
        //NOTE: we have a surrogate pair. Peek pair character and recalculate code point.
        this.pos++; //NOTE: add gap that should be avoided during retreat

        this._addGap();

        return unicode.getSurrogatePairCodePoint(cp, nextCp);
      }
    } //NOTE: we are at the end of a chunk, therefore we can't infer surrogate pair yet.
    else if (!this.lastChunkWritten) {
      this.endOfChunkHit = true;
      return $$4.EOF;
    } //NOTE: isolated surrogate


    this._err(errorCodes.surrogateInInputStream);

    return cp;
  }

  dropParsedChunk() {
    if (this.pos > this.bufferWaterline) {
      this.lastCharPos -= this.pos;
      this.html = this.html.substring(this.pos);
      this.pos = 0;
      this.lastGapPos = -1;
      this.gapStack = [];
    }
  }

  write(chunk, isLastChunk) {
    if (this.html) {
      this.html += chunk;
    } else {
      this.html = chunk;
    }

    this.lastCharPos = this.html.length - 1;
    this.endOfChunkHit = false;
    this.lastChunkWritten = isLastChunk;
  }

  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1, this.html.length);
    this.lastCharPos = this.html.length - 1;
    this.endOfChunkHit = false;
  }

  advance() {
    this.pos++;

    if (this.pos > this.lastCharPos) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return $$4.EOF;
    }

    let cp = this.html.charCodeAt(this.pos); //NOTE: any U+000A LINE FEED (LF) characters that immediately follow a U+000D CARRIAGE RETURN (CR) character
    //must be ignored.

    if (this.skipNextNewLine && cp === $$4.LINE_FEED) {
      this.skipNextNewLine = false;

      this._addGap();

      return this.advance();
    } //NOTE: all U+000D CARRIAGE RETURN (CR) characters must be converted to U+000A LINE FEED (LF) characters


    if (cp === $$4.CARRIAGE_RETURN) {
      this.skipNextNewLine = true;
      return $$4.LINE_FEED;
    }

    this.skipNextNewLine = false;

    if (unicode.isSurrogate(cp)) {
      cp = this._processSurrogate(cp);
    } //OPTIMIZATION: first check if code point is in the common allowed
    //range (ASCII alphanumeric, whitespaces, big chunk of BMP)
    //before going into detailed performance cost validation.


    const isCommonValidRange = cp > 0x1f && cp < 0x7f || cp === $$4.LINE_FEED || cp === $$4.CARRIAGE_RETURN || cp > 0x9f && cp < 0xfdd0;

    if (!isCommonValidRange) {
      this._checkForProblematicCharacters(cp);
    }

    return cp;
  }

  _checkForProblematicCharacters(cp) {
    if (unicode.isControlCodePoint(cp)) {
      this._err(errorCodes.controlCharacterInInputStream);
    } else if (unicode.isUndefinedCodePoint(cp)) {
      this._err(errorCodes.noncharacterInInputStream);
    }
  }

  retreat() {
    if (this.pos === this.lastGapPos) {
      this.lastGapPos = this.gapStack.pop();
      this.pos--;
    }

    this.pos--;
  }

}

var preprocessor = Preprocessor;

//(details: https://github.com/inikulin/parse5/tree/master/scripts/generate-named-entity-data/README.md)

var namedEntityData = new Uint16Array([4, 52, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 106, 303, 412, 810, 1432, 1701, 1796, 1987, 2114, 2360, 2420, 2484, 3170, 3251, 4140, 4393, 4575, 4610, 5106, 5512, 5728, 6117, 6274, 6315, 6345, 6427, 6516, 7002, 7910, 8733, 9323, 9870, 10170, 10631, 10893, 11318, 11386, 11467, 12773, 13092, 14474, 14922, 15448, 15542, 16419, 17666, 18166, 18611, 19004, 19095, 19298, 19397, 4, 16, 69, 77, 97, 98, 99, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 140, 150, 158, 169, 176, 194, 199, 210, 216, 222, 226, 242, 256, 266, 283, 294, 108, 105, 103, 5, 198, 1, 59, 148, 1, 198, 80, 5, 38, 1, 59, 156, 1, 38, 99, 117, 116, 101, 5, 193, 1, 59, 167, 1, 193, 114, 101, 118, 101, 59, 1, 258, 4, 2, 105, 121, 182, 191, 114, 99, 5, 194, 1, 59, 189, 1, 194, 59, 1, 1040, 114, 59, 3, 55349, 56580, 114, 97, 118, 101, 5, 192, 1, 59, 208, 1, 192, 112, 104, 97, 59, 1, 913, 97, 99, 114, 59, 1, 256, 100, 59, 1, 10835, 4, 2, 103, 112, 232, 237, 111, 110, 59, 1, 260, 102, 59, 3, 55349, 56632, 112, 108, 121, 70, 117, 110, 99, 116, 105, 111, 110, 59, 1, 8289, 105, 110, 103, 5, 197, 1, 59, 264, 1, 197, 4, 2, 99, 115, 272, 277, 114, 59, 3, 55349, 56476, 105, 103, 110, 59, 1, 8788, 105, 108, 100, 101, 5, 195, 1, 59, 292, 1, 195, 109, 108, 5, 196, 1, 59, 301, 1, 196, 4, 8, 97, 99, 101, 102, 111, 114, 115, 117, 321, 350, 354, 383, 388, 394, 400, 405, 4, 2, 99, 114, 327, 336, 107, 115, 108, 97, 115, 104, 59, 1, 8726, 4, 2, 118, 119, 342, 345, 59, 1, 10983, 101, 100, 59, 1, 8966, 121, 59, 1, 1041, 4, 3, 99, 114, 116, 362, 369, 379, 97, 117, 115, 101, 59, 1, 8757, 110, 111, 117, 108, 108, 105, 115, 59, 1, 8492, 97, 59, 1, 914, 114, 59, 3, 55349, 56581, 112, 102, 59, 3, 55349, 56633, 101, 118, 101, 59, 1, 728, 99, 114, 59, 1, 8492, 109, 112, 101, 113, 59, 1, 8782, 4, 14, 72, 79, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 117, 442, 447, 456, 504, 542, 547, 569, 573, 577, 616, 678, 784, 790, 796, 99, 121, 59, 1, 1063, 80, 89, 5, 169, 1, 59, 454, 1, 169, 4, 3, 99, 112, 121, 464, 470, 497, 117, 116, 101, 59, 1, 262, 4, 2, 59, 105, 476, 478, 1, 8914, 116, 97, 108, 68, 105, 102, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8517, 108, 101, 121, 115, 59, 1, 8493, 4, 4, 97, 101, 105, 111, 514, 520, 530, 535, 114, 111, 110, 59, 1, 268, 100, 105, 108, 5, 199, 1, 59, 528, 1, 199, 114, 99, 59, 1, 264, 110, 105, 110, 116, 59, 1, 8752, 111, 116, 59, 1, 266, 4, 2, 100, 110, 553, 560, 105, 108, 108, 97, 59, 1, 184, 116, 101, 114, 68, 111, 116, 59, 1, 183, 114, 59, 1, 8493, 105, 59, 1, 935, 114, 99, 108, 101, 4, 4, 68, 77, 80, 84, 591, 596, 603, 609, 111, 116, 59, 1, 8857, 105, 110, 117, 115, 59, 1, 8854, 108, 117, 115, 59, 1, 8853, 105, 109, 101, 115, 59, 1, 8855, 111, 4, 2, 99, 115, 623, 646, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8754, 101, 67, 117, 114, 108, 121, 4, 2, 68, 81, 658, 671, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8221, 117, 111, 116, 101, 59, 1, 8217, 4, 4, 108, 110, 112, 117, 688, 701, 736, 753, 111, 110, 4, 2, 59, 101, 696, 698, 1, 8759, 59, 1, 10868, 4, 3, 103, 105, 116, 709, 717, 722, 114, 117, 101, 110, 116, 59, 1, 8801, 110, 116, 59, 1, 8751, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8750, 4, 2, 102, 114, 742, 745, 59, 1, 8450, 111, 100, 117, 99, 116, 59, 1, 8720, 110, 116, 101, 114, 67, 108, 111, 99, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8755, 111, 115, 115, 59, 1, 10799, 99, 114, 59, 3, 55349, 56478, 112, 4, 2, 59, 67, 803, 805, 1, 8915, 97, 112, 59, 1, 8781, 4, 11, 68, 74, 83, 90, 97, 99, 101, 102, 105, 111, 115, 834, 850, 855, 860, 865, 888, 903, 916, 921, 1011, 1415, 4, 2, 59, 111, 840, 842, 1, 8517, 116, 114, 97, 104, 100, 59, 1, 10513, 99, 121, 59, 1, 1026, 99, 121, 59, 1, 1029, 99, 121, 59, 1, 1039, 4, 3, 103, 114, 115, 873, 879, 883, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8609, 104, 118, 59, 1, 10980, 4, 2, 97, 121, 894, 900, 114, 111, 110, 59, 1, 270, 59, 1, 1044, 108, 4, 2, 59, 116, 910, 912, 1, 8711, 97, 59, 1, 916, 114, 59, 3, 55349, 56583, 4, 2, 97, 102, 927, 998, 4, 2, 99, 109, 933, 992, 114, 105, 116, 105, 99, 97, 108, 4, 4, 65, 68, 71, 84, 950, 957, 978, 985, 99, 117, 116, 101, 59, 1, 180, 111, 4, 2, 116, 117, 964, 967, 59, 1, 729, 98, 108, 101, 65, 99, 117, 116, 101, 59, 1, 733, 114, 97, 118, 101, 59, 1, 96, 105, 108, 100, 101, 59, 1, 732, 111, 110, 100, 59, 1, 8900, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8518, 4, 4, 112, 116, 117, 119, 1021, 1026, 1048, 1249, 102, 59, 3, 55349, 56635, 4, 3, 59, 68, 69, 1034, 1036, 1041, 1, 168, 111, 116, 59, 1, 8412, 113, 117, 97, 108, 59, 1, 8784, 98, 108, 101, 4, 6, 67, 68, 76, 82, 85, 86, 1065, 1082, 1101, 1189, 1211, 1236, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8751, 111, 4, 2, 116, 119, 1089, 1092, 59, 1, 168, 110, 65, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 101, 111, 1107, 1141, 102, 116, 4, 3, 65, 82, 84, 1117, 1124, 1136, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8660, 101, 101, 59, 1, 10980, 110, 103, 4, 2, 76, 82, 1149, 1177, 101, 102, 116, 4, 2, 65, 82, 1158, 1165, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10233, 105, 103, 104, 116, 4, 2, 65, 84, 1199, 1206, 114, 114, 111, 119, 59, 1, 8658, 101, 101, 59, 1, 8872, 112, 4, 2, 65, 68, 1218, 1225, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8741, 110, 4, 6, 65, 66, 76, 82, 84, 97, 1264, 1292, 1299, 1352, 1391, 1408, 114, 114, 111, 119, 4, 3, 59, 66, 85, 1276, 1278, 1283, 1, 8595, 97, 114, 59, 1, 10515, 112, 65, 114, 114, 111, 119, 59, 1, 8693, 114, 101, 118, 101, 59, 1, 785, 101, 102, 116, 4, 3, 82, 84, 86, 1310, 1323, 1334, 105, 103, 104, 116, 86, 101, 99, 116, 111, 114, 59, 1, 10576, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10590, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1345, 1347, 1, 8637, 97, 114, 59, 1, 10582, 105, 103, 104, 116, 4, 2, 84, 86, 1362, 1373, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10591, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1384, 1386, 1, 8641, 97, 114, 59, 1, 10583, 101, 101, 4, 2, 59, 65, 1399, 1401, 1, 8868, 114, 114, 111, 119, 59, 1, 8615, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 99, 116, 1421, 1426, 114, 59, 3, 55349, 56479, 114, 111, 107, 59, 1, 272, 4, 16, 78, 84, 97, 99, 100, 102, 103, 108, 109, 111, 112, 113, 115, 116, 117, 120, 1466, 1470, 1478, 1489, 1515, 1520, 1525, 1536, 1544, 1593, 1609, 1617, 1650, 1664, 1668, 1677, 71, 59, 1, 330, 72, 5, 208, 1, 59, 1476, 1, 208, 99, 117, 116, 101, 5, 201, 1, 59, 1487, 1, 201, 4, 3, 97, 105, 121, 1497, 1503, 1512, 114, 111, 110, 59, 1, 282, 114, 99, 5, 202, 1, 59, 1510, 1, 202, 59, 1, 1069, 111, 116, 59, 1, 278, 114, 59, 3, 55349, 56584, 114, 97, 118, 101, 5, 200, 1, 59, 1534, 1, 200, 101, 109, 101, 110, 116, 59, 1, 8712, 4, 2, 97, 112, 1550, 1555, 99, 114, 59, 1, 274, 116, 121, 4, 2, 83, 86, 1563, 1576, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9723, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9643, 4, 2, 103, 112, 1599, 1604, 111, 110, 59, 1, 280, 102, 59, 3, 55349, 56636, 115, 105, 108, 111, 110, 59, 1, 917, 117, 4, 2, 97, 105, 1624, 1640, 108, 4, 2, 59, 84, 1631, 1633, 1, 10869, 105, 108, 100, 101, 59, 1, 8770, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8652, 4, 2, 99, 105, 1656, 1660, 114, 59, 1, 8496, 109, 59, 1, 10867, 97, 59, 1, 919, 109, 108, 5, 203, 1, 59, 1675, 1, 203, 4, 2, 105, 112, 1683, 1689, 115, 116, 115, 59, 1, 8707, 111, 110, 101, 110, 116, 105, 97, 108, 69, 59, 1, 8519, 4, 5, 99, 102, 105, 111, 115, 1713, 1717, 1722, 1762, 1791, 121, 59, 1, 1060, 114, 59, 3, 55349, 56585, 108, 108, 101, 100, 4, 2, 83, 86, 1732, 1745, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9724, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9642, 4, 3, 112, 114, 117, 1770, 1775, 1781, 102, 59, 3, 55349, 56637, 65, 108, 108, 59, 1, 8704, 114, 105, 101, 114, 116, 114, 102, 59, 1, 8497, 99, 114, 59, 1, 8497, 4, 12, 74, 84, 97, 98, 99, 100, 102, 103, 111, 114, 115, 116, 1822, 1827, 1834, 1848, 1855, 1877, 1882, 1887, 1890, 1896, 1978, 1984, 99, 121, 59, 1, 1027, 5, 62, 1, 59, 1832, 1, 62, 109, 109, 97, 4, 2, 59, 100, 1843, 1845, 1, 915, 59, 1, 988, 114, 101, 118, 101, 59, 1, 286, 4, 3, 101, 105, 121, 1863, 1869, 1874, 100, 105, 108, 59, 1, 290, 114, 99, 59, 1, 284, 59, 1, 1043, 111, 116, 59, 1, 288, 114, 59, 3, 55349, 56586, 59, 1, 8921, 112, 102, 59, 3, 55349, 56638, 101, 97, 116, 101, 114, 4, 6, 69, 70, 71, 76, 83, 84, 1915, 1933, 1944, 1953, 1959, 1971, 113, 117, 97, 108, 4, 2, 59, 76, 1925, 1927, 1, 8805, 101, 115, 115, 59, 1, 8923, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8807, 114, 101, 97, 116, 101, 114, 59, 1, 10914, 101, 115, 115, 59, 1, 8823, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10878, 105, 108, 100, 101, 59, 1, 8819, 99, 114, 59, 3, 55349, 56482, 59, 1, 8811, 4, 8, 65, 97, 99, 102, 105, 111, 115, 117, 2005, 2012, 2026, 2032, 2036, 2049, 2073, 2089, 82, 68, 99, 121, 59, 1, 1066, 4, 2, 99, 116, 2018, 2023, 101, 107, 59, 1, 711, 59, 1, 94, 105, 114, 99, 59, 1, 292, 114, 59, 1, 8460, 108, 98, 101, 114, 116, 83, 112, 97, 99, 101, 59, 1, 8459, 4, 2, 112, 114, 2055, 2059, 102, 59, 1, 8461, 105, 122, 111, 110, 116, 97, 108, 76, 105, 110, 101, 59, 1, 9472, 4, 2, 99, 116, 2079, 2083, 114, 59, 1, 8459, 114, 111, 107, 59, 1, 294, 109, 112, 4, 2, 68, 69, 2097, 2107, 111, 119, 110, 72, 117, 109, 112, 59, 1, 8782, 113, 117, 97, 108, 59, 1, 8783, 4, 14, 69, 74, 79, 97, 99, 100, 102, 103, 109, 110, 111, 115, 116, 117, 2144, 2149, 2155, 2160, 2171, 2189, 2194, 2198, 2209, 2245, 2307, 2329, 2334, 2341, 99, 121, 59, 1, 1045, 108, 105, 103, 59, 1, 306, 99, 121, 59, 1, 1025, 99, 117, 116, 101, 5, 205, 1, 59, 2169, 1, 205, 4, 2, 105, 121, 2177, 2186, 114, 99, 5, 206, 1, 59, 2184, 1, 206, 59, 1, 1048, 111, 116, 59, 1, 304, 114, 59, 1, 8465, 114, 97, 118, 101, 5, 204, 1, 59, 2207, 1, 204, 4, 3, 59, 97, 112, 2217, 2219, 2238, 1, 8465, 4, 2, 99, 103, 2225, 2229, 114, 59, 1, 298, 105, 110, 97, 114, 121, 73, 59, 1, 8520, 108, 105, 101, 115, 59, 1, 8658, 4, 2, 116, 118, 2251, 2281, 4, 2, 59, 101, 2257, 2259, 1, 8748, 4, 2, 103, 114, 2265, 2271, 114, 97, 108, 59, 1, 8747, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8898, 105, 115, 105, 98, 108, 101, 4, 2, 67, 84, 2293, 2300, 111, 109, 109, 97, 59, 1, 8291, 105, 109, 101, 115, 59, 1, 8290, 4, 3, 103, 112, 116, 2315, 2320, 2325, 111, 110, 59, 1, 302, 102, 59, 3, 55349, 56640, 97, 59, 1, 921, 99, 114, 59, 1, 8464, 105, 108, 100, 101, 59, 1, 296, 4, 2, 107, 109, 2347, 2352, 99, 121, 59, 1, 1030, 108, 5, 207, 1, 59, 2358, 1, 207, 4, 5, 99, 102, 111, 115, 117, 2372, 2386, 2391, 2397, 2414, 4, 2, 105, 121, 2378, 2383, 114, 99, 59, 1, 308, 59, 1, 1049, 114, 59, 3, 55349, 56589, 112, 102, 59, 3, 55349, 56641, 4, 2, 99, 101, 2403, 2408, 114, 59, 3, 55349, 56485, 114, 99, 121, 59, 1, 1032, 107, 99, 121, 59, 1, 1028, 4, 7, 72, 74, 97, 99, 102, 111, 115, 2436, 2441, 2446, 2452, 2467, 2472, 2478, 99, 121, 59, 1, 1061, 99, 121, 59, 1, 1036, 112, 112, 97, 59, 1, 922, 4, 2, 101, 121, 2458, 2464, 100, 105, 108, 59, 1, 310, 59, 1, 1050, 114, 59, 3, 55349, 56590, 112, 102, 59, 3, 55349, 56642, 99, 114, 59, 3, 55349, 56486, 4, 11, 74, 84, 97, 99, 101, 102, 108, 109, 111, 115, 116, 2508, 2513, 2520, 2562, 2585, 2981, 2986, 3004, 3011, 3146, 3167, 99, 121, 59, 1, 1033, 5, 60, 1, 59, 2518, 1, 60, 4, 5, 99, 109, 110, 112, 114, 2532, 2538, 2544, 2548, 2558, 117, 116, 101, 59, 1, 313, 98, 100, 97, 59, 1, 923, 103, 59, 1, 10218, 108, 97, 99, 101, 116, 114, 102, 59, 1, 8466, 114, 59, 1, 8606, 4, 3, 97, 101, 121, 2570, 2576, 2582, 114, 111, 110, 59, 1, 317, 100, 105, 108, 59, 1, 315, 59, 1, 1051, 4, 2, 102, 115, 2591, 2907, 116, 4, 10, 65, 67, 68, 70, 82, 84, 85, 86, 97, 114, 2614, 2663, 2672, 2728, 2735, 2760, 2820, 2870, 2888, 2895, 4, 2, 110, 114, 2620, 2633, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10216, 114, 111, 119, 4, 3, 59, 66, 82, 2644, 2646, 2651, 1, 8592, 97, 114, 59, 1, 8676, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8646, 101, 105, 108, 105, 110, 103, 59, 1, 8968, 111, 4, 2, 117, 119, 2679, 2692, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10214, 110, 4, 2, 84, 86, 2699, 2710, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10593, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2721, 2723, 1, 8643, 97, 114, 59, 1, 10585, 108, 111, 111, 114, 59, 1, 8970, 105, 103, 104, 116, 4, 2, 65, 86, 2745, 2752, 114, 114, 111, 119, 59, 1, 8596, 101, 99, 116, 111, 114, 59, 1, 10574, 4, 2, 101, 114, 2766, 2792, 101, 4, 3, 59, 65, 86, 2775, 2777, 2784, 1, 8867, 114, 114, 111, 119, 59, 1, 8612, 101, 99, 116, 111, 114, 59, 1, 10586, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 2806, 2808, 2813, 1, 8882, 97, 114, 59, 1, 10703, 113, 117, 97, 108, 59, 1, 8884, 112, 4, 3, 68, 84, 86, 2829, 2841, 2852, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10577, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10592, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2863, 2865, 1, 8639, 97, 114, 59, 1, 10584, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2881, 2883, 1, 8636, 97, 114, 59, 1, 10578, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8660, 115, 4, 6, 69, 70, 71, 76, 83, 84, 2922, 2936, 2947, 2956, 2962, 2974, 113, 117, 97, 108, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8922, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8806, 114, 101, 97, 116, 101, 114, 59, 1, 8822, 101, 115, 115, 59, 1, 10913, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10877, 105, 108, 100, 101, 59, 1, 8818, 114, 59, 3, 55349, 56591, 4, 2, 59, 101, 2992, 2994, 1, 8920, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8666, 105, 100, 111, 116, 59, 1, 319, 4, 3, 110, 112, 119, 3019, 3110, 3115, 103, 4, 4, 76, 82, 108, 114, 3030, 3058, 3070, 3098, 101, 102, 116, 4, 2, 65, 82, 3039, 3046, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10231, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10230, 101, 102, 116, 4, 2, 97, 114, 3079, 3086, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10233, 102, 59, 3, 55349, 56643, 101, 114, 4, 2, 76, 82, 3123, 3134, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8601, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8600, 4, 3, 99, 104, 116, 3154, 3158, 3161, 114, 59, 1, 8466, 59, 1, 8624, 114, 111, 107, 59, 1, 321, 59, 1, 8810, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 3188, 3192, 3196, 3222, 3227, 3237, 3243, 3248, 112, 59, 1, 10501, 121, 59, 1, 1052, 4, 2, 100, 108, 3202, 3213, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8287, 108, 105, 110, 116, 114, 102, 59, 1, 8499, 114, 59, 3, 55349, 56592, 110, 117, 115, 80, 108, 117, 115, 59, 1, 8723, 112, 102, 59, 3, 55349, 56644, 99, 114, 59, 1, 8499, 59, 1, 924, 4, 9, 74, 97, 99, 101, 102, 111, 115, 116, 117, 3271, 3276, 3283, 3306, 3422, 3427, 4120, 4126, 4137, 99, 121, 59, 1, 1034, 99, 117, 116, 101, 59, 1, 323, 4, 3, 97, 101, 121, 3291, 3297, 3303, 114, 111, 110, 59, 1, 327, 100, 105, 108, 59, 1, 325, 59, 1, 1053, 4, 3, 103, 115, 119, 3314, 3380, 3415, 97, 116, 105, 118, 101, 4, 3, 77, 84, 86, 3327, 3340, 3365, 101, 100, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8203, 104, 105, 4, 2, 99, 110, 3348, 3357, 107, 83, 112, 97, 99, 101, 59, 1, 8203, 83, 112, 97, 99, 101, 59, 1, 8203, 101, 114, 121, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8203, 116, 101, 100, 4, 2, 71, 76, 3389, 3405, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8811, 101, 115, 115, 76, 101, 115, 115, 59, 1, 8810, 76, 105, 110, 101, 59, 1, 10, 114, 59, 3, 55349, 56593, 4, 4, 66, 110, 112, 116, 3437, 3444, 3460, 3464, 114, 101, 97, 107, 59, 1, 8288, 66, 114, 101, 97, 107, 105, 110, 103, 83, 112, 97, 99, 101, 59, 1, 160, 102, 59, 1, 8469, 4, 13, 59, 67, 68, 69, 71, 72, 76, 78, 80, 82, 83, 84, 86, 3492, 3494, 3517, 3536, 3578, 3657, 3685, 3784, 3823, 3860, 3915, 4066, 4107, 1, 10988, 4, 2, 111, 117, 3500, 3510, 110, 103, 114, 117, 101, 110, 116, 59, 1, 8802, 112, 67, 97, 112, 59, 1, 8813, 111, 117, 98, 108, 101, 86, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8742, 4, 3, 108, 113, 120, 3544, 3552, 3571, 101, 109, 101, 110, 116, 59, 1, 8713, 117, 97, 108, 4, 2, 59, 84, 3561, 3563, 1, 8800, 105, 108, 100, 101, 59, 3, 8770, 824, 105, 115, 116, 115, 59, 1, 8708, 114, 101, 97, 116, 101, 114, 4, 7, 59, 69, 70, 71, 76, 83, 84, 3600, 3602, 3609, 3621, 3631, 3637, 3650, 1, 8815, 113, 117, 97, 108, 59, 1, 8817, 117, 108, 108, 69, 113, 117, 97, 108, 59, 3, 8807, 824, 114, 101, 97, 116, 101, 114, 59, 3, 8811, 824, 101, 115, 115, 59, 1, 8825, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10878, 824, 105, 108, 100, 101, 59, 1, 8821, 117, 109, 112, 4, 2, 68, 69, 3666, 3677, 111, 119, 110, 72, 117, 109, 112, 59, 3, 8782, 824, 113, 117, 97, 108, 59, 3, 8783, 824, 101, 4, 2, 102, 115, 3692, 3724, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3709, 3711, 3717, 1, 8938, 97, 114, 59, 3, 10703, 824, 113, 117, 97, 108, 59, 1, 8940, 115, 4, 6, 59, 69, 71, 76, 83, 84, 3739, 3741, 3748, 3757, 3764, 3777, 1, 8814, 113, 117, 97, 108, 59, 1, 8816, 114, 101, 97, 116, 101, 114, 59, 1, 8824, 101, 115, 115, 59, 3, 8810, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10877, 824, 105, 108, 100, 101, 59, 1, 8820, 101, 115, 116, 101, 100, 4, 2, 71, 76, 3795, 3812, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 3, 10914, 824, 101, 115, 115, 76, 101, 115, 115, 59, 3, 10913, 824, 114, 101, 99, 101, 100, 101, 115, 4, 3, 59, 69, 83, 3838, 3840, 3848, 1, 8832, 113, 117, 97, 108, 59, 3, 10927, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8928, 4, 2, 101, 105, 3866, 3881, 118, 101, 114, 115, 101, 69, 108, 101, 109, 101, 110, 116, 59, 1, 8716, 103, 104, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3900, 3902, 3908, 1, 8939, 97, 114, 59, 3, 10704, 824, 113, 117, 97, 108, 59, 1, 8941, 4, 2, 113, 117, 3921, 3973, 117, 97, 114, 101, 83, 117, 4, 2, 98, 112, 3933, 3952, 115, 101, 116, 4, 2, 59, 69, 3942, 3945, 3, 8847, 824, 113, 117, 97, 108, 59, 1, 8930, 101, 114, 115, 101, 116, 4, 2, 59, 69, 3963, 3966, 3, 8848, 824, 113, 117, 97, 108, 59, 1, 8931, 4, 3, 98, 99, 112, 3981, 4000, 4045, 115, 101, 116, 4, 2, 59, 69, 3990, 3993, 3, 8834, 8402, 113, 117, 97, 108, 59, 1, 8840, 99, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 4015, 4017, 4025, 4037, 1, 8833, 113, 117, 97, 108, 59, 3, 10928, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8929, 105, 108, 100, 101, 59, 3, 8831, 824, 101, 114, 115, 101, 116, 4, 2, 59, 69, 4056, 4059, 3, 8835, 8402, 113, 117, 97, 108, 59, 1, 8841, 105, 108, 100, 101, 4, 4, 59, 69, 70, 84, 4080, 4082, 4089, 4100, 1, 8769, 113, 117, 97, 108, 59, 1, 8772, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8775, 105, 108, 100, 101, 59, 1, 8777, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8740, 99, 114, 59, 3, 55349, 56489, 105, 108, 100, 101, 5, 209, 1, 59, 4135, 1, 209, 59, 1, 925, 4, 14, 69, 97, 99, 100, 102, 103, 109, 111, 112, 114, 115, 116, 117, 118, 4170, 4176, 4187, 4205, 4212, 4217, 4228, 4253, 4259, 4292, 4295, 4316, 4337, 4346, 108, 105, 103, 59, 1, 338, 99, 117, 116, 101, 5, 211, 1, 59, 4185, 1, 211, 4, 2, 105, 121, 4193, 4202, 114, 99, 5, 212, 1, 59, 4200, 1, 212, 59, 1, 1054, 98, 108, 97, 99, 59, 1, 336, 114, 59, 3, 55349, 56594, 114, 97, 118, 101, 5, 210, 1, 59, 4226, 1, 210, 4, 3, 97, 101, 105, 4236, 4241, 4246, 99, 114, 59, 1, 332, 103, 97, 59, 1, 937, 99, 114, 111, 110, 59, 1, 927, 112, 102, 59, 3, 55349, 56646, 101, 110, 67, 117, 114, 108, 121, 4, 2, 68, 81, 4272, 4285, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8220, 117, 111, 116, 101, 59, 1, 8216, 59, 1, 10836, 4, 2, 99, 108, 4301, 4306, 114, 59, 3, 55349, 56490, 97, 115, 104, 5, 216, 1, 59, 4314, 1, 216, 105, 4, 2, 108, 109, 4323, 4332, 100, 101, 5, 213, 1, 59, 4330, 1, 213, 101, 115, 59, 1, 10807, 109, 108, 5, 214, 1, 59, 4344, 1, 214, 101, 114, 4, 2, 66, 80, 4354, 4380, 4, 2, 97, 114, 4360, 4364, 114, 59, 1, 8254, 97, 99, 4, 2, 101, 107, 4372, 4375, 59, 1, 9182, 101, 116, 59, 1, 9140, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9180, 4, 9, 97, 99, 102, 104, 105, 108, 111, 114, 115, 4413, 4422, 4426, 4431, 4435, 4438, 4448, 4471, 4561, 114, 116, 105, 97, 108, 68, 59, 1, 8706, 121, 59, 1, 1055, 114, 59, 3, 55349, 56595, 105, 59, 1, 934, 59, 1, 928, 117, 115, 77, 105, 110, 117, 115, 59, 1, 177, 4, 2, 105, 112, 4454, 4467, 110, 99, 97, 114, 101, 112, 108, 97, 110, 101, 59, 1, 8460, 102, 59, 1, 8473, 4, 4, 59, 101, 105, 111, 4481, 4483, 4526, 4531, 1, 10939, 99, 101, 100, 101, 115, 4, 4, 59, 69, 83, 84, 4498, 4500, 4507, 4519, 1, 8826, 113, 117, 97, 108, 59, 1, 10927, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8828, 105, 108, 100, 101, 59, 1, 8830, 109, 101, 59, 1, 8243, 4, 2, 100, 112, 4537, 4543, 117, 99, 116, 59, 1, 8719, 111, 114, 116, 105, 111, 110, 4, 2, 59, 97, 4555, 4557, 1, 8759, 108, 59, 1, 8733, 4, 2, 99, 105, 4567, 4572, 114, 59, 3, 55349, 56491, 59, 1, 936, 4, 4, 85, 102, 111, 115, 4585, 4594, 4599, 4604, 79, 84, 5, 34, 1, 59, 4592, 1, 34, 114, 59, 3, 55349, 56596, 112, 102, 59, 1, 8474, 99, 114, 59, 3, 55349, 56492, 4, 12, 66, 69, 97, 99, 101, 102, 104, 105, 111, 114, 115, 117, 4636, 4642, 4650, 4681, 4704, 4763, 4767, 4771, 5047, 5069, 5081, 5094, 97, 114, 114, 59, 1, 10512, 71, 5, 174, 1, 59, 4648, 1, 174, 4, 3, 99, 110, 114, 4658, 4664, 4668, 117, 116, 101, 59, 1, 340, 103, 59, 1, 10219, 114, 4, 2, 59, 116, 4675, 4677, 1, 8608, 108, 59, 1, 10518, 4, 3, 97, 101, 121, 4689, 4695, 4701, 114, 111, 110, 59, 1, 344, 100, 105, 108, 59, 1, 342, 59, 1, 1056, 4, 2, 59, 118, 4710, 4712, 1, 8476, 101, 114, 115, 101, 4, 2, 69, 85, 4722, 4748, 4, 2, 108, 113, 4728, 4736, 101, 109, 101, 110, 116, 59, 1, 8715, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8651, 112, 69, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10607, 114, 59, 1, 8476, 111, 59, 1, 929, 103, 104, 116, 4, 8, 65, 67, 68, 70, 84, 85, 86, 97, 4792, 4840, 4849, 4905, 4912, 4972, 5022, 5040, 4, 2, 110, 114, 4798, 4811, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10217, 114, 111, 119, 4, 3, 59, 66, 76, 4822, 4824, 4829, 1, 8594, 97, 114, 59, 1, 8677, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8644, 101, 105, 108, 105, 110, 103, 59, 1, 8969, 111, 4, 2, 117, 119, 4856, 4869, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10215, 110, 4, 2, 84, 86, 4876, 4887, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10589, 101, 99, 116, 111, 114, 4, 2, 59, 66, 4898, 4900, 1, 8642, 97, 114, 59, 1, 10581, 108, 111, 111, 114, 59, 1, 8971, 4, 2, 101, 114, 4918, 4944, 101, 4, 3, 59, 65, 86, 4927, 4929, 4936, 1, 8866, 114, 114, 111, 119, 59, 1, 8614, 101, 99, 116, 111, 114, 59, 1, 10587, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 4958, 4960, 4965, 1, 8883, 97, 114, 59, 1, 10704, 113, 117, 97, 108, 59, 1, 8885, 112, 4, 3, 68, 84, 86, 4981, 4993, 5004, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10575, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10588, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5015, 5017, 1, 8638, 97, 114, 59, 1, 10580, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5033, 5035, 1, 8640, 97, 114, 59, 1, 10579, 114, 114, 111, 119, 59, 1, 8658, 4, 2, 112, 117, 5053, 5057, 102, 59, 1, 8477, 110, 100, 73, 109, 112, 108, 105, 101, 115, 59, 1, 10608, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8667, 4, 2, 99, 104, 5087, 5091, 114, 59, 1, 8475, 59, 1, 8625, 108, 101, 68, 101, 108, 97, 121, 101, 100, 59, 1, 10740, 4, 13, 72, 79, 97, 99, 102, 104, 105, 109, 111, 113, 115, 116, 117, 5134, 5150, 5157, 5164, 5198, 5203, 5259, 5265, 5277, 5283, 5374, 5380, 5385, 4, 2, 67, 99, 5140, 5146, 72, 99, 121, 59, 1, 1065, 121, 59, 1, 1064, 70, 84, 99, 121, 59, 1, 1068, 99, 117, 116, 101, 59, 1, 346, 4, 5, 59, 97, 101, 105, 121, 5176, 5178, 5184, 5190, 5195, 1, 10940, 114, 111, 110, 59, 1, 352, 100, 105, 108, 59, 1, 350, 114, 99, 59, 1, 348, 59, 1, 1057, 114, 59, 3, 55349, 56598, 111, 114, 116, 4, 4, 68, 76, 82, 85, 5216, 5227, 5238, 5250, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8595, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8592, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8594, 112, 65, 114, 114, 111, 119, 59, 1, 8593, 103, 109, 97, 59, 1, 931, 97, 108, 108, 67, 105, 114, 99, 108, 101, 59, 1, 8728, 112, 102, 59, 3, 55349, 56650, 4, 2, 114, 117, 5289, 5293, 116, 59, 1, 8730, 97, 114, 101, 4, 4, 59, 73, 83, 85, 5306, 5308, 5322, 5367, 1, 9633, 110, 116, 101, 114, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8851, 117, 4, 2, 98, 112, 5329, 5347, 115, 101, 116, 4, 2, 59, 69, 5338, 5340, 1, 8847, 113, 117, 97, 108, 59, 1, 8849, 101, 114, 115, 101, 116, 4, 2, 59, 69, 5358, 5360, 1, 8848, 113, 117, 97, 108, 59, 1, 8850, 110, 105, 111, 110, 59, 1, 8852, 99, 114, 59, 3, 55349, 56494, 97, 114, 59, 1, 8902, 4, 4, 98, 99, 109, 112, 5395, 5420, 5475, 5478, 4, 2, 59, 115, 5401, 5403, 1, 8912, 101, 116, 4, 2, 59, 69, 5411, 5413, 1, 8912, 113, 117, 97, 108, 59, 1, 8838, 4, 2, 99, 104, 5426, 5468, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 5440, 5442, 5449, 5461, 1, 8827, 113, 117, 97, 108, 59, 1, 10928, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8829, 105, 108, 100, 101, 59, 1, 8831, 84, 104, 97, 116, 59, 1, 8715, 59, 1, 8721, 4, 3, 59, 101, 115, 5486, 5488, 5507, 1, 8913, 114, 115, 101, 116, 4, 2, 59, 69, 5498, 5500, 1, 8835, 113, 117, 97, 108, 59, 1, 8839, 101, 116, 59, 1, 8913, 4, 11, 72, 82, 83, 97, 99, 102, 104, 105, 111, 114, 115, 5536, 5546, 5552, 5567, 5579, 5602, 5607, 5655, 5695, 5701, 5711, 79, 82, 78, 5, 222, 1, 59, 5544, 1, 222, 65, 68, 69, 59, 1, 8482, 4, 2, 72, 99, 5558, 5563, 99, 121, 59, 1, 1035, 121, 59, 1, 1062, 4, 2, 98, 117, 5573, 5576, 59, 1, 9, 59, 1, 932, 4, 3, 97, 101, 121, 5587, 5593, 5599, 114, 111, 110, 59, 1, 356, 100, 105, 108, 59, 1, 354, 59, 1, 1058, 114, 59, 3, 55349, 56599, 4, 2, 101, 105, 5613, 5631, 4, 2, 114, 116, 5619, 5627, 101, 102, 111, 114, 101, 59, 1, 8756, 97, 59, 1, 920, 4, 2, 99, 110, 5637, 5647, 107, 83, 112, 97, 99, 101, 59, 3, 8287, 8202, 83, 112, 97, 99, 101, 59, 1, 8201, 108, 100, 101, 4, 4, 59, 69, 70, 84, 5668, 5670, 5677, 5688, 1, 8764, 113, 117, 97, 108, 59, 1, 8771, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8773, 105, 108, 100, 101, 59, 1, 8776, 112, 102, 59, 3, 55349, 56651, 105, 112, 108, 101, 68, 111, 116, 59, 1, 8411, 4, 2, 99, 116, 5717, 5722, 114, 59, 3, 55349, 56495, 114, 111, 107, 59, 1, 358, 4, 14, 97, 98, 99, 100, 102, 103, 109, 110, 111, 112, 114, 115, 116, 117, 5758, 5789, 5805, 5823, 5830, 5835, 5846, 5852, 5921, 5937, 6089, 6095, 6101, 6108, 4, 2, 99, 114, 5764, 5774, 117, 116, 101, 5, 218, 1, 59, 5772, 1, 218, 114, 4, 2, 59, 111, 5781, 5783, 1, 8607, 99, 105, 114, 59, 1, 10569, 114, 4, 2, 99, 101, 5796, 5800, 121, 59, 1, 1038, 118, 101, 59, 1, 364, 4, 2, 105, 121, 5811, 5820, 114, 99, 5, 219, 1, 59, 5818, 1, 219, 59, 1, 1059, 98, 108, 97, 99, 59, 1, 368, 114, 59, 3, 55349, 56600, 114, 97, 118, 101, 5, 217, 1, 59, 5844, 1, 217, 97, 99, 114, 59, 1, 362, 4, 2, 100, 105, 5858, 5905, 101, 114, 4, 2, 66, 80, 5866, 5892, 4, 2, 97, 114, 5872, 5876, 114, 59, 1, 95, 97, 99, 4, 2, 101, 107, 5884, 5887, 59, 1, 9183, 101, 116, 59, 1, 9141, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9181, 111, 110, 4, 2, 59, 80, 5913, 5915, 1, 8899, 108, 117, 115, 59, 1, 8846, 4, 2, 103, 112, 5927, 5932, 111, 110, 59, 1, 370, 102, 59, 3, 55349, 56652, 4, 8, 65, 68, 69, 84, 97, 100, 112, 115, 5955, 5985, 5996, 6009, 6026, 6033, 6044, 6075, 114, 114, 111, 119, 4, 3, 59, 66, 68, 5967, 5969, 5974, 1, 8593, 97, 114, 59, 1, 10514, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8645, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8597, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10606, 101, 101, 4, 2, 59, 65, 6017, 6019, 1, 8869, 114, 114, 111, 119, 59, 1, 8613, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 4, 2, 76, 82, 6052, 6063, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8598, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8599, 105, 4, 2, 59, 108, 6082, 6084, 1, 978, 111, 110, 59, 1, 933, 105, 110, 103, 59, 1, 366, 99, 114, 59, 3, 55349, 56496, 105, 108, 100, 101, 59, 1, 360, 109, 108, 5, 220, 1, 59, 6115, 1, 220, 4, 9, 68, 98, 99, 100, 101, 102, 111, 115, 118, 6137, 6143, 6148, 6152, 6166, 6250, 6255, 6261, 6267, 97, 115, 104, 59, 1, 8875, 97, 114, 59, 1, 10987, 121, 59, 1, 1042, 97, 115, 104, 4, 2, 59, 108, 6161, 6163, 1, 8873, 59, 1, 10982, 4, 2, 101, 114, 6172, 6175, 59, 1, 8897, 4, 3, 98, 116, 121, 6183, 6188, 6238, 97, 114, 59, 1, 8214, 4, 2, 59, 105, 6194, 6196, 1, 8214, 99, 97, 108, 4, 4, 66, 76, 83, 84, 6209, 6214, 6220, 6231, 97, 114, 59, 1, 8739, 105, 110, 101, 59, 1, 124, 101, 112, 97, 114, 97, 116, 111, 114, 59, 1, 10072, 105, 108, 100, 101, 59, 1, 8768, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8202, 114, 59, 3, 55349, 56601, 112, 102, 59, 3, 55349, 56653, 99, 114, 59, 3, 55349, 56497, 100, 97, 115, 104, 59, 1, 8874, 4, 5, 99, 101, 102, 111, 115, 6286, 6292, 6298, 6303, 6309, 105, 114, 99, 59, 1, 372, 100, 103, 101, 59, 1, 8896, 114, 59, 3, 55349, 56602, 112, 102, 59, 3, 55349, 56654, 99, 114, 59, 3, 55349, 56498, 4, 4, 102, 105, 111, 115, 6325, 6330, 6333, 6339, 114, 59, 3, 55349, 56603, 59, 1, 926, 112, 102, 59, 3, 55349, 56655, 99, 114, 59, 3, 55349, 56499, 4, 9, 65, 73, 85, 97, 99, 102, 111, 115, 117, 6365, 6370, 6375, 6380, 6391, 6405, 6410, 6416, 6422, 99, 121, 59, 1, 1071, 99, 121, 59, 1, 1031, 99, 121, 59, 1, 1070, 99, 117, 116, 101, 5, 221, 1, 59, 6389, 1, 221, 4, 2, 105, 121, 6397, 6402, 114, 99, 59, 1, 374, 59, 1, 1067, 114, 59, 3, 55349, 56604, 112, 102, 59, 3, 55349, 56656, 99, 114, 59, 3, 55349, 56500, 109, 108, 59, 1, 376, 4, 8, 72, 97, 99, 100, 101, 102, 111, 115, 6445, 6450, 6457, 6472, 6477, 6501, 6505, 6510, 99, 121, 59, 1, 1046, 99, 117, 116, 101, 59, 1, 377, 4, 2, 97, 121, 6463, 6469, 114, 111, 110, 59, 1, 381, 59, 1, 1047, 111, 116, 59, 1, 379, 4, 2, 114, 116, 6483, 6497, 111, 87, 105, 100, 116, 104, 83, 112, 97, 99, 101, 59, 1, 8203, 97, 59, 1, 918, 114, 59, 1, 8488, 112, 102, 59, 1, 8484, 99, 114, 59, 3, 55349, 56501, 4, 16, 97, 98, 99, 101, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 119, 6550, 6561, 6568, 6612, 6622, 6634, 6645, 6672, 6699, 6854, 6870, 6923, 6933, 6963, 6974, 6983, 99, 117, 116, 101, 5, 225, 1, 59, 6559, 1, 225, 114, 101, 118, 101, 59, 1, 259, 4, 6, 59, 69, 100, 105, 117, 121, 6582, 6584, 6588, 6591, 6600, 6609, 1, 8766, 59, 3, 8766, 819, 59, 1, 8767, 114, 99, 5, 226, 1, 59, 6598, 1, 226, 116, 101, 5, 180, 1, 59, 6607, 1, 180, 59, 1, 1072, 108, 105, 103, 5, 230, 1, 59, 6620, 1, 230, 4, 2, 59, 114, 6628, 6630, 1, 8289, 59, 3, 55349, 56606, 114, 97, 118, 101, 5, 224, 1, 59, 6643, 1, 224, 4, 2, 101, 112, 6651, 6667, 4, 2, 102, 112, 6657, 6663, 115, 121, 109, 59, 1, 8501, 104, 59, 1, 8501, 104, 97, 59, 1, 945, 4, 2, 97, 112, 6678, 6692, 4, 2, 99, 108, 6684, 6688, 114, 59, 1, 257, 103, 59, 1, 10815, 5, 38, 1, 59, 6697, 1, 38, 4, 2, 100, 103, 6705, 6737, 4, 5, 59, 97, 100, 115, 118, 6717, 6719, 6724, 6727, 6734, 1, 8743, 110, 100, 59, 1, 10837, 59, 1, 10844, 108, 111, 112, 101, 59, 1, 10840, 59, 1, 10842, 4, 7, 59, 101, 108, 109, 114, 115, 122, 6753, 6755, 6758, 6762, 6814, 6835, 6848, 1, 8736, 59, 1, 10660, 101, 59, 1, 8736, 115, 100, 4, 2, 59, 97, 6770, 6772, 1, 8737, 4, 8, 97, 98, 99, 100, 101, 102, 103, 104, 6790, 6793, 6796, 6799, 6802, 6805, 6808, 6811, 59, 1, 10664, 59, 1, 10665, 59, 1, 10666, 59, 1, 10667, 59, 1, 10668, 59, 1, 10669, 59, 1, 10670, 59, 1, 10671, 116, 4, 2, 59, 118, 6821, 6823, 1, 8735, 98, 4, 2, 59, 100, 6830, 6832, 1, 8894, 59, 1, 10653, 4, 2, 112, 116, 6841, 6845, 104, 59, 1, 8738, 59, 1, 197, 97, 114, 114, 59, 1, 9084, 4, 2, 103, 112, 6860, 6865, 111, 110, 59, 1, 261, 102, 59, 3, 55349, 56658, 4, 7, 59, 69, 97, 101, 105, 111, 112, 6886, 6888, 6891, 6897, 6900, 6904, 6908, 1, 8776, 59, 1, 10864, 99, 105, 114, 59, 1, 10863, 59, 1, 8778, 100, 59, 1, 8779, 115, 59, 1, 39, 114, 111, 120, 4, 2, 59, 101, 6917, 6919, 1, 8776, 113, 59, 1, 8778, 105, 110, 103, 5, 229, 1, 59, 6931, 1, 229, 4, 3, 99, 116, 121, 6941, 6946, 6949, 114, 59, 3, 55349, 56502, 59, 1, 42, 109, 112, 4, 2, 59, 101, 6957, 6959, 1, 8776, 113, 59, 1, 8781, 105, 108, 100, 101, 5, 227, 1, 59, 6972, 1, 227, 109, 108, 5, 228, 1, 59, 6981, 1, 228, 4, 2, 99, 105, 6989, 6997, 111, 110, 105, 110, 116, 59, 1, 8755, 110, 116, 59, 1, 10769, 4, 16, 78, 97, 98, 99, 100, 101, 102, 105, 107, 108, 110, 111, 112, 114, 115, 117, 7036, 7041, 7119, 7135, 7149, 7155, 7219, 7224, 7347, 7354, 7463, 7489, 7786, 7793, 7814, 7866, 111, 116, 59, 1, 10989, 4, 2, 99, 114, 7047, 7094, 107, 4, 4, 99, 101, 112, 115, 7058, 7064, 7073, 7080, 111, 110, 103, 59, 1, 8780, 112, 115, 105, 108, 111, 110, 59, 1, 1014, 114, 105, 109, 101, 59, 1, 8245, 105, 109, 4, 2, 59, 101, 7088, 7090, 1, 8765, 113, 59, 1, 8909, 4, 2, 118, 119, 7100, 7105, 101, 101, 59, 1, 8893, 101, 100, 4, 2, 59, 103, 7113, 7115, 1, 8965, 101, 59, 1, 8965, 114, 107, 4, 2, 59, 116, 7127, 7129, 1, 9141, 98, 114, 107, 59, 1, 9142, 4, 2, 111, 121, 7141, 7146, 110, 103, 59, 1, 8780, 59, 1, 1073, 113, 117, 111, 59, 1, 8222, 4, 5, 99, 109, 112, 114, 116, 7167, 7181, 7188, 7193, 7199, 97, 117, 115, 4, 2, 59, 101, 7176, 7178, 1, 8757, 59, 1, 8757, 112, 116, 121, 118, 59, 1, 10672, 115, 105, 59, 1, 1014, 110, 111, 117, 59, 1, 8492, 4, 3, 97, 104, 119, 7207, 7210, 7213, 59, 1, 946, 59, 1, 8502, 101, 101, 110, 59, 1, 8812, 114, 59, 3, 55349, 56607, 103, 4, 7, 99, 111, 115, 116, 117, 118, 119, 7241, 7262, 7288, 7305, 7328, 7335, 7340, 4, 3, 97, 105, 117, 7249, 7253, 7258, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 4, 3, 100, 112, 116, 7270, 7275, 7281, 111, 116, 59, 1, 10752, 108, 117, 115, 59, 1, 10753, 105, 109, 101, 115, 59, 1, 10754, 4, 2, 113, 116, 7294, 7300, 99, 117, 112, 59, 1, 10758, 97, 114, 59, 1, 9733, 114, 105, 97, 110, 103, 108, 101, 4, 2, 100, 117, 7318, 7324, 111, 119, 110, 59, 1, 9661, 112, 59, 1, 9651, 112, 108, 117, 115, 59, 1, 10756, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 97, 114, 111, 119, 59, 1, 10509, 4, 3, 97, 107, 111, 7362, 7436, 7458, 4, 2, 99, 110, 7368, 7432, 107, 4, 3, 108, 115, 116, 7377, 7386, 7394, 111, 122, 101, 110, 103, 101, 59, 1, 10731, 113, 117, 97, 114, 101, 59, 1, 9642, 114, 105, 97, 110, 103, 108, 101, 4, 4, 59, 100, 108, 114, 7411, 7413, 7419, 7425, 1, 9652, 111, 119, 110, 59, 1, 9662, 101, 102, 116, 59, 1, 9666, 105, 103, 104, 116, 59, 1, 9656, 107, 59, 1, 9251, 4, 2, 49, 51, 7442, 7454, 4, 2, 50, 52, 7448, 7451, 59, 1, 9618, 59, 1, 9617, 52, 59, 1, 9619, 99, 107, 59, 1, 9608, 4, 2, 101, 111, 7469, 7485, 4, 2, 59, 113, 7475, 7478, 3, 61, 8421, 117, 105, 118, 59, 3, 8801, 8421, 116, 59, 1, 8976, 4, 4, 112, 116, 119, 120, 7499, 7504, 7517, 7523, 102, 59, 3, 55349, 56659, 4, 2, 59, 116, 7510, 7512, 1, 8869, 111, 109, 59, 1, 8869, 116, 105, 101, 59, 1, 8904, 4, 12, 68, 72, 85, 86, 98, 100, 104, 109, 112, 116, 117, 118, 7549, 7571, 7597, 7619, 7655, 7660, 7682, 7708, 7715, 7721, 7728, 7750, 4, 4, 76, 82, 108, 114, 7559, 7562, 7565, 7568, 59, 1, 9559, 59, 1, 9556, 59, 1, 9558, 59, 1, 9555, 4, 5, 59, 68, 85, 100, 117, 7583, 7585, 7588, 7591, 7594, 1, 9552, 59, 1, 9574, 59, 1, 9577, 59, 1, 9572, 59, 1, 9575, 4, 4, 76, 82, 108, 114, 7607, 7610, 7613, 7616, 59, 1, 9565, 59, 1, 9562, 59, 1, 9564, 59, 1, 9561, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7635, 7637, 7640, 7643, 7646, 7649, 7652, 1, 9553, 59, 1, 9580, 59, 1, 9571, 59, 1, 9568, 59, 1, 9579, 59, 1, 9570, 59, 1, 9567, 111, 120, 59, 1, 10697, 4, 4, 76, 82, 108, 114, 7670, 7673, 7676, 7679, 59, 1, 9557, 59, 1, 9554, 59, 1, 9488, 59, 1, 9484, 4, 5, 59, 68, 85, 100, 117, 7694, 7696, 7699, 7702, 7705, 1, 9472, 59, 1, 9573, 59, 1, 9576, 59, 1, 9516, 59, 1, 9524, 105, 110, 117, 115, 59, 1, 8863, 108, 117, 115, 59, 1, 8862, 105, 109, 101, 115, 59, 1, 8864, 4, 4, 76, 82, 108, 114, 7738, 7741, 7744, 7747, 59, 1, 9563, 59, 1, 9560, 59, 1, 9496, 59, 1, 9492, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7766, 7768, 7771, 7774, 7777, 7780, 7783, 1, 9474, 59, 1, 9578, 59, 1, 9569, 59, 1, 9566, 59, 1, 9532, 59, 1, 9508, 59, 1, 9500, 114, 105, 109, 101, 59, 1, 8245, 4, 2, 101, 118, 7799, 7804, 118, 101, 59, 1, 728, 98, 97, 114, 5, 166, 1, 59, 7812, 1, 166, 4, 4, 99, 101, 105, 111, 7824, 7829, 7834, 7846, 114, 59, 3, 55349, 56503, 109, 105, 59, 1, 8271, 109, 4, 2, 59, 101, 7841, 7843, 1, 8765, 59, 1, 8909, 108, 4, 3, 59, 98, 104, 7855, 7857, 7860, 1, 92, 59, 1, 10693, 115, 117, 98, 59, 1, 10184, 4, 2, 108, 109, 7872, 7885, 108, 4, 2, 59, 101, 7879, 7881, 1, 8226, 116, 59, 1, 8226, 112, 4, 3, 59, 69, 101, 7894, 7896, 7899, 1, 8782, 59, 1, 10926, 4, 2, 59, 113, 7905, 7907, 1, 8783, 59, 1, 8783, 4, 15, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 116, 117, 119, 121, 7942, 8021, 8075, 8080, 8121, 8126, 8157, 8279, 8295, 8430, 8446, 8485, 8491, 8707, 8726, 4, 3, 99, 112, 114, 7950, 7956, 8007, 117, 116, 101, 59, 1, 263, 4, 6, 59, 97, 98, 99, 100, 115, 7970, 7972, 7977, 7984, 7998, 8003, 1, 8745, 110, 100, 59, 1, 10820, 114, 99, 117, 112, 59, 1, 10825, 4, 2, 97, 117, 7990, 7994, 112, 59, 1, 10827, 112, 59, 1, 10823, 111, 116, 59, 1, 10816, 59, 3, 8745, 65024, 4, 2, 101, 111, 8013, 8017, 116, 59, 1, 8257, 110, 59, 1, 711, 4, 4, 97, 101, 105, 117, 8031, 8046, 8056, 8061, 4, 2, 112, 114, 8037, 8041, 115, 59, 1, 10829, 111, 110, 59, 1, 269, 100, 105, 108, 5, 231, 1, 59, 8054, 1, 231, 114, 99, 59, 1, 265, 112, 115, 4, 2, 59, 115, 8069, 8071, 1, 10828, 109, 59, 1, 10832, 111, 116, 59, 1, 267, 4, 3, 100, 109, 110, 8088, 8097, 8104, 105, 108, 5, 184, 1, 59, 8095, 1, 184, 112, 116, 121, 118, 59, 1, 10674, 116, 5, 162, 2, 59, 101, 8112, 8114, 1, 162, 114, 100, 111, 116, 59, 1, 183, 114, 59, 3, 55349, 56608, 4, 3, 99, 101, 105, 8134, 8138, 8154, 121, 59, 1, 1095, 99, 107, 4, 2, 59, 109, 8146, 8148, 1, 10003, 97, 114, 107, 59, 1, 10003, 59, 1, 967, 114, 4, 7, 59, 69, 99, 101, 102, 109, 115, 8174, 8176, 8179, 8258, 8261, 8268, 8273, 1, 9675, 59, 1, 10691, 4, 3, 59, 101, 108, 8187, 8189, 8193, 1, 710, 113, 59, 1, 8791, 101, 4, 2, 97, 100, 8200, 8223, 114, 114, 111, 119, 4, 2, 108, 114, 8210, 8216, 101, 102, 116, 59, 1, 8634, 105, 103, 104, 116, 59, 1, 8635, 4, 5, 82, 83, 97, 99, 100, 8235, 8238, 8241, 8246, 8252, 59, 1, 174, 59, 1, 9416, 115, 116, 59, 1, 8859, 105, 114, 99, 59, 1, 8858, 97, 115, 104, 59, 1, 8861, 59, 1, 8791, 110, 105, 110, 116, 59, 1, 10768, 105, 100, 59, 1, 10991, 99, 105, 114, 59, 1, 10690, 117, 98, 115, 4, 2, 59, 117, 8288, 8290, 1, 9827, 105, 116, 59, 1, 9827, 4, 4, 108, 109, 110, 112, 8305, 8326, 8376, 8400, 111, 110, 4, 2, 59, 101, 8313, 8315, 1, 58, 4, 2, 59, 113, 8321, 8323, 1, 8788, 59, 1, 8788, 4, 2, 109, 112, 8332, 8344, 97, 4, 2, 59, 116, 8339, 8341, 1, 44, 59, 1, 64, 4, 3, 59, 102, 108, 8352, 8354, 8358, 1, 8705, 110, 59, 1, 8728, 101, 4, 2, 109, 120, 8365, 8371, 101, 110, 116, 59, 1, 8705, 101, 115, 59, 1, 8450, 4, 2, 103, 105, 8382, 8395, 4, 2, 59, 100, 8388, 8390, 1, 8773, 111, 116, 59, 1, 10861, 110, 116, 59, 1, 8750, 4, 3, 102, 114, 121, 8408, 8412, 8417, 59, 3, 55349, 56660, 111, 100, 59, 1, 8720, 5, 169, 2, 59, 115, 8424, 8426, 1, 169, 114, 59, 1, 8471, 4, 2, 97, 111, 8436, 8441, 114, 114, 59, 1, 8629, 115, 115, 59, 1, 10007, 4, 2, 99, 117, 8452, 8457, 114, 59, 3, 55349, 56504, 4, 2, 98, 112, 8463, 8474, 4, 2, 59, 101, 8469, 8471, 1, 10959, 59, 1, 10961, 4, 2, 59, 101, 8480, 8482, 1, 10960, 59, 1, 10962, 100, 111, 116, 59, 1, 8943, 4, 7, 100, 101, 108, 112, 114, 118, 119, 8507, 8522, 8536, 8550, 8600, 8697, 8702, 97, 114, 114, 4, 2, 108, 114, 8516, 8519, 59, 1, 10552, 59, 1, 10549, 4, 2, 112, 115, 8528, 8532, 114, 59, 1, 8926, 99, 59, 1, 8927, 97, 114, 114, 4, 2, 59, 112, 8545, 8547, 1, 8630, 59, 1, 10557, 4, 6, 59, 98, 99, 100, 111, 115, 8564, 8566, 8573, 8587, 8592, 8596, 1, 8746, 114, 99, 97, 112, 59, 1, 10824, 4, 2, 97, 117, 8579, 8583, 112, 59, 1, 10822, 112, 59, 1, 10826, 111, 116, 59, 1, 8845, 114, 59, 1, 10821, 59, 3, 8746, 65024, 4, 4, 97, 108, 114, 118, 8610, 8623, 8663, 8672, 114, 114, 4, 2, 59, 109, 8618, 8620, 1, 8631, 59, 1, 10556, 121, 4, 3, 101, 118, 119, 8632, 8651, 8656, 113, 4, 2, 112, 115, 8639, 8645, 114, 101, 99, 59, 1, 8926, 117, 99, 99, 59, 1, 8927, 101, 101, 59, 1, 8910, 101, 100, 103, 101, 59, 1, 8911, 101, 110, 5, 164, 1, 59, 8670, 1, 164, 101, 97, 114, 114, 111, 119, 4, 2, 108, 114, 8684, 8690, 101, 102, 116, 59, 1, 8630, 105, 103, 104, 116, 59, 1, 8631, 101, 101, 59, 1, 8910, 101, 100, 59, 1, 8911, 4, 2, 99, 105, 8713, 8721, 111, 110, 105, 110, 116, 59, 1, 8754, 110, 116, 59, 1, 8753, 108, 99, 116, 121, 59, 1, 9005, 4, 19, 65, 72, 97, 98, 99, 100, 101, 102, 104, 105, 106, 108, 111, 114, 115, 116, 117, 119, 122, 8773, 8778, 8783, 8821, 8839, 8854, 8887, 8914, 8930, 8944, 9036, 9041, 9058, 9197, 9227, 9258, 9281, 9297, 9305, 114, 114, 59, 1, 8659, 97, 114, 59, 1, 10597, 4, 4, 103, 108, 114, 115, 8793, 8799, 8805, 8809, 103, 101, 114, 59, 1, 8224, 101, 116, 104, 59, 1, 8504, 114, 59, 1, 8595, 104, 4, 2, 59, 118, 8816, 8818, 1, 8208, 59, 1, 8867, 4, 2, 107, 108, 8827, 8834, 97, 114, 111, 119, 59, 1, 10511, 97, 99, 59, 1, 733, 4, 2, 97, 121, 8845, 8851, 114, 111, 110, 59, 1, 271, 59, 1, 1076, 4, 3, 59, 97, 111, 8862, 8864, 8880, 1, 8518, 4, 2, 103, 114, 8870, 8876, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8650, 116, 115, 101, 113, 59, 1, 10871, 4, 3, 103, 108, 109, 8895, 8902, 8907, 5, 176, 1, 59, 8900, 1, 176, 116, 97, 59, 1, 948, 112, 116, 121, 118, 59, 1, 10673, 4, 2, 105, 114, 8920, 8926, 115, 104, 116, 59, 1, 10623, 59, 3, 55349, 56609, 97, 114, 4, 2, 108, 114, 8938, 8941, 59, 1, 8643, 59, 1, 8642, 4, 5, 97, 101, 103, 115, 118, 8956, 8986, 8989, 8996, 9001, 109, 4, 3, 59, 111, 115, 8965, 8967, 8983, 1, 8900, 110, 100, 4, 2, 59, 115, 8975, 8977, 1, 8900, 117, 105, 116, 59, 1, 9830, 59, 1, 9830, 59, 1, 168, 97, 109, 109, 97, 59, 1, 989, 105, 110, 59, 1, 8946, 4, 3, 59, 105, 111, 9009, 9011, 9031, 1, 247, 100, 101, 5, 247, 2, 59, 111, 9020, 9022, 1, 247, 110, 116, 105, 109, 101, 115, 59, 1, 8903, 110, 120, 59, 1, 8903, 99, 121, 59, 1, 1106, 99, 4, 2, 111, 114, 9048, 9053, 114, 110, 59, 1, 8990, 111, 112, 59, 1, 8973, 4, 5, 108, 112, 116, 117, 119, 9070, 9076, 9081, 9130, 9144, 108, 97, 114, 59, 1, 36, 102, 59, 3, 55349, 56661, 4, 5, 59, 101, 109, 112, 115, 9093, 9095, 9109, 9116, 9122, 1, 729, 113, 4, 2, 59, 100, 9102, 9104, 1, 8784, 111, 116, 59, 1, 8785, 105, 110, 117, 115, 59, 1, 8760, 108, 117, 115, 59, 1, 8724, 113, 117, 97, 114, 101, 59, 1, 8865, 98, 108, 101, 98, 97, 114, 119, 101, 100, 103, 101, 59, 1, 8966, 110, 4, 3, 97, 100, 104, 9153, 9160, 9172, 114, 114, 111, 119, 59, 1, 8595, 111, 119, 110, 97, 114, 114, 111, 119, 115, 59, 1, 8650, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 9184, 9190, 101, 102, 116, 59, 1, 8643, 105, 103, 104, 116, 59, 1, 8642, 4, 2, 98, 99, 9203, 9211, 107, 97, 114, 111, 119, 59, 1, 10512, 4, 2, 111, 114, 9217, 9222, 114, 110, 59, 1, 8991, 111, 112, 59, 1, 8972, 4, 3, 99, 111, 116, 9235, 9248, 9252, 4, 2, 114, 121, 9241, 9245, 59, 3, 55349, 56505, 59, 1, 1109, 108, 59, 1, 10742, 114, 111, 107, 59, 1, 273, 4, 2, 100, 114, 9264, 9269, 111, 116, 59, 1, 8945, 105, 4, 2, 59, 102, 9276, 9278, 1, 9663, 59, 1, 9662, 4, 2, 97, 104, 9287, 9292, 114, 114, 59, 1, 8693, 97, 114, 59, 1, 10607, 97, 110, 103, 108, 101, 59, 1, 10662, 4, 2, 99, 105, 9311, 9315, 121, 59, 1, 1119, 103, 114, 97, 114, 114, 59, 1, 10239, 4, 18, 68, 97, 99, 100, 101, 102, 103, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 9361, 9376, 9398, 9439, 9444, 9447, 9462, 9495, 9531, 9585, 9598, 9614, 9659, 9755, 9771, 9792, 9808, 9826, 4, 2, 68, 111, 9367, 9372, 111, 116, 59, 1, 10871, 116, 59, 1, 8785, 4, 2, 99, 115, 9382, 9392, 117, 116, 101, 5, 233, 1, 59, 9390, 1, 233, 116, 101, 114, 59, 1, 10862, 4, 4, 97, 105, 111, 121, 9408, 9414, 9430, 9436, 114, 111, 110, 59, 1, 283, 114, 4, 2, 59, 99, 9421, 9423, 1, 8790, 5, 234, 1, 59, 9428, 1, 234, 108, 111, 110, 59, 1, 8789, 59, 1, 1101, 111, 116, 59, 1, 279, 59, 1, 8519, 4, 2, 68, 114, 9453, 9458, 111, 116, 59, 1, 8786, 59, 3, 55349, 56610, 4, 3, 59, 114, 115, 9470, 9472, 9482, 1, 10906, 97, 118, 101, 5, 232, 1, 59, 9480, 1, 232, 4, 2, 59, 100, 9488, 9490, 1, 10902, 111, 116, 59, 1, 10904, 4, 4, 59, 105, 108, 115, 9505, 9507, 9515, 9518, 1, 10905, 110, 116, 101, 114, 115, 59, 1, 9191, 59, 1, 8467, 4, 2, 59, 100, 9524, 9526, 1, 10901, 111, 116, 59, 1, 10903, 4, 3, 97, 112, 115, 9539, 9544, 9564, 99, 114, 59, 1, 275, 116, 121, 4, 3, 59, 115, 118, 9554, 9556, 9561, 1, 8709, 101, 116, 59, 1, 8709, 59, 1, 8709, 112, 4, 2, 49, 59, 9571, 9583, 4, 2, 51, 52, 9577, 9580, 59, 1, 8196, 59, 1, 8197, 1, 8195, 4, 2, 103, 115, 9591, 9594, 59, 1, 331, 112, 59, 1, 8194, 4, 2, 103, 112, 9604, 9609, 111, 110, 59, 1, 281, 102, 59, 3, 55349, 56662, 4, 3, 97, 108, 115, 9622, 9635, 9640, 114, 4, 2, 59, 115, 9629, 9631, 1, 8917, 108, 59, 1, 10723, 117, 115, 59, 1, 10865, 105, 4, 3, 59, 108, 118, 9649, 9651, 9656, 1, 949, 111, 110, 59, 1, 949, 59, 1, 1013, 4, 4, 99, 115, 117, 118, 9669, 9686, 9716, 9747, 4, 2, 105, 111, 9675, 9680, 114, 99, 59, 1, 8790, 108, 111, 110, 59, 1, 8789, 4, 2, 105, 108, 9692, 9696, 109, 59, 1, 8770, 97, 110, 116, 4, 2, 103, 108, 9705, 9710, 116, 114, 59, 1, 10902, 101, 115, 115, 59, 1, 10901, 4, 3, 97, 101, 105, 9724, 9729, 9734, 108, 115, 59, 1, 61, 115, 116, 59, 1, 8799, 118, 4, 2, 59, 68, 9741, 9743, 1, 8801, 68, 59, 1, 10872, 112, 97, 114, 115, 108, 59, 1, 10725, 4, 2, 68, 97, 9761, 9766, 111, 116, 59, 1, 8787, 114, 114, 59, 1, 10609, 4, 3, 99, 100, 105, 9779, 9783, 9788, 114, 59, 1, 8495, 111, 116, 59, 1, 8784, 109, 59, 1, 8770, 4, 2, 97, 104, 9798, 9801, 59, 1, 951, 5, 240, 1, 59, 9806, 1, 240, 4, 2, 109, 114, 9814, 9822, 108, 5, 235, 1, 59, 9820, 1, 235, 111, 59, 1, 8364, 4, 3, 99, 105, 112, 9834, 9838, 9843, 108, 59, 1, 33, 115, 116, 59, 1, 8707, 4, 2, 101, 111, 9849, 9859, 99, 116, 97, 116, 105, 111, 110, 59, 1, 8496, 110, 101, 110, 116, 105, 97, 108, 101, 59, 1, 8519, 4, 12, 97, 99, 101, 102, 105, 106, 108, 110, 111, 112, 114, 115, 9896, 9910, 9914, 9921, 9954, 9960, 9967, 9989, 9994, 10027, 10036, 10164, 108, 108, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8786, 121, 59, 1, 1092, 109, 97, 108, 101, 59, 1, 9792, 4, 3, 105, 108, 114, 9929, 9935, 9950, 108, 105, 103, 59, 1, 64259, 4, 2, 105, 108, 9941, 9945, 103, 59, 1, 64256, 105, 103, 59, 1, 64260, 59, 3, 55349, 56611, 108, 105, 103, 59, 1, 64257, 108, 105, 103, 59, 3, 102, 106, 4, 3, 97, 108, 116, 9975, 9979, 9984, 116, 59, 1, 9837, 105, 103, 59, 1, 64258, 110, 115, 59, 1, 9649, 111, 102, 59, 1, 402, 4, 2, 112, 114, 10000, 10005, 102, 59, 3, 55349, 56663, 4, 2, 97, 107, 10011, 10016, 108, 108, 59, 1, 8704, 4, 2, 59, 118, 10022, 10024, 1, 8916, 59, 1, 10969, 97, 114, 116, 105, 110, 116, 59, 1, 10765, 4, 2, 97, 111, 10042, 10159, 4, 2, 99, 115, 10048, 10155, 4, 6, 49, 50, 51, 52, 53, 55, 10062, 10102, 10114, 10135, 10139, 10151, 4, 6, 50, 51, 52, 53, 54, 56, 10076, 10083, 10086, 10093, 10096, 10099, 5, 189, 1, 59, 10081, 1, 189, 59, 1, 8531, 5, 188, 1, 59, 10091, 1, 188, 59, 1, 8533, 59, 1, 8537, 59, 1, 8539, 4, 2, 51, 53, 10108, 10111, 59, 1, 8532, 59, 1, 8534, 4, 3, 52, 53, 56, 10122, 10129, 10132, 5, 190, 1, 59, 10127, 1, 190, 59, 1, 8535, 59, 1, 8540, 53, 59, 1, 8536, 4, 2, 54, 56, 10145, 10148, 59, 1, 8538, 59, 1, 8541, 56, 59, 1, 8542, 108, 59, 1, 8260, 119, 110, 59, 1, 8994, 99, 114, 59, 3, 55349, 56507, 4, 17, 69, 97, 98, 99, 100, 101, 102, 103, 105, 106, 108, 110, 111, 114, 115, 116, 118, 10206, 10217, 10247, 10254, 10268, 10273, 10358, 10363, 10374, 10380, 10385, 10406, 10458, 10464, 10470, 10497, 10610, 4, 2, 59, 108, 10212, 10214, 1, 8807, 59, 1, 10892, 4, 3, 99, 109, 112, 10225, 10231, 10244, 117, 116, 101, 59, 1, 501, 109, 97, 4, 2, 59, 100, 10239, 10241, 1, 947, 59, 1, 989, 59, 1, 10886, 114, 101, 118, 101, 59, 1, 287, 4, 2, 105, 121, 10260, 10265, 114, 99, 59, 1, 285, 59, 1, 1075, 111, 116, 59, 1, 289, 4, 4, 59, 108, 113, 115, 10283, 10285, 10288, 10308, 1, 8805, 59, 1, 8923, 4, 3, 59, 113, 115, 10296, 10298, 10301, 1, 8805, 59, 1, 8807, 108, 97, 110, 116, 59, 1, 10878, 4, 4, 59, 99, 100, 108, 10318, 10320, 10324, 10345, 1, 10878, 99, 59, 1, 10921, 111, 116, 4, 2, 59, 111, 10332, 10334, 1, 10880, 4, 2, 59, 108, 10340, 10342, 1, 10882, 59, 1, 10884, 4, 2, 59, 101, 10351, 10354, 3, 8923, 65024, 115, 59, 1, 10900, 114, 59, 3, 55349, 56612, 4, 2, 59, 103, 10369, 10371, 1, 8811, 59, 1, 8921, 109, 101, 108, 59, 1, 8503, 99, 121, 59, 1, 1107, 4, 4, 59, 69, 97, 106, 10395, 10397, 10400, 10403, 1, 8823, 59, 1, 10898, 59, 1, 10917, 59, 1, 10916, 4, 4, 69, 97, 101, 115, 10416, 10419, 10434, 10453, 59, 1, 8809, 112, 4, 2, 59, 112, 10426, 10428, 1, 10890, 114, 111, 120, 59, 1, 10890, 4, 2, 59, 113, 10440, 10442, 1, 10888, 4, 2, 59, 113, 10448, 10450, 1, 10888, 59, 1, 8809, 105, 109, 59, 1, 8935, 112, 102, 59, 3, 55349, 56664, 97, 118, 101, 59, 1, 96, 4, 2, 99, 105, 10476, 10480, 114, 59, 1, 8458, 109, 4, 3, 59, 101, 108, 10489, 10491, 10494, 1, 8819, 59, 1, 10894, 59, 1, 10896, 5, 62, 6, 59, 99, 100, 108, 113, 114, 10512, 10514, 10527, 10532, 10538, 10545, 1, 62, 4, 2, 99, 105, 10520, 10523, 59, 1, 10919, 114, 59, 1, 10874, 111, 116, 59, 1, 8919, 80, 97, 114, 59, 1, 10645, 117, 101, 115, 116, 59, 1, 10876, 4, 5, 97, 100, 101, 108, 115, 10557, 10574, 10579, 10599, 10605, 4, 2, 112, 114, 10563, 10570, 112, 114, 111, 120, 59, 1, 10886, 114, 59, 1, 10616, 111, 116, 59, 1, 8919, 113, 4, 2, 108, 113, 10586, 10592, 101, 115, 115, 59, 1, 8923, 108, 101, 115, 115, 59, 1, 10892, 101, 115, 115, 59, 1, 8823, 105, 109, 59, 1, 8819, 4, 2, 101, 110, 10616, 10626, 114, 116, 110, 101, 113, 113, 59, 3, 8809, 65024, 69, 59, 3, 8809, 65024, 4, 10, 65, 97, 98, 99, 101, 102, 107, 111, 115, 121, 10653, 10658, 10713, 10718, 10724, 10760, 10765, 10786, 10850, 10875, 114, 114, 59, 1, 8660, 4, 4, 105, 108, 109, 114, 10668, 10674, 10678, 10684, 114, 115, 112, 59, 1, 8202, 102, 59, 1, 189, 105, 108, 116, 59, 1, 8459, 4, 2, 100, 114, 10690, 10695, 99, 121, 59, 1, 1098, 4, 3, 59, 99, 119, 10703, 10705, 10710, 1, 8596, 105, 114, 59, 1, 10568, 59, 1, 8621, 97, 114, 59, 1, 8463, 105, 114, 99, 59, 1, 293, 4, 3, 97, 108, 114, 10732, 10748, 10754, 114, 116, 115, 4, 2, 59, 117, 10741, 10743, 1, 9829, 105, 116, 59, 1, 9829, 108, 105, 112, 59, 1, 8230, 99, 111, 110, 59, 1, 8889, 114, 59, 3, 55349, 56613, 115, 4, 2, 101, 119, 10772, 10779, 97, 114, 111, 119, 59, 1, 10533, 97, 114, 111, 119, 59, 1, 10534, 4, 5, 97, 109, 111, 112, 114, 10798, 10803, 10809, 10839, 10844, 114, 114, 59, 1, 8703, 116, 104, 116, 59, 1, 8763, 107, 4, 2, 108, 114, 10816, 10827, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8617, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8618, 102, 59, 3, 55349, 56665, 98, 97, 114, 59, 1, 8213, 4, 3, 99, 108, 116, 10858, 10863, 10869, 114, 59, 3, 55349, 56509, 97, 115, 104, 59, 1, 8463, 114, 111, 107, 59, 1, 295, 4, 2, 98, 112, 10881, 10887, 117, 108, 108, 59, 1, 8259, 104, 101, 110, 59, 1, 8208, 4, 15, 97, 99, 101, 102, 103, 105, 106, 109, 110, 111, 112, 113, 115, 116, 117, 10925, 10936, 10958, 10977, 10990, 11001, 11039, 11045, 11101, 11192, 11220, 11226, 11237, 11285, 11299, 99, 117, 116, 101, 5, 237, 1, 59, 10934, 1, 237, 4, 3, 59, 105, 121, 10944, 10946, 10955, 1, 8291, 114, 99, 5, 238, 1, 59, 10953, 1, 238, 59, 1, 1080, 4, 2, 99, 120, 10964, 10968, 121, 59, 1, 1077, 99, 108, 5, 161, 1, 59, 10975, 1, 161, 4, 2, 102, 114, 10983, 10986, 59, 1, 8660, 59, 3, 55349, 56614, 114, 97, 118, 101, 5, 236, 1, 59, 10999, 1, 236, 4, 4, 59, 105, 110, 111, 11011, 11013, 11028, 11034, 1, 8520, 4, 2, 105, 110, 11019, 11024, 110, 116, 59, 1, 10764, 116, 59, 1, 8749, 102, 105, 110, 59, 1, 10716, 116, 97, 59, 1, 8489, 108, 105, 103, 59, 1, 307, 4, 3, 97, 111, 112, 11053, 11092, 11096, 4, 3, 99, 103, 116, 11061, 11065, 11088, 114, 59, 1, 299, 4, 3, 101, 108, 112, 11073, 11076, 11082, 59, 1, 8465, 105, 110, 101, 59, 1, 8464, 97, 114, 116, 59, 1, 8465, 104, 59, 1, 305, 102, 59, 1, 8887, 101, 100, 59, 1, 437, 4, 5, 59, 99, 102, 111, 116, 11113, 11115, 11121, 11136, 11142, 1, 8712, 97, 114, 101, 59, 1, 8453, 105, 110, 4, 2, 59, 116, 11129, 11131, 1, 8734, 105, 101, 59, 1, 10717, 100, 111, 116, 59, 1, 305, 4, 5, 59, 99, 101, 108, 112, 11154, 11156, 11161, 11179, 11186, 1, 8747, 97, 108, 59, 1, 8890, 4, 2, 103, 114, 11167, 11173, 101, 114, 115, 59, 1, 8484, 99, 97, 108, 59, 1, 8890, 97, 114, 104, 107, 59, 1, 10775, 114, 111, 100, 59, 1, 10812, 4, 4, 99, 103, 112, 116, 11202, 11206, 11211, 11216, 121, 59, 1, 1105, 111, 110, 59, 1, 303, 102, 59, 3, 55349, 56666, 97, 59, 1, 953, 114, 111, 100, 59, 1, 10812, 117, 101, 115, 116, 5, 191, 1, 59, 11235, 1, 191, 4, 2, 99, 105, 11243, 11248, 114, 59, 3, 55349, 56510, 110, 4, 5, 59, 69, 100, 115, 118, 11261, 11263, 11266, 11271, 11282, 1, 8712, 59, 1, 8953, 111, 116, 59, 1, 8949, 4, 2, 59, 118, 11277, 11279, 1, 8948, 59, 1, 8947, 59, 1, 8712, 4, 2, 59, 105, 11291, 11293, 1, 8290, 108, 100, 101, 59, 1, 297, 4, 2, 107, 109, 11305, 11310, 99, 121, 59, 1, 1110, 108, 5, 239, 1, 59, 11316, 1, 239, 4, 6, 99, 102, 109, 111, 115, 117, 11332, 11346, 11351, 11357, 11363, 11380, 4, 2, 105, 121, 11338, 11343, 114, 99, 59, 1, 309, 59, 1, 1081, 114, 59, 3, 55349, 56615, 97, 116, 104, 59, 1, 567, 112, 102, 59, 3, 55349, 56667, 4, 2, 99, 101, 11369, 11374, 114, 59, 3, 55349, 56511, 114, 99, 121, 59, 1, 1112, 107, 99, 121, 59, 1, 1108, 4, 8, 97, 99, 102, 103, 104, 106, 111, 115, 11404, 11418, 11433, 11438, 11445, 11450, 11455, 11461, 112, 112, 97, 4, 2, 59, 118, 11413, 11415, 1, 954, 59, 1, 1008, 4, 2, 101, 121, 11424, 11430, 100, 105, 108, 59, 1, 311, 59, 1, 1082, 114, 59, 3, 55349, 56616, 114, 101, 101, 110, 59, 1, 312, 99, 121, 59, 1, 1093, 99, 121, 59, 1, 1116, 112, 102, 59, 3, 55349, 56668, 99, 114, 59, 3, 55349, 56512, 4, 23, 65, 66, 69, 72, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 11515, 11538, 11544, 11555, 11560, 11721, 11780, 11818, 11868, 12136, 12160, 12171, 12203, 12208, 12246, 12275, 12327, 12509, 12523, 12569, 12641, 12732, 12752, 4, 3, 97, 114, 116, 11523, 11528, 11532, 114, 114, 59, 1, 8666, 114, 59, 1, 8656, 97, 105, 108, 59, 1, 10523, 97, 114, 114, 59, 1, 10510, 4, 2, 59, 103, 11550, 11552, 1, 8806, 59, 1, 10891, 97, 114, 59, 1, 10594, 4, 9, 99, 101, 103, 109, 110, 112, 113, 114, 116, 11580, 11586, 11594, 11600, 11606, 11624, 11627, 11636, 11694, 117, 116, 101, 59, 1, 314, 109, 112, 116, 121, 118, 59, 1, 10676, 114, 97, 110, 59, 1, 8466, 98, 100, 97, 59, 1, 955, 103, 4, 3, 59, 100, 108, 11615, 11617, 11620, 1, 10216, 59, 1, 10641, 101, 59, 1, 10216, 59, 1, 10885, 117, 111, 5, 171, 1, 59, 11634, 1, 171, 114, 4, 8, 59, 98, 102, 104, 108, 112, 115, 116, 11655, 11657, 11669, 11673, 11677, 11681, 11685, 11690, 1, 8592, 4, 2, 59, 102, 11663, 11665, 1, 8676, 115, 59, 1, 10527, 115, 59, 1, 10525, 107, 59, 1, 8617, 112, 59, 1, 8619, 108, 59, 1, 10553, 105, 109, 59, 1, 10611, 108, 59, 1, 8610, 4, 3, 59, 97, 101, 11702, 11704, 11709, 1, 10923, 105, 108, 59, 1, 10521, 4, 2, 59, 115, 11715, 11717, 1, 10925, 59, 3, 10925, 65024, 4, 3, 97, 98, 114, 11729, 11734, 11739, 114, 114, 59, 1, 10508, 114, 107, 59, 1, 10098, 4, 2, 97, 107, 11745, 11758, 99, 4, 2, 101, 107, 11752, 11755, 59, 1, 123, 59, 1, 91, 4, 2, 101, 115, 11764, 11767, 59, 1, 10635, 108, 4, 2, 100, 117, 11774, 11777, 59, 1, 10639, 59, 1, 10637, 4, 4, 97, 101, 117, 121, 11790, 11796, 11811, 11815, 114, 111, 110, 59, 1, 318, 4, 2, 100, 105, 11802, 11807, 105, 108, 59, 1, 316, 108, 59, 1, 8968, 98, 59, 1, 123, 59, 1, 1083, 4, 4, 99, 113, 114, 115, 11828, 11832, 11845, 11864, 97, 59, 1, 10550, 117, 111, 4, 2, 59, 114, 11840, 11842, 1, 8220, 59, 1, 8222, 4, 2, 100, 117, 11851, 11857, 104, 97, 114, 59, 1, 10599, 115, 104, 97, 114, 59, 1, 10571, 104, 59, 1, 8626, 4, 5, 59, 102, 103, 113, 115, 11880, 11882, 12008, 12011, 12031, 1, 8804, 116, 4, 5, 97, 104, 108, 114, 116, 11895, 11913, 11935, 11947, 11996, 114, 114, 111, 119, 4, 2, 59, 116, 11905, 11907, 1, 8592, 97, 105, 108, 59, 1, 8610, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 11925, 11931, 111, 119, 110, 59, 1, 8637, 112, 59, 1, 8636, 101, 102, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8647, 105, 103, 104, 116, 4, 3, 97, 104, 115, 11959, 11974, 11984, 114, 114, 111, 119, 4, 2, 59, 115, 11969, 11971, 1, 8596, 59, 1, 8646, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8651, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8621, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8907, 59, 1, 8922, 4, 3, 59, 113, 115, 12019, 12021, 12024, 1, 8804, 59, 1, 8806, 108, 97, 110, 116, 59, 1, 10877, 4, 5, 59, 99, 100, 103, 115, 12043, 12045, 12049, 12070, 12083, 1, 10877, 99, 59, 1, 10920, 111, 116, 4, 2, 59, 111, 12057, 12059, 1, 10879, 4, 2, 59, 114, 12065, 12067, 1, 10881, 59, 1, 10883, 4, 2, 59, 101, 12076, 12079, 3, 8922, 65024, 115, 59, 1, 10899, 4, 5, 97, 100, 101, 103, 115, 12095, 12103, 12108, 12126, 12131, 112, 112, 114, 111, 120, 59, 1, 10885, 111, 116, 59, 1, 8918, 113, 4, 2, 103, 113, 12115, 12120, 116, 114, 59, 1, 8922, 103, 116, 114, 59, 1, 10891, 116, 114, 59, 1, 8822, 105, 109, 59, 1, 8818, 4, 3, 105, 108, 114, 12144, 12150, 12156, 115, 104, 116, 59, 1, 10620, 111, 111, 114, 59, 1, 8970, 59, 3, 55349, 56617, 4, 2, 59, 69, 12166, 12168, 1, 8822, 59, 1, 10897, 4, 2, 97, 98, 12177, 12198, 114, 4, 2, 100, 117, 12184, 12187, 59, 1, 8637, 4, 2, 59, 108, 12193, 12195, 1, 8636, 59, 1, 10602, 108, 107, 59, 1, 9604, 99, 121, 59, 1, 1113, 4, 5, 59, 97, 99, 104, 116, 12220, 12222, 12227, 12235, 12241, 1, 8810, 114, 114, 59, 1, 8647, 111, 114, 110, 101, 114, 59, 1, 8990, 97, 114, 100, 59, 1, 10603, 114, 105, 59, 1, 9722, 4, 2, 105, 111, 12252, 12258, 100, 111, 116, 59, 1, 320, 117, 115, 116, 4, 2, 59, 97, 12267, 12269, 1, 9136, 99, 104, 101, 59, 1, 9136, 4, 4, 69, 97, 101, 115, 12285, 12288, 12303, 12322, 59, 1, 8808, 112, 4, 2, 59, 112, 12295, 12297, 1, 10889, 114, 111, 120, 59, 1, 10889, 4, 2, 59, 113, 12309, 12311, 1, 10887, 4, 2, 59, 113, 12317, 12319, 1, 10887, 59, 1, 8808, 105, 109, 59, 1, 8934, 4, 8, 97, 98, 110, 111, 112, 116, 119, 122, 12345, 12359, 12364, 12421, 12446, 12467, 12474, 12490, 4, 2, 110, 114, 12351, 12355, 103, 59, 1, 10220, 114, 59, 1, 8701, 114, 107, 59, 1, 10214, 103, 4, 3, 108, 109, 114, 12373, 12401, 12409, 101, 102, 116, 4, 2, 97, 114, 12382, 12389, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10231, 97, 112, 115, 116, 111, 59, 1, 10236, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10230, 112, 97, 114, 114, 111, 119, 4, 2, 108, 114, 12433, 12439, 101, 102, 116, 59, 1, 8619, 105, 103, 104, 116, 59, 1, 8620, 4, 3, 97, 102, 108, 12454, 12458, 12462, 114, 59, 1, 10629, 59, 3, 55349, 56669, 117, 115, 59, 1, 10797, 105, 109, 101, 115, 59, 1, 10804, 4, 2, 97, 98, 12480, 12485, 115, 116, 59, 1, 8727, 97, 114, 59, 1, 95, 4, 3, 59, 101, 102, 12498, 12500, 12506, 1, 9674, 110, 103, 101, 59, 1, 9674, 59, 1, 10731, 97, 114, 4, 2, 59, 108, 12517, 12519, 1, 40, 116, 59, 1, 10643, 4, 5, 97, 99, 104, 109, 116, 12535, 12540, 12548, 12561, 12564, 114, 114, 59, 1, 8646, 111, 114, 110, 101, 114, 59, 1, 8991, 97, 114, 4, 2, 59, 100, 12556, 12558, 1, 8651, 59, 1, 10605, 59, 1, 8206, 114, 105, 59, 1, 8895, 4, 6, 97, 99, 104, 105, 113, 116, 12583, 12589, 12594, 12597, 12614, 12635, 113, 117, 111, 59, 1, 8249, 114, 59, 3, 55349, 56513, 59, 1, 8624, 109, 4, 3, 59, 101, 103, 12606, 12608, 12611, 1, 8818, 59, 1, 10893, 59, 1, 10895, 4, 2, 98, 117, 12620, 12623, 59, 1, 91, 111, 4, 2, 59, 114, 12630, 12632, 1, 8216, 59, 1, 8218, 114, 111, 107, 59, 1, 322, 5, 60, 8, 59, 99, 100, 104, 105, 108, 113, 114, 12660, 12662, 12675, 12680, 12686, 12692, 12698, 12705, 1, 60, 4, 2, 99, 105, 12668, 12671, 59, 1, 10918, 114, 59, 1, 10873, 111, 116, 59, 1, 8918, 114, 101, 101, 59, 1, 8907, 109, 101, 115, 59, 1, 8905, 97, 114, 114, 59, 1, 10614, 117, 101, 115, 116, 59, 1, 10875, 4, 2, 80, 105, 12711, 12716, 97, 114, 59, 1, 10646, 4, 3, 59, 101, 102, 12724, 12726, 12729, 1, 9667, 59, 1, 8884, 59, 1, 9666, 114, 4, 2, 100, 117, 12739, 12746, 115, 104, 97, 114, 59, 1, 10570, 104, 97, 114, 59, 1, 10598, 4, 2, 101, 110, 12758, 12768, 114, 116, 110, 101, 113, 113, 59, 3, 8808, 65024, 69, 59, 3, 8808, 65024, 4, 14, 68, 97, 99, 100, 101, 102, 104, 105, 108, 110, 111, 112, 115, 117, 12803, 12809, 12893, 12908, 12914, 12928, 12933, 12937, 13011, 13025, 13032, 13049, 13052, 13069, 68, 111, 116, 59, 1, 8762, 4, 4, 99, 108, 112, 114, 12819, 12827, 12849, 12887, 114, 5, 175, 1, 59, 12825, 1, 175, 4, 2, 101, 116, 12833, 12836, 59, 1, 9794, 4, 2, 59, 101, 12842, 12844, 1, 10016, 115, 101, 59, 1, 10016, 4, 2, 59, 115, 12855, 12857, 1, 8614, 116, 111, 4, 4, 59, 100, 108, 117, 12869, 12871, 12877, 12883, 1, 8614, 111, 119, 110, 59, 1, 8615, 101, 102, 116, 59, 1, 8612, 112, 59, 1, 8613, 107, 101, 114, 59, 1, 9646, 4, 2, 111, 121, 12899, 12905, 109, 109, 97, 59, 1, 10793, 59, 1, 1084, 97, 115, 104, 59, 1, 8212, 97, 115, 117, 114, 101, 100, 97, 110, 103, 108, 101, 59, 1, 8737, 114, 59, 3, 55349, 56618, 111, 59, 1, 8487, 4, 3, 99, 100, 110, 12945, 12954, 12985, 114, 111, 5, 181, 1, 59, 12952, 1, 181, 4, 4, 59, 97, 99, 100, 12964, 12966, 12971, 12976, 1, 8739, 115, 116, 59, 1, 42, 105, 114, 59, 1, 10992, 111, 116, 5, 183, 1, 59, 12983, 1, 183, 117, 115, 4, 3, 59, 98, 100, 12995, 12997, 13000, 1, 8722, 59, 1, 8863, 4, 2, 59, 117, 13006, 13008, 1, 8760, 59, 1, 10794, 4, 2, 99, 100, 13017, 13021, 112, 59, 1, 10971, 114, 59, 1, 8230, 112, 108, 117, 115, 59, 1, 8723, 4, 2, 100, 112, 13038, 13044, 101, 108, 115, 59, 1, 8871, 102, 59, 3, 55349, 56670, 59, 1, 8723, 4, 2, 99, 116, 13058, 13063, 114, 59, 3, 55349, 56514, 112, 111, 115, 59, 1, 8766, 4, 3, 59, 108, 109, 13077, 13079, 13087, 1, 956, 116, 105, 109, 97, 112, 59, 1, 8888, 97, 112, 59, 1, 8888, 4, 24, 71, 76, 82, 86, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 13142, 13165, 13217, 13229, 13247, 13330, 13359, 13414, 13420, 13508, 13513, 13579, 13602, 13626, 13631, 13762, 13767, 13855, 13936, 13995, 14214, 14285, 14312, 14432, 4, 2, 103, 116, 13148, 13152, 59, 3, 8921, 824, 4, 2, 59, 118, 13158, 13161, 3, 8811, 8402, 59, 3, 8811, 824, 4, 3, 101, 108, 116, 13173, 13200, 13204, 102, 116, 4, 2, 97, 114, 13181, 13188, 114, 114, 111, 119, 59, 1, 8653, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8654, 59, 3, 8920, 824, 4, 2, 59, 118, 13210, 13213, 3, 8810, 8402, 59, 3, 8810, 824, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8655, 4, 2, 68, 100, 13235, 13241, 97, 115, 104, 59, 1, 8879, 97, 115, 104, 59, 1, 8878, 4, 5, 98, 99, 110, 112, 116, 13259, 13264, 13270, 13275, 13308, 108, 97, 59, 1, 8711, 117, 116, 101, 59, 1, 324, 103, 59, 3, 8736, 8402, 4, 5, 59, 69, 105, 111, 112, 13287, 13289, 13293, 13298, 13302, 1, 8777, 59, 3, 10864, 824, 100, 59, 3, 8779, 824, 115, 59, 1, 329, 114, 111, 120, 59, 1, 8777, 117, 114, 4, 2, 59, 97, 13316, 13318, 1, 9838, 108, 4, 2, 59, 115, 13325, 13327, 1, 9838, 59, 1, 8469, 4, 2, 115, 117, 13336, 13344, 112, 5, 160, 1, 59, 13342, 1, 160, 109, 112, 4, 2, 59, 101, 13352, 13355, 3, 8782, 824, 59, 3, 8783, 824, 4, 5, 97, 101, 111, 117, 121, 13371, 13385, 13391, 13407, 13411, 4, 2, 112, 114, 13377, 13380, 59, 1, 10819, 111, 110, 59, 1, 328, 100, 105, 108, 59, 1, 326, 110, 103, 4, 2, 59, 100, 13399, 13401, 1, 8775, 111, 116, 59, 3, 10861, 824, 112, 59, 1, 10818, 59, 1, 1085, 97, 115, 104, 59, 1, 8211, 4, 7, 59, 65, 97, 100, 113, 115, 120, 13436, 13438, 13443, 13466, 13472, 13478, 13494, 1, 8800, 114, 114, 59, 1, 8663, 114, 4, 2, 104, 114, 13450, 13454, 107, 59, 1, 10532, 4, 2, 59, 111, 13460, 13462, 1, 8599, 119, 59, 1, 8599, 111, 116, 59, 3, 8784, 824, 117, 105, 118, 59, 1, 8802, 4, 2, 101, 105, 13484, 13489, 97, 114, 59, 1, 10536, 109, 59, 3, 8770, 824, 105, 115, 116, 4, 2, 59, 115, 13503, 13505, 1, 8708, 59, 1, 8708, 114, 59, 3, 55349, 56619, 4, 4, 69, 101, 115, 116, 13523, 13527, 13563, 13568, 59, 3, 8807, 824, 4, 3, 59, 113, 115, 13535, 13537, 13559, 1, 8817, 4, 3, 59, 113, 115, 13545, 13547, 13551, 1, 8817, 59, 3, 8807, 824, 108, 97, 110, 116, 59, 3, 10878, 824, 59, 3, 10878, 824, 105, 109, 59, 1, 8821, 4, 2, 59, 114, 13574, 13576, 1, 8815, 59, 1, 8815, 4, 3, 65, 97, 112, 13587, 13592, 13597, 114, 114, 59, 1, 8654, 114, 114, 59, 1, 8622, 97, 114, 59, 1, 10994, 4, 3, 59, 115, 118, 13610, 13612, 13623, 1, 8715, 4, 2, 59, 100, 13618, 13620, 1, 8956, 59, 1, 8954, 59, 1, 8715, 99, 121, 59, 1, 1114, 4, 7, 65, 69, 97, 100, 101, 115, 116, 13647, 13652, 13656, 13661, 13665, 13737, 13742, 114, 114, 59, 1, 8653, 59, 3, 8806, 824, 114, 114, 59, 1, 8602, 114, 59, 1, 8229, 4, 4, 59, 102, 113, 115, 13675, 13677, 13703, 13725, 1, 8816, 116, 4, 2, 97, 114, 13684, 13691, 114, 114, 111, 119, 59, 1, 8602, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8622, 4, 3, 59, 113, 115, 13711, 13713, 13717, 1, 8816, 59, 3, 8806, 824, 108, 97, 110, 116, 59, 3, 10877, 824, 4, 2, 59, 115, 13731, 13734, 3, 10877, 824, 59, 1, 8814, 105, 109, 59, 1, 8820, 4, 2, 59, 114, 13748, 13750, 1, 8814, 105, 4, 2, 59, 101, 13757, 13759, 1, 8938, 59, 1, 8940, 105, 100, 59, 1, 8740, 4, 2, 112, 116, 13773, 13778, 102, 59, 3, 55349, 56671, 5, 172, 3, 59, 105, 110, 13787, 13789, 13829, 1, 172, 110, 4, 4, 59, 69, 100, 118, 13800, 13802, 13806, 13812, 1, 8713, 59, 3, 8953, 824, 111, 116, 59, 3, 8949, 824, 4, 3, 97, 98, 99, 13820, 13823, 13826, 59, 1, 8713, 59, 1, 8951, 59, 1, 8950, 105, 4, 2, 59, 118, 13836, 13838, 1, 8716, 4, 3, 97, 98, 99, 13846, 13849, 13852, 59, 1, 8716, 59, 1, 8958, 59, 1, 8957, 4, 3, 97, 111, 114, 13863, 13892, 13899, 114, 4, 4, 59, 97, 115, 116, 13874, 13876, 13883, 13888, 1, 8742, 108, 108, 101, 108, 59, 1, 8742, 108, 59, 3, 11005, 8421, 59, 3, 8706, 824, 108, 105, 110, 116, 59, 1, 10772, 4, 3, 59, 99, 101, 13907, 13909, 13914, 1, 8832, 117, 101, 59, 1, 8928, 4, 2, 59, 99, 13920, 13923, 3, 10927, 824, 4, 2, 59, 101, 13929, 13931, 1, 8832, 113, 59, 3, 10927, 824, 4, 4, 65, 97, 105, 116, 13946, 13951, 13971, 13982, 114, 114, 59, 1, 8655, 114, 114, 4, 3, 59, 99, 119, 13961, 13963, 13967, 1, 8603, 59, 3, 10547, 824, 59, 3, 8605, 824, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8603, 114, 105, 4, 2, 59, 101, 13990, 13992, 1, 8939, 59, 1, 8941, 4, 7, 99, 104, 105, 109, 112, 113, 117, 14011, 14036, 14060, 14080, 14085, 14090, 14106, 4, 4, 59, 99, 101, 114, 14021, 14023, 14028, 14032, 1, 8833, 117, 101, 59, 1, 8929, 59, 3, 10928, 824, 59, 3, 55349, 56515, 111, 114, 116, 4, 2, 109, 112, 14045, 14050, 105, 100, 59, 1, 8740, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8742, 109, 4, 2, 59, 101, 14067, 14069, 1, 8769, 4, 2, 59, 113, 14075, 14077, 1, 8772, 59, 1, 8772, 105, 100, 59, 1, 8740, 97, 114, 59, 1, 8742, 115, 117, 4, 2, 98, 112, 14098, 14102, 101, 59, 1, 8930, 101, 59, 1, 8931, 4, 3, 98, 99, 112, 14114, 14157, 14171, 4, 4, 59, 69, 101, 115, 14124, 14126, 14130, 14133, 1, 8836, 59, 3, 10949, 824, 59, 1, 8840, 101, 116, 4, 2, 59, 101, 14141, 14144, 3, 8834, 8402, 113, 4, 2, 59, 113, 14151, 14153, 1, 8840, 59, 3, 10949, 824, 99, 4, 2, 59, 101, 14164, 14166, 1, 8833, 113, 59, 3, 10928, 824, 4, 4, 59, 69, 101, 115, 14181, 14183, 14187, 14190, 1, 8837, 59, 3, 10950, 824, 59, 1, 8841, 101, 116, 4, 2, 59, 101, 14198, 14201, 3, 8835, 8402, 113, 4, 2, 59, 113, 14208, 14210, 1, 8841, 59, 3, 10950, 824, 4, 4, 103, 105, 108, 114, 14224, 14228, 14238, 14242, 108, 59, 1, 8825, 108, 100, 101, 5, 241, 1, 59, 14236, 1, 241, 103, 59, 1, 8824, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 14254, 14269, 101, 102, 116, 4, 2, 59, 101, 14263, 14265, 1, 8938, 113, 59, 1, 8940, 105, 103, 104, 116, 4, 2, 59, 101, 14279, 14281, 1, 8939, 113, 59, 1, 8941, 4, 2, 59, 109, 14291, 14293, 1, 957, 4, 3, 59, 101, 115, 14301, 14303, 14308, 1, 35, 114, 111, 59, 1, 8470, 112, 59, 1, 8199, 4, 9, 68, 72, 97, 100, 103, 105, 108, 114, 115, 14332, 14338, 14344, 14349, 14355, 14369, 14376, 14408, 14426, 97, 115, 104, 59, 1, 8877, 97, 114, 114, 59, 1, 10500, 112, 59, 3, 8781, 8402, 97, 115, 104, 59, 1, 8876, 4, 2, 101, 116, 14361, 14365, 59, 3, 8805, 8402, 59, 3, 62, 8402, 110, 102, 105, 110, 59, 1, 10718, 4, 3, 65, 101, 116, 14384, 14389, 14393, 114, 114, 59, 1, 10498, 59, 3, 8804, 8402, 4, 2, 59, 114, 14399, 14402, 3, 60, 8402, 105, 101, 59, 3, 8884, 8402, 4, 2, 65, 116, 14414, 14419, 114, 114, 59, 1, 10499, 114, 105, 101, 59, 3, 8885, 8402, 105, 109, 59, 3, 8764, 8402, 4, 3, 65, 97, 110, 14440, 14445, 14468, 114, 114, 59, 1, 8662, 114, 4, 2, 104, 114, 14452, 14456, 107, 59, 1, 10531, 4, 2, 59, 111, 14462, 14464, 1, 8598, 119, 59, 1, 8598, 101, 97, 114, 59, 1, 10535, 4, 18, 83, 97, 99, 100, 101, 102, 103, 104, 105, 108, 109, 111, 112, 114, 115, 116, 117, 118, 14512, 14515, 14535, 14560, 14597, 14603, 14618, 14643, 14657, 14662, 14701, 14741, 14747, 14769, 14851, 14877, 14907, 14916, 59, 1, 9416, 4, 2, 99, 115, 14521, 14531, 117, 116, 101, 5, 243, 1, 59, 14529, 1, 243, 116, 59, 1, 8859, 4, 2, 105, 121, 14541, 14557, 114, 4, 2, 59, 99, 14548, 14550, 1, 8858, 5, 244, 1, 59, 14555, 1, 244, 59, 1, 1086, 4, 5, 97, 98, 105, 111, 115, 14572, 14577, 14583, 14587, 14591, 115, 104, 59, 1, 8861, 108, 97, 99, 59, 1, 337, 118, 59, 1, 10808, 116, 59, 1, 8857, 111, 108, 100, 59, 1, 10684, 108, 105, 103, 59, 1, 339, 4, 2, 99, 114, 14609, 14614, 105, 114, 59, 1, 10687, 59, 3, 55349, 56620, 4, 3, 111, 114, 116, 14626, 14630, 14640, 110, 59, 1, 731, 97, 118, 101, 5, 242, 1, 59, 14638, 1, 242, 59, 1, 10689, 4, 2, 98, 109, 14649, 14654, 97, 114, 59, 1, 10677, 59, 1, 937, 110, 116, 59, 1, 8750, 4, 4, 97, 99, 105, 116, 14672, 14677, 14693, 14698, 114, 114, 59, 1, 8634, 4, 2, 105, 114, 14683, 14687, 114, 59, 1, 10686, 111, 115, 115, 59, 1, 10683, 110, 101, 59, 1, 8254, 59, 1, 10688, 4, 3, 97, 101, 105, 14709, 14714, 14719, 99, 114, 59, 1, 333, 103, 97, 59, 1, 969, 4, 3, 99, 100, 110, 14727, 14733, 14736, 114, 111, 110, 59, 1, 959, 59, 1, 10678, 117, 115, 59, 1, 8854, 112, 102, 59, 3, 55349, 56672, 4, 3, 97, 101, 108, 14755, 14759, 14764, 114, 59, 1, 10679, 114, 112, 59, 1, 10681, 117, 115, 59, 1, 8853, 4, 7, 59, 97, 100, 105, 111, 115, 118, 14785, 14787, 14792, 14831, 14837, 14841, 14848, 1, 8744, 114, 114, 59, 1, 8635, 4, 4, 59, 101, 102, 109, 14802, 14804, 14817, 14824, 1, 10845, 114, 4, 2, 59, 111, 14811, 14813, 1, 8500, 102, 59, 1, 8500, 5, 170, 1, 59, 14822, 1, 170, 5, 186, 1, 59, 14829, 1, 186, 103, 111, 102, 59, 1, 8886, 114, 59, 1, 10838, 108, 111, 112, 101, 59, 1, 10839, 59, 1, 10843, 4, 3, 99, 108, 111, 14859, 14863, 14873, 114, 59, 1, 8500, 97, 115, 104, 5, 248, 1, 59, 14871, 1, 248, 108, 59, 1, 8856, 105, 4, 2, 108, 109, 14884, 14893, 100, 101, 5, 245, 1, 59, 14891, 1, 245, 101, 115, 4, 2, 59, 97, 14901, 14903, 1, 8855, 115, 59, 1, 10806, 109, 108, 5, 246, 1, 59, 14914, 1, 246, 98, 97, 114, 59, 1, 9021, 4, 12, 97, 99, 101, 102, 104, 105, 108, 109, 111, 114, 115, 117, 14948, 14992, 14996, 15033, 15038, 15068, 15090, 15189, 15192, 15222, 15427, 15441, 114, 4, 4, 59, 97, 115, 116, 14959, 14961, 14976, 14989, 1, 8741, 5, 182, 2, 59, 108, 14968, 14970, 1, 182, 108, 101, 108, 59, 1, 8741, 4, 2, 105, 108, 14982, 14986, 109, 59, 1, 10995, 59, 1, 11005, 59, 1, 8706, 121, 59, 1, 1087, 114, 4, 5, 99, 105, 109, 112, 116, 15009, 15014, 15019, 15024, 15027, 110, 116, 59, 1, 37, 111, 100, 59, 1, 46, 105, 108, 59, 1, 8240, 59, 1, 8869, 101, 110, 107, 59, 1, 8241, 114, 59, 3, 55349, 56621, 4, 3, 105, 109, 111, 15046, 15057, 15063, 4, 2, 59, 118, 15052, 15054, 1, 966, 59, 1, 981, 109, 97, 116, 59, 1, 8499, 110, 101, 59, 1, 9742, 4, 3, 59, 116, 118, 15076, 15078, 15087, 1, 960, 99, 104, 102, 111, 114, 107, 59, 1, 8916, 59, 1, 982, 4, 2, 97, 117, 15096, 15119, 110, 4, 2, 99, 107, 15103, 15115, 107, 4, 2, 59, 104, 15110, 15112, 1, 8463, 59, 1, 8462, 118, 59, 1, 8463, 115, 4, 9, 59, 97, 98, 99, 100, 101, 109, 115, 116, 15140, 15142, 15148, 15151, 15156, 15168, 15171, 15179, 15184, 1, 43, 99, 105, 114, 59, 1, 10787, 59, 1, 8862, 105, 114, 59, 1, 10786, 4, 2, 111, 117, 15162, 15165, 59, 1, 8724, 59, 1, 10789, 59, 1, 10866, 110, 5, 177, 1, 59, 15177, 1, 177, 105, 109, 59, 1, 10790, 119, 111, 59, 1, 10791, 59, 1, 177, 4, 3, 105, 112, 117, 15200, 15208, 15213, 110, 116, 105, 110, 116, 59, 1, 10773, 102, 59, 3, 55349, 56673, 110, 100, 5, 163, 1, 59, 15220, 1, 163, 4, 10, 59, 69, 97, 99, 101, 105, 110, 111, 115, 117, 15244, 15246, 15249, 15253, 15258, 15334, 15347, 15367, 15416, 15421, 1, 8826, 59, 1, 10931, 112, 59, 1, 10935, 117, 101, 59, 1, 8828, 4, 2, 59, 99, 15264, 15266, 1, 10927, 4, 6, 59, 97, 99, 101, 110, 115, 15280, 15282, 15290, 15299, 15303, 15329, 1, 8826, 112, 112, 114, 111, 120, 59, 1, 10935, 117, 114, 108, 121, 101, 113, 59, 1, 8828, 113, 59, 1, 10927, 4, 3, 97, 101, 115, 15311, 15319, 15324, 112, 112, 114, 111, 120, 59, 1, 10937, 113, 113, 59, 1, 10933, 105, 109, 59, 1, 8936, 105, 109, 59, 1, 8830, 109, 101, 4, 2, 59, 115, 15342, 15344, 1, 8242, 59, 1, 8473, 4, 3, 69, 97, 115, 15355, 15358, 15362, 59, 1, 10933, 112, 59, 1, 10937, 105, 109, 59, 1, 8936, 4, 3, 100, 102, 112, 15375, 15378, 15404, 59, 1, 8719, 4, 3, 97, 108, 115, 15386, 15392, 15398, 108, 97, 114, 59, 1, 9006, 105, 110, 101, 59, 1, 8978, 117, 114, 102, 59, 1, 8979, 4, 2, 59, 116, 15410, 15412, 1, 8733, 111, 59, 1, 8733, 105, 109, 59, 1, 8830, 114, 101, 108, 59, 1, 8880, 4, 2, 99, 105, 15433, 15438, 114, 59, 3, 55349, 56517, 59, 1, 968, 110, 99, 115, 112, 59, 1, 8200, 4, 6, 102, 105, 111, 112, 115, 117, 15462, 15467, 15472, 15478, 15485, 15491, 114, 59, 3, 55349, 56622, 110, 116, 59, 1, 10764, 112, 102, 59, 3, 55349, 56674, 114, 105, 109, 101, 59, 1, 8279, 99, 114, 59, 3, 55349, 56518, 4, 3, 97, 101, 111, 15499, 15520, 15534, 116, 4, 2, 101, 105, 15506, 15515, 114, 110, 105, 111, 110, 115, 59, 1, 8461, 110, 116, 59, 1, 10774, 115, 116, 4, 2, 59, 101, 15528, 15530, 1, 63, 113, 59, 1, 8799, 116, 5, 34, 1, 59, 15540, 1, 34, 4, 21, 65, 66, 72, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 110, 111, 112, 114, 115, 116, 117, 120, 15586, 15609, 15615, 15620, 15796, 15855, 15893, 15931, 15977, 16001, 16039, 16183, 16204, 16222, 16228, 16285, 16312, 16318, 16363, 16408, 16416, 4, 3, 97, 114, 116, 15594, 15599, 15603, 114, 114, 59, 1, 8667, 114, 59, 1, 8658, 97, 105, 108, 59, 1, 10524, 97, 114, 114, 59, 1, 10511, 97, 114, 59, 1, 10596, 4, 7, 99, 100, 101, 110, 113, 114, 116, 15636, 15651, 15656, 15664, 15687, 15696, 15770, 4, 2, 101, 117, 15642, 15646, 59, 3, 8765, 817, 116, 101, 59, 1, 341, 105, 99, 59, 1, 8730, 109, 112, 116, 121, 118, 59, 1, 10675, 103, 4, 4, 59, 100, 101, 108, 15675, 15677, 15680, 15683, 1, 10217, 59, 1, 10642, 59, 1, 10661, 101, 59, 1, 10217, 117, 111, 5, 187, 1, 59, 15694, 1, 187, 114, 4, 11, 59, 97, 98, 99, 102, 104, 108, 112, 115, 116, 119, 15721, 15723, 15727, 15739, 15742, 15746, 15750, 15754, 15758, 15763, 15767, 1, 8594, 112, 59, 1, 10613, 4, 2, 59, 102, 15733, 15735, 1, 8677, 115, 59, 1, 10528, 59, 1, 10547, 115, 59, 1, 10526, 107, 59, 1, 8618, 112, 59, 1, 8620, 108, 59, 1, 10565, 105, 109, 59, 1, 10612, 108, 59, 1, 8611, 59, 1, 8605, 4, 2, 97, 105, 15776, 15781, 105, 108, 59, 1, 10522, 111, 4, 2, 59, 110, 15788, 15790, 1, 8758, 97, 108, 115, 59, 1, 8474, 4, 3, 97, 98, 114, 15804, 15809, 15814, 114, 114, 59, 1, 10509, 114, 107, 59, 1, 10099, 4, 2, 97, 107, 15820, 15833, 99, 4, 2, 101, 107, 15827, 15830, 59, 1, 125, 59, 1, 93, 4, 2, 101, 115, 15839, 15842, 59, 1, 10636, 108, 4, 2, 100, 117, 15849, 15852, 59, 1, 10638, 59, 1, 10640, 4, 4, 97, 101, 117, 121, 15865, 15871, 15886, 15890, 114, 111, 110, 59, 1, 345, 4, 2, 100, 105, 15877, 15882, 105, 108, 59, 1, 343, 108, 59, 1, 8969, 98, 59, 1, 125, 59, 1, 1088, 4, 4, 99, 108, 113, 115, 15903, 15907, 15914, 15927, 97, 59, 1, 10551, 100, 104, 97, 114, 59, 1, 10601, 117, 111, 4, 2, 59, 114, 15922, 15924, 1, 8221, 59, 1, 8221, 104, 59, 1, 8627, 4, 3, 97, 99, 103, 15939, 15966, 15970, 108, 4, 4, 59, 105, 112, 115, 15950, 15952, 15957, 15963, 1, 8476, 110, 101, 59, 1, 8475, 97, 114, 116, 59, 1, 8476, 59, 1, 8477, 116, 59, 1, 9645, 5, 174, 1, 59, 15975, 1, 174, 4, 3, 105, 108, 114, 15985, 15991, 15997, 115, 104, 116, 59, 1, 10621, 111, 111, 114, 59, 1, 8971, 59, 3, 55349, 56623, 4, 2, 97, 111, 16007, 16028, 114, 4, 2, 100, 117, 16014, 16017, 59, 1, 8641, 4, 2, 59, 108, 16023, 16025, 1, 8640, 59, 1, 10604, 4, 2, 59, 118, 16034, 16036, 1, 961, 59, 1, 1009, 4, 3, 103, 110, 115, 16047, 16167, 16171, 104, 116, 4, 6, 97, 104, 108, 114, 115, 116, 16063, 16081, 16103, 16130, 16143, 16155, 114, 114, 111, 119, 4, 2, 59, 116, 16073, 16075, 1, 8594, 97, 105, 108, 59, 1, 8611, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 16093, 16099, 111, 119, 110, 59, 1, 8641, 112, 59, 1, 8640, 101, 102, 116, 4, 2, 97, 104, 16112, 16120, 114, 114, 111, 119, 115, 59, 1, 8644, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8652, 105, 103, 104, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8649, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8605, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8908, 103, 59, 1, 730, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8787, 4, 3, 97, 104, 109, 16191, 16196, 16201, 114, 114, 59, 1, 8644, 97, 114, 59, 1, 8652, 59, 1, 8207, 111, 117, 115, 116, 4, 2, 59, 97, 16214, 16216, 1, 9137, 99, 104, 101, 59, 1, 9137, 109, 105, 100, 59, 1, 10990, 4, 4, 97, 98, 112, 116, 16238, 16252, 16257, 16278, 4, 2, 110, 114, 16244, 16248, 103, 59, 1, 10221, 114, 59, 1, 8702, 114, 107, 59, 1, 10215, 4, 3, 97, 102, 108, 16265, 16269, 16273, 114, 59, 1, 10630, 59, 3, 55349, 56675, 117, 115, 59, 1, 10798, 105, 109, 101, 115, 59, 1, 10805, 4, 2, 97, 112, 16291, 16304, 114, 4, 2, 59, 103, 16298, 16300, 1, 41, 116, 59, 1, 10644, 111, 108, 105, 110, 116, 59, 1, 10770, 97, 114, 114, 59, 1, 8649, 4, 4, 97, 99, 104, 113, 16328, 16334, 16339, 16342, 113, 117, 111, 59, 1, 8250, 114, 59, 3, 55349, 56519, 59, 1, 8625, 4, 2, 98, 117, 16348, 16351, 59, 1, 93, 111, 4, 2, 59, 114, 16358, 16360, 1, 8217, 59, 1, 8217, 4, 3, 104, 105, 114, 16371, 16377, 16383, 114, 101, 101, 59, 1, 8908, 109, 101, 115, 59, 1, 8906, 105, 4, 4, 59, 101, 102, 108, 16394, 16396, 16399, 16402, 1, 9657, 59, 1, 8885, 59, 1, 9656, 116, 114, 105, 59, 1, 10702, 108, 117, 104, 97, 114, 59, 1, 10600, 59, 1, 8478, 4, 19, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 111, 112, 113, 114, 115, 116, 117, 119, 122, 16459, 16466, 16472, 16572, 16590, 16672, 16687, 16746, 16844, 16850, 16924, 16963, 16988, 17115, 17121, 17154, 17206, 17614, 17656, 99, 117, 116, 101, 59, 1, 347, 113, 117, 111, 59, 1, 8218, 4, 10, 59, 69, 97, 99, 101, 105, 110, 112, 115, 121, 16494, 16496, 16499, 16513, 16518, 16531, 16536, 16556, 16564, 16569, 1, 8827, 59, 1, 10932, 4, 2, 112, 114, 16505, 16508, 59, 1, 10936, 111, 110, 59, 1, 353, 117, 101, 59, 1, 8829, 4, 2, 59, 100, 16524, 16526, 1, 10928, 105, 108, 59, 1, 351, 114, 99, 59, 1, 349, 4, 3, 69, 97, 115, 16544, 16547, 16551, 59, 1, 10934, 112, 59, 1, 10938, 105, 109, 59, 1, 8937, 111, 108, 105, 110, 116, 59, 1, 10771, 105, 109, 59, 1, 8831, 59, 1, 1089, 111, 116, 4, 3, 59, 98, 101, 16582, 16584, 16587, 1, 8901, 59, 1, 8865, 59, 1, 10854, 4, 7, 65, 97, 99, 109, 115, 116, 120, 16606, 16611, 16634, 16642, 16646, 16652, 16668, 114, 114, 59, 1, 8664, 114, 4, 2, 104, 114, 16618, 16622, 107, 59, 1, 10533, 4, 2, 59, 111, 16628, 16630, 1, 8600, 119, 59, 1, 8600, 116, 5, 167, 1, 59, 16640, 1, 167, 105, 59, 1, 59, 119, 97, 114, 59, 1, 10537, 109, 4, 2, 105, 110, 16659, 16665, 110, 117, 115, 59, 1, 8726, 59, 1, 8726, 116, 59, 1, 10038, 114, 4, 2, 59, 111, 16679, 16682, 3, 55349, 56624, 119, 110, 59, 1, 8994, 4, 4, 97, 99, 111, 121, 16697, 16702, 16716, 16739, 114, 112, 59, 1, 9839, 4, 2, 104, 121, 16708, 16713, 99, 121, 59, 1, 1097, 59, 1, 1096, 114, 116, 4, 2, 109, 112, 16724, 16729, 105, 100, 59, 1, 8739, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8741, 5, 173, 1, 59, 16744, 1, 173, 4, 2, 103, 109, 16752, 16770, 109, 97, 4, 3, 59, 102, 118, 16762, 16764, 16767, 1, 963, 59, 1, 962, 59, 1, 962, 4, 8, 59, 100, 101, 103, 108, 110, 112, 114, 16788, 16790, 16795, 16806, 16817, 16828, 16832, 16838, 1, 8764, 111, 116, 59, 1, 10858, 4, 2, 59, 113, 16801, 16803, 1, 8771, 59, 1, 8771, 4, 2, 59, 69, 16812, 16814, 1, 10910, 59, 1, 10912, 4, 2, 59, 69, 16823, 16825, 1, 10909, 59, 1, 10911, 101, 59, 1, 8774, 108, 117, 115, 59, 1, 10788, 97, 114, 114, 59, 1, 10610, 97, 114, 114, 59, 1, 8592, 4, 4, 97, 101, 105, 116, 16860, 16883, 16891, 16904, 4, 2, 108, 115, 16866, 16878, 108, 115, 101, 116, 109, 105, 110, 117, 115, 59, 1, 8726, 104, 112, 59, 1, 10803, 112, 97, 114, 115, 108, 59, 1, 10724, 4, 2, 100, 108, 16897, 16900, 59, 1, 8739, 101, 59, 1, 8995, 4, 2, 59, 101, 16910, 16912, 1, 10922, 4, 2, 59, 115, 16918, 16920, 1, 10924, 59, 3, 10924, 65024, 4, 3, 102, 108, 112, 16932, 16938, 16958, 116, 99, 121, 59, 1, 1100, 4, 2, 59, 98, 16944, 16946, 1, 47, 4, 2, 59, 97, 16952, 16954, 1, 10692, 114, 59, 1, 9023, 102, 59, 3, 55349, 56676, 97, 4, 2, 100, 114, 16970, 16985, 101, 115, 4, 2, 59, 117, 16978, 16980, 1, 9824, 105, 116, 59, 1, 9824, 59, 1, 8741, 4, 3, 99, 115, 117, 16996, 17028, 17089, 4, 2, 97, 117, 17002, 17015, 112, 4, 2, 59, 115, 17009, 17011, 1, 8851, 59, 3, 8851, 65024, 112, 4, 2, 59, 115, 17022, 17024, 1, 8852, 59, 3, 8852, 65024, 117, 4, 2, 98, 112, 17035, 17062, 4, 3, 59, 101, 115, 17043, 17045, 17048, 1, 8847, 59, 1, 8849, 101, 116, 4, 2, 59, 101, 17056, 17058, 1, 8847, 113, 59, 1, 8849, 4, 3, 59, 101, 115, 17070, 17072, 17075, 1, 8848, 59, 1, 8850, 101, 116, 4, 2, 59, 101, 17083, 17085, 1, 8848, 113, 59, 1, 8850, 4, 3, 59, 97, 102, 17097, 17099, 17112, 1, 9633, 114, 4, 2, 101, 102, 17106, 17109, 59, 1, 9633, 59, 1, 9642, 59, 1, 9642, 97, 114, 114, 59, 1, 8594, 4, 4, 99, 101, 109, 116, 17131, 17136, 17142, 17148, 114, 59, 3, 55349, 56520, 116, 109, 110, 59, 1, 8726, 105, 108, 101, 59, 1, 8995, 97, 114, 102, 59, 1, 8902, 4, 2, 97, 114, 17160, 17172, 114, 4, 2, 59, 102, 17167, 17169, 1, 9734, 59, 1, 9733, 4, 2, 97, 110, 17178, 17202, 105, 103, 104, 116, 4, 2, 101, 112, 17188, 17197, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 104, 105, 59, 1, 981, 115, 59, 1, 175, 4, 5, 98, 99, 109, 110, 112, 17218, 17351, 17420, 17423, 17427, 4, 9, 59, 69, 100, 101, 109, 110, 112, 114, 115, 17238, 17240, 17243, 17248, 17261, 17267, 17279, 17285, 17291, 1, 8834, 59, 1, 10949, 111, 116, 59, 1, 10941, 4, 2, 59, 100, 17254, 17256, 1, 8838, 111, 116, 59, 1, 10947, 117, 108, 116, 59, 1, 10945, 4, 2, 69, 101, 17273, 17276, 59, 1, 10955, 59, 1, 8842, 108, 117, 115, 59, 1, 10943, 97, 114, 114, 59, 1, 10617, 4, 3, 101, 105, 117, 17299, 17335, 17339, 116, 4, 3, 59, 101, 110, 17308, 17310, 17322, 1, 8834, 113, 4, 2, 59, 113, 17317, 17319, 1, 8838, 59, 1, 10949, 101, 113, 4, 2, 59, 113, 17330, 17332, 1, 8842, 59, 1, 10955, 109, 59, 1, 10951, 4, 2, 98, 112, 17345, 17348, 59, 1, 10965, 59, 1, 10963, 99, 4, 6, 59, 97, 99, 101, 110, 115, 17366, 17368, 17376, 17385, 17389, 17415, 1, 8827, 112, 112, 114, 111, 120, 59, 1, 10936, 117, 114, 108, 121, 101, 113, 59, 1, 8829, 113, 59, 1, 10928, 4, 3, 97, 101, 115, 17397, 17405, 17410, 112, 112, 114, 111, 120, 59, 1, 10938, 113, 113, 59, 1, 10934, 105, 109, 59, 1, 8937, 105, 109, 59, 1, 8831, 59, 1, 8721, 103, 59, 1, 9834, 4, 13, 49, 50, 51, 59, 69, 100, 101, 104, 108, 109, 110, 112, 115, 17455, 17462, 17469, 17476, 17478, 17481, 17496, 17509, 17524, 17530, 17536, 17548, 17554, 5, 185, 1, 59, 17460, 1, 185, 5, 178, 1, 59, 17467, 1, 178, 5, 179, 1, 59, 17474, 1, 179, 1, 8835, 59, 1, 10950, 4, 2, 111, 115, 17487, 17491, 116, 59, 1, 10942, 117, 98, 59, 1, 10968, 4, 2, 59, 100, 17502, 17504, 1, 8839, 111, 116, 59, 1, 10948, 115, 4, 2, 111, 117, 17516, 17520, 108, 59, 1, 10185, 98, 59, 1, 10967, 97, 114, 114, 59, 1, 10619, 117, 108, 116, 59, 1, 10946, 4, 2, 69, 101, 17542, 17545, 59, 1, 10956, 59, 1, 8843, 108, 117, 115, 59, 1, 10944, 4, 3, 101, 105, 117, 17562, 17598, 17602, 116, 4, 3, 59, 101, 110, 17571, 17573, 17585, 1, 8835, 113, 4, 2, 59, 113, 17580, 17582, 1, 8839, 59, 1, 10950, 101, 113, 4, 2, 59, 113, 17593, 17595, 1, 8843, 59, 1, 10956, 109, 59, 1, 10952, 4, 2, 98, 112, 17608, 17611, 59, 1, 10964, 59, 1, 10966, 4, 3, 65, 97, 110, 17622, 17627, 17650, 114, 114, 59, 1, 8665, 114, 4, 2, 104, 114, 17634, 17638, 107, 59, 1, 10534, 4, 2, 59, 111, 17644, 17646, 1, 8601, 119, 59, 1, 8601, 119, 97, 114, 59, 1, 10538, 108, 105, 103, 5, 223, 1, 59, 17664, 1, 223, 4, 13, 97, 98, 99, 100, 101, 102, 104, 105, 111, 112, 114, 115, 119, 17694, 17709, 17714, 17737, 17742, 17749, 17754, 17860, 17905, 17957, 17964, 18090, 18122, 4, 2, 114, 117, 17700, 17706, 103, 101, 116, 59, 1, 8982, 59, 1, 964, 114, 107, 59, 1, 9140, 4, 3, 97, 101, 121, 17722, 17728, 17734, 114, 111, 110, 59, 1, 357, 100, 105, 108, 59, 1, 355, 59, 1, 1090, 111, 116, 59, 1, 8411, 108, 114, 101, 99, 59, 1, 8981, 114, 59, 3, 55349, 56625, 4, 4, 101, 105, 107, 111, 17764, 17805, 17836, 17851, 4, 2, 114, 116, 17770, 17786, 101, 4, 2, 52, 102, 17777, 17780, 59, 1, 8756, 111, 114, 101, 59, 1, 8756, 97, 4, 3, 59, 115, 118, 17795, 17797, 17802, 1, 952, 121, 109, 59, 1, 977, 59, 1, 977, 4, 2, 99, 110, 17811, 17831, 107, 4, 2, 97, 115, 17818, 17826, 112, 112, 114, 111, 120, 59, 1, 8776, 105, 109, 59, 1, 8764, 115, 112, 59, 1, 8201, 4, 2, 97, 115, 17842, 17846, 112, 59, 1, 8776, 105, 109, 59, 1, 8764, 114, 110, 5, 254, 1, 59, 17858, 1, 254, 4, 3, 108, 109, 110, 17868, 17873, 17901, 100, 101, 59, 1, 732, 101, 115, 5, 215, 3, 59, 98, 100, 17884, 17886, 17898, 1, 215, 4, 2, 59, 97, 17892, 17894, 1, 8864, 114, 59, 1, 10801, 59, 1, 10800, 116, 59, 1, 8749, 4, 3, 101, 112, 115, 17913, 17917, 17953, 97, 59, 1, 10536, 4, 4, 59, 98, 99, 102, 17927, 17929, 17934, 17939, 1, 8868, 111, 116, 59, 1, 9014, 105, 114, 59, 1, 10993, 4, 2, 59, 111, 17945, 17948, 3, 55349, 56677, 114, 107, 59, 1, 10970, 97, 59, 1, 10537, 114, 105, 109, 101, 59, 1, 8244, 4, 3, 97, 105, 112, 17972, 17977, 18082, 100, 101, 59, 1, 8482, 4, 7, 97, 100, 101, 109, 112, 115, 116, 17993, 18051, 18056, 18059, 18066, 18072, 18076, 110, 103, 108, 101, 4, 5, 59, 100, 108, 113, 114, 18009, 18011, 18017, 18032, 18035, 1, 9653, 111, 119, 110, 59, 1, 9663, 101, 102, 116, 4, 2, 59, 101, 18026, 18028, 1, 9667, 113, 59, 1, 8884, 59, 1, 8796, 105, 103, 104, 116, 4, 2, 59, 101, 18045, 18047, 1, 9657, 113, 59, 1, 8885, 111, 116, 59, 1, 9708, 59, 1, 8796, 105, 110, 117, 115, 59, 1, 10810, 108, 117, 115, 59, 1, 10809, 98, 59, 1, 10701, 105, 109, 101, 59, 1, 10811, 101, 122, 105, 117, 109, 59, 1, 9186, 4, 3, 99, 104, 116, 18098, 18111, 18116, 4, 2, 114, 121, 18104, 18108, 59, 3, 55349, 56521, 59, 1, 1094, 99, 121, 59, 1, 1115, 114, 111, 107, 59, 1, 359, 4, 2, 105, 111, 18128, 18133, 120, 116, 59, 1, 8812, 104, 101, 97, 100, 4, 2, 108, 114, 18143, 18154, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8606, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8608, 4, 18, 65, 72, 97, 98, 99, 100, 102, 103, 104, 108, 109, 111, 112, 114, 115, 116, 117, 119, 18204, 18209, 18214, 18234, 18250, 18268, 18292, 18308, 18319, 18343, 18379, 18397, 18413, 18504, 18547, 18553, 18584, 18603, 114, 114, 59, 1, 8657, 97, 114, 59, 1, 10595, 4, 2, 99, 114, 18220, 18230, 117, 116, 101, 5, 250, 1, 59, 18228, 1, 250, 114, 59, 1, 8593, 114, 4, 2, 99, 101, 18241, 18245, 121, 59, 1, 1118, 118, 101, 59, 1, 365, 4, 2, 105, 121, 18256, 18265, 114, 99, 5, 251, 1, 59, 18263, 1, 251, 59, 1, 1091, 4, 3, 97, 98, 104, 18276, 18281, 18287, 114, 114, 59, 1, 8645, 108, 97, 99, 59, 1, 369, 97, 114, 59, 1, 10606, 4, 2, 105, 114, 18298, 18304, 115, 104, 116, 59, 1, 10622, 59, 3, 55349, 56626, 114, 97, 118, 101, 5, 249, 1, 59, 18317, 1, 249, 4, 2, 97, 98, 18325, 18338, 114, 4, 2, 108, 114, 18332, 18335, 59, 1, 8639, 59, 1, 8638, 108, 107, 59, 1, 9600, 4, 2, 99, 116, 18349, 18374, 4, 2, 111, 114, 18355, 18369, 114, 110, 4, 2, 59, 101, 18363, 18365, 1, 8988, 114, 59, 1, 8988, 111, 112, 59, 1, 8975, 114, 105, 59, 1, 9720, 4, 2, 97, 108, 18385, 18390, 99, 114, 59, 1, 363, 5, 168, 1, 59, 18395, 1, 168, 4, 2, 103, 112, 18403, 18408, 111, 110, 59, 1, 371, 102, 59, 3, 55349, 56678, 4, 6, 97, 100, 104, 108, 115, 117, 18427, 18434, 18445, 18470, 18475, 18494, 114, 114, 111, 119, 59, 1, 8593, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8597, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 18457, 18463, 101, 102, 116, 59, 1, 8639, 105, 103, 104, 116, 59, 1, 8638, 117, 115, 59, 1, 8846, 105, 4, 3, 59, 104, 108, 18484, 18486, 18489, 1, 965, 59, 1, 978, 111, 110, 59, 1, 965, 112, 97, 114, 114, 111, 119, 115, 59, 1, 8648, 4, 3, 99, 105, 116, 18512, 18537, 18542, 4, 2, 111, 114, 18518, 18532, 114, 110, 4, 2, 59, 101, 18526, 18528, 1, 8989, 114, 59, 1, 8989, 111, 112, 59, 1, 8974, 110, 103, 59, 1, 367, 114, 105, 59, 1, 9721, 99, 114, 59, 3, 55349, 56522, 4, 3, 100, 105, 114, 18561, 18566, 18572, 111, 116, 59, 1, 8944, 108, 100, 101, 59, 1, 361, 105, 4, 2, 59, 102, 18579, 18581, 1, 9653, 59, 1, 9652, 4, 2, 97, 109, 18590, 18595, 114, 114, 59, 1, 8648, 108, 5, 252, 1, 59, 18601, 1, 252, 97, 110, 103, 108, 101, 59, 1, 10663, 4, 15, 65, 66, 68, 97, 99, 100, 101, 102, 108, 110, 111, 112, 114, 115, 122, 18643, 18648, 18661, 18667, 18847, 18851, 18857, 18904, 18909, 18915, 18931, 18937, 18943, 18949, 18996, 114, 114, 59, 1, 8661, 97, 114, 4, 2, 59, 118, 18656, 18658, 1, 10984, 59, 1, 10985, 97, 115, 104, 59, 1, 8872, 4, 2, 110, 114, 18673, 18679, 103, 114, 116, 59, 1, 10652, 4, 7, 101, 107, 110, 112, 114, 115, 116, 18695, 18704, 18711, 18720, 18742, 18754, 18810, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 97, 112, 112, 97, 59, 1, 1008, 111, 116, 104, 105, 110, 103, 59, 1, 8709, 4, 3, 104, 105, 114, 18728, 18732, 18735, 105, 59, 1, 981, 59, 1, 982, 111, 112, 116, 111, 59, 1, 8733, 4, 2, 59, 104, 18748, 18750, 1, 8597, 111, 59, 1, 1009, 4, 2, 105, 117, 18760, 18766, 103, 109, 97, 59, 1, 962, 4, 2, 98, 112, 18772, 18791, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18784, 18787, 3, 8842, 65024, 59, 3, 10955, 65024, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18803, 18806, 3, 8843, 65024, 59, 3, 10956, 65024, 4, 2, 104, 114, 18816, 18822, 101, 116, 97, 59, 1, 977, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 18834, 18840, 101, 102, 116, 59, 1, 8882, 105, 103, 104, 116, 59, 1, 8883, 121, 59, 1, 1074, 97, 115, 104, 59, 1, 8866, 4, 3, 101, 108, 114, 18865, 18884, 18890, 4, 3, 59, 98, 101, 18873, 18875, 18880, 1, 8744, 97, 114, 59, 1, 8891, 113, 59, 1, 8794, 108, 105, 112, 59, 1, 8942, 4, 2, 98, 116, 18896, 18901, 97, 114, 59, 1, 124, 59, 1, 124, 114, 59, 3, 55349, 56627, 116, 114, 105, 59, 1, 8882, 115, 117, 4, 2, 98, 112, 18923, 18927, 59, 3, 8834, 8402, 59, 3, 8835, 8402, 112, 102, 59, 3, 55349, 56679, 114, 111, 112, 59, 1, 8733, 116, 114, 105, 59, 1, 8883, 4, 2, 99, 117, 18955, 18960, 114, 59, 3, 55349, 56523, 4, 2, 98, 112, 18966, 18981, 110, 4, 2, 69, 101, 18973, 18977, 59, 3, 10955, 65024, 59, 3, 8842, 65024, 110, 4, 2, 69, 101, 18988, 18992, 59, 3, 10956, 65024, 59, 3, 8843, 65024, 105, 103, 122, 97, 103, 59, 1, 10650, 4, 7, 99, 101, 102, 111, 112, 114, 115, 19020, 19026, 19061, 19066, 19072, 19075, 19089, 105, 114, 99, 59, 1, 373, 4, 2, 100, 105, 19032, 19055, 4, 2, 98, 103, 19038, 19043, 97, 114, 59, 1, 10847, 101, 4, 2, 59, 113, 19050, 19052, 1, 8743, 59, 1, 8793, 101, 114, 112, 59, 1, 8472, 114, 59, 3, 55349, 56628, 112, 102, 59, 3, 55349, 56680, 59, 1, 8472, 4, 2, 59, 101, 19081, 19083, 1, 8768, 97, 116, 104, 59, 1, 8768, 99, 114, 59, 3, 55349, 56524, 4, 14, 99, 100, 102, 104, 105, 108, 109, 110, 111, 114, 115, 117, 118, 119, 19125, 19146, 19152, 19157, 19173, 19176, 19192, 19197, 19202, 19236, 19252, 19269, 19286, 19291, 4, 3, 97, 105, 117, 19133, 19137, 19142, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 116, 114, 105, 59, 1, 9661, 114, 59, 3, 55349, 56629, 4, 2, 65, 97, 19163, 19168, 114, 114, 59, 1, 10234, 114, 114, 59, 1, 10231, 59, 1, 958, 4, 2, 65, 97, 19182, 19187, 114, 114, 59, 1, 10232, 114, 114, 59, 1, 10229, 97, 112, 59, 1, 10236, 105, 115, 59, 1, 8955, 4, 3, 100, 112, 116, 19210, 19215, 19230, 111, 116, 59, 1, 10752, 4, 2, 102, 108, 19221, 19225, 59, 3, 55349, 56681, 117, 115, 59, 1, 10753, 105, 109, 101, 59, 1, 10754, 4, 2, 65, 97, 19242, 19247, 114, 114, 59, 1, 10233, 114, 114, 59, 1, 10230, 4, 2, 99, 113, 19258, 19263, 114, 59, 3, 55349, 56525, 99, 117, 112, 59, 1, 10758, 4, 2, 112, 116, 19275, 19281, 108, 117, 115, 59, 1, 10756, 114, 105, 59, 1, 9651, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 19316, 19335, 19349, 19357, 19362, 19367, 19373, 19379, 99, 4, 2, 117, 121, 19323, 19332, 116, 101, 5, 253, 1, 59, 19330, 1, 253, 59, 1, 1103, 4, 2, 105, 121, 19341, 19346, 114, 99, 59, 1, 375, 59, 1, 1099, 110, 5, 165, 1, 59, 19355, 1, 165, 114, 59, 3, 55349, 56630, 99, 121, 59, 1, 1111, 112, 102, 59, 3, 55349, 56682, 99, 114, 59, 3, 55349, 56526, 4, 2, 99, 109, 19385, 19389, 121, 59, 1, 1102, 108, 5, 255, 1, 59, 19395, 1, 255, 4, 10, 97, 99, 100, 101, 102, 104, 105, 111, 115, 119, 19419, 19426, 19441, 19446, 19462, 19467, 19472, 19480, 19486, 19492, 99, 117, 116, 101, 59, 1, 378, 4, 2, 97, 121, 19432, 19438, 114, 111, 110, 59, 1, 382, 59, 1, 1079, 111, 116, 59, 1, 380, 4, 2, 101, 116, 19452, 19458, 116, 114, 102, 59, 1, 8488, 97, 59, 1, 950, 114, 59, 3, 55349, 56631, 99, 121, 59, 1, 1078, 103, 114, 97, 114, 114, 59, 1, 8669, 112, 102, 59, 3, 55349, 56683, 99, 114, 59, 3, 55349, 56527, 4, 2, 106, 110, 19498, 19501, 59, 1, 8205, 106, 59, 1, 8204]);

//Aliases


const $$3 = unicode.CODE_POINTS;
const $$ = unicode.CODE_POINT_SEQUENCES; //C1 Unicode control character reference replacements

const C1_CONTROLS_REFERENCE_REPLACEMENTS = {
  0x80: 0x20ac,
  0x82: 0x201a,
  0x83: 0x0192,
  0x84: 0x201e,
  0x85: 0x2026,
  0x86: 0x2020,
  0x87: 0x2021,
  0x88: 0x02c6,
  0x89: 0x2030,
  0x8a: 0x0160,
  0x8b: 0x2039,
  0x8c: 0x0152,
  0x8e: 0x017d,
  0x91: 0x2018,
  0x92: 0x2019,
  0x93: 0x201c,
  0x94: 0x201d,
  0x95: 0x2022,
  0x96: 0x2013,
  0x97: 0x2014,
  0x98: 0x02dc,
  0x99: 0x2122,
  0x9a: 0x0161,
  0x9b: 0x203a,
  0x9c: 0x0153,
  0x9e: 0x017e,
  0x9f: 0x0178
}; // Named entity tree flags

const HAS_DATA_FLAG = 1 << 0;
const DATA_DUPLET_FLAG = 1 << 1;
const HAS_BRANCHES_FLAG = 1 << 2;
const MAX_BRANCH_MARKER_VALUE = HAS_DATA_FLAG | DATA_DUPLET_FLAG | HAS_BRANCHES_FLAG; //States

const DATA_STATE = 'DATA_STATE';
const RCDATA_STATE = 'RCDATA_STATE';
const RAWTEXT_STATE = 'RAWTEXT_STATE';
const SCRIPT_DATA_STATE = 'SCRIPT_DATA_STATE';
const PLAINTEXT_STATE = 'PLAINTEXT_STATE';
const TAG_OPEN_STATE = 'TAG_OPEN_STATE';
const END_TAG_OPEN_STATE = 'END_TAG_OPEN_STATE';
const TAG_NAME_STATE = 'TAG_NAME_STATE';
const RCDATA_LESS_THAN_SIGN_STATE = 'RCDATA_LESS_THAN_SIGN_STATE';
const RCDATA_END_TAG_OPEN_STATE = 'RCDATA_END_TAG_OPEN_STATE';
const RCDATA_END_TAG_NAME_STATE = 'RCDATA_END_TAG_NAME_STATE';
const RAWTEXT_LESS_THAN_SIGN_STATE = 'RAWTEXT_LESS_THAN_SIGN_STATE';
const RAWTEXT_END_TAG_OPEN_STATE = 'RAWTEXT_END_TAG_OPEN_STATE';
const RAWTEXT_END_TAG_NAME_STATE = 'RAWTEXT_END_TAG_NAME_STATE';
const SCRIPT_DATA_LESS_THAN_SIGN_STATE = 'SCRIPT_DATA_LESS_THAN_SIGN_STATE';
const SCRIPT_DATA_END_TAG_OPEN_STATE = 'SCRIPT_DATA_END_TAG_OPEN_STATE';
const SCRIPT_DATA_END_TAG_NAME_STATE = 'SCRIPT_DATA_END_TAG_NAME_STATE';
const SCRIPT_DATA_ESCAPE_START_STATE = 'SCRIPT_DATA_ESCAPE_START_STATE';
const SCRIPT_DATA_ESCAPE_START_DASH_STATE = 'SCRIPT_DATA_ESCAPE_START_DASH_STATE';
const SCRIPT_DATA_ESCAPED_STATE = 'SCRIPT_DATA_ESCAPED_STATE';
const SCRIPT_DATA_ESCAPED_DASH_STATE = 'SCRIPT_DATA_ESCAPED_DASH_STATE';
const SCRIPT_DATA_ESCAPED_DASH_DASH_STATE = 'SCRIPT_DATA_ESCAPED_DASH_DASH_STATE';
const SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE = 'SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE';
const SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE = 'SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE';
const SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE = 'SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPED_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPED_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE';
const SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE = 'SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE';
const BEFORE_ATTRIBUTE_NAME_STATE = 'BEFORE_ATTRIBUTE_NAME_STATE';
const ATTRIBUTE_NAME_STATE = 'ATTRIBUTE_NAME_STATE';
const AFTER_ATTRIBUTE_NAME_STATE = 'AFTER_ATTRIBUTE_NAME_STATE';
const BEFORE_ATTRIBUTE_VALUE_STATE = 'BEFORE_ATTRIBUTE_VALUE_STATE';
const ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE = 'ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE';
const ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE = 'ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE';
const ATTRIBUTE_VALUE_UNQUOTED_STATE = 'ATTRIBUTE_VALUE_UNQUOTED_STATE';
const AFTER_ATTRIBUTE_VALUE_QUOTED_STATE = 'AFTER_ATTRIBUTE_VALUE_QUOTED_STATE';
const SELF_CLOSING_START_TAG_STATE = 'SELF_CLOSING_START_TAG_STATE';
const BOGUS_COMMENT_STATE = 'BOGUS_COMMENT_STATE';
const MARKUP_DECLARATION_OPEN_STATE = 'MARKUP_DECLARATION_OPEN_STATE';
const COMMENT_START_STATE = 'COMMENT_START_STATE';
const COMMENT_START_DASH_STATE = 'COMMENT_START_DASH_STATE';
const COMMENT_STATE = 'COMMENT_STATE';
const COMMENT_LESS_THAN_SIGN_STATE = 'COMMENT_LESS_THAN_SIGN_STATE';
const COMMENT_LESS_THAN_SIGN_BANG_STATE = 'COMMENT_LESS_THAN_SIGN_BANG_STATE';
const COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE = 'COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE';
const COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE = 'COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE';
const COMMENT_END_DASH_STATE = 'COMMENT_END_DASH_STATE';
const COMMENT_END_STATE = 'COMMENT_END_STATE';
const COMMENT_END_BANG_STATE = 'COMMENT_END_BANG_STATE';
const DOCTYPE_STATE = 'DOCTYPE_STATE';
const BEFORE_DOCTYPE_NAME_STATE = 'BEFORE_DOCTYPE_NAME_STATE';
const DOCTYPE_NAME_STATE = 'DOCTYPE_NAME_STATE';
const AFTER_DOCTYPE_NAME_STATE = 'AFTER_DOCTYPE_NAME_STATE';
const AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE = 'AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE';
const BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE = 'BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE';
const DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE = 'DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE';
const DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE = 'DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE';
const AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE = 'AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE';
const BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE = 'BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE';
const AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE = 'AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE';
const BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE = 'BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE';
const DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE = 'DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE';
const DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE = 'DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE';
const AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE = 'AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE';
const BOGUS_DOCTYPE_STATE = 'BOGUS_DOCTYPE_STATE';
const CDATA_SECTION_STATE = 'CDATA_SECTION_STATE';
const CDATA_SECTION_BRACKET_STATE = 'CDATA_SECTION_BRACKET_STATE';
const CDATA_SECTION_END_STATE = 'CDATA_SECTION_END_STATE';
const CHARACTER_REFERENCE_STATE = 'CHARACTER_REFERENCE_STATE';
const NAMED_CHARACTER_REFERENCE_STATE = 'NAMED_CHARACTER_REFERENCE_STATE';
const AMBIGUOUS_AMPERSAND_STATE = 'AMBIGUOS_AMPERSAND_STATE';
const NUMERIC_CHARACTER_REFERENCE_STATE = 'NUMERIC_CHARACTER_REFERENCE_STATE';
const HEXADEMICAL_CHARACTER_REFERENCE_START_STATE = 'HEXADEMICAL_CHARACTER_REFERENCE_START_STATE';
const DECIMAL_CHARACTER_REFERENCE_START_STATE = 'DECIMAL_CHARACTER_REFERENCE_START_STATE';
const HEXADEMICAL_CHARACTER_REFERENCE_STATE = 'HEXADEMICAL_CHARACTER_REFERENCE_STATE';
const DECIMAL_CHARACTER_REFERENCE_STATE = 'DECIMAL_CHARACTER_REFERENCE_STATE';
const NUMERIC_CHARACTER_REFERENCE_END_STATE = 'NUMERIC_CHARACTER_REFERENCE_END_STATE'; //Utils
//OPTIMIZATION: these utility functions should not be moved out of this module. V8 Crankshaft will not inline
//this functions if they will be situated in another module due to context switch.
//Always perform inlining check before modifying this functions ('node --trace-inlining').

function isWhitespace(cp) {
  return cp === $$3.SPACE || cp === $$3.LINE_FEED || cp === $$3.TABULATION || cp === $$3.FORM_FEED;
}

function isAsciiDigit(cp) {
  return cp >= $$3.DIGIT_0 && cp <= $$3.DIGIT_9;
}

function isAsciiUpper(cp) {
  return cp >= $$3.LATIN_CAPITAL_A && cp <= $$3.LATIN_CAPITAL_Z;
}

function isAsciiLower(cp) {
  return cp >= $$3.LATIN_SMALL_A && cp <= $$3.LATIN_SMALL_Z;
}

function isAsciiLetter(cp) {
  return isAsciiLower(cp) || isAsciiUpper(cp);
}

function isAsciiAlphaNumeric(cp) {
  return isAsciiLetter(cp) || isAsciiDigit(cp);
}

function isAsciiUpperHexDigit(cp) {
  return cp >= $$3.LATIN_CAPITAL_A && cp <= $$3.LATIN_CAPITAL_F;
}

function isAsciiLowerHexDigit(cp) {
  return cp >= $$3.LATIN_SMALL_A && cp <= $$3.LATIN_SMALL_F;
}

function isAsciiHexDigit(cp) {
  return isAsciiDigit(cp) || isAsciiUpperHexDigit(cp) || isAsciiLowerHexDigit(cp);
}

function toAsciiLowerCodePoint(cp) {
  return cp + 0x0020;
} //NOTE: String.fromCharCode() function can handle only characters from BMP subset.
//So, we need to workaround this manually.
//(see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/fromCharCode#Getting_it_to_work_with_higher_values)


function toChar(cp) {
  if (cp <= 0xffff) {
    return String.fromCharCode(cp);
  }

  cp -= 0x10000;
  return String.fromCharCode(cp >>> 10 & 0x3ff | 0xd800) + String.fromCharCode(0xdc00 | cp & 0x3ff);
}

function toAsciiLowerChar(cp) {
  return String.fromCharCode(toAsciiLowerCodePoint(cp));
}

function findNamedEntityTreeBranch(nodeIx, cp) {
  const branchCount = namedEntityData[++nodeIx];
  let lo = ++nodeIx;
  let hi = lo + branchCount - 1;

  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midCp = namedEntityData[mid];

    if (midCp < cp) {
      lo = mid + 1;
    } else if (midCp > cp) {
      hi = mid - 1;
    } else {
      return namedEntityData[mid + branchCount];
    }
  }

  return -1;
} //Tokenizer


class Tokenizer {
  constructor() {
    this.preprocessor = new preprocessor();
    this.tokenQueue = [];
    this.allowCDATA = false;
    this.state = DATA_STATE;
    this.returnState = '';
    this.charRefCode = -1;
    this.tempBuff = [];
    this.lastStartTagName = '';
    this.consumedAfterSnapshot = -1;
    this.active = false;
    this.currentCharacterToken = null;
    this.currentToken = null;
    this.currentAttr = null;
  } //Errors


  _err() {// NOTE: err reporting is noop by default. Enabled by mixin.
  }

  _errOnNextCodePoint(err) {
    this._consume();

    this._err(err);

    this._unconsume();
  } //API


  getNextToken() {
    while (!this.tokenQueue.length && this.active) {
      this.consumedAfterSnapshot = 0;

      const cp = this._consume();

      if (!this._ensureHibernation()) {
        this[this.state](cp);
      }
    }

    return this.tokenQueue.shift();
  }

  write(chunk, isLastChunk) {
    this.active = true;
    this.preprocessor.write(chunk, isLastChunk);
  }

  insertHtmlAtCurrentPos(chunk) {
    this.active = true;
    this.preprocessor.insertHtmlAtCurrentPos(chunk);
  } //Hibernation


  _ensureHibernation() {
    if (this.preprocessor.endOfChunkHit) {
      for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--) {
        this.preprocessor.retreat();
      }

      this.active = false;
      this.tokenQueue.push({
        type: Tokenizer.HIBERNATION_TOKEN
      });
      return true;
    }

    return false;
  } //Consumption


  _consume() {
    this.consumedAfterSnapshot++;
    return this.preprocessor.advance();
  }

  _unconsume() {
    this.consumedAfterSnapshot--;
    this.preprocessor.retreat();
  }

  _reconsumeInState(state) {
    this.state = state;

    this._unconsume();
  }

  _consumeSequenceIfMatch(pattern, startCp, caseSensitive) {
    let consumedCount = 0;
    let isMatch = true;
    const patternLength = pattern.length;
    let patternPos = 0;
    let cp = startCp;
    let patternCp = void 0;

    for (; patternPos < patternLength; patternPos++) {
      if (patternPos > 0) {
        cp = this._consume();
        consumedCount++;
      }

      if (cp === $$3.EOF) {
        isMatch = false;
        break;
      }

      patternCp = pattern[patternPos];

      if (cp !== patternCp && (caseSensitive || cp !== toAsciiLowerCodePoint(patternCp))) {
        isMatch = false;
        break;
      }
    }

    if (!isMatch) {
      while (consumedCount--) {
        this._unconsume();
      }
    }

    return isMatch;
  } //Temp buffer


  _isTempBufferEqualToScriptString() {
    if (this.tempBuff.length !== $$.SCRIPT_STRING.length) {
      return false;
    }

    for (let i = 0; i < this.tempBuff.length; i++) {
      if (this.tempBuff[i] !== $$.SCRIPT_STRING[i]) {
        return false;
      }
    }

    return true;
  } //Token creation


  _createStartTagToken() {
    this.currentToken = {
      type: Tokenizer.START_TAG_TOKEN,
      tagName: '',
      selfClosing: false,
      ackSelfClosing: false,
      attrs: []
    };
  }

  _createEndTagToken() {
    this.currentToken = {
      type: Tokenizer.END_TAG_TOKEN,
      tagName: '',
      selfClosing: false,
      attrs: []
    };
  }

  _createCommentToken() {
    this.currentToken = {
      type: Tokenizer.COMMENT_TOKEN,
      data: ''
    };
  }

  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: Tokenizer.DOCTYPE_TOKEN,
      name: initialName,
      forceQuirks: false,
      publicId: null,
      systemId: null
    };
  }

  _createCharacterToken(type, ch) {
    this.currentCharacterToken = {
      type: type,
      chars: ch
    };
  }

  _createEOFToken() {
    this.currentToken = {
      type: Tokenizer.EOF_TOKEN
    };
  } //Tag attributes


  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ''
    };
  }

  _leaveAttrName(toState) {
    if (Tokenizer.getTokenAttr(this.currentToken, this.currentAttr.name) === null) {
      this.currentToken.attrs.push(this.currentAttr);
    } else {
      this._err(errorCodes.duplicateAttribute);
    }

    this.state = toState;
  }

  _leaveAttrValue(toState) {
    this.state = toState;
  } //Token emission


  _emitCurrentToken() {
    this._emitCurrentCharacterToken();

    const ct = this.currentToken;
    this.currentToken = null; //NOTE: store emited start tag's tagName to determine is the following end tag token is appropriate.

    if (ct.type === Tokenizer.START_TAG_TOKEN) {
      this.lastStartTagName = ct.tagName;
    } else if (ct.type === Tokenizer.END_TAG_TOKEN) {
      if (ct.attrs.length > 0) {
        this._err(errorCodes.endTagWithAttributes);
      }

      if (ct.selfClosing) {
        this._err(errorCodes.endTagWithTrailingSolidus);
      }
    }

    this.tokenQueue.push(ct);
  }

  _emitCurrentCharacterToken() {
    if (this.currentCharacterToken) {
      this.tokenQueue.push(this.currentCharacterToken);
      this.currentCharacterToken = null;
    }
  }

  _emitEOFToken() {
    this._createEOFToken();

    this._emitCurrentToken();
  } //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)NULL_CHARACTER_TOKEN - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)WHITESPACE_CHARACTER_TOKEN - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)CHARACTER_TOKEN - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')


  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken && this.currentCharacterToken.type !== type) {
      this._emitCurrentCharacterToken();
    }

    if (this.currentCharacterToken) {
      this.currentCharacterToken.chars += ch;
    } else {
      this._createCharacterToken(type, ch);
    }
  }

  _emitCodePoint(cp) {
    let type = Tokenizer.CHARACTER_TOKEN;

    if (isWhitespace(cp)) {
      type = Tokenizer.WHITESPACE_CHARACTER_TOKEN;
    } else if (cp === $$3.NULL) {
      type = Tokenizer.NULL_CHARACTER_TOKEN;
    }

    this._appendCharToCurrentCharacterToken(type, toChar(cp));
  }

  _emitSeveralCodePoints(codePoints) {
    for (let i = 0; i < codePoints.length; i++) {
      this._emitCodePoint(codePoints[i]);
    }
  } //NOTE: used then we emit character explicitly. This is always a non-whitespace and a non-null character.
  //So we can avoid additional checks here.


  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(Tokenizer.CHARACTER_TOKEN, ch);
  } // Character reference helpers


  _matchNamedCharacterReference(startCp) {
    let result = null;
    let excess = 1;
    let i = findNamedEntityTreeBranch(0, startCp);
    this.tempBuff.push(startCp);

    while (i > -1) {
      const current = namedEntityData[i];
      const inNode = current < MAX_BRANCH_MARKER_VALUE;
      const nodeWithData = inNode && current & HAS_DATA_FLAG;

      if (nodeWithData) {
        //NOTE: we use greedy search, so we continue lookup at this point
        result = current & DATA_DUPLET_FLAG ? [namedEntityData[++i], namedEntityData[++i]] : [namedEntityData[++i]];
        excess = 0;
      }

      const cp = this._consume();

      this.tempBuff.push(cp);
      excess++;

      if (cp === $$3.EOF) {
        break;
      }

      if (inNode) {
        i = current & HAS_BRANCHES_FLAG ? findNamedEntityTreeBranch(i, cp) : -1;
      } else {
        i = cp === current ? ++i : -1;
      }
    }

    while (excess--) {
      this.tempBuff.pop();

      this._unconsume();
    }

    return result;
  }

  _isCharacterReferenceInAttribute() {
    return this.returnState === ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE || this.returnState === ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE || this.returnState === ATTRIBUTE_VALUE_UNQUOTED_STATE;
  }

  _isCharacterReferenceAttributeQuirk(withSemicolon) {
    if (!withSemicolon && this._isCharacterReferenceInAttribute()) {
      const nextCp = this._consume();

      this._unconsume();

      return nextCp === $$3.EQUALS_SIGN || isAsciiAlphaNumeric(nextCp);
    }

    return false;
  }

  _flushCodePointsConsumedAsCharacterReference() {
    if (this._isCharacterReferenceInAttribute()) {
      for (let i = 0; i < this.tempBuff.length; i++) {
        this.currentAttr.value += toChar(this.tempBuff[i]);
      }
    } else {
      this._emitSeveralCodePoints(this.tempBuff);
    }

    this.tempBuff = [];
  } // State machine
  // Data state
  //------------------------------------------------------------------


  [DATA_STATE](cp) {
    this.preprocessor.dropParsedChunk();

    if (cp === $$3.LESS_THAN_SIGN) {
      this.state = TAG_OPEN_STATE;
    } else if (cp === $$3.AMPERSAND) {
      this.returnState = DATA_STATE;
      this.state = CHARACTER_REFERENCE_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitCodePoint(cp);
    } else if (cp === $$3.EOF) {
      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } //  RCDATA state
  //------------------------------------------------------------------


  [RCDATA_STATE](cp) {
    this.preprocessor.dropParsedChunk();

    if (cp === $$3.AMPERSAND) {
      this.returnState = RCDATA_STATE;
      this.state = CHARACTER_REFERENCE_STATE;
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = RCDATA_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // RAWTEXT state
  //------------------------------------------------------------------


  [RAWTEXT_STATE](cp) {
    this.preprocessor.dropParsedChunk();

    if (cp === $$3.LESS_THAN_SIGN) {
      this.state = RAWTEXT_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // Script data state
  //------------------------------------------------------------------


  [SCRIPT_DATA_STATE](cp) {
    this.preprocessor.dropParsedChunk();

    if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // PLAINTEXT state
  //------------------------------------------------------------------


  [PLAINTEXT_STATE](cp) {
    this.preprocessor.dropParsedChunk();

    if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // Tag open state
  //------------------------------------------------------------------


  [TAG_OPEN_STATE](cp) {
    if (cp === $$3.EXCLAMATION_MARK) {
      this.state = MARKUP_DECLARATION_OPEN_STATE;
    } else if (cp === $$3.SOLIDUS) {
      this.state = END_TAG_OPEN_STATE;
    } else if (isAsciiLetter(cp)) {
      this._createStartTagToken();

      this._reconsumeInState(TAG_NAME_STATE);
    } else if (cp === $$3.QUESTION_MARK) {
      this._err(errorCodes.unexpectedQuestionMarkInsteadOfTagName);

      this._createCommentToken();

      this._reconsumeInState(BOGUS_COMMENT_STATE);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofBeforeTagName);

      this._emitChars('<');

      this._emitEOFToken();
    } else {
      this._err(errorCodes.invalidFirstCharacterOfTagName);

      this._emitChars('<');

      this._reconsumeInState(DATA_STATE);
    }
  } // End tag open state
  //------------------------------------------------------------------


  [END_TAG_OPEN_STATE](cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();

      this._reconsumeInState(TAG_NAME_STATE);
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingEndTagName);

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofBeforeTagName);

      this._emitChars('</');

      this._emitEOFToken();
    } else {
      this._err(errorCodes.invalidFirstCharacterOfTagName);

      this._createCommentToken();

      this._reconsumeInState(BOGUS_COMMENT_STATE);
    }
  } // Tag name state
  //------------------------------------------------------------------


  [TAG_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = BEFORE_ATTRIBUTE_NAME_STATE;
    } else if (cp === $$3.SOLIDUS) {
      this.state = SELF_CLOSING_START_TAG_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (isAsciiUpper(cp)) {
      this.currentToken.tagName += toAsciiLowerChar(cp);
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.tagName += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this.currentToken.tagName += toChar(cp);
    }
  } // RCDATA less-than sign state
  //------------------------------------------------------------------


  [RCDATA_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.SOLIDUS) {
      this.tempBuff = [];
      this.state = RCDATA_END_TAG_OPEN_STATE;
    } else {
      this._emitChars('<');

      this._reconsumeInState(RCDATA_STATE);
    }
  } // RCDATA end tag open state
  //------------------------------------------------------------------


  [RCDATA_END_TAG_OPEN_STATE](cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();

      this._reconsumeInState(RCDATA_END_TAG_NAME_STATE);
    } else {
      this._emitChars('</');

      this._reconsumeInState(RCDATA_STATE);
    }
  } // RCDATA end tag name state
  //------------------------------------------------------------------


  [RCDATA_END_TAG_NAME_STATE](cp) {
    if (isAsciiUpper(cp)) {
      this.currentToken.tagName += toAsciiLowerChar(cp);
      this.tempBuff.push(cp);
    } else if (isAsciiLower(cp)) {
      this.currentToken.tagName += toChar(cp);
      this.tempBuff.push(cp);
    } else {
      if (this.lastStartTagName === this.currentToken.tagName) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_ATTRIBUTE_NAME_STATE;
          return;
        }

        if (cp === $$3.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
          return;
        }

        if (cp === $$3.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;

          this._emitCurrentToken();

          return;
        }
      }

      this._emitChars('</');

      this._emitSeveralCodePoints(this.tempBuff);

      this._reconsumeInState(RCDATA_STATE);
    }
  } // RAWTEXT less-than sign state
  //------------------------------------------------------------------


  [RAWTEXT_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.SOLIDUS) {
      this.tempBuff = [];
      this.state = RAWTEXT_END_TAG_OPEN_STATE;
    } else {
      this._emitChars('<');

      this._reconsumeInState(RAWTEXT_STATE);
    }
  } // RAWTEXT end tag open state
  //------------------------------------------------------------------


  [RAWTEXT_END_TAG_OPEN_STATE](cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();

      this._reconsumeInState(RAWTEXT_END_TAG_NAME_STATE);
    } else {
      this._emitChars('</');

      this._reconsumeInState(RAWTEXT_STATE);
    }
  } // RAWTEXT end tag name state
  //------------------------------------------------------------------


  [RAWTEXT_END_TAG_NAME_STATE](cp) {
    if (isAsciiUpper(cp)) {
      this.currentToken.tagName += toAsciiLowerChar(cp);
      this.tempBuff.push(cp);
    } else if (isAsciiLower(cp)) {
      this.currentToken.tagName += toChar(cp);
      this.tempBuff.push(cp);
    } else {
      if (this.lastStartTagName === this.currentToken.tagName) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_ATTRIBUTE_NAME_STATE;
          return;
        }

        if (cp === $$3.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
          return;
        }

        if (cp === $$3.GREATER_THAN_SIGN) {
          this._emitCurrentToken();

          this.state = DATA_STATE;
          return;
        }
      }

      this._emitChars('</');

      this._emitSeveralCodePoints(this.tempBuff);

      this._reconsumeInState(RAWTEXT_STATE);
    }
  } // Script data less-than sign state
  //------------------------------------------------------------------


  [SCRIPT_DATA_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.SOLIDUS) {
      this.tempBuff = [];
      this.state = SCRIPT_DATA_END_TAG_OPEN_STATE;
    } else if (cp === $$3.EXCLAMATION_MARK) {
      this.state = SCRIPT_DATA_ESCAPE_START_STATE;

      this._emitChars('<!');
    } else {
      this._emitChars('<');

      this._reconsumeInState(SCRIPT_DATA_STATE);
    }
  } // Script data end tag open state
  //------------------------------------------------------------------


  [SCRIPT_DATA_END_TAG_OPEN_STATE](cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();

      this._reconsumeInState(SCRIPT_DATA_END_TAG_NAME_STATE);
    } else {
      this._emitChars('</');

      this._reconsumeInState(SCRIPT_DATA_STATE);
    }
  } // Script data end tag name state
  //------------------------------------------------------------------


  [SCRIPT_DATA_END_TAG_NAME_STATE](cp) {
    if (isAsciiUpper(cp)) {
      this.currentToken.tagName += toAsciiLowerChar(cp);
      this.tempBuff.push(cp);
    } else if (isAsciiLower(cp)) {
      this.currentToken.tagName += toChar(cp);
      this.tempBuff.push(cp);
    } else {
      if (this.lastStartTagName === this.currentToken.tagName) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_ATTRIBUTE_NAME_STATE;
          return;
        } else if (cp === $$3.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
          return;
        } else if (cp === $$3.GREATER_THAN_SIGN) {
          this._emitCurrentToken();

          this.state = DATA_STATE;
          return;
        }
      }

      this._emitChars('</');

      this._emitSeveralCodePoints(this.tempBuff);

      this._reconsumeInState(SCRIPT_DATA_STATE);
    }
  } // Script data escape start state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPE_START_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_ESCAPE_START_DASH_STATE;

      this._emitChars('-');
    } else {
      this._reconsumeInState(SCRIPT_DATA_STATE);
    }
  } // Script data escape start dash state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPE_START_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;

      this._emitChars('-');
    } else {
      this._reconsumeInState(SCRIPT_DATA_STATE);
    }
  } // Script data escaped state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_ESCAPED_DASH_STATE;

      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // Script data escaped dash state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;

      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.state = SCRIPT_DATA_ESCAPED_STATE;

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this.state = SCRIPT_DATA_ESCAPED_STATE;

      this._emitCodePoint(cp);
    }
  } // Script data escaped dash dash state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_DASH_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = SCRIPT_DATA_STATE;

      this._emitChars('>');
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.state = SCRIPT_DATA_ESCAPED_STATE;

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this.state = SCRIPT_DATA_ESCAPED_STATE;

      this._emitCodePoint(cp);
    }
  } // Script data escaped less-than sign state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.SOLIDUS) {
      this.tempBuff = [];
      this.state = SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE;
    } else if (isAsciiLetter(cp)) {
      this.tempBuff = [];

      this._emitChars('<');

      this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE);
    } else {
      this._emitChars('<');

      this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
    }
  } // Script data escaped end tag open state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE](cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();

      this._reconsumeInState(SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE);
    } else {
      this._emitChars('</');

      this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
    }
  } // Script data escaped end tag name state
  //------------------------------------------------------------------


  [SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE](cp) {
    if (isAsciiUpper(cp)) {
      this.currentToken.tagName += toAsciiLowerChar(cp);
      this.tempBuff.push(cp);
    } else if (isAsciiLower(cp)) {
      this.currentToken.tagName += toChar(cp);
      this.tempBuff.push(cp);
    } else {
      if (this.lastStartTagName === this.currentToken.tagName) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_ATTRIBUTE_NAME_STATE;
          return;
        }

        if (cp === $$3.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
          return;
        }

        if (cp === $$3.GREATER_THAN_SIGN) {
          this._emitCurrentToken();

          this.state = DATA_STATE;
          return;
        }
      }

      this._emitChars('</');

      this._emitSeveralCodePoints(this.tempBuff);

      this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
    }
  } // Script data double escape start state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE](cp) {
    if (isWhitespace(cp) || cp === $$3.SOLIDUS || cp === $$3.GREATER_THAN_SIGN) {
      this.state = this._isTempBufferEqualToScriptString() ? SCRIPT_DATA_DOUBLE_ESCAPED_STATE : SCRIPT_DATA_ESCAPED_STATE;

      this._emitCodePoint(cp);
    } else if (isAsciiUpper(cp)) {
      this.tempBuff.push(toAsciiLowerCodePoint(cp));

      this._emitCodePoint(cp);
    } else if (isAsciiLower(cp)) {
      this.tempBuff.push(cp);

      this._emitCodePoint(cp);
    } else {
      this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
    }
  } // Script data double escaped state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPED_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE;

      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;

      this._emitChars('<');
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // Script data double escaped dash state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE;

      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;

      this._emitChars('<');
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;

      this._emitCodePoint(cp);
    }
  } // Script data double escaped dash dash state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this._emitChars('-');
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;

      this._emitChars('<');
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = SCRIPT_DATA_STATE;

      this._emitChars('>');
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;

      this._emitChars(unicode.REPLACEMENT_CHARACTER);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInScriptHtmlCommentLikeText);

      this._emitEOFToken();
    } else {
      this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;

      this._emitCodePoint(cp);
    }
  } // Script data double escaped less-than sign state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.SOLIDUS) {
      this.tempBuff = [];
      this.state = SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE;

      this._emitChars('/');
    } else {
      this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
    }
  } // Script data double escape end state
  //------------------------------------------------------------------


  [SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE](cp) {
    if (isWhitespace(cp) || cp === $$3.SOLIDUS || cp === $$3.GREATER_THAN_SIGN) {
      this.state = this._isTempBufferEqualToScriptString() ? SCRIPT_DATA_ESCAPED_STATE : SCRIPT_DATA_DOUBLE_ESCAPED_STATE;

      this._emitCodePoint(cp);
    } else if (isAsciiUpper(cp)) {
      this.tempBuff.push(toAsciiLowerCodePoint(cp));

      this._emitCodePoint(cp);
    } else if (isAsciiLower(cp)) {
      this.tempBuff.push(cp);

      this._emitCodePoint(cp);
    } else {
      this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
    }
  } // Before attribute name state
  //------------------------------------------------------------------


  [BEFORE_ATTRIBUTE_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.SOLIDUS || cp === $$3.GREATER_THAN_SIGN || cp === $$3.EOF) {
      this._reconsumeInState(AFTER_ATTRIBUTE_NAME_STATE);
    } else if (cp === $$3.EQUALS_SIGN) {
      this._err(errorCodes.unexpectedEqualsSignBeforeAttributeName);

      this._createAttr('=');

      this.state = ATTRIBUTE_NAME_STATE;
    } else {
      this._createAttr('');

      this._reconsumeInState(ATTRIBUTE_NAME_STATE);
    }
  } // Attribute name state
  //------------------------------------------------------------------


  [ATTRIBUTE_NAME_STATE](cp) {
    if (isWhitespace(cp) || cp === $$3.SOLIDUS || cp === $$3.GREATER_THAN_SIGN || cp === $$3.EOF) {
      this._leaveAttrName(AFTER_ATTRIBUTE_NAME_STATE);

      this._unconsume();
    } else if (cp === $$3.EQUALS_SIGN) {
      this._leaveAttrName(BEFORE_ATTRIBUTE_VALUE_STATE);
    } else if (isAsciiUpper(cp)) {
      this.currentAttr.name += toAsciiLowerChar(cp);
    } else if (cp === $$3.QUOTATION_MARK || cp === $$3.APOSTROPHE || cp === $$3.LESS_THAN_SIGN) {
      this._err(errorCodes.unexpectedCharacterInAttributeName);

      this.currentAttr.name += toChar(cp);
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentAttr.name += unicode.REPLACEMENT_CHARACTER;
    } else {
      this.currentAttr.name += toChar(cp);
    }
  } // After attribute name state
  //------------------------------------------------------------------


  [AFTER_ATTRIBUTE_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.SOLIDUS) {
      this.state = SELF_CLOSING_START_TAG_STATE;
    } else if (cp === $$3.EQUALS_SIGN) {
      this.state = BEFORE_ATTRIBUTE_VALUE_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this._createAttr('');

      this._reconsumeInState(ATTRIBUTE_NAME_STATE);
    }
  } // Before attribute value state
  //------------------------------------------------------------------


  [BEFORE_ATTRIBUTE_VALUE_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.QUOTATION_MARK) {
      this.state = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this.state = ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingAttributeValue);

      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else {
      this._reconsumeInState(ATTRIBUTE_VALUE_UNQUOTED_STATE);
    }
  } // Attribute value (double-quoted) state
  //------------------------------------------------------------------


  [ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE](cp) {
    if (cp === $$3.QUOTATION_MARK) {
      this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
    } else if (cp === $$3.AMPERSAND) {
      this.returnState = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
      this.state = CHARACTER_REFERENCE_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this.currentAttr.value += toChar(cp);
    }
  } // Attribute value (single-quoted) state
  //------------------------------------------------------------------


  [ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE](cp) {
    if (cp === $$3.APOSTROPHE) {
      this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
    } else if (cp === $$3.AMPERSAND) {
      this.returnState = ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE;
      this.state = CHARACTER_REFERENCE_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this.currentAttr.value += toChar(cp);
    }
  } // Attribute value (unquoted) state
  //------------------------------------------------------------------


  [ATTRIBUTE_VALUE_UNQUOTED_STATE](cp) {
    if (isWhitespace(cp)) {
      this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
    } else if (cp === $$3.AMPERSAND) {
      this.returnState = ATTRIBUTE_VALUE_UNQUOTED_STATE;
      this.state = CHARACTER_REFERENCE_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._leaveAttrValue(DATA_STATE);

      this._emitCurrentToken();
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.QUOTATION_MARK || cp === $$3.APOSTROPHE || cp === $$3.LESS_THAN_SIGN || cp === $$3.EQUALS_SIGN || cp === $$3.GRAVE_ACCENT) {
      this._err(errorCodes.unexpectedCharacterInUnquotedAttributeValue);

      this.currentAttr.value += toChar(cp);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this.currentAttr.value += toChar(cp);
    }
  } // After attribute value (quoted) state
  //------------------------------------------------------------------


  [AFTER_ATTRIBUTE_VALUE_QUOTED_STATE](cp) {
    if (isWhitespace(cp)) {
      this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
    } else if (cp === $$3.SOLIDUS) {
      this._leaveAttrValue(SELF_CLOSING_START_TAG_STATE);
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._leaveAttrValue(DATA_STATE);

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingWhitespaceBetweenAttributes);

      this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
    }
  } // Self-closing start tag state
  //------------------------------------------------------------------


  [SELF_CLOSING_START_TAG_STATE](cp) {
    if (cp === $$3.GREATER_THAN_SIGN) {
      this.currentToken.selfClosing = true;
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInTag);

      this._emitEOFToken();
    } else {
      this._err(errorCodes.unexpectedSolidusInTag);

      this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
    }
  } // Bogus comment state
  //------------------------------------------------------------------


  [BOGUS_COMMENT_STATE](cp) {
    if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._emitCurrentToken();

      this._emitEOFToken();
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.data += unicode.REPLACEMENT_CHARACTER;
    } else {
      this.currentToken.data += toChar(cp);
    }
  } // Markup declaration open state
  //------------------------------------------------------------------


  [MARKUP_DECLARATION_OPEN_STATE](cp) {
    if (this._consumeSequenceIfMatch($$.DASH_DASH_STRING, cp, true)) {
      this._createCommentToken();

      this.state = COMMENT_START_STATE;
    } else if (this._consumeSequenceIfMatch($$.DOCTYPE_STRING, cp, false)) {
      this.state = DOCTYPE_STATE;
    } else if (this._consumeSequenceIfMatch($$.CDATA_START_STRING, cp, true)) {
      if (this.allowCDATA) {
        this.state = CDATA_SECTION_STATE;
      } else {
        this._err(errorCodes.cdataInHtmlContent);

        this._createCommentToken();

        this.currentToken.data = '[CDATA[';
        this.state = BOGUS_COMMENT_STATE;
      }
    } //NOTE: sequence lookup can be abrupted by hibernation. In that case lookup
    //results are no longer valid and we will need to start over.
    else if (!this._ensureHibernation()) {
      this._err(errorCodes.incorrectlyOpenedComment);

      this._createCommentToken();

      this._reconsumeInState(BOGUS_COMMENT_STATE);
    }
  } // Comment start state
  //------------------------------------------------------------------


  [COMMENT_START_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_START_DASH_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptClosingOfEmptyComment);

      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else {
      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment start dash state
  //------------------------------------------------------------------


  [COMMENT_START_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_END_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptClosingOfEmptyComment);

      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInComment);

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.data += '-';

      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment state
  //------------------------------------------------------------------


  [COMMENT_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_END_DASH_STATE;
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.currentToken.data += '<';
      this.state = COMMENT_LESS_THAN_SIGN_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.data += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInComment);

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.data += toChar(cp);
    }
  } // Comment less-than sign state
  //------------------------------------------------------------------


  [COMMENT_LESS_THAN_SIGN_STATE](cp) {
    if (cp === $$3.EXCLAMATION_MARK) {
      this.currentToken.data += '!';
      this.state = COMMENT_LESS_THAN_SIGN_BANG_STATE;
    } else if (cp === $$3.LESS_THAN_SIGN) {
      this.currentToken.data += '!';
    } else {
      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment less-than sign bang state
  //------------------------------------------------------------------


  [COMMENT_LESS_THAN_SIGN_BANG_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE;
    } else {
      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment less-than sign bang dash state
  //------------------------------------------------------------------


  [COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE;
    } else {
      this._reconsumeInState(COMMENT_END_DASH_STATE);
    }
  } // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------


  [COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE](cp) {
    if (cp !== $$3.GREATER_THAN_SIGN && cp !== $$3.EOF) {
      this._err(errorCodes.nestedComment);
    }

    this._reconsumeInState(COMMENT_END_STATE);
  } // Comment end dash state
  //------------------------------------------------------------------


  [COMMENT_END_DASH_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.state = COMMENT_END_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInComment);

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.data += '-';

      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment end state
  //------------------------------------------------------------------


  [COMMENT_END_STATE](cp) {
    if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EXCLAMATION_MARK) {
      this.state = COMMENT_END_BANG_STATE;
    } else if (cp === $$3.HYPHEN_MINUS) {
      this.currentToken.data += '-';
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInComment);

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.data += '--';

      this._reconsumeInState(COMMENT_STATE);
    }
  } // Comment end bang state
  //------------------------------------------------------------------


  [COMMENT_END_BANG_STATE](cp) {
    if (cp === $$3.HYPHEN_MINUS) {
      this.currentToken.data += '--!';
      this.state = COMMENT_END_DASH_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.incorrectlyClosedComment);

      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInComment);

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.data += '--!';

      this._reconsumeInState(COMMENT_STATE);
    }
  } // DOCTYPE state
  //------------------------------------------------------------------


  [DOCTYPE_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = BEFORE_DOCTYPE_NAME_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._reconsumeInState(BEFORE_DOCTYPE_NAME_STATE);
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this._createDoctypeToken(null);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingWhitespaceBeforeDoctypeName);

      this._reconsumeInState(BEFORE_DOCTYPE_NAME_STATE);
    }
  } // Before DOCTYPE name state
  //------------------------------------------------------------------


  [BEFORE_DOCTYPE_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (isAsciiUpper(cp)) {
      this._createDoctypeToken(toAsciiLowerChar(cp));

      this.state = DOCTYPE_NAME_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this._createDoctypeToken(unicode.REPLACEMENT_CHARACTER);

      this.state = DOCTYPE_NAME_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingDoctypeName);

      this._createDoctypeToken(null);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this._createDoctypeToken(null);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._createDoctypeToken(toChar(cp));

      this.state = DOCTYPE_NAME_STATE;
    }
  } // DOCTYPE name state
  //------------------------------------------------------------------


  [DOCTYPE_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = AFTER_DOCTYPE_NAME_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (isAsciiUpper(cp)) {
      this.currentToken.name += toAsciiLowerChar(cp);
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.name += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.name += toChar(cp);
    }
  } // After DOCTYPE name state
  //------------------------------------------------------------------


  [AFTER_DOCTYPE_NAME_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else if (this._consumeSequenceIfMatch($$.PUBLIC_STRING, cp, false)) {
      this.state = AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE;
    } else if (this._consumeSequenceIfMatch($$.SYSTEM_STRING, cp, false)) {
      this.state = AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE;
    } //NOTE: sequence lookup can be abrupted by hibernation. In that case lookup
    //results are no longer valid and we will need to start over.
    else if (!this._ensureHibernation()) {
      this._err(errorCodes.invalidCharacterSequenceAfterDoctypeName);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // After DOCTYPE public keyword state
  //------------------------------------------------------------------


  [AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
    } else if (cp === $$3.QUOTATION_MARK) {
      this._err(errorCodes.missingWhitespaceAfterDoctypePublicKeyword);

      this.currentToken.publicId = '';
      this.state = DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this._err(errorCodes.missingWhitespaceAfterDoctypePublicKeyword);

      this.currentToken.publicId = '';
      this.state = DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // Before DOCTYPE public identifier state
  //------------------------------------------------------------------


  [BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.QUOTATION_MARK) {
      this.currentToken.publicId = '';
      this.state = DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this.currentToken.publicId = '';
      this.state = DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------


  [DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE](cp) {
    if (cp === $$3.QUOTATION_MARK) {
      this.state = AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.publicId += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.publicId += toChar(cp);
    }
  } // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------


  [DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE](cp) {
    if (cp === $$3.APOSTROPHE) {
      this.state = AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.publicId += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptDoctypePublicIdentifier);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.publicId += toChar(cp);
    }
  } // After DOCTYPE public identifier state
  //------------------------------------------------------------------


  [AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.QUOTATION_MARK) {
      this._err(errorCodes.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);

      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this._err(errorCodes.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);

      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------


  [BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.GREATER_THAN_SIGN) {
      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.QUOTATION_MARK) {
      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // After DOCTYPE system keyword state
  //------------------------------------------------------------------


  [AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE](cp) {
    if (isWhitespace(cp)) {
      this.state = BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
    } else if (cp === $$3.QUOTATION_MARK) {
      this._err(errorCodes.missingWhitespaceAfterDoctypeSystemKeyword);

      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this._err(errorCodes.missingWhitespaceAfterDoctypeSystemKeyword);

      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // Before DOCTYPE system identifier state
  //------------------------------------------------------------------


  [BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.QUOTATION_MARK) {
      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
    } else if (cp === $$3.APOSTROPHE) {
      this.currentToken.systemId = '';
      this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.missingDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;
      this.state = DATA_STATE;

      this._emitCurrentToken();
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.missingQuoteBeforeDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------


  [DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE](cp) {
    if (cp === $$3.QUOTATION_MARK) {
      this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.systemId += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.systemId += toChar(cp);
    }
  } // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------


  [DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE](cp) {
    if (cp === $$3.APOSTROPHE) {
      this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);

      this.currentToken.systemId += unicode.REPLACEMENT_CHARACTER;
    } else if (cp === $$3.GREATER_THAN_SIGN) {
      this._err(errorCodes.abruptDoctypeSystemIdentifier);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this.currentToken.systemId += toChar(cp);
    }
  } // After DOCTYPE system identifier state
  //------------------------------------------------------------------


  [AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE](cp) {
    if (isWhitespace(cp)) {
      return;
    }

    if (cp === $$3.GREATER_THAN_SIGN) {
      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInDoctype);

      this.currentToken.forceQuirks = true;

      this._emitCurrentToken();

      this._emitEOFToken();
    } else {
      this._err(errorCodes.unexpectedCharacterAfterDoctypeSystemIdentifier);

      this._reconsumeInState(BOGUS_DOCTYPE_STATE);
    }
  } // Bogus DOCTYPE state
  //------------------------------------------------------------------


  [BOGUS_DOCTYPE_STATE](cp) {
    if (cp === $$3.GREATER_THAN_SIGN) {
      this._emitCurrentToken();

      this.state = DATA_STATE;
    } else if (cp === $$3.NULL) {
      this._err(errorCodes.unexpectedNullCharacter);
    } else if (cp === $$3.EOF) {
      this._emitCurrentToken();

      this._emitEOFToken();
    }
  } // CDATA section state
  //------------------------------------------------------------------


  [CDATA_SECTION_STATE](cp) {
    if (cp === $$3.RIGHT_SQUARE_BRACKET) {
      this.state = CDATA_SECTION_BRACKET_STATE;
    } else if (cp === $$3.EOF) {
      this._err(errorCodes.eofInCdata);

      this._emitEOFToken();
    } else {
      this._emitCodePoint(cp);
    }
  } // CDATA section bracket state
  //------------------------------------------------------------------


  [CDATA_SECTION_BRACKET_STATE](cp) {
    if (cp === $$3.RIGHT_SQUARE_BRACKET) {
      this.state = CDATA_SECTION_END_STATE;
    } else {
      this._emitChars(']');

      this._reconsumeInState(CDATA_SECTION_STATE);
    }
  } // CDATA section end state
  //------------------------------------------------------------------


  [CDATA_SECTION_END_STATE](cp) {
    if (cp === $$3.GREATER_THAN_SIGN) {
      this.state = DATA_STATE;
    } else if (cp === $$3.RIGHT_SQUARE_BRACKET) {
      this._emitChars(']');
    } else {
      this._emitChars(']]');

      this._reconsumeInState(CDATA_SECTION_STATE);
    }
  } // Character reference state
  //------------------------------------------------------------------


  [CHARACTER_REFERENCE_STATE](cp) {
    this.tempBuff = [$$3.AMPERSAND];

    if (cp === $$3.NUMBER_SIGN) {
      this.tempBuff.push(cp);
      this.state = NUMERIC_CHARACTER_REFERENCE_STATE;
    } else if (isAsciiAlphaNumeric(cp)) {
      this._reconsumeInState(NAMED_CHARACTER_REFERENCE_STATE);
    } else {
      this._flushCodePointsConsumedAsCharacterReference();

      this._reconsumeInState(this.returnState);
    }
  } // Named character reference state
  //------------------------------------------------------------------


  [NAMED_CHARACTER_REFERENCE_STATE](cp) {
    const matchResult = this._matchNamedCharacterReference(cp); //NOTE: matching can be abrupted by hibernation. In that case match
    //results are no longer valid and we will need to start over.


    if (this._ensureHibernation()) {
      this.tempBuff = [$$3.AMPERSAND];
    } else if (matchResult) {
      const withSemicolon = this.tempBuff[this.tempBuff.length - 1] === $$3.SEMICOLON;

      if (!this._isCharacterReferenceAttributeQuirk(withSemicolon)) {
        if (!withSemicolon) {
          this._errOnNextCodePoint(errorCodes.missingSemicolonAfterCharacterReference);
        }

        this.tempBuff = matchResult;
      }

      this._flushCodePointsConsumedAsCharacterReference();

      this.state = this.returnState;
    } else {
      this._flushCodePointsConsumedAsCharacterReference();

      this.state = AMBIGUOUS_AMPERSAND_STATE;
    }
  } // Ambiguos ampersand state
  //------------------------------------------------------------------


  [AMBIGUOUS_AMPERSAND_STATE](cp) {
    if (isAsciiAlphaNumeric(cp)) {
      if (this._isCharacterReferenceInAttribute()) {
        this.currentAttr.value += toChar(cp);
      } else {
        this._emitCodePoint(cp);
      }
    } else {
      if (cp === $$3.SEMICOLON) {
        this._err(errorCodes.unknownNamedCharacterReference);
      }

      this._reconsumeInState(this.returnState);
    }
  } // Numeric character reference state
  //------------------------------------------------------------------


  [NUMERIC_CHARACTER_REFERENCE_STATE](cp) {
    this.charRefCode = 0;

    if (cp === $$3.LATIN_SMALL_X || cp === $$3.LATIN_CAPITAL_X) {
      this.tempBuff.push(cp);
      this.state = HEXADEMICAL_CHARACTER_REFERENCE_START_STATE;
    } else {
      this._reconsumeInState(DECIMAL_CHARACTER_REFERENCE_START_STATE);
    }
  } // Hexademical character reference start state
  //------------------------------------------------------------------


  [HEXADEMICAL_CHARACTER_REFERENCE_START_STATE](cp) {
    if (isAsciiHexDigit(cp)) {
      this._reconsumeInState(HEXADEMICAL_CHARACTER_REFERENCE_STATE);
    } else {
      this._err(errorCodes.absenceOfDigitsInNumericCharacterReference);

      this._flushCodePointsConsumedAsCharacterReference();

      this._reconsumeInState(this.returnState);
    }
  } // Decimal character reference start state
  //------------------------------------------------------------------


  [DECIMAL_CHARACTER_REFERENCE_START_STATE](cp) {
    if (isAsciiDigit(cp)) {
      this._reconsumeInState(DECIMAL_CHARACTER_REFERENCE_STATE);
    } else {
      this._err(errorCodes.absenceOfDigitsInNumericCharacterReference);

      this._flushCodePointsConsumedAsCharacterReference();

      this._reconsumeInState(this.returnState);
    }
  } // Hexademical character reference state
  //------------------------------------------------------------------


  [HEXADEMICAL_CHARACTER_REFERENCE_STATE](cp) {
    if (isAsciiUpperHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 0x37;
    } else if (isAsciiLowerHexDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 0x57;
    } else if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 16 + cp - 0x30;
    } else if (cp === $$3.SEMICOLON) {
      this.state = NUMERIC_CHARACTER_REFERENCE_END_STATE;
    } else {
      this._err(errorCodes.missingSemicolonAfterCharacterReference);

      this._reconsumeInState(NUMERIC_CHARACTER_REFERENCE_END_STATE);
    }
  } // Decimal character reference state
  //------------------------------------------------------------------


  [DECIMAL_CHARACTER_REFERENCE_STATE](cp) {
    if (isAsciiDigit(cp)) {
      this.charRefCode = this.charRefCode * 10 + cp - 0x30;
    } else if (cp === $$3.SEMICOLON) {
      this.state = NUMERIC_CHARACTER_REFERENCE_END_STATE;
    } else {
      this._err(errorCodes.missingSemicolonAfterCharacterReference);

      this._reconsumeInState(NUMERIC_CHARACTER_REFERENCE_END_STATE);
    }
  } // Numeric character reference end state
  //------------------------------------------------------------------


  [NUMERIC_CHARACTER_REFERENCE_END_STATE]() {
    if (this.charRefCode === $$3.NULL) {
      this._err(errorCodes.nullCharacterReference);

      this.charRefCode = $$3.REPLACEMENT_CHARACTER;
    } else if (this.charRefCode > 0x10ffff) {
      this._err(errorCodes.characterReferenceOutsideUnicodeRange);

      this.charRefCode = $$3.REPLACEMENT_CHARACTER;
    } else if (unicode.isSurrogate(this.charRefCode)) {
      this._err(errorCodes.surrogateCharacterReference);

      this.charRefCode = $$3.REPLACEMENT_CHARACTER;
    } else if (unicode.isUndefinedCodePoint(this.charRefCode)) {
      this._err(errorCodes.noncharacterCharacterReference);
    } else if (unicode.isControlCodePoint(this.charRefCode) || this.charRefCode === $$3.CARRIAGE_RETURN) {
      this._err(errorCodes.controlCharacterReference);

      const replacement = C1_CONTROLS_REFERENCE_REPLACEMENTS[this.charRefCode];

      if (replacement) {
        this.charRefCode = replacement;
      }
    }

    this.tempBuff = [this.charRefCode];

    this._flushCodePointsConsumedAsCharacterReference();

    this._reconsumeInState(this.returnState);
  }

} //Token types


Tokenizer.CHARACTER_TOKEN = 'CHARACTER_TOKEN';
Tokenizer.NULL_CHARACTER_TOKEN = 'NULL_CHARACTER_TOKEN';
Tokenizer.WHITESPACE_CHARACTER_TOKEN = 'WHITESPACE_CHARACTER_TOKEN';
Tokenizer.START_TAG_TOKEN = 'START_TAG_TOKEN';
Tokenizer.END_TAG_TOKEN = 'END_TAG_TOKEN';
Tokenizer.COMMENT_TOKEN = 'COMMENT_TOKEN';
Tokenizer.DOCTYPE_TOKEN = 'DOCTYPE_TOKEN';
Tokenizer.EOF_TOKEN = 'EOF_TOKEN';
Tokenizer.HIBERNATION_TOKEN = 'HIBERNATION_TOKEN'; //Tokenizer initial states for different modes

Tokenizer.MODE = {
  DATA: DATA_STATE,
  RCDATA: RCDATA_STATE,
  RAWTEXT: RAWTEXT_STATE,
  SCRIPT_DATA: SCRIPT_DATA_STATE,
  PLAINTEXT: PLAINTEXT_STATE
}; //Static

Tokenizer.getTokenAttr = function (token, attrName) {
  for (let i = token.attrs.length - 1; i >= 0; i--) {
    if (token.attrs[i].name === attrName) {
      return token.attrs[i].value;
    }
  }

  return null;
};

var tokenizer = Tokenizer;

var html$4 = entry.createCommonjsModule(function (module, exports) {

const NS = exports.NAMESPACES = {
  HTML: 'http://www.w3.org/1999/xhtml',
  MATHML: 'http://www.w3.org/1998/Math/MathML',
  SVG: 'http://www.w3.org/2000/svg',
  XLINK: 'http://www.w3.org/1999/xlink',
  XML: 'http://www.w3.org/XML/1998/namespace',
  XMLNS: 'http://www.w3.org/2000/xmlns/'
};
exports.ATTRS = {
  TYPE: 'type',
  ACTION: 'action',
  ENCODING: 'encoding',
  PROMPT: 'prompt',
  NAME: 'name',
  COLOR: 'color',
  FACE: 'face',
  SIZE: 'size'
};
exports.DOCUMENT_MODE = {
  NO_QUIRKS: 'no-quirks',
  QUIRKS: 'quirks',
  LIMITED_QUIRKS: 'limited-quirks'
};
const $ = exports.TAG_NAMES = {
  A: 'a',
  ADDRESS: 'address',
  ANNOTATION_XML: 'annotation-xml',
  APPLET: 'applet',
  AREA: 'area',
  ARTICLE: 'article',
  ASIDE: 'aside',
  B: 'b',
  BASE: 'base',
  BASEFONT: 'basefont',
  BGSOUND: 'bgsound',
  BIG: 'big',
  BLOCKQUOTE: 'blockquote',
  BODY: 'body',
  BR: 'br',
  BUTTON: 'button',
  CAPTION: 'caption',
  CENTER: 'center',
  CODE: 'code',
  COL: 'col',
  COLGROUP: 'colgroup',
  DD: 'dd',
  DESC: 'desc',
  DETAILS: 'details',
  DIALOG: 'dialog',
  DIR: 'dir',
  DIV: 'div',
  DL: 'dl',
  DT: 'dt',
  EM: 'em',
  EMBED: 'embed',
  FIELDSET: 'fieldset',
  FIGCAPTION: 'figcaption',
  FIGURE: 'figure',
  FONT: 'font',
  FOOTER: 'footer',
  FOREIGN_OBJECT: 'foreignObject',
  FORM: 'form',
  FRAME: 'frame',
  FRAMESET: 'frameset',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  HEAD: 'head',
  HEADER: 'header',
  HGROUP: 'hgroup',
  HR: 'hr',
  HTML: 'html',
  I: 'i',
  IMG: 'img',
  IMAGE: 'image',
  INPUT: 'input',
  IFRAME: 'iframe',
  KEYGEN: 'keygen',
  LABEL: 'label',
  LI: 'li',
  LINK: 'link',
  LISTING: 'listing',
  MAIN: 'main',
  MALIGNMARK: 'malignmark',
  MARQUEE: 'marquee',
  MATH: 'math',
  MENU: 'menu',
  META: 'meta',
  MGLYPH: 'mglyph',
  MI: 'mi',
  MO: 'mo',
  MN: 'mn',
  MS: 'ms',
  MTEXT: 'mtext',
  NAV: 'nav',
  NOBR: 'nobr',
  NOFRAMES: 'noframes',
  NOEMBED: 'noembed',
  NOSCRIPT: 'noscript',
  OBJECT: 'object',
  OL: 'ol',
  OPTGROUP: 'optgroup',
  OPTION: 'option',
  P: 'p',
  PARAM: 'param',
  PLAINTEXT: 'plaintext',
  PRE: 'pre',
  RB: 'rb',
  RP: 'rp',
  RT: 'rt',
  RTC: 'rtc',
  RUBY: 'ruby',
  S: 's',
  SCRIPT: 'script',
  SECTION: 'section',
  SELECT: 'select',
  SOURCE: 'source',
  SMALL: 'small',
  SPAN: 'span',
  STRIKE: 'strike',
  STRONG: 'strong',
  STYLE: 'style',
  SUB: 'sub',
  SUMMARY: 'summary',
  SUP: 'sup',
  TABLE: 'table',
  TBODY: 'tbody',
  TEMPLATE: 'template',
  TEXTAREA: 'textarea',
  TFOOT: 'tfoot',
  TD: 'td',
  TH: 'th',
  THEAD: 'thead',
  TITLE: 'title',
  TR: 'tr',
  TRACK: 'track',
  TT: 'tt',
  U: 'u',
  UL: 'ul',
  SVG: 'svg',
  VAR: 'var',
  WBR: 'wbr',
  XMP: 'xmp'
};
exports.SPECIAL_ELEMENTS = {
  [NS.HTML]: {
    [$.ADDRESS]: true,
    [$.APPLET]: true,
    [$.AREA]: true,
    [$.ARTICLE]: true,
    [$.ASIDE]: true,
    [$.BASE]: true,
    [$.BASEFONT]: true,
    [$.BGSOUND]: true,
    [$.BLOCKQUOTE]: true,
    [$.BODY]: true,
    [$.BR]: true,
    [$.BUTTON]: true,
    [$.CAPTION]: true,
    [$.CENTER]: true,
    [$.COL]: true,
    [$.COLGROUP]: true,
    [$.DD]: true,
    [$.DETAILS]: true,
    [$.DIR]: true,
    [$.DIV]: true,
    [$.DL]: true,
    [$.DT]: true,
    [$.EMBED]: true,
    [$.FIELDSET]: true,
    [$.FIGCAPTION]: true,
    [$.FIGURE]: true,
    [$.FOOTER]: true,
    [$.FORM]: true,
    [$.FRAME]: true,
    [$.FRAMESET]: true,
    [$.H1]: true,
    [$.H2]: true,
    [$.H3]: true,
    [$.H4]: true,
    [$.H5]: true,
    [$.H6]: true,
    [$.HEAD]: true,
    [$.HEADER]: true,
    [$.HGROUP]: true,
    [$.HR]: true,
    [$.HTML]: true,
    [$.IFRAME]: true,
    [$.IMG]: true,
    [$.INPUT]: true,
    [$.LI]: true,
    [$.LINK]: true,
    [$.LISTING]: true,
    [$.MAIN]: true,
    [$.MARQUEE]: true,
    [$.MENU]: true,
    [$.META]: true,
    [$.NAV]: true,
    [$.NOEMBED]: true,
    [$.NOFRAMES]: true,
    [$.NOSCRIPT]: true,
    [$.OBJECT]: true,
    [$.OL]: true,
    [$.P]: true,
    [$.PARAM]: true,
    [$.PLAINTEXT]: true,
    [$.PRE]: true,
    [$.SCRIPT]: true,
    [$.SECTION]: true,
    [$.SELECT]: true,
    [$.SOURCE]: true,
    [$.STYLE]: true,
    [$.SUMMARY]: true,
    [$.TABLE]: true,
    [$.TBODY]: true,
    [$.TD]: true,
    [$.TEMPLATE]: true,
    [$.TEXTAREA]: true,
    [$.TFOOT]: true,
    [$.TH]: true,
    [$.THEAD]: true,
    [$.TITLE]: true,
    [$.TR]: true,
    [$.TRACK]: true,
    [$.UL]: true,
    [$.WBR]: true,
    [$.XMP]: true
  },
  [NS.MATHML]: {
    [$.MI]: true,
    [$.MO]: true,
    [$.MN]: true,
    [$.MS]: true,
    [$.MTEXT]: true,
    [$.ANNOTATION_XML]: true
  },
  [NS.SVG]: {
    [$.TITLE]: true,
    [$.FOREIGN_OBJECT]: true,
    [$.DESC]: true
  }
};
});

//Aliases


const $$2 = html$4.TAG_NAMES;
const NS$1 = html$4.NAMESPACES; //Element utils
//OPTIMIZATION: Integer comparisons are low-cost, so we can use very fast tag name length filters here.
//It's faster than using dictionary.

function isImpliedEndTagRequired(tn) {
  switch (tn.length) {
    case 1:
      return tn === $$2.P;

    case 2:
      return tn === $$2.RB || tn === $$2.RP || tn === $$2.RT || tn === $$2.DD || tn === $$2.DT || tn === $$2.LI;

    case 3:
      return tn === $$2.RTC;

    case 6:
      return tn === $$2.OPTION;

    case 8:
      return tn === $$2.OPTGROUP;
  }

  return false;
}

function isImpliedEndTagRequiredThoroughly(tn) {
  switch (tn.length) {
    case 1:
      return tn === $$2.P;

    case 2:
      return tn === $$2.RB || tn === $$2.RP || tn === $$2.RT || tn === $$2.DD || tn === $$2.DT || tn === $$2.LI || tn === $$2.TD || tn === $$2.TH || tn === $$2.TR;

    case 3:
      return tn === $$2.RTC;

    case 5:
      return tn === $$2.TBODY || tn === $$2.TFOOT || tn === $$2.THEAD;

    case 6:
      return tn === $$2.OPTION;

    case 7:
      return tn === $$2.CAPTION;

    case 8:
      return tn === $$2.OPTGROUP || tn === $$2.COLGROUP;
  }

  return false;
}

function isScopingElement(tn, ns) {
  switch (tn.length) {
    case 2:
      if (tn === $$2.TD || tn === $$2.TH) {
        return ns === NS$1.HTML;
      } else if (tn === $$2.MI || tn === $$2.MO || tn === $$2.MN || tn === $$2.MS) {
        return ns === NS$1.MATHML;
      }

      break;

    case 4:
      if (tn === $$2.HTML) {
        return ns === NS$1.HTML;
      } else if (tn === $$2.DESC) {
        return ns === NS$1.SVG;
      }

      break;

    case 5:
      if (tn === $$2.TABLE) {
        return ns === NS$1.HTML;
      } else if (tn === $$2.MTEXT) {
        return ns === NS$1.MATHML;
      } else if (tn === $$2.TITLE) {
        return ns === NS$1.SVG;
      }

      break;

    case 6:
      return (tn === $$2.APPLET || tn === $$2.OBJECT) && ns === NS$1.HTML;

    case 7:
      return (tn === $$2.CAPTION || tn === $$2.MARQUEE) && ns === NS$1.HTML;

    case 8:
      return tn === $$2.TEMPLATE && ns === NS$1.HTML;

    case 13:
      return tn === $$2.FOREIGN_OBJECT && ns === NS$1.SVG;

    case 14:
      return tn === $$2.ANNOTATION_XML && ns === NS$1.MATHML;
  }

  return false;
} //Stack of open elements


class OpenElementStack {
  constructor(document, treeAdapter) {
    this.stackTop = -1;
    this.items = [];
    this.current = document;
    this.currentTagName = null;
    this.currentTmplContent = null;
    this.tmplCount = 0;
    this.treeAdapter = treeAdapter;
  } //Index of element


  _indexOf(element) {
    let idx = -1;

    for (let i = this.stackTop; i >= 0; i--) {
      if (this.items[i] === element) {
        idx = i;
        break;
      }
    }

    return idx;
  } //Update current element


  _isInTemplate() {
    return this.currentTagName === $$2.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS$1.HTML;
  }

  _updateCurrentElement() {
    this.current = this.items[this.stackTop];
    this.currentTagName = this.current && this.treeAdapter.getTagName(this.current);
    this.currentTmplContent = this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : null;
  } //Mutations


  push(element) {
    this.items[++this.stackTop] = element;

    this._updateCurrentElement();

    if (this._isInTemplate()) {
      this.tmplCount++;
    }
  }

  pop() {
    this.stackTop--;

    if (this.tmplCount > 0 && this._isInTemplate()) {
      this.tmplCount--;
    }

    this._updateCurrentElement();
  }

  replace(oldElement, newElement) {
    const idx = this._indexOf(oldElement);

    this.items[idx] = newElement;

    if (idx === this.stackTop) {
      this._updateCurrentElement();
    }
  }

  insertAfter(referenceElement, newElement) {
    const insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement);

    if (insertionIdx === ++this.stackTop) {
      this._updateCurrentElement();
    }
  }

  popUntilTagNamePopped(tagName) {
    while (this.stackTop > -1) {
      const tn = this.currentTagName;
      const ns = this.treeAdapter.getNamespaceURI(this.current);
      this.pop();

      if (tn === tagName && ns === NS$1.HTML) {
        break;
      }
    }
  }

  popUntilElementPopped(element) {
    while (this.stackTop > -1) {
      const poppedElement = this.current;
      this.pop();

      if (poppedElement === element) {
        break;
      }
    }
  }

  popUntilNumberedHeaderPopped() {
    while (this.stackTop > -1) {
      const tn = this.currentTagName;
      const ns = this.treeAdapter.getNamespaceURI(this.current);
      this.pop();

      if (tn === $$2.H1 || tn === $$2.H2 || tn === $$2.H3 || tn === $$2.H4 || tn === $$2.H5 || tn === $$2.H6 && ns === NS$1.HTML) {
        break;
      }
    }
  }

  popUntilTableCellPopped() {
    while (this.stackTop > -1) {
      const tn = this.currentTagName;
      const ns = this.treeAdapter.getNamespaceURI(this.current);
      this.pop();

      if (tn === $$2.TD || tn === $$2.TH && ns === NS$1.HTML) {
        break;
      }
    }
  }

  popAllUpToHtmlElement() {
    //NOTE: here we assume that root <html> element is always first in the open element stack, so
    //we perform this fast stack clean up.
    this.stackTop = 0;

    this._updateCurrentElement();
  }

  clearBackToTableContext() {
    while (this.currentTagName !== $$2.TABLE && this.currentTagName !== $$2.TEMPLATE && this.currentTagName !== $$2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS$1.HTML) {
      this.pop();
    }
  }

  clearBackToTableBodyContext() {
    while (this.currentTagName !== $$2.TBODY && this.currentTagName !== $$2.TFOOT && this.currentTagName !== $$2.THEAD && this.currentTagName !== $$2.TEMPLATE && this.currentTagName !== $$2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS$1.HTML) {
      this.pop();
    }
  }

  clearBackToTableRowContext() {
    while (this.currentTagName !== $$2.TR && this.currentTagName !== $$2.TEMPLATE && this.currentTagName !== $$2.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS$1.HTML) {
      this.pop();
    }
  }

  remove(element) {
    for (let i = this.stackTop; i >= 0; i--) {
      if (this.items[i] === element) {
        this.items.splice(i, 1);
        this.stackTop--;

        this._updateCurrentElement();

        break;
      }
    }
  } //Search


  tryPeekProperlyNestedBodyElement() {
    //Properly nested <body> element (should be second element in stack).
    const element = this.items[1];
    return element && this.treeAdapter.getTagName(element) === $$2.BODY ? element : null;
  }

  contains(element) {
    return this._indexOf(element) > -1;
  }

  getCommonAncestor(element) {
    let elementIdx = this._indexOf(element);

    return --elementIdx >= 0 ? this.items[elementIdx] : null;
  }

  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.currentTagName === $$2.HTML;
  } //Element in scope


  hasInScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (tn === tagName && ns === NS$1.HTML) {
        return true;
      }

      if (isScopingElement(tn, ns)) {
        return false;
      }
    }

    return true;
  }

  hasNumberedHeaderInScope() {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if ((tn === $$2.H1 || tn === $$2.H2 || tn === $$2.H3 || tn === $$2.H4 || tn === $$2.H5 || tn === $$2.H6) && ns === NS$1.HTML) {
        return true;
      }

      if (isScopingElement(tn, ns)) {
        return false;
      }
    }

    return true;
  }

  hasInListItemScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (tn === tagName && ns === NS$1.HTML) {
        return true;
      }

      if ((tn === $$2.UL || tn === $$2.OL) && ns === NS$1.HTML || isScopingElement(tn, ns)) {
        return false;
      }
    }

    return true;
  }

  hasInButtonScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (tn === tagName && ns === NS$1.HTML) {
        return true;
      }

      if (tn === $$2.BUTTON && ns === NS$1.HTML || isScopingElement(tn, ns)) {
        return false;
      }
    }

    return true;
  }

  hasInTableScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (ns !== NS$1.HTML) {
        continue;
      }

      if (tn === tagName) {
        return true;
      }

      if (tn === $$2.TABLE || tn === $$2.TEMPLATE || tn === $$2.HTML) {
        return false;
      }
    }

    return true;
  }

  hasTableBodyContextInTableScope() {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (ns !== NS$1.HTML) {
        continue;
      }

      if (tn === $$2.TBODY || tn === $$2.THEAD || tn === $$2.TFOOT) {
        return true;
      }

      if (tn === $$2.TABLE || tn === $$2.HTML) {
        return false;
      }
    }

    return true;
  }

  hasInSelectScope(tagName) {
    for (let i = this.stackTop; i >= 0; i--) {
      const tn = this.treeAdapter.getTagName(this.items[i]);
      const ns = this.treeAdapter.getNamespaceURI(this.items[i]);

      if (ns !== NS$1.HTML) {
        continue;
      }

      if (tn === tagName) {
        return true;
      }

      if (tn !== $$2.OPTION && tn !== $$2.OPTGROUP) {
        return false;
      }
    }

    return true;
  } //Implied end tags


  generateImpliedEndTags() {
    while (isImpliedEndTagRequired(this.currentTagName)) {
      this.pop();
    }
  }

  generateImpliedEndTagsThoroughly() {
    while (isImpliedEndTagRequiredThoroughly(this.currentTagName)) {
      this.pop();
    }
  }

  generateImpliedEndTagsWithExclusion(exclusionTagName) {
    while (isImpliedEndTagRequired(this.currentTagName) && this.currentTagName !== exclusionTagName) {
      this.pop();
    }
  }

}

var openElementStack = OpenElementStack;

const NOAH_ARK_CAPACITY = 3; //List of formatting elements

class FormattingElementList {
  constructor(treeAdapter) {
    this.length = 0;
    this.entries = [];
    this.treeAdapter = treeAdapter;
    this.bookmark = null;
  } //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.


  _getNoahArkConditionCandidates(newElement) {
    const candidates = [];

    if (this.length >= NOAH_ARK_CAPACITY) {
      const neAttrsLength = this.treeAdapter.getAttrList(newElement).length;
      const neTagName = this.treeAdapter.getTagName(newElement);
      const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);

      for (let i = this.length - 1; i >= 0; i--) {
        const entry = this.entries[i];

        if (entry.type === FormattingElementList.MARKER_ENTRY) {
          break;
        }

        const element = entry.element;
        const elementAttrs = this.treeAdapter.getAttrList(element);
        const isCandidate = this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI && elementAttrs.length === neAttrsLength;

        if (isCandidate) {
          candidates.push({
            idx: i,
            attrs: elementAttrs
          });
        }
      }
    }

    return candidates.length < NOAH_ARK_CAPACITY ? [] : candidates;
  }

  _ensureNoahArkCondition(newElement) {
    const candidates = this._getNoahArkConditionCandidates(newElement);

    let cLength = candidates.length;

    if (cLength) {
      const neAttrs = this.treeAdapter.getAttrList(newElement);
      const neAttrsLength = neAttrs.length;
      const neAttrsMap = Object.create(null); //NOTE: build attrs map for the new element so we can perform fast lookups

      for (let i = 0; i < neAttrsLength; i++) {
        const neAttr = neAttrs[i];
        neAttrsMap[neAttr.name] = neAttr.value;
      }

      for (let i = 0; i < neAttrsLength; i++) {
        for (let j = 0; j < cLength; j++) {
          const cAttr = candidates[j].attrs[i];

          if (neAttrsMap[cAttr.name] !== cAttr.value) {
            candidates.splice(j, 1);
            cLength--;
          }

          if (candidates.length < NOAH_ARK_CAPACITY) {
            return;
          }
        }
      } //NOTE: remove bottommost candidates until Noah's Ark condition will not be met


      for (let i = cLength - 1; i >= NOAH_ARK_CAPACITY - 1; i--) {
        this.entries.splice(candidates[i].idx, 1);
        this.length--;
      }
    }
  } //Mutations


  insertMarker() {
    this.entries.push({
      type: FormattingElementList.MARKER_ENTRY
    });
    this.length++;
  }

  pushElement(element, token) {
    this._ensureNoahArkCondition(element);

    this.entries.push({
      type: FormattingElementList.ELEMENT_ENTRY,
      element: element,
      token: token
    });
    this.length++;
  }

  insertElementAfterBookmark(element, token) {
    let bookmarkIdx = this.length - 1;

    for (; bookmarkIdx >= 0; bookmarkIdx--) {
      if (this.entries[bookmarkIdx] === this.bookmark) {
        break;
      }
    }

    this.entries.splice(bookmarkIdx + 1, 0, {
      type: FormattingElementList.ELEMENT_ENTRY,
      element: element,
      token: token
    });
    this.length++;
  }

  removeEntry(entry) {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this.entries[i] === entry) {
        this.entries.splice(i, 1);
        this.length--;
        break;
      }
    }
  }

  clearToLastMarker() {
    while (this.length) {
      const entry = this.entries.pop();
      this.length--;

      if (entry.type === FormattingElementList.MARKER_ENTRY) {
        break;
      }
    }
  } //Search


  getElementEntryInScopeWithTagName(tagName) {
    for (let i = this.length - 1; i >= 0; i--) {
      const entry = this.entries[i];

      if (entry.type === FormattingElementList.MARKER_ENTRY) {
        return null;
      }

      if (this.treeAdapter.getTagName(entry.element) === tagName) {
        return entry;
      }
    }

    return null;
  }

  getElementEntry(element) {
    for (let i = this.length - 1; i >= 0; i--) {
      const entry = this.entries[i];

      if (entry.type === FormattingElementList.ELEMENT_ENTRY && entry.element === element) {
        return entry;
      }
    }

    return null;
  }

} //Entry types


FormattingElementList.MARKER_ENTRY = 'MARKER_ENTRY';
FormattingElementList.ELEMENT_ENTRY = 'ELEMENT_ENTRY';
var formattingElementList = FormattingElementList;

class Mixin {
  constructor(host) {
    const originalMethods = {};

    const overriddenMethods = this._getOverriddenMethods(this, originalMethods);

    for (const key of Object.keys(overriddenMethods)) {
      if (typeof overriddenMethods[key] === 'function') {
        originalMethods[key] = host[key];
        host[key] = overriddenMethods[key];
      }
    }
  }

  _getOverriddenMethods() {
    throw new Error('Not implemented');
  }

}

Mixin.install = function (host, Ctor, opts) {
  if (!host.__mixins) {
    host.__mixins = [];
  }

  for (let i = 0; i < host.__mixins.length; i++) {
    if (host.__mixins[i].constructor === Ctor) {
      return host.__mixins[i];
    }
  }

  const mixin = new Ctor(host, opts);

  host.__mixins.push(mixin);

  return mixin;
};

var mixin = Mixin;

class PositionTrackingPreprocessorMixin extends mixin {
  constructor(preprocessor) {
    super(preprocessor);
    this.preprocessor = preprocessor;
    this.isEol = false;
    this.lineStartPos = 0;
    this.droppedBufferSize = 0;
    this.offset = 0;
    this.col = 0;
    this.line = 1;
  }

  _getOverriddenMethods(mxn, orig) {
    return {
      advance() {
        const pos = this.pos + 1;
        const ch = this.html[pos]; //NOTE: LF should be in the last column of the line

        if (mxn.isEol) {
          mxn.isEol = false;
          mxn.line++;
          mxn.lineStartPos = pos;
        }

        if (ch === '\n' || ch === '\r' && this.html[pos + 1] !== '\n') {
          mxn.isEol = true;
        }

        mxn.col = pos - mxn.lineStartPos + 1;
        mxn.offset = mxn.droppedBufferSize + pos;
        return orig.advance.call(this);
      },

      retreat() {
        orig.retreat.call(this);
        mxn.isEol = false;
        mxn.col = this.pos - mxn.lineStartPos + 1;
      },

      dropParsedChunk() {
        const prevPos = this.pos;
        orig.dropParsedChunk.call(this);
        const reduction = prevPos - this.pos;
        mxn.lineStartPos -= reduction;
        mxn.droppedBufferSize += reduction;
        mxn.offset = mxn.droppedBufferSize + this.pos;
      }

    };
  }

}

var preprocessorMixin$1 = PositionTrackingPreprocessorMixin;

class LocationInfoTokenizerMixin extends mixin {
  constructor(tokenizer) {
    super(tokenizer);
    this.tokenizer = tokenizer;
    this.posTracker = mixin.install(tokenizer.preprocessor, preprocessorMixin$1);
    this.currentAttrLocation = null;
    this.ctLoc = null;
  }

  _getCurrentLocation() {
    return {
      startLine: this.posTracker.line,
      startCol: this.posTracker.col,
      startOffset: this.posTracker.offset,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };
  }

  _attachCurrentAttrLocationInfo() {
    this.currentAttrLocation.endLine = this.posTracker.line;
    this.currentAttrLocation.endCol = this.posTracker.col;
    this.currentAttrLocation.endOffset = this.posTracker.offset;
    const currentToken = this.tokenizer.currentToken;
    const currentAttr = this.tokenizer.currentAttr;

    if (!currentToken.location.attrs) {
      currentToken.location.attrs = Object.create(null);
    }

    currentToken.location.attrs[currentAttr.name] = this.currentAttrLocation;
  }

  _getOverriddenMethods(mxn, orig) {
    const methods = {
      _createStartTagToken() {
        orig._createStartTagToken.call(this);

        this.currentToken.location = mxn.ctLoc;
      },

      _createEndTagToken() {
        orig._createEndTagToken.call(this);

        this.currentToken.location = mxn.ctLoc;
      },

      _createCommentToken() {
        orig._createCommentToken.call(this);

        this.currentToken.location = mxn.ctLoc;
      },

      _createDoctypeToken(initialName) {
        orig._createDoctypeToken.call(this, initialName);

        this.currentToken.location = mxn.ctLoc;
      },

      _createCharacterToken(type, ch) {
        orig._createCharacterToken.call(this, type, ch);

        this.currentCharacterToken.location = mxn.ctLoc;
      },

      _createEOFToken() {
        orig._createEOFToken.call(this);

        this.currentToken.location = mxn._getCurrentLocation();
      },

      _createAttr(attrNameFirstCh) {
        orig._createAttr.call(this, attrNameFirstCh);

        mxn.currentAttrLocation = mxn._getCurrentLocation();
      },

      _leaveAttrName(toState) {
        orig._leaveAttrName.call(this, toState);

        mxn._attachCurrentAttrLocationInfo();
      },

      _leaveAttrValue(toState) {
        orig._leaveAttrValue.call(this, toState);

        mxn._attachCurrentAttrLocationInfo();
      },

      _emitCurrentToken() {
        const ctLoc = this.currentToken.location; //NOTE: if we have pending character token make it's end location equal to the
        //current token's start location.

        if (this.currentCharacterToken) {
          this.currentCharacterToken.location.endLine = ctLoc.startLine;
          this.currentCharacterToken.location.endCol = ctLoc.startCol;
          this.currentCharacterToken.location.endOffset = ctLoc.startOffset;
        }

        if (this.currentToken.type === tokenizer.EOF_TOKEN) {
          ctLoc.endLine = ctLoc.startLine;
          ctLoc.endCol = ctLoc.startCol;
          ctLoc.endOffset = ctLoc.startOffset;
        } else {
          ctLoc.endLine = mxn.posTracker.line;
          ctLoc.endCol = mxn.posTracker.col + 1;
          ctLoc.endOffset = mxn.posTracker.offset + 1;
        }

        orig._emitCurrentToken.call(this);
      },

      _emitCurrentCharacterToken() {
        const ctLoc = this.currentCharacterToken && this.currentCharacterToken.location; //NOTE: if we have character token and it's location wasn't set in the _emitCurrentToken(),
        //then set it's location at the current preprocessor position.
        //We don't need to increment preprocessor position, since character token
        //emission is always forced by the start of the next character token here.
        //So, we already have advanced position.

        if (ctLoc && ctLoc.endOffset === -1) {
          ctLoc.endLine = mxn.posTracker.line;
          ctLoc.endCol = mxn.posTracker.col;
          ctLoc.endOffset = mxn.posTracker.offset;
        }

        orig._emitCurrentCharacterToken.call(this);
      }

    }; //NOTE: patch initial states for each mode to obtain token start position

    Object.keys(tokenizer.MODE).forEach(modeName => {
      const state = tokenizer.MODE[modeName];

      methods[state] = function (cp) {
        mxn.ctLoc = mxn._getCurrentLocation();
        orig[state].call(this, cp);
      };
    });
    return methods;
  }

}

var tokenizerMixin$1 = LocationInfoTokenizerMixin;

class LocationInfoOpenElementStackMixin extends mixin {
  constructor(stack, opts) {
    super(stack);
    this.onItemPop = opts.onItemPop;
  }

  _getOverriddenMethods(mxn, orig) {
    return {
      pop() {
        mxn.onItemPop(this.current);
        orig.pop.call(this);
      },

      popAllUpToHtmlElement() {
        for (let i = this.stackTop; i > 0; i--) {
          mxn.onItemPop(this.items[i]);
        }

        orig.popAllUpToHtmlElement.call(this);
      },

      remove(element) {
        mxn.onItemPop(this.current);
        orig.remove.call(this, element);
      }

    };
  }

}

var openElementStackMixin = LocationInfoOpenElementStackMixin;

//Aliases


const $$1 = html$4.TAG_NAMES;

class LocationInfoParserMixin extends mixin {
  constructor(parser) {
    super(parser);
    this.parser = parser;
    this.treeAdapter = this.parser.treeAdapter;
    this.posTracker = null;
    this.lastStartTagToken = null;
    this.lastFosterParentingLocation = null;
    this.currentToken = null;
  }

  _setStartLocation(element) {
    let loc = null;

    if (this.lastStartTagToken) {
      loc = Object.assign({}, this.lastStartTagToken.location);
      loc.startTag = this.lastStartTagToken.location;
    }

    this.treeAdapter.setNodeSourceCodeLocation(element, loc);
  }

  _setEndLocation(element, closingToken) {
    const loc = this.treeAdapter.getNodeSourceCodeLocation(element);

    if (loc) {
      if (closingToken.location) {
        const ctLoc = closingToken.location;
        const tn = this.treeAdapter.getTagName(element); // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.

        const isClosingEndTag = closingToken.type === tokenizer.END_TAG_TOKEN && tn === closingToken.tagName;
        const endLoc = {};

        if (isClosingEndTag) {
          endLoc.endTag = Object.assign({}, ctLoc);
          endLoc.endLine = ctLoc.endLine;
          endLoc.endCol = ctLoc.endCol;
          endLoc.endOffset = ctLoc.endOffset;
        } else {
          endLoc.endLine = ctLoc.startLine;
          endLoc.endCol = ctLoc.startCol;
          endLoc.endOffset = ctLoc.startOffset;
        }

        this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
      }
    }
  }

  _getOverriddenMethods(mxn, orig) {
    return {
      _bootstrap(document, fragmentContext) {
        orig._bootstrap.call(this, document, fragmentContext);

        mxn.lastStartTagToken = null;
        mxn.lastFosterParentingLocation = null;
        mxn.currentToken = null;
        const tokenizerMixin = mixin.install(this.tokenizer, tokenizerMixin$1);
        mxn.posTracker = tokenizerMixin.posTracker;
        mixin.install(this.openElements, openElementStackMixin, {
          onItemPop: function (element) {
            mxn._setEndLocation(element, mxn.currentToken);
          }
        });
      },

      _runParsingLoop(scriptHandler) {
        orig._runParsingLoop.call(this, scriptHandler); // NOTE: generate location info for elements
        // that remains on open element stack


        for (let i = this.openElements.stackTop; i >= 0; i--) {
          mxn._setEndLocation(this.openElements.items[i], mxn.currentToken);
        }
      },

      //Token processing
      _processTokenInForeignContent(token) {
        mxn.currentToken = token;

        orig._processTokenInForeignContent.call(this, token);
      },

      _processToken(token) {
        mxn.currentToken = token;

        orig._processToken.call(this, token); //NOTE: <body> and <html> are never popped from the stack, so we need to updated
        //their end location explicitly.


        const requireExplicitUpdate = token.type === tokenizer.END_TAG_TOKEN && (token.tagName === $$1.HTML || token.tagName === $$1.BODY && this.openElements.hasInScope($$1.BODY));

        if (requireExplicitUpdate) {
          for (let i = this.openElements.stackTop; i >= 0; i--) {
            const element = this.openElements.items[i];

            if (this.treeAdapter.getTagName(element) === token.tagName) {
              mxn._setEndLocation(element, token);

              break;
            }
          }
        }
      },

      //Doctype
      _setDocumentType(token) {
        orig._setDocumentType.call(this, token);

        const documentChildren = this.treeAdapter.getChildNodes(this.document);
        const cnLength = documentChildren.length;

        for (let i = 0; i < cnLength; i++) {
          const node = documentChildren[i];

          if (this.treeAdapter.isDocumentTypeNode(node)) {
            this.treeAdapter.setNodeSourceCodeLocation(node, token.location);
            break;
          }
        }
      },

      //Elements
      _attachElementToTree(element) {
        //NOTE: _attachElementToTree is called from _appendElement, _insertElement and _insertTemplate methods.
        //So we will use token location stored in this methods for the element.
        mxn._setStartLocation(element);

        mxn.lastStartTagToken = null;

        orig._attachElementToTree.call(this, element);
      },

      _appendElement(token, namespaceURI) {
        mxn.lastStartTagToken = token;

        orig._appendElement.call(this, token, namespaceURI);
      },

      _insertElement(token, namespaceURI) {
        mxn.lastStartTagToken = token;

        orig._insertElement.call(this, token, namespaceURI);
      },

      _insertTemplate(token) {
        mxn.lastStartTagToken = token;

        orig._insertTemplate.call(this, token);

        const tmplContent = this.treeAdapter.getTemplateContent(this.openElements.current);
        this.treeAdapter.setNodeSourceCodeLocation(tmplContent, null);
      },

      _insertFakeRootElement() {
        orig._insertFakeRootElement.call(this);

        this.treeAdapter.setNodeSourceCodeLocation(this.openElements.current, null);
      },

      //Comments
      _appendCommentNode(token, parent) {
        orig._appendCommentNode.call(this, token, parent);

        const children = this.treeAdapter.getChildNodes(parent);
        const commentNode = children[children.length - 1];
        this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
      },

      //Text
      _findFosterParentingLocation() {
        //NOTE: store last foster parenting location, so we will be able to find inserted text
        //in case of foster parenting
        mxn.lastFosterParentingLocation = orig._findFosterParentingLocation.call(this);
        return mxn.lastFosterParentingLocation;
      },

      _insertCharacters(token) {
        orig._insertCharacters.call(this, token);

        const hasFosterParent = this._shouldFosterParentOnInsertion();

        const parent = hasFosterParent && mxn.lastFosterParentingLocation.parent || this.openElements.currentTmplContent || this.openElements.current;
        const siblings = this.treeAdapter.getChildNodes(parent);
        const textNodeIdx = hasFosterParent && mxn.lastFosterParentingLocation.beforeElement ? siblings.indexOf(mxn.lastFosterParentingLocation.beforeElement) - 1 : siblings.length - 1;
        const textNode = siblings[textNodeIdx]; //NOTE: if we have location assigned by another token, then just update end position

        const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);

        if (tnLoc) {
          const {
            endLine,
            endCol,
            endOffset
          } = token.location;
          this.treeAdapter.updateNodeSourceCodeLocation(textNode, {
            endLine,
            endCol,
            endOffset
          });
        } else {
          this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
        }
      }

    };
  }

}

var parserMixin$1 = LocationInfoParserMixin;

class ErrorReportingMixinBase extends mixin {
  constructor(host, opts) {
    super(host);
    this.posTracker = null;
    this.onParseError = opts.onParseError;
  }

  _setErrorLocation(err) {
    err.startLine = err.endLine = this.posTracker.line;
    err.startCol = err.endCol = this.posTracker.col;
    err.startOffset = err.endOffset = this.posTracker.offset;
  }

  _reportError(code) {
    const err = {
      code: code,
      startLine: -1,
      startCol: -1,
      startOffset: -1,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };

    this._setErrorLocation(err);

    this.onParseError(err);
  }

  _getOverriddenMethods(mxn) {
    return {
      _err(code) {
        mxn._reportError(code);
      }

    };
  }

}

var mixinBase = ErrorReportingMixinBase;

class ErrorReportingPreprocessorMixin extends mixinBase {
  constructor(preprocessor, opts) {
    super(preprocessor, opts);
    this.posTracker = mixin.install(preprocessor, preprocessorMixin$1);
    this.lastErrOffset = -1;
  }

  _reportError(code) {
    //NOTE: avoid reporting error twice on advance/retreat
    if (this.lastErrOffset !== this.posTracker.offset) {
      this.lastErrOffset = this.posTracker.offset;

      super._reportError(code);
    }
  }

}

var preprocessorMixin = ErrorReportingPreprocessorMixin;

class ErrorReportingTokenizerMixin extends mixinBase {
  constructor(tokenizer, opts) {
    super(tokenizer, opts);
    const preprocessorMixin$1 = mixin.install(tokenizer.preprocessor, preprocessorMixin, opts);
    this.posTracker = preprocessorMixin$1.posTracker;
  }

}

var tokenizerMixin = ErrorReportingTokenizerMixin;

class ErrorReportingParserMixin extends mixinBase {
  constructor(parser, opts) {
    super(parser, opts);
    this.opts = opts;
    this.ctLoc = null;
    this.locBeforeToken = false;
  }

  _setErrorLocation(err) {
    if (this.ctLoc) {
      err.startLine = this.ctLoc.startLine;
      err.startCol = this.ctLoc.startCol;
      err.startOffset = this.ctLoc.startOffset;
      err.endLine = this.locBeforeToken ? this.ctLoc.startLine : this.ctLoc.endLine;
      err.endCol = this.locBeforeToken ? this.ctLoc.startCol : this.ctLoc.endCol;
      err.endOffset = this.locBeforeToken ? this.ctLoc.startOffset : this.ctLoc.endOffset;
    }
  }

  _getOverriddenMethods(mxn, orig) {
    return {
      _bootstrap(document, fragmentContext) {
        orig._bootstrap.call(this, document, fragmentContext);

        mixin.install(this.tokenizer, tokenizerMixin, mxn.opts);
        mixin.install(this.tokenizer, tokenizerMixin$1);
      },

      _processInputToken(token) {
        mxn.ctLoc = token.location;

        orig._processInputToken.call(this, token);
      },

      _err(code, options) {
        mxn.locBeforeToken = options && options.beforeToken;

        mxn._reportError(code);
      }

    };
  }

}

var parserMixin = ErrorReportingParserMixin;

var _default = entry.createCommonjsModule(function (module, exports) {

const {
  DOCUMENT_MODE
} = html$4; //Node construction


exports.createDocument = function () {
  return {
    nodeName: '#document',
    mode: DOCUMENT_MODE.NO_QUIRKS,
    childNodes: []
  };
};

exports.createDocumentFragment = function () {
  return {
    nodeName: '#document-fragment',
    childNodes: []
  };
};

exports.createElement = function (tagName, namespaceURI, attrs) {
  return {
    nodeName: tagName,
    tagName: tagName,
    attrs: attrs,
    namespaceURI: namespaceURI,
    childNodes: [],
    parentNode: null
  };
};

exports.createCommentNode = function (data) {
  return {
    nodeName: '#comment',
    data: data,
    parentNode: null
  };
};

const createTextNode = function (value) {
  return {
    nodeName: '#text',
    value: value,
    parentNode: null
  };
}; //Tree mutation


const appendChild = exports.appendChild = function (parentNode, newNode) {
  parentNode.childNodes.push(newNode);
  newNode.parentNode = parentNode;
};

const insertBefore = exports.insertBefore = function (parentNode, newNode, referenceNode) {
  const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
  parentNode.childNodes.splice(insertionIdx, 0, newNode);
  newNode.parentNode = parentNode;
};

exports.setTemplateContent = function (templateElement, contentElement) {
  templateElement.content = contentElement;
};

exports.getTemplateContent = function (templateElement) {
  return templateElement.content;
};

exports.setDocumentType = function (document, name, publicId, systemId) {
  let doctypeNode = null;

  for (let i = 0; i < document.childNodes.length; i++) {
    if (document.childNodes[i].nodeName === '#documentType') {
      doctypeNode = document.childNodes[i];
      break;
    }
  }

  if (doctypeNode) {
    doctypeNode.name = name;
    doctypeNode.publicId = publicId;
    doctypeNode.systemId = systemId;
  } else {
    appendChild(document, {
      nodeName: '#documentType',
      name: name,
      publicId: publicId,
      systemId: systemId
    });
  }
};

exports.setDocumentMode = function (document, mode) {
  document.mode = mode;
};

exports.getDocumentMode = function (document) {
  return document.mode;
};

exports.detachNode = function (node) {
  if (node.parentNode) {
    const idx = node.parentNode.childNodes.indexOf(node);
    node.parentNode.childNodes.splice(idx, 1);
    node.parentNode = null;
  }
};

exports.insertText = function (parentNode, text) {
  if (parentNode.childNodes.length) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];

    if (prevNode.nodeName === '#text') {
      prevNode.value += text;
      return;
    }
  }

  appendChild(parentNode, createTextNode(text));
};

exports.insertTextBefore = function (parentNode, text, referenceNode) {
  const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];

  if (prevNode && prevNode.nodeName === '#text') {
    prevNode.value += text;
  } else {
    insertBefore(parentNode, createTextNode(text), referenceNode);
  }
};

exports.adoptAttributes = function (recipient, attrs) {
  const recipientAttrsMap = [];

  for (let i = 0; i < recipient.attrs.length; i++) {
    recipientAttrsMap.push(recipient.attrs[i].name);
  }

  for (let j = 0; j < attrs.length; j++) {
    if (recipientAttrsMap.indexOf(attrs[j].name) === -1) {
      recipient.attrs.push(attrs[j]);
    }
  }
}; //Tree traversing


exports.getFirstChild = function (node) {
  return node.childNodes[0];
};

exports.getChildNodes = function (node) {
  return node.childNodes;
};

exports.getParentNode = function (node) {
  return node.parentNode;
};

exports.getAttrList = function (element) {
  return element.attrs;
}; //Node data


exports.getTagName = function (element) {
  return element.tagName;
};

exports.getNamespaceURI = function (element) {
  return element.namespaceURI;
};

exports.getTextNodeContent = function (textNode) {
  return textNode.value;
};

exports.getCommentNodeContent = function (commentNode) {
  return commentNode.data;
};

exports.getDocumentTypeNodeName = function (doctypeNode) {
  return doctypeNode.name;
};

exports.getDocumentTypeNodePublicId = function (doctypeNode) {
  return doctypeNode.publicId;
};

exports.getDocumentTypeNodeSystemId = function (doctypeNode) {
  return doctypeNode.systemId;
}; //Node types


exports.isTextNode = function (node) {
  return node.nodeName === '#text';
};

exports.isCommentNode = function (node) {
  return node.nodeName === '#comment';
};

exports.isDocumentTypeNode = function (node) {
  return node.nodeName === '#documentType';
};

exports.isElementNode = function (node) {
  return !!node.tagName;
}; // Source code location


exports.setNodeSourceCodeLocation = function (node, location) {
  node.sourceCodeLocation = location;
};

exports.getNodeSourceCodeLocation = function (node) {
  return node.sourceCodeLocation;
};

exports.updateNodeSourceCodeLocation = function (node, endLocation) {
  node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
};
});

var mergeOptions = function mergeOptions(defaults, options) {
  options = options || Object.create(null);
  return [defaults, options].reduce((merged, optObj) => {
    Object.keys(optObj).forEach(key => {
      merged[key] = optObj[key];
    });
    return merged;
  }, Object.create(null));
};

const {
  DOCUMENT_MODE
} = html$4; //Const


const VALID_DOCTYPE_NAME = 'html';
const VALID_SYSTEM_ID = 'about:legacy-compat';
const QUIRKS_MODE_SYSTEM_ID = 'http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd';
const QUIRKS_MODE_PUBLIC_ID_PREFIXES = ['+//silmaril//dtd html pro v0r11 19970101//', '-//as//dtd html 3.0 aswedit + extensions//', '-//advasoft ltd//dtd html 3.0 aswedit + extensions//', '-//ietf//dtd html 2.0 level 1//', '-//ietf//dtd html 2.0 level 2//', '-//ietf//dtd html 2.0 strict level 1//', '-//ietf//dtd html 2.0 strict level 2//', '-//ietf//dtd html 2.0 strict//', '-//ietf//dtd html 2.0//', '-//ietf//dtd html 2.1e//', '-//ietf//dtd html 3.0//', '-//ietf//dtd html 3.2 final//', '-//ietf//dtd html 3.2//', '-//ietf//dtd html 3//', '-//ietf//dtd html level 0//', '-//ietf//dtd html level 1//', '-//ietf//dtd html level 2//', '-//ietf//dtd html level 3//', '-//ietf//dtd html strict level 0//', '-//ietf//dtd html strict level 1//', '-//ietf//dtd html strict level 2//', '-//ietf//dtd html strict level 3//', '-//ietf//dtd html strict//', '-//ietf//dtd html//', '-//metrius//dtd metrius presentational//', '-//microsoft//dtd internet explorer 2.0 html strict//', '-//microsoft//dtd internet explorer 2.0 html//', '-//microsoft//dtd internet explorer 2.0 tables//', '-//microsoft//dtd internet explorer 3.0 html strict//', '-//microsoft//dtd internet explorer 3.0 html//', '-//microsoft//dtd internet explorer 3.0 tables//', '-//netscape comm. corp.//dtd html//', '-//netscape comm. corp.//dtd strict html//', "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", '-//sq//dtd html 2.0 hotmetal + extensions//', '-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//', '-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//', '-//spyglass//dtd html 2.0 extended//', '-//sun microsystems corp.//dtd hotjava html//', '-//sun microsystems corp.//dtd hotjava strict html//', '-//w3c//dtd html 3 1995-03-24//', '-//w3c//dtd html 3.2 draft//', '-//w3c//dtd html 3.2 final//', '-//w3c//dtd html 3.2//', '-//w3c//dtd html 3.2s draft//', '-//w3c//dtd html 4.0 frameset//', '-//w3c//dtd html 4.0 transitional//', '-//w3c//dtd html experimental 19960712//', '-//w3c//dtd html experimental 970421//', '-//w3c//dtd w3 html//', '-//w3o//dtd w3 html 3.0//', '-//webtechs//dtd mozilla html 2.0//', '-//webtechs//dtd mozilla html//'];
const QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = QUIRKS_MODE_PUBLIC_ID_PREFIXES.concat(['-//w3c//dtd html 4.01 frameset//', '-//w3c//dtd html 4.01 transitional//']);
const QUIRKS_MODE_PUBLIC_IDS = ['-//w3o//dtd w3 html strict 3.0//en//', '-/w3c/dtd html 4.0 transitional/en', 'html'];
const LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ['-//w3c//dtd xhtml 1.0 frameset//', '-//w3c//dtd xhtml 1.0 transitional//'];
const LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = LIMITED_QUIRKS_PUBLIC_ID_PREFIXES.concat(['-//w3c//dtd html 4.01 frameset//', '-//w3c//dtd html 4.01 transitional//']); //Utils

function enquoteDoctypeId(id) {
  const quote = id.indexOf('"') !== -1 ? "'" : '"';
  return quote + id + quote;
}

function hasPrefix(publicId, prefixes) {
  for (let i = 0; i < prefixes.length; i++) {
    if (publicId.indexOf(prefixes[i]) === 0) {
      return true;
    }
  }

  return false;
} //API


var isConforming = function (token) {
  return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
};

var getDocumentMode = function (token) {
  if (token.name !== VALID_DOCTYPE_NAME) {
    return DOCUMENT_MODE.QUIRKS;
  }

  const systemId = token.systemId;

  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
    return DOCUMENT_MODE.QUIRKS;
  }

  let publicId = token.publicId;

  if (publicId !== null) {
    publicId = publicId.toLowerCase();

    if (QUIRKS_MODE_PUBLIC_IDS.indexOf(publicId) > -1) {
      return DOCUMENT_MODE.QUIRKS;
    }

    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;

    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.QUIRKS;
    }

    prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;

    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.LIMITED_QUIRKS;
    }
  }

  return DOCUMENT_MODE.NO_QUIRKS;
};

var serializeContent = function (name, publicId, systemId) {
  let str = '!DOCTYPE ';

  if (name) {
    str += name;
  }

  if (publicId) {
    str += ' PUBLIC ' + enquoteDoctypeId(publicId);
  } else if (systemId) {
    str += ' SYSTEM';
  }

  if (systemId !== null) {
    str += ' ' + enquoteDoctypeId(systemId);
  }

  return str;
};

var doctype$2 = {
	isConforming: isConforming,
	getDocumentMode: getDocumentMode,
	serializeContent: serializeContent
};

var foreignContent = entry.createCommonjsModule(function (module, exports) {



 //Aliases


const $ = html$4.TAG_NAMES;
const NS = html$4.NAMESPACES;
const ATTRS = html$4.ATTRS; //MIME types

const MIME_TYPES = {
  TEXT_HTML: 'text/html',
  APPLICATION_XML: 'application/xhtml+xml'
}; //Attributes

const DEFINITION_URL_ATTR = 'definitionurl';
const ADJUSTED_DEFINITION_URL_ATTR = 'definitionURL';
const SVG_ATTRS_ADJUSTMENT_MAP = {
  attributename: 'attributeName',
  attributetype: 'attributeType',
  basefrequency: 'baseFrequency',
  baseprofile: 'baseProfile',
  calcmode: 'calcMode',
  clippathunits: 'clipPathUnits',
  diffuseconstant: 'diffuseConstant',
  edgemode: 'edgeMode',
  filterunits: 'filterUnits',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  limitingconeangle: 'limitingConeAngle',
  markerheight: 'markerHeight',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  numoctaves: 'numOctaves',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  refx: 'refX',
  refy: 'refY',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stitchtiles: 'stitchTiles',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textlength: 'textLength',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  xchannelselector: 'xChannelSelector',
  ychannelselector: 'yChannelSelector',
  zoomandpan: 'zoomAndPan'
};
const XML_ATTRS_ADJUSTMENT_MAP = {
  'xlink:actuate': {
    prefix: 'xlink',
    name: 'actuate',
    namespace: NS.XLINK
  },
  'xlink:arcrole': {
    prefix: 'xlink',
    name: 'arcrole',
    namespace: NS.XLINK
  },
  'xlink:href': {
    prefix: 'xlink',
    name: 'href',
    namespace: NS.XLINK
  },
  'xlink:role': {
    prefix: 'xlink',
    name: 'role',
    namespace: NS.XLINK
  },
  'xlink:show': {
    prefix: 'xlink',
    name: 'show',
    namespace: NS.XLINK
  },
  'xlink:title': {
    prefix: 'xlink',
    name: 'title',
    namespace: NS.XLINK
  },
  'xlink:type': {
    prefix: 'xlink',
    name: 'type',
    namespace: NS.XLINK
  },
  'xml:base': {
    prefix: 'xml',
    name: 'base',
    namespace: NS.XML
  },
  'xml:lang': {
    prefix: 'xml',
    name: 'lang',
    namespace: NS.XML
  },
  'xml:space': {
    prefix: 'xml',
    name: 'space',
    namespace: NS.XML
  },
  xmlns: {
    prefix: '',
    name: 'xmlns',
    namespace: NS.XMLNS
  },
  'xmlns:xlink': {
    prefix: 'xmlns',
    name: 'xlink',
    namespace: NS.XMLNS
  }
}; //SVG tag names adjustment map

const SVG_TAG_NAMES_ADJUSTMENT_MAP = exports.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
  altglyph: 'altGlyph',
  altglyphdef: 'altGlyphDef',
  altglyphitem: 'altGlyphItem',
  animatecolor: 'animateColor',
  animatemotion: 'animateMotion',
  animatetransform: 'animateTransform',
  clippath: 'clipPath',
  feblend: 'feBlend',
  fecolormatrix: 'feColorMatrix',
  fecomponenttransfer: 'feComponentTransfer',
  fecomposite: 'feComposite',
  feconvolvematrix: 'feConvolveMatrix',
  fediffuselighting: 'feDiffuseLighting',
  fedisplacementmap: 'feDisplacementMap',
  fedistantlight: 'feDistantLight',
  feflood: 'feFlood',
  fefunca: 'feFuncA',
  fefuncb: 'feFuncB',
  fefuncg: 'feFuncG',
  fefuncr: 'feFuncR',
  fegaussianblur: 'feGaussianBlur',
  feimage: 'feImage',
  femerge: 'feMerge',
  femergenode: 'feMergeNode',
  femorphology: 'feMorphology',
  feoffset: 'feOffset',
  fepointlight: 'fePointLight',
  fespecularlighting: 'feSpecularLighting',
  fespotlight: 'feSpotLight',
  fetile: 'feTile',
  feturbulence: 'feTurbulence',
  foreignobject: 'foreignObject',
  glyphref: 'glyphRef',
  lineargradient: 'linearGradient',
  radialgradient: 'radialGradient',
  textpath: 'textPath'
}; //Tags that causes exit from foreign content

const EXITS_FOREIGN_CONTENT = {
  [$.B]: true,
  [$.BIG]: true,
  [$.BLOCKQUOTE]: true,
  [$.BODY]: true,
  [$.BR]: true,
  [$.CENTER]: true,
  [$.CODE]: true,
  [$.DD]: true,
  [$.DIV]: true,
  [$.DL]: true,
  [$.DT]: true,
  [$.EM]: true,
  [$.EMBED]: true,
  [$.H1]: true,
  [$.H2]: true,
  [$.H3]: true,
  [$.H4]: true,
  [$.H5]: true,
  [$.H6]: true,
  [$.HEAD]: true,
  [$.HR]: true,
  [$.I]: true,
  [$.IMG]: true,
  [$.LI]: true,
  [$.LISTING]: true,
  [$.MENU]: true,
  [$.META]: true,
  [$.NOBR]: true,
  [$.OL]: true,
  [$.P]: true,
  [$.PRE]: true,
  [$.RUBY]: true,
  [$.S]: true,
  [$.SMALL]: true,
  [$.SPAN]: true,
  [$.STRONG]: true,
  [$.STRIKE]: true,
  [$.SUB]: true,
  [$.SUP]: true,
  [$.TABLE]: true,
  [$.TT]: true,
  [$.U]: true,
  [$.UL]: true,
  [$.VAR]: true
}; //Check exit from foreign content

exports.causesExit = function (startTagToken) {
  const tn = startTagToken.tagName;
  const isFontWithAttrs = tn === $.FONT && (tokenizer.getTokenAttr(startTagToken, ATTRS.COLOR) !== null || tokenizer.getTokenAttr(startTagToken, ATTRS.SIZE) !== null || tokenizer.getTokenAttr(startTagToken, ATTRS.FACE) !== null);
  return isFontWithAttrs ? true : EXITS_FOREIGN_CONTENT[tn];
}; //Token adjustments


exports.adjustTokenMathMLAttrs = function (token) {
  for (let i = 0; i < token.attrs.length; i++) {
    if (token.attrs[i].name === DEFINITION_URL_ATTR) {
      token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
};

exports.adjustTokenSVGAttrs = function (token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];

    if (adjustedAttrName) {
      token.attrs[i].name = adjustedAttrName;
    }
  }
};

exports.adjustTokenXMLAttrs = function (token) {
  for (let i = 0; i < token.attrs.length; i++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];

    if (adjustedAttrEntry) {
      token.attrs[i].prefix = adjustedAttrEntry.prefix;
      token.attrs[i].name = adjustedAttrEntry.name;
      token.attrs[i].namespace = adjustedAttrEntry.namespace;
    }
  }
};

exports.adjustTokenSVGTagName = function (token) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP[token.tagName];

  if (adjustedTagName) {
    token.tagName = adjustedTagName;
  }
}; //Integration points


function isMathMLTextIntegrationPoint(tn, ns) {
  return ns === NS.MATHML && (tn === $.MI || tn === $.MO || tn === $.MN || tn === $.MS || tn === $.MTEXT);
}

function isHtmlIntegrationPoint(tn, ns, attrs) {
  if (ns === NS.MATHML && tn === $.ANNOTATION_XML) {
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name === ATTRS.ENCODING) {
        const value = attrs[i].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }

  return ns === NS.SVG && (tn === $.FOREIGN_OBJECT || tn === $.DESC || tn === $.TITLE);
}

exports.isIntegrationPoint = function (tn, ns, attrs, foreignNS) {
  if ((!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs)) {
    return true;
  }

  if ((!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns)) {
    return true;
  }

  return false;
};
});

//Aliases


const $ = html$4.TAG_NAMES;
const NS = html$4.NAMESPACES;
const ATTRS = html$4.ATTRS;
const DEFAULT_OPTIONS = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  onParseError: null,
  treeAdapter: _default
}; //Misc constants

const HIDDEN_INPUT_TYPE = 'hidden'; //Adoption agency loops iteration count

const AA_OUTER_LOOP_ITER = 8;
const AA_INNER_LOOP_ITER = 3; //Insertion modes

const INITIAL_MODE = 'INITIAL_MODE';
const BEFORE_HTML_MODE = 'BEFORE_HTML_MODE';
const BEFORE_HEAD_MODE = 'BEFORE_HEAD_MODE';
const IN_HEAD_MODE = 'IN_HEAD_MODE';
const IN_HEAD_NO_SCRIPT_MODE = 'IN_HEAD_NO_SCRIPT_MODE';
const AFTER_HEAD_MODE = 'AFTER_HEAD_MODE';
const IN_BODY_MODE = 'IN_BODY_MODE';
const TEXT_MODE = 'TEXT_MODE';
const IN_TABLE_MODE = 'IN_TABLE_MODE';
const IN_TABLE_TEXT_MODE = 'IN_TABLE_TEXT_MODE';
const IN_CAPTION_MODE = 'IN_CAPTION_MODE';
const IN_COLUMN_GROUP_MODE = 'IN_COLUMN_GROUP_MODE';
const IN_TABLE_BODY_MODE = 'IN_TABLE_BODY_MODE';
const IN_ROW_MODE = 'IN_ROW_MODE';
const IN_CELL_MODE = 'IN_CELL_MODE';
const IN_SELECT_MODE = 'IN_SELECT_MODE';
const IN_SELECT_IN_TABLE_MODE = 'IN_SELECT_IN_TABLE_MODE';
const IN_TEMPLATE_MODE = 'IN_TEMPLATE_MODE';
const AFTER_BODY_MODE = 'AFTER_BODY_MODE';
const IN_FRAMESET_MODE = 'IN_FRAMESET_MODE';
const AFTER_FRAMESET_MODE = 'AFTER_FRAMESET_MODE';
const AFTER_AFTER_BODY_MODE = 'AFTER_AFTER_BODY_MODE';
const AFTER_AFTER_FRAMESET_MODE = 'AFTER_AFTER_FRAMESET_MODE'; //Insertion mode reset map

const INSERTION_MODE_RESET_MAP = {
  [$.TR]: IN_ROW_MODE,
  [$.TBODY]: IN_TABLE_BODY_MODE,
  [$.THEAD]: IN_TABLE_BODY_MODE,
  [$.TFOOT]: IN_TABLE_BODY_MODE,
  [$.CAPTION]: IN_CAPTION_MODE,
  [$.COLGROUP]: IN_COLUMN_GROUP_MODE,
  [$.TABLE]: IN_TABLE_MODE,
  [$.BODY]: IN_BODY_MODE,
  [$.FRAMESET]: IN_FRAMESET_MODE
}; //Template insertion mode switch map

const TEMPLATE_INSERTION_MODE_SWITCH_MAP = {
  [$.CAPTION]: IN_TABLE_MODE,
  [$.COLGROUP]: IN_TABLE_MODE,
  [$.TBODY]: IN_TABLE_MODE,
  [$.TFOOT]: IN_TABLE_MODE,
  [$.THEAD]: IN_TABLE_MODE,
  [$.COL]: IN_COLUMN_GROUP_MODE,
  [$.TR]: IN_TABLE_BODY_MODE,
  [$.TD]: IN_ROW_MODE,
  [$.TH]: IN_ROW_MODE
}; //Token handlers map for insertion modes

const TOKEN_HANDLERS = {
  [INITIAL_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenInInitialMode,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenInInitialMode,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: doctypeInInitialMode,
    [tokenizer.START_TAG_TOKEN]: tokenInInitialMode,
    [tokenizer.END_TAG_TOKEN]: tokenInInitialMode,
    [tokenizer.EOF_TOKEN]: tokenInInitialMode
  },
  [BEFORE_HTML_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenBeforeHtml,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenBeforeHtml,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagBeforeHtml,
    [tokenizer.END_TAG_TOKEN]: endTagBeforeHtml,
    [tokenizer.EOF_TOKEN]: tokenBeforeHtml
  },
  [BEFORE_HEAD_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenBeforeHead,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenBeforeHead,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
    [tokenizer.START_TAG_TOKEN]: startTagBeforeHead,
    [tokenizer.END_TAG_TOKEN]: endTagBeforeHead,
    [tokenizer.EOF_TOKEN]: tokenBeforeHead
  },
  [IN_HEAD_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenInHead,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenInHead,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
    [tokenizer.START_TAG_TOKEN]: startTagInHead,
    [tokenizer.END_TAG_TOKEN]: endTagInHead,
    [tokenizer.EOF_TOKEN]: tokenInHead
  },
  [IN_HEAD_NO_SCRIPT_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenInHeadNoScript,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenInHeadNoScript,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
    [tokenizer.START_TAG_TOKEN]: startTagInHeadNoScript,
    [tokenizer.END_TAG_TOKEN]: endTagInHeadNoScript,
    [tokenizer.EOF_TOKEN]: tokenInHeadNoScript
  },
  [AFTER_HEAD_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenAfterHead,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterHead,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
    [tokenizer.START_TAG_TOKEN]: startTagAfterHead,
    [tokenizer.END_TAG_TOKEN]: endTagAfterHead,
    [tokenizer.EOF_TOKEN]: tokenAfterHead
  },
  [IN_BODY_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInBody,
    [tokenizer.END_TAG_TOKEN]: endTagInBody,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [TEXT_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.NULL_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: ignoreToken,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: ignoreToken,
    [tokenizer.END_TAG_TOKEN]: endTagInText,
    [tokenizer.EOF_TOKEN]: eofInText
  },
  [IN_TABLE_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInTable,
    [tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInTable,
    [tokenizer.END_TAG_TOKEN]: endTagInTable,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_TABLE_TEXT_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInTableText,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInTableText,
    [tokenizer.COMMENT_TOKEN]: tokenInTableText,
    [tokenizer.DOCTYPE_TOKEN]: tokenInTableText,
    [tokenizer.START_TAG_TOKEN]: tokenInTableText,
    [tokenizer.END_TAG_TOKEN]: tokenInTableText,
    [tokenizer.EOF_TOKEN]: tokenInTableText
  },
  [IN_CAPTION_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInCaption,
    [tokenizer.END_TAG_TOKEN]: endTagInCaption,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_COLUMN_GROUP_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenInColumnGroup,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenInColumnGroup,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInColumnGroup,
    [tokenizer.END_TAG_TOKEN]: endTagInColumnGroup,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_TABLE_BODY_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInTable,
    [tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInTableBody,
    [tokenizer.END_TAG_TOKEN]: endTagInTableBody,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_ROW_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInTable,
    [tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInRow,
    [tokenizer.END_TAG_TOKEN]: endTagInRow,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_CELL_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInCell,
    [tokenizer.END_TAG_TOKEN]: endTagInCell,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_SELECT_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInSelect,
    [tokenizer.END_TAG_TOKEN]: endTagInSelect,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_SELECT_IN_TABLE_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInSelectInTable,
    [tokenizer.END_TAG_TOKEN]: endTagInSelectInTable,
    [tokenizer.EOF_TOKEN]: eofInBody
  },
  [IN_TEMPLATE_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: characterInBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInTemplate,
    [tokenizer.END_TAG_TOKEN]: endTagInTemplate,
    [tokenizer.EOF_TOKEN]: eofInTemplate
  },
  [AFTER_BODY_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenAfterBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterBody,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendCommentToRootHtmlElement,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagAfterBody,
    [tokenizer.END_TAG_TOKEN]: endTagAfterBody,
    [tokenizer.EOF_TOKEN]: stopParsing
  },
  [IN_FRAMESET_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagInFrameset,
    [tokenizer.END_TAG_TOKEN]: endTagInFrameset,
    [tokenizer.EOF_TOKEN]: stopParsing
  },
  [AFTER_FRAMESET_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
    [tokenizer.COMMENT_TOKEN]: appendComment,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagAfterFrameset,
    [tokenizer.END_TAG_TOKEN]: endTagAfterFrameset,
    [tokenizer.EOF_TOKEN]: stopParsing
  },
  [AFTER_AFTER_BODY_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: tokenAfterAfterBody,
    [tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterAfterBody,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendCommentToDocument,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagAfterAfterBody,
    [tokenizer.END_TAG_TOKEN]: tokenAfterAfterBody,
    [tokenizer.EOF_TOKEN]: stopParsing
  },
  [AFTER_AFTER_FRAMESET_MODE]: {
    [tokenizer.CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
    [tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
    [tokenizer.COMMENT_TOKEN]: appendCommentToDocument,
    [tokenizer.DOCTYPE_TOKEN]: ignoreToken,
    [tokenizer.START_TAG_TOKEN]: startTagAfterAfterFrameset,
    [tokenizer.END_TAG_TOKEN]: ignoreToken,
    [tokenizer.EOF_TOKEN]: stopParsing
  }
}; //Parser

class Parser {
  constructor(options) {
    this.options = mergeOptions(DEFAULT_OPTIONS, options);
    this.treeAdapter = this.options.treeAdapter;
    this.pendingScript = null;

    if (this.options.sourceCodeLocationInfo) {
      mixin.install(this, parserMixin$1);
    }

    if (this.options.onParseError) {
      mixin.install(this, parserMixin, {
        onParseError: this.options.onParseError
      });
    }
  } // API


  parse(html) {
    const document = this.treeAdapter.createDocument();

    this._bootstrap(document, null);

    this.tokenizer.write(html, true);

    this._runParsingLoop(null);

    return document;
  }

  parseFragment(html, fragmentContext) {
    //NOTE: use <template> element as a fragment context if context element was not provided,
    //so we will parse in "forgiving" manner
    if (!fragmentContext) {
      fragmentContext = this.treeAdapter.createElement($.TEMPLATE, NS.HTML, []);
    } //NOTE: create fake element which will be used as 'document' for fragment parsing.
    //This is important for jsdom there 'document' can't be recreated, therefore
    //fragment parsing causes messing of the main `document`.


    const documentMock = this.treeAdapter.createElement('documentmock', NS.HTML, []);

    this._bootstrap(documentMock, fragmentContext);

    if (this.treeAdapter.getTagName(fragmentContext) === $.TEMPLATE) {
      this._pushTmplInsertionMode(IN_TEMPLATE_MODE);
    }

    this._initTokenizerForFragmentParsing();

    this._insertFakeRootElement();

    this._resetInsertionMode();

    this._findFormInFragmentContext();

    this.tokenizer.write(html, true);

    this._runParsingLoop(null);

    const rootElement = this.treeAdapter.getFirstChild(documentMock);
    const fragment = this.treeAdapter.createDocumentFragment();

    this._adoptNodes(rootElement, fragment);

    return fragment;
  } //Bootstrap parser


  _bootstrap(document, fragmentContext) {
    this.tokenizer = new tokenizer(this.options);
    this.stopped = false;
    this.insertionMode = INITIAL_MODE;
    this.originalInsertionMode = '';
    this.document = document;
    this.fragmentContext = fragmentContext;
    this.headElement = null;
    this.formElement = null;
    this.openElements = new openElementStack(this.document, this.treeAdapter);
    this.activeFormattingElements = new formattingElementList(this.treeAdapter);
    this.tmplInsertionModeStack = [];
    this.tmplInsertionModeStackTop = -1;
    this.currentTmplInsertionMode = null;
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
  } //Errors


  _err() {// NOTE: err reporting is noop by default. Enabled by mixin.
  } //Parsing loop


  _runParsingLoop(scriptHandler) {
    while (!this.stopped) {
      this._setupTokenizerCDATAMode();

      const token = this.tokenizer.getNextToken();

      if (token.type === tokenizer.HIBERNATION_TOKEN) {
        break;
      }

      if (this.skipNextNewLine) {
        this.skipNextNewLine = false;

        if (token.type === tokenizer.WHITESPACE_CHARACTER_TOKEN && token.chars[0] === '\n') {
          if (token.chars.length === 1) {
            continue;
          }

          token.chars = token.chars.substr(1);
        }
      }

      this._processInputToken(token);

      if (scriptHandler && this.pendingScript) {
        break;
      }
    }
  }

  runParsingLoopForCurrentChunk(writeCallback, scriptHandler) {
    this._runParsingLoop(scriptHandler);

    if (scriptHandler && this.pendingScript) {
      const script = this.pendingScript;
      this.pendingScript = null;
      scriptHandler(script);
      return;
    }

    if (writeCallback) {
      writeCallback();
    }
  } //Text parsing


  _setupTokenizerCDATAMode() {
    const current = this._getAdjustedCurrentElement();

    this.tokenizer.allowCDATA = current && current !== this.document && this.treeAdapter.getNamespaceURI(current) !== NS.HTML && !this._isIntegrationPoint(current);
  }

  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML);

    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = TEXT_MODE;
  }

  switchToPlaintextParsing() {
    this.insertionMode = TEXT_MODE;
    this.originalInsertionMode = IN_BODY_MODE;
    this.tokenizer.state = tokenizer.MODE.PLAINTEXT;
  } //Fragment parsing


  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }

  _findFormInFragmentContext() {
    let node = this.fragmentContext;

    do {
      if (this.treeAdapter.getTagName(node) === $.FORM) {
        this.formElement = node;
        break;
      }

      node = this.treeAdapter.getParentNode(node);
    } while (node);
  }

  _initTokenizerForFragmentParsing() {
    if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === NS.HTML) {
      const tn = this.treeAdapter.getTagName(this.fragmentContext);

      if (tn === $.TITLE || tn === $.TEXTAREA) {
        this.tokenizer.state = tokenizer.MODE.RCDATA;
      } else if (tn === $.STYLE || tn === $.XMP || tn === $.IFRAME || tn === $.NOEMBED || tn === $.NOFRAMES || tn === $.NOSCRIPT) {
        this.tokenizer.state = tokenizer.MODE.RAWTEXT;
      } else if (tn === $.SCRIPT) {
        this.tokenizer.state = tokenizer.MODE.SCRIPT_DATA;
      } else if (tn === $.PLAINTEXT) {
        this.tokenizer.state = tokenizer.MODE.PLAINTEXT;
      }
    }
  } //Tree mutation


  _setDocumentType(token) {
    const name = token.name || '';
    const publicId = token.publicId || '';
    const systemId = token.systemId || '';
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
  }

  _attachElementToTree(element) {
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element);
    } else {
      const parent = this.openElements.currentTmplContent || this.openElements.current;
      this.treeAdapter.appendChild(parent, element);
    }
  }

  _appendElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);

    this._attachElementToTree(element);
  }

  _insertElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);

    this._attachElementToTree(element);

    this.openElements.push(element);
  }

  _insertFakeElement(tagName) {
    const element = this.treeAdapter.createElement(tagName, NS.HTML, []);

    this._attachElementToTree(element);

    this.openElements.push(element);
  }

  _insertTemplate(token) {
    const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);

    this._attachElementToTree(tmpl);

    this.openElements.push(tmpl);
  }

  _insertFakeRootElement() {
    const element = this.treeAdapter.createElement($.HTML, NS.HTML, []);
    this.treeAdapter.appendChild(this.openElements.current, element);
    this.openElements.push(element);
  }

  _appendCommentNode(token, parent) {
    const commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent, commentNode);
  }

  _insertCharacters(token) {
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentText(token.chars);
    } else {
      const parent = this.openElements.currentTmplContent || this.openElements.current;
      this.treeAdapter.insertText(parent, token.chars);
    }
  }

  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  } //Token processing


  _shouldProcessTokenInForeignContent(token) {
    const current = this._getAdjustedCurrentElement();

    if (!current || current === this.document) {
      return false;
    }

    const ns = this.treeAdapter.getNamespaceURI(current);

    if (ns === NS.HTML) {
      return false;
    }

    if (this.treeAdapter.getTagName(current) === $.ANNOTATION_XML && ns === NS.MATHML && token.type === tokenizer.START_TAG_TOKEN && token.tagName === $.SVG) {
      return false;
    }

    const isCharacterToken = token.type === tokenizer.CHARACTER_TOKEN || token.type === tokenizer.NULL_CHARACTER_TOKEN || token.type === tokenizer.WHITESPACE_CHARACTER_TOKEN;
    const isMathMLTextStartTag = token.type === tokenizer.START_TAG_TOKEN && token.tagName !== $.MGLYPH && token.tagName !== $.MALIGNMARK;

    if ((isMathMLTextStartTag || isCharacterToken) && this._isIntegrationPoint(current, NS.MATHML)) {
      return false;
    }

    if ((token.type === tokenizer.START_TAG_TOKEN || isCharacterToken) && this._isIntegrationPoint(current, NS.HTML)) {
      return false;
    }

    return token.type !== tokenizer.EOF_TOKEN;
  }

  _processToken(token) {
    TOKEN_HANDLERS[this.insertionMode][token.type](this, token);
  }

  _processTokenInBodyMode(token) {
    TOKEN_HANDLERS[IN_BODY_MODE][token.type](this, token);
  }

  _processTokenInForeignContent(token) {
    if (token.type === tokenizer.CHARACTER_TOKEN) {
      characterInForeignContent(this, token);
    } else if (token.type === tokenizer.NULL_CHARACTER_TOKEN) {
      nullCharacterInForeignContent(this, token);
    } else if (token.type === tokenizer.WHITESPACE_CHARACTER_TOKEN) {
      insertCharacters(this, token);
    } else if (token.type === tokenizer.COMMENT_TOKEN) {
      appendComment(this, token);
    } else if (token.type === tokenizer.START_TAG_TOKEN) {
      startTagInForeignContent(this, token);
    } else if (token.type === tokenizer.END_TAG_TOKEN) {
      endTagInForeignContent(this, token);
    }
  }

  _processInputToken(token) {
    if (this._shouldProcessTokenInForeignContent(token)) {
      this._processTokenInForeignContent(token);
    } else {
      this._processToken(token);
    }

    if (token.type === tokenizer.START_TAG_TOKEN && token.selfClosing && !token.ackSelfClosing) {
      this._err(errorCodes.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  } //Integration points


  _isIntegrationPoint(element, foreignNS) {
    const tn = this.treeAdapter.getTagName(element);
    const ns = this.treeAdapter.getNamespaceURI(element);
    const attrs = this.treeAdapter.getAttrList(element);
    return foreignContent.isIntegrationPoint(tn, ns, attrs, foreignNS);
  } //Active formatting elements reconstruction


  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.length;

    if (listLength) {
      let unopenIdx = listLength;
      let entry = null;

      do {
        unopenIdx--;
        entry = this.activeFormattingElements.entries[unopenIdx];

        if (entry.type === formattingElementList.MARKER_ENTRY || this.openElements.contains(entry.element)) {
          unopenIdx++;
          break;
        }
      } while (unopenIdx > 0);

      for (let i = unopenIdx; i < listLength; i++) {
        entry = this.activeFormattingElements.entries[i];

        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));

        entry.element = this.openElements.current;
      }
    }
  } //Close elements


  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = IN_ROW_MODE;
  }

  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion($.P);
    this.openElements.popUntilTagNamePopped($.P);
  } //Insertion modes


  _resetInsertionMode() {
    for (let i = this.openElements.stackTop, last = false; i >= 0; i--) {
      let element = this.openElements.items[i];

      if (i === 0) {
        last = true;

        if (this.fragmentContext) {
          element = this.fragmentContext;
        }
      }

      const tn = this.treeAdapter.getTagName(element);
      const newInsertionMode = INSERTION_MODE_RESET_MAP[tn];

      if (newInsertionMode) {
        this.insertionMode = newInsertionMode;
        break;
      } else if (!last && (tn === $.TD || tn === $.TH)) {
        this.insertionMode = IN_CELL_MODE;
        break;
      } else if (!last && tn === $.HEAD) {
        this.insertionMode = IN_HEAD_MODE;
        break;
      } else if (tn === $.SELECT) {
        this._resetInsertionModeForSelect(i);

        break;
      } else if (tn === $.TEMPLATE) {
        this.insertionMode = this.currentTmplInsertionMode;
        break;
      } else if (tn === $.HTML) {
        this.insertionMode = this.headElement ? AFTER_HEAD_MODE : BEFORE_HEAD_MODE;
        break;
      } else if (last) {
        this.insertionMode = IN_BODY_MODE;
        break;
      }
    }
  }

  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i = selectIdx - 1; i > 0; i--) {
        const ancestor = this.openElements.items[i];
        const tn = this.treeAdapter.getTagName(ancestor);

        if (tn === $.TEMPLATE) {
          break;
        } else if (tn === $.TABLE) {
          this.insertionMode = IN_SELECT_IN_TABLE_MODE;
          return;
        }
      }
    }

    this.insertionMode = IN_SELECT_MODE;
  }

  _pushTmplInsertionMode(mode) {
    this.tmplInsertionModeStack.push(mode);
    this.tmplInsertionModeStackTop++;
    this.currentTmplInsertionMode = mode;
  }

  _popTmplInsertionMode() {
    this.tmplInsertionModeStack.pop();
    this.tmplInsertionModeStackTop--;
    this.currentTmplInsertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStackTop];
  } //Foster parenting


  _isElementCausesFosterParenting(element) {
    const tn = this.treeAdapter.getTagName(element);
    return tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR;
  }

  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.current);
  }

  _findFosterParentingLocation() {
    const location = {
      parent: null,
      beforeElement: null
    };

    for (let i = this.openElements.stackTop; i >= 0; i--) {
      const openElement = this.openElements.items[i];
      const tn = this.treeAdapter.getTagName(openElement);
      const ns = this.treeAdapter.getNamespaceURI(openElement);

      if (tn === $.TEMPLATE && ns === NS.HTML) {
        location.parent = this.treeAdapter.getTemplateContent(openElement);
        break;
      } else if (tn === $.TABLE) {
        location.parent = this.treeAdapter.getParentNode(openElement);

        if (location.parent) {
          location.beforeElement = openElement;
        } else {
          location.parent = this.openElements.items[i - 1];
        }

        break;
      }
    }

    if (!location.parent) {
      location.parent = this.openElements.items[0];
    }

    return location;
  }

  _fosterParentElement(element) {
    const location = this._findFosterParentingLocation();

    if (location.beforeElement) {
      this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
    } else {
      this.treeAdapter.appendChild(location.parent, element);
    }
  }

  _fosterParentText(chars) {
    const location = this._findFosterParentingLocation();

    if (location.beforeElement) {
      this.treeAdapter.insertTextBefore(location.parent, chars, location.beforeElement);
    } else {
      this.treeAdapter.insertText(location.parent, chars);
    }
  } //Special elements


  _isSpecialElement(element) {
    const tn = this.treeAdapter.getTagName(element);
    const ns = this.treeAdapter.getNamespaceURI(element);
    return html$4.SPECIAL_ELEMENTS[ns][tn];
  }

}

var parser = Parser; //Adoption agency algorithm
//(see: http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html#adoptionAgency)
//------------------------------------------------------------------
//Steps 5-8 of the algorithm

function aaObtainFormattingElementEntry(p, token) {
  let formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);

  if (formattingElementEntry) {
    if (!p.openElements.contains(formattingElementEntry.element)) {
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p.openElements.hasInScope(token.tagName)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p, token);
  }

  return formattingElementEntry;
} //Steps 9 and 10 of the algorithm


function aaObtainFurthestBlock(p, formattingElementEntry) {
  let furthestBlock = null;

  for (let i = p.openElements.stackTop; i >= 0; i--) {
    const element = p.openElements.items[i];

    if (element === formattingElementEntry.element) {
      break;
    }

    if (p._isSpecialElement(element)) {
      furthestBlock = element;
    }
  }

  if (!furthestBlock) {
    p.openElements.popUntilElementPopped(formattingElementEntry.element);
    p.activeFormattingElements.removeEntry(formattingElementEntry);
  }

  return furthestBlock;
} //Step 13 of the algorithm


function aaInnerLoop(p, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p.openElements.getCommonAncestor(furthestBlock);

  for (let i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
    //NOTE: store next element for the next loop iteration (it may be deleted from the stack by step 9.5)
    nextElement = p.openElements.getCommonAncestor(element);
    const elementEntry = p.activeFormattingElements.getElementEntry(element);
    const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;

    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p.activeFormattingElements.removeEntry(elementEntry);
      }

      p.openElements.remove(element);
    } else {
      element = aaRecreateElementFromEntry(p, elementEntry);

      if (lastElement === furthestBlock) {
        p.activeFormattingElements.bookmark = elementEntry;
      }

      p.treeAdapter.detachNode(lastElement);
      p.treeAdapter.appendChild(element, lastElement);
      lastElement = element;
    }
  }

  return lastElement;
} //Step 13.7 of the algorithm


function aaRecreateElementFromEntry(p, elementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  p.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
} //Step 14 of the algorithm


function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
  if (p._isElementCausesFosterParenting(commonAncestor)) {
    p._fosterParentElement(lastElement);
  } else {
    const tn = p.treeAdapter.getTagName(commonAncestor);
    const ns = p.treeAdapter.getNamespaceURI(commonAncestor);

    if (tn === $.TEMPLATE && ns === NS.HTML) {
      commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
    }

    p.treeAdapter.appendChild(commonAncestor, lastElement);
  }
} //Steps 15-19 of the algorithm


function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
  const ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const token = formattingElementEntry.token;
  const newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);

  p._adoptNodes(furthestBlock, newElement);

  p.treeAdapter.appendChild(furthestBlock, newElement);
  p.activeFormattingElements.insertElementAfterBookmark(newElement, formattingElementEntry.token);
  p.activeFormattingElements.removeEntry(formattingElementEntry);
  p.openElements.remove(formattingElementEntry.element);
  p.openElements.insertAfter(furthestBlock, newElement);
} //Algorithm entry point


function callAdoptionAgency(p, token) {
  let formattingElementEntry;

  for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
    formattingElementEntry = aaObtainFormattingElementEntry(p, token);

    if (!formattingElementEntry) {
      break;
    }

    const furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);

    if (!furthestBlock) {
      break;
    }

    p.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
    p.treeAdapter.detachNode(lastElement);
    aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
    aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
  }
} //Generic token handlers
//------------------------------------------------------------------


function ignoreToken() {//NOTE: do nothing =)
}

function misplacedDoctype(p) {
  p._err(errorCodes.misplacedDoctype);
}

function appendComment(p, token) {
  p._appendCommentNode(token, p.openElements.currentTmplContent || p.openElements.current);
}

function appendCommentToRootHtmlElement(p, token) {
  p._appendCommentNode(token, p.openElements.items[0]);
}

function appendCommentToDocument(p, token) {
  p._appendCommentNode(token, p.document);
}

function insertCharacters(p, token) {
  p._insertCharacters(token);
}

function stopParsing(p) {
  p.stopped = true;
} // The "initial" insertion mode
//------------------------------------------------------------------


function doctypeInInitialMode(p, token) {
  p._setDocumentType(token);

  const mode = token.forceQuirks ? html$4.DOCUMENT_MODE.QUIRKS : doctype$2.getDocumentMode(token);

  if (!doctype$2.isConforming(token)) {
    p._err(errorCodes.nonConformingDoctype);
  }

  p.treeAdapter.setDocumentMode(p.document, mode);
  p.insertionMode = BEFORE_HTML_MODE;
}

function tokenInInitialMode(p, token) {
  p._err(errorCodes.missingDoctype, {
    beforeToken: true
  });

  p.treeAdapter.setDocumentMode(p.document, html$4.DOCUMENT_MODE.QUIRKS);
  p.insertionMode = BEFORE_HTML_MODE;

  p._processToken(token);
} // The "before html" insertion mode
//------------------------------------------------------------------


function startTagBeforeHtml(p, token) {
  if (token.tagName === $.HTML) {
    p._insertElement(token, NS.HTML);

    p.insertionMode = BEFORE_HEAD_MODE;
  } else {
    tokenBeforeHtml(p, token);
  }
}

function endTagBeforeHtml(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML || tn === $.HEAD || tn === $.BODY || tn === $.BR) {
    tokenBeforeHtml(p, token);
  }
}

function tokenBeforeHtml(p, token) {
  p._insertFakeRootElement();

  p.insertionMode = BEFORE_HEAD_MODE;

  p._processToken(token);
} // The "before head" insertion mode
//------------------------------------------------------------------


function startTagBeforeHead(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.HEAD) {
    p._insertElement(token, NS.HTML);

    p.headElement = p.openElements.current;
    p.insertionMode = IN_HEAD_MODE;
  } else {
    tokenBeforeHead(p, token);
  }
}

function endTagBeforeHead(p, token) {
  const tn = token.tagName;

  if (tn === $.HEAD || tn === $.BODY || tn === $.HTML || tn === $.BR) {
    tokenBeforeHead(p, token);
  } else {
    p._err(errorCodes.endTagWithoutMatchingOpenElement);
  }
}

function tokenBeforeHead(p, token) {
  p._insertFakeElement($.HEAD);

  p.headElement = p.openElements.current;
  p.insertionMode = IN_HEAD_MODE;

  p._processToken(token);
} // The "in head" insertion mode
//------------------------------------------------------------------


function startTagInHead(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META) {
    p._appendElement(token, NS.HTML);

    token.ackSelfClosing = true;
  } else if (tn === $.TITLE) {
    p._switchToTextParsing(token, tokenizer.MODE.RCDATA);
  } else if (tn === $.NOSCRIPT) {
    if (p.options.scriptingEnabled) {
      p._switchToTextParsing(token, tokenizer.MODE.RAWTEXT);
    } else {
      p._insertElement(token, NS.HTML);

      p.insertionMode = IN_HEAD_NO_SCRIPT_MODE;
    }
  } else if (tn === $.NOFRAMES || tn === $.STYLE) {
    p._switchToTextParsing(token, tokenizer.MODE.RAWTEXT);
  } else if (tn === $.SCRIPT) {
    p._switchToTextParsing(token, tokenizer.MODE.SCRIPT_DATA);
  } else if (tn === $.TEMPLATE) {
    p._insertTemplate(token, NS.HTML);

    p.activeFormattingElements.insertMarker();
    p.framesetOk = false;
    p.insertionMode = IN_TEMPLATE_MODE;

    p._pushTmplInsertionMode(IN_TEMPLATE_MODE);
  } else if (tn === $.HEAD) {
    p._err(errorCodes.misplacedStartTagForHeadElement);
  } else {
    tokenInHead(p, token);
  }
}

function endTagInHead(p, token) {
  const tn = token.tagName;

  if (tn === $.HEAD) {
    p.openElements.pop();
    p.insertionMode = AFTER_HEAD_MODE;
  } else if (tn === $.BODY || tn === $.BR || tn === $.HTML) {
    tokenInHead(p, token);
  } else if (tn === $.TEMPLATE) {
    if (p.openElements.tmplCount > 0) {
      p.openElements.generateImpliedEndTagsThoroughly();

      if (p.openElements.currentTagName !== $.TEMPLATE) {
        p._err(errorCodes.closingOfElementWithOpenChildElements);
      }

      p.openElements.popUntilTagNamePopped($.TEMPLATE);
      p.activeFormattingElements.clearToLastMarker();

      p._popTmplInsertionMode();

      p._resetInsertionMode();
    } else {
      p._err(errorCodes.endTagWithoutMatchingOpenElement);
    }
  } else {
    p._err(errorCodes.endTagWithoutMatchingOpenElement);
  }
}

function tokenInHead(p, token) {
  p.openElements.pop();
  p.insertionMode = AFTER_HEAD_MODE;

  p._processToken(token);
} // The "in head no script" insertion mode
//------------------------------------------------------------------


function startTagInHeadNoScript(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.BASEFONT || tn === $.BGSOUND || tn === $.HEAD || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.STYLE) {
    startTagInHead(p, token);
  } else if (tn === $.NOSCRIPT) {
    p._err(errorCodes.nestedNoscriptInHead);
  } else {
    tokenInHeadNoScript(p, token);
  }
}

function endTagInHeadNoScript(p, token) {
  const tn = token.tagName;

  if (tn === $.NOSCRIPT) {
    p.openElements.pop();
    p.insertionMode = IN_HEAD_MODE;
  } else if (tn === $.BR) {
    tokenInHeadNoScript(p, token);
  } else {
    p._err(errorCodes.endTagWithoutMatchingOpenElement);
  }
}

function tokenInHeadNoScript(p, token) {
  const errCode = token.type === tokenizer.EOF_TOKEN ? errorCodes.openElementsLeftAfterEof : errorCodes.disallowedContentInNoscriptInHead;

  p._err(errCode);

  p.openElements.pop();
  p.insertionMode = IN_HEAD_MODE;

  p._processToken(token);
} // The "after head" insertion mode
//------------------------------------------------------------------


function startTagAfterHead(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.BODY) {
    p._insertElement(token, NS.HTML);

    p.framesetOk = false;
    p.insertionMode = IN_BODY_MODE;
  } else if (tn === $.FRAMESET) {
    p._insertElement(token, NS.HTML);

    p.insertionMode = IN_FRAMESET_MODE;
  } else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE) {
    p._err(errorCodes.abandonedHeadElementChild);

    p.openElements.push(p.headElement);
    startTagInHead(p, token);
    p.openElements.remove(p.headElement);
  } else if (tn === $.HEAD) {
    p._err(errorCodes.misplacedStartTagForHeadElement);
  } else {
    tokenAfterHead(p, token);
  }
}

function endTagAfterHead(p, token) {
  const tn = token.tagName;

  if (tn === $.BODY || tn === $.HTML || tn === $.BR) {
    tokenAfterHead(p, token);
  } else if (tn === $.TEMPLATE) {
    endTagInHead(p, token);
  } else {
    p._err(errorCodes.endTagWithoutMatchingOpenElement);
  }
}

function tokenAfterHead(p, token) {
  p._insertFakeElement($.BODY);

  p.insertionMode = IN_BODY_MODE;

  p._processToken(token);
} // The "in body" insertion mode
//------------------------------------------------------------------


function whitespaceCharacterInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertCharacters(token);
}

function characterInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertCharacters(token);

  p.framesetOk = false;
}

function htmlStartTagInBody(p, token) {
  if (p.openElements.tmplCount === 0) {
    p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
  }
}

function bodyStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();

  if (bodyElement && p.openElements.tmplCount === 0) {
    p.framesetOk = false;
    p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  }
}

function framesetStartTagInBody(p, token) {
  const bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();

  if (p.framesetOk && bodyElement) {
    p.treeAdapter.detachNode(bodyElement);
    p.openElements.popAllUpToHtmlElement();

    p._insertElement(token, NS.HTML);

    p.insertionMode = IN_FRAMESET_MODE;
  }
}

function addressStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML);
}

function numberedHeaderStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  const tn = p.openElements.currentTagName;

  if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
    p.openElements.pop();
  }

  p._insertElement(token, NS.HTML);
}

function preStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML); //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
  //on to the next one. (Newlines at the start of pre blocks are ignored as an authoring convenience.)


  p.skipNextNewLine = true;
  p.framesetOk = false;
}

function formStartTagInBody(p, token) {
  const inTemplate = p.openElements.tmplCount > 0;

  if (!p.formElement || inTemplate) {
    if (p.openElements.hasInButtonScope($.P)) {
      p._closePElement();
    }

    p._insertElement(token, NS.HTML);

    if (!inTemplate) {
      p.formElement = p.openElements.current;
    }
  }
}

function listItemStartTagInBody(p, token) {
  p.framesetOk = false;
  const tn = token.tagName;

  for (let i = p.openElements.stackTop; i >= 0; i--) {
    const element = p.openElements.items[i];
    const elementTn = p.treeAdapter.getTagName(element);
    let closeTn = null;

    if (tn === $.LI && elementTn === $.LI) {
      closeTn = $.LI;
    } else if ((tn === $.DD || tn === $.DT) && (elementTn === $.DD || elementTn === $.DT)) {
      closeTn = elementTn;
    }

    if (closeTn) {
      p.openElements.generateImpliedEndTagsWithExclusion(closeTn);
      p.openElements.popUntilTagNamePopped(closeTn);
      break;
    }

    if (elementTn !== $.ADDRESS && elementTn !== $.DIV && elementTn !== $.P && p._isSpecialElement(element)) {
      break;
    }
  }

  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML);
}

function plaintextStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML);

  p.tokenizer.state = tokenizer.MODE.PLAINTEXT;
}

function buttonStartTagInBody(p, token) {
  if (p.openElements.hasInScope($.BUTTON)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped($.BUTTON);
  }

  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);

  p.framesetOk = false;
}

function aStartTagInBody(p, token) {
  const activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName($.A);

  if (activeElementEntry) {
    callAdoptionAgency(p, token);
    p.openElements.remove(activeElementEntry.element);
    p.activeFormattingElements.removeEntry(activeElementEntry);
  }

  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);

  p.activeFormattingElements.pushElement(p.openElements.current, token);
}

function bStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);

  p.activeFormattingElements.pushElement(p.openElements.current, token);
}

function nobrStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  if (p.openElements.hasInScope($.NOBR)) {
    callAdoptionAgency(p, token);

    p._reconstructActiveFormattingElements();
  }

  p._insertElement(token, NS.HTML);

  p.activeFormattingElements.pushElement(p.openElements.current, token);
}

function appletStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);

  p.activeFormattingElements.insertMarker();
  p.framesetOk = false;
}

function tableStartTagInBody(p, token) {
  if (p.treeAdapter.getDocumentMode(p.document) !== html$4.DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML);

  p.framesetOk = false;
  p.insertionMode = IN_TABLE_MODE;
}

function areaStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._appendElement(token, NS.HTML);

  p.framesetOk = false;
  token.ackSelfClosing = true;
}

function inputStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._appendElement(token, NS.HTML);

  const inputType = tokenizer.getTokenAttr(token, ATTRS.TYPE);

  if (!inputType || inputType.toLowerCase() !== HIDDEN_INPUT_TYPE) {
    p.framesetOk = false;
  }

  token.ackSelfClosing = true;
}

function paramStartTagInBody(p, token) {
  p._appendElement(token, NS.HTML);

  token.ackSelfClosing = true;
}

function hrStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._appendElement(token, NS.HTML);

  p.framesetOk = false;
  token.ackSelfClosing = true;
}

function imageStartTagInBody(p, token) {
  token.tagName = $.IMG;
  areaStartTagInBody(p, token);
}

function textareaStartTagInBody(p, token) {
  p._insertElement(token, NS.HTML); //NOTE: If the next token is a U+000A LINE FEED (LF) character token, then ignore that token and move
  //on to the next one. (Newlines at the start of textarea elements are ignored as an authoring convenience.)


  p.skipNextNewLine = true;
  p.tokenizer.state = tokenizer.MODE.RCDATA;
  p.originalInsertionMode = p.insertionMode;
  p.framesetOk = false;
  p.insertionMode = TEXT_MODE;
}

function xmpStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._reconstructActiveFormattingElements();

  p.framesetOk = false;

  p._switchToTextParsing(token, tokenizer.MODE.RAWTEXT);
}

function iframeStartTagInBody(p, token) {
  p.framesetOk = false;

  p._switchToTextParsing(token, tokenizer.MODE.RAWTEXT);
} //NOTE: here we assume that we always act as an user agent with enabled plugins, so we parse
//<noembed> as a rawtext.


function noembedStartTagInBody(p, token) {
  p._switchToTextParsing(token, tokenizer.MODE.RAWTEXT);
}

function selectStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);

  p.framesetOk = false;

  if (p.insertionMode === IN_TABLE_MODE || p.insertionMode === IN_CAPTION_MODE || p.insertionMode === IN_TABLE_BODY_MODE || p.insertionMode === IN_ROW_MODE || p.insertionMode === IN_CELL_MODE) {
    p.insertionMode = IN_SELECT_IN_TABLE_MODE;
  } else {
    p.insertionMode = IN_SELECT_MODE;
  }
}

function optgroupStartTagInBody(p, token) {
  if (p.openElements.currentTagName === $.OPTION) {
    p.openElements.pop();
  }

  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);
}

function rbStartTagInBody(p, token) {
  if (p.openElements.hasInScope($.RUBY)) {
    p.openElements.generateImpliedEndTags();
  }

  p._insertElement(token, NS.HTML);
}

function rtStartTagInBody(p, token) {
  if (p.openElements.hasInScope($.RUBY)) {
    p.openElements.generateImpliedEndTagsWithExclusion($.RTC);
  }

  p._insertElement(token, NS.HTML);
}

function menuStartTagInBody(p, token) {
  if (p.openElements.hasInButtonScope($.P)) {
    p._closePElement();
  }

  p._insertElement(token, NS.HTML);
}

function mathStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  foreignContent.adjustTokenMathMLAttrs(token);
  foreignContent.adjustTokenXMLAttrs(token);

  if (token.selfClosing) {
    p._appendElement(token, NS.MATHML);
  } else {
    p._insertElement(token, NS.MATHML);
  }

  token.ackSelfClosing = true;
}

function svgStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  foreignContent.adjustTokenSVGAttrs(token);
  foreignContent.adjustTokenXMLAttrs(token);

  if (token.selfClosing) {
    p._appendElement(token, NS.SVG);
  } else {
    p._insertElement(token, NS.SVG);
  }

  token.ackSelfClosing = true;
}

function genericStartTagInBody(p, token) {
  p._reconstructActiveFormattingElements();

  p._insertElement(token, NS.HTML);
} //OPTIMIZATION: Integer comparisons are low-cost, so we can use very fast tag name length filters here.
//It's faster than using dictionary.


function startTagInBody(p, token) {
  const tn = token.tagName;

  switch (tn.length) {
    case 1:
      if (tn === $.I || tn === $.S || tn === $.B || tn === $.U) {
        bStartTagInBody(p, token);
      } else if (tn === $.P) {
        addressStartTagInBody(p, token);
      } else if (tn === $.A) {
        aStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }

      break;

    case 2:
      if (tn === $.DL || tn === $.OL || tn === $.UL) {
        addressStartTagInBody(p, token);
      } else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
        numberedHeaderStartTagInBody(p, token);
      } else if (tn === $.LI || tn === $.DD || tn === $.DT) {
        listItemStartTagInBody(p, token);
      } else if (tn === $.EM || tn === $.TT) {
        bStartTagInBody(p, token);
      } else if (tn === $.BR) {
        areaStartTagInBody(p, token);
      } else if (tn === $.HR) {
        hrStartTagInBody(p, token);
      } else if (tn === $.RB) {
        rbStartTagInBody(p, token);
      } else if (tn === $.RT || tn === $.RP) {
        rtStartTagInBody(p, token);
      } else if (tn !== $.TH && tn !== $.TD && tn !== $.TR) {
        genericStartTagInBody(p, token);
      }

      break;

    case 3:
      if (tn === $.DIV || tn === $.DIR || tn === $.NAV) {
        addressStartTagInBody(p, token);
      } else if (tn === $.PRE) {
        preStartTagInBody(p, token);
      } else if (tn === $.BIG) {
        bStartTagInBody(p, token);
      } else if (tn === $.IMG || tn === $.WBR) {
        areaStartTagInBody(p, token);
      } else if (tn === $.XMP) {
        xmpStartTagInBody(p, token);
      } else if (tn === $.SVG) {
        svgStartTagInBody(p, token);
      } else if (tn === $.RTC) {
        rbStartTagInBody(p, token);
      } else if (tn !== $.COL) {
        genericStartTagInBody(p, token);
      }

      break;

    case 4:
      if (tn === $.HTML) {
        htmlStartTagInBody(p, token);
      } else if (tn === $.BASE || tn === $.LINK || tn === $.META) {
        startTagInHead(p, token);
      } else if (tn === $.BODY) {
        bodyStartTagInBody(p, token);
      } else if (tn === $.MAIN || tn === $.MENU) {
        addressStartTagInBody(p, token);
      } else if (tn === $.FORM) {
        formStartTagInBody(p, token);
      } else if (tn === $.CODE || tn === $.FONT) {
        bStartTagInBody(p, token);
      } else if (tn === $.NOBR) {
        nobrStartTagInBody(p, token);
      } else if (tn === $.AREA) {
        areaStartTagInBody(p, token);
      } else if (tn === $.MATH) {
        mathStartTagInBody(p, token);
      } else if (tn === $.MENU) {
        menuStartTagInBody(p, token);
      } else if (tn !== $.HEAD) {
        genericStartTagInBody(p, token);
      }

      break;

    case 5:
      if (tn === $.STYLE || tn === $.TITLE) {
        startTagInHead(p, token);
      } else if (tn === $.ASIDE) {
        addressStartTagInBody(p, token);
      } else if (tn === $.SMALL) {
        bStartTagInBody(p, token);
      } else if (tn === $.TABLE) {
        tableStartTagInBody(p, token);
      } else if (tn === $.EMBED) {
        areaStartTagInBody(p, token);
      } else if (tn === $.INPUT) {
        inputStartTagInBody(p, token);
      } else if (tn === $.PARAM || tn === $.TRACK) {
        paramStartTagInBody(p, token);
      } else if (tn === $.IMAGE) {
        imageStartTagInBody(p, token);
      } else if (tn !== $.FRAME && tn !== $.TBODY && tn !== $.TFOOT && tn !== $.THEAD) {
        genericStartTagInBody(p, token);
      }

      break;

    case 6:
      if (tn === $.SCRIPT) {
        startTagInHead(p, token);
      } else if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP || tn === $.DIALOG) {
        addressStartTagInBody(p, token);
      } else if (tn === $.BUTTON) {
        buttonStartTagInBody(p, token);
      } else if (tn === $.STRIKE || tn === $.STRONG) {
        bStartTagInBody(p, token);
      } else if (tn === $.APPLET || tn === $.OBJECT) {
        appletStartTagInBody(p, token);
      } else if (tn === $.KEYGEN) {
        areaStartTagInBody(p, token);
      } else if (tn === $.SOURCE) {
        paramStartTagInBody(p, token);
      } else if (tn === $.IFRAME) {
        iframeStartTagInBody(p, token);
      } else if (tn === $.SELECT) {
        selectStartTagInBody(p, token);
      } else if (tn === $.OPTION) {
        optgroupStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }

      break;

    case 7:
      if (tn === $.BGSOUND) {
        startTagInHead(p, token);
      } else if (tn === $.DETAILS || tn === $.ADDRESS || tn === $.ARTICLE || tn === $.SECTION || tn === $.SUMMARY) {
        addressStartTagInBody(p, token);
      } else if (tn === $.LISTING) {
        preStartTagInBody(p, token);
      } else if (tn === $.MARQUEE) {
        appletStartTagInBody(p, token);
      } else if (tn === $.NOEMBED) {
        noembedStartTagInBody(p, token);
      } else if (tn !== $.CAPTION) {
        genericStartTagInBody(p, token);
      }

      break;

    case 8:
      if (tn === $.BASEFONT) {
        startTagInHead(p, token);
      } else if (tn === $.FRAMESET) {
        framesetStartTagInBody(p, token);
      } else if (tn === $.FIELDSET) {
        addressStartTagInBody(p, token);
      } else if (tn === $.TEXTAREA) {
        textareaStartTagInBody(p, token);
      } else if (tn === $.TEMPLATE) {
        startTagInHead(p, token);
      } else if (tn === $.NOSCRIPT) {
        if (p.options.scriptingEnabled) {
          noembedStartTagInBody(p, token);
        } else {
          genericStartTagInBody(p, token);
        }
      } else if (tn === $.OPTGROUP) {
        optgroupStartTagInBody(p, token);
      } else if (tn !== $.COLGROUP) {
        genericStartTagInBody(p, token);
      }

      break;

    case 9:
      if (tn === $.PLAINTEXT) {
        plaintextStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }

      break;

    case 10:
      if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION) {
        addressStartTagInBody(p, token);
      } else {
        genericStartTagInBody(p, token);
      }

      break;

    default:
      genericStartTagInBody(p, token);
  }
}

function bodyEndTagInBody(p) {
  if (p.openElements.hasInScope($.BODY)) {
    p.insertionMode = AFTER_BODY_MODE;
  }
}

function htmlEndTagInBody(p, token) {
  if (p.openElements.hasInScope($.BODY)) {
    p.insertionMode = AFTER_BODY_MODE;

    p._processToken(token);
  }
}

function addressEndTagInBody(p, token) {
  const tn = token.tagName;

  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
  }
}

function formEndTagInBody(p) {
  const inTemplate = p.openElements.tmplCount > 0;
  const formElement = p.formElement;

  if (!inTemplate) {
    p.formElement = null;
  }

  if ((formElement || inTemplate) && p.openElements.hasInScope($.FORM)) {
    p.openElements.generateImpliedEndTags();

    if (inTemplate) {
      p.openElements.popUntilTagNamePopped($.FORM);
    } else {
      p.openElements.remove(formElement);
    }
  }
}

function pEndTagInBody(p) {
  if (!p.openElements.hasInButtonScope($.P)) {
    p._insertFakeElement($.P);
  }

  p._closePElement();
}

function liEndTagInBody(p) {
  if (p.openElements.hasInListItemScope($.LI)) {
    p.openElements.generateImpliedEndTagsWithExclusion($.LI);
    p.openElements.popUntilTagNamePopped($.LI);
  }
}

function ddEndTagInBody(p, token) {
  const tn = token.tagName;

  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTagsWithExclusion(tn);
    p.openElements.popUntilTagNamePopped(tn);
  }
}

function numberedHeaderEndTagInBody(p) {
  if (p.openElements.hasNumberedHeaderInScope()) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilNumberedHeaderPopped();
  }
}

function appletEndTagInBody(p, token) {
  const tn = token.tagName;

  if (p.openElements.hasInScope(tn)) {
    p.openElements.generateImpliedEndTags();
    p.openElements.popUntilTagNamePopped(tn);
    p.activeFormattingElements.clearToLastMarker();
  }
}

function brEndTagInBody(p) {
  p._reconstructActiveFormattingElements();

  p._insertFakeElement($.BR);

  p.openElements.pop();
  p.framesetOk = false;
}

function genericEndTagInBody(p, token) {
  const tn = token.tagName;

  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];

    if (p.treeAdapter.getTagName(element) === tn) {
      p.openElements.generateImpliedEndTagsWithExclusion(tn);
      p.openElements.popUntilElementPopped(element);
      break;
    }

    if (p._isSpecialElement(element)) {
      break;
    }
  }
} //OPTIMIZATION: Integer comparisons are low-cost, so we can use very fast tag name length filters here.
//It's faster than using dictionary.


function endTagInBody(p, token) {
  const tn = token.tagName;

  switch (tn.length) {
    case 1:
      if (tn === $.A || tn === $.B || tn === $.I || tn === $.S || tn === $.U) {
        callAdoptionAgency(p, token);
      } else if (tn === $.P) {
        pEndTagInBody(p);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 2:
      if (tn === $.DL || tn === $.UL || tn === $.OL) {
        addressEndTagInBody(p, token);
      } else if (tn === $.LI) {
        liEndTagInBody(p);
      } else if (tn === $.DD || tn === $.DT) {
        ddEndTagInBody(p, token);
      } else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
        numberedHeaderEndTagInBody(p);
      } else if (tn === $.BR) {
        brEndTagInBody(p);
      } else if (tn === $.EM || tn === $.TT) {
        callAdoptionAgency(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 3:
      if (tn === $.BIG) {
        callAdoptionAgency(p, token);
      } else if (tn === $.DIR || tn === $.DIV || tn === $.NAV || tn === $.PRE) {
        addressEndTagInBody(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 4:
      if (tn === $.BODY) {
        bodyEndTagInBody(p);
      } else if (tn === $.HTML) {
        htmlEndTagInBody(p, token);
      } else if (tn === $.FORM) {
        formEndTagInBody(p);
      } else if (tn === $.CODE || tn === $.FONT || tn === $.NOBR) {
        callAdoptionAgency(p, token);
      } else if (tn === $.MAIN || tn === $.MENU) {
        addressEndTagInBody(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 5:
      if (tn === $.ASIDE) {
        addressEndTagInBody(p, token);
      } else if (tn === $.SMALL) {
        callAdoptionAgency(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 6:
      if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP || tn === $.DIALOG) {
        addressEndTagInBody(p, token);
      } else if (tn === $.APPLET || tn === $.OBJECT) {
        appletEndTagInBody(p, token);
      } else if (tn === $.STRIKE || tn === $.STRONG) {
        callAdoptionAgency(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 7:
      if (tn === $.ADDRESS || tn === $.ARTICLE || tn === $.DETAILS || tn === $.SECTION || tn === $.SUMMARY || tn === $.LISTING) {
        addressEndTagInBody(p, token);
      } else if (tn === $.MARQUEE) {
        appletEndTagInBody(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 8:
      if (tn === $.FIELDSET) {
        addressEndTagInBody(p, token);
      } else if (tn === $.TEMPLATE) {
        endTagInHead(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    case 10:
      if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION) {
        addressEndTagInBody(p, token);
      } else {
        genericEndTagInBody(p, token);
      }

      break;

    default:
      genericEndTagInBody(p, token);
  }
}

function eofInBody(p, token) {
  if (p.tmplInsertionModeStackTop > -1) {
    eofInTemplate(p, token);
  } else {
    p.stopped = true;
  }
} // The "text" insertion mode
//------------------------------------------------------------------


function endTagInText(p, token) {
  if (token.tagName === $.SCRIPT) {
    p.pendingScript = p.openElements.current;
  }

  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;
}

function eofInText(p, token) {
  p._err(errorCodes.eofInElementThatCanContainOnlyText);

  p.openElements.pop();
  p.insertionMode = p.originalInsertionMode;

  p._processToken(token);
} // The "in table" insertion mode
//------------------------------------------------------------------


function characterInTable(p, token) {
  const curTn = p.openElements.currentTagName;

  if (curTn === $.TABLE || curTn === $.TBODY || curTn === $.TFOOT || curTn === $.THEAD || curTn === $.TR) {
    p.pendingCharacterTokens = [];
    p.hasNonWhitespacePendingCharacterToken = false;
    p.originalInsertionMode = p.insertionMode;
    p.insertionMode = IN_TABLE_TEXT_MODE;

    p._processToken(token);
  } else {
    tokenInTable(p, token);
  }
}

function captionStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();
  p.activeFormattingElements.insertMarker();

  p._insertElement(token, NS.HTML);

  p.insertionMode = IN_CAPTION_MODE;
}

function colgroupStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();

  p._insertElement(token, NS.HTML);

  p.insertionMode = IN_COLUMN_GROUP_MODE;
}

function colStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();

  p._insertFakeElement($.COLGROUP);

  p.insertionMode = IN_COLUMN_GROUP_MODE;

  p._processToken(token);
}

function tbodyStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();

  p._insertElement(token, NS.HTML);

  p.insertionMode = IN_TABLE_BODY_MODE;
}

function tdStartTagInTable(p, token) {
  p.openElements.clearBackToTableContext();

  p._insertFakeElement($.TBODY);

  p.insertionMode = IN_TABLE_BODY_MODE;

  p._processToken(token);
}

function tableStartTagInTable(p, token) {
  if (p.openElements.hasInTableScope($.TABLE)) {
    p.openElements.popUntilTagNamePopped($.TABLE);

    p._resetInsertionMode();

    p._processToken(token);
  }
}

function inputStartTagInTable(p, token) {
  const inputType = tokenizer.getTokenAttr(token, ATTRS.TYPE);

  if (inputType && inputType.toLowerCase() === HIDDEN_INPUT_TYPE) {
    p._appendElement(token, NS.HTML);
  } else {
    tokenInTable(p, token);
  }

  token.ackSelfClosing = true;
}

function formStartTagInTable(p, token) {
  if (!p.formElement && p.openElements.tmplCount === 0) {
    p._insertElement(token, NS.HTML);

    p.formElement = p.openElements.current;
    p.openElements.pop();
  }
}

function startTagInTable(p, token) {
  const tn = token.tagName;

  switch (tn.length) {
    case 2:
      if (tn === $.TD || tn === $.TH || tn === $.TR) {
        tdStartTagInTable(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 3:
      if (tn === $.COL) {
        colStartTagInTable(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 4:
      if (tn === $.FORM) {
        formStartTagInTable(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 5:
      if (tn === $.TABLE) {
        tableStartTagInTable(p, token);
      } else if (tn === $.STYLE) {
        startTagInHead(p, token);
      } else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        tbodyStartTagInTable(p, token);
      } else if (tn === $.INPUT) {
        inputStartTagInTable(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 6:
      if (tn === $.SCRIPT) {
        startTagInHead(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 7:
      if (tn === $.CAPTION) {
        captionStartTagInTable(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    case 8:
      if (tn === $.COLGROUP) {
        colgroupStartTagInTable(p, token);
      } else if (tn === $.TEMPLATE) {
        startTagInHead(p, token);
      } else {
        tokenInTable(p, token);
      }

      break;

    default:
      tokenInTable(p, token);
  }
}

function endTagInTable(p, token) {
  const tn = token.tagName;

  if (tn === $.TABLE) {
    if (p.openElements.hasInTableScope($.TABLE)) {
      p.openElements.popUntilTagNamePopped($.TABLE);

      p._resetInsertionMode();
    }
  } else if (tn === $.TEMPLATE) {
    endTagInHead(p, token);
  } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR) {
    tokenInTable(p, token);
  }
}

function tokenInTable(p, token) {
  const savedFosterParentingState = p.fosterParentingEnabled;
  p.fosterParentingEnabled = true;

  p._processTokenInBodyMode(token);

  p.fosterParentingEnabled = savedFosterParentingState;
} // The "in table text" insertion mode
//------------------------------------------------------------------


function whitespaceCharacterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
}

function characterInTableText(p, token) {
  p.pendingCharacterTokens.push(token);
  p.hasNonWhitespacePendingCharacterToken = true;
}

function tokenInTableText(p, token) {
  let i = 0;

  if (p.hasNonWhitespacePendingCharacterToken) {
    for (; i < p.pendingCharacterTokens.length; i++) {
      tokenInTable(p, p.pendingCharacterTokens[i]);
    }
  } else {
    for (; i < p.pendingCharacterTokens.length; i++) {
      p._insertCharacters(p.pendingCharacterTokens[i]);
    }
  }

  p.insertionMode = p.originalInsertionMode;

  p._processToken(token);
} // The "in caption" insertion mode
//------------------------------------------------------------------


function startTagInCaption(p, token) {
  const tn = token.tagName;

  if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
    if (p.openElements.hasInTableScope($.CAPTION)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped($.CAPTION);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = IN_TABLE_MODE;

      p._processToken(token);
    }
  } else {
    startTagInBody(p, token);
  }
}

function endTagInCaption(p, token) {
  const tn = token.tagName;

  if (tn === $.CAPTION || tn === $.TABLE) {
    if (p.openElements.hasInTableScope($.CAPTION)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped($.CAPTION);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = IN_TABLE_MODE;

      if (tn === $.TABLE) {
        p._processToken(token);
      }
    }
  } else if (tn !== $.BODY && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR) {
    endTagInBody(p, token);
  }
} // The "in column group" insertion mode
//------------------------------------------------------------------


function startTagInColumnGroup(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.COL) {
    p._appendElement(token, NS.HTML);

    token.ackSelfClosing = true;
  } else if (tn === $.TEMPLATE) {
    startTagInHead(p, token);
  } else {
    tokenInColumnGroup(p, token);
  }
}

function endTagInColumnGroup(p, token) {
  const tn = token.tagName;

  if (tn === $.COLGROUP) {
    if (p.openElements.currentTagName === $.COLGROUP) {
      p.openElements.pop();
      p.insertionMode = IN_TABLE_MODE;
    }
  } else if (tn === $.TEMPLATE) {
    endTagInHead(p, token);
  } else if (tn !== $.COL) {
    tokenInColumnGroup(p, token);
  }
}

function tokenInColumnGroup(p, token) {
  if (p.openElements.currentTagName === $.COLGROUP) {
    p.openElements.pop();
    p.insertionMode = IN_TABLE_MODE;

    p._processToken(token);
  }
} // The "in table body" insertion mode
//------------------------------------------------------------------


function startTagInTableBody(p, token) {
  const tn = token.tagName;

  if (tn === $.TR) {
    p.openElements.clearBackToTableBodyContext();

    p._insertElement(token, NS.HTML);

    p.insertionMode = IN_ROW_MODE;
  } else if (tn === $.TH || tn === $.TD) {
    p.openElements.clearBackToTableBodyContext();

    p._insertFakeElement($.TR);

    p.insertionMode = IN_ROW_MODE;

    p._processToken(token);
  } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
    if (p.openElements.hasTableBodyContextInTableScope()) {
      p.openElements.clearBackToTableBodyContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_MODE;

      p._processToken(token);
    }
  } else {
    startTagInTable(p, token);
  }
}

function endTagInTableBody(p, token) {
  const tn = token.tagName;

  if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.clearBackToTableBodyContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_MODE;
    }
  } else if (tn === $.TABLE) {
    if (p.openElements.hasTableBodyContextInTableScope()) {
      p.openElements.clearBackToTableBodyContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_MODE;

      p._processToken(token);
    }
  } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH && tn !== $.TR) {
    endTagInTable(p, token);
  }
} // The "in row" insertion mode
//------------------------------------------------------------------


function startTagInRow(p, token) {
  const tn = token.tagName;

  if (tn === $.TH || tn === $.TD) {
    p.openElements.clearBackToTableRowContext();

    p._insertElement(token, NS.HTML);

    p.insertionMode = IN_CELL_MODE;
    p.activeFormattingElements.insertMarker();
  } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
    if (p.openElements.hasInTableScope($.TR)) {
      p.openElements.clearBackToTableRowContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_BODY_MODE;

      p._processToken(token);
    }
  } else {
    startTagInTable(p, token);
  }
}

function endTagInRow(p, token) {
  const tn = token.tagName;

  if (tn === $.TR) {
    if (p.openElements.hasInTableScope($.TR)) {
      p.openElements.clearBackToTableRowContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_BODY_MODE;
    }
  } else if (tn === $.TABLE) {
    if (p.openElements.hasInTableScope($.TR)) {
      p.openElements.clearBackToTableRowContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_BODY_MODE;

      p._processToken(token);
    }
  } else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
    if (p.openElements.hasInTableScope(tn) || p.openElements.hasInTableScope($.TR)) {
      p.openElements.clearBackToTableRowContext();
      p.openElements.pop();
      p.insertionMode = IN_TABLE_BODY_MODE;

      p._processToken(token);
    }
  } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH) {
    endTagInTable(p, token);
  }
} // The "in cell" insertion mode
//------------------------------------------------------------------


function startTagInCell(p, token) {
  const tn = token.tagName;

  if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
    if (p.openElements.hasInTableScope($.TD) || p.openElements.hasInTableScope($.TH)) {
      p._closeTableCell();

      p._processToken(token);
    }
  } else {
    startTagInBody(p, token);
  }
}

function endTagInCell(p, token) {
  const tn = token.tagName;

  if (tn === $.TD || tn === $.TH) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.generateImpliedEndTags();
      p.openElements.popUntilTagNamePopped(tn);
      p.activeFormattingElements.clearToLastMarker();
      p.insertionMode = IN_ROW_MODE;
    }
  } else if (tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
    if (p.openElements.hasInTableScope(tn)) {
      p._closeTableCell();

      p._processToken(token);
    }
  } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML) {
    endTagInBody(p, token);
  }
} // The "in select" insertion mode
//------------------------------------------------------------------


function startTagInSelect(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.OPTION) {
    if (p.openElements.currentTagName === $.OPTION) {
      p.openElements.pop();
    }

    p._insertElement(token, NS.HTML);
  } else if (tn === $.OPTGROUP) {
    if (p.openElements.currentTagName === $.OPTION) {
      p.openElements.pop();
    }

    if (p.openElements.currentTagName === $.OPTGROUP) {
      p.openElements.pop();
    }

    p._insertElement(token, NS.HTML);
  } else if (tn === $.INPUT || tn === $.KEYGEN || tn === $.TEXTAREA || tn === $.SELECT) {
    if (p.openElements.hasInSelectScope($.SELECT)) {
      p.openElements.popUntilTagNamePopped($.SELECT);

      p._resetInsertionMode();

      if (tn !== $.SELECT) {
        p._processToken(token);
      }
    }
  } else if (tn === $.SCRIPT || tn === $.TEMPLATE) {
    startTagInHead(p, token);
  }
}

function endTagInSelect(p, token) {
  const tn = token.tagName;

  if (tn === $.OPTGROUP) {
    const prevOpenElement = p.openElements.items[p.openElements.stackTop - 1];
    const prevOpenElementTn = prevOpenElement && p.treeAdapter.getTagName(prevOpenElement);

    if (p.openElements.currentTagName === $.OPTION && prevOpenElementTn === $.OPTGROUP) {
      p.openElements.pop();
    }

    if (p.openElements.currentTagName === $.OPTGROUP) {
      p.openElements.pop();
    }
  } else if (tn === $.OPTION) {
    if (p.openElements.currentTagName === $.OPTION) {
      p.openElements.pop();
    }
  } else if (tn === $.SELECT && p.openElements.hasInSelectScope($.SELECT)) {
    p.openElements.popUntilTagNamePopped($.SELECT);

    p._resetInsertionMode();
  } else if (tn === $.TEMPLATE) {
    endTagInHead(p, token);
  }
} //12.2.5.4.17 The "in select in table" insertion mode
//------------------------------------------------------------------


function startTagInSelectInTable(p, token) {
  const tn = token.tagName;

  if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
    p.openElements.popUntilTagNamePopped($.SELECT);

    p._resetInsertionMode();

    p._processToken(token);
  } else {
    startTagInSelect(p, token);
  }
}

function endTagInSelectInTable(p, token) {
  const tn = token.tagName;

  if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
    if (p.openElements.hasInTableScope(tn)) {
      p.openElements.popUntilTagNamePopped($.SELECT);

      p._resetInsertionMode();

      p._processToken(token);
    }
  } else {
    endTagInSelect(p, token);
  }
} // The "in template" insertion mode
//------------------------------------------------------------------


function startTagInTemplate(p, token) {
  const tn = token.tagName;

  if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE) {
    startTagInHead(p, token);
  } else {
    const newInsertionMode = TEMPLATE_INSERTION_MODE_SWITCH_MAP[tn] || IN_BODY_MODE;

    p._popTmplInsertionMode();

    p._pushTmplInsertionMode(newInsertionMode);

    p.insertionMode = newInsertionMode;

    p._processToken(token);
  }
}

function endTagInTemplate(p, token) {
  if (token.tagName === $.TEMPLATE) {
    endTagInHead(p, token);
  }
}

function eofInTemplate(p, token) {
  if (p.openElements.tmplCount > 0) {
    p.openElements.popUntilTagNamePopped($.TEMPLATE);
    p.activeFormattingElements.clearToLastMarker();

    p._popTmplInsertionMode();

    p._resetInsertionMode();

    p._processToken(token);
  } else {
    p.stopped = true;
  }
} // The "after body" insertion mode
//------------------------------------------------------------------


function startTagAfterBody(p, token) {
  if (token.tagName === $.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterBody(p, token);
  }
}

function endTagAfterBody(p, token) {
  if (token.tagName === $.HTML) {
    if (!p.fragmentContext) {
      p.insertionMode = AFTER_AFTER_BODY_MODE;
    }
  } else {
    tokenAfterBody(p, token);
  }
}

function tokenAfterBody(p, token) {
  p.insertionMode = IN_BODY_MODE;

  p._processToken(token);
} // The "in frameset" insertion mode
//------------------------------------------------------------------


function startTagInFrameset(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.FRAMESET) {
    p._insertElement(token, NS.HTML);
  } else if (tn === $.FRAME) {
    p._appendElement(token, NS.HTML);

    token.ackSelfClosing = true;
  } else if (tn === $.NOFRAMES) {
    startTagInHead(p, token);
  }
}

function endTagInFrameset(p, token) {
  if (token.tagName === $.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
    p.openElements.pop();

    if (!p.fragmentContext && p.openElements.currentTagName !== $.FRAMESET) {
      p.insertionMode = AFTER_FRAMESET_MODE;
    }
  }
} // The "after frameset" insertion mode
//------------------------------------------------------------------


function startTagAfterFrameset(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.NOFRAMES) {
    startTagInHead(p, token);
  }
}

function endTagAfterFrameset(p, token) {
  if (token.tagName === $.HTML) {
    p.insertionMode = AFTER_AFTER_FRAMESET_MODE;
  }
} // The "after after body" insertion mode
//------------------------------------------------------------------


function startTagAfterAfterBody(p, token) {
  if (token.tagName === $.HTML) {
    startTagInBody(p, token);
  } else {
    tokenAfterAfterBody(p, token);
  }
}

function tokenAfterAfterBody(p, token) {
  p.insertionMode = IN_BODY_MODE;

  p._processToken(token);
} // The "after after frameset" insertion mode
//------------------------------------------------------------------


function startTagAfterAfterFrameset(p, token) {
  const tn = token.tagName;

  if (tn === $.HTML) {
    startTagInBody(p, token);
  } else if (tn === $.NOFRAMES) {
    startTagInHead(p, token);
  }
} // The rules for parsing tokens in foreign content
//------------------------------------------------------------------


function nullCharacterInForeignContent(p, token) {
  token.chars = unicode.REPLACEMENT_CHARACTER;

  p._insertCharacters(token);
}

function characterInForeignContent(p, token) {
  p._insertCharacters(token);

  p.framesetOk = false;
}

function startTagInForeignContent(p, token) {
  if (foreignContent.causesExit(token) && !p.fragmentContext) {
    while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && !p._isIntegrationPoint(p.openElements.current)) {
      p.openElements.pop();
    }

    p._processToken(token);
  } else {
    const current = p._getAdjustedCurrentElement();

    const currentNs = p.treeAdapter.getNamespaceURI(current);

    if (currentNs === NS.MATHML) {
      foreignContent.adjustTokenMathMLAttrs(token);
    } else if (currentNs === NS.SVG) {
      foreignContent.adjustTokenSVGTagName(token);
      foreignContent.adjustTokenSVGAttrs(token);
    }

    foreignContent.adjustTokenXMLAttrs(token);

    if (token.selfClosing) {
      p._appendElement(token, currentNs);
    } else {
      p._insertElement(token, currentNs);
    }

    token.ackSelfClosing = true;
  }
}

function endTagInForeignContent(p, token) {
  for (let i = p.openElements.stackTop; i > 0; i--) {
    const element = p.openElements.items[i];

    if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
      p._processToken(token);

      break;
    }

    if (p.treeAdapter.getTagName(element).toLowerCase() === token.tagName) {
      p.openElements.popUntilElementPopped(element);
      break;
    }
  }
}

var start = factory$3('start');
var end = factory$3('end');
var unistUtilPosition = position$1;
position$1.start = start;
position$1.end = end;

function position$1(node) {
  return {
    start: start(node),
    end: end(node)
  };
}

function factory$3(type) {
  point.displayName = type;
  return point;

  function point(node) {
    var point = node && node.position && node.position[type] || {};
    return {
      line: point.line || null,
      column: point.column || null,
      offset: isNaN(point.offset) ? null : point.offset
    };
  }
}

var immutable = extend;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function extend() {
  var target = {};

  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (hasOwnProperty$1.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

var schema$1 = Schema;
var proto$1 = Schema.prototype;
proto$1.space = null;
proto$1.normal = {};
proto$1.property = {};

function Schema(property, normal, space) {
  this.property = property;
  this.normal = normal;

  if (space) {
    this.space = space;
  }
}

var merge_1 = merge;

function merge(definitions) {
  var length = definitions.length;
  var property = [];
  var normal = [];
  var index = -1;
  var info;
  var space;

  while (++index < length) {
    info = definitions[index];
    property.push(info.property);
    normal.push(info.normal);
    space = info.space;
  }

  return new schema$1(immutable.apply(null, property), immutable.apply(null, normal), space);
}

var normalize_1 = normalize;

function normalize(value) {
  return value.toLowerCase();
}

var info = Info;
var proto = Info.prototype;
proto.space = null;
proto.attribute = null;
proto.property = null;
proto.boolean = false;
proto.booleanish = false;
proto.overloadedBoolean = false;
proto.number = false;
proto.commaSeparated = false;
proto.spaceSeparated = false;
proto.commaOrSpaceSeparated = false;
proto.mustUseProperty = false;
proto.defined = false;

function Info(property, attribute) {
  this.property = property;
  this.attribute = attribute;
}

var powers = 0;
var boolean$2 = increment();
var booleanish$2 = increment();
var overloadedBoolean$1 = increment();
var number$3 = increment();
var spaceSeparated$3 = increment();
var commaSeparated$2 = increment();
var commaOrSpaceSeparated$1 = increment();

function increment() {
  return Math.pow(2, ++powers);
}

var types = {
	boolean: boolean$2,
	booleanish: booleanish$2,
	overloadedBoolean: overloadedBoolean$1,
	number: number$3,
	spaceSeparated: spaceSeparated$3,
	commaSeparated: commaSeparated$2,
	commaOrSpaceSeparated: commaOrSpaceSeparated$1
};

var definedInfo = DefinedInfo;
DefinedInfo.prototype = new info();
DefinedInfo.prototype.defined = true;
var checks = ['boolean', 'booleanish', 'overloadedBoolean', 'number', 'commaSeparated', 'spaceSeparated', 'commaOrSpaceSeparated'];
var checksLength = checks.length;

function DefinedInfo(property, attribute, mask, space) {
  var index = -1;
  var check;
  mark(this, 'space', space);
  info.call(this, property, attribute);

  while (++index < checksLength) {
    check = checks[index];
    mark(this, check, (mask & types[check]) === types[check]);
  }
}

function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}

var create_1 = create;

function create(definition) {
  var space = definition.space;
  var mustUseProperty = definition.mustUseProperty || [];
  var attributes = definition.attributes || {};
  var props = definition.properties;
  var transform = definition.transform;
  var property = {};
  var normal = {};
  var prop;
  var info;

  for (prop in props) {
    info = new definedInfo(prop, transform(attributes, prop), props[prop], space);

    if (mustUseProperty.indexOf(prop) !== -1) {
      info.mustUseProperty = true;
    }

    property[prop] = info;
    normal[normalize_1(prop)] = prop;
    normal[normalize_1(info.attribute)] = prop;
  }

  return new schema$1(property, normal, space);
}

var xlink$1 = create_1({
  space: 'xlink',
  transform: xlinkTransform,
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

function xlinkTransform(_, prop) {
  return 'xlink:' + prop.slice(5).toLowerCase();
}

var xml$1 = create_1({
  space: 'xml',
  transform: xmlTransform,
  properties: {
    xmlLang: null,
    xmlBase: null,
    xmlSpace: null
  }
});

function xmlTransform(_, prop) {
  return 'xml:' + prop.slice(3).toLowerCase();
}

var caseSensitiveTransform_1 = caseSensitiveTransform;

function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}

var caseInsensitiveTransform_1 = caseInsensitiveTransform;

function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform_1(attributes, property.toLowerCase());
}

var xmlns$1 = create_1({
  space: 'xmlns',
  attributes: {
    xmlnsxlink: 'xmlns:xlink'
  },
  transform: caseInsensitiveTransform_1,
  properties: {
    xmlns: null,
    xmlnsXLink: null
  }
});

var booleanish$1 = types.booleanish;
var number$2 = types.number;
var spaceSeparated$2 = types.spaceSeparated;
var aria = create_1({
  transform: ariaTransform,
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish$1,
    ariaAutoComplete: null,
    ariaBusy: booleanish$1,
    ariaChecked: booleanish$1,
    ariaColCount: number$2,
    ariaColIndex: number$2,
    ariaColSpan: number$2,
    ariaControls: spaceSeparated$2,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated$2,
    ariaDetails: null,
    ariaDisabled: booleanish$1,
    ariaDropEffect: spaceSeparated$2,
    ariaErrorMessage: null,
    ariaExpanded: booleanish$1,
    ariaFlowTo: spaceSeparated$2,
    ariaGrabbed: booleanish$1,
    ariaHasPopup: null,
    ariaHidden: booleanish$1,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated$2,
    ariaLevel: number$2,
    ariaLive: null,
    ariaModal: booleanish$1,
    ariaMultiLine: booleanish$1,
    ariaMultiSelectable: booleanish$1,
    ariaOrientation: null,
    ariaOwns: spaceSeparated$2,
    ariaPlaceholder: null,
    ariaPosInSet: number$2,
    ariaPressed: booleanish$1,
    ariaReadOnly: booleanish$1,
    ariaRelevant: null,
    ariaRequired: booleanish$1,
    ariaRoleDescription: spaceSeparated$2,
    ariaRowCount: number$2,
    ariaRowIndex: number$2,
    ariaRowSpan: number$2,
    ariaSelected: booleanish$1,
    ariaSetSize: number$2,
    ariaSort: null,
    ariaValueMax: number$2,
    ariaValueMin: number$2,
    ariaValueNow: number$2,
    ariaValueText: null,
    role: null
  }
});

function ariaTransform(_, prop) {
  return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase();
}

var boolean$1 = types.boolean;
var overloadedBoolean = types.overloadedBoolean;
var booleanish = types.booleanish;
var number$1 = types.number;
var spaceSeparated$1 = types.spaceSeparated;
var commaSeparated$1 = types.commaSeparated;
var html$3 = create_1({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv'
  },
  transform: caseInsensitiveTransform_1,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated$1,
    acceptCharset: spaceSeparated$1,
    accessKey: spaceSeparated$1,
    action: null,
    allow: null,
    allowFullScreen: boolean$1,
    allowPaymentRequest: boolean$1,
    allowUserMedia: boolean$1,
    alt: null,
    as: null,
    async: boolean$1,
    autoCapitalize: null,
    autoComplete: spaceSeparated$1,
    autoFocus: boolean$1,
    autoPlay: boolean$1,
    capture: boolean$1,
    charSet: null,
    checked: boolean$1,
    cite: null,
    className: spaceSeparated$1,
    cols: number$1,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean$1,
    controlsList: spaceSeparated$1,
    coords: number$1 | commaSeparated$1,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean$1,
    defer: boolean$1,
    dir: null,
    dirName: null,
    disabled: boolean$1,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean$1,
    formTarget: null,
    headers: spaceSeparated$1,
    height: number$1,
    hidden: boolean$1,
    high: number$1,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated$1,
    httpEquiv: spaceSeparated$1,
    id: null,
    imageSizes: null,
    imageSrcSet: commaSeparated$1,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean$1,
    itemId: null,
    itemProp: spaceSeparated$1,
    itemRef: spaceSeparated$1,
    itemScope: boolean$1,
    itemType: spaceSeparated$1,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loop: boolean$1,
    low: number$1,
    manifest: null,
    max: null,
    maxLength: number$1,
    media: null,
    method: null,
    min: null,
    minLength: number$1,
    multiple: boolean$1,
    muted: boolean$1,
    name: null,
    nonce: null,
    noModule: boolean$1,
    noValidate: boolean$1,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextMenu: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean$1,
    optimum: number$1,
    pattern: null,
    ping: spaceSeparated$1,
    placeholder: null,
    playsInline: boolean$1,
    poster: null,
    preload: null,
    readOnly: boolean$1,
    referrerPolicy: null,
    rel: spaceSeparated$1,
    required: boolean$1,
    reversed: boolean$1,
    rows: number$1,
    rowSpan: number$1,
    sandbox: spaceSeparated$1,
    scope: null,
    scoped: boolean$1,
    seamless: boolean$1,
    selected: boolean$1,
    shape: null,
    size: number$1,
    sizes: null,
    slot: null,
    span: number$1,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: commaSeparated$1,
    start: number$1,
    step: null,
    style: null,
    tabIndex: number$1,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean$1,
    useMap: null,
    value: booleanish,
    width: number$1,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated$1,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number$1,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number$1,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean$1,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean$1,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number$1,
    // `<img>` and `<object>`
    leftMargin: number$1,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number$1,
    // `<body>`
    marginWidth: number$1,
    // `<body>`
    noResize: boolean$1,
    // `<frame>`
    noHref: boolean$1,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean$1,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean$1,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number$1,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number$1,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number$1,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean$1,
    disableRemotePlayback: boolean$1,
    prefix: null,
    property: null,
    results: number$1,
    security: null,
    unselectable: null
  }
});

var html_1$2 = merge_1([xml$1, xlink$1, xmlns$1, aria, html$3]);

var boolean = types.boolean;
var number = types.number;
var spaceSeparated = types.spaceSeparated;
var commaSeparated = types.commaSeparated;
var commaOrSpaceSeparated = types.commaOrSpaceSeparated;
var svg$2 = create_1({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin'
  },
  transform: caseSensitiveTransform_1,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

var svg_1$1 = merge_1([xml$1, xlink$1, xmlns$1, aria, svg$2]);

var data = 'data';
var find_1 = find;
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap$1 = /[A-Z]/g;

function find(schema, value) {
  var normal = normalize_1(value);
  var prop = value;
  var Type = info;

  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }

  if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
    // Attribute or property.
    if (value.charAt(4) === '-') {
      prop = datasetToProperty(value);
    } else {
      value = datasetToAttribute(value);
    }

    Type = definedInfo;
  }

  return new Type(prop, value);
}

function datasetToProperty(attribute) {
  var value = attribute.slice(5).replace(dash, camelcase);
  return data + value.charAt(0).toUpperCase() + value.slice(1);
}

function datasetToAttribute(property) {
  var value = property.slice(4);

  if (dash.test(value)) {
    return property;
  }

  value = value.replace(cap$1, kebab);

  if (value.charAt(0) !== '-') {
    value = '-' + value;
  }

  return data + value;
}

function kebab($0) {
  return '-' + $0.toLowerCase();
}

function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

var html$2 = "http://www.w3.org/1999/xhtml";
var mathml = "http://www.w3.org/1998/Math/MathML";
var svg$1 = "http://www.w3.org/2000/svg";
var xlink = "http://www.w3.org/1999/xlink";
var xml = "http://www.w3.org/XML/1998/namespace";
var xmlns = "http://www.w3.org/2000/xmlns/";
var ns = {
	html: html$2,
	mathml: mathml,
	svg: svg$1,
	xlink: xlink,
	xml: xml,
	xmlns: xmlns
};

var caseSensitive = [
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"solidColor",
	"textArea",
	"textPath"
];

var hastUtilParseSelector = parse$3;
var dot = '.'.charCodeAt(0);
var hash = '#'.charCodeAt(0);
/* Parse a simple CSS selector into a HAST node. */

function parse$3(selector, defaultTagName) {
  var value = selector || '';
  var name = defaultTagName || 'div';
  var props = {};
  var index = -1;
  var length = value.length;
  var className;
  var type;
  var code;
  var subvalue;
  var lastIndex;

  while (++index <= length) {
    code = value.charCodeAt(index);

    if (!code || code === dot || code === hash) {
      subvalue = value.slice(lastIndex, index);

      if (subvalue) {
        if (type === dot) {
          if (className) {
            className.push(subvalue);
          } else {
            className = [subvalue];
            props.className = className;
          }
        } else if (type === hash) {
          props.id = subvalue;
        } else {
          name = subvalue;
        }
      }

      lastIndex = index + 1;
      type = code;
    }
  }

  return {
    type: 'element',
    tagName: name,
    properties: props,
    children: []
  };
}

var parse_1$1 = parse$2;
var stringify_1$1 = stringify$1;
var empty$2 = '';
var space$2 = ' ';
var whiteSpace = /[ \t\n\r\f]+/g;

function parse$2(value) {
  var input = String(value || empty$2).trim();
  return input === empty$2 ? [] : input.split(whiteSpace);
}

function stringify$1(values) {
  return values.join(space$2).trim();
}

var spaceSeparatedTokens = {
	parse: parse_1$1,
	stringify: stringify_1$1
};

var trim_1 = entry.createCommonjsModule(function (module, exports) {
exports = module.exports = trim;

function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function (str) {
  return str.replace(/^\s*/, '');
};

exports.right = function (str) {
  return str.replace(/\s*$/, '');
};
});

var parse_1 = parse$1;
var stringify_1 = stringify;



var comma = ',';
var space$1 = ' ';
var empty$1 = '';
/* Parse comma-separated tokens to an array. */

function parse$1(value) {
  var values = [];
  var input = String(value || empty$1);
  var index = input.indexOf(comma);
  var lastIndex = 0;
  var end = false;
  var val;

  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }

    val = trim_1(input.slice(lastIndex, index));

    if (val || !end) {
      values.push(val);
    }

    lastIndex = index + 1;
    index = input.indexOf(comma, lastIndex);
  }

  return values;
}
/* Compile an array to comma-separated tokens.
 * `options.padLeft` (default: `true`) pads a space left of each
 * token, and `options.padRight` (default: `false`) pads a space
 * to the right of each token. */


function stringify(values, options) {
  var settings = options || {};
  var left = settings.padLeft === false ? empty$1 : space$1;
  var right = settings.padRight ? space$1 : empty$1;
  /* Ensure the last empty entry is seen. */

  if (values[values.length - 1] === empty$1) {
    values = values.concat(empty$1);
  }

  return trim_1(values.join(right + comma + left));
}

var commaSeparatedTokens = {
	parse: parse_1,
	stringify: stringify_1
};

var spaces = spaceSeparatedTokens.parse;

var commas = commaSeparatedTokens.parse;

var factory_1 = factory$2;
var own$6 = {}.hasOwnProperty;

function factory$2(schema, defaultTagName, caseSensitive) {
  var adjust = caseSensitive ? createAdjustMap(caseSensitive) : null;
  return h; // Hyperscript compatible DSL for creating virtual hast trees.

  function h(selector, properties) {
    var node = hastUtilParseSelector(selector, defaultTagName);
    var children = Array.prototype.slice.call(arguments, 2);
    var name = node.tagName.toLowerCase();
    var property;
    node.tagName = adjust && own$6.call(adjust, name) ? adjust[name] : name;

    if (properties && isChildren(properties, node)) {
      children.unshift(properties);
      properties = null;
    }

    if (properties) {
      for (property in properties) {
        addProperty(node.properties, property, properties[property]);
      }
    }

    addChild(node.children, children);

    if (node.tagName === 'template') {
      node.content = {
        type: 'root',
        children: node.children
      };
      node.children = [];
    }

    return node;
  }

  function addProperty(properties, key, value) {
    var info;
    var property;
    var result; // Ignore nully and NaN values.

    if (value === null || value === undefined || value !== value) {
      return;
    }

    info = find_1(schema, key);
    property = info.property;
    result = value; // Handle list values.

    if (typeof result === 'string') {
      if (info.spaceSeparated) {
        result = spaces(result);
      } else if (info.commaSeparated) {
        result = commas(result);
      } else if (info.commaOrSpaceSeparated) {
        result = spaces(commas(result).join(' '));
      }
    } // Accept `object` on style.


    if (property === 'style' && typeof value !== 'string') {
      result = style(result);
    } // Class-names (which can be added both on the `selector` and here).


    if (property === 'className' && properties.className) {
      result = properties.className.concat(result);
    }

    properties[property] = parsePrimitives(info, property, result);
  }
}

function isChildren(value, node) {
  return typeof value === 'string' || 'length' in value || isNode(node.tagName, value);
}

function isNode(tagName, value) {
  var type = value.type;

  if (tagName === 'input' || !type || typeof type !== 'string') {
    return false;
  }

  if (typeof value.children === 'object' && 'length' in value.children) {
    return true;
  }

  type = type.toLowerCase();

  if (tagName === 'button') {
    return type !== 'menu' && type !== 'submit' && type !== 'reset' && type !== 'button';
  }

  return 'value' in value;
}

function addChild(nodes, value) {
  var index;
  var length;

  if (typeof value === 'string' || typeof value === 'number') {
    nodes.push({
      type: 'text',
      value: String(value)
    });
    return;
  }

  if (typeof value === 'object' && 'length' in value) {
    index = -1;
    length = value.length;

    while (++index < length) {
      addChild(nodes, value[index]);
    }

    return;
  }

  if (typeof value !== 'object' || !('type' in value)) {
    throw new Error('Expected node, nodes, or string, got `' + value + '`');
  }

  nodes.push(value);
} // Parse a (list of) primitives.


function parsePrimitives(info, name, value) {
  var index;
  var length;
  var result;

  if (typeof value !== 'object' || !('length' in value)) {
    return parsePrimitive(info, name, value);
  }

  length = value.length;
  index = -1;
  result = [];

  while (++index < length) {
    result[index] = parsePrimitive(info, name, value[index]);
  }

  return result;
} // Parse a single primitives.


function parsePrimitive(info, name, value) {
  var result = value;

  if (info.number || info.positiveNumber) {
    if (!isNaN(result) && result !== '') {
      result = Number(result);
    }
  } else if (info.boolean || info.overloadedBoolean) {
    // Accept `boolean` and `string`.
    if (typeof result === 'string' && (result === '' || normalize_1(value) === normalize_1(name))) {
      result = true;
    }
  }

  return result;
}

function style(value) {
  var result = [];
  var key;

  for (key in value) {
    result.push([key, value[key]].join(': '));
  }

  return result.join('; ');
}

function createAdjustMap(values) {
  var length = values.length;
  var index = -1;
  var result = {};
  var value;

  while (++index < length) {
    value = values[index];
    result[value.toLowerCase()] = value;
  }

  return result;
}

var svg = factory_1(svg_1$1, 'g', caseSensitive);
svg.displayName = 'svg';
var svg_1 = svg;

var html$1 = factory_1(html_1$2, 'div');
html$1.displayName = 'html';
var html_1$1 = html$1;

var hastscript = html_1$1;

var ccount_1 = ccount;

function ccount(value, character) {
  var count = 0;
  var index;
  value = String(value);

  if (typeof character !== 'string' || character.length !== 1) {
    throw new Error('Expected character');
  }

  index = value.indexOf(character);

  while (index !== -1) {
    count++;
    index = value.indexOf(character, index + 1);
  }

  return count;
}

var hastUtilFromParse5 = wrapper$1;
var own$5 = {}.hasOwnProperty; // Handlers.

var map = {
  '#document': root$4,
  '#document-fragment': root$4,
  '#text': text$4,
  '#comment': comment$1,
  '#documentType': doctype$1
}; // Wrapper to normalise options.

function wrapper$1(ast, options) {
  var settings = options || {};
  var file;

  if (settings.messages) {
    file = settings;
    settings = {};
  } else {
    file = settings.file;
  }

  return transform$1(ast, {
    schema: settings.space === 'svg' ? svg_1$1 : html_1$2,
    file: file,
    verbose: settings.verbose,
    location: false
  });
} // Transform a node.


function transform$1(ast, config) {
  var schema = config.schema;
  var fn = own$5.call(map, ast.nodeName) ? map[ast.nodeName] : element$2;
  var children;
  var node;
  var pos;

  if (fn === element$2) {
    config.schema = ast.namespaceURI === ns.svg ? svg_1$1 : html_1$2;
  }

  if (ast.childNodes) {
    children = nodes(ast.childNodes, config);
  }

  node = fn(ast, children, config);

  if (ast.sourceCodeLocation && config.file) {
    pos = location(node, ast.sourceCodeLocation, config);

    if (pos) {
      config.location = true;
      node.position = pos;
    }
  }

  config.schema = schema;
  return node;
} // Transform children.


function nodes(children, config) {
  var length = children.length;
  var index = -1;
  var result = [];

  while (++index < length) {
    result[index] = transform$1(children[index], config);
  }

  return result;
} // Transform a document.
// Stores `ast.quirksMode` in `node.data.quirksMode`.


function root$4(ast, children, config) {
  var node = {
    type: 'root',
    children: children,
    data: {}
  };
  var doc;
  node.data.quirksMode = ast.mode === 'quirks' || ast.mode === 'limited-quirks';

  if (config.file && config.location) {
    doc = String(config.file);
    node.position = {
      start: {
        line: 1,
        column: 1,
        offset: 0
      },
      end: {
        line: ccount_1(doc, '\n') + 1,
        column: doc.length - doc.lastIndexOf('\n'),
        offset: doc.length
      }
    };
  }

  return node;
} // Transform a doctype.


function doctype$1(ast) {
  return {
    type: 'doctype',
    name: ast.name || '',
    public: ast.publicId || null,
    system: ast.systemId || null
  };
} // Transform a text.


function text$4(ast) {
  return {
    type: 'text',
    value: ast.value
  };
} // Transform a comment.


function comment$1(ast) {
  return {
    type: 'comment',
    value: ast.data
  };
} // Transform an element.


function element$2(ast, children, config) {
  var fn = config.schema.space === 'svg' ? svg_1 : hastscript;
  var name = ast.tagName;
  var attributes = ast.attrs;
  var length = attributes.length;
  var props = {};
  var index = -1;
  var attribute;
  var prop;
  var node;
  var pos;
  var start;
  var end;

  while (++index < length) {
    attribute = attributes[index];
    prop = (attribute.prefix ? attribute.prefix + ':' : '') + attribute.name;
    props[prop] = attribute.value;
  }

  node = fn(name, props, children);

  if (name === 'template' && 'content' in ast) {
    pos = ast.sourceCodeLocation;
    start = pos && pos.startTag && position(pos.startTag).end;
    end = pos && pos.endTag && position(pos.endTag).start;
    node.content = transform$1(ast.content, config);

    if ((start || end) && config.file) {
      node.content.position = {
        start: start,
        end: end
      };
    }
  }

  return node;
} // Create clean positional information.


function location(node, location, config) {
  var schema = config.schema;
  var verbose = config.verbose;
  var pos = position(location);
  var reference;
  var attributes;
  var attribute;
  var props;
  var prop;

  if (node.type === 'element') {
    reference = node.children[node.children.length - 1]; // Bug for unclosed with children.
    // See: <https://github.com/inikulin/parse5/issues/109>.

    if (!location.endTag && reference && reference.position && reference.position.end) {
      pos.end = Object.assign({}, reference.position.end);
    }

    if (verbose) {
      attributes = location.attrs;
      props = {};

      for (attribute in attributes) {
        prop = find_1(schema, attribute).property;
        props[prop] = position(attributes[attribute]);
      }

      node.data = {
        position: {
          opening: position(location.startTag),
          closing: location.endTag ? position(location.endTag) : null,
          properties: props
        }
      };
    }
  }

  return pos;
}

function position(loc) {
  var start = point({
    line: loc.startLine,
    column: loc.startCol,
    offset: loc.startOffset
  });
  var end = point({
    line: loc.endLine,
    column: loc.endCol,
    offset: loc.endOffset
  });
  return start || end ? {
    start: start,
    end: end
  } : null;
}

function point(point) {
  return point.line && point.column ? point : null;
}

var classId = "classID";
var dataType = "datatype";
var itemId = "itemID";
var strokeDashArray = "strokeDasharray";
var strokeDashOffset = "strokeDashoffset";
var strokeLineCap = "strokeLinecap";
var strokeLineJoin = "strokeLinejoin";
var strokeMiterLimit = "strokeMiterlimit";
var typeOf = "typeof";
var xLinkActuate = "xlinkActuate";
var xLinkArcRole = "xlinkArcrole";
var xLinkHref = "xlinkHref";
var xLinkRole = "xlinkRole";
var xLinkShow = "xlinkShow";
var xLinkTitle = "xlinkTitle";
var xLinkType = "xlinkType";
var xmlnsXLink = "xmlnsXlink";
var hastToReact = {
	classId: classId,
	dataType: dataType,
	itemId: itemId,
	strokeDashArray: strokeDashArray,
	strokeDashOffset: strokeDashOffset,
	strokeLineCap: strokeLineCap,
	strokeLineJoin: strokeLineJoin,
	strokeMiterLimit: strokeMiterLimit,
	typeOf: typeOf,
	xLinkActuate: xLinkActuate,
	xLinkArcRole: xLinkArcRole,
	xLinkHref: xLinkHref,
	xLinkRole: xLinkRole,
	xLinkShow: xLinkShow,
	xLinkTitle: xLinkTitle,
	xLinkType: xLinkType,
	xmlnsXLink: xmlnsXLink
};

var convert_1 = convert;

function convert(test) {
  if (typeof test === 'string') {
    return typeFactory(test);
  }

  if (test === null || test === undefined) {
    return ok;
  }

  if (typeof test === 'object') {
    return ('length' in test ? anyFactory : matchesFactory)(test);
  }

  if (typeof test === 'function') {
    return test;
  }

  throw new Error('Expected function, string, or object as test');
}

function convertAll(tests) {
  var results = [];
  var length = tests.length;
  var index = -1;

  while (++index < length) {
    results[index] = convert(tests[index]);
  }

  return results;
} // Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.


function matchesFactory(test) {
  return matches;

  function matches(node) {
    var key;

    for (key in test) {
      if (node[key] !== test[key]) {
        return false;
      }
    }

    return true;
  }
}

function anyFactory(tests) {
  var checks = convertAll(tests);
  var length = checks.length;
  return matches;

  function matches() {
    var index = -1;

    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true;
      }
    }

    return false;
  }
} // Utility to convert a string into a function which checks a given node’s type
// for said string.


function typeFactory(test) {
  return type;

  function type(node) {
    return Boolean(node && node.type === test);
  }
} // Utility to return true.


function ok() {
  return true;
}

var root$3 = convert_1('root');
var element$1 = convert_1('element');
var text$3 = convert_1('text');
var dashes = /-([a-z])/g;
var hastToHyperscript = wrapper;

function wrapper(h, node, options) {
  var settings = options || {};
  var prefix;
  var r;
  var v;
  var vd;

  if (typeof h !== 'function') {
    throw new Error('h is not a function');
  }

  if (typeof settings === 'string' || typeof settings === 'boolean') {
    prefix = settings;
    settings = {};
  } else {
    prefix = settings.prefix;
  }

  r = react(h);
  v = vue(h);
  vd = vdom(h);

  if (prefix === null || prefix === undefined) {
    prefix = r === true || v === true || vd === true ? 'h-' : false;
  }

  if (root$3(node)) {
    if (node.children.length === 1 && element$1(node.children[0])) {
      node = node.children[0];
    } else {
      node = {
        type: 'element',
        tagName: 'div',
        properties: {},
        children: node.children
      };
    }
  } else if (!element$1(node)) {
    throw new Error('Expected root or element, not `' + (node && node.type || node) + '`');
  }

  return toH(h, node, {
    schema: settings.space === 'svg' ? svg_1$1 : html_1$2,
    prefix: prefix,
    key: 0,
    react: r,
    vue: v,
    vdom: vd,
    hyperscript: hyperscript(h)
  });
} // Transform a hast node through a hyperscript interface to *anything*!


function toH(h, node, ctx) {
  var parentSchema = ctx.schema;
  var schema = parentSchema;
  var name = node.tagName;
  var properties;
  var attributes;
  var children;
  var property;
  var elements;
  var length;
  var index;
  var value;
  var result;

  if (parentSchema.space === 'html' && name.toLowerCase() === 'svg') {
    schema = svg_1$1;
    ctx.schema = schema;
  }

  if (ctx.vdom === true && schema.space === 'html') {
    name = name.toUpperCase();
  }

  properties = node.properties;
  attributes = {};

  for (property in properties) {
    addAttribute(attributes, property, properties[property], ctx);
  }

  if (typeof attributes.style === 'string' && (ctx.vdom === true || ctx.vue === true || ctx.react === true)) {
    // VDOM, Vue, and React accept `style` as object.
    attributes.style = parseStyle(attributes.style, name);
  }

  if (ctx.prefix) {
    ctx.key++;
    attributes.key = ctx.prefix + ctx.key;
  }

  if (ctx.vdom && schema.space !== 'html') {
    attributes.namespace = ns[schema.space];
  }

  elements = [];
  children = node.children;
  length = children ? children.length : 0;
  index = -1;

  while (++index < length) {
    value = children[index];

    if (element$1(value)) {
      elements.push(toH(h, value, ctx));
    } else if (text$3(value)) {
      elements.push(value.value);
    }
  } // Ensure no React warnings are triggered for void elements having children
  // passed in.


  result = elements.length === 0 ? h.call(node, name, attributes) : h.call(node, name, attributes, elements); // Restore parent schema.

  ctx.schema = parentSchema;
  return result;
}

function addAttribute(props, prop, value, ctx) {
  var hyperlike = ctx.hyperscript || ctx.vdom || ctx.vue;
  var schema = ctx.schema;
  var info = find_1(schema, prop);
  var subprop; // Ignore nullish and `NaN` values.
  // Ignore `false` and falsey known booleans for hyperlike DSLs.

  if (value === null || value === undefined || value !== value || hyperlike && value === false || hyperlike && info.boolean && !value) {
    return;
  }

  if (value !== null && typeof value === 'object' && 'length' in value) {
    // Accept `array`.
    // Most props are space-separated.
    value = (info.commaSeparated ? commaSeparatedTokens : spaceSeparatedTokens).stringify(value);
  } // Treat `true` and truthy known booleans.


  if (info.boolean && ctx.hyperscript === true) {
    value = '';
  }

  if (ctx.vue) {
    if (prop !== 'style') {
      subprop = 'attrs';
    }
  } else if (!info.mustUseProperty) {
    if (ctx.vdom === true) {
      subprop = 'attributes';
    } else if (ctx.hyperscript === true) {
      subprop = 'attrs';
    }
  }

  if (subprop) {
    if (props[subprop] === undefined) {
      props[subprop] = {};
    }

    props[subprop][info.attribute] = value;
  } else if (ctx.react && info.space) {
    props[hastToReact[info.property] || info.property] = value;
  } else {
    props[info.attribute] = value;
  }
} // Check if `h` is `react.createElement`.


function react(h) {
  var node = h && h('div');
  return Boolean(node && ('_owner' in node || '_store' in node) && node.key === null);
} // Check if `h` is `hyperscript`.


function hyperscript(h) {
  return Boolean(h && h.context && h.cleanup);
} // Check if `h` is `virtual-dom/h`.


function vdom(h) {
  return h && h('div').type === 'VirtualNode';
}

function vue(h) {
  var node = h && h('div');
  return Boolean(node && node.context && node.context._isVue);
}

function parseStyle(value, tagName) {
  var result = {};

  try {
    style__default['default'](value, iterator);
  } catch (error) {
    error.message = tagName + '[style]' + error.message.slice('undefined'.length);
    throw error;
  }

  return result;

  function iterator(name, value) {
    result[styleCase(name)] = value;
  }
}

function styleCase(value) {
  if (value.slice(0, 4) === '-ms-') {
    value = 'ms-' + value.slice(4);
  }

  return value.replace(dashes, styleReplacer);
}

function styleReplacer($0, $1) {
  return $1.toUpperCase();
}

var zwitch = factory$1;
var noop$1 = Function.prototype;
var own$4 = {}.hasOwnProperty;
/* Handle values based on a property. */

function factory$1(key, options) {
  var settings = options || {};

  function one(value) {
    var fn = one.invalid;
    var handlers = one.handlers;

    if (value && own$4.call(value, key)) {
      fn = own$4.call(handlers, value[key]) ? handlers[value[key]] : one.unknown;
    }

    return (fn || noop$1).apply(this, arguments);
  }

  one.handlers = settings.handlers || {};
  one.invalid = settings.invalid;
  one.unknown = settings.unknown;
  return one;
}

var hastUtilToParse5 = transform;
var ignoredSpaces = ['svg', 'html'];
var one$2 = zwitch('type');
one$2.handlers.root = root$2;
one$2.handlers.element = element;
one$2.handlers.text = text$2;
one$2.handlers.comment = comment;
one$2.handlers.doctype = doctype; // Transform a tree from hast to Parse5’s AST.

function transform(tree, space) {
  return one$2(tree, space === 'svg' ? svg_1$1 : html_1$2);
}

function root$2(node, schema) {
  var data = node.data || {};
  var mode = data.quirksMode ? 'quirks' : 'no-quirks';
  return patch(node, {
    nodeName: '#document',
    mode: mode
  }, schema);
}

function fragment(node, schema) {
  return patch(node, {
    nodeName: '#document-fragment'
  }, schema);
}

function doctype(node, schema) {
  return patch(node, {
    nodeName: '#documentType',
    name: node.name,
    publicId: node.public || '',
    systemId: node.system || ''
  }, schema);
}

function text$2(node, schema) {
  return patch(node, {
    nodeName: '#text',
    value: node.value
  }, schema);
}

function comment(node, schema) {
  return patch(node, {
    nodeName: '#comment',
    data: node.value
  }, schema);
}

function element(node, schema) {
  var space = schema.space;
  var shallow = immutable(node, {
    children: []
  });
  return hastToHyperscript(h, shallow, {
    space: space
  });

  function h(name, attrs) {
    var values = [];
    var p5;
    var attr;
    var value;
    var key;
    var info;
    var pos;

    for (key in attrs) {
      info = find_1(schema, key);
      attr = attrs[key];

      if (attr === false || info.boolean && !attr) {
        continue;
      }

      value = {
        name: key,
        value: attr === true ? '' : String(attr)
      };

      if (info.space && ignoredSpaces.indexOf(info.space) === -1) {
        pos = key.indexOf(':');

        if (pos === -1) {
          value.prefix = '';
        } else {
          value.name = key.slice(pos + 1);
          value.prefix = key.slice(0, pos);
        }

        value.namespace = ns[info.space];
      }

      values.push(value);
    }

    p5 = patch(node, {
      nodeName: name,
      tagName: name,
      attrs: values
    }, schema);

    if (name === 'template') {
      p5.content = fragment(shallow.content, schema);
    }

    return p5;
  }
} // Patch specific properties.


function patch(node, p5, parentSchema) {
  var schema = parentSchema;
  var position = node.position;
  var children = node.children;
  var childNodes = [];
  var length = children ? children.length : 0;
  var index = -1;
  var child;

  if (node.type === 'element') {
    if (schema.space === 'html' && node.tagName === 'svg') {
      schema = svg_1$1;
    }

    p5.namespaceURI = ns[schema.space];
  }

  while (++index < length) {
    child = one$2(children[index], schema);
    child.parentNode = p5;
    childNodes[index] = child;
  }

  if (node.type === 'element' || node.type === 'root') {
    p5.childNodes = childNodes;
  }

  if (position && position.start && position.end) {
    p5.sourceCodeLocation = {
      startLine: position.start.line,
      startCol: position.start.column,
      startOffset: position.start.offset,
      endLine: position.end.line,
      endCol: position.end.column,
      endOffset: position.end.offset
    };
  }

  return p5;
}

var voids = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"menuitem",
	"meta",
	"nextid",
	"param",
	"source",
	"track",
	"wbr"
];

var hastUtilRaw = wrap$1;
var inTemplateMode = 'IN_TEMPLATE_MODE';
var dataState = 'DATA_STATE';
var characterToken = 'CHARACTER_TOKEN';
var startTagToken = 'START_TAG_TOKEN';
var endTagToken = 'END_TAG_TOKEN';
var commentToken = 'COMMENT_TOKEN';
var doctypeToken = 'DOCTYPE_TOKEN';
var parseOptions = {
  sourceCodeLocationInfo: true,
  scriptingEnabled: false
};

function wrap$1(tree, file) {
  var parser$1 = new parser(parseOptions);
  var one = zwitch('type');
  var tokenizer;
  var preprocessor;
  var posTracker;
  var locationTracker;
  var result;
  one.handlers.root = root;
  one.handlers.element = element;
  one.handlers.text = text;
  one.handlers.comment = comment;
  one.handlers.doctype = doctype;
  one.handlers.raw = raw;
  one.unknown = unknown$1;
  result = hastUtilFromParse5(documentMode(tree) ? document() : fragment(), file); // Unpack if possible and when not given a `root`.

  if (tree.type !== 'root' && result.children.length === 1) {
    return result.children[0];
  }

  return result;

  function fragment() {
    var context;
    var mock;
    var doc;
    context = {
      nodeName: 'template',
      tagName: 'template',
      attrs: [],
      namespaceURI: ns.html,
      childNodes: []
    };
    mock = {
      nodeName: 'documentmock',
      tagName: 'documentmock',
      attrs: [],
      namespaceURI: ns.html,
      childNodes: []
    };
    doc = {
      nodeName: '#document-fragment',
      childNodes: []
    };

    parser$1._bootstrap(mock, context);

    parser$1._pushTmplInsertionMode(inTemplateMode);

    parser$1._initTokenizerForFragmentParsing();

    parser$1._insertFakeRootElement();

    parser$1._resetInsertionMode();

    parser$1._findFormInFragmentContext();

    tokenizer = parser$1.tokenizer;
    preprocessor = tokenizer.preprocessor;
    locationTracker = tokenizer.__mixins[0];
    posTracker = locationTracker.posTracker;
    one(tree);

    parser$1._adoptNodes(mock.childNodes[0], doc);

    return doc;
  }

  function document() {
    var doc = parser$1.treeAdapter.createDocument();

    parser$1._bootstrap(doc, null);

    tokenizer = parser$1.tokenizer;
    preprocessor = tokenizer.preprocessor;
    locationTracker = tokenizer.__mixins[0];
    posTracker = locationTracker.posTracker;
    one(tree);
    return doc;
  }

  function all(nodes) {
    var length = 0;
    var index = -1;
    /* istanbul ignore else - invalid nodes, see rehypejs/rehype-raw#7. */

    if (nodes) {
      length = nodes.length;
    }

    while (++index < length) {
      one(nodes[index]);
    }
  }

  function root(node) {
    all(node.children);
  }

  function element(node) {
    var empty = voids.indexOf(node.tagName) !== -1;

    parser$1._processToken(startTag(node), ns.html);

    all(node.children);

    if (!empty) {
      parser$1._processToken(endTag(node)); // Put the parser back in the data state: some elements, like textareas
      // and iframes, change the state.
      // See <syntax-tree/hast-util-raw#7>.
      // See <https://github.com/inikulin/parse5/blob/2528196/packages/parse5/lib/tokenizer/index.js#L222>.


      tokenizer.state = dataState;
    }
  }

  function text(node) {
    parser$1._processToken({
      type: characterToken,
      chars: node.value,
      location: createParse5Location(node)
    });
  }

  function doctype(node) {
    var p5 = hastUtilToParse5(node);

    parser$1._processToken({
      type: doctypeToken,
      name: p5.name,
      forceQuirks: false,
      publicId: p5.publicId,
      systemId: p5.systemId,
      location: createParse5Location(node)
    });
  }

  function comment(node) {
    parser$1._processToken({
      type: commentToken,
      data: node.value,
      location: createParse5Location(node)
    });
  }

  function raw(node) {
    var start = unistUtilPosition.start(node);
    var token; // Reset preprocessor:
    // See: <https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/tokenizer/preprocessor.js>.

    preprocessor.html = null;
    preprocessor.endOfChunkHit = false;
    preprocessor.lastChunkWritten = false;
    preprocessor.lastCharPos = -1;
    preprocessor.pos = -1; // Reset preprocessor mixin:
    // See: <https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/extensions/position-tracking/preprocessor-mixin.js>.

    posTracker.droppedBufferSize = 0;
    posTracker.line = start.line;
    posTracker.col = 1;
    posTracker.offset = 0;
    posTracker.lineStartPos = -start.column + 1;
    posTracker.droppedBufferSize = start.offset; // Reset location tracker:
    // See: <https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/extensions/location-info/tokenizer-mixin.js>.

    locationTracker.currentAttrLocation = null;
    locationTracker.ctLoc = createParse5Location(node); // See the code for `parse` and `parseFragment`:
    // See: <https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/parser/index.js#L371>.

    tokenizer.write(node.value);

    parser$1._runParsingLoop(null); // Process final characters if they’re still there after hibernating.
    // Similar to:
    // See: <https://github.com/inikulin/parse5/blob/3bfa7d9/packages/parse5/lib/extensions/location-info/tokenizer-mixin.js#L95>.


    token = tokenizer.currentCharacterToken;

    if (token) {
      token.location.endLine = posTracker.line;
      token.location.endCol = posTracker.col + 1;
      token.location.endOffset = posTracker.offset + 1;

      parser$1._processToken(token);
    } // Reset tokenizer:
    // See: <https://github.com/inikulin/parse5/blob/8b0048e/packages/parse5/lib/tokenizer/index.js#L215>.


    tokenizer.currentToken = null;
    tokenizer.currentCharacterToken = null;
    tokenizer.currentAttr = null;
  }
}

function startTag(node) {
  var location = createParse5Location(node);
  location.startTag = immutable(location);
  return {
    type: startTagToken,
    tagName: node.tagName,
    selfClosing: false,
    attrs: attributes(node),
    location: location
  };
}

function attributes(node) {
  return hastUtilToParse5({
    tagName: node.tagName,
    type: 'element',
    properties: node.properties
  }).attrs;
}

function endTag(node) {
  var location = createParse5Location(node);
  location.endTag = immutable(location);
  return {
    type: endTagToken,
    tagName: node.tagName,
    attrs: [],
    location: location
  };
}

function unknown$1(node) {
  throw new Error('Cannot compile `' + node.type + '` node');
}

function documentMode(node) {
  var head = node.type === 'root' ? node.children[0] : node;
  return head && (head.type === 'doctype' || head.tagName === 'html');
}

function createParse5Location(node) {
  var start = unistUtilPosition.start(node);
  var end = unistUtilPosition.end(node);
  return {
    startLine: start.line,
    startCol: start.column,
    startOffset: start.offset,
    endLine: end.line,
    endCol: end.column,
    endOffset: end.offset
  };
}

var unistBuilder = u$1;

function u$1(type, props, value) {
  var node;

  if ((value === null || value === undefined) && (typeof props !== 'object' || Array.isArray(props))) {
    value = props;
    props = {};
  }

  node = Object.assign({
    type: String(type)
  }, props);

  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== null && value !== undefined) {
    node.value = String(value);
  }

  return node;
}

var unistUtilGenerated = generated;

function generated(node) {
  var position = optional(optional(node).position);
  var start = optional(position.start);
  var end = optional(position.end);
  return !start.line || !start.column || !end.line || !end.column;
}

function optional(value) {
  return value && typeof value === 'object' ? value : {};
}

var mdastUtilDefinitions = getDefinitionFactory;
var own$3 = {}.hasOwnProperty; // Get a definition in `node` by `identifier`.

function getDefinitionFactory(node, options) {
  return getterFactory(gather(node, options));
} // Gather all definitions in `node`


function gather(node, options) {
  var cache = {};

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node');
  }

  visit__default['default'](node, 'definition', options && options.commonmark ? commonmark : normal);
  return cache;

  function commonmark(definition) {
    var id = normalise(definition.identifier);

    if (!own$3.call(cache, id)) {
      cache[id] = definition;
    }
  }

  function normal(definition) {
    cache[normalise(definition.identifier)] = definition;
  }
} // Factory to get a node from the given definition-cache.


function getterFactory(cache) {
  return getter; // Get a node from the bound definition-cache.

  function getter(identifier) {
    var id = identifier && normalise(identifier);
    return id && own$3.call(cache, id) ? cache[id] : null;
  }
}

function normalise(identifier) {
  return identifier.toUpperCase();
}

var all_1 = all;



function all(h, parent) {
  var nodes = parent.children || [];
  var length = nodes.length;
  var values = [];
  var index = -1;
  var result;
  var head;

  while (++index < length) {
    result = one_1(h, nodes[index], parent);

    if (result) {
      if (index && nodes[index - 1].type === 'break') {
        if (result.value) {
          result.value = result.value.replace(/^\s+/, '');
        }

        head = result.children && result.children[0];

        if (head && head.value) {
          head.value = head.value.replace(/^\s+/, '');
        }
      }

      values = values.concat(result);
    }
  }

  return values;
}

var one_1 = one$1;





var own$2 = {}.hasOwnProperty; // Transform an unknown node.

function unknown(h, node) {
  if (text$1(node)) {
    return h.augment(node, unistBuilder('text', node.value));
  }

  return h(node, 'div', all_1(h, node));
} // Visit a node.


function one$1(h, node, parent) {
  var type = node && node.type;
  var fn = own$2.call(h.handlers, type) ? h.handlers[type] : h.unknownHandler; // Fail on non-nodes.

  if (!type) {
    throw new Error('Expected node, got `' + node + '`');
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent);
} // Check if the node should be renderered as a text node.


function text$1(node) {
  var data = node.data || {};

  if (own$2.call(data, 'hName') || own$2.call(data, 'hProperties') || own$2.call(data, 'hChildren')) {
    return false;
  }

  return 'value' in node;
}

var thematicBreak_1 = thematicBreak;

function thematicBreak(h, node) {
  return h(node, 'hr');
}

var wrap_1 = wrap;

 // Wrap `nodes` with line feeds between each entry.
// Optionally adds line feeds at the start and end.


function wrap(nodes, loose) {
  var result = [];
  var index = -1;
  var length = nodes.length;

  if (loose) {
    result.push(unistBuilder('text', '\n'));
  }

  while (++index < length) {
    if (index) {
      result.push(unistBuilder('text', '\n'));
    }

    result.push(nodes[index]);
  }

  if (loose && nodes.length !== 0) {
    result.push(unistBuilder('text', '\n'));
  }

  return result;
}

var list_1 = list;





function list(h, node) {
  var props = {};
  var name = node.ordered ? 'ol' : 'ul';
  var items;
  var index = -1;
  var length;

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start;
  }

  items = all_1(h, node);
  length = items.length; // Like GitHub, add a class for custom styling.

  while (++index < length) {
    if (items[index].properties.className && items[index].properties.className.indexOf('task-list-item') !== -1) {
      props.className = ['contains-task-list'];
      break;
    }
  }

  return h(node, name, props, wrap_1(items, true));
}

var footer = generateFootnotes;







function generateFootnotes(h) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var length = footnoteOrder.length;
  var index = -1;
  var listItems = [];
  var def;
  var backReference;
  var content;
  var tail;

  while (++index < length) {
    def = footnoteById[footnoteOrder[index].toUpperCase()];

    if (!def) {
      continue;
    }

    content = def.children.concat();
    tail = content[content.length - 1];
    backReference = {
      type: 'link',
      url: '#fnref-' + def.identifier,
      data: {
        hProperties: {
          className: ['footnote-backref']
        }
      },
      children: [{
        type: 'text',
        value: '↩'
      }]
    };

    if (!tail || tail.type !== 'paragraph') {
      tail = {
        type: 'paragraph',
        children: []
      };
      content.push(tail);
    }

    tail.children.push(backReference);
    listItems.push({
      type: 'listItem',
      data: {
        hProperties: {
          id: 'fn-' + def.identifier
        }
      },
      children: content,
      position: def.position
    });
  }

  if (listItems.length === 0) {
    return null;
  }

  return h(null, 'div', {
    className: ['footnotes']
  }, wrap_1([thematicBreak_1(h), list_1(h, {
    type: 'list',
    ordered: true,
    children: listItems
  })], true));
}

var blockquote_1 = blockquote;





function blockquote(h, node) {
  return h(node, 'blockquote', wrap_1(all_1(h, node), true));
}

var _break = hardBreak;



function hardBreak(h, node) {
  return [h(node, 'br'), unistBuilder('text', '\n')];
}

/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/**
 * Results cache
 */

var res = '';
var cache$1;
/**
 * Expose `repeat`
 */

var repeatString = repeat;
/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  } // cover common, quick use cases


  if (num === 1) return str;
  if (num === 2) return str + str;
  var max = str.length * num;

  if (cache$1 !== str || typeof cache$1 === 'undefined') {
    cache$1 = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}

var detab_1 = detab;



var tab = 0x09;
var lineFeed$2 = 0x0a;
var carriageReturn = 0x0d; // Replace tabs with spaces, being smart about which column the tab is at and
// which size should be used.

function detab(value, size) {
  var string = typeof value === 'string';
  var length = string && value.length;
  var start = 0;
  var index = -1;
  var column = -1;
  var tabSize = size || 4;
  var results = [];
  var code;
  var add;

  if (!string) {
    throw new Error('detab expected string');
  }

  while (++index < length) {
    code = value.charCodeAt(index);

    if (code === tab) {
      add = tabSize - (column + 1) % tabSize;
      column += add;
      results.push(value.slice(start, index) + repeatString(' ', add));
      start = index + 1;
    } else if (code === lineFeed$2 || code === carriageReturn) {
      column = -1;
    } else {
      column++;
    }
  }

  results.push(value.slice(start));
  return results.join('');
}

var code_1 = code;





function code(h, node) {
  var value = node.value ? detab_1(node.value + '\n') : '';
  var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  var props = {};

  if (lang) {
    props.className = ['language-' + lang];
  }

  return h(node.position, 'pre', [h(node, 'code', props, [unistBuilder('text', value)])]);
}

var _delete = strikethrough;



function strikethrough(h, node) {
  return h(node, 'del', all_1(h, node));
}

var emphasis_1 = emphasis;



function emphasis(h, node) {
  return h(node, 'em', all_1(h, node));
}

var footnoteReference_1 = footnoteReference;



function footnoteReference(h, node) {
  var footnoteOrder = h.footnoteOrder;
  var identifier = String(node.identifier);

  if (footnoteOrder.indexOf(identifier) === -1) {
    footnoteOrder.push(identifier);
  }

  return h(node.position, 'sup', {
    id: 'fnref-' + identifier
  }, [h(node, 'a', {
    href: '#fn-' + identifier,
    className: ['footnote-ref']
  }, [unistBuilder('text', node.label || identifier)])]);
}

var footnote_1 = footnote;



function footnote(h, node) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var identifier = 1;

  while (identifier in footnoteById) {
    identifier++;
  }

  identifier = String(identifier); // No need to check if `identifier` exists in `footnoteOrder`, it’s guaranteed
  // to not exist because we just generated it.

  footnoteOrder.push(identifier);
  footnoteById[identifier] = {
    type: 'footnoteDefinition',
    identifier: identifier,
    children: [{
      type: 'paragraph',
      children: node.children
    }],
    position: node.position
  };
  return footnoteReference_1(h, {
    type: 'footnoteReference',
    identifier: identifier,
    position: node.position
  });
}

var heading_1 = heading;



function heading(h, node) {
  return h(node, 'h' + node.depth, all_1(h, node));
}

var html_1 = html;

 // Return either a `raw` node in dangerous mode, otherwise nothing.


function html(h, node) {
  return h.dangerous ? h.augment(node, unistBuilder('raw', node.value)) : null;
}

var encodeCache = {}; // Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//

function getEncodeCache(exclude) {
  var i,
      ch,
      cache = encodeCache[exclude];

  if (cache) {
    return cache;
  }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
} // Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//


function encode$1(string, exclude, keepEscaped) {
  var i,
      l,
      code,
      nextCode,
      cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped = exclude;
    exclude = encode$1.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25
    /* % */
    && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);

        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }

      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode$1.componentChars = "-_.!~*'()";
var encode_1 = encode$1;

var revert_1 = revert;



 // Return the content of a reference without definition as Markdown.


function revert(h, node) {
  var subtype = node.referenceType;
  var suffix = ']';
  var contents;
  var head;
  var tail;

  if (subtype === 'collapsed') {
    suffix += '[]';
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']';
  }

  if (node.type === 'imageReference') {
    return unistBuilder('text', '![' + node.alt + suffix);
  }

  contents = all_1(h, node);
  head = contents[0];

  if (head && head.type === 'text') {
    head.value = '[' + head.value;
  } else {
    contents.unshift(unistBuilder('text', '['));
  }

  tail = contents[contents.length - 1];

  if (tail && tail.type === 'text') {
    tail.value += suffix;
  } else {
    contents.push(unistBuilder('text', suffix));
  }

  return contents;
}

var imageReference_1 = imageReference;





function imageReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node);
  }

  props = {
    src: encode_1(def.url || ''),
    alt: node.alt
  };

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'img', props);
}

var image_1 = image$1;

function image$1(h, node) {
  var props = {
    src: encode_1(node.url),
    alt: node.alt
  };

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'img', props);
}

var collapseWhiteSpace = collapse; // `collapse(' \t\nbar \nbaz\t') // ' bar baz '`

function collapse(value) {
  return String(value).replace(/\s+/g, ' ');
}

var inlineCode_1 = inlineCode;





function inlineCode(h, node) {
  return h(node, 'code', [unistBuilder('text', collapseWhiteSpace(node.value))]);
}

var linkReference_1 = linkReference;







function linkReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node);
  }

  props = {
    href: encode_1(def.url || '')
  };

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'a', props, all_1(h, node));
}

var link_1 = link;

function link(h, node) {
  var props = {
    href: encode_1(node.url)
  };

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'a', props, all_1(h, node));
}

var listItem_1 = listItem;







function listItem(h, node, parent) {
  var children = node.children;
  var head = children[0];
  var raw = all_1(h, node);
  var loose = parent ? listLoose(parent) : listItemLoose(node);
  var props = {};
  var result;
  var container;
  var index;
  var length;
  var child; // Tight lists should not render `paragraph` nodes as `p` elements.

  if (loose) {
    result = raw;
  } else {
    result = [];
    length = raw.length;
    index = -1;

    while (++index < length) {
      child = raw[index];

      if (child.tagName === 'p') {
        result = result.concat(child.children);
      } else {
        result.push(child);
      }
    }
  }

  if (typeof node.checked === 'boolean') {
    if (loose && (!head || head.type !== 'paragraph')) {
      result.unshift(h(null, 'p', []));
    }

    container = loose ? result[0].children : result;

    if (container.length !== 0) {
      container.unshift(unistBuilder('text', ' '));
    }

    container.unshift(h(null, 'input', {
      type: 'checkbox',
      checked: node.checked,
      disabled: true
    })); // According to github-markdown-css, this class hides bullet.
    // See: <https://github.com/sindresorhus/github-markdown-css>.

    props.className = ['task-list-item'];
  }

  if (loose && result.length !== 0) {
    result = wrap_1(result, true);
  }

  return h(node, 'li', props, result);
}

function listLoose(node) {
  var loose = node.spread;
  var children = node.children;
  var length = children.length;
  var index = -1;

  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }

  return loose;
}

function listItemLoose(node) {
  var spread = node.spread;
  return spread === undefined || spread === null ? node.children.length > 1 : spread;
}

var paragraph_1 = paragraph;



function paragraph(h, node) {
  return h(node, 'p', all_1(h, node));
}

var root_1 = root$1;







function root$1(h, node) {
  return h.augment(node, unistBuilder('root', wrap_1(all_1(h, node))));
}

var strong_1 = strong;



function strong(h, node) {
  return h(node, 'strong', all_1(h, node));
}

var table_1 = table;







function table(h, node) {
  var rows = node.children;
  var index = rows.length;
  var align = node.align;
  var alignLength = align.length;
  var result = [];
  var pos;
  var row;
  var out;
  var name;
  var cell;

  while (index--) {
    row = rows[index].children;
    name = index === 0 ? 'th' : 'td';
    pos = alignLength;
    out = [];

    while (pos--) {
      cell = row[pos];
      out[pos] = h(cell, name, {
        align: align[pos]
      }, cell ? all_1(h, cell) : []);
    }

    result[index] = h(rows[index], 'tr', wrap_1(out, true));
  }

  return h(node, 'table', wrap_1([h(result[0].position, 'thead', wrap_1([result[0]], true)), h({
    start: unistUtilPosition.start(result[1]),
    end: unistUtilPosition.end(result[result.length - 1])
  }, 'tbody', wrap_1(result.slice(1), true))], true));
}

var trimLines_1 = trimLines;
var ws = /[ \t]*\n+[ \t]*/g;
var newline = '\n';

function trimLines(value) {
  return String(value).replace(ws, newline);
}

var text_1 = text;





function text(h, node) {
  return h.augment(node, unistBuilder('text', trimLines_1(node.value)));
}

var handlers = {
  blockquote: blockquote_1,
  break: _break,
  code: code_1,
  delete: _delete,
  emphasis: emphasis_1,
  footnoteReference: footnoteReference_1,
  footnote: footnote_1,
  heading: heading_1,
  html: html_1,
  imageReference: imageReference_1,
  image: image_1,
  inlineCode: inlineCode_1,
  linkReference: linkReference_1,
  link: link_1,
  listItem: listItem_1,
  list: list_1,
  paragraph: paragraph_1,
  root: root_1,
  strong: strong_1,
  table: table_1,
  text: text_1,
  thematicBreak: thematicBreak_1,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
}; // Return nothing for nodes that are ignored.

function ignore() {
  return null;
}

var lib$2 = toHast;

















var own$1 = {}.hasOwnProperty;
var deprecationWarningIssued = false; // Factory to transform.

function factory(tree, options) {
  var settings = options || {}; // Issue a warning if the deprecated tag 'allowDangerousHTML' is used

  if (settings.allowDangerousHTML !== undefined && !deprecationWarningIssued) {
    deprecationWarningIssued = true;
    console.warn('mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead');
  }

  var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML;
  var footnoteById = {};
  h.dangerous = dangerous;
  h.definition = mdastUtilDefinitions(tree, settings);
  h.footnoteById = footnoteById;
  h.footnoteOrder = [];
  h.augment = augment;
  h.handlers = Object.assign({}, handlers, settings.handlers);
  h.unknownHandler = settings.unknownHandler;
  visit__default['default'](tree, 'footnoteDefinition', onfootnotedefinition);
  return h; // Finalise the created `right`, a hast node, from `left`, an mdast node.

  function augment(left, right) {
    var data;
    var ctx; // Handle `data.hName`, `data.hProperties, `data.hChildren`.

    if (left && 'data' in left) {
      data = left.data;

      if (right.type === 'element' && data.hName) {
        right.tagName = data.hName;
      }

      if (right.type === 'element' && data.hProperties) {
        right.properties = Object.assign({}, right.properties, data.hProperties);
      }

      if (right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }

    ctx = left && left.position ? left : {
      position: left
    };

    if (!unistUtilGenerated(ctx)) {
      right.position = {
        start: unistUtilPosition.start(ctx),
        end: unistUtilPosition.end(ctx)
      };
    }

    return right;
  } // Create an element for `node`.


  function h(node, tagName, props, children) {
    if ((children === undefined || children === null) && typeof props === 'object' && 'length' in props) {
      children = props;
      props = {};
    }

    return augment(node, {
      type: 'element',
      tagName: tagName,
      properties: props || {},
      children: children || []
    });
  }

  function onfootnotedefinition(definition) {
    var id = String(definition.identifier).toUpperCase(); // Mimick CM behavior of link definitions.
    // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8d48e57/index.js#L26>.

    if (!own$1.call(footnoteById, id)) {
      footnoteById[id] = definition;
    }
  }
} // Transform `tree`, which is an mdast node, to a hast node.


function toHast(tree, options) {
  var h = factory(tree, options);
  var node = one_1(h, tree);
  var foot = footer(h);

  if (foot) {
    node.children = node.children.concat(unistBuilder('text', '\n'), foot);
  }

  return node;
}

var mdastUtilToHast = lib$2;

function mdxAstToMdxHast() {
  return (tree, _file) => {
    const handlers = {
      // `inlineCode` gets passed as `code` by the HAST transform.
      // This makes sure it ends up being `inlineCode`
      inlineCode(h, node) {
        return Object.assign({}, node, {
          type: 'element',
          tagName: 'inlineCode',
          properties: {},
          children: [{
            type: 'text',
            value: node.value
          }]
        });
      },

      code(h, node) {
        const value = node.value ? detab_1(node.value + '\n') : '';
        const lang = node.lang;
        const props = {};

        if (lang) {
          props.className = ['language-' + lang];
        } // MDAST sets `node.meta` to `null` instead of `undefined` if
        // not present, which React doesn't like.


        props.metastring = node.meta || undefined;
        const meta = node.meta && node.meta.split(' ').reduce((acc, cur) => {
          if (cur.split('=').length > 1) {
            const t = cur.split('=');
            acc[t[0]] = t[1];
            return acc;
          }

          acc[cur] = true;
          return acc;
        }, {});

        if (meta) {
          Object.keys(meta).forEach(key => {
            const isClassKey = key === 'class' || key === 'className';

            if (props.className && isClassKey) {
              props.className.push(meta[key]);
            } else {
              props[key] = meta[key];
            }
          });
        }

        return h(node.position, 'pre', [h(node, 'code', props, [unistBuilder('text', value)])]);
      },

      // To do: rename to `mdxJsImport`
      import(h, node) {
        return Object.assign({}, node, {
          type: 'import'
        });
      },

      // To do: rename to `mdxJsExport`
      export(h, node) {
        return Object.assign({}, node, {
          type: 'export'
        });
      },

      mdxBlockElement(h, node) {
        return Object.assign({}, node, {
          children: all_1(h, node)
        });
      },

      mdxSpanElement(h, node) {
        return Object.assign({}, node, {
          children: all_1(h, node)
        });
      },

      mdxBlockExpression(h, node) {
        return Object.assign({}, node, {
          type: 'mdxBlockExpression'
        });
      },

      mdxSpanExpression(h, node) {
        return Object.assign({}, node, {
          type: 'mdxSpanExpression'
        });
      }

    };
    const hast = mdastUtilToHast(tree, {
      handlers
    });
    return hast;
  };
}

var mdxAstToMdxHast_1 = mdxAstToMdxHast;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof entry.commonjsGlobal == 'object' && entry.commonjsGlobal && entry.commonjsGlobal.Object === Object && entry.commonjsGlobal;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */


function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }

  return false;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }

  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */


function baseIsNaN(value) {
  return value !== value;
}
/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function cacheHas(cache, key) {
  return cache.has(key);
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */


function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */


function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var splice = arrayProto.splice;
/* Built-in method references that are verified to be native. */

var Map$1 = getNative(root, 'Map'),
    Set$1 = getNative(root, 'Set'),
    nativeCreate = getNative(Object, 'create');
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map$1 || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */


function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */


function setCacheHas(value) {
  return this.__data__.has(value);
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */


function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);

    if (set) {
      return setToArray(set);
    }

    isCommon = false;
    includes = cacheHas;
    seen = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer: while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;
    value = comparator || value !== 0 ? value : 0;

    if (isCommon && computed === computed) {
      var seenIndex = seen.length;

      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }

      if (iteratee) {
        seen.push(computed);
      }

      result.push(value);
    } else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }

      result.push(value);
    }
  }

  return result;
}
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */


var createSet = !(Set$1 && 1 / setToArray(new Set$1([, -0]))[1] == INFINITY) ? noop : function (values) {
  return new Set$1(values);
};
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */


function uniq(array) {
  return array && array.length ? baseUniq(array) : [];
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */


function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */


function noop() {// No operation performed.
}

var lodash_uniq = uniq;

var nbsp$1 = " ";
var iexcl$1 = "¡";
var cent$1 = "¢";
var pound$1 = "£";
var curren$1 = "¤";
var yen$1 = "¥";
var brvbar$1 = "¦";
var sect$1 = "§";
var uml$1 = "¨";
var copy$1 = "©";
var ordf$1 = "ª";
var laquo$1 = "«";
var not$1 = "¬";
var shy$1 = "­";
var reg$1 = "®";
var macr$1 = "¯";
var deg$1 = "°";
var plusmn$1 = "±";
var sup2$1 = "²";
var sup3$1 = "³";
var acute$1 = "´";
var micro$1 = "µ";
var para$1 = "¶";
var middot$1 = "·";
var cedil$1 = "¸";
var sup1$1 = "¹";
var ordm$1 = "º";
var raquo$1 = "»";
var frac14$1 = "¼";
var frac12$1 = "½";
var frac34$1 = "¾";
var iquest$1 = "¿";
var Agrave$1 = "À";
var Aacute$1 = "Á";
var Acirc$1 = "Â";
var Atilde$1 = "Ã";
var Auml$1 = "Ä";
var Aring$1 = "Å";
var AElig$1 = "Æ";
var Ccedil$1 = "Ç";
var Egrave$1 = "È";
var Eacute$1 = "É";
var Ecirc$1 = "Ê";
var Euml$1 = "Ë";
var Igrave$1 = "Ì";
var Iacute$1 = "Í";
var Icirc$1 = "Î";
var Iuml$1 = "Ï";
var ETH$1 = "Ð";
var Ntilde$1 = "Ñ";
var Ograve$1 = "Ò";
var Oacute$1 = "Ó";
var Ocirc$1 = "Ô";
var Otilde$1 = "Õ";
var Ouml$1 = "Ö";
var times$1 = "×";
var Oslash$1 = "Ø";
var Ugrave$1 = "Ù";
var Uacute$1 = "Ú";
var Ucirc$1 = "Û";
var Uuml$1 = "Ü";
var Yacute$1 = "Ý";
var THORN$1 = "Þ";
var szlig$1 = "ß";
var agrave$1 = "à";
var aacute$1 = "á";
var acirc$1 = "â";
var atilde$1 = "ã";
var auml$1 = "ä";
var aring$1 = "å";
var aelig$1 = "æ";
var ccedil$1 = "ç";
var egrave$1 = "è";
var eacute$1 = "é";
var ecirc$1 = "ê";
var euml$1 = "ë";
var igrave$1 = "ì";
var iacute$1 = "í";
var icirc$1 = "î";
var iuml$1 = "ï";
var eth$1 = "ð";
var ntilde$1 = "ñ";
var ograve$1 = "ò";
var oacute$1 = "ó";
var ocirc$1 = "ô";
var otilde$1 = "õ";
var ouml$1 = "ö";
var divide$1 = "÷";
var oslash$1 = "ø";
var ugrave$1 = "ù";
var uacute$1 = "ú";
var ucirc$1 = "û";
var uuml$1 = "ü";
var yacute$1 = "ý";
var thorn$1 = "þ";
var yuml$1 = "ÿ";
var fnof = "ƒ";
var Alpha = "Α";
var Beta = "Β";
var Gamma = "Γ";
var Delta = "Δ";
var Epsilon = "Ε";
var Zeta = "Ζ";
var Eta = "Η";
var Theta = "Θ";
var Iota = "Ι";
var Kappa = "Κ";
var Lambda = "Λ";
var Mu = "Μ";
var Nu = "Ν";
var Xi = "Ξ";
var Omicron = "Ο";
var Pi = "Π";
var Rho = "Ρ";
var Sigma = "Σ";
var Tau = "Τ";
var Upsilon = "Υ";
var Phi = "Φ";
var Chi = "Χ";
var Psi = "Ψ";
var Omega = "Ω";
var alpha = "α";
var beta = "β";
var gamma = "γ";
var delta = "δ";
var epsilon = "ε";
var zeta = "ζ";
var eta = "η";
var theta = "θ";
var iota = "ι";
var kappa = "κ";
var lambda = "λ";
var mu = "μ";
var nu = "ν";
var xi = "ξ";
var omicron = "ο";
var pi = "π";
var rho = "ρ";
var sigmaf = "ς";
var sigma = "σ";
var tau = "τ";
var upsilon = "υ";
var phi = "φ";
var chi = "χ";
var psi = "ψ";
var omega = "ω";
var thetasym = "ϑ";
var upsih = "ϒ";
var piv = "ϖ";
var bull = "•";
var hellip = "…";
var prime = "′";
var Prime = "″";
var oline = "‾";
var frasl = "⁄";
var weierp = "℘";
var image = "ℑ";
var real = "ℜ";
var trade = "™";
var alefsym = "ℵ";
var larr = "←";
var uarr = "↑";
var rarr = "→";
var darr = "↓";
var harr = "↔";
var crarr = "↵";
var lArr = "⇐";
var uArr = "⇑";
var rArr = "⇒";
var dArr = "⇓";
var hArr = "⇔";
var forall = "∀";
var part = "∂";
var exist = "∃";
var empty = "∅";
var nabla = "∇";
var isin = "∈";
var notin = "∉";
var ni = "∋";
var prod = "∏";
var sum = "∑";
var minus = "−";
var lowast = "∗";
var radic = "√";
var prop = "∝";
var infin = "∞";
var ang = "∠";
var and = "∧";
var or = "∨";
var cap = "∩";
var cup = "∪";
var int = "∫";
var there4 = "∴";
var sim = "∼";
var cong = "≅";
var asymp = "≈";
var ne = "≠";
var equiv = "≡";
var le = "≤";
var ge = "≥";
var sub = "⊂";
var sup = "⊃";
var nsub = "⊄";
var sube = "⊆";
var supe = "⊇";
var oplus = "⊕";
var otimes = "⊗";
var perp = "⊥";
var sdot = "⋅";
var lceil = "⌈";
var rceil = "⌉";
var lfloor = "⌊";
var rfloor = "⌋";
var lang = "〈";
var rang = "〉";
var loz = "◊";
var spades = "♠";
var clubs = "♣";
var hearts = "♥";
var diams = "♦";
var quot$1 = "\"";
var amp$1 = "&";
var lt$1 = "<";
var gt$1 = ">";
var OElig = "Œ";
var oelig = "œ";
var Scaron = "Š";
var scaron = "š";
var Yuml = "Ÿ";
var circ = "ˆ";
var tilde = "˜";
var ensp = " ";
var emsp = " ";
var thinsp = " ";
var zwnj = "‌";
var zwj = "‍";
var lrm = "‎";
var rlm = "‏";
var ndash = "–";
var mdash = "—";
var lsquo = "‘";
var rsquo = "’";
var sbquo = "‚";
var ldquo = "“";
var rdquo = "”";
var bdquo = "„";
var dagger = "†";
var Dagger = "‡";
var permil = "‰";
var lsaquo = "‹";
var rsaquo = "›";
var euro = "€";
var entities = {
	nbsp: nbsp$1,
	iexcl: iexcl$1,
	cent: cent$1,
	pound: pound$1,
	curren: curren$1,
	yen: yen$1,
	brvbar: brvbar$1,
	sect: sect$1,
	uml: uml$1,
	copy: copy$1,
	ordf: ordf$1,
	laquo: laquo$1,
	not: not$1,
	shy: shy$1,
	reg: reg$1,
	macr: macr$1,
	deg: deg$1,
	plusmn: plusmn$1,
	sup2: sup2$1,
	sup3: sup3$1,
	acute: acute$1,
	micro: micro$1,
	para: para$1,
	middot: middot$1,
	cedil: cedil$1,
	sup1: sup1$1,
	ordm: ordm$1,
	raquo: raquo$1,
	frac14: frac14$1,
	frac12: frac12$1,
	frac34: frac34$1,
	iquest: iquest$1,
	Agrave: Agrave$1,
	Aacute: Aacute$1,
	Acirc: Acirc$1,
	Atilde: Atilde$1,
	Auml: Auml$1,
	Aring: Aring$1,
	AElig: AElig$1,
	Ccedil: Ccedil$1,
	Egrave: Egrave$1,
	Eacute: Eacute$1,
	Ecirc: Ecirc$1,
	Euml: Euml$1,
	Igrave: Igrave$1,
	Iacute: Iacute$1,
	Icirc: Icirc$1,
	Iuml: Iuml$1,
	ETH: ETH$1,
	Ntilde: Ntilde$1,
	Ograve: Ograve$1,
	Oacute: Oacute$1,
	Ocirc: Ocirc$1,
	Otilde: Otilde$1,
	Ouml: Ouml$1,
	times: times$1,
	Oslash: Oslash$1,
	Ugrave: Ugrave$1,
	Uacute: Uacute$1,
	Ucirc: Ucirc$1,
	Uuml: Uuml$1,
	Yacute: Yacute$1,
	THORN: THORN$1,
	szlig: szlig$1,
	agrave: agrave$1,
	aacute: aacute$1,
	acirc: acirc$1,
	atilde: atilde$1,
	auml: auml$1,
	aring: aring$1,
	aelig: aelig$1,
	ccedil: ccedil$1,
	egrave: egrave$1,
	eacute: eacute$1,
	ecirc: ecirc$1,
	euml: euml$1,
	igrave: igrave$1,
	iacute: iacute$1,
	icirc: icirc$1,
	iuml: iuml$1,
	eth: eth$1,
	ntilde: ntilde$1,
	ograve: ograve$1,
	oacute: oacute$1,
	ocirc: ocirc$1,
	otilde: otilde$1,
	ouml: ouml$1,
	divide: divide$1,
	oslash: oslash$1,
	ugrave: ugrave$1,
	uacute: uacute$1,
	ucirc: ucirc$1,
	uuml: uuml$1,
	yacute: yacute$1,
	thorn: thorn$1,
	yuml: yuml$1,
	fnof: fnof,
	Alpha: Alpha,
	Beta: Beta,
	Gamma: Gamma,
	Delta: Delta,
	Epsilon: Epsilon,
	Zeta: Zeta,
	Eta: Eta,
	Theta: Theta,
	Iota: Iota,
	Kappa: Kappa,
	Lambda: Lambda,
	Mu: Mu,
	Nu: Nu,
	Xi: Xi,
	Omicron: Omicron,
	Pi: Pi,
	Rho: Rho,
	Sigma: Sigma,
	Tau: Tau,
	Upsilon: Upsilon,
	Phi: Phi,
	Chi: Chi,
	Psi: Psi,
	Omega: Omega,
	alpha: alpha,
	beta: beta,
	gamma: gamma,
	delta: delta,
	epsilon: epsilon,
	zeta: zeta,
	eta: eta,
	theta: theta,
	iota: iota,
	kappa: kappa,
	lambda: lambda,
	mu: mu,
	nu: nu,
	xi: xi,
	omicron: omicron,
	pi: pi,
	rho: rho,
	sigmaf: sigmaf,
	sigma: sigma,
	tau: tau,
	upsilon: upsilon,
	phi: phi,
	chi: chi,
	psi: psi,
	omega: omega,
	thetasym: thetasym,
	upsih: upsih,
	piv: piv,
	bull: bull,
	hellip: hellip,
	prime: prime,
	Prime: Prime,
	oline: oline,
	frasl: frasl,
	weierp: weierp,
	image: image,
	real: real,
	trade: trade,
	alefsym: alefsym,
	larr: larr,
	uarr: uarr,
	rarr: rarr,
	darr: darr,
	harr: harr,
	crarr: crarr,
	lArr: lArr,
	uArr: uArr,
	rArr: rArr,
	dArr: dArr,
	hArr: hArr,
	forall: forall,
	part: part,
	exist: exist,
	empty: empty,
	nabla: nabla,
	isin: isin,
	notin: notin,
	ni: ni,
	prod: prod,
	sum: sum,
	minus: minus,
	lowast: lowast,
	radic: radic,
	prop: prop,
	infin: infin,
	ang: ang,
	and: and,
	or: or,
	cap: cap,
	cup: cup,
	int: int,
	there4: there4,
	sim: sim,
	cong: cong,
	asymp: asymp,
	ne: ne,
	equiv: equiv,
	le: le,
	ge: ge,
	sub: sub,
	sup: sup,
	nsub: nsub,
	sube: sube,
	supe: supe,
	oplus: oplus,
	otimes: otimes,
	perp: perp,
	sdot: sdot,
	lceil: lceil,
	rceil: rceil,
	lfloor: lfloor,
	rfloor: rfloor,
	lang: lang,
	rang: rang,
	loz: loz,
	spades: spades,
	clubs: clubs,
	hearts: hearts,
	diams: diams,
	quot: quot$1,
	amp: amp$1,
	lt: lt$1,
	gt: gt$1,
	OElig: OElig,
	oelig: oelig,
	Scaron: Scaron,
	scaron: scaron,
	Yuml: Yuml,
	circ: circ,
	tilde: tilde,
	ensp: ensp,
	emsp: emsp,
	thinsp: thinsp,
	zwnj: zwnj,
	zwj: zwj,
	lrm: lrm,
	rlm: rlm,
	ndash: ndash,
	mdash: mdash,
	lsquo: lsquo,
	rsquo: rsquo,
	sbquo: sbquo,
	ldquo: ldquo,
	rdquo: rdquo,
	bdquo: bdquo,
	dagger: dagger,
	Dagger: Dagger,
	permil: permil,
	lsaquo: lsaquo,
	rsaquo: rsaquo,
	euro: euro
};

var AElig = "Æ";
var AMP = "&";
var Aacute = "Á";
var Acirc = "Â";
var Agrave = "À";
var Aring = "Å";
var Atilde = "Ã";
var Auml = "Ä";
var COPY = "©";
var Ccedil = "Ç";
var ETH = "Ð";
var Eacute = "É";
var Ecirc = "Ê";
var Egrave = "È";
var Euml = "Ë";
var GT = ">";
var Iacute = "Í";
var Icirc = "Î";
var Igrave = "Ì";
var Iuml = "Ï";
var LT = "<";
var Ntilde = "Ñ";
var Oacute = "Ó";
var Ocirc = "Ô";
var Ograve = "Ò";
var Oslash = "Ø";
var Otilde = "Õ";
var Ouml = "Ö";
var QUOT = "\"";
var REG = "®";
var THORN = "Þ";
var Uacute = "Ú";
var Ucirc = "Û";
var Ugrave = "Ù";
var Uuml = "Ü";
var Yacute = "Ý";
var aacute = "á";
var acirc = "â";
var acute = "´";
var aelig = "æ";
var agrave = "à";
var amp = "&";
var aring = "å";
var atilde = "ã";
var auml = "ä";
var brvbar = "¦";
var ccedil = "ç";
var cedil = "¸";
var cent = "¢";
var copy = "©";
var curren = "¤";
var deg = "°";
var divide = "÷";
var eacute = "é";
var ecirc = "ê";
var egrave = "è";
var eth = "ð";
var euml = "ë";
var frac12 = "½";
var frac14 = "¼";
var frac34 = "¾";
var gt = ">";
var iacute = "í";
var icirc = "î";
var iexcl = "¡";
var igrave = "ì";
var iquest = "¿";
var iuml = "ï";
var laquo = "«";
var lt = "<";
var macr = "¯";
var micro = "µ";
var middot = "·";
var nbsp = " ";
var not = "¬";
var ntilde = "ñ";
var oacute = "ó";
var ocirc = "ô";
var ograve = "ò";
var ordf = "ª";
var ordm = "º";
var oslash = "ø";
var otilde = "õ";
var ouml = "ö";
var para = "¶";
var plusmn = "±";
var pound = "£";
var quot = "\"";
var raquo = "»";
var reg = "®";
var sect = "§";
var shy = "­";
var sup1 = "¹";
var sup2 = "²";
var sup3 = "³";
var szlig = "ß";
var thorn = "þ";
var times = "×";
var uacute = "ú";
var ucirc = "û";
var ugrave = "ù";
var uml = "¨";
var uuml = "ü";
var yacute = "ý";
var yen = "¥";
var yuml = "ÿ";
var legacy = {
	AElig: AElig,
	AMP: AMP,
	Aacute: Aacute,
	Acirc: Acirc,
	Agrave: Agrave,
	Aring: Aring,
	Atilde: Atilde,
	Auml: Auml,
	COPY: COPY,
	Ccedil: Ccedil,
	ETH: ETH,
	Eacute: Eacute,
	Ecirc: Ecirc,
	Egrave: Egrave,
	Euml: Euml,
	GT: GT,
	Iacute: Iacute,
	Icirc: Icirc,
	Igrave: Igrave,
	Iuml: Iuml,
	LT: LT,
	Ntilde: Ntilde,
	Oacute: Oacute,
	Ocirc: Ocirc,
	Ograve: Ograve,
	Oslash: Oslash,
	Otilde: Otilde,
	Ouml: Ouml,
	QUOT: QUOT,
	REG: REG,
	THORN: THORN,
	Uacute: Uacute,
	Ucirc: Ucirc,
	Ugrave: Ugrave,
	Uuml: Uuml,
	Yacute: Yacute,
	aacute: aacute,
	acirc: acirc,
	acute: acute,
	aelig: aelig,
	agrave: agrave,
	amp: amp,
	aring: aring,
	atilde: atilde,
	auml: auml,
	brvbar: brvbar,
	ccedil: ccedil,
	cedil: cedil,
	cent: cent,
	copy: copy,
	curren: curren,
	deg: deg,
	divide: divide,
	eacute: eacute,
	ecirc: ecirc,
	egrave: egrave,
	eth: eth,
	euml: euml,
	frac12: frac12,
	frac14: frac14,
	frac34: frac34,
	gt: gt,
	iacute: iacute,
	icirc: icirc,
	iexcl: iexcl,
	igrave: igrave,
	iquest: iquest,
	iuml: iuml,
	laquo: laquo,
	lt: lt,
	macr: macr,
	micro: micro,
	middot: middot,
	nbsp: nbsp,
	not: not,
	ntilde: ntilde,
	oacute: oacute,
	ocirc: ocirc,
	ograve: ograve,
	ordf: ordf,
	ordm: ordm,
	oslash: oslash,
	otilde: otilde,
	ouml: ouml,
	para: para,
	plusmn: plusmn,
	pound: pound,
	quot: quot,
	raquo: raquo,
	reg: reg,
	sect: sect,
	shy: shy,
	sup1: sup1,
	sup2: sup2,
	sup3: sup3,
	szlig: szlig,
	thorn: thorn,
	times: times,
	uacute: uacute,
	ucirc: ucirc,
	ugrave: ugrave,
	uml: uml,
	uuml: uuml,
	yacute: yacute,
	yen: yen,
	yuml: yuml
};

var isHexadecimal = hexadecimal;
/* Check if the given character code, or the character
 * code at the first character, is hexadecimal. */

function hexadecimal(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 97
  /* a */
  && code <= 102 || code >= 65
  /* A */
  && code <= 70
  /* Z */
  || code >= 48
  /* A */
  && code <= 57
  /* Z */
  ;
}

var isDecimal = decimal$1; // Check if the given character code, or the character code at the first
// character, is decimal.

function decimal$1(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 48 && code <= 57;
  /* 0-9 */
}

var isAlphabetical = alphabetical; // Check if the given character code, or the character code at the first
// character, is alphabetical.

function alphabetical(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 97 && code <= 122 || code >= 65 && code <= 90
  /* A-Z */
  ;
}

var isAlphanumerical = alphanumerical;
/* Check if the given character code, or the character
 * code at the first character, is alphanumerical. */

function alphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}

var dangerous = [
	"cent",
	"copy",
	"divide",
	"gt",
	"lt",
	"not",
	"para",
	"times"
];

var decimal = isDecimal;





var stringifyEntities = encode;
encode.escape = escape;
var own = {}.hasOwnProperty; // Characters

var equalsTo$1 = 61; // List of enforced escapes.

var escapes = ['"', "'", '<', '>', '&', '`']; // Map of characters to names.

var characters = construct(); // Default escapes.

var defaultEscapes = toExpression(escapes); // Surrogate pairs.

var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // Non-ASCII characters.
// eslint-disable-next-line no-control-regex, unicorn/no-hex-escape

var bmp = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g; // Encode special characters in `value`.

function encode(value, options) {
  var settings = options || {};
  var subset = settings.subset;
  var set = subset ? toExpression(subset) : defaultEscapes;
  var escapeOnly = settings.escapeOnly;
  var omit = settings.omitOptionalSemicolons;
  value = value.replace(set, replace);

  if (subset || escapeOnly) {
    return value;
  }

  return value.replace(surrogatePair, replaceSurrogatePair).replace(bmp, replace);

  function replaceSurrogatePair(pair, pos, slice) {
    return toHexReference((pair.charCodeAt(0) - 0xd800) * 0x400 + pair.charCodeAt(1) - 0xdc00 + 0x10000, slice.charCodeAt(pos + 2), omit);
  }

  function replace(char, pos, slice) {
    return one(char, slice.charCodeAt(pos + 1), settings);
  }
} // Shortcut to escape special characters in HTML.


function escape(value) {
  return encode(value, {
    escapeOnly: true,
    useNamedReferences: true
  });
} // Encode `char` according to `options`.


function one(char, next, options) {
  var shortest = options.useShortestReferences;
  var omit = options.omitOptionalSemicolons;
  var named;
  var code;
  var numeric;
  var decimal;

  if ((shortest || options.useNamedReferences) && own.call(characters, char)) {
    named = toNamed(characters[char], next, omit, options.attribute);
  }

  if (shortest || !named) {
    code = char.charCodeAt(0);
    numeric = toHexReference(code, next, omit); // Use the shortest numeric reference when requested.
    // A simple algorithm would use decimal for all code points under 100, as
    // those are shorter than hexadecimal:
    //
    // * `&#99;` vs `&#x63;` (decimal shorter)
    // * `&#100;` vs `&#x64;` (equal)
    //
    // However, because we take `next` into consideration when `omit` is used,
    // And it would be possible that decimals are shorter on bigger values as
    // well if `next` is hexadecimal but not decimal, we instead compare both.

    if (shortest) {
      decimal = toDecimalReference(code, next, omit);

      if (decimal.length < numeric.length) {
        numeric = decimal;
      }
    }
  }

  if (named && (!shortest || named.length < numeric.length)) {
    return named;
  }

  return numeric;
} // Transform `code` into an entity.


function toNamed(name, next, omit, attribute) {
  var value = '&' + name;

  if (omit && own.call(legacy, name) && dangerous.indexOf(name) === -1 && (!attribute || next && next !== equalsTo$1 && !isAlphanumerical(next))) {
    return value;
  }

  return value + ';';
} // Transform `code` into a hexadecimal character reference.


function toHexReference(code, next, omit) {
  var value = '&#x' + code.toString(16).toUpperCase();
  return omit && next && !isHexadecimal(next) ? value : value + ';';
} // Transform `code` into a decimal character reference.


function toDecimalReference(code, next, omit) {
  var value = '&#' + String(code);
  return omit && next && !decimal(next) ? value : value + ';';
} // Create an expression for `characters`.


function toExpression(characters) {
  return new RegExp('[' + characters.join('') + ']', 'g');
} // Construct the map.


function construct() {
  var chars = {};
  var name;

  for (name in entities) {
    chars[entities[name]] = name;
  }

  return chars;
}

var indent_1 = indent;
var lineFeed$1 = '\n';
var before = '  ';
var content = /\S/;

function indent(value) {
  var lines = value.split(lineFeed$1);
  var length = lines.length;
  var index = -1;
  var line;

  while (++index < length) {
    line = lines[index];
    lines[index] = content.test(line) ? before + line : line;
  }

  return lines.join(lineFeed$1);
}

var mdxExpression_1 = mdxExpression;
var leftCurlyBrace = '{';
var rightCurlyBrace = '}';

function mdxExpression(node) {
  var value = node.value || '';
  var block = node.type === 'mdxBlockExpression';
  var around = block ? '\n' : '';
  var content = block ? indent_1(value) : value;
  return leftCurlyBrace + around + content + around + rightCurlyBrace;
}

var mdxElement_1 = mdxElement; // Expose helper to create tags.

mdxElement.serializeTags = serializeTags;
var lineFeed = '\n';
var space = ' ';
var slash = '/';
var quotationMark = '"';
var lessThan = '<';
var equalsTo = '=';
var greaterThan = '>';
var valueCharacterReferenceOptions = {
  useNamedReferences: true,
  subset: [quotationMark]
};

function mdxElement(node) {
  var tags = serializeTags(node);
  var block = node.type === 'mdxBlockElement';
  var content = this.all(node).join(block ? lineFeed + lineFeed : '');

  if (block && content) {
    content = lineFeed + indent_1(content) + lineFeed;
  }

  return tags.open + content + (tags.close || '');
}

function serializeTags(node) {
  var block = node.type === 'mdxBlockElement';
  var name = String(node.name || '');
  var attributes = serializeAttributes(node.attributes || [], block);
  var selfClosing = name && node.children.length === 0;

  if (name === '' && attributes !== '') {
    throw new Error('Cannot serialize fragment with attributes');
  }

  return {
    open: lessThan + name + attributes + (selfClosing ? slash : '') + greaterThan,
    close: selfClosing ? null : lessThan + slash + name + greaterThan
  };
}

function serializeAttributes(nodes, block) {
  var length = nodes.length;
  var index = -1;
  var result = [];

  while (++index < length) {
    result.push(serializeAttribute(nodes[index]));
  } // None.


  if (result.length === 0) {
    return '';
  } // A block with multiple attributes


  if (block && result.length !== 1) {
    return lineFeed + indent_1(result.join(lineFeed)) + lineFeed;
  } // A span, or a block with a single attribute.


  return space + dedentStart(indent_1(result.join(space)));
}

function serializeAttribute(node) {
  var fn = node.type === 'mdxAttributeExpression' ? mdxExpression_1 : mdxAttribute;
  return fn(node);
}

function serializeValue(value) {
  if (typeof value === 'object') {
    return mdxExpression_1(value);
  }

  return quotationMark + stringifyEntities(value, valueCharacterReferenceOptions) + quotationMark;
}

function mdxAttribute(node) {
  var name = String(node.name || '');
  var value = node.value;

  if (name === '') {
    throw new Error('Cannot serialize attribute without name');
  }

  if (value === null || value === undefined) {
    return name;
  }

  return name + equalsTo + serializeValue(value);
}

function dedentStart(value) {
  return value.replace(/ +/, '');
}

const IMPORT_REGEX = /^import\s/;
const EXPORT_REGEX = /^export\s/;
const EXPORT_DEFAULT_REGEX = /^export default\s/;
const STARTS_WITH_CAPITAL_LETTER_REGEX = /^[A-Z]/;
const EMPTY_NEWLINE = '\n\n';
const COMMENT_OPEN = '<!--';
const COMMENT_CLOSE = '-->';

const isImport = text => IMPORT_REGEX.test(text);

const isExport = text => EXPORT_REGEX.test(text);

const isExportDefault = text => EXPORT_DEFAULT_REGEX.test(text);

const isImportOrExport = text => isImport(text) || isExport(text);

const isComment = str => str.startsWith(COMMENT_OPEN) && str.endsWith(COMMENT_CLOSE);

const getCommentContents = str => str.slice(COMMENT_OPEN.length, -COMMENT_CLOSE.length);

const startsWithCapitalLetter$1 = str => STARTS_WITH_CAPITAL_LETTER_REGEX.test(str);

const paramCase = string => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([a-z])([0-9])/g, '$1-$2').toLowerCase();

const toTemplateLiteral = text => {
  const escaped = text.replace(/\\(?!\$)/g, '\\\\') // Escape all "\" to avoid unwanted escaping in text nodes
  // and ignore "\$" since it's already escaped and is common
  // with prettier https://github.com/mdx-js/mdx/issues/606
  .replace(/`/g, '\\`') // Escape "`"" since
  .replace(/(\\\$)/g, '\\$1') // Escape \$ so render it as it is
  .replace(/(\\\$)(\{)/g, '\\$1\\$2') // Escape \${} so render it as it is
  .replace(/\$\{/g, '\\${'); // Escape ${} in text so that it doesn't eval

  return '{`' + escaped + '`}';
};

var EMPTY_NEWLINE_1 = EMPTY_NEWLINE;
var isImport_1 = isImport;
var isExport_1 = isExport;
var isExportDefault_1 = isExportDefault;
var isImportOrExport_1 = isImportOrExport;
var startsWithCapitalLetter_1 = startsWithCapitalLetter$1;
var isComment_1 = isComment;
var getCommentContents_1 = getCommentContents;
var paramCase_1 = paramCase;
var toTemplateLiteral_1 = toTemplateLiteral;

var util = {
	EMPTY_NEWLINE: EMPTY_NEWLINE_1,
	isImport: isImport_1,
	isExport: isExport_1,
	isExportDefault: isExportDefault_1,
	isImportOrExport: isImportOrExport_1,
	startsWithCapitalLetter: startsWithCapitalLetter_1,
	isComment: isComment_1,
	getCommentContents: getCommentContents_1,
	paramCase: paramCase_1,
	toTemplateLiteral: toTemplateLiteral_1
};

const {
  types: t
} = require$$0__default['default'];

const {
  declare: declare$2
} = require$$0__default$1['default'];

const {
  startsWithCapitalLetter
} = util;

class BabelPluginApplyMdxTypeProp {
  constructor() {
    const names = [];
    this.state = {
      names
    };
    this.plugin = declare$2(api => {
      api.assertVersion(7);
      return {
        visitor: {
          JSXOpeningElement(path) {
            const jsxName = path.node.name.name;

            if (startsWithCapitalLetter(jsxName)) {
              names.push(jsxName);
              path.node.attributes.push(t.jSXAttribute(t.jSXIdentifier(`mdxType`), t.stringLiteral(jsxName)));
            }
          }

        }
      };
    });
  }

}

var babelPluginApplyMdxTypeProp = BabelPluginApplyMdxTypeProp;

const {
  declare: declare$1
} = require$$0__default$1['default'];

class BabelPluginExtractImportNames {
  constructor() {
    const names = [];
    this.state = {
      names
    };
    this.plugin = declare$1(api => {
      api.assertVersion(7);
      return {
        visitor: {
          ImportDeclaration(path) {
            path.traverse({
              Identifier(path) {
                if (path.key === 'local') {
                  names.push(path.node.name);
                }
              }

            });
          }

        }
      };
    });
  }

}

var babelPluginExtractImportNames = BabelPluginExtractImportNames;

const {
  declare
} = require$$0__default$1['default'];

class BabelPluginExtractExportNames {
  constructor() {
    const names = [];
    this.state = {
      names
    };
    this.plugin = declare(api => {
      api.assertVersion(7);
      const {
        types: t
      } = api;

      const handleDeclarations = node => {
        if (!node.declaration) {
          return;
        }

        const {
          declarations
        } = node.declaration;

        if (!declarations) {
          return;
        }

        declarations.forEach(declaration => {
          if (t.isIdentifier(declaration.id)) {
            // Export const foo = 'bar'
            names.push(declaration.id.name);
          } else if (t.isArrayPattern(declaration.id)) {
            // Export const [ a, b ] = []
            declaration.id.elements.forEach(decl => {
              names.push(decl.name);
            });
          } else if (t.isObjectPattern(declaration.id)) {
            // Export const { a, b } = {}
            declaration.id.properties.forEach(decl => {
              names.push(decl.key.name);
            });
          }
        });
      };

      const handleSpecifiers = node => {
        const {
          specifiers
        } = node;

        if (!specifiers) {
          return;
        }

        specifiers.forEach(specifier => {
          if (t.isExportDefaultSpecifier(specifier)) {
            names.push(specifier.exported.name);
          } else {
            names.push(specifier.local.name);
          }
        });
      };

      return {
        visitor: {
          ExportNamedDeclaration(path) {
            handleDeclarations(path.node);
            handleSpecifiers(path.node);
          }

        }
      };
    });
  }

}

var babelPluginExtractExportNames = BabelPluginExtractExportNames;

var lib$1 = entry.createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, require$$0__default$1['default'].declare)(api => {
  api.assertVersion(7);
  return {
    name: "syntax-jsx",

    manipulateOptions(opts, parserOpts) {
      if (parserOpts.plugins.some(p => (Array.isArray(p) ? p[0] : p) === "typescript")) {
        return;
      }

      parserOpts.plugins.push("jsx");
    }

  };
});

exports.default = _default;
});

var lib = entry.createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, require$$0__default$1['default'].declare)(api => {
  api.assertVersion(7);
  return {
    name: "syntax-object-rest-spread",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("objectRestSpread");
    }

  };
});

exports.default = _default;
});

var mdxHastToJsx = entry.createCommonjsModule(function (module, exports) {
const {
  transformSync
} = require$$0__default['default'];



const {
  serializeTags
} = mdxElement_1;





const {
  toTemplateLiteral
} = util;







function toJSX(node, parentNode = {}, options = {}) {
  if (node.type === 'root') {
    return serializeRoot(node, options);
  }

  if (node.type === 'element') {
    return serializeElement(node, options, parentNode);
  } // Wraps text nodes inside template string, so that we don't run into escaping issues.


  if (node.type === 'text') {
    return serializeText(node, options, parentNode);
  }

  if (node.type === 'mdxBlockExpression' || node.type === 'mdxSpanExpression') {
    return mdxExpression_1(node);
  } // To do: pass `parentName` in?


  if (node.type === 'mdxBlockElement' || node.type === 'mdxSpanElement') {
    return serializeComponent(node, options);
  }

  if (node.type === 'import' || node.type === 'export') {
    return serializeEsSyntax(node);
  }
}

function compile(options = {}) {
  this.Compiler = function (tree) {
    return toJSX(tree, {}, options);
  };
}

module.exports = compile;
exports = compile;
exports.toJSX = toJSX;
exports.default = compile;

function serializeRoot(node, options) {
  const {
    // Default options
    skipExport = false,
    wrapExport
  } = options;
  const groups = {
    import: [],
    export: [],
    rest: []
  };

  for (const child of node.children) {
    let kind = 'rest';

    if (child.type === 'import' || child.type === 'export') {
      kind = child.type;
    }

    groups[kind].push(child);
  }

  let layout; // Find a default export, assumes there’s zero or one.

  groups.export = groups.export.filter(child => {
    if (child.default) {
      layout = child.value.replace(/^export\s+default\s+/, '').replace(/;\s*$/, '');
      return false;
    }

    return true;
  });
  const importStatements = groups.import.map(childNode => toJSX(childNode, node)).join('\n');
  const exportStatements = groups.export.map(childNode => toJSX(childNode, node)).join('\n');
  const mdxLayout = `const MDXLayout = ${layout ? layout : '"wrapper"'}`;
  const doc = groups.rest.map(childNode => toJSX(childNode, node, options)).join('').replace(/^\n+|\n+$/, '');
  const fn = `function MDXContent({ components, ...props }) {
return (
  <MDXLayout {...layoutProps} {...props} components={components}>
${doc}
  </MDXLayout>
)
};
MDXContent.isMDXComponent = true`; // Check JSX nodes against imports

  const babelPluginExtractImportNamesInstance = new babelPluginExtractImportNames();
  const babelPluginExtractExportNamesInstance = new babelPluginExtractExportNames();
  const importsAndExports = [importStatements, exportStatements].join('\n');
  transformSync(importsAndExports, {
    configFile: false,
    babelrc: false,
    plugins: [lib$1, lib, babelPluginExtractImportNamesInstance.plugin, babelPluginExtractExportNamesInstance.plugin]
  });
  const importNames = babelPluginExtractImportNamesInstance.state.names;
  const exportNames = babelPluginExtractExportNamesInstance.state.names;
  const babelPluginApplyMdxPropInstance = new babelPluginApplyMdxTypeProp();
  const babelPluginApplyMdxPropToExportsInstance = new babelPluginApplyMdxTypeProp();
  const fnPostMdxTypeProp = transformSync(fn, {
    configFile: false,
    babelrc: false,
    plugins: [lib$1, lib, babelPluginApplyMdxPropInstance.plugin]
  }).code;
  const exportStatementsPostMdxTypeProps = transformSync(exportStatements, {
    configFile: false,
    babelrc: false,
    plugins: [lib$1, lib, babelPluginApplyMdxPropToExportsInstance.plugin]
  }).code;
  let layoutProps = 'const layoutProps = {';

  if (exportNames.length !== 0) {
    layoutProps += '\n  ' + exportNames.join(',\n  ') + '\n';
  }

  layoutProps += '};';
  const allJsxNames = [...babelPluginApplyMdxPropInstance.state.names, ...babelPluginApplyMdxPropToExportsInstance.state.names];
  const jsxNames = allJsxNames.filter(name => name !== 'MDXLayout');
  const importExportNames = importNames.concat(exportNames);
  const fakedModulesForGlobalScope = `const makeShortcode = name => function MDXDefaultShortcode(props) {
  console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")
  return <div {...props}/>
};
` + lodash_uniq(jsxNames).filter(name => !importExportNames.includes(name)).map(name => `const ${name} = makeShortcode("${name}");`).join('\n');
  const moduleBase = `${importStatements}
${exportStatementsPostMdxTypeProps}
${fakedModulesForGlobalScope}
${layoutProps}
${mdxLayout}`;

  if (skipExport) {
    return `${moduleBase}
${fnPostMdxTypeProp}`;
  }

  if (wrapExport) {
    return `${moduleBase}
${fnPostMdxTypeProp}
export default ${wrapExport}(MDXContent)`;
  }

  return `${moduleBase}
export default ${fnPostMdxTypeProp}`;
}

function serializeElement(node, options, parentNode) {
  const parentName = parentNode.tagName;
  const {
    type,
    props
  } = hastToHyperscript(fakeReactCreateElement, Object.assign({}, node, {
    children: []
  }), {
    prefix: false
  });
  const content = serializeChildren(node, options);
  delete props.key;
  const data = parentName ? { ...props,
    parentName
  } : props;
  const spread = Object.keys(data).length === 0 ? null : ' {...' + JSON.stringify(data) + '}';
  return '<' + type + (spread ? ' ' + spread : '') + (content ? '>' + content + '</' + type + '>' : '/>');
}

function serializeComponent(node, options) {
  let content = serializeChildren(node, options);
  const tags = serializeTags(Object.assign({}, node, {
    children: content ? ['!'] : []
  }));

  if (node.type === 'mdxBlockElement' && content) {
    content = '\n' + content + '\n';
  }

  return tags.open + content + (tags.close || '');
}

function serializeText(node, options, parentNode) {
  const preserveNewlines = options.preserveNewlines; // Don't wrap newlines unless specifically instructed to by the flag,
  // to avoid issues like React warnings caused by text nodes in tables.

  const shouldPreserveNewlines = preserveNewlines || parentNode.tagName === 'p';

  if (node.value === '\n' && !shouldPreserveNewlines) {
    return node.value;
  }

  return toTemplateLiteral(node.value);
}

function serializeEsSyntax(node) {
  return node.value;
}

function serializeChildren(node, options) {
  const children = node.children || [];
  const childOptions = Object.assign({}, options, {
    // Tell all children inside <pre> tags to preserve newlines as text nodes
    preserveNewlines: options.preserveNewlines || node.tagName === 'pre'
  });
  return children.map(childNode => {
    return toJSX(childNode, node, childOptions);
  }).join('\n');
} // We only do this for the props, so we’re ignoring children.


function fakeReactCreateElement(name, props) {
  return {
    type: name,
    props: props,
    // Needed for `toH` to think this is React.
    key: null,
    _owner: null
  };
}
});

var mdx = entry.createCommonjsModule(function (module, exports) {
const DEFAULT_OPTIONS = {
  remarkPlugins: [],
  rehypePlugins: [],
  compilers: []
};

function createMdxAstCompiler(options) {
  const plugins = options.remarkPlugins;
  const fn = unified__default['default']().use(toMDAST__default['default'], options).use(remarkMdx__default['default'], options).use(remarkMdxJs__default['default'], options).use(remarkFootnotes, options).use(remarkSqueezeParagraphs, options);
  plugins.forEach(plugin => {
    // Handle [plugin, pluginOptions] syntax
    if (Array.isArray(plugin) && plugin.length > 1) {
      fn.use(plugin[0], plugin[1]);
    } else {
      fn.use(plugin);
    }
  });
  fn.use(mdxAstToMdxHast_1, options);
  return fn;
}

function applyHastPluginsAndCompilers(compiler, options) {
  const plugins = options.rehypePlugins;
  const compilers = options.compilers; // Convert raw nodes into HAST

  compiler.use(() => ast => {
    visit__default['default'](ast, 'raw', node => {
      const {
        children,
        tagName,
        properties
      } = hastUtilRaw(node);
      node.type = 'element';
      node.children = children;
      node.tagName = tagName;
      node.properties = properties;
    });
  });
  plugins.forEach(plugin => {
    // Handle [plugin, pluginOptions] syntax
    if (Array.isArray(plugin) && plugin.length > 1) {
      compiler.use(plugin[0], plugin[1]);
    } else {
      compiler.use(plugin);
    }
  });
  compiler.use(mdxHastToJsx, options);

  for (const compilerPlugin of compilers) {
    compiler.use(compilerPlugin, options);
  }

  return compiler;
}

function createCompiler(options = {}) {
  const opts = Object.assign({}, DEFAULT_OPTIONS, options);
  const compiler = createMdxAstCompiler(opts);
  const compilerWithPlugins = applyHastPluginsAndCompilers(compiler, opts);
  return compilerWithPlugins;
}

function sync(mdx, options = {}) {
  const compiler = createCompiler(options);
  const fileOpts = {
    contents: mdx
  };

  if (options.filepath) {
    fileOpts.path = options.filepath;
  }

  const {
    contents
  } = compiler.processSync(fileOpts);
  return `/* @jsx mdx */
${contents}`;
}

async function compile(mdx, options = {}) {
  const compiler = createCompiler(options);
  const fileOpts = {
    contents: mdx
  };

  if (options.filepath) {
    fileOpts.path = options.filepath;
  }

  const {
    contents
  } = await compiler.process(fileOpts);
  return `/* @jsx mdx */
${contents}`;
}

compile.sync = sync;
module.exports = compile;
exports = compile;
exports.sync = sync;
exports.createMdxAstCompiler = createMdxAstCompiler;
exports.createCompiler = createCompiler;
exports.default = compile;
});

const isShortcode = declaration => {
  var _declaration$init, _declaration$init$cal;

  return ((_declaration$init = declaration.init) === null || _declaration$init === void 0 ? void 0 : (_declaration$init$cal = _declaration$init.callee) === null || _declaration$init$cal === void 0 ? void 0 : _declaration$init$cal.name) === `makeShortcode`;
};

const isShortcodeFunction = declaration => declaration.id.name === `makeShortcode`;

const isMDXLayout$1 = element => element.name && element.name.name === `MDXLayout`;

const isMDXContent = declaration => declaration.id.name === `MDXContent`;

const isLayoutProps$1 = declaration => declaration.id.name === `layoutProps`;

const isMDXContentStaticProperty = node => {
  if (node.object.name !== `MDXContent`) {
    return false;
  }

  return node.property.name === `isMDXComponent`;
};

const shouldRemoveDeclaration$1 = declaration => isShortcode(declaration) || isShortcodeFunction(declaration) || isMDXLayout$1(declaration) || isLayoutProps$1(declaration);

function babelPluginRemoveShortcodes(api) {
  const {
    types: t
  } = api;
  return {
    visitor: {
      // Remove unneeded variables that MDX outputs but we won't use
      VariableDeclaration(path) {
        const declaration = path.node.declarations[0];

        if (!declaration) {
          return;
        }

        if (shouldRemoveDeclaration$1(declaration)) {
          path.remove();
        }
      },

      // Unwrap the MDXContent component instantiation because we will
      // evaluate the function directly. This ensures that React properly
      // handles rendering by not re-mounting the component every render.
      FunctionDeclaration(path) {
        if (!isMDXContent(path.node)) {
          return;
        } // path.traverse({
        // ReturnStatement(innerPath) {
        // path.replaceWith(innerPath.node)
        // },
        // })

      },

      // MDXLayout => doc
      JSXElement(path) {
        const {
          openingElement,
          closingElement
        } = path.node;

        if (isMDXLayout$1(openingElement)) {
          openingElement.name = t.JSXIdentifier(`doc`);
          openingElement.attributes = [];
          closingElement.name = t.JSXIdentifier(`doc`);
        }
      },

      // Remove the MDXContent.isMDXContent = true declaration since
      // we've removed MDXContent entirely
      MemberExpression(path) {
        if (isMDXContentStaticProperty(path.node)) {
          path.parentPath.remove();
        }
      }

    }
  };
}

function babelPluginCopyKeyProp(api) {
  const {
    types: t
  } = api;
  return {
    visitor: {
      JSXIdentifier(path) {
        if (path.node.name === `key`) {
          const clonePath = t.cloneNode(path.node);
          const cloneParent = t.cloneNode(path.parent);
          clonePath.name = `_key`;
          cloneParent.name = clonePath;
          path.parentPath.container.push(cloneParent);
        }
      }

    }
  };
}

const isMDXLayout = element => element.name && element.name.name === `MDXLayout`;

const isLayoutProps = declaration => declaration.id.name === `layoutProps`;

const shouldRemoveDeclaration = declaration => isLayoutProps(declaration) || isMDXLayout(declaration);

function MoveExportKeyword(api) {
  const {
    types: t
  } = api;
  let exportsToMove = [];
  return {
    visitor: {
      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration; // Ignore "export { Foo as default }" syntax

        if (declaration) {
          path.replaceWith(declaration);
          exportsToMove.push(t.cloneNode(path.node));
          path.remove();
        }
      },

      VariableDeclaration(path) {
        const declaration = path.node.declarations[0];

        if (!declaration) {
          return;
        }

        if (shouldRemoveDeclaration(declaration)) {
          path.remove();
        }
      },

      FunctionDeclaration(path) {
        if (path.node.id.name == `MDXContent`) {
          exportsToMove = ___default['default'].uniqBy(exportsToMove, e => e.declarations[0].id.name);
          exportsToMove.forEach(node => path.get(`body`).unshiftContainer(`body`, node));
        }
      },

      // MDXLayout => div
      JSXElement(path) {
        const {
          openingElement,
          closingElement
        } = path.node;

        if (isMDXLayout(openingElement)) {
          openingElement.name = t.JSXIdentifier(`div`);
          openingElement.attributes = [];
          closingElement.name = t.JSXIdentifier(`div`);
        }
      }

    }
  };
}

const mdxCache = new Map();
const jsxCache = new Map();

const transformJsx = jsx => {
  delete require.cache[require.resolve(`@babel/standalone`)];

  const {
    transform
  } = require$$0__default$2['default'];

  const options = {
    parserOpts: {
      // We want to return outside of a function because the output from
      // Babel will be evaluated inline as part of the render process.
      allowReturnOutsideFunction: true
    },
    plugins: [babelPluginCopyKeyProp, MoveExportKeyword, babelPluginRemoveShortcodes, // TODO figure out how to use preset-env
    babelChainingPlugin__default['default'], [babelPluginTransformReactJsx__default['default'], {
      useBuiltIns: true
    }]]
  };
  const {
    code
  } = transform(jsx, options);
  return code;
};

var transformMdx = (mdxSrc => {
  let jsxFromMdx;

  if (mdxCache.has(mdxSrc)) {
    jsxFromMdx = mdxCache.get(mdxSrc);
  } else {
    jsxFromMdx = mdx.sync(mdxSrc, {
      skipExport: true,
      commonmark: true
    });
    mdxCache.set(mdxSrc, jsxFromMdx);
  }

  let srcCode;

  if (jsxCache.has(jsxFromMdx)) {
    srcCode = jsxCache.get(jsxFromMdx);
  } else {
    srcCode = transformJsx(jsxFromMdx);
    jsxCache.set(jsxFromMdx, srcCode);
  }

  return srcCode;
});

const scope = {
  React: entry.react,
  RecipeStep,
  RecipeIntroduction,
  Input,
  useInput: entry.useInput,
  useInputByKey: entry.useInputByKey,
  useResource: entry.useResource,
  useProvider: entry.useProvider,
  Config: `div`,
  // Keep this as a noop for now
  ...resourceComponents,
  mdx: entry.react.createElement,
  MDXContent: entry.react.createElement
};

const transformCodeForEval = code => {
  // Remove the trailing semicolons so we can turn the component
  // into a return statement.
  let newCode = code.replace(/;\n;$/, ``);
  newCode = newCode + `\nreturn React.createElement(MDXContent)`;
  return newCode;
};

function render (mdxSrc, cb, context, isApply, isStream = false) {
  const scopeKeys = Object.keys(scope);
  const scopeValues = Object.values(scope);
  const srcCode = transformMdx(mdxSrc);
  const component = new Function(...scopeKeys, transformCodeForEval(srcCode));
  const result = render$1(component(...scopeValues), cb, context, isApply, isStream);
  return result;
}

async function validateSteps(steps) {
  const errors = [];
  const firstStepPlan = await render(steps[0]);

  if (firstStepPlan.length) {
    errors.push({
      step: 0,
      validationError: `Resources should not be placed in the introduction step (0)`
    });
  }

  return errors;
}

async function createPlan(context, cb) {
  const result = await render(context.recipe, cb, context);
  return result;
}

function ApplyPlan(context, cb) {
  return render(context.recipe, cb, context, true, true);
}

const uuid = (a // placeholder
) => a // if the placeholder was passed, return
? // a random number from 0 to 15
(a ^ Math.random() * // in which case
16 >> a / 4).toString(16) // in hexadecimal
: // or otherwise a concatenated string:
([1e7] + // 10000000 +
-1e3 + // -1000 +
-4e3 + // -4000 +
-8e3 + // -80000000 +
-1e11).replace( // replacing
/[018]/g, // zeroes, ones, and eights with
uuid // random hex digits
);

const IGNORED_COMPONENTS = [`RecipeIntroduction`, `RecipeStep`];

const asRoot = node => {
  return {
    type: `root`,
    children: [node]
  };
};

const pluckExports = tree => {
  const exports = [];
  visit__default['default'](tree, `export`, node => {
    exports.push(node);
  });
  remove__default['default'](tree, `export`);
  return exports;
};

const applyUuid = tree => {
  visit__default['default'](tree, `mdxBlockElement`, node => {
    if (!IGNORED_COMPONENTS.includes(node.name)) {
      node.attributes.push({
        type: `mdxAttribute`,
        name: `_uuid`,
        value: uuid()
      });
      node.attributes.push({
        type: `mdxAttribute`,
        name: `_type`,
        value: node.name
      });
    }
  });
  return tree;
};

const u = unified__default['default']().use(toMDAST__default['default']).use(remarkStringify__default['default']).use(remarkMdx__default['default']).use(remarkMdxJs__default['default']);

const partitionSteps = ast => {
  const steps = [];
  let index = 0;
  ast.children.forEach(node => {
    if (node.type === `thematicBreak`) {
      index++;
      return undefined;
    }

    steps[index] = steps[index] || [];
    steps[index].push(node);
    return undefined;
  });
  return steps;
};

const toMdx = nodes => {
  const stepAst = applyUuid(asRoot(nodes));
  const mdxSrc = u.stringify(stepAst);
  return mdxSrc;
};

const parse = async src => {
  const ast = u.parse(src);
  const exportNodes = pluckExports(ast);
  const [intro, ...resourceSteps] = partitionSteps(ast);
  const wrappedIntroStep = {
    type: `mdxBlockElement`,
    name: `RecipeIntroduction`,
    attributes: [],
    children: intro
  };
  const wrappedResourceSteps = resourceSteps.map((step, i) => {
    return {
      type: `mdxBlockElement`,
      name: `RecipeStep`,
      attributes: [{
        type: `mdxAttribute`,
        name: `step`,
        value: String(i + 1)
      }, {
        type: `mdxAttribute`,
        name: `totalSteps`,
        value: String(resourceSteps.length)
      }],
      children: step
    };
  });
  const steps = [wrappedIntroStep, ...wrappedResourceSteps];
  ast.children = [...exportNodes, ...ast.children];
  const exportsAsMdx = exportNodes.map(toMdx);
  const stepsAsMdx = steps.map(toMdx);
  const stepsAsJS = stepsAsMdx.map(transformMdx);
  return {
    ast,
    steps,
    exports: exportNodes,
    exportsAsMdx,
    stepsAsMdx,
    stepsAsJS,
    recipe: exportsAsMdx.join(`\n`) + `\n\n` + stepsAsMdx.join(`\n`)
  };
};

const isRelative = path => {
  if (path.slice(0, 1) == `.`) {
    return true;
  }

  return false;
};

async function resolveRecipe(pathOrUrl, projectRoot) {
  let recipePath;

  if (isUrl__default['default'](pathOrUrl)) {
    const res = await fetch__default['default'](pathOrUrl);
    const src = await res.text();
    return src;
  }

  if (isRelative(pathOrUrl)) {
    recipePath = path__default['default'].join(projectRoot, pathOrUrl);
  } else {
    const url = `https://unpkg.com/gatsby-recipes/recipes/${pathOrUrl}`;
    const res = await fetch__default['default'](url.endsWith(`.mdx`) ? url : url + `.mdx`);

    if (res.status !== 200) {
      throw new Error(JSON.stringify({
        fetchError: `Could not fetch ${pathOrUrl} from official recipes`
      }));
    }

    const src = await res.text();
    return src;
  }

  if (recipePath.slice(-4) !== `.mdx`) {
    recipePath += `.mdx`;
  }

  const src = await fs__default['default'].readFile(recipePath, `utf8`);
  return src;
}

const debug = debugCtor__default['default'](`recipes-machine`);
const recipeMachine = xstate.Machine({
  id: `recipe`,
  initial: `resolvingRecipe`,
  context: {
    recipePath: null,
    projectRoot: null,
    recipe: ``,
    recipeSrc: ``,
    stepsAsMdx: [],
    stepsAsJS: [],
    exports: [],
    plan: [],
    commands: [],
    stepResources: [],
    inputs: {}
  },
  states: {
    resolvingRecipe: {
      invoke: {
        id: `resolveRecipe`,
        src: async (context, _event) => {
          if (context.src) {
            return context.src;
          } else if (context.recipePath && context.projectRoot) {
            const recipe = await resolveRecipe(context.recipePath, context.projectRoot);
            return recipe;
          } else {
            throw new Error(`A recipe must be specified`);
          }
        },
        onError: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, _event) => {
              debug(`error resolving recipe`);
              return {
                error: `Could not resolve recipe "${context.recipePath}"`
              };
            }
          })
        },
        onDone: {
          target: `parsingRecipe`,
          actions: xstate.assign({
            recipeSrc: (_context, event) => event.data
          })
        }
      }
    },
    parsingRecipe: {
      invoke: {
        id: `parseRecipe`,
        src: async (context, _event) => {
          debug(`parsingRecipe`);
          const parsed = await parse(context.recipeSrc);
          debug(`parsedRecipe`);
          return parsed;
        },
        onError: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, event) => {
              debug(`error parsing recipes`);
              let msg;

              try {
                msg = JSON.parse(event.data.message);
                return msg;
              } catch (e) {
                return {
                  error: `Could not parse recipe ${context.recipePath}`,
                  e
                };
              }
            }
          })
        },
        onDone: {
          target: `validateSteps`,
          actions: xstate.assign({
            recipe: (context, event) => event.data.recipe,
            stepsAsMdx: (context, event) => event.data.stepsAsMdx,
            stepsAsJS: (context, event) => event.data.stepsAsJS,
            exports: (context, event) => event.data.exports
          })
        }
      }
    },
    validateSteps: {
      invoke: {
        id: `validateSteps`,
        src: async (context, event) => {
          debug(`validatingSteps`);
          const result = await validateSteps(context.stepsAsMdx);

          if (result.length > 0) {
            debug(`errors found in validation`);
            throw new Error(JSON.stringify(result));
          }

          return undefined;
        },
        onDone: `creatingPlan`,
        onError: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, event) => JSON.parse(event.data.message)
          })
        }
      }
    },
    creatingPlan: {
      entry: [`deleteOldPlan`],
      invoke: {
        id: `createPlan`,
        src: (context, event) => async (cb, onReceive) => {
          let result = await createPlan(context, cb); // Validate dependencies are met in the resources plan

          result = result.map(r => {
            const matches = findDependencyMatch(result, r); // If there's any errors, replace the resource
            // with the error

            if (matches.some(m => m.error)) {
              r.error = matches[0].error;
              delete r.diff;
            }

            return r;
          });
          return result;
        },
        onDone: {
          target: `presentPlan`,
          actions: xstate.assign({
            plan: (context, event) => event.data
          })
        },
        onError: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, event) => {
              var _event$data;

              return ((_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.errors) || event.data;
            }
          })
        }
      },
      on: {
        INVALID_PROPS: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, event) => event.data
          })
        }
      }
    },
    presentPlan: {
      invoke: {
        id: `presentingPlan`,
        src: (context, event) => (cb, onReceive) => {
          onReceive(async e => {
            context.inputs = context.inputs || {};
            context.inputs[e.data.key] = e.data;
            const result = await createPlan(context, cb);
            cb({
              type: `onUpdatePlan`,
              data: result
            });
          });
        }
      },
      on: {
        CONTINUE: [{
          target: `doneError`,
          cond: `hasErrors`
        }, {
          target: `applyingPlan`
        }],
        INPUT_ADDED: {
          actions: xstate.send((context, event) => event, {
            to: `presentingPlan`
          })
        },
        onUpdatePlan: {
          actions: xstate.assign({
            plan: (context, event) => event.data
          })
        }
      }
    },
    applyingPlan: {
      // cb mechanism can be used to emit events/actions between UI and the server/renderer
      // https://xstate.js.org/docs/guides/communication.html#invoking-callbacks
      invoke: {
        id: `applyPlan`,
        src: (context, event) => cb => {
          cb(`RESET`);

          if (context.plan.length === 0) {
            return cb(`onDone`);
          }

          const interval = setInterval(() => {
            cb(`TICK`);
          }, 10000);
          const emitter = ApplyPlan(context, cb);
          emitter.on(`*`, (type, e) => {
            if (type === `update`) {
              cb({
                type: `onUpdate`,
                data: e
              });
            }

            if (type === `done`) {
              debug(`applied plan`);
              cb({
                type: `onDone`,
                data: e
              });
            }

            if (type === `error`) {
              debug(`error applying plan`);
              cb({
                type: `onError`,
                data: e
              });
            }
          });
          return () => clearInterval(interval);
        }
      },
      on: {
        RESET: {
          actions: xstate.assign({
            elapsed: 0
          })
        },
        TICK: {
          actions: xstate.assign({
            elapsed: context => context.elapsed += 10000
          })
        },
        onUpdate: {
          actions: [`addResourcesToContext`]
        },
        onDone: {
          target: `done`,
          actions: [`addResourcesToContext`]
        },
        onError: {
          target: `doneError`,
          actions: xstate.assign({
            error: (context, event) => event.data
          })
        }
      }
    },
    done: {
      type: `final`
    },
    doneError: {
      type: `final`
    }
  }
}, {
  actions: {
    deleteOldPlan: xstate.assign((context, event) => {
      return {
        plan: []
      };
    }),
    addResourcesToContext: xstate.assign((context, event) => {
      if (___default['default'].isArray(event.data) && event.data.length > 0) {
        let plan = context.plan || [];
        plan = plan.map(p => {
          const changedResource = event.data.find(c => {
            if (c._uuid) {
              return c._uuid === p._uuid;
            } else {
              return c.resourceDefinitions._key === p.resourceDefinitions._key;
            }
          });
          if (!changedResource) return p;
          p._message = changedResource._message;
          p.isDone = changedResource.isDone;
          return p;
        });
        return {
          plan
        };
      }

      return undefined;
    })
  },
  guards: {
    hasErrors: context => context.plan.some(p => p.error)
  }
});

var typeDictionary = /*#__PURE__*/Object.freeze({
  __proto__: null,
  object: graphql_1.GraphQLObjectType,
  string: graphql_1.GraphQLString,
  guid: graphql_1.GraphQLID,
  integer: graphql_1.GraphQLInt,
  number: graphql_1.GraphQLFloat,
  array: graphql_1.GraphQLList,
  boolean: graphql_1.GraphQLBoolean,
  required: graphql_1.GraphQLNonNull,
  'enum': graphql_1.GraphQLEnumType
});

const internals$1 = {};
let cache = {};
const lazyLoadQueue = [];
function joiToGraphql(constructor) {
  let target;
  const {
    name,
    args,
    resolve,
    description
  } = constructor._meta[0];
  Hoek__default['default'].assert(Hoek__default['default'].reach(constructor, `_inner.children.length`) > 0, `Joi object must have at least 1 key`);
  const compiledFields = internals$1.buildFields(constructor._inner.children);

  if (lazyLoadQueue.length) {
    target = new graphql_1.GraphQLObjectType({
      name,
      description,
      fields: function () {
        return compiledFields(target);
      },
      args: internals$1.buildArgs(args),
      resolve
    });
  } else {
    target = new graphql_1.GraphQLObjectType({
      name,
      description,
      fields: compiledFields(),
      args: internals$1.buildArgs(args),
      resolve
    });
  }

  return target;
}

internals$1.buildEnumFields = values => {
  const attrs = {};

  for (let i = 0; i < values.length; ++i) {
    attrs[values[i].value] = {
      value: values[i].derivedFrom
    };
  }

  return attrs;
};

internals$1.setType = schema => {
  // Helpful for Int or Float
  if (schema._tests.length) {
    if (schema._flags.presence) {
      return {
        type: new graphql_1.GraphQLNonNull(typeDictionary[schema._tests[0].name])
      };
    }

    return {
      type: typeDictionary[schema._tests[0].name]
    };
  }

  if (schema._flags.presence === `required`) {
    return {
      type: new graphql_1.GraphQLNonNull(typeDictionary[schema._type])
    };
  }

  if (schema._flags.allowOnly) {
    // GraphQLEnumType
    const name = Hoek__default['default'].reach(schema, `_meta.0.name`) || `Anon`;
    const config = {
      name,
      values: internals$1.buildEnumFields(schema._valids._set)
    };
    return {
      type: new graphql_1.GraphQLEnumType(config)
    };
  }

  return {
    type: typeDictionary[schema._type]
  };
};

internals$1.processLazyLoadQueue = (attrs, recursiveType) => {
  for (let i = 0; i < lazyLoadQueue.length; ++i) {
    if (lazyLoadQueue[i].type === `object`) {
      attrs[lazyLoadQueue[i].key] = {
        type: recursiveType
      };
    } else {
      attrs[lazyLoadQueue[i].key] = {
        type: new typeDictionary[lazyLoadQueue[i].type](recursiveType)
      };
    }
  }

  return attrs;
};

internals$1.buildFields = fields => {
  const attrs = {};

  for (let i = 0; i < fields.length; ++i) {
    const field = fields[i];
    const key = field.key;

    if (field.schema._type === `object`) {
      let Type;

      if (!field.schema._inner.children) {
        // When there's an object with no children that means we've
        // called Joi.object() and permit any key. As such let's specify
        // a JSON GraphQL object type that's just as permissive.
        Type = graphqlTypeJson.GraphQLJSONObject;
      } else {
        Type = new graphql_1.GraphQLObjectType({
          name: field.key.charAt(0).toUpperCase() + field.key.slice(1),
          fields: internals$1.buildFields(field.schema._inner.children)
        });
      }

      attrs[key] = {
        type: Type
      };
      cache[key] = Type;
    }

    if (field.schema._type === `array`) {
      let Type;
      const pathToMethod = `schema._inner.items.0._flags.lazy`;

      if (Hoek__default['default'].reach(field, pathToMethod)) {
        Type = field.schema._inner.items[0]._description;
        lazyLoadQueue.push({
          key,
          type: field.schema._type
        });
      } else {
        Hoek__default['default'].assert(field.schema._inner.items.length > 0, `Need to provide scalar type as an item when using joi array`);

        if (Hoek__default['default'].reach(field, `schema._inner.items.0._type`) === `object`) {
          const {
            name
          } = Hoek__default['default'].reach(field, `schema._inner.items.0._meta.0`);
          const Item = new graphql_1.GraphQLObjectType({
            name,
            fields: internals$1.buildFields(field.schema._inner.items[0]._inner.children)
          });
          Type = new graphql_1.GraphQLList(Item);
        } else {
          Type = new graphql_1.GraphQLList(typeDictionary[field.schema._inner.items[0]._type]);
        }
      }

      attrs[key] = {
        type: Type
      };
      cache[key] = Type;
    }

    if (field.schema._type === `lazy`) {
      const Type = field.schema._description;
      lazyLoadQueue.push({
        key,
        type: `object`
      });
      attrs[key] = {
        type: Type
      };
      cache[key] = Type;
    }

    if (cache[key]) {
      continue;
    }

    attrs[key] = internals$1.setType(field.schema);
  }

  cache = Object.create(null); // Empty cache

  return function (recursiveType) {
    if (recursiveType) {
      return internals$1.processLazyLoadQueue(attrs, recursiveType);
    }

    return attrs;
  };
};

internals$1.buildArgs = args => {
  const argAttrs = {};

  for (const key in args) {
    if (args[key]._type === `object`) {
      argAttrs[key] = {
        type: new graphql_1.GraphQLInputObjectType({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          fields: internals$1.buildFields(args[key]._inner.children)
        })
      };
    } else {
      argAttrs[key] = {
        type: typeDictionary[args[key]._type]
      };
    }
  }

  return argAttrs;
};

const internals = {};
internals.configSchema = Joi__namespace.object().keys({
  name: Joi__namespace.string().default(`Anon`),
  args: Joi__namespace.object(),
  resolve: Joi__namespace.func(),
  description: Joi__namespace.string()
});
function composeType(schema, config = {}) {
  config = Joi__namespace.attempt(config, internals.configSchema);
  Hoek__default['default'].assert(typeof schema !== `undefined`, `schema argument must be defined`);
  const typeConstructor = schema.meta(config);
  Hoek__default['default'].assert(typeConstructor._type === `object`, `schema must be a Joi Object type.`);
  return joiToGraphql(typeConstructor);
}

Joi__namespace.object().keys({
  query: Joi__namespace.object(),
  mutation: Joi__namespace.object(),
  subscription: Joi__namespace.object()
});

const typeNameToHumanName = name => {
  if (name.endsWith(`Connection`)) {
    return `all` + name.replace(/Connection$/, ``);
  } else {
    return ___default['default'].camelCase(name);
  }
};

function createTypes() {
  const resourceTypes = Object.entries(resources).map(([resourceName, resource]) => {
    if (!resource.schema) {
      return undefined;
    }

    const queryTypes = [];
    const mutationTypes = {};
    const joiSchema = Joi__namespace.object().keys({ ...resource.schema,
      _typeName: Joi__namespace.string()
    });
    const type = composeType(joiSchema, {
      name: resourceName
    }); // Query

    const queryType = {
      type,
      args: {
        id: {
          type: graphql_1.GraphQLString
        }
      },
      resolve: async (_root, args, context) => {
        const value = await resource.read(context, args.id);
        return { ...value,
          _typeName: resourceName
        };
      }
    };
    queryTypes.push(queryType); // Query connection

    if (resource.all) {
      const connectionTypeName = resourceName + `Connection`;
      const ConnectionType = new graphql_1.GraphQLObjectType({
        name: connectionTypeName,
        fields: {
          nodes: {
            type: new graphql_1.GraphQLList(type)
          }
        }
      });
      const connectionType = {
        type: ConnectionType,
        resolve: async (_root, _args, context) => {
          const nodes = await resource.all(context);
          return {
            nodes
          };
        }
      };
      queryTypes.push(connectionType);
    } // Destroy mutation


    const camelCasedResourceName = ___default['default'].camelCase(resourceName);

    const inputType = graphqlCompose.ObjectTypeComposer.create(type, graphqlCompose.schemaComposer).getInputType();
    const destroyMutation = {
      type,
      args: {
        [camelCasedResourceName]: {
          type: inputType
        }
      },
      resolve: async (_root, args, context) => {
        const value = await resource.destroy(context, args[camelCasedResourceName]);
        return { ...value,
          _typeName: resourceName
        };
      }
    };
    mutationTypes[`destroy${resourceName}`] = destroyMutation; // Create mutation

    const createMutation = {
      type,
      args: {
        [camelCasedResourceName]: {
          type: inputType
        }
      },
      resolve: (_root, args, context) => resource.create(context, args[camelCasedResourceName])
    };
    mutationTypes[`create${resourceName}`] = createMutation; // Update mutation

    const updateMutation = {
      type,
      args: {
        [camelCasedResourceName]: {
          type: inputType
        }
      },
      resolve: (_root, args, context) => resource.update(context, args[camelCasedResourceName])
    };
    mutationTypes[`update${resourceName}`] = updateMutation;
    return {
      query: queryTypes,
      mutation: mutationTypes
    };
  });

  const queryTypes = ___default['default'].flatten(resourceTypes.filter(Boolean).map(r => r.query)).reduce((acc, curr) => {
    const typeName = typeNameToHumanName(curr.type.toString());
    acc[typeName] = curr;
    return acc;
  }, {});

  const mutationTypes = ___default['default'].flatten(resourceTypes.filter(Boolean).map(r => r.mutation)).reduce((acc, curr) => {
    Object.keys(curr).forEach(key => {
      acc[typeNameToHumanName(key)] = curr[key];
    });
    return acc;
  }, {});

  return {
    queryTypes,
    mutationTypes
  };
}

dotenv__default['default'].config(); // Create a session id — mostly useful to tell the client when the server
// has restarted

const sessionId = uuid$1.v4();
const SITE_ROOT = pkgDir__default['default'].sync(process.cwd());
const pubsub = new graphqlSubscriptions.PubSub();
const PORT = process.argv[2] || 50400;
let lastState = {};
let lastDone = 0;

const compareState = (oldState, newState) => {
  // isEqual doesn't handle values on objects in arrays 🤷‍♀️
  const newDone = newState.context.plan.filter(r => r.isDone).length;
  const comparison = !___default['default'].isEqual(newState, oldState) || lastDone !== newDone;
  lastDone = newDone;
  return comparison;
};

const emitUpdate = state => {
  // eslint-disable-next-line no-unused-vars
  const {
    lastEvent,
    ...cleanedState
  } = state; // isEqual doesn't handle values on objects in arrays 🤷‍♀️

  if (compareState(lastState, cleanedState)) {
    pubsub.publish(`operation`, {
      state: JSON.stringify(cleanedState)
    });
    lastState = cleanedState;
  }
};

let service;

const startRecipe = ({
  recipePath,
  projectRoot,
  watchChanges = false
}) => {
  const initialState = {
    context: {
      recipePath,
      projectRoot,
      steps: [],
      currentStep: 0
    },
    value: `init`
  };

  const startService = () => {
    // Interpret the machine, and add a listener for whenever a transition occurs.
    service = xstate.interpret(recipeMachine.withContext(initialState.context)).onTransition(state => {
      // Don't emit again unless there's a state change.
      if (state.event.type !== `onUpdate`) {
        console.log(`===onTransition`, {
          state: state.value,
          event: state.event.type
        });
      }

      if (state.changed) {
        console.log(`===state.changed`, {
          state: state.value,
          event: state.event.type
        });

        if (state.value === `doneError`) {
          console.log(state.event);
        } // Wait until plans are created before updating the UI


        if ([`presentPlan`, `done`, `doneError`, `applyingPlan`].includes(state.value)) {
          emitUpdate({
            context: state.context,
            lastEvent: state.event,
            value: state.value
          });
        }
      }

      if (state.value === `done`) {
        service.stop();
      }
    }); // Start the service

    try {
      service.start();
    } catch (e) {
      console.log(`recipe machine failed to start`, e);
    }
  };

  if (watchChanges) {
    chokidar__default['default'].watch(initialState.context.recipePath).on(`change`, (filename, stats) => {
      startService();
    });
  }

  startService();
};

const OperationType = new graphql_1.GraphQLObjectType({
  name: `Operation`,
  fields: {
    state: {
      type: graphql_1.GraphQLString
    }
  }
});
const {
  queryTypes,
  mutationTypes
} = createTypes();
const rootQueryType = new graphql_1.GraphQLObjectType({
  name: `Root`,
  fields: () => queryTypes
});
const rootMutationType = new graphql_1.GraphQLObjectType({
  name: `Mutation`,
  fields: () => {
    return { ...mutationTypes,
      createOperation: {
        type: graphql_1.GraphQLString,
        args: {
          recipePath: {
            type: graphql_1.GraphQLString
          },
          projectRoot: {
            type: graphql_1.GraphQLString
          },
          watchChanges: {
            type: graphql_1.GraphQLBoolean
          }
        },
        resolve: (_data, args) => {
          console.log(`received operation`, args);
          startRecipe(args);
        }
      },
      sendEvent: {
        type: graphql_1.GraphQLString,
        args: {
          event: {
            type: graphql_1.GraphQLString
          },
          input: {
            type: graphql_1.GraphQLString
          }
        },
        resolve: (_, args) => {
          console.log(`!!! event received`, args);
          service.send({
            type: args.event,
            data: args.input && JSON.parse(args.input)
          });
        }
      }
    };
  }
});
const rootSubscriptionType = new graphql_1.GraphQLObjectType({
  name: `Subscription`,
  fields: () => {
    return {
      operation: {
        type: OperationType,
        subscribe: () => pubsub.asyncIterator(`operation`),
        resolve: payload => payload
      }
    };
  }
});
const schema = new graphql_1.GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType,
  subscription: rootSubscriptionType
});
const app = express__default['default']();
const server = http.createServer(app);
console.log(`listening on localhost:${PORT}`);
app.use(cors__default['default']());
app.use(`/graphql`, graphqlHTTP__default['default']({
  schema,
  graphiql: true,
  context: {
    root: SITE_ROOT
  }
}));
app.use(`/session`, (req, res) => {
  res.send(sessionId);
}); // DEBUGGING

app.use(`/service`, (req, res) => {
  res.json(service);
});
server.listen(PORT, () => {
  new entry.dist.SubscriptionServer({
    execute: graphql_1.execute,
    subscribe: graphql_1.subscribe,
    schema
  }, {
    server,
    path: `/graphql`
  });
});
//# sourceMappingURL=server.js.map
