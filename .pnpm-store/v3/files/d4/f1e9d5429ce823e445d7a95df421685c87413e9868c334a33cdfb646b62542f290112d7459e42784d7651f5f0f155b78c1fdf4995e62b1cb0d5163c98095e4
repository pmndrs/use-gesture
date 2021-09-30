"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createPagesStatefully = createPagesStatefully;
exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;
exports.onPreInit = onPreInit;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _globby = _interopRequireDefault(require("globby"));

var _path = _interopRequireDefault(require("path"));

var _fsExistsCached = require("fs-exists-cached");

var _gatsbyTelemetry = require("gatsby-telemetry");

var _graphql = require("gatsby/graphql");

var _gatsbyPageUtils = require("gatsby-page-utils");

var _createPageWrapper = require("./create-page-wrapper");

var _collectionExtractQueryString = require("./collection-extract-query-string");

var _derivePath2 = require("./derive-path");

var _validatePathQuery = require("./validate-path-query");

var _errorUtils = require("./error-utils");

var knownCollections = new Map(); // Path creator.
// Auto-create pages.
// algorithm is glob /pages directory for js/jsx/cjsx files *not*
// underscored. Then create url w/ our path algorithm *unless* user
// takes control of that page component in gatsby-node.

function createPagesStatefully(_x, _x2, _x3) {
  return _createPagesStatefully.apply(this, arguments);
}

function _createPagesStatefully() {
  _createPagesStatefully = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref, _ref2, doneCb) {
    var store, actions, reporter, graphql, pagesPath, _ref2$pathCheck, pathCheck, ignore, slugifyOptions, deletePage, _store$getState, program, exts, pagesDirectory, pagesGlob, files, knownFiles;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = _ref.store, actions = _ref.actions, reporter = _ref.reporter, graphql = _ref.graphql;
            pagesPath = _ref2.path, _ref2$pathCheck = _ref2.pathCheck, pathCheck = _ref2$pathCheck === void 0 ? true : _ref2$pathCheck, ignore = _ref2.ignore, slugifyOptions = _ref2.slugify;
            _context.prev = 2;
            deletePage = actions.deletePage;
            _store$getState = store.getState(), program = _store$getState.program;
            exts = program.extensions.map(function (e) {
              return "" + e.slice(1);
            }).join(",");

            if (!pagesPath) {
              reporter.panic({
                id: (0, _errorUtils.prefixId)(_errorUtils.CODES.RequiredPath),
                context: {
                  sourceMessage: "\"path\" is a required option for gatsby-plugin-page-creator\n\nSee docs here - https://www.gatsbyjs.org/plugins/gatsby-plugin-page-creator/"
                }
              });
            } // Validate that the path exists.


            if (pathCheck && !(0, _fsExistsCached.sync)(pagesPath)) {
              reporter.panic({
                id: (0, _errorUtils.prefixId)(_errorUtils.CODES.NonExistingPath),
                context: {
                  sourceMessage: "The path passed to gatsby-plugin-page-creator does not exist on your file system:\n\n" + pagesPath + "\n\nPlease pick a path to an existing directory."
                }
              });
            }

            pagesDirectory = _path.default.resolve(process.cwd(), pagesPath);
            pagesGlob = "**/*.{" + exts + "}"; // Get initial list of files.

            _context.next = 12;
            return (0, _globby.default)(pagesGlob, {
              cwd: pagesPath
            });

          case 12:
            files = _context.sent;
            files.forEach(function (file) {
              (0, _createPageWrapper.createPage)(file, pagesDirectory, actions, graphql, reporter, ignore, slugifyOptions);
            });
            knownFiles = new Set(files);
            (0, _gatsbyPageUtils.watchDirectory)(pagesPath, pagesGlob, function (addedPath) {
              try {
                if (!knownFiles.has(addedPath)) {
                  (0, _createPageWrapper.createPage)(addedPath, pagesDirectory, actions, graphql, reporter, ignore, slugifyOptions);
                  knownFiles.add(addedPath);
                }
              } catch (e) {
                reporter.panic({
                  id: (0, _errorUtils.prefixId)(_errorUtils.CODES.FileSystemAdd),
                  context: {
                    sourceMessage: e.message
                  }
                });
              }
            }, function (removedPath) {
              // Delete the page for the now deleted component.
              try {
                var componentPath = _path.default.join(pagesDirectory, removedPath);

                store.getState().pages.forEach(function (page) {
                  if (page.component === componentPath) {
                    deletePage({
                      path: page.path,
                      component: componentPath
                    });
                  }
                });
                knownFiles.delete(removedPath);
              } catch (e) {
                reporter.panic({
                  id: (0, _errorUtils.prefixId)(_errorUtils.CODES.FileSystemRemove),
                  context: {
                    sourceMessage: e.message
                  }
                });
              }
            }).then(function () {
              return doneCb(null, null);
            });
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](2);
            reporter.panicOnBuild({
              id: (0, _errorUtils.prefixId)(_errorUtils.CODES.Generic),
              context: {
                sourceMessage: _context.t0.message
              }
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 18]]);
  }));
  return _createPagesStatefully.apply(this, arguments);
}

