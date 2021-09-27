function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as raw from './raw';
var OrganizationUserManagementAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'organization-user-management-api'
};
var InvitationAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'pending-org-membership'
};
export var create = function create(http, params, data, headers) {
  return raw.post(http, "/organizations/".concat(params.organizationId, "/invitations"), data, {
    headers: _objectSpread(_objectSpread({}, InvitationAlphaHeaders), headers)
  });
};
export var get = function get(http, params, headers) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/invitations/").concat(params.invitationId), {
    headers: _objectSpread(_objectSpread({}, OrganizationUserManagementAlphaHeaders), headers)
  });
};