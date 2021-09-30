function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/team_space_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.teamSpaceMembershipId);
};

export var get = function get(http, params) {
  return raw.get(http, getEntityUrl(params));
};
export var getMany = function getMany(http, params) {
  return raw.get(http, getBaseUrl(params), {
    params: params.query
  });
};
export var getForOrganization = function getForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/team_space_memberships/").concat(params.teamSpaceMembershipId));
};
export var getManyForOrganization = function getManyForOrganization(http, params) {
  var query = params.query || {};

  if (params.teamId) {
    query['sys.team.sys.id'] = params.teamId;
  }

  return raw.get(http, "/organizations/".concat(params.organizationId, "/team_space_memberships"), {
    params: params.query
  });
};
export var create = function create(http, params, rawData, headers) {
  return raw.post(http, getBaseUrl(params), rawData, {
    headers: _objectSpread({
      'x-contentful-team': params.teamId
    }, headers)
  });
};
export var update = function update(http, params, rawData, headers) {
  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0,
      'x-contentful-team': rawData.sys.team.sys.id
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, getEntityUrl(params));
};