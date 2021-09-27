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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.__esModule = true;
exports.withArtDirection = exports.useImageLoaded = exports.getPlaceholderProps = exports.getMainProps = exports.getImageData = exports.applyPolyfill = exports.getWrapperProps = exports.getSrcSet = exports.getSrc = exports.getImage = exports.hasImageLoaded = exports.storeImageloaded = exports.gatsbyImageIsInstalled = exports.hasNativeLazyLoadSupport = void 0;
/* eslint-disable no-unused-expressions */
var react_1 = require("react");
var image_utils_1 = require("../image-utils");
var imageCache = new Set();
// Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/
var hasNativeLazyLoadSupport = function () {
    return typeof HTMLImageElement !== "undefined" &&
        "loading" in HTMLImageElement.prototype;
};
exports.hasNativeLazyLoadSupport = hasNativeLazyLoadSupport;
function gatsbyImageIsInstalled() {
    return typeof GATSBY___IMAGE !== "undefined" && GATSBY___IMAGE;
}
exports.gatsbyImageIsInstalled = gatsbyImageIsInstalled;
function storeImageloaded(cacheKey) {
    if (cacheKey) {
        imageCache.add(cacheKey);
    }
}
exports.storeImageloaded = storeImageloaded;
function hasImageLoaded(cacheKey) {
    return imageCache.has(cacheKey);
}
exports.hasImageLoaded = hasImageLoaded;
var isGatsbyImageData = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
node) { var _a, _b; 
// 🦆 check for a deep prop to be sure this is a valid gatsbyImageData object
return Boolean((_b = (_a = node === null || node === void 0 ? void 0 : node.images) === null || _a === void 0 ? void 0 : _a.fallback) === null || _b === void 0 ? void 0 : _b.src); };
var isGatsbyImageDataParent = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
node) { return Boolean(node === null || node === void 0 ? void 0 : node.gatsbyImageData); };
var getImage = function (node) {
    var _a;
    if (isGatsbyImageData(node)) {
        return node;
    }
    if (isGatsbyImageDataParent(node)) {
        return node.gatsbyImageData;
    }
    return (_a = node === null || node === void 0 ? void 0 : node.childImageSharp) === null || _a === void 0 ? void 0 : _a.gatsbyImageData;
};
exports.getImage = getImage;
var getSrc = function (node) { var _a, _b, _c; return (_c = (_b = (_a = exports.getImage(node)) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.fallback) === null || _c === void 0 ? void 0 : _c.src; };
exports.getSrc = getSrc;
var getSrcSet = function (node) { var _a, _b, _c; return (_c = (_b = (_a = exports.getImage(node)) === null || _a === void 0 ? void 0 : _a.images) === null || _b === void 0 ? void 0 : _b.fallback) === null || _c === void 0 ? void 0 : _c.srcSet; };
exports.getSrcSet = getSrcSet;
function getWrapperProps(width, height, layout) {
    var wrapperStyle = {};
    var className = "gatsby-image-wrapper";
    // If the plugin isn't installed we need to apply the styles inline
    if (!gatsbyImageIsInstalled()) {
        wrapperStyle.position = "relative";
        wrapperStyle.overflow = "hidden";
    }
    if (layout === "fixed") {
        wrapperStyle.width = width;
        wrapperStyle.height = height;
    }
    else if (layout === "constrained") {
        if (!gatsbyImageIsInstalled()) {
            wrapperStyle.display = "inline-block";
            wrapperStyle.verticalAlign = "top";
        }
        className = "gatsby-image-wrapper gatsby-image-wrapper-constrained";
    }
    return {
        className: className,
        "data-gatsby-image-wrapper": "",
        style: wrapperStyle
    };
}
exports.getWrapperProps = getWrapperProps;
function applyPolyfill(ref) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!("objectFitPolyfill" in window)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(
                        /* webpackChunkName: "gatsby-plugin-image-objectfit-polyfill" */ "objectFitPolyfill")); })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    ;
                    window.objectFitPolyfill(ref.current);
                    return [2 /*return*/];
            }
        });
    });
}
exports.applyPolyfill = applyPolyfill;
/**
 * Use this hook to generate gatsby-plugin-image data in the browser.
 */
