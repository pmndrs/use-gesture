function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';
import { normalizeSelect } from './utils';

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/content_types");
};

var getContentTypeUrl = function getContentTypeUrl(params) {
  return getBaseUrl(params) + "/".concat(params.contentTypeId);
};

export var get = function get(http, params, headers) {
  return raw.get(http, getContentTypeUrl(params), {
    params: normalizeSelect(params.query),
    headers: headers
  });
};
export var getMany = function getMany(http, params, headers) {
  return raw.get(http, getBaseUrl(params), {
    params: params.query,
    headers: headers
  });
};
export var create = function create(http, params, rawData, headers) {
  var data = copy(rawData);
  return raw.post(http, getBaseUrl(params), data, {
    headers: headers
  });
};
export var createWithId = function createWithId(http, params, rawData, headers) {
  var data = copy(rawData);
  return raw.put(http, getContentTypeUrl(params), data, {
    headers: headers
  });
};
export var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, getContentTypeUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
export var del = function del(http, params, headers) {
  return raw.del(http, getContentTypeUrl(params), {
    headers: headers
  });
};
export var publish = function publish(http, params, rawData, headers) {
  return raw.put(http, getContentTypeUrl(params) + '/published', null, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version
    }, headers)
  });
};
export var unpublish = function unpublish(http, params, headers) {
  return raw.del(http, getContentTypeUrl(params) + '/published', {
    headers: headers
  });
};