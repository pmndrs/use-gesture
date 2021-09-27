import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import createSpaceApi from '../create-space-api';
import enhanceWithMethods from '../enhance-with-methods';

/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Space
 * @return {Space}
 */
export function wrapSpace(makeRequest, data) {
  var space = toPlainObject(copy(data));
  var spaceApi = createSpaceApi(makeRequest);
  var enhancedSpace = enhanceWithMethods(space, spaceApi);
  return freezeSys(enhancedSpace);
}
/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 */

export var wrapSpaceCollection = wrapCollection(wrapSpace);