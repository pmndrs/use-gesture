import { toPlainObject, freezeSys } from 'contentful-sdk-core';
import copy from 'fast-copy';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createAppInstallationApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      environmentId: data.sys.environment.sys.id,
      appDefinitionId: data.sys.appDefinition.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: getParams(data),
        headers: {},
        payload: data
      }).then(function (data) {
        return wrapAppInstallation(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Installation data
 * @return Wrapped App installation data
 */


export function wrapAppInstallation(makeRequest, data) {
  var appInstallation = toPlainObject(copy(data));
  var appInstallationWithMethods = enhanceWithMethods(appInstallation, createAppInstallationApi(makeRequest));
  return freezeSys(appInstallationWithMethods);
}
/**
 * @private
 */

export var wrapAppInstallationCollection = wrapCollection(wrapAppInstallation);