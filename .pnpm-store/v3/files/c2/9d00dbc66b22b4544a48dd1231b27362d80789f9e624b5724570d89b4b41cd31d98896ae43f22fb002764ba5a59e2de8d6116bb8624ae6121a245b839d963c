/**
 * @packageDocumentation
 * @hidden
 */
import { RestAdapter } from './adapters/REST/rest-adapter';

/**
 * @private
 */
export function createAdapter(params) {
  if ('apiAdapter' in params) {
    return params.apiAdapter;
  } else {
    return new RestAdapter(params);
  }
}