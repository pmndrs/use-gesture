import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createEnvironmentAliasApi(makeRequest) {
  var getParams = function getParams(alias) {
    return {
      spaceId: alias.sys.space.sys.id,
      environmentAliasId: alias.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapEnvironmentAlias(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'delete',
        params: getParams(raw)
      }).then(function () {// noop
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw environment alias data
 * @return Wrapped environment alias data
 */


export function wrapEnvironmentAlias(makeRequest, data) {
  var alias = toPlainObject(copy(data));
  var enhancedAlias = enhanceWithMethods(alias, createEnvironmentAliasApi(makeRequest));
  return freezeSys(enhancedAlias);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw environment alias collection data
 * @return Wrapped environment alias collection data
 */

export var wrapEnvironmentAliasCollection = wrapCollection(wrapEnvironmentAlias);