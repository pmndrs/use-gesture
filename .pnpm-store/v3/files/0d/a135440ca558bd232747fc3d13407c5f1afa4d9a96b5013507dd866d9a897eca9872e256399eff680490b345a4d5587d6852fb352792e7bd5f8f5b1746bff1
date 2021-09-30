function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getAlgoliaHits, getAlgoliaResults } from '../results';

function createSearchClient() {
  return {
    search: jest.fn(function () {
      return Promise.resolve({
        results: [{
          hits: [{
            label: 'Hit 1'
          }]
        }, {
          hits: [{
            label: 'Hit 2'
          }]
        }]
      });
    })
  };
}

describe('getAlgoliaResults', function () {
  test('with default options', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var searchClient, results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchClient = createSearchClient();
            _context.next = 3;
            return getAlgoliaResults({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query'
              }]
            });

          case 3:
            results = _context.sent;
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenCalledWith([{
              indexName: 'indexName',
              query: 'query',
              params: {
                hitsPerPage: 5,
                highlightPreTag: '<mark>',
                highlightPostTag: '</mark>'
              }
            }]);
            expect(results).toEqual([{
              hits: [{
                label: 'Hit 1'
              }]
            }, {
              hits: [{
                label: 'Hit 2'
              }]
            }]);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('with custom search parameters', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var searchClient, results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchClient = createSearchClient();
            _context2.next = 3;
            return getAlgoliaResults({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query',
                params: {
                  hitsPerPage: 10,
                  highlightPreTag: '<em>',
                  highlightPostTag: '</em>',
                  page: 2
                }
              }]
            });

          case 3:
            results = _context2.sent;
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenCalledWith([{
              indexName: 'indexName',
              query: 'query',
              params: {
                hitsPerPage: 10,
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                page: 2
              }
            }]);
            expect(results).toEqual([{
              hits: [{
                label: 'Hit 1'
              }]
            }, {
              hits: [{
                label: 'Hit 2'
              }]
            }]);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('attaches Algolia agent', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var searchClient;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            searchClient = createSearchClient();
            searchClient.addAlgoliaAgent = jest.fn();
            _context3.next = 4;
            return getAlgoliaResults({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query',
                params: {
                  hitsPerPage: 10,
                  highlightPreTag: '<em>',
                  highlightPostTag: '</em>',
                  page: 2
                }
              }]
            });

          case 4:
            expect(searchClient.addAlgoliaAgent).toHaveBeenCalledTimes(1);
            expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith('autocomplete-core', 'version-test');

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe('getAlgoliaHits', function () {
  test('with default options', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var searchClient, hits;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            searchClient = createSearchClient();
            _context4.next = 3;
            return getAlgoliaHits({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query'
              }]
            });

          case 3:
            hits = _context4.sent;
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenCalledWith([{
              indexName: 'indexName',
              query: 'query',
              params: {
                hitsPerPage: 5,
                highlightPreTag: '<mark>',
                highlightPostTag: '</mark>'
              }
            }]);
            expect(hits).toEqual([{
              label: 'Hit 1'
            }, {
              label: 'Hit 2'
            }]);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('with custom search parameters', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var searchClient, hits;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            searchClient = createSearchClient();
            _context5.next = 3;
            return getAlgoliaHits({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query',
                params: {
                  hitsPerPage: 10,
                  highlightPreTag: '<em>',
                  highlightPostTag: '</em>',
                  page: 2
                }
              }]
            });

          case 3:
            hits = _context5.sent;
            expect(searchClient.search).toHaveBeenCalledTimes(1);
            expect(searchClient.search).toHaveBeenCalledWith([{
              indexName: 'indexName',
              query: 'query',
              params: {
                hitsPerPage: 10,
                highlightPreTag: '<em>',
                highlightPostTag: '</em>',
                page: 2
              }
            }]);
            expect(hits).toEqual([{
              label: 'Hit 1'
            }, {
              label: 'Hit 2'
            }]);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('attaches Algolia agent', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var searchClient;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            searchClient = createSearchClient();
            searchClient.addAlgoliaAgent = jest.fn();
            _context6.next = 4;
            return getAlgoliaHits({
              searchClient: searchClient,
              queries: [{
                indexName: 'indexName',
                query: 'query',
                params: {
                  hitsPerPage: 10,
                  highlightPreTag: '<em>',
                  highlightPostTag: '</em>',
                  page: 2
                }
              }]
            });

          case 4:
            expect(searchClient.addAlgoliaAgent).toHaveBeenCalledTimes(1);
            expect(searchClient.addAlgoliaAgent).toHaveBeenCalledWith('autocomplete-core', 'version-test');

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});