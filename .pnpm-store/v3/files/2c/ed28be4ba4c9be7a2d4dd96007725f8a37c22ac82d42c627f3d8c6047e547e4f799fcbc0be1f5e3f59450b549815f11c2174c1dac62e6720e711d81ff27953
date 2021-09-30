import { isValidPath, parseGraphQLJSON } from '@graphql-tools/utils';
import { isAbsolute, resolve } from 'path';
import { accessSync, readFileSync, promises } from 'fs';
import { cwd } from 'process';

const { readFile, access } = promises;
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
        if (isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
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
        if (isValidPath(pointer)) {
            if (FILE_EXTENSIONS.find(extension => pointer.endsWith(extension))) {
                const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
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
    }
    async load(pointer, options) {
        const normalizedFilePath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
        try {
            const jsonContent = await readFile(normalizedFilePath, { encoding: 'utf8' });
            return parseGraphQLJSON(pointer, jsonContent, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilePath}: ${e.message || /* istanbul ignore next */ e}`);
        }
    }
    loadSync(pointer, options) {
        const normalizedFilepath = isAbsolute(pointer) ? pointer : resolve(options.cwd || cwd(), pointer);
        try {
            const jsonContent = readFileSync(normalizedFilepath, 'utf8');
            return parseGraphQLJSON(pointer, jsonContent, options);
        }
        catch (e) {
            throw new Error(`Unable to read JSON file: ${normalizedFilepath}: ${e.message || /* istanbul ignore next */ e}`);
        }
    }
}

export { JsonFileLoader };
//# sourceMappingURL=index.esm.js.map
