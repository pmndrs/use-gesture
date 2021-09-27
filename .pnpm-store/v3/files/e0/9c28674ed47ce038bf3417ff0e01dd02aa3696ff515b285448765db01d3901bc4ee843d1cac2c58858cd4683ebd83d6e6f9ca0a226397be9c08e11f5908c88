import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

/**
 * @private
 */
function createTeamApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamId: data.sys.id,
      organizationId: data.sys.organization.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw team data
 * @return Wrapped team data
 */


export function wrapTeam(makeRequest, data) {
  var team = toPlainObject(copy(data));
  var teamWithMethods = enhanceWithMethods(team, createTeamApi(makeRequest));
  return freezeSys(teamWithMethods);
}
/**
 * @private
 */

export var wrapTeamCollection = wrapCollection(wrapTeam);