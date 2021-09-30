import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import createEnvironmentApi from '../create-environment-api';
import { wrapCollection } from '../common-utils';

/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Environment
 * @return
 */
export function wrapEnvironment(makeRequest, data) {
  // do not pollute generated typings
  var environment = toPlainObject(copy(data));
  var environmentApi = createEnvironmentApi(makeRequest);
  var enhancedEnvironment = enhanceWithMethods(environment, environmentApi);
  return freezeSys(enhancedEnvironment);
}
/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 */

export var wrapEnvironmentCollection = wrapCollection(wrapEnvironment);