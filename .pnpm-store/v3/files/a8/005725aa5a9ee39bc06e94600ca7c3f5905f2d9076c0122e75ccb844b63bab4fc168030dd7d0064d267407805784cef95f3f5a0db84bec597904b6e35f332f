/// <reference types="ws" />
/// <reference lib="dom" />
import { IntrospectionOptions } from 'graphql';
import { AsyncExecutor, Subscriber, SyncExecutor, SchemaPointerSingle, Source, DocumentLoader, SingleFileOptions, ExecutionParams } from '@graphql-tools/utils';
import { SubschemaConfig } from '@graphql-tools/delegate';
import { ClientOptions } from 'graphql-ws';
import WebSocket from 'isomorphic-ws';
import FormData from 'form-data';
import { FetchEventSourceInit } from '@microsoft/fetch-event-source';
import { ConnectionParamsOptions } from 'subscriptions-transport-ws';
export declare type AsyncFetchFn = typeof import('cross-fetch').fetch;
export declare type SyncFetchFn = (input: RequestInfo, init?: RequestInit) => SyncResponse;
export declare type SyncResponse = Omit<Response, 'json' | 'text'> & {
    json: () => any;
    text: () => string;
};
export declare type FetchFn = AsyncFetchFn | SyncFetchFn;
declare type Headers = Record<string, string> | Array<Record<string, string>> | ((executionParams: ExecutionParams) => Array<Record<string, string>> | Record<string, string>);
declare type BuildExecutorOptions<TFetchFn = FetchFn> = {
    pointer: string;
    fetch: TFetchFn;
    extraHeaders: Headers;
    defaultMethod: 'GET' | 'POST';
    useGETForQueries: boolean;
    multipart?: boolean;
};
export declare type AsyncImportFn<T = unknown> = (moduleName: string) => PromiseLike<T>;
export declare type SyncImportFn<T = unknown> = (moduleName: string) => T;
/**
 * Additional options for loading from a URL
 */
export interface LoadFromUrlOptions extends SingleFileOptions, Partial<IntrospectionOptions> {
    /**
     * Additional headers to include when querying the original schema
     */
    headers?: Headers;
    /**
     * A custom `fetch` implementation to use when querying the original schema.
     * Defaults to `cross-fetch`
     */
    customFetch?: FetchFn | string;
    /**
     * HTTP method to use when querying the original schema.
     */
    method?: 'GET' | 'POST';
    /**
     * Custom WebSocket implementation used by the loaded schema if subscriptions
     * are enabled
     */
    webSocketImpl?: typeof WebSocket | string;
    /**
     * Whether to use the GET HTTP method for queries when querying the original schema
     */
    useGETForQueries?: boolean;
    /**
     * Use multipart for POST requests
     */
    multipart?: boolean;
    /**
     * Use SSE for subscription instead of WebSocket
     */
    useSSEForSubscription?: boolean;
    /**
     * Use legacy web socket protocol `graphql-ws` instead of the more current standard `graphql-transport-ws`
     */
    useWebSocketLegacyProtocol?: boolean;
    /**
     * Additional options to pass to the constructor of the underlying EventSource instance.
     */
    eventSourceOptions?: FetchEventSourceInit;
    /**
     * Handle URL as schema SDL
     */
    handleAsSDL?: boolean;
    /**
     * Subscriptions endpoint; defaults to the endpoint given as pointer
     */
    subscriptionsEndpoint?: string;
}
/**
 * This loader loads a schema from a URL. The loaded schema is a fully-executable,
 * remote schema since it's created using [@graphql-tools/wrap](/docs/remote-schemas).
 *
 * ```
 * const schema = await loadSchema('http://localhost:3000/graphql', {
 *   loaders: [
 *     new UrlLoader(),
 *   ]
 * });
 * ```
 */
export declare class UrlLoader implements DocumentLoader<LoadFromUrlOptions> {
    loaderId(): string;
    canLoad(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<boolean>;
    canLoadSync(pointer: SchemaPointerSingle, _options: LoadFromUrlOptions): boolean;
    createFormDataFromVariables<TVariables>({ query, variables }: {
        query: string;
        variables: TVariables;
    }): Promise<FormData>;
    prepareGETUrl({ baseUrl, query, variables, operationName, }: {
        baseUrl: string;
        query: string;
        variables: any;
        operationName?: string;
    }): string;
    buildExecutor(options: BuildExecutorOptions<SyncFetchFn>): SyncExecutor;
    buildExecutor(options: BuildExecutorOptions<AsyncFetchFn>): AsyncExecutor;
    buildWSSubscriber(subscriptionsEndpoint: string, webSocketImpl: typeof WebSocket, connectionParams?: ClientOptions['connectionParams']): Subscriber;
    buildWSLegacySubscriber(subscriptionsEndpoint: string, webSocketImpl: typeof WebSocket, connectionParams?: ConnectionParamsOptions): Subscriber;
    buildSSESubscriber(pointer: string, extraHeaders: Headers, fetch: AsyncFetchFn, options: FetchEventSourceInit): Subscriber;
    getFetch(customFetch: LoadFromUrlOptions['customFetch'], importFn: AsyncImportFn, async: true): PromiseLike<AsyncFetchFn>;
    getFetch(customFetch: LoadFromUrlOptions['customFetch'], importFn: SyncImportFn, async: false): SyncFetchFn;
    private getHeadersFromOptions;
    private getDefaultMethodFromOptions;
    getWebSocketImpl(options: LoadFromUrlOptions, importFn: AsyncImportFn): PromiseLike<typeof WebSocket>;
    getWebSocketImpl(options: LoadFromUrlOptions, importFn: SyncImportFn): typeof WebSocket;
    getExecutorAndSubscriberAsync(pointer: SchemaPointerSingle, options?: LoadFromUrlOptions): Promise<{
        executor: AsyncExecutor;
        subscriber: Subscriber;
    }>;
    getExecutorAndSubscriberSync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): {
        executor: SyncExecutor;
        subscriber: Subscriber;
    };
    getSubschemaConfigAsync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<SubschemaConfig>;
    getSubschemaConfigSync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): SubschemaConfig;
    handleSDLAsync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<Source>;
    handleSDLSync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Source;
    load(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Promise<Source>;
    loadSync(pointer: SchemaPointerSingle, options: LoadFromUrlOptions): Source;
}
export {};
