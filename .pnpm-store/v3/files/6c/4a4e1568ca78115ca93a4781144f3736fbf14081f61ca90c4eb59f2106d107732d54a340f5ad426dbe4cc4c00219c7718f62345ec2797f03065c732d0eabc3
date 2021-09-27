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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.Placeholder = void 0;
var react_1 = __importDefault(require("react"));
var PropTypes = __importStar(require("prop-types"));
var picture_1 = require("./picture");
var Placeholder = function Placeholder(_a) {
    var fallback = _a.fallback, props = __rest(_a, ["fallback"]);
    if (fallback) {
        return (react_1["default"].createElement(picture_1.Picture, __assign({}, props, { fallback: {
                src: fallback
            }, "aria-hidden": true, alt: "" })));
    }
    else {
        return react_1["default"].createElement("div", __assign({}, props));
    }
};
exports.Placeholder = Placeholder;
exports.Placeholder.displayName = "Placeholder";
exports.Placeholder.propTypes = {
    fallback: PropTypes.string,
    sources: (_a = picture_1.Picture.propTypes) === null || _a === void 0 ? void 0 : _a.sources,
    alt: function (props, propName, componentName) {
        if (!props[propName]) {
            return null;
        }
        return new Error("Invalid prop `" + propName + "` supplied to `" + componentName + "`. Validation failed.");
    }
};
