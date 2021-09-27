import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized user
 */
export function wrapUser(_makeRequest, data) {
  var user = toPlainObject(copy(data));
  var userWithMethods = enhanceWithMethods(user, {});
  return freezeSys(userWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data collection
 * @return Normalized user collection
 */

export var wrapUserCollection = wrapCollection(wrapUser);