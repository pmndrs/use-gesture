function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import copy from 'fast-copy';
import { wrapCollection } from '../common-utils';
import { pollAsyncActionStatus } from '../methods/action';
import enhanceWithMethods from '../enhance-with-methods';

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
 * @param data - Raw Release data
 * @return Wrapped Release data
 */
export function wrapReleaseAction(makeRequest, data) {
  var releaseAction = toPlainObject(copy(data));
  var releaseActionWithApiMethods = enhanceWithMethods(releaseAction, createReleaseActionApi(makeRequest));
  return freezeSys(releaseActionWithApiMethods);
}
export var wrapReleaseActionCollection = wrapCollection(wrapReleaseAction);