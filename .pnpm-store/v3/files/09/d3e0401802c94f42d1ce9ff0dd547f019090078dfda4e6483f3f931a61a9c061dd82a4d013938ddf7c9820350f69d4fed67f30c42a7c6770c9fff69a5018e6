'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var entry = require('./entry-ee5bfdba.js');
var _ = require('lodash');
var assert = require('assert');
var require$$1 = require('events');
var require$$0$1 = require('yoga-layout-prebuilt');
var stripAnsi = require('strip-ansi');
var stream_1 = require('stream');
var fs$1 = require('fs');
var require$$0$2 = require('module');
var hicat = require('hicat');
var gatsbyTelemetry = require('gatsby-telemetry');
var PropTypes = require('prop-types');
var fetch$1 = require('node-fetch');
var WebSocket = require('ws');
var semver = require('semver');
var remove = require('unist-util-remove');
var execa = require('execa');
var path = require('path');
var detectPort = require('detect-port');
var gatsbyCoreUtils = require('gatsby-core-utils');
require('graphql');
require('fs-extra');
require('mkdirp');
require('@hapi/joi');
require('is-url');
require('is-binary-path');
require('@babel/core');
require('@babel/types');
require('@babel/helper-plugin-utils');
require('glob');
require('prettier');
require('@babel/template');
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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var stripAnsi__default = /*#__PURE__*/_interopDefaultLegacy(stripAnsi);
var stream_1__default = /*#__PURE__*/_interopDefaultLegacy(stream_1);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var hicat__default = /*#__PURE__*/_interopDefaultLegacy(hicat);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch$1);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);
var remove__default = /*#__PURE__*/_interopDefaultLegacy(remove);
var execa__default = /*#__PURE__*/_interopDefaultLegacy(execa);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var detectPort__default = /*#__PURE__*/_interopDefaultLegacy(detectPort);

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

var lodash_isequal = entry.createCommonjsModule(function (module, exports) {
/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof entry.commonjsGlobal == 'object' && entry.commonjsGlobal && entry.commonjsGlobal.Object === Object && entry.commonjsGlobal;
/** Detect free variable `self`. */

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Detect free variable `exports`. */

var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */


function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */


function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */


function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */


function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}
/**
 * Checks if a `cache` value for `key` exists.
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
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */


function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
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
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */


var nativeObjectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);
/* Built-in method references that are verified to be native. */

var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
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
  this.size = 0;
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
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
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
  this.size += this.has(key) ? 0 : 1;
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
      length = entries == null ? 0 : entries.length;
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
  this.size = 0;
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

  --this.size;
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
    ++this.size;
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
      length = entries == null ? 0 : entries.length;
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
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
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
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
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
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
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
      length = values == null ? 0 : values.length;
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
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function stackGet(key) {
  return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function stackHas(key) {
  return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */


function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}
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
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */


function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */


function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
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

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */


function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */


function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */


function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Assume cyclic values are equal.


  var stacked = stack.get(array);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */


function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Assume cyclic values are equal.


  var stacked = stack.get(object);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
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
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */


function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */


var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function (value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */


function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
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
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */


function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */


function objectToString(value) {
  return nativeObjectToString.call(value);
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
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
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */


var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */


var isBuffer = nativeIsBuffer || stubFalse;
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */

function isEqual(value, other) {
  return baseIsEqual(value, other);
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
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */


function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
  return value != null && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return value != null && typeof value == 'object';
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */


var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */

function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */


function stubArray() {
  return [];
}
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */


function stubFalse() {
  return false;
}

module.exports = isEqual;
});

var arrRotate = (input, n) => {
  if (!Array.isArray(input)) {
    throw new TypeError(`Expected an array, got ${typeof input}`);
  }

  const x = input.slice();
  const num = typeof n === 'number' ? n : 0;
  return x.splice(-num % x.length).concat(x);
};

var ansiEscapes_1 = entry.createCommonjsModule(function (module) {

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

var _default$M = mimicFn;
mimicFn_1.default = _default$M;

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

var _default$L = onetime;

var callCount = function_ => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }

  return calledFunctions.get(function_);
};
onetime_1.default = _default$L;
onetime_1.callCount = callCount;

var signals$1 = entry.createCommonjsModule(function (module) {
// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = ['SIGABRT', 'SIGALRM', 'SIGHUP', 'SIGINT', 'SIGTERM'];

if (process.platform !== 'win32') {
  module.exports.push('SIGVTALRM', 'SIGXCPU', 'SIGXFSZ', 'SIGUSR2', 'SIGTRAP', 'SIGSYS', 'SIGQUIT', 'SIGIOT' // should detect profiler and enable/disable accordingly.
  // see #21
  // 'SIGPROF'
  );
}

if (process.platform === 'linux') {
  module.exports.push('SIGIO', 'SIGPOLL', 'SIGPWR', 'SIGSTKFLT', 'SIGUNUSED');
}
});

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.


var signals = signals$1;

var isWin = /^win/i.test(process.platform);

var EE = require$$1__default['default'];
/* istanbul ignore if */


if (typeof EE !== 'function') {
  EE = EE.EventEmitter;
}

var emitter;

if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__;
} else {
  emitter = process.__signal_exit_emitter__ = new EE();
  emitter.count = 0;
  emitter.emitted = {};
} // Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.


if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity);
  emitter.infinite = true;
}

var signalExit = function (cb, opts) {
  assert__default['default'].equal(typeof cb, 'function', 'a callback must be provided for exit handler');

  if (loaded === false) {
    load();
  }

  var ev = 'exit';

  if (opts && opts.alwaysLast) {
    ev = 'afterexit';
  }

  var remove = function () {
    emitter.removeListener(ev, cb);

    if (emitter.listeners('exit').length === 0 && emitter.listeners('afterexit').length === 0) {
      unload();
    }
  };

  emitter.on(ev, cb);
  return remove;
};

var unload_1 = unload;

function unload() {
  if (!loaded) {
    return;
  }

  loaded = false;
  signals.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig]);
    } catch (er) {}
  });
  process.emit = originalProcessEmit;
  process.reallyExit = originalProcessReallyExit;
  emitter.count -= 1;
}

function emit(event, code, signal) {
  if (emitter.emitted[event]) {
    return;
  }

  emitter.emitted[event] = true;
  emitter.emit(event, code, signal);
} // { <signal>: <listener fn>, ... }


var sigListeners = {};
signals.forEach(function (sig) {
  sigListeners[sig] = function listener() {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig);

    if (listeners.length === emitter.count) {
      unload();
      emit('exit', null, sig);
      /* istanbul ignore next */

      emit('afterexit', null, sig);
      /* istanbul ignore next */

      if (isWin && sig === 'SIGHUP') {
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        sig = 'SIGINT';
      }

      process.kill(process.pid, sig);
    }
  };
});

var signals_1 = function () {
  return signals;
};

var load_1 = load;
var loaded = false;

function load() {
  if (loaded) {
    return;
  }

  loaded = true; // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.

  emitter.count += 1;
  signals = signals.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig]);
      return true;
    } catch (er) {
      return false;
    }
  });
  process.emit = processEmit;
  process.reallyExit = processReallyExit;
}

var originalProcessReallyExit = process.reallyExit;

function processReallyExit(code) {
  process.exitCode = code || 0;
  emit('exit', process.exitCode, null);
  /* istanbul ignore next */

  emit('afterexit', process.exitCode, null);
  /* istanbul ignore next */

  originalProcessReallyExit.call(process, process.exitCode);
}

var originalProcessEmit = process.emit;

function processEmit(ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg;
    }

    var ret = originalProcessEmit.apply(this, arguments);
    emit('exit', process.exitCode, null);
    /* istanbul ignore next */

    emit('afterexit', process.exitCode, null);
    return ret;
  } else {
    return originalProcessEmit.apply(this, arguments);
  }
}
signalExit.unload = unload_1;
signalExit.signals = signals_1;
signalExit.load = load_1;

var restoreCursor = onetime_1(() => {
  signalExit(() => {
    process.stderr.write('\u001B[?25h');
  }, {
    alwaysLast: true
  });
});

