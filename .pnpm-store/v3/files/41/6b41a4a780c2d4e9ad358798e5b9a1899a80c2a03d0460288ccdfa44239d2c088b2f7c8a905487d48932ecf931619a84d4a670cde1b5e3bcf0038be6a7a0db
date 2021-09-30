"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = void 0;
const zlib_1 = __importDefault(require("zlib"));
const querystring_1 = __importDefault(require("querystring"));
const raw_body_1 = __importDefault(require("raw-body"));
const http_errors_1 = __importDefault(require("http-errors"));
const content_type_1 = __importDefault(require("content-type"));
/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the body data contained.
 */
async function parseBody(req) {
    const { body } = req;
    // If express has already parsed a body as a keyed object, use it.
    if (typeof body === 'object' && !(body instanceof Buffer)) {
        return body;
    }
    // Skip requests without content types.
    if (req.headers['content-type'] === undefined) {
        return {};
    }
    const typeInfo = content_type_1.default.parse(req);
    // If express has already parsed a body as a string, and the content-type
    // was application/graphql, parse the string body.
    if (typeof body === 'string' && typeInfo.type === 'application/graphql') {
        return { query: body };
    }
    // Already parsed body we didn't recognise? Parse nothing.
    if (body != null) {
        return {};
    }
    const rawBody = await readBody(req, typeInfo);
    // Use the correct body parser based on Content-Type header.
    switch (typeInfo.type) {
        case 'application/graphql':
            return { query: rawBody };
        case 'application/json':
            if (jsonObjRegex.test(rawBody)) {
                try {
                    return JSON.parse(rawBody);
                }
                catch (_a) {
                    // Do nothing
                }
            }
            throw http_errors_1.default(400, 'POST body sent invalid JSON.');
        case 'application/x-www-form-urlencoded':
            return querystring_1.default.parse(rawBody);
    }
    // If no Content-Type header matches, parse nothing.
    return {};
}
exports.parseBody = parseBody;
/**
 * RegExp to match an Object-opening brace "{" as the first non-space
 * in a string. Allowed whitespace is defined in RFC 7159:
 *
 *     ' '   Space
 *     '\t'  Horizontal tab
 *     '\n'  Line feed or New line
 *     '\r'  Carriage return
 */
const jsonObjRegex = /^[ \t\n\r]*\{/;
// Read and parse a request body.
async function readBody(req, typeInfo) {
    var _a, _b;
    const charset = (_b = (_a = typeInfo.parameters.charset) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : 'utf-8';
    // Assert charset encoding per JSON RFC 7159 sec 8.1
    if (!charset.startsWith('utf-')) {
        throw http_errors_1.default(415, `Unsupported charset "${charset.toUpperCase()}".`);
    }
    // Get content-encoding (e.g. gzip)
    const contentEncoding = req.headers['content-encoding'];
    const encoding = typeof contentEncoding === 'string'
        ? contentEncoding.toLowerCase()
        : 'identity';
    const length = encoding === 'identity' ? req.headers['content-length'] : null;
    const limit = 100 * 1024; // 100kb
    const stream = decompressed(req, encoding);
    // Read body from stream.
    try {
        return await raw_body_1.default(stream, { encoding: charset, length, limit });
    }
    catch (rawError) {
        const error = http_errors_1.default(400, 
        /* istanbul ignore next: Thrown by underlying library. */
        rawError instanceof Error ? rawError : String(rawError));
        error.message =
            error.type === 'encoding.unsupported'
                ? `Unsupported charset "${charset.toUpperCase()}".`
                : `Invalid body: ${error.message}.`;
        throw error;
    }
}
// Return a decompressed stream, given an encoding.
function decompressed(req, encoding) {
    switch (encoding) {
        case 'identity':
            return req;
        case 'deflate':
            return req.pipe(zlib_1.default.createInflate());
        case 'gzip':
            return req.pipe(zlib_1.default.createGunzip());
    }
    throw http_errors_1.default(415, `Unsupported content-encoding "${encoding}".`);
}
