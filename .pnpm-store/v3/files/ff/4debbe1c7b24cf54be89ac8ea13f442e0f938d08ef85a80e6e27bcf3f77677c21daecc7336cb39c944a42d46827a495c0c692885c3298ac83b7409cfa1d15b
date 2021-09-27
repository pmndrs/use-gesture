import { normalize, isAbsolute, relative, dirname } from 'path';
import minimatch from 'minimatch';
import { cosmiconfigSync, defaultLoaders, cosmiconfig } from 'cosmiconfig';
import loadTs from '@endemolshinegroup/cosmiconfig-typescript-loader';
import { loadToml } from 'cosmiconfig-toml-loader';
import { env } from 'string-env-interpolation';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { UrlLoader } from '@graphql-tools/url-loader';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { loadTypedefs, loadTypedefsSync, loadDocuments, loadDocumentsSync, loadSchema, OPERATION_KINDS, loadSchemaSync } from '@graphql-tools/load';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildASTSchema, print } from 'graphql';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function ExtendableBuiltin(cls) {
    function ExtendableBuiltin() {
        cls.apply(this, arguments);
    }
    ExtendableBuiltin.prototype = Object.create(cls.prototype);
    Object.setPrototypeOf(ExtendableBuiltin, cls);
    return ExtendableBuiltin;
}
function composeMessage() {
    var lines = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lines[_i] = arguments[_i];
    }
    return lines.join('\n');
}
var ConfigNotFoundError = /** @class */ (function (_super) {
    __extends(ConfigNotFoundError, _super);
    function ConfigNotFoundError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return ConfigNotFoundError;
}(ExtendableBuiltin(Error)));
var ConfigEmptyError = /** @class */ (function (_super) {
    __extends(ConfigEmptyError, _super);
    function ConfigEmptyError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return ConfigEmptyError;
}(ExtendableBuiltin(Error)));
var ConfigInvalidError = /** @class */ (function (_super) {
    __extends(ConfigInvalidError, _super);
    function ConfigInvalidError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return ConfigInvalidError;
}(ExtendableBuiltin(Error)));
var ProjectNotFoundError = /** @class */ (function (_super) {
    __extends(ProjectNotFoundError, _super);
    function ProjectNotFoundError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return ProjectNotFoundError;
}(ExtendableBuiltin(Error)));
var LoadersMissingError = /** @class */ (function (_super) {
    __extends(LoadersMissingError, _super);
    function LoadersMissingError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return LoadersMissingError;
}(ExtendableBuiltin(Error)));
var LoaderNoResultError = /** @class */ (function (_super) {
    __extends(LoaderNoResultError, _super);
    function LoaderNoResultError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return LoaderNoResultError;
}(ExtendableBuiltin(Error)));
var ExtensionMissingError = /** @class */ (function (_super) {
    __extends(ExtensionMissingError, _super);
    function ExtensionMissingError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        _this.message = message;
        return _this;
    }
    return ExtensionMissingError;
}(ExtendableBuiltin(Error)));

