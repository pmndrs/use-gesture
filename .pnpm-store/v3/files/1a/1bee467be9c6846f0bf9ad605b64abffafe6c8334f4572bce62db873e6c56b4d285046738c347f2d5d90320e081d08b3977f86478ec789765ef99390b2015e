"use strict";

exports.__esModule = true;
exports.getCollectionRouteParams = getCollectionRouteParams;

var _pathUtils = require("./path-utils");

// This extracts params from its filePath counerpart
// and returns an object of it's matches.
// e.g. /foo/{Product.id}, /foo/123 => {id: 123}
function getCollectionRouteParams(urlTemplate, urlPath) {
  var params = {}; // Remove file extension first so that urlTemplate and urlPath have the same shape

  var cleanedUrlTemplate = (0, _pathUtils.removeFileExtension)(urlTemplate);
  var urlTemplateParts = cleanedUrlTemplate.split("/"); // Create a regex string for later use by creating groups for all { } finds
  // e.g. /foo/prefix-{Product.id} => /foo/prefix-(.+)

  var templateRegex = cleanedUrlTemplate.replace(/\./g, "\\.") // Escape dots
  .replace(/(\{.*?\})/g, "(.+)").split("/");
  var urlParts = urlPath.split("/");
  urlTemplateParts.forEach(function (part, i) {
    if (!part.includes("{") || !part.includes("}")) {
      return;
    } // Use the previously created regex to match prefix-123 to prefix-(.+)


    var match = urlParts[i].match(templateRegex[i]);

    if (!match) {
      return;
    }

    var keys = (0, _pathUtils.extractFieldWithoutUnion)(part);
    keys.some(function (k, j) {
      params[k] = match[j + 1];
      return !match;
    });
  });
  return params;
}