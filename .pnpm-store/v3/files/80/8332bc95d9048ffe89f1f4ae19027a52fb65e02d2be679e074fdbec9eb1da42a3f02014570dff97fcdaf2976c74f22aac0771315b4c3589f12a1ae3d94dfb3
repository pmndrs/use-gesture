import { Kind, visit, getOperationAST } from 'graphql';
import DataLoader from 'dataloader';
import { ValueOrPromise } from 'value-or-promise';
import { relocatedError } from '@graphql-tools/utils';

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
function createPrefix(index) {
    return `graphqlTools${index}_`;
}
function parseKey(prefixedKey) {
    const match = /^graphqlTools([\d]+)_(.*)$/.exec(prefixedKey);
    if (match && match.length === 3 && !isNaN(Number(match[1])) && match[2]) {
        return { index: Number(match[1]), originalKey: match[2] };
    }
    return null;
}

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
/**
 * Merge multiple queries into a single query in such a way that query results
 * can be split and transformed as if they were obtained by running original queries.
 *
 * Merging algorithm involves several transformations:
 *  1. Replace top-level fragment spreads with inline fragments (... on Query {})
 *  2. Add unique aliases to all top-level query fields (including those on inline fragments)
 *  3. Prefix all variable definitions and variable usages
 *  4. Prefix names (and spreads) of fragments
 *
 * i.e transform:
 *   [
 *     `query Foo($id: ID!) { foo, bar(id: $id), ...FooQuery }
 *     fragment FooQuery on Query { baz }`,
 *
 *    `query Bar($id: ID!) { foo: baz, bar(id: $id), ... on Query { baz } }`
 *   ]
 * to:
 *   query (
 *     $graphqlTools1_id: ID!
 *     $graphqlTools2_id: ID!
 *   ) {
 *     graphqlTools1_foo: foo,
 *     graphqlTools1_bar: bar(id: $graphqlTools1_id)
 *     ... on Query {
 *       graphqlTools1__baz: baz
 *     }
 *     graphqlTools1__foo: baz
 *     graphqlTools1__bar: bar(id: $graphqlTools1__id)
 *     ... on Query {
 *       graphqlTools1__baz: baz
 *     }
 *   }
 */
function mergeExecutionParams(execs, extensionsReducer) {
    const mergedVariables = Object.create(null);
    const mergedVariableDefinitions = [];
    const mergedSelections = [];
    const mergedFragmentDefinitions = [];
    let mergedExtensions = Object.create(null);
    let operation;
    execs.forEach((executionParams, index) => {
        const prefixedExecutionParams = prefixExecutionParams(createPrefix(index), executionParams);
        prefixedExecutionParams.document.definitions.forEach(def => {
            var _a;
            if (isOperationDefinition(def)) {
                operation = def.operation;
                mergedSelections.push(...def.selectionSet.selections);
                mergedVariableDefinitions.push(...((_a = def.variableDefinitions) !== null && _a !== void 0 ? _a : []));
            }
            if (isFragmentDefinition(def)) {
                mergedFragmentDefinitions.push(def);
            }
        });
        Object.assign(mergedVariables, prefixedExecutionParams.variables);
        mergedExtensions = extensionsReducer(mergedExtensions, executionParams);
    });
    const mergedOperationDefinition = {
        kind: Kind.OPERATION_DEFINITION,
        operation,
        variableDefinitions: mergedVariableDefinitions,
        selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: mergedSelections,
        },
    };
    return {
        document: {
            kind: Kind.DOCUMENT,
            definitions: [mergedOperationDefinition, ...mergedFragmentDefinitions],
        },
        variables: mergedVariables,
        extensions: mergedExtensions,
        context: execs[0].context,
        info: execs[0].info,
    };
}
function prefixExecutionParams(prefix, executionParams) {
    let document = aliasTopLevelFields(prefix, executionParams.document);
    const variableNames = Object.keys(executionParams.variables);
    if (variableNames.length === 0) {
        return { ...executionParams, document };
    }
    document = visit(document, {
        [Kind.VARIABLE]: (node) => prefixNodeName(node, prefix),
        [Kind.FRAGMENT_DEFINITION]: (node) => prefixNodeName(node, prefix),
        [Kind.FRAGMENT_SPREAD]: (node) => prefixNodeName(node, prefix),
    });
    const prefixedVariables = variableNames.reduce((acc, name) => {
        acc[prefix + name] = executionParams.variables[name];
        return acc;
    }, Object.create(null));
    return {
        document,
        variables: prefixedVariables,
    };
}
/**
 * Adds prefixed aliases to top-level fields of the query.
 *
 * @see aliasFieldsInSelection for implementation details
 */
