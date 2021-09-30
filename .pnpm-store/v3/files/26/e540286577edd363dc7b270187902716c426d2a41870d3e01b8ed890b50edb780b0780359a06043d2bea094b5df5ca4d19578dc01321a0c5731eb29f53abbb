"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.register = exports.getExtensions = exports.TSError = exports.normalizeSlashes = exports.parse = exports.split = exports.DEFAULTS = exports.VERSION = exports.debug = exports.INSPECT_CUSTOM = exports.REGISTER_INSTANCE = exports.createRepl = void 0;
const path_1 = require("path");
const sourceMapSupport = require("source-map-support");
const ynModule = require("yn");
const make_error_1 = require("make-error");
const util = require("util");
const url_1 = require("url");
const module_1 = require("module");
// tslint:disable-next-line
const createRequire = (_a = module_1.createRequire !== null && module_1.createRequire !== void 0 ? module_1.createRequire : module_1.createRequireFromPath) !== null && _a !== void 0 ? _a : require('create-require');
var repl_1 = require("./repl");
Object.defineProperty(exports, "createRepl", { enumerable: true, get: function () { return repl_1.createRepl; } });
/**
 * Does this version of node obey the package.json "type" field
 * and throw ERR_REQUIRE_ESM when attempting to require() an ESM modules.
 */
const engineSupportsPackageTypeField = parseInt(process.versions.node.split('.')[0], 10) >= 12;
// Loaded conditionally so we don't need to support older node versions
let assertScriptCanLoadAsCJSImpl;
/**
 * Assert that script can be loaded as CommonJS when we attempt to require it.
 * If it should be loaded as ESM, throw ERR_REQUIRE_ESM like node does.
 */
function assertScriptCanLoadAsCJS(filename) {
    if (!engineSupportsPackageTypeField)
        return;
    if (!assertScriptCanLoadAsCJSImpl)
        assertScriptCanLoadAsCJSImpl = require('../dist-raw/node-cjs-loader-utils').assertScriptCanLoadAsCJSImpl;
    assertScriptCanLoadAsCJSImpl(filename);
}
/**
 * Registered `ts-node` instance information.
 */
exports.REGISTER_INSTANCE = Symbol.for('ts-node.register.instance');
/**
 * @internal
 */
exports.INSPECT_CUSTOM = util.inspect.custom || 'inspect';
/**
 * Wrapper around yn module that returns `undefined` instead of `null`.
 * This is implemented by yn v4, but we're staying on v3 to avoid v4's node 10 requirement.
 */
function yn(value) {
    var _a;
    return (_a = ynModule(value)) !== null && _a !== void 0 ? _a : undefined;
}
/**
 * Debugging `ts-node`.
 */
const shouldDebug = yn(process.env.TS_NODE_DEBUG);
/** @internal */
exports.debug = shouldDebug ?
    (...args) => console.log(`[ts-node ${new Date().toISOString()}]`, ...args)
    : () => undefined;
const debugFn = shouldDebug ?
    (key, fn) => {
        let i = 0;
        return (x) => {
            exports.debug(key, x, ++i);
            return fn(x);
        };
    } :
    (_, fn) => fn;
/**
 * Export the current version.
 */
exports.VERSION = require('../package.json').version;
/**
 * Like `Object.assign`, but ignores `undefined` properties.
 */
function assign(initialValue, ...sources) {
    for (const source of sources) {
        for (const key of Object.keys(source)) {
            const value = source[key];
            if (value !== undefined)
                initialValue[key] = value;
        }
    }
    return initialValue;
}
/**
 * Default register options, including values specified via environment
 * variables.
 */
exports.DEFAULTS = {
    dir: process.env.TS_NODE_DIR,
    emit: yn(process.env.TS_NODE_EMIT),
    scope: yn(process.env.TS_NODE_SCOPE),
    files: yn(process.env.TS_NODE_FILES),
    pretty: yn(process.env.TS_NODE_PRETTY),
    compiler: process.env.TS_NODE_COMPILER,
    compilerOptions: parse(process.env.TS_NODE_COMPILER_OPTIONS),
    ignore: split(process.env.TS_NODE_IGNORE),
    project: process.env.TS_NODE_PROJECT,
    skipProject: yn(process.env.TS_NODE_SKIP_PROJECT),
    skipIgnore: yn(process.env.TS_NODE_SKIP_IGNORE),
    preferTsExts: yn(process.env.TS_NODE_PREFER_TS_EXTS),
    ignoreDiagnostics: split(process.env.TS_NODE_IGNORE_DIAGNOSTICS),
    transpileOnly: yn(process.env.TS_NODE_TRANSPILE_ONLY),
    typeCheck: yn(process.env.TS_NODE_TYPE_CHECK),
    compilerHost: yn(process.env.TS_NODE_COMPILER_HOST),
    logError: yn(process.env.TS_NODE_LOG_ERROR),
    experimentalEsmLoader: false
};
/**
 * TypeScript compiler option values required by `ts-node` which cannot be overridden.
 */