var legacySearchPlaces = [
    '.graphqlconfig',
    '.graphqlconfig.json',
    '.graphqlconfig.yaml',
    '.graphqlconfig.yml',
];
function isLegacyConfig(filepath) {
    filepath = filepath.toLowerCase();
    return legacySearchPlaces.some(function (name) { return filepath.endsWith(name); });
}
function transformContent(content) {
    return env(content);
}
var createCustomLoader = function (loader) {
    return function (filepath, content) {
        return loader(filepath, transformContent(content));
    };
};
function createCosmiConfig(moduleName, _a) {
    var legacy = _a.legacy;
    var options = prepareCosmiconfig(moduleName, {
        legacy: legacy,
    });
    return cosmiconfig(moduleName, options);
}
function createCosmiConfigSync(moduleName, _a) {
    var legacy = _a.legacy;
    var options = prepareCosmiconfig(moduleName, {
        legacy: legacy,
    });
    return cosmiconfigSync(moduleName, options);
}
function prepareCosmiconfig(moduleName, _a) {
    var legacy = _a.legacy;
    var loadYaml = createCustomLoader(defaultLoaders['.yaml']);
    var loadTomlCustom = createCustomLoader(loadToml);
    var loadJson = createCustomLoader(defaultLoaders['.json']);
    var searchPlaces = [
        "#.config.ts",
        "#.config.js",
        '#.config.json',
        '#.config.yaml',
        '#.config.yml',
        '#.config.toml',
        '.#rc',
        '.#rc.ts',
        '.#rc.js',
        '.#rc.json',
        '.#rc.yml',
        '.#rc.yaml',
        '.#rc.toml',
        'package.json',
    ];
    if (legacy) {
        searchPlaces.push.apply(searchPlaces, legacySearchPlaces);
    }
    // We need to wrap loaders in order to access and transform file content (as string)
    // Cosmiconfig has transform option but at this point config is not a string but an object
    return {
        searchPlaces: searchPlaces.map(function (place) { return place.replace('#', moduleName); }),
        loaders: {
            '.ts': loadTs,
            '.js': defaultLoaders['.js'],
            '.json': loadJson,
            '.yaml': loadYaml,
            '.yml': loadYaml,
            '.toml': loadTomlCustom,
            noExt: loadYaml,
        },
    };
}

var cwd = typeof process !== 'undefined' ? process.cwd() : undefined;
function findConfig(_a) {
    var _b = _a.rootDir, rootDir = _b === void 0 ? cwd : _b, _c = _a.legacy, legacy = _c === void 0 ? true : _c, configName = _a.configName;
    return __awaiter(this, void 0, void 0, function () {
        var _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    validate({ rootDir: rootDir });
                    _d = resolve;
                    _e = {
                        rootDir: rootDir
                    };
                    return [4 /*yield*/, createCosmiConfig(configName, { legacy: legacy }).search(rootDir)];
                case 1: return [2 /*return*/, _d.apply(void 0, [(_e.result = _f.sent(),
                            _e)])];
            }
        });
    });
}
function findConfigSync(_a) {
    var _b = _a.rootDir, rootDir = _b === void 0 ? cwd : _b, _c = _a.legacy, legacy = _c === void 0 ? true : _c, configName = _a.configName;
    validate({ rootDir: rootDir });
    return resolve({
        rootDir: rootDir,
        result: createCosmiConfigSync(configName, { legacy: legacy }).search(rootDir),
    });
}
//
function validate(_a) {
    var rootDir = _a.rootDir;
    if (!rootDir) {
        throw new Error("Defining a root directory is required");
    }
}
function resolve(_a) {
    var result = _a.result, rootDir = _a.rootDir;
    if (!result) {
        throw new ConfigNotFoundError(composeMessage("GraphQL Config file is not available in the provided config directory: " + rootDir, "Please check the config directory."));
    }
    if (result.isEmpty) {
        throw new ConfigEmptyError(composeMessage("GraphQL Config file is empty.", "Please check " + result.filepath));
    }
    return {
        config: result.config,
        filepath: result.filepath,
    };
}

function getConfig(_a) {
    var filepath = _a.filepath, configName = _a.configName, _b = _a.legacy, legacy = _b === void 0 ? true : _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    validate$1({ filepath: filepath });
                    _c = resolve$1;
                    _d = {};
                    return [4 /*yield*/, createCosmiConfig(configName, { legacy: legacy }).load(filepath)];
                case 1: return [2 /*return*/, _c.apply(void 0, [(_d.result = _e.sent(),
                            _d.filepath = filepath,
                            _d)])];
            }
        });
    });
}
function getConfigSync(_a) {
    var filepath = _a.filepath, configName = _a.configName, _b = _a.legacy, legacy = _b === void 0 ? true : _b;
    validate$1({ filepath: filepath });
    return resolve$1({
        result: createCosmiConfigSync(configName, { legacy: legacy }).load(filepath),
        filepath: filepath,
    });
}
//
function resolve$1(_a) {
    var result = _a.result, filepath = _a.filepath;
    if (!result) {
        throw new ConfigNotFoundError(composeMessage("GraphQL Config file is not available: " + filepath, "Please check the config filepath."));
    }
    if (result.isEmpty) {
        throw new ConfigEmptyError(composeMessage("GraphQL Config file is empty.", "Please check " + result.filepath));
    }
    return {
        config: result.config,
        filepath: result.filepath,
    };
}
function validate$1(_a) {
    var filepath = _a.filepath;
    if (!filepath) {
        throw new Error("Defining a file path is required");
    }
}

