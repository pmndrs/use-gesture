import * as raw from './raw';
import { getUploadHttpClient } from '../../../upload-http-client';

var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/app_uploads");
};

var getAppUploadUrl = function getAppUploadUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.appUploadId);
};

export var get = function get(http, params) {
  var httpUpload = getUploadHttpClient(http);
  return raw.get(httpUpload, getAppUploadUrl(params));
};
export var del = function del(http, params) {
  var httpUpload = getUploadHttpClient(http);
  return raw.del(httpUpload, getAppUploadUrl(params));
};
export var create = function create(http, params, payload) {
  var httpUpload = getUploadHttpClient(http);
  var file = payload.file;
  return raw.post(httpUpload, getBaseUrl(params), file, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};