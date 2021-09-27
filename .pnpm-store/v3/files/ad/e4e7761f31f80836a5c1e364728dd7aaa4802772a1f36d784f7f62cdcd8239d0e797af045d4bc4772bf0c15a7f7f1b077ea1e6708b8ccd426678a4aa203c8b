"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _sitemap = _interopRequireDefault(require("sitemap"));

var _internals = require("./internals");

var _commonTags = require("common-tags");

var _graphql = require("gatsby/graphql");

var _templateObject, _templateObject2;

var publicPath = "./public";

exports.onPostBuild = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref, pluginOptions) {
    var graphql, pathPrefix, _ref$basePath, basePath, options, _defaultOptions$optio, query, serialize, output, exclude, hostname, resolveSiteUrl, rest, saved, excludeOptions, queryRecords, filteredRecords, urls, map, siteUrl;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            graphql = _ref.graphql, pathPrefix = _ref.pathPrefix, _ref$basePath = _ref.basePath, basePath = _ref$basePath === void 0 ? pathPrefix : _ref$basePath;
            options = (0, _extends2.default)({}, pluginOptions);
            delete options.plugins;
            delete options.createLinkInHead;
            _defaultOptions$optio = (0, _extends2.default)({}, _internals.defaultOptions, options), query = _defaultOptions$optio.query, serialize = _defaultOptions$optio.serialize, output = _defaultOptions$optio.output, exclude = _defaultOptions$optio.exclude, hostname = _defaultOptions$optio.hostname, resolveSiteUrl = _defaultOptions$optio.resolveSiteUrl, rest = (0, _objectWithoutPropertiesLoose2.default)(_defaultOptions$optio, ["query", "serialize", "output", "exclude", "hostname", "resolveSiteUrl"]);
            saved = _path.default.join(publicPath, output); // Paths we're excluding...

            excludeOptions = exclude.concat(_internals.defaultOptions.exclude);
            _context.next = 9;
            return graphql(query);

          case 9:
            queryRecords = _context.sent;
            filteredRecords = (0, _internals.filterQuery)(queryRecords, excludeOptions, basePath, resolveSiteUrl);
            _context.next = 13;
            return serialize(filteredRecords);

          case 13:
            urls = _context.sent;

            if (!(!rest.sitemapSize || urls.length <= rest.sitemapSize)) {
              _context.next = 18;
              break;
            }

            map = _sitemap.default.createSitemap(rest);
            urls.forEach(function (u) {
              return map.add(u);
            });
            return _context.abrupt("return", (0, _internals.writeFile)(saved, map.toString()));

          case 18:
            siteUrl = filteredRecords.site.siteMetadata.siteUrl;
            return _context.abrupt("return", new Promise(function (resolve) {
              // sitemap-index.xml is default file name. (https://git.io/fhNgG)
              var indexFilePath = _path.default.join(publicPath, (rest.sitemapName || "sitemap") + "-index.xml");

              var sitemapIndexOptions = (0, _extends2.default)({}, rest, {
                hostname: (hostname || (0, _internals.withoutTrailingSlash)(siteUrl)) + (0, _internals.withoutTrailingSlash)(pathPrefix || ""),
                targetFolder: publicPath,
                urls: urls,
                callback: function callback(error) {
                  if (error) throw new Error(error);
                  (0, _internals.renameFile)(indexFilePath, saved).then(resolve);
                }
              });

              _sitemap.default.createSitemapIndex(sitemapIndexOptions);
            }));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.pluginOptionsSchema = function (_ref3) {
  var Joi = _ref3.Joi;
  return Joi.object().keys({
    output: Joi.string().default("/sitemap.xml").description("The filepath and name"),
    exclude: Joi.array().items(Joi.string()).description("An array of paths to exclude from the sitemap"),
    createLinkInHead: Joi.boolean().default(true).description("Whether to populate the `<head>` of your site with a link to the sitemap."),
    serialize: Joi.function().description("Takes the output of the data query and lets you return an array of sitemap entries."),
    resolveSiteUrl: Joi.function().description("Takes the output of the data query and lets you return the site URL."),
    query: Joi.string().description((0, _commonTags.stripIndent)(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["\n      The query for the data you need to generate the sitemap. It\u2019s required to get the site\u2019s URL, \n      if you are not fetching it from site.siteMetadata.siteUrl, you will need to set a custom resolveSiteUrl function. \n      If you override the query, you probably will also need to set a serializer to return the correct data for the sitemap. \n      Due to how this plugin was built it is currently expected/required to fetch the page paths from allSitePage, \n      but you may use the allSitePage.edges.node or allSitePage.nodes query structure."])))),
    sitemapSize: Joi.number().description("The number of entries per sitemap file.")
  }).external(function (_ref4) {
    var query = _ref4.query;

    if (query) {
      try {
        (0, _graphql.parse)(query);
      } catch (e) {
        throw new Error((0, _commonTags.stripIndent)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["\n            Invalid plugin options for \"gatsby-plugin-sitemap\":\n            \"query\" must be a valid GraphQL query. Received the error \"", "\""])), e.message));
      }
    }
  });
};