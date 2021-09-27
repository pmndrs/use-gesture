(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["contentfulManagement"] = factory();
	else
		root["contentfulManagement"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "../node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/buildFullPath.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/defaults.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAxiosError.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAxiosError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "../node_modules/call-bind/callBound.js":
/*!**********************************************!*\
  !*** ../node_modules/call-bind/callBound.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "../node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "../node_modules/call-bind/index.js":
/*!******************************************!*\
  !*** ../node_modules/call-bind/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "../node_modules/contentful-sdk-core/dist/index.es-modules.js":
/*!********************************************************************!*\
  !*** ../node_modules/contentful-sdk-core/dist/index.es-modules.js ***!
  \********************************************************************/
/*! exports provided: createHttpClient, createRequestConfig, enforceObjPath, freezeSys, getUserAgentHeader, toPlainObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHttpClient", function() { return createHttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRequestConfig", function() { return createRequestConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforceObjPath", function() { return enforceObjPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freezeSys", function() { return freezeSys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserAgentHeader", function() { return getUserAgentHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPlainObject", function() { return toPlainObject; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! os */ 2);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);




function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var attempts = {};
var networkErrorAttempts = 0;

function noop() {
  return undefined;
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

function rateLimit(instance) {
  var maxRetry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  var _instance$defaults = instance.defaults,
      _instance$defaults$re = _instance$defaults.responseLogger,
      responseLogger = _instance$defaults$re === void 0 ? noop : _instance$defaults$re,
      _instance$defaults$re2 = _instance$defaults.requestLogger,
      requestLogger = _instance$defaults$re2 === void 0 ? noop : _instance$defaults$re2;
  instance.interceptors.request.use(function (config) {
    requestLogger(config);
    return config;
  }, function (error) {
    requestLogger(error);
    return Promise.reject(error);
  });
  instance.interceptors.response.use(function (response) {
    // we don't need to do anything here
    responseLogger(response);
    return response;
  }, function (error) {
    var response = error.response;
    var config = error.config;
    responseLogger(error); // Do not retry if it is disabled or no request config exists (not an axios error)

    if (!config || !instance.defaults.retryOnError) {
      return Promise.reject(error);
    }

    var retryErrorType = null;
    var wait = 0; // Errors without response did not recieve anything from the server

    if (!response) {
      retryErrorType = 'Connection';
      networkErrorAttempts++;

      if (networkErrorAttempts > maxRetry) {
        error.attempts = networkErrorAttempts;
        return Promise.reject(error);
      }

      wait = Math.pow(Math.SQRT2, networkErrorAttempts);
      response = {};
    } else {
      networkErrorAttempts = 0;
    }

    if (response.status >= 500 && response.status < 600) {
      // 5** errors are server related
      retryErrorType = "Server ".concat(response.status);
      var headers = response.headers || {};
      var requestId = headers['x-contentful-request-id'] || null;
      attempts[requestId] = attempts[requestId] || 0;
      attempts[requestId]++; // we reject if there are too many errors with the same request id or request id is not defined

      if (attempts[requestId] > maxRetry || !requestId) {
        error.attempts = attempts[requestId];
        return Promise.reject(error);
      }

      wait = Math.pow(Math.SQRT2, attempts[requestId]);
    } else if (response.status === 429) {
      // 429 errors are exceeded rate limit exceptions
      retryErrorType = 'Rate limit'; // all headers are lowercased by axios https://github.com/mzabriskie/axios/issues/413

      if (response.headers && error.response.headers['x-contentful-ratelimit-reset']) {
        wait = response.headers['x-contentful-ratelimit-reset'];
      }
    }

    if (retryErrorType) {
      // convert to ms and add jitter
      wait = Math.floor(wait * 1000 + Math.random() * 200 + 500);
      instance.defaults.logHandler('warning', "".concat(retryErrorType, " error occurred. Waiting for ").concat(wait, " ms before retrying..."));
      /* Somehow between the interceptor and retrying the request the httpAgent/httpsAgent gets transformed from an Agent-like object
       to a regular object, causing failures on retries after rate limits. Removing these properties here fixes the error, but retry
       requests still use the original http/httpsAgent property */

      delete config.httpAgent;
      delete config.httpsAgent;
      return delay(wait).then(function () {
        return instance(config);
      });
    }

    return Promise.reject(error);
  });
}

function asyncToken(instance, getToken) {
  instance.interceptors.request.use(function (config) {
    return getToken().then(function (accessToken) {
      config.headers = _objectSpread2(_objectSpread2({}, config.headers), {}, {
        Authorization: "Bearer ".concat(accessToken)
      });
      return config;
    });
  });
}

function isNode() {
  /**
   * Polyfills of 'process' might set process.browser === true
   *
   * See:
   * https://github.com/webpack/node-libs-browser/blob/master/mock/process.js#L8
   * https://github.com/defunctzombie/node-process/blob/master/browser.js#L156
   **/
  return typeof process !== 'undefined' && !process.browser;
}
function isReactNative() {
  return typeof window !== 'undefined' && 'navigator' in window && 'product' in window.navigator && window.navigator.product === 'ReactNative';
}
function getNodeVersion() {
  return process.versions && process.versions.node ? "v".concat(process.versions.node) : process.version;
}
function getWindow() {
  return window;
}

// Also enforces toplevel domain specified, no spaces and no protocol

var HOST_REGEX = /^(?!\w+:\/\/)([^\s:]+\.?[^\s:]+)(?::(\d+))?(?!:)$/;
/**
 * Create pre configured axios instance
 * @private
 * @param {AxiosStatic} axios - Axios library
 * @param {CreateHttpClientParams} options - Initialization parameters for the HTTP client
 * @return {ContentfulAxiosInstance} Initialized axios instance
 */

function createHttpClient(axios, options) {
  var defaultConfig = {
    insecure: false,
    retryOnError: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logHandler: function logHandler(level, data) {
      if (level === 'error' && data) {
        var title = [data.name, data.message].filter(function (a) {
          return a;
        }).join(' - ');
        console.error("[error] ".concat(title));
        console.error(data);
        return;
      }

      console.log("[".concat(level, "] ").concat(data));
    },
    // Passed to axios
    headers: {},
    httpAgent: false,
    httpsAgent: false,
    timeout: 30000,
    proxy: false,
    basePath: '',
    adapter: undefined,
    maxContentLength: 1073741824,
    // 1GB
    maxBodyLength: 1073741824 // 1GB

  };

  var config = _objectSpread2(_objectSpread2({}, defaultConfig), options);

  if (!config.accessToken) {
    var missingAccessTokenError = new TypeError('Expected parameter accessToken');
    config.logHandler('error', missingAccessTokenError);
    throw missingAccessTokenError;
  } // Construct axios baseURL option


  var protocol = config.insecure ? 'http' : 'https';
  var space = config.space ? "".concat(config.space, "/") : '';
  var hostname = config.defaultHostname;
  var port = config.insecure ? 80 : 443;

  if (config.host && HOST_REGEX.test(config.host)) {
    var parsed = config.host.split(':');

    if (parsed.length === 2) {

      var _parsed = _slicedToArray(parsed, 2);

      hostname = _parsed[0];
      port = _parsed[1];
    } else {
      hostname = parsed[0];
    }
  } // Ensure that basePath does start but not end with a slash


  if (config.basePath) {
    config.basePath = "/".concat(config.basePath.split('/').filter(Boolean).join('/'));
  }

  var baseURL = options.baseURL || "".concat(protocol, "://").concat(hostname, ":").concat(port).concat(config.basePath, "/spaces/").concat(space);

  if (!config.headers.Authorization && typeof config.accessToken !== 'function') {
    config.headers.Authorization = 'Bearer ' + config.accessToken;
  } // Set these headers only for node because browsers don't like it when you
  // override user-agent or accept-encoding.
  // The SDKs should set their own X-Contentful-User-Agent.


  if (isNode()) {
    config.headers['user-agent'] = 'node.js/' + getNodeVersion();
    config.headers['Accept-Encoding'] = 'gzip';
  }

  var axiosOptions = {
    // Axios
    baseURL: baseURL,
    headers: config.headers,
    httpAgent: config.httpAgent,
    httpsAgent: config.httpsAgent,
    paramsSerializer: qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify,
    proxy: config.proxy,
    timeout: config.timeout,
    adapter: config.adapter,
    maxContentLength: config.maxContentLength,
    maxBodyLength: config.maxBodyLength,
    // Contentful
    logHandler: config.logHandler,
    responseLogger: config.responseLogger,
    requestLogger: config.requestLogger,
    retryOnError: config.retryOnError
  };
  var instance = axios.create(axiosOptions);
  instance.httpClientParams = options;
  /**
   * Creates a new axios instance with the same default base parameters as the
   * current one, and with any overrides passed to the newParams object
   * This is useful as the SDKs use dependency injection to get the axios library
   * and the version of the library comes from different places depending
   * on whether it's a browser build or a node.js build.
   * @private
   * @param {CreateHttpClientParams} httpClientParams - Initialization parameters for the HTTP client
   * @return {ContentfulAxiosInstance} Initialized axios instance
   */

  instance.cloneWithNewParams = function (newParams) {
    return createHttpClient(axios, _objectSpread2(_objectSpread2({}, fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(options)), newParams));
  };
  /**
   * Apply interceptors.
   * Please note that the order of interceptors is important
   */


  if (config.onBeforeRequest) {
    instance.interceptors.request.use(config.onBeforeRequest);
  }

  if (typeof config.accessToken === 'function') {
    asyncToken(instance, config.accessToken);
  }

  rateLimit(instance, config.retryLimit);

  if (config.onError) {
    instance.interceptors.response.use(function (response) {
      return response;
    }, config.onError);
  }

  return instance;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates request parameters configuration by parsing an existing query object
 * @private
 * @param {Object} query
 * @return {Object} Config object with `params` property, ready to be used in axios
 */
function createRequestConfig(_ref) {
  var query = _ref.query;
  var config = {};
  delete query.resolveLinks;
  config.params = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(query);
  return config;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enforceObjPath(obj, path) {
  if (!(path in obj)) {
    var err = new Error();
    err.name = 'PropertyMissing';
    err.message = "Required property ".concat(path, " missing from:\n\n").concat(JSON.stringify(obj), "\n\n");
    throw err;
  }

  return true;
}

// copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);

  var _iterator = _createForOfIteratorHelper(propNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      // @ts-expect-error
      var value = object[name];

      if (value && _typeof(value) === 'object') {
        deepFreeze(value);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Object.freeze(object);
}

function freezeSys(obj) {
  // @ts-expect-error
  deepFreeze(obj.sys || {});
  return obj;
}

function getBrowserOS() {
  var win = getWindow();

  if (!win) {
    return null;
  }

  var userAgent = win.navigator.userAgent;
  var platform = win.navigator.platform;
  var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  var os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function getNodeOS() {
  var os = Object(os__WEBPACK_IMPORTED_MODULE_2__["platform"])() || 'linux';
  var version = Object(os__WEBPACK_IMPORTED_MODULE_2__["release"])() || '0.0.0';
  var osMap = {
    android: 'Android',
    aix: 'Linux',
    darwin: 'macOS',
    freebsd: 'Linux',
    linux: 'Linux',
    openbsd: 'Linux',
    sunos: 'Linux',
    win32: 'Windows'
  };

  if (os in osMap) {
    // @ts-expect-error
    return "".concat(osMap[os] || 'Linux', "/").concat(version);
  }

  return null;
}

function getUserAgentHeader(sdk, application, integration, feature) {
  var headerParts = [];

  if (application) {
    headerParts.push("app ".concat(application));
  }

  if (integration) {
    headerParts.push("integration ".concat(integration));
  }

  if (feature) {
    headerParts.push('feature ' + feature);
  }

  headerParts.push("sdk ".concat(sdk));
  var os = null;

  try {
    if (isReactNative()) {
      os = getBrowserOS();
      headerParts.push('platform ReactNative');
    } else if (isNode()) {
      os = getNodeOS();
      headerParts.push("platform node.js/".concat(getNodeVersion()));
    } else {
      os = getBrowserOS();
      headerParts.push('platform browser');
    }
  } catch (e) {
    os = null;
  }

  if (os) {
    headerParts.push("os ".concat(os));
  }

  return "".concat(headerParts.filter(function (item) {
    return item !== '';
  }).join('; '), ";");
}

/**
 * Mixes in a method to return just a plain object with no additional methods
 * @private
 * @param data - Any plain JSON response returned from the API
 * @return Enhanced object with toPlainObject method
 */

function toPlainObject(data) {
  return Object.defineProperty(data, 'toPlainObject', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function value() {
      return fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(this);
    }
  });
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/core-js/es6/symbol.js":
/*!*********************************************!*\
  !*** ../node_modules/core-js/es6/symbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ "../node_modules/core-js/modules/es6.symbol.js");
__webpack_require__(/*! ../modules/es6.object.to-string */ "../node_modules/core-js/modules/es6.object.to-string.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "../node_modules/core-js/modules/_core.js").Symbol;


/***/ }),

/***/ "../node_modules/core-js/fn/array/from.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/fn/array/from.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "../node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "../node_modules/core-js/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "../node_modules/core-js/modules/_core.js").Array.from;


/***/ }),

/***/ "../node_modules/core-js/fn/object/assign.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/fn/object/assign.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "../node_modules/core-js/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "../node_modules/core-js/modules/_core.js").Object.assign;


/***/ }),

/***/ "../node_modules/core-js/fn/promise.js":
/*!*********************************************!*\
  !*** ../node_modules/core-js/fn/promise.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "../node_modules/core-js/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "../node_modules/core-js/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "../node_modules/core-js/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "../node_modules/core-js/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "../node_modules/core-js/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "../node_modules/core-js/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "../node_modules/core-js/modules/_core.js").Promise;


/***/ }),

/***/ "../node_modules/core-js/fn/symbol/async-iterator.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js/fn/symbol/async-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "../node_modules/core-js/modules/es7.symbol.async-iterator.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "../node_modules/core-js/modules/_wks-ext.js").f('asyncIterator');


/***/ }),

/***/ "../node_modules/core-js/modules/_a-function.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js/modules/_add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_an-instance.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_an-object.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_array-includes.js":
/*!**********************************************************!*\
  !*** ../node_modules/core-js/modules/_array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "../node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "../node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_classof.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "../node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_cof.js":
/*!***********************************************!*\
  !*** ../node_modules/core-js/modules/_cof.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_core.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/modules/_core.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "../node_modules/core-js/modules/_create-property.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js/modules/_create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "../node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_ctx.js":
/*!***********************************************!*\
  !*** ../node_modules/core-js/modules/_ctx.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "../node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_defined.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_defined.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_descriptors.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../node_modules/core-js/modules/_dom-create.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_dom-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "../node_modules/core-js/modules/_enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/_enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "../node_modules/core-js/modules/_enum-keys.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_enum-keys.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "../node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "../node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "../node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_export.js":
/*!**************************************************!*\
  !*** ../node_modules/core-js/modules/_export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "../node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "../node_modules/core-js/modules/_fails.js":
/*!*************************************************!*\
  !*** ../node_modules/core-js/modules/_fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "../node_modules/core-js/modules/_for-of.js":
/*!**************************************************!*\
  !*** ../node_modules/core-js/modules/_for-of.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "../node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "../node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "../node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "../node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "../node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "../node_modules/core-js/modules/_function-to-string.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js/modules/_function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "../node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "../node_modules/core-js/modules/_global.js":
/*!**************************************************!*\
  !*** ../node_modules/core-js/modules/_global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "../node_modules/core-js/modules/_has.js":
/*!***********************************************!*\
  !*** ../node_modules/core-js/modules/_has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_hide.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/modules/_hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "../node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_html.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/modules/_html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "../node_modules/core-js/modules/_ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ../node_modules/core-js/modules/_ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "../node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "../node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../node_modules/core-js/modules/_invoke.js":
/*!**************************************************!*\
  !*** ../node_modules/core-js/modules/_invoke.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iobject.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_iobject.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "../node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_is-array-iter.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/_is-array-iter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "../node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_is-array.js":
/*!****************************************************!*\
  !*** ../node_modules/core-js/modules/_is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "../node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "../node_modules/core-js/modules/_is-object.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iter-call.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_iter-call.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iter-create.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_iter-create.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "../node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "../node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iter-define.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_iter-define.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "../node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "../node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "../node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "../node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iter-detect.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_iter-detect.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iter-step.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_iter-step.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_iterators.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../node_modules/core-js/modules/_library.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_library.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "../node_modules/core-js/modules/_meta.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/modules/_meta.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "../node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "../node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "../node_modules/core-js/modules/_microtask.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "../node_modules/core-js/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "../node_modules/core-js/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_new-promise-capability.js":
/*!******************************************************************!*\
  !*** ../node_modules/core-js/modules/_new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "../node_modules/core-js/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-assign.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/_object-assign.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "../node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "../node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "../node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "../node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "../node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "../node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "../node_modules/core-js/modules/_object-create.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/_object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "../node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "../node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "../node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-dp.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_object-dp.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "../node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-dps.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-dps.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "../node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-gopd.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-gopd.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "../node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "../node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "../node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-gopn-ext.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js/modules/_object-gopn-ext.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "../node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-gopn.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-gopn.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "../node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-gops.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-gops.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../node_modules/core-js/modules/_object-gpo.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-gpo.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "../node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-keys-internal.js":
/*!****************************************************************!*\
  !*** ../node_modules/core-js/modules/_object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "../node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "../node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-keys.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "../node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "../node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_object-pie.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_object-pie.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "../node_modules/core-js/modules/_perform.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "../node_modules/core-js/modules/_promise-resolve.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js/modules/_promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "../node_modules/core-js/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_property-desc.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/_property-desc.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_redefine-all.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js/modules/_redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "../node_modules/core-js/modules/_redefine.js":
/*!****************************************************!*\
  !*** ../node_modules/core-js/modules/_redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "../node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "../node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "../node_modules/core-js/modules/_set-species.js":
/*!*******************************************************!*\
  !*** ../node_modules/core-js/modules/_set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../node_modules/core-js/modules/_set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js/modules/_set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "../node_modules/core-js/modules/_shared-key.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "../node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "../node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../node_modules/core-js/modules/_shared.js":
/*!**************************************************!*\
  !*** ../node_modules/core-js/modules/_shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "../node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "../node_modules/core-js/modules/_species-constructor.js":
/*!***************************************************************!*\
  !*** ../node_modules/core-js/modules/_species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "../node_modules/core-js/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_string-at.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_string-at.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "../node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "../node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "../node_modules/core-js/modules/_task.js":
/*!************************************************!*\
  !*** ../node_modules/core-js/modules/_task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "../node_modules/core-js/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "../node_modules/core-js/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "../node_modules/core-js/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "../node_modules/core-js/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "../node_modules/core-js/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-absolute-index.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js/modules/_to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "../node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-integer.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-iobject.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_to-iobject.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "../node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "../node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-length.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "../node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-object.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/_to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "../node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "../node_modules/core-js/modules/_to-primitive.js":
/*!********************************************************!*\
  !*** ../node_modules/core-js/modules/_to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../node_modules/core-js/modules/_uid.js":
/*!***********************************************!*\
  !*** ../node_modules/core-js/modules/_uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "../node_modules/core-js/modules/_user-agent.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_user-agent.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "../node_modules/core-js/modules/_wks-define.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/_wks-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "../node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "../node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "../node_modules/core-js/modules/_wks-ext.js":
/*!***************************************************!*\
  !*** ../node_modules/core-js/modules/_wks-ext.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "../node_modules/core-js/modules/_wks.js":
/*!***********************************************!*\
  !*** ../node_modules/core-js/modules/_wks.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "../node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "../node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "../node_modules/core-js/modules/core.get-iterator-method.js":
/*!*******************************************************************!*\
  !*** ../node_modules/core-js/modules/core.get-iterator-method.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "../node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "../node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../node_modules/core-js/modules/es6.array.from.js":
/*!*********************************************************!*\
  !*** ../node_modules/core-js/modules/es6.array.from.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "../node_modules/core-js/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "../node_modules/core-js/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "../node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "../node_modules/core-js/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "../node_modules/core-js/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "../node_modules/core-js/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "../node_modules/core-js/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "../node_modules/core-js/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "../node_modules/core-js/modules/es6.array.iterator.js":
/*!*************************************************************!*\
  !*** ../node_modules/core-js/modules/es6.array.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "../node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "../node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "../node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "../node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "../node_modules/core-js/modules/es6.object.assign.js":
/*!************************************************************!*\
  !*** ../node_modules/core-js/modules/es6.object.assign.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "../node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "../node_modules/core-js/modules/es6.object.to-string.js":
/*!***************************************************************!*\
  !*** ../node_modules/core-js/modules/es6.object.to-string.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "../node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "../node_modules/core-js/modules/es6.promise.js":
/*!******************************************************!*\
  !*** ../node_modules/core-js/modules/es6.promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "../node_modules/core-js/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "../node_modules/core-js/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "../node_modules/core-js/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "../node_modules/core-js/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "../node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "../node_modules/core-js/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../node_modules/core-js/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "../node_modules/core-js/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "../node_modules/core-js/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "../node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "../node_modules/core-js/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "../node_modules/core-js/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "../node_modules/core-js/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "../node_modules/core-js/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "../node_modules/core-js/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "../node_modules/core-js/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "../node_modules/core-js/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "../node_modules/core-js/modules/es6.string.iterator.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js/modules/es6.string.iterator.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "../node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "../node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "../node_modules/core-js/modules/es6.symbol.js":
/*!*****************************************************!*\
  !*** ../node_modules/core-js/modules/es6.symbol.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "../node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "../node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "../node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "../node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "../node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "../node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "../node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "../node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "../node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "../node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "../node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "../node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "../node_modules/core-js/modules/_is-object.js");
var toObject = __webpack_require__(/*! ./_to-object */ "../node_modules/core-js/modules/_to-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "../node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "../node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "../node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "../node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "../node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "../node_modules/core-js/modules/_object-gopd.js");
var $GOPS = __webpack_require__(/*! ./_object-gops */ "../node_modules/core-js/modules/_object-gops.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "../node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "../node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "../node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "../node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "../node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "../node_modules/core-js/modules/es7.promise.finally.js":
/*!**************************************************************!*\
  !*** ../node_modules/core-js/modules/es7.promise.finally.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "../node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "../node_modules/core-js/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "../node_modules/core-js/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "../node_modules/core-js/modules/es7.promise.try.js":
/*!**********************************************************!*\
  !*** ../node_modules/core-js/modules/es7.promise.try.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "../node_modules/core-js/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "../node_modules/core-js/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "../node_modules/core-js/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "../node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!********************************************************************!*\
  !*** ../node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "../node_modules/core-js/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "../node_modules/core-js/modules/web.dom.iterable.js":
/*!***********************************************************!*\
  !*** ../node_modules/core-js/modules/web.dom.iterable.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "../node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "../node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "../node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "../node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "../node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "../node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "../node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "../node_modules/fast-copy/dist/fast-copy.js":
/*!***************************************************!*\
  !*** ../node_modules/fast-copy/dist/fast-copy.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  var toStringFunction = Function.prototype.toString;
  var create = Object.create, defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getPrototypeOf = Object.getPrototypeOf;
  var _a = Object.prototype, hasOwnProperty = _a.hasOwnProperty, propertyIsEnumerable = _a.propertyIsEnumerable;
  /**
   * @enum
   *
   * @const {Object} SUPPORTS
   *
   * @property {boolean} SYMBOL_PROPERTIES are symbol properties supported
   * @property {boolean} WEAKMAP is WeakMap supported
   */
  var SUPPORTS = {
      SYMBOL_PROPERTIES: typeof getOwnPropertySymbols === 'function',
      WEAKMAP: typeof WeakMap === 'function',
  };
  /**
   * @function createCache
   *
   * @description
   * get a new cache object to prevent circular references
   *
   * @returns the new cache object
   */
  var createCache = function () {
      if (SUPPORTS.WEAKMAP) {
          return new WeakMap();
      }
      // tiny implementation of WeakMap
      var object = create({
          has: function (key) { return !!~object._keys.indexOf(key); },
          set: function (key, value) {
              object._keys.push(key);
              object._values.push(value);
          },
          get: function (key) { return object._values[object._keys.indexOf(key)]; },
      });
      object._keys = [];
      object._values = [];
      return object;
  };
  /**
   * @function getCleanClone
   *
   * @description
   * get an empty version of the object with the same prototype it has
   *
   * @param object the object to build a clean clone from
   * @param realm the realm the object resides in
   * @returns the empty cloned object
   */
  var getCleanClone = function (object, realm) {
      if (!object.constructor) {
          return create(null);
      }
      var Constructor = object.constructor;
      var prototype = object.__proto__ || getPrototypeOf(object);
      if (Constructor === realm.Object) {
          return prototype === realm.Object.prototype ? {} : create(prototype);
      }
      if (~toStringFunction.call(Constructor).indexOf('[native code]')) {
          try {
              return new Constructor();
          }
          catch (_a) { }
      }
      return create(prototype);
  };
  /**
   * @function getObjectCloneLoose
   *
   * @description
   * get a copy of the object based on loose rules, meaning all enumerable keys
   * and symbols are copied, but property descriptors are not considered
   *
   * @param object the object to clone
   * @param realm the realm the object resides in
   * @param handleCopy the function that handles copying the object
   * @returns the copied object
   */
  var getObjectCloneLoose = function (object, realm, handleCopy, cache) {
      var clone = getCleanClone(object, realm);
      // set in the cache immediately to be able to reuse the object recursively
      cache.set(object, clone);
      for (var key in object) {
          if (hasOwnProperty.call(object, key)) {
              clone[key] = handleCopy(object[key], cache);
          }
      }
      if (SUPPORTS.SYMBOL_PROPERTIES) {
          var symbols = getOwnPropertySymbols(object);
          var length_1 = symbols.length;
          if (length_1) {
              for (var index = 0, symbol = void 0; index < length_1; index++) {
                  symbol = symbols[index];
                  if (propertyIsEnumerable.call(object, symbol)) {
                      clone[symbol] = handleCopy(object[symbol], cache);
                  }
              }
          }
      }
      return clone;
  };
  /**
   * @function getObjectCloneStrict
   *
   * @description
   * get a copy of the object based on strict rules, meaning all keys and symbols
   * are copied based on the original property descriptors
   *
   * @param object the object to clone
   * @param realm the realm the object resides in
   * @param handleCopy the function that handles copying the object
   * @returns the copied object
   */
  var getObjectCloneStrict = function (object, realm, handleCopy, cache) {
      var clone = getCleanClone(object, realm);
      // set in the cache immediately to be able to reuse the object recursively
      cache.set(object, clone);
      var properties = SUPPORTS.SYMBOL_PROPERTIES
          ? getOwnPropertyNames(object).concat(getOwnPropertySymbols(object))
          : getOwnPropertyNames(object);
      var length = properties.length;
      if (length) {
          for (var index = 0, property = void 0, descriptor = void 0; index < length; index++) {
              property = properties[index];
              if (property !== 'callee' && property !== 'caller') {
                  descriptor = getOwnPropertyDescriptor(object, property);
                  if (descriptor) {
                      // Only clone the value if actually a value, not a getter / setter.
                      if (!descriptor.get && !descriptor.set) {
                          descriptor.value = handleCopy(object[property], cache);
                      }
                      try {
                          defineProperty(clone, property, descriptor);
                      }
                      catch (error) {
                          // Tee above can fail on node in edge cases, so fall back to the loose assignment.
                          clone[property] = descriptor.value;
                      }
                  }
                  else {
                      // In extra edge cases where the property descriptor cannot be retrived, fall back to
                      // the loose assignment.
                      clone[property] = handleCopy(object[property], cache);
                  }
              }
          }
      }
      return clone;
  };
  /**
   * @function getRegExpFlags
   *
   * @description
   * get the flags to apply to the copied regexp
   *
   * @param regExp the regexp to get the flags of
   * @returns the flags for the regexp
   */
  var getRegExpFlags = function (regExp) {
      var flags = '';
      if (regExp.global) {
          flags += 'g';
      }
      if (regExp.ignoreCase) {
          flags += 'i';
      }
      if (regExp.multiline) {
          flags += 'm';
      }
      if (regExp.unicode) {
          flags += 'u';
      }
      if (regExp.sticky) {
          flags += 'y';
      }
      return flags;
  };

  // utils
  var isArray = Array.isArray;
  var GLOBAL_THIS = (function () {
      if (typeof self !== 'undefined') {
          return self;
      }
      if (typeof window !== 'undefined') {
          return window;
      }
      if (typeof global !== 'undefined') {
          return global;
      }
      if (console && console.error) {
          console.error('Unable to locate global object, returning "this".');
      }
  })();
  /**
   * @function copy
   *
   * @description
   * copy an object deeply as much as possible
   *
   * If `strict` is applied, then all properties (including non-enumerable ones)
   * are copied with their original property descriptors on both objects and arrays.
   *
   * The object is compared to the global constructors in the `realm` provided,
   * and the native constructor is always used to ensure that extensions of native
   * objects (allows in ES2015+) are maintained.
   *
   * @param object the object to copy
   * @param [options] the options for copying with
   * @param [options.isStrict] should the copy be strict
   * @param [options.realm] the realm (this) object the object is copied from
   * @returns the copied object
   */
  function copy(object, options) {
      // manually coalesced instead of default parameters for performance
      var isStrict = !!(options && options.isStrict);
      var realm = (options && options.realm) || GLOBAL_THIS;
      var getObjectClone = isStrict
          ? getObjectCloneStrict
          : getObjectCloneLoose;
      /**
       * @function handleCopy
       *
       * @description
       * copy the object recursively based on its type
       *
       * @param object the object to copy
       * @returns the copied object
       */
      var handleCopy = function (object, cache) {
          if (!object || typeof object !== 'object') {
              return object;
          }
          if (cache.has(object)) {
              return cache.get(object);
          }
          var Constructor = object.constructor;
          // plain objects
          if (Constructor === realm.Object) {
              return getObjectClone(object, realm, handleCopy, cache);
          }
          var clone;
          // arrays
          if (isArray(object)) {
              // if strict, include non-standard properties
              if (isStrict) {
                  return getObjectCloneStrict(object, realm, handleCopy, cache);
              }
              var length_1 = object.length;
              clone = new Constructor();
              cache.set(object, clone);
              for (var index = 0; index < length_1; index++) {
                  clone[index] = handleCopy(object[index], cache);
              }
              return clone;
          }
          // dates
          if (object instanceof realm.Date) {
              return new Constructor(object.getTime());
          }
          // regexps
          if (object instanceof realm.RegExp) {
              clone = new Constructor(object.source, object.flags || getRegExpFlags(object));
              clone.lastIndex = object.lastIndex;
              return clone;
          }
          // maps
          if (realm.Map && object instanceof realm.Map) {
              clone = new Constructor();
              cache.set(object, clone);
              object.forEach(function (value, key) {
                  clone.set(key, handleCopy(value, cache));
              });
              return clone;
          }
          // sets
          if (realm.Set && object instanceof realm.Set) {
              clone = new Constructor();
              cache.set(object, clone);
              object.forEach(function (value) {
                  clone.add(handleCopy(value, cache));
              });
              return clone;
          }
          // blobs
          if (realm.Blob && object instanceof realm.Blob) {
              return object.slice(0, object.size, object.type);
          }
          // buffers (node-only)
          if (realm.Buffer && realm.Buffer.isBuffer(object)) {
              clone = realm.Buffer.allocUnsafe
                  ? realm.Buffer.allocUnsafe(object.length)
                  : new Constructor(object.length);
              cache.set(object, clone);
              object.copy(clone);
              return clone;
          }
          // arraybuffers / dataviews
          if (realm.ArrayBuffer) {
              // dataviews
              if (realm.ArrayBuffer.isView(object)) {
                  clone = new Constructor(object.buffer.slice(0));
                  cache.set(object, clone);
                  return clone;
              }
              // arraybuffers
              if (object instanceof realm.ArrayBuffer) {
                  clone = object.slice(0);
                  cache.set(object, clone);
                  return clone;
              }
          }
          // if the object cannot / should not be cloned, don't
          if (
          // promise-like
          typeof object.then === 'function' ||
              // errors
              object instanceof Error ||
              // weakmaps
              (realm.WeakMap && object instanceof realm.WeakMap) ||
              // weaksets
              (realm.WeakSet && object instanceof realm.WeakSet)) {
              return object;
          }
          // assume anything left is a custom constructor
          return getObjectClone(object, realm, handleCopy, cache);
      };
      return handleCopy(object, createCache());
  }
  // Adding reference to allow usage in CommonJS libraries compiled using TSC, which
  // expects there to be a default property on the exported object. See
  // [#37](https://github.com/planttheidea/fast-copy/issues/37) for details.
  copy.default = copy;
  /**
   * @function strictCopy
   *
   * @description
   * copy the object with `strict` option pre-applied
   *
   * @param object the object to copy
   * @param [options] the options for copying with
   * @param [options.realm] the realm (this) object the object is copied from
   * @returns the copied object
   */
  copy.strict = function strictCopy(object, options) {
      return copy(object, {
          isStrict: true,
          realm: options ? options.realm : void 0,
      });
  };

  return copy;

})));
//# sourceMappingURL=fast-copy.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/function-bind/implementation.js":
/*!*******************************************************!*\
  !*** ../node_modules/function-bind/implementation.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "../node_modules/function-bind/index.js":
/*!**********************************************!*\
  !*** ../node_modules/function-bind/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "../node_modules/get-intrinsic/index.js":
/*!**********************************************!*\
  !*** ../node_modules/get-intrinsic/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "../node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "../node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "../node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "../node_modules/has-symbols/index.js":
/*!********************************************!*\
  !*** ../node_modules/has-symbols/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "../node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "../node_modules/has-symbols/shams.js":
/*!********************************************!*\
  !*** ../node_modules/has-symbols/shams.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "../node_modules/has/src/index.js":
/*!****************************************!*\
  !*** ../node_modules/has/src/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "../node_modules/lodash.isplainobject/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/lodash.isplainobject/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),

/***/ "../node_modules/object-inspect/index.js":
/*!***********************************************!*\
  !*** ../node_modules/object-inspect/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

var inspectCustom = __webpack_require__(/*! ./util.inspect */ 1).custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;
var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol' ? Symbol.toStringTag : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') {
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = symToString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr(obj).slice(8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        var syms = gOPS(obj);
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}


/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/qs/lib/formats.js":
/*!*****************************************!*\
  !*** ../node_modules/qs/lib/formats.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};


/***/ }),

