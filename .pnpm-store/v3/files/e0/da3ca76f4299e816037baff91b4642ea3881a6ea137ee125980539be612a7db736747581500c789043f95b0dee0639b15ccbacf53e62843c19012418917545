import { cloneSchema, serializeInputValue, updateArgument, collectFields, relocatedError, mergeDeep, getResponseKeyFromInfo, implementsAbstractType, mapAsyncIterator } from '@graphql-tools/utils/es5';
import { __assign, __spreadArray, __read, __values } from 'tslib';
import { Kind, typeFromAST, GraphQLError, locatedError, responsePathAsArray, getNamedType, getNullableType, isLeafType, isCompositeType, isListType, isAbstractType, defaultFieldResolver, TypeInfo, visit, visitWithTypeInfo, print, isInterfaceType, isObjectType, TypeNameMetaFieldDef, getOperationAST, subscribe, validate, execute } from 'graphql';
import AggregateError from '@ardatan/aggregate-error';
import { ValueOrPromise } from 'value-or-promise';
import { getBatchingExecutor } from '@graphql-tools/batch-execute/es5';

function applySchemaTransforms(originalWrappingSchema, subschemaConfig, transformedSchema) {
    var schemaTransforms = subschemaConfig.transforms;
    if (schemaTransforms == null) {
        return originalWrappingSchema;
    }
    return schemaTransforms.reduce(function (schema, transform) {
        return transform.transformSchema != null
            ? transform.transformSchema(cloneSchema(schema), subschemaConfig, transformedSchema)
            : schema;
    }, originalWrappingSchema);
}

function isSubschema(value) {
    return Boolean(value.transformedSchema);
}
var Subschema = /** @class */ (function () {
    function Subschema(config) {
        var _a;
        this.schema = config.schema;
        this.rootValue = config.rootValue;
        this.executor = config.executor;
        this.subscriber = config.subscriber;
        this.batch = config.batch;
        this.batchingOptions = config.batchingOptions;
        this.createProxyingResolver = config.createProxyingResolver;
        this.transforms = (_a = config.transforms) !== null && _a !== void 0 ? _a : [];
        this.transformedSchema = applySchemaTransforms(this.schema, config);
        this.merge = config.merge;
    }
    return Subschema;
}());

function getDelegatingOperation(parentType, schema) {
    if (parentType === schema.getMutationType()) {
        return 'mutation';
    }
    else if (parentType === schema.getSubscriptionType()) {
        return 'subscription';
    }
    return 'query';
}
function createRequestFromInfo(_a) {
    var info = _a.info, operationName = _a.operationName, _b = _a.operation, operation = _b === void 0 ? getDelegatingOperation(info.parentType, info.schema) : _b, _c = _a.fieldName, fieldName = _c === void 0 ? info.fieldName : _c, selectionSet = _a.selectionSet, _d = _a.fieldNodes, fieldNodes = _d === void 0 ? info.fieldNodes : _d;
    return createRequest({
        sourceSchema: info.schema,
        sourceParentType: info.parentType,
        sourceFieldName: info.fieldName,
        fragments: info.fragments,
        variableDefinitions: info.operation.variableDefinitions,
        variableValues: info.variableValues,
        targetOperationName: operationName,
        targetOperation: operation,
        targetFieldName: fieldName,
        selectionSet: selectionSet,
        fieldNodes: fieldNodes,
    });
}
function createRequest(_a) {
    var _b;
    var sourceSchema = _a.sourceSchema, sourceParentType = _a.sourceParentType, sourceFieldName = _a.sourceFieldName, fragments = _a.fragments, variableDefinitions = _a.variableDefinitions, variableValues = _a.variableValues, targetOperationName = _a.targetOperationName, targetOperation = _a.targetOperation, targetFieldName = _a.targetFieldName, selectionSet = _a.selectionSet, fieldNodes = _a.fieldNodes;
    var newSelectionSet;
    var argumentNodeMap;
    if (selectionSet != null) {
        newSelectionSet = selectionSet;
        argumentNodeMap = Object.create(null);
    }
    else {
        var selections = fieldNodes.reduce(function (acc, fieldNode) { return (fieldNode.selectionSet != null ? acc.concat(fieldNode.selectionSet.selections) : acc); }, []);
        newSelectionSet = selections.length
            ? {
                kind: Kind.SELECTION_SET,
                selections: selections,
            }
            : undefined;
        argumentNodeMap = {};
        var args = (_b = fieldNodes[0]) === null || _b === void 0 ? void 0 : _b.arguments;
        if (args) {
            argumentNodeMap = args.reduce(function (prev, curr) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[curr.name.value] = curr, _a)));
            }, argumentNodeMap);
        }
    }
    var newVariables = Object.create(null);
    var variableDefinitionMap = Object.create(null);
    if (sourceSchema != null && variableDefinitions != null) {
        variableDefinitions.forEach(function (def) {
            var varName = def.variable.name.value;
            variableDefinitionMap[varName] = def;
            var varType = typeFromAST(sourceSchema, def.type);
            var serializedValue = serializeInputValue(varType, variableValues[varName]);
            if (serializedValue !== undefined) {
                newVariables[varName] = serializedValue;
            }
        });
    }
    if (sourceParentType != null) {
        updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, newVariables);
    }
    var rootfieldNode = {
        kind: Kind.FIELD,
        arguments: Object.keys(argumentNodeMap).map(function (argName) { return argumentNodeMap[argName]; }),
        name: {
            kind: Kind.NAME,
            value: targetFieldName || fieldNodes[0].name.value,
        },
        selectionSet: newSelectionSet,
    };
    var operationName = targetOperationName
        ? {
            kind: Kind.NAME,
            value: targetOperationName,
        }
        : undefined;
    var operationDefinition = {
        kind: Kind.OPERATION_DEFINITION,
        name: operationName,
        operation: targetOperation,
        variableDefinitions: Object.keys(variableDefinitionMap).map(function (varName) { return variableDefinitionMap[varName]; }),
        selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [rootfieldNode],
        },
    };
    var definitions = [operationDefinition];
    if (fragments != null) {
        definitions = definitions.concat(Object.keys(fragments).map(function (fragmentName) { return fragments[fragmentName]; }));
    }
    var document = {
        kind: Kind.DOCUMENT,
        definitions: definitions,
    };
    return {
        document: document,
        variables: newVariables,
    };
}
function updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, variableValues) {
    var sourceField = sourceParentType.getFields()[sourceFieldName];
    sourceField.args.forEach(function (argument) {
        var argName = argument.name;
        var sourceArgType = argument.type;
        if (argumentNodeMap[argName] === undefined) {
            var defaultValue = argument.defaultValue;
            if (defaultValue !== undefined) {
                updateArgument(argName, sourceArgType, argumentNodeMap, variableDefinitionMap, variableValues, serializeInputValue(sourceArgType, defaultValue));
            }
        }
    });
}

var UNPATHED_ERRORS_SYMBOL = Symbol('subschemaErrors');
var OBJECT_SUBSCHEMA_SYMBOL = Symbol('initialSubschema');
var FIELD_SUBSCHEMA_MAP_SYMBOL = Symbol('subschemaMap');

