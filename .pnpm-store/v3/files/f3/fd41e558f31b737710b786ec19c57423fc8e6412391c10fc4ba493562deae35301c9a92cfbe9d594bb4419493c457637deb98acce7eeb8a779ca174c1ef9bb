import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';

function createSnapshotApi() {
  return {
    /* In case the snapshot object evolve later */
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot data
 * @return Wrapped snapshot data
 */


export function wrapSnapshot(_makeRequest, data) {
  var snapshot = toPlainObject(copy(data));
  var snapshotWithMethods = enhanceWithMethods(snapshot, createSnapshotApi());
  return freezeSys(snapshotWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */

export var wrapSnapshotCollection = wrapCollection(wrapSnapshot);