import * as raw from './raw';
export var get = function get(http, params) {
  return raw.get(http, "/users/me/access_tokens/".concat(params.tokenId));
};
export var getMany = function getMany(http, params) {
  return raw.get(http, '/users/me/access_tokens', {
    params: params.query
  });
};
export var create = function create(http, _params, rawData, headers) {
  return raw.post(http, '/users/me/access_tokens', rawData, {
    headers: headers
  });
};
export var revoke = function revoke(http, params) {
  return raw.put(http, "/users/me/access_tokens/".concat(params.tokenId, "/revoked"), null);
};