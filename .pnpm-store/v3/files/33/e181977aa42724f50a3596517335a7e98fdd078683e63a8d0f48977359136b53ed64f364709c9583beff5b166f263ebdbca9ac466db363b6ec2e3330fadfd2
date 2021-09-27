import copy from 'fast-copy';
import { toPlainObject } from 'contentful-sdk-core';

/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset key data
 * @return Wrapped asset key data
 */
export function wrapAssetKey(_makeRequest, data) {
  var assetKey = toPlainObject(copy(data));
  return assetKey;
}