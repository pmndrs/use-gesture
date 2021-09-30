import { __spreadArray, __read, __assign, __awaiter, __generator } from 'tslib';
import { Kind, visit, getOperationAST } from 'graphql';
import DataLoader from 'dataloader';
import { ValueOrPromise } from 'value-or-promise';
import { relocatedError } from '@graphql-tools/utils/es5';

// adapted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
function createPrefix(index) {
    return "graphqlTools" + index + "_";
}
function parseKey(prefixedKey) {
    var match = /^graphqlTools([\d]+)_(.*)$/.exec(prefixedKey);
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
    var mergedVariables = Object.create(null);
    var mergedVariableDefinitions = [];
    var mergedSelections = [];
    var mergedFragmentDefinitions = [];
    var mergedExtensions = Object.create(null);
    var operation;
    execs.forEach(function (executionParams, index) {
        var prefixedExecutionParams = prefixExecutionParams(createPrefix(index), executionParams);
        prefixedExecutionParams.document.definitions.forEach(function (def) {
            var _a;
            if (isOperationDefinition(def)) {
                operation = def.operation;
                mergedSelections.push.apply(mergedSelections, __spreadArray([], __read(def.selectionSet.selections)));
                mergedVariableDefinitions.push.apply(mergedVariableDefinitions, __spreadArray([], __read(((_a = def.variableDefinitions) !== null && _a !== void 0 ? _a : []))));
            }
            if (isFragmentDefinition(def)) {
                mergedFragmentDefinitions.push(def);
            }
        });
        Object.assign(mergedVariables, prefixedExecutionParams.variables);
        mergedExtensions = extensionsReducer(mergedExtensions, executionParams);
    });
    var mergedOperationDefinition = {
        kind: Kind.OPERATION_DEFINITION,
        operation: operation,
        variableDefinitions: mergedVariableDefinitions,
        selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: mergedSelections,
        },
    };
    return {
        document: {
            kind: Kind.DOCUMENT,
            definitions: __spreadArray([mergedOperationDefinition], __read(mergedFragmentDefinitions)),
        },
        variables: mergedVariables,
        extensions: mergedExtensions,
        context: execs[0].context,
        info: execs[0].info,
    };
}
function prefixExecutionParams(prefix, executionParams) {
    var _a;
    var document = aliasTopLevelFields(prefix, executionParams.document);
    var variableNames = Object.keys(executionParams.variables);
    if (variableNames.length === 0) {
        return __assign(__assign({}, executionParams), { document: document });
    }
    document = visit(document, (_a = {},
        _a[Kind.VARIABLE] = function (node) { return prefixNodeName(node, prefix); },
        _a[Kind.FRAGMENT_DEFINITION] = function (node) { return prefixNodeName(node, prefix); },
        _a[Kind.FRAGMENT_SPREAD] = function (node) { return prefixNodeName(node, prefix); },
        _a));
    var prefixedVariables = variableNames.reduce(function (acc, name) {
        acc[prefix + name] = executionParams.variables[name];
        return acc;
    }, Object.create(null));
    return {
        document: document,
        variables: prefixedVariables,
    };
}
/**
 * Adds prefixed aliases to top-level fields of the query.
 *
 * @see aliasFieldsInSelection for implementation details
 */
