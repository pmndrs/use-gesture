function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as raw from './raw';
import { normalizeSelect } from './utils';
import copy from 'fast-copy';

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/app_installations");
};

export var getAppInstallationUrl = function getAppInstallationUrl(params) {
  return getBaseUrl(params) + "/".concat(params.appDefinitionId);
};
export var get = function get(http, params) {
  return raw.get(http, getAppInstallationUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var getMany = function getMany(http, params) {
  return raw.get(http, getBaseUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var upsert = function upsert(http, params, rawData, headers) {
  var data = copy(rawData);
  return raw.put(http, getAppInstallationUrl(params), data, _objectSpread({}, headers));
};
export var del = function del(http, params) {
  return raw.del(http, getAppInstallationUrl(params));
};