function getImageData(_a) {
    var baseUrl = _a.baseUrl, urlBuilder = _a.urlBuilder, sourceWidth = _a.sourceWidth, sourceHeight = _a.sourceHeight, _b = _a.pluginName, pluginName = _b === void 0 ? "getImageData" : _b, _c = _a.formats, formats = _c === void 0 ? ["auto"] : _c, breakpoints = _a.breakpoints, options = _a.options, props = __rest(_a, ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"]);
    if (!(breakpoints === null || breakpoints === void 0 ? void 0 : breakpoints.length) &&
        (props.layout === "fullWidth" || props.layout === "FULL_WIDTH")) {
        breakpoints = image_utils_1.EVERY_BREAKPOINT;
    }
    var generateImageSource = function (baseUrl, width, height, format) {
        return {
            width: width,
            height: height,
            format: format,
            src: urlBuilder({ baseUrl: baseUrl, width: width, height: height, options: options, format: format })
        };
    };
    var sourceMetadata = {
        width: sourceWidth,
        height: sourceHeight,
        format: "auto"
    };
    var args = __assign(__assign({}, props), { pluginName: pluginName,
        generateImageSource: generateImageSource, filename: baseUrl, formats: formats,
        breakpoints: breakpoints,
        sourceMetadata: sourceMetadata });
    return image_utils_1.generateImageData(args);
}
exports.getImageData = getImageData;
function getMainProps(isLoading, isLoaded, images, loading, toggleLoaded, cacheKey, ref, style) {
    var _a, _b;
    if (style === void 0) { style = {}; }
    var onLoad = function (e) {
        if (isLoaded) {
            return;
        }
        storeImageloaded(cacheKey);
        var target = e.currentTarget;
        var img = new Image();
        img.src = target.currentSrc;
        if (img.decode) {
            // Decode the image through javascript to support our transition
            img
                .decode()["catch"](function () {
                // ignore error, we just go forward
            })
                .then(function () {
                toggleLoaded(true);
            });
        }
        else {
            toggleLoaded(true);
        }
    };
    // Polyfill "object-fit" if unsupported (mostly IE)
    if ((ref === null || ref === void 0 ? void 0 : ref.current) && !("objectFit" in document.documentElement.style)) {
        ref.current.dataset.objectFit = (_a = style.objectFit) !== null && _a !== void 0 ? _a : "cover";
        ref.current.dataset.objectPosition = "" + ((_b = style.objectPosition) !== null && _b !== void 0 ? _b : "50% 50%");
        applyPolyfill(ref);
    }
    // fallback when it's not configured in gatsby-config.
    if (!gatsbyImageIsInstalled()) {
        style = __assign({ height: "100%", left: 0, position: "absolute", top: 0, transform: "translateZ(0)", transition: "opacity 250ms linear", width: "100%", willChange: "opacity" }, style);
    }
    var result = __assign(__assign({}, images), { loading: loading, shouldLoad: isLoading, "data-main-image": "", style: __assign(__assign({}, style), { opacity: isLoaded ? 1 : 0 }), onLoad: onLoad,
        ref: ref });
    return result;
}
exports.getMainProps = getMainProps;
function getPlaceholderProps(placeholder, isLoaded, layout, width, height, backgroundColor, objectFit, objectPosition) {
    var wrapperStyle = {};
    if (backgroundColor) {
        wrapperStyle.backgroundColor = backgroundColor;
        if (layout === "fixed") {
            wrapperStyle.width = width;
            wrapperStyle.height = height;
            wrapperStyle.backgroundColor = backgroundColor;
            wrapperStyle.position = "relative";
        }
        else if (layout === "constrained") {
            wrapperStyle.position = "absolute";
            wrapperStyle.top = 0;
            wrapperStyle.left = 0;
            wrapperStyle.bottom = 0;
            wrapperStyle.right = 0;
        }
        else if (layout === "fullWidth") {
            wrapperStyle.position = "absolute";
            wrapperStyle.top = 0;
            wrapperStyle.left = 0;
            wrapperStyle.bottom = 0;
            wrapperStyle.right = 0;
        }
    }
    if (objectFit) {
        wrapperStyle.objectFit = objectFit;
    }
    if (objectPosition) {
        wrapperStyle.objectPosition = objectPosition;
    }
    var result = __assign(__assign({}, placeholder), { "aria-hidden": true, "data-placeholder-image": "", style: __assign({ opacity: isLoaded ? 0 : 1, transition: "opacity 500ms linear" }, wrapperStyle) });
    // fallback when it's not configured in gatsby-config.
    if (!gatsbyImageIsInstalled()) {
        result.style = {
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%"
        };
    }
    return result;
}
exports.getPlaceholderProps = getPlaceholderProps;
function useImageLoaded(cacheKey, loading, ref) {
    var _a = __read(react_1.useState(false), 2), isLoaded = _a[0], toggleLoaded = _a[1];
    var _b = __read(react_1.useState(loading === "eager"), 2), isLoading = _b[0], toggleIsLoading = _b[1];
    var rAF = typeof window !== "undefined" && "requestAnimationFrame" in window
        ? requestAnimationFrame
        : function (cb) {
            return setTimeout(cb, 16);
        };
    var cRAF = typeof window !== "undefined" && "cancelAnimationFrame" in window
        ? cancelAnimationFrame
        : clearTimeout;
    react_1.useEffect(function () {
        var interval;
        // @see https://stackoverflow.com/questions/44074747/componentdidmount-called-before-ref-callback/50019873#50019873
        function toggleIfRefExists() {
            if (ref.current) {
                if (loading === "eager" && ref.current.complete) {
                    storeImageloaded(cacheKey);
                    toggleLoaded(true);
                }
                else {
                    toggleIsLoading(true);
                }
            }
            else {
                interval = rAF(toggleIfRefExists);
            }
        }
        toggleIfRefExists();
        return function () {
            cRAF(interval);
        };
    }, []);
    return {
        isLoading: isLoading,
        isLoaded: isLoaded,
        toggleLoaded: toggleLoaded
    };
}
exports.useImageLoaded = useImageLoaded;
/**
 * Generate a Gatsby image data object with multiple, art-directed images that display at different
 * resolutions.
 *
 * @param defaultImage The image displayed when no media query matches.
 * It is also used for all other settings applied to the image, such as width, height and layout.
 * You should pass a className to the component with media queries to adjust the size of the container,
 * as this cannot be adjusted automatically.
 * @param artDirected Array of objects which each contains a `media` string which is a media query
 * such as `(min-width: 320px)`, and the image object to use when that query matches.
 */
function withArtDirection(defaultImage, artDirected) {
    var _a, _b;
    var _c;
    var images = defaultImage.images, placeholder = defaultImage.placeholder, props = __rest(defaultImage, ["images", "placeholder"]);
    var output = __assign(__assign({}, props), { images: __assign(__assign({}, images), { sources: [] }), placeholder: placeholder && __assign(__assign({}, placeholder), { sources: [] }) });
    artDirected.forEach(function (_a) {
        var _b;
        var media = _a.media, image = _a.image;
        if (!media) {
            if (process.env.NODE_ENV === "development") {
                console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
            }
            return;
        }
        if (image.layout !== defaultImage.layout &&
            process.env.NODE_ENV === "development") {
            console.warn("[gatsby-plugin-image] Mismatched image layout: expected \"" + defaultImage.layout + "\" but received \"" + image.layout + "\". All art-directed images use the same layout as the default image");
        }
        (_b = output.images.sources).push.apply(_b, __spread(image.images.sources.map(function (source) {
            return __assign(__assign({}, source), { media: media });
        }), [{
                media: media,
                srcSet: image.images.fallback.srcSet
            }]));
        if (!output.placeholder) {
            return;
        }
        output.placeholder.sources.push({
            media: media,
            srcSet: image.placeholder.fallback
        });
    });
    (_a = output.images.sources).push.apply(_a, __spread(images.sources));
    if (placeholder === null || placeholder === void 0 ? void 0 : placeholder.sources) {
        (_c = output.placeholder) === null || _c === void 0 ? void 0 : (_b = _c.sources).push.apply(_b, __spread(placeholder.sources));
    }
    return output;
}
exports.withArtDirection = withArtDirection;