/***/ "../node_modules/qs/lib/index.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "../node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "../node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "../node_modules/qs/lib/parse.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/parse.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "../node_modules/qs/lib/stringify.js":
/*!*******************************************!*\
  !*** ../node_modules/qs/lib/stringify.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getSideChannel = __webpack_require__(/*! side-channel */ "../node_modules/side-channel/index.js");
var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    if (sideChannel.has(object)) {
        throw new RangeError('Cyclic object value');
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, true);
        var valueSideChannel = getSideChannel();
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "../node_modules/qs/lib/utils.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};


/***/ }),

/***/ "../node_modules/side-channel/index.js":
/*!*********************************************!*\
  !*** ../node_modules/side-channel/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/get-intrinsic/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "../node_modules/call-bind/callBound.js");
var inspect = __webpack_require__(/*! object-inspect */ "../node_modules/object-inspect/index.js");

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./adapters/REST/endpoints/api-key.ts":
/*!********************************************!*\
  !*** ./adapters/REST/endpoints/api-key.ts ***!
  \********************************************/
/*! exports provided: get, getMany, create, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/api_keys/").concat(params.apiKeyId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/api_keys"), {
    params: params.query
  });
};
var create = function create(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/api_keys"), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/spaces/".concat(params.spaceId, "/api_keys/").concat(params.apiKeyId), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(rawData);

  if ('accessToken' in data) {
    delete data.accessToken;
  }

  if ('preview_api_key' in data) {
    delete data.preview_api_key;
  }

  if ('policies' in data) {
    delete data.policies;
  }

  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/spaces/".concat(params.spaceId, "/api_keys/").concat(params.apiKeyId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, "/spaces/".concat(params.spaceId, "/api_keys/").concat(params.apiKeyId));
};

/***/ }),

/***/ "./adapters/REST/endpoints/app-bundle.ts":
/*!***********************************************!*\
  !*** ./adapters/REST/endpoints/app-bundle.ts ***!
  \***********************************************/
/*! exports provided: get, getMany, del, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");



var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/app_definitions/").concat(params.appDefinitionId, "/app_bundles");
};

var getAppBundleUrl = function getAppBundleUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.appBundleId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppBundleUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, getAppBundleUrl(params));
};
var create = function create(http, params, payload) {
  var appUploadId = payload.appUploadId,
      comment = payload.comment;
  var data = {
    upload: {
      sys: {
        type: 'Link',
        linkType: 'AppUpload',
        id: appUploadId
      }
    },
    comment: comment
  };
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, getBaseUrl(params), data);
};

/***/ }),

/***/ "./adapters/REST/endpoints/app-definition.ts":
/*!***************************************************!*\
  !*** ./adapters/REST/endpoints/app-definition.ts ***!
  \***************************************************/
/*! exports provided: getAppDefinitionUrl, get, getMany, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppDefinitionUrl", function() { return getAppDefinitionUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/app_definitions");
};

var getAppDefinitionUrl = function getAppDefinitionUrl(params) {
  return getBaseUrl(params) + "/".concat(params.appDefinitionId);
};
var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppDefinitionUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
var create = function create(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, getBaseUrl(params), data);
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, getAppDefinitionUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, getAppDefinitionUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/app-installation.ts":
/*!*****************************************************!*\
  !*** ./adapters/REST/endpoints/app-installation.ts ***!
  \*****************************************************/
/*! exports provided: getAppInstallationUrl, get, getMany, upsert, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppInstallationUrl", function() { return getAppInstallationUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upsert", function() { return upsert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/app_installations");
};

var getAppInstallationUrl = function getAppInstallationUrl(params) {
  return getBaseUrl(params) + "/".concat(params.appDefinitionId);
};
var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppInstallationUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var upsert = function upsert(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_2___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, getAppInstallationUrl(params), data, _objectSpread({}, headers));
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, getAppInstallationUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/app-upload.ts":
/*!***********************************************!*\
  !*** ./adapters/REST/endpoints/app-upload.ts ***!
  \***********************************************/
/*! exports provided: get, del, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _upload_http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../upload-http-client */ "./upload-http-client.ts");



var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/app_uploads");
};

var getAppUploadUrl = function getAppUploadUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.appUploadId);
};

var get = function get(http, params) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](httpUpload, getAppUploadUrl(params));
};
var del = function del(http, params) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](httpUpload, getAppUploadUrl(params));
};
var create = function create(http, params, payload) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  var file = payload.file;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](httpUpload, getBaseUrl(params), file, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/asset-key.ts":
/*!**********************************************!*\
  !*** ./adapters/REST/endpoints/asset-key.ts ***!
  \**********************************************/
/*! exports provided: ValidationError, create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationError", function() { return ValidationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var ASSET_KEY_MAX_LIFETIME = 48 * 60 * 60;
var ValidationError = /*#__PURE__*/function (_Error) {
  _inherits(ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError(name, message) {
    var _this;

    _classCallCheck(this, ValidationError);

    _this = _super.call(this, "Invalid \"".concat(name, "\" provided, ") + message);
    _this.name = 'ValidationError';
    return _this;
  }

  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var validateTimestamp = function validateTimestamp(name, timestamp, options) {
  options = options || {};

  if (typeof timestamp !== 'number') {
    throw new ValidationError(name, "only numeric values are allowed for timestamps, provided type was \"".concat(_typeof(timestamp), "\""));
  }

  if (options.maximum && timestamp > options.maximum) {
    throw new ValidationError(name, "value (".concat(timestamp, ") cannot be further in the future than expected maximum (").concat(options.maximum, ")"));
  }

  if (options.now && timestamp < options.now) {
    throw new ValidationError(name, "value (".concat(timestamp, ") cannot be in the past, current time was ").concat(options.now));
  }
};

var create = function create(http, params, data) {
  var expiresAt = data.expiresAt;
  var now = Math.floor(Date.now() / 1000);
  var currentMaxLifetime = now + ASSET_KEY_MAX_LIFETIME;
  validateTimestamp('expiresAt', expiresAt, {
    maximum: currentMaxLifetime,
    now: now
  });
  var postParams = {
    expiresAt: expiresAt
  };
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/asset_keys"), postParams);
};

/***/ }),

/***/ "./adapters/REST/endpoints/asset.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/asset.ts ***!
  \******************************************/
/*! exports provided: get, getMany, update, del, publish, unpublish, archive, unarchive, create, createWithId, createFromFiles, processForLocale, processForAllLocales */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpublish", function() { return unpublish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archive", function() { return archive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unarchive", function() { return unarchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFromFiles", function() { return createFromFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processForLocale", function() { return processForLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processForAllLocales", function() { return processForAllLocales; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../error-handler */ "./error-handler.ts");
/* harmony import */ var _upload_http_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../upload-http-client */ "./upload-http-client.ts");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./upload */ "./adapters/REST/endpoints/upload.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var get = function get(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeSelect"])(params.query),
    headers: _objectSpread({}, headers)
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeSelect"])(params.query)
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId));
};
var publish = function publish(http, params, rawData) {
  var _rawData$sys$version2;

  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/published"), null, {
    headers: {
      'X-Contentful-Version': (_rawData$sys$version2 = rawData.sys.version) !== null && _rawData$sys$version2 !== void 0 ? _rawData$sys$version2 : 0
    }
  });
};
var unpublish = function unpublish(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/published"));
};
var archive = function archive(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/archived"));
};
var unarchive = function unarchive(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId, "/archived"));
};
var create = function create(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_3__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets"), data);
};
var createWithId = function createWithId(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(params.assetId), data);
};
var createFromFiles = function createFromFiles(http, params, data) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_2__["getUploadHttpClient"])(http);
  var file = data.fields.file;
  return Promise.all(Object.keys(file).map(function (locale) {
    var _file$locale = file[locale],
        contentType = _file$locale.contentType,
        fileName = _file$locale.fileName;
    return Object(_upload__WEBPACK_IMPORTED_MODULE_4__["create"])(httpUpload, params, file[locale]).then(function (upload) {
      return _defineProperty({}, locale, {
        contentType: contentType,
        fileName: fileName,
        uploadFrom: {
          sys: {
            type: 'Link',
            linkType: 'Upload',
            id: upload.sys.id
          }
        }
      });
    });
  })).then(function (uploads) {
    var file = uploads.reduce(function (fieldsData, upload) {
      return _objectSpread(_objectSpread({}, fieldsData), upload);
    }, {});

    var asset = _objectSpread(_objectSpread({}, data), {}, {
      fields: _objectSpread(_objectSpread({}, data.fields), {}, {
        file: file
      })
    });

    return create(http, params, asset);
  })["catch"](_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
};
/**
 * Asset processing
 */

var ASSET_PROCESSING_CHECK_WAIT = 3000;
var ASSET_PROCESSING_CHECK_RETRIES = 10;

function checkIfAssetHasUrl(http, params, _ref2) {
  var resolve = _ref2.resolve,
      reject = _ref2.reject,
      locale = _ref2.locale,
      _ref2$processingCheck = _ref2.processingCheckWait,
      processingCheckWait = _ref2$processingCheck === void 0 ? ASSET_PROCESSING_CHECK_WAIT : _ref2$processingCheck,
      _ref2$processingCheck2 = _ref2.processingCheckRetries,
      processingCheckRetries = _ref2$processingCheck2 === void 0 ? ASSET_PROCESSING_CHECK_RETRIES : _ref2$processingCheck2,
      _ref2$checkCount = _ref2.checkCount,
      checkCount = _ref2$checkCount === void 0 ? 0 : _ref2$checkCount;
  return get(http, params).then(function (asset) {
    if (asset.fields.file[locale].url) {
      resolve(asset);
    } else if (checkCount === processingCheckRetries) {
      var error = new Error();
      error.name = 'AssetProcessingTimeout';
      error.message = 'Asset is taking longer then expected to process.';
      reject(error);
    } else {
      checkCount++;
      setTimeout(function () {
        return checkIfAssetHasUrl(http, params, {
          resolve: resolve,
          reject: reject,
          locale: locale,
          checkCount: checkCount,
          processingCheckWait: processingCheckWait,
          processingCheckRetries: processingCheckRetries
        });
      }, processingCheckWait);
    }
  });
}

var processForLocale = function processForLocale(http, _ref3) {
  var asset = _ref3.asset,
      locale = _ref3.locale,
      _ref3$options = _ref3.options;
  _ref3$options = _ref3$options === void 0 ? {} : _ref3$options;

  var processingCheckRetries = _ref3$options.processingCheckRetries,
      processingCheckWait = _ref3$options.processingCheckWait,
      params = _objectWithoutProperties(_ref3, ["asset", "locale", "options"]);

  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/assets/").concat(asset.sys.id, "/files/").concat(locale, "/process"), null, {
    headers: {
      'X-Contentful-Version': asset.sys.version
    }
  }).then(function () {
    return new Promise(function (resolve, reject) {
      return checkIfAssetHasUrl(http, {
        spaceId: params.spaceId,
        environmentId: params.environmentId,
        assetId: asset.sys.id
      }, {
        resolve: resolve,
        reject: reject,
        locale: locale,
        processingCheckWait: processingCheckWait,
        processingCheckRetries: processingCheckRetries
      });
    });
  });
};
var processForAllLocales = function processForAllLocales(http, _ref4) {
  var asset = _ref4.asset,
      _ref4$options = _ref4.options,
      options = _ref4$options === void 0 ? {} : _ref4$options,
      params = _objectWithoutProperties(_ref4, ["asset", "options"]);

  var locales = Object.keys(asset.fields.file || {});
  var mostUpToDateAssetVersion = asset; // Let all the locales process
  // Since they all resolve at different times,
  // we need to pick the last resolved value
  // to reflect the most recent state

  var allProcessingLocales = locales.map(function (locale) {
    return processForLocale(http, _objectSpread(_objectSpread({}, params), {}, {
      asset: asset,
      locale: locale,
      options: options
    })).then(function (result) {
      // Side effect of always setting the most up to date asset version
      // The last one to call this will be the last one that finished
      // and thus the most up to date
      mostUpToDateAssetVersion = result;
    });
  });
  return Promise.all(allProcessingLocales).then(function () {
    return mostUpToDateAssetVersion;
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/bulk-action.ts":
/*!************************************************!*\
  !*** ./adapters/REST/endpoints/bulk-action.ts ***!
  \************************************************/
/*! exports provided: get, publish, unpublish, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpublish", function() { return unpublish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/actions/").concat(params.bulkActionId));
};
var publish = function publish(http, params, payload) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/publish"), payload);
};
var unpublish = function unpublish(http, params, payload) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/unpublish"), payload);
};
var validate = function validate(http, params, payload) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/bulk_actions/validate"), payload);
};

/***/ }),

/***/ "./adapters/REST/endpoints/content-type.ts":
/*!*************************************************!*\
  !*** ./adapters/REST/endpoints/content-type.ts ***!
  \*************************************************/
/*! exports provided: get, getMany, create, createWithId, update, del, publish, unpublish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpublish", function() { return unpublish; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/content_types");
};

var getContentTypeUrl = function getContentTypeUrl(params) {
  return getBaseUrl(params) + "/".concat(params.contentTypeId);
};

var get = function get(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getContentTypeUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query),
    headers: headers
  });
};
var getMany = function getMany(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query,
    headers: headers
  });
};
var create = function create(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getContentTypeUrl(params), {
    headers: headers
  });
};
var publish = function publish(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params) + '/published', null, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version
    }, headers)
  });
};
var unpublish = function unpublish(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getContentTypeUrl(params) + '/published', {
    headers: headers
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/editor-interface.ts":
/*!*****************************************************!*\
  !*** ./adapters/REST/endpoints/editor-interface.ts ***!
  \*****************************************************/
/*! exports provided: get, getMany, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/content_types/").concat(params.contentTypeId, "/editor_interface");
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/editor_interfaces"));
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getBaseUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/entry.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/entry.ts ***!
  \******************************************/
/*! exports provided: get, getMany, patch, update, del, publish, unpublish, archive, unarchive, create, createWithId, references */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpublish", function() { return unpublish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "archive", function() { return archive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unarchive", function() { return unarchive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "references", function() { return references; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var get = function get(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query),
    headers: _objectSpread({}, headers)
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var patch = function patch(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["patch"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version,
      'Content-Type': 'application/json-patch+json'
    }, headers)
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId));
};
var publish = function publish(http, params, rawData) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/published"), null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version
    }
  });
};
var unpublish = function unpublish(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/published"));
};
var archive = function archive(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/archived"));
};
var unarchive = function unarchive(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/archived"));
};
var create = function create(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries"), data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
var createWithId = function createWithId(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId), data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
var references = function references(http, params) {
  var spaceId = params.spaceId,
      environmentId = params.environmentId,
      entryId = params.entryId,
      _params$maxDepth = params.maxDepth,
      maxDepth = _params$maxDepth === void 0 ? 2 : _params$maxDepth;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(spaceId, "/environments/").concat(environmentId, "/entries/").concat(entryId, "/references?include=").concat(maxDepth));
};

/***/ }),

/***/ "./adapters/REST/endpoints/environment-alias.ts":
/*!******************************************************!*\
  !*** ./adapters/REST/endpoints/environment-alias.ts ***!
  \******************************************************/
/*! exports provided: get, getMany, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Urls
 */

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environment_aliases");
};

var getEnvironmentAliasUrl = function getEnvironmentAliasUrl(params) {
  return getBaseUrl(params) + "/".concat(params.environmentAliasId);
};
/**
 * Endpoints
 */


var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEnvironmentAliasUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
var createWithId = function createWithId(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEnvironmentAliasUrl(params), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEnvironmentAliasUrl(params), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEnvironmentAliasUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/environment.ts":
/*!************************************************!*\
  !*** ./adapters/REST/endpoints/environment.ts ***!
  \************************************************/
/*! exports provided: get, getMany, update, del, create, createWithId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments"), {
    params: params.query
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId));
};
var create = function create(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, "/spaces/".concat(params.spaceId, "/environments"), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId), data, {
    headers: _objectSpread(_objectSpread({}, headers), params.sourceEnvironmentId ? {
      'X-Contentful-Source-Environment': params.sourceEnvironmentId
    } : {})
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/extension.ts":
/*!**********************************************!*\
  !*** ./adapters/REST/endpoints/extension.ts ***!
  \**********************************************/
/*! exports provided: getExtensionUrl, get, getMany, create, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtensionUrl", function() { return getExtensionUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/extensions");
};

var getExtensionUrl = function getExtensionUrl(params) {
  return getBaseUrl(params) + "/".concat(params.extensionId);
};
var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getExtensionUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getExtensionUrl(params), data, {
    headers: headers
  });
};
var update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(http, params, rawData, headers) {
    var _rawData$sys$version;

    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
            delete data.sys;
            return _context.abrupt("return", _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getExtensionUrl(params), data, {
              headers: _objectSpread({
                'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
              }, headers)
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function update(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getExtensionUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/http.ts":
/*!*****************************************!*\
  !*** ./adapters/REST/endpoints/http.ts ***!
  \*****************************************/
/*! exports provided: get, post, put, del, request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return put; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "request", function() { return request; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */

var get = function get(http, _ref) {
  var url = _ref.url,
      config = _ref.config;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, url, config);
};
var post = function post(http, _ref2, payload) {
  var url = _ref2.url,
      config = _ref2.config;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, url, payload, config);
};
var put = function put(http, _ref3, payload) {
  var url = _ref3.url,
      config = _ref3.config;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, url, payload, config);
};
var del = function del(http, _ref4) {
  var url = _ref4.url,
      config = _ref4.config;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, url, config);
};
var request = function request(http, _ref5) {
  var url = _ref5.url,
      config = _ref5.config;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["http"](http, url, config);
};

/***/ }),

/***/ "./adapters/REST/endpoints/index.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/index.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key */ "./adapters/REST/endpoints/api-key.ts");
/* harmony import */ var _app_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bundle */ "./adapters/REST/endpoints/app-bundle.ts");
/* harmony import */ var _app_definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-definition */ "./adapters/REST/endpoints/app-definition.ts");
/* harmony import */ var _app_installation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-installation */ "./adapters/REST/endpoints/app-installation.ts");
/* harmony import */ var _app_upload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-upload */ "./adapters/REST/endpoints/app-upload.ts");
/* harmony import */ var _asset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./asset */ "./adapters/REST/endpoints/asset.ts");
/* harmony import */ var _asset_key__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./asset-key */ "./adapters/REST/endpoints/asset-key.ts");
/* harmony import */ var _bulk_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bulk-action */ "./adapters/REST/endpoints/bulk-action.ts");
/* harmony import */ var _content_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./content-type */ "./adapters/REST/endpoints/content-type.ts");
/* harmony import */ var _editor_interface__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor-interface */ "./adapters/REST/endpoints/editor-interface.ts");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./entry */ "./adapters/REST/endpoints/entry.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./environment */ "./adapters/REST/endpoints/environment.ts");
/* harmony import */ var _environment_alias__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./environment-alias */ "./adapters/REST/endpoints/environment-alias.ts");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./extension */ "./adapters/REST/endpoints/extension.ts");
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./http */ "./adapters/REST/endpoints/http.ts");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./locale */ "./adapters/REST/endpoints/locale.ts");
/* harmony import */ var _organization__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./organization */ "./adapters/REST/endpoints/organization.ts");
/* harmony import */ var _organization_invitation__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./organization-invitation */ "./adapters/REST/endpoints/organization-invitation.ts");
/* harmony import */ var _organization_membership__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./organization-membership */ "./adapters/REST/endpoints/organization-membership.ts");
/* harmony import */ var _personal_access_token__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./personal-access-token */ "./adapters/REST/endpoints/personal-access-token.ts");
/* harmony import */ var _preview_api_key__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./preview-api-key */ "./adapters/REST/endpoints/preview-api-key.ts");
/* harmony import */ var _release__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./release */ "./adapters/REST/endpoints/release.ts");
/* harmony import */ var _release_action__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./release-action */ "./adapters/REST/endpoints/release-action.ts");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./role */ "./adapters/REST/endpoints/role.ts");
/* harmony import */ var _scheduled_action__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./scheduled-action */ "./adapters/REST/endpoints/scheduled-action.ts");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./snapshot */ "./adapters/REST/endpoints/snapshot.ts");
/* harmony import */ var _space__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./space */ "./adapters/REST/endpoints/space.ts");
/* harmony import */ var _space_member__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./space-member */ "./adapters/REST/endpoints/space-member.ts");
/* harmony import */ var _space_membership__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./space-membership */ "./adapters/REST/endpoints/space-membership.ts");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./tag */ "./adapters/REST/endpoints/tag.ts");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./task */ "./adapters/REST/endpoints/task.ts");
/* harmony import */ var _team__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./team */ "./adapters/REST/endpoints/team.ts");
/* harmony import */ var _team_membership__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./team-membership */ "./adapters/REST/endpoints/team-membership.ts");
/* harmony import */ var _team_space_membership__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./team-space-membership */ "./adapters/REST/endpoints/team-space-membership.ts");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./upload */ "./adapters/REST/endpoints/upload.ts");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./usage */ "./adapters/REST/endpoints/usage.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./user */ "./adapters/REST/endpoints/user.ts");
/* harmony import */ var _webhook__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./webhook */ "./adapters/REST/endpoints/webhook.ts");






































