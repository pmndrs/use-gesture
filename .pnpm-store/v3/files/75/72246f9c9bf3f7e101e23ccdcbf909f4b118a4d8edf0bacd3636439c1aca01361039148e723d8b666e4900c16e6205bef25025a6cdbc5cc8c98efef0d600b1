"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.derivePath = derivePath;

var _lodash = _interopRequireDefault(require("lodash"));

var _slugify = _interopRequireDefault(require("@sindresorhus/slugify"));

var _pathUtils = require("./path-utils");

var doubleForwardSlashes = /\/\/+/g; // Match 0 or 1 of "/"

var indexRoute = /^\/?$/; // Generates the path for the page from the file path
// product/{Product.id} => /product/:id, pulls from nodes.id
// product/{Product.sku__en} => product/:sku__en pulls from nodes.sku.en
// blog/{MarkdownRemark.parent__(File)__relativePath}} => blog/:slug pulls from nodes.parent.relativePath

function derivePath(path, node, reporter, slugifyOptions) {
  // 0. Since this function will be called for every path times count of nodes the errors will be counted and then the calling function will throw the error once
  var errors = 0; // 1.  Incoming path can optionally be stripped of file extension (but not mandatory)

  var modifiedPath = path; // 2.  Pull out the slug parts that are within { } brackets.

  var slugParts = (0, _pathUtils.extractAllCollectionSegments)(path); // 3.  For each slug parts get the actual value from the node data

  slugParts.forEach(function (slugPart) {
    // 3.a.  this transforms foo__bar into foo.bar
    var cleanedField = (0, _pathUtils.extractFieldWithoutUnion)(slugPart)[0];
    var key = (0, _pathUtils.switchToPeriodDelimiters)(cleanedField); // 3.b  We do node or node.nodes here because we support the special group
    //      graphql field, which then moves nodes in another depth

    var nodeValue = _lodash.default.get(node.nodes, "[0]" + key) || _lodash.default.get(node, key); // 3.c  log error if the key does not exist on node


    if (nodeValue === undefined) {
      if (process.env.gatsby_log_level === "verbose") {
        reporter.verbose("Could not find value in the following node for key " + slugPart + " (transformed to " + key + ") for node:\n\n        " + JSON.stringify(node, null, 2));
      }

      errors++;
      return;
    } // 3.d  Safely slugify all values (to keep URL structures) and remove any trailing slash


    var value = (0, _pathUtils.stripTrailingSlash)(safeSlugify(nodeValue, slugifyOptions)); // 3.e  replace the part of the slug with the actual value

    modifiedPath = modifiedPath.replace(slugPart, value);
  }); // 4.  Remove double forward slashes that could occur in the final URL

  modifiedPath = modifiedPath.replace(doubleForwardSlashes, "/"); // 5.  Remove trailing slashes that could occur in the final URL

  modifiedPath = (0, _pathUtils.stripTrailingSlash)(modifiedPath); // 6.  If the final URL appears to be an index path, use the "index" file naming convention

  if (indexRoute.test((0, _pathUtils.removeFileExtension)(modifiedPath))) {
    modifiedPath = "index" + modifiedPath;
  }

  var derivedPath = modifiedPath;
  return {
    errors: errors,
    derivedPath: derivedPath
  };
} // If the node value is meant to be a slug, like `foo/bar`, the slugify
// function will remove the slashes. This is a hack to make sure the slashes
// stick around in the final url structuring


function safeSlugify(nodeValue, slugifyOptions) {
  // The incoming GraphQL data can also be a number
  var input = String(nodeValue);
  var tempArr = input.split("/");
  return tempArr.map(function (v) {
    return (0, _slugify.default)(v, slugifyOptions);
  }).join("/");
}