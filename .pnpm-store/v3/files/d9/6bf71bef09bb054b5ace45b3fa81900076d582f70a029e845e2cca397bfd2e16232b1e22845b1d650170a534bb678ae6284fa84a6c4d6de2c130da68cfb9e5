function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { flatten } from './utils';

function getAlgoliaSource(_ref) {
  var searchClient = _ref.searchClient,
      queries = _ref.queries;

  if (typeof searchClient.addAlgoliaAgent === 'function') {
    searchClient.addAlgoliaAgent('autocomplete-core', "1.0.0-alpha.28");
  }

  return searchClient.search(queries.map(function (searchParameters) {
    var indexName = searchParameters.indexName,
        query = searchParameters.query,
        params = searchParameters.params;
    return {
      indexName: indexName,
      query: query,
      params: _objectSpread({
        hitsPerPage: 5,
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      }, params)
    };
  }));
}

export function getAlgoliaResults(_ref2) {
  var searchClient = _ref2.searchClient,
      queries = _ref2.queries;
  return getAlgoliaSource({
    searchClient: searchClient,
    queries: queries
  }).then(function (response) {
    return response.results;
  });
}
export function getAlgoliaHits(_ref3) {
  var searchClient = _ref3.searchClient,
      queries = _ref3.queries;
  return getAlgoliaSource({
    searchClient: searchClient,
    queries: queries
  }).then(function (response) {
    var results = response.results; // @TODO: should `getAlgoliaHits` flatten the hits?

    return flatten(results.map(function (result) {
      return result.hits;
    }));
  });
}