/* harmony default export */ __webpack_exports__["default"] = ({
  ApiKey: _api_key__WEBPACK_IMPORTED_MODULE_0__,
  AppBundle: _app_bundle__WEBPACK_IMPORTED_MODULE_1__,
  AppDefinition: _app_definition__WEBPACK_IMPORTED_MODULE_2__,
  AppInstallation: _app_installation__WEBPACK_IMPORTED_MODULE_3__,
  AppUpload: _app_upload__WEBPACK_IMPORTED_MODULE_4__,
  Asset: _asset__WEBPACK_IMPORTED_MODULE_5__,
  AssetKey: _asset_key__WEBPACK_IMPORTED_MODULE_6__,
  BulkAction: _bulk_action__WEBPACK_IMPORTED_MODULE_7__,
  ContentType: _content_type__WEBPACK_IMPORTED_MODULE_8__,
  EditorInterface: _editor_interface__WEBPACK_IMPORTED_MODULE_9__,
  Entry: _entry__WEBPACK_IMPORTED_MODULE_10__,
  Environment: _environment__WEBPACK_IMPORTED_MODULE_11__,
  EnvironmentAlias: _environment_alias__WEBPACK_IMPORTED_MODULE_12__,
  Extension: _extension__WEBPACK_IMPORTED_MODULE_13__,
  Http: _http__WEBPACK_IMPORTED_MODULE_14__,
  Locale: _locale__WEBPACK_IMPORTED_MODULE_15__,
  Organization: _organization__WEBPACK_IMPORTED_MODULE_16__,
  OrganizationInvitation: _organization_invitation__WEBPACK_IMPORTED_MODULE_17__,
  OrganizationMembership: _organization_membership__WEBPACK_IMPORTED_MODULE_18__,
  PersonalAccessToken: _personal_access_token__WEBPACK_IMPORTED_MODULE_19__,
  PreviewApiKey: _preview_api_key__WEBPACK_IMPORTED_MODULE_20__,
  Release: _release__WEBPACK_IMPORTED_MODULE_21__,
  ReleaseAction: _release_action__WEBPACK_IMPORTED_MODULE_22__,
  Role: _role__WEBPACK_IMPORTED_MODULE_23__,
  ScheduledAction: _scheduled_action__WEBPACK_IMPORTED_MODULE_24__,
  Snapshot: _snapshot__WEBPACK_IMPORTED_MODULE_25__,
  Space: _space__WEBPACK_IMPORTED_MODULE_26__,
  SpaceMember: _space_member__WEBPACK_IMPORTED_MODULE_27__,
  SpaceMembership: _space_membership__WEBPACK_IMPORTED_MODULE_28__,
  Tag: _tag__WEBPACK_IMPORTED_MODULE_29__,
  Task: _task__WEBPACK_IMPORTED_MODULE_30__,
  Team: _team__WEBPACK_IMPORTED_MODULE_31__,
  TeamMembership: _team_membership__WEBPACK_IMPORTED_MODULE_32__,
  TeamSpaceMembership: _team_space_membership__WEBPACK_IMPORTED_MODULE_33__,
  Upload: _upload__WEBPACK_IMPORTED_MODULE_34__,
  Usage: _usage__WEBPACK_IMPORTED_MODULE_35__,
  User: _user__WEBPACK_IMPORTED_MODULE_36__,
  Webhook: _webhook__WEBPACK_IMPORTED_MODULE_37__
});

/***/ }),

/***/ "./adapters/REST/endpoints/locale.ts":
/*!*******************************************!*\
  !*** ./adapters/REST/endpoints/locale.ts ***!
  \*******************************************/
/*! exports provided: get, getMany, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/locales/").concat(params.localeId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/locales"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/locales"), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  delete data["default"]; // we should not send this back

  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/locales/").concat(params.localeId), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/locales/").concat(params.localeId));
};

/***/ }),

/***/ "./adapters/REST/endpoints/organization-invitation.ts":
/*!************************************************************!*\
  !*** ./adapters/REST/endpoints/organization-invitation.ts ***!
  \************************************************************/
/*! exports provided: create, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var OrganizationUserManagementAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'organization-user-management-api'
};
var InvitationAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'pending-org-membership'
};
var create = function create(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/organizations/".concat(params.organizationId, "/invitations"), data, {
    headers: _objectSpread(_objectSpread({}, InvitationAlphaHeaders), headers)
  });
};
var get = function get(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations/".concat(params.organizationId, "/invitations/").concat(params.invitationId), {
    headers: _objectSpread(_objectSpread({}, OrganizationUserManagementAlphaHeaders), headers)
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/organization-membership.ts":
/*!************************************************************!*\
  !*** ./adapters/REST/endpoints/organization-membership.ts ***!
  \************************************************************/
/*! exports provided: get, getMany, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/organization_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.organizationMembershipId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  var role = data.role;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), {
    role: role
  }, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/organization.ts":
/*!*************************************************!*\
  !*** ./adapters/REST/endpoints/organization.ts ***!
  \*************************************************/
/*! exports provided: getMany, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var getMany = function getMany(http) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations");
};
var get = function get(http, params) {
  return getMany(http).then(function (data) {
    var org = data.items.find(function (org) {
      return org.sys.id === params.organizationId;
    });

    if (!org) {
      var error = new Error("No organization was found with the ID ".concat(params.organizationId, " instead got ").concat(JSON.stringify(data))); // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore

      error.status = 404; // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore

      error.statusText = 'Not Found';
      return Promise.reject(error);
    }

    return org;
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/personal-access-token.ts":
/*!**********************************************************!*\
  !*** ./adapters/REST/endpoints/personal-access-token.ts ***!
  \**********************************************************/
/*! exports provided: get, getMany, create, revoke */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revoke", function() { return revoke; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/users/me/access_tokens/".concat(params.tokenId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, '/users/me/access_tokens', {
    params: params.query
  });
};
var create = function create(http, _params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, '/users/me/access_tokens', rawData, {
    headers: headers
  });
};
var revoke = function revoke(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/users/me/access_tokens/".concat(params.tokenId, "/revoked"), null);
};

/***/ }),

/***/ "./adapters/REST/endpoints/preview-api-key.ts":
/*!****************************************************!*\
  !*** ./adapters/REST/endpoints/preview-api-key.ts ***!
  \****************************************************/
/*! exports provided: get, getMany */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/preview_api_keys/").concat(params.previewApiKeyId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/preview_api_keys"), {
    params: params.query
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/raw.ts":
/*!****************************************!*\
  !*** ./adapters/REST/endpoints/raw.ts ***!
  \****************************************/
/*! exports provided: get, patch, post, put, del, http */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return put; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "http", function() { return http; });
/* harmony import */ var _error_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../error-handler */ "./error-handler.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */


function getBaseUrl(http) {
  var _http$defaults$baseUR;

  return (_http$defaults$baseUR = http.defaults.baseURL) === null || _http$defaults$baseUR === void 0 ? void 0 : _http$defaults$baseUR.split('/spaces')[0];
}

function get(http, url, config) {
  return http.get(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function patch(http, url, payload, config) {
  return http.patch(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function post(http, url, payload, config) {
  return http.post(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function put(http, url, payload, config) {
  return http.put(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function del(http, url, config) {
  return http["delete"](url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function http(http, url, config) {
  return http(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(function (response) {
    return response.data;
  }, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}

/***/ }),

/***/ "./adapters/REST/endpoints/release-action.ts":
/*!***************************************************!*\
  !*** ./adapters/REST/endpoints/release-action.ts ***!
  \***************************************************/
/*! exports provided: get, queryForRelease */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryForRelease", function() { return queryForRelease; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* eslint-disable @typescript-eslint/no-explicit-any */

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/actions/").concat(params.actionId));
};
var queryForRelease = function queryForRelease(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/actions"), {
    params: params.query
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/release.ts":
/*!********************************************!*\
  !*** ./adapters/REST/endpoints/release.ts ***!
  \********************************************/
/*! exports provided: get, query, create, update, del, publish, unpublish, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpublish", function() { return unpublish; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId));
};
var query = function query(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases"), {
    params: params.query
  });
};
var create = function create(http, params, payload) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases"), payload);
};
var update = function update(http, params, payload, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId), payload, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId));
};
var publish = function publish(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/published"), null, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
var unpublish = function unpublish(http, params, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/published"), {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
var validate = function validate(http, params, payload) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/releases/").concat(params.releaseId, "/validate"), payload);
};

/***/ }),

/***/ "./adapters/REST/endpoints/role.ts":
/*!*****************************************!*\
  !*** ./adapters/REST/endpoints/role.ts ***!
  \*****************************************/
/*! exports provided: get, getMany, create, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/roles/").concat(params.roleId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/roles"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, "/spaces/".concat(params.spaceId, "/roles"), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, data, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/roles/").concat(params.roleId), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId, "/roles/").concat(params.roleId), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId, "/roles/").concat(params.roleId));
};

/***/ }),

/***/ "./adapters/REST/endpoints/scheduled-action.ts":
/*!*****************************************************!*\
  !*** ./adapters/REST/endpoints/scheduled-action.ts ***!
  \*****************************************************/
/*! exports provided: get, getMany, create, del, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");


var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/scheduled_actions"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, data) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, "/spaces/".concat(params.spaceId, "/scheduled_actions"), data);
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
var update = function update(http, params, data) {
  var _data$environment;

  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, "/spaces/".concat(params.spaceId, "/scheduled_actions/").concat(params.scheduledActionId), data, {
    params: {
      'environment.sys.id': (_data$environment = data.environment) === null || _data$environment === void 0 ? void 0 : _data$environment.sys.id
    },
    headers: {
      'X-Contentful-Version': params.version
    }
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/snapshot.ts":
/*!*********************************************!*\
  !*** ./adapters/REST/endpoints/snapshot.ts ***!
  \*********************************************/
/*! exports provided: getManyForEntry, getForEntry, getManyForContentType, getForContentType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForEntry", function() { return getManyForEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForEntry", function() { return getForEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForContentType", function() { return getManyForContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForContentType", function() { return getForContentType; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");



var getBaseEntryUrl = function getBaseEntryUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/snapshots");
};

var getEntryUrl = function getEntryUrl(params) {
  return getBaseEntryUrl(params) + "/".concat(params.snapshotId);
};

var getManyForEntry = function getManyForEntry(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseEntryUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var getForEntry = function getForEntry(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getEntryUrl(params));
};

var getBaseContentTypeUrl = function getBaseContentTypeUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/content_types/").concat(params.contentTypeId, "/snapshots");
};

var getContentTypeUrl = function getContentTypeUrl(params) {
  return getBaseContentTypeUrl(params) + "/".concat(params.snapshotId);
};

var getManyForContentType = function getManyForContentType(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseContentTypeUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
var getForContentType = function getForContentType(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getContentTypeUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/space-member.ts":
/*!*************************************************!*\
  !*** ./adapters/REST/endpoints/space-member.ts ***!
  \*************************************************/
/*! exports provided: get, getMany */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/space_members/").concat(params.spaceMemberId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/space_members"), {
    params: params.query
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/space-membership.ts":
/*!*****************************************************!*\
  !*** ./adapters/REST/endpoints/space-membership.ts ***!
  \*****************************************************/
/*! exports provided: get, getMany, getForOrganization, getManyForOrganization, create, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForOrganization", function() { return getForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForOrganization", function() { return getManyForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function spaceMembershipDeprecationWarning() {
  console.warn('The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)');
}

var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/space_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.spaceMembershipId);
};

var get = function get(http, params) {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
var getMany = function getMany(http, params) {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
var getForOrganization = function getForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/organizations/".concat(params.organizationId, "/space_memberships/").concat(params.spaceMembershipId));
};
var getManyForOrganization = function getManyForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/organizations/".concat(params.organizationId, "/space_memberships"), {
    params: params.query
  });
};
var create = function create(http, params, data, headers) {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, data, headers) {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/space.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/space.ts ***!
  \******************************************/
/*! exports provided: get, getMany, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces", {
    params: params.query
  });
};
var create = function create(http, params, payload, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, "/spaces", payload, {
    headers: params.organizationId ? _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Organization': params.organizationId
    }) : headers
  });
};
var update = function update(http, params, payload, headers) {
  var _payload$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(payload);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, "/spaces/".concat(params.spaceId), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_payload$sys$version = payload.sys.version) !== null && _payload$sys$version !== void 0 ? _payload$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, "/spaces/".concat(params.spaceId));
};

/***/ }),

/***/ "./adapters/REST/endpoints/tag.ts":
/*!****************************************!*\
  !*** ./adapters/REST/endpoints/tag.ts ***!
  \****************************************/
/*! exports provided: get, getMany, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/tags");
};

var getTagUrl = function getTagUrl(params) {
  return getBaseUrl(params) + "/".concat(params.tagId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getTagUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
var createWithId = function createWithId(http, params, rawData) {
  var _rawData$sys$visibili;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTagUrl(params), data, {
    headers: {
      'X-Contentful-Tag-Visibility': (_rawData$sys$visibili = rawData.sys.visibility) !== null && _rawData$sys$visibili !== void 0 ? _rawData$sys$visibili : 'private'
    }
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTagUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, _ref) {
  var version = _ref.version,
      params = _objectWithoutProperties(_ref, ["version"]);

  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getTagUrl(params), {
    headers: {
      'X-Contentful-Version': version
    }
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/task.ts":
/*!*****************************************!*\
  !*** ./adapters/REST/endpoints/task.ts ***!
  \*****************************************/
/*! exports provided: get, getAll, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/environments/").concat(params.environmentId, "/entries/").concat(params.entryId, "/tasks");
};

var getTaskUrl = function getTaskUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.taskId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getTaskUrl(params));
};
var getAll = function getAll(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
};
var create = function create(http, params, rawData) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data);
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTaskUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, _ref) {
  var version = _ref.version,
      params = _objectWithoutProperties(_ref, ["version"]);

  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getTaskUrl(params), {
    headers: {
      'X-Contentful-Version': version
    }
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/team-membership.ts":
/*!****************************************************!*\
  !*** ./adapters/REST/endpoints/team-membership.ts ***!
  \****************************************************/
/*! exports provided: get, getManyForOrganization, getManyForTeam, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForOrganization", function() { return getManyForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForTeam", function() { return getManyForTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/teams/").concat(params.teamId, "/team_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "/organizations/".concat(params.organizationId, "/teams/").concat(params.teamId, "/team_memberships/").concat(params.teamMembershipId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
var getManyForOrganization = function getManyForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/organizations/".concat(params.organizationId, "/team_memberships"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var getManyForTeam = function getManyForTeam(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/team-space-membership.ts":
/*!**********************************************************!*\
  !*** ./adapters/REST/endpoints/team-space-membership.ts ***!
  \**********************************************************/
/*! exports provided: get, getMany, getForOrganization, getManyForOrganization, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForOrganization", function() { return getForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForOrganization", function() { return getManyForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/team_space_memberships");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.teamSpaceMembershipId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
var getForOrganization = function getForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/organizations/".concat(params.organizationId, "/team_space_memberships/").concat(params.teamSpaceMembershipId));
};
var getManyForOrganization = function getManyForOrganization(http, params) {
  var query = params.query || {};

  if (params.teamId) {
    query['sys.team.sys.id'] = params.teamId;
  }

  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/organizations/".concat(params.organizationId, "/team_space_memberships"), {
    params: params.query
  });
};
var create = function create(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers: _objectSpread({
      'x-contentful-team': params.teamId
    }, headers)
  });
};
var update = function update(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0,
      'x-contentful-team': rawData.sys.team.sys.id
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/team.ts":
/*!*****************************************!*\
  !*** ./adapters/REST/endpoints/team.ts ***!
  \*****************************************/
/*! exports provided: get, getMany, getManyForSpace, create, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForSpace", function() { return getManyForSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getBaseUrl = function getBaseUrl(params) {
  return "/organizations/".concat(params.organizationId, "/teams");
};

var getEntityUrl = function getEntityUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.teamId);
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var getManyForSpace = function getManyForSpace(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, "/spaces/".concat(params.spaceId, "/teams"), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, rawData, headers) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers: headers
  });
};
var update = function update(http, params, rawData, headers) {
  var _rawData$sys$version;

  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));
};

/***/ }),

/***/ "./adapters/REST/endpoints/upload.ts":
/*!*******************************************!*\
  !*** ./adapters/REST/endpoints/upload.ts ***!
  \*******************************************/
/*! exports provided: create, del, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var _upload_http_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../upload-http-client */ "./upload-http-client.ts");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");


var create = function create(http, params, data) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  var file = data.file;

  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'));
  }

  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](httpUpload, "/spaces/".concat(params.spaceId, "/uploads"), file, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};
var del = function del(http, params) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](httpUpload, "/spaces/".concat(params.spaceId, "/uploads/").concat(params.uploadId));
};
var get = function get(http, params) {
  var httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](httpUpload, "/spaces/".concat(params.spaceId, "/uploads/").concat(params.uploadId));
};

/***/ }),

/***/ "./adapters/REST/endpoints/usage.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/usage.ts ***!
  \******************************************/
/*! exports provided: getManyForSpace, getManyForOrganization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForSpace", function() { return getManyForSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForOrganization", function() { return getManyForOrganization; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var getManyForSpace = function getManyForSpace(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations/".concat(params.organizationId, "/space_periodic_usages"), {
    params: params.query
  });
};
var getManyForOrganization = function getManyForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations/".concat(params.organizationId, "/organization_periodic_usages"), {
    params: params.query
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/user.ts":
/*!*****************************************!*\
  !*** ./adapters/REST/endpoints/user.ts ***!
  \*****************************************/
/*! exports provided: getForSpace, getCurrent, getManyForSpace, getForOrganization, getManyForOrganization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForSpace", function() { return getForSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrent", function() { return getCurrent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForSpace", function() { return getManyForSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForOrganization", function() { return getForOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyForOrganization", function() { return getManyForOrganization; });
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");

var getForSpace = function getForSpace(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/users/").concat(params.userId));
};
var getCurrent = function getCurrent(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/users/me", {
    params: params === null || params === void 0 ? void 0 : params.query
  });
};
var getManyForSpace = function getManyForSpace(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/spaces/".concat(params.spaceId, "/users"), {
    params: params.query
  });
};
var getForOrganization = function getForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations/".concat(params.organizationId, "/users/").concat(params.userId));
};
var getManyForOrganization = function getManyForOrganization(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, "/organizations/".concat(params.organizationId, "/users"), {
    params: params.query
  });
};

/***/ }),

/***/ "./adapters/REST/endpoints/utils.ts":
/*!******************************************!*\
  !*** ./adapters/REST/endpoints/utils.ts ***!
  \******************************************/
/*! exports provided: normalizeSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeSelect", function() { return normalizeSelect; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function normalizeSelect(query) {
  if (query && query.select && !/sys/i.test(query.select)) {
    return _objectSpread(_objectSpread({}, query), {}, {
      select: query.select + ',sys'
    });
  }

  return query;
}

/***/ }),

/***/ "./adapters/REST/endpoints/webhook.ts":
/*!********************************************!*\
  !*** ./adapters/REST/endpoints/webhook.ts ***!
  \********************************************/
/*! exports provided: get, getManyCallDetails, getCallDetails, getHealthStatus, getMany, create, createWithId, update, del */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getManyCallDetails", function() { return getManyCallDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCallDetails", function() { return getCallDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHealthStatus", function() { return getHealthStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMany", function() { return getMany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createWithId", function() { return createWithId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var getBaseUrl = function getBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/webhook_definitions");
};

var getWebhookCallBaseUrl = function getWebhookCallBaseUrl(params) {
  return "/spaces/".concat(params.spaceId, "/webhooks");
};

var getWebhookUrl = function getWebhookUrl(params) {
  return "".concat(getBaseUrl(params), "/").concat(params.webhookDefinitionId);
};

var getWebhookCallUrl = function getWebhookCallUrl(params) {
  return "".concat(getWebhookCallBaseUrl(params), "/").concat(params.webhookDefinitionId, "/calls");
};

var getWebhookCallDetailsUrl = function getWebhookCallDetailsUrl(params) {
  return "".concat(getWebhookCallBaseUrl(params), "/").concat(params.webhookDefinitionId, "/calls/").concat(params.callId);
};

var getWebhookHealthUrl = function getWebhookHealthUrl(params) {
  return "".concat(getWebhookCallBaseUrl(params), "/").concat(params.webhookDefinitionId, "/health");
};

var get = function get(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookUrl(params));
};
var getManyCallDetails = function getManyCallDetails(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookCallUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var getCallDetails = function getCallDetails(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookCallDetailsUrl(params));
};
var getHealthStatus = function getHealthStatus(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookHealthUrl(params));
};
var getMany = function getMany(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
var create = function create(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers: headers
  });
};
var createWithId = function createWithId(http, params, rawData, headers) {
  var data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getWebhookUrl(params), data, {
    headers: headers
  });
};
var update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(http, params, rawData, headers) {
    var _rawData$sys$version;

    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(rawData);
            delete data.sys;
            return _context.abrupt("return", _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getWebhookUrl(params), data, {
              headers: _objectSpread({
                'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
              }, headers)
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function update(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var del = function del(http, params) {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getWebhookUrl(params));
};

/***/ }),

/***/ "./adapters/REST/rest-adapter.ts":
/*!***************************************!*\
  !*** ./adapters/REST/rest-adapter.ts ***!
  \***************************************/
/*! exports provided: defaultHostParameters, RestAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultHostParameters", function() { return defaultHostParameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestAdapter", function() { return RestAdapter; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints */ "./adapters/REST/endpoints/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com'
};
var RestAdapter = /*#__PURE__*/function () {
  function RestAdapter(params) {
    _classCallCheck(this, RestAdapter);

    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken');
    }

    this.params = _objectSpread(_objectSpread({}, defaultHostParameters), fast_copy__WEBPACK_IMPORTED_MODULE_2___default()(params));
  }

  _createClass(RestAdapter, [{
    key: "makeRequest",
    value: function () {
      var _makeRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _endpoints$entityType;

        var entityType, actionInput, params, payload, headers, userAgent, action, endpoint, requiredHeaders, axiosInstance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                entityType = _ref.entityType, actionInput = _ref.action, params = _ref.params, payload = _ref.payload, headers = _ref.headers, userAgent = _ref.userAgent;
                // `delete` is a reserved keyword. Therefore, the methods are called `del`.
                action = actionInput === 'delete' ? 'del' : actionInput;
                endpoint = // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                (_endpoints$entityType = _endpoints__WEBPACK_IMPORTED_MODULE_3__["default"][entityType]) === null || _endpoints$entityType === void 0 ? void 0 : _endpoints$entityType[action];

                if (!(endpoint === undefined)) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Unknown endpoint');

              case 5:
                requiredHeaders = {
                  'Content-Type': 'application/vnd.contentful.management.v1+json',
                  'X-Contentful-User-Agent': userAgent
                }; // TODO: maybe we can avoid creating a new axios instance for each request

                axiosInstance = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createHttpClient"])(axios__WEBPACK_IMPORTED_MODULE_0___default.a, _objectSpread(_objectSpread({}, this.params), {}, {
                  headers: _objectSpread(_objectSpread({}, requiredHeaders), this.params.headers)
                }));
                _context.next = 9;
                return endpoint(axiosInstance, params, payload, headers);

              case 9:
                return _context.abrupt("return", _context.sent);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function makeRequest(_x) {
        return _makeRequest.apply(this, arguments);
      }

      return makeRequest;
    }()
  }]);

  return RestAdapter;
}();

/***/ }),

/***/ "./common-utils.ts":
/*!*************************!*\
  !*** ./common-utils.ts ***!
  \*************************/
/*! exports provided: wrapCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapCollection", function() { return wrapCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable @typescript-eslint/ban-ts-ignore */


var wrapCollection = function wrapCollection(fn) {
  return function (makeRequest, data) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var collectionData = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data)); // @ts-expect-error

    collectionData.items = collectionData.items.map(function (entity) {
      return fn.apply(void 0, [makeRequest, entity].concat(rest));
    }); // @ts-expect-error

    return collectionData;
  };
};

/***/ }),

/***/ "./constants/editor-interface-defaults/controls-defaults.ts":
/*!******************************************************************!*\
  !*** ./constants/editor-interface-defaults/controls-defaults.ts ***!
  \******************************************************************/
/*! exports provided: FIELD_TYPES, toInternalFieldType, DEFAULTS_WIDGET, DEFAULTS_SETTINGS, toApiFieldType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIELD_TYPES", function() { return FIELD_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInternalFieldType", function() { return toInternalFieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULTS_WIDGET", function() { return DEFAULTS_WIDGET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULTS_SETTINGS", function() { return DEFAULTS_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toApiFieldType", function() { return toApiFieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getDefaultControlOfField; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./constants/editor-interface-defaults/types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var DROPDOWN_TYPES = ['Text', 'Symbol', 'Integer', 'Number', 'Boolean'];
var INTERNAL_TO_API = {
  Symbol: {
    type: 'Symbol'
  },
  Text: {
    type: 'Text'
  },
  RichText: {
    type: 'RichText'
  },
  Integer: {
    type: 'Integer'
  },
  Number: {
    type: 'Number'
  },
  Boolean: {
    type: 'Boolean'
  },
  Date: {
    type: 'Date'
  },
  Location: {
    type: 'Location'
  },
  Object: {
    type: 'Object'
  },
  File: {
    type: 'File'
  },
  Entry: {
    type: 'Link',
    linkType: 'Entry'
  },
  Asset: {
    type: 'Link',
    linkType: 'Asset'
  },
  Symbols: {
    type: 'Array',
    items: {
      type: 'Symbol'
    }
  },
  Entries: {
    type: 'Array',
    items: {
      type: 'Link',
      linkType: 'Entry'
    }
  },
  Assets: {
    type: 'Array',
    items: {
      type: 'Link',
      linkType: 'Asset'
    }
  }
};
var FIELD_TYPES = Object.keys(INTERNAL_TO_API);
/**
 * Returns an internal string identifier for an API field object.
 *
 * We use this string as a simplified reference to field types.
 * Possible values are:
 *
 * - Symbol
 * - Symbols
 * - Text
 * - RichText
 * - Integer
 * - Number
 * - Boolean
 * - Date
 * - Location
 * - Object
 * - Entry
 * - Entries
 * - Asset
 * - Assets
 * - File
 */

function toInternalFieldType(api) {
  return FIELD_TYPES.find(function (key) {
    var internalApi = INTERNAL_TO_API[key];
    var stripped = {
      type: api.type,
      linkType: api.linkType,
      items: api.items
    };

    if (stripped.items) {
      stripped.items = {
        type: stripped.items.type,
        linkType: stripped.items.linkType
      };
    }

    if (internalApi.type === 'Link') {
      return internalApi.linkType === stripped.linkType;
    }

    if (internalApi.type === 'Array' && internalApi.items && stripped.items) {
      if (internalApi.items.type === 'Link') {
        return internalApi.items.linkType === stripped.items.linkType;
      }

      return internalApi.items.type === stripped.items.type;
    }

    return internalApi.type === stripped.type;
  });
}
var DEFAULTS_WIDGET = {
  Text: {
    widgetId: 'markdown'
  },
  Symbol: {
    widgetId: 'singleLine'
  },
  Integer: {
    widgetId: 'numberEditor'
  },
  Number: {
    widgetId: 'numberEditor'
  },
  Boolean: {
    widgetId: 'boolean'
  },
  Date: {
    widgetId: 'datePicker'
  },
  Location: {
    widgetId: 'locationEditor'
  },
  Object: {
    widgetId: 'objectEditor'
  },
  RichText: {
    widgetId: 'richTextEditor'
  },
  Entry: {
    widgetId: 'entryLinkEditor'
  },
  Asset: {
    widgetId: 'assetLinkEditor'
  },
  Symbols: {
    widgetId: 'tagEditor'
  },
  Entries: {
    widgetId: 'entryLinksEditor'
  },
  Assets: {
    widgetId: 'assetLinksEditor'
  },
  File: {
    widgetId: 'fileEditor'
  }
};
var DEFAULTS_SETTINGS = {
  Boolean: {
    falseLabel: 'No',
    helpText: null,
    trueLabel: 'Yes'
  },
  Date: {
    helpText: null,
    ampm: '24',
    format: 'timeZ'
  },
  Entry: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Asset: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Entries: {
    helpText: null,
    bulkEditing: false,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  },
  Assets: {
    helpText: null,
    showCreateEntityAction: true,
    showLinkEntityAction: true
  }
};

function getDefaultWidget(field, fieldId) {
  var defaultWidget = _objectSpread(_objectSpread({}, DEFAULTS_WIDGET[field]), {}, {
    settings: {
      helpText: null
    },
    widgetNamespace: 'builtin',
    fieldId: fieldId
  });

  if (Object(_types__WEBPACK_IMPORTED_MODULE_0__["in_"])(field, DEFAULTS_SETTINGS)) {
    defaultWidget.settings = _objectSpread(_objectSpread({}, defaultWidget.settings), DEFAULTS_SETTINGS[field]);
  }

  return defaultWidget;
} // Given our internal identifier returns a minimal API field object.


