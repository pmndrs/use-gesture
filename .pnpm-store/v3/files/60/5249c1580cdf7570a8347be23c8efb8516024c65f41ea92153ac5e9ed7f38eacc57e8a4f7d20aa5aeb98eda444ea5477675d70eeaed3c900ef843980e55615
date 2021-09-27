"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.extractStaticImageProps = exports.babelParseToAst = exports.getBabelParserOptions = void 0;
var traverse_1 = __importDefault(require("@babel/traverse"));
var parser_1 = require("@babel/parser");
var babel_helpers_1 = require("../babel-helpers");
var PARSER_OPTIONS = {
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    plugins: [
        "jsx",
        "flow",
        "doExpressions",
        "objectRestSpread",
        [
            "decorators",
            {
                decoratorsBeforeExport: true
            },
        ],
        "classProperties",
        "classPrivateProperties",
        "classPrivateMethods",
        "exportDefaultFrom",
        "exportNamespaceFrom",
        "asyncGenerators",
        "functionBind",
        "functionSent",
        "dynamicImport",
        "numericSeparator",
        "optionalChaining",
        "importMeta",
        "bigInt",
        "optionalCatchBinding",
        "throwExpressions",
        [
            "pipelineOperator",
            {
                proposal: "minimal"
            },
        ],
        "nullishCoalescingOperator",
    ]
};
function getBabelParserOptions(filePath) {
    // Flow and TypeScript plugins can't be enabled simultaneously
    if (/\.tsx?/.test(filePath)) {
        var plugins = PARSER_OPTIONS.plugins;
        return __assign(__assign({}, PARSER_OPTIONS), { plugins: (plugins || []).map(function (plugin) {
                return plugin === "flow" ? "typescript" : plugin;
            }) });
    }
    return PARSER_OPTIONS;
}
exports.getBabelParserOptions = getBabelParserOptions;
function babelParseToAst(contents, filePath) {
    return parser_1.parse(contents, getBabelParserOptions(filePath));
}
exports.babelParseToAst = babelParseToAst;
/**
 * Traverses the parsed source, looking for StaticImage components.
 * Extracts and returns the props from any that are found
 */
var extractStaticImageProps = function (ast, onError) {
    var images = new Map();
    traverse_1["default"](ast, {
        JSXOpeningElement: function (nodePath) {
            // Is this a StaticImage?
            if (!nodePath
                .get("name")
                .referencesImport("gatsby-plugin-image", "StaticImage")) {
                return;
            }
            var image = babel_helpers_1.evaluateImageAttributes(
            // There's a conflict between the definition of NodePath in @babel/core and @babel/traverse
            nodePath, onError);
            images.set(babel_helpers_1.hashOptions(image), image);
        }
    });
    return images;
};
exports.extractStaticImageProps = extractStaticImageProps;