var cliCursor = entry.createCommonjsModule(function (module, exports) {



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

var __importDefault$p = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$K = {
  create
};

var logUpdate = /*#__PURE__*/Object.defineProperty({
	default: _default$K
}, '__esModule', {value: true});

var vendors = [
	{
		name: "AppVeyor",
		constant: "APPVEYOR",
		env: "APPVEYOR",
		pr: "APPVEYOR_PULL_REQUEST_NUMBER"
	},
	{
		name: "Azure Pipelines",
		constant: "AZURE_PIPELINES",
		env: "SYSTEM_TEAMFOUNDATIONCOLLECTIONURI",
		pr: "SYSTEM_PULLREQUEST_PULLREQUESTID"
	},
	{
		name: "Bamboo",
		constant: "BAMBOO",
		env: "bamboo_planKey"
	},
	{
		name: "Bitbucket Pipelines",
		constant: "BITBUCKET",
		env: "BITBUCKET_COMMIT",
		pr: "BITBUCKET_PR_ID"
	},
	{
		name: "Bitrise",
		constant: "BITRISE",
		env: "BITRISE_IO",
		pr: "BITRISE_PULL_REQUEST"
	},
	{
		name: "Buddy",
		constant: "BUDDY",
		env: "BUDDY_WORKSPACE_ID",
		pr: "BUDDY_EXECUTION_PULL_REQUEST_ID"
	},
	{
		name: "Buildkite",
		constant: "BUILDKITE",
		env: "BUILDKITE",
		pr: {
			env: "BUILDKITE_PULL_REQUEST",
			ne: "false"
		}
	},
	{
		name: "CircleCI",
		constant: "CIRCLE",
		env: "CIRCLECI",
		pr: "CIRCLE_PULL_REQUEST"
	},
	{
		name: "Cirrus CI",
		constant: "CIRRUS",
		env: "CIRRUS_CI",
		pr: "CIRRUS_PR"
	},
	{
		name: "AWS CodeBuild",
		constant: "CODEBUILD",
		env: "CODEBUILD_BUILD_ARN"
	},
	{
		name: "Codeship",
		constant: "CODESHIP",
		env: {
			CI_NAME: "codeship"
		}
	},
	{
		name: "Drone",
		constant: "DRONE",
		env: "DRONE",
		pr: {
			DRONE_BUILD_EVENT: "pull_request"
		}
	},
	{
		name: "dsari",
		constant: "DSARI",
		env: "DSARI"
	},
	{
		name: "GitLab CI",
		constant: "GITLAB",
		env: "GITLAB_CI"
	},
	{
		name: "GoCD",
		constant: "GOCD",
		env: "GO_PIPELINE_LABEL"
	},
	{
		name: "Hudson",
		constant: "HUDSON",
		env: "HUDSON_URL"
	},
	{
		name: "Jenkins",
		constant: "JENKINS",
		env: [
			"JENKINS_URL",
			"BUILD_ID"
		],
		pr: {
			any: [
				"ghprbPullId",
				"CHANGE_ID"
			]
		}
	},
	{
		name: "Magnum CI",
		constant: "MAGNUM",
		env: "MAGNUM"
	},
	{
		name: "Netlify CI",
		constant: "NETLIFY",
		env: "NETLIFY_BUILD_BASE",
		pr: {
			env: "PULL_REQUEST",
			ne: "false"
		}
	},
	{
		name: "Sail CI",
		constant: "SAIL",
		env: "SAILCI",
		pr: "SAIL_PULL_REQUEST_NUMBER"
	},
	{
		name: "Semaphore",
		constant: "SEMAPHORE",
		env: "SEMAPHORE",
		pr: "PULL_REQUEST_NUMBER"
	},
	{
		name: "Shippable",
		constant: "SHIPPABLE",
		env: "SHIPPABLE",
		pr: {
			IS_PULL_REQUEST: "true"
		}
	},
	{
		name: "Solano CI",
		constant: "SOLANO",
		env: "TDDIUM",
		pr: "TDDIUM_PR_ID"
	},
	{
		name: "Strider CD",
		constant: "STRIDER",
		env: "STRIDER"
	},
	{
		name: "TaskCluster",
		constant: "TASKCLUSTER",
		env: [
			"TASK_ID",
			"RUN_ID"
		]
	},
	{
		name: "TeamCity",
		constant: "TEAMCITY",
		env: "TEAMCITY_VERSION"
	},
	{
		name: "Travis CI",
		constant: "TRAVIS",
		env: "TRAVIS",
		pr: {
			env: "TRAVIS_PULL_REQUEST",
			ne: "false"
		}
	}
];

var ciInfo = entry.createCommonjsModule(function (module, exports) {



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

var scheduler_production_min = entry.createCommonjsModule(function (module, exports) {

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

var scheduler = entry.createCommonjsModule(function (module) {

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

var reactReconciler_production_min = entry.createCommonjsModule(function (module) {
module.exports = function $$$reconciler($$$hostConfig) {

  var aa = entry.objectAssign,
      ba = entry.react,
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

var reactReconciler = entry.createCommonjsModule(function (module) {

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
var _default$J = isFullwidthCodePoint$1;
isFullwidthCodePoint_1$1.default = _default$J;

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

var _default$I = stringWidth;
stringWidth_1.default = _default$I;

const widestLine = input => {
  let max = 0;

  for (const line of input.split('\n')) {
    max = Math.max(max, stringWidth_1(line));
  }

  return max;
};

var widestLine_1 = widestLine; // TODO: remove this in the next major version

var _default$H = widestLine;
widestLine_1.default = _default$H;

var __importDefault$o = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const widest_line_1$1 = __importDefault$o(widestLine_1);

const cache$1 = {};

var _default$G = text => {
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
	default: _default$G
}, '__esModule', {value: true});

var __importDefault$n = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$F = (node, style = {}) => {
  applyPositionStyles(node, style);
  applyMarginStyles(node, style);
  applyPaddingStyles(node, style);
  applyFlexStyles(node, style);
  applyDimensionStyles(node, style);
  applyDisplayStyles(node, style);
  applyBorderStyles(node, style);
};

var styles$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$F
}, '__esModule', {value: true});

/* MIT license */

/* eslint-disable no-mixed-operators */
 // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


const reverseKeywords$2 = {};

for (const key of Object.keys(entry.colorName)) {
  reverseKeywords$2[entry.colorName[key]] = key;
}

const convert$5 = {
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
var conversions$2 = convert$5; // Hide .channels and .labels properties

for (const model of Object.keys(convert$5)) {
  if (!('channels' in convert$5[model])) {
    throw new Error('missing channels property: ' + model);
  }

  if (!('labels' in convert$5[model])) {
    throw new Error('missing channel labels property: ' + model);
  }

  if (convert$5[model].labels.length !== convert$5[model].channels) {
    throw new Error('channel and label counts mismatch: ' + model);
  }

  const {
    channels,
    labels
  } = convert$5[model];
  delete convert$5[model].channels;
  delete convert$5[model].labels;
  Object.defineProperty(convert$5[model], 'channels', {
    value: channels
  });
  Object.defineProperty(convert$5[model], 'labels', {
    value: labels
  });
}

convert$5.rgb.hsl = function (rgb) {
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

convert$5.rgb.hsv = function (rgb) {
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

convert$5.rgb.hwb = function (rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = convert$5.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};

convert$5.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance$2(x, y) {
  /*
  	See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
  */
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}

convert$5.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords$2[rgb];

  if (reversed) {
    return reversed;
  }

  let currentClosestDistance = Infinity;
  let currentClosestKeyword;

  for (const keyword of Object.keys(entry.colorName)) {
    const value = entry.colorName[keyword]; // Compute comparative distance

    const distance = comparativeDistance$2(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert$5.keyword.rgb = function (keyword) {
  return entry.colorName[keyword];
};

convert$5.rgb.xyz = function (rgb) {
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

convert$5.rgb.lab = function (rgb) {
  const xyz = convert$5.rgb.xyz(rgb);
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

convert$5.hsl.rgb = function (hsl) {
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

convert$5.hsl.hsv = function (hsl) {
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

convert$5.hsv.rgb = function (hsv) {
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

convert$5.hsv.hsl = function (hsv) {
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


convert$5.hwb.rgb = function (hwb) {
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

convert$5.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};

convert$5.xyz.rgb = function (xyz) {
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

convert$5.xyz.lab = function (xyz) {
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

convert$5.lab.xyz = function (lab) {
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

convert$5.lab.lch = function (lab) {
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

convert$5.lch.lab = function (lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];
  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  return [l, a, b];
};

convert$5.rgb.ansi16 = function (args, saturation = null) {
  const [r, g, b] = args;
  let value = saturation === null ? convert$5.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

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

convert$5.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$5.rgb.ansi16(convert$5.hsv.rgb(args), args[2]);
};

convert$5.rgb.ansi256 = function (args) {
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

convert$5.ansi16.rgb = function (args) {
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

convert$5.ansi256.rgb = function (args) {
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

convert$5.rgb.hex = function (args) {
  const integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$5.hex.rgb = function (args) {
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

convert$5.rgb.hcg = function (rgb) {
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

convert$5.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
  let f = 0;

  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c);
  }

  return [hsl[0], c * 100, f * 100];
};

convert$5.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const c = s * v;
  let f = 0;

  if (c < 1.0) {
    f = (v - c) / (1 - c);
  }

  return [hsv[0], c * 100, f * 100];
};

convert$5.hcg.rgb = function (hcg) {
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

convert$5.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  let f = 0;

  if (v > 0.0) {
    f = c / v;
  }

  return [hcg[0], f * 100, v * 100];
};

convert$5.hcg.hsl = function (hcg) {
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

convert$5.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1.0 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert$5.hwb.hcg = function (hwb) {
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

convert$5.apple.rgb = function (apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};

convert$5.rgb.apple = function (rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};

convert$5.gray.rgb = function (args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert$5.gray.hsl = function (args) {
  return [0, 0, args[0]];
};

convert$5.gray.hsv = convert$5.gray.hsl;

convert$5.gray.hwb = function (gray) {
  return [0, 100, gray[0]];
};

convert$5.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]];
};

convert$5.gray.lab = function (gray) {
  return [gray[0], 0, 0];
};

convert$5.gray.hex = function (gray) {
  const val = Math.round(gray[0] / 100 * 255) & 0xFF;
  const integer = (val << 16) + (val << 8) + val;
  const string = integer.toString(16).toUpperCase();
  return '000000'.substring(string.length) + string;
};

convert$5.rgb.gray = function (rgb) {
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


function buildGraph$2() {
  const graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

  const models = Object.keys(conversions$2);

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


function deriveBFS$2(fromModel) {
  const graph = buildGraph$2();
  const queue = [fromModel]; // Unshift -> queue -> pop

  graph[fromModel].distance = 0;

  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions$2[current]);

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

function link$2(from, to) {
  return function (args) {
    return to(from(args));
  };
}

function wrapConversion$2(toModel, graph) {
  const path = [graph[toModel].parent, toModel];
  let fn = conversions$2[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;

  while (graph[cur].parent) {
    path.unshift(graph[cur].parent);
    fn = link$2(conversions$2[graph[cur].parent][cur], fn);
    cur = graph[cur].parent;
  }

  fn.conversion = path;
  return fn;
}

var route$2 = function (fromModel) {
  const graph = deriveBFS$2(fromModel);
  const conversion = {};
  const models = Object.keys(graph);

  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i];
    const node = graph[toModel];

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue;
    }

    conversion[toModel] = wrapConversion$2(toModel, graph);
  }

  return conversion;
};

const convert$4 = {};
const models$2 = Object.keys(conversions$2);

function wrapRaw$2(fn) {
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

function wrapRounded$2(fn) {
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

models$2.forEach(fromModel => {
  convert$4[fromModel] = {};
  Object.defineProperty(convert$4[fromModel], 'channels', {
    value: conversions$2[fromModel].channels
  });
  Object.defineProperty(convert$4[fromModel], 'labels', {
    value: conversions$2[fromModel].labels
  });
  const routes = route$2(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach(toModel => {
    const fn = routes[toModel];
    convert$4[fromModel][toModel] = wrapRounded$2(fn);
    convert$4[fromModel][toModel].raw = wrapRaw$2(fn);
  });
});
var colorConvert$2 = convert$4;

var ansiStyles$2 = entry.createCommonjsModule(function (module) {

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
    colorConvert = colorConvert$2;
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

const ESCAPES$2 = new Set(['\u001B', '\u009B']);
const END_CODE = 39;

const wrapAnsi$1 = code => `${ESCAPES$2.values().next().value}[${code}m`; // Calculate the length of words split on ' ', ignoring
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

    if (ESCAPES$2.has(character)) {
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

    if (ESCAPES$2.has(character)) {
      const code = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
      escapeCode = code === END_CODE ? null : code;
    }

    const code = ansiStyles$2.codes.get(Number(escapeCode));

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
var _default$E = isFullwidthCodePoint;
isFullwidthCodePoint_1.default = _default$E;

const regex$1 = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

const astralRegex$1 = options => options && options.exact ? new RegExp(`^${regex$1}$`) : new RegExp(regex$1, 'g');

var astralRegex_1 = astralRegex$1;

/* MIT license */

/* eslint-disable no-mixed-operators */
 // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


const reverseKeywords$1 = {};

for (const key of Object.keys(entry.colorName)) {
  reverseKeywords$1[entry.colorName[key]] = key;
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

  for (const keyword of Object.keys(entry.colorName)) {
    const value = entry.colorName[keyword]; // Compute comparative distance

    const distance = comparativeDistance$1(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert$3.keyword.rgb = function (keyword) {
  return entry.colorName[keyword];
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

var ansiStyles$1 = entry.createCommonjsModule(function (module) {

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

const ESCAPES$1 = ['\u001B', '\u009B'];

const wrapAnsi = code => `${ESCAPES$1[0]}[${code}m`;

const checkAnsi = (ansiCodes, isEscapes, endAnsiCode) => {
  let output = [];
  ansiCodes = [...ansiCodes];

  for (let ansiCode of ansiCodes) {
    const ansiCodeOrigin = ansiCode;

    if (ansiCode.match(';')) {
      ansiCode = ansiCode.split(';')[0][0] + '0';
    }

    const item = ansiStyles$1.codes.get(parseInt(ansiCode, 10));

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
      const fistEscapeCode = wrapAnsi(ansiStyles$1.codes.get(parseInt(endAnsiCode, 10)));
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

    if (ESCAPES$1.includes(character)) {
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

var __importDefault$m = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const wrap_ansi_1 = __importDefault$m(wrapAnsi_1);

const cli_truncate_1 = __importDefault$m(cliTruncate);

const cache = {};

var _default$D = (text, maxWidth, wrapType) => {
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
	default: _default$D
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

var _default$C = squashTextNodes;

var squashTextNodes_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$C
}, '__esModule', {value: true});

var dom$1 = entry.createCommonjsModule(function (module, exports) {

var __importDefault = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

const styles_1 = __importDefault(styles$1);

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

var __importDefault$l = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$B = react_reconciler_1.default({
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
	default: _default$B
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

var __importDefault$k = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const yoga_layout_prebuilt_1$2 = __importDefault$k(require$$0__default['default']);

var _default$A = yogaNode => {
  return yogaNode.getComputedWidth() - yogaNode.getComputedPadding(yoga_layout_prebuilt_1$2.default.EDGE_LEFT) - yogaNode.getComputedPadding(yoga_layout_prebuilt_1$2.default.EDGE_RIGHT) - yogaNode.getComputedBorder(yoga_layout_prebuilt_1$2.default.EDGE_LEFT) - yogaNode.getComputedBorder(yoga_layout_prebuilt_1$2.default.EDGE_RIGHT);
};

var getMaxWidth = /*#__PURE__*/Object.defineProperty({
	default: _default$A
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

var _default$z = cliBoxes;
cliBoxes_1.default = _default$z;

/* MIT license */

/* eslint-disable no-mixed-operators */
 // NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)


const reverseKeywords = {};

for (const key of Object.keys(entry.colorName)) {
  reverseKeywords[entry.colorName[key]] = key;
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

  for (const keyword of Object.keys(entry.colorName)) {
    const value = entry.colorName[keyword]; // Compute comparative distance

    const distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }

  return currentClosestKeyword;
};

convert$1.keyword.rgb = function (keyword) {
  return entry.colorName[keyword];
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

var ansiStyles = entry.createCommonjsModule(function (module) {

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
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
const ESCAPES = new Map([['n', '\n'], ['r', '\r'], ['t', '\t'], ['b', '\b'], ['f', '\f'], ['v', '\v'], ['0', '\0'], ['\\', '\\'], ['e', '\u001B'], ['a', '\u0007']]);

function unescape(c) {
  const u = c[0] === 'u';
  const bracket = c[1] === '{';

  if (u && !bracket && c.length === 5 || c[0] === 'x' && c.length === 3) {
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
    } else if (matches = chunk.match(STRING_REGEX)) {
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
  let chunk = []; // eslint-disable-next-line max-params

  temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
    if (escapeCharacter) {
      chunk.push(unescape(escapeCharacter));
    } else if (style) {
      const string = chunk.join('');
      chunk = [];
      chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
      styles.push({
        inverse,
        styles: parseStyle(style)
      });
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
    const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
    throw new Error(errMessage);
  }

  return chunks.join('');
};

const {
  stdout: stdoutColor,
  stderr: stderrColor
} = entry.supportsColor_1;

const {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex
} = util;

const {
  isArray
} = Array; // `supportsColor.level` → `ansiStyles.color[name]` mapping

const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];
const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error('The `level` option should be an integer from 0 to 3');
  } // Detect level if not set manually


  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
  constructor(options) {
    // eslint-disable-next-line no-constructor-return
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
      Object.defineProperty(this, styleName, {
        value: builder
      });
      return builder;
    }

  };
}

styles.visible = {
  get() {
    const builder = createBuilder(this, this._styler, true);
    Object.defineProperty(this, 'visible', {
      value: builder
    });
    return builder;
  }

};
const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
  styles[model] = {
    get() {
      const {
        level
      } = this;
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
      const {
        level
      } = this;
      return function (...arguments_) {
        const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
        return createBuilder(this, styler, this._isEmpty);
      };
    }

  };
}

const proto = Object.defineProperties(() => {}, { ...styles,
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
    if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
      // Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
      return applyStyle(builder, chalkTag(builder, ...arguments_));
    } // Single argument is hot path, implicit coercion is faster than anything
    // eslint-disable-next-line no-implicit-coercion


    return applyStyle(builder, arguments_.length === 1 ? '' + arguments_[0] : arguments_.join(' '));
  }; // We alter the prototype because we must return a function, but there is
  // no way to create a function with a different prototype


  Object.setPrototypeOf(builder, proto);
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

  const {
    openAll,
    closeAll
  } = styler;

  if (string.indexOf('\u001B') !== -1) {
    while (styler !== undefined) {
      // Replace any instances already present with a re-opening code
      // otherwise only the part of the string until said closing code
      // will be colored, and the rest will simply be 'plain'.
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  } // We can move both next actions out of loop, because remaining actions in loop won't have
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

  if (!isArray(firstString) || !isArray(firstString.raw)) {
    // If chalk() was called by itself or with a string,
    // return the string itself as a string.
    return strings.join(' ');
  }

  const arguments_ = strings.slice(1);
  const parts = [firstString.raw[0]];

  for (let i = 1; i < firstString.length; i++) {
    parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'), String(firstString.raw[i]));
  }

  if (template === undefined) {
    template = templates;
  }

  return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);
const chalk = Chalk(); // eslint-disable-line new-cap

chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({
  level: stderrColor ? stderrColor.level : 0
}); // eslint-disable-line new-cap

chalk.stderr.supportsColor = stderrColor;
var source = chalk;

var __importDefault$j = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const chalk_1$1 = __importDefault$j(source);

const RGB_LIKE_REGEX = /^(rgb|hsl|hsv|hwb)\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/;
const ANSI_REGEX = /^(ansi|ansi256)\(\s?(\d+)\s?\)$/;

const getMethod = (name, type) => {
  if (type === 'foreground') {
    return name;
  }

  return 'bg' + name[0].toUpperCase() + name.slice(1);
};

var _default$y = (str, color, type) => {
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
	default: _default$y
}, '__esModule', {value: true});

var __importDefault$i = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const cli_boxes_1 = __importDefault$i(cliBoxes_1);

const colorize_1$1 = __importDefault$i(colorize);

var _default$x = (x, y, node, output) => {
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
	default: _default$x
}, '__esModule', {value: true});

var __importDefault$h = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$w = renderNodeToOutput;

var renderNodeToOutput_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$w
}, '__esModule', {value: true});

const regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]';

var astralRegex = opts => opts && opts.exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');

const stringLength = string => stripAnsi__default['default'](string).replace(astralRegex(), ' ').length;

var stringLength_1 = stringLength; // TODO: Remove this for the next major release

var _default$v = stringLength;
stringLength_1.default = _default$v;

var __importDefault$g = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$u = Output;

var output = /*#__PURE__*/Object.defineProperty({
	default: _default$u
}, '__esModule', {value: true});

var __importDefault$f = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const yoga_layout_prebuilt_1 = __importDefault$f(require$$0__default['default']);

const render_node_to_output_1 = __importDefault$f(renderNodeToOutput_1);

const output_1 = __importDefault$f(output);

var _default$t = (node, terminalWidth) => {
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
	default: _default$t
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

var build$2 = patchConsole;

// Store all instances of Ink (instance.js) to ensure that consecutive render() calls
// use the same instance of Ink and don't create a new one
//
// This map has to be stored in a separate file, because render.js creates instances,
// but instance.js should delete itself from the map on unmount

var _default$s = new WeakMap();

var instances = /*#__PURE__*/Object.defineProperty({
	default: _default$s
}, '__esModule', {value: true});

/**
 * `AppContext` is a React context, which exposes a method to manually exit the app (unmount).
 */


const AppContext = entry.react.createContext({
  exit: () => {}
});
AppContext.displayName = 'InternalAppContext';
var _default$r = AppContext;

var AppContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$r
}, '__esModule', {value: true});

/**
 * `StdinContext` is a React context, which exposes input stream.
 */


const StdinContext = entry.react.createContext({
  stdin: undefined,
  setRawMode: () => {},
  isRawModeSupported: false,
  internal_exitOnCtrlC: true
});
StdinContext.displayName = 'InternalStdinContext';
var _default$q = StdinContext;

var StdinContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$q
}, '__esModule', {value: true});

/**
 * `StdoutContext` is a React context, which exposes stdout stream, where Ink renders your app.
 */


const StdoutContext = entry.react.createContext({
  stdout: undefined,
  write: () => {}
});
StdoutContext.displayName = 'InternalStdoutContext';
var _default$p = StdoutContext;

var StdoutContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$p
}, '__esModule', {value: true});

/**
 * `StderrContext` is a React context, which exposes stderr stream.
 */


const StderrContext = entry.react.createContext({
  stderr: undefined,
  write: () => {}
});
StderrContext.displayName = 'InternalStderrContext';
var _default$o = StderrContext;

var StderrContext_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$o
}, '__esModule', {value: true});

const FocusContext = entry.react.createContext({
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
var _default$n = FocusContext;

var FocusContext_1$3 = /*#__PURE__*/Object.defineProperty({
	default: _default$n
}, '__esModule', {value: true});

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

var escapeStringRegexp$1 = string => {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  return string.replace(matchOperatorsRegex, '\\$&');
};

const natives = [].concat(require$$0__default$1['default'].builtinModules, 'bootstrap_node', 'node').map(n => new RegExp(`(?:\\(${n}\\.js:\\d+:\\d+\\)$|^\\s*at ${n}\\.js:\\d+:\\d+$)`));
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

  const packages = ignoredPackages.map(mod => escapeStringRegexp$1(mod));
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

var __createBinding$4 = entry.commonjsGlobal && entry.commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
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

var __setModuleDefault$4 = entry.commonjsGlobal && entry.commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$4 = entry.commonjsGlobal && entry.commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);

  __setModuleDefault$4(result, mod);

  return result;
};

var __rest = entry.commonjsGlobal && entry.commonjsGlobal.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const react_1$a = __importStar$4(entry.react);
/**
 * `<Box>` is an essential Ink component to build your layout. It's like `<div style="display: flex">` in the browser.
 */


const Box = react_1$a.forwardRef((_a, ref) => {
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
  return react_1$a.default.createElement("ink-box", {
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
var _default$m = Box;

var Box_1$2 = /*#__PURE__*/Object.defineProperty({
	default: _default$m
}, '__esModule', {value: true});

var __importDefault$e = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$9 = __importDefault$e(entry.react);

const chalk_1 = __importDefault$e(source);

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

  return react_1$9.default.createElement("ink-text", {
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
var _default$l = Text;

var Text_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$l
}, '__esModule', {value: true});

var __createBinding$3 = entry.commonjsGlobal && entry.commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
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

var __setModuleDefault$3 = entry.commonjsGlobal && entry.commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$3 = entry.commonjsGlobal && entry.commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);

  __setModuleDefault$3(result, mod);

  return result;
};

var __importDefault$d = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const fs = __importStar$3(fs__default['default']);

const react_1$8 = __importDefault$d(entry.react);

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

  return react_1$8.default.createElement(Box_1$1.default, {
    flexDirection: "column",
    padding: 1
  }, react_1$8.default.createElement(Box_1$1.default, null, react_1$8.default.createElement(Text_1.default, {
    backgroundColor: "red",
    color: "white"
  }, ' ', "ERROR", ' '), react_1$8.default.createElement(Text_1.default, null, " ", error.message)), origin && react_1$8.default.createElement(Box_1$1.default, {
    marginTop: 1
  }, react_1$8.default.createElement(Text_1.default, {
    dimColor: true
  }, origin.file, ":", origin.line, ":", origin.column)), origin && excerpt && react_1$8.default.createElement(Box_1$1.default, {
    marginTop: 1,
    flexDirection: "column"
  }, excerpt.map(({
    line,
    value
  }) => react_1$8.default.createElement(Box_1$1.default, {
    key: line
  }, react_1$8.default.createElement(Box_1$1.default, {
    width: lineWidth + 1
  }, react_1$8.default.createElement(Text_1.default, {
    dimColor: line !== origin.line,
    backgroundColor: line === origin.line ? 'red' : undefined,
    color: line === origin.line ? 'white' : undefined
  }, String(line).padStart(lineWidth, ' '), ":")), react_1$8.default.createElement(Text_1.default, {
    key: line,
    backgroundColor: line === origin.line ? 'red' : undefined,
    color: line === origin.line ? 'white' : undefined
  }, ' ' + value)))), error.stack && react_1$8.default.createElement(Box_1$1.default, {
    marginTop: 1,
    flexDirection: "column"
  }, error.stack.split('\n').slice(1).map(line => {
    const parsedLine = stackUtils.parseLine(line); // If the line from the stack cannot be parsed, we print out the unparsed line.

    if (!parsedLine) {
      return react_1$8.default.createElement(Box_1$1.default, {
        key: line
      }, react_1$8.default.createElement(Text_1.default, {
        dimColor: true
      }, "- "), react_1$8.default.createElement(Text_1.default, {
        dimColor: true,
        bold: true
      }, line));
    }

    return react_1$8.default.createElement(Box_1$1.default, {
      key: line
    }, react_1$8.default.createElement(Text_1.default, {
      dimColor: true
    }, "- "), react_1$8.default.createElement(Text_1.default, {
      dimColor: true,
      bold: true
    }, parsedLine.function), react_1$8.default.createElement(Text_1.default, {
      dimColor: true,
      color: "gray"
    }, ' ', "(", parsedLine.file, ":", parsedLine.line, ":", parsedLine.column, ")"));
  })));
};

var _default$k = ErrorOverview;

var ErrorOverview_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$k
}, '__esModule', {value: true});

var __createBinding$2 = entry.commonjsGlobal && entry.commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
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

var __setModuleDefault$2 = entry.commonjsGlobal && entry.commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$2 = entry.commonjsGlobal && entry.commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);

  __setModuleDefault$2(result, mod);

  return result;
};

var __importDefault$c = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};


/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const react_1$7 = __importStar$2(entry.react);

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

class App extends react_1$7.PureComponent {
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
    return react_1$7.default.createElement(AppContext_1$1.default.Provider, {
      value: {
        exit: this.handleExit
      }
    }, react_1$7.default.createElement(StdinContext_1$1.default.Provider, {
      value: {
        stdin: this.props.stdin,
        setRawMode: this.handleSetRawMode,
        isRawModeSupported: this.isRawModeSupported(),
        internal_exitOnCtrlC: this.props.exitOnCtrlC
      }
    }, react_1$7.default.createElement(StdoutContext_1$1.default.Provider, {
      value: {
        stdout: this.props.stdout,
        write: this.props.writeToStdout
      }
    }, react_1$7.default.createElement(StderrContext_1$1.default.Provider, {
      value: {
        stderr: this.props.stderr,
        write: this.props.writeToStderr
      }
    }, react_1$7.default.createElement(FocusContext_1$2.default.Provider, {
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
    }, this.state.error ? react_1$7.default.createElement(ErrorOverview_1.default, {
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

var _default$j = App;
App.displayName = 'InternalApp';

var App_1$1 = /*#__PURE__*/Object.defineProperty({
	default: _default$j
}, '__esModule', {value: true});

var __createBinding$1 = entry.commonjsGlobal && entry.commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
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

var __setModuleDefault$1 = entry.commonjsGlobal && entry.commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar$1 = entry.commonjsGlobal && entry.commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);

  __setModuleDefault$1(result, mod);

  return result;
};

var __importDefault$b = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$6 = __importDefault$b(entry.react);



const log_update_1 = __importDefault$b(logUpdate);

const ansi_escapes_1 = __importDefault$b(ansiEscapes_1);

const is_ci_1 = __importDefault$b(isCi);

const auto_bind_1 = __importDefault$b(autoBind);

const reconciler_1 = __importDefault$b(reconciler);

const renderer_1 = __importDefault$b(renderer);

const signal_exit_1 = __importDefault$b(signalExit);

const patch_console_1 = __importDefault$b(build$2);

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
    this.rootNode.onRender = options.debug ? this.onRender : ___default['default'].throttle(this.onRender, 32, {
      leading: true,
      trailing: true
    });
    this.rootNode.onImmediateRender = this.onRender;
    this.log = log_update_1.default.create(options.stdout);
    this.throttledLog = options.debug ? this.log : ___default['default'].throttle(this.log, undefined, {
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
    const tree = react_1$6.default.createElement(App_1.default, {
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

var _default$i = Ink;

var ink = /*#__PURE__*/Object.defineProperty({
	default: _default$i
}, '__esModule', {value: true});

var __importDefault$a = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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

var _default$h = render;

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
	default: _default$h
}, '__esModule', {value: true});

var __createBinding = entry.commonjsGlobal && entry.commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
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

var __setModuleDefault = entry.commonjsGlobal && entry.commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = entry.commonjsGlobal && entry.commonjsGlobal.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};



const react_1$5 = __importStar(entry.react);
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
  const [index, setIndex] = react_1$5.useState(0);
  const itemsToRender = react_1$5.useMemo(() => {
    return items.slice(index);
  }, [items, index]);
  react_1$5.useLayoutEffect(() => {
    setIndex(items.length);
  }, [items.length]);
  const children = itemsToRender.map((item, itemIndex) => {
    return render(item, index + itemIndex);
  });
  const style = react_1$5.useMemo(() => Object.assign({
    position: 'absolute',
    flexDirection: 'column'
  }, customStyle), [customStyle]);
  return react_1$5.default.createElement("ink-box", {
    // @ts-ignore
    internal_static: true,
    style: style
  }, children);
};

Static.displayName = 'Static';
var _default$g = Static;

var Static_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$g
}, '__esModule', {value: true});

var __importDefault$9 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$4 = __importDefault$9(entry.react);
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

  return react_1$4.default.createElement("ink-text", {
    style: {
      flexGrow: 0,
      flexShrink: 1,
      flexDirection: 'row'
    },
    internal_transform: transform
  }, children);
};

Transform.displayName = 'Transform';
var _default$f = Transform;

var Transform_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$f
}, '__esModule', {value: true});

var __importDefault$8 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$3 = __importDefault$8(entry.react);
/**
 * Adds one or more newline (\n) characters. Must be used within <Text> components.
 */


const Newline = ({
  count = 1
}) => react_1$3.default.createElement("ink-text", null, '\n'.repeat(count));

Newline.displayName = 'Newline';
var _default$e = Newline;

var Newline_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$e
}, '__esModule', {value: true});

var __importDefault$7 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};



const react_1$2 = __importDefault$7(entry.react);

const Box_1 = __importDefault$7(Box_1$2);
/**
 * A flexible space that expands along the major axis of its containing layout.
 * It's useful as a shortcut for filling all the available spaces between elements.
 */


const Spacer = () => react_1$2.default.createElement(Box_1.default, {
  flexGrow: 1
});

Spacer.displayName = 'Spacer';
var _default$d = Spacer;

var Spacer_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$d
}, '__esModule', {value: true});

var __importDefault$6 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StdinContext_1 = __importDefault$6(StdinContext_1$2);
/**
 * `useStdin` is a React hook, which exposes stdin stream.
 */


const useStdin = () => entry.react.useContext(StdinContext_1.default);

var _default$c = useStdin;

var useStdin_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$c
}, '__esModule', {value: true});

var __importDefault$5 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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
  entry.react.useEffect(() => {
    if (options.isActive === false) {
      return;
    }

    setRawMode(true);
    return () => {
      setRawMode(false);
    };
  }, [options.isActive, setRawMode]);
  entry.react.useEffect(() => {
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

var _default$b = useInput;

var useInput_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$b
}, '__esModule', {value: true});

var __importDefault$4 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const AppContext_1 = __importDefault$4(AppContext_1$2);
/**
 * `useApp` is a React hook, which exposes a method to manually exit the app (unmount).
 */


const useApp = () => entry.react.useContext(AppContext_1.default);

var _default$a = useApp;

var useApp_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$a
}, '__esModule', {value: true});

var __importDefault$3 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StdoutContext_1 = __importDefault$3(StdoutContext_1$2);
/**
 * `useStdout` is a React hook, which exposes stdout stream.
 */


const useStdout = () => entry.react.useContext(StdoutContext_1.default);

var _default$9 = useStdout;

var useStdout_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$9
}, '__esModule', {value: true});

var __importDefault$2 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};





const StderrContext_1 = __importDefault$2(StderrContext_1$2);
/**
 * `useStderr` is a React hook, which exposes stderr stream.
 */


const useStderr = () => entry.react.useContext(StderrContext_1.default);

var _default$8 = useStderr;

var useStderr_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$8
}, '__esModule', {value: true});

var __importDefault$1 = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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
  } = entry.react.useContext(FocusContext_1$1.default);
  const id = entry.react.useMemo(() => Math.random().toString().slice(2, 7), []);
  entry.react.useEffect(() => {
    add(id, {
      autoFocus
    });
    return () => {
      remove(id);
    };
  }, [id, autoFocus]);
  entry.react.useEffect(() => {
    if (isActive) {
      activate(id);
    } else {
      deactivate(id);
    }
  }, [isActive, id]);
  entry.react.useEffect(() => {
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

var _default$7 = useFocus;

var useFocus_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$7
}, '__esModule', {value: true});

var __importDefault = entry.commonjsGlobal && entry.commonjsGlobal.__importDefault || function (mod) {
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
  const focusContext = entry.react.useContext(FocusContext_1.default);
  return {
    enableFocus: focusContext.enableFocus,
    disableFocus: focusContext.disableFocus,
    focusNext: focusContext.focusNext,
    focusPrevious: focusContext.focusPrevious
  };
};

var _default$6 = useFocusManager;

var useFocusManager_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$6
}, '__esModule', {value: true});

/**
 * Measure the dimensions of a particular `<Box>` element.
 */

var _default$5 = node => {
  var _a, _b, _c, _d;

  return {
    width: (_b = (_a = node.yogaNode) === null || _a === void 0 ? void 0 : _a.getComputedWidth()) !== null && _b !== void 0 ? _b : 0,
    height: (_d = (_c = node.yogaNode) === null || _c === void 0 ? void 0 : _c.getComputedHeight()) !== null && _d !== void 0 ? _d : 0
  };
};

var measureElement = /*#__PURE__*/Object.defineProperty({
	default: _default$5
}, '__esModule', {value: true});

var build$1 = entry.createCommonjsModule(function (module, exports) {

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

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  return str.replace(matchOperatorsRe, '\\$&');
};

const {
  platform
} = process;
const main = {
  tick: '✔',
  cross: '✖',
  star: '★',
  square: '▇',
  squareSmall: '◻',
  squareSmallFilled: '◼',
  play: '▶',
  circle: '◯',
  circleFilled: '◉',
  circleDotted: '◌',
  circleDouble: '◎',
  circleCircle: 'ⓞ',
  circleCross: 'ⓧ',
  circlePipe: 'Ⓘ',
  circleQuestionMark: '?⃝',
  bullet: '●',
  dot: '․',
  line: '─',
  ellipsis: '…',
  pointer: '❯',
  pointerSmall: '›',
  info: 'ℹ',
  warning: '⚠',
  hamburger: '☰',
  smiley: '㋡',
  mustache: '෴',
  heart: '♥',
  nodejs: '⬢',
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  checkboxOn: '☒',
  checkboxOff: '☐',
  checkboxCircleOn: 'ⓧ',
  checkboxCircleOff: 'Ⓘ',
  questionMarkPrefix: '?⃝',
  oneHalf: '½',
  oneThird: '⅓',
  oneQuarter: '¼',
  oneFifth: '⅕',
  oneSixth: '⅙',
  oneSeventh: '⅐',
  oneEighth: '⅛',
  oneNinth: '⅑',
  oneTenth: '⅒',
  twoThirds: '⅔',
  twoFifths: '⅖',
  threeQuarters: '¾',
  threeFifths: '⅗',
  threeEighths: '⅜',
  fourFifths: '⅘',
  fiveSixths: '⅚',
  fiveEighths: '⅝',
  sevenEighths: '⅞'
};
const windows = {
  tick: '√',
  cross: '×',
  star: '*',
  square: '█',
  squareSmall: '[ ]',
  squareSmallFilled: '[█]',
  play: '►',
  circle: '( )',
  circleFilled: '(*)',
  circleDotted: '( )',
  circleDouble: '( )',
  circleCircle: '(○)',
  circleCross: '(×)',
  circlePipe: '(│)',
  circleQuestionMark: '(?)',
  bullet: '*',
  dot: '.',
  line: '─',
  ellipsis: '...',
  pointer: '>',
  pointerSmall: '»',
  info: 'i',
  warning: '‼',
  hamburger: '≡',
  smiley: '☺',
  mustache: '┌─┐',
  heart: main.heart,
  nodejs: '♦',
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',
  checkboxOn: '[×]',
  checkboxOff: '[ ]',
  checkboxCircleOn: '(×)',
  checkboxCircleOff: '( )',
  questionMarkPrefix: '？',
  oneHalf: '1/2',
  oneThird: '1/3',
  oneQuarter: '1/4',
  oneFifth: '1/5',
  oneSixth: '1/6',
  oneSeventh: '1/7',
  oneEighth: '1/8',
  oneNinth: '1/9',
  oneTenth: '1/10',
  twoThirds: '2/3',
  twoFifths: '2/5',
  threeQuarters: '3/4',
  threeFifths: '3/5',
  threeEighths: '3/8',
  fourFifths: '4/5',
  fiveSixths: '5/6',
  fiveEighths: '5/8',
  sevenEighths: '7/8'
};

if (platform === 'linux') {
  // The main one doesn't look that good on Ubuntu.
  main.questionMarkPrefix = '?';
}

const figures = platform === 'win32' ? windows : main;

const fn = string => {
  if (figures === main) {
    return string;
  }

  for (const [key, value] of Object.entries(main)) {
    if (value === figures[key]) {
      continue;
    }

    string = string.replace(new RegExp(escapeStringRegexp(value), 'g'), figures[key]);
  }

  return string;
};

var figures_1 = Object.assign(fn, figures);
var main_1 = main;
var windows_1 = windows;
figures_1.main = main_1;
figures_1.windows = windows_1;

const Indicator = ({
  isSelected = false
}) => entry.react.createElement(build$1.Box, {
  marginRight: 1
}, isSelected ? entry.react.createElement(build$1.Text, {
  color: "blue"
}, figures_1.pointer) : entry.react.createElement(build$1.Text, null, " "));

var _default$4 = Indicator;

var Indicator_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$4
}, '__esModule', {value: true});

const Item = ({
  isSelected = false,
  label
}) => entry.react.createElement(build$1.Text, {
  color: isSelected ? 'blue' : undefined
}, label);

var _default$3 = Item;

var Item_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$3
}, '__esModule', {value: true});

const react_1$1 = entry.react;









 // eslint-disable-next-line react/function-component-definition


function SelectInput$1({
  items = [],
  isFocused = true,
  initialIndex = 0,
  indicatorComponent = Indicator_1.default,
  itemComponent = Item_1.default,
  limit: customLimit,
  onSelect,
  onHighlight
}) {
  const [rotateIndex, setRotateIndex] = react_1$1.useState(0);
  const [selectedIndex, setSelectedIndex] = react_1$1.useState(initialIndex);
  const hasLimit = typeof customLimit === 'number' && items.length > customLimit;
  const limit = hasLimit ? Math.min(customLimit, items.length) : items.length;
  const previousItems = react_1$1.useRef(items);
  react_1$1.useEffect(() => {
    if (!lodash_isequal(previousItems.current.map(item => item.value), items.map(item => item.value))) {
      setRotateIndex(0);
      setSelectedIndex(0);
    }

    previousItems.current = items;
  }, [items]);
  build$1.useInput(react_1$1.useCallback((input, key) => {
    if (input === 'k' || key.upArrow) {
      const lastIndex = (hasLimit ? limit : items.length) - 1;
      const atFirstIndex = selectedIndex === 0;
      const nextIndex = hasLimit ? selectedIndex : lastIndex;
      const nextRotateIndex = atFirstIndex ? rotateIndex + 1 : rotateIndex;
      const nextSelectedIndex = atFirstIndex ? nextIndex : selectedIndex - 1;
      setRotateIndex(nextRotateIndex);
      setSelectedIndex(nextSelectedIndex);
      const slicedItems = hasLimit ? arrRotate(items, nextRotateIndex).slice(0, limit) : items;

      if (typeof onHighlight === 'function') {
        onHighlight(slicedItems[nextSelectedIndex]);
      }
    }

    if (input === 'j' || key.downArrow) {
      const atLastIndex = selectedIndex === (hasLimit ? limit : items.length) - 1;
      const nextIndex = hasLimit ? selectedIndex : 0;
      const nextRotateIndex = atLastIndex ? rotateIndex - 1 : rotateIndex;
      const nextSelectedIndex = atLastIndex ? nextIndex : selectedIndex + 1;
      setRotateIndex(nextRotateIndex);
      setSelectedIndex(nextSelectedIndex);
      const slicedItems = hasLimit ? arrRotate(items, nextRotateIndex).slice(0, limit) : items;

      if (typeof onHighlight === 'function') {
        onHighlight(slicedItems[nextSelectedIndex]);
      }
    }

    if (key.return) {
      const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;

      if (typeof onSelect === 'function') {
        onSelect(slicedItems[selectedIndex]);
      }
    }
  }, [hasLimit, limit, rotateIndex, selectedIndex, items, onSelect, onHighlight]), {
    isActive: isFocused
  });
  const slicedItems = hasLimit ? arrRotate(items, rotateIndex).slice(0, limit) : items;
  return entry.react.createElement(build$1.Box, {
    flexDirection: "column"
  }, slicedItems.map((item, index) => {
    var _a;

    const isSelected = index === selectedIndex;
    return entry.react.createElement(build$1.Box, {
      key: (_a = item.key) !== null && _a !== void 0 ? _a : item.value
    }, entry.react.createElement(indicatorComponent, {
      isSelected
    }), entry.react.createElement(itemComponent, { ...item,
      isSelected
    }));
  }));
}

var _default$2 = SelectInput$1;

var SelectInput_1 = /*#__PURE__*/Object.defineProperty({
	default: _default$2
}, '__esModule', {value: true});

var build = entry.createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



exports.default = SelectInput_1.default;



Object.defineProperty(exports, "Indicator", {
  enumerable: true,
  get: function () {
    return Indicator_1.default;
  }
});



Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function () {
    return Item_1.default;
  }
});
});

var SelectInput = /*@__PURE__*/entry.getDefaultExportFromCjs(build);

var dots = {
	interval: 80,
	frames: [
		"⠋",
		"⠙",
		"⠹",
		"⠸",
		"⠼",
		"⠴",
		"⠦",
		"⠧",
		"⠇",
		"⠏"
	]
};
var dots2 = {
	interval: 80,
	frames: [
		"⣾",
		"⣽",
		"⣻",
		"⢿",
		"⡿",
		"⣟",
		"⣯",
		"⣷"
	]
};
var dots3 = {
	interval: 80,
	frames: [
		"⠋",
		"⠙",
		"⠚",
		"⠞",
		"⠖",
		"⠦",
		"⠴",
		"⠲",
		"⠳",
		"⠓"
	]
};
var dots4 = {
	interval: 80,
	frames: [
		"⠄",
		"⠆",
		"⠇",
		"⠋",
		"⠙",
		"⠸",
		"⠰",
		"⠠",
		"⠰",
		"⠸",
		"⠙",
		"⠋",
		"⠇",
		"⠆"
	]
};
var dots5 = {
	interval: 80,
	frames: [
		"⠋",
		"⠙",
		"⠚",
		"⠒",
		"⠂",
		"⠂",
		"⠒",
		"⠲",
		"⠴",
		"⠦",
		"⠖",
		"⠒",
		"⠐",
		"⠐",
		"⠒",
		"⠓",
		"⠋"
	]
};
var dots6 = {
	interval: 80,
	frames: [
		"⠁",
		"⠉",
		"⠙",
		"⠚",
		"⠒",
		"⠂",
		"⠂",
		"⠒",
		"⠲",
		"⠴",
		"⠤",
		"⠄",
		"⠄",
		"⠤",
		"⠴",
		"⠲",
		"⠒",
		"⠂",
		"⠂",
		"⠒",
		"⠚",
		"⠙",
		"⠉",
		"⠁"
	]
};
var dots7 = {
	interval: 80,
	frames: [
		"⠈",
		"⠉",
		"⠋",
		"⠓",
		"⠒",
		"⠐",
		"⠐",
		"⠒",
		"⠖",
		"⠦",
		"⠤",
		"⠠",
		"⠠",
		"⠤",
		"⠦",
		"⠖",
		"⠒",
		"⠐",
		"⠐",
		"⠒",
		"⠓",
		"⠋",
		"⠉",
		"⠈"
	]
};
var dots8 = {
	interval: 80,
	frames: [
		"⠁",
		"⠁",
		"⠉",
		"⠙",
		"⠚",
		"⠒",
		"⠂",
		"⠂",
		"⠒",
		"⠲",
		"⠴",
		"⠤",
		"⠄",
		"⠄",
		"⠤",
		"⠠",
		"⠠",
		"⠤",
		"⠦",
		"⠖",
		"⠒",
		"⠐",
		"⠐",
		"⠒",
		"⠓",
		"⠋",
		"⠉",
		"⠈",
		"⠈"
	]
};
var dots9 = {
	interval: 80,
	frames: [
		"⢹",
		"⢺",
		"⢼",
		"⣸",
		"⣇",
		"⡧",
		"⡗",
		"⡏"
	]
};
var dots10 = {
	interval: 80,
	frames: [
		"⢄",
		"⢂",
		"⢁",
		"⡁",
		"⡈",
		"⡐",
		"⡠"
	]
};
var dots11 = {
	interval: 100,
	frames: [
		"⠁",
		"⠂",
		"⠄",
		"⡀",
		"⢀",
		"⠠",
		"⠐",
		"⠈"
	]
};
var dots12 = {
	interval: 80,
	frames: [
		"⢀⠀",
		"⡀⠀",
		"⠄⠀",
		"⢂⠀",
		"⡂⠀",
		"⠅⠀",
		"⢃⠀",
		"⡃⠀",
		"⠍⠀",
		"⢋⠀",
		"⡋⠀",
		"⠍⠁",
		"⢋⠁",
		"⡋⠁",
		"⠍⠉",
		"⠋⠉",
		"⠋⠉",
		"⠉⠙",
		"⠉⠙",
		"⠉⠩",
		"⠈⢙",
		"⠈⡙",
		"⢈⠩",
		"⡀⢙",
		"⠄⡙",
		"⢂⠩",
		"⡂⢘",
		"⠅⡘",
		"⢃⠨",
		"⡃⢐",
		"⠍⡐",
		"⢋⠠",
		"⡋⢀",
		"⠍⡁",
		"⢋⠁",
		"⡋⠁",
		"⠍⠉",
		"⠋⠉",
		"⠋⠉",
		"⠉⠙",
		"⠉⠙",
		"⠉⠩",
		"⠈⢙",
		"⠈⡙",
		"⠈⠩",
		"⠀⢙",
		"⠀⡙",
		"⠀⠩",
		"⠀⢘",
		"⠀⡘",
		"⠀⠨",
		"⠀⢐",
		"⠀⡐",
		"⠀⠠",
		"⠀⢀",
		"⠀⡀"
	]
};
var dots8Bit = {
	interval: 80,
	frames: [
		"⠀",
		"⠁",
		"⠂",
		"⠃",
		"⠄",
		"⠅",
		"⠆",
		"⠇",
		"⡀",
		"⡁",
		"⡂",
		"⡃",
		"⡄",
		"⡅",
		"⡆",
		"⡇",
		"⠈",
		"⠉",
		"⠊",
		"⠋",
		"⠌",
		"⠍",
		"⠎",
		"⠏",
		"⡈",
		"⡉",
		"⡊",
		"⡋",
		"⡌",
		"⡍",
		"⡎",
		"⡏",
		"⠐",
		"⠑",
		"⠒",
		"⠓",
		"⠔",
		"⠕",
		"⠖",
		"⠗",
		"⡐",
		"⡑",
		"⡒",
		"⡓",
		"⡔",
		"⡕",
		"⡖",
		"⡗",
		"⠘",
		"⠙",
		"⠚",
		"⠛",
		"⠜",
		"⠝",
		"⠞",
		"⠟",
		"⡘",
		"⡙",
		"⡚",
		"⡛",
		"⡜",
		"⡝",
		"⡞",
		"⡟",
		"⠠",
		"⠡",
		"⠢",
		"⠣",
		"⠤",
		"⠥",
		"⠦",
		"⠧",
		"⡠",
		"⡡",
		"⡢",
		"⡣",
		"⡤",
		"⡥",
		"⡦",
		"⡧",
		"⠨",
		"⠩",
		"⠪",
		"⠫",
		"⠬",
		"⠭",
		"⠮",
		"⠯",
		"⡨",
		"⡩",
		"⡪",
		"⡫",
		"⡬",
		"⡭",
		"⡮",
		"⡯",
		"⠰",
		"⠱",
		"⠲",
		"⠳",
		"⠴",
		"⠵",
		"⠶",
		"⠷",
		"⡰",
		"⡱",
		"⡲",
		"⡳",
		"⡴",
		"⡵",
		"⡶",
		"⡷",
		"⠸",
		"⠹",
		"⠺",
		"⠻",
		"⠼",
		"⠽",
		"⠾",
		"⠿",
		"⡸",
		"⡹",
		"⡺",
		"⡻",
		"⡼",
		"⡽",
		"⡾",
		"⡿",
		"⢀",
		"⢁",
		"⢂",
		"⢃",
		"⢄",
		"⢅",
		"⢆",
		"⢇",
		"⣀",
		"⣁",
		"⣂",
		"⣃",
		"⣄",
		"⣅",
		"⣆",
		"⣇",
		"⢈",
		"⢉",
		"⢊",
		"⢋",
		"⢌",
		"⢍",
		"⢎",
		"⢏",
		"⣈",
		"⣉",
		"⣊",
		"⣋",
		"⣌",
		"⣍",
		"⣎",
		"⣏",
		"⢐",
		"⢑",
		"⢒",
		"⢓",
		"⢔",
		"⢕",
		"⢖",
		"⢗",
		"⣐",
		"⣑",
		"⣒",
		"⣓",
		"⣔",
		"⣕",
		"⣖",
		"⣗",
		"⢘",
		"⢙",
		"⢚",
		"⢛",
		"⢜",
		"⢝",
		"⢞",
		"⢟",
		"⣘",
		"⣙",
		"⣚",
		"⣛",
		"⣜",
		"⣝",
		"⣞",
		"⣟",
		"⢠",
		"⢡",
		"⢢",
		"⢣",
		"⢤",
		"⢥",
		"⢦",
		"⢧",
		"⣠",
		"⣡",
		"⣢",
		"⣣",
		"⣤",
		"⣥",
		"⣦",
		"⣧",
		"⢨",
		"⢩",
		"⢪",
		"⢫",
		"⢬",
		"⢭",
		"⢮",
		"⢯",
		"⣨",
		"⣩",
		"⣪",
		"⣫",
		"⣬",
		"⣭",
		"⣮",
		"⣯",
		"⢰",
		"⢱",
		"⢲",
		"⢳",
		"⢴",
		"⢵",
		"⢶",
		"⢷",
		"⣰",
		"⣱",
		"⣲",
		"⣳",
		"⣴",
		"⣵",
		"⣶",
		"⣷",
		"⢸",
		"⢹",
		"⢺",
		"⢻",
		"⢼",
		"⢽",
		"⢾",
		"⢿",
		"⣸",
		"⣹",
		"⣺",
		"⣻",
		"⣼",
		"⣽",
		"⣾",
		"⣿"
	]
};
var line = {
	interval: 130,
	frames: [
		"-",
		"\\",
		"|",
		"/"
	]
};
var line2 = {
	interval: 100,
	frames: [
		"⠂",
		"-",
		"–",
		"—",
		"–",
		"-"
	]
};
var pipe = {
	interval: 100,
	frames: [
		"┤",
		"┘",
		"┴",
		"└",
		"├",
		"┌",
		"┬",
		"┐"
	]
};
var simpleDots = {
	interval: 400,
	frames: [
		".  ",
		".. ",
		"...",
		"   "
	]
};
var simpleDotsScrolling = {
	interval: 200,
	frames: [
		".  ",
		".. ",
		"...",
		" ..",
		"  .",
		"   "
	]
};
var star = {
	interval: 70,
	frames: [
		"✶",
		"✸",
		"✹",
		"✺",
		"✹",
		"✷"
	]
};
var star2 = {
	interval: 80,
	frames: [
		"+",
		"x",
		"*"
	]
};
var flip = {
	interval: 70,
	frames: [
		"_",
		"_",
		"_",
		"-",
		"`",
		"`",
		"'",
		"´",
		"-",
		"_",
		"_",
		"_"
	]
};
var hamburger = {
	interval: 100,
	frames: [
		"☱",
		"☲",
		"☴"
	]
};
var growVertical = {
	interval: 120,
	frames: [
		"▁",
		"▃",
		"▄",
		"▅",
		"▆",
		"▇",
		"▆",
		"▅",
		"▄",
		"▃"
	]
};
var growHorizontal = {
	interval: 120,
	frames: [
		"▏",
		"▎",
		"▍",
		"▌",
		"▋",
		"▊",
		"▉",
		"▊",
		"▋",
		"▌",
		"▍",
		"▎"
	]
};
var balloon = {
	interval: 140,
	frames: [
		" ",
		".",
		"o",
		"O",
		"@",
		"*",
		" "
	]
};
var balloon2 = {
	interval: 120,
	frames: [
		".",
		"o",
		"O",
		"°",
		"O",
		"o",
		"."
	]
};
var noise = {
	interval: 100,
	frames: [
		"▓",
		"▒",
		"░"
	]
};
var bounce = {
	interval: 120,
	frames: [
		"⠁",
		"⠂",
		"⠄",
		"⠂"
	]
};
var boxBounce = {
	interval: 120,
	frames: [
		"▖",
		"▘",
		"▝",
		"▗"
	]
};
var boxBounce2 = {
	interval: 100,
	frames: [
		"▌",
		"▀",
		"▐",
		"▄"
	]
};
var triangle = {
	interval: 50,
	frames: [
		"◢",
		"◣",
		"◤",
		"◥"
	]
};
var arc = {
	interval: 100,
	frames: [
		"◜",
		"◠",
		"◝",
		"◞",
		"◡",
		"◟"
	]
};
var circle = {
	interval: 120,
	frames: [
		"◡",
		"⊙",
		"◠"
	]
};
var squareCorners = {
	interval: 180,
	frames: [
		"◰",
		"◳",
		"◲",
		"◱"
	]
};
var circleQuarters = {
	interval: 120,
	frames: [
		"◴",
		"◷",
		"◶",
		"◵"
	]
};
var circleHalves = {
	interval: 50,
	frames: [
		"◐",
		"◓",
		"◑",
		"◒"
	]
};
var squish = {
	interval: 100,
	frames: [
		"╫",
		"╪"
	]
};
var toggle = {
	interval: 250,
	frames: [
		"⊶",
		"⊷"
	]
};
var toggle2 = {
	interval: 80,
	frames: [
		"▫",
		"▪"
	]
};
var toggle3 = {
	interval: 120,
	frames: [
		"□",
		"■"
	]
};
var toggle4 = {
	interval: 100,
	frames: [
		"■",
		"□",
		"▪",
		"▫"
	]
};
var toggle5 = {
	interval: 100,
	frames: [
		"▮",
		"▯"
	]
};
var toggle6 = {
	interval: 300,
	frames: [
		"ဝ",
		"၀"
	]
};
var toggle7 = {
	interval: 80,
	frames: [
		"⦾",
		"⦿"
	]
};
var toggle8 = {
	interval: 100,
	frames: [
		"◍",
		"◌"
	]
};
var toggle9 = {
	interval: 100,
	frames: [
		"◉",
		"◎"
	]
};
var toggle10 = {
	interval: 100,
	frames: [
		"㊂",
		"㊀",
		"㊁"
	]
};
var toggle11 = {
	interval: 50,
	frames: [
		"⧇",
		"⧆"
	]
};
var toggle12 = {
	interval: 120,
	frames: [
		"☗",
		"☖"
	]
};
var toggle13 = {
	interval: 80,
	frames: [
		"=",
		"*",
		"-"
	]
};
var arrow = {
	interval: 100,
	frames: [
		"←",
		"↖",
		"↑",
		"↗",
		"→",
		"↘",
		"↓",
		"↙"
	]
};
var arrow2 = {
	interval: 80,
	frames: [
		"⬆️ ",
		"↗️ ",
		"➡️ ",
		"↘️ ",
		"⬇️ ",
		"↙️ ",
		"⬅️ ",
		"↖️ "
	]
};
var arrow3 = {
	interval: 120,
	frames: [
		"▹▹▹▹▹",
		"▸▹▹▹▹",
		"▹▸▹▹▹",
		"▹▹▸▹▹",
		"▹▹▹▸▹",
		"▹▹▹▹▸"
	]
};
var bouncingBar = {
	interval: 80,
	frames: [
		"[    ]",
		"[=   ]",
		"[==  ]",
		"[=== ]",
		"[ ===]",
		"[  ==]",
		"[   =]",
		"[    ]",
		"[   =]",
		"[  ==]",
		"[ ===]",
		"[====]",
		"[=== ]",
		"[==  ]",
		"[=   ]"
	]
};
var bouncingBall = {
	interval: 80,
	frames: [
		"( ●    )",
		"(  ●   )",
		"(   ●  )",
		"(    ● )",
		"(     ●)",
		"(    ● )",
		"(   ●  )",
		"(  ●   )",
		"( ●    )",
		"(●     )"
	]
};
var smiley = {
	interval: 200,
	frames: [
		"😄 ",
		"😝 "
	]
};
var monkey = {
	interval: 300,
	frames: [
		"🙈 ",
		"🙈 ",
		"🙉 ",
		"🙊 "
	]
};
var hearts = {
	interval: 100,
	frames: [
		"💛 ",
		"💙 ",
		"💜 ",
		"💚 ",
		"❤️ "
	]
};
var clock = {
	interval: 100,
	frames: [
		"🕛 ",
		"🕐 ",
		"🕑 ",
		"🕒 ",
		"🕓 ",
		"🕔 ",
		"🕕 ",
		"🕖 ",
		"🕗 ",
		"🕘 ",
		"🕙 ",
		"🕚 "
	]
};
var earth = {
	interval: 180,
	frames: [
		"🌍 ",
		"🌎 ",
		"🌏 "
	]
};
var material = {
	interval: 17,
	frames: [
		"█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"████▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"██████▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"███████▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"████████▁▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"██████████▁▁▁▁▁▁▁▁▁▁",
		"███████████▁▁▁▁▁▁▁▁▁",
		"█████████████▁▁▁▁▁▁▁",
		"██████████████▁▁▁▁▁▁",
		"██████████████▁▁▁▁▁▁",
		"▁██████████████▁▁▁▁▁",
		"▁██████████████▁▁▁▁▁",
		"▁██████████████▁▁▁▁▁",
		"▁▁██████████████▁▁▁▁",
		"▁▁▁██████████████▁▁▁",
		"▁▁▁▁█████████████▁▁▁",
		"▁▁▁▁██████████████▁▁",
		"▁▁▁▁██████████████▁▁",
		"▁▁▁▁▁██████████████▁",
		"▁▁▁▁▁██████████████▁",
		"▁▁▁▁▁██████████████▁",
		"▁▁▁▁▁▁██████████████",
		"▁▁▁▁▁▁██████████████",
		"▁▁▁▁▁▁▁█████████████",
		"▁▁▁▁▁▁▁█████████████",
		"▁▁▁▁▁▁▁▁████████████",
		"▁▁▁▁▁▁▁▁████████████",
		"▁▁▁▁▁▁▁▁▁███████████",
		"▁▁▁▁▁▁▁▁▁███████████",
		"▁▁▁▁▁▁▁▁▁▁██████████",
		"▁▁▁▁▁▁▁▁▁▁██████████",
		"▁▁▁▁▁▁▁▁▁▁▁▁████████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁██████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
		"█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
		"██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
		"██▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
		"███▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
		"████▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
		"█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"█████▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"██████▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"████████▁▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"█████████▁▁▁▁▁▁▁▁▁▁▁",
		"███████████▁▁▁▁▁▁▁▁▁",
		"████████████▁▁▁▁▁▁▁▁",
		"████████████▁▁▁▁▁▁▁▁",
		"██████████████▁▁▁▁▁▁",
		"██████████████▁▁▁▁▁▁",
		"▁██████████████▁▁▁▁▁",
		"▁██████████████▁▁▁▁▁",
		"▁▁▁█████████████▁▁▁▁",
		"▁▁▁▁▁████████████▁▁▁",
		"▁▁▁▁▁████████████▁▁▁",
		"▁▁▁▁▁▁███████████▁▁▁",
		"▁▁▁▁▁▁▁▁█████████▁▁▁",
		"▁▁▁▁▁▁▁▁█████████▁▁▁",
		"▁▁▁▁▁▁▁▁▁█████████▁▁",
		"▁▁▁▁▁▁▁▁▁█████████▁▁",
		"▁▁▁▁▁▁▁▁▁▁█████████▁",
		"▁▁▁▁▁▁▁▁▁▁▁████████▁",
		"▁▁▁▁▁▁▁▁▁▁▁████████▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁███████▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁███████▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁███████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁████",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁███",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁██",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁",
		"▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁"
	]
};
var moon = {
	interval: 80,
	frames: [
		"🌑 ",
		"🌒 ",
		"🌓 ",
		"🌔 ",
		"🌕 ",
		"🌖 ",
		"🌗 ",
		"🌘 "
	]
};
var runner = {
	interval: 140,
	frames: [
		"🚶 ",
		"🏃 "
	]
};
var pong = {
	interval: 80,
	frames: [
		"▐⠂       ▌",
		"▐⠈       ▌",
		"▐ ⠂      ▌",
		"▐ ⠠      ▌",
		"▐  ⡀     ▌",
		"▐  ⠠     ▌",
		"▐   ⠂    ▌",
		"▐   ⠈    ▌",
		"▐    ⠂   ▌",
		"▐    ⠠   ▌",
		"▐     ⡀  ▌",
		"▐     ⠠  ▌",
		"▐      ⠂ ▌",
		"▐      ⠈ ▌",
		"▐       ⠂▌",
		"▐       ⠠▌",
		"▐       ⡀▌",
		"▐      ⠠ ▌",
		"▐      ⠂ ▌",
		"▐     ⠈  ▌",
		"▐     ⠂  ▌",
		"▐    ⠠   ▌",
		"▐    ⡀   ▌",
		"▐   ⠠    ▌",
		"▐   ⠂    ▌",
		"▐  ⠈     ▌",
		"▐  ⠂     ▌",
		"▐ ⠠      ▌",
		"▐ ⡀      ▌",
		"▐⠠       ▌"
	]
};
var shark = {
	interval: 120,
	frames: [
		"▐|\\____________▌",
		"▐_|\\___________▌",
		"▐__|\\__________▌",
		"▐___|\\_________▌",
		"▐____|\\________▌",
		"▐_____|\\_______▌",
		"▐______|\\______▌",
		"▐_______|\\_____▌",
		"▐________|\\____▌",
		"▐_________|\\___▌",
		"▐__________|\\__▌",
		"▐___________|\\_▌",
		"▐____________|\\▌",
		"▐____________/|▌",
		"▐___________/|_▌",
		"▐__________/|__▌",
		"▐_________/|___▌",
		"▐________/|____▌",
		"▐_______/|_____▌",
		"▐______/|______▌",
		"▐_____/|_______▌",
		"▐____/|________▌",
		"▐___/|_________▌",
		"▐__/|__________▌",
		"▐_/|___________▌",
		"▐/|____________▌"
	]
};
var dqpb = {
	interval: 100,
	frames: [
		"d",
		"q",
		"p",
		"b"
	]
};
var weather = {
	interval: 100,
	frames: [
		"☀️ ",
		"☀️ ",
		"☀️ ",
		"🌤 ",
		"⛅️ ",
		"🌥 ",
		"☁️ ",
		"🌧 ",
		"🌨 ",
		"🌧 ",
		"🌨 ",
		"🌧 ",
		"🌨 ",
		"⛈ ",
		"🌨 ",
		"🌧 ",
		"🌨 ",
		"☁️ ",
		"🌥 ",
		"⛅️ ",
		"🌤 ",
		"☀️ ",
		"☀️ "
	]
};
var christmas = {
	interval: 400,
	frames: [
		"🌲",
		"🎄"
	]
};
var grenade = {
	interval: 80,
	frames: [
		"،  ",
		"′  ",
		" ´ ",
		" ‾ ",
		"  ⸌",
		"  ⸊",
		"  |",
		"  ⁎",
		"  ⁕",
		" ෴ ",
		"  ⁓",
		"   ",
		"   ",
		"   "
	]
};
var point = {
	interval: 125,
	frames: [
		"∙∙∙",
		"●∙∙",
		"∙●∙",
		"∙∙●",
		"∙∙∙"
	]
};
var layer = {
	interval: 150,
	frames: [
		"-",
		"=",
		"≡"
	]
};
var betaWave = {
	interval: 80,
	frames: [
		"ρββββββ",
		"βρβββββ",
		"ββρββββ",
		"βββρβββ",
		"ββββρββ",
		"βββββρβ",
		"ββββββρ"
	]
};
var fingerDance = {
	interval: 160,
	frames: [
		"🤘 ",
		"🤟 ",
		"🖖 ",
		"✋ ",
		"🤚 ",
		"👆 "
	]
};
var fistBump = {
	interval: 80,
	frames: [
		"🤜　　　　🤛 ",
		"🤜　　　　🤛 ",
		"🤜　　　　🤛 ",
		"　🤜　　🤛　 ",
		"　　🤜🤛　　 ",
		"　🤜✨🤛　　 ",
		"🤜　✨　🤛　 "
	]
};
var soccerHeader = {
	interval: 80,
	frames: [
		" 🧑⚽️       🧑 ",
		"🧑  ⚽️      🧑 ",
		"🧑   ⚽️     🧑 ",
		"🧑    ⚽️    🧑 ",
		"🧑     ⚽️   🧑 ",
		"🧑      ⚽️  🧑 ",
		"🧑       ⚽️🧑  ",
		"🧑      ⚽️  🧑 ",
		"🧑     ⚽️   🧑 ",
		"🧑    ⚽️    🧑 ",
		"🧑   ⚽️     🧑 ",
		"🧑  ⚽️      🧑 "
	]
};
var mindblown = {
	interval: 160,
	frames: [
		"😐 ",
		"😐 ",
		"😮 ",
		"😮 ",
		"😦 ",
		"😦 ",
		"😧 ",
		"😧 ",
		"🤯 ",
		"💥 ",
		"✨ ",
		"　 ",
		"　 ",
		"　 "
	]
};
var speaker = {
	interval: 160,
	frames: [
		"🔈 ",
		"🔉 ",
		"🔊 ",
		"🔉 "
	]
};
var orangePulse = {
	interval: 100,
	frames: [
		"🔸 ",
		"🔶 ",
		"🟠 ",
		"🟠 ",
		"🔶 "
	]
};
var bluePulse = {
	interval: 100,
	frames: [
		"🔹 ",
		"🔷 ",
		"🔵 ",
		"🔵 ",
		"🔷 "
	]
};
var orangeBluePulse = {
	interval: 100,
	frames: [
		"🔸 ",
		"🔶 ",
		"🟠 ",
		"🟠 ",
		"🔶 ",
		"🔹 ",
		"🔷 ",
		"🔵 ",
		"🔵 ",
		"🔷 "
	]
};
var timeTravel = {
	interval: 100,
	frames: [
		"🕛 ",
		"🕚 ",
		"🕙 ",
		"🕘 ",
		"🕗 ",
		"🕖 ",
		"🕕 ",
		"🕔 ",
		"🕓 ",
		"🕒 ",
		"🕑 ",
		"🕐 "
	]
};
var aesthetic = {
	interval: 80,
	frames: [
		"▰▱▱▱▱▱▱",
		"▰▰▱▱▱▱▱",
		"▰▰▰▱▱▱▱",
		"▰▰▰▰▱▱▱",
		"▰▰▰▰▰▱▱",
		"▰▰▰▰▰▰▱",
		"▰▰▰▰▰▰▰",
		"▰▱▱▱▱▱▱"
	]
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

const react_1 = entry.react;




/**
 * Spinner.
 */


const Spinner = ({
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
  return entry.react.createElement(build$1.Text, null, spinner.frames[frame]);
};

var _default = Spinner;

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

var MDXContext = /*#__PURE__*/entry.react.createContext({});
var useMDXComponents = function useMDXComponents(components) {
  var contextComponents = entry.react.useContext(MDXContext); // Custom merge via a function prop

  if (isFunction(components)) {
    return components(contextComponents);
  }

  return _objectSpread2(_objectSpread2({}, contextComponents), components);
};
var MDXProvider = function MDXProvider(_ref) {
  var components = _ref.components,
      children = _ref.children,
      disableParentContext = _ref.disableParentContext;
  var allComponents = useMDXComponents(components);

  if (disableParentContext) {
    allComponents = components;
  }

  return /*#__PURE__*/entry.react.createElement(MDXContext.Provider, {
    value: allComponents
  }, children);
};

var TYPE_PROP_NAME = 'mdxType';
var DEFAULTS = {
  inlineCode: 'code',
  wrapper: function wrapper(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/entry.react.createElement(entry.react.Fragment, {}, children);
  }
};
var MDXCreateElement = /*#__PURE__*/entry.react.forwardRef(function (props, ref) {
  var propComponents = props.components,
      mdxType = props.mdxType,
      originalType = props.originalType,
      parentName = props.parentName,
      etc = _objectWithoutProperties(props, ["components", "mdxType", "originalType", "parentName"]);

  var components = useMDXComponents(propComponents);
  var type = mdxType;
  var Component = components["".concat(parentName, ".").concat(type)] || components[type] || DEFAULTS[type] || originalType;

  if (propComponents) {
    return /*#__PURE__*/entry.react.createElement(Component, _objectSpread2(_objectSpread2({
      ref: ref
    }, etc), {}, {
      components: propComponents
    }));
  }

  return /*#__PURE__*/entry.react.createElement(Component, _objectSpread2({
    ref: ref
  }, etc));
});
MDXCreateElement.displayName = 'MDXCreateElement';
function createElement (type, props) {
  var args = arguments;
  var mdxType = props && props.mdxType;

  if (typeof type === 'string' || mdxType) {
    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = MDXCreateElement;
    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }

    newProps.originalType = type;
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType;
    createElementArgArray[1] = newProps;

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    }

    return entry.react.createElement.apply(null, createElementArgArray);
  }

  return entry.react.createElement.apply(null, args);
}

const transformCodeForEval = jsx => `${jsx}

  return React.createElement(MDXProvider, { components },
    React.createElement(MDXContent, props)
  );`;

var StepRenderer = (({
  children: srcCode,
  scope,
  components,
  ...props
}) => {
  const fullScope = {
    mdx: createElement,
    MDXProvider,
    React: entry.react,
    // need to pass both so that we can guarantee the components we need are passed to MDXProvider for shortcodes and we also need some components to be in direct scope
    ...components,
    components,
    props,
    useInput: entry.useInput,
    useInputByKey: entry.useInputByKey,
    useResource: entry.useResource,
    useProvider: entry.useProvider,
    ...scope
  };
  const scopeKeys = Object.keys(fullScope);
  const scopeValues = Object.values(fullScope);
  const fn = new Function(...scopeKeys, transformCodeForEval(srcCode));
  return fn(...scopeValues);
});

function parseVersion(versionString) {
  if (/^\d{3,4}$/.test(versionString)) {
    // Env var doesn't always use dots. example: 4601 => 46.1.0
    const m = /(\d{1,2})(\d{2})/.exec(versionString);
    return {
      major: 0,
      minor: parseInt(m[1], 10),
      patch: parseInt(m[2], 10)
    };
  }

  const versions = (versionString || '').split('.').map(n => parseInt(n, 10));
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2]
  };
}

function supportsHyperlink(stream) {
  const {
    env
  } = process;

  if ('FORCE_HYPERLINK' in env) {
    return !(env.FORCE_HYPERLINK.length > 0 && parseInt(env.FORCE_HYPERLINK, 10) === 0);
  }

  if (entry.hasFlag('no-hyperlink') || entry.hasFlag('no-hyperlinks') || entry.hasFlag('hyperlink=false') || entry.hasFlag('hyperlink=never')) {
    return false;
  }

  if (entry.hasFlag('hyperlink=true') || entry.hasFlag('hyperlink=always')) {
    return true;
  } // If they specify no colors, they probably don't want hyperlinks.


  if (!entry.supportsColor_1.supportsColor(stream)) {
    return false;
  }

  if (stream && !stream.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    return false;
  }

  if ('CI' in env) {
    return false;
  }

  if ('TEAMCITY_VERSION' in env) {
    return false;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseVersion(env.TERM_PROGRAM_VERSION);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        if (version.major === 3) {
          return version.minor >= 1;
        }

        return version.major > 3;
      // No default
    }
  }

  if ('VTE_VERSION' in env) {
    // 0.50.0 was supposed to support hyperlinks, but throws a segfault
    if (env.VTE_VERSION === '0.50.0') {
      return false;
    }

    const version = parseVersion(env.VTE_VERSION);
    return version.major > 0 || version.minor >= 50;
  }

  return false;
}

var supportsHyperlinks = {
  supportsHyperlink,
  stdout: supportsHyperlink(process.stdout),
  stderr: supportsHyperlink(process.stderr)
};

var terminalLink_1 = entry.createCommonjsModule(function (module) {





const terminalLink = (text, url, {
  target = 'stdout',
  ...options
} = {}) => {
  if (!supportsHyperlinks[target]) {
    // If the fallback has been explicitly disabled, don't modify the text itself.
    if (options.fallback === false) {
      return text;
    }

    return typeof options.fallback === 'function' ? options.fallback(text, url) : `${text} (\u200B${url}\u200B)`;
  }

  return ansiEscapes_1.link(text, url);
};

module.exports = (text, url, options = {}) => terminalLink(text, url, options);

module.exports.stderr = (text, url, options = {}) => terminalLink(text, url, {
  target: 'stderr',
  ...options
});

module.exports.isSupported = supportsHyperlinks.stdout;
module.exports.stderr.isSupported = supportsHyperlinks.stderr;
});

function k$1(a, b) {
  b.tag = a;
  return b;
}

function m$1() {}

function p$1(a) {
  return function (b) {
    var c = a.length;
    let d = !1,
        e = !1,
        f = !1,
        g = 0;
    b(k$1(0, [function (h) {
      if (h) {
        d = !0;
      } else if (e) {
        f = !0;
      } else {
        for (e = f = !0; f && !d;) {
          g < c ? (h = a[g], g = g + 1 | 0, f = !1, b(k$1(1, [h]))) : (d = !0, b(0));
        }

        e = !1;
      }
    }]));
  };
}

function r$2() {}

function t$2(a) {
  a(0);
}

function u$2(a) {
  let b = !1;
  a(k$1(0, [function (c) {
    c ? b = !0 : b || a(0);
  }]));
}

function x$1(a) {
  if (null === a || a[0] !== v$2) {
    return a;
  }

  if (0 !== (a = a[1])) {
    return [v$2, a - 1 | 0];
  }
}

function z$2(a) {
  return function (b) {
    return function (c) {
      function d(b) {
        'number' == typeof b ? l && (l = !1, void 0 !== (b = e.shift()) ? (b = a(x$1(b)), l = !0, b(d)) : q ? c(0) : g || (g = !0, f(0))) : b.tag ? l && (c(b), n ? n = !1 : h(0)) : (h = b = b[0], n = !1, b(0));
      }

      let e = [],
          f = m$1,
          g = !1,
          h = m$1,
          l = !1,
          n = !1,
          q = !1;
      b(function (b) {
        'number' == typeof b ? q || (q = !0, l || 0 !== e.length || c(0)) : b.tag ? q || (b = b[0], g = !1, l ? e.push(b) : (b = a(b), l = !0, b(d))) : f = b[0];
      });
      c(k$1(0, [function (a) {
        if (a) {
          if (q || (q = !0, f(1)), l) {
            return l = !1, h(1);
          }
        } else {
          q || g || (g = !0, f(0)), l && !n && (n = !0, h(0));
        }
      }]));
    };
  };
}

function B$2(a) {
  return a;
}

function C(a) {
  return a(0);
}

function D(a) {
  return function (b) {
    return function (c) {
      let e = m$1,
          f = !1,
          g = [],
          h = !1;
      b(function (b) {
        'number' == typeof b ? h || (h = !0, 0 === g.length && c(0)) : b.tag ? h || (f = !1, function (a) {
          function d(a) {
            'number' == typeof a ? 0 !== g.length && (g = g.filter(b), a = 0 === g.length, h && a ? c(0) : !f && a && (f = !0, e(0))) : a.tag ? 0 !== g.length && (c(k$1(1, [a[0]])), l(0)) : (l = a = a[0], g = g.concat(a), a(0));
          }

          function b(a) {
            return a !== l;
          }

          let l = m$1;
          1 === a.length ? a(d) : a.bind(null, d);
        }(a(b[0])), f || (f = !0, e(0))) : e = b[0];
      });
      c(k$1(0, [function (a) {
        a ? (h || (h = !0, e(a)), g.forEach(function (c) {
          return c(a);
        }), g = []) : (f || h ? f = !1 : (f = !0, e(0)), g.forEach(C));
      }]));
    };
  };
}

function E(a) {
  return a;
}

function H$1(a) {
  return function (b) {
    return function (c) {
      let d = !1;
      return b(function (e) {
        if ('number' == typeof e) {
          d || (d = !0, c(e));
        } else if (e.tag) {
          d || (a(e[0]), c(e));
        } else {
          var g = e[0];
          c(k$1(0, [function (a) {
            if (!d) {
              return a && (d = !0), g(a);
            }
          }]));
        }
      });
    };
  };
}

function J$1(a) {
  a(0);
}

function K$1(a) {
  return function (b) {
    return function (c) {
      function d(a) {
        h && ('number' == typeof a ? (h = !1, n ? c(a) : f || (f = !0, e(0))) : a.tag ? (c(a), l ? l = !1 : g(0)) : (g = a = a[0], l = !1, a(0)));
      }

      let e = m$1,
          f = !1,
          g = m$1,
          h = !1,
          l = !1,
          n = !1;
      b(function (b) {
        'number' == typeof b ? n || (n = !0, h || c(0)) : b.tag ? n || (h && (g(1), g = m$1), f ? f = !1 : (f = !0, e(0)), b = a(b[0]), h = !0, b(d)) : e = b[0];
      });
      c(k$1(0, [function (a) {
        if (a) {
          if (n || (n = !0, e(1)), h) {
            return h = !1, g(1);
          }
        } else {
          n || f || (f = !0, e(0)), h && !l && (l = !0, g(0));
        }
      }]));
    };
  };
}

function M(a) {
  return function (b) {
    return function (c) {
      let d = [],
          e = m$1;
      return b(function (b) {
        'number' == typeof b ? p$1(d)(c) : b.tag ? (d.length >= a && 0 < a && d.shift(), d.push(b[0]), e(0)) : (b = b[0], 0 >= a ? (b(1), u$2(c)) : (e = b, b(0)));
      });
    };
  };
}

function N(a) {
  return function (b) {
    let c = m$1,
        d = !1;
    b(function (e) {
      'number' == typeof e ? d = !0 : e.tag ? d || (a(e[0]), c(0)) : (c = e = e[0], e(0));
    });
    return {
      unsubscribe: function () {
        if (!d) {
          return d = !0, c(1);
        }
      }
    };
  };
}

function O$1() {}

function concat$1(a) {
  return z$2(B$2)(p$1(a));
}

function filter$1(a) {
  return function (b) {
    return function (c) {
      let d = m$1;
      return b(function (b) {
        'number' == typeof b ? c(b) : b.tag ? a(b[0]) ? c(b) : d(0) : (d = b[0], c(b));
      });
    };
  };
}

function fromValue$1(a) {
  return function (b) {
    let c = !1;
    b(k$1(0, [function (d) {
      d ? c = !0 : c || (c = !0, b(k$1(1, [a])), b(0));
    }]));
  };
}

function interval$1(a) {
  return function (b) {
    let c = 0;
    var d = setInterval(function () {
      var a = c;
      c = c + 1 | 0;
      b(k$1(1, [a]));
    }, a);
    b(k$1(0, [function (a) {
      a && clearInterval(d);
    }]));
  };
}

function make$1(a) {
  return function (b) {
    let c = r$2,
        d = !1;
    c = a({
      next: function (a) {
        d || b(k$1(1, [a]));
      },
      complete: function () {
        d || (d = !0, b(0));
      }
    });
    b(k$1(0, [function (a) {
      if (a && !d) {
        return d = !0, c();
      }
    }]));
  };
}

function makeSubject$1() {
  let a = [],
      b = !1;
  return {
    source: function (c) {
      function b(a) {
        return a !== c;
      }

      a = a.concat(c);
      c(k$1(0, [function (c) {
        c && (a = a.filter(b));
      }]));
    },
    next: function (c) {
      b || a.forEach(function (a) {
        a(k$1(1, [c]));
      });
    },
    complete: function () {
      b || (b = !0, a.forEach(t$2));
    }
  };
}

function map$1(a) {
  return function (b) {
    return function (c) {
      return b(function (b) {
        b = 'number' == typeof b ? 0 : b.tag ? k$1(1, [a(b[0])]) : k$1(0, [b[0]]);
        c(b);
      });
    };
  };
}

function merge$1(a) {
  return D(E)(p$1(a));
}

function onEnd$1(a) {
  return function (b) {
    return function (c) {
      let d = !1;
      return b(function (b) {
        if ('number' == typeof b) {
          if (d) {
            return;
          }

          d = !0;
          c(b);
          return a();
        }

        if (b.tag) {
          d || c(b);
        } else {
          var e = b[0];
          c(k$1(0, [function (b) {
            if (!d) {
              return b ? (d = !0, e(b), a()) : e(b);
            }
          }]));
        }
      });
    };
  };
}

function onStart$1(a) {
  return function (b) {
    return function (c) {
      return b(function (b) {
        'number' == typeof b ? c(b) : b.tag ? c(b) : (c(b), a());
      });
    };
  };
}

function publish$1(a) {
  return N(O$1)(a);
}

function scan$1(a, b) {
  return function (a, b) {
    return function (c) {
      return function (d) {
        let e = b;
        return c(function (c) {
          'number' == typeof c ? c = 0 : c.tag ? (e = a(e, c[0]), c = k$1(1, [e])) : c = k$1(0, [c[0]]);
          d(c);
        });
      };
    };
  }(a, b);
}

function share$1(a) {
  function b(a) {
    'number' == typeof a ? (c.forEach(J$1), c = []) : a.tag ? (e = !1, c.forEach(function (b) {
      b(a);
    })) : d = a[0];
  }

  let c = [],
      d = m$1,
      e = !1;
  return function (f) {
    function g(a) {
      return a !== f;
    }

    c = c.concat(f);
    1 === c.length && a(b);
    f(k$1(0, [function (a) {
      if (a) {
        if (c = c.filter(g), 0 === c.length) {
          return d(1);
        }
      } else {
        e || (e = !0, d(a));
      }
    }]));
  };
}

function take$1(a) {
  return function (b) {
    return function (c) {
      let d = !1,
          e = 0,
          f = m$1;
      b(function (b) {
        'number' == typeof b ? d || (d = !0, c(0)) : b.tag ? e < a && !d && (e = e + 1 | 0, c(b), !d && e >= a && (d = !0, c(0), f(1))) : (b = b[0], 0 >= a ? (d = !0, c(0), b(1)) : f = b);
      });
      c(k$1(0, [function (b) {
        if (!d) {
          if (b) {
            return d = !0, f(1);
          }

          if (e < a) {
            return f(0);
          }
        }
      }]));
    };
  };
}

function takeUntil$1(a) {
  return function (b) {
    return function (c) {
      function d(a) {
        'number' != typeof a && (a.tag ? (e = !0, f(1), c(0)) : (g = a = a[0], a(0)));
      }

      let e = !1,
          f = m$1,
          g = m$1;
      b(function (b) {
        'number' == typeof b ? e || (e = !0, g(1), c(0)) : b.tag ? e || c(b) : (f = b[0], a(d));
      });
      c(k$1(0, [function (a) {
        if (!e) {
          return a ? (e = !0, f(1), g(1)) : f(0);
        }
      }]));
    };
  };
}

function takeWhile$1(a) {
  return function (b) {
    return function (c) {
      let d = m$1,
          e = !1;
      return b(function (b) {
        'number' == typeof b ? e || (e = !0, c(0)) : b.tag ? e || (a(b[0]) ? c(b) : (e = !0, c(0), d(1))) : (d = b[0], c(b));
      });
    };
  };
}

function toPromise$1(a) {
  return new Promise(function (b) {
    M(1)(a)(function (a) {
      if ('number' != typeof a) {
        if (a.tag) {
          b(a[0]);
        } else {
          a[0](0);
        }
      }
    });
  });
}

var v$2 = [];
    'function' == typeof Symbol ? Symbol.observable || (Symbol.observable = Symbol('observable')) : '@@observable';

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */


function isObjectLike(value) {
  return _typeof$1(value) == 'object' && value !== null;
}

// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator

var SYMBOL_TO_STRING_TAG = typeof Symbol === 'function' && Symbol.toStringTag != null ? Symbol.toStringTag : '@@toStringTag';

/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;

  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }

  return {
    line: line,
    column: column
  };
}

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];

    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function (subLine) {
      return ['', subLine];
    }), [[' ', whitespace(subLineColumnNum - 1) + '^'], ['', subLines[subLineIndex + 1]]]));
  }

  return locationStr + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
  ["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
}

