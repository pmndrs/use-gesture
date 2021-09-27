"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const readPkgUp = require("read-pkg-up");
const pathExists = require("path-exists");
const globby = require("globby");
const compiler_1 = require("./compiler");
const config_1 = require("./config");
const rules_1 = require("./rules");
const findTypingsFile = (pkg, options) => __awaiter(void 0, void 0, void 0, function* () {
    const typings = options.typingsFile ||
        pkg.types ||
        pkg.typings ||
        (pkg.main && path.parse(pkg.main).name + '.d.ts') ||
        'index.d.ts';
    const typingsExist = yield pathExists(path.join(options.cwd, typings));
    if (!typingsExist) {
        throw new Error(`The type definition \`${typings}\` does not exist. Create one and try again.`);
    }
    return typings;
});
const normalizeTypingsFilePath = (typingsFilePath, options) => {
    if (options.typingsFile) {
        return path.basename(typingsFilePath);
    }
    return typingsFilePath;
};
const findCustomTestFiles = (testFilesPattern, cwd) => __awaiter(void 0, void 0, void 0, function* () {
    const testFiles = yield globby(testFilesPattern, { cwd });
    if (testFiles.length === 0) {
        throw new Error('Could not find any test files. Create one and try again');
    }
    return testFiles.map(file => path.join(cwd, file));
});
const findTestFiles = (typingsFilePath, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = options.testFiles) === null || _a === void 0 ? void 0 : _a.length) {
        return findCustomTestFiles(options.testFiles, options.cwd);
    }
    // Return only the filename if the `typingsFile` option is used.
    const typingsFile = normalizeTypingsFilePath(typingsFilePath, options);
    const testFile = typingsFile.replace(/\.d\.ts$/, '.test-d.ts');
    const tsxTestFile = typingsFile.replace(/\.d\.ts$/, '.test-d.tsx');
    const testDir = options.config.directory;
    let testFiles = yield globby([testFile, tsxTestFile], { cwd: options.cwd });
    const testDirExists = yield pathExists(path.join(options.cwd, testDir));
    if (testFiles.length === 0 && !testDirExists) {
        throw new Error(`The test file \`${testFile}\` or \`${tsxTestFile}\` does not exist. Create one and try again.`);
    }
    if (testFiles.length === 0) {
        testFiles = yield globby([`${testDir}/**/*.ts`, `${testDir}/**/*.tsx`], { cwd: options.cwd });
    }
    return testFiles.map(fileName => path.join(options.cwd, fileName));
});
/**
 * Type check the type definition of the project.
 *
 * @returns A promise which resolves the diagnostics of the type definition.
 */
exports.default = (options = { cwd: process.cwd() }) => __awaiter(void 0, void 0, void 0, function* () {
    const pkgResult = yield readPkgUp({ cwd: options.cwd });
    if (!pkgResult) {
        throw new Error('No `package.json` file found. Make sure you are running the command in a Node.js project.');
    }
    const pkg = pkgResult.packageJson;
    const config = config_1.default(pkg, options.cwd);
    // Look for a typings file, otherwise use `index.d.ts` in the root directory. If the file is not found, throw an error.
    const typingsFile = yield findTypingsFile(pkg, options);
    const testFiles = yield findTestFiles(typingsFile, Object.assign(Object.assign({}, options), { config }));
    const context = {
        cwd: options.cwd,
        pkg,
        typingsFile,
        testFiles,
        config
    };
    return [
        ...rules_1.default(context),
        ...compiler_1.getDiagnostics(context)
    ];
});