function isExternalObject(data) {
    return data[UNPATHED_ERRORS_SYMBOL] !== undefined;
}
function annotateExternalObject(object, errors, subschema) {
    var _a;
    Object.defineProperties(object, (_a = {},
        _a[OBJECT_SUBSCHEMA_SYMBOL] = { value: subschema },
        _a[FIELD_SUBSCHEMA_MAP_SYMBOL] = { value: Object.create(null) },
        _a[UNPATHED_ERRORS_SYMBOL] = { value: errors },
        _a));
    return object;
}
function getSubschema(object, responseKey) {
    var _a;
    return (_a = object[FIELD_SUBSCHEMA_MAP_SYMBOL][responseKey]) !== null && _a !== void 0 ? _a : object[OBJECT_SUBSCHEMA_SYMBOL];
}
function getUnpathedErrors(object) {
    return object[UNPATHED_ERRORS_SYMBOL];
}
function mergeExternalObjects(schema, path, typeName, target, sources, selectionSets) {
    var _a;
    var results = [];
    var errors = [];
    sources.forEach(function (source, index) {
        if (source instanceof Error || source === null) {
            var selectionSet = selectionSets[index];
            var fieldNodes_1 = collectFields({
                schema: schema,
                variableValues: {},
                fragments: {},
            }, schema.getType(typeName), selectionSet, Object.create(null), Object.create(null));
            var nullResult_1 = {};
            Object.keys(fieldNodes_1).forEach(function (responseKey) {
                if (source instanceof GraphQLError) {
                    nullResult_1[responseKey] = relocatedError(source, path.concat([responseKey]));
                }
                else if (source instanceof Error) {
                    nullResult_1[responseKey] = locatedError(source, fieldNodes_1[responseKey], path.concat([responseKey]));
                }
                else {
                    nullResult_1[responseKey] = null;
                }
            });
            results.push(nullResult_1);
        }
        else {
            errors = errors.concat(source[UNPATHED_ERRORS_SYMBOL]);
            results.push(source);
        }
    });
    var combinedResult = results.reduce(mergeDeep, target);
    var newFieldSubschemaMap = (_a = target[FIELD_SUBSCHEMA_MAP_SYMBOL]) !== null && _a !== void 0 ? _a : Object.create(null);
    results.forEach(function (source) {
        var objectSubschema = source[OBJECT_SUBSCHEMA_SYMBOL];
        var fieldSubschemaMap = source[FIELD_SUBSCHEMA_MAP_SYMBOL];
        if (fieldSubschemaMap === undefined) {
            Object.keys(source).forEach(function (responseKey) {
                newFieldSubschemaMap[responseKey] = objectSubschema;
            });
        }
        else {
            Object.keys(source).forEach(function (responseKey) {
                var _a;
                newFieldSubschemaMap[responseKey] = (_a = fieldSubschemaMap[responseKey]) !== null && _a !== void 0 ? _a : objectSubschema;
            });
        }
    });
    combinedResult[FIELD_SUBSCHEMA_MAP_SYMBOL] = newFieldSubschemaMap;
    combinedResult[OBJECT_SUBSCHEMA_SYMBOL] = target[OBJECT_SUBSCHEMA_SYMBOL];
    combinedResult[UNPATHED_ERRORS_SYMBOL] = target[UNPATHED_ERRORS_SYMBOL].concat(errors);
    return combinedResult;
}

function isSubschemaConfig(value) {
    return Boolean(value === null || value === void 0 ? void 0 : value.schema);
}
function cloneSubschemaConfig(subschemaConfig) {
    var newSubschemaConfig = __assign(__assign({}, subschemaConfig), { transforms: subschemaConfig.transforms != null ? __spreadArray([], __read(subschemaConfig.transforms)) : undefined });
    if (newSubschemaConfig.merge != null) {
        newSubschemaConfig.merge = __assign({}, subschemaConfig.merge);
        Object.keys(newSubschemaConfig.merge).forEach(function (typeName) {
            var mergedTypeConfig = (newSubschemaConfig.merge[typeName] = __assign({}, subschemaConfig.merge[typeName]));
            if (mergedTypeConfig.entryPoints != null) {
                mergedTypeConfig.entryPoints = mergedTypeConfig.entryPoints.map(function (entryPoint) { return (__assign({}, entryPoint)); });
            }
            if (mergedTypeConfig.fields != null) {
                var fields_1 = (mergedTypeConfig.fields = __assign({}, mergedTypeConfig.fields));
                Object.keys(fields_1).forEach(function (fieldName) {
                    fields_1[fieldName] = __assign({}, fields_1[fieldName]);
                });
            }
        });
    }
    return newSubschemaConfig;
}

