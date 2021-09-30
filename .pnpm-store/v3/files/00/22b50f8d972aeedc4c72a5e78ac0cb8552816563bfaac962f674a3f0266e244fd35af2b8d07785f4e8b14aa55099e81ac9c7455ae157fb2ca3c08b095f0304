import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

function createAppBundleApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      organizationId: data.sys.organization.sys.id,
      appDefinitionId: data.sys.appDefinition.sys.id,
      appBundleId: data.sys.id
    };
  };

  return {
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle data
 * @return Wrapped App Bundle data
 */


export function wrapAppBundle(makeRequest, data) {
  var appBundle = toPlainObject(copy(data));
  var appBundleWithMethods = enhanceWithMethods(appBundle, createAppBundleApi(makeRequest));
  return freezeSys(appBundleWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @return Wrapped App Bundle collection data
 */

export var wrapAppBundleCollection = wrapCollection(wrapAppBundle);