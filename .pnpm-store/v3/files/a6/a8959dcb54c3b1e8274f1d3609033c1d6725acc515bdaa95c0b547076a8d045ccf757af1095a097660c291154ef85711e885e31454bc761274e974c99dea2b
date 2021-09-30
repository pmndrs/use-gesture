import { __awaiter, __generator } from 'tslib';
import { isValidPath, parseGraphQLSDL } from '@graphql-tools/utils/es5';
import { isAbsolute, resolve } from 'path';
import { promises, accessSync, readFileSync } from 'fs';
import { cwd } from 'process';
import { processImport } from '@graphql-tools/import/es5';

var readFile = promises.readFile, access = promises.access;
var FILE_EXTENSIONS = ['.gql', '.gqls', '.graphql', '.graphqls'];
function isGraphQLImportFile(rawSDL) {
    var trimmedRawSDL = rawSDL.trim();
    return trimmedRawSDL.startsWith('# import') || trimmedRawSDL.startsWith('#import');
}
/**
 * This loader loads documents and type definitions from `.graphql` files.
 *
 * You can load a single source:
 *
 * ```js
 * const schema = await loadSchema('schema.graphql', {
 *   loaders: [
 *     new GraphQLFileLoader()
 *   ]
 * });
 * ```
 *
 * Or provide a glob pattern to load multiple sources:
 *
 * ```js
 * const schema = await loadSchema('graphql/*.graphql', {
 *   loaders: [
 *     new GraphQLFileLoader()
 *   ]
 * });
 * ```
 */
var GraphQLFileLoader = /** @class */ (function () {
    function GraphQLFileLoader() {
    }
    GraphQLFileLoader.prototype.loaderId = function () {
        return 'graphql-file';
    };
    GraphQLFileLoader.prototype.canLoad = function (pointer, options) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedFilePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isValidPath(pointer)) return [3 /*break*/, 4];
                        if (!FILE_EXTENSIONS.find(function (extension) { return pointer.endsWith(extension); })) return [3 /*break*/, 4];
                        normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, access(normalizedFilePath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    GraphQLFileLoader.prototype.canLoadSync = function (pointer, options) {
        if (isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(function (extension) { return pointer.endsWith(extension); })) {
                var normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
                try {
                    accessSync(normalizedFilePath);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
        }
        return false;
    };
    GraphQLFileLoader.prototype.load = function (pointer, options) {
        return __awaiter(this, void 0, void 0, function () {
            var normalizedFilePath, rawSDL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
                        return [4 /*yield*/, readFile(normalizedFilePath, { encoding: 'utf8' })];
                    case 1:
                        rawSDL = _a.sent();
                        return [2 /*return*/, this.handleFileContent(rawSDL, pointer, options)];
                }
            });
        });
    };
    GraphQLFileLoader.prototype.loadSync = function (pointer, options) {
        var normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
        var rawSDL = readFileSync(normalizedFilePath, { encoding: 'utf8' });
        return this.handleFileContent(rawSDL, pointer, options);
    };
    GraphQLFileLoader.prototype.handleFileContent = function (rawSDL, pointer, options) {
        if (!options.skipGraphQLImport && isGraphQLImportFile(rawSDL)) {
            var document_1 = processImport(pointer, options.cwd);
            return {
                location: pointer,
                document: document_1,
            };
        }
        return parseGraphQLSDL(pointer, rawSDL, options);
    };
    return GraphQLFileLoader;
}());

export { GraphQLFileLoader };
//# sourceMappingURL=index.esm.js.map