function printPrefixedLines(lines) {
  var existingLines = lines.filter(function (_ref) {
    _ref[0];
        var line = _ref[1];
    return line !== undefined;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function (_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function (_ref3) {
    var prefix = _ref3[0],
        line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
  }).join('\n');
}

function whitespace(len) {
  return Array(len + 1).join(' ');
}

function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
} // FIXME:
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

var GraphQLError = /*#__PURE__*/function (_Error) {
  _inherits(GraphQLError, _Error);

  var _super = _createSuper(GraphQLError);
  /**
   * A message describing the Error for debugging purposes.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   *
   * Note: should be treated as readonly, despite invariant usage.
   */

  /**
   * An array of { line, column } locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */


  function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
    var _locations2, _source2, _positions2, _extensions2;

    var _this;

    _classCallCheck(this, GraphQLError);

    _this = _super.call(this, message); // Compute list of blame nodes.

    var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


    var _source = source;

    if (!_source && _nodes) {
      var _nodes$0$loc;

      _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
    }

    var _positions = positions;

    if (!_positions && _nodes) {
      _positions = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push(node.loc.start);
        }

        return list;
      }, []);
    }

    if (_positions && _positions.length === 0) {
      _positions = undefined;
    }

    var _locations;

    if (positions && source) {
      _locations = positions.map(function (pos) {
        return getLocation(source, pos);
      });
    } else if (_nodes) {
      _locations = _nodes.reduce(function (list, node) {
        if (node.loc) {
          list.push(getLocation(node.loc.source, node.loc.start));
        }

        return list;
      }, []);
    }

    var _extensions = extensions;

    if (_extensions == null && originalError != null) {
      var originalExtensions = originalError.extensions;

      if (isObjectLike(originalExtensions)) {
        _extensions = originalExtensions;
      }
    }

    Object.defineProperties(_assertThisInitialized(_this), {
      name: {
        value: 'GraphQLError'
      },
      message: {
        value: message,
        // By being enumerable, JSON.stringify will include `message` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: true,
        writable: true
      },
      locations: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : undefined,
        // By being enumerable, JSON.stringify will include `locations` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _locations != null
      },
      path: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: path !== null && path !== void 0 ? path : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: path != null
      },
      nodes: {
        value: _nodes !== null && _nodes !== void 0 ? _nodes : undefined
      },
      source: {
        value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : undefined
      },
      positions: {
        value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : undefined
      },
      originalError: {
        value: originalError
      },
      extensions: {
        // Coercing falsy values to undefined ensures they will not be included
        // in JSON.stringify() when not provided.
        value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : undefined,
        // By being enumerable, JSON.stringify will include `path` in the
        // resulting output. This ensures that the simplest possible GraphQL
        // service adheres to the spec.
        enumerable: _extensions != null
      }
    }); // Include (non-enumerable) stack trace.

    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')


    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }

    return _this;
  }

  _createClass$1(GraphQLError, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    } // FIXME: workaround to not break chai comparisons, should be remove in v16
    // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet

  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return 'Object';
    }
  }]);

  return GraphQLError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 */

