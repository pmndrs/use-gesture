"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphQLParams = exports.graphqlHTTP = void 0;
const accepts_1 = __importDefault(require("accepts"));
const http_errors_1 = __importDefault(require("http-errors"));
const graphql_1 = require("graphql");
const parseBody_1 = require("./parseBody");
const renderGraphiQL_1 = require("./renderGraphiQL");
/**
 * Middleware for express; takes an options object or function as input to
 * configure behavior, and returns an express middleware.
 */
function graphqlHTTP(options) {
    devAssert(options != null, 'GraphQL middleware requires options.');
    return async function graphqlMiddleware(request, response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        // Higher scoped variables are referred to at various stages in the asynchronous state machine below.
        let params;
        let showGraphiQL = false;
        let graphiqlOptions;
        let formatErrorFn = graphql_1.formatError;
        let pretty = false;
        let result;
        try {
            // Parse the Request to get GraphQL request parameters.
            try {
                params = await getGraphQLParams(request);
            }
            catch (error) {
                // When we failed to parse the GraphQL parameters, we still need to get
                // the options object, so make an options call to resolve just that.
                const optionsData = await resolveOptions();
                pretty = (_a = optionsData.pretty) !== null && _a !== void 0 ? _a : false;
                formatErrorFn = (_c = (_b = optionsData.customFormatErrorFn) !== null && _b !== void 0 ? _b : optionsData.formatError) !== null && _c !== void 0 ? _c : formatErrorFn;
                throw error;
            }
            // Then, resolve the Options to get OptionsData.
            const optionsData = await resolveOptions(params);
            // Collect information from the options data object.
            const schema = optionsData.schema;
            const rootValue = optionsData.rootValue;
            const validationRules = (_d = optionsData.validationRules) !== null && _d !== void 0 ? _d : [];
            const fieldResolver = optionsData.fieldResolver;
            const typeResolver = optionsData.typeResolver;
            const graphiql = (_e = optionsData.graphiql) !== null && _e !== void 0 ? _e : false;
            const extensionsFn = optionsData.extensions;
            const context = (_f = optionsData.context) !== null && _f !== void 0 ? _f : request;
            const parseFn = (_g = optionsData.customParseFn) !== null && _g !== void 0 ? _g : graphql_1.parse;
            const executeFn = (_h = optionsData.customExecuteFn) !== null && _h !== void 0 ? _h : graphql_1.execute;
            const validateFn = (_j = optionsData.customValidateFn) !== null && _j !== void 0 ? _j : graphql_1.validate;
            pretty = (_k = optionsData.pretty) !== null && _k !== void 0 ? _k : false;
            formatErrorFn = (_m = (_l = optionsData.customFormatErrorFn) !== null && _l !== void 0 ? _l : optionsData.formatError) !== null && _m !== void 0 ? _m : formatErrorFn;
            // Assert that schema is required.
            devAssert(schema != null, 'GraphQL middleware options must contain a schema.');
            // GraphQL HTTP only supports GET and POST methods.
            if (request.method !== 'GET' && request.method !== 'POST') {
                throw http_errors_1.default(405, 'GraphQL only supports GET and POST requests.', {
                    headers: { Allow: 'GET, POST' },
                });
            }
            // Get GraphQL params from the request and POST body data.
            const { query, variables, operationName } = params;
            showGraphiQL = canDisplayGraphiQL(request, params) && graphiql !== false;
            if (typeof graphiql !== 'boolean') {
                graphiqlOptions = graphiql;
            }
            // If there is no query, but GraphiQL will be displayed, do not produce
            // a result, otherwise return a 400: Bad Request.
            if (query == null) {
                if (showGraphiQL) {
                    return respondWithGraphiQL(response, graphiqlOptions);
                }
                throw http_errors_1.default(400, 'Must provide query string.');
            }
            // Validate Schema
            const schemaValidationErrors = graphql_1.validateSchema(schema);
            if (schemaValidationErrors.length > 0) {
                // Return 500: Internal Server Error if invalid schema.
                throw http_errors_1.default(500, 'GraphQL schema validation error.', {
                    graphqlErrors: schemaValidationErrors,
                });
            }
            // Parse source to AST, reporting any syntax error.
            let documentAST;
            try {
                documentAST = parseFn(new graphql_1.Source(query, 'GraphQL request'));
            }
            catch (syntaxError) {
                // Return 400: Bad Request if any syntax errors errors exist.
                throw http_errors_1.default(400, 'GraphQL syntax error.', {
                    graphqlErrors: [syntaxError],
                });
            }
            // Validate AST, reporting any errors.
            const validationErrors = validateFn(schema, documentAST, [
                ...graphql_1.specifiedRules,
                ...validationRules,
            ]);
            if (validationErrors.length > 0) {
                // Return 400: Bad Request if any validation errors exist.
                throw http_errors_1.default(400, 'GraphQL validation error.', {
                    graphqlErrors: validationErrors,
                });
            }
            // Only query operations are allowed on GET requests.
            if (request.method === 'GET') {
                // Determine if this GET request will perform a non-query.
                const operationAST = graphql_1.getOperationAST(documentAST, operationName);
                if (operationAST && operationAST.operation !== 'query') {
                    // If GraphiQL can be shown, do not perform this query, but
                    // provide it to GraphiQL so that the requester may perform it
                    // themselves if desired.
                    if (showGraphiQL) {
                        return respondWithGraphiQL(response, graphiqlOptions, params);
                    }
                    // Otherwise, report a 405: Method Not Allowed error.
                    throw http_errors_1.default(405, `Can only perform a ${operationAST.operation} operation from a POST request.`, { headers: { Allow: 'POST' } });
                }
            }
            // Perform the execution, reporting any errors creating the context.
            try {
                result = await executeFn({
                    schema,
                    document: documentAST,
                    rootValue,
                    contextValue: context,
                    variableValues: variables,
                    operationName,
                    fieldResolver,
                    typeResolver,
                });
            }
            catch (contextError) {
                // Return 400: Bad Request if any execution context errors exist.
                throw http_errors_1.default(400, 'GraphQL execution context error.', {
                    graphqlErrors: [contextError],
                });
            }
            // Collect and apply any metadata extensions if a function was provided.
            // https://graphql.github.io/graphql-spec/#sec-Response-Format
            if (extensionsFn) {
                const extensions = await extensionsFn({
                    document: documentAST,
                    variables,
                    operationName,
                    result,
                    context,
                });
                if (extensions != null) {
                    result = { ...result, extensions };
                }
            }
        }
        catch (rawError) {
            // If an error was caught, report the httpError status, or 500.
            const error = http_errors_1.default(500, 
            /* istanbul ignore next: Thrown by underlying library. */
            rawError instanceof Error ? rawError : String(rawError));
            response.statusCode = error.status;
            const { headers } = error;
            if (headers != null) {
                for (const [key, value] of Object.entries(headers)) {
                    response.setHeader(key, String(value));
                }
            }
            if (error.graphqlErrors == null) {
                const graphqlError = new graphql_1.GraphQLError(error.message, undefined, undefined, undefined, undefined, error);
                result = { data: undefined, errors: [graphqlError] };
            }
            else {
                result = { data: undefined, errors: error.graphqlErrors };
            }
        }
        // If no data was included in the result, that indicates a runtime query
        // error, indicate as such with a generic status code.
        // Note: Information about the error itself will still be contained in
        // the resulting JSON payload.
        // https://graphql.github.io/graphql-spec/#sec-Data
        if (response.statusCode === 200 && result.data == null) {
            response.statusCode = 500;
        }
        // Format any encountered errors.
        const formattedResult = {
            ...result,
            errors: (_o = result.errors) === null || _o === void 0 ? void 0 : _o.map(formatErrorFn),
        };
        // If allowed to show GraphiQL, present it instead of JSON.
        if (showGraphiQL) {
            return respondWithGraphiQL(response, graphiqlOptions, params, formattedResult);
        }
        // If "pretty" JSON isn't requested, and the server provides a
        // response.json method (express), use that directly.
        // Otherwise use the simplified sendResponse method.
        if (!pretty && typeof response.json === 'function') {
            response.json(formattedResult);
        }
        else {
            const payload = JSON.stringify(formattedResult, null, pretty ? 2 : 0);
            sendResponse(response, 'application/json', payload);
        }
        async function resolveOptions(requestParams) {
            const optionsResult = await Promise.resolve(typeof options === 'function'
                ? options(request, response, requestParams)
                : options);
            devAssert(optionsResult != null && typeof optionsResult === 'object', 'GraphQL middleware option function must return an options object or a promise which will be resolved to an options object.');
            if (optionsResult.formatError) {
                // eslint-disable-next-line no-console
                console.warn('`formatError` is deprecated and replaced by `customFormatErrorFn`. It will be removed in version 1.0.0.');
            }
            return optionsResult;
        }
    };
}
exports.graphqlHTTP = graphqlHTTP;
function respondWithGraphiQL(response, options, params, result) {
    const data = {
        query: params === null || params === void 0 ? void 0 : params.query,
        variables: params === null || params === void 0 ? void 0 : params.variables,
        operationName: params === null || params === void 0 ? void 0 : params.operationName,
        result,
    };
    const payload = renderGraphiQL_1.renderGraphiQL(data, options);
    return sendResponse(response, 'text/html', payload);
}
/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the GraphQL request parameters.
 */
