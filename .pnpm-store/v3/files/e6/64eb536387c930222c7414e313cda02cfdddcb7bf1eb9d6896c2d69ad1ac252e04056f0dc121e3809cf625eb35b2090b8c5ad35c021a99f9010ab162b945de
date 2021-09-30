module.exports =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "../node_modules/axios/lib/adapters/http.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/adapters/http.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/axios/node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "../node_modules/axios/node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "../node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


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
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/http.js");
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

/***/ "../node_modules/axios/node_modules/follow-redirects/debug.js":
/*!********************************************************************!*\
  !*** ../node_modules/axios/node_modules/follow-redirects/debug.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var debug;
try {
  /* eslint global-require: off */
  debug = __webpack_require__(/*! debug */ "../node_modules/debug/src/index.js")("follow-redirects");
}
catch (error) {
  debug = function () { /* */ };
}
module.exports = debug;


/***/ }),

/***/ "../node_modules/axios/node_modules/follow-redirects/index.js":
/*!********************************************************************!*\
  !*** ../node_modules/axios/node_modules/follow-redirects/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var URL = url.URL;
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var assert = __webpack_require__(/*! assert */ "assert");
var debug = __webpack_require__(/*! ./debug */ "../node_modules/axios/node_modules/follow-redirects/debug.js");

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  }
  else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "../node_modules/axios/package.json":
/*!******************************************!*\
  !*** ../node_modules/axios/package.json ***!
  \******************************************/
/*! exports provided: _args, _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _spec, _where, author, browser, bugs, bundlesize, dependencies, description, devDependencies, homepage, jsdelivr, keywords, license, main, name, repository, scripts, typings, unpkg, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_args\":[[\"axios@0.21.1\",\"/home/circleci/project\"]],\"_from\":\"axios@0.21.1\",\"_id\":\"axios@0.21.1\",\"_inBundle\":false,\"_integrity\":\"sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"version\",\"registry\":true,\"raw\":\"axios@0.21.1\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"0.21.1\",\"saveSpec\":null,\"fetchSpec\":\"0.21.1\"},\"_requiredBy\":[\"/\",\"/bundlesize\",\"/contentful-management\",\"/github-build\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.21.1.tgz\",\"_spec\":\"0.21.1\",\"_where\":\"/home/circleci/project\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"^1.10.0\"},\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"homepage\":\"https://github.com/axios/axios\",\"jsdelivr\":\"dist/axios.min.js\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test && bundlesize\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"unpkg\":\"dist/axios.min.js\",\"version\":\"0.21.1\"}");

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHttpClient", function() { return createHttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRequestConfig", function() { return createRequestConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforceObjPath", function() { return enforceObjPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "freezeSys", function() { return freezeSys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserAgentHeader", function() { return getUserAgentHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toPlainObject", function() { return toPlainObject; });
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! os */ "os");
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
    return createHttpClient(axios, _objectSpread2(_objectSpread2({}, Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(options)), newParams));
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
  config.params = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(query);
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
      return Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
    }
  });
}




/***/ }),

/***/ "../node_modules/debug/src/browser.js":
/*!********************************************!*\
  !*** ../node_modules/debug/src/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "../node_modules/debug/src/debug.js":
/*!******************************************!*\
  !*** ../node_modules/debug/src/debug.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "../node_modules/debug/src/index.js":
/*!******************************************!*\
  !*** ../node_modules/debug/src/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "../node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "../node_modules/debug/src/node.js");
}


/***/ }),

/***/ "../node_modules/debug/src/node.js":
/*!*****************************************!*\
  !*** ../node_modules/debug/src/node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(/*! supports-color */ "../node_modules/supports-color/index.js");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "../node_modules/fast-copy/dist/fast-copy.esm.js":
/*!*******************************************************!*\
  !*** ../node_modules/fast-copy/dist/fast-copy.esm.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (copy);
//# sourceMappingURL=fast-copy.esm.js.map


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

/***/ "../node_modules/has-flag/index.js":
/*!*****************************************!*\
  !*** ../node_modules/has-flag/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
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

/***/ "../node_modules/ms/index.js":
/*!***********************************!*\
  !*** ../node_modules/ms/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


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

var inspectCustom = __webpack_require__(/*! ./util.inspect */ "../node_modules/object-inspect/util.inspect.js").custom;
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

/***/ "../node_modules/object-inspect/util.inspect.js":
/*!******************************************************!*\
  !*** ../node_modules/object-inspect/util.inspect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! util */ "util").inspect;


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

/***/ "../node_modules/supports-color/index.js":
/*!***********************************************!*\
  !*** ../node_modules/supports-color/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "../node_modules/has-flag/index.js");

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/api_keys`, {
    params: params.query
  });
};
const create = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/api_keys`, data, {
    headers
  });
};
const createWithId = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`, data, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(rawData);

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
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`, data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, `/spaces/${params.spaceId}/api_keys/${params.apiKeyId}`);
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



const getBaseUrl = params => `/organizations/${params.organizationId}/app_definitions/${params.appDefinitionId}/app_bundles`;

const getAppBundleUrl = params => `${getBaseUrl(params)}/${params.appBundleId}`;

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppBundleUrl(params));
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, getAppBundleUrl(params));
};
const create = (http, params, payload) => {
  const appUploadId = payload.appUploadId,
        comment = payload.comment;
  const data = {
    upload: {
      sys: {
        type: 'Link',
        linkType: 'AppUpload',
        id: appUploadId
      }
    },
    comment
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBaseUrl = params => `/organizations/${params.organizationId}/app_definitions`;

const getAppDefinitionUrl = params => getBaseUrl(params) + `/${params.appDefinitionId}`;
const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppDefinitionUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
const create = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, getBaseUrl(params), data);
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, getAppDefinitionUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/app_installations`;

const getAppInstallationUrl = params => getBaseUrl(params) + `/${params.appDefinitionId}`;
const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getAppInstallationUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const upsert = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_2__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, getAppInstallationUrl(params), data, _objectSpread({}, headers));
};
const del = (http, params) => {
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



const getBaseUrl = params => `/organizations/${params.organizationId}/app_uploads`;

const getAppUploadUrl = params => `${getBaseUrl(params)}/${params.appUploadId}`;

const get = (http, params) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](httpUpload, getAppUploadUrl(params));
};
const del = (http, params) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](httpUpload, getAppUploadUrl(params));
};
const create = (http, params, payload) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_1__["getUploadHttpClient"])(http);
  const file = payload.file;
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

const ASSET_KEY_MAX_LIFETIME = 48 * 60 * 60;
class ValidationError extends Error {
  constructor(name, message) {
    super(`Invalid "${name}" provided, ` + message);
    this.name = 'ValidationError';
  }

}

const validateTimestamp = (name, timestamp, options) => {
  options = options || {};

  if (typeof timestamp !== 'number') {
    throw new ValidationError(name, `only numeric values are allowed for timestamps, provided type was "${typeof timestamp}"`);
  }

  if (options.maximum && timestamp > options.maximum) {
    throw new ValidationError(name, `value (${timestamp}) cannot be further in the future than expected maximum (${options.maximum})`);
  }

  if (options.now && timestamp < options.now) {
    throw new ValidationError(name, `value (${timestamp}) cannot be in the past, current time was ${options.now}`);
  }
};

const create = (http, params, data) => {
  const expiresAt = data.expiresAt;
  const now = Math.floor(Date.now() / 1000);
  const currentMaxLifetime = now + ASSET_KEY_MAX_LIFETIME;
  validateTimestamp('expiresAt', expiresAt, {
    maximum: currentMaxLifetime,
    now
  });
  const postParams = {
    expiresAt
  };
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/asset_keys`, postParams);
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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







const get = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeSelect"])(params.query),
    headers: _objectSpread({}, headers)
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeSelect"])(params.query)
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`, data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`);
};
const publish = (http, params, rawData) => {
  var _rawData$sys$version2;

  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`, null, {
    headers: {
      'X-Contentful-Version': (_rawData$sys$version2 = rawData.sys.version) !== null && _rawData$sys$version2 !== void 0 ? _rawData$sys$version2 : 0
    }
  });
};
const unpublish = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/published`);
};
const archive = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`);
};
const unarchive = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_3__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}/archived`);
};
const create = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_3__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets`, data);
};
const createWithId = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${params.assetId}`, data);
};
const createFromFiles = (http, params, data) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_2__["getUploadHttpClient"])(http);
  const file = data.fields.file;
  return Promise.all(Object.keys(file).map(locale => {
    const _file$locale = file[locale],
          contentType = _file$locale.contentType,
          fileName = _file$locale.fileName;
    return Object(_upload__WEBPACK_IMPORTED_MODULE_4__["create"])(httpUpload, params, file[locale]).then(upload => {
      return {
        [locale]: {
          contentType,
          fileName,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id
            }
          }
        }
      };
    });
  })).then(uploads => {
    const file = uploads.reduce((fieldsData, upload) => _objectSpread(_objectSpread({}, fieldsData), upload), {});

    const asset = _objectSpread(_objectSpread({}, data), {}, {
      fields: _objectSpread(_objectSpread({}, data.fields), {}, {
        file
      })
    });

    return create(http, params, asset);
  }).catch(_error_handler__WEBPACK_IMPORTED_MODULE_1__["default"]);
};
/**
 * Asset processing
 */

const ASSET_PROCESSING_CHECK_WAIT = 3000;
const ASSET_PROCESSING_CHECK_RETRIES = 10;

function checkIfAssetHasUrl(http, params, {
  resolve,
  reject,
  locale,
  processingCheckWait = ASSET_PROCESSING_CHECK_WAIT,
  processingCheckRetries = ASSET_PROCESSING_CHECK_RETRIES,
  checkCount = 0
}) {
  return get(http, params).then(asset => {
    if (asset.fields.file[locale].url) {
      resolve(asset);
    } else if (checkCount === processingCheckRetries) {
      const error = new Error();
      error.name = 'AssetProcessingTimeout';
      error.message = 'Asset is taking longer then expected to process.';
      reject(error);
    } else {
      checkCount++;
      setTimeout(() => checkIfAssetHasUrl(http, params, {
        resolve: resolve,
        reject: reject,
        locale: locale,
        checkCount: checkCount,
        processingCheckWait,
        processingCheckRetries
      }), processingCheckWait);
    }
  });
}

const processForLocale = (http, _ref) => {
  let asset = _ref.asset,
      locale = _ref.locale,
      _ref$options = _ref.options,
      _ref$options2 = _ref$options === void 0 ? {} : _ref$options,
      processingCheckRetries = _ref$options2.processingCheckRetries,
      processingCheckWait = _ref$options2.processingCheckWait,
      params = _objectWithoutProperties(_ref, ["asset", "locale", "options"]);

  return _raw__WEBPACK_IMPORTED_MODULE_3__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/assets/${asset.sys.id}/files/${locale}/process`, null, {
    headers: {
      'X-Contentful-Version': asset.sys.version
    }
  }).then(() => {
    return new Promise((resolve, reject) => checkIfAssetHasUrl(http, {
      spaceId: params.spaceId,
      environmentId: params.environmentId,
      assetId: asset.sys.id
    }, {
      resolve,
      reject,
      locale,
      processingCheckWait,
      processingCheckRetries
    }));
  });
};
const processForAllLocales = (http, _ref2) => {
  let asset = _ref2.asset,
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? {} : _ref2$options,
      params = _objectWithoutProperties(_ref2, ["asset", "options"]);

  const locales = Object.keys(asset.fields.file || {});
  let mostUpToDateAssetVersion = asset; // Let all the locales process
  // Since they all resolve at different times,
  // we need to pick the last resolved value
  // to reflect the most recent state

  const allProcessingLocales = locales.map(locale => processForLocale(http, _objectSpread(_objectSpread({}, params), {}, {
    asset,
    locale,
    options
  })).then(result => {
    // Side effect of always setting the most up to date asset version
    // The last one to call this will be the last one that finished
    // and thus the most up to date
    mostUpToDateAssetVersion = result;
  }));
  return Promise.all(allProcessingLocales).then(() => mostUpToDateAssetVersion);
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

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/actions/${params.bulkActionId}`);
};
const publish = (http, params, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/publish`, payload);
};
const unpublish = (http, params, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/unpublish`, payload);
};
const validate = (http, params, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/bulk_actions/validate`, payload);
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types`;

const getContentTypeUrl = params => getBaseUrl(params) + `/${params.contentTypeId}`;

const get = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getContentTypeUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query),
    headers
  });
};
const getMany = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query,
    headers
  });
};
const create = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers
  });
};
const createWithId = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params), data, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getContentTypeUrl(params), {
    headers
  });
};
const publish = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getContentTypeUrl(params) + '/published', null, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version
    }, headers)
  });
};
const unpublish = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getContentTypeUrl(params) + '/published', {
    headers
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/editor_interface`;

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/editor_interfaces`);
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const get = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query),
    headers: _objectSpread({}, headers)
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const patch = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["patch"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`, data, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version,
      'Content-Type': 'application/json-patch+json'
    }, headers)
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`, data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`);
};
const publish = (http, params, rawData) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`, null, {
    headers: {
      'X-Contentful-Version': rawData.sys.version
    }
  });
};
const unpublish = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/published`);
};
const archive = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`);
};
const unarchive = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/archived`);
};
const create = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries`, data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
const createWithId = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}`, data, {
    headers: {
      'X-Contentful-Content-Type': params.contentTypeId
    }
  });
};
const references = (http, params) => {
  const spaceId = params.spaceId,
        environmentId = params.environmentId,
        entryId = params.entryId,
        _params$maxDepth = params.maxDepth,
        maxDepth = _params$maxDepth === void 0 ? 2 : _params$maxDepth;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}/references?include=${maxDepth}`);
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Urls
 */