const TS_NODE_COMPILER_OPTIONS = {
    sourceMap: true,
    inlineSourceMap: false,
    inlineSources: true,
    declaration: false,
    noEmit: false,
    outDir: '.ts-node'
};
/**
 * Split a string array of values.
 */
function split(value) {
    return typeof value === 'string' ? value.split(/ *, */g) : undefined;
}
exports.split = split;
/**
 * Parse a string as JSON.
 */
function parse(value) {
    return typeof value === 'string' ? JSON.parse(value) : undefined;
}
exports.parse = parse;
/**
 * Replace backslashes with forward slashes.
 */
function normalizeSlashes(value) {
    return value.replace(/\\/g, '/');
}
exports.normalizeSlashes = normalizeSlashes;
/**
 * TypeScript diagnostics error.
 */
class TSError extends make_error_1.BaseError {
    constructor(diagnosticText, diagnosticCodes) {
        super(`⨯ Unable to compile TypeScript:\n${diagnosticText}`);
        this.diagnosticText = diagnosticText;
        this.diagnosticCodes = diagnosticCodes;
        this.name = 'TSError';
    }
    /**
     * @internal
     */
    [exports.INSPECT_CUSTOM]() {
        return this.diagnosticText;
    }
}
exports.TSError = TSError;
/**
 * Cached fs operation wrapper.
 */
function cachedLookup(fn) {
    const cache = new Map();
    return (arg) => {
        if (!cache.has(arg)) {
            cache.set(arg, fn(arg));
        }
        return cache.get(arg);
    };
}
/** @internal */
function getExtensions(config) {
    const tsExtensions = ['.ts'];
    const jsExtensions = [];
    // Enable additional extensions when JSX or `allowJs` is enabled.
    if (config.options.jsx)
        tsExtensions.push('.tsx');
    if (config.options.allowJs)
        jsExtensions.push('.js');
    if (config.options.jsx && config.options.allowJs)
        jsExtensions.push('.jsx');
    return { tsExtensions, jsExtensions };
}
exports.getExtensions = getExtensions;
/**
 * Register TypeScript compiler instance onto node.js
 */
function register(opts = {}) {
    const originalJsHandler = require.extensions['.js']; // tslint:disable-line
    const service = create(opts);
    const { tsExtensions, jsExtensions } = getExtensions(service.config);
    const extensions = [...tsExtensions, ...jsExtensions];
    // Expose registered instance globally.
    process[exports.REGISTER_INSTANCE] = service;
    // Register the extensions.
    registerExtensions(service.options.preferTsExts, extensions, service, originalJsHandler);
    module_1.Module._preloadModules(service.options.require);
    return service;
}
exports.register = register;
/**
 * Create TypeScript compiler instance.
 */
