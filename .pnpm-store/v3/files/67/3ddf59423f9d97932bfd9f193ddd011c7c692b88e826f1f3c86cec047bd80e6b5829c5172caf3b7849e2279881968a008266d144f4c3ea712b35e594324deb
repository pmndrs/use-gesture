"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.filterQuery = filterQuery;
exports.defaultOptions = exports.renameFile = exports.writeFile = exports.withoutTrailingSlash = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _fs = _interopRequireDefault(require("fs"));

var _pify = _interopRequireDefault(require("pify"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var withoutTrailingSlash = function withoutTrailingSlash(path) {
  return path === "/" ? path : path.replace(/\/$/, "");
};

exports.withoutTrailingSlash = withoutTrailingSlash;
var writeFile = (0, _pify.default)(_fs.default.writeFile);
exports.writeFile = writeFile;
var renameFile = (0, _pify.default)(_fs.default.rename);
exports.renameFile = renameFile;

function filterQuery(results, excludes, pathPrefix, resolveSiteUrl) {
  var _allSitePage;

  if (resolveSiteUrl === void 0) {
    resolveSiteUrl = defaultOptions.resolveSiteUrl;
  }

  var errors = results.errors,
      data = results.data;

  if (errors) {
    throw new Error(errors.join(", "));
  }

  var allSitePage = data.allSitePage,
      otherData = (0, _objectWithoutPropertiesLoose2.default)(data, ["allSitePage"]);

  var _getNodes = getNodes(allSitePage),
      allPages = _getNodes.allPages,
      originalType = _getNodes.originalType; // Removing excluded paths


  allPages = allPages.filter(function (page) {
    return !excludes.some(function (excludedRoute) {
      return (0, _minimatch.default)(withoutTrailingSlash(page.path), withoutTrailingSlash(excludedRoute));
    });
  }); // Add path prefix

  allPages = allPages.map(function (page) {
    page.path = (pathPrefix + page.path).replace(/^\/\//g, "/");
    return page;
  }); // siteUrl Validation

  var siteUrl = resolveSiteUrl(data);

  if (!siteUrl || siteUrl.trim().length == 0) {
    throw new Error("SiteMetaData 'siteUrl' property is required and cannot be left empty. Check out the documentation to see a working example: https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#how-to-use");
  } // remove trailing slash of siteUrl


  siteUrl = withoutTrailingSlash(siteUrl);
  return (0, _extends2.default)({}, otherData, {
    allSitePage: (_allSitePage = {}, _allSitePage[originalType] = originalType === "nodes" ? allPages : allPages.map(function (page) {
      return {
        node: page
      };
    }), _allSitePage),
    site: {
      siteMetadata: {
        siteUrl: siteUrl
      }
    }
  });
}

var defaultOptions = {
  query: "\n    {\n      site {\n        siteMetadata {\n          siteUrl\n        }\n      }\n\n      allSitePage {\n        edges {\n          node {\n            path\n          }\n        }\n      }\n  }",
  output: "/sitemap.xml",
  exclude: ["/dev-404-page", "/404", "/404.html", "/offline-plugin-app-shell-fallback"],
  createLinkInHead: true,
  serialize: function serialize(_ref) {
    var site = _ref.site,
        allSitePage = _ref.allSitePage;

    var _getNodes2 = getNodes(allSitePage),
        allPages = _getNodes2.allPages;

    return allPages === null || allPages === void 0 ? void 0 : allPages.map(function (page) {
      var _site$siteMetadata$si, _site$siteMetadata;

      return {
        url: "" + ((_site$siteMetadata$si = (_site$siteMetadata = site.siteMetadata) === null || _site$siteMetadata === void 0 ? void 0 : _site$siteMetadata.siteUrl) !== null && _site$siteMetadata$si !== void 0 ? _site$siteMetadata$si : "") + page.path,
        changefreq: "daily",
        priority: 0.7
      };
    });
  },
  resolveSiteUrl: function resolveSiteUrl(data) {
    return data.site.siteMetadata.siteUrl;
  }
};
exports.defaultOptions = defaultOptions;

function getNodes(results) {
  if ("nodes" in results) {
    return {
      allPages: results.nodes,
      originalType: "nodes"
    };
  }

  if ("edges" in results) {
    var _results$edges;

    return {
      allPages: results === null || results === void 0 ? void 0 : (_results$edges = results.edges) === null || _results$edges === void 0 ? void 0 : _results$edges.map(function (edge) {
        return edge.node;
      }),
      originalType: "edges"
    };
  }

  throw new Error("[gatsby-plugin-sitemap]: Plugin is unsure how to handle the results of your query, you'll need to write custom page filter and serializer in your gatsby config");
}