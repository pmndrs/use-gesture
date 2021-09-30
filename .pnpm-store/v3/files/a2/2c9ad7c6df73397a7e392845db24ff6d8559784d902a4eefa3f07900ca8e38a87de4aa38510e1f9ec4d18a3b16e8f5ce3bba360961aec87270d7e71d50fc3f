"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.generateQueryFromString = generateQueryFromString;
exports.reverseLookupParams = reverseLookupParams;

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _pathUtils = require("./path-utils");

// Input queryStringParent could be a Model or a full graphql query
// End result should be something like { allProducts { nodes { id }}}
function generateQueryFromString(queryOrModel, fileAbsolutePath) {
  // TODO: 'fields' possibly contains duplicate fields, e.g. field{name},field{description} that should be merged to field{name,description}
  var fields = extractUrlParamsForQuery(fileAbsolutePath); // In case queryOrModel is not capitalized

  var connectionQuery = _lodash.default.camelCase("all " + queryOrModel);

  return "{" + connectionQuery + "{nodes{" + fields + "}}}";
} // Takes a query result of something like `{ fields: { value: 'foo' }}` with a filepath of `/fields__value` and
// translates the object into `{ fields__value: 'foo' }`. This is necassary to pass the value
// into a query function for each individual page.


function reverseLookupParams(queryResults, absolutePath) {
  var reversedParams = {
    // We always include id
    id: (queryResults.nodes ? queryResults.nodes[0] : queryResults).id
  };
  absolutePath.split(_path.default.sep).forEach(function (part) {
    var extracted = (0, _pathUtils.extractFieldWithoutUnion)(part);
    extracted.forEach(function (extract) {
      if (extract === "") return;

      var results = _lodash.default.get(queryResults.nodes ? queryResults.nodes[0] : queryResults, // replace __ with accessors '.'
      (0, _pathUtils.switchToPeriodDelimiters)(extract));

      reversedParams[extract] = results;
    });
  });
  return reversedParams;
} // Changes something like `/Users/site/src/pages/foo/{Model.id}/{Model.baz}` to `id,baz`.
// Also supports prefixes/postfixes, e.g. `/foo/prefix-{Model.id}` to `id`


function extractUrlParamsForQuery(createdPath) {
  var parts = createdPath.split(_path.default.sep); // always add `id` to queries

  if (parts.some(function (s) {
    return s.includes(".id}");
  }) === false) {
    parts.push("{Model.id}");
  }

  return parts.reduce(function (queryParts, part) {
    if (part.includes("{") && part.includes("}")) {
      var fields = (0, _pathUtils.extractField)(part);
      var derived = fields.map(function (f) {
        return deriveNesting(f);
      });
      return queryParts.concat(derived);
    }

    return queryParts;
  }, []).join(",");
} // pulls out nesting from file names with the special __ syntax
// src/pages/{Model.fields__baz}.js => `fields{baz}`
// src/pages/{Model.fields__(File)__baz}.js => `fields{... on File {baz}}`


function deriveNesting(part) {
  if (part.includes("__")) {
    return part.split("__").reverse().reduce(function (path, part) {
      // This adds support for Unions
      path = (0, _pathUtils.convertUnionSyntaxToGraphql)(path);

      if (path) {
        return part + "{" + path + "}";
      }

      return "" + part + path;
    }, "");
  }

  return part;
}