function isMultipleProjectConfig(config) {
    return typeof config.projects === 'object';
}
function isSingleProjectConfig(config) {
    return typeof config.schema !== 'undefined';
}
function isLegacyProjectConfig(config) {
    return (typeof config.schemaPath !== 'undefined' ||
        typeof config.includes !== 'undefined' ||
        typeof config.excludes !== 'undefined');
}
function useMiddleware(fns) {
    return function (input) {
        if (fns.length) {
            return fns.reduce(function (obj, cb) { return cb(obj); }, input);
        }
        return input;
    };
}

var GraphQLProjectConfig = /** @class */ (function () {
    function GraphQLProjectConfig(_a) {
        var filepath = _a.filepath, name = _a.name, config = _a.config, extensionsRegistry = _a.extensionsRegistry;
        this.filepath = filepath;
        this.dirpath = dirname(filepath);
        this.name = name;
        if (isLegacyProjectConfig(config)) {
            this.extensions = config.extensions || {};
            this.schema = config.schemaPath;
            this.include = config.includes;
            this.exclude = config.excludes;
            this.isLegacy = true;
        }
        else {
            this.extensions = config.extensions || {};
            this.schema = config.schema;
            this.documents = config.documents;
            this.include = config.include;
            this.exclude = config.exclude;
            this.isLegacy = false;
        }
        this._extensionsRegistry = extensionsRegistry;
    }
    GraphQLProjectConfig.prototype.hasExtension = function (name) {
        return !!this.extensions[name];
    };
    GraphQLProjectConfig.prototype.extension = function (name) {
        if (this.isLegacy) {
            var extension_1 = this.extensions[name];
            if (!extension_1) {
                throw new ExtensionMissingError("Project " + this.name + " is missing " + name + " extension");
            }
            return extension_1;
        }
        var extension = this._extensionsRegistry.get(name);
        if (!extension) {
            throw new ExtensionMissingError("Project " + this.name + " is missing " + name + " extension");
        }
        return __assign(__assign({}, this.extensions[name]), { schema: this.schema, documents: this.documents, include: this.include, exclude: this.exclude });
    };
    GraphQLProjectConfig.prototype.getSchema = function (out) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loadSchema(this.schema, out)];
            });
        });
    };
    GraphQLProjectConfig.prototype.getSchemaSync = function (out) {
        return this.loadSchemaSync(this.schema, out);
    };
    // Get Documents
    GraphQLProjectConfig.prototype.getDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.documents) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, this.loadDocuments(this.documents)];
            });
        });
    };
    GraphQLProjectConfig.prototype.getDocumentsSync = function () {
        if (!this.documents) {
            return [];
        }
        return this.loadDocumentsSync(this.documents);
    };
    GraphQLProjectConfig.prototype.loadSchema = function (pointer, out, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._extensionsRegistry.loaders.schema.loadSchema(pointer, out, options)];
            });
        });
    };
    GraphQLProjectConfig.prototype.loadSchemaSync = function (pointer, out, options) {
        return this._extensionsRegistry.loaders.schema.loadSchemaSync(pointer, out, options);
    };
    // Load Documents
    GraphQLProjectConfig.prototype.loadDocuments = function (pointer, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!pointer) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, this._extensionsRegistry.loaders.documents.loadDocuments(pointer, options)];
            });
        });
    };
    GraphQLProjectConfig.prototype.loadDocumentsSync = function (pointer, options) {
        if (!pointer) {
            return [];
        }
        return this._extensionsRegistry.loaders.documents.loadDocumentsSync(pointer, options);
    };
    // Rest
    GraphQLProjectConfig.prototype.match = function (filepath) {
        var _this = this;
        var isSchemaOrDocument = [this.schema, this.documents].some(function (pointer) {
            return match(filepath, _this.dirpath, pointer);
        });
        if (isSchemaOrDocument) {
            return true;
        }
        var isExcluded = this.exclude
            ? match(filepath, this.dirpath, this.exclude)
            : false;
        if (isExcluded) {
            return false;
        }
        var isIncluded = this.include
            ? match(filepath, this.dirpath, this.include)
            : false;
        if (isIncluded) {
            return true;
        }
        return false;
    };
    return GraphQLProjectConfig;
}());
// XXX: it works but uses nodejs - expose normalization of file and dir paths in config
function match(filepath, dirpath, pointer) {
    if (!pointer) {
        return false;
    }
    if (Array.isArray(pointer)) {
        return pointer.some(function (p) { return match(filepath, dirpath, p); });
    }
    if (typeof pointer === 'string') {
        var normalizedFilepath = normalize(isAbsolute(filepath) ? relative(dirpath, filepath) : filepath);
        return minimatch(normalizedFilepath, normalize(pointer), { dot: true });
    }
    if (typeof pointer === 'object') {
        return match(filepath, dirpath, Object.keys(pointer)[0]);
    }
    return false;
}

