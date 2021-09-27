import * as raw from './raw';
import { normalizeSelect } from './utils';

var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/app_definitions/").concat(params.appDefinitionId, "/app_bundles");
};

var getAppBundleUrl = function getAppBundleUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.appBundleId);
};

export var get = function get(http, params) {
  return raw.get(http, getAppBundleUrl(params));
};
export var getMany = function getMany(http, params) {
  return raw.get(http, getBaseUrl(params), {
    params: normalizeSelect(params.query)
  });
};
export var del = function del(http, params) {
  return raw.del(http, getAppBundleUrl(params));
};
export var create = function create(http, params, payload) {
  var appUploadId = payload.appUploadId,
      comment = payload.comment;
  var data = {
    upload: {
      sys: {
        type: 'Link',
        linkType: 'AppUpload',
        id: appUploadId
      }
    },
    comment: comment
  };
  return raw.post(http, getBaseUrl(params), data);
};