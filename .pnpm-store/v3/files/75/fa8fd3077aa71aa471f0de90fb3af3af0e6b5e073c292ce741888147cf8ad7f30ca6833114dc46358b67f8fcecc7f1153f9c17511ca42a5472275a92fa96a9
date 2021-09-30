/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
export var wrapCollection = function wrapCollection(fn) {
  return function (makeRequest, data) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var collectionData = toPlainObject(copy(data)); // @ts-expect-error

    collectionData.items = collectionData.items.map(function (entity) {
      return fn.apply(void 0, [makeRequest, entity].concat(rest));
    }); // @ts-expect-error

    return collectionData;
  };
};