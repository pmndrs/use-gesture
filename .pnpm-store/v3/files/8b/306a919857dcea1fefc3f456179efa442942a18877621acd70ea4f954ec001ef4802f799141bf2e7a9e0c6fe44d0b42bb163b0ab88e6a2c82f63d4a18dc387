import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createSpaceMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      spaceMembershipId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space membership data
 * @return Wrapped space membership data
 */


export function wrapSpaceMembership(makeRequest, data) {
  var spaceMembership = toPlainObject(copy(data));
  var spaceMembershipWithMethods = enhanceWithMethods(spaceMembership, createSpaceMembershipApi(makeRequest));
  return freezeSys(spaceMembershipWithMethods);
}
/**
 * @private
 */

export var wrapSpaceMembershipCollection = wrapCollection(wrapSpaceMembership);