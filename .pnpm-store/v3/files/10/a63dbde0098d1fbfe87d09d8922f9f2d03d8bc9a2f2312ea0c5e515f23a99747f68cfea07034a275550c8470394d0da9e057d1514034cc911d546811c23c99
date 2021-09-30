function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';
import { normalizeSelect } from './utils';
export var get = function get(http, params, rawData, headers) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), {
    params: normalizeSelect(params.query),
    headers: _objectSpread({}, headers)
  });
};
export var getMany = function getMany(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries"), {
    params: normalizeSelect(params.query)
  });
};
export var patch = function patch(http, params, data, headers) {
  return raw.patch(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version,
      'Content-Type': 'application/json-patch+json'
    }, headers)
  });
};
export var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId));
};
export var publish = function publish(http, params, rawData) {
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/published"), null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version
    }
  });
};
export var unpublish = function unpublish(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/published"));
};
export var archive = function archive(http, params) {
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/archived"));
};
export var unarchive = function unarchive(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/archived"));
};
export var create = function create(http, params, rawData) {
  var data = copy(rawData);
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries"), data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
export var createWithId = function createWithId(http, params, rawData) {
  var data = copy(rawData);
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
export var references = function references(http, params) {
  var spaceId = params.spaceId,
      environmentId = params.environmentId,
      entryId = params.entryId,
      _params$maxDepth = params.maxDepth,
      maxDepth = _params$maxDepth === void 0 ? 2 : _params$maxDepth;
  return raw.get(http, "/spaces/".concat(spaceId, "/environments/").concat(environmentId, "/entries/").concat(entryId, "/references?include=").concat(maxDepth));
};