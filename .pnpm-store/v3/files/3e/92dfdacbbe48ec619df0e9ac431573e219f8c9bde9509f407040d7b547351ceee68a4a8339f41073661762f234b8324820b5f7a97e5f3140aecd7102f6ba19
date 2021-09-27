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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.__esModule = true;
exports.Picture = void 0;
/* eslint-disable filenames/match-regex */
var react_1 = __importStar(require("react"));
var PropTypes = __importStar(require("prop-types"));
var Image = function Image(_a) {
    var src = _a.src, srcSet = _a.srcSet, loading = _a.loading, _b = _a.alt, alt = _b === void 0 ? "" : _b, shouldLoad = _a.shouldLoad, innerRef = _a.innerRef, props = __rest(_a, ["src", "srcSet", "loading", "alt", "shouldLoad", "innerRef"]);
    return (react_1["default"].createElement("img", __assign({}, props, { decoding: "async", loading: loading, src: shouldLoad ? src : undefined, "data-src": !shouldLoad ? src : undefined, srcSet: shouldLoad ? srcSet : undefined, "data-srcset": !shouldLoad ? srcSet : undefined, alt: alt, ref: innerRef })));
};
exports.Picture = react_1.forwardRef(function Picture(_a, ref) {
    var fallback = _a.fallback, _b = _a.sources, sources = _b === void 0 ? [] : _b, _c = _a.shouldLoad, shouldLoad = _c === void 0 ? true : _c, props = __rest(_a, ["fallback", "sources", "shouldLoad"]);
    var sizes = props.sizes || (fallback === null || fallback === void 0 ? void 0 : fallback.sizes);
    var fallbackImage = (react_1["default"].createElement(Image, __assign({}, props, fallback, { sizes: sizes, shouldLoad: shouldLoad, innerRef: ref })));
    if (!sources.length) {
        return fallbackImage;
    }
    return (react_1["default"].createElement("picture", null,
        sources.map(function (_a) {
            var media = _a.media, srcSet = _a.srcSet, type = _a.type;
            return (react_1["default"].createElement("source", { key: media + "-" + type + "-" + srcSet, type: type, media: media, srcSet: shouldLoad ? srcSet : undefined, "data-srcset": !shouldLoad ? srcSet : undefined, sizes: sizes }));
        }),
        fallbackImage));
});
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sizes: PropTypes.string,
    srcSet: PropTypes.string,
    shouldLoad: PropTypes.bool
};
exports.Picture.displayName = "Picture";
exports.Picture.propTypes = {
    alt: PropTypes.string.isRequired,
    shouldLoad: PropTypes.bool,
    fallback: PropTypes.exact({
        src: PropTypes.string.isRequired,
        srcSet: PropTypes.string,
        sizes: PropTypes.string
    }),
    sources: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.exact({
            media: PropTypes.string.isRequired,
            type: PropTypes.string,
            sizes: PropTypes.string,
            srcSet: PropTypes.string.isRequired
        }),
        PropTypes.exact({
            media: PropTypes.string,
            type: PropTypes.string.isRequired,
            sizes: PropTypes.string,
            srcSet: PropTypes.string.isRequired
        }),
    ]))
};
