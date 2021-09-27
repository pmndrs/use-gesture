"use strict";
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
exports.__esModule = true;
exports.getGatsbyImageFieldConfig = exports.getGatsbyImageResolver = exports.ImagePlaceholderType = exports.ImageLayoutType = exports.ImageFormatType = void 0;
var graphql_1 = require("gatsby/graphql");
var common_tags_1 = require("common-tags");
exports.ImageFormatType = new graphql_1.GraphQLEnumType({
    name: "GatsbyImageFormat",
    values: {
        NO_CHANGE: { value: "" },
        AUTO: { value: "auto" },
        JPG: { value: "jpg" },
        PNG: { value: "png" },
        WEBP: { value: "webp" },
        AVIF: { value: "avif" }
    }
});
exports.ImageLayoutType = new graphql_1.GraphQLEnumType({
    name: "GatsbyImageLayout",
    values: {
        FIXED: { value: "fixed" },
        FULL_WIDTH: { value: "fullWidth" },
        CONSTRAINED: { value: "constrained" }
    }
});
exports.ImagePlaceholderType = new graphql_1.GraphQLEnumType({
    name: "GatsbyImagePlaceholder",
    values: {
        DOMINANT_COLOR: { value: "dominantColor" },
        TRACED_SVG: { value: "tracedSVG" },
        BLURRED: { value: "blurred" },
        NONE: { value: "none" }
    }
});
function getGatsbyImageResolver(resolve, extraArgs) {
    return {
        type: "JSON!",
        args: __assign({ layout: {
                type: "enum GatsbyImageLayout { FIXED, FULL_WIDTH, CONSTRAINED }",
                description: common_tags_1.stripIndent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            The layout for the image.\n            FIXED: A static image sized, that does not resize according to the screen width\n            FULL_WIDTH: The image resizes to fit its container. Pass a \"sizes\" option if it isn't going to be the full width of the screen. \n            CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.\n            "], ["\n            The layout for the image.\n            FIXED: A static image sized, that does not resize according to the screen width\n            FULL_WIDTH: The image resizes to fit its container. Pass a \"sizes\" option if it isn't going to be the full width of the screen. \n            CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.\n            "])))
            }, width: {
                type: "Int",
                description: common_tags_1.stripIndent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        The display width of the generated image for layout = FIXED, and the display width of the largest image for layout = CONSTRAINED.  \n        The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities\n        Ignored if layout = FULL_WIDTH.\n        "], ["\n        The display width of the generated image for layout = FIXED, and the display width of the largest image for layout = CONSTRAINED.  \n        The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities\n        Ignored if layout = FULL_WIDTH.\n        "])))
            }, height: {
                type: "Int",
                description: common_tags_1.stripIndent(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        If set, the height of the generated image. If omitted, it is calculated from the supplied width, matching the aspect ratio of the source image."], ["\n        If set, the height of the generated image. If omitted, it is calculated from the supplied width, matching the aspect ratio of the source image."])))
            }, aspectRatio: {
                type: "Float",
                description: common_tags_1.stripIndent(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        If set along with width or height, this will set the value of the other dimension to match the provided aspect ratio, cropping the image if needed. \n        If neither width or height is provided, height will be set based on the intrinsic width of the source image.\n        "], ["\n        If set along with width or height, this will set the value of the other dimension to match the provided aspect ratio, cropping the image if needed. \n        If neither width or height is provided, height will be set based on the intrinsic width of the source image.\n        "])))
            }, sizes: {
                type: "String",
                description: common_tags_1.stripIndent(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n            The \"sizes\" property, passed to the img tag. This describes the display size of the image. \n            This does not affect the generated images, but is used by the browser to decide which images to download. You can leave this blank for fixed images, or if the responsive image\n            container will be the full width of the screen. In these cases we will generate an appropriate value.\n        "], ["\n            The \"sizes\" property, passed to the img tag. This describes the display size of the image. \n            This does not affect the generated images, but is used by the browser to decide which images to download. You can leave this blank for fixed images, or if the responsive image\n            container will be the full width of the screen. In these cases we will generate an appropriate value.\n        "])))
            }, outputPixelDensities: {
                type: "[Float]",
                description: common_tags_1.stripIndent(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n            A list of image pixel densities to generate for FIXED and CONSTRAINED images. You should rarely need to change this. It will never generate images larger than the source, and will always include a 1x image.\n            Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, 3x, and [0.25, 0.5, 1, 2] for fluid. In this case, an image with a fluid layout and width = 400 would generate images at 100, 200, 400 and 800px wide.\n            Ignored for FULL_WIDTH, which uses breakpoints instead.\n            "], ["\n            A list of image pixel densities to generate for FIXED and CONSTRAINED images. You should rarely need to change this. It will never generate images larger than the source, and will always include a 1x image.\n            Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, 3x, and [0.25, 0.5, 1, 2] for fluid. In this case, an image with a fluid layout and width = 400 would generate images at 100, 200, 400 and 800px wide.\n            Ignored for FULL_WIDTH, which uses breakpoints instead.\n            "])))
            }, breakpoints: {
                type: "[Int]",
                description: common_tags_1.stripIndent(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        Specifies the image widths to generate. You should rarely need to change this. For FIXED and CONSTRAINED images it is better to allow these to be determined automatically,\n        based on the image size. For FULL_WIDTH images this can be used to override the default, which is determined by the plugin.\n        It will never generate any images larger than the source.\n        "], ["\n        Specifies the image widths to generate. You should rarely need to change this. For FIXED and CONSTRAINED images it is better to allow these to be determined automatically,\n        based on the image size. For FULL_WIDTH images this can be used to override the default, which is determined by the plugin.\n        It will never generate any images larger than the source.\n        "])))
            }, backgroundColor: {
                type: "String",
                description: "Background color applied to the wrapper, or when \"letterboxing\" an image to another aspect ratio."
            } }, extraArgs),
        resolve: resolve
    };
}
exports.getGatsbyImageResolver = getGatsbyImageResolver;
function getGatsbyImageFieldConfig(resolve, extraArgs) {
    return {
        type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLJSON),
        args: __assign({ layout: {
                type: exports.ImageLayoutType,
                description: common_tags_1.stripIndent(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n            The layout for the image.\n            FIXED: A static image sized, that does not resize according to the screen width\n            FULL_WIDTH: The image resizes to fit its container. Pass a \"sizes\" option if it isn't going to be the full width of the screen.\n            CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.\n            "], ["\n            The layout for the image.\n            FIXED: A static image sized, that does not resize according to the screen width\n            FULL_WIDTH: The image resizes to fit its container. Pass a \"sizes\" option if it isn't going to be the full width of the screen.\n            CONSTRAINED: Resizes to fit its container, up to a maximum width, at which point it will remain fixed in size.\n            "])))
            }, width: {
                type: graphql_1.GraphQLInt,
                description: common_tags_1.stripIndent(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        The display width of the generated image for layout = FIXED, and the display width of the largest image for layout = CONSTRAINED.\n        The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities\n        Ignored if layout = FLUID.\n        "], ["\n        The display width of the generated image for layout = FIXED, and the display width of the largest image for layout = CONSTRAINED.\n        The actual largest image resolution will be this value multiplied by the largest value in outputPixelDensities\n        Ignored if layout = FLUID.\n        "])))
            }, height: {
                type: graphql_1.GraphQLInt,
                description: common_tags_1.stripIndent(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n        If set, the height of the generated image. If omitted, it is calculated from the supplied width, matching the aspect ratio of the source image."], ["\n        If set, the height of the generated image. If omitted, it is calculated from the supplied width, matching the aspect ratio of the source image."])))
            }, aspectRatio: {
                type: graphql_1.GraphQLFloat,
                description: common_tags_1.stripIndent(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n        If set along with width or height, this will set the value of the other dimension to match the provided aspect ratio, cropping the image if needed. \n        If neither width or height is provided, height will be set based on the intrinsic width of the source image.\n        "], ["\n        If set along with width or height, this will set the value of the other dimension to match the provided aspect ratio, cropping the image if needed. \n        If neither width or height is provided, height will be set based on the intrinsic width of the source image.\n        "])))
            }, placeholder: {
                type: exports.ImagePlaceholderType,
                description: common_tags_1.stripIndent(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n            Format of generated placeholder image, displayed while the main image loads.\n            BLURRED: a blurred, low resolution image, encoded as a base64 data URI (default)\n            DOMINANT_COLOR: a solid color, calculated from the dominant color of the image.\n            TRACED_SVG: a low-resolution traced SVG of the image.\n            NONE: no placeholder. Set the argument \"backgroundColor\" to use a fixed background color."], ["\n            Format of generated placeholder image, displayed while the main image loads.\n            BLURRED: a blurred, low resolution image, encoded as a base64 data URI (default)\n            DOMINANT_COLOR: a solid color, calculated from the dominant color of the image.\n            TRACED_SVG: a low-resolution traced SVG of the image.\n            NONE: no placeholder. Set the argument \"backgroundColor\" to use a fixed background color."])))
            }, formats: {
                type: graphql_1.GraphQLList(exports.ImageFormatType),
                description: common_tags_1.stripIndent(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n            The image formats to generate. Valid values are AUTO (meaning the same format as the source image), JPG, PNG, WEBP and AVIF.\n            The default value is [AUTO, WEBP], and you should rarely need to change this. Take care if you specify JPG or PNG when you do\n            not know the formats of the source images, as this could lead to unwanted results such as converting JPEGs to PNGs. Specifying\n            both PNG and JPG is not supported and will be ignored. \n        "], ["\n            The image formats to generate. Valid values are AUTO (meaning the same format as the source image), JPG, PNG, WEBP and AVIF.\n            The default value is [AUTO, WEBP], and you should rarely need to change this. Take care if you specify JPG or PNG when you do\n            not know the formats of the source images, as this could lead to unwanted results such as converting JPEGs to PNGs. Specifying\n            both PNG and JPG is not supported and will be ignored. \n        "]))),
                defaultValue: ["", "webp"]
            }, outputPixelDensities: {
                type: graphql_1.GraphQLList(graphql_1.GraphQLFloat),
                description: common_tags_1.stripIndent(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n            A list of image pixel densities to generate for FIXED and CONSTRAINED images. You should rarely need to change this. It will never generate images larger than the source, and will always include a 1x image.\n            Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, 3x, and [0.25, 0.5, 1, 2] for fluid. In this case, an image with a fluid layout and width = 400 would generate images at 100, 200, 400 and 800px wide.\n            "], ["\n            A list of image pixel densities to generate for FIXED and CONSTRAINED images. You should rarely need to change this. It will never generate images larger than the source, and will always include a 1x image.\n            Default is [ 1, 2 ] for fixed images, meaning 1x, 2x, 3x, and [0.25, 0.5, 1, 2] for fluid. In this case, an image with a fluid layout and width = 400 would generate images at 100, 200, 400 and 800px wide.\n            "])))
            }, breakpoints: {
                type: graphql_1.GraphQLList(graphql_1.GraphQLInt),
                description: common_tags_1.stripIndent(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n        Specifies the image widths to generate. You should rarely need to change this. For FIXED and CONSTRAINED images it is better to allow these to be determined automatically,\n        based on the image size. For FULL_WIDTH images this can be used to override the default, which is [750, 1080, 1366, 1920].\n        It will never generate any images larger than the source.\n        "], ["\n        Specifies the image widths to generate. You should rarely need to change this. For FIXED and CONSTRAINED images it is better to allow these to be determined automatically,\n        based on the image size. For FULL_WIDTH images this can be used to override the default, which is [750, 1080, 1366, 1920].\n        It will never generate any images larger than the source.\n        "])))
            }, sizes: {
                type: graphql_1.GraphQLString,
                description: common_tags_1.stripIndent(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n            The \"sizes\" property, passed to the img tag. This describes the display size of the image.\n            This does not affect the generated images, but is used by the browser to decide which images to download. You can leave this blank for fixed images, or if the responsive image\n            container will be the full width of the screen. In these cases we will generate an appropriate value.\n        "], ["\n            The \"sizes\" property, passed to the img tag. This describes the display size of the image.\n            This does not affect the generated images, but is used by the browser to decide which images to download. You can leave this blank for fixed images, or if the responsive image\n            container will be the full width of the screen. In these cases we will generate an appropriate value.\n        "])))
            }, backgroundColor: {
                type: graphql_1.GraphQLString,
                description: "Background color applied to the wrapper, or when \"letterboxing\" an image to another aspect ratio."
            } }, extraArgs),
        resolve: resolve
    };
}
exports.getGatsbyImageFieldConfig = getGatsbyImageFieldConfig;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
