import { CreateHttpClientParams } from 'contentful-sdk-core';
import { Adapter, MakeRequestOptions } from '../../common-types';
export declare type RestAdapterParams = CreateHttpClientParams & {
    /**
     * Contentful CMA Access Token
     */
    accessToken: CreateHttpClientParams['accessToken'];
    /**
     * API host
     * @default api.contentful.com
     */
    host?: string;
    /**
     * direct file upload host
     * @default upload.contentful.com
     */
    hostUpload?: string;
};
export declare const defaultHostParameters: {
    defaultHostname: string;
    defaultHostnameUpload: string;
};
export declare class RestAdapter implements Adapter {
    private readonly params;
    constructor(params: RestAdapterParams);
    makeRequest<R>({ entityType, action: actionInput, params, payload, headers, userAgent, }: MakeRequestOptions): Promise<R>;
}
