import * as raw from './raw';
export var getManyForSpace = function getManyForSpace(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/space_periodic_usages"), {
    params: params.query
  });
};
export var getManyForOrganization = function getManyForOrganization(http, params) {
  return raw.get(http, "/organizations/".concat(params.organizationId, "/organization_periodic_usages"), {
    params: params.query
  });
};