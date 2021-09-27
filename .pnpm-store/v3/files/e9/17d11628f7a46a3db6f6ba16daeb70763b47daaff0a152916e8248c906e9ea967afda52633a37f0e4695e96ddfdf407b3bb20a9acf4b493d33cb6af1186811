function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { pollAsyncActionStatus } from './action';

/** Waits for a BulkAction status to be either succeeded or failed.
 * Used by the Plain client */
export function waitForBulkActionProcessing(_x, _x2) {
  return _waitForBulkActionProcessing.apply(this, arguments);
}

function _waitForBulkActionProcessing() {
  _waitForBulkActionProcessing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref, options) {
    var plainClient, spaceId, environmentId, bulkActionId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            plainClient = _ref.plainClient, spaceId = _ref.spaceId, environmentId = _ref.environmentId, bulkActionId = _ref.bulkActionId;
            return _context2.abrupt("return", pollAsyncActionStatus( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", plainClient.bulkAction.get({
                        bulkActionId: bulkActionId,
                        spaceId: spaceId,
                        environmentId: environmentId
                      }));

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), options));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _waitForBulkActionProcessing.apply(this, arguments);
}