function toApiFieldType(internal) {
  return INTERNAL_TO_API[internal];
}
/*
 * Gets the default widget ID for a field:
 * - If a field allows predefined values then `dropdown` widget is used
 *   in the presence of the `in` validation.
 * - If a Text field is a title then the `singleLine` widget is used.
 * - Otherwise a simple type-to-editor mapping is used.
 */

function getDefaultControlOfField(field) {
  var fieldType = toInternalFieldType(field);

  if (!fieldType) {
    throw new Error('Invalid field type');
  }

  var hasInValidation = (field.validations || []).find(function (v) {
    return 'in' in v;
  });

  if (hasInValidation && DROPDOWN_TYPES.includes(fieldType)) {
    return {
      widgetId: 'dropdown',
      fieldId: field.id,
      widgetNameSpace: 'builtin'
    };
  }

  return getDefaultWidget(fieldType, field.id);
}

/***/ }),

/***/ "./constants/editor-interface-defaults/editors-defaults.ts":
/*!*****************************************************************!*\
  !*** ./constants/editor-interface-defaults/editors-defaults.ts ***!
  \*****************************************************************/
/*! exports provided: EntryEditorWidgetTypes, EntryConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryEditorWidgetTypes", function() { return EntryEditorWidgetTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntryConfiguration", function() { return EntryConfiguration; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./constants/editor-interface-defaults/types.ts");

var EntryEditorWidgetTypes = {
  DEFAULT_EDITOR: {
    name: 'Editor',
    id: _types__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_EDITOR_ID"],
    icon: 'Entry'
  },
  REFERENCE_TREE: {
    name: 'References',
    id: 'reference-tree',
    icon: 'References'
  },
  TAGS_EDITOR: {
    name: 'Tags',
    id: 'tags-editor',
    icon: 'Tags'
  }
};
var DefaultEntryEditor = {
  widgetId: EntryEditorWidgetTypes.DEFAULT_EDITOR.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.DEFAULT_EDITOR.name
};
var ReferencesEntryEditor = {
  widgetId: EntryEditorWidgetTypes.REFERENCE_TREE.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.REFERENCE_TREE.name
};
var TagsEditor = {
  widgetId: EntryEditorWidgetTypes.TAGS_EDITOR.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.TAGS_EDITOR.name
};
var EntryConfiguration = [DefaultEntryEditor, ReferencesEntryEditor, TagsEditor];

/***/ }),

/***/ "./constants/editor-interface-defaults/index.ts":
/*!******************************************************!*\
  !*** ./constants/editor-interface-defaults/index.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_defaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar-defaults */ "./constants/editor-interface-defaults/sidebar-defaults.ts");
/* harmony import */ var _editors_defaults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editors-defaults */ "./constants/editor-interface-defaults/editors-defaults.ts");
/* harmony import */ var _controls_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls-defaults */ "./constants/editor-interface-defaults/controls-defaults.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
  SidebarEntryConfiguration: _sidebar_defaults__WEBPACK_IMPORTED_MODULE_0__["SidebarEntryConfiguration"],
  SidebarAssetConfiguration: _sidebar_defaults__WEBPACK_IMPORTED_MODULE_0__["SidebarAssetConfiguration"],
  EntryConfiguration: _editors_defaults__WEBPACK_IMPORTED_MODULE_1__["EntryConfiguration"],
  getDefaultControlOfField: _controls_defaults__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./constants/editor-interface-defaults/sidebar-defaults.ts":
/*!*****************************************************************!*\
  !*** ./constants/editor-interface-defaults/sidebar-defaults.ts ***!
  \*****************************************************************/
/*! exports provided: SidebarEntryConfiguration, SidebarAssetConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarEntryConfiguration", function() { return SidebarEntryConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarAssetConfiguration", function() { return SidebarAssetConfiguration; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./constants/editor-interface-defaults/types.ts");

var SidebarWidgetTypes = {
  USERS: 'users-widget',
  CONTENT_PREVIEW: 'content-preview-widget',
  TRANSLATION: 'translation-widget',
  INCOMING_LINKS: 'incoming-links-widget',
  PUBLICATION: 'publication-widget',
  RELEASES: 'releases-widget',
  VERSIONS: 'versions-widget',
  INFO_PANEL: 'info-panel',
  JOBS: 'jobs-widget',
  TASKS: 'content-workflows-tasks-widget',
  COMMENTS_PANEL: 'comments-panel'
};
var Publication = {
  widgetId: SidebarWidgetTypes.PUBLICATION,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Publish & Status',
  description: 'Built-in - View entry status, publish, etc.'
};
var Releases = {
  widgetId: SidebarWidgetTypes.RELEASES,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Release',
  description: 'Built-in - View release, add to it, etc.'
};
var Tasks = {
  widgetId: SidebarWidgetTypes.TASKS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Tasks',
  description: 'Built-in - Assign tasks to be completed before publishing. Currently only supported for master environment.'
};
var ContentPreview = {
  widgetId: SidebarWidgetTypes.CONTENT_PREVIEW,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Preview',
  description: 'Built-in - Displays preview functionality.'
};
var Links = {
  widgetId: SidebarWidgetTypes.INCOMING_LINKS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Links',
  description: 'Built-in - Shows where an entry is linked.'
};
var Translation = {
  widgetId: SidebarWidgetTypes.TRANSLATION,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Translation',
  description: 'Built-in - Manage which translations are visible.'
};
var Versions = {
  widgetId: SidebarWidgetTypes.VERSIONS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Versions',
  description: 'Built-in - View previously published versions. Available only for master environment.'
};
var Users = {
  widgetId: SidebarWidgetTypes.USERS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Users',
  description: 'Built-in - Displays users on the same entry.'
};
var SidebarEntryConfiguration = [Publication, Releases, Tasks, ContentPreview, Links, Translation, Versions, Users];
var SidebarAssetConfiguration = [Publication, Releases, Links, Translation, Users];

/***/ }),

/***/ "./constants/editor-interface-defaults/types.ts":
/*!******************************************************!*\
  !*** ./constants/editor-interface-defaults/types.ts ***!
  \******************************************************/
/*! exports provided: WidgetNamespace, DEFAULT_EDITOR_ID, in_ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetNamespace", function() { return WidgetNamespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_EDITOR_ID", function() { return DEFAULT_EDITOR_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "in_", function() { return in_; });
var WidgetNamespace;

(function (WidgetNamespace) {
  WidgetNamespace["BUILTIN"] = "builtin";
  WidgetNamespace["EXTENSION"] = "extension";
  WidgetNamespace["SIDEBAR_BUILTIN"] = "sidebar-builtin";
  WidgetNamespace["APP"] = "app";
  WidgetNamespace["EDITOR_BUILTIN"] = "editor-builtin";
})(WidgetNamespace || (WidgetNamespace = {}));

var DEFAULT_EDITOR_ID = 'default-editor';
var in_ = function in_(key, object) {
  return key in object;
};

/***/ }),

/***/ "./contentful-management.ts":
/*!**********************************!*\
  !*** ./contentful-management.ts ***!
  \**********************************/
/*! exports provided: asIterator, isDraft, isPublished, isUpdated, createClient, RestAdapter, editorInterfaceDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClient", function() { return createClient; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _create_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-adapter */ "./create-adapter.ts");
/* harmony import */ var _create_contentful_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-contentful-api */ "./create-contentful-api.ts");
/* harmony import */ var _plain_plain_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plain/plain-client */ "./plain/plain-client.ts");
/* harmony import */ var _constants_editor_interface_defaults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants/editor-interface-defaults */ "./constants/editor-interface-defaults/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "editorInterfaceDefaults", function() { return _constants_editor_interface_defaults__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _plain_as_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plain/as-iterator */ "./plain/as-iterator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asIterator", function() { return _plain_as_iterator__WEBPACK_IMPORTED_MODULE_5__["asIterator"]; });

/* harmony import */ var _plain_checks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plain/checks */ "./plain/checks.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDraft", function() { return _plain_checks__WEBPACK_IMPORTED_MODULE_6__["isDraft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPublished", function() { return _plain_checks__WEBPACK_IMPORTED_MODULE_6__["isPublished"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUpdated", function() { return _plain_checks__WEBPACK_IMPORTED_MODULE_6__["isUpdated"]; });

/* harmony import */ var _adapters_REST_rest_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./adapters/REST/rest-adapter */ "./adapters/REST/rest-adapter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RestAdapter", function() { return _adapters_REST_rest_adapter__WEBPACK_IMPORTED_MODULE_7__["RestAdapter"]; });

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Contentful Management API SDK. Allows you to create instances of a client
 * with access to the Contentful Content Management API.
 * @packageDocumentation
 */











function createClient(params) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sdkMain = opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js';
  var userAgent = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["getUserAgentHeader"])( // @ts-expect-error
  "".concat(sdkMain, "/").concat("7.36.1"), params.application, params.integration, params.feature);
  var adapter = Object(_create_adapter__WEBPACK_IMPORTED_MODULE_1__["createAdapter"])(params); // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error

  var makeRequest = function makeRequest(options) {
    return adapter.makeRequest(_objectSpread(_objectSpread({}, options), {}, {
      userAgent: userAgent
    }));
  };

  if (opts.type === 'plain') {
    return Object(_plain_plain_client__WEBPACK_IMPORTED_MODULE_3__["createPlainClient"])(makeRequest, opts.defaults);
  } else {
    return Object(_create_contentful_api__WEBPACK_IMPORTED_MODULE_2__["default"])(makeRequest);
  }
}

/***/ }),

/***/ "./create-adapter.ts":
/*!***************************!*\
  !*** ./create-adapter.ts ***!
  \***************************/
/*! exports provided: createAdapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAdapter", function() { return createAdapter; });
/* harmony import */ var _adapters_REST_rest_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters/REST/rest-adapter */ "./adapters/REST/rest-adapter.ts");
/**
 * @packageDocumentation
 * @hidden
 */


/**
 * @private
 */
function createAdapter(params) {
  if ('apiAdapter' in params) {
    return params.apiAdapter;
  } else {
    return new _adapters_REST_rest_adapter__WEBPACK_IMPORTED_MODULE_0__["RestAdapter"](params);
  }
}

/***/ }),

/***/ "./create-app-definition-api.ts":
/*!**************************************!*\
  !*** ./create-app-definition-api.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createAppDefinitionApi; });
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
/* harmony import */ var _entities_app_definition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/app-definition */ "./entities/app-definition.ts");


function createAppDefinitionApi(makeRequest) {
  var _entities$appBundle = _entities__WEBPACK_IMPORTED_MODULE_0__["default"].appBundle,
      wrapAppBundle = _entities$appBundle.wrapAppBundle,
      wrapAppBundleCollection = _entities$appBundle.wrapAppBundleCollection;

  var getParams = function getParams(data) {
    return {
      appDefinitionId: data.sys.id,
      organizationId: data.sys.organization.sys.id
    };
  };

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => {
     *   appDefinition.name = 'New App Definition name'
     *   return appDefinition.update()
     * })
     * .then((appDefinition) => console.log(`App Definition ${appDefinition.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'update',
        params: getParams(data),
        headers: {},
        payload: data
      }).then(function (data) {
        return Object(_entities_app_definition__WEBPACK_IMPORTED_MODULE_1__["wrapAppDefinition"])(makeRequest, data);
      });
    },

    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.delete())
     * .then(() => console.log(`App Definition deleted.`))
     * .catch(console.error)
     * ```
     */
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'delete',
        params: getParams(data)
      });
    },

    /**
     * Gets an app bundle
     * @param id - AppBundle ID
     * @return Promise for an AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    getAppBundle: function getAppBundle(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'get',
        params: {
          appBundleId: id,
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id
        }
      }).then(function (data) {
        return wrapAppBundle(makeRequest, data);
      });
    },

    /**
     * Gets a collection of AppBundles
     * @return Promise for a collection of AppBundles
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.getAppBundles()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppBundles: function getAppBundles() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'getMany',
        params: {
          organizationId: raw.sys.organization.sys.id,
          appDefinitionId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapAppBundleCollection(makeRequest, data);
      });
    },

    /**
     * Creates an app bundle
     * @param Object representation of the App Bundle to be created
     * @return Promise for the newly created AppBundle
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_def_id>'))
     * .then((appDefinition) => appDefinition.createAppBundle('<app_upload_id>')
     * .then((appBundle) => console.log(appBundle))
     * .catch(console.error)
     * ```
     */
    createAppBundle: function createAppBundle(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'create',
        params: {
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapAppBundle(makeRequest, data);
      });
    }
  };
}

/***/ }),

/***/ "./create-contentful-api.ts":
/*!**********************************!*\
  !*** ./create-contentful-api.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createClientApi; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



function createClientApi(makeRequest) {
  var _entities$space = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].space,
      wrapSpace = _entities$space.wrapSpace,
      wrapSpaceCollection = _entities$space.wrapSpaceCollection;
  var wrapUser = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user.wrapUser;
  var _entities$personalAcc = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].personalAccessToken,
      wrapPersonalAccessToken = _entities$personalAcc.wrapPersonalAccessToken,
      wrapPersonalAccessTokenCollection = _entities$personalAcc.wrapPersonalAccessTokenCollection;
  var _entities$organizatio = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organization,
      wrapOrganization = _entities$organizatio.wrapOrganization,
      wrapOrganizationCollection = _entities$organizatio.wrapOrganizationCollection;
  var wrapTeamCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team.wrapTeamCollection;
  var wrapUsageCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].usage.wrapUsageCollection;
  return {
    /**
     * Gets all spaces
     * @return Promise for a collection of Spaces
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpaces()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaces: function getSpaces() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return makeRequest({
        entityType: 'Space',
        action: 'getMany',
        params: {
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceCollection(makeRequest, data);
      });
    },

    /**
     * Gets a space
     * @param spaceId - Space ID
     * @return Promise for a Space
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => console.log(space))
     * .catch(console.error)
     * ```
     */
    getSpace: function getSpace(spaceId) {
      return makeRequest({
        entityType: 'Space',
        action: 'get',
        params: {
          spaceId: spaceId
        }
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Creates a space
     * @param spaceData - Object representation of the Space to be created
     * @param organizationId - Organization ID, if the associated token can manage more than one organization.
     * @return Promise for the newly created Space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createSpace({
     *   name: 'Name of new space'
     * })
     * .then((space) => console.log(space))
     * .catch(console.error)
     * ```
     */
    createSpace: function createSpace(spaceData, organizationId) {
      return makeRequest({
        entityType: 'Space',
        action: 'create',
        params: {
          organizationId: organizationId
        },
        payload: spaceData
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Gets an organization
     * @param  id - Organization ID
     * @return Promise for a Organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => console.log(org))
     * .catch(console.error)
     * ```
     */
    getOrganization: function getOrganization(id) {
      return makeRequest({
        entityType: 'Organization',
        action: 'get',
        params: {
          organizationId: id
        }
      }).then(function (data) {
        return wrapOrganization(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Organizations
     * @return Promise for a collection of Organizations
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganizations()
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getOrganizations: function getOrganizations() {
      return makeRequest({
        entityType: 'Organization',
        action: 'getMany'
      }).then(function (data) {
        return wrapOrganizationCollection(makeRequest, data);
      });
    },

    /**
     * Gets the authenticated user
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getCurrentUser()
     * .then(user => console.log(user.firstName))
     * .catch(console.error)
     * ```
     */
    getCurrentUser: function getCurrentUser(params) {
      return makeRequest({
        entityType: 'User',
        action: 'getCurrent',
        params: params
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Creates a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.createPersonalAccessToken(
     *  {
     *    "name": "My Token",
     *    "scope": [
     *      "content_management_manage"
     *    ]
     *  }
     * )
     * .then(personalAccessToken => console.log(personalAccessToken.token))
     * .catch(console.error)
     * ```
     */
    createPersonalAccessToken: function createPersonalAccessToken(data) {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'create',
        params: {},
        payload: data
      }).then(function (response) {
        return wrapPersonalAccessToken(makeRequest, response);
      });
    },

    /**
     * Gets a personal access token
     * @param data - personal access token config
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getPersonalAccessToken(tokenId)
     * .then(token => console.log(token.token))
     * .catch(console.error)
     * ```
     */
    getPersonalAccessToken: function getPersonalAccessToken(tokenId) {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'get',
        params: {
          tokenId: tokenId
        }
      }).then(function (data) {
        return wrapPersonalAccessToken(makeRequest, data);
      });
    },

    /**
     * Gets all personal access tokens
     * @return Promise for a Token
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getPersonalAccessTokens()
     * .then(response => console.log(reponse.items))
     * .catch(console.error)
     * ```
     */
    getPersonalAccessTokens: function getPersonalAccessTokens() {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'getMany',
        params: {}
      }).then(function (data) {
        return wrapPersonalAccessTokenCollection(makeRequest, data);
      });
    },

    /**
     * Get organization usage grouped by {@link UsageMetricEnum metric}
     *
     * @param organizationId - Id of an organization
     * @param query - Query parameters
     * @return Promise of a collection of usages
     * @example ```javascript
     *
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganizationUsage('<organizationId>', {
     *    'metric[in]': 'cma,gql',
     *    'dateRange.startAt': '2019-10-22',
     *    'dateRange.endAt': '2019-11-10'
     *    }
     * })
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationUsage: function getOrganizationUsage(organizationId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForOrganization',
        params: {
          organizationId: organizationId,
          query: query
        }
      }).then(function (data) {
        return wrapUsageCollection(makeRequest, data);
      });
    },

    /**
     * Get organization usage grouped by space and metric
     *
     * @param organizationId - Id of an organization
     * @param query - Query parameters
     * @return Promise of a collection of usages
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpaceUsage('<organizationId>', {
     *    skip: 0,
     *    limit: 10,
     *    'metric[in]': 'cda,cpa,gql',
     *    'dateRange.startAt': '2019-10-22',
     *    'dateRange.endAt': '2020-11-30'
     *    }
     * })
     * .then(result => console.log(result.items))
     * .catch(console.error)
     * ```
     */
    getSpaceUsage: function getSpaceUsage(organizationId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForSpace',
        params: {
          organizationId: organizationId,
          query: query
        }
      }).then(function (data) {
        return wrapUsageCollection(makeRequest, data);
      });
    },

    /**
     * Make a custom request to the Contentful management API's /spaces endpoint
     * @param opts - axios request options (https://github.com/mzabriskie/axios)
     * @return Promise for the response data
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.rawRequest({
     *   method: 'GET',
     *   url: '/custom/path'
     * })
     * .then((responseData) => console.log(responseData))
     * .catch(console.error)
     * ```
     */
    rawRequest: function rawRequest(_ref) {
      var url = _ref.url,
          config = _objectWithoutProperties(_ref, ["url"]);

      return makeRequest({
        entityType: 'Http',
        action: 'request',
        params: {
          url: url,
          config: config
        }
      });
    }
  };
}

/***/ }),

/***/ "./create-entry-api.ts":
/*!*****************************!*\
  !*** ./create-entry-api.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createEntryApi; });
/* harmony import */ var _plain_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plain/checks */ "./plain/checks.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function createEntryApi(makeRequest) {
  var _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$snapshot = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].snapshot,
      wrapSnapshot = _entities$snapshot.wrapSnapshot,
      wrapSnapshotCollection = _entities$snapshot.wrapSnapshotCollection;
  var _entities$task = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].task,
      wrapTask = _entities$task.wrapTask,
      wrapTaskCollection = _entities$task.wrapTaskCollection;

  var getParams = function getParams(self) {
    var entry = self.toPlainObject();
    return {
      params: {
        spaceId: entry.sys.space.sys.id,
        environmentId: entry.sys.environment.sys.id,
        entryId: entry.sys.id
      },
      raw: entry
    };
  };

  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => {
     *   entry.fields.title['en-US'] = 'New entry title'
     *   return entry.update()
     * })
     * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    update: function update() {
      var _getParams = getParams(this),
          raw = _getParams.raw,
          params = _getParams.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'update',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Sends an JSON patch to the server with any changes made to the object's properties
     * @return Object returned from the server with updated changes.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.patch([
     *   {
     *     op: 'replace',
     *     path: '/fields/title/en-US',
     *     value: 'New entry title'
     *   }
     * ]))
     * .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
     * .catch(console.error)
     * ```
     */
    patch: function patch(ops) {
      var _getParams2 = getParams(this),
          raw = _getParams2.raw,
          params = _getParams2.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'patch',
        params: _objectSpread(_objectSpread({}, params), {}, {
          version: raw.sys.version
        }),
        payload: ops
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Deletes this object on the server.
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.delete())
     * .then(() => console.log(`Entry deleted.`))
     * .catch(console.error)
     * ```
     */
    "delete": function del() {
      var _getParams3 = getParams(this),
          params = _getParams3.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: params
      });
    },

    /**
     * Publishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.publish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} published.`))
     * .catch(console.error)
     * ```
     */
    publish: function publish() {
      var _getParams4 = getParams(this),
          raw = _getParams4.raw,
          params = _getParams4.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'publish',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Unpublishes the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.unpublish())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
     * .catch(console.error)
     * ```
     */
    unpublish: function unpublish() {
      var _getParams5 = getParams(this),
          params = _getParams5.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unpublish',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Archives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.archive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} archived.`))
     * .catch(console.error)
     * ```
     */
    archive: function archive() {
      var _getParams6 = getParams(this),
          params = _getParams6.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'archive',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Unarchives the object
     * @return Object returned from the server with updated metadata.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.unarchive())
     * .then((entry) => console.log(`Entry ${entry.sys.id} unarchived.`))
     * .catch(console.error)
     * ```
     */
    unarchive: function unarchive() {
      var _getParams7 = getParams(this),
          params = _getParams7.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unarchive',
        params: params
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Gets all snapshots of an entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshots())
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _getParams8 = getParams(this),
          params = _getParams8.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query: query
        })
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },

    /**
     * Gets a snapshot of an entry
     * @param snapshotId - Id of the snapshot
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntry('<entry_id>'))
     * .then((entry) => entry.getSnapshot('<snapshot_id>'))
     * .then((snapshot) => console.log(snapshot))
     * .catch(console.error)
     * ```
     */
    getSnapshot: function getSnapshot(snapshotId) {
      var _getParams9 = getParams(this),
          params = _getParams9.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId: snapshotId
        })
      }).then(function (data) {
        return wrapSnapshot(makeRequest, data);
      });
    },

    /**
     * Creates a new task for an entry
     * @param data Object representation of the Task to be created
     * @returns Promise for the newly created Task
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.createTask({
     *   body: 'Something left to do',
     *   assignedTo: '<user-id>',
     *   status: 'active'
     * }))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    createTask: function createTask(data) {
      var _getParams10 = getParams(this),
          params = _getParams10.params;

      return makeRequest({
        entityType: 'Task',
        action: 'create',
        params: params,
        payload: data
      }).then(function (data) {
        return wrapTask(makeRequest, data);
      });
    },

    /**
     * Gets all tasks of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTasks())
     * .then((tasks) => console.log(tasks))
     * .catch(console.error)
     * ```
     */
    getTasks: function getTasks() {
      var _getParams11 = getParams(this),
          params = _getParams11.params;

      return makeRequest({
        entityType: 'Task',
        action: 'getAll',
        params: params
      }).then(function (data) {
        return wrapTaskCollection(makeRequest, data);
      });
    },

    /**
     * Gets a task of an entry
     * @returns
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => entry.getTask(`<task-id>`))
     * .then((task) => console.log(task))
     * .catch(console.error)
     * ```
     */
    getTask: function getTask(id) {
      var _getParams12 = getParams(this),
          params = _getParams12.params;

      return makeRequest({
        entityType: 'Task',
        action: 'get',
        params: _objectSpread(_objectSpread({}, params), {}, {
          taskId: id
        })
      }).then(function (data) {
        return wrapTask(makeRequest, data);
      });
    },

    /**
     * Checks if the entry is published. A published entry might have unpublished changes
     */
    isPublished: function isPublished() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isPublished"](raw);
    },

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     */
    isUpdated: function isUpdated() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isUpdated"](raw);
    },

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     */
    isDraft: function isDraft() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isDraft"](raw);
    },

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived: function isArchived() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isArchived"](raw);
    },

    /**
     * Recursively collects references of an entry and their descendants
     */
    references: function references(options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          entryId: raw.sys.id,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(function (response) {
        return wrapEntryCollection(makeRequest, response);
      });
    }
  };
}

/***/ }),

/***/ "./create-environment-api.ts":
/*!***********************************!*\
  !*** ./create-environment-api.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createEnvironmentApi; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
/* harmony import */ var _entities_release_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/release-action */ "./entities/release-action.ts");
/* harmony import */ var _entities_release__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/release */ "./entities/release.ts");
/* harmony import */ var _entities_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/tag */ "./entities/tag.ts");






/**
 * Creates API object with methods to access the Environment API
 * @param {ContentfulEnvironmentAPI} makeRequest - function to make requests via an adapter
 * @return {ContentfulSpaceAPI}
 */
