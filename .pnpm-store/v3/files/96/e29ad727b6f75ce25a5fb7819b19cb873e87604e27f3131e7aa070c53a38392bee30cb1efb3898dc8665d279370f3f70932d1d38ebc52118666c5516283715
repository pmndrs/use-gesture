import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createOrganizationMembershipApi(makeRequest, organizationId) {
  var getParams = function getParams(data) {
    return {
      organizationMembershipId: data.sys.id,
      organizationId: organizationId
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapOrganizationMembership(makeRequest, data, organizationId);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */


export function wrapOrganizationMembership(makeRequest, data, organizationId) {
  var organizationMembership = toPlainObject(copy(data));
  var organizationMembershipWithMethods = enhanceWithMethods(organizationMembership, createOrganizationMembershipApi(makeRequest, organizationId));
  return freezeSys(organizationMembershipWithMethods);
}
/**
 * @private
 */

export var wrapOrganizationMembershipCollection = wrapCollection(wrapOrganizationMembership);