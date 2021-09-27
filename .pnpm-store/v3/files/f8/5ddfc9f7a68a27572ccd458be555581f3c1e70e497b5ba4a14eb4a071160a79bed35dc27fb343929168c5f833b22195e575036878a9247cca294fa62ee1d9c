function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import enhanceWithMethods from '../enhance-with-methods';
import { wrapReleaseAction } from './release-action';
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
                  return wrapReleaseAction(makeRequest, data);
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
                  return wrapReleaseAction(makeRequest, data);
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
                  return wrapReleaseAction(makeRequest, data);
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
export function wrapRelease(makeRequest, data) {
  var release = toPlainObject(copy(data));
  var releaseWithApiMethods = enhanceWithMethods(release, createReleaseApi(makeRequest));
  return freezeSys(releaseWithApiMethods);
}
export var wrapReleaseCollection = wrapCollection(wrapRelease);