function create(rawOptions = {}) {
    var _a, _b;
    const dir = (_a = rawOptions.dir) !== null && _a !== void 0 ? _a : exports.DEFAULTS.dir;
    const compilerName = (_b = rawOptions.compiler) !== null && _b !== void 0 ? _b : exports.DEFAULTS.compiler;
    const cwd = dir ? path_1.resolve(dir) : process.cwd();
    /**
     * Load the typescript compiler. It is required to load the tsconfig but might
     * be changed by the tsconfig, so we sometimes have to do this twice.
     */
    function loadCompiler(name) {
        const compiler = require.resolve(name || 'typescript', { paths: [cwd, __dirname] });
        const ts = require(compiler);
        return { compiler, ts };
    }
    // Compute minimum options to read the config file.
    let { compiler, ts } = loadCompiler(compilerName);
    // Read config file and merge new options between env and CLI options.
    const { config, options: tsconfigOptions } = readConfig(cwd, ts, rawOptions);
    const options = assign({}, exports.DEFAULTS, tsconfigOptions || {}, rawOptions);
    options.require = [
        ...tsconfigOptions.require || [],
        ...rawOptions.require || []
    ];
    // If `compiler` option changed based on tsconfig, re-load the compiler.
    if (options.compiler !== compilerName) {
        ({ compiler, ts } = loadCompiler(options.compiler));
    }
    const readFile = options.readFile || ts.sys.readFile;
    const fileExists = options.fileExists || ts.sys.fileExists;
    // typeCheck can override transpileOnly, useful for CLI flag to override config file
    const transpileOnly = options.transpileOnly === true && options.typeCheck !== true;
    const transformers = options.transformers || undefined;
    const ignoreDiagnostics = [
        6059,
        18002,
        18003,
        ...(options.ignoreDiagnostics || [])
    ].map(Number);
    const configDiagnosticList = filterDiagnostics(config.errors, ignoreDiagnostics);
    const outputCache = new Map();
    const isScoped = options.scope ? (relname) => relname.charAt(0) !== '.' : () => true;
    const shouldIgnore = createIgnore(options.skipIgnore ? [] : (options.ignore || ['(?:^|/)node_modules/']).map(str => new RegExp(str)));
    const diagnosticHost = {
        getNewLine: () => ts.sys.newLine,
        getCurrentDirectory: () => cwd,
        getCanonicalFileName: ts.sys.useCaseSensitiveFileNames ? x => x : x => x.toLowerCase()
    };
    // Install source map support and read from memory cache.
    sourceMapSupport.install({
        environment: 'node',
        retrieveFile(pathOrUrl) {
            var _a;
            let path = pathOrUrl;
            // If it's a file URL, convert to local path
            // Note: fileURLToPath does not exist on early node v10
            // I could not find a way to handle non-URLs except to swallow an error
            if (options.experimentalEsmLoader && path.startsWith('file://')) {
                try {
                    path = url_1.fileURLToPath(path);
                }
                catch (e) { /* swallow error */ }
            }
            path = normalizeSlashes(path);
            return ((_a = outputCache.get(path)) === null || _a === void 0 ? void 0 : _a.content) || '';
        }
    });
    const formatDiagnostics = process.stdout.isTTY || options.pretty
        ? (ts.formatDiagnosticsWithColorAndContext || ts.formatDiagnostics)
        : ts.formatDiagnostics;
    function createTSError(diagnostics) {
        const diagnosticText = formatDiagnostics(diagnostics, diagnosticHost);
        const diagnosticCodes = diagnostics.map(x => x.code);
        return new TSError(diagnosticText, diagnosticCodes);
    }
    function reportTSError(configDiagnosticList) {
        const error = createTSError(configDiagnosticList);
        if (options.logError) {
            // Print error in red color and continue execution.
            console.error('\x1b[31m%s\x1b[0m', error);
        }
        else {
            // Throw error and exit the script.
            throw error;
        }
    }
    // Render the configuration errors.
    if (configDiagnosticList.length)
        reportTSError(configDiagnosticList);
    /**
     * Get the extension for a transpiled file.
     */
    const getExtension = config.options.jsx === ts.JsxEmit.Preserve ?
        ((path) => /\.[tj]sx$/.test(path) ? '.jsx' : '.js') :
        ((_) => '.js');
    /**
     * Create the basic required function using transpile mode.
     */
    let getOutput;
    let getTypeInfo;
    const getCanonicalFileName = ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames);
    // In a factory because these are shared across both CompilerHost and LanguageService codepaths
    function createResolverFunctions(serviceHost) {
        const moduleResolutionCache = ts.createModuleResolutionCache(cwd, getCanonicalFileName, config.options);
        const knownInternalFilenames = new Set();
        /** "Buckets" (module directories) whose contents should be marked "internal" */
        const internalBuckets = new Set();
        // Get bucket for a source filename.  Bucket is the containing `./node_modules/*/` directory
        // For '/project/node_modules/foo/node_modules/bar/lib/index.js' bucket is '/project/node_modules/foo/node_modules/bar/'
        // For '/project/node_modules/foo/node_modules/@scope/bar/lib/index.js' bucket is '/project/node_modules/foo/node_modules/@scope/bar/'
        const moduleBucketRe = /.*\/node_modules\/(?:@[^\/]+\/)?[^\/]+\//;
        function getModuleBucket(filename) {
            const find = moduleBucketRe.exec(filename);
            if (find)
                return find[0];
            return '';
        }
        // Mark that this file and all siblings in its bucket should be "internal"
        function markBucketOfFilenameInternal(filename) {
            internalBuckets.add(getModuleBucket(filename));
        }
        function isFileInInternalBucket(filename) {
            return internalBuckets.has(getModuleBucket(filename));
        }
        function isFileKnownToBeInternal(filename) {
            return knownInternalFilenames.has(filename);
        }
        /**
         * If we need to emit JS for a file, force TS to consider it non-external
         */
        const fixupResolvedModule = (resolvedModule) => {
            const { resolvedFileName } = resolvedModule;
            if (resolvedFileName === undefined)
                return;
            // .ts is always switched to internal
            // .js is switched on-demand
            if (resolvedModule.isExternalLibraryImport && ((resolvedFileName.endsWith('.ts') && !resolvedFileName.endsWith('.d.ts')) ||
                isFileKnownToBeInternal(resolvedFileName) ||
                isFileInInternalBucket(resolvedFileName))) {
                resolvedModule.isExternalLibraryImport = false;
            }
            if (!resolvedModule.isExternalLibraryImport) {
                knownInternalFilenames.add(resolvedFileName);
            }
        };
        /*
         * NOTE:
         * Older ts versions do not pass `redirectedReference` nor `options`.
         * We must pass `redirectedReference` to newer ts versions, but cannot rely on `options`, hence the weird argument name
         */
        const resolveModuleNames = (moduleNames, containingFile, reusedNames, redirectedReference, optionsOnlyWithNewerTsVersions) => {
            return moduleNames.map(moduleName => {
                const { resolvedModule } = ts.resolveModuleName(moduleName, containingFile, config.options, serviceHost, moduleResolutionCache, redirectedReference);
                if (resolvedModule) {
                    fixupResolvedModule(resolvedModule);
                }
                return resolvedModule;
            });
        };
        // language service never calls this, but TS docs recommend that we implement it
        const getResolvedModuleWithFailedLookupLocationsFromCache = (moduleName, containingFile) => {
            const ret = ts.resolveModuleNameFromCache(moduleName, containingFile, moduleResolutionCache);
            if (ret && ret.resolvedModule) {
                fixupResolvedModule(ret.resolvedModule);
            }
            return ret;
        };
        const resolveTypeReferenceDirectives = (typeDirectiveNames, containingFile, redirectedReference, options) => {
            // Note: seems to be called with empty typeDirectiveNames array for all files.
            return typeDirectiveNames.map(typeDirectiveName => {
                const { resolvedTypeReferenceDirective } = ts.resolveTypeReferenceDirective(typeDirectiveName, containingFile, config.options, serviceHost, redirectedReference);
                if (resolvedTypeReferenceDirective) {
                    fixupResolvedModule(resolvedTypeReferenceDirective);
                }
                return resolvedTypeReferenceDirective;
            });
        };
        return {
            resolveModuleNames,
            getResolvedModuleWithFailedLookupLocationsFromCache,
            resolveTypeReferenceDirectives,
            isFileKnownToBeInternal,
            markBucketOfFilenameInternal
        };
    }
    // Use full language services when the fast option is disabled.
    if (!transpileOnly) {
        const fileContents = new Map();
        const rootFileNames = new Set(config.fileNames);
        const cachedReadFile = cachedLookup(debugFn('readFile', readFile));
        // Use language services by default (TODO: invert next major version).
        if (!options.compilerHost) {
            let projectVersion = 1;
            const fileVersions = new Map(Array.from(rootFileNames).map(fileName => [fileName, 0]));
            const getCustomTransformers = () => {
                if (typeof transformers === 'function') {
                    const program = service.getProgram();
                    return program ? transformers(program) : undefined;
                }
                return transformers;
            };
            // Create the compiler host for type checking.
            const serviceHost = {
                getProjectVersion: () => String(projectVersion),
                getScriptFileNames: () => Array.from(rootFileNames),
                getScriptVersion: (fileName) => {
                    const version = fileVersions.get(fileName);
                    return version ? version.toString() : '';
                },
                getScriptSnapshot(fileName) {
                    // TODO ordering of this with getScriptVersion?  Should they sync up?
                    let contents = fileContents.get(fileName);
                    // Read contents into TypeScript memory cache.
                    if (contents === undefined) {
                        contents = cachedReadFile(fileName);
                        if (contents === undefined)
                            return;
                        fileVersions.set(fileName, 1);
                        fileContents.set(fileName, contents);
                        projectVersion++;
                    }
                    return ts.ScriptSnapshot.fromString(contents);
                },
                readFile: cachedReadFile,
                readDirectory: ts.sys.readDirectory,
                getDirectories: cachedLookup(debugFn('getDirectories', ts.sys.getDirectories)),
                fileExists: cachedLookup(debugFn('fileExists', fileExists)),
                directoryExists: cachedLookup(debugFn('directoryExists', ts.sys.directoryExists)),
                realpath: ts.sys.realpath ? cachedLookup(debugFn('realpath', ts.sys.realpath)) : undefined,
                getNewLine: () => ts.sys.newLine,
                useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
                getCurrentDirectory: () => cwd,
                getCompilationSettings: () => config.options,
                getDefaultLibFileName: () => ts.getDefaultLibFilePath(config.options),
                getCustomTransformers: getCustomTransformers
            };
            const { resolveModuleNames, getResolvedModuleWithFailedLookupLocationsFromCache, resolveTypeReferenceDirectives, isFileKnownToBeInternal, markBucketOfFilenameInternal } = createResolverFunctions(serviceHost);
            serviceHost.resolveModuleNames = resolveModuleNames;
            serviceHost.getResolvedModuleWithFailedLookupLocationsFromCache = getResolvedModuleWithFailedLookupLocationsFromCache;
            serviceHost.resolveTypeReferenceDirectives = resolveTypeReferenceDirectives;
            const registry = ts.createDocumentRegistry(ts.sys.useCaseSensitiveFileNames, cwd);
            const service = ts.createLanguageService(serviceHost, registry);
            const updateMemoryCache = (contents, fileName) => {
                // Add to `rootFiles` as necessary, either to make TS include a file it has not seen,
                // or to trigger a re-classification of files from external to internal.
                if (!rootFileNames.has(fileName) && !isFileKnownToBeInternal(fileName)) {
                    markBucketOfFilenameInternal(fileName);
                    rootFileNames.add(fileName);
                    // Increment project version for every change to rootFileNames.
                    projectVersion++;
                }
                const previousVersion = fileVersions.get(fileName) || 0;
                const previousContents = fileContents.get(fileName);
                // Avoid incrementing cache when nothing has changed.
                if (contents !== previousContents) {
                    fileVersions.set(fileName, previousVersion + 1);
                    fileContents.set(fileName, contents);
                    // Increment project version for every file change.
                    projectVersion++;
                }
            };
            let previousProgram = undefined;
            getOutput = (code, fileName) => {
                updateMemoryCache(code, fileName);
                const programBefore = service.getProgram();
                if (programBefore !== previousProgram) {
                    exports.debug(`compiler rebuilt Program instance when getting output for ${fileName}`);
                }
                const output = service.getEmitOutput(fileName);
                // Get the relevant diagnostics - this is 3x faster than `getPreEmitDiagnostics`.
                const diagnostics = service.getSemanticDiagnostics(fileName)
                    .concat(service.getSyntacticDiagnostics(fileName));
                const programAfter = service.getProgram();
                exports.debug('invariant: Is service.getProject() identical before and after getting emit output and diagnostics? (should always be true) ', programBefore === programAfter);
                previousProgram = programAfter;
                const diagnosticList = filterDiagnostics(diagnostics, ignoreDiagnostics);
                if (diagnosticList.length)
                    reportTSError(diagnosticList);
                if (output.emitSkipped) {
                    throw new TypeError(`${path_1.relative(cwd, fileName)}: Emit skipped`);
                }
                // Throw an error when requiring `.d.ts` files.
                if (output.outputFiles.length === 0) {
                    throw new TypeError(`Unable to require file: ${path_1.relative(cwd, fileName)}\n` +
                        'This is usually the result of a faulty configuration or import. ' +
                        'Make sure there is a `.js`, `.json` or other executable extension with ' +
                        'loader attached before `ts-node` available.');
                }
                return [output.outputFiles[1].text, output.outputFiles[0].text];
            };
            getTypeInfo = (code, fileName, position) => {
                updateMemoryCache(code, fileName);
                const info = service.getQuickInfoAtPosition(fileName, position);
                const name = ts.displayPartsToString(info ? info.displayParts : []);
                const comment = ts.displayPartsToString(info ? info.documentation : []);
                return { name, comment };
            };
        }
        else {
            const sys = Object.assign(Object.assign(Object.assign({}, ts.sys), diagnosticHost), { readFile: (fileName) => {
                    const cacheContents = fileContents.get(fileName);
                    if (cacheContents !== undefined)
                        return cacheContents;
                    const contents = cachedReadFile(fileName);
                    if (contents)
                        fileContents.set(fileName, contents);
                    return contents;
                }, readDirectory: ts.sys.readDirectory, getDirectories: cachedLookup(debugFn('getDirectories', ts.sys.getDirectories)), fileExists: cachedLookup(debugFn('fileExists', fileExists)), directoryExists: cachedLookup(debugFn('directoryExists', ts.sys.directoryExists)), resolvePath: cachedLookup(debugFn('resolvePath', ts.sys.resolvePath)), realpath: ts.sys.realpath ? cachedLookup(debugFn('realpath', ts.sys.realpath)) : undefined });
            const host = ts.createIncrementalCompilerHost
                ? ts.createIncrementalCompilerHost(config.options, sys)
                : Object.assign(Object.assign({}, sys), { getSourceFile: (fileName, languageVersion) => {
                        const contents = sys.readFile(fileName);
                        if (contents === undefined)
                            return;
                        return ts.createSourceFile(fileName, contents, languageVersion);
                    }, getDefaultLibLocation: () => normalizeSlashes(path_1.dirname(compiler)), getDefaultLibFileName: () => normalizeSlashes(path_1.join(path_1.dirname(compiler), ts.getDefaultLibFileName(config.options))), useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames });
            const { resolveModuleNames, resolveTypeReferenceDirectives, isFileKnownToBeInternal, markBucketOfFilenameInternal } = createResolverFunctions(host);
            host.resolveModuleNames = resolveModuleNames;
            host.resolveTypeReferenceDirectives = resolveTypeReferenceDirectives;
            // Fallback for older TypeScript releases without incremental API.
            let builderProgram = ts.createIncrementalProgram
                ? ts.createIncrementalProgram({
                    rootNames: Array.from(rootFileNames),
                    options: config.options,
                    host: host,
                    configFileParsingDiagnostics: config.errors,
                    projectReferences: config.projectReferences
                })
                : ts.createEmitAndSemanticDiagnosticsBuilderProgram(Array.from(rootFileNames), config.options, host, undefined, config.errors, config.projectReferences);
            // Read and cache custom transformers.
            const customTransformers = typeof transformers === 'function'
                ? transformers(builderProgram.getProgram())
                : transformers;
            // Set the file contents into cache manually.
            const updateMemoryCache = (contents, fileName) => {
                const previousContents = fileContents.get(fileName);
                const contentsChanged = previousContents !== contents;
                if (contentsChanged) {
                    fileContents.set(fileName, contents);
                }
                // Add to `rootFiles` when discovered by compiler for the first time.
                let addedToRootFileNames = false;
                if (!rootFileNames.has(fileName) && !isFileKnownToBeInternal(fileName)) {
                    markBucketOfFilenameInternal(fileName);
                    rootFileNames.add(fileName);
                    addedToRootFileNames = true;
                }
                // Update program when file changes.
                if (addedToRootFileNames || contentsChanged) {
                    builderProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram(Array.from(rootFileNames), config.options, host, builderProgram, config.errors, config.projectReferences);
                }
            };
            getOutput = (code, fileName) => {
                const output = ['', ''];
                updateMemoryCache(code, fileName);
                const sourceFile = builderProgram.getSourceFile(fileName);
                if (!sourceFile)
                    throw new TypeError(`Unable to read file: ${fileName}`);
                const program = builderProgram.getProgram();
                const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);
                const diagnosticList = filterDiagnostics(diagnostics, ignoreDiagnostics);
                if (diagnosticList.length)
                    reportTSError(diagnosticList);
                const result = builderProgram.emit(sourceFile, (path, file, writeByteOrderMark) => {
                    if (path.endsWith('.map')) {
                        output[1] = file;
                    }
                    else {
                        output[0] = file;
                    }
                    if (options.emit)
                        sys.writeFile(path, file, writeByteOrderMark);
                }, undefined, undefined, customTransformers);
                if (result.emitSkipped) {
                    throw new TypeError(`${path_1.relative(cwd, fileName)}: Emit skipped`);
                }
                // Throw an error when requiring files that cannot be compiled.
                if (output[0] === '') {
                    if (program.isSourceFileFromExternalLibrary(sourceFile)) {
                        throw new TypeError(`Unable to compile file from external library: ${path_1.relative(cwd, fileName)}`);
                    }
                    throw new TypeError(`Unable to require file: ${path_1.relative(cwd, fileName)}\n` +
                        'This is usually the result of a faulty configuration or import. ' +
                        'Make sure there is a `.js`, `.json` or other executable extension with ' +
                        'loader attached before `ts-node` available.');
                }
                return output;
            };
            getTypeInfo = (code, fileName, position) => {
                updateMemoryCache(code, fileName);
                const sourceFile = builderProgram.getSourceFile(fileName);
                if (!sourceFile)
                    throw new TypeError(`Unable to read file: ${fileName}`);
                const node = getTokenAtPosition(ts, sourceFile, position);
                const checker = builderProgram.getProgram().getTypeChecker();
                const symbol = checker.getSymbolAtLocation(node);
                if (!symbol)
                    return { name: '', comment: '' };
                const type = checker.getTypeOfSymbolAtLocation(symbol, node);
                const signatures = [...type.getConstructSignatures(), ...type.getCallSignatures()];
                return {
                    name: signatures.length ? signatures.map(x => checker.signatureToString(x)).join('\n') : checker.typeToString(type),
                    comment: ts.displayPartsToString(symbol ? symbol.getDocumentationComment(checker) : [])
                };
            };
            // Write `.tsbuildinfo` when `--build` is enabled.
            if (options.emit && config.options.incremental) {
                process.on('exit', () => {
                    // Emits `.tsbuildinfo` to filesystem.
                    builderProgram.getProgram().emitBuildInfo();
                });
            }
        }
    }
    else {
        if (typeof transformers === 'function') {
            throw new TypeError('Transformers function is unavailable in "--transpile-only"');
        }
        getOutput = (code, fileName) => {
            const result = ts.transpileModule(code, {
                fileName,
                compilerOptions: config.options,
                reportDiagnostics: true,
                transformers: transformers
            });
            const diagnosticList = filterDiagnostics(result.diagnostics || [], ignoreDiagnostics);
            if (diagnosticList.length)
                reportTSError(diagnosticList);
            return [result.outputText, result.sourceMapText];
        };
        getTypeInfo = () => {
            throw new TypeError('Type information is unavailable in "--transpile-only"');
        };
    }
    // Create a simple TypeScript compiler proxy.
    function compile(code, fileName, lineOffset = 0) {
        const normalizedFileName = normalizeSlashes(fileName);
        const [value, sourceMap] = getOutput(code, normalizedFileName);
        const output = updateOutput(value, normalizedFileName, sourceMap, getExtension);
        outputCache.set(normalizedFileName, { content: output });
        return output;
    }
    let active = true;
    const enabled = (enabled) => enabled === undefined ? active : (active = !!enabled);
    const extensions = getExtensions(config);
    const ignored = (fileName) => {
        if (!active)
            return true;
        const ext = path_1.extname(fileName);
        if (extensions.tsExtensions.includes(ext) || extensions.jsExtensions.includes(ext)) {
            const relname = path_1.relative(cwd, fileName);
            return !isScoped(relname) || shouldIgnore(relname);
        }
        return true;
    };
    return { ts, config, compile, getTypeInfo, ignored, enabled, options };
}
exports.create = create;
/**
 * Check if the filename should be ignored.
 */
