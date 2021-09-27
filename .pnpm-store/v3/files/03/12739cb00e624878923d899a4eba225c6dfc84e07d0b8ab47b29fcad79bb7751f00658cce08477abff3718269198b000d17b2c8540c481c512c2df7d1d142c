import * as raw from './raw';
export var getForSpace = function getForSpace(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/users/").concat(params.userId));
};
export var getCurrent = function getCurrent(http, params) {
  return raw.get(http, "/users/me", {
    params: params === null || params === void 0 ? void 0 : params.query
  });
};
export var getManyForSpace = function getManyForSpace(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/users"), {
    params: params.query
  });
};
export var getForOrganization = function getForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/users/").concat(params.userId));
};
export var getManyForOrganization = function getManyForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/users"), {
    params: params.query
  });
};