function memoizeInfoAnd2Objects(fn) {
    var cache1;
    function memoized(a1, a2, a3) {
        if (!cache1) {
            cache1 = new WeakMap();
            var cache2_1 = new WeakMap();
            cache1.set(a1.fieldNodes, cache2_1);
            var cache3_1 = new WeakMap();
            cache2_1.set(a2, cache3_1);
            var newValue = fn(a1, a2, a3);
            cache3_1.set(a3, newValue);
            return newValue;
        }
        var cache2 = cache1.get(a1.fieldNodes);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1.fieldNodes, cache2);
            var cache3_2 = new WeakMap();
            cache2.set(a2, cache3_2);
            var newValue = fn(a1, a2, a3);
            cache3_2.set(a3, newValue);
            return newValue;
        }
        var cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            var newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        var cachedValue = cache3.get(a3);
        if (cachedValue === undefined) {
            var newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize4(fn) {
    var cache1;
    function memoized(a1, a2, a3, a4) {
        if (!cache1) {
            cache1 = new WeakMap();
            var cache2_2 = new WeakMap();
            cache1.set(a1, cache2_2);
            var cache3_3 = new WeakMap();
            cache2_2.set(a2, cache3_3);
            var cache4_1 = new WeakMap();
            cache3_3.set(a3, cache4_1);
            var newValue = fn(a1, a2, a3, a4);
            cache4_1.set(a4, newValue);
            return newValue;
        }
        var cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            var cache3_4 = new WeakMap();
            cache2.set(a2, cache3_4);
            var cache4_2 = new WeakMap();
            cache3_4.set(a3, cache4_2);
            var newValue = fn(a1, a2, a3, a4);
            cache4_2.set(a4, newValue);
            return newValue;
        }
        var cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            var cache4_3 = new WeakMap();
            cache3.set(a3, cache4_3);
            var newValue = fn(a1, a2, a3, a4);
            cache4_3.set(a4, newValue);
            return newValue;
        }
        var cache4 = cache3.get(a3);
        if (!cache4) {
            var cache4_4 = new WeakMap();
            cache3.set(a3, cache4_4);
            var newValue = fn(a1, a2, a3, a4);
            cache4_4.set(a4, newValue);
            return newValue;
        }
        var cachedValue = cache4.get(a4);
        if (cachedValue === undefined) {
            var newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize3(fn) {
    var cache1;
    function memoized(a1, a2, a3) {
        if (!cache1) {
            cache1 = new WeakMap();
            var cache2_3 = new WeakMap();
            cache1.set(a1, cache2_3);
            var cache3_5 = new WeakMap();
            cache2_3.set(a2, cache3_5);
            var newValue = fn(a1, a2, a3);
            cache3_5.set(a3, newValue);
            return newValue;
        }
        var cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            var cache3_6 = new WeakMap();
            cache2.set(a2, cache3_6);
            var newValue = fn(a1, a2, a3);
            cache3_6.set(a3, newValue);
            return newValue;
        }
        var cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            var newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        var cachedValue = cache3.get(a3);
        if (cachedValue === undefined) {
            var newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize2(fn) {
    var cache1;
    function memoized(a1, a2) {
        if (!cache1) {
            cache1 = new WeakMap();
            var cache2_4 = new WeakMap();
            cache1.set(a1, cache2_4);
            var newValue = fn(a1, a2);
            cache2_4.set(a2, newValue);
            return newValue;
        }
        var cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            var newValue = fn(a1, a2);
            cache2.set(a2, newValue);
            return newValue;
        }
        var cachedValue = cache2.get(a2);
        if (cachedValue === undefined) {
            var newValue = fn(a1, a2);
            cache2.set(a2, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}

function collectSubFields(info, typeName) {
    var subFieldNodes = Object.create(null);
    var visitedFragmentNames = Object.create(null);
    var type = info.schema.getType(typeName);
    var partialExecutionContext = {
        schema: info.schema,
        variableValues: info.variableValues,
        fragments: info.fragments,
    };
    info.fieldNodes.forEach(function (fieldNode) {
        subFieldNodes = collectFields(partialExecutionContext, type, fieldNode.selectionSet, subFieldNodes, visitedFragmentNames);
    });
    var stitchingInfo = info.schema.extensions.stitchingInfo;
    var selectionSetsByField = stitchingInfo.selectionSetsByField;
    Object.keys(subFieldNodes).forEach(function (responseName) {
        var _a;
        var fieldName = subFieldNodes[responseName][0].name.value;
        var fieldSelectionSet = (_a = selectionSetsByField === null || selectionSetsByField === void 0 ? void 0 : selectionSetsByField[typeName]) === null || _a === void 0 ? void 0 : _a[fieldName];
        if (fieldSelectionSet != null) {
            subFieldNodes = collectFields(partialExecutionContext, type, fieldSelectionSet, subFieldNodes, visitedFragmentNames);
        }
    });
    return subFieldNodes;
}
var getFieldsNotInSubschema = memoizeInfoAnd2Objects(function (info, subschema, mergedTypeInfo) {
    var typeMap = isSubschemaConfig(subschema) ? mergedTypeInfo.typeMaps.get(subschema) : subschema.getTypeMap();
    var typeName = mergedTypeInfo.typeName;
    var fields = typeMap[typeName].getFields();
    var subFieldNodes = collectSubFields(info, typeName);
    var fieldsNotInSchema = [];
    Object.keys(subFieldNodes).forEach(function (responseName) {
        var fieldName = subFieldNodes[responseName][0].name.value;
        if (!(fieldName in fields)) {
            fieldsNotInSchema = fieldsNotInSchema.concat(subFieldNodes[responseName]);
        }
    });
    return fieldsNotInSchema;
});

var sortSubschemasByProxiability = memoize4(function (mergedTypeInfo, sourceSubschemaOrSourceSubschemas, targetSubschemas, fieldNodes) {
    // 1.  calculate if possible to delegate to given subschema
    var proxiableSubschemas = [];
    var nonProxiableSubschemas = [];
    targetSubschemas.forEach(function (t) {
        var selectionSet = mergedTypeInfo.selectionSets.get(t);
        var fieldSelectionSets = mergedTypeInfo.fieldSelectionSets.get(t);
        if (selectionSet != null &&
            !subschemaTypesContainSelectionSet(mergedTypeInfo, sourceSubschemaOrSourceSubschemas, selectionSet)) {
            nonProxiableSubschemas.push(t);
        }
        else {
            if (fieldSelectionSets == null ||
                fieldNodes.every(function (fieldNode) {
                    var fieldName = fieldNode.name.value;
                    var fieldSelectionSet = fieldSelectionSets[fieldName];
                    return (fieldSelectionSet == null ||
                        subschemaTypesContainSelectionSet(mergedTypeInfo, sourceSubschemaOrSourceSubschemas, fieldSelectionSet));
                })) {
                proxiableSubschemas.push(t);
            }
            else {
                nonProxiableSubschemas.push(t);
            }
        }
    });
    return {
        proxiableSubschemas: proxiableSubschemas,
        nonProxiableSubschemas: nonProxiableSubschemas,
    };
});
var buildDelegationPlan = memoize3(function (mergedTypeInfo, fieldNodes, proxiableSubschemas) {
    var uniqueFields = mergedTypeInfo.uniqueFields, nonUniqueFields = mergedTypeInfo.nonUniqueFields;
    var unproxiableFieldNodes = [];
    // 2. for each selection:
    var delegationMap = new Map();
    fieldNodes.forEach(function (fieldNode) {
        if (fieldNode.name.value === '__typename') {
            return;
        }
        // 2a. use uniqueFields map to assign fields to subschema if one of possible subschemas
        var uniqueSubschema = uniqueFields[fieldNode.name.value];
        if (uniqueSubschema != null) {
            if (!proxiableSubschemas.includes(uniqueSubschema)) {
                unproxiableFieldNodes.push(fieldNode);
                return;
            }
            var existingSubschema_1 = delegationMap.get(uniqueSubschema);
            if (existingSubschema_1 != null) {
                existingSubschema_1.push(fieldNode);
            }
            else {
                delegationMap.set(uniqueSubschema, [fieldNode]);
            }
            return;
        }
        // 2b. use nonUniqueFields to assign to a possible subschema,
        //     preferring one of the subschemas already targets of delegation
        var nonUniqueSubschemas = nonUniqueFields[fieldNode.name.value];
        if (nonUniqueSubschemas == null) {
            unproxiableFieldNodes.push(fieldNode);
            return;
        }
        nonUniqueSubschemas = nonUniqueSubschemas.filter(function (s) { return proxiableSubschemas.includes(s); });
        if (!nonUniqueSubschemas.length) {
            unproxiableFieldNodes.push(fieldNode);
            return;
        }
        var existingSubschema = nonUniqueSubschemas.find(function (s) { return delegationMap.has(s); });
        if (existingSubschema != null) {
            delegationMap.get(existingSubschema).push(fieldNode);
        }
        else {
            delegationMap.set(nonUniqueSubschemas[0], [fieldNode]);
        }
    });
    var finalDelegationMap = new Map();
    delegationMap.forEach(function (selections, subschema) {
        finalDelegationMap.set(subschema, {
            kind: Kind.SELECTION_SET,
            selections: selections,
        });
    });
    return {
        delegationMap: finalDelegationMap,
        unproxiableFieldNodes: unproxiableFieldNodes,
    };
});
var combineSubschemas = memoize2(function (subschemaOrSubschemas, additionalSubschemas) {
    return Array.isArray(subschemaOrSubschemas)
        ? subschemaOrSubschemas.concat(additionalSubschemas)
        : [subschemaOrSubschemas].concat(additionalSubschemas);
});
function mergeFields(mergedTypeInfo, typeName, object, fieldNodes, sourceSubschemaOrSourceSubschemas, targetSubschemas, context, info) {
    if (!fieldNodes.length) {
        return object;
    }
    var _a = sortSubschemasByProxiability(mergedTypeInfo, sourceSubschemaOrSourceSubschemas, targetSubschemas, fieldNodes), proxiableSubschemas = _a.proxiableSubschemas, nonProxiableSubschemas = _a.nonProxiableSubschemas;
    var _b = buildDelegationPlan(mergedTypeInfo, fieldNodes, proxiableSubschemas), delegationMap = _b.delegationMap, unproxiableFieldNodes = _b.unproxiableFieldNodes;
    if (!delegationMap.size) {
        return object;
    }
    var resultMap = new Map();
    delegationMap.forEach(function (selectionSet, s) {
        var resolver = mergedTypeInfo.resolvers.get(s);
        var valueOrPromise = new ValueOrPromise(function () { return resolver(object, context, info, s, selectionSet); }).catch(function (error) { return error; });
        resultMap.set(valueOrPromise, selectionSet);
    });
    return ValueOrPromise.all(Array.from(resultMap.keys())).then(function (results) {
        return mergeFields(mergedTypeInfo, typeName, mergeExternalObjects(info.schema, responsePathAsArray(info.path), object.__typename, object, results, Array.from(resultMap.values())), unproxiableFieldNodes, combineSubschemas(sourceSubschemaOrSourceSubschemas, proxiableSubschemas), nonProxiableSubschemas, context, info);
    }).resolve();
}
var subschemaTypesContainSelectionSet = memoize3(function (mergedTypeInfo, sourceSubschemaOrSourceSubschemas, selectionSet) {
    if (Array.isArray(sourceSubschemaOrSourceSubschemas)) {
        return typesContainSelectionSet(sourceSubschemaOrSourceSubschemas.map(function (sourceSubschema) { return sourceSubschema.transformedSchema.getType(mergedTypeInfo.typeName); }), selectionSet);
    }
    return typesContainSelectionSet([sourceSubschemaOrSourceSubschemas.transformedSchema.getType(mergedTypeInfo.typeName)], selectionSet);
});
function typesContainSelectionSet(types, selectionSet) {
    var e_1, _a;
    var fieldMaps = types.map(function (type) { return type.getFields(); });
    var _loop_1 = function (selection) {
        if (selection.kind === Kind.FIELD) {
            var fields = fieldMaps.map(function (fieldMap) { return fieldMap[selection.name.value]; }).filter(function (field) { return field != null; });
            if (!fields.length) {
                return { value: false };
            }
            if (selection.selectionSet != null) {
                return { value: typesContainSelectionSet(fields.map(function (field) { return getNamedType(field.type); }), selection.selectionSet) };
            }
        }
        else if (selection.kind === Kind.INLINE_FRAGMENT && selection.typeCondition.name.value === types[0].name) {
            return { value: typesContainSelectionSet(types, selection.selectionSet) };
        }
    };
    try {
        for (var _b = __values(selectionSet.selections), _c = _b.next(); !_c.done; _c = _b.next()) {
            var selection = _c.value;
            var state_1 = _loop_1(selection);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}

function resolveExternalValue(result, unpathedErrors, subschema, context, info, returnType, skipTypeMerging) {
    if (returnType === void 0) { returnType = info.returnType; }
    var type = getNullableType(returnType);
    if (result instanceof Error) {
        return result;
    }
    if (result == null) {
        return reportUnpathedErrorsViaNull(unpathedErrors);
    }
    if (isLeafType(type)) {
        return type.parseValue(result);
    }
    else if (isCompositeType(type)) {
        return resolveExternalObject(type, result, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
    else if (isListType(type)) {
        return resolveExternalList(type, result, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
}
function resolveExternalObject(type, object, unpathedErrors, subschema, context, info, skipTypeMerging) {
    var _a;
    // if we have already resolved this object, for example, when the identical object appears twice
    // in a list, see https://github.com/ardatan/graphql-tools/issues/2304
    if (isExternalObject(object)) {
        return object;
    }
    annotateExternalObject(object, unpathedErrors, subschema);
    var stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
    if (skipTypeMerging || !stitchingInfo) {
        return object;
    }
    var typeName;
    if (isAbstractType(type)) {
        var resolvedType = info.schema.getTypeMap()[object.__typename];
        if (resolvedType == null) {
            throw new Error("Unable to resolve type '" + object.__typename + "'. Did you forget to include a transform that renames types? Did you delegate to the original subschema rather that the subschema config object containing the transform?");
        }
        typeName = resolvedType.name;
    }
    else {
        typeName = type.name;
    }
    var mergedTypeInfo = stitchingInfo.mergedTypes[typeName];
    var targetSubschemas;
    // Within the stitching context, delegation to a stitched GraphQLSchema or SubschemaConfig
    // will be redirected to the appropriate Subschema object, from which merge targets can be queried.
    if (mergedTypeInfo != null) {
        targetSubschemas = mergedTypeInfo.targetSubschemas.get(subschema);
    }
    // If there are no merge targets from the subschema, return.
    if (!targetSubschemas) {
        return object;
    }
    var fieldNodes = getFieldsNotInSubschema(info, subschema, mergedTypeInfo);
    return mergeFields(mergedTypeInfo, typeName, object, fieldNodes, subschema, targetSubschemas, context, info);
}
function resolveExternalList(type, list, unpathedErrors, subschema, context, info, skipTypeMerging) {
    return list.map(function (listMember) {
        return resolveExternalListMember(getNullableType(type.ofType), listMember, unpathedErrors, subschema, context, info, skipTypeMerging);
    });
}
function resolveExternalListMember(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging) {
    if (listMember instanceof Error) {
        return listMember;
    }
    if (listMember == null) {
        return reportUnpathedErrorsViaNull(unpathedErrors);
    }
    if (isLeafType(type)) {
        return type.parseValue(listMember);
    }
    else if (isCompositeType(type)) {
        return resolveExternalObject(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
    else if (isListType(type)) {
        return resolveExternalList(type, listMember, unpathedErrors, subschema, context, info, skipTypeMerging);
    }
}
var reportedErrors = new Map();
function reportUnpathedErrorsViaNull(unpathedErrors) {
    if (unpathedErrors.length) {
        var unreportedErrors_1 = [];
        unpathedErrors.forEach(function (error) {
            if (!reportedErrors.has(error)) {
                unreportedErrors_1.push(error);
                reportedErrors.set(error, true);
            }
        });
        if (unreportedErrors_1.length) {
            if (unreportedErrors_1.length === 1) {
                return unreportedErrors_1[0];
            }
            var combinedError = new AggregateError(unreportedErrors_1);
            return locatedError(combinedError, undefined, unreportedErrors_1[0].path);
        }
    }
    return null;
}

/**
 * Resolver that knows how to:
 * a) handle aliases for proxied schemas
 * b) handle errors from proxied schemas
 * c) handle external to internal enum conversion
 */
function defaultMergedResolver(parent, args, context, info) {
    if (!parent) {
        return null;
    }
    var responseKey = getResponseKeyFromInfo(info);
    // check to see if parent is not a proxied result, i.e. if parent resolver was manually overwritten
    // See https://github.com/apollographql/graphql-tools/issues/967
    if (!isExternalObject(parent)) {
        return defaultFieldResolver(parent, args, context, info);
    }
    var data = parent[responseKey];
    var unpathedErrors = getUnpathedErrors(parent);
    var subschema = getSubschema(parent, responseKey);
    return resolveExternalValue(data, unpathedErrors, subschema, context, info);
}

var VisitSelectionSets = /** @class */ (function () {
    function VisitSelectionSets(visitor) {
        this.visitor = visitor;
    }
    VisitSelectionSets.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        var document = visitSelectionSets(originalRequest, delegationContext.info.schema, delegationContext.returnType, this.visitor);
        return __assign(__assign({}, originalRequest), { document: document });
    };
    return VisitSelectionSets;
}());
function visitSelectionSets(request, schema, initialType, visitor) {
    var document = request.document, variables = request.variables;
    var operations = [];
    var fragments = Object.create(null);
    document.definitions.forEach(function (def) {
        if (def.kind === Kind.OPERATION_DEFINITION) {
            operations.push(def);
        }
        else if (def.kind === Kind.FRAGMENT_DEFINITION) {
            fragments[def.name.value] = def;
        }
    });
    var partialExecutionContext = {
        schema: schema,
        variableValues: variables,
        fragments: fragments,
    };
    var typeInfo = new TypeInfo(schema, undefined, initialType);
    var newDefinitions = operations.map(function (operation) {
        var type = operation.operation === 'query'
            ? schema.getQueryType()
            : operation.operation === 'mutation'
                ? schema.getMutationType()
                : schema.getSubscriptionType();
        var fields = collectFields(partialExecutionContext, type, operation.selectionSet, Object.create(null), Object.create(null));
        var newSelections = [];
        Object.keys(fields).forEach(function (responseKey) {
            var fieldNodes = fields[responseKey];
            fieldNodes.forEach(function (fieldNode) {
                var _a;
                var selectionSet = fieldNode.selectionSet;
                if (selectionSet == null) {
                    newSelections.push(fieldNode);
                    return;
                }
                var newSelectionSet = visit(selectionSet, visitWithTypeInfo(typeInfo, (_a = {},
                    _a[Kind.SELECTION_SET] = function (node) { return visitor(node, typeInfo); },
                    _a)));
                if (newSelectionSet === selectionSet) {
                    newSelections.push(fieldNode);
                    return;
                }
                newSelections.push(__assign(__assign({}, fieldNode), { selectionSet: newSelectionSet }));
            });
        });
        return __assign(__assign({}, operation), { selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: newSelections,
            } });
    });
    Object.values(fragments).forEach(function (fragment) {
        var _a;
        newDefinitions.push(visit(fragment, visitWithTypeInfo(typeInfo, (_a = {},
            _a[Kind.SELECTION_SET] = function (node) { return visitor(node, typeInfo); },
            _a))));
    });
    return __assign(__assign({}, document), { definitions: newDefinitions });
}

var AddSelectionSets = /** @class */ (function () {
    function AddSelectionSets(selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField) {
        this.transformer = new VisitSelectionSets(function (node, typeInfo) {
            return visitSelectionSet(node, typeInfo, selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField);
        });
    }
    AddSelectionSets.prototype.transformRequest = function (originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    };
    return AddSelectionSets;
}());
function visitSelectionSet(node, typeInfo, selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField) {
    var parentType = typeInfo.getParentType();
    var newSelections = new Map();
    if (parentType != null) {
        var parentTypeName_1 = parentType.name;
        addSelectionsToMap(newSelections, node);
        if (parentTypeName_1 in selectionSetsByType) {
            var selectionSet = selectionSetsByType[parentTypeName_1];
            addSelectionsToMap(newSelections, selectionSet);
        }
        if (parentTypeName_1 in selectionSetsByField) {
            node.selections.forEach(function (selection) {
                if (selection.kind === Kind.FIELD) {
                    var name_1 = selection.name.value;
                    var selectionSet = selectionSetsByField[parentTypeName_1][name_1];
                    if (selectionSet != null) {
                        addSelectionsToMap(newSelections, selectionSet);
                    }
                }
            });
        }
        if (parentTypeName_1 in dynamicSelectionSetsByField) {
            node.selections.forEach(function (selection) {
                if (selection.kind === Kind.FIELD) {
                    var name_2 = selection.name.value;
                    var dynamicSelectionSets = dynamicSelectionSetsByField[parentTypeName_1][name_2];
                    if (dynamicSelectionSets != null) {
                        dynamicSelectionSets.forEach(function (selectionSetFn) {
                            var selectionSet = selectionSetFn(selection);
                            if (selectionSet != null) {
                                addSelectionsToMap(newSelections, selectionSet);
                            }
                        });
                    }
                }
            });
        }
        return __assign(__assign({}, node), { selections: Array.from(newSelections.values()) });
    }
}
var addSelectionsToMap = memoize2(function (map, selectionSet) {
    selectionSet.selections.forEach(function (selection) {
        map.set(print(selection), selection);
    });
});

var ExpandAbstractTypes = /** @class */ (function () {
    function ExpandAbstractTypes() {
    }
    ExpandAbstractTypes.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        var targetSchema = delegationContext.targetSchema;
        var _a = extractPossibleTypes(delegationContext.info.schema, targetSchema), possibleTypesMap = _a.possibleTypesMap, interfaceExtensionsMap = _a.interfaceExtensionsMap;
        var reversePossibleTypesMap = flipMapping(possibleTypesMap);
        var document = expandAbstractTypes(targetSchema, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, originalRequest.document);
        return __assign(__assign({}, originalRequest), { document: document });
    };
    return ExpandAbstractTypes;
}());
function extractPossibleTypes(sourceSchema, targetSchema) {
    var typeMap = sourceSchema.getTypeMap();
    var possibleTypesMap = Object.create(null);
    var interfaceExtensionsMap = Object.create(null);
    Object.keys(typeMap).forEach(function (typeName) {
        var type = typeMap[typeName];
        if (isAbstractType(type)) {
            var targetType = targetSchema.getType(typeName);
            if (isInterfaceType(type) && isInterfaceType(targetType)) {
                var targetTypeFields_1 = targetType.getFields();
                var extensionFields_1 = Object.create(null);
                Object.keys(type.getFields()).forEach(function (fieldName) {
                    if (!targetTypeFields_1[fieldName]) {
                        extensionFields_1[fieldName] = true;
                    }
                });
                if (Object.keys(extensionFields_1).length) {
                    interfaceExtensionsMap[typeName] = extensionFields_1;
                }
            }
            if (!isAbstractType(targetType) || typeName in interfaceExtensionsMap) {
                var implementations = sourceSchema.getPossibleTypes(type);
                possibleTypesMap[typeName] = implementations
                    .filter(function (impl) { return targetSchema.getType(impl.name); })
                    .map(function (impl) { return impl.name; });
            }
        }
    });
    return { possibleTypesMap: possibleTypesMap, interfaceExtensionsMap: interfaceExtensionsMap };
}
function flipMapping(mapping) {
    var result = Object.create(null);
    Object.keys(mapping).forEach(function (typeName) {
        var toTypeNames = mapping[typeName];
        toTypeNames.forEach(function (toTypeName) {
            if (!(toTypeName in result)) {
                result[toTypeName] = [];
            }
            result[toTypeName].push(typeName);
        });
    });
    return result;
}
function expandAbstractTypes(targetSchema, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, document) {
    var _a;
    var operations = document.definitions.filter(function (def) { return def.kind === Kind.OPERATION_DEFINITION; });
    var fragments = document.definitions.filter(function (def) { return def.kind === Kind.FRAGMENT_DEFINITION; });
    var existingFragmentNames = fragments.map(function (fragment) { return fragment.name.value; });
    var fragmentCounter = 0;
    var generateFragmentName = function (typeName) {
        var fragmentName;
        do {
            fragmentName = "_" + typeName + "_Fragment" + fragmentCounter.toString();
            fragmentCounter++;
        } while (existingFragmentNames.indexOf(fragmentName) !== -1);
        return fragmentName;
    };
    var generateInlineFragment = function (typeName, selectionSet) {
        return {
            kind: Kind.INLINE_FRAGMENT,
            typeCondition: {
                kind: Kind.NAMED_TYPE,
                name: {
                    kind: Kind.NAME,
                    value: typeName,
                },
            },
            selectionSet: selectionSet,
        };
    };
    var newFragments = [];
    var fragmentReplacements = Object.create(null);
    fragments.forEach(function (fragment) {
        newFragments.push(fragment);
        var possibleTypes = possibleTypesMap[fragment.typeCondition.name.value];
        if (possibleTypes != null) {
            fragmentReplacements[fragment.name.value] = [];
            possibleTypes.forEach(function (possibleTypeName) {
                var name = generateFragmentName(possibleTypeName);
                existingFragmentNames.push(name);
                var newFragment = {
                    kind: Kind.FRAGMENT_DEFINITION,
                    name: {
                        kind: Kind.NAME,
                        value: name,
                    },
                    typeCondition: {
                        kind: Kind.NAMED_TYPE,
                        name: {
                            kind: Kind.NAME,
                            value: possibleTypeName,
                        },
                    },
                    selectionSet: fragment.selectionSet,
                };
                newFragments.push(newFragment);
                fragmentReplacements[fragment.name.value].push({
                    fragmentName: name,
                    typeName: possibleTypeName,
                });
            });
        }
    });
    var newDocument = __assign(__assign({}, document), { definitions: __spreadArray(__spreadArray([], __read(operations)), __read(newFragments)) });
    var typeInfo = new TypeInfo(targetSchema);
    return visit(newDocument, visitWithTypeInfo(typeInfo, (_a = {},
        _a[Kind.SELECTION_SET] = function (node) {
            var newSelections = node.selections;
            var addedSelections = [];
            var maybeType = typeInfo.getParentType();
            if (maybeType != null) {
                var parentType_1 = getNamedType(maybeType);
                var interfaceExtension_1 = interfaceExtensionsMap[parentType_1.name];
                var interfaceExtensionFields_1 = [];
                node.selections.forEach(function (selection) {
                    if (selection.kind === Kind.INLINE_FRAGMENT) {
                        if (selection.typeCondition != null) {
                            var possibleTypes = possibleTypesMap[selection.typeCondition.name.value];
                            if (possibleTypes != null) {
                                possibleTypes.forEach(function (possibleType) {
                                    var maybePossibleType = targetSchema.getType(possibleType);
                                    if (maybePossibleType != null &&
                                        implementsAbstractType(targetSchema, parentType_1, maybePossibleType)) {
                                        addedSelections.push(generateInlineFragment(possibleType, selection.selectionSet));
                                    }
                                });
                            }
                        }
                    }
                    else if (selection.kind === Kind.FRAGMENT_SPREAD) {
                        var fragmentName = selection.name.value;
                        if (fragmentName in fragmentReplacements) {
                            fragmentReplacements[fragmentName].forEach(function (replacement) {
                                var typeName = replacement.typeName;
                                var maybeReplacementType = targetSchema.getType(typeName);
                                if (maybeReplacementType != null && implementsAbstractType(targetSchema, parentType_1, maybeType)) {
                                    addedSelections.push({
                                        kind: Kind.FRAGMENT_SPREAD,
                                        name: {
                                            kind: Kind.NAME,
                                            value: replacement.fragmentName,
                                        },
                                    });
                                }
                            });
                        }
                    }
                    else if (interfaceExtension_1 != null &&
                        interfaceExtension_1[selection.name.value] &&
                        selection.kind === Kind.FIELD) {
                        interfaceExtensionFields_1.push(selection);
                    }
                });
                if (parentType_1.name in reversePossibleTypesMap) {
                    addedSelections.push({
                        kind: Kind.FIELD,
                        name: {
                            kind: Kind.NAME,
                            value: '__typename',
                        },
                    });
                }
                if (interfaceExtensionFields_1.length) {
                    var possibleTypes = possibleTypesMap[parentType_1.name];
                    if (possibleTypes != null) {
                        possibleTypes.forEach(function (possibleType) {
                            addedSelections.push(generateInlineFragment(possibleType, {
                                kind: Kind.SELECTION_SET,
                                selections: interfaceExtensionFields_1,
                            }));
                        });
                        newSelections = newSelections.filter(function (selection) {
                            return !(selection.kind === Kind.FIELD && interfaceExtension_1[selection.name.value]);
                        });
                    }
                }
            }
            if (addedSelections.length) {
                return __assign(__assign({}, node), { selections: newSelections.concat(addedSelections) });
            }
        },
        _a)));
}

// For motivation, see https://github.com/ardatan/graphql-tools/issues/751
var WrapConcreteTypes = /** @class */ (function () {
    function WrapConcreteTypes() {
    }
    WrapConcreteTypes.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        var document = wrapConcreteTypes(delegationContext.returnType, delegationContext.targetSchema, originalRequest.document);
        return __assign(__assign({}, originalRequest), { document: document });
    };
    return WrapConcreteTypes;
}());
function wrapConcreteTypes(returnType, targetSchema, document) {
    var _a;
    var _b, _c, _d;
    var namedType = getNamedType(returnType);
    if (!isObjectType(namedType)) {
        return document;
    }
    var queryTypeName = (_b = targetSchema.getQueryType()) === null || _b === void 0 ? void 0 : _b.name;
    var mutationTypeName = (_c = targetSchema.getMutationType()) === null || _c === void 0 ? void 0 : _c.name;
    var subscriptionTypeName = (_d = targetSchema.getSubscriptionType()) === null || _d === void 0 ? void 0 : _d.name;
    var typeInfo = new TypeInfo(targetSchema);
    var newDocument = visit(document, visitWithTypeInfo(typeInfo, (_a = {},
        _a[Kind.FRAGMENT_DEFINITION] = function (node) {
            var typeName = node.typeCondition.name.value;
            if (typeName !== queryTypeName && typeName !== mutationTypeName && typeName !== subscriptionTypeName) {
                return false;
            }
        },
        _a[Kind.FIELD] = function (node) {
            if (isAbstractType(getNamedType(typeInfo.getType()))) {
                return __assign(__assign({}, node), { selectionSet: {
                        kind: Kind.SELECTION_SET,
                        selections: [
                            {
                                kind: Kind.INLINE_FRAGMENT,
                                typeCondition: {
                                    kind: Kind.NAMED_TYPE,
                                    name: {
                                        kind: Kind.NAME,
                                        value: namedType.name,
                                    },
                                },
                                selectionSet: node.selectionSet,
                            },
                        ],
                    } });
            }
        },
        _a)), 
    // visitorKeys argument usage a la https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-graphql/src/batching/merge-queries.js
    // empty keys cannot be removed only because of typescript errors
    // will hopefully be fixed in future version of graphql-js to be optional
    {
        Name: [],
        Document: ['definitions'],
        OperationDefinition: ['selectionSet'],
        VariableDefinition: [],
        Variable: [],
        SelectionSet: ['selections'],
        Field: [],
        Argument: [],
        FragmentSpread: [],
        InlineFragment: ['selectionSet'],
        FragmentDefinition: ['selectionSet'],
        IntValue: [],
        FloatValue: [],
        StringValue: [],
        BooleanValue: [],
        NullValue: [],
        EnumValue: [],
        ListValue: [],
        ObjectValue: [],
        ObjectField: [],
        Directive: [],
        NamedType: [],
        ListType: [],
        NonNullType: [],
        SchemaDefinition: [],
        OperationTypeDefinition: [],
        ScalarTypeDefinition: [],
        ObjectTypeDefinition: [],
        FieldDefinition: [],
        InputValueDefinition: [],
        InterfaceTypeDefinition: [],
        UnionTypeDefinition: [],
        EnumTypeDefinition: [],
        EnumValueDefinition: [],
        InputObjectTypeDefinition: [],
        DirectiveDefinition: [],
        SchemaExtension: [],
        ScalarTypeExtension: [],
        ObjectTypeExtension: [],
        InterfaceTypeExtension: [],
        UnionTypeExtension: [],
        EnumTypeExtension: [],
        InputObjectTypeExtension: [],
    });
    return newDocument;
}

var FilterToSchema = /** @class */ (function () {
    function FilterToSchema() {
    }
    FilterToSchema.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        return __assign(__assign({}, originalRequest), filterToSchema(delegationContext.targetSchema, originalRequest.document, originalRequest.variables));
    };
    return FilterToSchema;
}());
function filterToSchema(targetSchema, document, variables) {
    var operations = document.definitions.filter(function (def) { return def.kind === Kind.OPERATION_DEFINITION; });
    var fragments = document.definitions.filter(function (def) { return def.kind === Kind.FRAGMENT_DEFINITION; });
    var usedVariables = [];
    var usedFragments = [];
    var newOperations = [];
    var newFragments = [];
    var validFragments = fragments.filter(function (fragment) {
        var typeName = fragment.typeCondition.name.value;
        return Boolean(targetSchema.getType(typeName));
    });
    var validFragmentsWithType = validFragments.reduce(function (prev, fragment) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[fragment.name.value] = targetSchema.getType(fragment.typeCondition.name.value), _a)));
    }, {});
    var fragmentSet = Object.create(null);
    operations.forEach(function (operation) {
        var type;
        if (operation.operation === 'subscription') {
            type = targetSchema.getSubscriptionType();
        }
        else if (operation.operation === 'mutation') {
            type = targetSchema.getMutationType();
        }
        else {
            type = targetSchema.getQueryType();
        }
        var _a = filterSelectionSet(targetSchema, type, validFragmentsWithType, operation.selectionSet), selectionSet = _a.selectionSet, operationUsedFragments = _a.usedFragments, operationUsedVariables = _a.usedVariables;
        usedFragments = union(usedFragments, operationUsedFragments);
        var _b = collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments), collectedUsedVariables = _b.usedVariables, collectedNewFragments = _b.newFragments, collectedFragmentSet = _b.fragmentSet;
        var operationOrFragmentVariables = union(operationUsedVariables, collectedUsedVariables);
        usedVariables = union(usedVariables, operationOrFragmentVariables);
        newFragments = collectedNewFragments;
        fragmentSet = collectedFragmentSet;
        var variableDefinitions = operation.variableDefinitions.filter(function (variable) { return operationOrFragmentVariables.indexOf(variable.variable.name.value) !== -1; });
        newOperations.push({
            kind: Kind.OPERATION_DEFINITION,
            operation: operation.operation,
            name: operation.name,
            directives: operation.directives,
            variableDefinitions: variableDefinitions,
            selectionSet: selectionSet,
        });
    });
    var newVariables = usedVariables.reduce(function (acc, variableName) {
        var variableValue = variables[variableName];
        if (variableValue !== undefined) {
            acc[variableName] = variableValue;
        }
        return acc;
    }, {});
    return {
        document: {
            kind: Kind.DOCUMENT,
            definitions: __spreadArray(__spreadArray([], __read(newOperations)), __read(newFragments)),
        },
        variables: newVariables,
    };
}
function collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments) {
    var remainingFragments = usedFragments.slice();
    var usedVariables = [];
    var newFragments = [];
    var _loop_1 = function () {
        var nextFragmentName = remainingFragments.pop();
        var fragment = validFragments.find(function (fr) { return fr.name.value === nextFragmentName; });
        if (fragment != null) {
            var name_1 = nextFragmentName;
            var typeName = fragment.typeCondition.name.value;
            var type = targetSchema.getType(typeName);
            var _a = filterSelectionSet(targetSchema, type, validFragmentsWithType, fragment.selectionSet), selectionSet = _a.selectionSet, fragmentUsedFragments = _a.usedFragments, fragmentUsedVariables = _a.usedVariables;
            remainingFragments = union(remainingFragments, fragmentUsedFragments);
            usedVariables = union(usedVariables, fragmentUsedVariables);
            if (!(name_1 in fragmentSet)) {
                fragmentSet[name_1] = true;
                newFragments.push({
                    kind: Kind.FRAGMENT_DEFINITION,
                    name: {
                        kind: Kind.NAME,
                        value: name_1,
                    },
                    typeCondition: fragment.typeCondition,
                    selectionSet: selectionSet,
                });
            }
        }
    };
    while (remainingFragments.length !== 0) {
        _loop_1();
    }
    return {
        usedVariables: usedVariables,
        newFragments: newFragments,
        fragmentSet: fragmentSet,
    };
}
function filterSelectionSet(schema, type, validFragments, selectionSet) {
    var _a;
    var usedFragments = [];
    var usedVariables = [];
    var typeInfo = new TypeInfo(schema, undefined, type);
    var filteredSelectionSet = visit(selectionSet, visitWithTypeInfo(typeInfo, (_a = {},
        _a[Kind.FIELD] = {
            enter: function (node) {
                var parentType = typeInfo.getParentType();
                if (isObjectType(parentType) || isInterfaceType(parentType)) {
                    var fields = parentType.getFields();
                    var field = node.name.value === '__typename' ? TypeNameMetaFieldDef : fields[node.name.value];
                    if (!field) {
                        return null;
                    }
                    var argNames_1 = (field.args != null ? field.args : []).map(function (arg) { return arg.name; });
                    if (node.arguments != null) {
                        var args = node.arguments.filter(function (arg) { return argNames_1.indexOf(arg.name.value) !== -1; });
                        if (args.length !== node.arguments.length) {
                            return __assign(__assign({}, node), { arguments: args });
                        }
                    }
                }
            },
            leave: function (node) {
                var _a;
                var resolvedType = getNamedType(typeInfo.getType());
                if (isObjectType(resolvedType) || isInterfaceType(resolvedType)) {
                    var selections = node.selectionSet != null ? node.selectionSet.selections : null;
                    if (selections == null || selections.length === 0) {
                        // need to remove any added variables. Is there a better way to do this?
                        visit(node, (_a = {},
                            _a[Kind.VARIABLE] = function (variableNode) {
                                var index = usedVariables.indexOf(variableNode.name.value);
                                if (index !== -1) {
                                    usedVariables.splice(index, 1);
                                }
                            },
                            _a));
                        return null;
                    }
                }
            },
        },
        _a[Kind.FRAGMENT_SPREAD] = function (node) {
            if (node.name.value in validFragments) {
                var parentType = typeInfo.getParentType();
                var innerType = validFragments[node.name.value];
                if (!implementsAbstractType(schema, parentType, innerType)) {
                    return null;
                }
                usedFragments.push(node.name.value);
                return;
            }
            return null;
        },
        _a[Kind.INLINE_FRAGMENT] = {
            enter: function (node) {
                if (node.typeCondition != null) {
                    var parentType = typeInfo.getParentType();
                    var innerType = schema.getType(node.typeCondition.name.value);
                    if (!implementsAbstractType(schema, parentType, innerType)) {
                        return null;
                    }
                }
            },
        },
        _a[Kind.VARIABLE] = function (node) {
            usedVariables.push(node.name.value);
        },
        _a)));
    return {
        selectionSet: filteredSelectionSet,
        usedFragments: usedFragments,
        usedVariables: usedVariables,
    };
}
function union() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var cache = Object.create(null);
    var result = [];
    arrays.forEach(function (array) {
        array.forEach(function (item) {
            if (!(item in cache)) {
                cache[item] = true;
                result.push(item);
            }
        });
    });
    return result;
}

var AddTypenameToAbstract = /** @class */ (function () {
    function AddTypenameToAbstract() {
    }
    AddTypenameToAbstract.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        var document = addTypenameToAbstract(delegationContext.targetSchema, originalRequest.document);
        return __assign(__assign({}, originalRequest), { document: document });
    };
    return AddTypenameToAbstract;
}());
function addTypenameToAbstract(targetSchema, document) {
    var _a;
    var typeInfo = new TypeInfo(targetSchema);
    return visit(document, visitWithTypeInfo(typeInfo, (_a = {},
        _a[Kind.SELECTION_SET] = function (node) {
            var parentType = typeInfo.getParentType();
            var selections = node.selections;
            if (parentType != null && isAbstractType(parentType)) {
                selections = selections.concat({
                    kind: Kind.FIELD,
                    name: {
                        kind: Kind.NAME,
                        value: '__typename',
                    },
                });
            }
            if (selections !== node.selections) {
                return __assign(__assign({}, node), { selections: selections });
            }
        },
        _a)));
}

var CheckResultAndHandleErrors = /** @class */ (function () {
    function CheckResultAndHandleErrors() {
    }
    CheckResultAndHandleErrors.prototype.transformResult = function (originalResult, delegationContext, _transformationContext) {
        return checkResultAndHandleErrors(originalResult, delegationContext.context != null ? delegationContext.context : {}, delegationContext.info, delegationContext.fieldName, delegationContext.subschema, delegationContext.returnType, delegationContext.skipTypeMerging, delegationContext.onLocatedError);
    };
    return CheckResultAndHandleErrors;
}());
function checkResultAndHandleErrors(result, context, info, responseKey, subschema, returnType, skipTypeMerging, onLocatedError) {
    if (responseKey === void 0) { responseKey = getResponseKeyFromInfo(info); }
    if (returnType === void 0) { returnType = info.returnType; }
    var _a = mergeDataAndErrors(result.data == null ? undefined : result.data[responseKey], result.errors == null ? [] : result.errors, info ? responsePathAsArray(info.path) : undefined, onLocatedError), data = _a.data, unpathedErrors = _a.unpathedErrors;
    return resolveExternalValue(data, unpathedErrors, subschema, context, info, returnType, skipTypeMerging);
}
function mergeDataAndErrors(data, errors, path, onLocatedError, index) {
    if (index === void 0) { index = 1; }
    if (data == null) {
        if (!errors.length) {
            return { data: null, unpathedErrors: [] };
        }
        if (errors.length === 1) {
            var error = onLocatedError ? onLocatedError(errors[0]) : errors[0];
            var newPath = path === undefined ? error.path : error.path === undefined ? path : path.concat(error.path.slice(1));
            return { data: relocatedError(errors[0], newPath), unpathedErrors: [] };
        }
        var newError = locatedError(new AggregateError(errors), undefined, path);
        return { data: newError, unpathedErrors: [] };
    }
    if (!errors.length) {
        return { data: data, unpathedErrors: [] };
    }
    var unpathedErrors = [];
    var errorMap = Object.create(null);
    errors.forEach(function (error) {
        var _a;
        var pathSegment = (_a = error.path) === null || _a === void 0 ? void 0 : _a[index];
        if (pathSegment != null) {
            var pathSegmentErrors = errorMap[pathSegment];
            if (pathSegmentErrors === undefined) {
                errorMap[pathSegment] = [error];
            }
            else {
                pathSegmentErrors.push(error);
            }
        }
        else {
            unpathedErrors.push(error);
        }
    });
    Object.keys(errorMap).forEach(function (pathSegment) {
        if (data[pathSegment] !== undefined) {
            var _a = mergeDataAndErrors(data[pathSegment], errorMap[pathSegment], path, onLocatedError, index + 1), newData = _a.data, newErrors = _a.unpathedErrors;
            data[pathSegment] = newData;
            unpathedErrors = unpathedErrors.concat(newErrors);
        }
        else {
            unpathedErrors = unpathedErrors.concat(errorMap[pathSegment]);
        }
    });
    return { data: data, unpathedErrors: unpathedErrors };
}

var AddArgumentsAsVariables = /** @class */ (function () {
    function AddArgumentsAsVariables(args) {
        this.args = Object.entries(args).reduce(function (prev, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], val = _c[1];
            return (__assign(__assign({}, prev), (_b = {}, _b[key] = val, _b)));
        }, {});
    }
    AddArgumentsAsVariables.prototype.transformRequest = function (originalRequest, delegationContext, _transformationContext) {
        var _a = addVariablesToRootField(delegationContext.targetSchema, originalRequest, this.args), document = _a.document, variables = _a.variables;
        return __assign(__assign({}, originalRequest), { document: document,
            variables: variables });
    };
    return AddArgumentsAsVariables;
}());
function addVariablesToRootField(targetSchema, originalRequest, args) {
    var document = originalRequest.document;
    var variableValues = originalRequest.variables;
    var operations = document.definitions.filter(function (def) { return def.kind === Kind.OPERATION_DEFINITION; });
    var fragments = document.definitions.filter(function (def) { return def.kind === Kind.FRAGMENT_DEFINITION; });
    var newOperations = operations.map(function (operation) {
        var variableDefinitionMap = operation.variableDefinitions.reduce(function (prev, def) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[def.variable.name.value] = def, _a)));
        }, {});
        var type;
        if (operation.operation === 'subscription') {
            type = targetSchema.getSubscriptionType();
        }
        else if (operation.operation === 'mutation') {
            type = targetSchema.getMutationType();
        }
        else {
            type = targetSchema.getQueryType();
        }
        var newSelectionSet = [];
        operation.selectionSet.selections.forEach(function (selection) {
            var _a;
            if (selection.kind === Kind.FIELD) {
                var argumentNodes = (_a = selection.arguments) !== null && _a !== void 0 ? _a : [];
                var argumentNodeMap_1 = argumentNodes.reduce(function (prev, argument) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[argument.name.value] = argument, _a)));
                }, {});
                var targetField = type.getFields()[selection.name.value];
                // excludes __typename
                if (targetField != null) {
                    updateArguments(targetField, argumentNodeMap_1, variableDefinitionMap, variableValues, args);
                }
                newSelectionSet.push(__assign(__assign({}, selection), { arguments: Object.keys(argumentNodeMap_1).map(function (argName) { return argumentNodeMap_1[argName]; }) }));
            }
            else {
                newSelectionSet.push(selection);
            }
        });
        return __assign(__assign({}, operation), { variableDefinitions: Object.keys(variableDefinitionMap).map(function (varName) { return variableDefinitionMap[varName]; }), selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: newSelectionSet,
            } });
    });
    return {
        document: __assign(__assign({}, document), { definitions: __spreadArray(__spreadArray([], __read(newOperations)), __read(fragments)) }),
        variables: variableValues,
    };
}
function updateArguments(targetField, argumentNodeMap, variableDefinitionMap, variableValues, newArgs) {
    targetField.args.forEach(function (argument) {
        var argName = argument.name;
        var argType = argument.type;
        if (argName in newArgs) {
            updateArgument(argName, argType, argumentNodeMap, variableDefinitionMap, variableValues, serializeInputValue(argType, newArgs[argName]));
        }
    });
}

