function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import copy from 'fast-copy';
import { freezeSys, toPlainObject } from 'contentful-sdk-core';
import enhanceWithMethods from '../enhance-with-methods';

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


export function wrapUpload(makeRequest, data) {
  var upload = toPlainObject(copy(data));
  var uploadWithMethods = enhanceWithMethods(upload, createUploadApi(makeRequest));
  return freezeSys(uploadWithMethods);
}