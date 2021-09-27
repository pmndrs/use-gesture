function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import copy from 'fast-copy';
import * as raw from './raw';
import { normalizeSelect } from './utils';

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/extensions");
};

export var getExtensionUrl = function getExtensionUrl(params) {
  return getBaseUrl(params) + "/".concat(params.extensionId);
};
export var get = function get(http, params) {
  return raw.get(http, getExtensionUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var getMany = function getMany(http, params) {
  return raw.get(http, getBaseUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var create = function create(http, params, rawData, headers) {
  return raw.post(http, getBaseUrl(params), rawData, {
    headers: headers
  });
};
export var createWithId = function createWithId(http, params, rawData, headers) {
  var data = copy(rawData);
  return raw.put(http, getExtensionUrl(params), data, {
    headers: headers
  });
};
export var update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(http, params, rawData, headers) {
    var _rawData$sys$version;

    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = copy(rawData);
            delete data.sys;
            return _context.abrupt("return", raw.put(http, getExtensionUrl(params), data, {
              headers: _objectSpread({
                'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
              }, headers)
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function update(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
export var del = function del(http, params) {
  return raw.del(http, getExtensionUrl(params));
};