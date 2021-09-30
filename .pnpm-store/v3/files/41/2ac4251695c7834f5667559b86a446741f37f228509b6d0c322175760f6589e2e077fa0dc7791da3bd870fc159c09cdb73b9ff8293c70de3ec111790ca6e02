"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getCache = void 0;

var _cache = _interopRequireDefault(require("./cache"));

var _datastore = require("../datastore");

const caches = new Map();

const getCache = name => {
  let cache = caches.get(name);

  if (!cache) {
    if ((0, _datastore.isLmdbStore)()) {
      const GatsbyCacheLmdb = require(`./cache-lmdb`).default;

      cache = new GatsbyCacheLmdb({
        name
      }).init();
    } else {
      cache = new _cache.default({
        name
      }).init();
    }

    caches.set(name, cache);
  }

  return cache;
};

exports.getCache = getCache;
//# sourceMappingURL=get-cache.js.map