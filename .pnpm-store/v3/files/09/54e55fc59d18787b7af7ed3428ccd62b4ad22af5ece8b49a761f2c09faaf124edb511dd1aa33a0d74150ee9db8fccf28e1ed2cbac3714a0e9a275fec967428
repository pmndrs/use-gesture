function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';

function spaceMembershipDeprecationWarning() {
  console.warn('The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)');
}

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/space_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.spaceMembershipId);
};

export var get = function get(http, params) {
  spaceMembershipDeprecationWarning();
  return raw.get(http, getEntityUrl(params));
};
export var getMany = function getMany(http, params) {
  spaceMembershipDeprecationWarning();
  return raw.get(http, getBaseUrl(params), {
    params: params.query
  });
};
export var getForOrganization = function getForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/space_memberships/").concat(params.spaceMembershipId));
};
export var getManyForOrganization = function getManyForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/space_memberships"), {
    params: params.query
  });
};
export var create = function create(http, params, data, headers) {
  spaceMembershipDeprecationWarning();
  return raw.post(http, getBaseUrl(params), data, {
    headers: headers
  });
};
export var createWithId = function createWithId(http, params, data, headers) {
  spaceMembershipDeprecationWarning();
  return raw.put(http, getEntityUrl(params), data, {
    headers: headers
  });
};
export var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, getEntityUrl(params), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
export var del = function del(http, params) {
  return raw.del(http, getEntityUrl(params));
};