function setFieldsOnGraphQLNodeType(_ref3, _ref4) {
  var getNode = _ref3.getNode,
      type = _ref3.type,
      store = _ref3.store,
      reporter = _ref3.reporter;
  var slugifyOptions = _ref4.slugify;

  try {
    var extensions = store.getState().program.extensions;

    var collectionQuery = _lodash.default.camelCase("all " + type.name);

    if (knownCollections.has(collectionQuery)) {
      return {
        gatsbyPath: {
          type: _graphql.GraphQLString,
          args: {
            filePath: {
              type: _graphql.GraphQLString
            }
          },
          resolve: function resolve(source, _ref5) {
            var filePath = _ref5.filePath;
            // This is a quick hack for attaching parents to the node.
            // This may be an incomprehensive fixed for the general use case
            // of connecting nodes together. However, I don't quite know how to
            // fully understand the use-cases. So this is a simple fix for this
            // one common-use, and we'll iterate as we understand.
            var sourceCopy = (0, _extends2.default)({}, source); // @ts-ignore

            if (typeof source.parent === "string") {
              // @ts-ignore
              sourceCopy.parent = getNode(source.parent);
            }

            (0, _validatePathQuery.validatePathQuery)(filePath, extensions);

            var _derivePath = (0, _derivePath2.derivePath)(filePath, sourceCopy, reporter, slugifyOptions),
                derivedPath = _derivePath.derivedPath;

            return (0, _gatsbyPageUtils.createPath)(derivedPath);
          }
        }
      };
    }

    return {};
  } catch (e) {
    reporter.panicOnBuild({
      id: (0, _errorUtils.prefixId)(_errorUtils.CODES.GraphQLResolver),
      context: {
        sourceMessage: e.message
      }
    });
    return {};
  }
}

function onPreInit(_x4, _x5) {
  return _onPreInit.apply(this, arguments);
}

function _onPreInit() {
  _onPreInit = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref6, _ref7) {
    var reporter, pagesPath, pagesGlob, files;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            reporter = _ref6.reporter;
            pagesPath = _ref7.path;

            if (reporter.setErrorMap) {
              reporter.setErrorMap(_errorUtils.ERROR_MAP);
            }

            _context3.prev = 3;
            pagesGlob = "**/**\\{*\\}**";
            _context3.next = 7;
            return (0, _globby.default)(pagesGlob, {
              cwd: pagesPath
            });

          case 7:
            files = _context3.sent;

            if (files.length > 0) {
              (0, _gatsbyTelemetry.trackFeatureIsUsed)("UnifiedRoutes:collection-page-builder");
            }

            _context3.next = 11;
            return Promise.all(files.map( /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(relativePath) {
                var absolutePath, queryString, ast;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        absolutePath = require.resolve(_path.default.join(pagesPath, relativePath));
                        _context2.next = 3;
                        return (0, _collectionExtractQueryString.collectionExtractQueryString)(absolutePath, reporter);

                      case 3:
                        queryString = _context2.sent;

                        if (queryString) {
                          _context2.next = 6;
                          break;
                        }

                        return _context2.abrupt("return");

                      case 6:
                        ast = (0, _graphql.parse)(queryString);
                        knownCollections.set( // @ts-ignore
                        ast.definitions[0].selectionSet.selections[0].name.value, relativePath);

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref8.apply(this, arguments);
              };
            }()));

          case 11:
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](3);
            reporter.panicOnBuild({
              id: (0, _errorUtils.prefixId)(_errorUtils.CODES.Generic),
              context: {
                sourceMessage: _context3.t0.message
              }
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 13]]);
  }));
  return _onPreInit.apply(this, arguments);
}