function createEnvironmentApi(makeRequest) {
  var wrapEnvironment = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environment.wrapEnvironment;
  var _entities$contentType = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].contentType,
      wrapContentType = _entities$contentType.wrapContentType,
      wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  var _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].entry,
      wrapEntry = _entities$entry.wrapEntry,
      wrapEntryCollection = _entities$entry.wrapEntryCollection;
  var _entities$asset = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].asset,
      wrapAsset = _entities$asset.wrapAsset,
      wrapAssetCollection = _entities$asset.wrapAssetCollection;
  var wrapAssetKey = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].assetKey.wrapAssetKey;
  var _entities$locale = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].locale,
      wrapLocale = _entities$locale.wrapLocale,
      wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  var wrapSnapshotCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].snapshot.wrapSnapshotCollection;
  var _entities$editorInter = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].editorInterface,
      wrapEditorInterface = _entities$editorInter.wrapEditorInterface,
      wrapEditorInterfaceCollection = _entities$editorInter.wrapEditorInterfaceCollection;
  var wrapUpload = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].upload.wrapUpload;
  var _entities$extension = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].extension,
      wrapExtension = _entities$extension.wrapExtension,
      wrapExtensionCollection = _entities$extension.wrapExtensionCollection;
  var _entities$appInstalla = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appInstallation,
      wrapAppInstallation = _entities$appInstalla.wrapAppInstallation,
      wrapAppInstallationCollection = _entities$appInstalla.wrapAppInstallationCollection;
  var wrapBulkAction = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].bulkAction.wrapBulkAction;
  return {
    /**
     * Deletes the environment
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.delete())
     * .then(() => console.log('Environment deleted.'))
     * .catch(console.error)
     * ```
     */
    "delete": function deleteEnvironment() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function () {// noop
      });
    },

    /**
     * Updates the environment
     * @return Promise for the updated environment.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => {
     *   environment.name = 'New name'
     *   return environment.update()
     * })
     * .then((environment) => console.log(`Environment ${environment.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateEnvironment() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: raw
      }).then(function (data) {
        return wrapEnvironment(makeRequest, data);
      });
    },

    /**
     * Creates SDK Entry object (locally) from entry data
     * @param entryData - Entry Data
     * @return Entry
     * @example ```javascript
     * environment.getEntry('entryId').then(entry => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = entry.toPlainObject();
     *
     *   // The entry is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const entryWithMethodsAgain = environment.getEntryFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   entryWithMethodsAgain.update();
     *
     * });
     * ```
     **/
    getEntryFromData: function getEntryFromData(entryData) {
      return wrapEntry(makeRequest, entryData);
    },

    /**
     * Creates SDK Asset object (locally) from entry data
     * @param assetData - Asset ID
     * @return Asset
     * @example ```javascript
     * environment.getAsset('asset_id').then(asset => {
     *
     *   // Build a plainObject in order to make it usable for React (saving in state or redux)
     *   const plainObject = asset.toPlainObject();
     *
     *   // The asset is being updated in some way as plainObject:
     *   const updatedPlainObject = {
     *     ...plainObject,
     *     fields: {
     *       ...plainObject.fields,
     *       title: {
     *         'en-US': 'updatedTitle'
     *       }
     *     }
     *   };
     *
     *   // Rebuild an sdk object out of the updated plainObject:
     *   const assetWithMethodsAgain = environment.getAssetFromData(updatedPlainObject);
     *
     *   // Update with help of the sdk method:
     *   assetWithMethodsAgain.update();
     *
     * });
     * ```
     */
    getAssetFromData: function getAssetFromData(assetData) {
      return wrapAsset(makeRequest, assetData);
    },

    /**
     *
     * @description Get a BulkAction by ID.
     *  See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/bulk-action
     * @param bulkActionId - ID of the BulkAction to fetch
     * @returns - Promise with the BulkAction
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getBulkAction('<bulk_action_id>'))
     * .then((bulkAction) => console.log(bulkAction))
     * ```
     */
    getBulkAction: function getBulkAction(bulkActionId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          bulkActionId: bulkActionId
        }
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to publish all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/publish-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: '<entry-id>', linkType: 'Entry', version: 2 } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createPublishBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await client.getSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createPublishBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createPublishBulkAction: function createPublishBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to validate all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/validate-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  action: 'publish',
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: '<entry-id>', linkType: 'Entry' } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createValidateBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await client.getSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createValidateBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createValidateBulkAction: function createValidateBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * @description Creates a BulkAction that will attempt to unpublish all items contained in the payload.
     * See: https://www.contentful.com/developers/docs/references/content-management-api/#/reference/bulk-actions/unpublish-bulk-action
     * @param {BulkActionPayload} payload - Object containing the items to be processed in the bulkAction
     * @returns - Promise with the BulkAction
     *
     * @example
     *
     * ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *  entities: {
     *    sys: { type: 'Array' }
     *    items: [
     *      { sys: { type: 'Link', id: 'entry-id', linkType: 'Entry' } }
     *    ]
     *  }
     * }
     *
     * // Using Thenables
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.createUnpublishBulkAction(payload))
     * .then((bulkAction) => console.log(bulkAction.waitProcessing()))
     * .catch(console.error)
     *
     * // Using async/await
     * try {
     *  const space = await clientgetSpace('<space_id>')
     *  const environment = await space.getEnvironment('<environment_id>')
     *  const bulkActionInProgress = await environment.createUnpublishBulkAction(payload)
     *
     *  // You can wait for a recently created BulkAction to be processed by using `bulkAction.waitProcessing()`
     *  const bulkActionCompleted = await bulkActionInProgress.waitProcessing()
     *  console.log(bulkActionCompleted)
     * } catch (error) {
     *  console.log(error)
     * }
     * ```
     */
    createUnpublishBulkAction: function createUnpublishBulkAction(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapBulkAction(makeRequest, data);
      });
    },

    /**
     * Gets a Content Type
     * @param contentTypeId - Content Type ID
     * @return Promise for a Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentType('<content_type_id>'))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    getContentType: function getContentType(contentTypeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        }
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Content Types
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Content Types
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypes())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getContentTypes: function getContentTypes() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapContentTypeCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Content Type
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentType({
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentType: function createContentType(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapContentType(makeRequest, response);
      });
    },

    /**
     * Creates a Content Type with a custom ID
     * @param contentTypeId - Content Type ID
     * @param data - Object representation of the Content Type to be created
     * @return Promise for the newly created Content Type
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createContentTypeWithId('<content-type-id>', {
     *   name: 'Blog Post',
     *   fields: [
     *     {
     *       id: 'title',
     *       name: 'Title',
     *       required: true,
     *       localized: false,
     *       type: 'Text'
     *     }
     *   ]
     * }))
     * .then((contentType) => console.log(contentType))
     * .catch(console.error)
     * ```
     */
    createContentTypeWithId: function createContentTypeWithId(contentTypeId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapContentType(makeRequest, response);
      });
    },

    /**
     * Gets an EditorInterface for a ContentType
     * @param contentTypeId - Content Type ID
     * @return Promise for an EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaceForContentType('<content_type_id>'))
     * .then((EditorInterface) => console.log(EditorInterface))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaceForContentType: function getEditorInterfaceForContentType(contentTypeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        }
      }).then(function (response) {
        return wrapEditorInterface(makeRequest, response);
      });
    },

    /**
     * Gets all EditorInterfaces
     * @return Promise for a collection of EditorInterface
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEditorInterfaces())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEditorInterfaces: function getEditorInterfaces() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (response) {
        return wrapEditorInterfaceCollection(makeRequest, response);
      });
    },

    /**
     * Gets an Entry
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param id - Entry ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntry('<entry-id>'))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    getEntry: function getEntry(id) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapEntry(makeRequest, data);
      });
    },

    /**
     * Deletes an Entry of this environement
     * @param id - Entry ID
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.deleteEntry("4bmLXiuviAZH3jkj5DLRWE"))
     * .then(() => console.log('Entry deleted.'))
     * .catch(console.error)
     * ```
     */
    deleteEntry: function deleteEntry(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id
        }
      }).then(function () {// noop
      });
    },

    /**
     * Gets a collection of Entries
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Entries
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntries({'content_type': 'foo'})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEntries: function getEntries() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapEntryCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Entry
     * @param contentTypeId - The Content Type ID of the newly created Entry
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntry('<content_type_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntry: function createEntry(contentTypeId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapEntry(makeRequest, response);
      });
    },

    /**
     * Creates a Entry with a custom ID
     * @param contentTypeId - The Content Type of the newly created Entry
     * @param id - Entry ID
     * @param data - Object representation of the Entry to be created
     * @return Promise for the newly created Entry
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create entry
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createEntryWithId('<content_type_id>', '<entry_id>', {
     *   fields: {
     *     title: {
     *       'en-US': 'Entry title'
     *     }
     *   }
     * }))
     * .then((entry) => console.log(entry))
     * .catch(console.error)
     * ```
     */
    createEntryWithId: function createEntryWithId(contentTypeId, id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(function (response) {
        return wrapEntry(makeRequest, response);
      });
    },

    /**
     * Get entry references
     * @param entryId - Entry ID
     * @param {Object} options.maxDepth - Level of the entry descendants from 1 up to 10 maximum
     * @returns Promise of Entry references
     * @example ```javascript
     * const contentful = require('contentful-management');
     *
     * const client = contentful.createClient({
     *  accessToken: '<contentful_management_api_key>
     * })
     *
     * // Get entry references
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment_id>'))
     * .then((environment) => environment.getEntryReferences('<entry_id>', {maxDepth: number}))
     * .then((entry) => console.log(entry.includes))
     * // or
     * .then((environment) => environment.getEntry('<entry_id>')).then((entry) => entry.references({maxDepth: number}))
     * .catch(console.error)
     * ```
     */
    getEntryReferences: function getEntryReferences(entryId, options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: entryId,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(function (response) {
        return wrapEntryCollection(makeRequest, response);
      });
    },

    /**
     * Gets an Asset
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param id - Asset ID
     * @param query - Object with search parameters. In this method it's only useful for `locale`.
     * @return Promise for an Asset
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAsset('<asset_id>'))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    getAsset: function getAsset(id) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Assets
     * Warning: if you are using the select operator, when saving, any field that was not selected will be removed
     * from your entry in the backend
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Assets
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getAssets())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAssets: function getAssets() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapAssetCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Asset. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAsset({
     *   fields: {
     *     title: {
     *       'en-US': 'Playsam Streamliner'
     *    },
     *    file: {
     *       'en-US': {
     *         contentType: 'image/jpeg',
     *        fileName: 'example.jpeg',
     *        upload: 'https://example.com/example.jpg'
     *      }
     *    }
     *   }
     * }))
     * .then((asset) => asset.processForLocale("en-US")) // OR asset.processForAllLocales()
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAsset: function createAsset(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates a Asset with a custom ID. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param id - Asset ID
     * @param data - Object representation of the Asset to be created. Note that the field object should have an upload property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create asset
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetWithId('<asset_id>', {
     *   title: {
     *     'en-US': 'Playsam Streamliner'
     *   },
     *   file: {
     *     'en-US': {
     *       contentType: 'image/jpeg',
     *       fileName: 'example.jpeg',
     *       upload: 'https://example.com/example.jpg'
     *     }
     *   }
     * }))
     * .then((asset) => asset.process())
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetWithId: function createAssetWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates a Asset based on files. After creation, call asset.processForLocale or asset.processForAllLocales to start asset processing.
     * @param data - Object representation of the Asset to be created. Note that the field object should have an uploadFrom property on asset creation, which will be removed and replaced with an url property when processing is finished.
     * @param data.fields.file.[LOCALE].file - Can be a string, an ArrayBuffer or a Stream.
     * @return Promise for the newly created Asset
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetFromFiles({
     *   fields: {
     *     file: {
     *       'en-US': {
     *          contentType: 'image/jpeg',
     *          fileName: 'filename_english.jpg',
     *          file: createReadStream('path/to/filename_english.jpg')
     *       },
     *       'de-DE': {
     *          contentType: 'image/svg+xml',
     *          fileName: 'filename_german.svg',
     *          file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
     *       }
     *     }
     *   }
     * }))
     * .then((asset) => console.log(asset))
     * .catch(console.error)
     * ```
     */
    createAssetFromFiles: function createAssetFromFiles(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createFromFiles',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapAsset(makeRequest, response);
      });
    },

    /**
     * Creates an asset key for signing asset URLs (Embargoed Assets)
     * @param data Object with request payload
     * @param data.expiresAt number a UNIX timestamp in the future (but not more than 48 hours from time of calling)
     * @return Promise for the newly created AssetKey
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create assetKey
     * now = () => Math.floor(Date.now() / 1000)
     * const withExpiryIn1Hour = () => now() + 1 * 60 * 60
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createAssetKey({ expiresAt: withExpiryIn1Hour() }))
     * .then((policy, secret) => console.log({ policy, secret }))
     * .catch(console.error)
     * ```
     */
    createAssetKey: function createAssetKey(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AssetKey',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapAssetKey(makeRequest, data);
      });
    },

    /**
     * Gets an Upload
     * @param id - Upload ID
     * @return Promise for an Upload
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUpload('<upload-id>')
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     */
    getUpload: function getUpload(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          uploadId: id
        }
      }).then(function (data) {
        return wrapUpload(makeRequest, data);
      });
    },

    /**
     * Creates a Upload.
     * @param data - Object with file information.
     * @param data.file - Actual file content. Can be a string, an ArrayBuffer or a Stream.
     * @return Upload object containing information about the uploaded file.
     * @example ```javascript
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * const uploadStream = createReadStream('path/to/filename_english.jpg')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUpload({file: uploadStream})
     * .then((upload) => console.log(upload))
     * .catch(console.error)
     * ```
     */
    createUpload: function createUpload(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapUpload(makeRequest, data);
      });
    },

    /**
     * Gets a Locale
     * @param localeId - Locale ID
     * @return Promise for an Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocale('<locale_id>'))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    getLocale: function getLocale(localeId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          localeId: localeId
        }
      }).then(function (data) {
        return wrapLocale(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Locales
     * @return Promise for a collection of Locales
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getLocales())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getLocales: function getLocales() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (data) {
        return wrapLocaleCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Locale
     * @param data - Object representation of the Locale to be created
     * @return Promise for the newly created Locale
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * // Create locale
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createLocale({
     *   name: 'German (Austria)',
     *   code: 'de-AT',
     *   fallbackCode: 'de-DE',
     *   optional: true
     * }))
     * .then((locale) => console.log(locale))
     * .catch(console.error)
     * ```
     */
    createLocale: function createLocale(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapLocale(makeRequest, response);
      });
    },

    /**
     * Gets an UI Extension
     * @param id - Extension ID
     * @return Promise for an UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtension('<extension-id>'))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    getUiExtension: function getUiExtension(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        }
      }).then(function (data) {
        return wrapExtension(makeRequest, data);
      });
    },

    /**
     * Gets a collection of UI Extension
     * @return Promise for a collection of UI Extensions
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getUiExtensions()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getUiExtensions: function getUiExtensions() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (response) {
        return wrapExtensionCollection(makeRequest, response);
      });
    },

    /**
     * Creates a UI Extension
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtension({
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtension: function createUiExtension(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },

    /**
     * Creates a UI Extension with a custom ID
     * @param id - Extension ID
     * @param data - Object representation of the UI Extension to be created
     * @return Promise for the newly created UI Extension
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createUiExtensionWithId('<extension_id>', {
     *   extension: {
     *     name: 'My awesome extension',
     *     src: 'https://example.com/my',
     *     fieldTypes: [
     *       {
     *         type: 'Symbol'
     *       },
     *       {
     *         type: 'Text'
     *       }
     *     ],
     *     sidebar: false
     *   }
     * }))
     * .then((extension) => console.log(extension))
     * .catch(console.error)
     * ```
     */
    createUiExtensionWithId: function createUiExtensionWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        },
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },

    /**
     * Gets an App Installation
     * @param appDefinitionId - AppDefinition ID
     * @param data - AppInstallation data
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.createAppInstallation('<app_definition_id>', {
     *    parameters: {
     *      someParameter: someValue
     *    }
     *   })
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    createAppInstallation: function createAppInstallation(appDefinitionId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: appDefinitionId
        },
        payload: data
      }).then(function (payload) {
        return wrapAppInstallation(makeRequest, payload);
      });
    },

    /**
     * Gets an App Installation
     * @param id - AppDefintion ID
     * @return Promise for an App Installation
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallation('<app-definition-id>'))
     *  .then((appInstallation) => console.log(appInstallation))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallation: function getAppInstallation(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(function (data) {
        return wrapAppInstallation(makeRequest, data);
      });
    },

    /**
     * Gets a collection of App Installation
     * @return Promise for a collection of App Installations
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *  .then((space) => space.getEnvironment('<environment-id>'))
     *  .then((environment) => environment.getAppInstallations()
     *  .then((response) => console.log(response.items))
     *  .catch(console.error)
     *  ```
     */
    getAppInstallations: function getAppInstallations() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(function (data) {
        return wrapAppInstallationCollection(makeRequest, data);
      });
    },

    /**
     * Gets all snapshots of an entry
     * @func getEntrySnapshots
     * @param entryId - Entry ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Entry Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getEntrySnapshots('<entry_id>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getEntrySnapshots: function getEntrySnapshots(entryId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: entryId,
          query: query
        }
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },

    /**
     * Gets all snapshots of a contentType
     * @func getContentTypeSnapshots
     * @param contentTypeId - Content Type ID
     * @param query - query additional query paramaters
     * @return Promise for a collection of Content Type Snapshots
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getContentTypeSnapshots('<contentTypeId>'))
     * .then((snapshots) => console.log(snapshots.items))
     * .catch(console.error)
     * ```
     */
    getContentTypeSnapshots: function getContentTypeSnapshots(contentTypeId) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId,
          query: query
        }
      }).then(function (data) {
        return wrapSnapshotCollection(makeRequest, data);
      });
    },
    createTag: function createTag(id, name, visibility) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        },
        payload: {
          name: name,
          sys: {
            visibility: visibility !== null && visibility !== void 0 ? visibility : 'private'
          }
        }
      }).then(function (data) {
        return Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTag"])(makeRequest, data);
      });
    },
    getTags: function getTags() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTagCollection"])(makeRequest, data);
      });
    },
    getTag: function getTag(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        }
      }).then(function (data) {
        return Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTag"])(makeRequest, data);
      });
    },

    /**
     * Retrieves a Release by ID
     * @param releaseId
     * @returns Promise containing a wrapped Release
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getRelease('<release_id>'))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    getRelease: function getRelease(releaseId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      }).then(function (data) {
        return Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data);
      });
    },

    /**
     * Gets a Collection of Releases,
     * @param {ReleaseQueryOptions} query filtering options for the collection result
     * @returns Promise containing a wrapped Release Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleases({ 'entities.sys.id[in]': '<asset_id>,<entry_id>' }))
     * .then((releases) => console.log(releases))
     * .catch(console.error)
     * ```
     */
    getReleases: function getReleases(query) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'query',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapReleaseCollection"])(makeRequest, data);
      });
    },

    /**
     * Creates a new Release with the entities and title in the payload
     * @param payload Object containing the payload in order to create a Release
     * @returns Promise containing a wrapped Release, that has other helper methods within.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * const payload = {
     *   title: 'My Release',
     *   entities: {
     *     sys: { type: 'Array' },
     *     items: [
     *      { sys: { linkType: 'Entry', type: 'Link', id: '<entry_id>' } }
     *     ]
     *   }
     * }
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.createRelease(payload))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    createRelease: function createRelease(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data);
      });
    },

    /**
     * Updates a Release and replaces all the properties.
     * @param {object} options,
     * @param options.releaseId the ID of the release
     * @param options.payload the payload to be updated in the Release
     * @param options.version Release sys.version that to be updated
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     *
     * const payload = {
     *   title: "Updated Release title",
     *   entities: {
     *     sys: { type: 'Array' },
     *     items: [
     *        { sys: { linkType: 'Entry', type: 'Link', id: '<entry_id>' } }
     *     ]
     *   }
     * }
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.updateRelease({ releaseId: '<release_id>', version: 1, payload } ))
     * .then((release) => console.log(release))
     * .catch(console.error)
     * ```
     */
    updateRelease: function updateRelease(_ref) {
      var releaseId = _ref.releaseId,
          payload = _ref.payload,
          version = _ref.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        },
        payload: payload
      }).then(function (data) {
        return Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data);
      });
    },

    /**
     * Deletes a Release by ID - does not delete any entities.
     * @param releaseId the ID of the release
     *
     * @returns Promise containing a wrapped Release, that has helper methods within.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.deleteRelease('<release_id>')
     * .catch(console.error)
     * ```
     */
    deleteRelease: function deleteRelease(releaseId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      });
    },

    /**
     * Publishes all Entities contained in a Release.
     * @param options.releaseId the ID of the release
     * @param options.version the version of the release that is to be published
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.publishRelease({ releaseId: '<release_id>', version: 1 }))
     * .catch(console.error)
     * ```
     */
    publishRelease: function publishRelease(_ref2) {
      var releaseId = _ref2.releaseId,
          version = _ref2.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        }
      }).then(function (data) {
        return Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data);
      });
    },

    /**
     * Unpublishes all Entities contained in a Release.
     * @param options.releaseId the ID of the release
     * @param options.version the version of the release that is to be published
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.unpublishRelease({ releaseId: '<release_id>', version: 1 }))
     * .catch(console.error)
     * ```
     */
    unpublishRelease: function unpublishRelease(_ref3) {
      var releaseId = _ref3.releaseId,
          version = _ref3.version;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          version: version
        }
      }).then(function (data) {
        return Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data);
      });
    },

    /**
     * Validates all Entities contained in a Release against an action (publish or unpublish)
     * @param options.releaseId the ID of the release
     * @param options.payload (optional) the type of action to be validated against
     *
     * @returns Promise containing a wrapped Release, that has helper methods within.
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.validateRelease({ releaseId: '<release_id>', payload: { action: 'unpublish' } }))
     * .catch(console.error)
     * ```
     */
    validateRelease: function validateRelease(_ref4) {
      var releaseId = _ref4.releaseId,
          payload = _ref4.payload;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        },
        payload: payload
      }).then(function (data) {
        return Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data);
      });
    },

    /**
     * Retrieves a ReleaseAction by ID
     * @param params.releaseId The ID of a Release
     * @param params.actionId The ID of a Release Action
     * @returns Promise containing a wrapped ReleaseAction
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleaseAction({ releaseId: '<release_id>', actionId: '<action_id>' }))
     * .then((releaseAction) => console.log(releaseAction))
     * .catch(console.error)
     * ```
     */
    getReleaseAction: function getReleaseAction(_ref5) {
      var actionId = _ref5.actionId,
          releaseId = _ref5.releaseId;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'get',
        params: {
          actionId: actionId,
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId
        }
      }).then(function (data) {
        return Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data);
      });
    },

    /**
     * Gets a Collection of ReleaseActions
     * @param {string} params.releaseId ID of the Release to fetch the actions from
     * @param {ReleaseQueryOptions} params.query filtering options for the collection result
     * @returns Promise containing a wrapped ReleaseAction Collection
     *
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environment-id>'))
     * .then((environment) => environment.getReleaseActions({ releaseId: '<release_id>', query: { 'sys.id[in]': '<id_1>,<id_2>' } }))
     * .then((releaseActions) => console.log(releaseActions))
     * .catch(console.error)
     * ```
     */
    getReleaseActions: function getReleaseActions(_ref6) {
      var releaseId = _ref6.releaseId,
          query = _ref6.query;
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'queryForRelease',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId: releaseId,
          query: query
        }
      }).then(function (data) {
        return Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseActionCollection"])(makeRequest, data);
      });
    }
  };
}

/***/ }),

/***/ "./create-organization-api.ts":
/*!************************************!*\
  !*** ./create-organization-api.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createOrganizationApi; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");



/**
 * Creates API object with methods to access the Organization API
 * @param {MakeRequest} makeRequest - function to make requests via an adapter
 * @return {ContentfulOrganizationAPI}
 */
function createOrganizationApi(makeRequest) {
  var _entities$appDefiniti = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appDefinition,
      wrapAppDefinition = _entities$appDefiniti.wrapAppDefinition,
      wrapAppDefinitionCollection = _entities$appDefiniti.wrapAppDefinitionCollection;
  var _entities$user = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user,
      wrapUser = _entities$user.wrapUser,
      wrapUserCollection = _entities$user.wrapUserCollection;
  var _entities$organizatio = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organizationMembership,
      wrapOrganizationMembership = _entities$organizatio.wrapOrganizationMembership,
      wrapOrganizationMembershipCollection = _entities$organizatio.wrapOrganizationMembershipCollection;
  var _entities$teamMembers = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamMembership,
      wrapTeamMembership = _entities$teamMembers.wrapTeamMembership,
      wrapTeamMembershipCollection = _entities$teamMembers.wrapTeamMembershipCollection;
  var _entities$teamSpaceMe = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamSpaceMembership,
      wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
      wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  var _entities$team = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team,
      wrapTeam = _entities$team.wrapTeam,
      wrapTeamCollection = _entities$team.wrapTeamCollection;
  var _entities$spaceMember = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMembership,
      wrapSpaceMembership = _entities$spaceMember.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember.wrapSpaceMembershipCollection;
  var wrapOrganizationInvitation = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organizationInvitation.wrapOrganizationInvitation;
  var wrapAppUpload = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appUpload.wrapAppUpload;
  return {
    /**
     * Gets a User
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUser: function getUser(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          userId: id
        }
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Users in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<organization_id>')
     * .then((organization) => organization.getUsers())
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getUsers: function getUsers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapUserCollection(makeRequest, data);
      });
    },

    /**
     * Gets an Organization Membership
     * @param id - Organization Membership ID
     * @return Promise for an Organization Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMembership('organizationMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationMembership: function getOrganizationMembership(id) {
      var raw = this.toPlainObject();
      var organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'get',
        params: {
          organizationId: organizationId,
          organizationMembershipId: id
        }
      }).then(function (data) {
        return wrapOrganizationMembership(makeRequest, data, organizationId);
      });
    },

    /**
     * Gets a collection of Organization Memberships
     * @param  query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Organization Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationMemberships: function getOrganizationMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      var organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'getMany',
        params: {
          organizationId: organizationId,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapOrganizationMembershipCollection(makeRequest, data, organizationId);
      });
    },

    /**
     * Creates a Team
     * @param data representation of the Team to be created
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createTeam({
     *    name: 'new team',
     *    description: 'new team description'
     *  }))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    createTeam: function createTeam(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },

    /**
     * Gets an Team
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeam('teamId'))
     * .then((team) => console.log(team))
     * .catch(console.error)
     * ```
     */
    getTeam: function getTeam(teamId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId
        }
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },

    /**
     * Gets all Teams in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('orgId')
     * .then((organization) => organization.getTeams())
     * .then((teams) => console.log(teams))
     * .catch(console.error)
     * ```
     */
    getTeams: function getTeams() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Team membership
     * @param teamId - Id of the team the membership will be created in
     * @param data - Object representation of the Team Membership to be created
     * @return Promise for the newly created TeamMembership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((org) => org.createTeamMembership('teamId', {
     *    admin: true,
     *    organizationMembershipId: 'organizationMembershipId'
     *  }))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    createTeamMembership: function createTeamMembership(teamId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'create',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId
        },
        payload: data
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },

    /**
     * Gets an Team Membership from the team with given teamId
     * @return Promise for an Team Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMembership('teamId', 'teamMembership_id'))
     * .then((teamMembership) => console.log(teamMembership))
     * .catch(console.error)
     * ```
     */
    getTeamMembership: function getTeamMembership(teamId, teamMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId: teamId,
          teamMembershipId: teamMembershipId
        }
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },

    /**
     * Get all Team Memberships. If teamID is provided in the optional config object, it will return all Team Memberships in that team. By default, returns all team memberships for the organization.
     * @return Promise for a Team Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamMemberships('teamId'))
     * .then((teamMemberships) => console.log(teamMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamMemberships: function getTeamMemberships() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var teamId = opts.teamId,
          _opts$query = opts.query,
          query = _opts$query === void 0 ? {} : _opts$query;
      var raw = this.toPlainObject();

      if (teamId) {
        return makeRequest({
          entityType: 'TeamMembership',
          action: 'getManyForTeam',
          params: {
            organizationId: raw.sys.id,
            teamId: teamId,
            query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
              query: query
            }).params
          }
        }).then(function (data) {
          return wrapTeamMembershipCollection(makeRequest, data);
        });
      }

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Get all Team Space Memberships. If teamID is provided in the optional config object, it will return all Team Space Memberships in that team. By default, returns all team space memberships across all teams in the organization.
     * @return Promise for a Team Space Membership Collection
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMemberships('teamId'))
     * .then((teamSpaceMemberships) => console.log(teamSpaceMemberships))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships: function getTeamSpaceMemberships() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: opts.query || {}
          }).params,
          teamId: opts.teamId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Get a Team Space Membership with given teamSpaceMembershipId
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organizationId')
     * .then((organization) => organization.getTeamSpaceMembership('teamSpaceMembershipId'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)]
     * ```
     */
    getTeamSpaceMembership: function getTeamSpaceMembership(teamSpaceMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          teamSpaceMembershipId: teamSpaceMembershipId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets an Space Membership in Organization
     * @param id - Organiztion Space Membership ID
     * @return Promise for a Space Membership in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMembership('organizationSpaceMembership_id'))
     * .then((organizationMembership) => console.log(organizationMembership))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMembership: function getOrganizationSpaceMembership(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection Space Memberships in organization
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a Space Membership collection across all spaces in the organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('organization_id')
     * .then((organization) => organization.getOrganizationSpaceMemberships()) // you can add queries like 'limit': 100
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getOrganizationSpaceMemberships: function getOrganizationSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Gets an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((organization) => organization.getOrganizationInvitation('invitation_id'))
     * .then((invitation) => console.log(invitation))
     * .catch(console.error)
     * ```
     */
    getOrganizationInvitation: function getOrganizationInvitation(invitationId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          invitationId: invitationId
        }
      }).then(function (data) {
        return wrapOrganizationInvitation(makeRequest, data);
      });
    },

    /**
     * Create an Invitation in Organization
     * @return Promise for a OrganizationInvitation in an organization
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     *  .then((organization) => organization.createOrganizationInvitation({
     *    email: 'user.email@example.com'
     *    firstName: 'User First Name'
     *    lastName: 'User Last Name'
     *    role: 'developer'
     *  })
     * .catch(console.error)
     * ```
     */
    createOrganizationInvitation: function createOrganizationInvitation(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapOrganizationInvitation(makeRequest, data);
      });
    },

    /**
     * Creates an app definition
     * @param Object representation of the App Definition to be created
     * @return Promise for the newly created AppDefinition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppDefinition({
     *    name: 'Example app',
     *    locations: [{ location: 'app-config' }],
     *    src: "http://my-app-host.com/my-app"
     *  }))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    createAppDefinition: function createAppDefinition(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapAppDefinition(makeRequest, data);
      });
    },

    /**
     * Gets all app definitions
     * @return Promise for a collection of App Definitions
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinitions())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getAppDefinitions: function getAppDefinitions() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapAppDefinitionCollection(makeRequest, data);
      });
    },

    /**
     * Gets an app definition
     * @return Promise for an App Definition
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppDefinition('<app_definition_id>'))
     * .then((appDefinition) => console.log(appDefinition))
     * .catch(console.error)
     * ```
     */
    getAppDefinition: function getAppDefinition(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(function (data) {
        return wrapAppDefinition(makeRequest, data);
      });
    },

    /**
     * Gets an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.getAppUpload('<app_upload_id>'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    getAppUpload: function getAppUpload(appUploadId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appUploadId: appUploadId
        }
      }).then(function (data) {
        return wrapAppUpload(makeRequest, data);
      });
    },

    /**
     * Creates an app upload
     * @return Promise for an App Upload
     * @example ```javascript
     * const contentful = require('contentful-management')
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getOrganization('<org_id>')
     * .then((org) => org.createAppUpload('some_zip_file'))
     * .then((appUpload) => console.log(appUpload))
     * .catch(console.error)
     * ```
     */
    createAppUpload: function createAppUpload(file) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: {
          file: file
        }
      }).then(function (data) {
        return wrapAppUpload(makeRequest, data);
      });
    }
  };
}

