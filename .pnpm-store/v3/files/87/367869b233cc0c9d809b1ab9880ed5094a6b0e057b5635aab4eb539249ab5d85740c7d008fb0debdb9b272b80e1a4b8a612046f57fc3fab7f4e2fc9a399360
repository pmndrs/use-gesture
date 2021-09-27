function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import axios from 'axios';
import { createHttpClient } from 'contentful-sdk-core';
import copy from 'fast-copy';
import endpoints from './endpoints';
export var defaultHostParameters = {
  defaultHostname: 'api.contentful.com',
  defaultHostnameUpload: 'upload.contentful.com'
};
export var RestAdapter = /*#__PURE__*/function () {
  function RestAdapter(params) {
    _classCallCheck(this, RestAdapter);

    if (!params.accessToken) {
      throw new TypeError('Expected parameter accessToken');
    }

    this.params = _objectSpread(_objectSpread({}, defaultHostParameters), copy(params));
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
                (_endpoints$entityType = endpoints[entityType]) === null || _endpoints$entityType === void 0 ? void 0 : _endpoints$entityType[action];

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

                axiosInstance = createHttpClient(axios, _objectSpread(_objectSpread({}, this.params), {}, {
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