var LoadersRegistry = /** @class */ (function () {
    function LoadersRegistry(_a) {
        var cwd = _a.cwd;
        this._loaders = new Set();
        this._middlewares = [];
        this.cwd = cwd;
    }
    LoadersRegistry.prototype.register = function (loader) {
        this._loaders.add(loader);
    };
    LoadersRegistry.prototype.override = function (loaders) {
        this._loaders = new Set(loaders);
    };
    LoadersRegistry.prototype.use = function (middleware) {
        this._middlewares.push(middleware);
    };
    LoadersRegistry.prototype.loadTypeDefs = function (pointer, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, loadTypedefs(pointer, __assign({ loaders: Array.from(this._loaders), cwd: this.cwd }, options))];
            });
        });
    };
    LoadersRegistry.prototype.loadTypeDefsSync = function (pointer, options) {
        return loadTypedefsSync(pointer, this.createOptions(options));
    };
    LoadersRegistry.prototype.loadDocuments = function (pointer, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, loadDocuments(pointer, this.createOptions(options))];
            });
        });
    };
    LoadersRegistry.prototype.loadDocumentsSync = function (pointer, options) {
        return loadDocumentsSync(pointer, this.createOptions(options));
    };
    LoadersRegistry.prototype.loadSchema = function (pointer, out, options) {
        return __awaiter(this, void 0, void 0, function () {
            var loadSchemaOptions, schemaDoc, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        out = out || 'GraphQLSchema';
                        loadSchemaOptions = this.createOptions(options);
                        if (out === 'GraphQLSchema' && !this._middlewares.length) {
                            return [2 /*return*/, loadSchema(pointer, loadSchemaOptions)];
                        }
                        _a = this.transformSchemaSources;
                        return [4 /*yield*/, loadTypedefs(pointer, __assign({ filterKinds: OPERATION_KINDS }, loadSchemaOptions))];
                    case 1:
                        schemaDoc = _a.apply(this, [_b.sent()]);
                        // TODO: TS screams about `out` not being compatible with SchemaOutput
                        return [2 /*return*/, this.castSchema(schemaDoc, out)];
                }
            });
        });
    };
    LoadersRegistry.prototype.loadSchemaSync = function (pointer, out, options) {
        out = out || 'GraphQLSchema';
        var loadSchemaOptions = this.createOptions(options);
        if (out === 'GraphQLSchema' && !this._middlewares.length) {
            return loadSchemaSync(pointer, loadSchemaOptions);
        }
        var schemaDoc = this.transformSchemaSources(loadTypedefsSync(pointer, __assign({ filterKinds: OPERATION_KINDS }, loadSchemaOptions)));
        return this.castSchema(schemaDoc, out);
    };
    LoadersRegistry.prototype.createOptions = function (options) {
        return __assign({ loaders: Array.from(this._loaders), cwd: this.cwd }, options);
    };
    LoadersRegistry.prototype.transformSchemaSources = function (sources) {
        var documents = sources.map(function (source) { return source.document; });
        var document = mergeTypeDefs(documents);
        return useMiddleware(this._middlewares)(document);
    };
    LoadersRegistry.prototype.castSchema = function (doc, out) {
        if (out === 'DocumentNode') {
            return doc;
        }
        if (out === 'GraphQLSchema') {
            return buildASTSchema(doc);
        }
        return print(doc);
    };
    return LoadersRegistry;
}());