async function getGraphQLParams(request) {
    var _a, _b, _c;
    const urlData = new URLSearchParams(request.url.split('?')[1]);
    const bodyData = await parseBody_1.parseBody(request);
    // GraphQL Query string.
    let query = (_a = urlData.get('query')) !== null && _a !== void 0 ? _a : bodyData.query;
    if (typeof query !== 'string') {
        query = null;
    }
    // Parse the variables if needed.
    let variables = ((_b = urlData.get('variables')) !== null && _b !== void 0 ? _b : bodyData.variables);
    if (typeof variables === 'string') {
        try {
            variables = JSON.parse(variables);
        }
        catch (_d) {
            throw http_errors_1.default(400, 'Variables are invalid JSON.');
        }
    }
    else if (typeof variables !== 'object') {
        variables = null;
    }
    // Name of GraphQL operation to execute.
    let operationName = (_c = urlData.get('operationName')) !== null && _c !== void 0 ? _c : bodyData.operationName;
    if (typeof operationName !== 'string') {
        operationName = null;
    }
    const raw = urlData.get('raw') != null || bodyData.raw !== undefined;
    return { query, variables, operationName, raw };
}
exports.getGraphQLParams = getGraphQLParams;
/**
 * Helper function to determine if GraphiQL can be displayed.
 */
function canDisplayGraphiQL(request, params) {
    // If `raw` false, GraphiQL mode is not enabled.
    // Allowed to show GraphiQL if not requested as raw and this request prefers HTML over JSON.
    return !params.raw && accepts_1.default(request).types(['json', 'html']) === 'html';
}
/**
 * Helper function for sending a response using only the core Node server APIs.
 */
function sendResponse(response, type, data) {
    const chunk = Buffer.from(data, 'utf8');
    response.setHeader('Content-Type', type + '; charset=utf-8');
    response.setHeader('Content-Length', String(chunk.length));
    response.end(chunk);
}
function devAssert(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
        throw new Error(message);
    }
}
