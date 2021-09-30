import { getUploadHttpClient } from '../../../upload-http-client';
import * as raw from './raw';
export var create = function create(http, params, data) {
  var httpUpload = getUploadHttpClient(http);
  var file = data.file;

  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'));
  }

  return raw.post(httpUpload, "/spaces/".concat(params.spaceId, "/uploads"), file, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};
export var del = function del(http, params) {
  var httpUpload = getUploadHttpClient(http);
  return raw.del(httpUpload, "/spaces/".concat(params.spaceId, "/uploads/").concat(params.uploadId));
};
export var get = function get(http, params) {
  var httpUpload = getUploadHttpClient(http);
  return raw.get(httpUpload, "/spaces/".concat(params.spaceId, "/uploads/").concat(params.uploadId));
};