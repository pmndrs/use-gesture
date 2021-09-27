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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.lazyHydrate = void 0;
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var layout_wrapper_1 = require("./layout-wrapper");
var placeholder_1 = require("./placeholder");
var main_image_1 = require("./main-image");
var hooks_1 = require("./hooks");
function lazyHydrate(_a, root, hydrated, forceHydrate) {
    var image = _a.image, loading = _a.loading, isLoading = _a.isLoading, isLoaded = _a.isLoaded, toggleIsLoaded = _a.toggleIsLoaded, ref = _a.ref, imgClassName = _a.imgClassName, _b = _a.imgStyle, imgStyle = _b === void 0 ? {} : _b, objectPosition = _a.objectPosition, backgroundColor = _a.backgroundColor, _c = _a.objectFit, objectFit = _c === void 0 ? "cover" : _c, props = __rest(_a, ["image", "loading", "isLoading", "isLoaded", "toggleIsLoaded", "ref", "imgClassName", "imgStyle", "objectPosition", "backgroundColor", "objectFit"]);
    var width = image.width, height = image.height, layout = image.layout, images = image.images, placeholder = image.placeholder, wrapperBackgroundColor = image.backgroundColor;
    var cacheKey = JSON.stringify(images);
    imgStyle = __assign({ objectFit: objectFit,
        objectPosition: objectPosition,
        backgroundColor: backgroundColor }, imgStyle);
    var component = (react_1["default"].createElement(layout_wrapper_1.LayoutWrapper, { layout: layout, width: width, height: height },
        react_1["default"].createElement(placeholder_1.Placeholder, __assign({}, hooks_1.getPlaceholderProps(placeholder, isLoaded, layout, width, height, wrapperBackgroundColor, objectFit, objectPosition))),
        react_1["default"].createElement(main_image_1.MainImage, __assign({}, props, { width: width, height: height, className: imgClassName }, hooks_1.getMainProps(isLoading, isLoaded, images, loading, toggleIsLoaded, cacheKey, ref, imgStyle)))));
    if (root.current) {
        // Force render to mitigate "Expected server HTML to contain a matching" in develop
        var doRender = hydrated.current || forceHydrate.current ? react_dom_1.render : react_dom_1.hydrate;
        doRender(component, root.current);
        hydrated.current = true;
    }
    return function () {
        if (root.current) {
            react_dom_1.render(null, root.current);
        }
    };
}
exports.lazyHydrate = lazyHydrate;
