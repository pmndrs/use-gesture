import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

function createAppUploadApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      organizationId: data.sys.organization.sys.id,
      appUploadId: data.sys.id
    };
  };

  return {
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload data
 * @return Wrapped App Upload data
 */


export function wrapAppUpload(makeRequest, data) {
  var appUpload = toPlainObject(copy(data));
  var appUploadWithMethods = enhanceWithMethods(appUpload, createAppUploadApi(makeRequest));
  return freezeSys(appUploadWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload collection data
 * @return Wrapped App Upload collection data
 */

export var wrapAppUploadCollection = wrapCollection(wrapAppUpload);