const getBaseUrl = params => `/spaces/${params.spaceId}/environment_aliases`;

const getEnvironmentAliasUrl = params => getBaseUrl(params) + `/${params.environmentAliasId}`;
/**
 * Endpoints
 */


const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEnvironmentAliasUrl(params));
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
const createWithId = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEnvironmentAliasUrl(params), data, {
    headers: headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEnvironmentAliasUrl(params), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments`, {
    params: params.query
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}`, data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}`);
};
const create = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, `/spaces/${params.spaceId}/environments`, data, {
    headers
  });
};
const createWithId = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}`, data, {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/extensions`;

const getExtensionUrl = params => getBaseUrl(params) + `/${params.extensionId}`;
const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getExtensionUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers
  });
};
const createWithId = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getExtensionUrl(params), data, {
    headers
  });
};
const update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (http, params, rawData, headers) {
    var _rawData$sys$version;

    const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
    delete data.sys;
    return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getExtensionUrl(params), data, {
      headers: _objectSpread({
        'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
      }, headers)
    });
  });

  return function update(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
const del = (http, params) => {
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

const get = (http, {
  url,
  config
}) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, url, config);
};
const post = (http, {
  url,
  config
}, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, url, payload, config);
};
const put = (http, {
  url,
  config
}, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, url, payload, config);
};
const del = (http, {
  url,
  config
}) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, url, config);
};
const request = (http, {
  url,
  config
}) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/locales`, data, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  delete data.default; // we should not send this back

  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`, data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/locales/${params.localeId}`);
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


const OrganizationUserManagementAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'organization-user-management-api'
};
const InvitationAlphaHeaders = {
  'x-contentful-enable-alpha-feature': 'pending-org-membership'
};
const create = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/organizations/${params.organizationId}/invitations`, data, {
    headers: _objectSpread(_objectSpread({}, InvitationAlphaHeaders), headers)
  });
};
const get = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations/${params.organizationId}/invitations/${params.invitationId}`, {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getBaseUrl = params => `/organizations/${params.organizationId}/organization_memberships`;

const getEntityUrl = params => `${getBaseUrl(params)}/${params.organizationMembershipId}`;

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  const role = data.role;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), {
    role
  }, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
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

const getMany = http => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations`);
};
const get = (http, params) => {
  return getMany(http).then(data => {
    const org = data.items.find(org => org.sys.id === params.organizationId);

    if (!org) {
      const error = new Error(`No organization was found with the ID ${params.organizationId} instead got ${JSON.stringify(data)}`); // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/users/me/access_tokens/${params.tokenId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, '/users/me/access_tokens', {
    params: params.query
  });
};
const create = (http, _params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, '/users/me/access_tokens', rawData, {
    headers
  });
};
const revoke = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/users/me/access_tokens/${params.tokenId}/revoked`, null);
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

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/preview_api_keys/${params.previewApiKeyId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/preview_api_keys`, {
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
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function patch(http, url, payload, config) {
  return http.patch(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function post(http, url, payload, config) {
  return http.post(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function put(http, url, payload, config) {
  return http.put(url, payload, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function del(http, url, config) {
  return http.delete(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
}
function http(http, url, config) {
  return http(url, _objectSpread({
    baseURL: getBaseUrl(http)
  }, config)).then(response => response.data, _error_handler__WEBPACK_IMPORTED_MODULE_0__["default"]);
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

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/actions/${params.actionId}`);
};
const queryForRelease = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/actions`, {
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

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`);
};
const query = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`, {
    params: params.query
  });
};
const create = (http, params, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases`, payload);
};
const update = (http, params, payload, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`, payload, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}`);
};
const publish = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/published`, null, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
const unpublish = (http, params, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/published`, {
    headers: _objectSpread({
      'X-Contentful-Version': params.version
    }, headers)
  });
};
const validate = (http, params, payload) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/environments/${params.environmentId}/releases/${params.releaseId}/validate`, payload);
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/roles/${params.roleId}`);
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/roles`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, `/spaces/${params.spaceId}/roles`, data, {
    headers
  });
};
const createWithId = (http, params, data, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/roles/${params.roleId}`, data, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}/roles/${params.roleId}`, data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}/roles/${params.roleId}`);
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


const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`, {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/scheduled_actions`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, data) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["post"](http, `/spaces/${params.spaceId}/scheduled_actions`, data);
};
const del = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["del"](http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`, {
    params: {
      'environment.sys.id': params.environmentId
    }
  });
};
const update = (http, params, data) => {
  var _data$environment;

  return _raw__WEBPACK_IMPORTED_MODULE_0__["put"](http, `/spaces/${params.spaceId}/scheduled_actions/${params.scheduledActionId}`, data, {
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



const getBaseEntryUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/snapshots`;

const getEntryUrl = params => getBaseEntryUrl(params) + `/${params.snapshotId}`;

const getManyForEntry = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseEntryUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const getForEntry = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getEntryUrl(params));
};

const getBaseContentTypeUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/content_types/${params.contentTypeId}/snapshots`;

const getContentTypeUrl = params => getBaseContentTypeUrl(params) + `/${params.snapshotId}`;

const getManyForContentType = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, getBaseContentTypeUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeSelect"])(params.query)
  });
};
const getForContentType = (http, params) => {
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

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/space_members/${params.spaceMemberId}`);
const getMany = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/space_members`, {
  params: params.query
});

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function spaceMembershipDeprecationWarning() {
  console.warn('The user attribute in the space membership root is deprecated. The attribute has been moved inside the sys  object (i.e. sys.user)');
}

const getBaseUrl = params => `/spaces/${params.spaceId}/space_memberships`;

const getEntityUrl = params => `${getBaseUrl(params)}/${params.spaceMembershipId}`;

const get = (http, params) => {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
};
const getMany = (http, params) => {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: params.query
  });
};
const getForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/organizations/${params.organizationId}/space_memberships/${params.spaceMembershipId}`);
};
const getManyForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/organizations/${params.organizationId}/space_memberships`, {
    params: params.query
  });
};
const create = (http, params, data, headers) => {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers
  });
};
const createWithId = (http, params, data, headers) => {
  spaceMembershipDeprecationWarning();
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    })
  });
};
const del = (http, params) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}`);
const getMany = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces`, {
  params: params.query
});
const create = (http, params, payload, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, `/spaces`, payload, {
    headers: params.organizationId ? _objectSpread(_objectSpread({}, headers), {}, {
      'X-Contentful-Organization': params.organizationId
    }) : headers
  });
};
const update = (http, params, payload, headers) => {
  var _payload$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(payload);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, `/spaces/${params.spaceId}`, data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_payload$sys$version = payload.sys.version) !== null && _payload$sys$version !== void 0 ? _payload$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, `/spaces/${params.spaceId}`);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/tags`;

const getTagUrl = params => getBaseUrl(params) + `/${params.tagId}`;

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getTagUrl(params));
const getMany = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
  params: params.query
});
const createWithId = (http, params, rawData) => {
  var _rawData$sys$visibili;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTagUrl(params), data, {
    headers: {
      'X-Contentful-Tag-Visibility': (_rawData$sys$visibili = rawData.sys.visibility) !== null && _rawData$sys$visibili !== void 0 ? _rawData$sys$visibili : 'private'
    }
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTagUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, _ref) => {
  let version = _ref.version,
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getBaseUrl = params => `/spaces/${params.spaceId}/environments/${params.environmentId}/entries/${params.entryId}/tasks`;

const getTaskUrl = params => `${getBaseUrl(params)}/${params.taskId}`;

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getTaskUrl(params));
const getAll = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params));
const create = (http, params, rawData) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data);
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getTaskUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, _ref) => {
  let version = _ref.version,
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBaseUrl = params => `/organizations/${params.organizationId}/teams/${params.teamId}/team_memberships`;

const getEntityUrl = params => `/organizations/${params.organizationId}/teams/${params.teamId}/team_memberships/${params.teamMembershipId}`;

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
const getManyForOrganization = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/organizations/${params.organizationId}/team_memberships`, {
  params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
});
const getManyForTeam = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0
    }, headers)
  });
};
const del = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const getBaseUrl = params => `/spaces/${params.spaceId}/team_space_memberships`;

const getEntityUrl = params => `${getBaseUrl(params)}/${params.teamSpaceMembershipId}`;

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
const getMany = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
  params: params.query
});
const getForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/organizations/${params.organizationId}/team_space_memberships/${params.teamSpaceMembershipId}`);
};
const getManyForOrganization = (http, params) => {
  const query = params.query || {};

  if (params.teamId) {
    query['sys.team.sys.id'] = params.teamId;
  }

  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/organizations/${params.organizationId}/team_space_memberships`, {
    params: params.query
  });
};
const create = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers: _objectSpread({
      'x-contentful-team': params.teamId
    }, headers)
  });
};
const update = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': rawData.sys.version || 0,
      'x-contentful-team': rawData.sys.team.sys.id
    }, headers)
  });
};
const del = (http, params) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const getBaseUrl = params => `/organizations/${params.organizationId}/teams`;

const getEntityUrl = params => `${getBaseUrl(params)}/${params.teamId}`;

const get = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getEntityUrl(params));
const getMany = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
  params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
});
const getManyForSpace = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, `/spaces/${params.spaceId}/teams`, {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, rawData, headers) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), rawData, {
    headers
  });
};
const update = (http, params, rawData, headers) => {
  var _rawData$sys$version;

  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  delete data.sys;
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getEntityUrl(params), data, {
    headers: _objectSpread({
      'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
    }, headers)
  });
};
const del = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_1__["del"](http, getEntityUrl(params));

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


const create = (http, params, data) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  const file = data.file;

  if (!file) {
    return Promise.reject(new Error('Unable to locate a file to upload.'));
  }

  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](httpUpload, `/spaces/${params.spaceId}/uploads`, file, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
};
const del = (http, params) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["del"](httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`);
};
const get = (http, params) => {
  const httpUpload = Object(_upload_http_client__WEBPACK_IMPORTED_MODULE_0__["getUploadHttpClient"])(http);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](httpUpload, `/spaces/${params.spaceId}/uploads/${params.uploadId}`);
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