var GraphQLExtensionsRegistry = /** @class */ (function () {
    function GraphQLExtensionsRegistry(_a) {
        var cwd = _a.cwd;
        this._extensions = {};
        this.loaders = {
            schema: new LoadersRegistry({ cwd: cwd }),
            documents: new LoadersRegistry({ cwd: cwd }),
        };
        // schema
        this.loaders.schema.register(new GraphQLFileLoader());
        this.loaders.schema.register(new UrlLoader());
        this.loaders.schema.register(new JsonFileLoader());
        // documents
        this.loaders.documents.register(new GraphQLFileLoader());
    }
    GraphQLExtensionsRegistry.prototype.register = function (extensionFn) {
        var extension = extensionFn({
            logger: {},
            loaders: this.loaders,
        });
        this._extensions[extension.name] = extension;
    };
    GraphQLExtensionsRegistry.prototype.has = function (extensionName) {
        return !!this._extensions[extensionName];
    };
    GraphQLExtensionsRegistry.prototype.get = function (extensionName) {
        return this._extensions[extensionName];
    };
    GraphQLExtensionsRegistry.prototype.names = function () {
        return Object.keys(this._extensions);
    };
    GraphQLExtensionsRegistry.prototype.forEach = function (cb) {
        for (var extensionName in this._extensions) {
            cb(this._extensions[extensionName]);
        }
    };
    return GraphQLExtensionsRegistry;
}());

var EndpointsExtension = function () {
    return {
        name: 'endpoints',
    };
};