function aliasTopLevelFields(prefix, document) {
    const transformer = {
        [Kind.OPERATION_DEFINITION]: (def) => {
            const { selections } = def.selectionSet;
            return {
                ...def,
                selectionSet: {
                    ...def.selectionSet,
                    selections: aliasFieldsInSelection(prefix, selections, document),
                },
            };
        },
    };
    return visit(document, transformer, {
        [Kind.DOCUMENT]: [`definitions`],
    });
}
/**
 * Add aliases to fields of the selection, including top-level fields of inline fragments.
 * Fragment spreads are converted to inline fragments and their top-level fields are also aliased.
 *
 * Note that this method is shallow. It adds aliases only to the top-level fields and doesn't
 * descend to field sub-selections.
 *
 * For example, transforms:
 *   {
 *     foo
 *     ... on Query { foo }
 *     ...FragmentWithBarField
 *   }
 * To:
 *   {
 *     graphqlTools1_foo: foo
 *     ... on Query { graphqlTools1_foo: foo }
 *     ... on Query { graphqlTools1_bar: bar }
 *   }
 */
function aliasFieldsInSelection(prefix, selections, document) {
    return selections.map(selection => {
        switch (selection.kind) {
            case Kind.INLINE_FRAGMENT:
                return aliasFieldsInInlineFragment(prefix, selection, document);
            case Kind.FRAGMENT_SPREAD: {
                const inlineFragment = inlineFragmentSpread(selection, document);
                return aliasFieldsInInlineFragment(prefix, inlineFragment, document);
            }
            case Kind.FIELD:
            default:
                return aliasField(selection, prefix);
        }
    });
}
/**
 * Add aliases to top-level fields of the inline fragment.
 * Returns new inline fragment node.
 *
 * For Example, transforms:
 *   ... on Query { foo, ... on Query { bar: foo } }
 * To
 *   ... on Query { graphqlTools1_foo: foo, ... on Query { graphqlTools1_bar: foo } }
 */
function aliasFieldsInInlineFragment(prefix, fragment, document) {
    const { selections } = fragment.selectionSet;
    return {
        ...fragment,
        selectionSet: {
            ...fragment.selectionSet,
            selections: aliasFieldsInSelection(prefix, selections, document),
        },
    };
}
/**
 * Replaces fragment spread with inline fragment
 *
 * Example:
 *   query { ...Spread }
 *   fragment Spread on Query { bar }
 *
 * Transforms to:
 *   query { ... on Query { bar } }
 */
function inlineFragmentSpread(spread, document) {
    const fragment = document.definitions.find(def => isFragmentDefinition(def) && def.name.value === spread.name.value);
    if (!fragment) {
        throw new Error(`Fragment ${spread.name.value} does not exist`);
    }
    const { typeCondition, selectionSet } = fragment;
    return {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition,
        selectionSet,
        directives: spread.directives,
    };
}
function prefixNodeName(namedNode, prefix) {
    return {
        ...namedNode,
        name: {
            ...namedNode.name,
            value: prefix + namedNode.name.value,
        },
    };
}
/**
 * Returns a new FieldNode with prefixed alias
 *
 * Example. Given prefix === "graphqlTools1_" transforms:
 *   { foo } -> { graphqlTools1_foo: foo }
 *   { foo: bar } -> { graphqlTools1_foo: bar }
 */
