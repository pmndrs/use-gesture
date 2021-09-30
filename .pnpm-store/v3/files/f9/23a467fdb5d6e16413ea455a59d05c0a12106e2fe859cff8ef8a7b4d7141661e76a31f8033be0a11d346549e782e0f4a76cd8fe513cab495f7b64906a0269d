import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';

function createPreviewApiKeyApi() {
  return {};
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 * @return Wrapped preview api key data
 */


export function wrapPreviewApiKey(_makeRequest, data) {
  var previewApiKey = toPlainObject(copy(data));
  var previewApiKeyWithMethods = enhanceWithMethods(previewApiKey, createPreviewApiKeyApi());
  return freezeSys(previewApiKeyWithMethods);
}
/**
 * @private
 */

export var wrapPreviewApiKeyCollection = wrapCollection(wrapPreviewApiKey);