/***/ }),

/***/ "./create-space-api.ts":
/*!*****************************!*\
  !*** ./create-space-api.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSpaceApi; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
/**
 * Contentful Space API. Contains methods to access any operations at a space
 * level, such as creating and reading entities contained in a space.
 */



/**
 * Creates API object with methods to access the Space API
 * @param {MakeRequest} makeRequest - function to make requests via an adapter
 * @return {ContentfulSpaceAPI}
 */
function createSpaceApi(makeRequest) {
  var wrapSpace = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].space.wrapSpace;
  var _entities$environment = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environment,
      wrapEnvironment = _entities$environment.wrapEnvironment,
      wrapEnvironmentCollection = _entities$environment.wrapEnvironmentCollection;
  var _entities$webhook = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].webhook,
      wrapWebhook = _entities$webhook.wrapWebhook,
      wrapWebhookCollection = _entities$webhook.wrapWebhookCollection;
  var _entities$role = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].role,
      wrapRole = _entities$role.wrapRole,
      wrapRoleCollection = _entities$role.wrapRoleCollection;
  var _entities$user = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user,
      wrapUser = _entities$user.wrapUser,
      wrapUserCollection = _entities$user.wrapUserCollection;
  var _entities$spaceMember = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMember,
      wrapSpaceMember = _entities$spaceMember.wrapSpaceMember,
      wrapSpaceMemberCollection = _entities$spaceMember.wrapSpaceMemberCollection;
  var _entities$spaceMember2 = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMembership,
      wrapSpaceMembership = _entities$spaceMember2.wrapSpaceMembership,
      wrapSpaceMembershipCollection = _entities$spaceMember2.wrapSpaceMembershipCollection;
  var _entities$teamSpaceMe = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamSpaceMembership,
      wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
      wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  var wrapTeamCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team.wrapTeamCollection;
  var _entities$apiKey = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].apiKey,
      wrapApiKey = _entities$apiKey.wrapApiKey,
      wrapApiKeyCollection = _entities$apiKey.wrapApiKeyCollection;
  var _entities$environment2 = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environmentAlias,
      wrapEnvironmentAlias = _entities$environment2.wrapEnvironmentAlias,
      wrapEnvironmentAliasCollection = _entities$environment2.wrapEnvironmentAliasCollection;
  var _entities$previewApiK = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].previewApiKey,
      wrapPreviewApiKey = _entities$previewApiK.wrapPreviewApiKey,
      wrapPreviewApiKeyCollection = _entities$previewApiK.wrapPreviewApiKeyCollection;
  var _entities$scheduledAc = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].scheduledAction,
      wrapScheduledAction = _entities$scheduledAc.wrapScheduledAction,
      wrapScheduledActionCollection = _entities$scheduledAc.wrapScheduledActionCollection;
  return {
    /**
     * Deletes the space
     * @return Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     *   .then((space) => space.delete())
     *   .then(() => console.log('Space deleted.'))
     *   .catch(console.error)
     * ```
     */
    "delete": function deleteSpace() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Space',
        action: 'delete',
        params: {
          spaceId: raw.sys.id
        }
      });
    },

    /**
     * Updates the space
     * @return Promise for the updated space.
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => {
     *   space.name = 'New name'
     *   return space.update()
     * })
     * .then((space) => console.log(`Space ${space.sys.id} renamed.`)
     * .catch(console.error)
     * ```
     */
    update: function updateSpace() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Space',
        action: 'update',
        params: {
          spaceId: raw.sys.id
        },
        payload: raw,
        headers: {}
      }).then(function (data) {
        return wrapSpace(makeRequest, data);
      });
    },

    /**
     * Gets an environment
     * @param id - Environment ID
     * @return Promise for an Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironment('<environement_id>'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    getEnvironment: function getEnvironment(environmentId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentId: environmentId
        }
      }).then(function (data) {
        return wrapEnvironment(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Environments
     * @return Promise for a collection of Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironments())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironments: function getEnvironments() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: query
        }
      }).then(function (data) {
        return wrapEnvironmentCollection(makeRequest, data);
      });
    },

    /**
     * Creates an Environement
     * @param data - Object representation of the Environment to be created
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironment({ name: 'Staging' }))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironment: function createEnvironment() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironment(makeRequest, response);
      });
    },

    /**
     * Creates an Environment with a custom ID
     * @param id - Environment ID
     * @param data - Object representation of the Environment to be created
     * @param sourceEnvironmentId - ID of the source environment that will be copied to create the new environment. Default is "master"
     * @return Promise for the newly created Environment
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentWithId('<environment-id>', { name: 'Staging'}, 'master'))
     * .then((environment) => console.log(environment))
     * .catch(console.error)
     * ```
     */
    createEnvironmentWithId: function createEnvironmentWithId(id, data, sourceEnvironmentId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentId: id,
          sourceEnvironmentId: sourceEnvironmentId
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironment(makeRequest, response);
      });
    },

    /**
     * Gets a Webhook
     * @param id - Webhook ID
     * @return Promise for a Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhook('<webhook_id>'))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    getWebhook: function getWebhook(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        }
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Webhooks
     * @return Promise for a collection of Webhooks
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getWebhooks())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getWebhooks: function getWebhooks() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapWebhookCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Webhook
     * @param data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhook({
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhook: function createWebhook(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Creates a Webhook with a custom ID
     * @param id - Webhook ID
     * @param  data - Object representation of the Webhook to be created
     * @return Promise for the newly created Webhook
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createWebhookWithId('<webhook_id>', {
     *   'name': 'My webhook',
     *   'url': 'https://www.example.com/test',
     *   'topics': [
     *     'Entry.create',
     *     'ContentType.create',
     *     '*.publish',
     *     'Asset.*'
     *   ]
     * }))
     * .then((webhook) => console.log(webhook))
     * .catch(console.error)
     * ```
     */
    createWebhookWithId: function createWebhookWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        },
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },

    /**
     * Gets a Role
     * @param id - Role ID
     * @return Promise for a Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   fields: {
     *     title: {
     *       'en-US': 'Role title'
     *     }
     *   }
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    getRole: function getRole(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        }
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Roles
     * @return Promise for a collection of Roles
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getRoles())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getRoles: function getRoles() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapRoleCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Role
     * @param data - Object representation of the Role to be created
     * @return  Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRole({
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRole: function createRole(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Creates a Role with a custom ID
     * @param id - Role ID
     * @param data - Object representation of the Role to be created
     * @return Promise for the newly created Role
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     * client.getSpace('<space_id>')
     * .then((space) => space.createRoleWithId('<role-id>', {
     *   name: 'My Role',
     *   description: 'foobar role',
     *   permissions: {
     *     ContentDelivery: 'all',
     *     ContentModel: ['read'],
     *     Settings: []
     *   },
     *   policies: [
     *     {
     *       effect: 'allow',
     *       actions: 'all',
     *       constraint: {
     *         and: [
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Entry'
     *             ]
     *           },
     *           {
     *             equals: [
     *               { doc: 'sys.type' },
     *               'Asset'
     *             ]
     *           }
     *         ]
     *       }
     *     }
     *   ]
     * }))
     * .then((role) => console.log(role))
     * .catch(console.error)
     * ```
     */
    createRoleWithId: function createRoleWithId(id, roleData) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        },
        payload: roleData
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },

    /**
     * Gets a User
     * @param userId - User ID
     * @return Promise for a User
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUser('id'))
     * .then((user) => console.log(user))
     * .catch(console.error)
     * ```
     */
    getSpaceUser: function getSpaceUser(userId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForSpace',
        params: {
          spaceId: raw.sys.id,
          userId: userId
        }
      }).then(function (data) {
        return wrapUser(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Users in a space
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise a collection of Users in a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceUsers(query))
     * .then((data) => console.log(data))
     * .catch(console.error)
     * ```
     */
    getSpaceUsers: function getSpaceUsers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapUserCollection(makeRequest, data);
      });
    },

    /**
     * Gets a collection of teams for a space
     * @param query
     * @return Promise for a collection of teams for a space
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeams())
     * .then((teamsCollection) => console.log(teamsCollection))
     * .catch(console.error)
     * ```
     */
    getTeams: function getTeams() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        limit: 100
      };
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamCollection(makeRequest, data);
      });
    },

    /**
     * Gets a Space Member
     * @param id Get Space Member by user_id
     * @return Promise for a Space Member
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMember(id))
     * .then((spaceMember) => console.log(spaceMember))
     * .catch(console.error)
     * ```
     */
    getSpaceMember: function getSpaceMember(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMemberId: id
        }
      }).then(function (data) {
        return wrapSpaceMember(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Space Members
     * @param query
     * @return Promise for a collection of Space Members
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembers({'limit': 100}))
     * .then((spaceMemberCollection) => console.log(spaceMemberCollection))
     * .catch(console.error)
     * ```
     */
    getSpaceMembers: function getSpaceMembers() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMemberCollection(makeRequest, data);
      });
    },

    /**
     * Gets a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @return Promise for a Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('id'))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    getSpaceMembership: function getSpaceMembership(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Space Memberships
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMemberships({'limit': 100})) // you can add more queries as 'key': 'value'
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getSpaceMemberships: function getSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
     * Creates a Space Membership
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param  data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembership({
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembership: function createSpaceMembership(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Creates a Space Membership with a custom ID
     * Warning: the user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user).
     * @param id - Space Membership ID
     * @param data - Object representation of the Space Membership to be created
     * @return Promise for the newly created Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createSpaceMembershipWithId('<space-membership-id>', {
     *   admin: false,
     *   roles: [
     *     {
     *       type: 'Link',
     *       linkType: 'Role',
     *       id: '<role_id>'
     *     }
     *   ],
     *   email: 'foo@example.com'
     * }))
     * .then((spaceMembership) => console.log(spaceMembership))
     * .catch(console.error)
     * ```
     */
    createSpaceMembershipWithId: function createSpaceMembershipWithId(id, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        },
        payload: data
      }).then(function (response) {
        return wrapSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Gets a Team Space Membership
     * @param id - Team Space Membership ID
     * @return Promise for a Team Space Membership
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMembership('team_space_membership_id'))
     * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMembership: function getTeamSpaceMembership(teamSpaceMembershipId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          teamSpaceMembershipId: teamSpaceMembershipId
        }
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Team Space Memberships
     * @param query - Object with search parameters. Check the <a href="https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters">JS SDK tutorial</a> and the <a href="https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters">REST API reference</a> for more details.
     * @return Promise for a collection of Team Space Memberships
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getTeamSpaceMemberships())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getTeamSpaceMemberships: function getTeamSpaceMemberships() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(function (data) {
        return wrapTeamSpaceMembershipCollection(makeRequest, data);
      });
    },

    /**
    * Creates a Team Space Membership
    * @param id - Team ID
    * @param data - Object representation of the Team Space Membership to be created
    * @return Promise for the newly created Team Space Membership
    * @example ```javascript
    * const contentful = require('contentful-management')
    *
    * const client = contentful.createClient({
    *   accessToken: '<content_management_api_key>'
    * })
    *
    * client.getSpace('<space_id>')
    * .then((space) => space.createTeamSpaceMembership('team_id', {
    *   admin: false,
    *   roles: [
    *    {
          sys: {
    *       type: 'Link',
    *       linkType: 'Role',
    *       id: '<role_id>'
    *      }
    *    }
    *   ],
    * }))
    * .then((teamSpaceMembership) => console.log(teamSpaceMembership))
    * .catch(console.error)
    * ```
    */
    createTeamSpaceMembership: function createTeamSpaceMembership(teamId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
          teamId: teamId
        },
        payload: data
      }).then(function (response) {
        return wrapTeamSpaceMembership(makeRequest, response);
      });
    },

    /**
     * Gets a Api Key
     * @param id - API Key ID
     * @return  Promise for a Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKey('<apikey-id>'))
     * .then((apikey) => console.log(apikey))
     * .catch(console.error)
     * ```
     */
    getApiKey: function getApiKey(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        }
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Api Keys
     * @return Promise for a collection of Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getApiKeys: function getApiKeys() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapApiKeyCollection(makeRequest, data);
      });
    },

    /**
     * Gets a collection of preview Api Keys
     * @return Promise for a collection of Preview Api Keys
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKeys())
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKeys: function getPreviewApiKeys() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapPreviewApiKeyCollection(makeRequest, data);
      });
    },

    /**
     * Gets a preview Api Key
     * @param id - Preview API Key ID
     * @return  Promise for a Preview Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getPreviewApiKey('<preview-apikey-id>'))
     * .then((previewApikey) => console.log(previewApikey))
     * .catch(console.error)
     * ```
     */
    getPreviewApiKey: function getPreviewApiKey(id) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          previewApiKeyId: id
        }
      }).then(function (data) {
        return wrapPreviewApiKey(makeRequest, data);
      });
    },

    /**
     * Creates a Api Key
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKey({
     *   name: 'API Key name',
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKey: function createApiKey(payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: payload
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Creates a Api Key with a custom ID
     * @param id - Api Key ID
     * @param payload - Object representation of the Api Key to be created
     * @return Promise for the newly created Api Key
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createApiKeyWithId('<api-key-id>', {
     *   name: 'API Key name'
     *   environments:[
     *    {
     *     sys: {
     *      type: 'Link'
     *      linkType: 'Environment',
     *      id:'<environment_id>'
     *     }
     *    }
     *   ]
     *   }
     * }))
     * .then((apiKey) => console.log(apiKey))
     * .catch(console.error)
     * ```
     */
    createApiKeyWithId: function createApiKeyWithId(id, payload) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        },
        payload: payload
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },

    /**
     * Creates an EnvironmentAlias with a custom ID
     * @param environmentAliasId - EnvironmentAlias ID
     * @param data - Object representation of the EnvironmentAlias to be created
     * @return Promise for the newly created EnvironmentAlias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.createEnvironmentAliasWithId('<environment-alias-id>', {
     *   environment: {
     *     sys: { type: 'Link', linkType: 'Environment', id: 'targetEnvironment' }
     *   }
     * }))
     * .then((environmentAlias) => console.log(environmentAlias))
     * .catch(console.error)
     * ```
     */
    createEnvironmentAliasWithId: function createEnvironmentAliasWithId(environmentAliasId, data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId: environmentAliasId
        },
        payload: data
      }).then(function (response) {
        return wrapEnvironmentAlias(makeRequest, response);
      });
    },

    /**
     * Gets an Environment Alias
     * @param Environment Alias ID
     * @return Promise for an Environment Alias
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAlias('<alias-id>'))
     * .then((alias) => console.log(alias))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAlias: function getEnvironmentAlias(environmentAliasId) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId: environmentAliasId
        }
      }).then(function (data) {
        return wrapEnvironmentAlias(makeRequest, data);
      });
    },

    /**
     * Gets a collection of Environment Aliases
     * @return Promise for a collection of Environment Aliases
     * @example ```javascript
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getEnvironmentAliases()
     * .then((response) => console.log(response.items))
     * .catch(console.error)
     * ```
     */
    getEnvironmentAliases: function getEnvironmentAliases() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(function (data) {
        return wrapEnvironmentAliasCollection(makeRequest, data);
      });
    },

    /**
     * Query for scheduled actions in space.
     * @param query - Object with search parameters. The enviroment id field is mandatory. Check the <a href="https://www.contentful.com/developers/docs/references/content-management-api/#/reference/scheduled-actions/scheduled-actions-collection">REST API reference</a> for more details.
     * @return Promise for the scheduled actions query
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.getScheduledActions({
     *      'environment.sys.id': '<environment_id>',
     *      'sys.status': 'scheduled'
     *    }))
     *    .then((scheduledActionCollection) => console.log(scheduledActionCollection.items))
     *    .catch(console.error)
     * ```
     */
    getScheduledActions: function getScheduledActions(query) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: query
        }
      }).then(function (response) {
        return wrapScheduledActionCollection(makeRequest, response);
      });
    },

    /**
     * Get a Scheduled Action in the current space by environment and ID.
     *
     * @throws if the Scheduled Action cannot be found or the user doesn't have permission to read schedules from the entity of the scheduled action itself.
     * @returns Promise with the Scheduled Action
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.getScheduledAction({
     *      scheduledActionId: '<scheduled-action-id>',
     *      environmentId: '<environmentId>'
     *    }))
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error)
     * ```
     */
    getScheduledAction: function getScheduledAction(_ref) {
      var scheduledActionId = _ref.scheduledActionId,
          environmentId = _ref.environmentId;
      var space = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'get',
        params: {
          spaceId: space.sys.id,
          environmentId: environmentId,
          scheduledActionId: scheduledActionId
        }
      }).then(function (scheduledAction) {
        return wrapScheduledAction(makeRequest, scheduledAction);
      });
    },

    /**
     * Creates a scheduled action
     * @param data - Object representation of the scheduled action to be created
     * @return Promise for the newly created scheduled actions
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => space.createScheduledAction({
     *      entity: {
     *        sys: {
     *          type: 'Link',
     *          linkType: 'Entry',
     *          id: '<entry_id>'
     *        }
     *      },
     *      environment: {
     *        type: 'Link',
     *        linkType: 'Environment',
     *        id: '<environment_id>'
     *      },
     *      action: 'publish',
     *      scheduledFor: {
     *        dateTime: <ISO_date_string>,
     *        timezone: 'Europe/Berlin'
     *      }
     *    }))
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error)
     * ```
     */
    createScheduledAction: function createScheduledAction(data) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    },

    /**
     * Update a scheduled action
     * @param {object} options
     * @param options.scheduledActionId the id of the scheduled action to update
     * @param options.version the sys.version of the scheduled action to be updated
     * @param payload the scheduled actions object with updates, omitting sys object
     * @returns Promise containing a wrapped scheduled action with helper methods
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *      .then((scheduledAction) => {
     *        const { _sys, ...payload } = scheduledAction;
     *        return space.updateScheduledAction({
     *          ...payload,
     *          scheduledFor: {
     *            ...payload.scheduledFor,
     *            timezone: 'Europe/Paris'
     *          }
     *        })
     *      })
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    updateScheduledAction: function updateScheduledAction(_ref2) {
      var scheduledActionId = _ref2.scheduledActionId,
          payload = _ref2.payload,
          version = _ref2.version;
      var spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'update',
        params: {
          spaceId: spaceProps.sys.id,
          version: version,
          scheduledActionId: scheduledActionId
        },
        payload: payload
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    },

    /**
     * Cancels a Scheduled Action.
     * Only cancels actions that have not yet executed.
     *
     * @param {object} options
     * @param options.scheduledActionId the id of the scheduled action to be canceled
     * @param options.environmentId the environment ID of the scheduled action to be canceled
     * @throws if the Scheduled Action cannot be found or the user doesn't have permissions in the entity in the action.
     * @returns Promise containing a wrapped Scheduled Action with helper methods
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  // Given that an Scheduled Action is scheduled
     *  client.getSpace('<space_id>')
     *    .then((space) => space.deleteScheduledAction({
     *        environmentId: '<environment-id>',
     *        scheduledActionId: '<scheduled-action-id>'
     *     }))
     *     // The scheduled Action sys.status is now 'canceled'
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    deleteScheduledAction: function deleteScheduledAction(_ref3) {
      var scheduledActionId = _ref3.scheduledActionId,
          environmentId = _ref3.environmentId;
      var spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'delete',
        params: {
          spaceId: spaceProps.sys.id,
          environmentId: environmentId,
          scheduledActionId: scheduledActionId
        }
      }).then(function (response) {
        return wrapScheduledAction(makeRequest, response);
      });
    }
  };
}

/***/ }),

/***/ "./enhance-with-methods.ts":
/*!*********************************!*\
  !*** ./enhance-with-methods.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return enhanceWithMethods; });
/**
 * This method enhances a base object which would normally contain data, with
 * methods from another object that might work on manipulating that data.
 * All the added methods are set as non enumerable, non configurable, and non
 * writable properties. This ensures that if we try to clone or stringify the
 * base object, we don't have to worry about these additional methods.
 * @private
 * @param {object} baseObject - Base object with data
 * @param {object} methodsObject - Object with methods as properties. The key
 * values used here will be the same that will be defined on the baseObject.
 */
function enhanceWithMethods(baseObject, methodsObject) {
  // @ts-expect-error
  return Object.keys(methodsObject).reduce(function (enhancedObject, methodName) {
    Object.defineProperty(enhancedObject, methodName, {
      enumerable: false,
      configurable: true,
      writable: false,
      value: methodsObject[methodName]
    });
    return enhancedObject;
  }, baseObject);
}

/***/ }),

/***/ "./entities/api-key.ts":
/*!*****************************!*\
  !*** ./entities/api-key.ts ***!
  \*****************************/
/*! exports provided: wrapApiKey, wrapApiKeyCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapApiKey", function() { return wrapApiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapApiKeyCollection", function() { return wrapApiKeyCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createApiKeyApi(makeRequest) {
  var getParams = function getParams(data) {
    var _data$sys$space$sys$i, _data$sys$space;

    return {
      spaceId: (_data$sys$space$sys$i = (_data$sys$space = data.sys.space) === null || _data$sys$space === void 0 ? void 0 : _data$sys$space.sys.id) !== null && _data$sys$space$sys$i !== void 0 ? _data$sys$space$sys$i : '',
      apiKeyId: data.sys.id
    };
  };

  return {
    update: function update() {
      var self = this;
      return makeRequest({
        entityType: 'ApiKey',
        action: 'update',
        params: getParams(self),
        payload: self,
        headers: {}
      }).then(function (data) {
        return wrapApiKey(makeRequest, data);
      });
    },
    "delete": function del() {
      var self = this;
      return makeRequest({
        entityType: 'ApiKey',
        action: 'delete',
        params: getParams(self)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 */


function wrapApiKey(makeRequest, data) {
  var apiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var apiKeyWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(apiKey, createApiKeyApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(apiKeyWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */

var wrapApiKeyCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapApiKey);

/***/ }),

/***/ "./entities/app-bundle.ts":
/*!********************************!*\
  !*** ./entities/app-bundle.ts ***!
  \********************************/
/*! exports provided: wrapAppBundle, wrapAppBundleCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppBundle", function() { return wrapAppBundle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppBundleCollection", function() { return wrapAppBundleCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createAppBundleApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      organizationId: data.sys.organization.sys.id,
      appDefinitionId: data.sys.appDefinition.sys.id,
      appBundleId: data.sys.id
    };
  };

  return {
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle data
 * @return Wrapped App Bundle data
 */


function wrapAppBundle(makeRequest, data) {
  var appBundle = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var appBundleWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(appBundle, createAppBundleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appBundleWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @return Wrapped App Bundle collection data
 */

var wrapAppBundleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapAppBundle);

/***/ }),

/***/ "./entities/app-definition.ts":
/*!************************************!*\
  !*** ./entities/app-definition.ts ***!
  \************************************/
/*! exports provided: wrapAppDefinition, wrapAppDefinitionCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppDefinition", function() { return wrapAppDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppDefinitionCollection", function() { return wrapAppDefinitionCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _create_app_definition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../create-app-definition-api */ "./create-app-definition-api.ts");






/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition data
 * @return Wrapped App Definition data
 */
function wrapAppDefinition(makeRequest, data) {
  var appDefinition = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var appDefinitionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(appDefinition, Object(_create_app_definition_api__WEBPACK_IMPORTED_MODULE_4__["default"])(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(appDefinitionWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */

var wrapAppDefinitionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAppDefinition);

/***/ }),

/***/ "./entities/app-installation.ts":
/*!**************************************!*\
  !*** ./entities/app-installation.ts ***!
  \**************************************/
/*! exports provided: wrapAppInstallation, wrapAppInstallationCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppInstallation", function() { return wrapAppInstallation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppInstallationCollection", function() { return wrapAppInstallationCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createAppInstallationApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      environmentId: data.sys.environment.sys.id,
      appDefinitionId: data.sys.appDefinition.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: getParams(data),
        headers: {},
        payload: data
      }).then(function (data) {
        return wrapAppInstallation(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Installation data
 * @return Wrapped App installation data
 */


function wrapAppInstallation(makeRequest, data) {
  var appInstallation = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var appInstallationWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(appInstallation, createAppInstallationApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appInstallationWithMethods);
}
/**
 * @private
 */

var wrapAppInstallationCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAppInstallation);

/***/ }),

/***/ "./entities/app-upload.ts":
/*!********************************!*\
  !*** ./entities/app-upload.ts ***!
  \********************************/
/*! exports provided: wrapAppUpload, wrapAppUploadCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppUpload", function() { return wrapAppUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAppUploadCollection", function() { return wrapAppUploadCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createAppUploadApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      organizationId: data.sys.organization.sys.id,
      appUploadId: data.sys.id
    };
  };

  return {
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload data
 * @return Wrapped App Upload data
 */


function wrapAppUpload(makeRequest, data) {
  var appUpload = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var appUploadWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(appUpload, createAppUploadApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appUploadWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload collection data
 * @return Wrapped App Upload collection data
 */

var wrapAppUploadCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapAppUpload);

/***/ }),

/***/ "./entities/asset-key.ts":
/*!*******************************!*\
  !*** ./entities/asset-key.ts ***!
  \*******************************/
/*! exports provided: wrapAssetKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAssetKey", function() { return wrapAssetKey; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");



/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset key data
 * @return Wrapped asset key data
 */
function wrapAssetKey(_makeRequest, data) {
  var assetKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  return assetKey;
}

/***/ }),

/***/ "./entities/asset.ts":
/*!***************************!*\
  !*** ./entities/asset.ts ***!
  \***************************/
/*! exports provided: wrapAsset, wrapAssetCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAsset", function() { return wrapAsset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapAssetCollection", function() { return wrapAssetCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _plain_checks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plain/checks */ "./plain/checks.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function createAssetApi(makeRequest) {
  var getParams = function getParams(raw) {
    return {
      spaceId: raw.sys.space.sys.id,
      environmentId: raw.sys.environment.sys.id,
      assetId: raw.sys.id
    };
  };

  return {
    processForLocale: function processForLocale(locale, options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForLocale',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          locale: locale,
          options: options,
          asset: raw
        })
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    processForAllLocales: function processForAllLocales(options) {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForAllLocales',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          asset: raw,
          options: options
        })
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'update',
        params: getParams(raw),
        payload: raw,
        headers: {}
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'delete',
        params: getParams(raw)
      });
    },
    publish: function publish() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'publish',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    unpublish: function unpublish() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unpublish',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    archive: function archive() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'archive',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    unarchive: function unarchive() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unarchive',
        params: getParams(raw)
      }).then(function (data) {
        return wrapAsset(makeRequest, data);
      });
    },
    isPublished: function isPublished() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isPublished"](raw);
    },
    isUpdated: function isUpdated() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isUpdated"](raw);
    },
    isDraft: function isDraft() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isDraft"](raw);
    },
    isArchived: function isArchived() {
      var raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isArchived"](raw);
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw asset data
 * @return Wrapped asset data
 */


function wrapAsset(makeRequest, data) {
  var asset = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var assetWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(asset, createAssetApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(assetWithMethods);
}
/**
 * @private
 */

var wrapAssetCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAsset);

/***/ }),

/***/ "./entities/bulk-action.ts":
/*!*********************************!*\
  !*** ./entities/bulk-action.ts ***!
  \*********************************/
/*! exports provided: BulkActionStatus, wrapBulkAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkActionStatus", function() { return BulkActionStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapBulkAction", function() { return wrapBulkAction; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _methods_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/action */ "./methods/action.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */




/** Entity types supported by the BulkAction API */

/** Represents the state of the BulkAction */
var BulkActionStatus;

(function (BulkActionStatus) {
  BulkActionStatus["created"] = "created";
  BulkActionStatus["inProgress"] = "inProgress";
  BulkActionStatus["succeeded"] = "succeeded";
  BulkActionStatus["failed"] = "failed";
})(BulkActionStatus || (BulkActionStatus = {}));

var STATUSES = Object.values(BulkActionStatus);