function printError(error) {
  var output = error.message;

  if (error.nodes) {
    for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
      var node = _error$nodes2[_i2];

      if (node.loc) {
        output += '\n\n' + printLocation(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
      var location = _error$locations2[_i4];
      output += '\n\n' + printSourceLocation(error.source, location);
    }
  }

  return output;
}

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
}

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = Object.freeze({
  SOF: '<SOF>',
  EOF: '<EOF>',
  BANG: '!',
  DOLLAR: '$',
  AMP: '&',
  PAREN_L: '(',
  PAREN_R: ')',
  SPREAD: '...',
  COLON: ':',
  EQUALS: '=',
  AT: '@',
  BRACKET_L: '[',
  BRACKET_R: ']',
  BRACE_L: '{',
  PIPE: '|',
  BRACE_R: '}',
  NAME: 'Name',
  INT: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  BLOCK_STRING: 'BlockString',
  COMMENT: 'Comment'
});
/**
 * The enum type representing the token kinds values.
 */

function devAssert(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message);
  }
}

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 */
// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
// See: https://webpack.js.org/guides/production/

var instanceOf = // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
// eslint-disable-next-line no-shadow
function instanceOf(value, constructor) {
  return value instanceof constructor;
} ;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */

var Source = /*#__PURE__*/function () {
  function Source(body) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
    var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === 'string' || devAssert(0, "Body must be a string. Received: ".concat(entry.inspect(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, 'line in locationOffset is 1-indexed and must be positive.');
    this.locationOffset.column > 0 || devAssert(0, 'column in locationOffset is 1-indexed and must be positive.');
  } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet


  _createClass(Source, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return 'Source';
    }
  }]);

  return Source;
}();
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */
// eslint-disable-next-line no-redeclare

