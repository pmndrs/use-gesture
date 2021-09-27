"use strict";

exports.__esModule = true;
exports.prefixId = prefixId;
exports.ERROR_MAP = exports.pluginPrefix = exports.CODES = void 0;

var _ERROR_MAP;

var CODES = {
  Generic: "12101",
  CollectionGraphQL: "12102",
  CollectionBuilder: "12103",
  GeneratePath: "12104",
  CollectionPath: "12105",
  GraphQLResolver: "12106",
  RequiredPath: "12107",
  NonExistingPath: "12108",
  FileSystemAdd: "12109",
  FileSystemRemove: "12110"
};
exports.CODES = CODES;
var pluginPrefix = "gatsby-plugin-page-creator";
exports.pluginPrefix = pluginPrefix;

function prefixId(id) {
  return pluginPrefix + "_" + id;
} // TODO: Refactor to use contextual data instead of only context.sourceMessage
// once reporter.setErrorMap is guaranteed to be available


var ERROR_MAP = (_ERROR_MAP = {}, _ERROR_MAP[CODES.Generic] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN"
}, _ERROR_MAP[CODES.CollectionGraphQL] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER"
}, _ERROR_MAP[CODES.CollectionBuilder] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER"
}, _ERROR_MAP[CODES.GeneratePath] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER",
  docsUrl: "https://www.gatsbyjs.com/docs/file-system-route-api/#syntax-collection-routes"
}, _ERROR_MAP[CODES.CollectionPath] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER",
  docsUrl: "https://www.gatsbyjs.com/docs/file-system-route-api/#syntax-collection-routes"
}, _ERROR_MAP[CODES.GraphQLResolver] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "SYSTEM"
}, _ERROR_MAP[CODES.RequiredPath] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER"
}, _ERROR_MAP[CODES.NonExistingPath] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "USER"
}, _ERROR_MAP[CODES.FileSystemAdd] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "SYSTEM"
}, _ERROR_MAP[CODES.FileSystemRemove] = {
  text: function text(context) {
    return "PageCreator: " + context.sourceMessage;
  },
  level: "ERROR",
  type: "PLUGIN",
  category: "SYSTEM"
}, _ERROR_MAP);
exports.ERROR_MAP = ERROR_MAP;