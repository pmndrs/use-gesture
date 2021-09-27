import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space member data
 * @return Wrapped space member data
 */
export function wrapSpaceMember(_makeRequest, data) {
  var spaceMember = toPlainObject(copy(data));
  return freezeSys(spaceMember);
}
/**
 * @private
 */

export var wrapSpaceMemberCollection = wrapCollection(wrapSpaceMember);