function createBulkActionApi(makeRequest) {
  var getParams = function getParams(self) {
    var bulkAction = self.toPlainObject();
    return {
      spaceId: bulkAction.sys.space.sys.id,
      environmentId: bulkAction.sys.environment.sys.id,
      bulkActionId: bulkAction.sys.id
    };
  };

  return {
    get: function get() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = getParams(_this);
                return _context.abrupt("return", makeRequest({
                  entityType: 'BulkAction',
                  action: 'get',
                  params: params
                }).then(function (bulkAction) {
                  return wrapBulkAction(makeRequest, bulkAction);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    waitProcessing: function waitProcessing(options) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", Object(_methods_action__WEBPACK_IMPORTED_MODULE_3__["pollAsyncActionStatus"])( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", _this2.get());

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), options));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
}

/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @return Wrapped BulkAction data
 */
function wrapBulkAction(makeRequest, data) {
  var bulkAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var bulkActionWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(bulkAction, createBulkActionApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(bulkActionWithApiMethods);
}

/***/ }),

/***/ "./entities/content-type.ts":
/*!**********************************!*\
  !*** ./entities/content-type.ts ***!
  \**********************************/
/*! exports provided: wrapContentType, wrapContentTypeCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapContentType", function() { return wrapContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapContentTypeCollection", function() { return wrapContentTypeCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _plain_checks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plain/checks */ "./plain/checks.ts");
/* harmony import */ var _editor_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor-interface */ "./entities/editor-interface.ts");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./snapshot */ "./entities/snapshot.ts");
/* harmony import */ var _methods_content_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../methods/content-type */ "./methods/content-type.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










function createContentTypeApi(makeRequest) {
  var getParams = function getParams(self) {
    var contentType = self.toPlainObject();
    return {
      raw: contentType,
      params: {
        spaceId: contentType.sys.space.sys.id,
        environmentId: contentType.sys.environment.sys.id,
        contentTypeId: contentType.sys.id
      }
    };
  };

  return {
    update: function update() {
      var _getParams = getParams(this),
          raw = _getParams.raw,
          params = _getParams.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'update',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var _getParams2 = getParams(this),
          params = _getParams2.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'delete',
        params: params
      }).then(function () {// noop
      });
    },
    publish: function publish() {
      var _getParams3 = getParams(this),
          raw = _getParams3.raw,
          params = _getParams3.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'publish',
        params: params,
        payload: raw
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    unpublish: function unpublish() {
      var _getParams4 = getParams(this),
          params = _getParams4.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'unpublish',
        params: params
      }).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    },
    getEditorInterface: function getEditorInterface() {
      var _getParams5 = getParams(this),
          params = _getParams5.params;

      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: params
      }).then(function (data) {
        return Object(_editor_interface__WEBPACK_IMPORTED_MODULE_5__["wrapEditorInterface"])(makeRequest, data);
      });
    },
    getSnapshots: function getSnapshots() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _getParams6 = getParams(this),
          params = _getParams6.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query: query
        })
      }).then(function (data) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshotCollection"])(makeRequest, data);
      });
    },
    getSnapshot: function getSnapshot(snapshotId) {
      var _getParams7 = getParams(this),
          params = _getParams7.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId: snapshotId
        })
      }).then(function (data) {
        return Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshot"])(makeRequest, data);
      });
    },
    isPublished: function isPublished() {
      return Object(_plain_checks__WEBPACK_IMPORTED_MODULE_4__["isPublished"])(this);
    },
    isUpdated: function isUpdated() {
      return Object(_plain_checks__WEBPACK_IMPORTED_MODULE_4__["isUpdated"])(this);
    },
    isDraft: function isDraft() {
      return Object(_plain_checks__WEBPACK_IMPORTED_MODULE_4__["isDraft"])(this);
    },
    omitAndDeleteField: function omitAndDeleteField(fieldId) {
      var _getParams8 = getParams(this),
          raw = _getParams8.raw,
          params = _getParams8.params;

      return Object(_methods_content_type__WEBPACK_IMPORTED_MODULE_7__["omitAndDeleteField"])(makeRequest, _objectSpread(_objectSpread({}, params), {}, {
        fieldId: fieldId
      }), raw).then(function (data) {
        return wrapContentType(makeRequest, data);
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw content type data
 * @return Wrapped content type data
 */


function wrapContentType(makeRequest, data) {
  var contentType = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var contentTypeWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(contentType, createContentTypeApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(contentTypeWithMethods);
}
/**
 * @private
 */

var wrapContentTypeCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapContentType);

/***/ }),

/***/ "./entities/editor-interface.ts":
/*!**************************************!*\
  !*** ./entities/editor-interface.ts ***!
  \**************************************/
/*! exports provided: wrapEditorInterface, wrapEditorInterfaceCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEditorInterface", function() { return wrapEditorInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEditorInterfaceCollection", function() { return wrapEditorInterfaceCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createEditorInterfaceApi(makeRequest) {
  return {
    update: function update() {
      var self = this;
      var raw = self.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'update',
        params: {
          spaceId: self.sys.space.sys.id,
          environmentId: self.sys.environment.sys.id,
          contentTypeId: self.sys.contentType.sys.id
        },
        payload: raw
      }).then(function (response) {
        return wrapEditorInterface(makeRequest, response);
      });
    },
    getControlForField: function getControlForField(fieldId) {
      var self = this;
      var result = (self.controls || []).filter(function (control) {
        return control.fieldId === fieldId;
      });
      return result && result.length > 0 ? result[0] : null;
    }
  };
}
/**
 * @private
 */


function wrapEditorInterface(makeRequest, data) {
  var editorInterface = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var editorInterfaceWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(editorInterface, createEditorInterfaceApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(editorInterfaceWithMethods);
}
/**
 * @private
 */

var wrapEditorInterfaceCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapEditorInterface);

/***/ }),

/***/ "./entities/entry.ts":
/*!***************************!*\
  !*** ./entities/entry.ts ***!
  \***************************/
/*! exports provided: wrapEntry, wrapEntryCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEntry", function() { return wrapEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEntryCollection", function() { return wrapEntryCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _create_entry_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-entry-api */ "./create-entry-api.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");






/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw entry data
 * @return Wrapped entry data
 */
function wrapEntry(makeRequest, data) {
  var entry = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var entryWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(entry, Object(_create_entry_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(entryWithMethods);
}
/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */

var wrapEntryCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapEntry);

/***/ }),

/***/ "./entities/environment-alias.ts":
/*!***************************************!*\
  !*** ./entities/environment-alias.ts ***!
  \***************************************/
/*! exports provided: wrapEnvironmentAlias, wrapEnvironmentAliasCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentAlias", function() { return wrapEnvironmentAlias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentAliasCollection", function() { return wrapEnvironmentAliasCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createEnvironmentAliasApi(makeRequest) {
  var getParams = function getParams(alias) {
    return {
      spaceId: alias.sys.space.sys.id,
      environmentAliasId: alias.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapEnvironmentAlias(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'delete',
        params: getParams(raw)
      }).then(function () {// noop
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw environment alias data
 * @return Wrapped environment alias data
 */


function wrapEnvironmentAlias(makeRequest, data) {
  var alias = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var enhancedAlias = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(alias, createEnvironmentAliasApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedAlias);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw environment alias collection data
 * @return Wrapped environment alias collection data
 */

var wrapEnvironmentAliasCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapEnvironmentAlias);

/***/ }),

/***/ "./entities/environment.ts":
/*!*********************************!*\
  !*** ./entities/environment.ts ***!
  \*********************************/
/*! exports provided: wrapEnvironment, wrapEnvironmentCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironment", function() { return wrapEnvironment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapEnvironmentCollection", function() { return wrapEnvironmentCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _create_environment_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-environment-api */ "./create-environment-api.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");






/**
 * This method creates the API for the given environment with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a environment id, so the base path for requests now has the
 * environment id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Environment
 * @return
 */
function wrapEnvironment(makeRequest, data) {
  // do not pollute generated typings
  var environment = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var environmentApi = Object(_create_environment_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  var enhancedEnvironment = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(environment, environmentApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedEnvironment);
}
/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 */

var wrapEnvironmentCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["wrapCollection"])(wrapEnvironment);

/***/ }),

/***/ "./entities/extension.ts":
/*!*******************************!*\
  !*** ./entities/extension.ts ***!
  \*******************************/
/*! exports provided: wrapExtension, wrapExtensionCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapExtension", function() { return wrapExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapExtensionCollection", function() { return wrapExtensionCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createExtensionApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      environmentId: data.sys.environment.sys.id,
      extensionId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (response) {
        return wrapExtension(makeRequest, response);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw UI Extension data
 * @return Wrapped UI Extension data
 */


function wrapExtension(makeRequest, data) {
  var extension = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var extensionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(extension, createExtensionApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(extensionWithMethods);
}
/**
 * @private
 */

var wrapExtensionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapExtension);

/***/ }),

/***/ "./entities/index.ts":
/*!***************************!*\
  !*** ./entities/index.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_key__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-key */ "./entities/api-key.ts");
/* harmony import */ var _app_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bundle */ "./entities/app-bundle.ts");
/* harmony import */ var _app_definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-definition */ "./entities/app-definition.ts");
/* harmony import */ var _app_installation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-installation */ "./entities/app-installation.ts");
/* harmony import */ var _app_upload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-upload */ "./entities/app-upload.ts");
/* harmony import */ var _asset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./asset */ "./entities/asset.ts");
/* harmony import */ var _asset_key__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./asset-key */ "./entities/asset-key.ts");
/* harmony import */ var _bulk_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bulk-action */ "./entities/bulk-action.ts");
/* harmony import */ var _content_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./content-type */ "./entities/content-type.ts");
/* harmony import */ var _editor_interface__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor-interface */ "./entities/editor-interface.ts");
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./entry */ "./entities/entry.ts");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./environment */ "./entities/environment.ts");
/* harmony import */ var _environment_alias__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./environment-alias */ "./entities/environment-alias.ts");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./extension */ "./entities/extension.ts");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./locale */ "./entities/locale.ts");
/* harmony import */ var _organization__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./organization */ "./entities/organization.ts");
/* harmony import */ var _organization_invitation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./organization-invitation */ "./entities/organization-invitation.ts");
/* harmony import */ var _organization_membership__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./organization-membership */ "./entities/organization-membership.ts");
/* harmony import */ var _personal_access_token__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./personal-access-token */ "./entities/personal-access-token.ts");
/* harmony import */ var _preview_api_key__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./preview-api-key */ "./entities/preview-api-key.ts");
/* harmony import */ var _release__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./release */ "./entities/release.ts");
/* harmony import */ var _release_action__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./release-action */ "./entities/release-action.ts");
/* harmony import */ var _role__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./role */ "./entities/role.ts");
/* harmony import */ var _scheduled_action__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./scheduled-action */ "./entities/scheduled-action.ts");
/* harmony import */ var _snapshot__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./snapshot */ "./entities/snapshot.ts");
/* harmony import */ var _space__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./space */ "./entities/space.ts");
/* harmony import */ var _space_member__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./space-member */ "./entities/space-member.ts");
/* harmony import */ var _space_membership__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./space-membership */ "./entities/space-membership.ts");
/* harmony import */ var _team__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./team */ "./entities/team.ts");
/* harmony import */ var _team_membership__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./team-membership */ "./entities/team-membership.ts");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./tag */ "./entities/tag.ts");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./task */ "./entities/task.ts");
/* harmony import */ var _team_space_membership__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./team-space-membership */ "./entities/team-space-membership.ts");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./upload */ "./entities/upload.ts");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./usage */ "./entities/usage.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./user */ "./entities/user.ts");
/* harmony import */ var _webhook__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./webhook */ "./entities/webhook.ts");





































/* harmony default export */ __webpack_exports__["default"] = ({
  appBundle: _app_bundle__WEBPACK_IMPORTED_MODULE_1__,
  apiKey: _api_key__WEBPACK_IMPORTED_MODULE_0__,
  appDefinition: _app_definition__WEBPACK_IMPORTED_MODULE_2__,
  appInstallation: _app_installation__WEBPACK_IMPORTED_MODULE_3__,
  appUpload: _app_upload__WEBPACK_IMPORTED_MODULE_4__,
  asset: _asset__WEBPACK_IMPORTED_MODULE_5__,
  assetKey: _asset_key__WEBPACK_IMPORTED_MODULE_6__,
  bulkAction: _bulk_action__WEBPACK_IMPORTED_MODULE_7__,
  contentType: _content_type__WEBPACK_IMPORTED_MODULE_8__,
  editorInterface: _editor_interface__WEBPACK_IMPORTED_MODULE_9__,
  entry: _entry__WEBPACK_IMPORTED_MODULE_10__,
  environment: _environment__WEBPACK_IMPORTED_MODULE_11__,
  environmentAlias: _environment_alias__WEBPACK_IMPORTED_MODULE_12__,
  extension: _extension__WEBPACK_IMPORTED_MODULE_13__,
  locale: _locale__WEBPACK_IMPORTED_MODULE_14__,
  organization: _organization__WEBPACK_IMPORTED_MODULE_15__,
  organizationInvitation: _organization_invitation__WEBPACK_IMPORTED_MODULE_16__,
  organizationMembership: _organization_membership__WEBPACK_IMPORTED_MODULE_17__,
  personalAccessToken: _personal_access_token__WEBPACK_IMPORTED_MODULE_18__,
  previewApiKey: _preview_api_key__WEBPACK_IMPORTED_MODULE_19__,
  release: _release__WEBPACK_IMPORTED_MODULE_20__,
  releaseAction: _release_action__WEBPACK_IMPORTED_MODULE_21__,
  role: _role__WEBPACK_IMPORTED_MODULE_22__,
  scheduledAction: _scheduled_action__WEBPACK_IMPORTED_MODULE_23__,
  snapshot: _snapshot__WEBPACK_IMPORTED_MODULE_24__,
  space: _space__WEBPACK_IMPORTED_MODULE_25__,
  spaceMember: _space_member__WEBPACK_IMPORTED_MODULE_26__,
  spaceMembership: _space_membership__WEBPACK_IMPORTED_MODULE_27__,
  tag: _tag__WEBPACK_IMPORTED_MODULE_30__,
  task: _task__WEBPACK_IMPORTED_MODULE_31__,
  team: _team__WEBPACK_IMPORTED_MODULE_28__,
  teamMembership: _team_membership__WEBPACK_IMPORTED_MODULE_29__,
  teamSpaceMembership: _team_space_membership__WEBPACK_IMPORTED_MODULE_32__,
  upload: _upload__WEBPACK_IMPORTED_MODULE_33__,
  usage: _usage__WEBPACK_IMPORTED_MODULE_34__,
  user: _user__WEBPACK_IMPORTED_MODULE_35__,
  webhook: _webhook__WEBPACK_IMPORTED_MODULE_36__
});

/***/ }),

/***/ "./entities/locale.ts":
/*!****************************!*\
  !*** ./entities/locale.ts ***!
  \****************************/
/*! exports provided: wrapLocale, wrapLocaleCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapLocale", function() { return wrapLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapLocaleCollection", function() { return wrapLocaleCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createLocaleApi(makeRequest) {
  var getParams = function getParams(locale) {
    return {
      spaceId: locale.sys.space.sys.id,
      environmentId: locale.sys.environment.sys.id,
      localeId: locale.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapLocale(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'delete',
        params: getParams(raw)
      }).then(function () {// noop
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw locale data
 * @return Wrapped locale data
 */


function wrapLocale(makeRequest, data) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  delete data.internal_code;
  var locale = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var localeWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(locale, createLocaleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(localeWithMethods);
}
/**
 * @private
 */

var wrapLocaleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapLocale);

/***/ }),

/***/ "./entities/organization-invitation.ts":
/*!*********************************************!*\
  !*** ./entities/organization-invitation.ts ***!
  \*********************************************/
/*! exports provided: wrapOrganizationInvitation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganizationInvitation", function() { return wrapOrganizationInvitation; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
function wrapOrganizationInvitation(_makeRequest, data) {
  var invitation = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(invitation);
}

/***/ }),

/***/ "./entities/organization-membership.ts":
/*!*********************************************!*\
  !*** ./entities/organization-membership.ts ***!
  \*********************************************/
/*! exports provided: wrapOrganizationMembership, wrapOrganizationMembershipCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganizationMembership", function() { return wrapOrganizationMembership; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganizationMembershipCollection", function() { return wrapOrganizationMembershipCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createOrganizationMembershipApi(makeRequest, organizationId) {
  var getParams = function getParams(data) {
    return {
      organizationMembershipId: data.sys.id,
      organizationId: organizationId
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapOrganizationMembership(makeRequest, data, organizationId);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {Object} data - Raw organization membership data
 * @return {OrganizationMembership} Wrapped organization membership data
 */


function wrapOrganizationMembership(makeRequest, data, organizationId) {
  var organizationMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var organizationMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(organizationMembership, createOrganizationMembershipApi(makeRequest, organizationId));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(organizationMembershipWithMethods);
}
/**
 * @private
 */

var wrapOrganizationMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapOrganizationMembership);

/***/ }),

/***/ "./entities/organization.ts":
/*!**********************************!*\
  !*** ./entities/organization.ts ***!
  \**********************************/
/*! exports provided: wrapOrganization, wrapOrganizationCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganization", function() { return wrapOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapOrganizationCollection", function() { return wrapOrganizationCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _create_organization_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-organization-api */ "./create-organization-api.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");






/**
 * This method creates the API for the given organization with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with an organization id, so the base path for requests now has the
 * organization id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for an Organization
 * @return {Organization}
 */
function wrapOrganization(makeRequest, data) {
  var org = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var orgApi = Object(_create_organization_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  var enhancedOrganization = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(org, orgApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedOrganization);
}
/**
 * This method normalizes each organization in a collection.
 * @private
 */

var wrapOrganizationCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["wrapCollection"])(wrapOrganization);

/***/ }),

/***/ "./entities/personal-access-token.ts":
/*!*******************************************!*\
  !*** ./entities/personal-access-token.ts ***!
  \*******************************************/
/*! exports provided: wrapPersonalAccessToken, wrapPersonalAccessTokenCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPersonalAccessToken", function() { return wrapPersonalAccessToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPersonalAccessTokenCollection", function() { return wrapPersonalAccessTokenCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw  personal access token data
 * @return Wrapped personal access token
 */
function wrapPersonalAccessToken(makeRequest, data) {
  var personalAccessToken = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var personalAccessTokenWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(personalAccessToken, {
    revoke: function revoke() {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'revoke',
        params: {
          tokenId: data.sys.id
        }
      }).then(function (data) {
        return wrapPersonalAccessToken(makeRequest, data);
      });
    }
  });
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(personalAccessTokenWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw personal access collection data
 * @return Wrapped personal access token collection data
 */

var wrapPersonalAccessTokenCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapPersonalAccessToken);

/***/ }),

/***/ "./entities/preview-api-key.ts":
/*!*************************************!*\
  !*** ./entities/preview-api-key.ts ***!
  \*************************************/
/*! exports provided: wrapPreviewApiKey, wrapPreviewApiKeyCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPreviewApiKey", function() { return wrapPreviewApiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapPreviewApiKeyCollection", function() { return wrapPreviewApiKeyCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createPreviewApiKeyApi() {
  return {};
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key data
 * @return Wrapped preview api key data
 */


function wrapPreviewApiKey(_makeRequest, data) {
  var previewApiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var previewApiKeyWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(previewApiKey, createPreviewApiKeyApi());
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(previewApiKeyWithMethods);
}
/**
 * @private
 */

var wrapPreviewApiKeyCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapPreviewApiKey);

/***/ }),

/***/ "./entities/release-action.ts":
/*!************************************!*\
  !*** ./entities/release-action.ts ***!
  \************************************/
/*! exports provided: wrapReleaseAction, wrapReleaseActionCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapReleaseAction", function() { return wrapReleaseAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapReleaseActionCollection", function() { return wrapReleaseActionCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _methods_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/action */ "./methods/action.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */






function createReleaseActionApi(makeRequest) {
  var getParams = function getParams(self) {
    var action = self.toPlainObject();
    return {
      spaceId: action.sys.space.sys.id,
      environmentId: action.sys.environment.sys.id,
      releaseId: action.sys.release.sys.id,
      actionId: action.sys.id
    };
  };

  return {
    get: function get() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = getParams(_this);
                return _context.abrupt("return", makeRequest({
                  entityType: 'ReleaseAction',
                  action: 'get',
                  params: params
                }).then(function (releaseAction) {
                  return wrapReleaseAction(makeRequest, releaseAction);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /** Waits for a Release Action to complete */
    waitProcessing: function waitProcessing(options) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", Object(_methods_action__WEBPACK_IMPORTED_MODULE_3__["pollAsyncActionStatus"])( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", _this2.get());

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                })), options));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
  };
}

/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
function wrapReleaseAction(makeRequest, data) {
  var releaseAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var releaseActionWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(releaseAction, createReleaseActionApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(releaseActionWithApiMethods);
}
var wrapReleaseActionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapReleaseAction);

/***/ }),

/***/ "./entities/release.ts":
/*!*****************************!*\
  !*** ./entities/release.ts ***!
  \*****************************/
/*! exports provided: wrapRelease, wrapReleaseCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRelease", function() { return wrapRelease; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapReleaseCollection", function() { return wrapReleaseCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _release_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./release-action */ "./entities/release-action.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */





/** Entity types supported by the Release API */

function createReleaseApi(makeRequest) {
  var getParams = function getParams(self) {
    var release = self.toPlainObject();
    return {
      spaceId: release.sys.space.sys.id,
      environmentId: release.sys.environment.sys.id,
      releaseId: release.sys.id,
      version: release.sys.version
    };
  };

  return {
    update: function update(payload) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = getParams(_this);
                return _context.abrupt("return", makeRequest({
                  entityType: 'Release',
                  action: 'update',
                  params: params,
                  payload: payload
                }).then(function (release) {
                  return wrapRelease(makeRequest, release);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    "delete": function _delete() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var params;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = getParams(_this2);
                _context2.next = 3;
                return makeRequest({
                  entityType: 'Release',
                  action: 'delete',
                  params: params
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    publish: function publish(options) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var params;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = getParams(_this3);
                return _context3.abrupt("return", makeRequest({
                  entityType: 'Release',
                  action: 'publish',
                  params: params
                }).then(function (data) {
                  return Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data);
                }).then(function (action) {
                  return action.waitProcessing(options);
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    unpublish: function unpublish(options) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var params;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = getParams(_this4);
                return _context4.abrupt("return", makeRequest({
                  entityType: 'Release',
                  action: 'unpublish',
                  params: params
                }).then(function (data) {
                  return Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data);
                }).then(function (action) {
                  return action.waitProcessing(options);
                }));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    validate: function validate(options) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var params;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = getParams(_this5);
                return _context5.abrupt("return", makeRequest({
                  entityType: 'Release',
                  action: 'validate',
                  params: params,
                  payload: options === null || options === void 0 ? void 0 : options.payload
                }).then(function (data) {
                  return Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data);
                }).then(function (action) {
                  return action.waitProcessing(options === null || options === void 0 ? void 0 : options.processingOptions);
                }));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  };
}

/**
 * Return a Release object enhanced with its own API helper functions.
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
function wrapRelease(makeRequest, data) {
  var release = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var releaseWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(release, createReleaseApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(releaseWithApiMethods);
}
var wrapReleaseCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapRelease);

/***/ }),

/***/ "./entities/role.ts":
/*!**************************!*\
  !*** ./entities/role.ts ***!
  \**************************/
/*! exports provided: wrapRole, wrapRoleCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRole", function() { return wrapRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRoleCollection", function() { return wrapRoleCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createRoleApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      roleId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapRole(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw role data
 * @return Wrapped role data
 */


function wrapRole(makeRequest, data) {
  var role = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var roleWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(role, createRoleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(roleWithMethods);
}
/**
 * @private
 */

var wrapRoleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapRole);

/***/ }),

/***/ "./entities/scheduled-action.ts":
/*!**************************************!*\
  !*** ./entities/scheduled-action.ts ***!
  \**************************************/
/*! exports provided: default, wrapScheduledAction, wrapScheduledActionCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getInstanceMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapScheduledAction", function() { return wrapScheduledAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapScheduledActionCollection", function() { return wrapScheduledActionCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/**
 * Represents that state of the scheduled action
 */

var ScheduledActionStatus;

(function (ScheduledActionStatus) {
  ScheduledActionStatus["scheduled"] = "scheduled";
  ScheduledActionStatus["inProgress"] = "inProgress";
  ScheduledActionStatus["succeeded"] = "succeeded";
  ScheduledActionStatus["failed"] = "failed";
  ScheduledActionStatus["canceled"] = "canceled";
})(ScheduledActionStatus || (ScheduledActionStatus = {}));

function getInstanceMethods(makeRequest) {
  var getParams = function getParams(self) {
    var _scheduledAction$envi;

    var scheduledAction = self.toPlainObject();
    return {
      spaceId: scheduledAction.sys.space.sys.id,
      environmentId: (_scheduledAction$envi = scheduledAction.environment) === null || _scheduledAction$envi === void 0 ? void 0 : _scheduledAction$envi.sys.id,
      scheduledActionId: scheduledAction.sys.id,
      version: scheduledAction.sys.version
    };
  };

  return {
    /**
     * Cancels the current Scheduled Action schedule.
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *    .then((scheduledAction) => scheduledAction.delete())
     *    .then((deletedScheduledAction) => console.log(deletedScheduledAction))
     *    .catch(console.error);
     * ```
     */
    "delete": function _delete() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = getParams(_this);
                return _context.abrupt("return", makeRequest({
                  entityType: 'ScheduledAction',
                  action: 'delete',
                  params: params
                }).then(function (data) {
                  return wrapScheduledAction(makeRequest, data);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },

    /**
     * Update the current scheduled action. Currently, only changes made to the `scheduledFor` property will be saved.
     *
     * @example ```javascript
     *  const contentful = require('contentful-management');
     *
     *  const client = contentful.createClient({
     *    accessToken: '<content_management_api_key>'
     *  })
     *
     *  client.getSpace('<space_id>')
     *    .then((space) => {
     *      return space.createScheduledAction({
     *        entity: {
     *          sys: {
     *            type: 'Link',
     *            linkType: 'Entry',
     *            id: '<entry_id>'
     *          }
     *        },
     *        environment: {
     *          type: 'Link',
     *          linkType: 'Environment',
     *          id: '<environment_id>'
     *        },
     *        action: 'publish',
     *        scheduledFor: {
     *          dateTime: <ISO_date_string>,
     *          timezone: 'Europe/Berlin'
     *        }
     *      })
     *    .then((scheduledAction) => {
     *      scheduledAction.scheduledFor.timezone = 'Europe/Paris';
     *      return scheduledAction.update();
     *    })
     *    .then((scheduledAction) => console.log(scheduledAction))
     *    .catch(console.error);
     * ```
     */
    update: function update() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var params, _this2$toPlainObject, sys, payload;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = getParams(_this2); // eslint-disable-next-line @typescript-eslint/no-unused-vars

                _this2$toPlainObject = _this2.toPlainObject(), sys = _this2$toPlainObject.sys, payload = _objectWithoutProperties(_this2$toPlainObject, ["sys"]);
                return _context2.abrupt("return", makeRequest({
                  entityType: 'ScheduledAction',
                  action: 'update',
                  params: params,
                  payload: payload
                }).then(function (data) {
                  return wrapScheduledAction(makeRequest, data);
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  };
}
function wrapScheduledAction(makeRequest, data) {
  var scheduledAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var scheduledActionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(scheduledAction, getInstanceMethods(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(scheduledActionWithMethods);
}
var wrapScheduledActionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapScheduledAction);

/***/ }),

/***/ "./entities/snapshot.ts":
/*!******************************!*\
  !*** ./entities/snapshot.ts ***!
  \******************************/
/*! exports provided: wrapSnapshot, wrapSnapshotCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSnapshot", function() { return wrapSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSnapshotCollection", function() { return wrapSnapshotCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createSnapshotApi() {
  return {
    /* In case the snapshot object evolve later */
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot data
 * @return Wrapped snapshot data
 */


function wrapSnapshot(_makeRequest, data) {
  var snapshot = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var snapshotWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(snapshot, createSnapshotApi());
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(snapshotWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */

var wrapSnapshotCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapSnapshot);

/***/ }),

/***/ "./entities/space-member.ts":
/*!**********************************!*\
  !*** ./entities/space-member.ts ***!
  \**********************************/
/*! exports provided: wrapSpaceMember, wrapSpaceMemberCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMember", function() { return wrapSpaceMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMemberCollection", function() { return wrapSpaceMemberCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");




/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space member data
 * @return Wrapped space member data
 */
function wrapSpaceMember(_makeRequest, data) {
  var spaceMember = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(spaceMember);
}
/**
 * @private
 */

var wrapSpaceMemberCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapSpaceMember);

/***/ }),

/***/ "./entities/space-membership.ts":
/*!**************************************!*\
  !*** ./entities/space-membership.ts ***!
  \**************************************/
/*! exports provided: wrapSpaceMembership, wrapSpaceMembershipCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMembership", function() { return wrapSpaceMembership; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceMembershipCollection", function() { return wrapSpaceMembershipCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createSpaceMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      spaceMembershipId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapSpaceMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space membership data
 * @return Wrapped space membership data
 */


function wrapSpaceMembership(makeRequest, data) {
  var spaceMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var spaceMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(spaceMembership, createSpaceMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(spaceMembershipWithMethods);
}
/**
 * @private
 */

var wrapSpaceMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapSpaceMembership);

/***/ }),

