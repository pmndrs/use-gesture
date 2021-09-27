"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createPagesFromCollectionBuilder = createPagesFromCollectionBuilder;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _gatsbyPageUtils = require("gatsby-page-utils");

var _extractQuery = require("./extract-query");

var _gatsbyCoreUtils = require("gatsby-core-utils");

var _getCollectionRouteParams = require("./get-collection-route-params");

var _derivePath2 = require("./derive-path");

var _watchCollectionBuilder = require("./watch-collection-builder");

var _collectionExtractQueryString = require("./collection-extract-query-string");

var _isValidCollectionPathImplementation = require("./is-valid-collection-path-implementation");

var _errorUtils = require("./error-utils");

// Move this to gatsby-core-utils?
function createPagesFromCollectionBuilder(_x, _x2, _x3, _x4, _x5, _x6) {
  return _createPagesFromCollectionBuilder.apply(this, arguments);
}

function _createPagesFromCollectionBuilder() {
  _createPagesFromCollectionBuilder = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(filePath, absolutePath, actions, graphql, reporter, slugifyOptions) {
    var queryString, _yield$graphql, data, errors, nodes, derivePathErrors, knownPagePaths, paths;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!((0, _isValidCollectionPathImplementation.isValidCollectionPathImplementation)(absolutePath, reporter) === false)) {
              _context.next = 3;
              break;
            }

            (0, _watchCollectionBuilder.watchCollectionBuilder)(absolutePath, "", [], actions, reporter, function () {
              return createPagesFromCollectionBuilder(filePath, absolutePath, actions, graphql, reporter, slugifyOptions);
            });
            return _context.abrupt("return");

          case 3:
            // 1. Query for the data for the collection to generate pages
            queryString = (0, _collectionExtractQueryString.collectionExtractQueryString)(absolutePath, reporter); // 1.a  If the query string is not findable, we can't move on. So we stop and watch

            if (!(queryString === null)) {
              _context.next = 7;
              break;
            }

            (0, _watchCollectionBuilder.watchCollectionBuilder)(absolutePath, "", [], actions, reporter, function () {
              return createPagesFromCollectionBuilder(filePath, absolutePath, actions, graphql, reporter, slugifyOptions);
            });
            return _context.abrupt("return");

          case 7:
            _context.next = 9;
            return graphql(queryString);

          case 9:
            _yield$graphql = _context.sent;
            data = _yield$graphql.data;
            errors = _yield$graphql.errors;

            if (!(!data || errors)) {
              _context.next = 16;
              break;
            }

            reporter.error({
              id: (0, _errorUtils.prefixId)(_errorUtils.CODES.CollectionBuilder),
              context: {
                sourceMessage: ("Tried to create pages from the collection builder.\nUnfortunately, the query came back empty. There may be an error in your query:\n\n" + errors.map(function (error) {
                  return error.message;
                }).join("\n")).trim()
              },
              filePath: absolutePath
            });
            (0, _watchCollectionBuilder.watchCollectionBuilder)(absolutePath, queryString, [], actions, reporter, function () {
              return createPagesFromCollectionBuilder(filePath, absolutePath, actions, graphql, reporter, slugifyOptions);
            });
            return _context.abrupt("return");

          case 16:
            // 2. Get the nodes out of the data. We very much expect data to come back in a known shape:
            //    data = { [key: string]: { nodes: Array<ACTUAL_DATA> } }
            nodes = Object.values(Object.values(data)[0])[0];

            if (nodes) {
              reporter.verbose("   PageCreator: Creating " + nodes.length + " page" + (nodes.length > 1 ? "s" : "") + " from " + filePath);
            }

            derivePathErrors = 0;
            knownPagePaths = new Set(); // 3. Loop through each node and create the page, also save the path it creates to pass to the watcher
            //    the watcher will use this data to delete the pages if the query changes significantly.

            paths = [];
            nodes.forEach(function (node) {
              // URL path for the component and node
              var _derivePath = (0, _derivePath2.derivePath)(filePath, node, reporter, slugifyOptions),
                  derivedPath = _derivePath.derivedPath,
                  errors = _derivePath.errors;

              var path = (0, _gatsbyPageUtils.createPath)(derivedPath); // We've already created a page with this path

              if (knownPagePaths.has(path)) {
                return;
              }

              knownPagePaths.add(path); // Params is supplied to the FE component on props.params

              var params = (0, _getCollectionRouteParams.getCollectionRouteParams)((0, _gatsbyPageUtils.createPath)(filePath), path); // nodeParams is fed to the graphql query for the component

              var nodeParams = (0, _extractQuery.reverseLookupParams)(node, absolutePath); // matchPath is an optional value. It's used if someone does a path like `{foo}/[bar].js`

              var matchPath = (0, _gatsbyCoreUtils.getMatchPath)(path);
              actions.createPage({
                path: path,
                matchPath: matchPath,
                component: absolutePath,
                context: (0, _extends2.default)({}, nodeParams, {
                  __params: params
                })
              });
              derivePathErrors += errors;
              paths.push(path);
            });

            if (derivePathErrors > 0) {
              reporter.panicOnBuild({
                id: (0, _errorUtils.prefixId)(_errorUtils.CODES.GeneratePath),
                context: {
                  sourceMessage: "Could not find a value in the node for " + filePath + ". Please make sure that the syntax is correct and supported."
                }
              });
            }

            (0, _watchCollectionBuilder.watchCollectionBuilder)(absolutePath, queryString, paths, actions, reporter, function () {
              return createPagesFromCollectionBuilder(filePath, absolutePath, actions, graphql, reporter, slugifyOptions);
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createPagesFromCollectionBuilder.apply(this, arguments);
}