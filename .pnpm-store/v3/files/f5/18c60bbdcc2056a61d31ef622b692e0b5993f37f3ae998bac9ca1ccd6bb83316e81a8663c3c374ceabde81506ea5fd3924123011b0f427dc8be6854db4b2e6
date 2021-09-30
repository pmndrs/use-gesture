function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import copy from 'fast-copy';
export var asIterator = function asIterator(fn, params) {
  return _defineProperty({}, Symbol.asyncIterator, function () {
    var options = copy(params);

    var get = function get() {
      return fn(copy(options));
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