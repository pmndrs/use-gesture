/* @flow strict */

import { isFunction } from './is';

export function createThunkedObjectProxy<T: {}>(thunk: () => T): T {
  const data = {};
  let isResolved = false;
  const getFC: any = () => {
    if (!isResolved) {
      isResolved = true;
      const tmp = isFunction(thunk) ? thunk() : thunk;
      Object.keys(tmp).forEach((k) => {
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
    defineProperty(o, k, d: any) {
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
    getOwnPropertyDescriptor(o, k: any) {
      return (Object.getOwnPropertyDescriptor(getFC(), k): any);
    },
  });

  return (proxy: any);
}