const getManyForSpace = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations/${params.organizationId}/space_periodic_usages`, {
    params: params.query
  });
};
const getManyForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations/${params.organizationId}/organization_periodic_usages`, {
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

const getForSpace = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/users/${params.userId}`);
};
const getCurrent = (http, params) => _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/users/me`, {
  params: params === null || params === void 0 ? void 0 : params.query
});
const getManyForSpace = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/spaces/${params.spaceId}/users`, {
    params: params.query
  });
};
const getForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations/${params.organizationId}/users/${params.userId}`);
};
const getManyForOrganization = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_0__["get"](http, `/organizations/${params.organizationId}/users`, {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./raw */ "./adapters/REST/endpoints/raw.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./adapters/REST/endpoints/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





const getBaseUrl = params => `/spaces/${params.spaceId}/webhook_definitions`;

const getWebhookCallBaseUrl = params => `/spaces/${params.spaceId}/webhooks`;

const getWebhookUrl = params => `${getBaseUrl(params)}/${params.webhookDefinitionId}`;

const getWebhookCallUrl = params => `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/calls`;

const getWebhookCallDetailsUrl = params => `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/calls/${params.callId}`;

const getWebhookHealthUrl = params => `${getWebhookCallBaseUrl(params)}/${params.webhookDefinitionId}/health`;

const get = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookUrl(params));
};
const getManyCallDetails = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookCallUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const getCallDetails = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookCallDetailsUrl(params));
};
const getHealthStatus = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getWebhookHealthUrl(params));
};
const getMany = (http, params) => {
  return _raw__WEBPACK_IMPORTED_MODULE_1__["get"](http, getBaseUrl(params), {
    params: Object(_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeSelect"])(params.query)
  });
};
const create = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["post"](http, getBaseUrl(params), data, {
    headers
  });
};
const createWithId = (http, params, rawData, headers) => {
  const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
  return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getWebhookUrl(params), data, {
    headers
  });
};
const update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (http, params, rawData, headers) {
    var _rawData$sys$version;

    const data = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(rawData);
    delete data.sys;
    return _raw__WEBPACK_IMPORTED_MODULE_1__["put"](http, getWebhookUrl(params), data, {
      headers: _objectSpread({
        'X-Contentful-Version': (_rawData$sys$version = rawData.sys.version) !== null && _rawData$sys$version !== void 0 ? _rawData$sys$version : 0
      }, headers)
    });
  });

  return function update(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
const del = (http, params) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./endpoints */ "./adapters/REST/endpoints/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com'
};
class RestAdapter {
  constructor(params) {
    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken');
    }

    this.params = _objectSpread(_objectSpread({}, defaultHostParameters), Object(fast_copy__WEBPACK_IMPORTED_MODULE_2__["default"])(params));
  }

  makeRequest({
    entityType,
    action: actionInput,
    params,
    payload,
    headers,
    userAgent
  }) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var _endpoints$entityType;

      // `delete` is a reserved keyword. Therefore, the methods are called `del`.
      const action = actionInput === 'delete' ? 'del' : actionInput;
      const endpoint = // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      (_endpoints$entityType = _endpoints__WEBPACK_IMPORTED_MODULE_3__["default"][entityType]) === null || _endpoints$entityType === void 0 ? void 0 : _endpoints$entityType[action];

      if (endpoint === undefined) {
        throw new Error('Unknown endpoint');
      }

      const requiredHeaders = {
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-User-Agent': userAgent
      }; // TODO: maybe we can avoid creating a new axios instance for each request

      const axiosInstance = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["createHttpClient"])(axios__WEBPACK_IMPORTED_MODULE_0___default.a, _objectSpread(_objectSpread({}, _this.params), {}, {
        headers: _objectSpread(_objectSpread({}, requiredHeaders), _this.params.headers)
      }));
      return yield endpoint(axiosInstance, params, payload, headers);
    })();
  }

}

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* eslint-disable @typescript-eslint/ban-ts-ignore */


const wrapCollection = fn => (makeRequest, data, ...rest) => {
  const collectionData = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data)); // @ts-expect-error

  collectionData.items = collectionData.items.map(entity => fn(makeRequest, entity, ...rest)); // @ts-expect-error

  return collectionData;
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