function defaultDelegationBinding(delegationContext) {
    var _a;
    var delegationTransforms = [new CheckResultAndHandleErrors()];
    var info = delegationContext.info;
    var stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
    if (stitchingInfo != null) {
        delegationTransforms = delegationTransforms.concat([
            new ExpandAbstractTypes(),
            new AddSelectionSets(stitchingInfo.selectionSetsByType, stitchingInfo.selectionSetsByField, stitchingInfo.dynamicSelectionSetsByField),
            new WrapConcreteTypes(),
        ]);
    }
    else if (info != null) {
        delegationTransforms = delegationTransforms.concat([new WrapConcreteTypes(), new ExpandAbstractTypes()]);
    }
    else {
        delegationTransforms.push(new WrapConcreteTypes());
    }
    var transforms = delegationContext.transforms;
    if (transforms != null) {
        delegationTransforms = delegationTransforms.concat(transforms.slice().reverse());
    }
    var args = delegationContext.args;
    if (args != null) {
        delegationTransforms.push(new AddArgumentsAsVariables(args));
    }
    delegationTransforms = delegationTransforms.concat([new FilterToSchema(), new AddTypenameToAbstract()]);
    return delegationTransforms;
}

var Transformer = /** @class */ (function () {
    function Transformer(context, binding) {
        var _this = this;
        if (binding === void 0) { binding = defaultDelegationBinding; }
        this.transformations = [];
        this.delegationContext = context;
        var delegationTransforms = binding(this.delegationContext);
        delegationTransforms.forEach(function (transform) { return _this.addTransform(transform, {}); });
    }
    Transformer.prototype.addTransform = function (transform, context) {
        if (context === void 0) { context = {}; }
        this.transformations.push({ transform: transform, context: context });
    };
    Transformer.prototype.transformRequest = function (originalRequest) {
        var _this = this;
        return this.transformations.reduce(function (request, transformation) {
            return transformation.transform.transformRequest != null
                ? transformation.transform.transformRequest(request, _this.delegationContext, transformation.context)
                : request;
        }, originalRequest);
    };
    Transformer.prototype.transformResult = function (originalResult) {
        var _this = this;
        return this.transformations.reduceRight(function (result, transformation) {
            return transformation.transform.transformResult != null
                ? transformation.transform.transformResult(result, _this.delegationContext, transformation.context)
                : result;
        }, originalResult);
    };
    return Transformer;
}());

