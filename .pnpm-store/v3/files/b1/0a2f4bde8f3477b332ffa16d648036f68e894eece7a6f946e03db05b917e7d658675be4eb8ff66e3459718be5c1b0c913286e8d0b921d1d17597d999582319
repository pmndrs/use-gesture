function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */
import { getUserAgentHeader } from 'contentful-sdk-core';
import { createAdapter } from './create-adapter';
import createContentfulApi from './create-contentful-api';
import { createPlainClient } from './plain/plain-client';
import * as editorInterfaceDefaults from './constants/editor-interface-defaults';
export { asIterator } from './plain/as-iterator';
export { isDraft, isPublished, isUpdated } from './plain/checks';
export { createClient };
export { RestAdapter } from './adapters/REST/rest-adapter';
export { editorInterfaceDefaults };

function createClient(params) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sdkMain = opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js';
  var userAgent = getUserAgentHeader( // @ts-expect-error
  "".concat(sdkMain, "/").concat("7.36.1"), params.application, params.integration, params.feature);
  var adapter = createAdapter(params); // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error

  var makeRequest = function makeRequest(options) {
    return adapter.makeRequest(_objectSpread(_objectSpread({}, options), {}, {
      userAgent: userAgent
    }));
  };

  if (opts.type === 'plain') {
    return createPlainClient(makeRequest, opts.defaults);
  } else {
    return createContentfulApi(makeRequest);
  }
}