const DROPDOWN_TYPES = ['Text', 'Symbol', 'Integer', 'Number', 'Boolean'];
const INTERNAL_TO_API = {
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
const FIELD_TYPES = Object.keys(INTERNAL_TO_API);
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
  return FIELD_TYPES.find(key => {
    const internalApi = INTERNAL_TO_API[key];
    const stripped = {
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
const DEFAULTS_WIDGET = {
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
const DEFAULTS_SETTINGS = {
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
  const defaultWidget = _objectSpread(_objectSpread({}, DEFAULTS_WIDGET[field]), {}, {
    settings: {
      helpText: null
    },
    widgetNamespace: 'builtin',
    fieldId
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
  const fieldType = toInternalFieldType(field);

  if (!fieldType) {
    throw new Error('Invalid field type');
  }

  const hasInValidation = (field.validations || []).find(v => 'in' in v);

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

const EntryEditorWidgetTypes = {
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
const DefaultEntryEditor = {
  widgetId: EntryEditorWidgetTypes.DEFAULT_EDITOR.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.DEFAULT_EDITOR.name
};
const ReferencesEntryEditor = {
  widgetId: EntryEditorWidgetTypes.REFERENCE_TREE.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.REFERENCE_TREE.name
};
const TagsEditor = {
  widgetId: EntryEditorWidgetTypes.TAGS_EDITOR.id,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].EDITOR_BUILTIN,
  name: EntryEditorWidgetTypes.TAGS_EDITOR.name
};
const EntryConfiguration = [DefaultEntryEditor, ReferencesEntryEditor, TagsEditor];

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

const SidebarWidgetTypes = {
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
const Publication = {
  widgetId: SidebarWidgetTypes.PUBLICATION,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Publish & Status',
  description: 'Built-in - View entry status, publish, etc.'
};
const Releases = {
  widgetId: SidebarWidgetTypes.RELEASES,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Release',
  description: 'Built-in - View release, add to it, etc.'
};
const Tasks = {
  widgetId: SidebarWidgetTypes.TASKS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Tasks',
  description: 'Built-in - Assign tasks to be completed before publishing. Currently only supported for master environment.'
};
const ContentPreview = {
  widgetId: SidebarWidgetTypes.CONTENT_PREVIEW,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Preview',
  description: 'Built-in - Displays preview functionality.'
};
const Links = {
  widgetId: SidebarWidgetTypes.INCOMING_LINKS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Links',
  description: 'Built-in - Shows where an entry is linked.'
};
const Translation = {
  widgetId: SidebarWidgetTypes.TRANSLATION,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Translation',
  description: 'Built-in - Manage which translations are visible.'
};
const Versions = {
  widgetId: SidebarWidgetTypes.VERSIONS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Versions',
  description: 'Built-in - View previously published versions. Available only for master environment.'
};
const Users = {
  widgetId: SidebarWidgetTypes.USERS,
  widgetNamespace: _types__WEBPACK_IMPORTED_MODULE_0__["WidgetNamespace"].SIDEBAR_BUILTIN,
  name: 'Users',
  description: 'Built-in - Displays users on the same entry.'
};
const SidebarEntryConfiguration = [Publication, Releases, Tasks, ContentPreview, Links, Translation, Versions, Users];
const SidebarAssetConfiguration = [Publication, Releases, Links, Translation, Users];

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
let WidgetNamespace;

(function (WidgetNamespace) {
  WidgetNamespace["BUILTIN"] = "builtin";
  WidgetNamespace["EXTENSION"] = "extension";
  WidgetNamespace["SIDEBAR_BUILTIN"] = "sidebar-builtin";
  WidgetNamespace["APP"] = "app";
  WidgetNamespace["EDITOR_BUILTIN"] = "editor-builtin";
})(WidgetNamespace || (WidgetNamespace = {}));

const DEFAULT_EDITOR_ID = 'default-editor';
const in_ = (key, object) => key in object;

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











function createClient(params, opts = {}) {
  const sdkMain = opts.type === 'plain' ? 'contentful-management-plain.js' : 'contentful-management.js';
  const userAgent = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["getUserAgentHeader"])( // @ts-expect-error
  `${sdkMain}/${"7.36.1"}`, params.application, params.integration, params.feature);
  const adapter = Object(_create_adapter__WEBPACK_IMPORTED_MODULE_1__["createAdapter"])(params); // Parameters<?> and ReturnType<?> only return the types of the last overload
  // https://github.com/microsoft/TypeScript/issues/26591
  // @ts-expect-error

  const makeRequest = options => adapter.makeRequest(_objectSpread(_objectSpread({}, options), {}, {
    userAgent
  }));

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
  const _entities$appBundle = _entities__WEBPACK_IMPORTED_MODULE_0__["default"].appBundle,
        wrapAppBundle = _entities$appBundle.wrapAppBundle,
        wrapAppBundleCollection = _entities$appBundle.wrapAppBundleCollection;

  const getParams = data => ({
    appDefinitionId: data.sys.id,
    organizationId: data.sys.organization.sys.id
  });

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
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'update',
        params: getParams(data),
        headers: {},
        payload: data
      }).then(data => Object(_entities_app_definition__WEBPACK_IMPORTED_MODULE_1__["wrapAppDefinition"])(makeRequest, data));
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
    delete: function del() {
      const data = this.toPlainObject();
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
    getAppBundle(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'get',
        params: {
          appBundleId: id,
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id
        }
      }).then(data => wrapAppBundle(makeRequest, data));
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
    getAppBundles(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'getMany',
        params: {
          organizationId: raw.sys.organization.sys.id,
          appDefinitionId: raw.sys.id,
          query
        }
      }).then(data => wrapAppBundleCollection(makeRequest, data));
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
    createAppBundle(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppBundle',
        action: 'create',
        params: {
          appDefinitionId: raw.sys.id,
          organizationId: raw.sys.organization.sys.id
        },
        payload: data
      }).then(data => wrapAppBundle(makeRequest, data));
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
  const _entities$space = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].space,
        wrapSpace = _entities$space.wrapSpace,
        wrapSpaceCollection = _entities$space.wrapSpaceCollection;
  const wrapUser = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user.wrapUser;
  const _entities$personalAcc = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].personalAccessToken,
        wrapPersonalAccessToken = _entities$personalAcc.wrapPersonalAccessToken,
        wrapPersonalAccessTokenCollection = _entities$personalAcc.wrapPersonalAccessTokenCollection;
  const _entities$organizatio = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organization,
        wrapOrganization = _entities$organizatio.wrapOrganization,
        wrapOrganizationCollection = _entities$organizatio.wrapOrganizationCollection;
  const wrapTeamCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team.wrapTeamCollection;
  const wrapUsageCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].usage.wrapUsageCollection;
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
    getSpaces: function getSpaces(query = {}) {
      return makeRequest({
        entityType: 'Space',
        action: 'getMany',
        params: {
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(data => wrapSpaceCollection(makeRequest, data));
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
          spaceId
        }
      }).then(data => wrapSpace(makeRequest, data));
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
          organizationId
        },
        payload: spaceData
      }).then(data => wrapSpace(makeRequest, data));
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
      }).then(data => wrapOrganization(makeRequest, data));
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
      }).then(data => wrapOrganizationCollection(makeRequest, data));
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
        params
      }).then(data => wrapUser(makeRequest, data));
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
      }).then(response => wrapPersonalAccessToken(makeRequest, response));
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
          tokenId
        }
      }).then(data => wrapPersonalAccessToken(makeRequest, data));
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
      }).then(data => wrapPersonalAccessTokenCollection(makeRequest, data));
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
    getOrganizationUsage: function getOrganizationUsage(organizationId, query = {}) {
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForOrganization',
        params: {
          organizationId,
          query
        }
      }).then(data => wrapUsageCollection(makeRequest, data));
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
    getSpaceUsage: function getSpaceUsage(organizationId, query = {}) {
      return makeRequest({
        entityType: 'Usage',
        action: 'getManyForSpace',
        params: {
          organizationId,
          query
        }
      }).then(data => wrapUsageCollection(makeRequest, data));
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
      let url = _ref.url,
          config = _objectWithoutProperties(_ref, ["url"]);

      return makeRequest({
        entityType: 'Http',
        action: 'request',
        params: {
          url,
          config
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
  const _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].entry,
        wrapEntry = _entities$entry.wrapEntry,
        wrapEntryCollection = _entities$entry.wrapEntryCollection;
  const _entities$snapshot = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].snapshot,
        wrapSnapshot = _entities$snapshot.wrapSnapshot,
        wrapSnapshotCollection = _entities$snapshot.wrapSnapshotCollection;
  const _entities$task = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].task,
        wrapTask = _entities$task.wrapTask,
        wrapTaskCollection = _entities$task.wrapTaskCollection;

  const getParams = self => {
    const entry = self.toPlainObject();
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
      const _getParams = getParams(this),
            raw = _getParams.raw,
            params = _getParams.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'update',
        params,
        payload: raw
      }).then(data => wrapEntry(makeRequest, data));
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
      const _getParams2 = getParams(this),
            raw = _getParams2.raw,
            params = _getParams2.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'patch',
        params: _objectSpread(_objectSpread({}, params), {}, {
          version: raw.sys.version
        }),
        payload: ops
      }).then(data => wrapEntry(makeRequest, data));
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
    delete: function del() {
      const _getParams3 = getParams(this),
            params = _getParams3.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params
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
      const _getParams4 = getParams(this),
            raw = _getParams4.raw,
            params = _getParams4.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'publish',
        params,
        payload: raw
      }).then(data => wrapEntry(makeRequest, data));
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
      const _getParams5 = getParams(this),
            params = _getParams5.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unpublish',
        params
      }).then(data => wrapEntry(makeRequest, data));
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
      const _getParams6 = getParams(this),
            params = _getParams6.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'archive',
        params
      }).then(data => wrapEntry(makeRequest, data));
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
      const _getParams7 = getParams(this),
            params = _getParams7.params;

      return makeRequest({
        entityType: 'Entry',
        action: 'unarchive',
        params
      }).then(data => wrapEntry(makeRequest, data));
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
    getSnapshots: function getSnapshots(query = {}) {
      const _getParams8 = getParams(this),
            params = _getParams8.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query
        })
      }).then(data => wrapSnapshotCollection(makeRequest, data));
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
      const _getParams9 = getParams(this),
            params = _getParams9.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForEntry',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId
        })
      }).then(data => wrapSnapshot(makeRequest, data));
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
      const _getParams10 = getParams(this),
            params = _getParams10.params;

      return makeRequest({
        entityType: 'Task',
        action: 'create',
        params,
        payload: data
      }).then(data => wrapTask(makeRequest, data));
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
      const _getParams11 = getParams(this),
            params = _getParams11.params;

      return makeRequest({
        entityType: 'Task',
        action: 'getAll',
        params
      }).then(data => wrapTaskCollection(makeRequest, data));
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
      const _getParams12 = getParams(this),
            params = _getParams12.params;

      return makeRequest({
        entityType: 'Task',
        action: 'get',
        params: _objectSpread(_objectSpread({}, params), {}, {
          taskId: id
        })
      }).then(data => wrapTask(makeRequest, data));
    },

    /**
     * Checks if the entry is published. A published entry might have unpublished changes
     */
    isPublished: function isPublished() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isPublished"](raw);
    },

    /**
     * Checks if the entry is updated. This means the entry was previously published but has unpublished changes.
     */
    isUpdated: function isUpdated() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isUpdated"](raw);
    },

    /**
     * Checks if the entry is in draft mode. This means it is not published.
     */
    isDraft: function isDraft() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isDraft"](raw);
    },

    /**
     * Checks if entry is archived. This means it's not exposed to the Delivery/Preview APIs.
     */
    isArchived: function isArchived() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_0__["isArchived"](raw);
    },

    /**
     * Recursively collects references of an entry and their descendants
     */
    references: function references(options) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.environment.sys.id,
          entryId: raw.sys.id,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(response => wrapEntryCollection(makeRequest, response));
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
  const wrapEnvironment = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environment.wrapEnvironment;
  const _entities$contentType = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].contentType,
        wrapContentType = _entities$contentType.wrapContentType,
        wrapContentTypeCollection = _entities$contentType.wrapContentTypeCollection;
  const _entities$entry = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].entry,
        wrapEntry = _entities$entry.wrapEntry,
        wrapEntryCollection = _entities$entry.wrapEntryCollection;
  const _entities$asset = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].asset,
        wrapAsset = _entities$asset.wrapAsset,
        wrapAssetCollection = _entities$asset.wrapAssetCollection;
  const wrapAssetKey = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].assetKey.wrapAssetKey;
  const _entities$locale = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].locale,
        wrapLocale = _entities$locale.wrapLocale,
        wrapLocaleCollection = _entities$locale.wrapLocaleCollection;
  const wrapSnapshotCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].snapshot.wrapSnapshotCollection;
  const _entities$editorInter = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].editorInterface,
        wrapEditorInterface = _entities$editorInter.wrapEditorInterface,
        wrapEditorInterfaceCollection = _entities$editorInter.wrapEditorInterfaceCollection;
  const wrapUpload = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].upload.wrapUpload;
  const _entities$extension = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].extension,
        wrapExtension = _entities$extension.wrapExtension,
        wrapExtensionCollection = _entities$extension.wrapExtensionCollection;
  const _entities$appInstalla = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appInstallation,
        wrapAppInstallation = _entities$appInstalla.wrapAppInstallation,
        wrapAppInstallationCollection = _entities$appInstalla.wrapAppInstallationCollection;
  const wrapBulkAction = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].bulkAction.wrapBulkAction;
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
    delete: function deleteEnvironment() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(() => {// noop
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
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: raw
      }).then(data => wrapEnvironment(makeRequest, data));
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
    getEntryFromData(entryData) {
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
    getAssetFromData(assetData) {
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
    getBulkAction(bulkActionId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          bulkActionId
        }
      }).then(data => wrapBulkAction(makeRequest, data));
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
    createPublishBulkAction(payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload
      }).then(data => wrapBulkAction(makeRequest, data));
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
    createValidateBulkAction(payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload
      }).then(data => wrapBulkAction(makeRequest, data));
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
    createUnpublishBulkAction(payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'BulkAction',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload
      }).then(data => wrapBulkAction(makeRequest, data));
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
    getContentType(contentTypeId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId
        }
      }).then(data => wrapContentType(makeRequest, data));
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
    getContentTypes(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapContentTypeCollection(makeRequest, data));
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
    createContentType(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(response => wrapContentType(makeRequest, response));
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
    createContentTypeWithId(contentTypeId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ContentType',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId
        },
        payload: data
      }).then(response => wrapContentType(makeRequest, response));
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
    getEditorInterfaceForContentType(contentTypeId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId
        }
      }).then(response => wrapEditorInterface(makeRequest, response));
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
    getEditorInterfaces() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(response => wrapEditorInterfaceCollection(makeRequest, response));
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
    getEntry(id, query = {}) {
      const raw = this.toPlainObject();
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
      }).then(data => wrapEntry(makeRequest, data));
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
    deleteEntry(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: id
        }
      }).then(() => {// noop
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
    getEntries(query = {}) {
      const raw = this.toPlainObject();
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
      }).then(data => wrapEntryCollection(makeRequest, data));
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
    createEntry(contentTypeId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId: contentTypeId
        },
        payload: data
      }).then(response => wrapEntry(makeRequest, response));
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
    createEntryWithId(contentTypeId, id, data) {
      const raw = this.toPlainObject();
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
      }).then(response => wrapEntry(makeRequest, response));
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
    getEntryReferences(entryId, options) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Entry',
        action: 'references',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId: entryId,
          maxDepth: options === null || options === void 0 ? void 0 : options.maxDepth
        }
      }).then(response => wrapEntryCollection(makeRequest, response));
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
    getAsset(id, query = {}) {
      const raw = this.toPlainObject();
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
      }).then(data => wrapAsset(makeRequest, data));
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
    getAssets(query = {}) {
      const raw = this.toPlainObject();
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
      }).then(data => wrapAssetCollection(makeRequest, data));
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
    createAsset(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(response => wrapAsset(makeRequest, response));
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
    createAssetWithId(id, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          assetId: id
        },
        payload: data
      }).then(response => wrapAsset(makeRequest, response));
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
    createAssetFromFiles(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'createFromFiles',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(response => wrapAsset(makeRequest, response));
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
    createAssetKey(payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AssetKey',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload
      }).then(data => wrapAssetKey(makeRequest, data));
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
    getUpload(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          uploadId: id
        }
      }).then(data => wrapUpload(makeRequest, data));
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
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Upload',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id
        },
        payload: data
      }).then(data => wrapUpload(makeRequest, data));
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
    getLocale(localeId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          localeId
        }
      }).then(data => wrapLocale(makeRequest, data));
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
    getLocales() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(data => wrapLocaleCollection(makeRequest, data));
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
    createLocale(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(response => wrapLocale(makeRequest, response));
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
    getUiExtension(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        }
      }).then(data => wrapExtension(makeRequest, data));
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
    getUiExtensions() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(response => wrapExtensionCollection(makeRequest, response));
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
    createUiExtension(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload: data
      }).then(response => wrapExtension(makeRequest, response));
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
    createUiExtensionWithId(id, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          extensionId: id
        },
        payload: data
      }).then(response => wrapExtension(makeRequest, response));
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
    createAppInstallation(appDefinitionId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId
        },
        payload: data
      }).then(payload => wrapAppInstallation(makeRequest, payload));
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
    getAppInstallation(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(data => wrapAppInstallation(makeRequest, data));
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
    getAppInstallations() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        }
      }).then(data => wrapAppInstallationCollection(makeRequest, data));
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
    getEntrySnapshots(entryId, query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForEntry',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          entryId,
          query
        }
      }).then(data => wrapSnapshotCollection(makeRequest, data));
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
    getContentTypeSnapshots(contentTypeId, query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          contentTypeId,
          query
        }
      }).then(data => wrapSnapshotCollection(makeRequest, data));
    },

    createTag(id, name, visibility) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        },
        payload: {
          name,
          sys: {
            visibility: visibility !== null && visibility !== void 0 ? visibility : 'private'
          }
        }
      }).then(data => Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTag"])(makeRequest, data));
    },

    getTags(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'getMany',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTagCollection"])(makeRequest, data));
    },

    getTag(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          tagId: id
        }
      }).then(data => Object(_entities_tag__WEBPACK_IMPORTED_MODULE_4__["wrapTag"])(makeRequest, data));
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
    getRelease(releaseId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'get',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId
        }
      }).then(data => Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data));
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
    getReleases(query) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'query',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          query
        }
      }).then(data => Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapReleaseCollection"])(makeRequest, data));
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
    createRelease(payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'create',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id
        },
        payload
      }).then(data => Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data));
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
    updateRelease({
      releaseId,
      payload,
      version
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'update',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId,
          version
        },
        payload
      }).then(data => Object(_entities_release__WEBPACK_IMPORTED_MODULE_3__["wrapRelease"])(makeRequest, data));
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
    deleteRelease(releaseId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'delete',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId
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
    publishRelease({
      releaseId,
      version
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'publish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId,
          version
        }
      }).then(data => Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data));
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
    unpublishRelease({
      releaseId,
      version
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'unpublish',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId,
          version
        }
      }).then(data => Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data));
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
    validateRelease({
      releaseId,
      payload
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Release',
        action: 'validate',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId
        },
        payload
      }).then(data => Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data));
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
    getReleaseAction({
      actionId,
      releaseId
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'get',
        params: {
          actionId,
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId
        }
      }).then(data => Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseAction"])(makeRequest, data));
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
    getReleaseActions({
      releaseId,
      query
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ReleaseAction',
        action: 'queryForRelease',
        params: {
          spaceId: raw.sys.space.sys.id,
          environmentId: raw.sys.id,
          releaseId,
          query
        }
      }).then(data => Object(_entities_release_action__WEBPACK_IMPORTED_MODULE_2__["wrapReleaseActionCollection"])(makeRequest, data));
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
  const _entities$appDefiniti = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appDefinition,
        wrapAppDefinition = _entities$appDefiniti.wrapAppDefinition,
        wrapAppDefinitionCollection = _entities$appDefiniti.wrapAppDefinitionCollection;
  const _entities$user = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user,
        wrapUser = _entities$user.wrapUser,
        wrapUserCollection = _entities$user.wrapUserCollection;
  const _entities$organizatio = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organizationMembership,
        wrapOrganizationMembership = _entities$organizatio.wrapOrganizationMembership,
        wrapOrganizationMembershipCollection = _entities$organizatio.wrapOrganizationMembershipCollection;
  const _entities$teamMembers = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamMembership,
        wrapTeamMembership = _entities$teamMembers.wrapTeamMembership,
        wrapTeamMembershipCollection = _entities$teamMembers.wrapTeamMembershipCollection;
  const _entities$teamSpaceMe = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamSpaceMembership,
        wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
        wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  const _entities$team = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team,
        wrapTeam = _entities$team.wrapTeam,
        wrapTeamCollection = _entities$team.wrapTeamCollection;
  const _entities$spaceMember = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMembership,
        wrapSpaceMembership = _entities$spaceMember.wrapSpaceMembership,
        wrapSpaceMembershipCollection = _entities$spaceMember.wrapSpaceMembershipCollection;
  const wrapOrganizationInvitation = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].organizationInvitation.wrapOrganizationInvitation;
  const wrapAppUpload = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].appUpload.wrapAppUpload;
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
    getUser(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          userId: id
        }
      }).then(data => wrapUser(makeRequest, data));
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
    getUsers(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(data => wrapUserCollection(makeRequest, data));
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
    getOrganizationMembership(id) {
      const raw = this.toPlainObject();
      const organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'get',
        params: {
          organizationId,
          organizationMembershipId: id
        }
      }).then(data => wrapOrganizationMembership(makeRequest, data, organizationId));
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
    getOrganizationMemberships(query = {}) {
      const raw = this.toPlainObject();
      const organizationId = raw.sys.id;
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'getMany',
        params: {
          organizationId,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapOrganizationMembershipCollection(makeRequest, data, organizationId));
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
    createTeam(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(data => wrapTeam(makeRequest, data));
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
    getTeam(teamId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId
        }
      }).then(data => wrapTeam(makeRequest, data));
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
    getTeams(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapTeamCollection(makeRequest, data));
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
    createTeamMembership(teamId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'create',
        params: {
          organizationId: raw.sys.id,
          teamId
        },
        payload: data
      }).then(data => wrapTeamMembership(makeRequest, data));
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
    getTeamMembership(teamId, teamMembershipId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          teamId,
          teamMembershipId
        }
      }).then(data => wrapTeamMembership(makeRequest, data));
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
    getTeamMemberships(opts = {}) {
      const teamId = opts.teamId,
            _opts$query = opts.query,
            query = _opts$query === void 0 ? {} : _opts$query;
      const raw = this.toPlainObject();

      if (teamId) {
        return makeRequest({
          entityType: 'TeamMembership',
          action: 'getManyForTeam',
          params: {
            organizationId: raw.sys.id,
            teamId,
            query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
              query
            }).params
          }
        }).then(data => wrapTeamMembershipCollection(makeRequest, data));
      }

      return makeRequest({
        entityType: 'TeamMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapTeamMembershipCollection(makeRequest, data));
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
    getTeamSpaceMemberships(opts = {}) {
      const raw = this.toPlainObject();
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
      }).then(data => wrapTeamSpaceMembershipCollection(makeRequest, data));
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
    getTeamSpaceMembership(teamSpaceMembershipId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          teamSpaceMembershipId
        }
      }).then(data => wrapTeamSpaceMembership(makeRequest, data));
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
    getOrganizationSpaceMembership(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getForOrganization',
        params: {
          organizationId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(data => wrapSpaceMembership(makeRequest, data));
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
    getOrganizationSpaceMemberships(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getManyForOrganization',
        params: {
          organizationId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapSpaceMembershipCollection(makeRequest, data));
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
    getOrganizationInvitation(invitationId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          invitationId
        }
      }).then(data => wrapOrganizationInvitation(makeRequest, data));
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
    createOrganizationInvitation(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationInvitation',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(data => wrapOrganizationInvitation(makeRequest, data));
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
    createAppDefinition(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: data
      }).then(data => wrapAppDefinition(makeRequest, data));
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
    getAppDefinitions(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'getMany',
        params: {
          organizationId: raw.sys.id,
          query: query
        }
      }).then(data => wrapAppDefinitionCollection(makeRequest, data));
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
    getAppDefinition(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppDefinition',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appDefinitionId: id
        }
      }).then(data => wrapAppDefinition(makeRequest, data));
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
    getAppUpload(appUploadId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'get',
        params: {
          organizationId: raw.sys.id,
          appUploadId
        }
      }).then(data => wrapAppUpload(makeRequest, data));
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
    createAppUpload(file) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'AppUpload',
        action: 'create',
        params: {
          organizationId: raw.sys.id
        },
        payload: {
          file
        }
      }).then(data => wrapAppUpload(makeRequest, data));
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
  const wrapSpace = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].space.wrapSpace;
  const _entities$environment = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environment,
        wrapEnvironment = _entities$environment.wrapEnvironment,
        wrapEnvironmentCollection = _entities$environment.wrapEnvironmentCollection;
  const _entities$webhook = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].webhook,
        wrapWebhook = _entities$webhook.wrapWebhook,
        wrapWebhookCollection = _entities$webhook.wrapWebhookCollection;
  const _entities$role = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].role,
        wrapRole = _entities$role.wrapRole,
        wrapRoleCollection = _entities$role.wrapRoleCollection;
  const _entities$user = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].user,
        wrapUser = _entities$user.wrapUser,
        wrapUserCollection = _entities$user.wrapUserCollection;
  const _entities$spaceMember = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMember,
        wrapSpaceMember = _entities$spaceMember.wrapSpaceMember,
        wrapSpaceMemberCollection = _entities$spaceMember.wrapSpaceMemberCollection;
  const _entities$spaceMember2 = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].spaceMembership,
        wrapSpaceMembership = _entities$spaceMember2.wrapSpaceMembership,
        wrapSpaceMembershipCollection = _entities$spaceMember2.wrapSpaceMembershipCollection;
  const _entities$teamSpaceMe = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].teamSpaceMembership,
        wrapTeamSpaceMembership = _entities$teamSpaceMe.wrapTeamSpaceMembership,
        wrapTeamSpaceMembershipCollection = _entities$teamSpaceMe.wrapTeamSpaceMembershipCollection;
  const wrapTeamCollection = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].team.wrapTeamCollection;
  const _entities$apiKey = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].apiKey,
        wrapApiKey = _entities$apiKey.wrapApiKey,
        wrapApiKeyCollection = _entities$apiKey.wrapApiKeyCollection;
  const _entities$environment2 = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].environmentAlias,
        wrapEnvironmentAlias = _entities$environment2.wrapEnvironmentAlias,
        wrapEnvironmentAliasCollection = _entities$environment2.wrapEnvironmentAliasCollection;
  const _entities$previewApiK = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].previewApiKey,
        wrapPreviewApiKey = _entities$previewApiK.wrapPreviewApiKey,
        wrapPreviewApiKeyCollection = _entities$previewApiK.wrapPreviewApiKeyCollection;
  const _entities$scheduledAc = _entities__WEBPACK_IMPORTED_MODULE_1__["default"].scheduledAction,
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
    delete: function deleteSpace() {
      const raw = this.toPlainObject();
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
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Space',
        action: 'update',
        params: {
          spaceId: raw.sys.id
        },
        payload: raw,
        headers: {}
      }).then(data => wrapSpace(makeRequest, data));
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
    getEnvironment(environmentId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentId
        }
      }).then(data => wrapEnvironment(makeRequest, data));
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
    getEnvironments(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query
        }
      }).then(data => wrapEnvironmentCollection(makeRequest, data));
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
    createEnvironment(data = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(response => wrapEnvironment(makeRequest, response));
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
    createEnvironmentWithId(id, data, sourceEnvironmentId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Environment',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentId: id,
          sourceEnvironmentId
        },
        payload: data
      }).then(response => wrapEnvironment(makeRequest, response));
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
    getWebhook(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        }
      }).then(data => wrapWebhook(makeRequest, data));
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
    getWebhooks() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(data => wrapWebhookCollection(makeRequest, data));
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
    createWebhook(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(data => wrapWebhook(makeRequest, data));
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
    createWebhookWithId(id, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          webhookDefinitionId: id
        },
        payload: data
      }).then(data => wrapWebhook(makeRequest, data));
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
    getRole(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        }
      }).then(data => wrapRole(makeRequest, data));
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
    getRoles(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapRoleCollection(makeRequest, data));
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
    createRole(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(data => wrapRole(makeRequest, data));
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
    createRoleWithId(id, roleData) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          roleId: id
        },
        payload: roleData
      }).then(data => wrapRole(makeRequest, data));
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
    getSpaceUser(userId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getForSpace',
        params: {
          spaceId: raw.sys.id,
          userId
        }
      }).then(data => wrapUser(makeRequest, data));
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
    getSpaceUsers(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'User',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapUserCollection(makeRequest, data));
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
    getTeams(query = {
      limit: 100
    }) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'getManyForSpace',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapTeamCollection(makeRequest, data));
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
    getSpaceMember(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMemberId: id
        }
      }).then(data => wrapSpaceMember(makeRequest, data));
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
    getSpaceMembers(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMember',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapSpaceMemberCollection(makeRequest, data));
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
    getSpaceMembership(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        }
      }).then(data => wrapSpaceMembership(makeRequest, data));
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
    getSpaceMemberships(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query
          }).params
        }
      }).then(data => wrapSpaceMembershipCollection(makeRequest, data));
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
    createSpaceMembership(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(response => wrapSpaceMembership(makeRequest, response));
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
    createSpaceMembershipWithId(id, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          spaceMembershipId: id
        },
        payload: data
      }).then(response => wrapSpaceMembership(makeRequest, response));
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
    getTeamSpaceMembership(teamSpaceMembershipId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          teamSpaceMembershipId
        }
      }).then(data => wrapTeamSpaceMembership(makeRequest, data));
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
    getTeamSpaceMemberships(query = {}) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query: Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["createRequestConfig"])({
            query: query
          }).params
        }
      }).then(data => wrapTeamSpaceMembershipCollection(makeRequest, data));
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
    createTeamSpaceMembership(teamId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'create',
        params: {
          spaceId: raw.sys.id,
          teamId
        },
        payload: data
      }).then(response => wrapTeamSpaceMembership(makeRequest, response));
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
    getApiKey(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        }
      }).then(data => wrapApiKey(makeRequest, data));
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
    getApiKeys() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(data => wrapApiKeyCollection(makeRequest, data));
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
    getPreviewApiKeys() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(data => wrapPreviewApiKeyCollection(makeRequest, data));
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
    getPreviewApiKey(id) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'PreviewApiKey',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          previewApiKeyId: id
        }
      }).then(data => wrapPreviewApiKey(makeRequest, data));
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
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload
      }).then(data => wrapApiKey(makeRequest, data));
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
    createApiKeyWithId(id, payload) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ApiKey',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          apiKeyId: id
        },
        payload
      }).then(data => wrapApiKey(makeRequest, data));
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
    createEnvironmentAliasWithId(environmentAliasId, data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'createWithId',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId
        },
        payload: data
      }).then(response => wrapEnvironmentAlias(makeRequest, response));
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
    getEnvironmentAlias(environmentAliasId) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'get',
        params: {
          spaceId: raw.sys.id,
          environmentAliasId
        }
      }).then(data => wrapEnvironmentAlias(makeRequest, data));
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
    getEnvironmentAliases() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id
        }
      }).then(data => wrapEnvironmentAliasCollection(makeRequest, data));
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
    getScheduledActions(query) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'getMany',
        params: {
          spaceId: raw.sys.id,
          query
        }
      }).then(response => wrapScheduledActionCollection(makeRequest, response));
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
    getScheduledAction({
      scheduledActionId,
      environmentId
    }) {
      const space = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'get',
        params: {
          spaceId: space.sys.id,
          environmentId,
          scheduledActionId
        }
      }).then(scheduledAction => wrapScheduledAction(makeRequest, scheduledAction));
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
    createScheduledAction(data) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'create',
        params: {
          spaceId: raw.sys.id
        },
        payload: data
      }).then(response => wrapScheduledAction(makeRequest, response));
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
    updateScheduledAction({
      scheduledActionId,
      payload,
      version
    }) {
      const spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'update',
        params: {
          spaceId: spaceProps.sys.id,
          version,
          scheduledActionId
        },
        payload
      }).then(response => wrapScheduledAction(makeRequest, response));
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
    deleteScheduledAction({
      scheduledActionId,
      environmentId
    }) {
      const spaceProps = this.toPlainObject();
      return makeRequest({
        entityType: 'ScheduledAction',
        action: 'delete',
        params: {
          spaceId: spaceProps.sys.id,
          environmentId,
          scheduledActionId
        }
      }).then(response => wrapScheduledAction(makeRequest, response));
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
  return Object.keys(methodsObject).reduce((enhancedObject, methodName) => {
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createApiKeyApi(makeRequest) {
  const getParams = data => {
    var _data$sys$space$sys$i, _data$sys$space;

    return {
      spaceId: (_data$sys$space$sys$i = (_data$sys$space = data.sys.space) === null || _data$sys$space === void 0 ? void 0 : _data$sys$space.sys.id) !== null && _data$sys$space$sys$i !== void 0 ? _data$sys$space$sys$i : '',
      apiKeyId: data.sys.id
    };
  };

  return {
    update: function update() {
      const self = this;
      return makeRequest({
        entityType: 'ApiKey',
        action: 'update',
        params: getParams(self),
        payload: self,
        headers: {}
      }).then(data => wrapApiKey(makeRequest, data));
    },
    delete: function del() {
      const self = this;
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
  const apiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const apiKeyWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(apiKey, createApiKeyApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(apiKeyWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw api key collection data
 * @return Wrapped api key collection data
 */

const wrapApiKeyCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapApiKey);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createAppBundleApi(makeRequest) {
  const getParams = data => ({
    organizationId: data.sys.organization.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id,
    appBundleId: data.sys.id
  });

  return {
    delete: function del() {
      const data = this.toPlainObject();
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
  const appBundle = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const appBundleWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(appBundle, createAppBundleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appBundleWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Bundle collection data
 * @return Wrapped App Bundle collection data
 */

const wrapAppBundleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapAppBundle);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const appDefinition = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const appDefinitionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(appDefinition, Object(_create_app_definition_api__WEBPACK_IMPORTED_MODULE_4__["default"])(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(appDefinitionWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Definition collection data
 * @return Wrapped App Definition collection data
 */

const wrapAppDefinitionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAppDefinition);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createAppInstallationApi(makeRequest) {
  const getParams = data => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    appDefinitionId: data.sys.appDefinition.sys.id
  });

  return {
    update: function update() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'AppInstallation',
        action: 'upsert',
        params: getParams(data),
        headers: {},
        payload: data
      }).then(data => wrapAppInstallation(makeRequest, data));
    },
    delete: function del() {
      const data = this.toPlainObject();
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
  const appInstallation = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const appInstallationWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(appInstallation, createAppInstallationApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appInstallationWithMethods);
}
/**
 * @private
 */

const wrapAppInstallationCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAppInstallation);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





function createAppUploadApi(makeRequest) {
  const getParams = data => ({
    organizationId: data.sys.organization.sys.id,
    appUploadId: data.sys.id
  });

  return {
    delete: function del() {
      const data = this.toPlainObject();
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
  const appUpload = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const appUploadWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(appUpload, createAppUploadApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(appUploadWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw App Upload collection data
 * @return Wrapped App Upload collection data
 */

const wrapAppUploadCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapAppUpload);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");



/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw asset key data
 * @return Wrapped asset key data
 */
function wrapAssetKey(_makeRequest, data) {
  const assetKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _plain_checks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plain/checks */ "./plain/checks.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function createAssetApi(makeRequest) {
  const getParams = raw => {
    return {
      spaceId: raw.sys.space.sys.id,
      environmentId: raw.sys.environment.sys.id,
      assetId: raw.sys.id
    };
  };

  return {
    processForLocale: function processForLocale(locale, options) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForLocale',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          locale,
          options,
          asset: raw
        })
      }).then(data => wrapAsset(makeRequest, data));
    },
    processForAllLocales: function processForAllLocales(options) {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'processForAllLocales',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          asset: raw,
          options
        })
      }).then(data => wrapAsset(makeRequest, data));
    },
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'update',
        params: getParams(raw),
        payload: raw,
        headers: {}
      }).then(data => wrapAsset(makeRequest, data));
    },
    delete: function del() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'delete',
        params: getParams(raw)
      });
    },
    publish: function publish() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'publish',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapAsset(makeRequest, data));
    },
    unpublish: function unpublish() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unpublish',
        params: getParams(raw)
      }).then(data => wrapAsset(makeRequest, data));
    },
    archive: function archive() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'archive',
        params: getParams(raw)
      }).then(data => wrapAsset(makeRequest, data));
    },
    unarchive: function unarchive() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Asset',
        action: 'unarchive',
        params: getParams(raw)
      }).then(data => wrapAsset(makeRequest, data));
    },
    isPublished: function isPublished() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isPublished"](raw);
    },
    isUpdated: function isUpdated() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isUpdated"](raw);
    },
    isDraft: function isDraft() {
      const raw = this.toPlainObject();
      return _plain_checks__WEBPACK_IMPORTED_MODULE_4__["isDraft"](raw);
    },
    isArchived: function isArchived() {
      const raw = this.toPlainObject();
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
  const asset = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const assetWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(asset, createAssetApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(assetWithMethods);
}
/**
 * @private
 */

const wrapAssetCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapAsset);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _methods_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/action */ "./methods/action.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */




/** Entity types supported by the BulkAction API */

/** Represents the state of the BulkAction */
let BulkActionStatus;

(function (BulkActionStatus) {
  BulkActionStatus["created"] = "created";
  BulkActionStatus["inProgress"] = "inProgress";
  BulkActionStatus["succeeded"] = "succeeded";
  BulkActionStatus["failed"] = "failed";
})(BulkActionStatus || (BulkActionStatus = {}));

const STATUSES = Object.values(BulkActionStatus);

function createBulkActionApi(makeRequest) {
  const getParams = self => {
    const bulkAction = self.toPlainObject();
    return {
      spaceId: bulkAction.sys.space.sys.id,
      environmentId: bulkAction.sys.environment.sys.id,
      bulkActionId: bulkAction.sys.id
    };
  };

  return {
    get() {
      var _this = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this);
        return makeRequest({
          entityType: 'BulkAction',
          action: 'get',
          params
        }).then(bulkAction => wrapBulkAction(makeRequest, bulkAction));
      })();
    },

    waitProcessing(options) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        return Object(_methods_action__WEBPACK_IMPORTED_MODULE_3__["pollAsyncActionStatus"])( /*#__PURE__*/_asyncToGenerator(function* () {
          return _this2.get();
        }), options);
      })();
    }

  };
}