function delegateToSchema(options) {
    var info = options.info, operationName = options.operationName, _a = options.operation, operation = _a === void 0 ? getDelegatingOperation(info.parentType, info.schema) : _a, _b = options.fieldName, fieldName = _b === void 0 ? info.fieldName : _b, _c = options.returnType, returnType = _c === void 0 ? info.returnType : _c, selectionSet = options.selectionSet, fieldNodes = options.fieldNodes;
    var request = createRequestFromInfo({
        info: info,
        operation: operation,
        fieldName: fieldName,
        selectionSet: selectionSet,
        fieldNodes: fieldNodes,
        operationName: operationName,
    });
    return delegateRequest(__assign(__assign({}, options), { request: request,
        operation: operation,
        fieldName: fieldName,
        returnType: returnType }));
}
function getDelegationReturnType(targetSchema, operation, fieldName) {
    var rootType;
    if (operation === 'query') {
        rootType = targetSchema.getQueryType();
    }
    else if (operation === 'mutation') {
        rootType = targetSchema.getMutationType();
    }
    else {
        rootType = targetSchema.getSubscriptionType();
    }
    return rootType.getFields()[fieldName].type;
}
function delegateRequest(_a) {
    var _b, _c, _d;
    var request = _a.request, subschemaOrSubschemaConfig = _a.schema, rootValue = _a.rootValue, info = _a.info, operation = _a.operation, fieldName = _a.fieldName, args = _a.args, returnType = _a.returnType, onLocatedError = _a.onLocatedError, context = _a.context, _e = _a.transforms, transforms = _e === void 0 ? [] : _e, transformedSchema = _a.transformedSchema, skipValidation = _a.skipValidation, skipTypeMerging = _a.skipTypeMerging, binding = _a.binding;
    var operationDefinition;
    var targetOperation;
    var targetFieldName;
    if (operation == null) {
        operationDefinition = getOperationAST(request.document, undefined);
        targetOperation = operationDefinition.operation;
    }
    else {
        targetOperation = operation;
    }
    if (fieldName == null) {
        operationDefinition = operationDefinition !== null && operationDefinition !== void 0 ? operationDefinition : getOperationAST(request.document, undefined);
        targetFieldName = operationDefinition.selectionSet.selections[0].name.value;
    }
    else {
        targetFieldName = fieldName;
    }
    var _f = collectTargetParameters(subschemaOrSubschemaConfig, rootValue, info, transforms), targetSchema = _f.targetSchema, targetRootValue = _f.targetRootValue, subschemaConfig = _f.subschemaConfig, allTransforms = _f.allTransforms;
    var delegationContext = {
        subschema: subschemaOrSubschemaConfig,
        targetSchema: targetSchema,
        operation: targetOperation,
        fieldName: targetFieldName,
        args: args,
        context: context,
        info: info,
        returnType: (_b = returnType !== null && returnType !== void 0 ? returnType : info === null || info === void 0 ? void 0 : info.returnType) !== null && _b !== void 0 ? _b : getDelegationReturnType(targetSchema, targetOperation, targetFieldName),
        onLocatedError: onLocatedError,
        transforms: allTransforms,
        transformedSchema: (_d = transformedSchema !== null && transformedSchema !== void 0 ? transformedSchema : (_c = subschemaConfig) === null || _c === void 0 ? void 0 : _c.transformedSchema) !== null && _d !== void 0 ? _d : targetSchema,
        skipTypeMerging: skipTypeMerging,
    };
    var transformer = new Transformer(delegationContext, binding);
    var processedRequest = transformer.transformRequest(request);
    if (!skipValidation) {
        validateRequest(targetSchema, processedRequest.document);
    }
    if (targetOperation === 'query' || targetOperation === 'mutation') {
        var executor_1 = (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.executor) || createDefaultExecutor(targetSchema, (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.rootValue) || targetRootValue);
        if (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batch) {
            var batchingOptions = subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batchingOptions;
            executor_1 = getBatchingExecutor(context, executor_1, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.dataLoaderOptions, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.extensionsReducer);
        }
        return new ValueOrPromise(function () { return executor_1(__assign(__assign({}, processedRequest), { context: context,
            info: info })); }).then(function (originalResult) { return transformer.transformResult(originalResult); }).resolve();
    }
    var subscriber = (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.subscriber) || createDefaultSubscriber(targetSchema, (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.rootValue) || targetRootValue);
    return subscriber(__assign(__assign({}, processedRequest), { context: context,
        info: info })).then(function (subscriptionResult) {
        if (Symbol.asyncIterator in subscriptionResult) {
            // "subscribe" to the subscription result and map the result through the transforms
            return mapAsyncIterator(subscriptionResult, function (originalResult) {
                var _a;
                return (_a = {},
                    _a[targetFieldName] = transformer.transformResult(originalResult),
                    _a);
            });
        }
        return transformer.transformResult(subscriptionResult);
    });
}
var emptyObject = {};
function collectTargetParameters(subschema, rootValue, info, transforms) {
    var _a, _b, _c, _d, _e;
    if (transforms === void 0) { transforms = []; }
    var stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
    var subschemaOrSubschemaConfig = (_b = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.subschemaMap.get(subschema)) !== null && _b !== void 0 ? _b : subschema;
    if (isSubschemaConfig(subschemaOrSubschemaConfig)) {
        return {
            targetSchema: subschemaOrSubschemaConfig.schema,
            targetRootValue: (_d = (_c = rootValue !== null && rootValue !== void 0 ? rootValue : subschemaOrSubschemaConfig === null || subschemaOrSubschemaConfig === void 0 ? void 0 : subschemaOrSubschemaConfig.rootValue) !== null && _c !== void 0 ? _c : info === null || info === void 0 ? void 0 : info.rootValue) !== null && _d !== void 0 ? _d : emptyObject,
            subschemaConfig: subschemaOrSubschemaConfig,
            allTransforms: subschemaOrSubschemaConfig.transforms != null
                ? subschemaOrSubschemaConfig.transforms.concat(transforms)
                : transforms,
        };
    }
    return {
        targetSchema: subschemaOrSubschemaConfig,
        targetRootValue: (_e = rootValue !== null && rootValue !== void 0 ? rootValue : info === null || info === void 0 ? void 0 : info.rootValue) !== null && _e !== void 0 ? _e : emptyObject,
        allTransforms: transforms,
    };
}
function validateRequest(targetSchema, document) {
    var errors = validate(targetSchema, document);
    if (errors.length > 0) {
        if (errors.length > 1) {
            var combinedError = new AggregateError(errors);
            throw combinedError;
        }
        var error = errors[0];
        throw error.originalError || error;
    }
}
var createDefaultExecutor = memoize2(function (schema, rootValue) {
    return (function (_a) {
        var document = _a.document, context = _a.context, variables = _a.variables, info = _a.info;
        return execute({
            schema: schema,
            document: document,
            contextValue: context,
            variableValues: variables,
            rootValue: rootValue !== null && rootValue !== void 0 ? rootValue : info === null || info === void 0 ? void 0 : info.rootValue,
        });
    });
});
function createDefaultSubscriber(schema, rootValue) {
    return function (_a) {
        var document = _a.document, context = _a.context, variables = _a.variables, info = _a.info;
        return subscribe({
            schema: schema,
            document: document,
            contextValue: context,
            variableValues: variables,
            rootValue: rootValue !== null && rootValue !== void 0 ? rootValue : info === null || info === void 0 ? void 0 : info.rootValue,
        });
    };
}

export { AddArgumentsAsVariables, AddSelectionSets, AddTypenameToAbstract, CheckResultAndHandleErrors, ExpandAbstractTypes, FilterToSchema, Subschema, VisitSelectionSets, annotateExternalObject, applySchemaTransforms, checkResultAndHandleErrors, cloneSubschemaConfig, createRequest, createRequestFromInfo, defaultDelegationBinding, defaultMergedResolver, delegateRequest, delegateToSchema, getDelegatingOperation, getSubschema, getUnpathedErrors, isExternalObject, isSubschema, isSubschemaConfig, mergeExternalObjects, resolveExternalValue };
//# sourceMappingURL=index.esm.js.map
