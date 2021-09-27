function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import enhanceWithMethods from '../enhance-with-methods';
import { pollAsyncActionStatus } from '../methods/action';
/** Entity types supported by the BulkAction API */

/** Represents the state of the BulkAction */
export var BulkActionStatus;

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
                return _context3.abrupt("return", pollAsyncActionStatus( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
export function wrapBulkAction(makeRequest, data) {
  var bulkAction = toPlainObject(copy(data));
  var bulkActionWithApiMethods = enhanceWithMethods(bulkAction, createBulkActionApi(makeRequest));
  return freezeSys(bulkActionWithApiMethods);
}