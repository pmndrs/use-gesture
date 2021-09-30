import { cloneSchema, serializeInputValue, updateArgument, collectFields, relocatedError, mergeDeep, getResponseKeyFromInfo, implementsAbstractType, mapAsyncIterator } from '@graphql-tools/utils';
import { Kind, typeFromAST, GraphQLError, locatedError, responsePathAsArray, getNamedType, getNullableType, isLeafType, isCompositeType, isListType, isAbstractType, defaultFieldResolver, TypeInfo, visit, visitWithTypeInfo, print, isInterfaceType, isObjectType, TypeNameMetaFieldDef, getOperationAST, subscribe, validate, execute } from 'graphql';
import AggregateError from '@ardatan/aggregate-error';
import { ValueOrPromise } from 'value-or-promise';
import { getBatchingExecutor } from '@graphql-tools/batch-execute';

function applySchemaTransforms(originalWrappingSchema, subschemaConfig, transformedSchema) {
    const schemaTransforms = subschemaConfig.transforms;
    if (schemaTransforms == null) {
        return originalWrappingSchema;
    }
    return schemaTransforms.reduce((schema, transform) => transform.transformSchema != null
        ? transform.transformSchema(cloneSchema(schema), subschemaConfig, transformedSchema)
        : schema, originalWrappingSchema);
}

function isSubschema(value) {
    return Boolean(value.transformedSchema);
}
class Subschema {
    constructor(config) {
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
}

function getDelegatingOperation(parentType, schema) {
    if (parentType === schema.getMutationType()) {
        return 'mutation';
    }
    else if (parentType === schema.getSubscriptionType()) {
        return 'subscription';
    }
    return 'query';
}
function createRequestFromInfo({ info, operationName, operation = getDelegatingOperation(info.parentType, info.schema), fieldName = info.fieldName, selectionSet, fieldNodes = info.fieldNodes, }) {
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
        selectionSet,
        fieldNodes,
    });
}
function createRequest({ sourceSchema, sourceParentType, sourceFieldName, fragments, variableDefinitions, variableValues, targetOperationName, targetOperation, targetFieldName, selectionSet, fieldNodes, }) {
    var _a;
    let newSelectionSet;
    let argumentNodeMap;
    if (selectionSet != null) {
        newSelectionSet = selectionSet;
        argumentNodeMap = Object.create(null);
    }
    else {
        const selections = fieldNodes.reduce((acc, fieldNode) => (fieldNode.selectionSet != null ? acc.concat(fieldNode.selectionSet.selections) : acc), []);
        newSelectionSet = selections.length
            ? {
                kind: Kind.SELECTION_SET,
                selections,
            }
            : undefined;
        argumentNodeMap = {};
        const args = (_a = fieldNodes[0]) === null || _a === void 0 ? void 0 : _a.arguments;
        if (args) {
            argumentNodeMap = args.reduce((prev, curr) => ({
                ...prev,
                [curr.name.value]: curr,
            }), argumentNodeMap);
        }
    }
    const newVariables = Object.create(null);
    const variableDefinitionMap = Object.create(null);
    if (sourceSchema != null && variableDefinitions != null) {
        variableDefinitions.forEach(def => {
            const varName = def.variable.name.value;
            variableDefinitionMap[varName] = def;
            const varType = typeFromAST(sourceSchema, def.type);
            const serializedValue = serializeInputValue(varType, variableValues[varName]);
            if (serializedValue !== undefined) {
                newVariables[varName] = serializedValue;
            }
        });
    }
    if (sourceParentType != null) {
        updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, newVariables);
    }
    const rootfieldNode = {
        kind: Kind.FIELD,
        arguments: Object.keys(argumentNodeMap).map(argName => argumentNodeMap[argName]),
        name: {
            kind: Kind.NAME,
            value: targetFieldName || fieldNodes[0].name.value,
        },
        selectionSet: newSelectionSet,
    };
    const operationName = targetOperationName
        ? {
            kind: Kind.NAME,
            value: targetOperationName,
        }
        : undefined;
    const operationDefinition = {
        kind: Kind.OPERATION_DEFINITION,
        name: operationName,
        operation: targetOperation,
        variableDefinitions: Object.keys(variableDefinitionMap).map(varName => variableDefinitionMap[varName]),
        selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [rootfieldNode],
        },
    };
    let definitions = [operationDefinition];
    if (fragments != null) {
        definitions = definitions.concat(Object.keys(fragments).map(fragmentName => fragments[fragmentName]));
    }
    const document = {
        kind: Kind.DOCUMENT,
        definitions,
    };
    return {
        document,
        variables: newVariables,
    };
}
function updateArgumentsWithDefaults(sourceParentType, sourceFieldName, argumentNodeMap, variableDefinitionMap, variableValues) {
    const sourceField = sourceParentType.getFields()[sourceFieldName];
    sourceField.args.forEach((argument) => {
        const argName = argument.name;
        const sourceArgType = argument.type;
        if (argumentNodeMap[argName] === undefined) {
            const defaultValue = argument.defaultValue;
            if (defaultValue !== undefined) {
                updateArgument(argName, sourceArgType, argumentNodeMap, variableDefinitionMap, variableValues, serializeInputValue(sourceArgType, defaultValue));
            }
        }
    });
}

const UNPATHED_ERRORS_SYMBOL = Symbol('subschemaErrors');
const OBJECT_SUBSCHEMA_SYMBOL = Symbol('initialSubschema');
const FIELD_SUBSCHEMA_MAP_SYMBOL = Symbol('subschemaMap');