function createIgnore(ignore) {
    return (relname) => {
        const path = normalizeSlashes(relname);
        return ignore.some(x => x.test(path));
    };
}
/**
 * "Refreshes" an extension on `require.extensions`.
 *
 * @param {string} ext
 */
function reorderRequireExtension(ext) {
    const old = require.extensions[ext]; // tslint:disable-line
    delete require.extensions[ext]; // tslint:disable-line
    require.extensions[ext] = old; // tslint:disable-line
}
/**
 * Register the extensions to support when importing files.
 */
function registerExtensions(preferTsExts, extensions, service, originalJsHandler) {
    // Register new extensions.
    for (const ext of extensions) {
        registerExtension(ext, service, originalJsHandler);
    }
    if (preferTsExts) {
        // tslint:disable-next-line
        const preferredExtensions = new Set([...extensions, ...Object.keys(require.extensions)]);
        for (const ext of preferredExtensions)
            reorderRequireExtension(ext);
    }
}
/**
 * Register the extension for node.
 */
function registerExtension(ext, service, originalHandler) {
    const old = require.extensions[ext] || originalHandler; // tslint:disable-line
    require.extensions[ext] = function (m, filename) {
        if (service.ignored(filename))
            return old(m, filename);
        if (service.options.experimentalEsmLoader) {
            assertScriptCanLoadAsCJS(filename);
        }
        const _compile = m._compile;
        m._compile = function (code, fileName) {
            exports.debug('module._compile', fileName);
            return _compile.call(this, service.compile(code, fileName), fileName);
        };
        return old(m, filename);
    };
}
/**
 * Do post-processing on config options to support `ts-node`.
 */