function isSource(source) {
  return instanceOf(source, Source);
}

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: 'QUERY',
  MUTATION: 'MUTATION',
  SUBSCRIPTION: 'SUBSCRIPTION',
  FIELD: 'FIELD',
  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
  // Type System Definitions
  SCHEMA: 'SCHEMA',
  SCALAR: 'SCALAR',
  OBJECT: 'OBJECT',
  FIELD_DEFINITION: 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
  INTERFACE: 'INTERFACE',
  UNION: 'UNION',
  ENUM: 'ENUM',
  ENUM_VALUE: 'ENUM_VALUE',
  INPUT_OBJECT: 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
});
/**
 * The enum type representing the directive location values.
 */

/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

var Lexer = /*#__PURE__*/function () {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  function Lexer(source) {
    var startOfFileToken = new entry.Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */


  var _proto = Lexer.prototype;

  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  ;

  _proto.lookahead = function lookahead() {
    var token = this.token;

    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next; // Note: next is only mutable during parsing, so we cast to allow this.


        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }

    return token;
  };

  return Lexer;
}();
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}

function printCharCode(code) {
  return (// NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
    code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
    "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
  );
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */


function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;

  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;

    var _col = 1 + pos - lexer.lineStart; // SourceCharacter


    switch (code) {
      case 0xfeff: // <BOM>

      case 9: //   \t

      case 32: //  <space>

      case 44:
        //  ,
        ++pos;
        continue;

      case 10:
        //  \n
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;

      case 13:
        //  \r
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }

        ++lexer.line;
        lexer.lineStart = pos;
        continue;

      case 33:
        //  !
        return new entry.Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);

      case 35:
        //  #
        return readComment(source, pos, _line, _col, prev);

      case 36:
        //  $
        return new entry.Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);

      case 38:
        //  &
        return new entry.Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);

      case 40:
        //  (
        return new entry.Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);

      case 41:
        //  )
        return new entry.Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);

      case 46:
        //  .
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new entry.Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }

        break;

      case 58:
        //  :
        return new entry.Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);

      case 61:
        //  =
        return new entry.Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);

      case 64:
        //  @
        return new entry.Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);

      case 91:
        //  [
        return new entry.Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);

      case 93:
        //  ]
        return new entry.Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);

      case 123:
        // {
        return new entry.Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);

      case 124:
        // |
        return new entry.Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);

      case 125:
        // }
        return new entry.Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);

      case 34:
        //  "
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }

        return readString(source, pos, _line, _col, prev);

      case 45: //  -

      case 48: //  0

      case 49: //  1

      case 50: //  2

      case 51: //  3

      case 52: //  4

      case 53: //  5

      case 54: //  6

      case 55: //  7

      case 56: //  8

      case 57:
        //  9
        return readNumber(source, pos, code, _line, _col, prev);

      case 65: //  A

      case 66: //  B

      case 67: //  C

      case 68: //  D

      case 69: //  E

      case 70: //  F

      case 71: //  G

      case 72: //  H

      case 73: //  I

      case 74: //  J

      case 75: //  K

      case 76: //  L

      case 77: //  M

      case 78: //  N

      case 79: //  O

      case 80: //  P

      case 81: //  Q

      case 82: //  R

      case 83: //  S

      case 84: //  T

      case 85: //  U

      case 86: //  V

      case 87: //  W

      case 88: //  X

      case 89: //  Y

      case 90: //  Z

      case 95: //  _

      case 97: //  a

      case 98: //  b

      case 99: //  c

      case 100: // d

      case 101: // e

      case 102: // f

      case 103: // g

      case 104: // h

      case 105: // i

      case 106: // j

      case 107: // k

      case 108: // l

      case 109: // m

      case 110: // n

      case 111: // o

      case 112: // p

      case 113: // q

      case 114: // r

      case 115: // s

      case 116: // t

      case 117: // u

      case 118: // v

      case 119: // w

      case 120: // x

      case 121: // y

      case 122:
        // z
        return readName(source, pos, _line, _col, prev);
    }

    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }

  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new entry.Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
