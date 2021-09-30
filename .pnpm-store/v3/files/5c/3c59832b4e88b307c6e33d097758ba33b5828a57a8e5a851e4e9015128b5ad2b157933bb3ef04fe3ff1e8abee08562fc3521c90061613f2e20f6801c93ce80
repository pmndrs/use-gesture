"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var lodash_get_1 = __importDefault(require("lodash.get"));
var utils_1 = require("./utils");
exports.fixFrameworkCache = function (config, siteDirectory) {
    var framework = (lodash_get_1.default(config, "optimization.splitChunks.cacheGroups.framework", false));
    if (!framework)
        return;
    if (typeof framework !== "object" || !framework.test)
        return;
    if (!(framework.test instanceof RegExp))
        return;
    var regVal = framework.test
        .toString()
        .replace(/[[\\\]]/g, "")
        .slice(1, -1);
    var frameworkPackages = /\/\(([^)]+)\)\/$/.exec(regVal);
    var frameworkList = [];
    if (frameworkPackages) {
        var frameworkRequire_1 = utils_1.createRequire(siteDirectory + "/:internal:");
        Object.assign(frameworkList, frameworkPackages[1]
            .split("|")
            .map(function (f) {
            try {
                return path_1.default.dirname(frameworkRequire_1.resolve(f + "/package.json")) + path_1.default.sep;
            }
            catch (err) {
                return "";
            }
        })
            .filter(Boolean));
    }
    var isRootDependency = function (val) { return (frameworkList.some(function (f) { var _a; return (_a = val) === null || _a === void 0 ? void 0 : _a.startsWith(f); })); };
    framework.test = function (mod) { return (isRootDependency(mod.resource)); };
};
