'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fiber = require('@react-three/fiber');
var core = require('@react-spring/core');
var shared = require('@react-spring/shared');
var animated$1 = require('@react-spring/animated');
var THREE = require('three');

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

var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

const primitives = ['primitive'].concat(Object.keys(THREE__namespace).filter(key => /^[A-Z]/.test(key)).map(key => key[0].toLowerCase() + key.slice(1)));

core.Globals.assign({
  createStringInterpolator: shared.createStringInterpolator,
  colors: shared.colors,
  frameLoop: 'demand'
});
fiber.addEffect(() => {
  shared.raf.advance();
});
const host = animated$1.createHost(primitives, {
  applyAnimatedValues: fiber.applyProps
});
const animated = host.animated;

exports.a = animated;
exports.animated = animated;
Object.keys(core).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return core[k];
    }
  });
});
