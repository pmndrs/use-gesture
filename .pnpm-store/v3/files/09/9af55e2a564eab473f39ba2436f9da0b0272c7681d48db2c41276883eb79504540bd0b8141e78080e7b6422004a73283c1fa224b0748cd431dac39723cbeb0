"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GatsbyImage = void 0;
/* eslint-disable no-unused-expressions */
var react_1 = __importStar(require("react"));
var hooks_1 = require("./hooks");
var layout_wrapper_1 = require("./layout-wrapper");
var gatsby_image_server_1 = require("./gatsby-image.server");
var react_dom_1 = require("react-dom");
var GatsbyImageHydrator = /** @class */ (function (_super) {
    __extends(GatsbyImageHydrator, _super);
    function GatsbyImageHydrator(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.root = react_1.createRef();
        _this_1.hydrated = { current: false };
        _this_1.forceRender = {
            // In dev we use render not hydrate, to avoid hydration warnings
            current: process.env.NODE_ENV === "development"
        };
        _this_1.lazyHydrator = null;
        _this_1.ref = react_1.createRef();
        _this_1.state = {
            isLoading: hooks_1.hasNativeLazyLoadSupport(),
            isLoaded: false
        };
        return _this_1;
    }
    GatsbyImageHydrator.prototype._lazyHydrate = function (props, state) {
        var _this_1 = this;
        var hasSSRHtml = this.root.current.querySelector("[data-gatsby-image-ssr]");
        // On first server hydration do nothing
        if (hooks_1.hasNativeLazyLoadSupport() && hasSSRHtml && !this.hydrated.current) {
            this.hydrated.current = true;
            return Promise.resolve();
        }
        return Promise.resolve().then(function () { return __importStar(require("./lazy-hydrate")); }).then(function (_a) {
            var lazyHydrate = _a.lazyHydrate;
            _this_1.lazyHydrator = lazyHydrate(__assign({ image: props.image.images, isLoading: state.isLoading, isLoaded: state.isLoaded, toggleIsLoaded: function () {
                    var _a;
                    (_a = props.onLoad) === null || _a === void 0 ? void 0 : _a.call(props);
                    _this_1.setState({
                        isLoaded: true
                    });
                }, ref: _this_1.ref }, props), _this_1.root, _this_1.hydrated, _this_1.forceRender);
        });
    };
    /**
     * Choose if setupIntersectionObserver should use the image cache or not.
     */
    GatsbyImageHydrator.prototype._setupIntersectionObserver = function (useCache) {
        var _this_1 = this;
        if (useCache === void 0) { useCache = true; }
        Promise.resolve().then(function () { return __importStar(require("./intersection-observer")); }).then(function (_a) {
            var createIntersectionObserver = _a.createIntersectionObserver;
            var intersectionObserver = createIntersectionObserver(function () {
                var _a, _b;
                if (_this_1.root.current) {
                    var cacheKey = JSON.stringify(_this_1.props.image.images);
                    (_b = (_a = _this_1.props).onStartLoad) === null || _b === void 0 ? void 0 : _b.call(_a, {
                        wasCached: useCache && hooks_1.hasImageLoaded(cacheKey)
                    });
                    _this_1.setState({
                        isLoading: true,
                        isLoaded: useCache && hooks_1.hasImageLoaded(cacheKey)
                    });
                }
            });
            if (_this_1.root.current) {
                _this_1.unobserveRef = intersectionObserver(_this_1.root);
            }
        });
    };
    GatsbyImageHydrator.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _this_1 = this;
        var hasChanged = false;
        if (!this.state.isLoading && nextState.isLoading && !nextState.isLoaded) {
            // Props have changed between SSR and hydration, so we need to force render instead of hydrate
            this.forceRender.current = true;
        }
        // this check mostly means people do not have the correct ref checks in place, we want to reset some state to suppport loading effects
        if (this.props.image.images !== nextProps.image.images) {
            // reset state, we'll rely on intersection observer to reload
            if (this.unobserveRef) {
                // unregister intersectionObserver
                this.unobserveRef();
                // // on unmount, make sure we cleanup
                if (this.hydrated.current && this.lazyHydrator) {
                    react_dom_1.render(null, this.root.current);
                }
            }
            this.setState({
                isLoading: false,
                isLoaded: false
            }, function () {
                _this_1._setupIntersectionObserver(false);
            });
            hasChanged = true;
        }
        if (this.root.current && !hasChanged) {
            this._lazyHydrate(nextProps, nextState);
        }
        return false;
    };
    GatsbyImageHydrator.prototype.componentDidMount = function () {
        var _a, _b, _c, _d;
        if (this.root.current) {
            var ssrElement_1 = this.root.current.querySelector("[data-gatsby-image-ssr]");
            var cacheKey_1 = JSON.stringify(this.props.image.images);
            // when SSR and native lazyload is supported we'll do nothing ;)
            if (hooks_1.hasNativeLazyLoadSupport() &&
                ssrElement_1 &&
                hooks_1.gatsbyImageIsInstalled()) {
                (_b = (_a = this.props).onStartLoad) === null || _b === void 0 ? void 0 : _b.call(_a, { wasCached: false });
                // When the image is already loaded before we have hydrated, we trigger onLoad and cache the item
                if (ssrElement_1.complete) {
                    (_d = (_c = this.props).onLoad) === null || _d === void 0 ? void 0 : _d.call(_c);
                    hooks_1.storeImageloaded(cacheKey_1);
                }
                else {
                    // We need the current class context (this) inside our named onLoad function
                    // The named function is necessary to easily remove the listener afterward.
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    var _this_2 = this;
                    // add an onLoad to the image
                    ssrElement_1.addEventListener("load", function onLoad() {
                        var _a, _b;
                        ssrElement_1.removeEventListener("load", onLoad);
                        (_b = (_a = _this_2.props).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a);
                        hooks_1.storeImageloaded(cacheKey_1);
                    });
                }
                return;
            }
            // Fallback to custom lazy loading (intersection observer)
            this._setupIntersectionObserver(true);
        }
    };
    GatsbyImageHydrator.prototype.componentWillUnmount = function () {
        // Cleanup when onmount happens
        if (this.unobserveRef) {
            // unregister intersectionObserver
            this.unobserveRef();
            // on unmount, make sure we cleanup
            if (this.hydrated.current && this.lazyHydrator) {
                this.lazyHydrator();
            }
        }
        return;
    };
    GatsbyImageHydrator.prototype.render = function () {
        var Type = this.props.as || "div";
        var _a = this.props.image, width = _a.width, height = _a.height, layout = _a.layout;
        var _b = hooks_1.getWrapperProps(width, height, layout), wStyle = _b.style, wClass = _b.className, wrapperProps = __rest(_b, ["style", "className"]);
        var className = this.props.className;
        // preact class
        if (this.props["class"]) {
            className = this.props["class"];
        }
        var sizer = layout_wrapper_1.getSizer(layout, width, height);
        return (react_1["default"].createElement(Type, __assign({}, wrapperProps, { style: __assign(__assign(__assign({}, wStyle), this.props.style), { backgroundColor: this.props.backgroundColor }), className: "" + wClass + (className ? " " + className : ""), ref: this.root, dangerouslySetInnerHTML: {
                __html: sizer
            }, suppressHydrationWarning: true })));
    };
    return GatsbyImageHydrator;
}(react_1.Component));
var GatsbyImage = function GatsbyImage(props) {
    if (!props.image) {
        if (process.env.NODE_ENV === "development") {
            console.warn("[gatsby-plugin-image] Missing image prop");
        }
        return null;
    }
    if (!hooks_1.gatsbyImageIsInstalled()) {
        console.error("[gatsby-plugin-image] You're missing out on some cool performance features. Please add \"gatsby-plugin-image\" to your gatsby-config.js");
    }
    var className = props.className, classSafe = props["class"], backgroundColor = props.backgroundColor, image = props.image;
    var width = image.width, height = image.height, layout = image.layout;
    var propsKey = JSON.stringify([
        width,
        height,
        layout,
        className,
        classSafe,
        backgroundColor,
    ]);
    return react_1["default"].createElement(GatsbyImageHydrator, __assign({ key: propsKey }, props));
};
exports.GatsbyImage = GatsbyImage;
exports.GatsbyImage.propTypes = gatsby_image_server_1.propTypes;
exports.GatsbyImage.displayName = "GatsbyImage";
