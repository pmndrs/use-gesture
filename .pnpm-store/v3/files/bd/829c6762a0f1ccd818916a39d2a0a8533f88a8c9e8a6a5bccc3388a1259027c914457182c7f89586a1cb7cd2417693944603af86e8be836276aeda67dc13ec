import { print, parse, buildASTSchema, Kind } from 'graphql';
import { isAsyncIterable, observableToAsyncIterable, withCancel, mapAsyncIterator } from '@graphql-tools/utils';
import { isWebUri } from 'valid-url';
import { fetch as fetch$1 } from 'cross-fetch';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { createClient } from 'graphql-ws';
import WebSocket from 'isomorphic-ws';
import syncFetch from 'sync-fetch';
import isPromise from 'is-promise';
import { extractFiles, isExtractableFile } from 'extract-files';
import FormData from 'form-data';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import AbortController from 'abort-controller';
import { meros } from 'meros';
import { merge, set } from 'lodash';

/* eslint-disable no-case-declarations */
const asyncImport = (moduleName) => import(moduleName);
const syncImport = (moduleName) => require(moduleName);
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
class UrlLoader {
    loaderId() {
        return 'url';
    }
    async canLoad(pointer, options) {
        return this.canLoadSync(pointer, options);
    }
    canLoadSync(pointer, _options) {
        return !!isWebUri(pointer);
    }
    async createFormDataFromVariables({ query, variables }) {
        const vars = Object.assign({}, variables);
        const { clone, files } = extractFiles(vars, 'variables', ((v) => isExtractableFile(v) || (v === null || v === void 0 ? void 0 : v.promise) || isAsyncIterable(v) || isPromise(v)));
        const map = Array.from(files.values()).reduce((prev, curr, currIndex) => {
            prev[currIndex] = curr;
            return prev;
        }, {});
        const uploads = new Map(Array.from(files.keys()).map((u, i) => [i, u]));
        const form = new FormData();
        form.append('operations', JSON.stringify({
            query,
            variables: clone,
        }));
        form.append('map', JSON.stringify(map));
        await Promise.all(Array.from(uploads.entries()).map(async ([i, u]) => {
            if (isPromise(u)) {
                u = await u;
            }
            if (u === null || u === void 0 ? void 0 : u.promise) {
                const upload = await u.promise;
                const stream = upload.createReadStream();
                form.append(i.toString(), stream, {
                    filename: upload.filename,
                    contentType: upload.mimetype,
                });
            }
            else {
                form.append(i.toString(), u, {
                    filename: 'name' in u ? u['name'] : i,
                    contentType: u.type,
                });
            }
        }));
        return form;
    }
    prepareGETUrl({ baseUrl, query, variables, operationName, }) {
        const HTTP_URL = switchProtocols(baseUrl, {
            wss: 'https',
            ws: 'http',
        });
        const dummyHostname = 'https://dummyhostname.com';
        const validUrl = HTTP_URL.startsWith('http')
            ? HTTP_URL
            : HTTP_URL.startsWith('/')
                ? `${dummyHostname}${HTTP_URL}`
                : `${dummyHostname}/${HTTP_URL}`;
        const urlObj = new URL(validUrl);
        urlObj.searchParams.set('query', query);
        if (variables && Object.keys(variables).length > 0) {
            urlObj.searchParams.set('variables', JSON.stringify(variables));
        }
        if (operationName) {
            urlObj.searchParams.set('operationName', operationName);
        }
        const finalUrl = urlObj.toString().replace(dummyHostname, '');
        return finalUrl;
    }
    buildExecutor({ pointer, fetch, extraHeaders, defaultMethod, useGETForQueries, multipart, }) {
        const HTTP_URL = switchProtocols(pointer, {
            wss: 'https',
            ws: 'http',
        });
        const executor = ({ document, variables, ...rest }) => {
            const controller = new AbortController();
            let method = defaultMethod;
            if (useGETForQueries) {
                method = 'GET';
                for (const definition of document.definitions) {
                    if (definition.kind === Kind.OPERATION_DEFINITION) {
                        if (definition.operation !== 'query') {
                            method = defaultMethod;
                        }
                    }
                }
            }
            const headers = this.getHeadersFromOptions(extraHeaders, {
                document,
                variables,
                ...rest,
            });
            let fetchResult;
            const query = print(document);
            switch (method) {
                case 'GET':
                    const finalUrl = this.prepareGETUrl({ baseUrl: pointer, query, variables });
                    fetchResult = fetch(finalUrl, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            accept: 'application/json',
                            ...headers,
                        },
                    });
                    break;
                case 'POST':
                    if (multipart) {
                        fetchResult = this.createFormDataFromVariables({ query, variables }).then(form => fetch(HTTP_URL, {
                            method: 'POST',
                            credentials: 'include',
                            body: form,
                            headers: {
                                accept: 'application/json',
                                ...headers,
                            },
                            signal: controller.signal,
                        }));
                    }
                    else {
                        fetchResult = fetch(HTTP_URL, {
                            method: 'POST',
                            credentials: 'include',
                            body: JSON.stringify({
                                query,
                                variables,
                            }),
                            headers: {
                                accept: 'application/json, multipart/mixed',
                                'content-type': 'application/json',
                                ...headers,
                            },
                            signal: controller.signal,
                        });
                    }
                    break;
            }
            if (isPromise(fetchResult)) {
                return fetchResult.then(async (res) => {
                    const response = {};
                    const maybeStream = await meros(res);
                    if (isAsyncIterable(maybeStream)) {
                        return withCancel(mapAsyncIterator(maybeStream, part => {
                            if (part.json) {
                                const chunk = part.body;
                                if (chunk.path) {
                                    if (chunk.data) {
                                        const path = ['data'];
                                        merge(response, set({}, path.concat(chunk.path), chunk.data));
                                    }
                                    if (chunk.errors) {
                                        response.errors = (response.errors || []).concat(chunk.errors);
                                    }
                                }
                                else {
                                    if (chunk.data) {
                                        response.data = chunk.data;
                                    }
                                    if (chunk.errors) {
                                        response.errors = chunk.errors;
                                    }
                                }
                                return response;
                            }
                        }), () => controller.abort());
                    }
                    else {
                        return maybeStream.json();
                    }
                });
            }
            return fetchResult.json();
        };
        return executor;
    }
    buildWSSubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams) {
        const WS_URL = switchProtocols(subscriptionsEndpoint, {
            https: 'wss',
            http: 'ws',
        });
        const subscriptionClient = createClient({
            url: WS_URL,
            webSocketImpl,
            connectionParams,
            lazy: true,
        });
        return async ({ document, variables }) => {
            const query = print(document);
            return observableToAsyncIterable({
                subscribe: observer => {
                    const unsubscribe = subscriptionClient.subscribe({
                        query,
                        variables,
                    }, observer);
                    return {
                        unsubscribe,
                    };
                },
            });
        };
    }
    buildWSLegacySubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams) {
        const WS_URL = switchProtocols(subscriptionsEndpoint, {
            https: 'wss',
            http: 'ws',
        });
        const subscriptionClient = new SubscriptionClient(WS_URL, {
            connectionParams,
            lazy: true,
        }, webSocketImpl);
        return async ({ document, variables }) => {
            return observableToAsyncIterable(subscriptionClient.request({
                query: document,
                variables,
            }));
        };
    }
    buildSSESubscriber(pointer, extraHeaders, fetch, options) {
        return async ({ document, variables, ...rest }) => {
            const controller = new AbortController();
            const query = print(document);
            const finalUrl = this.prepareGETUrl({ baseUrl: pointer, query, variables });
            const headers = this.getHeadersFromOptions(extraHeaders, {
                document,
                variables,
                ...rest,
            });
            return observableToAsyncIterable({
                subscribe: observer => {
                    fetchEventSource(finalUrl, {
                        credentials: 'include',
                        headers,
                        method: 'GET',
                        onerror: error => {
                            observer.error(error);
                        },
                        onmessage: event => {
                            observer.next(JSON.parse(event.data || '{}'));
                        },
                        onopen: async (response) => {
                            const contentType = response.headers.get('content-type');
                            if (!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('text/event-stream'))) {
                                let error;
                                try {
                                    const { errors } = await response.json();
                                    error = errors[0];
                                }
                                catch (error) {
                                    // Failed to parse body
                                }
                                if (error) {
                                    throw error;
                                }
                                throw new Error(`Expected content-type to be ${'text/event-stream'} but got "${contentType}".`);
                            }
                        },
                        fetch,
                        signal: controller.signal,
                        ...options,
                    });
                    return {
                        unsubscribe: () => controller.abort(),
                    };
                },
            });
        };
    }
    getFetch(customFetch, importFn, async) {
        if (customFetch) {
            if (typeof customFetch === 'string') {
                const [moduleName, fetchFnName] = customFetch.split('#');
                const moduleResult = importFn(moduleName);
                if (isPromise(moduleResult)) {
                    return moduleResult.then(module => (fetchFnName ? module[fetchFnName] : module));
                }
                else {
                    return fetchFnName ? moduleResult[fetchFnName] : moduleResult;
                }
            }
            else {
                return customFetch;
            }
        }
        return async ? typeof fetch === 'undefined' ? fetch$1 : fetch : syncFetch;
    }
    getHeadersFromOptions(customHeaders, executionParams) {
        let headers = {};
        if (customHeaders) {
            if (typeof customHeaders === 'function') {
                customHeaders = customHeaders(executionParams);
            }
            if (Array.isArray(customHeaders)) {
                headers = customHeaders.reduce((prev, v) => ({ ...prev, ...v }), {});
            }
            else if (typeof customHeaders === 'object') {
                headers = customHeaders;
            }
        }
        return headers;
    }
    getDefaultMethodFromOptions(method, defaultMethod) {
        if (method) {
            defaultMethod = method;
        }
        return defaultMethod;
    }
    getWebSocketImpl(options, importFn) {
        if (typeof (options === null || options === void 0 ? void 0 : options.webSocketImpl) === 'string') {
            const [moduleName, webSocketImplName] = options.webSocketImpl.split('#');
            const importedModule = importFn(moduleName);
            if (isPromise(importedModule)) {
                return importedModule.then(webSocketImplName ? importedModule[webSocketImplName] : importedModule);
            }
            else {
                return webSocketImplName ? importedModule[webSocketImplName] : importedModule;
            }
        }
        else {
            const websocketImpl = options.webSocketImpl || WebSocket;
            return websocketImpl;
        }
    }
    async getExecutorAndSubscriberAsync(pointer, options = {}) {
        const fetch = await this.getFetch(options.customFetch, asyncImport, true);
        const defaultMethod = this.getDefaultMethodFromOptions(options.method, 'POST');
        const executor = this.buildExecutor({
            pointer,
            fetch,
            extraHeaders: options.headers,
            defaultMethod,
            useGETForQueries: options.useGETForQueries,
            multipart: options.multipart,
        });
        let subscriber;
        const subscriptionsEndpoint = options.subscriptionsEndpoint || pointer;
        if (options.useSSEForSubscription) {
            subscriber = this.buildSSESubscriber(subscriptionsEndpoint, options.headers, fetch, options.eventSourceOptions);
        }
        else {
            const webSocketImpl = await this.getWebSocketImpl(options, asyncImport);
            const connectionParams = () => ({ headers: this.getHeadersFromOptions(options.headers, {}) });
            if (options.useWebSocketLegacyProtocol) {
                subscriber = this.buildWSLegacySubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
            else {
                subscriber = this.buildWSSubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
        }
        return {
            executor,
            subscriber,
        };
    }
    getExecutorAndSubscriberSync(pointer, options) {
        const fetch = this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, syncImport, false);
        const defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'POST');
        const executor = this.buildExecutor({
            pointer,
            fetch,
            extraHeaders: options.headers,
            defaultMethod,
            useGETForQueries: options.useGETForQueries,
        });
        const subscriptionsEndpoint = options.subscriptionsEndpoint || pointer;
        let subscriber;
        if (options.useSSEForSubscription) {
            const asyncFetchFn = (...args) => this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, asyncImport, true).then((asyncFetch) => asyncFetch(...args));
            subscriber = this.buildSSESubscriber(subscriptionsEndpoint, options.headers, asyncFetchFn, options.eventSourceOptions);
        }
        else {
            const webSocketImpl = this.getWebSocketImpl(options, syncImport);
            const connectionParams = () => ({ headers: this.getHeadersFromOptions(options.headers, {}) });
            if (options.useWebSocketLegacyProtocol) {
                subscriber = this.buildWSLegacySubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
            else {
                subscriber = this.buildWSSubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
        }
        return {
            executor,
            subscriber,
        };
    }
    async getSubschemaConfigAsync(pointer, options) {
        const { executor, subscriber } = await this.getExecutorAndSubscriberAsync(pointer, options);
        return {
            schema: await introspectSchema(executor, undefined, options),
            executor,
            subscriber,
        };
    }
    getSubschemaConfigSync(pointer, options) {
        const { executor, subscriber } = this.getExecutorAndSubscriberSync(pointer, options);
        return {
            schema: introspectSchema(executor, undefined, options),
            executor,
            subscriber,
        };
    }
    async handleSDLAsync(pointer, options) {
        const fetch = await this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, asyncImport, true);
        const headers = this.getHeadersFromOptions(options === null || options === void 0 ? void 0 : options.headers, {});
        const defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'GET');
        const response = await fetch(pointer, {
            method: defaultMethod,
            headers,
        });
        const schemaString = await response.text();
        const document = parse(schemaString, options);
        const schema = buildASTSchema(document, options);
        return {
            location: pointer,
            rawSDL: schemaString,
            document,
            schema,
        };
    }
    handleSDLSync(pointer, options) {
        const fetch = this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, syncImport, false);
        const headers = this.getHeadersFromOptions(options === null || options === void 0 ? void 0 : options.headers, {});
        const defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'GET');
        const response = fetch(pointer, {
            method: defaultMethod,
            headers,
        });
        const schemaString = response.text();
        const document = parse(schemaString, options);
        const schema = buildASTSchema(document, options);
        return {
            location: pointer,
            rawSDL: schemaString,
            document,
            schema,
        };
    }
    async load(pointer, options) {
        if ((options === null || options === void 0 ? void 0 : options.handleAsSDL) || pointer.endsWith('.graphql')) {
            return this.handleSDLAsync(pointer, options);
        }
        const subschemaConfig = await this.getSubschemaConfigAsync(pointer, options);
        const remoteExecutableSchema = wrapSchema(subschemaConfig);
        return {
            location: pointer,
            schema: remoteExecutableSchema,
        };
    }
    loadSync(pointer, options) {
        if ((options === null || options === void 0 ? void 0 : options.handleAsSDL) || pointer.endsWith('.graphql')) {
            return this.handleSDLSync(pointer, options);
        }
        const subschemaConfig = this.getSubschemaConfigSync(pointer, options);
        const remoteExecutableSchema = wrapSchema(subschemaConfig);
        return {
            location: pointer,
            schema: remoteExecutableSchema,
        };
    }
}
function switchProtocols(pointer, protocolMap) {
    const protocols = Object.keys(protocolMap).map(source => [source, protocolMap[source]]);
    return protocols.reduce((prev, [source, target]) => prev.replace(`${source}://`, `${target}://`).replace(`${source}:\\`, `${target}:\\`), pointer);
}

export { UrlLoader };
//# sourceMappingURL=index.esm.js.map
