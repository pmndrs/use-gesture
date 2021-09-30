/* eslint-disable @typescript-eslint/no-explicit-any */
import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/actions/").concat(params.bulkActionId));
};
export var publish = function publish(http, params, payload) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/publish"), payload);
};
export var unpublish = function unpublish(http, params, payload) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/unpublish"), payload);
};
export var validate = function validate(http, params, payload) {
  return raw.post(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/validate"), payload);
};