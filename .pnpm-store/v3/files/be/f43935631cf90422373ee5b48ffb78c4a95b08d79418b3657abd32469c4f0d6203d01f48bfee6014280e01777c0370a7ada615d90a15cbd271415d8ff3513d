"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.preprocessSource = void 0;
var parser_1 = require("./parser");
var path_1 = __importDefault(require("path"));
var parser_2 = require("./parser");
var code_frame_1 = require("@babel/code-frame");
var image_processing_1 = require("./image-processing");
var node_utils_1 = require("./node-utils");
var common_tags_1 = require("common-tags");
var extensions = [".js", ".jsx", ".tsx"];
function preprocessSource(_a) {
    var filename = _a.filename, contents = _a.contents, pathPrefix = _a.pathPrefix, cache = _a.cache, reporter = _a.reporter, store = _a.store, createNodeId = _a.createNodeId, createNode = _a.actions.createNode;
    return __awaiter(this, void 0, void 0, function () {
        var root, cacheDir, ast, images, sourceDir;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!contents.includes("StaticImage") ||
                        !contents.includes("gatsby-plugin-image") ||
                        !extensions.includes(path_1["default"].extname(filename))) {
                        return [2 /*return*/];
                    }
                    root = store.getState().program.directory;
                    cacheDir = node_utils_1.getCacheDir(root);
                    ast = parser_1.babelParseToAst(contents, filename);
                    reporter.setErrorMap({
                        "95314": {
                            text: function (context) {
                                return common_tags_1.stripIndents(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          Error extracting property \"", "\" from StaticImage component.\n          There are restrictions on how props can be passed to the StaticImage component. Learn more at https://gatsby.dev/static-image-props\n\n          ", "\n        "], ["\n          Error extracting property \"", "\" from StaticImage component.\n          There are restrictions on how props can be passed to the StaticImage component. Learn more at https://gatsby.dev/static-image-props\n\n          ", "\n        "])), context.prop, context.codeFrame);
                            },
                            docsUrl: "https://gatsby.dev/static-image-props",
                            level: "ERROR",
                            category: "USER"
                        }
                    });
                    images = parser_2.extractStaticImageProps(ast, function (prop, nodePath) {
                        var _a = nodePath.node.loc, start = _a.start, end = _a.end;
                        var location = { start: start, end: end };
                        reporter.error({
                            id: "95314",
                            filePath: filename,
                            location: location,
                            context: {
                                prop: prop,
                                codeFrame: code_frame_1.codeFrameColumns(contents, nodePath.node.loc, {
                                    linesAbove: 6,
                                    linesBelow: 6,
                                    highlightCode: true
                                })
                            }
                        });
                    });
                    sourceDir = path_1["default"].dirname(filename);
                    return [4 /*yield*/, image_processing_1.writeImages({
                            images: images,
                            pathPrefix: pathPrefix,
                            cache: cache,
                            reporter: reporter,
                            cacheDir: cacheDir,
                            sourceDir: sourceDir,
                            createNodeId: createNodeId,
                            createNode: createNode,
                            store: store,
                            filename: filename
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.preprocessSource = preprocessSource;
var templateObject_1;
