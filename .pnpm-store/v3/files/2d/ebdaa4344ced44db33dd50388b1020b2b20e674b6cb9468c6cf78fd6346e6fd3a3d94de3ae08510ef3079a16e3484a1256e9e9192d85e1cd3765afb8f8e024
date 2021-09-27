function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/tasks");
};

var getTaskUrl = function getTaskUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.taskId);
};

export var get = function get(http, params) {
  return raw.get(http, getTaskUrl(params));
};
export var getAll = function getAll(http, params) {
  return raw.get(http, getBaseUrl(params));
};
export var create = function create(http, params, rawData) {
  var data = copy(rawData);
  return raw.post(http, getBaseUrl(params), data);
};
export var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, getTaskUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
export var del = function del(http, _ref) {
  var version = _ref.version,
      params = _objectWithoutProperties(_ref, ["version"]);

  return raw.del(http, getTaskUrl(params), {
    headers: {
      'X-Contentful-Version': version
    }
  });
};