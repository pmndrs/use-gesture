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
import { sleep } from './utils';
var DEFAULT_MAX_RETRIES = 30;
var DEFAULT_INITIAL_DELAY_MS = 1000;
var DEFAULT_RETRY_INTERVAL_MS = 2000;
/** Action is an interface that has a sys.status to be checked against */

export var AsyncActionProcessingError = /*#__PURE__*/function (_Error) {
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
export var AsyncActionFailedError = /*#__PURE__*/function (_AsyncActionProcessin) {
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
export function pollAsyncActionStatus(_x, _x2) {
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
            return sleep(initialDelayMs);

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
            return sleep(retryIntervalMs);

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