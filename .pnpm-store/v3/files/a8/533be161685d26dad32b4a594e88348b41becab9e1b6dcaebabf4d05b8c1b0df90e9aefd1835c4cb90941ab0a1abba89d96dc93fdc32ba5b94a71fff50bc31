function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId));
};
export var query = function query(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases"), {
    params: params.query
  });
};
export var create = function create(http, params, payload) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases"), payload);
};
export var update = function update(http, params, payload, headers) {
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId), payload, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId));
};
export var publish = function publish(http, params, headers) {
  return raw.put(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/published"), null, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
export var unpublish = function unpublish(http, params, headers) {
  return raw.del(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/published"), {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
export var validate = function validate(http, params, payload) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/validate"), payload);
};