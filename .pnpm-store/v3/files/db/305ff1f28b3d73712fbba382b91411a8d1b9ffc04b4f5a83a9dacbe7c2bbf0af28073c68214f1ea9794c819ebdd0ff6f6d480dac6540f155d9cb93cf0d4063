import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createTeamMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamMembershipId: data.sys.id,
      teamId: data.sys.team.sys.id,
      organizationId: data.sys.organization.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw team membership data
 * @return Wrapped team membership data
 */


export function wrapTeamMembership(makeRequest, data) {
  var teamMembership = toPlainObject(copy(data));
  var teamMembershipWithMethods = enhanceWithMethods(teamMembership, createTeamMembershipApi(makeRequest));
  return freezeSys(teamMembershipWithMethods);
}
/**
 * @private
 */

export var wrapTeamMembershipCollection = wrapCollection(wrapTeamMembership);