/**
 * Report a message that an unexpected character was encountered.
 */


function unexpectedCharacterMessage(code) {
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }

  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
  }

  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */


function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;

  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && ( // SourceCharacter but not LineTerminator
  code > 0x001f || code === 0x0009));

  return new entry.Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */


function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = body.charCodeAt(++position);
  }

  if (code === 48) {
    // 0
    code = body.charCodeAt(++position);

    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 46) {
    // .
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;
    code = body.charCodeAt(++position);

    if (code === 43 || code === 45) {
      // + -
      code = body.charCodeAt(++position);
    }

    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart


  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }

  return new entry.Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading digits.
 */


function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;

  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57); // 0 - 9


    return position;
  }

  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */


function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
  code !== 0x000a && code !== 0x000d) {
    // Closing Quote (")
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new entry.Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    ++position;

    if (code === 92) {
      // \
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);

      switch (code) {
        case 34:
          value += '"';
          break;

        case 47:
          value += '/';
          break;

        case 92:
          value += '\\';
          break;

        case 98:
          value += '\b';
          break;

        case 102:
          value += '\f';
          break;

        case 110:
          value += '\n';
          break;

        case 114:
          value += '\r';
          break;

        case 116:
          value += '\t';
          break;

        case 117:
          {
            // uXXXX
            var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));

            if (charCode < 0) {
              var invalidSequence = body.slice(position + 1, position + 5);
              throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
            }

            value += String.fromCharCode(charCode);
            position += 4;
            break;
          }

        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }

      ++position;
      chunkStart = position;
    }
  }

  throw syntaxError(source, position, 'Unterminated string.');
}
/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */


function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = '';

  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    // Closing Triple-Quote (""")
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new entry.Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, entry.dedentBlockStringValue(rawValue));
    } // SourceCharacter


    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }

    if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }

      ++lexer.line;
      lexer.lineStart = position;
    } else if ( // Escape Triple-Quote (\""")
    code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }

  throw syntaxError(source, position, 'Unterminated string.');
}
/**
 * Converts four hexadecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */


function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */


function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 // 0-9
  : a >= 65 && a <= 70 ? a - 55 // A-F
  : a >= 97 && a <= 102 ? a - 87 // a-f
  : -1;
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */


function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;

  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122) // a-z
  ) {
    ++position;
  }

  return new entry.Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
} // _ A-Z a-z


function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}

/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */

function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

var Parser = /*#__PURE__*/function () {
  function Parser(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  /**
   * Converts a name lex token into a name parse node.
   */


  var _proto = Parser.prototype;

  _proto.parseName = function parseName() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: entry.Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */
  ;

  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: entry.Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start)
    };
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   */
  ;

  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'schema':
        case 'scalar':
        case 'type':
        case 'interface':
        case 'union':
        case 'enum':
        case 'input':
        case 'directive':
          return this.parseTypeSystemDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }

    throw this.unexpected();
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  ;

  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;

    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: entry.Kind.OPERATION_DEFINITION,
        operation: 'query',
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    var operation = this.parseOperationType();
    var name;

    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }

    return {
      kind: entry.Kind.OPERATION_DEFINITION,
      operation: operation,
      name: name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * OperationType : one of query mutation subscription
   */
  ;

  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return 'query';

      case 'mutation':
        return 'mutation';

      case 'subscription':
        return 'subscription';
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  ;

  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: entry.Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : undefined,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  }
  /**
   * Variable : $ Name
   */
  ;

  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: entry.Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  }
  /**
   * SelectionSet : { Selection+ }
   */
  ;

  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: entry.Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  ;

  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  ;

  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;

    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return {
      kind: entry.Kind.FIELD,
      alias: alias,
      name: name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined,
      loc: this.loc(start)
    };
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  ;

  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: entry.Kind.ARGUMENT,
      name: name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };

  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: entry.Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  ;

  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: entry.Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }

    return {
      kind: entry.Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  ;

  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;

    var start = this._lexer.token;
    this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: entry.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }

    return {
      kind: entry.Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  }
  /**
   * FragmentName : Name but not `on`
   */
  ;

  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  ;

  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;

    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case TokenKind.INT:
        this._lexer.advance();

        return {
          kind: entry.Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };

      case TokenKind.FLOAT:
        this._lexer.advance();

        return {
          kind: entry.Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };

      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case TokenKind.NAME:
        this._lexer.advance();

        switch (token.value) {
          case 'true':
            return {
              kind: entry.Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };

          case 'false':
            return {
              kind: entry.Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };

          case 'null':
            return {
              kind: entry.Kind.NULL,
              loc: this.loc(token)
            };

          default:
            return {
              kind: entry.Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }

      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }

        break;
    }

    throw this.unexpected();
  };

  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;

    this._lexer.advance();

    return {
      kind: entry.Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  ;

  _proto.parseList = function parseList(isConst) {
    var _this = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this.parseValueLiteral(isConst);
    };

    return {
      kind: entry.Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   */
  ;

  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;

    var start = this._lexer.token;

    var item = function item() {
      return _this2.parseObjectField(isConst);
    };

    return {
      kind: entry.Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  ;

  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: entry.Kind.OBJECT_FIELD,
      name: name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */
  ;

  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];

    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }
  /**
   * Directive[Const] : @ Name Arguments[?Const]?
   */
  ;

  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: entry.Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  ;

  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;

    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: entry.Kind.LIST_TYPE,
        type: type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: entry.Kind.NON_NULL_TYPE,
        type: type,
        loc: this.loc(start)
      };
    }

    return type;
  }
  /**
   * NamedType : Name
   */
  ;

  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: entry.Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  } // Implements the parsing rules in the Type Definition section.

  /**
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    // Many definitions begin with a description and require a lookahead.
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }
    }

    throw this.unexpected(keywordToken);
  };

  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  ;

  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   */
  ;

  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: entry.Kind.SCHEMA_DEFINITION,
      description: description,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  ;

  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: entry.Kind.OPERATION_TYPE_DEFINITION,
      operation: operation,
      type: type,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  ;

  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: entry.Kind.SCALAR_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: entry.Kind.OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  ;

  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;

    if (!this.expectOptionalKeyword('implements')) {
      return [];
    }

    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = []; // Optional leading ampersand

      this.expectOptionalToken(TokenKind.AMP);

      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));

      return types;
    }

    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  }
  /**
   * FieldsDefinition : { FieldDefinition+ }
   */
  ;

  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3; // Legacy support for the SDL?


    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();

      this._lexer.advance();

      return [];
    }

    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  ;

  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: entry.Kind.FIELD_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      type: type,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  ;

  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  ;

  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;

    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }

    var directives = this.parseDirectives(true);
    return {
      kind: entry.Kind.INPUT_VALUE_DEFINITION,
      description: description,
      name: name,
      type: type,
      defaultValue: defaultValue,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  ;

  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: entry.Kind.INTERFACE_TYPE_DEFINITION,
      description: description,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  ;

  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: entry.Kind.UNION_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  ;

  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  ;

  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: entry.Kind.ENUM_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * EnumValuesDefinition : { EnumValueDefinition+ }
   */
  ;

  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   *
   * EnumValue : Name
   */
  ;

  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: entry.Kind.ENUM_VALUE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  ;

  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: entry.Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description: description,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InputFieldsDefinition : { InputValueDefinition+ }
   */
  ;

  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  ;

  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   */
  ;

  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.SCHEMA_EXTENSION,
      directives: directives,
      operationTypes: operationTypes,
      loc: this.loc(start)
    };
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  ;

  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    var name = this.parseName();
    var directives = this.parseDirectives(true);

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.SCALAR_TYPE_EXTENSION,
      name: name,
      directives: directives,
      loc: this.loc(start)
    };
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  ;

  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.OBJECT_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  ;

  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();

    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.INTERFACE_TYPE_EXTENSION,
      name: name,
      interfaces: interfaces,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  ;

  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.UNION_TYPE_EXTENSION,
      name: name,
      directives: directives,
      types: types,
      loc: this.loc(start)
    };
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  ;

  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.ENUM_TYPE_EXTENSION,
      name: name,
      directives: directives,
      values: values,
      loc: this.loc(start)
    };
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  ;

  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return {
      kind: entry.Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name: name,
      directives: directives,
      fields: fields,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   */
  ;

  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    var locations = this.parseDirectiveLocations();
    return {
      kind: entry.Kind.DIRECTIVE_DEFINITION,
      description: description,
      name: name,
      arguments: args,
      repeatable: repeatable,
      locations: locations,
      loc: this.loc(start)
    };
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  ;

  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  ;

  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();

    if (DirectiveLocation[name.value] !== undefined) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a location object, used to identify the place in the source that created a given parsed object.
   */
  ;

  _proto.loc = function loc(startToken) {
    var _this$_options4;

    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new entry.Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  }
  /**
   * Determines if the next token is of a given kind
   */
  ;

  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and return undefined.
   */
  ;

  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;

    if (token.kind === kind) {
      this._lexer.advance();

      return token;
    }

    return undefined;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  ;

  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  ;

  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();

      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  ;

  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  ;

  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  ;

  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  };

  return Parser;
}();
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */


function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? "\"".concat(kind, "\"") : kind;
}

function k(a) {
  return "string" == typeof a ? new GraphQLError(a) : "object" == typeof a && a.message ? new GraphQLError(a.message, a.nodes, a.source, a.positions, a.path, a, a.extensions || {}) : a;
}

function l() {
  return this.message;
}

function n$1(a, b) {
  a |= 0;

  for (var c = 0, d = 0 | b.length; c < d; c++) {
    a = (a << 5) + a + b.charCodeAt(c);
  }

  return a;
}

function t$1(a) {
  var b, c, d, e, f, g;

  if (null === a || q.has(a)) {
    return "null";
  }

  if ("object" != typeof a) {
    return JSON.stringify(a) || "";
  }

  if (a.toJSON) {
    return t$1(a.toJSON());
  }

  if (Array.isArray(a)) {
    for (b = "[", c = 0, d = a.length; c < d; c++) {
      0 < c && (b += ",");
      b += 0 < (e = t$1(a[c])).length ? e : "null";
    }

    return b + "]";
  }

  if (!(b = Object.keys(a).sort()).length && a.constructor && a.constructor !== Object) {
    return b = r$1.get(a) || Math.random().toString(36).slice(2), r$1.set(a, b), '{"__key":"' + b + '"}';
  }

  q.add(a);
  c = "{";
  d = 0;

  for (e = b.length; d < e; d++) {
    (g = t$1(a[f = b[d]])) && (1 < c.length && (c += ","), c += t$1(f) + ":" + g);
  }

  q.delete(a);
  return c + "}";
}

function u$1(a) {
  q.clear();
  return t$1(a);
}

function v$1(a) {
  var b = ("string" != typeof a ? a.loc && a.loc.source.body || entry.print(a) : a).replace(/([\s,]|#[^\n\r]+)+/g, " ").trim();
  "string" != typeof a && (a.loc ? (a = "definitions" in a && w$1(a)) && (b = "# " + a + "\n" + b) : a.loc = {
    start: 0,
    end: b.length,
    source: {
      body: b,
      name: "gql",
      locationOffset: {
        line: 1,
        column: 1
      }
    }
  });
  return b;
}

function y(a) {
  if ("string" == typeof a) {
    var b = n$1(5381, v$1(a)) >>> 0;
    a = x.get(b) || parse(a, {
      noLocation: !0
    });
  } else {
    b = a.__key || n$1(5381, v$1(a)) >>> 0, a = x.get(b) || a;
  }

  a.loc || v$1(a);
  a.__key = b;
  x.set(b, a);
  return a;
}

function w$1(a) {
  var b, c, d;

  for (b = 0, c = a.definitions.length; b < c; b++) {
    if ((d = a.definitions[b]).kind === entry.Kind.OPERATION_DEFINITION && d.name) {
      return d.name.value;
    }
  }
}

function z$1(a, b, c) {
  return {
    operation: a,
    data: b.data,
    error: Array.isArray(b.errors) ? new m({
      graphQLErrors: b.errors,
      response: c
    }) : void 0,
    extensions: "object" == typeof b.extensions && b.extensions || void 0
  };
}

function A$1(a, b, c) {
  return {
    operation: a,
    data: void 0,
    error: new m({
      networkError: b,
      response: c
    }),
    extensions: void 0
  };
}

function B$1() {
  return (B$1 = Object.assign || function (a) {
    var b, c, d;

    for (b = 1; b < arguments.length; b++) {
      c = arguments[b];

      for (d in c) {
        Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d]);
      }
    }

    return a;
  }).apply(this, arguments);
}

function makeFetchBody(a) {
  return {
    query: entry.print(a.query),
    operationName: w$1(a.query),
    variables: a.variables || void 0,
    extensions: void 0
  };
}

function makeFetchURL(a, b) {
  var c = a.context.url;

  if ("query" !== a.kind || !a.context.preferGetMethod || !b) {
    return c;
  }

  a = [];
  b.operationName && a.push("operationName=" + encodeURIComponent(b.operationName));
  b.query && a.push("query=" + encodeURIComponent(b.query.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim()));
  b.variables && a.push("variables=" + encodeURIComponent(u$1(b.variables)));
  b.extensions && a.push("extensions=" + encodeURIComponent(u$1(b.extensions)));
  return c + "?" + a.join("&");
}

function makeFetchOptions(a, b) {
  var c = "query" === a.kind && !!a.context.preferGetMethod;
  return B$1({}, a = "function" == typeof a.context.fetchOptions ? a.context.fetchOptions() : a.context.fetchOptions || {}, {
    body: !c && b ? JSON.stringify(b) : void 0,
    method: c ? "GET" : "POST",
    headers: c ? a.headers : B$1({}, {
      "content-type": "application/json"
    }, a.headers)
  });
}

function makeFetchSource(a, b, c) {
  return make$1(function (d) {
    var e = d.next,
        f = d.complete,
        g = "undefined" != typeof AbortController ? new AbortController() : null,
        p = !1;
    Promise.resolve().then(function () {
      if (!p) {
        return g && (c.signal = g.signal), function C(a, b, c) {
          var e,
              d = !1;
          return (a.context.fetch || fetch)(b, c).then(function (a) {
            e = a;
            d = 200 > a.status || a.status >= ("manual" === c.redirect ? 400 : 300);
            return a.json();
          }).then(function (b) {
            if (!("data" in b) && !("errors" in b)) {
              throw Error("No Content");
            }

            return z$1(a, b, e);
          }).catch(function (b) {
            if ("AbortError" !== b.name) {
              return A$1(a, d ? Error(e.statusText) : b, e);
            }
          });
        }(a, b, c);
      }
    }).then(function (a) {
      p || (p = !0, a && e(a), f());
    });
    return function () {
      p = !0;
      g && g.abort();
    };
  });
}

function createRequest(a, b) {
  a = y(a);
  return {
    key: b ? n$1(a.__key, u$1(b)) >>> 0 : a.__key,
    query: a,
    variables: b || {}
  };
}

var m, q, r$1, x;

m = function (a) {
  function b(b) {
    var f,
        c = b.networkError,
        e = b.response;

    f = function h(a, b) {
      var d = "";

      if (void 0 !== a) {
        return d = "[Network] " + a.message;
      }

      void 0 !== b && b.forEach(function c(a) {
        d += "[GraphQL] " + a.message + "\n";
      });
      return d.trim();
    }(c, b = (b.graphQLErrors || []).map(k));

    a.call(this, f);
    this.name = "CombinedError";
    this.message = f;
    this.graphQLErrors = b;
    this.networkError = c;
    this.response = e;
  }

  a && (b.__proto__ = a);
  (b.prototype = Object.create(a && a.prototype)).constructor = b;
  b.prototype.toString = l;
  return b;
}(Error);

