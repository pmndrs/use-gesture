import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw  personal access token data
 * @return Wrapped personal access token
 */
export function wrapPersonalAccessToken(makeRequest, data) {
  var personalAccessToken = toPlainObject(copy(data));
  var personalAccessTokenWithMethods = enhanceWithMethods(personalAccessToken, {
    revoke: function revoke() {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'revoke',
        params: {
          tokenId: data.sys.id
        }
      }).then(function (data) {
        return wrapPersonalAccessToken(makeRequest, data);
      });
    }
  });
  return freezeSys(personalAccessTokenWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw personal access collection data
 * @return Wrapped personal access token collection data
 */

export var wrapPersonalAccessTokenCollection = wrapCollection(wrapPersonalAccessToken);