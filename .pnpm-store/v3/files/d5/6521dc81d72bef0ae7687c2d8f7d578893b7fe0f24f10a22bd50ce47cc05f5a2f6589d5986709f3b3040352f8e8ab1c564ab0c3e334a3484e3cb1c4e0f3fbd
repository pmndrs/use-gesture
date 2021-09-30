function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import copy from 'fast-copy';
import * as raw from './raw';
import { normalizeSelect } from './utils';

var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/teams/").concat(params.teamId, "/team_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "/organizations/".concat(params.organizationId, "/teams/").concat(params.teamId, "/team_memberships/").concat(params.teamMembershipId);
};

export var get = function get(http, params) {
  return raw.get(http, getEntityUrl(params));
};
export var getManyForOrganization = function getManyForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/team_memberships"), {
    params: normalizeSelect(params.query)
  });
};
export var getManyForTeam = function getManyForTeam(http, params) {
  return raw.get(http, getBaseUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var create = function create(http, params, rawData, headers) {
  return raw.post(http, getBaseUrl(params), rawData, {
    headers: headers
  });
};
export var update = function update(http, params, rawData, headers) {
  var data = copy(rawData);
  delete data.sys;
  return raw.put(http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0
    }, headers)
  });
};
export var del = function del(http, params) {
  return raw.del(http, getEntityUrl(params));
};