import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createExtensionApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      environmentId: data.sys.environment.sys.id,
      extensionId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw UI Extension data
 * @return Wrapped UI Extension data
 */


export function wrapExtension(makeRequest, data) {
  var extension = toPlainObject(copy(data));
  var extensionWithMethods = enhanceWithMethods(extension, createExtensionApi(makeRequest));
  return freezeSys(extensionWithMethods);
}
/**
 * @private
 */

export var wrapExtensionCollection = wrapCollection(wrapExtension);