q = new Set(), r$1 = new WeakMap();
x = new Map();

function n(a, b) {
  if (Array.isArray(a)) {
    for (var c = 0; c < a.length; c++) {
      n(a[c], b);
    }
  } else if ("object" == typeof a && null !== a) {
    for (c in a) {
      "__typename" === c && "string" == typeof a[c] ? b[a[c]] = 0 : n(a[c], b);
    }
  }

  return b;
}

function p(a) {
  return a.kind === entry.Kind.FIELD && "__typename" === a.name.value && !a.alias;
}

function r(a) {
  if (a.selectionSet && !a.selectionSet.selections.some(p)) {
    return B$1({}, a, {
      selectionSet: B$1({}, a.selectionSet, {
        selections: a.selectionSet.selections.concat([{
          kind: entry.Kind.FIELD,
          name: {
            kind: entry.Kind.NAME,
            value: "__typename"
          }
        }])
      })
    });
  }
}

function u(a) {
  a = y(a);
  var b = t.get(a.__key);
  b || ((b = entry.visit(a, {
    Field: r,
    InlineFragment: r
  })).__key = a.__key, t.set(a.__key, b));
  return b;
}

function v(a) {
  return a && "object" == typeof a ? Object.keys(a).reduce(function (b, c) {
    var d = a[c];
    "__typename" === c ? Object.defineProperty(b, "__typename", {
      enumerable: !1,
      value: d
    }) : Array.isArray(d) ? b[c] = d.map(v) : b[c] = d && "object" == typeof d && "__typename" in d ? v(d) : d;
    return b;
  }, {}) : a;
}

function w(a) {
  a.toPromise = function () {
    return toPromise$1(take$1(1)(a));
  };

  return a;
}

function z(a, b, c) {
  c || (c = b.context);
  return {
    key: b.key,
    query: b.query,
    variables: b.variables,
    kind: a,
    context: c,

    get operationName() {

      return this.kind;
    }

  };
}

function A(a, b) {
  return z(a.kind, a, B$1({}, a.context, {
    meta: B$1({}, a.context.meta, b)
  }));
}

function B() {}

function F(a) {
  return "mutation" !== (a = a.kind) && "query" !== a;
}

function G(a) {
  var b = z(a.kind, a);
  b.query = u(a.query);
  return b;
}

function H(a) {
  return "query" !== a.kind || "cache-only" !== a.context.requestPolicy;
}

function I(a) {
  return A(a, {
    cacheOutcome: "miss"
  });
}

function J(a) {
  return F(a);
}

function K(a) {
  function b(a) {
    var b = a.context.requestPolicy;
    return "query" === a.kind && "network-only" !== b && ("cache-only" === b || k.has(a.key));
  }

  function c(a) {
    var c = k.get(a.key);
    c = B$1({}, c, {
      operation: A(a, {
        cacheOutcome: c ? "hit" : "miss"
      })
    });
    "cache-and-network" === a.context.requestPolicy && (c.stale = !0, L(m, a));
    return c;
  }

  function d(a) {
    return !F(a) && b(a);
  }

  function e(a) {
    function c(a) {
      l.add(a);
    }

    var e,
        l,
        g,
        d = a.operation;

    if (d) {
      e = Object.keys(n(a.data, {})).concat(d.context.additionalTypenames || []);

      if ("mutation" === a.operation.kind) {
        l = new Set();

        for (a = 0; a < e.length; a++) {
          (g = h[g = e[a]] || (h[g] = new Set())).forEach(c);
          g.clear();
        }

        l.forEach(function b(a) {
          k.has(a) && (d = k.get(a).operation, k.delete(a), L(m, d));
        });
      } else if ("query" === d.kind && a.data) {
        for (k.set(d.key, a), a = 0; a < e.length; a++) {
          (h[g = e[a]] || (h[g] = new Set())).add(d.key);
        }
      }
    }
  }

  function f(a) {
    return !F(a) && !b(a);
  }

  var g = a.forward,
      m = a.client;
      a.dispatchDebug;
      var k = new Map(),
      h = Object.create(null);
  return function (a) {
    var b = share$1(a);
    a = map$1(c)(filter$1(d)(b));
    b = H$1(e)(g(filter$1(H)(map$1(I)(merge$1([map$1(G)(filter$1(f)(b)), filter$1(J)(b)])))));
    return merge$1([a, b]);
  };
}

function L(a, b) {
  return a.reexecuteOperation(z(b.kind, b, B$1({}, b.context, {
    requestPolicy: "network-only"
  })));
}

function O(a) {
  function b(a) {
    f.delete(a.operation.key);
  }

  function c(a) {
    var c = a.key,
        b = a.kind;

    if ("teardown" === b) {
      return f.delete(c), !0;
    }

    if ("query" !== b && "subscription" !== b) {
      return !0;
    }

    b = f.has(c);
    f.add(c);
    b && "production" !== "production" && e({
      type: "dedup",
      message: "An operation has been deduped.",
      operation: a,
      source: "dedupExchange"
    });
    return !b;
  }

  var d = a.forward,
      e = a.dispatchDebug,
      f = new Set();
  return function (a) {
    a = filter$1(c)(a);
    return H$1(b)(d(a));
  };
}

function P(a) {
  return "query" === a.kind || "mutation" === a.kind;
}

function Q(a) {
  return "query" !== a.kind && "mutation" !== a.kind;
}

function R(a) {
  var b = a.forward;
      a.dispatchDebug;
  return function (a) {
    var f,
        d = share$1(a);
    a = D(function (a) {
      var b = a.key,
          e = filter$1(function (a) {
        return "teardown" === a.kind && a.key === b;
      })(d),
          f = makeFetchBody(a),
          h = makeFetchURL(a, f),
          l = makeFetchOptions(a, f);
      return H$1(function (b) {
        b.data ? void 0 : b.error;
      })(takeUntil$1(e)(makeFetchSource(a, h, l)));
    })(filter$1(P)(d));
    f = b(filter$1(Q)(d));
    return merge$1([a, f]);
  };
}

function S() {
  return !1;
}

function T(a) {
  function b(a) {
    if ("teardown" !== a.kind && "production" !== "production") {
      var b = 'No exchange has handled operations of kind "' + a.kind + "\". Check whether you've added an exchange responsible for these operations.";
      console.warn(b);
    }
  }

  a.dispatchDebug;
  return function (a) {
    return filter$1(S)(H$1(b)(a));
  };
}

function V(a) {
  return function (b) {
    var c = b.client;
        b.dispatchDebug;
    return a.reduceRight(function (a, b) {
      return b({
        client: c,
        forward: a,
        dispatchDebug: function (a) {
        }
      });
    }, b.forward);
  };
}

function X(a) {
  var d,
      e,
      g,
      m,
      c = this;
  this.activeOperations = Object.create(null);
  this.queue = [];

  this.createOperationContext = function (a) {
    a || (a = {});
    return B$1({}, {
      url: c.url,
      fetchOptions: c.fetchOptions,
      fetch: c.fetch,
      preferGetMethod: c.preferGetMethod
    }, a, {
      suspense: a.suspense || !1 !== a.suspense && c.suspense,
      requestPolicy: a.requestPolicy || c.requestPolicy
    });
  };

  this.createRequestOperation = function (a, b, d) {
    return z(a, b, c.createOperationContext(d));
  };

  this.executeQuery = function (a, b) {
    a = c.createRequestOperation("query", a, b);
    return c.executeRequestOperation(a);
  };

  this.executeSubscription = function (a, b) {
    a = c.createRequestOperation("subscription", a, b);
    return c.executeRequestOperation(a);
  };

  this.executeMutation = function (a, b) {
    a = c.createRequestOperation("mutation", a, b);
    return c.executeRequestOperation(a);
  };

  d = B;

  this.url = a.url;
  this.fetchOptions = a.fetchOptions;
  this.fetch = a.fetch;
  this.suspense = !!a.suspense;
  this.requestPolicy = a.requestPolicy || "cache-first";
  this.preferGetMethod = !!a.preferGetMethod;
  this.maskTypename = !!a.maskTypename;
  e = makeSubject$1();
  g = e.next;
  this.operations$ = e.source;
  m = !1;

  this.dispatchOperation = function (a) {
    m = !0;

    for (a && g(a); a = c.queue.shift();) {
      g(a);
    }

    m = !1;
  };

  this.reexecuteOperation = function (a) {
    if ("mutation" === a.kind || 0 < (c.activeOperations[a.key] || 0)) {
      c.queue.push(a), m || Promise.resolve().then(c.dispatchOperation);
    }
  };

  a = V(void 0 !== a.exchanges ? a.exchanges : W);
  this.results$ = share$1(a({
    client: this,
    dispatchDebug: d,
    forward: T({
      dispatchDebug: d
    })
  })(this.operations$));
  publish$1(this.results$);
}

function Y(a) {
  a.data = v(a.data);
  return a;
}

function createClient(a) {
  return new X(a);
}

function subscriptionExchange(a) {
  function b(a) {
    return "subscription" === (a = a.kind) || !!d && ("query" === a || "mutation" === a);
  }

  var c = a.forwardSubscription,
      d = a.enableAllOperations;
  return function (a) {
    function d(a) {
      var b = c({
        key: a.key.toString(36),
        query: entry.print(a.query),
        variables: a.variables,
        context: B$1({}, a.context)
      });
      return make$1(function (c) {
        function d(b) {
          return h(z$1(a, b));
        }

        function e(b) {
          return h(A$1(a, b));
        }

        function f() {
          k || (k = !0, "subscription" === a.kind && m.reexecuteOperation(z("teardown", a, a.context)), g());
        }

        var l,
            h = c.next,
            g = c.complete,
            k = !1;
        Promise.resolve().then(function () {
          k || (l = b.subscribe({
            next: d,
            error: e,
            complete: f
          }));
        });
        return function () {
          k = !0;
          l && l.unsubscribe();
        };
      });
    }

    function e(a) {
      return !k(a);
    }

    var m = a.client,
        q = a.forward,
        k = b;
    return function (a) {
      var c,
          b = share$1(a);
      a = D(function (a) {
        var c = a.key,
            e = filter$1(function (a) {
          return "teardown" === a.kind && a.key === c;
        })(b);
        return takeUntil$1(e)(d(a));
      })(filter$1(k)(b));
      c = q(filter$1(e)(b));
      return merge$1([a, c]);
    };
  };
}

var t, W;
t = new Map();
T({
  dispatchDebug: B
});
W = [O, K, R];

X.prototype.onOperationStart = function (a) {
  var b = a.key;
  this.activeOperations[b] = (this.activeOperations[b] || 0) + 1;
  this.dispatchOperation(a);
};

X.prototype.onOperationEnd = function (a) {
  var b = a.key,
      c = this.activeOperations[b] || 0;

  if (0 >= (this.activeOperations[b] = 0 >= c ? 0 : c - 1)) {
    for (b = this.queue.length - 1; 0 <= b; b--) {
      this.queue[b].key === a.key && this.queue.splice(b, 1);
    }

    this.dispatchOperation(z("teardown", a, a.context));
  }
};

X.prototype.executeRequestOperation = function (a) {
  var f,
      g,
      d = this,
      e = filter$1(function (b) {
    return b.operation.key === a.key;
  })(this.results$);
  this.maskTypename && (e = map$1(Y)(e));

  if ("mutation" === a.kind) {
    return take$1(1)(onStart$1(function b() {
      return d.dispatchOperation(a);
    })(e));
  }

  f = filter$1(function (b) {
    return "teardown" === b.kind && b.key === a.key;
  })(this.operations$), g = onEnd$1(function () {
    d.onOperationEnd(a);
  })(onStart$1(function () {
    d.onOperationStart(a);
  })(takeUntil$1(f)(e)));
  return "query" === a.kind && a.context.pollInterval ? K$1(function c() {
    return g;
  })(merge$1([fromValue$1(0), interval$1(a.context.pollInterval)])) : g;
};

X.prototype.query = function (a, b, c) {
  c && "boolean" == typeof c.suspense || (c = B$1({}, c, {
    suspense: !1
  }));
  return w(this.executeQuery(createRequest(a, b), c));
};

X.prototype.readQuery = function (a, b, c) {
  var d = null;
  N(function (a) {
    d = a;
  })(this.executeQuery(createRequest(a, b), c)).unsubscribe();
  return d;
};

X.prototype.subscription = function (a, b, c) {
  return this.executeSubscription(createRequest(a, b), c);
};

X.prototype.mutation = function (a, b, c) {
  return w(this.executeMutation(createRequest(a, b), c));
};

function _extends() {
  return (_extends = Object.assign || function (target) {
    var i, source, key;

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];

      for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }).apply(this, arguments);
}

function useMutation(query) {
  function _ref(result) {
    if (isMounted.current) {
      setState({
        fetching: !1,
        stale: !!result.stale,
        data: result.data,
        error: result.error,
        extensions: result.extensions,
        operation: result.operation
      });
    }

    return result;
  }

  function _ref2() {
    isMounted.current = !1;
  }

  var isMounted = entry.react.useRef(!0),
      client = useClient(),
      ref = entry.react.useState(initialState),
      state = ref[0],
      setState = ref[1],
      executeMutation = entry.react.useCallback(function (variables, context) {
    setState(_extends({}, initialState, {
      fetching: !0
    }));
    return toPromise$1(client.executeMutation(createRequest(query, variables), context || {})).then(_ref);
  }, [client, query, setState]);
  entry.react.useEffect(function () {
    return _ref2;
  }, []);
  return [state, executeMutation];
}

function _ref3() {
  return currentInit;
}

function useSource(input, transform) {
  function _ref() {
    return input;
  }

  function _ref5(value) {
    if (!currentInit) {
      setState(function _ref4(prevValue) {
        return isShallowDifferent(prevValue, value) ? value : prevValue;
      });
    }
  }

  var ref = entry.react.useMemo(function () {
    var subject = makeSubject$1(),
        source = concat$1([map$1(_ref)(fromValue$1(input)), subject.source]),
        updateInput = function (nextInput) {
      var prevInput = input;

      try {
        if (nextInput !== prevInput) {
          subject.next(input = nextInput);
        }
      } catch (error) {
        input = prevInput;
        throw error;
      }
    };

    return [source, updateInput];
  }, []),
      input$ = ref[0],
      updateInput = ref[1],
      ref$1 = entry.react.useState(function () {
    currentInit = !0;
    var state;

    try {
      N(function _ref2(value) {
        state = value;
      })(takeWhile$1(_ref3)(transform(input$))).unsubscribe();
    } finally {
      currentInit = !1;
    }

    return state;
  }),
      state = ref$1[0],
      setState = ref$1[1];
  entry.react.useEffect(function () {
    return N(_ref5)(transform(input$, state)).unsubscribe;
  }, [input$]);
  return [state, updateInput];
}

function useRequest(query, variables) {
  var prev = entry.react.useRef(void 0);
  return entry.react.useMemo(function () {
    var request = createRequest(query, variables);

    if (void 0 !== prev.current && prev.current.key === request.key) {
      return prev.current;
    } else {
      prev.current = request;
      return request;
    }
  }, [query, variables]);
}

function _ref2(ref) {
  var stale = ref.stale,
      data = ref.data,
      error = ref.error,
      extensions = ref.extensions,
      operation = ref.operation;
  return {
    fetching: !0,
    stale: !!stale,
    data: data,
    error: error,
    extensions: extensions,
    operation: operation
  };
}

function _ref3$2(subscription$) {
  if (!subscription$) {
    return fromValue$1({
      fetching: !1
    });
  }

  return concat$1([fromValue$1({
    fetching: !0,
    stale: !1
  }), map$1(_ref2)(subscription$), fromValue$1({
    fetching: !1,
    stale: !1
  })]);
}

function useSubscription(args, handler) {
  function _ref(result, partial) {
    var handler = handlerRef.current,
        data = void 0 !== partial.data ? "function" == typeof handler ? handler(result.data, partial.data) : partial.data : result.data;
    return _extends({}, result, partial, {
      data: data
    });
  }

  var request,
      makeSubscription$,
      subscription$,
      ref,
      state,
      update,
      executeSubscription,
      client = useClient(),
      handlerRef = entry.react.useRef(handler);
  handlerRef.current = handler;
  request = useRequest(args.query, args.variables);
  makeSubscription$ = entry.react.useCallback(function (opts) {
    return client.executeSubscription(request, _extends({}, args.context, opts));
  }, [client, request, args.context]);
  state = (ref = useSource(subscription$ = entry.react.useMemo(function () {
    return args.pause ? null : makeSubscription$();
  }, [args.pause, makeSubscription$]), entry.react.useCallback(function (subscription$$, prevState) {
    return scan$1(_ref, prevState || initialState)(K$1(_ref3$2)(subscription$$));
  }, [])))[0];
  executeSubscription = entry.react.useCallback(function (opts) {
    return update(makeSubscription$(opts));
  }, [update = ref[1], makeSubscription$]);
  entry.react.useEffect(function () {
    update(subscription$);
  }, [update, subscription$]);
  return [state, executeSubscription];
}

var defaultClient, Context, Provider, useClient, initialState, currentInit, isShallowDifferent;
defaultClient = createClient({
  url: "/graphql"
});
Provider = (Context = /*#__PURE__*/entry.react.createContext(defaultClient)).Provider;

useClient = function () {
  var client = entry.react.useContext(Context);

  return client;
};

initialState = {
  fetching: !1,
  stale: !1,
  error: void 0,
  data: void 0,
  extensions: void 0,
  operation: void 0
};
currentInit = !1;

isShallowDifferent = function (a, b) {
  var x, x$1;

  if ("object" != typeof a || "object" != typeof b) {
    return a !== b;
  }

  for (x in a) {
    if (!(x in b)) {
      return !0;
    }
  }

  for (x$1 in b) {
    if (a[x$1] !== b[x$1]) {
      return !0;
    }
  }

  return !1;
};

var recipesList = [{
  label: `Add a custom ESLint config`,
  value: `eslint`
}, {
  label: `Add Jest`,
  value: `jest`
}, {
  label: `Add Gatsby Image`,
  value: `gatsby-image`
}, // Waiting on joi2graphql support for Joi.object().unknown()
// with a JSON type.
// {
// label: "Automatically run Prettier on commits",
// value: "prettier-git-hook.mdx",
// },
{
  label: `Add Gatsby Theme Blog`,
  value: `gatsby-theme-blog`
}, {
  label: `Add Gatsby Theme Blog Core`,
  value: `gatsby-theme-blog-core`
}, {
  label: `Add Gatsby Theme Notes`,
  value: `gatsby-theme-notes`
}, {
  label: `Add persistent layout component with gatsby-plugin-layout`,
  value: `gatsby-plugin-layout`
}, {
  label: `Add Theme UI`,
  value: `theme-ui`
}, {
  label: `Add Chakra UI`,
  value: `chakra-ui`
}, {
  label: `Add Emotion`,
  value: `emotion`
}, {
  label: `Add support for MDX Pages`,
  value: `mdx-pages`
}, {
  label: `Add support for MDX Pages with images`,
  value: `mdx-images`
}, {
  label: `Add Styled Components`,
  value: `styled-components`
}, {
  label: `Add Tailwind`,
  value: `tailwindcss`
}, {
  label: `Add Sass`,
  value: `sass`
}, {
  label: `Add TypeScript`,
  value: `typescript`
}, {
  label: `Add Cypress testing`,
  value: `cypress`
}, {
  label: `Add animated page transition support`,
  value: `animated-page-transitions`
}, {
  label: `Add plugins to make site a PWA`,
  value: `pwa`
}, {
  label: `Add React Helmet`,
  value: `gatsby-plugin-react-helmet`
}, {
  label: `Add GitHub Pages deployment with Travis CI`,
  value: `travis-deploy-github-pages`
}, {
  label: `Add e-commerce powered by Snipcart`,
  value: `snipcart.mdx`
}, {
  label: `Add Storybook - JavaScript`,
  value: `storybook-js`
}, {
  label: `Add Storybook - TypeScript`,
  value: `storybook-ts`
}, {
  label: `Add AVA`,
  value: `ava`
}, {
  label: `Add Preact`,
  value: `preact`
}, {
  label: `Add GitLab CI/CD`,
  value: `gitlab-ci-cd`
}];

