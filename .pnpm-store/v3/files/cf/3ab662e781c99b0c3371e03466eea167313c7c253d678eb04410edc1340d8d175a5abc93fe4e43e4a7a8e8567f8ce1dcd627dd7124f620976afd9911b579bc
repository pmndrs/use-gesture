import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createRoleApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      roleId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw role data
 * @return Wrapped role data
 */


export function wrapRole(makeRequest, data) {
  var role = toPlainObject(copy(data));
  var roleWithMethods = enhanceWithMethods(role, createRoleApi(makeRequest));
  return freezeSys(roleWithMethods);
}
/**
 * @private
 */

export var wrapRoleCollection = wrapCollection(wrapRole);