/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw BulkAction data
 * @return Wrapped BulkAction data
 */
function wrapBulkAction(makeRequest, data) {
  const bulkAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const bulkActionWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(bulkAction, createBulkActionApi(makeRequest));
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const getParams = self => {
    const contentType = self.toPlainObject();
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
      const _getParams = getParams(this),
            raw = _getParams.raw,
            params = _getParams.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'update',
        params,
        payload: raw
      }).then(data => wrapContentType(makeRequest, data));
    },
    delete: function _delete() {
      const _getParams2 = getParams(this),
            params = _getParams2.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'delete',
        params
      }).then(() => {// noop
      });
    },
    publish: function publish() {
      const _getParams3 = getParams(this),
            raw = _getParams3.raw,
            params = _getParams3.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'publish',
        params,
        payload: raw
      }).then(data => wrapContentType(makeRequest, data));
    },
    unpublish: function unpublish() {
      const _getParams4 = getParams(this),
            params = _getParams4.params;

      return makeRequest({
        entityType: 'ContentType',
        action: 'unpublish',
        params
      }).then(data => wrapContentType(makeRequest, data));
    },
    getEditorInterface: function getEditorInterface() {
      const _getParams5 = getParams(this),
            params = _getParams5.params;

      return makeRequest({
        entityType: 'EditorInterface',
        action: 'get',
        params
      }).then(data => Object(_editor_interface__WEBPACK_IMPORTED_MODULE_5__["wrapEditorInterface"])(makeRequest, data));
    },
    getSnapshots: function getSnapshots(query = {}) {
      const _getParams6 = getParams(this),
            params = _getParams6.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getManyForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          query
        })
      }).then(data => Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshotCollection"])(makeRequest, data));
    },
    getSnapshot: function getSnapshot(snapshotId) {
      const _getParams7 = getParams(this),
            params = _getParams7.params;

      return makeRequest({
        entityType: 'Snapshot',
        action: 'getForContentType',
        params: _objectSpread(_objectSpread({}, params), {}, {
          snapshotId
        })
      }).then(data => Object(_snapshot__WEBPACK_IMPORTED_MODULE_6__["wrapSnapshot"])(makeRequest, data));
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
      const _getParams8 = getParams(this),
            raw = _getParams8.raw,
            params = _getParams8.params;

      return Object(_methods_content_type__WEBPACK_IMPORTED_MODULE_7__["omitAndDeleteField"])(makeRequest, _objectSpread(_objectSpread({}, params), {}, {
        fieldId
      }), raw).then(data => wrapContentType(makeRequest, data));
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
  const contentType = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const contentTypeWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(contentType, createContentTypeApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(contentTypeWithMethods);
}
/**
 * @private
 */

const wrapContentTypeCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapContentType);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createEditorInterfaceApi(makeRequest) {
  return {
    update: function update() {
      const self = this;
      const raw = self.toPlainObject();
      return makeRequest({
        entityType: 'EditorInterface',
        action: 'update',
        params: {
          spaceId: self.sys.space.sys.id,
          environmentId: self.sys.environment.sys.id,
          contentTypeId: self.sys.contentType.sys.id
        },
        payload: raw
      }).then(response => wrapEditorInterface(makeRequest, response));
    },
    getControlForField: function getControlForField(fieldId) {
      const self = this;
      const result = (self.controls || []).filter(control => {
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
  const editorInterface = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const editorInterfaceWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(editorInterface, createEditorInterfaceApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(editorInterfaceWithMethods);
}
/**
 * @private
 */

const wrapEditorInterfaceCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapEditorInterface);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const entry = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const entryWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(entry, Object(_create_entry_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(entryWithMethods);
}
/**
 * Data is also mixed in with link getters if links exist and includes were requested
 * @private
 */

const wrapEntryCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapEntry);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createEnvironmentAliasApi(makeRequest) {
  const getParams = alias => ({
    spaceId: alias.sys.space.sys.id,
    environmentAliasId: alias.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapEnvironmentAlias(makeRequest, data));
    },
    delete: function _delete() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'EnvironmentAlias',
        action: 'delete',
        params: getParams(raw)
      }).then(() => {// noop
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
  const alias = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const enhancedAlias = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(alias, createEnvironmentAliasApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedAlias);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw environment alias collection data
 * @return Wrapped environment alias collection data
 */

const wrapEnvironmentAliasCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapEnvironmentAlias);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const environment = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const environmentApi = Object(_create_environment_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  const enhancedEnvironment = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(environment, environmentApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedEnvironment);
}
/**
 * This method wraps each environment in a collection with the environment API. See wrapEnvironment
 * above for more details.
 * @private
 */

const wrapEnvironmentCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["wrapCollection"])(wrapEnvironment);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createExtensionApi(makeRequest) {
  const getParams = data => ({
    spaceId: data.sys.space.sys.id,
    environmentId: data.sys.environment.sys.id,
    extensionId: data.sys.id
  });

  return {
    update: function update() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Extension',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(response => wrapExtension(makeRequest, response));
    },
    delete: function del() {
      const data = this.toPlainObject();
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
  const extension = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const extensionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(extension, createExtensionApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(extensionWithMethods);
}
/**
 * @private
 */

const wrapExtensionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapExtension);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createLocaleApi(makeRequest) {
  const getParams = locale => ({
    spaceId: locale.sys.space.sys.id,
    environmentId: locale.sys.environment.sys.id,
    localeId: locale.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapLocale(makeRequest, data));
    },
    delete: function _delete() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Locale',
        action: 'delete',
        params: getParams(raw)
      }).then(() => {// noop
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
  const locale = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const localeWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(locale, createLocaleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(localeWithMethods);
}
/**
 * @private
 */

const wrapLocaleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapLocale);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");



/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
function wrapOrganizationInvitation(_makeRequest, data) {
  const invitation = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createOrganizationMembershipApi(makeRequest, organizationId) {
  const getParams = data => ({
    organizationMembershipId: data.sys.id,
    organizationId
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'OrganizationMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapOrganizationMembership(makeRequest, data, organizationId));
    },
    delete: function del() {
      const raw = this.toPlainObject();
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
  const organizationMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const organizationMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(organizationMembership, createOrganizationMembershipApi(makeRequest, organizationId));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(organizationMembershipWithMethods);
}
/**
 * @private
 */

const wrapOrganizationMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapOrganizationMembership);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const org = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const orgApi = Object(_create_organization_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  const enhancedOrganization = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(org, orgApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(enhancedOrganization);
}
/**
 * This method normalizes each organization in a collection.
 * @private
 */

const wrapOrganizationCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_4__["wrapCollection"])(wrapOrganization);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const personalAccessToken = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const personalAccessTokenWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(personalAccessToken, {
    revoke: function revoke() {
      return makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'revoke',
        params: {
          tokenId: data.sys.id
        }
      }).then(data => wrapPersonalAccessToken(makeRequest, data));
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

const wrapPersonalAccessTokenCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapPersonalAccessToken);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const previewApiKey = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const previewApiKeyWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(previewApiKey, createPreviewApiKeyApi());
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(previewApiKeyWithMethods);
}
/**
 * @private
 */

const wrapPreviewApiKeyCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapPreviewApiKey);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _methods_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../methods/action */ "./methods/action.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */






function createReleaseActionApi(makeRequest) {
  const getParams = self => {
    const action = self.toPlainObject();
    return {
      spaceId: action.sys.space.sys.id,
      environmentId: action.sys.environment.sys.id,
      releaseId: action.sys.release.sys.id,
      actionId: action.sys.id
    };
  };

  return {
    get() {
      var _this = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this);
        return makeRequest({
          entityType: 'ReleaseAction',
          action: 'get',
          params
        }).then(releaseAction => wrapReleaseAction(makeRequest, releaseAction));
      })();
    },

    /** Waits for a Release Action to complete */
    waitProcessing(options) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        return Object(_methods_action__WEBPACK_IMPORTED_MODULE_3__["pollAsyncActionStatus"])( /*#__PURE__*/_asyncToGenerator(function* () {
          return _this2.get();
        }), options);
      })();
    }

  };
}

