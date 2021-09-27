'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('@graphql-tools/utils');
const path = require('path');
const fs = require('fs');
const process = require('process');
const _import = require('@graphql-tools/import');

const { readFile, access } = fs.promises;
const FILE_EXTENSIONS = ['.gql', '.gqls', '.graphql', '.graphqls'];
function isGraphQLImportFile(rawSDL) {
    const trimmedRawSDL = rawSDL.trim();
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
class GraphQLFileLoader {
    loaderId() {
        return 'graphql-file';
    }
    async canLoad(pointer, options) {
        if (utils.isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
                try {
                    await access(normalizedFilePath);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
        }
        return false;
    }
    canLoadSync(pointer, options) {
        if (utils.isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
                try {
                    fs.accessSync(normalizedFilePath);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
        }
        return false;
    }
    async load(pointer, options) {
        const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
        const rawSDL = await readFile(normalizedFilePath, { encoding: 'utf8' });
        return this.handleFileContent(rawSDL, pointer, options);
    }
    loadSync(pointer, options) {
        const normalizedFilePath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
        const rawSDL = fs.readFileSync(normalizedFilePath, { encoding: 'utf8' });
        return this.handleFileContent(rawSDL, pointer, options);
    }
    handleFileContent(rawSDL, pointer, options) {
        if (!options.skipGraphQLImport && isGraphQLImportFile(rawSDL)) {
            const document = _import.processImport(pointer, options.cwd);
            return {
                location: pointer,
                document,
            };
        }
        return utils.parseGraphQLSDL(pointer, rawSDL, options);
    }
}

exports.GraphQLFileLoader = GraphQLFileLoader;
//# sourceMappingURL=index.cjs.js.map
