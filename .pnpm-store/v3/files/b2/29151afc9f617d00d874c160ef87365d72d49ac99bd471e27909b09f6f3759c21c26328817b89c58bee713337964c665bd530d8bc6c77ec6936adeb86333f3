'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('@graphql-tools/utils');
const path = require('path');
const fs = require('fs');
const process = require('process');

const { readFile, access } = fs.promises;
const FILE_EXTENSIONS = ['.json'];
/**
 * This loader loads documents and type definitions from JSON files.
 *
 * The JSON file can be the result of an introspection query made against a schema:
 *
 * ```js
 * const schema = await loadSchema('schema-introspection.json', {
 *   loaders: [
 *     new JsonFileLoader()
 *   ]
 * });
 * ```
 *
 * Or it can be a `DocumentNode` object representing a GraphQL document or type definitions:
 *
 * ```js
 * const documents = await loadDocuments('queries/*.json', {
 *   loaders: [
 *     new GraphQLFileLoader()
 *   ]
 * });
 * ```
 */
class JsonFileLoader {
    loaderId() {
        return 'json-file';
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
        try {
            const jsonContent = await readFile(normalizedFilePath, { encoding: 'utf8' });
            return utils.parseGraphQLJSON(pointer, jsonContent, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilePath}: ${e.message || /* istanbul ignore next */ e}`);
        }
    }
    loadSync(pointer, options) {
        const normalizedFilepath = path.isAbsolute(pointer) ? pointer : path.resolve(options.cwd || process.cwd(), pointer);
        try {
            const jsonContent = fs.readFileSync(normalizedFilepath, 'utf8');
            return utils.parseGraphQLJSON(pointer, jsonContent, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilepath}: ${e.message || /* istanbul ignore next */ e}`);
        }
    }
}

exports.JsonFileLoader = JsonFileLoader;
//# sourceMappingURL=index.cjs.js.map