/**
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
function wrapReleaseAction(makeRequest, data) {
  const releaseAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const releaseActionWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(releaseAction, createReleaseActionApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(releaseActionWithApiMethods);
}
const wrapReleaseActionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapReleaseAction);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _release_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./release-action */ "./entities/release-action.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */





/** Entity types supported by the Release API */

function createReleaseApi(makeRequest) {
  const getParams = self => {
    const release = self.toPlainObject();
    return {
      spaceId: release.sys.space.sys.id,
      environmentId: release.sys.environment.sys.id,
      releaseId: release.sys.id,
      version: release.sys.version
    };
  };

  return {
    update(payload) {
      var _this = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this);
        return makeRequest({
          entityType: 'Release',
          action: 'update',
          params,
          payload
        }).then(release => wrapRelease(makeRequest, release));
      })();
    },

    delete() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this2);
        yield makeRequest({
          entityType: 'Release',
          action: 'delete',
          params
        });
      })();
    },

    publish(options) {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this3);
        return makeRequest({
          entityType: 'Release',
          action: 'publish',
          params
        }).then(data => Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data)).then(action => action.waitProcessing(options));
      })();
    },

    unpublish(options) {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this4);
        return makeRequest({
          entityType: 'Release',
          action: 'unpublish',
          params
        }).then(data => Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data)).then(action => action.waitProcessing(options));
      })();
    },

    validate(options) {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this5);
        return makeRequest({
          entityType: 'Release',
          action: 'validate',
          params,
          payload: options === null || options === void 0 ? void 0 : options.payload
        }).then(data => Object(_release_action__WEBPACK_IMPORTED_MODULE_4__["wrapReleaseAction"])(makeRequest, data)).then(action => action.waitProcessing(options === null || options === void 0 ? void 0 : options.processingOptions));
      })();
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
  const release = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const releaseWithApiMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(release, createReleaseApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(releaseWithApiMethods);
}
const wrapReleaseCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapRelease);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createRoleApi(makeRequest) {
  const getParams = data => ({
    spaceId: data.sys.space.sys.id,
    roleId: data.sys.id
  });

  return {
    update: function update() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Role',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(data => wrapRole(makeRequest, data));
    },
    delete: function del() {
      const data = this.toPlainObject();
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
  const role = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const roleWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(role, createRoleApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(roleWithMethods);
}
/**
 * @private
 */

const wrapRoleCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapRole);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const getParams = self => {
    var _scheduledAction$envi;

    const scheduledAction = self.toPlainObject();
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
    delete() {
      var _this = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this);
        return makeRequest({
          entityType: 'ScheduledAction',
          action: 'delete',
          params
        }).then(data => wrapScheduledAction(makeRequest, data));
      })();
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
    update() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        const params = getParams(_this2); // eslint-disable-next-line @typescript-eslint/no-unused-vars

        const _this2$toPlainObject = _this2.toPlainObject(),
              sys = _this2$toPlainObject.sys,
              payload = _objectWithoutProperties(_this2$toPlainObject, ["sys"]);

        return makeRequest({
          entityType: 'ScheduledAction',
          action: 'update',
          params,
          payload
        }).then(data => wrapScheduledAction(makeRequest, data));
      })();
    }

  };
}
function wrapScheduledAction(makeRequest, data) {
  const scheduledAction = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const scheduledActionWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(scheduledAction, getInstanceMethods(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(scheduledActionWithMethods);
}
const wrapScheduledActionCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapScheduledAction);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const snapshot = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const snapshotWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(snapshot, createSnapshotApi());
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(snapshotWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw snapshot collection data
 * @return Wrapped snapshot collection data
 */

const wrapSnapshotCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapSnapshot);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");




/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw space member data
 * @return Wrapped space member data
 */
function wrapSpaceMember(_makeRequest, data) {
  const spaceMember = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(spaceMember);
}
/**
 * @private
 */

const wrapSpaceMemberCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapSpaceMember);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createSpaceMembershipApi(makeRequest) {
  const getParams = data => ({
    spaceId: data.sys.space.sys.id,
    spaceMembershipId: data.sys.id
  });

  return {
    update: function update() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'SpaceMembership',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(data => wrapSpaceMembership(makeRequest, data));
    },
    delete: function del() {
      const data = this.toPlainObject();
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
  const spaceMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const spaceMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(spaceMembership, createSpaceMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(spaceMembershipWithMethods);
}
/**
 * @private
 */

const wrapSpaceMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapSpaceMembership);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
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
  const space = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const spaceApi = Object(_create_space_api__WEBPACK_IMPORTED_MODULE_3__["default"])(makeRequest);
  const enhancedSpace = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(space, spaceApi);
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(enhancedSpace);
}
/**
 * This method wraps each space in a collection with the space API. See wrapSpace
 * above for more details.
 * @private
 */

const wrapSpaceCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapSpace);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function createTagApi(makeRequest) {
  const getParams = tag => ({
    spaceId: tag.sys.space.sys.id,
    environmentId: tag.sys.environment.sys.id,
    tagId: tag.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapTag(makeRequest, data));
    },
    delete: function _delete() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Tag',
        action: 'delete',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          version: raw.sys.version
        })
      }).then(() => {// noop
      });
    }
  };
}
function wrapTag(makeRequest, data) {
  const tag = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const tagWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(tag, createTagApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(tagWithMethods);
}
const wrapTagCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapTag);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function createTaskApi(makeRequest) {
  const getParams = task => ({
    spaceId: task.sys.space.sys.id,
    environmentId: task.sys.environment.sys.id,
    entryId: task.sys.parentEntity.sys.id,
    taskId: task.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Task',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapTask(makeRequest, data));
    },
    delete: function _delete() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Task',
        action: 'delete',
        params: _objectSpread(_objectSpread({}, getParams(raw)), {}, {
          version: raw.sys.version
        })
      }).then(() => {// noop
      });
    }
  };
}
function wrapTask(makeRequest, data) {
  const task = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const taskWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(task, createTaskApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(taskWithMethods);
}
const wrapTaskCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapTask);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createTeamMembershipApi(makeRequest) {
  const getParams = data => ({
    teamMembershipId: data.sys.id,
    teamId: data.sys.team.sys.id,
    organizationId: data.sys.organization.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapTeamMembership(makeRequest, data));
    },
    delete: function del() {
      const raw = this.toPlainObject();
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
  const teamMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const teamMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(teamMembership, createTeamMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamMembershipWithMethods);
}
/**
 * @private
 */

const wrapTeamMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeamMembership);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





function createTeamSpaceMembershipApi(makeRequest) {
  const getParams = data => ({
    teamSpaceMembershipId: data.sys.id,
    spaceId: data.sys.space.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'TeamSpaceMembership',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapTeamSpaceMembership(makeRequest, data));
    },
    delete: function del() {
      const data = this.toPlainObject();
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
  const teamSpaceMembership = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const teamSpaceMembershipWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(teamSpaceMembership, createTeamSpaceMembershipApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamSpaceMembershipWithMethods);
}
/**
 * @private
 */

const wrapTeamSpaceMembershipCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeamSpaceMembership);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





/**
 * @private
 */
function createTeamApi(makeRequest) {
  const getParams = data => ({
    teamId: data.sys.id,
    organizationId: data.sys.organization.sys.id
  });

  return {
    update: function update() {
      const raw = this.toPlainObject();
      return makeRequest({
        entityType: 'Team',
        action: 'update',
        params: getParams(raw),
        payload: raw
      }).then(data => wrapTeam(makeRequest, data));
    },
    delete: function del() {
      const raw = this.toPlainObject();
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
  const team = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const teamWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(team, createTeamApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["freezeSys"])(teamWithMethods);
}
/**
 * @private
 */

const wrapTeamCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapTeam);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! contentful-sdk-core */ "../node_modules/contentful-sdk-core/dist/index.es-modules.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function createUploadApi(makeRequest) {
  return {
    delete: function () {
      var _del = _asyncToGenerator(function* () {
        const raw = this.toPlainObject();
        yield makeRequest({
          entityType: 'Upload',
          action: 'delete',
          params: {
            spaceId: raw.sys.space.sys.id,
            uploadId: raw.sys.id
          }
        });
      });

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
  const upload = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_1__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  const uploadWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(upload, createUploadApi(makeRequest));
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");





/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized usage
 */
function wrapUsage(_makeRequest, data) {
  const usage = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const usageWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(usage, {});
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(usageWithMethods);
}
/**
 * @private
 */

const wrapUsageCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapUsage);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");





/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data
 * @return Normalized user
 */
function wrapUser(_makeRequest, data) {
  const user = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const userWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_2__["default"])(user, {});
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(userWithMethods);
}
/**
 * @private
 * @param makeRequest - function to make requests via an adapter
 * @param data - Raw data collection
 * @return Normalized user collection
 */

const wrapUserCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_3__["wrapCollection"])(wrapUser);

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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common-utils */ "./common-utils.ts");
/* harmony import */ var _enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enhance-with-methods */ "./enhance-with-methods.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function createWebhookApi(makeRequest) {
  const getParams = data => ({
    spaceId: data.sys.space.sys.id,
    webhookDefinitionId: data.sys.id
  });

  return {
    update: function update() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'update',
        params: getParams(data),
        payload: data
      }).then(data => wrapWebhook(makeRequest, data));
    },
    delete: function del() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'delete',
        params: getParams(data)
      });
    },
    getCalls: function getCalls() {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getManyCallDetails',
        params: getParams(data)
      });
    },
    getCall: function getCall(id) {
      const data = this.toPlainObject();
      return makeRequest({
        entityType: 'Webhook',
        action: 'getCallDetails',
        params: _objectSpread(_objectSpread({}, getParams(data)), {}, {
          callId: id
        })
      });
    },
    getHealth: function getHealth() {
      const data = this.toPlainObject();
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
  const webhook = Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["toPlainObject"])(Object(fast_copy__WEBPACK_IMPORTED_MODULE_1__["default"])(data));
  const webhookWithMethods = Object(_enhance_with_methods__WEBPACK_IMPORTED_MODULE_3__["default"])(webhook, createWebhookApi(makeRequest));
  return Object(contentful_sdk_core__WEBPACK_IMPORTED_MODULE_0__["freezeSys"])(webhookWithMethods);
}
/**
 * @private
 */

