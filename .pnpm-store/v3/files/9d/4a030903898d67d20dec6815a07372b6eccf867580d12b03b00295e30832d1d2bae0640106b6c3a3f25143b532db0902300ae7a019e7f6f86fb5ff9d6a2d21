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
exports.hashOptions = exports.evaluateImageAttributes = exports.normalizeProps = exports.SHARP_ATTRIBUTES = void 0;
var murmur_1 = require("babel-plugin-remove-graphql-queries/murmur");
var babel_jsx_utils_1 = require("babel-jsx-utils");
var camelcase_1 = __importDefault(require("camelcase"));
exports.SHARP_ATTRIBUTES = new Set([
    "src",
    "layout",
    "formats",
    "aspectRatio",
    "quality",
    "avifOptions",
    "jpgOptions",
    "pngOptions",
    "webpOptions",
    "blurredOptions",
    "transformOptions",
    "width",
    "height",
    "placeholder",
    "tracedSVGOptions",
    "sizes",
    "backgroundColor",
    "breakpoints",
]);
function normalizeProps(props) {
    var out = __assign({}, props);
    if (out.layout) {
        out.layout = camelcase_1["default"](out.layout);
    }
    if (out.placeholder) {
        out.placeholder = camelcase_1["default"](out.placeholder);
        if (out.placeholder === "tracedSvg") {
            out.placeholder = "tracedSVG";
        }
    }
    if (Array.isArray(out.formats)) {
        out.formats = out.formats.map(function (format) { return format.toLowerCase(); });
    }
    return out;
}
exports.normalizeProps = normalizeProps;
function evaluateImageAttributes(nodePath, onError) {
    // Only get attributes that we need for generating the images
    return normalizeProps(babel_jsx_utils_1.getAttributeValues(nodePath, onError, exports.SHARP_ATTRIBUTES));
}
exports.evaluateImageAttributes = evaluateImageAttributes;
function hashOptions(options) {
    return "" + murmur_1.murmurhash(JSON.stringify(options));
}
exports.hashOptions = hashOptions;
