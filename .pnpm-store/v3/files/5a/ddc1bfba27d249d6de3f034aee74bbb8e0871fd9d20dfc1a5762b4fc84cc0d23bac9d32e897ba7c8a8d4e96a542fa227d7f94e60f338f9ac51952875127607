function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import errorHandler from '../../../error-handler';

function getBaseUrl(http) {
  var _http$defaults$baseUR;

  return (_http$defaults$baseUR = http.defaults.baseURL) === null || _http$defaults$baseUR === void 0 ? void 0 : _http$defaults$baseUR.split('/spaces')[0];
}

export function get(http, url, config) {
  return http.get(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}
export function patch(http, url, payload, config) {
  return http.patch(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}
export function post(http, url, payload, config) {
  return http.post(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}
export function put(http, url, payload, config) {
  return http.put(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}
export function del(http, url, config) {
  return http["delete"](url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}
export function http(http, url, config) {
  return http(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, errorHandler);
}