const wrapWebhookCollection = Object(_common_utils__WEBPACK_IMPORTED_MODULE_2__["wrapCollection"])(wrapWebhook);

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
  const config = errorResponse.config,
        response = errorResponse.response;
  let errorName; // Obscure the Management token

  if (config && config.headers && config.headers['Authorization']) {
    const token = `...${config.headers['Authorization'].substr(-5)}`;
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (!lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(response) || !lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(config)) {
    throw errorResponse;
  }

  const data = response === null || response === void 0 ? void 0 : response.data;
  const errorData = {
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

  const error = new Error();
  error.name = errorName && errorName !== 'Unknown' ? errorName : `${response === null || response === void 0 ? void 0 : response.status} ${response === null || response === void 0 ? void 0 : response.statusText}`;

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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */

const DEFAULT_MAX_RETRIES = 30;
const DEFAULT_INITIAL_DELAY_MS = 1000;
const DEFAULT_RETRY_INTERVAL_MS = 2000;
/** Action is an interface that has a sys.status to be checked against */

class AsyncActionProcessingError extends Error {
  constructor(message, action) {
    super(message);
    this.action = action;
    this.name = this.constructor.name;
  }

}
class AsyncActionFailedError extends AsyncActionProcessingError {}

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
  _pollAsyncActionStatus = _asyncToGenerator(function* (actionFunction, options) {
    var _options$retryCount, _options$retryInterva, _options$initialDelay, _options$throwOnFaile, _action;

    let retryCount = 0;
    let done = false;
    let action;
    const maxRetries = (_options$retryCount = options === null || options === void 0 ? void 0 : options.retryCount) !== null && _options$retryCount !== void 0 ? _options$retryCount : DEFAULT_MAX_RETRIES;
    const retryIntervalMs = (_options$retryInterva = options === null || options === void 0 ? void 0 : options.retryIntervalMs) !== null && _options$retryInterva !== void 0 ? _options$retryInterva : DEFAULT_RETRY_INTERVAL_MS;
    const initialDelayMs = (_options$initialDelay = options === null || options === void 0 ? void 0 : options.initialDelayMs) !== null && _options$initialDelay !== void 0 ? _options$initialDelay : DEFAULT_INITIAL_DELAY_MS;
    const throwOnFailedExecution = (_options$throwOnFaile = options === null || options === void 0 ? void 0 : options.throwOnFailedExecution) !== null && _options$throwOnFaile !== void 0 ? _options$throwOnFaile : true; // Initial delay for short-running Actions

    yield Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(initialDelayMs);

    while (retryCount < maxRetries && !done) {
      action = yield actionFunction(); // Terminal states

      if (action && ['succeeded', 'failed'].includes(action.sys.status)) {
        done = true;

        if (action.sys.status === 'failed' && throwOnFailedExecution) {
          throw new AsyncActionFailedError(`${action.sys.type} failed to execute.`, action);
        }

        return action;
      }

      yield Object(_utils__WEBPACK_IMPORTED_MODULE_0__["sleep"])(retryIntervalMs);
      retryCount += 1;
    }

    throw new AsyncActionProcessingError(`${(_action = action) === null || _action === void 0 ? void 0 : _action.sys.type} didn't finish processing within the expected timeframe.`, action);
  });
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
const findAndUpdateField = function findAndUpdateField(contentType, fieldId, omitOrDelete) {
  const field = contentType.fields.find(field => field.id === fieldId);

  if (!field) {
    return Promise.reject(new Error(`Tried to omitAndDeleteField on a nonexistent field, ${fieldId}, on the content type ${contentType.name}.`));
  }

  field[omitOrDelete] = true;
  return Promise.resolve(contentType);
};

const omitAndDeleteField = (makeRequest, _ref, contentType) => {
  let fieldId = _ref.fieldId,
      params = _objectWithoutProperties(_ref, ["fieldId"]);

  return findAndUpdateField(contentType, fieldId, 'omitted').then(newContentType => {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params,
      payload: newContentType
    });
  }).then(newContentType => {
    return findAndUpdateField(newContentType, fieldId, 'deleted');
  }).then(newContentType => {
    return makeRequest({
      entityType: 'ContentType',
      action: 'update',
      params,
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
  return new Promise(resolve => setTimeout(resolve, durationMs));
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
/* harmony import */ var fast_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-copy */ "../node_modules/fast-copy/dist/fast-copy.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


const asIterator = (fn, params) => {
  return {
    [Symbol.asyncIterator]() {
      let options = Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(params);

      const get = () => fn(Object(fast_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(options));

      let currentResult = get();
      return {
        current: 0,

        next() {
          var _this = this;

          return _asyncToGenerator(function* () {
            const _yield$currentResult = yield currentResult,
                  total = _yield$currentResult.total,
                  items = _yield$currentResult.items,
                  skip = _yield$currentResult.skip,
                  limit = _yield$currentResult.limit;

            if (total === _this.current) {
              return {
                done: true,
                value: null
              };
            }

            const value = items[_this.current++ - skip];
            const endOfPage = _this.current % limit === 0;
            const endOfList = _this.current === total;

            if (endOfPage && !endOfList) {
              options = _objectSpread(_objectSpread({}, options), {}, {
                query: _objectSpread(_objectSpread({}, options.query), {}, {
                  skip: skip + limit
                })
              });
              currentResult = get();
            }

            return {
              done: false,
              value
            };
          })();
        }

      };
    }

  };
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
const isPublished = data => !!data.sys.publishedVersion;
const isUpdated = data => {
  // The act of publishing an entity increases its version by 1, so any entry which has
  // 2 versions higher or more than the publishedVersion has unpublished changes.
  return !!(data.sys.publishedVersion && data.sys.version > data.sys.publishedVersion + 1);
};
const isDraft = data => !data.sys.publishedVersion;
const isArchived = data => !!data.sys.archivedVersion;

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



const createPlainClient = (makeRequest, defaults) => {
  const wrapParams = {
    makeRequest,
    defaults
  };
  return {
    raw: {
      getDefaultParams: () => defaults,
      get: (url, config) => makeRequest({
        entityType: 'Http',
        action: 'get',
        params: {
          url,
          config
        }
      }),
      patch: (url, payload, config) => makeRequest({
        entityType: 'Http',
        action: 'patch',
        params: {
          url,
          config
        },
        payload
      }),
      post: (url, payload, config) => makeRequest({
        entityType: 'Http',
        action: 'post',
        params: {
          url,
          config
        },
        payload
      }),
      put: (url, payload, config) => makeRequest({
        entityType: 'Http',
        action: 'put',
        params: {
          url,
          config
        },
        payload
      }),
      delete: (url, config) => makeRequest({
        entityType: 'Http',
        action: 'delete',
        params: {
          url,
          config
        }
      }),
      http: (url, config) => makeRequest({
        entityType: 'Http',
        action: 'request',
        params: {
          url,
          config
        }
      })
    },
    appBundle: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'getMany'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppBundle', 'delete'),
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'delete'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Space', 'create')
    },
    environment: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Environment', 'delete')
    },
    environmentAlias: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'getMany'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'EnvironmentAlias', 'delete')
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'unpublish'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ContentType', 'createWithId'),
      omitAndDeleteField: (params, contentType, fieldId) => Object(_methods_content_type__WEBPACK_IMPORTED_MODULE_0__["omitAndDeleteField"])(makeRequest, _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
        fieldId
      }), contentType)
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Task', 'delete')
    },
    entry: {
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'getMany'),
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'get'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'update'),
      patch: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'patch'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Entry', 'delete'),
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'delete'),
      publish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'publish'),
      unpublish: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'unpublish'),
      archive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'archive'),
      unarchive: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'unarchive'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'createWithId'),
      createFromFiles: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Asset', 'createFromFiles'),
      processForAllLocales: (params, asset, options) => makeRequest({
        entityType: 'Asset',
        action: 'processForAllLocales',
        params: _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
          options,
          asset
        })
      }),
      processForLocale: (params, asset, locale, options) => makeRequest({
        entityType: 'Asset',
        action: 'processForLocale',
        params: _objectSpread(_objectSpread({}, _objectSpread(_objectSpread({}, defaults), params)), {}, {
          locale,
          asset,
          options
        })
      })
    },
    appUpload: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'get'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'delete'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppUpload', 'create')
    },
    assetKey: {
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AssetKey', 'create')
    },
    upload: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'get'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'create'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Upload', 'delete')
    },
    locale: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'getMany'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'delete'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'update'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Locale', 'create')
    },
    personalAccessToken: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PersonalAccessToken', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'PersonalAccessToken', 'getMany'),
      create: (data, headers) => makeRequest({
        entityType: 'PersonalAccessToken',
        action: 'create',
        params: {},
        headers,
        payload: data
      }),
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Release', 'delete'),
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Role', 'delete')
    },
    scheduledActions: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'create'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ScheduledAction', 'delete'),
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'ApiKey', 'delete')
    },
    appDefinition: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppDefinition', 'delete')
    },
    appInstallation: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'getMany'),
      upsert: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'upsert'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'AppInstallation', 'delete')
    },
    extension: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'getMany'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'create'),
      createWithId: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'createWithId'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Extension', 'delete')
    },
    webhook: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getMany'),
      getHealthStatus: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getHealthStatus'),
      getCallDetails: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getCallDetails'),
      getManyCallDetails: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'getManyCallDetails'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Webhook', 'delete')
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Tag', 'delete')
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'OrganizationMembership', 'delete')
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
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'SpaceMembership', 'delete')
    },
    team: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'getMany'),
      getManyForSpace: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'getManyForSpace'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'Team', 'delete')
    },
    teamMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'get'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'getManyForOrganization'),
      getManyForTeam: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'getManyForTeam'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamMembership', 'delete')
    },
    teamSpaceMembership: {
      get: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'get'),
      getMany: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getMany'),
      getForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getForOrganization'),
      getManyForOrganization: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'getManyForOrganization'),
      create: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'create'),
      update: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'update'),
      delete: Object(_wrappers_wrap__WEBPACK_IMPORTED_MODULE_1__["wrap"])(wrapParams, 'TeamSpaceMembership', 'delete')
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
const wrap = ({
  makeRequest,
  defaults
}, entityType, action) => {
  // It's not really possible to make this type safe as we are overloading `makeRequest`.
  // This missing typesafety is only within `wrap`. `wrap` has proper public types.
  // @ts-expect-error
  return (params, payload, headers) => // @ts-expect-error
  makeRequest({
    // @ts-expect-error
    entityType,
    // @ts-expect-error
    action,
    // @ts-expect-error
    params: _objectSpread(_objectSpread({}, defaults), params),
    payload,
    headers
  });
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
  const _ref = http.httpClientParams,
        hostUpload = _ref.hostUpload,
        defaultHostnameUpload = _ref.defaultHostnameUpload;
  const uploadHttp = http.cloneWithNewParams({
    host: hostUpload || defaultHostnameUpload
  });
  return uploadHttp;
}

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./contentful-management.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./contentful-management.ts */"./contentful-management.ts");


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=contentful-management.node.js.map