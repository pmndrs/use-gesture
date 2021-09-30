/* eslint-disable @typescript-eslint/no-explicit-any */
import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/actions/").concat(params.actionId));
};
export var queryForRelease = function queryForRelease(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/actions"), {
    params: params.query
  });
};