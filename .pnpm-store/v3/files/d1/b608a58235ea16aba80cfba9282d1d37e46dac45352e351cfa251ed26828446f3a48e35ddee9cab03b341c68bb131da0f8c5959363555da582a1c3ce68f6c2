import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/preview_api_keys/").concat(params.previewApiKeyId));
};
export var getMany = function getMany(http, params) {
  return raw.get(http, "/spaces/".concat(params.spaceId, "/preview_api_keys"), {
    params: params.query
  });
};