function aliasTopLevelFields(prefix, document) {
    var _a, _b;
    var transformer = (_a = {},
        _a[Kind.OPERATION_DEFINITION] = function (def) {
            var selections = def.selectionSet.selections;
            return __assign(__assign({}, def), { selectionSet: __assign(__assign({}, def.selectionSet), { selections: aliasFieldsInSelection(prefix, selections, document) }) });
        },
        _a);
    return visit(document, transformer, (_b = {},
        _b[Kind.DOCUMENT] = ["definitions"],
        _b));
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
    return selections.map(function (selection) {
        switch (selection.kind) {
            case Kind.INLINE_FRAGMENT:
                return aliasFieldsInInlineFragment(prefix, selection, document);
            case Kind.FRAGMENT_SPREAD: {
                var inlineFragment = inlineFragmentSpread(selection, document);
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
    var selections = fragment.selectionSet.selections;
    return __assign(__assign({}, fragment), { selectionSet: __assign(__assign({}, fragment.selectionSet), { selections: aliasFieldsInSelection(prefix, selections, document) }) });
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
    var fragment = document.definitions.find(function (def) { return isFragmentDefinition(def) && def.name.value === spread.name.value; });
    if (!fragment) {
        throw new Error("Fragment " + spread.name.value + " does not exist");
    }
    var typeCondition = fragment.typeCondition, selectionSet = fragment.selectionSet;
    return {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition: typeCondition,
        selectionSet: selectionSet,
        directives: spread.directives,
    };
}
function prefixNodeName(namedNode, prefix) {
    return __assign(__assign({}, namedNode), { name: __assign(__assign({}, namedNode.name), { value: prefix + namedNode.name.value }) });
}
/**
 * Returns a new FieldNode with prefixed alias
 *
 * Example. Given prefix === "graphqlTools1_" transforms:
 *   { foo } -> { graphqlTools1_foo: foo }
 *   { foo: bar } -> { graphqlTools1_foo: bar }
 */
function aliasField(field, aliasPrefix) {
    var aliasNode = field.alias ? field.alias : field.name;
    return __assign(__assign({}, field), { alias: __assign(__assign({}, aliasNode), { value: aliasPrefix + aliasNode.value }) });
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
    var splitResults = [];
    for (var i = 0; i < numResults; i++) {
        splitResults.push({});
    }
    var data = mergedResult.data;
    if (data) {
        Object.keys(data).forEach(function (prefixedKey) {
            var _a;
            var _b = parseKey(prefixedKey), index = _b.index, originalKey = _b.originalKey;
            if (!splitResults[index].data) {
                splitResults[index].data = (_a = {}, _a[originalKey] = data[prefixedKey], _a);
            }
            else {
                splitResults[index].data[originalKey] = data[prefixedKey];
            }
        });
    }
    var errors = mergedResult.errors;
    if (errors) {
        var newErrors_1 = Object.create(null);
        errors.forEach(function (error) {
            if (error.path) {
                var parsedKey = parseKey(error.path[0]);
                if (parsedKey) {
                    var index = parsedKey.index, originalKey = parsedKey.originalKey;
                    var newError = relocatedError(error, __spreadArray([originalKey], __read(error.path.slice(1))));
                    if (!newErrors_1[index]) {
                        newErrors_1[index] = [newError];
                    }
                    else {
                        newErrors_1[index].push(newError);
                    }
                    return;
                }
            }
            splitResults.forEach(function (_splitResult, index) {
                if (!newErrors_1[index]) {
                    newErrors_1[index] = [error];
                }
                else {
                    newErrors_1[index].push(error);
                }
            });
        });
        Object.keys(newErrors_1).forEach(function (index) {
            splitResults[index].errors = newErrors_1[index];
        });
    }
    return splitResults;
}

function createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer) {
    var loader = new DataLoader(createLoadFn(executor, extensionsReducer !== null && extensionsReducer !== void 0 ? extensionsReducer : defaultExtensionsReducer), dataLoaderOptions);
    return function (executionParams) { return loader.load(executionParams); };
}
function createLoadFn(executor, extensionsReducer) {
    var _this = this;
    return function (execs) { return __awaiter(_this, void 0, void 0, function () {
        var execBatches, index, exec, currentBatch, operationType, currentOperationType, executionResults;
        return __generator(this, function (_a) {
            execBatches = [];
            index = 0;
            exec = execs[index];
            currentBatch = [exec];
            execBatches.push(currentBatch);
            operationType = getOperationAST(exec.document, undefined).operation;
            while (++index < execs.length) {
                currentOperationType = getOperationAST(execs[index].document, undefined).operation;
                if (operationType === currentOperationType) {
                    currentBatch.push(execs[index]);
                }
                else {
                    currentBatch = [execs[index]];
                    execBatches.push(currentBatch);
                }
            }
            executionResults = [];
            execBatches.forEach(function (execBatch) {
                var mergedExecutionParams = mergeExecutionParams(execBatch, extensionsReducer);
                executionResults.push(new ValueOrPromise(function () { return executor(mergedExecutionParams); }));
            });
            return [2 /*return*/, ValueOrPromise.all(executionResults).then(function (resultBatches) {
                    var results = [];
                    resultBatches.forEach(function (resultBatch, index) {
                        results = results.concat(splitResult(resultBatch, execBatches[index].length));
                    });
                    return results;
                }).resolve()];
        });
    }); };
}
function defaultExtensionsReducer(mergedExtensions, executionParams) {
    var newExtensions = executionParams.extensions;
    if (newExtensions != null) {
        Object.assign(mergedExtensions, newExtensions);
    }
    return mergedExtensions;
}

function memoize2of4(fn) {
    var cache1;
    function memoized(a1, a2, a3, a4) {
        if (!cache1) {
            cache1 = new WeakMap();
            var cache2_1 = new WeakMap();
            cache1.set(a1, cache2_1);
            var newValue = fn(a1, a2, a3, a4);
            cache2_1.set(a2, newValue);
            return newValue;
        }
        var cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            var newValue = fn(a1, a2, a3, a4);
            cache2.set(a2, newValue);
            return newValue;
        }
        var cachedValue = cache2.get(a2);
        if (cachedValue === undefined) {
            var newValue = fn(a1, a2, a3, a4);
            cache2.set(a2, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}

var getBatchingExecutor = memoize2of4(function (_context, executor, dataLoaderOptions, extensionsReducer) {
    return createBatchingExecutor(executor, dataLoaderOptions, extensionsReducer);
});

export { createBatchingExecutor, getBatchingExecutor };
//# sourceMappingURL=index.esm.js.map
