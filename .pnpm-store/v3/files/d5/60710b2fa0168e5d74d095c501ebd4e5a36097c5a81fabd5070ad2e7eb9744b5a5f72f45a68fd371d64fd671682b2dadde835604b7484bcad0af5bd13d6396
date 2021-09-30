import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import createOrganizationApi from '../create-organization-api';
import { wrapCollection } from '../common-utils';

/**
 * This method creates the API for the given organization with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with an organization id, so the base path for requests now has the
 * organization id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for an Organization
 * @return {Organization}
 */
export function wrapOrganization(makeRequest, data) {
  var org = toPlainObject(copy(data));
  var orgApi = createOrganizationApi(makeRequest);
  var enhancedOrganization = enhanceWithMethods(org, orgApi);
  return freezeSys(enhancedOrganization);
}
/**
 * This method normalizes each organization in a collection.
 * @private
 */

export var wrapOrganizationCollection = wrapCollection(wrapOrganization);