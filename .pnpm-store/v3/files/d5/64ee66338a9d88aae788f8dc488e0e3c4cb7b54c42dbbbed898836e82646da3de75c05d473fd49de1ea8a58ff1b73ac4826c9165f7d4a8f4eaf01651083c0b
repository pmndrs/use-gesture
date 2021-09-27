"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("@tsd/typescript");
/**
 * Load the configuration settings.
 *
 * @param pkg - The package.json object.
 * @returns The config object.
 */
exports.default = (pkg, cwd) => {
    const pkgConfig = pkg.tsd || {};
    const tsConfigCompilerOptions = getOptionsFromTsConfig(cwd);
    const packageJsonCompilerOptions = parseCompilerConfigObject(pkgConfig.compilerOptions || {}, cwd);
    return Object.assign(Object.assign({ directory: 'test-d' }, pkgConfig), { compilerOptions: Object.assign(Object.assign(Object.assign({ strict: true, jsx: typescript_1.JsxEmit.React, lib: parseRawLibs(['es2017', 'dom', 'dom.iterable'], cwd), module: typescript_1.ModuleKind.CommonJS, target: typescript_1.ScriptTarget.ES2017, esModuleInterop: true }, tsConfigCompilerOptions), packageJsonCompilerOptions), { moduleResolution: typescript_1.ModuleResolutionKind.NodeJs, skipLibCheck: false }) });
};
function getOptionsFromTsConfig(cwd) {
    const configPath = typescript_1.findConfigFile(cwd, typescript_1.sys.fileExists);
    if (!configPath) {
        return {};
    }
    return typescript_1.parseJsonSourceFileConfigFileContent(typescript_1.readJsonConfigFile(configPath, typescript_1.sys.readFile), typescript_1.sys, cwd, undefined, configPath).options;
}
function parseCompilerConfigObject(compilerOptions, cwd) {
    return typescript_1.parseJsonConfigFileContent({ compilerOptions: compilerOptions || {} }, typescript_1.sys, cwd).options;
}
function parseRawLibs(libs, cwd) {
    return parseCompilerConfigObject({ lib: libs }, cwd).lib || [];
}
