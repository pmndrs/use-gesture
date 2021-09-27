import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapCollection } from '../common-utils';
import createAppDefinitionApi from '../create-app-definition-api';

/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
 */
export function wrapAppDefinition(makeRequest, data) {
  var appDefinition = toPlainObject(copy(data));
  var appDefinitionWithMethods = enhanceWithMethods(appDefinition, createAppDefinitionApi(makeRequest));
  return freezeSys(appDefinitionWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */

export var wrapAppDefinitionCollection = wrapCollection(wrapAppDefinition);