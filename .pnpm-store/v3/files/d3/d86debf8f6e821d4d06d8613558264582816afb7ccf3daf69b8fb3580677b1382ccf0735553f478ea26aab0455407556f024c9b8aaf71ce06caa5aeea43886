"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createThunkedObjectProxy = createThunkedObjectProxy;

var _is = require("./is");

function createThunkedObjectProxy(thunk) {
  const data = {};
  let isResolved = false;

  const getFC = () => {
    if (!isResolved) {
      isResolved = true;
      const tmp = (0, _is.isFunction)(thunk) ? thunk() : thunk;
      Object.keys(tmp).forEach(k => {
        data[k] = tmp[k];
      });
    }

    return data;
  };

  const proxy = new Proxy(data, {
    get(o, k) {
      return getFC()[k];
    },

    set(o, k, v) {
      getFC()[k] = v;
      return true;
    },

    has(o, k) {
      return k in getFC();
    },

    deleteProperty(o, k) {
      delete getFC()[k];
      return true;
    },

    // enumerate() {
    //   return Object.keys(getFC())[Symbol.iterator]();
    // },
    // iterate(oTarget, sKey) {
    //   return oTarget.keys();
    // },
    ownKeys() {
      return Reflect.ownKeys(getFC());
    },

    // hasOwn(oTarget, sKey) {
    //   console.log('hasOwn');
    //   return Object.
    // },
    defineProperty(o, k, d) {
      return Object.defineProperty(getFC(), k, d);
    },

    // getPropertyNames() {
    //   return Object.getPropertyNames(getFC());
    // },
    getOwnPropertyNames() {
      return Object.getOwnPropertyNames(getFC());
    },

    // getPropertyDescriptor(o, k) {
    //   return Object.getPropertyDescriptor(getFC(), k);
    // },
    getOwnPropertyDescriptor(o, k) {
      return Object.getOwnPropertyDescriptor(getFC(), k);
    }

  });
  return proxy;
}