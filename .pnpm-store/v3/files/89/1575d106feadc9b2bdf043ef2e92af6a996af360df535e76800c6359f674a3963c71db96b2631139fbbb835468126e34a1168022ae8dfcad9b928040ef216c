import { BaseError } from 'make-error';
import type * as _ts from 'typescript';
export { createRepl, CreateReplOptions, ReplService } from './repl';
/**
 * Registered `ts-node` instance information.
 */
export declare const REGISTER_INSTANCE: unique symbol;
/**
 * Expose `REGISTER_INSTANCE` information on node.js `process`.
 */
declare global {
    namespace NodeJS {
        interface Process {
            [REGISTER_INSTANCE]?: Service;
        }
    }
}
/**
 * Common TypeScript interfaces between versions.
 */
export interface TSCommon {
    version: typeof _ts.version;
    sys: typeof _ts.sys;
    ScriptSnapshot: typeof _ts.ScriptSnapshot;
    displayPartsToString: typeof _ts.displayPartsToString;
    createLanguageService: typeof _ts.createLanguageService;
    getDefaultLibFilePath: typeof _ts.getDefaultLibFilePath;
    getPreEmitDiagnostics: typeof _ts.getPreEmitDiagnostics;
    flattenDiagnosticMessageText: typeof _ts.flattenDiagnosticMessageText;
    transpileModule: typeof _ts.transpileModule;
    ModuleKind: typeof _ts.ModuleKind;
    ScriptTarget: typeof _ts.ScriptTarget;
    findConfigFile: typeof _ts.findConfigFile;
    readConfigFile: typeof _ts.readConfigFile;
    parseJsonConfigFileContent: typeof _ts.parseJsonConfigFileContent;
    formatDiagnostics: typeof _ts.formatDiagnostics;
    formatDiagnosticsWithColorAndContext: typeof _ts.formatDiagnosticsWithColorAndContext;
}
/**
 * Export the current version.
 */
export declare const VERSION: any;
/**
 * Options for creating a new TypeScript compiler instance.
 */
export interface CreateOptions {
    /**
     * Specify working directory for config resolution.
     *
     * @default process.cwd()
     */
    dir?: string;
    /**
     * Emit output files into `.ts-node` directory.
     *
     * @default false
     */
    emit?: boolean;
    /**
     * Scope compiler to files within `cwd`.
     *
     * @default false
     */
    scope?: boolean;
    /**
     * Use pretty diagnostic formatter.
     *
     * @default false
     */
    pretty?: boolean;
    /**
     * Use TypeScript's faster `transpileModule`.
     *
     * @default false
     */
    transpileOnly?: boolean;
    /**
     * **DEPRECATED** Specify type-check is enabled (e.g. `transpileOnly == false`).
     *
     * @default true
     */
    typeCheck?: boolean;
    /**
     * Use TypeScript's compiler host API.
     *
     * @default false
     */
    compilerHost?: boolean;
    /**
     * Logs TypeScript errors to stderr instead of throwing exceptions.
     *
     * @default false
     */
    logError?: boolean;
    /**
     * Load files from `tsconfig.json` on startup.
     *
     * @default false
     */
    files?: boolean;
    /**
     * Specify a custom TypeScript compiler.
     *
     * @default "typescript"
     */
    compiler?: string;
    /**
     * Override the path patterns to skip compilation.
     *
     * @default /node_modules/
     * @docsDefault "/node_modules/"
     */
    ignore?: string[];
    /**
     * Path to TypeScript JSON project file.
     */
    project?: string;
    /**
     * Skip project config resolution and loading.
     *
     * @default false
     */
    skipProject?: boolean;
    /**
     * Skip ignore check.
     *
     * @default false
     */
    skipIgnore?: boolean;
    /**
     * JSON object to merge with compiler options.
     *
     * @allOf [{"$ref": "https://schemastore.azurewebsites.net/schemas/json/tsconfig.json#definitions/compilerOptionsDefinition/properties/compilerOptions"}]
     */
    compilerOptions?: object;
    /**
     * Ignore TypeScript warnings by diagnostic code.
     */
    ignoreDiagnostics?: Array<number | string>;
    /**
     * Modules to require, like node's `--require` flag.
     *
     * If specified in tsconfig.json, the modules will be resolved relative to the tsconfig.json file.
     *
     * If specified programmatically, each input string should be pre-resolved to an absolute path for
     * best results.
     */
    require?: Array<string>;
    readFile?: (path: string) => string | undefined;
    fileExists?: (path: string) => boolean;
    transformers?: _ts.CustomTransformers | ((p: _ts.Program) => _ts.CustomTransformers);
}
/**
 * Options for registering a TypeScript compiler instance globally.
 */
export interface RegisterOptions extends CreateOptions {
    /**
     * Re-order file extensions so that TypeScript imports are preferred.
     *
     * @default false
     */
    preferTsExts?: boolean;
}
/**
 * Must be an interface to support `typescript-json-schema`.
 */
export interface TsConfigOptions extends Omit<RegisterOptions, 'transformers' | 'readFile' | 'fileExists' | 'skipProject' | 'project' | 'dir'> {
}
/**
 * Information retrieved from type info check.
 */
export interface TypeInfo {
    name: string;
    comment: string;
}
/**
 * Default register options, including values specified via environment
 * variables.
 */
export declare const DEFAULTS: RegisterOptions;
/**
 * Split a string array of values.
 */
export declare function split(value: string | undefined): string[] | undefined;
/**
 * Parse a string as JSON.
 */
export declare function parse(value: string | undefined): object | undefined;
/**
 * Replace backslashes with forward slashes.
 */
export declare function normalizeSlashes(value: string): string;
/**
 * TypeScript diagnostics error.
 */
export declare class TSError extends BaseError {
    diagnosticText: string;
    diagnosticCodes: number[];
    name: string;
    constructor(diagnosticText: string, diagnosticCodes: number[]);
}
/**
 * Primary ts-node service, which wraps the TypeScript API and can compile TypeScript to JavaScript
 */
export interface Service {
    ts: TSCommon;
    config: _ts.ParsedCommandLine;
    options: RegisterOptions;
    enabled(enabled?: boolean): boolean;
    ignored(fileName: string): boolean;
    compile(code: string, fileName: string, lineOffset?: number): string;
    getTypeInfo(code: string, fileName: string, position: number): TypeInfo;
}
/**
 * Re-export of `Service` interface for backwards-compatibility
 * @deprecated use `Service` instead
 * @see Service
 */
export declare type Register = Service;
/**
 * Register TypeScript compiler instance onto node.js
 */
export declare function register(opts?: RegisterOptions): Service;
/**
 * Create TypeScript compiler instance.
 */
export declare function create(rawOptions?: CreateOptions): Service;