const removeJsx = () => tree => {
  remove__default['default'](tree, `export`, () => true);
  return tree;
}; // Inline ink-link as it's not upgraded to v3 yet


const Link = props => /*#__PURE__*/entry.react.createElement(build$1.Transform, {
  transform: children => terminalLink_1(children, props.url, {
    fallback: props.fallback
  })
}, /*#__PURE__*/entry.react.createElement(build$1.Text, null, props.children));

Link.propTypes = {
  children: PropTypes__default['default'].oneOfType([PropTypes__default['default'].arrayOf(PropTypes__default['default'].node), PropTypes__default['default'].node]).isRequired,
  url: PropTypes__default['default'].string,
  fallback: PropTypes__default['default'].bool
};
Link.defaultProps = {
  url: ``,
  fallback: true
}; // Check for what version of React is loaded & warn if it's too low.

if (semver__default['default'].lt(entry.react.version, `16.8.0`)) {
  console.log(`Recipes works best with newer versions of React. Please file a bug report if you see this warning.`);
}

const WelcomeMessage = () => /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(build$1.Box, {
  borderStyle: "double",
  borderColor: "magentaBright",
  padding: 1,
  marginBottom: 1,
  marginLeft: 2,
  marginRight: 2
}, /*#__PURE__*/entry.react.createElement(build$1.Text, null, "Thank you for trying the experimental version of Gatsby Recipes!")), /*#__PURE__*/entry.react.createElement(Div, {
  marginBottom: 2,
  alignItems: "center"
}, /*#__PURE__*/entry.react.createElement(build$1.Text, null, "Please ask questions, share your recipes, report bugs, and subscribe for updates in our umbrella issue at https://github.com/gatsbyjs/gatsby/issues/22991")));

const RecipesList = ({
  setRecipe
}) => {
  const items = recipesList;
  return /*#__PURE__*/entry.react.createElement(SelectInput, {
    items: items,
    onSelect: setRecipe,
    indicatorComponent: item => /*#__PURE__*/entry.react.createElement(build$1.Text, {
      color: item.isSelected ? `yellow` : `magentaBright`
    }, item.isSelected ? `>>` : `  `, item.label),
    itemComponent: props => /*#__PURE__*/entry.react.createElement(build$1.Text, {
      color: "magentaBright"
    }, props.isSelected, ` `, props.label)
  });
};

const Div = props => /*#__PURE__*/entry.react.createElement(build$1.Box, entry._extends({
  textWrap: "wrap",
  flexDirection: "column",
  marginBottom: 1
}, props)); // Markdown ignores new lines and so do we.


function eliminateNewLines(children) {
  return entry.react.Children.map(children, child => {
    if (! /*#__PURE__*/entry.react.isValidElement(child)) {
      return child.replace(/(\r\n|\n|\r)/gm, ` `);
    }

    if (child.props.children) {
      child = /*#__PURE__*/entry.react.cloneElement(child, {
        children: eliminateNewLines(child.props.children)
      });
    }

    return child;
  });
}

const ResourceComponent = props => {
  var _resource, _resource2, _resource3, _resource4, _resource5;

  let resource;

  if (props._key) {
    resource = entry.useResource(props._key);
  } else {
    resource = entry.useResourceByUUID(props._uuid);
  }

  return /*#__PURE__*/entry.react.createElement(Div, {
    marginBottom: 1
  }, /*#__PURE__*/entry.react.createElement(build$1.Text, {
    color: "yellow",
    backgroundColor: "black",
    bold: true,
    underline: true
  }, resource.resourceName, ":"), /*#__PURE__*/entry.react.createElement(build$1.Text, {
    color: "green"
  }, (_resource = resource) === null || _resource === void 0 ? void 0 : _resource.describe), (_resource2 = resource) !== null && _resource2 !== void 0 && _resource2.diff ? /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(build$1.Text, null, ` `), /*#__PURE__*/entry.react.createElement(build$1.Text, null, (_resource3 = resource) === null || _resource3 === void 0 ? void 0 : _resource3.diff)) : null, (_resource4 = resource) !== null && _resource4 !== void 0 && _resource4.error ? /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(build$1.Text, null, ` `), /*#__PURE__*/entry.react.createElement(build$1.Text, {
    backgroundColor: "#C41E3A",
    color: "white"
  }, (_resource5 = resource) === null || _resource5 === void 0 ? void 0 : _resource5.error)) : null);
};

const components = {
  inlineCode: props => /*#__PURE__*/entry.react.createElement(build$1.Text, null, "`", props.children, "`"),
  pre: props => /*#__PURE__*/entry.react.createElement(Div, props),
  code: props => {
    // eslint-disable-next-line
    let language = "```";

    if (props.className) {
      // eslint-disable-next-line
      language = props.className.split(`-`)[1];
    }

    const children = hicat__default['default'](props.children.trim(), {
      lang: language
    });
    const ansi = `\`\`\`${language}\n${children.ansi}\n\`\`\``;
    return /*#__PURE__*/entry.react.createElement(Div, {
      marginBottom: 1
    }, /*#__PURE__*/entry.react.createElement(build$1.Text, null, ansi));
  },
  h1: props => /*#__PURE__*/entry.react.createElement(build$1.Box, {
    marginBottom: 1
  }, /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true,
    underline: true
  }, props))),
  h2: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true
  }, props)),
  h3: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true,
    italic: true
  }, props)),
  h4: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true
  }, props)),
  h5: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true
  }, props)),
  h6: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true
  }, props)),
  a: ({
    href,
    children
  }) => /*#__PURE__*/entry.react.createElement(Link, {
    url: href
  }, children),
  strong: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    bold: true
  }, props)),
  em: props => /*#__PURE__*/entry.react.createElement(build$1.Text, entry._extends({
    italic: true
  }, props)),
  p: props => {
    const children = eliminateNewLines(props.children);
    return /*#__PURE__*/entry.react.createElement(Div, null, /*#__PURE__*/entry.react.createElement(build$1.Text, null, children));
  },
  ul: props => /*#__PURE__*/entry.react.createElement(Div, {
    marginBottom: 1
  }, props.children),
  li: props => /*#__PURE__*/entry.react.createElement(build$1.Text, null, "* ", props.children),
  Config: () => null,
  GatsbyPlugin: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  NPMPackageJson: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  NPMPackage: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  File: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  Directory: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  GatsbyShadowFile: () => null,
  NPMScript: props => /*#__PURE__*/entry.react.createElement(ResourceComponent, props),
  RecipeIntroduction: props => /*#__PURE__*/entry.react.createElement(Div, props),
  RecipeStep: props => {
    const children = entry.react.Children.toArray(props.children);
    const firstChild = children.shift();
    children.unshift( /*#__PURE__*/entry.react.createElement(build$1.Box, {
      key: "header",
      flexDirection: "row"
    }, /*#__PURE__*/entry.react.createElement(build$1.Text, null, props.step, ")", ` `), firstChild));
    return /*#__PURE__*/entry.react.createElement(Div, null, /*#__PURE__*/entry.react.createElement(build$1.Box, {
      borderStyle: "single",
      padding: 1,
      flexDirection: "column",
      borderColor: "magentaBright"
    }, children));
  },
  div: props => /*#__PURE__*/entry.react.createElement(Div, props)
};
var cli = (async ({
  recipe,
  isDevelopMode,
  isInstallMode,
  graphqlPort,
  projectRoot
}) => {
  try {
    const GRAPHQL_ENDPOINT = `http://localhost:${graphqlPort}/graphql`;
    const subscriptionClient = new entry.dist.SubscriptionClient(`ws://localhost:${graphqlPort}/graphql`, {
      reconnect: true
    }, WebSocket__default['default']);
    let showRecipesList = false;

    if (!recipe) {
      showRecipesList = true;
    }

    const client = createClient({
      fetch: fetch__default['default'],
      url: GRAPHQL_ENDPOINT,
      exchanges: [...W, subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation);
        }

      })]
    });

    const Plan = ({
      state,
      localRecipe,
      isDevelopMode
    }) => {
      var _state$context$plan;

      const {
        exit
      } = build$1.useApp(); // Exit the app after we render

      entry.react.useEffect(() => {
        if (!isDevelopMode) {
          exit();
        }
      }, []);
      return /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(entry.ResourceProvider // Exclude inputs as they are components (so "plans" currrently
      // (we need to cleanup our names) too like resources which is why we
      // exclude them. The input from the inputs (haha) are ignored unless
      // they're passed as props into a resource component in which case
      // they're validated like normal.
      , {
        value: ((_state$context$plan = state.context.plan) === null || _state$context$plan === void 0 ? void 0 : _state$context$plan.filter(p => p.resourceName !== `Input`)) || []
      }, /*#__PURE__*/entry.react.createElement(WelcomeMessage, null), isDevelopMode ? /*#__PURE__*/entry.react.createElement(build$1.Box, {
        flexDirection: "column",
        marginBottom: 2
      }, /*#__PURE__*/entry.react.createElement(build$1.Text, {
        strong: true,
        underline: true
      }, "DEVELOP MODE")) : null, state.context.stepsAsJS.map((step, i) => {
        var _state$context$export;

        return /*#__PURE__*/entry.react.createElement(StepRenderer, {
          key: `step-${i}`,
          components: components,
          remarkPlugins: [removeJsx]
        }, ((_state$context$export = state.context.exports) === null || _state$context$export === void 0 ? void 0 : _state$context$export.join(`\n`)) + `\n\n` + step);
      }), /*#__PURE__*/entry.react.createElement(build$1.Text, null, `\n------\n`), /*#__PURE__*/entry.react.createElement(build$1.Text, {
        color: "yellow"
      }, "To install this recipe, run:"), /*#__PURE__*/entry.react.createElement(build$1.Text, null, ` `), /*#__PURE__*/entry.react.createElement(build$1.Text, null, `  `, "gatsby recipes ", localRecipe, " --install"), /*#__PURE__*/entry.react.createElement(build$1.Text, null, ` `)));
    };

    const Installing = ({
      state
    }) => /*#__PURE__*/entry.react.createElement(Div, null, state.context.plan.map((p, i) => /*#__PURE__*/entry.react.createElement(build$1.Box, {
      textWrap: "wrap",
      flexDirection: "column",
      key: `${p.resourceName}-${i}`
    }, /*#__PURE__*/entry.react.createElement(build$1.Text, null, p.isDone ? `✔ ` : /*#__PURE__*/entry.react.createElement(_default, null), ` `, /*#__PURE__*/entry.react.createElement(build$1.Text, {
      italic: true
    }, p.resourceName, ":"), ` `, p.isDone ? p._message : p.describe, ` `, state.context.elapsed > 0 && /*#__PURE__*/entry.react.createElement(build$1.Text, null, "(", state.context.elapsed / 1000, "s elapsed)")))));

    let sentContinue = false;

    const RecipeInterpreter = () => {
      const {
        exit
      } = build$1.useApp(); // eslint-disable-next-line

      const [localRecipe, setRecipe] = entry.react.useState(recipe);
      const [subscriptionResponse] = useSubscription({
        query: `
          subscription {
            operation {
              state
            }
          }
        `
      }, (_prev, now) => now); // eslint-disable-next-line

      const [_, createOperation] = useMutation(`
        mutation ($recipePath: String!, $projectRoot: String!, $isDevelopMode: Boolean!) {
          createOperation(recipePath: $recipePath, projectRoot: $projectRoot, watchChanges: $isDevelopMode)
        }
      `); // eslint-disable-next-line

      const [__, _sendEvent] = useMutation(`
        mutation($event: String!, $input: String) {
          sendEvent(event: $event, input: $input)
        }
      `);

      const sendEvent = ({
        event,
        input
      }) => {
        if (input) {
          _sendEvent({
            event,
            input: JSON.stringify(input)
          });
        } else {
          _sendEvent({
            event
          });
        }
      };

      subscriptionClient.connectionCallback = async () => {
        if (!showRecipesList) {
          try {
            await createOperation({
              recipePath: localRecipe,
              projectRoot,
              isDevelopMode
            });
          } catch (e) {
            console.log(`error creating operation`, e);
          }
        }
      };

      const state = subscriptionResponse.data && JSON.parse(subscriptionResponse.data.operation.state);
      build$1.useInput((_, key) => {
        if (showRecipesList) {
          return;
        }

        if (key.return) {
          sendEvent({
            event: `CONTINUE`
          });
        }
      });

      if (showRecipesList) {
        return /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(WelcomeMessage, null), /*#__PURE__*/entry.react.createElement(build$1.Text, {
          bold: true,
          underline: true
        }, "Select a recipe to run"), /*#__PURE__*/entry.react.createElement(RecipesList, {
          setRecipe: async recipeItem => {
            if (recipeItem.value.endsWith(`.mdx`)) {
              setRecipe(recipeItem.value.slice(0, -4));
            } else {
              setRecipe(recipeItem.value);
            }

            gatsbyTelemetry.trackCli(`RECIPE_RUN`, {
              name: recipeItem.value
            });
            showRecipesList = false;

            try {
              await createOperation({
                recipePath: recipeItem.value,
                projectRoot,
                isDevelopMode: false
              });
            } catch (e) {
              console.log(`error creating operation`, e);
            }
          }
        }));
      }

      const ValidationErrors = state => {
        var _state$context;

        if ((_state$context = state.context) !== null && _state$context !== void 0 && _state$context.plan) {
          return /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(build$1.Text, {
            bold: true
          }, "The recipe didn't validate. Please fix the following errors:"), /*#__PURE__*/entry.react.createElement(build$1.Text, null, `\n`), state.context.plan.filter(p => p.error).map((p, i) => /*#__PURE__*/entry.react.createElement(ResourceComponent, entry._extends({
            key: i
          }, p))));
        } else return null;
      };

      const GeneralError = ({
        state
      }) => {
        let errors = [];

        if (state.context.error) {
          errors = Array.isArray(state.context.error.error) ? state.context.error.error : [state.context.error.error];
        } else {
          var _state$context$plan2;

          // Errors are on a plan.
          errors = (_state$context$plan2 = state.context.plan) === null || _state$context$plan2 === void 0 ? void 0 : _state$context$plan2.filter(p => p.error);
        }

        if (errors.length > 0) {
          return /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(build$1.Text, {
            bold: true
          }, "The recipe has an error:"), /*#__PURE__*/entry.react.createElement(build$1.Text, null, `\n`), errors.map((error, i) => /*#__PURE__*/entry.react.createElement(build$1.Text, {
            key: i,
            backgroundColor: "#C41E3A",
            color: "white"
          }, error.error)));
        } else return null;
      };

      if ((state === null || state === void 0 ? void 0 : state.value) === `doneError`) {
        var _state$context$plan3;

        process.nextTick(() => process.exit());
        return /*#__PURE__*/entry.react.createElement(entry.ResourceProvider, {
          value: ((_state$context$plan3 = state.context.plan) === null || _state$context$plan3 === void 0 ? void 0 : _state$context$plan3.filter(p => p.resourceName !== `Input`)) || []
        }, /*#__PURE__*/entry.react.createElement(ValidationErrors, null), /*#__PURE__*/entry.react.createElement(GeneralError, {
          state: state
        }));
      }

      let isReady; // If installing, continue from presentPlan to applyingPlan

      if ((state === null || state === void 0 ? void 0 : state.value) === `presentPlan` && isInstallMode) {
        if (!sentContinue) {
          sendEvent({
            event: `CONTINUE`
          });
          sentContinue = true;
        }
      } // install mode


      if (isInstallMode) {
        isReady = (state === null || state === void 0 ? void 0 : state.value) === `applyingPlan` || (state === null || state === void 0 ? void 0 : state.value) === `done`;
      } else {
        isReady = (state === null || state === void 0 ? void 0 : state.value) === `presentPlan`;
      }

      if (!isReady) {
        return /*#__PURE__*/entry.react.createElement(build$1.Text, null, /*#__PURE__*/entry.react.createElement(_default, null), " Loading recipe");
      }

      const isDone = state.value === `done`;

      if (isDone) {
        process.nextTick(() => {
          subscriptionClient.close();
          exit();
          process.stdout.write(`\n\n---\n\n\nThe recipe finished successfully!\n\n`);
          process.exit();
        }); // return null
      }

      if (isInstallMode) {
        return /*#__PURE__*/entry.react.createElement(Installing, {
          state: state
        });
      } else {
        return /*#__PURE__*/entry.react.createElement(Plan, {
          state: state,
          localRecipe: localRecipe,
          isDevelopMode: isDevelopMode
        });
      }
    };

    const Wrapper = () => /*#__PURE__*/entry.react.createElement(entry.react.Fragment, null, /*#__PURE__*/entry.react.createElement(Provider, {
      value: client
    }, /*#__PURE__*/entry.react.createElement(build$1.Text, null, ` `), /*#__PURE__*/entry.react.createElement(RecipeInterpreter, null)));

    const Recipe = () => /*#__PURE__*/entry.react.createElement(Wrapper, null); // Enable experimental mode for more efficient reconciler and renderer


    const {
      waitUntilExit
    } = build$1.render( /*#__PURE__*/entry.react.createElement(Recipe, null), {
      experimental: true
    });
    await waitUntilExit();
  } catch (e) {
    console.log(e);
  }
});

// even if another instance might already be running. This is necessary to ensure the gatsby
// develop command does not _not_ run the server if the user is running gatsby recipes at the same time.

async function startGraphQLServer(programPath, forceStart) {
  // If this env variable is set, we're in dev mode & assume the recipes API was already started
  // manually.
  if (process.env.RECIPES_DEV_MODE) {
    return {
      port: 50400
    };
  }

  let {
    port
  } = (await gatsbyCoreUtils.getService(programPath, `recipesgraphqlserver`)) || {};

  if (!port || forceStart) {
    var _subprocess$stderr;

    // Use 50400 as our port as it's a highly composite number! Meaning it has
    // more divisors than any smaller positive integer.
    port = await detectPort__default['default'](50400);
    await gatsbyCoreUtils.createServiceLock(programPath, `recipesgraphqlserver`, {
      port
    });
    const subprocess = execa__default['default'](`node`, [require.resolve(`gatsby-recipes/dist/graphql-server/server.js`), port], {
      all: true,
      env: {
        // Chalk doesn't want to output color in a child process
        // as it (correctly) thinks it's not in a normal terminal environment.
        // Since we're just returning data, we'll override that.
        FORCE_COLOR: `true`
      }
    }); // eslint-disable-next-line no-unused-expressions

    (_subprocess$stderr = subprocess.stderr) === null || _subprocess$stderr === void 0 ? void 0 : _subprocess$stderr.on(`data`, data => {
      console.log(data.toString());
    });
    process.on(`exit`, () => {
      subprocess.kill(`SIGTERM`, {
        forceKillAfterTimeout: 2000
      });
    }); // Log server output to a file.

    if (process.env.DEBUG) {
      var _subprocess$stdout;

      const logFile = path__default['default'].resolve(`./recipe-server.log`);
      fs__default['default'].writeFileSync(logFile, `\n-----\n${new Date().toJSON()}\n`);
      const writeStream = fs__default['default'].createWriteStream(logFile, {
        flags: `a`
      }); // eslint-disable-next-line no-unused-expressions

      (_subprocess$stdout = subprocess.stdout) === null || _subprocess$stdout === void 0 ? void 0 : _subprocess$stdout.pipe(writeStream);
    }
  }

  return {
    port
  };
}

const recipesHandler = async data => cli(data);

exports.ContentfulEntry = entry.entry;
exports.ContentfulEnvironment = entry.environment;
exports.ContentfulSpace = entry.space;
exports.ContentfulType = entry.type;
exports.Directory = entry.directory;
exports.File = entry.file;
exports.GatsbyPage = entry.page;
exports.GatsbyPlugin = entry.plugin;
exports.GatsbyShadowFile = entry.shadowFile;
exports.GatsbySiteMetadata = entry.siteMetadata;
exports.GitIgnore = entry.ignore;
exports.NPMPackage = entry._package;
exports.NPMPackageJson = entry.packageJson;
exports.NPMScript = entry.script;
exports.recipesHandler = recipesHandler;
exports.startGraphQLServer = startGraphQLServer;
//# sourceMappingURL=index.js.map
