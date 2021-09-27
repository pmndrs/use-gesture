'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var deepEqual = require('fast-deep-equal');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var deepEqual__default = /*#__PURE__*/_interopDefaultLegacy(deepEqual);

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var globalCache = [];

function handleAsset(fn, cache, args, lifespan, preload) {
  if (lifespan === void 0) {
    lifespan = 0;
  }

  if (preload === void 0) {
    preload = false;
  }

  for (var _iterator = _createForOfIteratorHelperLoose(cache), _step; !(_step = _iterator()).done;) {
    var _entry = _step.value;

    // Find a match
    if (deepEqual__default['default'](args, _entry.args)) {
      // If we're pre-loading and the element is present, just return
      if (preload) return; // If an error occurred, throw

      if (_entry.error) throw _entry.error; // If a response was successful, return

      if (_entry.response) return _entry.response; // If the promise is still unresolved, throw

      throw _entry.promise;
    }
  } // The request is new or has changed.


  var entry = {
    args: args,
    promise: // Make the promise request.
    fn.apply(void 0, args) // Response can't be undefined or else the loop above wouldn't be able to return it
    // This is for promises that do not return results (delays for instance)
    .then(function (response) {
      return entry.response = response != null ? response : true;
    })["catch"](function (e) {
      return entry.error = e != null ? e : 'unknown error';
    }).then(function () {
      if (lifespan > 0) {
        setTimeout(function () {
          var index = cache.indexOf(entry);
          if (index !== -1) cache.splice(index, 1);
        }, lifespan);
      }
    })
  };
  cache.push(entry);
  if (!preload) throw entry.promise;
}

function _clear(cache) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args === undefined || args.length === 0) cache.splice(0, cache.length);else {
    var entry = cache.find(function (entry) {
      return deepEqual__default['default'](args, entry.args);
    });

    if (entry) {
      var index = cache.indexOf(entry);
      if (index !== -1) cache.splice(index, 1);
    }
  }
}

function createAsset(fn, lifespan) {
  if (lifespan === void 0) {
    lifespan = 0;
  }

  var cache = [];
  return {
    /**
     * @throws Suspense Promise if asset is not yet ready
     * @throws Error if the promise rejected for some reason
     */
    read: function read() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return handleAsset(fn, cache, args, lifespan);
    },
    preload: function preload() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return void handleAsset(fn, cache, args, lifespan, true);
    },
    clear: function clear() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _clear.apply(void 0, [cache].concat(args));
    },
    peek: function peek() {
      var _cache$find;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return (_cache$find = cache.find(function (entry) {
        return deepEqual__default['default'](args, entry.args);
      })) == null ? void 0 : _cache$find.response;
    }
  };
}

function useAsset(fn) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  return handleAsset(fn, globalCache, args, useAsset.lifespan);
}

useAsset.lifespan = 0;

useAsset.clear = function () {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  return _clear.apply(void 0, [globalCache].concat(args));
};

useAsset.preload = function (fn) {
  for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args[_key8 - 1] = arguments[_key8];
  }

  return void handleAsset(fn, globalCache, args, useAsset.lifespan, true);
};

useAsset.peek = function () {
  var _globalCache$find;

  for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return (_globalCache$find = globalCache.find(function (entry) {
    return deepEqual__default['default'](args, entry.args);
  })) == null ? void 0 : _globalCache$find.response;
};

exports.createAsset = createAsset;
exports.useAsset = useAsset;