function aliasField(field, aliasPrefix) {
    const aliasNode = field.alias ? field.alias : field.name;
    return {
        ...field,
        alias: {
            ...aliasNode,
            value: aliasPrefix + aliasNode.value,
        },
    };
}
function isOperationDefinition(def) {
    return def.kind === Kind.OPERATION_DEFINITION;
}
function isFragmentDefinition(def) {
    return def.kind === Kind.FRAGMENT_DEFINITION;
}

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
/**
 * Split and transform result of the query produced by the `merge` function
 */
function splitResult(mergedResult, numResults) {
    const splitResults = [];
    for (let i = 0; i < numResults; i++) {
        splitResults.push({});
    }
    const data = mergedResult.data;
    if (data) {
        Object.keys(data).forEach(prefixedKey => {
            const { index, originalKey } = parseKey(prefixedKey);
            if (!splitResults[index].data) {
                splitResults[index].data = { [originalKey]: data[prefixedKey] };
            }
            else {
                splitResults[index].data[originalKey] = data[prefixedKey];
            }
        });
    }
    const errors = mergedResult.errors;
    if (errors) {
        const newErrors = Object.create(null);
        errors.forEach(error => {
            if (error.path) {
                const parsedKey = parseKey(error.path[0]);
                if (parsedKey) {
                    const { index, originalKey } = parsedKey;
                    const newError = relocatedError(error, [originalKey, ...error.path.slice(1)]);
                    if (!newErrors[index]) {
                        newErrors[index] = [newError];
                    }
                    else {
                        newErrors[index].push(newError);
                    }
                    return;
                }
            }
            splitResults.forEach((_splitResult, index) => {
                if (!newErrors[index]) {
                    newErrors[index] = [error];
                }
                else {
                    newErrors[index].push(error);
                }
            });
        });
        Object.keys(newErrors).forEach(index => {
            splitResults[index].errors = newErrors[index];
        });
    }
    return splitResults;
}

function createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer) {
    const loader = new DataLoader(createLoadFn(executor, extensionsReducer !== null && extensionsReducer !== void 0 ? extensionsReducer : defaultExtensionsReducer), dataLoaderOptions);
    return (executionParams) => loader.load(executionParams);
}
function createLoadFn(executor, extensionsReducer) {
    return async (execs) => {
        const execBatches = [];
        let index = 0;
        const exec = execs[index];
        let currentBatch = [exec];
        execBatches.push(currentBatch);
        const operationType = getOperationAST(exec.document, undefined).operation;
        while (++index < execs.length) {
            const currentOperationType = getOperationAST(execs[index].document, undefined).operation;
            if (operationType === currentOperationType) {
                currentBatch.push(execs[index]);
            }
            else {
                currentBatch = [execs[index]];
                execBatches.push(currentBatch);
            }
        }
        const executionResults = [];
        execBatches.forEach(execBatch => {
            const mergedExecutionParams = mergeExecutionParams(execBatch, extensionsReducer);
            executionResults.push(new ValueOrPromise(() => executor(mergedExecutionParams)));
        });
        return ValueOrPromise.all(executionResults).then(resultBatches => {
            let results = [];
            resultBatches.forEach((resultBatch, index) => {
                results = results.concat(splitResult(resultBatch, execBatches[index].length));
            });
            return results;
        }).resolve();
    };
}
function defaultExtensionsReducer(mergedExtensions, executionParams) {
    const newExtensions = executionParams.extensions;
    if (newExtensions != null) {
        Object.assign(mergedExtensions, newExtensions);
    }
    return mergedExtensions;
}

function memoize2of4(fn) {
    let cache1;
    function memoized(a1, a2, a3, a4) {
        if (!cache1) {
            cache1 = new WeakMap();
            const cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const newValue = fn(a1, a2, a3, a4);
            cache2.set(a2, newValue);
            return newValue;
        }
        let cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const newValue = fn(a1, a2, a3, a4);
            cache2.set(a2, newValue);
            return newValue;
        }
        const cachedValue = cache2.get(a2);
        if (cachedValue === undefined) {
            const newValue = fn(a1, a2, a3, a4);
            cache2.set(a2, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}

const getBatchingExecutor = memoize2of4(function (_context, executor, dataLoaderOptions, extensionsReducer) {
    return createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer);
});

export { createBatchingExecutor, getBatchingExecutor };
//# sourceMappingURL=index.esm.js.map
