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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.StaticImage = exports.propTypes = exports._getStaticImage = void 0;
var react_1 = __importDefault(require("react"));
var gatsby_image_server_1 = require("./gatsby-image.server");
var prop_types_1 = __importDefault(require("prop-types"));
function _getStaticImage(GatsbyImage) {
    return function StaticImage(_a) {
        var src = _a.src, imageData = _a.__imageData, __error = _a.__error, 
        // We extract these because they're not meant to be passed-down to GatsbyImage
        /* eslint-disable @typescript-eslint/no-unused-vars */
        width = _a.width, height = _a.height, aspectRatio = _a.aspectRatio, tracedSVGOptions = _a.tracedSVGOptions, placeholder = _a.placeholder, formats = _a.formats, quality = _a.quality, transformOptions = _a.transformOptions, jpgOptions = _a.jpgOptions, pngOptions = _a.pngOptions, webpOptions = _a.webpOptions, avifOptions = _a.avifOptions, blurredOptions = _a.blurredOptions, 
        /* eslint-enable @typescript-eslint/no-unused-vars */
        props = __rest(_a, ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions"]);
        if (__error) {
            console.warn(__error);
        }
        if (imageData) {
            return react_1["default"].createElement(GatsbyImage, __assign({ image: imageData }, props));
        }
        console.warn("Image not loaded", src);
        if (!__error && process.env.NODE_ENV === "development") {
            console.warn("Please ensure that \"gatsby-plugin-image\" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78");
        }
        return null;
    };
}
exports._getStaticImage = _getStaticImage;
var StaticImage = _getStaticImage(gatsby_image_server_1.GatsbyImage);
exports.StaticImage = StaticImage;
var checkDimensionProps = function (props, propName) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    if (props.layout === "fullWidth" &&
        (propName === "width" || propName === "height") &&
        props[propName]) {
        return new Error("\"" + propName + "\" " + props[propName] + " may not be passed when layout is fullWidth.");
    }
    return prop_types_1["default"].number.apply(prop_types_1["default"], __spread([props, propName], rest));
};
var validLayouts = new Set(["fixed", "fullWidth", "constrained"]);
exports.propTypes = {
    src: prop_types_1["default"].string.isRequired,
    alt: gatsby_image_server_1.altValidator,
    width: checkDimensionProps,
    height: checkDimensionProps,
    sizes: prop_types_1["default"].string,
    layout: function (props) {
        if (props.layout === undefined) {
            return undefined;
        }
        if (validLayouts.has(props.layout)) {
            return undefined;
        }
        return new Error("Invalid value " + props.layout + "\" provided for prop \"layout\". Defaulting to \"constrained\". Valid values are \"fixed\", \"fullWidth\" or \"constrained\".");
    }
};
StaticImage.displayName = "StaticImage";
StaticImage.propTypes = exports.propTypes;
