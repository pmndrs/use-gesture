import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized usage
 */
export function wrapUsage(_makeRequest, data) {
  var usage = toPlainObject(copy(data));
  var usageWithMethods = enhanceWithMethods(usage, {});
  return freezeSys(usageWithMethods);
}
/**
 * @private
 */

export var wrapUsageCollection = wrapCollection(wrapUsage);