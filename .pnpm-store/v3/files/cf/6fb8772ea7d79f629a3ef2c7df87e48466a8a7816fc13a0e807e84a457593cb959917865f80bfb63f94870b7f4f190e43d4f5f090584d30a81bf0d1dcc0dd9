"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createPage = createPage;

var _gatsbyPageUtils = require("gatsby-page-utils");

var _createClientOnlyPage = require("./create-client-only-page");

var _createPagesFromCollectionBuilder = require("./create-pages-from-collection-builder");

var _path = _interopRequireDefault(require("path"));

var _gatsbyTelemetry = require("gatsby-telemetry");

function pathIsCollectionBuilder(path) {
  return path.includes("{");
}

function pathIsClientOnlyRoute(path) {
  return path.includes("[");
}

function createPage(filePath, pagesDirectory, actions, graphql, reporter, ignore, slugifyOptions) {
  // Filter out special components that shouldn't be made into
  // pages.
  if (!(0, _gatsbyPageUtils.validatePath)(filePath)) {
    return;
  } // Filter out anything matching the given ignore patterns and options


  if ((0, _gatsbyPageUtils.ignorePath)(filePath, ignore)) {
    return;
  }

  var absolutePath = _path.default.join(pagesDirectory, filePath); // If the page includes a `{}` in it, then we create it as a collection builder


  if (pathIsCollectionBuilder(absolutePath)) {
    (0, _gatsbyTelemetry.trackFeatureIsUsed)("UnifiedRoutes:collection-page-builder");
    (0, _createPagesFromCollectionBuilder.createPagesFromCollectionBuilder)(filePath, absolutePath, actions, graphql, reporter, slugifyOptions);
    return;
  } // If the path includes a `[]` in it, then we create it as a client only route


  if (pathIsClientOnlyRoute(absolutePath)) {
    (0, _gatsbyTelemetry.trackFeatureIsUsed)("UnifiedRoutes:client-page-builder");
    (0, _createClientOnlyPage.createClientOnlyPage)(filePath, absolutePath, actions);
    return;
  } // Create page object


  var createdPath = (0, _gatsbyPageUtils.createPath)(filePath);
  var page = {
    path: createdPath,
    component: absolutePath,
    context: {}
  }; // Add page

  actions.createPage(page);
}