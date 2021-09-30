"use strict";
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../global.d.ts" />
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.LayoutWrapper = exports.getSizer = void 0;
var react_1 = __importStar(require("react"));
var terser_macro_1 = __importDefault(require("../../macros/terser.macro"));
var NativeScriptLoading = function () { return (react_1["default"].createElement("script", { type: "module", dangerouslySetInnerHTML: {
        __html: terser_macro_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nconst hasNativeLazyLoadSupport = typeof HTMLImageElement !== \"undefined\" && \"loading\" in HTMLImageElement.prototype;\nif (hasNativeLazyLoadSupport) {\n  const gatsbyImages = document.querySelectorAll('img[data-main-image]');\n  for (let mainImage of gatsbyImages) {\n    if (mainImage.dataset.src) {\n      mainImage.setAttribute('src', mainImage.dataset.src)\n      mainImage.removeAttribute('data-src')\n    }\n    if (mainImage.dataset.srcset) {\n      mainImage.setAttribute('srcset', mainImage.dataset.srcset)\n      mainImage.removeAttribute('data-srcset')\n    }\n\n    const sources = mainImage.parentNode.querySelectorAll('source[data-srcset]');\n    for (let source of sources) {\n      source.setAttribute('srcset', source.dataset.srcset)\n      source.removeAttribute('data-srcset')\n    }\n\n    if (mainImage.complete) {\n      mainImage.style.opacity = 1;\n    }\n  }\n}\n"], ["\nconst hasNativeLazyLoadSupport = typeof HTMLImageElement !== \"undefined\" && \"loading\" in HTMLImageElement.prototype;\nif (hasNativeLazyLoadSupport) {\n  const gatsbyImages = document.querySelectorAll('img[data-main-image]');\n  for (let mainImage of gatsbyImages) {\n    if (mainImage.dataset.src) {\n      mainImage.setAttribute('src', mainImage.dataset.src)\n      mainImage.removeAttribute('data-src')\n    }\n    if (mainImage.dataset.srcset) {\n      mainImage.setAttribute('srcset', mainImage.dataset.srcset)\n      mainImage.removeAttribute('data-srcset')\n    }\n\n    const sources = mainImage.parentNode.querySelectorAll('source[data-srcset]');\n    for (let source of sources) {\n      source.setAttribute('srcset', source.dataset.srcset)\n      source.removeAttribute('data-srcset')\n    }\n\n    if (mainImage.complete) {\n      mainImage.style.opacity = 1;\n    }\n  }\n}\n"])))
    } })); };
function getSizer(layout, width, height) {
    var sizer = null;
    if (layout === "fullWidth") {
        sizer = "<div aria-hidden=\"true\" style=\"padding-top: " + (height / width) * 100 + "%;\"></div>";
    }
    if (layout === "constrained") {
        sizer = "<div style=\"max-width: " + width + "px; display: block;\"><img alt=\"\" role=\"presentation\" aria-hidden=\"true\" src=\"data:image/svg+xml;charset=utf-8,%3Csvg height='" + height + "' width='" + width + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>";
    }
    return sizer;
}
exports.getSizer = getSizer;
var Sizer = function Sizer(_a) {
    var layout = _a.layout, width = _a.width, height = _a.height;
    if (layout === "fullWidth") {
        return (react_1["default"].createElement("div", { "aria-hidden": true, style: { paddingTop: (height / width) * 100 + "%" } }));
    }
    if (layout === "constrained") {
        return (react_1["default"].createElement("div", { style: { maxWidth: width, display: "block" } },
            react_1["default"].createElement("img", { alt: "", role: "presentation", "aria-hidden": "true", src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + height + "' width='" + width + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E", style: {
                    maxWidth: "100%",
                    display: "block",
                    position: "static"
                } })));
    }
    return null;
};
var LayoutWrapper = function LayoutWrapper(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement(Sizer, __assign({}, props)),
        children,
        // eslint-disable-next-line no-undef
        SERVER && react_1["default"].createElement(NativeScriptLoading, null)));
};
exports.LayoutWrapper = LayoutWrapper;
var templateObject_1;
