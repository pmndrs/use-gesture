import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

function createApiKeyApi(makeRequest) {
  var getParams = function getParams(data) {
    var _data$sys$space$sys$i, _data$sys$space;

    return {
      spaceId: (_data$sys$space$sys$i = (_data$sys$space = data.sys.space) === null || _data$sys$space === void 0 ? void 0 : _data$sys$space.sys.id) !== null && _data$sys$space$sys$i !== void 0 ? _data$sys$space$sys$i : '',
      apiKeyId: data.sys.id
    };
  };

  return {
    update: function update() {
      var self = this;
      return makeRequest({
        entityType: 'ApiKey',
        action: 'update',
        params: getParams(self),
        payload: self,
        headers: {}
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },
    "delete": function del() {
      var self = this;
      return makeRequest({
        entityType: 'ApiKey',
        action: 'delete',
        params: getParams(self)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 */


export function wrapApiKey(makeRequest, data) {
  var apiKey = toPlainObject(copy(data));
  var apiKeyWithMethods = enhanceWithMethods(apiKey, createApiKeyApi(makeRequest));
  return freezeSys(apiKeyWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */

export var wrapApiKeyCollection = wrapCollection(wrapApiKey);