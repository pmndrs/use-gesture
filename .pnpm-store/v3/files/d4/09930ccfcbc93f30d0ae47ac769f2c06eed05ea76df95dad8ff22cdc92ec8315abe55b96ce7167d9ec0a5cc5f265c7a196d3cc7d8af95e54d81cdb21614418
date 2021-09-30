function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId));
};
export var getMany = function getMany(http, params) {
  return raw.get(http, "/spaces", {
    params: params.query
  });
};
export var create = function create(http, params, payload, headers) {
  return raw.post(http, "/spaces", payload, {
    headers: params.organizationId ? _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Organization': params.organizationId
    }) : headers
  });
};
export var update = function update(http, params, payload, headers) {
  var _payload$sys$version;

  var data = copy(payload);
  delete data.sys;
  return raw.put(http, "/spaces/".concat(params.spaceId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_payload$sys$version = payload.sys.version) !== null && _payload$sys$version !== void 0 ? _payload$sys$version : 0
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId));
};