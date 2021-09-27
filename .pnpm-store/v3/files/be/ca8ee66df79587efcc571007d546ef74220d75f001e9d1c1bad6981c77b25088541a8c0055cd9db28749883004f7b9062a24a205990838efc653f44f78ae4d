import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createTeamSpaceMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamSpaceMembershipId: data.sys.id,
      spaceId: data.sys.space.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
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
 * @return Wrapped team space membership data
 */


export function wrapTeamSpaceMembership(makeRequest, data) {
  var teamSpaceMembership = toPlainObject(copy(data));
  var teamSpaceMembershipWithMethods = enhanceWithMethods(teamSpaceMembership, createTeamSpaceMembershipApi(makeRequest));
  return freezeSys(teamSpaceMembershipWithMethods);
}
/**
 * @private
 */

export var wrapTeamSpaceMembershipCollection = wrapCollection(wrapTeamSpaceMembership);