'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

const tslib = require('tslib');
const graphql = require('graphql');
const utils = require('@graphql-tools/utils/es5');
const validUrl = require('valid-url');
const crossFetch = require('cross-fetch');
const wrap = require('@graphql-tools/wrap/es5');
const graphqlWs = require('graphql-ws');
const WebSocket = _interopDefault(require('isomorphic-ws'));
const syncFetch = _interopDefault(require('sync-fetch'));
const isPromise = _interopDefault(require('is-promise'));
const extractFiles = require('extract-files');
const FormData = _interopDefault(require('form-data'));
const fetchEventSource = require('@microsoft/fetch-event-source');
const subscriptionsTransportWs = require('subscriptions-transport-ws');
const AbortController = _interopDefault(require('abort-controller'));
const meros = require('meros');
const lodash = require('lodash');

var asyncImport = function (moduleName) { return new Promise(function (resolve) { resolve(_interopNamespace(require(moduleName))); }); };
var syncImport = function (moduleName) { return require(moduleName); };
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
var UrlLoader = /** @class */ (function () {
    function UrlLoader() {
    }
    UrlLoader.prototype.loaderId = function () {
        return 'url';
    };
    UrlLoader.prototype.canLoad = function (pointer, options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
                return [2 /*return*/, this.canLoadSync(pointer, options)];
            });
        });
    };
    UrlLoader.prototype.canLoadSync = function (pointer, _options) {
        return !!validUrl.isWebUri(pointer);
    };
    UrlLoader.prototype.createFormDataFromVariables = function (_a) {
        var query = _a.query, variables = _a.variables;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var vars, _b, clone, files, map, uploads, form;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        vars = Object.assign({}, variables);
                        _b = extractFiles.extractFiles(vars, 'variables', (function (v) { return extractFiles.isExtractableFile(v) || (v === null || v === void 0 ? void 0 : v.promise) || utils.isAsyncIterable(v) || isPromise(v); })), clone = _b.clone, files = _b.files;
                        map = Array.from(files.values()).reduce(function (prev, curr, currIndex) {
                            prev[currIndex] = curr;
                            return prev;
                        }, {});
                        uploads = new Map(Array.from(files.keys()).map(function (u, i) { return [i, u]; }));
                        form = new FormData();
                        form.append('operations', JSON.stringify({
                            query: query,
                            variables: clone,
                        }));
                        form.append('map', JSON.stringify(map));
                        return [4 /*yield*/, Promise.all(Array.from(uploads.entries()).map(function (_a) {
                                var _b = tslib.__read(_a, 2), i = _b[0], u = _b[1];
                                return tslib.__awaiter(_this, void 0, void 0, function () {
                                    var upload, stream;
                                    return tslib.__generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!isPromise(u)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, u];
                                            case 1:
                                                u = _c.sent();
                                                _c.label = 2;
                                            case 2:
                                                if (!(u === null || u === void 0 ? void 0 : u.promise)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, u.promise];
                                            case 3:
                                                upload = _c.sent();
                                                stream = upload.createReadStream();
                                                form.append(i.toString(), stream, {
                                                    filename: upload.filename,
                                                    contentType: upload.mimetype,
                                                });
                                                return [3 /*break*/, 5];
                                            case 4:
                                                form.append(i.toString(), u, {
                                                    filename: 'name' in u ? u['name'] : i,
                                                    contentType: u.type,
                                                });
                                                _c.label = 5;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                });
                            }))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, form];
                }
            });
        });
    };
    UrlLoader.prototype.prepareGETUrl = function (_a) {
        var baseUrl = _a.baseUrl, query = _a.query, variables = _a.variables, operationName = _a.operationName;
        var HTTP_URL = switchProtocols(baseUrl, {
            wss: 'https',
            ws: 'http',
        });
        var dummyHostname = 'https://dummyhostname.com';
        var validUrl = HTTP_URL.startsWith('http')
            ? HTTP_URL
            : HTTP_URL.startsWith('/')
                ? "" + dummyHostname + HTTP_URL
                : dummyHostname + "/" + HTTP_URL;
        var urlObj = new URL(validUrl);
        urlObj.searchParams.set('query', query);
        if (variables && Object.keys(variables).length > 0) {
            urlObj.searchParams.set('variables', JSON.stringify(variables));
        }
        if (operationName) {
            urlObj.searchParams.set('operationName', operationName);
        }
        var finalUrl = urlObj.toString().replace(dummyHostname, '');
        return finalUrl;
    };
    UrlLoader.prototype.buildExecutor = function (_a) {
        var _this = this;
        var pointer = _a.pointer, fetch = _a.fetch, extraHeaders = _a.extraHeaders, defaultMethod = _a.defaultMethod, useGETForQueries = _a.useGETForQueries, multipart = _a.multipart;
        var HTTP_URL = switchProtocols(pointer, {
            wss: 'https',
            ws: 'http',
        });
        var executor = function (_a) {
            var e_1, _b;
            var document = _a.document, variables = _a.variables, rest = tslib.__rest(_a, ["document", "variables"]);
            var controller = new AbortController();
            var method = defaultMethod;
            if (useGETForQueries) {
                method = 'GET';
                try {
                    for (var _c = tslib.__values(document.definitions), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var definition = _d.value;
                        if (definition.kind === graphql.Kind.OPERATION_DEFINITION) {
                            if (definition.operation !== 'query') {
                                method = defaultMethod;
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            var headers = _this.getHeadersFromOptions(extraHeaders, tslib.__assign({ document: document,
                variables: variables }, rest));
            var fetchResult;
            var query = graphql.print(document);
            switch (method) {
                case 'GET':
                    var finalUrl = _this.prepareGETUrl({ baseUrl: pointer, query: query, variables: variables });
                    fetchResult = fetch(finalUrl, {
                        method: 'GET',
                        credentials: 'include',
                        headers: tslib.__assign({ accept: 'application/json' }, headers),
                    });
                    break;
                case 'POST':
                    if (multipart) {
                        fetchResult = _this.createFormDataFromVariables({ query: query, variables: variables }).then(function (form) {
                            return fetch(HTTP_URL, {
                                method: 'POST',
                                credentials: 'include',
                                body: form,
                                headers: tslib.__assign({ accept: 'application/json' }, headers),
                                signal: controller.signal,
                            });
                        });
                    }
                    else {
                        fetchResult = fetch(HTTP_URL, {
                            method: 'POST',
                            credentials: 'include',
                            body: JSON.stringify({
                                query: query,
                                variables: variables,
                            }),
                            headers: tslib.__assign({ accept: 'application/json, multipart/mixed', 'content-type': 'application/json' }, headers),
                            signal: controller.signal,
                        });
                    }
                    break;
            }
            if (isPromise(fetchResult)) {
                return fetchResult.then(function (res) { return tslib.__awaiter(_this, void 0, void 0, function () {
                    var response, maybeStream;
                    return tslib.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                response = {};
                                return [4 /*yield*/, meros.meros(res)];
                            case 1:
                                maybeStream = _a.sent();
                                if (utils.isAsyncIterable(maybeStream)) {
                                    return [2 /*return*/, utils.withCancel(utils.mapAsyncIterator(maybeStream, function (part) {
                                            if (part.json) {
                                                var chunk = part.body;
                                                if (chunk.path) {
                                                    if (chunk.data) {
                                                        var path = ['data'];
                                                        lodash.merge(response, lodash.set({}, path.concat(chunk.path), chunk.data));
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
                                        }), function () { return controller.abort(); })];
                                }
                                else {
                                    return [2 /*return*/, maybeStream.json()];
                                }
                        }
                    });
                }); });
            }
            return fetchResult.json();
        };
        return executor;
    };
    UrlLoader.prototype.buildWSSubscriber = function (subscriptionsEndpoint, webSocketImpl, connectionParams) {
        var _this = this;
        var WS_URL = switchProtocols(subscriptionsEndpoint, {
            https: 'wss',
            http: 'ws',
        });
        var subscriptionClient = graphqlWs.createClient({
            url: WS_URL,
            webSocketImpl: webSocketImpl,
            connectionParams: connectionParams,
            lazy: true,
        });
        return function (_a) {
            var document = _a.document, variables = _a.variables;
            return tslib.__awaiter(_this, void 0, void 0, function () {
                var query;
                return tslib.__generator(this, function (_b) {
                    query = graphql.print(document);
                    return [2 /*return*/, utils.observableToAsyncIterable({
                            subscribe: function (observer) {
                                var unsubscribe = subscriptionClient.subscribe({
                                    query: query,
                                    variables: variables,
                                }, observer);
                                return {
                                    unsubscribe: unsubscribe,
                                };
                            },
                        })];
                });
            });
        };
    };
    UrlLoader.prototype.buildWSLegacySubscriber = function (subscriptionsEndpoint, webSocketImpl, connectionParams) {
        var _this = this;
        var WS_URL = switchProtocols(subscriptionsEndpoint, {
            https: 'wss',
            http: 'ws',
        });
        var subscriptionClient = new subscriptionsTransportWs.SubscriptionClient(WS_URL, {
            connectionParams: connectionParams,
            lazy: true,
        }, webSocketImpl);
        return function (_a) {
            var document = _a.document, variables = _a.variables;
            return tslib.__awaiter(_this, void 0, void 0, function () {
                return tslib.__generator(this, function (_b) {
                    return [2 /*return*/, utils.observableToAsyncIterable(subscriptionClient.request({
                            query: document,
                            variables: variables,
                        }))];
                });
            });
        };
    };
    UrlLoader.prototype.buildSSESubscriber = function (pointer, extraHeaders, fetch, options) {
        var _this = this;
        return function (_a) { return tslib.__awaiter(_this, void 0, void 0, function () {
            var controller, query, finalUrl, headers;
            var _this = this;
            var document = _a.document, variables = _a.variables, rest = tslib.__rest(_a, ["document", "variables"]);
            return tslib.__generator(this, function (_b) {
                controller = new AbortController();
                query = graphql.print(document);
                finalUrl = this.prepareGETUrl({ baseUrl: pointer, query: query, variables: variables });
                headers = this.getHeadersFromOptions(extraHeaders, tslib.__assign({ document: document,
                    variables: variables }, rest));
                return [2 /*return*/, utils.observableToAsyncIterable({
                        subscribe: function (observer) {
                            fetchEventSource.fetchEventSource(finalUrl, tslib.__assign({ credentials: 'include', headers: headers, method: 'GET', onerror: function (error) {
                                    observer.error(error);
                                }, onmessage: function (event) {
                                    observer.next(JSON.parse(event.data || '{}'));
                                }, onopen: function (response) { return tslib.__awaiter(_this, void 0, void 0, function () {
                                    var contentType, error, errors, error_1;
                                    return tslib.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                contentType = response.headers.get('content-type');
                                                if (!!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('text/event-stream'))) return [3 /*break*/, 5];
                                                error = void 0;
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4 /*yield*/, response.json()];
                                            case 2:
                                                errors = (_a.sent()).errors;
                                                error = errors[0];
                                                return [3 /*break*/, 4];
                                            case 3:
                                                error_1 = _a.sent();
                                                return [3 /*break*/, 4];
                                            case 4:
                                                if (error) {
                                                    throw error;
                                                }
                                                throw new Error("Expected content-type to be " + 'text/event-stream' + " but got \"" + contentType + "\".");
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); }, fetch: fetch, signal: controller.signal }, options));
                            return {
                                unsubscribe: function () { return controller.abort(); },
                            };
                        },
                    })];
            });
        }); };
    };
    UrlLoader.prototype.getFetch = function (customFetch, importFn, async) {
        if (customFetch) {
            if (typeof customFetch === 'string') {
                var _a = tslib.__read(customFetch.split('#'), 2), moduleName = _a[0], fetchFnName_1 = _a[1];
                var moduleResult = importFn(moduleName);
                if (isPromise(moduleResult)) {
                    return moduleResult.then(function (module) { return (fetchFnName_1 ? module[fetchFnName_1] : module); });
                }
                else {
                    return fetchFnName_1 ? moduleResult[fetchFnName_1] : moduleResult;
                }
            }
            else {
                return customFetch;
            }
        }
        return async ? typeof fetch === 'undefined' ? crossFetch.fetch : fetch : syncFetch;
    };
    UrlLoader.prototype.getHeadersFromOptions = function (customHeaders, executionParams) {
        var headers = {};
        if (customHeaders) {
            if (typeof customHeaders === 'function') {
                customHeaders = customHeaders(executionParams);
            }
            if (Array.isArray(customHeaders)) {
                headers = customHeaders.reduce(function (prev, v) { return (tslib.__assign(tslib.__assign({}, prev), v)); }, {});
            }
            else if (typeof customHeaders === 'object') {
                headers = customHeaders;
            }
        }
        return headers;
    };
    UrlLoader.prototype.getDefaultMethodFromOptions = function (method, defaultMethod) {
        if (method) {
            defaultMethod = method;
        }
        return defaultMethod;
    };
    UrlLoader.prototype.getWebSocketImpl = function (options, importFn) {
        if (typeof (options === null || options === void 0 ? void 0 : options.webSocketImpl) === 'string') {
            var _a = tslib.__read(options.webSocketImpl.split('#'), 2), moduleName = _a[0], webSocketImplName = _a[1];
            var importedModule = importFn(moduleName);
            if (isPromise(importedModule)) {
                return importedModule.then(webSocketImplName ? importedModule[webSocketImplName] : importedModule);
            }
            else {
                return webSocketImplName ? importedModule[webSocketImplName] : importedModule;
            }
        }
        else {
            var websocketImpl = options.webSocketImpl || WebSocket;
            return websocketImpl;
        }
    };
    UrlLoader.prototype.getExecutorAndSubscriberAsync = function (pointer, options) {
        if (options === void 0) { options = {}; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var fetch, defaultMethod, executor, subscriber, subscriptionsEndpoint, webSocketImpl, connectionParams;
            var _this = this;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFetch(options.customFetch, asyncImport, true)];
                    case 1:
                        fetch = _a.sent();
                        defaultMethod = this.getDefaultMethodFromOptions(options.method, 'POST');
                        executor = this.buildExecutor({
                            pointer: pointer,
                            fetch: fetch,
                            extraHeaders: options.headers,
                            defaultMethod: defaultMethod,
                            useGETForQueries: options.useGETForQueries,
                            multipart: options.multipart,
                        });
                        subscriptionsEndpoint = options.subscriptionsEndpoint || pointer;
                        if (!options.useSSEForSubscription) return [3 /*break*/, 2];
                        subscriber = this.buildSSESubscriber(subscriptionsEndpoint, options.headers, fetch, options.eventSourceOptions);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getWebSocketImpl(options, asyncImport)];
                    case 3:
                        webSocketImpl = _a.sent();
                        connectionParams = function () { return ({ headers: _this.getHeadersFromOptions(options.headers, {}) }); };
                        if (options.useWebSocketLegacyProtocol) {
                            subscriber = this.buildWSLegacySubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
                        }
                        else {
                            subscriber = this.buildWSSubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            executor: executor,
                            subscriber: subscriber,
                        }];
                }
            });
        });
    };
    UrlLoader.prototype.getExecutorAndSubscriberSync = function (pointer, options) {
        var _this = this;
        var fetch = this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, syncImport, false);
        var defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'POST');
        var executor = this.buildExecutor({
            pointer: pointer,
            fetch: fetch,
            extraHeaders: options.headers,
            defaultMethod: defaultMethod,
            useGETForQueries: options.useGETForQueries,
        });
        var subscriptionsEndpoint = options.subscriptionsEndpoint || pointer;
        var subscriber;
        if (options.useSSEForSubscription) {
            var asyncFetchFn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, asyncImport, true).then(function (asyncFetch) { return asyncFetch.apply(void 0, tslib.__spreadArray([], tslib.__read(args))); });
            };
            subscriber = this.buildSSESubscriber(subscriptionsEndpoint, options.headers, asyncFetchFn, options.eventSourceOptions);
        }
        else {
            var webSocketImpl = this.getWebSocketImpl(options, syncImport);
            var connectionParams = function () { return ({ headers: _this.getHeadersFromOptions(options.headers, {}) }); };
            if (options.useWebSocketLegacyProtocol) {
                subscriber = this.buildWSLegacySubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
            else {
                subscriber = this.buildWSSubscriber(subscriptionsEndpoint, webSocketImpl, connectionParams);
            }
        }
        return {
            executor: executor,
            subscriber: subscriber,
        };
    };
    UrlLoader.prototype.getSubschemaConfigAsync = function (pointer, options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, executor, subscriber;
            var _b;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getExecutorAndSubscriberAsync(pointer, options)];
                    case 1:
                        _a = _c.sent(), executor = _a.executor, subscriber = _a.subscriber;
                        _b = {};
                        return [4 /*yield*/, wrap.introspectSchema(executor, undefined, options)];
                    case 2: return [2 /*return*/, (_b.schema = _c.sent(),
                            _b.executor = executor,
                            _b.subscriber = subscriber,
                            _b)];
                }
            });
        });
    };
    UrlLoader.prototype.getSubschemaConfigSync = function (pointer, options) {
        var _a = this.getExecutorAndSubscriberSync(pointer, options), executor = _a.executor, subscriber = _a.subscriber;
        return {
            schema: wrap.introspectSchema(executor, undefined, options),
            executor: executor,
            subscriber: subscriber,
        };
    };
    UrlLoader.prototype.handleSDLAsync = function (pointer, options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var fetch, headers, defaultMethod, response, schemaString, document, schema;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, asyncImport, true)];
                    case 1:
                        fetch = _a.sent();
                        headers = this.getHeadersFromOptions(options === null || options === void 0 ? void 0 : options.headers, {});
                        defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'GET');
                        return [4 /*yield*/, fetch(pointer, {
                                method: defaultMethod,
                                headers: headers,
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 3:
                        schemaString = _a.sent();
                        document = graphql.parse(schemaString, options);
                        schema = graphql.buildASTSchema(document, options);
                        return [2 /*return*/, {
                                location: pointer,
                                rawSDL: schemaString,
                                document: document,
                                schema: schema,
                            }];
                }
            });
        });
    };
    UrlLoader.prototype.handleSDLSync = function (pointer, options) {
        var fetch = this.getFetch(options === null || options === void 0 ? void 0 : options.customFetch, syncImport, false);
        var headers = this.getHeadersFromOptions(options === null || options === void 0 ? void 0 : options.headers, {});
        var defaultMethod = this.getDefaultMethodFromOptions(options === null || options === void 0 ? void 0 : options.method, 'GET');
        var response = fetch(pointer, {
            method: defaultMethod,
            headers: headers,
        });
        var schemaString = response.text();
        var document = graphql.parse(schemaString, options);
        var schema = graphql.buildASTSchema(document, options);
        return {
            location: pointer,
            rawSDL: schemaString,
            document: document,
            schema: schema,
        };
    };
    UrlLoader.prototype.load = function (pointer, options) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var subschemaConfig, remoteExecutableSchema;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((options === null || options === void 0 ? void 0 : options.handleAsSDL) || pointer.endsWith('.graphql')) {
                            return [2 /*return*/, this.handleSDLAsync(pointer, options)];
                        }
                        return [4 /*yield*/, this.getSubschemaConfigAsync(pointer, options)];
                    case 1:
                        subschemaConfig = _a.sent();
                        remoteExecutableSchema = wrap.wrapSchema(subschemaConfig);
                        return [2 /*return*/, {
                                location: pointer,
                                schema: remoteExecutableSchema,
                            }];
                }
            });
        });
    };
    UrlLoader.prototype.loadSync = function (pointer, options) {
        if ((options === null || options === void 0 ? void 0 : options.handleAsSDL) || pointer.endsWith('.graphql')) {
            return this.handleSDLSync(pointer, options);
        }
        var subschemaConfig = this.getSubschemaConfigSync(pointer, options);
        var remoteExecutableSchema = wrap.wrapSchema(subschemaConfig);
        return {
            location: pointer,
            schema: remoteExecutableSchema,
        };
    };
    return UrlLoader;
}());
function switchProtocols(pointer, protocolMap) {
    var protocols = Object.keys(protocolMap).map(function (source) { return [source, protocolMap[source]]; });
    return protocols.reduce(function (prev, _a) {
        var _b = tslib.__read(_a, 2), source = _b[0], target = _b[1];
        return prev.replace(source + "://", target + "://").replace(source + ":\\", target + ":\\");
    }, pointer);
}

exports.UrlLoader = UrlLoader;
//# sourceMappingURL=index.cjs.js.map