var cwd$1 = typeof process !== 'undefined' ? process.cwd() : undefined;
var defaultConfigName = 'graphql';
var defaultLoadConfigOptions = {
    rootDir: cwd$1,
    extensions: [],
    throwOnMissing: true,
    throwOnEmpty: true,
    configName: defaultConfigName,
    legacy: true,
};
function loadConfig(options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, filepath, configName, rootDir, extensions, throwOnEmpty, throwOnMissing, legacy, found, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = __assign(__assign({}, defaultLoadConfigOptions), options), filepath = _a.filepath, configName = _a.configName, rootDir = _a.rootDir, extensions = _a.extensions, throwOnEmpty = _a.throwOnEmpty, throwOnMissing = _a.throwOnMissing, legacy = _a.legacy;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    if (!filepath) return [3 /*break*/, 3];
                    return [4 /*yield*/, getConfig({
                            filepath: filepath,
                            configName: configName,
                            legacy: legacy,
                        })];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, findConfig({
                        rootDir: rootDir,
                        configName: configName,
                        legacy: legacy,
                    })];
                case 4:
                    _b = _c.sent();
                    _c.label = 5;
                case 5:
                    found = _b;
                    return [2 /*return*/, new GraphQLConfig(found, extensions)];
                case 6:
                    error_1 = _c.sent();
                    return [2 /*return*/, handleError(error_1, { throwOnMissing: throwOnMissing, throwOnEmpty: throwOnEmpty })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function loadConfigSync(options) {
    var _a = __assign(__assign({}, defaultLoadConfigOptions), options), filepath = _a.filepath, configName = _a.configName, rootDir = _a.rootDir, extensions = _a.extensions, throwOnEmpty = _a.throwOnEmpty, throwOnMissing = _a.throwOnMissing, legacy = _a.legacy;
    try {
        var found = filepath
            ? getConfigSync({
                filepath: filepath,
                configName: configName,
                legacy: legacy,
            })
            : findConfigSync({
                rootDir: rootDir,
                configName: configName,
                legacy: legacy,
            });
        return new GraphQLConfig(found, extensions);
    }
    catch (error) {
        return handleError(error, { throwOnMissing: throwOnMissing, throwOnEmpty: throwOnEmpty });
    }
}
function handleError(error, options) {
    if ((!options.throwOnMissing && error instanceof ConfigNotFoundError) ||
        (!options.throwOnEmpty && error instanceof ConfigEmptyError)) {
        return;
    }
    throw error;
}
var GraphQLConfig = /** @class */ (function () {
    function GraphQLConfig(raw, extensions) {
        var _this = this;
        this._rawConfig = raw.config;
        this.filepath = raw.filepath;
        this.dirpath = dirname(raw.filepath);
        this.extensions = new GraphQLExtensionsRegistry({ cwd: this.dirpath });
        // Register Endpoints
        this.extensions.register(EndpointsExtension);
        extensions.forEach(function (extension) {
            _this.extensions.register(extension);
        });
        this.projects = {};
        if (isMultipleProjectConfig(this._rawConfig)) {
            for (var projectName in this._rawConfig.projects) {
                var config = this._rawConfig.projects[projectName];
                this.projects[projectName] = new GraphQLProjectConfig({
                    filepath: this.filepath,
                    name: projectName,
                    config: config,
                    extensionsRegistry: this.extensions,
                });
            }
        }
        else if (isSingleProjectConfig(this._rawConfig)) {
            this.projects['default'] = new GraphQLProjectConfig({
                filepath: this.filepath,
                name: 'default',
                config: this._rawConfig,
                extensionsRegistry: this.extensions,
            });
        }
        else if (isLegacyProjectConfig(this._rawConfig)) {
            this.projects['default'] = new GraphQLProjectConfig({
                filepath: this.filepath,
                name: 'default',
                config: this._rawConfig,
                extensionsRegistry: this.extensions,
            });
        }
    }
    GraphQLConfig.prototype.getProject = function (name) {
        if (!name) {
            return this.getDefault();
        }
        var project = this.projects[name];
        if (!project) {
            throw new ProjectNotFoundError("Project '" + name + "' not found");
        }
        return project;
    };
    GraphQLConfig.prototype.getProjectForFile = function (filepath) {
        // Looks for a project that includes the file or the file is a part of schema or documents
        for (var projectName in this.projects) {
            if (this.projects.hasOwnProperty(projectName)) {
                var project = this.projects[projectName];
                if (project.match(filepath)) {
                    return project;
                }
            }
        }
        // The file doesn't match any of the project
        // Looks for a first project that has no `include` and `exclude`
        for (var projectName in this.projects) {
            if (this.projects.hasOwnProperty(projectName)) {
                var project = this.projects[projectName];
                if (!project.include && !project.exclude) {
                    return project;
                }
            }
        }
        throw new ProjectNotFoundError("File '" + filepath + "' doesn't match any project");
    };
    GraphQLConfig.prototype.getDefault = function () {
        return this.getProject('default');
    };
    GraphQLConfig.prototype.isLegacy = function () {
        return isLegacyConfig(this.filepath);
    };
    return GraphQLConfig;
}());

export { ConfigEmptyError, ConfigInvalidError, ConfigNotFoundError, ExtensionMissingError, GraphQLConfig, GraphQLProjectConfig, LoaderNoResultError, LoadersMissingError, ProjectNotFoundError, composeMessage, loadConfig, loadConfigSync };
//# sourceMappingURL=index.esm.js.map