function fixConfig(ts, config) {
    // Delete options that *should not* be passed through.
    delete config.options.out;
    delete config.options.outFile;
    delete config.options.composite;
    delete config.options.declarationDir;
    delete config.options.declarationMap;
    delete config.options.emitDeclarationOnly;
    // Target ES5 output by default (instead of ES3).
    if (config.options.target === undefined) {
        config.options.target = ts.ScriptTarget.ES5;
    }
    // Target CommonJS modules by default (instead of magically switching to ES6 when the target is ES6).
    if (config.options.module === undefined) {
        config.options.module = ts.ModuleKind.CommonJS;
    }
    return config;
}
/**
 * Load TypeScript configuration. Returns the parsed TypeScript config and
 * any `ts-node` options specified in the config file.
 */
function readConfig(cwd, ts, rawOptions) {
    var _a, _b;
    let config = { compilerOptions: {} };
    let basePath = cwd;
    let configFileName = undefined;
    const { fileExists = ts.sys.fileExists, readFile = ts.sys.readFile, skipProject = exports.DEFAULTS.skipProject, project = exports.DEFAULTS.project } = rawOptions;
    // Read project configuration when available.
    if (!skipProject) {
        configFileName = project
            ? path_1.resolve(cwd, project)
            : ts.findConfigFile(cwd, fileExists);
        if (configFileName) {
            const result = ts.readConfigFile(configFileName, readFile);
            // Return diagnostics.
            if (result.error) {
                return {
                    config: { errors: [result.error], fileNames: [], options: {} },
                    options: {}
                };
            }
            config = result.config;
            basePath = path_1.dirname(configFileName);
        }
    }
    // Fix ts-node options that come from tsconfig.json
    const tsconfigOptions = Object.assign({}, config['ts-node']);
    // Remove resolution of "files".
    const files = (_b = (_a = rawOptions.files) !== null && _a !== void 0 ? _a : tsconfigOptions.files) !== null && _b !== void 0 ? _b : exports.DEFAULTS.files;
    if (!files) {
        config.files = [];
        config.include = [];
    }
    // Override default configuration options `ts-node` requires.
    config.compilerOptions = Object.assign({}, config.compilerOptions, exports.DEFAULTS.compilerOptions, tsconfigOptions.compilerOptions, rawOptions.compilerOptions, TS_NODE_COMPILER_OPTIONS);
    const fixedConfig = fixConfig(ts, ts.parseJsonConfigFileContent(config, {
        fileExists,
        readFile,
        readDirectory: ts.sys.readDirectory,
        useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames
    }, basePath, undefined, configFileName));
    if (tsconfigOptions.require) {
        // Modules are found relative to the tsconfig file, not the `dir` option
        const tsconfigRelativeRequire = createRequire(configFileName);
        tsconfigOptions.require = tsconfigOptions.require.map((path) => {
            return tsconfigRelativeRequire.resolve(path);
        });
    }
    return { config: fixedConfig, options: tsconfigOptions };
}
/**
 * Update the output remapping the source map.
 */