/***/ "./entities/space.ts":
/*!***************************!*\
  !*** ./entities/space.ts ***!
  \***************************/
/*! exports provided: wrapSpace, wrapSpaceCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpace", function() { return wrapSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapSpaceCollection", function() { return wrapSpaceCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _create_space_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../create-space-api */ "./create-space-api.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");






/**
 * This method creates the API for the given space with all the methods for
 * reading and creating other entities. It also passes down a clone of the
 * http client with a space id, so the base path for requests now has the
 * space id already set.
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - API response for a Space
 * @return {Space}
 */
function wrapSpace(makeRequest, data) {
  var space = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var spaceApi = Object(_create_space_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  var enhancedSpace = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(space, spaceApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(enhancedSpace);
}
/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 */

var wrapSpaceCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapSpace);

/***/ }),

/***/ "./entities/tag.ts":
/*!*************************!*\
  !*** ./entities/tag.ts ***!
  \*************************/
/*! exports provided: default, wrapTag, wrapTagCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTagApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTag", function() { return wrapTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTagCollection", function() { return wrapTagCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function createTagApi(makeRequest) {
  var getParams = function getParams(tag) {
    return {
      spaceId: tag.sys.space.sys.id,
      environmentId: tag.sys.environment.sys.id,
      tagId: tag.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTag(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'delete',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          version: raw.sys.version
        })
      }).then(function () {// noop
      });
    }
  };
}
function wrapTag(makeRequest, data) {
  var tag = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var tagWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(tag, createTagApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(tagWithMethods);
}
var wrapTagCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapTag);

/***/ }),

/***/ "./entities/task.ts":
/*!**************************!*\
  !*** ./entities/task.ts ***!
  \**************************/
/*! exports provided: default, wrapTask, wrapTaskCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTaskApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTask", function() { return wrapTask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTaskCollection", function() { return wrapTaskCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function createTaskApi(makeRequest) {
  var getParams = function getParams(task) {
    return {
      spaceId: task.sys.space.sys.id,
      environmentId: task.sys.environment.sys.id,
      entryId: task.sys.parentEntity.sys.id,
      taskId: task.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Task',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTask(makeRequest, data);
      });
    },
    "delete": function _delete() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Task',
        action: 'delete',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          version: raw.sys.version
        })
      }).then(function () {// noop
      });
    }
  };
}
function wrapTask(makeRequest, data) {
  var task = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var taskWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(task, createTaskApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(taskWithMethods);
}
var wrapTaskCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapTask);

/***/ }),

/***/ "./entities/team-membership.ts":
/*!*************************************!*\
  !*** ./entities/team-membership.ts ***!
  \*************************************/
/*! exports provided: wrapTeamMembership, wrapTeamMembershipCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeamMembership", function() { return wrapTeamMembership; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeamMembershipCollection", function() { return wrapTeamMembershipCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createTeamMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamMembershipId: data.sys.id,
      teamId: data.sys.team.sys.id,
      organizationId: data.sys.organization.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeamMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw team membership data
 * @return Wrapped team membership data
 */


function wrapTeamMembership(makeRequest, data) {
  var teamMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var teamMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(teamMembership, createTeamMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamMembershipWithMethods);
}
/**
 * @private
 */

var wrapTeamMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeamMembership);

/***/ }),

/***/ "./entities/team-space-membership.ts":
/*!*******************************************!*\
  !*** ./entities/team-space-membership.ts ***!
  \*******************************************/
/*! exports provided: wrapTeamSpaceMembership, wrapTeamSpaceMembershipCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeamSpaceMembership", function() { return wrapTeamSpaceMembership; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeamSpaceMembershipCollection", function() { return wrapTeamSpaceMembershipCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createTeamSpaceMembershipApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamSpaceMembershipId: data.sys.id,
      spaceId: data.sys.space.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeamSpaceMembership(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'delete',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space membership data
 * @return Wrapped team space membership data
 */


function wrapTeamSpaceMembership(makeRequest, data) {
  var teamSpaceMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var teamSpaceMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(teamSpaceMembership, createTeamSpaceMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamSpaceMembershipWithMethods);
}
/**
 * @private
 */

var wrapTeamSpaceMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeamSpaceMembership);

/***/ }),

/***/ "./entities/team.ts":
/*!**************************!*\
  !*** ./entities/team.ts ***!
  \**************************/
/*! exports provided: wrapTeam, wrapTeamCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeam", function() { return wrapTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapTeamCollection", function() { return wrapTeamCollection; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





/**
 * @private
 */
function createTeamApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      teamId: data.sys.id,
      organizationId: data.sys.organization.sys.id
    };
  };

  return {
    update: function update() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(function (data) {
        return wrapTeam(makeRequest, data);
      });
    },
    "delete": function del() {
      var raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'delete',
        params: getParams(raw)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw team data
 * @return Wrapped team data
 */


function wrapTeam(makeRequest, data) {
  var team = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var teamWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(team, createTeamApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamWithMethods);
}
/**
 * @private
 */

var wrapTeamCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeam);

/***/ }),

/***/ "./entities/upload.ts":
/*!****************************!*\
  !*** ./entities/upload.ts ***!
  \****************************/
/*! exports provided: wrapUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUpload", function() { return wrapUpload; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function createUploadApi(makeRequest) {
  return {
    "delete": function () {
      var _del = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var raw;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                raw = this.toPlainObject();
                _context.next = 3;
                return makeRequest({
                  entityType: 'Upload',
                  action: 'delete',
                  params: {
                    spaceId: raw.sys.space.sys.id,
                    uploadId: raw.sys.id
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function del() {
        return _del.apply(this, arguments);
      }

      return del;
    }()
  };
}
/**
 * @private
 * @param {function} makeRequest - function to make requests via an adapter
 * @param {object} data - Raw upload data
 * @return {Upload} Wrapped upload data
 */


function wrapUpload(makeRequest, data) {
  var upload = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(data));
  var uploadWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(upload, createUploadApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(uploadWithMethods);
}

/***/ }),

/***/ "./entities/usage.ts":
/*!***************************!*\
  !*** ./entities/usage.ts ***!
  \***************************/
/*! exports provided: wrapUsage, wrapUsageCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUsage", function() { return wrapUsage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUsageCollection", function() { return wrapUsageCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized usage
 */
function wrapUsage(_makeRequest, data) {
  var usage = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var usageWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(usage, {});
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(usageWithMethods);
}
/**
 * @private
 */

var wrapUsageCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapUsage);

/***/ }),

/***/ "./entities/user.ts":
/*!**************************!*\
  !*** ./entities/user.ts ***!
  \**************************/
/*! exports provided: wrapUser, wrapUserCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUser", function() { return wrapUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapUserCollection", function() { return wrapUserCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized user
 */
function wrapUser(_makeRequest, data) {
  var user = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var userWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(user, {});
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(userWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data collection
 * @return Normalized user collection
 */

var wrapUserCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapUser);

/***/ }),

/***/ "./entities/webhook.ts":
/*!*****************************!*\
  !*** ./entities/webhook.ts ***!
  \*****************************/
/*! exports provided: wrapWebhook, wrapWebhookCollection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapWebhook", function() { return wrapWebhook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapWebhookCollection", function() { return wrapWebhookCollection; });
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function createWebhookApi(makeRequest) {
  var getParams = function getParams(data) {
    return {
      spaceId: data.sys.space.sys.id,
      webhookDefinitionId: data.sys.id
    };
  };

  return {
    update: function update() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(function (data) {
        return wrapWebhook(makeRequest, data);
      });
    },
    "delete": function del() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'delete',
        params: getParams(data)
      });
    },
    getCalls: function getCalls() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getManyCallDetails',
        params: getParams(data)
      });
    },
    getCall: function getCall(id) {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getCallDetails',
        params: _objectSpread(_objectSpread({}, getParams(data)), {}, {
          callId: id
        })
      });
    },
    getHealth: function getHealth() {
      var data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getHealthStatus',
        params: getParams(data)
      });
    }
  };
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw webhook data
 * @return Wrapped webhook data
 */


function wrapWebhook(makeRequest, data) {
  var webhook = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(fast_copy__WEBPACK_IMPORTED_MODULE_1___default()(data));
  var webhookWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(webhook, createWebhookApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(webhookWithMethods);
}
/**
 * @private
 */

var wrapWebhookCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapWebhook);

/***/ }),

/***/ "./error-handler.ts":
/*!**************************!*\
  !*** ./error-handler.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return errorHandler; });
/* harmony import */ var lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.isplainobject */ "../node_modules/lodash.isplainobject/index.js");
/* harmony import */ var lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Handles errors received from the server. Parses the error into a more useful
 * format, places it in an exception and throws it.
 * See https://www.contentful.com/developers/docs/references/errors/
 * for more details on the data received on the errorResponse.data property
 * and the expected error codes.
 * @private
 */
function errorHandler(errorResponse) {
  var config = errorResponse.config,
      response = errorResponse.response;
  var errorName; // Obscure the Management token

  if (config && config.headers && config.headers['Authorization']) {
    var token = "...".concat(config.headers['Authorization'].substr(-5));
    config.headers['Authorization'] = "Bearer ".concat(token);
  }

  if (!lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(response) || !lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(config)) {
    throw errorResponse;
  }

  var data = response === null || response === void 0 ? void 0 : response.data;
  var errorData = {
    status: response === null || response === void 0 ? void 0 : response.status,
    statusText: response === null || response === void 0 ? void 0 : response.statusText,
    message: '',
    details: {}
  };

  if (lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(config)) {
    errorData.request = {
      url: config.url,
      headers: config.headers,
      method: config.method,
      payloadData: config.data
    };
  }

  if (data && lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(data)) {
    if ('requestId' in data) {
      errorData.requestId = data.requestId || 'UNKNOWN';
    }

    if ('message' in data) {
      errorData.message = data.message || '';
    }

    if ('details' in data) {
      errorData.details = data.details || {};
    }

    if ('sys' in data) {
      if ('id' in data.sys) {
        errorName = data.sys.id;
      }
    }
  }

  var error = new Error();
  error.name = errorName && errorName !== 'Unknown' ? errorName : "".concat(response === null || response === void 0 ? void 0 : response.status, " ").concat(response === null || response === void 0 ? void 0 : response.statusText);

  try {
    error.message = JSON.stringify(errorData, null, '  ');
  } catch (_unused) {
    var _errorData$message;

    error.message = (_errorData$message = errorData === null || errorData === void 0 ? void 0 : errorData.message) !== null && _errorData$message !== void 0 ? _errorData$message : '';
  }

  throw error;
}

/***/ }),

/***/ "./methods/action.ts":
/*!***************************!*\
  !*** ./methods/action.ts ***!
  \***************************/
/*! exports provided: AsyncActionProcessingError, AsyncActionFailedError, pollAsyncActionStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncActionProcessingError", function() { return AsyncActionProcessingError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncActionFailedError", function() { return AsyncActionFailedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pollAsyncActionStatus", function() { return pollAsyncActionStatus; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./methods/utils.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/* eslint-disable @typescript-eslint/no-explicit-any */

var DEFAULT_MAX_RETRIES = 30;
var DEFAULT_INITIAL_DELAY_MS = 1000;
var DEFAULT_RETRY_INTERVAL_MS = 2000;
/** Action is an interface that has a sys.status to be checked against */

var AsyncActionProcessingError = /*#__PURE__*/function (_Error) {
  _inherits(AsyncActionProcessingError, _Error);

  var _super = _createSuper(AsyncActionProcessingError);

  function AsyncActionProcessingError(message, action) {
    var _this;

    _classCallCheck(this, AsyncActionProcessingError);

    _this = _super.call(this, message);
    _this.action = action;
    _this.name = _this.constructor.name;
    return _this;
  }

  return AsyncActionProcessingError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var AsyncActionFailedError = /*#__PURE__*/function (_AsyncActionProcessin) {
  _inherits(AsyncActionFailedError, _AsyncActionProcessin);

  var _super2 = _createSuper(AsyncActionFailedError);

  function AsyncActionFailedError() {
    _classCallCheck(this, AsyncActionFailedError);

    return _super2.apply(this, arguments);
  }

  return AsyncActionFailedError;
}(AsyncActionProcessingError);

/**
 * @description Waits for an Action to be completed and to be in one of the final states (failed or succeeded)
 * @param {Function} actionFunction - GET function that will be called every interval to fetch an Action status
 * @throws {ActionFailedError} throws an error if `throwOnFailedExecution = true` with the Action that failed.
 * @throws {AsyncActionProcessingError} throws an error with a Action when processing takes too long.
 */
function pollAsyncActionStatus(_x, _x2) {
  return _pollAsyncActionStatus.apply(this, arguments);
}

function _pollAsyncActionStatus() {
  _pollAsyncActionStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(actionFunction, options) {
    var _options$retryCount, _options$retryInterva, _options$initialDelay, _options$throwOnFaile, _action;

    var retryCount, done, action, maxRetries, retryIntervalMs, initialDelayMs, throwOnFailedExecution;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            retryCount = 0;
            done = false;
            maxRetries = (_options$retryCount = options === null || options === void 0 ? void 0 : options.retryCount) !== null && _options$retryCount !== void 0 ? _options$retryCount : DEFAULT_MAX_RETRIES;
            retryIntervalMs = (_options$retryInterva = options === null || options === void 0 ? void 0 : options.retryIntervalMs) !== null && _options$retryInterva !== void 0 ? _options$retryInterva : DEFAULT_RETRY_INTERVAL_MS;
            initialDelayMs = (_options$initialDelay = options === null || options === void 0 ? void 0 : options.initialDelayMs) !== null && _options$initialDelay !== void 0 ? _options$initialDelay : DEFAULT_INITIAL_DELAY_MS;
            throwOnFailedExecution = (_options$throwOnFaile = options === null || options === void 0 ? void 0 : options.throwOnFailedExecution) !== null && _options$throwOnFaile !== void 0 ? _options$throwOnFaile : true; // Initial delay for short-running Actions

            _context.next = 8;
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(initialDelayMs);

          case 8:
            if (!(retryCount < maxRetries && !done)) {
              _context.next = 22;
              break;
            }

            _context.next = 11;
            return actionFunction();

          case 11:
            action = _context.sent;

            if (!(action && ['succeeded', 'failed'].includes(action.sys.status))) {
              _context.next = 17;
              break;
            }

            done = true;

            if (!(action.sys.status === 'failed' && throwOnFailedExecution)) {
              _context.next = 16;
              break;
            }

            throw new AsyncActionFailedError("".concat(action.sys.type, " failed to execute."), action);

          case 16:
            return _context.abrupt("return", action);

          case 17:
            _context.next = 19;
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(retryIntervalMs);

          case 19:
            retryCount += 1;
            _context.next = 8;
            break;

          case 22:
            throw new AsyncActionProcessingError("".concat((_action = action) === null || _action === void 0 ? void 0 : _action.sys.type, " didn't finish processing within the expected timeframe."), action);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pollAsyncActionStatus.apply(this, arguments);
}

/***/ }),

/***/ "./methods/content-type.ts":
/*!*********************************!*\
  !*** ./methods/content-type.ts ***!
  \*********************************/
/*! exports provided: omitAndDeleteField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "omitAndDeleteField", function() { return omitAndDeleteField; });
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @private
 * @param id - unique ID of the field
 * @param key - the attribute on the field to change
 * @param value - the value to set the attribute to
 */
var findAndUpdateField = function findAndUpdateField(contentType, fieldId, omitOrDelete) {
  var field = contentType.fields.find(function (field) {
    return field.id === fieldId;
  });

  if (!field) {
    return Promise.reject(new Error("Tried to omitAndDeleteField on a nonexistent field, ".concat(fieldId, ", on the content type ").concat(contentType.name, ".")));
  }

  field[omitOrDelete] = true;
  return Promise.resolve(contentType);
};

var omitAndDeleteField = function omitAndDeleteField(makeRequest, _ref, contentType) {
  var fieldId = _ref.fieldId,
      params = _objectWithoutProperties(_ref, ["fieldId"]);

  return findAndUpdateField(contentType, fieldId, 'omitted').then(function (newContentType) {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params: params,
      payload: newContentType
    });
  }).then(function (newContentType) {
    return findAndUpdateField(newContentType, fieldId, 'deleted');
  }).then(function (newContentType) {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params: params,
      payload: newContentType
    });
  });
};

/***/ }),

/***/ "./methods/utils.ts":
/*!**************************!*\
  !*** ./methods/utils.ts ***!
  \**************************/
/*! exports provided: sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/** Helper function that resolves a Promise after the specified duration (in milliseconds) */
function sleep(durationMs) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, durationMs);
  });
}

/***/ }),

/***/ "./plain/as-iterator.ts":
/*!******************************!*\
  !*** ./plain/as-iterator.ts ***!
  \******************************/
/*! exports provided: asIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asIterator", function() { return asIterator; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.js");
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_copy__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var asIterator = function asIterator(fn, params) {
  return _defineProperty({}, Symbol.asyncIterator, function () {
    var options = fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(params);

    var get = function get() {
      return fn(fast_copy__WEBPACK_IMPORTED_MODULE_0___default()(options));
    };

    var currentResult = get();
    return {
      current: 0,
      next: function next() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _yield$currentResult, total, items, skip, limit, value, endOfPage, endOfList;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return currentResult;

                case 2:
                  _yield$currentResult = _context.sent;
                  total = _yield$currentResult.total;
                  items = _yield$currentResult.items;
                  skip = _yield$currentResult.skip;
                  limit = _yield$currentResult.limit;

                  if (!(total === _this.current)) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", {
                    done: true,
                    value: null
                  });

                case 9:
                  value = items[_this.current++ - skip];
                  endOfPage = _this.current % limit === 0;
                  endOfList = _this.current === total;

                  if (endOfPage && !endOfList) {
                    options = _objectSpread(_objectSpread({}, options), {}, {
                      query: _objectSpread(_objectSpread({}, options.query), {}, {
                        skip: skip + limit
                      })
                    });
                    currentResult = get();
                  }

                  return _context.abrupt("return", {
                    done: false,
                    value: value
                  });

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    };
  });
};

/***/ }),

/***/ "./plain/checks.ts":
/*!*************************!*\
  !*** ./plain/checks.ts ***!
  \*************************/
/*! exports provided: isPublished, isUpdated, isDraft, isArchived */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPublished", function() { return isPublished; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUpdated", function() { return isUpdated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDraft", function() { return isDraft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArchived", function() { return isArchived; });
var isPublished = function isPublished(data) {
  return !!data.sys.publishedVersion;
};
var isUpdated = function isUpdated(data) {
  // The act of publishing an entity increases its version by 1, so any entry which has
  // 2 versions higher or more than the publishedVersion has unpublished changes.
  return !!(data.sys.publishedVersion && data.sys.version > data.sys.publishedVersion + 1);
};
var isDraft = function isDraft(data) {
  return !data.sys.publishedVersion;
};
var isArchived = function isArchived(data) {
  return !!data.sys.archivedVersion;
};

/***/ }),

/***/ "./plain/plain-client.ts":
/*!*******************************!*\
  !*** ./plain/plain-client.ts ***!
  \*******************************/
/*! exports provided: createPlainClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlainClient", function() { return createPlainClient; });
/* harmony import */ var _methods_content_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../methods/content-type */ "./methods/content-type.ts");
/* harmony import */ var _wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrappers/wrap */ "./plain/wrappers/wrap.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var createPlainClient = function createPlainClient(makeRequest, defaults) {
  var wrapParams = {
    makeRequest: makeRequest,
    defaults: defaults
  };
  return {
    raw: {
      getDefaultParams: function getDefaultParams() {
        return defaults;
      },
      get: function get(url, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'get',
          params: {
            url: url,
            config: config
          }
        });
      },
      patch: function patch(url, payload, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'patch',
          params: {
            url: url,
            config: config
          },
          payload: payload
        });
      },
      post: function post(url, payload, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'post',
          params: {
            url: url,
            config: config
          },
          payload: payload
        });
      },
      put: function put(url, payload, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'put',
          params: {
            url: url,
            config: config
          },
          payload: payload
        });
      },
      "delete": function _delete(url, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'delete',
          params: {
            url: url,
            config: config
          }
        });
      },
      http: function http(url, config) {
        return makeRequest({
          entityType: 'Http',
          action: 'request',
          params: {
            url: url,
            config: config
          }
        });
      }
    },
    appBundle: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'getMany'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'delete'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'create')
    },
    editorInterface: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EditorInterface', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EditorInterface', 'getMany'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EditorInterface', 'update')
    },
    space: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'getMany'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'delete'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'create')
    },
    environment: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'delete')
    },
    environmentAlias: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'getMany'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'delete')
    },
    bulkAction: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'BulkAction', 'get'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'BulkAction', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'BulkAction', 'unpublish'),
      validate: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'BulkAction', 'validate')
    },
    contentType: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'getMany'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'unpublish'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'createWithId'),
      omitAndDeleteField: function omitAndDeleteField(params, contentType, fieldId) {
        return Object(_methods_content_type__WEBPACK_IMPORTED_MODULE_0__["omitAndDeleteField"])(makeRequest, _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
          fieldId: fieldId
        }), contentType);
      }
    },
    user: {
      getManyForSpace: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'User', 'getManyForSpace'),
      getForSpace: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'User', 'getForSpace'),
      getCurrent: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'User', 'getCurrent'),
      getForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'User', 'getForOrganization'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'User', 'getManyForOrganization')
    },
    task: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'get'),
      getAll: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'getAll'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'delete')
    },
    entry: {
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'getMany'),
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'get'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'update'),
      patch: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'patch'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'unpublish'),
      archive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'archive'),
      unarchive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'unarchive'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'createWithId'),
      references: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'references')
    },
    asset: {
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'getMany'),
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'get'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'unpublish'),
      archive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'archive'),
      unarchive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'unarchive'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'createWithId'),
      createFromFiles: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'createFromFiles'),
      processForAllLocales: function processForAllLocales(params, asset, options) {
        return makeRequest({
          entityType: 'Asset',
          action: 'processForAllLocales',
          params: _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
            options: options,
            asset: asset
          })
        });
      },
      processForLocale: function processForLocale(params, asset, locale, options) {
        return makeRequest({
          entityType: 'Asset',
          action: 'processForLocale',
          params: _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
            locale: locale,
            asset: asset,
            options: options
          })
        });
      }
    },
    appUpload: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'get'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'delete'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'create')
    },
    assetKey: {
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AssetKey', 'create')
    },
    upload: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'get'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'create'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'delete')
    },
    locale: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'getMany'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'delete'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'update'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'create')
    },
    personalAccessToken: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PersonalAccessToken', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PersonalAccessToken', 'getMany'),
      create: function create(data, headers) {
        return makeRequest({
          entityType: 'PersonalAccessToken',
          action: 'create',
          params: {},
          headers: headers,
          payload: data
        });
      },
      revoke: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PersonalAccessToken', 'revoke')
    },
    usage: {
      getManyForSpace: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Usage', 'getManyForSpace'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Usage', 'getManyForOrganization')
    },
    release: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'get'),
      query: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'query'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'unpublish'),
      validate: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'validate')
    },
    releaseAction: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ReleaseAction', 'get'),
      queryForRelease: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ReleaseAction', 'queryForRelease')
    },
    role: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'delete')
    },
    scheduledActions: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'create'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'delete'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'update')
    },
    previewApiKey: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PreviewApiKey', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PreviewApiKey', 'getMany')
    },
    apiKey: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'delete')
    },
    appDefinition: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'delete')
    },
    appInstallation: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'getMany'),
      upsert: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'upsert'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'delete')
    },
    extension: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'delete')
    },
    webhook: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getMany'),
      getHealthStatus: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getHealthStatus'),
      getCallDetails: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getCallDetails'),
      getManyCallDetails: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getManyCallDetails'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'delete')
    },
    snapshot: {
      getManyForEntry: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Snapshot', 'getManyForEntry'),
      getForEntry: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Snapshot', 'getForEntry'),
      getManyForContentType: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Snapshot', 'getManyForContentType'),
      getForContentType: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Snapshot', 'getForContentType')
    },
    tag: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'getMany'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'delete')
    },
    organization: {
      getAll: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Organization', 'getMany'),
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Organization', 'get')
    },
    organizationInvitation: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationInvitation', 'get'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationInvitation', 'create')
    },
    organizationMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationMembership', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationMembership', 'getMany'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationMembership', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationMembership', 'delete')
    },
    spaceMember: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMember', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMember', 'getMany')
    },
    spaceMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'getMany'),
      getForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'getForOrganization'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'getManyForOrganization'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'delete')
    },
    team: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'getMany'),
      getManyForSpace: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'getManyForSpace'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'delete')
    },
    teamMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'get'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'getManyForOrganization'),
      getManyForTeam: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'getManyForTeam'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'delete')
    },
    teamSpaceMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getMany'),
      getForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getForOrganization'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getManyForOrganization'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'update'),
      "delete": Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'delete')
    }
  };
};

/***/ }),

/***/ "./plain/wrappers/wrap.ts":
/*!********************************!*\
  !*** ./plain/wrappers/wrap.ts ***!
  \********************************/
/*! exports provided: wrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
var wrap = function wrap(_ref, entityType, action) {
  var makeRequest = _ref.makeRequest,
      defaults = _ref.defaults;
  // It's not really possible to make this type safe as we are overloading `makeRequest`.
  // This missing typesafety is only within `wrap`. `wrap` has proper public types.
  // @ts-expect-error
  return function (params, payload, headers) {
    return (// @ts-expect-error
      makeRequest({
        // @ts-expect-error
        entityType: entityType,
        // @ts-expect-error
        action: action,
        // @ts-expect-error
        params: _objectSpread(_objectSpread({}, defaults), params),
        payload: payload,
        headers: headers
      })
    );
  };
};

/***/ }),

/***/ "./upload-http-client.ts":
/*!*******************************!*\
  !*** ./upload-http-client.ts ***!
  \*******************************/
/*! exports provided: getUploadHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUploadHttpClient", function() { return getUploadHttpClient; });
function getUploadHttpClient(http) {
  var _ref = http.httpClientParams,
      hostUpload = _ref.hostUpload,
      defaultHostnameUpload = _ref.defaultHostnameUpload;
  var uploadHttp = http.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload
  });
  return uploadHttp;
}

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************************************!*\
  !*** multi core-js/fn/promise core-js/fn/object/assign core-js/fn/array/from core-js/es6/symbol core-js/fn/symbol/async-iterator ./contentful-management.ts ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/fn/promise */"../node_modules/core-js/fn/promise.js");
__webpack_require__(/*! core-js/fn/object/assign */"../node_modules/core-js/fn/object/assign.js");
__webpack_require__(/*! core-js/fn/array/from */"../node_modules/core-js/fn/array/from.js");
__webpack_require__(/*! core-js/es6/symbol */"../node_modules/core-js/es6/symbol.js");
__webpack_require__(/*! core-js/fn/symbol/async-iterator */"../node_modules/core-js/fn/symbol/async-iterator.js");
module.exports = __webpack_require__(/*! ./contentful-management.ts */"./contentful-management.ts");


/***/ }),

/***/ 1:
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=contentful-management.legacy.js.map