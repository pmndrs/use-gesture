import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export function wrapOrganizationInvitation(_makeRequest, data) {
  var invitation = toPlainObject(copy(data));
  return freezeSys(invitation);
}