function isExternalObject(data) {
    return data[UNPATHED_ERRORS_SYMBOL] !== undefined;
}
function annotateExternalObject(object, errors, subschema) {
    Object.defineProperties(object, {
        [OBJECT_SUBSCHEMA_SYMBOL]: { value: subschema },
        [FIELD_SUBSCHEMA_MAP_SYMBOL]: { value: Object.create(null) },
        [UNPATHED_ERRORS_SYMBOL]: { value: errors },
    });
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
    const results = [];
    let errors = [];
    sources.forEach((source, index) => {
        if (source instanceof Error || source === null) {
            const selectionSet = selectionSets[index];
            const fieldNodes = collectFields({
                schema,
                variableValues: {},
                fragments: {},
            }, schema.getType(typeName), selectionSet, Object.create(null), Object.create(null));
            const nullResult = {};
            Object.keys(fieldNodes).forEach(responseKey => {
                if (source instanceof GraphQLError) {
                    nullResult[responseKey] = relocatedError(source, path.concat([responseKey]));
                }
                else if (source instanceof Error) {
                    nullResult[responseKey] = locatedError(source, fieldNodes[responseKey], path.concat([responseKey]));
                }
                else {
                    nullResult[responseKey] = null;
                }
            });
            results.push(nullResult);
        }
        else {
            errors = errors.concat(source[UNPATHED_ERRORS_SYMBOL]);
            results.push(source);
        }
    });
    const combinedResult = results.reduce(mergeDeep, target);
    const newFieldSubschemaMap = (_a = target[FIELD_SUBSCHEMA_MAP_SYMBOL]) !== null && _a !== void 0 ? _a : Object.create(null);
    results.forEach((source) => {
        const objectSubschema = source[OBJECT_SUBSCHEMA_SYMBOL];
        const fieldSubschemaMap = source[FIELD_SUBSCHEMA_MAP_SYMBOL];
        if (fieldSubschemaMap === undefined) {
            Object.keys(source).forEach(responseKey => {
                newFieldSubschemaMap[responseKey] = objectSubschema;
            });
        }
        else {
            Object.keys(source).forEach(responseKey => {
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
    const newSubschemaConfig = {
        ...subschemaConfig,
        transforms: subschemaConfig.transforms != null ? [...subschemaConfig.transforms] : undefined,
    };
    if (newSubschemaConfig.merge != null) {
        newSubschemaConfig.merge = { ...subschemaConfig.merge };
        Object.keys(newSubschemaConfig.merge).forEach(typeName => {
            const mergedTypeConfig = (newSubschemaConfig.merge[typeName] = { ...subschemaConfig.merge[typeName] });
            if (mergedTypeConfig.entryPoints != null) {
                mergedTypeConfig.entryPoints = mergedTypeConfig.entryPoints.map(entryPoint => ({ ...entryPoint }));
            }
            if (mergedTypeConfig.fields != null) {
                const fields = (mergedTypeConfig.fields = { ...mergedTypeConfig.fields });
                Object.keys(fields).forEach(fieldName => {
                    fields[fieldName] = { ...fields[fieldName] };
                });
            }
        });
    }
    return newSubschemaConfig;
}

function memoizeInfoAnd2Objects(fn) {
    let cache1;
    function memoized(a1, a2, a3) {
        if (!cache1) {
            cache1 = new WeakMap();
            const cache2 = new WeakMap();
            cache1.set(a1.fieldNodes, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        let cache2 = cache1.get(a1.fieldNodes);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1.fieldNodes, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        let cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        const cachedValue = cache3.get(a3);
        if (cachedValue === undefined) {
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize4(fn) {
    let cache1;
    function memoized(a1, a2, a3, a4) {
        if (!cache1) {
            cache1 = new WeakMap();
            const cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const cache4 = new WeakMap();
            cache3.set(a3, cache4);
            const newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        let cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const cache4 = new WeakMap();
            cache3.set(a3, cache4);
            const newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        let cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const cache4 = new WeakMap();
            cache3.set(a3, cache4);
            const newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        const cache4 = cache3.get(a3);
        if (!cache4) {
            const cache4 = new WeakMap();
            cache3.set(a3, cache4);
            const newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        const cachedValue = cache4.get(a4);
        if (cachedValue === undefined) {
            const newValue = fn(a1, a2, a3, a4);
            cache4.set(a4, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize3(fn) {
    let cache1;
    function memoized(a1, a2, a3) {
        if (!cache1) {
            cache1 = new WeakMap();
            const cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        let cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        let cache3 = cache2.get(a2);
        if (!cache3) {
            cache3 = new WeakMap();
            cache2.set(a2, cache3);
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        const cachedValue = cache3.get(a3);
        if (cachedValue === undefined) {
            const newValue = fn(a1, a2, a3);
            cache3.set(a3, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}
function memoize2(fn) {
    let cache1;
    function memoized(a1, a2) {
        if (!cache1) {
            cache1 = new WeakMap();
            const cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const newValue = fn(a1, a2);
            cache2.set(a2, newValue);
            return newValue;
        }
        let cache2 = cache1.get(a1);
        if (!cache2) {
            cache2 = new WeakMap();
            cache1.set(a1, cache2);
            const newValue = fn(a1, a2);
            cache2.set(a2, newValue);
            return newValue;
        }
        const cachedValue = cache2.get(a2);
        if (cachedValue === undefined) {
            const newValue = fn(a1, a2);
            cache2.set(a2, newValue);
            return newValue;
        }
        return cachedValue;
    }
    return memoized;
}

function collectSubFields(info, typeName) {
    let subFieldNodes = Object.create(null);
    const visitedFragmentNames = Object.create(null);
    const type = info.schema.getType(typeName);
    const partialExecutionContext = {
        schema: info.schema,
        variableValues: info.variableValues,
        fragments: info.fragments,
    };
    info.fieldNodes.forEach(fieldNode => {
        subFieldNodes = collectFields(partialExecutionContext, type, fieldNode.selectionSet, subFieldNodes, visitedFragmentNames);
    });
    const stitchingInfo = info.schema.extensions.stitchingInfo;
    const selectionSetsByField = stitchingInfo.selectionSetsByField;
    Object.keys(subFieldNodes).forEach(responseName => {
        var _a;
        const fieldName = subFieldNodes[responseName][0].name.value;
        const fieldSelectionSet = (_a = selectionSetsByField === null || selectionSetsByField === void 0 ? void 0 : selectionSetsByField[typeName]) === null || _a === void 0 ? void 0 : _a[fieldName];
        if (fieldSelectionSet != null) {
            subFieldNodes = collectFields(partialExecutionContext, type, fieldSelectionSet, subFieldNodes, visitedFragmentNames);
        }
    });
    return subFieldNodes;
}
const getFieldsNotInSubschema = memoizeInfoAnd2Objects(function (info, subschema, mergedTypeInfo) {
    const typeMap = isSubschemaConfig(subschema) ? mergedTypeInfo.typeMaps.get(subschema) : subschema.getTypeMap();
    const typeName = mergedTypeInfo.typeName;
    const fields = typeMap[typeName].getFields();
    const subFieldNodes = collectSubFields(info, typeName);
    let fieldsNotInSchema = [];
    Object.keys(subFieldNodes).forEach(responseName => {
        const fieldName = subFieldNodes[responseName][0].name.value;
        if (!(fieldName in fields)) {
            fieldsNotInSchema = fieldsNotInSchema.concat(subFieldNodes[responseName]);
        }
    });
    return fieldsNotInSchema;
});

const sortSubschemasByProxiability = memoize4(function (mergedTypeInfo, sourceSubschemaOrSourceSubschemas, targetSubschemas, fieldNodes) {
    // 1.  calculate if possible to delegate to given subschema
    const proxiableSubschemas = [];
    const nonProxiableSubschemas = [];
    targetSubschemas.forEach(t => {
        const selectionSet = mergedTypeInfo.selectionSets.get(t);
        const fieldSelectionSets = mergedTypeInfo.fieldSelectionSets.get(t);
        if (selectionSet != null &&
            !subschemaTypesContainSelectionSet(mergedTypeInfo, sourceSubschemaOrSourceSubschemas, selectionSet)) {
            nonProxiableSubschemas.push(t);
        }
        else {
            if (fieldSelectionSets == null ||
                fieldNodes.every(fieldNode => {
                    const fieldName = fieldNode.name.value;
                    const fieldSelectionSet = fieldSelectionSets[fieldName];
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
        proxiableSubschemas,
        nonProxiableSubschemas,
    };
});
const buildDelegationPlan = memoize3(function (mergedTypeInfo, fieldNodes, proxiableSubschemas) {
    const { uniqueFields, nonUniqueFields } = mergedTypeInfo;
    const unproxiableFieldNodes = [];
    // 2. for each selection:
    const delegationMap = new Map();
    fieldNodes.forEach(fieldNode => {
        if (fieldNode.name.value === '__typename') {
            return;
        }
        // 2a. use uniqueFields map to assign fields to subschema if one of possible subschemas
        const uniqueSubschema = uniqueFields[fieldNode.name.value];
        if (uniqueSubschema != null) {
            if (!proxiableSubschemas.includes(uniqueSubschema)) {
                unproxiableFieldNodes.push(fieldNode);
                return;
            }
            const existingSubschema = delegationMap.get(uniqueSubschema);
            if (existingSubschema != null) {
                existingSubschema.push(fieldNode);
            }
            else {
                delegationMap.set(uniqueSubschema, [fieldNode]);
            }
            return;
        }
        // 2b. use nonUniqueFields to assign to a possible subschema,
        //     preferring one of the subschemas already targets of delegation
        let nonUniqueSubschemas = nonUniqueFields[fieldNode.name.value];
        if (nonUniqueSubschemas == null) {
            unproxiableFieldNodes.push(fieldNode);
            return;
        }
        nonUniqueSubschemas = nonUniqueSubschemas.filter(s => proxiableSubschemas.includes(s));
        if (!nonUniqueSubschemas.length) {
            unproxiableFieldNodes.push(fieldNode);
            return;
        }
        const existingSubschema = nonUniqueSubschemas.find(s => delegationMap.has(s));
        if (existingSubschema != null) {
            delegationMap.get(existingSubschema).push(fieldNode);
        }
        else {
            delegationMap.set(nonUniqueSubschemas[0], [fieldNode]);
        }
    });
    const finalDelegationMap = new Map();
    delegationMap.forEach((selections, subschema) => {
        finalDelegationMap.set(subschema, {
            kind: Kind.SELECTION_SET,
            selections,
        });
    });
    return {
        delegationMap: finalDelegationMap,
        unproxiableFieldNodes,
    };
});
const combineSubschemas = memoize2(function (subschemaOrSubschemas, additionalSubschemas) {
    return Array.isArray(subschemaOrSubschemas)
        ? subschemaOrSubschemas.concat(additionalSubschemas)
        : [subschemaOrSubschemas].concat(additionalSubschemas);
});
function mergeFields(mergedTypeInfo, typeName, object, fieldNodes, sourceSubschemaOrSourceSubschemas, targetSubschemas, context, info) {
    if (!fieldNodes.length) {
        return object;
    }
    const { proxiableSubschemas, nonProxiableSubschemas } = sortSubschemasByProxiability(mergedTypeInfo, sourceSubschemaOrSourceSubschemas, targetSubschemas, fieldNodes);
    const { delegationMap, unproxiableFieldNodes } = buildDelegationPlan(mergedTypeInfo, fieldNodes, proxiableSubschemas);
    if (!delegationMap.size) {
        return object;
    }
    const resultMap = new Map();
    delegationMap.forEach((selectionSet, s) => {
        const resolver = mergedTypeInfo.resolvers.get(s);
        const valueOrPromise = new ValueOrPromise(() => resolver(object, context, info, s, selectionSet)).catch(error => error);
        resultMap.set(valueOrPromise, selectionSet);
    });
    return ValueOrPromise.all(Array.from(resultMap.keys())).then(results => mergeFields(mergedTypeInfo, typeName, mergeExternalObjects(info.schema, responsePathAsArray(info.path), object.__typename, object, results, Array.from(resultMap.values())), unproxiableFieldNodes, combineSubschemas(sourceSubschemaOrSourceSubschemas, proxiableSubschemas), nonProxiableSubschemas, context, info)).resolve();
}
const subschemaTypesContainSelectionSet = memoize3(function (mergedTypeInfo, sourceSubschemaOrSourceSubschemas, selectionSet) {
    if (Array.isArray(sourceSubschemaOrSourceSubschemas)) {
        return typesContainSelectionSet(sourceSubschemaOrSourceSubschemas.map(sourceSubschema => sourceSubschema.transformedSchema.getType(mergedTypeInfo.typeName)), selectionSet);
    }
    return typesContainSelectionSet([sourceSubschemaOrSourceSubschemas.transformedSchema.getType(mergedTypeInfo.typeName)], selectionSet);
});
function typesContainSelectionSet(types, selectionSet) {
    const fieldMaps = types.map(type => type.getFields());
    for (const selection of selectionSet.selections) {
        if (selection.kind === Kind.FIELD) {
            const fields = fieldMaps.map(fieldMap => fieldMap[selection.name.value]).filter(field => field != null);
            if (!fields.length) {
                return false;
            }
            if (selection.selectionSet != null) {
                return typesContainSelectionSet(fields.map(field => getNamedType(field.type)), selection.selectionSet);
            }
        }
        else if (selection.kind === Kind.INLINE_FRAGMENT && selection.typeCondition.name.value === types[0].name) {
            return typesContainSelectionSet(types, selection.selectionSet);
        }
    }
    return true;
}

function resolveExternalValue(result, unpathedErrors, subschema, context, info, returnType = info.returnType, skipTypeMerging) {
    const type = getNullableType(returnType);
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
    const stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
    if (skipTypeMerging || !stitchingInfo) {
        return object;
    }
    let typeName;
    if (isAbstractType(type)) {
        const resolvedType = info.schema.getTypeMap()[object.__typename];
        if (resolvedType == null) {
            throw new Error(`Unable to resolve type '${object.__typename}'. Did you forget to include a transform that renames types? Did you delegate to the original subschema rather that the subschema config object containing the transform?`);
        }
        typeName = resolvedType.name;
    }
    else {
        typeName = type.name;
    }
    const mergedTypeInfo = stitchingInfo.mergedTypes[typeName];
    let targetSubschemas;
    // Within the stitching context, delegation to a stitched GraphQLSchema or SubschemaConfig
    // will be redirected to the appropriate Subschema object, from which merge targets can be queried.
    if (mergedTypeInfo != null) {
        targetSubschemas = mergedTypeInfo.targetSubschemas.get(subschema);
    }
    // If there are no merge targets from the subschema, return.
    if (!targetSubschemas) {
        return object;
    }
    const fieldNodes = getFieldsNotInSubschema(info, subschema, mergedTypeInfo);
    return mergeFields(mergedTypeInfo, typeName, object, fieldNodes, subschema, targetSubschemas, context, info);
}
function resolveExternalList(type, list, unpathedErrors, subschema, context, info, skipTypeMerging) {
    return list.map(listMember => resolveExternalListMember(getNullableType(type.ofType), listMember, unpathedErrors, subschema, context, info, skipTypeMerging));
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
const reportedErrors = new Map();
function reportUnpathedErrorsViaNull(unpathedErrors) {
    if (unpathedErrors.length) {
        const unreportedErrors = [];
        unpathedErrors.forEach(error => {
            if (!reportedErrors.has(error)) {
                unreportedErrors.push(error);
                reportedErrors.set(error, true);
            }
        });
        if (unreportedErrors.length) {
            if (unreportedErrors.length === 1) {
                return unreportedErrors[0];
            }
            const combinedError = new AggregateError(unreportedErrors);
            return locatedError(combinedError, undefined, unreportedErrors[0].path);
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
    const responseKey = getResponseKeyFromInfo(info);
    // check to see if parent is not a proxied result, i.e. if parent resolver was manually overwritten
    // See https://github.com/apollographql/graphql-tools/issues/967
    if (!isExternalObject(parent)) {
        return defaultFieldResolver(parent, args, context, info);
    }
    const data = parent[responseKey];
    const unpathedErrors = getUnpathedErrors(parent);
    const subschema = getSubschema(parent, responseKey);
    return resolveExternalValue(data, unpathedErrors, subschema, context, info);
}

class VisitSelectionSets {
    constructor(visitor) {
        this.visitor = visitor;
    }
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        const document = visitSelectionSets(originalRequest, delegationContext.info.schema, delegationContext.returnType, this.visitor);
        return {
            ...originalRequest,
            document,
        };
    }
}
function visitSelectionSets(request, schema, initialType, visitor) {
    const { document, variables } = request;
    const operations = [];
    const fragments = Object.create(null);
    document.definitions.forEach(def => {
        if (def.kind === Kind.OPERATION_DEFINITION) {
            operations.push(def);
        }
        else if (def.kind === Kind.FRAGMENT_DEFINITION) {
            fragments[def.name.value] = def;
        }
    });
    const partialExecutionContext = {
        schema,
        variableValues: variables,
        fragments,
    };
    const typeInfo = new TypeInfo(schema, undefined, initialType);
    const newDefinitions = operations.map(operation => {
        const type = operation.operation === 'query'
            ? schema.getQueryType()
            : operation.operation === 'mutation'
                ? schema.getMutationType()
                : schema.getSubscriptionType();
        const fields = collectFields(partialExecutionContext, type, operation.selectionSet, Object.create(null), Object.create(null));
        const newSelections = [];
        Object.keys(fields).forEach(responseKey => {
            const fieldNodes = fields[responseKey];
            fieldNodes.forEach(fieldNode => {
                const selectionSet = fieldNode.selectionSet;
                if (selectionSet == null) {
                    newSelections.push(fieldNode);
                    return;
                }
                const newSelectionSet = visit(selectionSet, visitWithTypeInfo(typeInfo, {
                    [Kind.SELECTION_SET]: node => visitor(node, typeInfo),
                }));
                if (newSelectionSet === selectionSet) {
                    newSelections.push(fieldNode);
                    return;
                }
                newSelections.push({
                    ...fieldNode,
                    selectionSet: newSelectionSet,
                });
            });
        });
        return {
            ...operation,
            selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: newSelections,
            },
        };
    });
    Object.values(fragments).forEach(fragment => {
        newDefinitions.push(visit(fragment, visitWithTypeInfo(typeInfo, {
            [Kind.SELECTION_SET]: node => visitor(node, typeInfo),
        })));
    });
    return {
        ...document,
        definitions: newDefinitions,
    };
}

class AddSelectionSets {
    constructor(selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField) {
        this.transformer = new VisitSelectionSets((node, typeInfo) => visitSelectionSet(node, typeInfo, selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField));
    }
    transformRequest(originalRequest, delegationContext, transformationContext) {
        return this.transformer.transformRequest(originalRequest, delegationContext, transformationContext);
    }
}
function visitSelectionSet(node, typeInfo, selectionSetsByType, selectionSetsByField, dynamicSelectionSetsByField) {
    const parentType = typeInfo.getParentType();
    const newSelections = new Map();
    if (parentType != null) {
        const parentTypeName = parentType.name;
        addSelectionsToMap(newSelections, node);
        if (parentTypeName in selectionSetsByType) {
            const selectionSet = selectionSetsByType[parentTypeName];
            addSelectionsToMap(newSelections, selectionSet);
        }
        if (parentTypeName in selectionSetsByField) {
            node.selections.forEach(selection => {
                if (selection.kind === Kind.FIELD) {
                    const name = selection.name.value;
                    const selectionSet = selectionSetsByField[parentTypeName][name];
                    if (selectionSet != null) {
                        addSelectionsToMap(newSelections, selectionSet);
                    }
                }
            });
        }
        if (parentTypeName in dynamicSelectionSetsByField) {
            node.selections.forEach(selection => {
                if (selection.kind === Kind.FIELD) {
                    const name = selection.name.value;
                    const dynamicSelectionSets = dynamicSelectionSetsByField[parentTypeName][name];
                    if (dynamicSelectionSets != null) {
                        dynamicSelectionSets.forEach(selectionSetFn => {
                            const selectionSet = selectionSetFn(selection);
                            if (selectionSet != null) {
                                addSelectionsToMap(newSelections, selectionSet);
                            }
                        });
                    }
                }
            });
        }
        return {
            ...node,
            selections: Array.from(newSelections.values()),
        };
    }
}
const addSelectionsToMap = memoize2(function (map, selectionSet) {
    selectionSet.selections.forEach(selection => {
        map.set(print(selection), selection);
    });
});

class ExpandAbstractTypes {
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        const targetSchema = delegationContext.targetSchema;
        const { possibleTypesMap, interfaceExtensionsMap } = extractPossibleTypes(delegationContext.info.schema, targetSchema);
        const reversePossibleTypesMap = flipMapping(possibleTypesMap);
        const document = expandAbstractTypes(targetSchema, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, originalRequest.document);
        return {
            ...originalRequest,
            document,
        };
    }
}
function extractPossibleTypes(sourceSchema, targetSchema) {
    const typeMap = sourceSchema.getTypeMap();
    const possibleTypesMap = Object.create(null);
    const interfaceExtensionsMap = Object.create(null);
    Object.keys(typeMap).forEach(typeName => {
        const type = typeMap[typeName];
        if (isAbstractType(type)) {
            const targetType = targetSchema.getType(typeName);
            if (isInterfaceType(type) && isInterfaceType(targetType)) {
                const targetTypeFields = targetType.getFields();
                const extensionFields = Object.create(null);
                Object.keys(type.getFields()).forEach((fieldName) => {
                    if (!targetTypeFields[fieldName]) {
                        extensionFields[fieldName] = true;
                    }
                });
                if (Object.keys(extensionFields).length) {
                    interfaceExtensionsMap[typeName] = extensionFields;
                }
            }
            if (!isAbstractType(targetType) || typeName in interfaceExtensionsMap) {
                const implementations = sourceSchema.getPossibleTypes(type);
                possibleTypesMap[typeName] = implementations
                    .filter(impl => targetSchema.getType(impl.name))
                    .map(impl => impl.name);
            }
        }
    });
    return { possibleTypesMap, interfaceExtensionsMap };
}
function flipMapping(mapping) {
    const result = Object.create(null);
    Object.keys(mapping).forEach(typeName => {
        const toTypeNames = mapping[typeName];
        toTypeNames.forEach(toTypeName => {
            if (!(toTypeName in result)) {
                result[toTypeName] = [];
            }
            result[toTypeName].push(typeName);
        });
    });
    return result;
}
function expandAbstractTypes(targetSchema, possibleTypesMap, reversePossibleTypesMap, interfaceExtensionsMap, document) {
    const operations = document.definitions.filter(def => def.kind === Kind.OPERATION_DEFINITION);
    const fragments = document.definitions.filter(def => def.kind === Kind.FRAGMENT_DEFINITION);
    const existingFragmentNames = fragments.map(fragment => fragment.name.value);
    let fragmentCounter = 0;
    const generateFragmentName = (typeName) => {
        let fragmentName;
        do {
            fragmentName = `_${typeName}_Fragment${fragmentCounter.toString()}`;
            fragmentCounter++;
        } while (existingFragmentNames.indexOf(fragmentName) !== -1);
        return fragmentName;
    };
    const generateInlineFragment = (typeName, selectionSet) => {
        return {
            kind: Kind.INLINE_FRAGMENT,
            typeCondition: {
                kind: Kind.NAMED_TYPE,
                name: {
                    kind: Kind.NAME,
                    value: typeName,
                },
            },
            selectionSet,
        };
    };
    const newFragments = [];
    const fragmentReplacements = Object.create(null);
    fragments.forEach((fragment) => {
        newFragments.push(fragment);
        const possibleTypes = possibleTypesMap[fragment.typeCondition.name.value];
        if (possibleTypes != null) {
            fragmentReplacements[fragment.name.value] = [];
            possibleTypes.forEach(possibleTypeName => {
                const name = generateFragmentName(possibleTypeName);
                existingFragmentNames.push(name);
                const newFragment = {
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
    const newDocument = {
        ...document,
        definitions: [...operations, ...newFragments],
    };
    const typeInfo = new TypeInfo(targetSchema);
    return visit(newDocument, visitWithTypeInfo(typeInfo, {
        [Kind.SELECTION_SET](node) {
            let newSelections = node.selections;
            const addedSelections = [];
            const maybeType = typeInfo.getParentType();
            if (maybeType != null) {
                const parentType = getNamedType(maybeType);
                const interfaceExtension = interfaceExtensionsMap[parentType.name];
                const interfaceExtensionFields = [];
                node.selections.forEach((selection) => {
                    if (selection.kind === Kind.INLINE_FRAGMENT) {
                        if (selection.typeCondition != null) {
                            const possibleTypes = possibleTypesMap[selection.typeCondition.name.value];
                            if (possibleTypes != null) {
                                possibleTypes.forEach(possibleType => {
                                    const maybePossibleType = targetSchema.getType(possibleType);
                                    if (maybePossibleType != null &&
                                        implementsAbstractType(targetSchema, parentType, maybePossibleType)) {
                                        addedSelections.push(generateInlineFragment(possibleType, selection.selectionSet));
                                    }
                                });
                            }
                        }
                    }
                    else if (selection.kind === Kind.FRAGMENT_SPREAD) {
                        const fragmentName = selection.name.value;
                        if (fragmentName in fragmentReplacements) {
                            fragmentReplacements[fragmentName].forEach(replacement => {
                                const typeName = replacement.typeName;
                                const maybeReplacementType = targetSchema.getType(typeName);
                                if (maybeReplacementType != null && implementsAbstractType(targetSchema, parentType, maybeType)) {
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
                    else if (interfaceExtension != null &&
                        interfaceExtension[selection.name.value] &&
                        selection.kind === Kind.FIELD) {
                        interfaceExtensionFields.push(selection);
                    }
                });
                if (parentType.name in reversePossibleTypesMap) {
                    addedSelections.push({
                        kind: Kind.FIELD,
                        name: {
                            kind: Kind.NAME,
                            value: '__typename',
                        },
                    });
                }
                if (interfaceExtensionFields.length) {
                    const possibleTypes = possibleTypesMap[parentType.name];
                    if (possibleTypes != null) {
                        possibleTypes.forEach(possibleType => {
                            addedSelections.push(generateInlineFragment(possibleType, {
                                kind: Kind.SELECTION_SET,
                                selections: interfaceExtensionFields,
                            }));
                        });
                        newSelections = newSelections.filter((selection) => !(selection.kind === Kind.FIELD && interfaceExtension[selection.name.value]));
                    }
                }
            }
            if (addedSelections.length) {
                return {
                    ...node,
                    selections: newSelections.concat(addedSelections),
                };
            }
        },
    }));
}

// For motivation, see https://github.com/ardatan/graphql-tools/issues/751
class WrapConcreteTypes {
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        const document = wrapConcreteTypes(delegationContext.returnType, delegationContext.targetSchema, originalRequest.document);
        return {
            ...originalRequest,
            document,
        };
    }
}
function wrapConcreteTypes(returnType, targetSchema, document) {
    var _a, _b, _c;
    const namedType = getNamedType(returnType);
    if (!isObjectType(namedType)) {
        return document;
    }
    const queryTypeName = (_a = targetSchema.getQueryType()) === null || _a === void 0 ? void 0 : _a.name;
    const mutationTypeName = (_b = targetSchema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name;
    const subscriptionTypeName = (_c = targetSchema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name;
    const typeInfo = new TypeInfo(targetSchema);
    const newDocument = visit(document, visitWithTypeInfo(typeInfo, {
        [Kind.FRAGMENT_DEFINITION]: (node) => {
            const typeName = node.typeCondition.name.value;
            if (typeName !== queryTypeName && typeName !== mutationTypeName && typeName !== subscriptionTypeName) {
                return false;
            }
        },
        [Kind.FIELD]: (node) => {
            if (isAbstractType(getNamedType(typeInfo.getType()))) {
                return {
                    ...node,
                    selectionSet: {
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
                    },
                };
            }
        },
    }), 
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

class FilterToSchema {
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        return {
            ...originalRequest,
            ...filterToSchema(delegationContext.targetSchema, originalRequest.document, originalRequest.variables),
        };
    }
}
function filterToSchema(targetSchema, document, variables) {
    const operations = document.definitions.filter(def => def.kind === Kind.OPERATION_DEFINITION);
    const fragments = document.definitions.filter(def => def.kind === Kind.FRAGMENT_DEFINITION);
    let usedVariables = [];
    let usedFragments = [];
    const newOperations = [];
    let newFragments = [];
    const validFragments = fragments.filter((fragment) => {
        const typeName = fragment.typeCondition.name.value;
        return Boolean(targetSchema.getType(typeName));
    });
    const validFragmentsWithType = validFragments.reduce((prev, fragment) => ({
        ...prev,
        [fragment.name.value]: targetSchema.getType(fragment.typeCondition.name.value),
    }), {});
    let fragmentSet = Object.create(null);
    operations.forEach((operation) => {
        let type;
        if (operation.operation === 'subscription') {
            type = targetSchema.getSubscriptionType();
        }
        else if (operation.operation === 'mutation') {
            type = targetSchema.getMutationType();
        }
        else {
            type = targetSchema.getQueryType();
        }
        const { selectionSet, usedFragments: operationUsedFragments, usedVariables: operationUsedVariables, } = filterSelectionSet(targetSchema, type, validFragmentsWithType, operation.selectionSet);
        usedFragments = union(usedFragments, operationUsedFragments);
        const { usedVariables: collectedUsedVariables, newFragments: collectedNewFragments, fragmentSet: collectedFragmentSet, } = collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments);
        const operationOrFragmentVariables = union(operationUsedVariables, collectedUsedVariables);
        usedVariables = union(usedVariables, operationOrFragmentVariables);
        newFragments = collectedNewFragments;
        fragmentSet = collectedFragmentSet;
        const variableDefinitions = operation.variableDefinitions.filter((variable) => operationOrFragmentVariables.indexOf(variable.variable.name.value) !== -1);
        newOperations.push({
            kind: Kind.OPERATION_DEFINITION,
            operation: operation.operation,
            name: operation.name,
            directives: operation.directives,
            variableDefinitions,
            selectionSet,
        });
    });
    const newVariables = usedVariables.reduce((acc, variableName) => {
        const variableValue = variables[variableName];
        if (variableValue !== undefined) {
            acc[variableName] = variableValue;
        }
        return acc;
    }, {});
    return {
        document: {
            kind: Kind.DOCUMENT,
            definitions: [...newOperations, ...newFragments],
        },
        variables: newVariables,
    };
}
function collectFragmentVariables(targetSchema, fragmentSet, validFragments, validFragmentsWithType, usedFragments) {
    let remainingFragments = usedFragments.slice();
    let usedVariables = [];
    const newFragments = [];
    while (remainingFragments.length !== 0) {
        const nextFragmentName = remainingFragments.pop();
        const fragment = validFragments.find(fr => fr.name.value === nextFragmentName);
        if (fragment != null) {
            const name = nextFragmentName;
            const typeName = fragment.typeCondition.name.value;
            const type = targetSchema.getType(typeName);
            const { selectionSet, usedFragments: fragmentUsedFragments, usedVariables: fragmentUsedVariables, } = filterSelectionSet(targetSchema, type, validFragmentsWithType, fragment.selectionSet);
            remainingFragments = union(remainingFragments, fragmentUsedFragments);
            usedVariables = union(usedVariables, fragmentUsedVariables);
            if (!(name in fragmentSet)) {
                fragmentSet[name] = true;
                newFragments.push({
                    kind: Kind.FRAGMENT_DEFINITION,
                    name: {
                        kind: Kind.NAME,
                        value: name,
                    },
                    typeCondition: fragment.typeCondition,
                    selectionSet,
                });
            }
        }
    }
    return {
        usedVariables,
        newFragments,
        fragmentSet,
    };
}
function filterSelectionSet(schema, type, validFragments, selectionSet) {
    const usedFragments = [];
    const usedVariables = [];
    const typeInfo = new TypeInfo(schema, undefined, type);
    const filteredSelectionSet = visit(selectionSet, visitWithTypeInfo(typeInfo, {
        [Kind.FIELD]: {
            enter(node) {
                const parentType = typeInfo.getParentType();
                if (isObjectType(parentType) || isInterfaceType(parentType)) {
                    const fields = parentType.getFields();
                    const field = node.name.value === '__typename' ? TypeNameMetaFieldDef : fields[node.name.value];
                    if (!field) {
                        return null;
                    }
                    const argNames = (field.args != null ? field.args : []).map(arg => arg.name);
                    if (node.arguments != null) {
                        const args = node.arguments.filter((arg) => argNames.indexOf(arg.name.value) !== -1);
                        if (args.length !== node.arguments.length) {
                            return {
                                ...node,
                                arguments: args,
                            };
                        }
                    }
                }
            },
            leave(node) {
                const resolvedType = getNamedType(typeInfo.getType());
                if (isObjectType(resolvedType) || isInterfaceType(resolvedType)) {
                    const selections = node.selectionSet != null ? node.selectionSet.selections : null;
                    if (selections == null || selections.length === 0) {
                        // need to remove any added variables. Is there a better way to do this?
                        visit(node, {
                            [Kind.VARIABLE](variableNode) {
                                const index = usedVariables.indexOf(variableNode.name.value);
                                if (index !== -1) {
                                    usedVariables.splice(index, 1);
                                }
                            },
                        });
                        return null;
                    }
                }
            },
        },
        [Kind.FRAGMENT_SPREAD](node) {
            if (node.name.value in validFragments) {
                const parentType = typeInfo.getParentType();
                const innerType = validFragments[node.name.value];
                if (!implementsAbstractType(schema, parentType, innerType)) {
                    return null;
                }
                usedFragments.push(node.name.value);
                return;
            }
            return null;
        },
        [Kind.INLINE_FRAGMENT]: {
            enter(node) {
                if (node.typeCondition != null) {
                    const parentType = typeInfo.getParentType();
                    const innerType = schema.getType(node.typeCondition.name.value);
                    if (!implementsAbstractType(schema, parentType, innerType)) {
                        return null;
                    }
                }
            },
        },
        [Kind.VARIABLE](node) {
            usedVariables.push(node.name.value);
        },
    }));
    return {
        selectionSet: filteredSelectionSet,
        usedFragments,
        usedVariables,
    };
}
function union(...arrays) {
    const cache = Object.create(null);
    const result = [];
    arrays.forEach(array => {
        array.forEach(item => {
            if (!(item in cache)) {
                cache[item] = true;
                result.push(item);
            }
        });
    });
    return result;
}

class AddTypenameToAbstract {
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        const document = addTypenameToAbstract(delegationContext.targetSchema, originalRequest.document);
        return {
            ...originalRequest,
            document,
        };
    }
}
function addTypenameToAbstract(targetSchema, document) {
    const typeInfo = new TypeInfo(targetSchema);
    return visit(document, visitWithTypeInfo(typeInfo, {
        [Kind.SELECTION_SET](node) {
            const parentType = typeInfo.getParentType();
            let selections = node.selections;
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
                return {
                    ...node,
                    selections,
                };
            }
        },
    }));
}

class CheckResultAndHandleErrors {
    transformResult(originalResult, delegationContext, _transformationContext) {
        return checkResultAndHandleErrors(originalResult, delegationContext.context != null ? delegationContext.context : {}, delegationContext.info, delegationContext.fieldName, delegationContext.subschema, delegationContext.returnType, delegationContext.skipTypeMerging, delegationContext.onLocatedError);
    }
}
function checkResultAndHandleErrors(result, context, info, responseKey = getResponseKeyFromInfo(info), subschema, returnType = info.returnType, skipTypeMerging, onLocatedError) {
    const { data, unpathedErrors } = mergeDataAndErrors(result.data == null ? undefined : result.data[responseKey], result.errors == null ? [] : result.errors, info ? responsePathAsArray(info.path) : undefined, onLocatedError);
    return resolveExternalValue(data, unpathedErrors, subschema, context, info, returnType, skipTypeMerging);
}
function mergeDataAndErrors(data, errors, path, onLocatedError, index = 1) {
    if (data == null) {
        if (!errors.length) {
            return { data: null, unpathedErrors: [] };
        }
        if (errors.length === 1) {
            const error = onLocatedError ? onLocatedError(errors[0]) : errors[0];
            const newPath = path === undefined ? error.path : error.path === undefined ? path : path.concat(error.path.slice(1));
            return { data: relocatedError(errors[0], newPath), unpathedErrors: [] };
        }
        const newError = locatedError(new AggregateError(errors), undefined, path);
        return { data: newError, unpathedErrors: [] };
    }
    if (!errors.length) {
        return { data, unpathedErrors: [] };
    }
    let unpathedErrors = [];
    const errorMap = Object.create(null);
    errors.forEach(error => {
        var _a;
        const pathSegment = (_a = error.path) === null || _a === void 0 ? void 0 : _a[index];
        if (pathSegment != null) {
            const pathSegmentErrors = errorMap[pathSegment];
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
    Object.keys(errorMap).forEach(pathSegment => {
        if (data[pathSegment] !== undefined) {
            const { data: newData, unpathedErrors: newErrors } = mergeDataAndErrors(data[pathSegment], errorMap[pathSegment], path, onLocatedError, index + 1);
            data[pathSegment] = newData;
            unpathedErrors = unpathedErrors.concat(newErrors);
        }
        else {
            unpathedErrors = unpathedErrors.concat(errorMap[pathSegment]);
        }
    });
    return { data, unpathedErrors };
}

class AddArgumentsAsVariables {
    constructor(args) {
        this.args = Object.entries(args).reduce((prev, [key, val]) => ({
            ...prev,
            [key]: val,
        }), {});
    }
    transformRequest(originalRequest, delegationContext, _transformationContext) {
        const { document, variables } = addVariablesToRootField(delegationContext.targetSchema, originalRequest, this.args);
        return {
            ...originalRequest,
            document,
            variables,
        };
    }
}
function addVariablesToRootField(targetSchema, originalRequest, args) {
    const document = originalRequest.document;
    const variableValues = originalRequest.variables;
    const operations = document.definitions.filter(def => def.kind === Kind.OPERATION_DEFINITION);
    const fragments = document.definitions.filter(def => def.kind === Kind.FRAGMENT_DEFINITION);
    const newOperations = operations.map((operation) => {
        const variableDefinitionMap = operation.variableDefinitions.reduce((prev, def) => ({
            ...prev,
            [def.variable.name.value]: def,
        }), {});
        let type;
        if (operation.operation === 'subscription') {
            type = targetSchema.getSubscriptionType();
        }
        else if (operation.operation === 'mutation') {
            type = targetSchema.getMutationType();
        }
        else {
            type = targetSchema.getQueryType();
        }
        const newSelectionSet = [];
        operation.selectionSet.selections.forEach((selection) => {
            var _a;
            if (selection.kind === Kind.FIELD) {
                const argumentNodes = (_a = selection.arguments) !== null && _a !== void 0 ? _a : [];
                const argumentNodeMap = argumentNodes.reduce((prev, argument) => ({
                    ...prev,
                    [argument.name.value]: argument,
                }), {});
                const targetField = type.getFields()[selection.name.value];
                // excludes __typename
                if (targetField != null) {
                    updateArguments(targetField, argumentNodeMap, variableDefinitionMap, variableValues, args);
                }
                newSelectionSet.push({
                    ...selection,
                    arguments: Object.keys(argumentNodeMap).map(argName => argumentNodeMap[argName]),
                });
            }
            else {
                newSelectionSet.push(selection);
            }
        });
        return {
            ...operation,
            variableDefinitions: Object.keys(variableDefinitionMap).map(varName => variableDefinitionMap[varName]),
            selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: newSelectionSet,
            },
        };
    });
    return {
        document: {
            ...document,
            definitions: [...newOperations, ...fragments],
        },
        variables: variableValues,
    };
}
function updateArguments(targetField, argumentNodeMap, variableDefinitionMap, variableValues, newArgs) {
    targetField.args.forEach((argument) => {
        const argName = argument.name;
        const argType = argument.type;
        if (argName in newArgs) {
            updateArgument(argName, argType, argumentNodeMap, variableDefinitionMap, variableValues, serializeInputValue(argType, newArgs[argName]));
        }
    });
}

function defaultDelegationBinding(delegationContext) {
    var _a;
    let delegationTransforms = [new CheckResultAndHandleErrors()];
    const info = delegationContext.info;
    const stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
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
    const transforms = delegationContext.transforms;
    if (transforms != null) {
        delegationTransforms = delegationTransforms.concat(transforms.slice().reverse());
    }
    const args = delegationContext.args;
    if (args != null) {
        delegationTransforms.push(new AddArgumentsAsVariables(args));
    }
    delegationTransforms = delegationTransforms.concat([new FilterToSchema(), new AddTypenameToAbstract()]);
    return delegationTransforms;
}

class Transformer {
    constructor(context, binding = defaultDelegationBinding) {
        this.transformations = [];
        this.delegationContext = context;
        const delegationTransforms = binding(this.delegationContext);
        delegationTransforms.forEach(transform => this.addTransform(transform, {}));
    }
    addTransform(transform, context = {}) {
        this.transformations.push({ transform, context });
    }
    transformRequest(originalRequest) {
        return this.transformations.reduce((request, transformation) => transformation.transform.transformRequest != null
            ? transformation.transform.transformRequest(request, this.delegationContext, transformation.context)
            : request, originalRequest);
    }
    transformResult(originalResult) {
        return this.transformations.reduceRight((result, transformation) => transformation.transform.transformResult != null
            ? transformation.transform.transformResult(result, this.delegationContext, transformation.context)
            : result, originalResult);
    }
}

function delegateToSchema(options) {
    const { info, operationName, operation = getDelegatingOperation(info.parentType, info.schema), fieldName = info.fieldName, returnType = info.returnType, selectionSet, fieldNodes, } = options;
    const request = createRequestFromInfo({
        info,
        operation,
        fieldName,
        selectionSet,
        fieldNodes,
        operationName,
    });
    return delegateRequest({
        ...options,
        request,
        operation,
        fieldName,
        returnType,
    });
}
function getDelegationReturnType(targetSchema, operation, fieldName) {
    let rootType;
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
function delegateRequest({ request, schema: subschemaOrSubschemaConfig, rootValue, info, operation, fieldName, args, returnType, onLocatedError, context, transforms = [], transformedSchema, skipValidation, skipTypeMerging, binding, }) {
    var _a, _b, _c;
    let operationDefinition;
    let targetOperation;
    let targetFieldName;
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
    const { targetSchema, targetRootValue, subschemaConfig, allTransforms } = collectTargetParameters(subschemaOrSubschemaConfig, rootValue, info, transforms);
    const delegationContext = {
        subschema: subschemaOrSubschemaConfig,
        targetSchema,
        operation: targetOperation,
        fieldName: targetFieldName,
        args,
        context,
        info,
        returnType: (_a = returnType !== null && returnType !== void 0 ? returnType : info === null || info === void 0 ? void 0 : info.returnType) !== null && _a !== void 0 ? _a : getDelegationReturnType(targetSchema, targetOperation, targetFieldName),
        onLocatedError,
        transforms: allTransforms,
        transformedSchema: (_c = transformedSchema !== null && transformedSchema !== void 0 ? transformedSchema : (_b = subschemaConfig) === null || _b === void 0 ? void 0 : _b.transformedSchema) !== null && _c !== void 0 ? _c : targetSchema,
        skipTypeMerging,
    };
    const transformer = new Transformer(delegationContext, binding);
    const processedRequest = transformer.transformRequest(request);
    if (!skipValidation) {
        validateRequest(targetSchema, processedRequest.document);
    }
    if (targetOperation === 'query' || targetOperation === 'mutation') {
        let executor = (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.executor) || createDefaultExecutor(targetSchema, (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.rootValue) || targetRootValue);
        if (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batch) {
            const batchingOptions = subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.batchingOptions;
            executor = getBatchingExecutor(context, executor, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.dataLoaderOptions, batchingOptions === null || batchingOptions === void 0 ? void 0 : batchingOptions.extensionsReducer);
        }
        return new ValueOrPromise(() => executor({
            ...processedRequest,
            context,
            info,
        })).then(originalResult => transformer.transformResult(originalResult)).resolve();
    }
    const subscriber = (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.subscriber) || createDefaultSubscriber(targetSchema, (subschemaConfig === null || subschemaConfig === void 0 ? void 0 : subschemaConfig.rootValue) || targetRootValue);
    return subscriber({
        ...processedRequest,
        context,
        info,
    }).then((subscriptionResult) => {
        if (Symbol.asyncIterator in subscriptionResult) {
            // "subscribe" to the subscription result and map the result through the transforms
            return mapAsyncIterator(subscriptionResult, originalResult => ({
                [targetFieldName]: transformer.transformResult(originalResult),
            }));
        }
        return transformer.transformResult(subscriptionResult);
    });
}
const emptyObject = {};
function collectTargetParameters(subschema, rootValue, info, transforms = []) {
    var _a, _b, _c, _d, _e;
    const stitchingInfo = (_a = info === null || info === void 0 ? void 0 : info.schema.extensions) === null || _a === void 0 ? void 0 : _a.stitchingInfo;
    const subschemaOrSubschemaConfig = (_b = stitchingInfo === null || stitchingInfo === void 0 ? void 0 : stitchingInfo.subschemaMap.get(subschema)) !== null && _b !== void 0 ? _b : subschema;
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
    const errors = validate(targetSchema, document);
    if (errors.length > 0) {
        if (errors.length > 1) {
            const combinedError = new AggregateError(errors);
            throw combinedError;
        }
        const error = errors[0];
        throw error.originalError || error;
    }
}
const createDefaultExecutor = memoize2(function (schema, rootValue) {
    return (({ document, context, variables, info }) => execute({
        schema,
        document,
        contextValue: context,
        variableValues: variables,
        rootValue: rootValue !== null && rootValue !== void 0 ? rootValue : info === null || info === void 0 ? void 0 : info.rootValue,
    }));
});
function createDefaultSubscriber(schema, rootValue) {
    return ({ document, context, variables, info }) => subscribe({
        schema,
        document,
        contextValue: context,
        variableValues: variables,
        rootValue: rootValue !== null && rootValue !== void 0 ? rootValue : info === null || info === void 0 ? void 0 : info.rootValue,
    });
}

export { AddArgumentsAsVariables, AddSelectionSets, AddTypenameToAbstract, CheckResultAndHandleErrors, ExpandAbstractTypes, FilterToSchema, Subschema, VisitSelectionSets, annotateExternalObject, applySchemaTransforms, checkResultAndHandleErrors, cloneSubschemaConfig, createRequest, createRequestFromInfo, defaultDelegationBinding, defaultMergedResolver, delegateRequest, delegateToSchema, getDelegatingOperation, getSubschema, getUnpathedErrors, isExternalObject, isSubschema, isSubschemaConfig, mergeExternalObjects, resolveExternalValue };
//# sourceMappingURL=index.esm.js.map