function updateOutput(outputText, fileName, sourceMap, getExtension) {
    const base64Map = Buffer.from(updateSourceMap(sourceMap, fileName), 'utf8').toString('base64');
    const sourceMapContent = `data:application/json;charset=utf-8;base64,${base64Map}`;
    const sourceMapLength = `${path_1.basename(fileName)}.map`.length + (getExtension(fileName).length - path_1.extname(fileName).length);
    return outputText.slice(0, -sourceMapLength) + sourceMapContent;
}
/**
 * Update the source map contents for improved output.
 */
function updateSourceMap(sourceMapText, fileName) {
    const sourceMap = JSON.parse(sourceMapText);
    sourceMap.file = fileName;
    sourceMap.sources = [fileName];
    delete sourceMap.sourceRoot;
    return JSON.stringify(sourceMap);
}
/**
 * Filter diagnostics.
 */
function filterDiagnostics(diagnostics, ignore) {
    return diagnostics.filter(x => ignore.indexOf(x.code) === -1);
}
/**
 * Get token at file position.
 *
 * Reference: https://github.com/microsoft/TypeScript/blob/fcd9334f57d85b73dd66ad2d21c02e84822f4841/src/services/utilities.ts#L705-L731
 */
function getTokenAtPosition(ts, sourceFile, position) {
    let current = sourceFile;
    outer: while (true) {
        for (const child of current.getChildren(sourceFile)) {
            const start = child.getFullStart();
            if (start > position)
                break;
            const end = child.getEnd();
            if (position <= end) {
                current = child;
                continue outer;
            }
        }
        return current;
    }
}
//# sourceMappingURL=index.js.map