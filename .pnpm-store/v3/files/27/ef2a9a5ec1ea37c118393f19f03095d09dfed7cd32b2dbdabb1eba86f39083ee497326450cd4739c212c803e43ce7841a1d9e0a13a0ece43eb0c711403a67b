/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */
import type { RestAdapterParams } from './adapters/REST/rest-adapter';
import { AdapterParams } from './create-adapter';
import { ClientAPI } from './create-contentful-api';
import type { PlainClientAPI } from './plain/common-types';
import type { DefaultParams } from './plain/plain-client';
import * as editorInterfaceDefaults from './constants/editor-interface-defaults';
export type { ClientAPI } from './create-contentful-api';
export { asIterator } from './plain/as-iterator';
export { isDraft, isPublished, isUpdated } from './plain/checks';
export type { PlainClientAPI } from './plain/common-types';
export { createClient };
export { RestAdapter } from './adapters/REST/rest-adapter';
export { editorInterfaceDefaults };
export declare type PlainClientDefaultParams = DefaultParams;
interface UserAgentParams {
    /**
     * Application name and version e.g myApp/version
     */
    application?: string;
    /**
     * Integration name and version e.g react/version
     */
    integration?: string;
    feature?: string;
}
/**
 * @deprecated
 */
export declare type ClientParams = RestAdapterParams & UserAgentParams;
declare type ClientOptions = (RestAdapterParams | AdapterParams) & UserAgentParams;
/**
 * Create a client instance
 * @param params - Client initialization parameters
 *
 * ```javascript
 * const client = contentfulManagement.createClient({
 *  accessToken: 'myAccessToken'
 * })
 * ```
 */
declare function createClient(params: ClientOptions): ClientAPI;
declare function createClient(params: ClientOptions, opts: {
    type: 'plain';
    defaults?: DefaultParams;
}): PlainClientAPI;
