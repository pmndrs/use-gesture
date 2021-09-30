"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var babel_helpers_1 = require("./babel-helpers");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var gatsby_core_utils_1 = require("gatsby-core-utils");
var common_tags_1 = require("common-tags");
/**
 * This is a plugin that finds StaticImage components and injects the image props into the component.
 * These props contain the image URLs etc, and were created earlier in the build process
 */
function attrs(_a) {
    var t = _a.types, template = _a.template;
    return {
        visitor: {
            JSXOpeningElement: function (nodePath) {
                var _a;
                if (!nodePath
                    .get("name")
                    .referencesImport("gatsby-plugin-image", "StaticImage")) {
                    return;
                }
                var unresolvedProps = [];
                var props = babel_helpers_1.evaluateImageAttributes(nodePath, function (prop) {
                    unresolvedProps.push(prop);
                });
                var error;
                if (unresolvedProps.length) {
                    // TODO: Add a shortlink to docs on the plugin
                    error = "Could not find values for the following props at build time: " + unresolvedProps.join(", ");
                    console.warn("[gatsby-plugin-image] " + error);
                }
                var hash = babel_helpers_1.hashOptions(props);
                var cacheDir = (_a = this.opts) === null || _a === void 0 ? void 0 : _a.cacheDir;
                if (!cacheDir) {
                    console.warn("[gatsby-plugin-image] Couldn't find image data cache file");
                }
                var filename = path_1["default"].join(cacheDir, hash + ".json");
                var data;
                // If there's no src prop there's no point in checking if it exists
                if (!unresolvedProps.includes("src")) {
                    try {
                        data = fs_extra_1["default"].readJSONSync(filename);
                    }
                    catch (e) {
                        // TODO add info about minimum Gatsby version once this is merged
                        var msg = common_tags_1.stripIndent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Could not read image data file \"", "\". \n            This may mean that the images in \"", "\" were not processed.\n            Please ensure that your gatsby version is at least 2.24.78."], ["\n            Could not read image data file \"", "\". \n            This may mean that the images in \"", "\" were not processed.\n            Please ensure that your gatsby version is at least 2.24.78."])), filename, this.filename);
                        error += msg;
                        console.warn("[gatsby-plugin-image] " + msg);
                    }
                }
                if (!data) {
                    console.warn("[gatsby-plugin-image] No data found for image \"" + props.src + "\"");
                    // Add the error message to the component so we can show it in the browser
                    var newProp_1 = t.jsxAttribute(t.jsxIdentifier("__error"), t.jsxExpressionContainer(t.stringLiteral("No data found for image \"" + props.src + "\"\n              " + (error || ""))));
                    nodePath.node.attributes.push(newProp_1);
                    return;
                }
                if (error) {
                    // Add the error message to the component so we can show it in the browser
                    var newProp_2 = t.jsxAttribute(t.jsxIdentifier("__error"), t.stringLiteral(error));
                    nodePath.node.attributes.push(newProp_2);
                }
                //  `require()` the image data into a component prop
                var makeRequire = template.expression("require(\"" + gatsby_core_utils_1.slash(filename) + "\")");
                var newProp = t.jsxAttribute(t.jsxIdentifier("__imageData"), t.jsxExpressionContainer(makeRequire()));
                nodePath.node.attributes.push(newProp);
            }
        }
    };
}
exports["default"] = attrs;
var templateObject_1;
