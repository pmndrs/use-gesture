import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import createEntryApi from '../create-entry-api';
import enhanceWithMethods from '../enhance-with-methods';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
export function wrapEntry(makeRequest, data) {
  var entry = toPlainObject(copy(data));
  var entryWithMethods = enhanceWithMethods(entry, createEntryApi(makeRequest));
  return freezeSys(entryWithMethods);
}
/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */

export var wrapEntryCollection = wrapCollection(wrapEntry);