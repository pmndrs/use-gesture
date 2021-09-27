import { parse, isNonNullType, GraphQLError, Kind, valueFromAST, print, isObjectType, isListType, isSpecifiedDirective, astFromValue, isSpecifiedScalarType, isIntrospectionType, isInterfaceType, isUnionType, isInputObjectType, isEnumType, isScalarType, GraphQLDeprecatedDirective, specifiedRules, validate, buildSchema, Source, TokenKind, visit, isTypeSystemDefinitionNode, buildClientSchema, getNamedType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLInterfaceType, GraphQLInputObjectType, GraphQLDirective, GraphQLUnionType, GraphQLEnumType, GraphQLScalarType, isNamedType, getNullableType, isLeafType, GraphQLSchema, isSchema, isInputType, valueFromASTUntyped, isDirective, getDirectiveValues, GraphQLSkipDirective, GraphQLIncludeDirective, typeFromAST, isAbstractType, isCompositeType, doTypesOverlap, getOperationAST, getOperationRootType, TypeNameMetaFieldDef } from 'graphql';
import { __spreadArray, __read, __assign, __values, __awaiter, __generator, __extends } from 'tslib';
import AggregateError from '@ardatan/aggregate-error';
import { camelCase } from 'camel-case';

var asArray = function (fns) { return (Array.isArray(fns) ? fns : fns ? [fns] : []); };
function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (var index = 0; index < a.length; index++) {
            if (a[index] !== b[index]) {
                return false;
            }
        }
        return true;
    }
    return a === b || (!a && !b);
}
function isNotEqual(a, b) {
    return !isEqual(a, b);
}
function isDocumentString(str) {
    // XXX: is-valid-path or is-glob treat SDL as a valid path
    // (`scalar Date` for example)
    // this why checking the extension is fast enough
    // and prevent from parsing the string in order to find out
    // if the string is a SDL
    if (/\.[a-z0-9]+$/i.test(str)) {
        return false;
    }
    try {
        parse(str);
        return true;
    }
    catch (e) { }
    return false;
}
var invalidPathRegex = /[‘“!%&^<=>`]/;
function isValidPath(str) {
    return typeof str === 'string' && !invalidPathRegex.test(str);
}
function compareStrings(a, b) {
    if (a.toString() < b.toString()) {
        return -1;
    }
    if (a.toString() > b.toString()) {
        return 1;
    }
    return 0;
}
function nodeToString(a) {
    if ('alias' in a) {
        return a.alias.value;
    }
    if ('name' in a) {
        return a.name.value;
    }
    return a.kind;
}
function compareNodes(a, b, customFn) {
    var aStr = nodeToString(a);
    var bStr = nodeToString(b);
    if (typeof customFn === 'function') {
        return customFn(aStr, bStr);
    }
    return compareStrings(aStr, bStr);
}

function debugLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (process && process.env && process.env.DEBUG && !process.env.GQL_tools_NODEBUG) {
        // tslint:disable-next-line: no-console
        console.log.apply(console, __spreadArray([], __read(args)));
    }
}

var fixWindowsPath = function (path) { return path.replace(/\\/g, '/'); };

var flattenArray = function (arr) {
    return arr.reduce(function (acc, next) { return acc.concat(Array.isArray(next) ? flattenArray(next) : next); }, []);
};

var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */
function inspect(value) {
    return formatValue(value, []);
}
function formatValue(value, seenValues) {
    switch (typeof value) {
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? "[function " + value.name + "]" : '[function]';
        case 'object':
            if (value === null) {
                return 'null';
            }
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatObjectValue(value, previouslySeenValues) {
    if (previouslySeenValues.indexOf(value) !== -1) {
        return '[Circular]';
    }
    var seenValues = __spreadArray(__spreadArray([], __read(previouslySeenValues)), [value]);
    var customInspectFn = getCustomFn(value);
    if (customInspectFn !== undefined) {
        var customValue = customInspectFn.call(value);
        // check for infinite recursion
        if (customValue !== value) {
            return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
        }
    }
    else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
    var keys = Object.keys(object);
    if (keys.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    var properties = keys.map(function (key) {
        var value = formatValue(object[key], seenValues);
        return key + ': ' + value;
    });
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    var len = Math.min(MAX_ARRAY_LENGTH, array.length);
    var remaining = array.length - len;
    var items = [];
    for (var i = 0; i < len; ++i) {
        items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
        items.push('... 1 more item');
    }
    else if (remaining > 1) {
        items.push("... " + remaining.toString(10) + " more items");
    }
    return '[' + items.join(', ') + ']';
}
function getCustomFn(obj) {
    if (typeof obj.inspect === 'function') {
        return obj.inspect;
    }
}
function getObjectTag(obj) {
    var tag = Object.prototype.toString
        .call(obj)
        .replace(/^\[object /, '')
        .replace(/]$/, '');
    if (tag === 'Object' && typeof obj.constructor === 'function') {
        var name_1 = obj.constructor.name;
        if (typeof name_1 === 'string' && name_1 !== '') {
            return name_1;
        }
    }
    return tag;
}

/**
 * Prepares an object map of argument values given a list of argument
 * definitions and list of argument AST nodes.
 *
 * Note: The returned value is a plain Object with a prototype, since it is
 * exposed to user code. Care should be taken to not pull values from the
 * Object prototype.
 */
function getArgumentValues(def, node, variableValues) {
    var e_1, _a;
    var _b;
    if (variableValues === void 0) { variableValues = {}; }
    var variableMap = Object.entries(variableValues).reduce(function (prev, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
    }, {});
    var coercedValues = {};
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    var argumentNodes = (_b = node.arguments) !== null && _b !== void 0 ? _b : [];
    var argNodeMap = argumentNodes.reduce(function (prev, arg) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[arg.name.value] = arg, _a)));
    }, {});
    try {
        for (var _c = __values(def.args), _d = _c.next(); !_d.done; _d = _c.next()) {
            var argDef = _d.value;
            var name_1 = argDef.name;
            var argType = argDef.type;
            var argumentNode = argNodeMap[name_1];
            if (!argumentNode) {
                if (argDef.defaultValue !== undefined) {
                    coercedValues[name_1] = argDef.defaultValue;
                }
                else if (isNonNullType(argType)) {
                    throw new GraphQLError("Argument \"" + name_1 + "\" of required type \"" + inspect(argType) + "\" " + 'was not provided.', node);
                }
                continue;
            }
            var valueNode = argumentNode.value;
            var isNull = valueNode.kind === Kind.NULL;
            if (valueNode.kind === Kind.VARIABLE) {
                var variableName = valueNode.name.value;
                if (variableValues == null || !(variableName in variableMap)) {
                    if (argDef.defaultValue !== undefined) {
                        coercedValues[name_1] = argDef.defaultValue;
                    }
                    else if (isNonNullType(argType)) {
                        throw new GraphQLError("Argument \"" + name_1 + "\" of required type \"" + inspect(argType) + "\" " +
                            ("was provided the variable \"$" + variableName + "\" which was not provided a runtime value."), valueNode);
                    }
                    continue;
                }
                isNull = variableValues[variableName] == null;
            }
            if (isNull && isNonNullType(argType)) {
                throw new GraphQLError("Argument \"" + name_1 + "\" of non-null type \"" + inspect(argType) + "\" " + 'must not be null.', valueNode);
            }
            var coercedValue = valueFromAST(valueNode, argType, variableValues);
            if (coercedValue === undefined) {
                // Note: ValuesOfCorrectTypeRule validation should catch this before
                // execution. This is a runtime check to ensure execution does not
                // continue with an invalid argument value.
                throw new GraphQLError("Argument \"" + name_1 + "\" has invalid value " + print(valueNode) + ".", valueNode);
            }
            coercedValues[name_1] = coercedValue;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return coercedValues;
}

function getDirectivesInExtensions(node, pathToDirectivesInExtensions) {
    if (pathToDirectivesInExtensions === void 0) { pathToDirectivesInExtensions = ['directives']; }
    var directivesInExtensions = pathToDirectivesInExtensions.reduce(function (acc, pathSegment) { return (acc == null ? acc : acc[pathSegment]); }, node === null || node === void 0 ? void 0 : node.extensions);
    return directivesInExtensions;
}
function getDirectives(schema, node, pathToDirectivesInExtensions) {
    if (pathToDirectivesInExtensions === void 0) { pathToDirectivesInExtensions = ['directives']; }
    var directivesInExtensions = getDirectivesInExtensions(node, pathToDirectivesInExtensions);
    if (directivesInExtensions != null) {
        return directivesInExtensions;
    }
    var schemaDirectives = schema && schema.getDirectives ? schema.getDirectives() : [];
    var schemaDirectiveMap = schemaDirectives.reduce(function (schemaDirectiveMap, schemaDirective) {
        schemaDirectiveMap[schemaDirective.name] = schemaDirective;
        return schemaDirectiveMap;
    }, {});
    var astNodes = [];
    if (node.astNode) {
        astNodes.push(node.astNode);
    }
    if ('extensionASTNodes' in node && node.extensionASTNodes) {
        astNodes = __spreadArray(__spreadArray([], __read(astNodes)), __read(node.extensionASTNodes));
    }
    var result = {};
    astNodes.forEach(function (astNode) {
        if (astNode.directives) {
            astNode.directives.forEach(function (directiveNode) {
                var _a;
                var schemaDirective = schemaDirectiveMap[directiveNode.name.value];
                if (schemaDirective) {
                    if (schemaDirective.isRepeatable) {
                        result[schemaDirective.name] = (_a = result[schemaDirective.name]) !== null && _a !== void 0 ? _a : [];
                        result[schemaDirective.name].push(getArgumentValues(schemaDirective, directiveNode));
                    }
                    else {
                        result[schemaDirective.name] = getArgumentValues(schemaDirective, directiveNode);
                    }
                }
            });
        }
    });
    return result;
}

function parseDirectiveValue(value) {
    switch (value.kind) {
        case Kind.INT:
            return parseInt(value.value);
        case Kind.FLOAT:
            return parseFloat(value.value);
        case Kind.BOOLEAN:
            return Boolean(value.value);
        case Kind.STRING:
        case Kind.ENUM:
            return value.value;
        case Kind.LIST:
            return value.values.map(function (v) { return parseDirectiveValue(v); });
        case Kind.OBJECT:
            return value.fields.reduce(function (prev, v) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[v.name.value] = parseDirectiveValue(v.value), _a)));
            }, {});
        case Kind.NULL:
            return null;
        default:
            return null;
    }
}
function getFieldsWithDirectives(documentNode, options) {
    var e_1, _a, e_2, _b;
    if (options === void 0) { options = {}; }
    var result = {};
    var selected = ['ObjectTypeDefinition', 'ObjectTypeExtension'];
    if (options.includeInputTypes) {
        selected = __spreadArray(__spreadArray([], __read(selected)), ['InputObjectTypeDefinition', 'InputObjectTypeExtension']);
    }
    var allTypes = documentNode.definitions.filter(function (obj) { return selected.includes(obj.kind); });
    try {
        for (var allTypes_1 = __values(allTypes), allTypes_1_1 = allTypes_1.next(); !allTypes_1_1.done; allTypes_1_1 = allTypes_1.next()) {
            var type = allTypes_1_1.value;
            var typeName = type.name.value;
            try {
                for (var _c = (e_2 = void 0, __values(type.fields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var field = _d.value;
                    if (field.directives && field.directives.length > 0) {
                        var fieldName = field.name.value;
                        var key = typeName + "." + fieldName;
                        var directives = field.directives.map(function (d) { return ({
                            name: d.name.value,
                            args: (d.arguments || []).reduce(function (prev, arg) {
                                var _a;
                                return (__assign(__assign({}, prev), (_a = {}, _a[arg.name.value] = parseDirectiveValue(arg.value), _a)));
                            }, {}),
                        }); });
                        result[key] = directives;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (allTypes_1_1 && !allTypes_1_1.done && (_a = allTypes_1.return)) _a.call(allTypes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}

function getImplementingTypes(interfaceName, schema) {
    var allTypesMap = schema.getTypeMap();
    var result = [];
    for (var graphqlTypeName in allTypesMap) {
        var graphqlType = allTypesMap[graphqlTypeName];
        if (isObjectType(graphqlType)) {
            var allInterfaces = graphqlType.getInterfaces();
            if (allInterfaces.find(function (int) { return int.name === interfaceName; })) {
                result.push(graphqlType.name);
            }
        }
    }
    return result;
}

function astFromType(type) {
    if (isNonNullType(type)) {
        var innerType = astFromType(type.ofType);
        if (innerType.kind === Kind.NON_NULL_TYPE) {
            throw new Error("Invalid type node " + JSON.stringify(type) + ". Inner type of non-null type cannot be a non-null type.");
        }
        return {
            kind: Kind.NON_NULL_TYPE,
            type: innerType,
        };
    }
    else if (isListType(type)) {
        return {
            kind: Kind.LIST_TYPE,
            type: astFromType(type.ofType),
        };
    }
    return {
        kind: Kind.NAMED_TYPE,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
    };
}

/**
 * Produces a GraphQL Value AST given a JavaScript object.
 * Function will match JavaScript/JSON values to GraphQL AST schema format
 * by using the following mapping.
 *
 * | JSON Value    | GraphQL Value        |
 * | ------------- | -------------------- |
 * | Object        | Input Object         |
 * | Array         | List                 |
 * | Boolean       | Boolean              |
 * | String        | String               |
 * | Number        | Int / Float          |
 * | null          | NullValue            |
 *
 */
function astFromValueUntyped(value) {
    // only explicit null, not undefined, NaN
    if (value === null) {
        return { kind: Kind.NULL };
    }
    // undefined
    if (value === undefined) {
        return null;
    }
    // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
    // the value is not an array, convert the value using the list's item type.
    if (Array.isArray(value)) {
        var valuesNodes_1 = [];
        value.forEach(function (item) {
            var itemNode = astFromValueUntyped(item);
            if (itemNode != null) {
                valuesNodes_1.push(itemNode);
            }
        });
        return { kind: Kind.LIST, values: valuesNodes_1 };
    }
    if (typeof value === 'object') {
        var fieldNodes_1 = [];
        Object.entries(value).forEach(function (_a) {
            var _b = __read(_a, 2), fieldName = _b[0], fieldValue = _b[1];
            var ast = astFromValueUntyped(fieldValue);
            if (ast) {
                fieldNodes_1.push({
                    kind: Kind.OBJECT_FIELD,
                    name: { kind: Kind.NAME, value: fieldName },
                    value: ast,
                });
            }
        });
        return { kind: Kind.OBJECT, fields: fieldNodes_1 };
    }
    // Others serialize based on their corresponding JavaScript scalar types.
    if (typeof value === 'boolean') {
        return { kind: Kind.BOOLEAN, value: value };
    }
    // JavaScript numbers can be Int or Float values.
    if (typeof value === 'number' && isFinite(value)) {
        var stringNum = String(value);
        return integerStringRegExp.test(stringNum)
            ? { kind: Kind.INT, value: stringNum }
            : { kind: Kind.FLOAT, value: stringNum };
    }
    if (typeof value === 'string') {
        return { kind: Kind.STRING, value: value };
    }
    throw new TypeError("Cannot convert value to AST: " + value + ".");
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */
var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

function getDocumentNodeFromSchema(schema, options) {
    var e_1, _a;
    if (options === void 0) { options = {}; }
    var pathToDirectivesInExtensions = options.pathToDirectivesInExtensions;
    var typesMap = schema.getTypeMap();
    var schemaNode = astFromSchema(schema, pathToDirectivesInExtensions);
    var definitions = schemaNode != null ? [schemaNode] : [];
    var directives = schema.getDirectives();
    try {
        for (var directives_1 = __values(directives), directives_1_1 = directives_1.next(); !directives_1_1.done; directives_1_1 = directives_1.next()) {
            var directive = directives_1_1.value;
            if (isSpecifiedDirective(directive)) {
                continue;
            }
            definitions.push(astFromDirective(directive, schema, pathToDirectivesInExtensions));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (directives_1_1 && !directives_1_1.done && (_a = directives_1.return)) _a.call(directives_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    for (var typeName in typesMap) {
        var type = typesMap[typeName];
        var isPredefinedScalar = isSpecifiedScalarType(type);
        var isIntrospection = isIntrospectionType(type);
        if (isPredefinedScalar || isIntrospection) {
            continue;
        }
        if (isObjectType(type)) {
            definitions.push(astFromObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isInterfaceType(type)) {
            definitions.push(astFromInterfaceType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isUnionType(type)) {
            definitions.push(astFromUnionType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isInputObjectType(type)) {
            definitions.push(astFromInputObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isEnumType(type)) {
            definitions.push(astFromEnumType(type, schema, pathToDirectivesInExtensions));
        }
        else if (isScalarType(type)) {
            definitions.push(astFromScalarType(type, schema, pathToDirectivesInExtensions));
        }
        else {
            throw new Error("Unknown type " + type + ".");
        }
    }
    return {
        kind: Kind.DOCUMENT,
        definitions: definitions,
    };
}
// this approach uses the default schema printer rather than a custom solution, so may be more backwards compatible
// currently does not allow customization of printSchema options having to do with comments.
function printSchemaWithDirectives(schema, options) {
    if (options === void 0) { options = {}; }
    var documentNode = getDocumentNodeFromSchema(schema, options);
    return print(documentNode);
}
function astFromSchema(schema, pathToDirectivesInExtensions) {
    var _a, _b;
    var operationTypeMap = {
        query: undefined,
        mutation: undefined,
        subscription: undefined,
    };
    var nodes = [];
    if (schema.astNode != null) {
        nodes.push(schema.astNode);
    }
    if (schema.extensionASTNodes != null) {
        nodes = nodes.concat(schema.extensionASTNodes);
    }
    nodes.forEach(function (node) {
        if (node.operationTypes) {
            node.operationTypes.forEach(function (operationTypeDefinitionNode) {
                operationTypeMap[operationTypeDefinitionNode.operation] = operationTypeDefinitionNode;
            });
        }
    });
    var rootTypeMap = {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
    };
    Object.keys(operationTypeMap).forEach(function (operationTypeNode) {
        if (rootTypeMap[operationTypeNode] != null) {
            if (operationTypeMap[operationTypeNode] != null) {
                operationTypeMap[operationTypeNode].type = astFromType(rootTypeMap[operationTypeNode]);
            }
            else {
                operationTypeMap[operationTypeNode] = {
                    kind: Kind.OPERATION_TYPE_DEFINITION,
                    operation: operationTypeNode,
                    type: astFromType(rootTypeMap[operationTypeNode]),
                };
            }
        }
    });
    var operationTypes = Object.values(operationTypeMap).filter(function (operationTypeDefinitionNode) { return operationTypeDefinitionNode != null; });
    var directives = getDirectiveNodes(schema, schema, pathToDirectivesInExtensions);
    if (!operationTypes.length && !directives.length) {
        return null;
    }
    var schemaNode = {
        kind: operationTypes != null ? Kind.SCHEMA_DEFINITION : Kind.SCHEMA_EXTENSION,
        operationTypes: operationTypes,
        directives: directives,
    };
    schemaNode.description =
        ((_b = (_a = schema.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : schema.description != null)
            ? {
                kind: Kind.STRING,
                value: schema.description,
                block: true,
            }
            : undefined;
    return schemaNode;
}
function astFromDirective(directive, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.DIRECTIVE_DEFINITION,
        description: (_b = (_a = directive.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (directive.description
            ? {
                kind: Kind.STRING,
                value: directive.description,
            }
            : undefined),
        name: {
            kind: Kind.NAME,
            value: directive.name,
        },
        arguments: (directive === null || directive === void 0 ? void 0 : directive.args)
            ? directive.args.map(function (arg) { return astFromArg(arg, schema, pathToDirectivesInExtensions); })
            : undefined,
        repeatable: directive.isRepeatable,
        locations: (directive === null || directive === void 0 ? void 0 : directive.locations)
            ? directive.locations.map(function (location) { return ({
                kind: Kind.NAME,
                value: location,
            }); })
            : undefined,
    };
}
function getDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    var directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    var nodes = [];
    if (entity.astNode != null) {
        nodes.push(entity.astNode);
    }
    if ('extensionASTNodes' in entity && entity.extensionASTNodes != null) {
        nodes = nodes.concat(entity.extensionASTNodes);
    }
    var directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = [].concat.apply([], __spreadArray([], __read(nodes.filter(function (node) { return node.directives != null; }).map(function (node) { return node.directives; }))));
    }
    return directives;
}
function getDeprecatableDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    var directiveNodesBesidesDeprecated = [];
    var deprecatedDirectiveNode;
    var directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    var directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = (_a = entity.astNode) === null || _a === void 0 ? void 0 : _a.directives;
    }
    if (directives != null) {
        directiveNodesBesidesDeprecated = directives.filter(function (directive) { return directive.name.value !== 'deprecated'; });
        if (entity.deprecationReason != null) {
            deprecatedDirectiveNode = (_b = directives.filter(function (directive) { return directive.name.value === 'deprecated'; })) === null || _b === void 0 ? void 0 : _b[0];
        }
    }
    if (entity.deprecationReason != null &&
        deprecatedDirectiveNode == null) {
        deprecatedDirectiveNode = makeDeprecatedDirective(entity.deprecationReason);
    }
    return deprecatedDirectiveNode == null
        ? directiveNodesBesidesDeprecated
        : [deprecatedDirectiveNode].concat(directiveNodesBesidesDeprecated);
}
function astFromArg(arg, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description: ((_b = (_a = arg.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : arg.description)
            ? {
                kind: Kind.STRING,
                value: arg.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: arg.name,
        },
        type: astFromType(arg.type),
        defaultValue: arg.defaultValue !== undefined ? astFromValue(arg.defaultValue, arg.type) : undefined,
        directives: getDeprecatableDirectiveNodes(arg, schema, pathToDirectivesInExtensions),
    };
}
function astFromObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(function (field) { return astFromField(field, schema, pathToDirectivesInExtensions); }),
        interfaces: Object.values(type.getInterfaces()).map(function (iFace) { return astFromType(iFace); }),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromInterfaceType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    var node = {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(function (field) { return astFromField(field, schema, pathToDirectivesInExtensions); }),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
    if ('getInterfaces' in type) {
        node.interfaces = Object.values(type.getInterfaces()).map(function (iFace) { return astFromType(iFace); });
    }
    return node;
}
function astFromUnionType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.UNION_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
        types: type.getTypes().map(function (type) { return astFromType(type); }),
    };
}
function astFromInputObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(function (field) {
            return astFromInputField(field, schema, pathToDirectivesInExtensions);
        }),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromEnumType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.ENUM_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        values: Object.values(type.getValues()).map(function (value) { return astFromEnumValue(value, schema, pathToDirectivesInExtensions); }),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromScalarType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c, _d;
    var directiveNodesBesidesSpecifiedBy = [];
    var specifiedByDirectiveNode;
    var directivesInExtensions = getDirectivesInExtensions(type, pathToDirectivesInExtensions);
    var allDirectives;
    if (directivesInExtensions != null) {
        allDirectives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        allDirectives = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.directives;
    }
    if (allDirectives != null) {
        directiveNodesBesidesSpecifiedBy = allDirectives.filter(function (directive) { return directive.name.value !== 'specifiedBy'; });
        if (type.specifiedByUrl != null) {
            specifiedByDirectiveNode = (_b = allDirectives.filter(function (directive) { return directive.name.value === 'specifiedBy'; })) === null || _b === void 0 ? void 0 : _b[0];
        }
    }
    if (type.specifiedByUrl != null && specifiedByDirectiveNode == null) {
        specifiedByDirectiveNode = makeDirectiveNode('specifiedBy', {
            url: type.specifiedByUrl,
        });
    }
    var directives = specifiedByDirectiveNode == null
        ? directiveNodesBesidesSpecifiedBy
        : [specifiedByDirectiveNode].concat(directiveNodesBesidesSpecifiedBy);
    return {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        description: ((_d = (_c = type.astNode) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : type.description)
            ? {
                kind: Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: type.name,
        },
        directives: directives,
    };
}
function astFromField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.FIELD_DEFINITION,
        description: ((_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : field.description)
            ? {
                kind: Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: field.name,
        },
        arguments: field.args.map(function (arg) { return astFromArg(arg, schema, pathToDirectivesInExtensions); }),
        type: astFromType(field.type),
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
    };
}
function astFromInputField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description: ((_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : field.description)
            ? {
                kind: Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: field.name,
        },
        type: astFromType(field.type),
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
        defaultValue: astFromValue(field.defaultValue, field.type),
    };
}
function astFromEnumValue(value, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: Kind.ENUM_VALUE_DEFINITION,
        description: ((_b = (_a = value.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : value.description)
            ? {
                kind: Kind.STRING,
                value: value.description,
                block: true,
            }
            : undefined,
        name: {
            kind: Kind.NAME,
            value: value.name,
        },
        directives: getDirectiveNodes(value, schema, pathToDirectivesInExtensions),
    };
}
function makeDeprecatedDirective(deprecationReason) {
    return makeDirectiveNode('deprecated', { reason: deprecationReason }, GraphQLDeprecatedDirective);
}
function makeDirectiveNode(name, args, directive) {
    var directiveArguments = [];
    if (directive != null) {
        directive.args.forEach(function (arg) {
            var argName = arg.name;
            var argValue = args[argName];
            if (argValue !== undefined) {
                directiveArguments.push({
                    kind: Kind.ARGUMENT,
                    name: {
                        kind: Kind.NAME,
                        value: argName,
                    },
                    value: astFromValue(argValue, arg.type),
                });
            }
        });
    }
    else {
        Object.entries(args).forEach(function (_a) {
            var _b = __read(_a, 2), argName = _b[0], argValue = _b[1];
            directiveArguments.push({
                kind: Kind.ARGUMENT,
                name: {
                    kind: Kind.NAME,
                    value: argName,
                },
                value: astFromValueUntyped(argValue),
            });
        });
    }
    return {
        kind: Kind.DIRECTIVE,
        name: {
            kind: Kind.NAME,
            value: name,
        },
        arguments: directiveArguments,
    };
}
function makeDirectiveNodes(schema, directiveValues) {
    var directiveNodes = [];
    Object.entries(directiveValues).forEach(function (_a) {
        var _b = __read(_a, 2), directiveName = _b[0], arrayOrSingleValue = _b[1];
        var directive = schema === null || schema === void 0 ? void 0 : schema.getDirective(directiveName);
        if (Array.isArray(arrayOrSingleValue)) {
            arrayOrSingleValue.forEach(function (value) {
                directiveNodes.push(makeDirectiveNode(directiveName, value, directive));
            });
        }
        else {
            directiveNodes.push(makeDirectiveNode(directiveName, arrayOrSingleValue, directive));
        }
    });
    return directiveNodes;
}

function validateGraphQlDocuments(schema, documentFiles, effectiveRules) {
    return __awaiter(this, void 0, void 0, function () {
        var allFragments, allErrors;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    effectiveRules = effectiveRules || createDefaultRules();
                    allFragments = [];
                    documentFiles.forEach(function (documentFile) {
                        var e_1, _a;
                        if (documentFile.document) {
                            try {
                                for (var _b = __values(documentFile.document.definitions), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var definitionNode = _c.value;
                                    if (definitionNode.kind === Kind.FRAGMENT_DEFINITION) {
                                        allFragments.push(definitionNode);
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                    });
                    allErrors = [];
                    return [4 /*yield*/, Promise.all(documentFiles.map(function (documentFile) { return __awaiter(_this, void 0, void 0, function () {
                            var documentToValidate, errors;
                            return __generator(this, function (_a) {
                                documentToValidate = {
                                    kind: Kind.DOCUMENT,
                                    definitions: __spreadArray(__spreadArray([], __read(allFragments)), __read(documentFile.document.definitions)).filter(function (definition, index, list) {
                                        if (definition.kind === Kind.FRAGMENT_DEFINITION) {
                                            var firstIndex = list.findIndex(function (def) { return def.kind === Kind.FRAGMENT_DEFINITION && def.name.value === definition.name.value; });
                                            var isDuplicated = firstIndex !== index;
                                            if (isDuplicated) {
                                                return false;
                                            }
                                        }
                                        return true;
                                    }),
                                };
                                errors = validate(schema, documentToValidate, effectiveRules);
                                if (errors.length > 0) {
                                    allErrors.push({
                                        filePath: documentFile.location,
                                        errors: errors,
                                    });
                                }
                                return [2 /*return*/];
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, allErrors];
            }
        });
    });
}
function checkValidationErrors(loadDocumentErrors) {
    var e_2, _a;
    if (loadDocumentErrors.length > 0) {
        var errors = [];
        var _loop_1 = function (loadDocumentError) {
            var e_3, _b;
            var _loop_2 = function (graphQLError) {
                var error = new Error();
                error.name = 'GraphQLDocumentError';
                error.message = error.name + ": " + graphQLError.message;
                error.stack = error.message;
                graphQLError.locations.forEach(function (location) { return (error.stack += "\n    at " + loadDocumentError.filePath + ":" + location.line + ":" + location.column); });
                errors.push(error);
            };
            try {
                for (var _c = (e_3 = void 0, __values(loadDocumentError.errors)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var graphQLError = _d.value;
                    _loop_2(graphQLError);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        try {
            for (var loadDocumentErrors_1 = __values(loadDocumentErrors), loadDocumentErrors_1_1 = loadDocumentErrors_1.next(); !loadDocumentErrors_1_1.done; loadDocumentErrors_1_1 = loadDocumentErrors_1.next()) {
                var loadDocumentError = loadDocumentErrors_1_1.value;
                _loop_1(loadDocumentError);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (loadDocumentErrors_1_1 && !loadDocumentErrors_1_1.done && (_a = loadDocumentErrors_1.return)) _a.call(loadDocumentErrors_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        throw new AggregateError(errors);
    }
}
function createDefaultRules() {
    var ignored = ['NoUnusedFragmentsRule', 'NoUnusedVariablesRule', 'KnownDirectivesRule'];
    // GraphQL v14 has no Rule suffix in function names
    // Adding `*Rule` makes validation backwards compatible
    ignored.forEach(function (rule) {
        ignored.push(rule.replace(/Rule$/, ''));
    });
    return specifiedRules.filter(function (f) { return !ignored.includes(f.name); });
}

function buildFixedSchema(schema, options) {
    return buildSchema(printSchemaWithDirectives(schema), __assign({ noLocation: true }, (options || {})));
}
function fixSchemaAst(schema, options) {
    var schemaWithValidAst;
    if (!schema.astNode || !schema.extensionASTNodes) {
        schemaWithValidAst = buildFixedSchema(schema, options);
    }
    if (!schema.astNode) {
        schema.astNode = schemaWithValidAst.astNode;
    }
    if (!schema.extensionASTNodes) {
        schema.extensionASTNodes = schemaWithValidAst.extensionASTNodes;
    }
    return schema;
}

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */
function dedentBlockStringValue(rawString) {
  // Expand a block string's raw value into independent lines.
  var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

  var commonIndent = getBlockStringIndentation(rawString);

  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  } // Remove leading and trailing blank lines.


  var startLine = 0;

  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }

  var endLine = lines.length;

  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  } // Return a string of the lines joined with U+000A.


  return lines.slice(startLine, endLine).join('\n');
}

function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== ' ' && str[i] !== '\t') {
      return false;
    }
  }

  return true;
}
/**
 * @internal
 */


function getBlockStringIndentation(value) {
  var _commonIndent;

  var isFirstLine = true;
  var isEmptyLine = true;
  var indent = 0;
  var commonIndent = null;

  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        //  \r
        if (value.charCodeAt(i + 1) === 10) {
          ++i; // skip \r\n as one symbol
        }

      // falls through

      case 10:
        //  \n
        isFirstLine = false;
        isEmptyLine = true;
        indent = 0;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        ++indent;
        break;

      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
          commonIndent = indent;
        }

        isEmptyLine = false;
    }
  }

  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}

function parseGraphQLSDL(location, rawSDL, options) {
    if (options === void 0) { options = {}; }
    var document;
    var sdl = rawSDL;
    var sdlModified = false;
    try {
        if (options.commentDescriptions && sdl.includes('#')) {
            sdlModified = true;
            document = transformCommentsToDescriptions(rawSDL, options);
            // If noLocation=true, we need to make sure to print and parse it again, to remove locations,
            // since `transformCommentsToDescriptions` must have locations set in order to transform the comments
            // into descriptions.
            if (options.noLocation) {
                document = parse(print(document), options);
            }
        }
        else {
            document = parse(new Source(sdl, location), options);
        }
    }
    catch (e) {
        if (e.message.includes('EOF') && sdl.replace(/(\#[^*]*)/g, '').trim() === '') {
            document = {
                kind: Kind.DOCUMENT,
                definitions: [],
            };
        }
        else {
            throw e;
        }
    }
    return {
        location: location,
        document: document,
        rawSDL: sdlModified ? print(document) : sdl,
    };
}
function getLeadingCommentBlock(node) {
    var loc = node.loc;
    if (!loc) {
        return;
    }
    var comments = [];
    var token = loc.startToken.prev;
    while (token != null &&
        token.kind === TokenKind.COMMENT &&
        token.next &&
        token.prev &&
        token.line + 1 === token.next.line &&
        token.line !== token.prev.line) {
        var value = String(token.value);
        comments.push(value);
        token = token.prev;
    }
    return comments.length > 0 ? comments.reverse().join('\n') : undefined;
}
function transformCommentsToDescriptions(sourceSdl, options) {
    if (options === void 0) { options = {}; }
    var parsedDoc = parse(sourceSdl, __assign(__assign({}, options), { noLocation: false }));
    var modifiedDoc = visit(parsedDoc, {
        leave: function (node) {
            if (isDescribable(node)) {
                var rawValue = getLeadingCommentBlock(node);
                if (rawValue !== undefined) {
                    var commentsBlock = dedentBlockStringValue('\n' + rawValue);
                    var isBlock = commentsBlock.includes('\n');
                    if (!node.description) {
                        return __assign(__assign({}, node), { description: {
                                kind: Kind.STRING,
                                value: commentsBlock,
                                block: isBlock,
                            } });
                    }
                    else {
                        return __assign(__assign({}, node), { description: __assign(__assign({}, node.description), { value: node.description.value + '\n' + commentsBlock, block: true }) });
                    }
                }
            }
        },
    });
    return modifiedDoc;
}
function isDescribable(node) {
    return (isTypeSystemDefinitionNode(node) ||
        node.kind === Kind.FIELD_DEFINITION ||
        node.kind === Kind.INPUT_VALUE_DEFINITION ||
        node.kind === Kind.ENUM_VALUE_DEFINITION);
}

function stripBOM(content) {
    content = content.toString();
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xfeff) {
        content = content.slice(1);
    }
    return content;
}
function parseBOM(content) {
    return JSON.parse(stripBOM(content));
}
function parseGraphQLJSON(location, jsonContent, options) {
    var parsedJson = parseBOM(jsonContent);
    if (parsedJson.data) {
        parsedJson = parsedJson.data;
    }
    if (parsedJson.kind === 'Document') {
        var document_1 = parsedJson;
        return {
            location: location,
            document: document_1,
        };
    }
    else if (parsedJson.__schema) {
        var schema = buildClientSchema(parsedJson, options);
        var rawSDL = printSchemaWithDirectives(schema, options);
        return {
            location: location,
            document: parseGraphQLSDL(location, rawSDL, options).document,
            rawSDL: rawSDL,
            schema: schema,
        };
    }
    throw new Error("Not valid JSON content");
}

/**
 * Get all GraphQL types from schema without:
 *
 * - Query, Mutation, Subscription objects
 * - Internal scalars added by parser
 *
 * @param schema
 */
function getUserTypesFromSchema(schema) {
    var allTypesMap = schema.getTypeMap();
    // tslint:disable-next-line: no-unnecessary-local-variable
    var modelTypes = Object.values(allTypesMap).filter(function (graphqlType) {
        if (isObjectType(graphqlType)) {
            // Filter out private types
            if (graphqlType.name.startsWith('__')) {
                return false;
            }
            if (schema.getMutationType() && graphqlType.name === schema.getMutationType().name) {
                return false;
            }
            if (schema.getQueryType() && graphqlType.name === schema.getQueryType().name) {
                return false;
            }
            if (schema.getSubscriptionType() && graphqlType.name === schema.getSubscriptionType().name) {
                return false;
            }
            return true;
        }
        return false;
    });
    return modelTypes;
}

function createSchemaDefinition(def, config) {
    var schemaRoot = {};
    if (def.query) {
        schemaRoot.query = def.query.toString();
    }
    if (def.mutation) {
        schemaRoot.mutation = def.mutation.toString();
    }
    if (def.subscription) {
        schemaRoot.subscription = def.subscription.toString();
    }
    var fields = Object.keys(schemaRoot)
        .map(function (rootType) { return (schemaRoot[rootType] ? rootType + ": " + schemaRoot[rootType] : null); })
        .filter(function (a) { return a; });
    if (fields.length) {
        return "schema { " + fields.join('\n') + " }";
    }
    if (config && config.force) {
        return " schema { query: Query } ";
    }
    return undefined;
}

var operationVariables = [];
var fieldTypeMap = new Map();
function addOperationVariable(variable) {
    operationVariables.push(variable);
}
function resetOperationVariables() {
    operationVariables = [];
}
function resetFieldMap() {
    fieldTypeMap = new Map();
}
function buildOperationName(name) {
    return camelCase(name);
}
function buildOperationNodeForField(_a) {
    var schema = _a.schema, kind = _a.kind, field = _a.field, models = _a.models, ignore = _a.ignore, depthLimit = _a.depthLimit, circularReferenceDepth = _a.circularReferenceDepth, argNames = _a.argNames, _b = _a.selectedFields, selectedFields = _b === void 0 ? true : _b;
    resetOperationVariables();
    resetFieldMap();
    var operationNode = buildOperationAndCollectVariables({
        schema: schema,
        fieldName: field,
        kind: kind,
        models: models || [],
        ignore: ignore || [],
        depthLimit: depthLimit || Infinity,
        circularReferenceDepth: circularReferenceDepth || 1,
        argNames: argNames,
        selectedFields: selectedFields,
    });
    // attach variables
    operationNode.variableDefinitions = __spreadArray([], __read(operationVariables));
    resetOperationVariables();
    resetFieldMap();
    return operationNode;
}
function buildOperationAndCollectVariables(_a) {
    var schema = _a.schema, fieldName = _a.fieldName, kind = _a.kind, models = _a.models, ignore = _a.ignore, depthLimit = _a.depthLimit, circularReferenceDepth = _a.circularReferenceDepth, argNames = _a.argNames, selectedFields = _a.selectedFields;
    var typeMap = {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
    };
    var type = typeMap[kind];
    var field = type.getFields()[fieldName];
    var operationName = buildOperationName(fieldName + "_" + kind);
    if (field.args) {
        field.args.forEach(function (arg) {
            var argName = arg.name;
            if (!argNames || argNames.includes(argName)) {
                addOperationVariable(resolveVariable(arg, argName));
            }
        });
    }
    return {
        kind: Kind.OPERATION_DEFINITION,
        operation: kind,
        name: {
            kind: 'Name',
            value: operationName,
        },
        variableDefinitions: [],
        selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
                resolveField({
                    type: type,
                    field: field,
                    models: models,
                    firstCall: true,
                    path: [],
                    ancestors: [],
                    ignore: ignore,
                    depthLimit: depthLimit,
                    circularReferenceDepth: circularReferenceDepth,
                    schema: schema,
                    depth: 0,
                    argNames: argNames,
                    selectedFields: selectedFields,
                }),
            ],
        },
    };
}
function resolveSelectionSet(_a) {
    var parent = _a.parent, type = _a.type, models = _a.models, firstCall = _a.firstCall, path = _a.path, ancestors = _a.ancestors, ignore = _a.ignore, depthLimit = _a.depthLimit, circularReferenceDepth = _a.circularReferenceDepth, schema = _a.schema, depth = _a.depth, argNames = _a.argNames, selectedFields = _a.selectedFields;
    if (typeof selectedFields === 'boolean' && depth > depthLimit) {
        return;
    }
    if (isUnionType(type)) {
        var types = type.getTypes();
        return {
            kind: Kind.SELECTION_SET,
            selections: types
                .filter(function (t) {
                return !hasCircularRef(__spreadArray(__spreadArray([], __read(ancestors)), [t]), {
                    depth: circularReferenceDepth,
                });
            })
                .map(function (t) {
                return {
                    kind: Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: Kind.NAMED_TYPE,
                        name: {
                            kind: Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models: models,
                        path: path,
                        ancestors: ancestors,
                        ignore: ignore,
                        depthLimit: depthLimit,
                        circularReferenceDepth: circularReferenceDepth,
                        schema: schema,
                        depth: depth,
                        argNames: argNames,
                        selectedFields: selectedFields,
                    }),
                };
            })
                .filter(function (fragmentNode) { var _a, _b; return ((_b = (_a = fragmentNode === null || fragmentNode === void 0 ? void 0 : fragmentNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length) > 0; }),
        };
    }
    if (isInterfaceType(type)) {
        var types = Object.values(schema.getTypeMap()).filter(function (t) { return isObjectType(t) && t.getInterfaces().includes(type); });
        return {
            kind: Kind.SELECTION_SET,
            selections: types
                .filter(function (t) {
                return !hasCircularRef(__spreadArray(__spreadArray([], __read(ancestors)), [t]), {
                    depth: circularReferenceDepth,
                });
            })
                .map(function (t) {
                return {
                    kind: Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: Kind.NAMED_TYPE,
                        name: {
                            kind: Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models: models,
                        path: path,
                        ancestors: ancestors,
                        ignore: ignore,
                        depthLimit: depthLimit,
                        circularReferenceDepth: circularReferenceDepth,
                        schema: schema,
                        depth: depth,
                        argNames: argNames,
                        selectedFields: selectedFields,
                    }),
                };
            })
                .filter(function (fragmentNode) { var _a, _b; return ((_b = (_a = fragmentNode === null || fragmentNode === void 0 ? void 0 : fragmentNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length) > 0; }),
        };
    }
    if (isObjectType(type)) {
        var isIgnored = ignore.includes(type.name) || ignore.includes(parent.name + "." + path[path.length - 1]);
        var isModel = models.includes(type.name);
        if (!firstCall && isModel && !isIgnored) {
            return {
                kind: Kind.SELECTION_SET,
                selections: [
                    {
                        kind: Kind.FIELD,
                        name: {
                            kind: Kind.NAME,
                            value: 'id',
                        },
                    },
                ],
            };
        }
        var fields_1 = type.getFields();
        return {
            kind: Kind.SELECTION_SET,
            selections: Object.keys(fields_1)
                .filter(function (fieldName) {
                return !hasCircularRef(__spreadArray(__spreadArray([], __read(ancestors)), [getNamedType(fields_1[fieldName].type)]), {
                    depth: circularReferenceDepth,
                });
            })
                .map(function (fieldName) {
                var selectedSubFields = typeof selectedFields === 'object' ? selectedFields[fieldName] : true;
                if (selectedSubFields) {
                    return resolveField({
                        type: type,
                        field: fields_1[fieldName],
                        models: models,
                        path: __spreadArray(__spreadArray([], __read(path)), [fieldName]),
                        ancestors: ancestors,
                        ignore: ignore,
                        depthLimit: depthLimit,
                        circularReferenceDepth: circularReferenceDepth,
                        schema: schema,
                        depth: depth,
                        argNames: argNames,
                        selectedFields: selectedSubFields,
                    });
                }
                return null;
            })
                .filter(function (f) {
                var _a, _b;
                if (f) {
                    if ('selectionSet' in f) {
                        return (_b = (_a = f.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length;
                    }
                    else {
                        return true;
                    }
                }
                return false;
            }),
        };
    }
}
function resolveVariable(arg, name) {
    function resolveVariableType(type) {
        if (isListType(type)) {
            return {
                kind: Kind.LIST_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        if (isNonNullType(type)) {
            return {
                kind: Kind.NON_NULL_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        return {
            kind: Kind.NAMED_TYPE,
            name: {
                kind: Kind.NAME,
                value: type.name,
            },
        };
    }
    return {
        kind: Kind.VARIABLE_DEFINITION,
        variable: {
            kind: Kind.VARIABLE,
            name: {
                kind: Kind.NAME,
                value: name || arg.name,
            },
        },
        type: resolveVariableType(arg.type),
    };
}
function getArgumentName(name, path) {
    return camelCase(__spreadArray(__spreadArray([], __read(path)), [name]).join('_'));
}
function resolveField(_a) {
    var type = _a.type, field = _a.field, models = _a.models, firstCall = _a.firstCall, path = _a.path, ancestors = _a.ancestors, ignore = _a.ignore, depthLimit = _a.depthLimit, circularReferenceDepth = _a.circularReferenceDepth, schema = _a.schema, depth = _a.depth, argNames = _a.argNames, selectedFields = _a.selectedFields;
    var namedType = getNamedType(field.type);
    var args = [];
    var removeField = false;
    if (field.args && field.args.length) {
        args = field.args
            .map(function (arg) {
            var argumentName = getArgumentName(arg.name, path);
            if (argNames && !argNames.includes(argumentName)) {
                if (isNonNullType(arg.type)) {
                    removeField = true;
                }
                return null;
            }
            if (!firstCall) {
                addOperationVariable(resolveVariable(arg, argumentName));
            }
            return {
                kind: Kind.ARGUMENT,
                name: {
                    kind: Kind.NAME,
                    value: arg.name,
                },
                value: {
                    kind: Kind.VARIABLE,
                    name: {
                        kind: Kind.NAME,
                        value: getArgumentName(arg.name, path),
                    },
                },
            };
        })
            .filter(Boolean);
    }
    if (removeField) {
        return null;
    }
    var fieldPath = __spreadArray(__spreadArray([], __read(path)), [field.name]);
    var fieldPathStr = fieldPath.join('.');
    var fieldName = field.name;
    if (fieldTypeMap.has(fieldPathStr) && fieldTypeMap.get(fieldPathStr) !== field.type.toString()) {
        fieldName += field.type.toString().replace('!', 'NonNull');
    }
    fieldTypeMap.set(fieldPathStr, field.type.toString());
    if (!isScalarType(namedType) && !isEnumType(namedType)) {
        return __assign(__assign({ kind: Kind.FIELD, name: {
                kind: Kind.NAME,
                value: field.name,
            } }, (fieldName !== field.name && { alias: { kind: Kind.NAME, value: fieldName } })), { selectionSet: resolveSelectionSet({
                parent: type,
                type: namedType,
                models: models,
                firstCall: firstCall,
                path: fieldPath,
                ancestors: __spreadArray(__spreadArray([], __read(ancestors)), [type]),
                ignore: ignore,
                depthLimit: depthLimit,
                circularReferenceDepth: circularReferenceDepth,
                schema: schema,
                depth: depth + 1,
                argNames: argNames,
                selectedFields: selectedFields,
            }) || undefined, arguments: args });
    }
    return __assign(__assign({ kind: Kind.FIELD, name: {
            kind: Kind.NAME,
            value: field.name,
        } }, (fieldName !== field.name && { alias: { kind: Kind.NAME, value: fieldName } })), { arguments: args });
}
function hasCircularRef(types, config) {
    if (config === void 0) { config = {
        depth: 1,
    }; }
    var type = types[types.length - 1];
    if (isScalarType(type)) {
        return false;
    }
    var size = types.filter(function (t) { return t.name === type.name; }).length;
    return size > config.depth;
}

var VisitSchemaKind;
(function (VisitSchemaKind) {
    VisitSchemaKind["TYPE"] = "VisitSchemaKind.TYPE";
    VisitSchemaKind["SCALAR_TYPE"] = "VisitSchemaKind.SCALAR_TYPE";
    VisitSchemaKind["ENUM_TYPE"] = "VisitSchemaKind.ENUM_TYPE";
    VisitSchemaKind["COMPOSITE_TYPE"] = "VisitSchemaKind.COMPOSITE_TYPE";
    VisitSchemaKind["OBJECT_TYPE"] = "VisitSchemaKind.OBJECT_TYPE";
    VisitSchemaKind["INPUT_OBJECT_TYPE"] = "VisitSchemaKind.INPUT_OBJECT_TYPE";
    VisitSchemaKind["ABSTRACT_TYPE"] = "VisitSchemaKind.ABSTRACT_TYPE";
    VisitSchemaKind["UNION_TYPE"] = "VisitSchemaKind.UNION_TYPE";
    VisitSchemaKind["INTERFACE_TYPE"] = "VisitSchemaKind.INTERFACE_TYPE";
    VisitSchemaKind["ROOT_OBJECT"] = "VisitSchemaKind.ROOT_OBJECT";
    VisitSchemaKind["QUERY"] = "VisitSchemaKind.QUERY";
    VisitSchemaKind["MUTATION"] = "VisitSchemaKind.MUTATION";
    VisitSchemaKind["SUBSCRIPTION"] = "VisitSchemaKind.SUBSCRIPTION";
})(VisitSchemaKind || (VisitSchemaKind = {}));
var MapperKind;
(function (MapperKind) {
    MapperKind["TYPE"] = "MapperKind.TYPE";
    MapperKind["SCALAR_TYPE"] = "MapperKind.SCALAR_TYPE";
    MapperKind["ENUM_TYPE"] = "MapperKind.ENUM_TYPE";
    MapperKind["COMPOSITE_TYPE"] = "MapperKind.COMPOSITE_TYPE";
    MapperKind["OBJECT_TYPE"] = "MapperKind.OBJECT_TYPE";
    MapperKind["INPUT_OBJECT_TYPE"] = "MapperKind.INPUT_OBJECT_TYPE";
    MapperKind["ABSTRACT_TYPE"] = "MapperKind.ABSTRACT_TYPE";
    MapperKind["UNION_TYPE"] = "MapperKind.UNION_TYPE";
    MapperKind["INTERFACE_TYPE"] = "MapperKind.INTERFACE_TYPE";
    MapperKind["ROOT_OBJECT"] = "MapperKind.ROOT_OBJECT";
    MapperKind["QUERY"] = "MapperKind.QUERY";
    MapperKind["MUTATION"] = "MapperKind.MUTATION";
    MapperKind["SUBSCRIPTION"] = "MapperKind.SUBSCRIPTION";
    MapperKind["DIRECTIVE"] = "MapperKind.DIRECTIVE";
    MapperKind["FIELD"] = "MapperKind.FIELD";
    MapperKind["COMPOSITE_FIELD"] = "MapperKind.COMPOSITE_FIELD";
    MapperKind["OBJECT_FIELD"] = "MapperKind.OBJECT_FIELD";
    MapperKind["ROOT_FIELD"] = "MapperKind.ROOT_FIELD";
    MapperKind["QUERY_ROOT_FIELD"] = "MapperKind.QUERY_ROOT_FIELD";
    MapperKind["MUTATION_ROOT_FIELD"] = "MapperKind.MUTATION_ROOT_FIELD";
    MapperKind["SUBSCRIPTION_ROOT_FIELD"] = "MapperKind.SUBSCRIPTION_ROOT_FIELD";
    MapperKind["INTERFACE_FIELD"] = "MapperKind.INTERFACE_FIELD";
    MapperKind["INPUT_OBJECT_FIELD"] = "MapperKind.INPUT_OBJECT_FIELD";
    MapperKind["ARGUMENT"] = "MapperKind.ARGUMENT";
    MapperKind["ENUM_VALUE"] = "MapperKind.ENUM_VALUE";
})(MapperKind || (MapperKind = {}));

function createNamedStub(name, type) {
    var constructor;
    if (type === 'object') {
        constructor = GraphQLObjectType;
    }
    else if (type === 'interface') {
        constructor = GraphQLInterfaceType;
    }
    else {
        constructor = GraphQLInputObjectType;
    }
    return new constructor({
        name: name,
        fields: {
            _fake: {
                type: GraphQLString,
            },
        },
    });
}
function createStub(node, type) {
    switch (node.kind) {
        case Kind.LIST_TYPE:
            return new GraphQLList(createStub(node.type, type));
        case Kind.NON_NULL_TYPE:
            return new GraphQLNonNull(createStub(node.type, type));
        default:
            if (type === 'output') {
                return createNamedStub(node.name.value, 'object');
            }
            return createNamedStub(node.name.value, 'input');
    }
}
function isNamedStub(type) {
    if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
        var fields = type.getFields();
        var fieldNames = Object.keys(fields);
        return fieldNames.length === 1 && fields[fieldNames[0]].name === '_fake';
    }
    return false;
}
function getBuiltInForStub(type) {
    switch (type.name) {
        case GraphQLInt.name:
            return GraphQLInt;
        case GraphQLFloat.name:
            return GraphQLFloat;
        case GraphQLString.name:
            return GraphQLString;
        case GraphQLBoolean.name:
            return GraphQLBoolean;
        case GraphQLID.name:
            return GraphQLID;
        default:
            return type;
    }
}

function rewireTypes(originalTypeMap, directives) {
    var referenceTypeMap = Object.create(null);
    Object.keys(originalTypeMap).forEach(function (typeName) {
        referenceTypeMap[typeName] = originalTypeMap[typeName];
    });
    var newTypeMap = Object.create(null);
    Object.keys(referenceTypeMap).forEach(function (typeName) {
        var namedType = referenceTypeMap[typeName];
        if (namedType == null || typeName.startsWith('__')) {
            return;
        }
        var newName = namedType.name;
        if (newName.startsWith('__')) {
            return;
        }
        if (newTypeMap[newName] != null) {
            throw new Error("Duplicate schema type name " + newName);
        }
        newTypeMap[newName] = namedType;
    });
    Object.keys(newTypeMap).forEach(function (typeName) {
        newTypeMap[typeName] = rewireNamedType(newTypeMap[typeName]);
    });
    var newDirectives = directives.map(function (directive) { return rewireDirective(directive); });
    return {
        typeMap: newTypeMap,
        directives: newDirectives,
    };
    function rewireDirective(directive) {
        if (isSpecifiedDirective(directive)) {
            return directive;
        }
        var directiveConfig = directive.toConfig();
        directiveConfig.args = rewireArgs(directiveConfig.args);
        return new GraphQLDirective(directiveConfig);
    }
    function rewireArgs(args) {
        var rewiredArgs = {};
        Object.keys(args).forEach(function (argName) {
            var arg = args[argName];
            var rewiredArgType = rewireType(arg.type);
            if (rewiredArgType != null) {
                arg.type = rewiredArgType;
                rewiredArgs[argName] = arg;
            }
        });
        return rewiredArgs;
    }
    function rewireNamedType(type) {
        if (isObjectType(type)) {
            var config_1 = type.toConfig();
            var newConfig = __assign(__assign({}, config_1), { fields: function () { return rewireFields(config_1.fields); }, interfaces: function () { return rewireNamedTypes(config_1.interfaces); } });
            return new GraphQLObjectType(newConfig);
        }
        else if (isInterfaceType(type)) {
            var config_2 = type.toConfig();
            var newConfig = __assign(__assign({}, config_2), { fields: function () { return rewireFields(config_2.fields); } });
            if ('interfaces' in newConfig) {
                newConfig.interfaces = function () {
                    return rewireNamedTypes(config_2.interfaces);
                };
            }
            return new GraphQLInterfaceType(newConfig);
        }
        else if (isUnionType(type)) {
            var config_3 = type.toConfig();
            var newConfig = __assign(__assign({}, config_3), { types: function () { return rewireNamedTypes(config_3.types); } });
            return new GraphQLUnionType(newConfig);
        }
        else if (isInputObjectType(type)) {
            var config_4 = type.toConfig();
            var newConfig = __assign(__assign({}, config_4), { fields: function () { return rewireInputFields(config_4.fields); } });
            return new GraphQLInputObjectType(newConfig);
        }
        else if (isEnumType(type)) {
            var enumConfig = type.toConfig();
            return new GraphQLEnumType(enumConfig);
        }
        else if (isScalarType(type)) {
            if (isSpecifiedScalarType(type)) {
                return type;
            }
            var scalarConfig = type.toConfig();
            return new GraphQLScalarType(scalarConfig);
        }
        throw new Error("Unexpected schema type: " + type);
    }
    function rewireFields(fields) {
        var rewiredFields = {};
        Object.keys(fields).forEach(function (fieldName) {
            var field = fields[fieldName];
            var rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null) {
                field.type = rewiredFieldType;
                field.args = rewireArgs(field.args);
                rewiredFields[fieldName] = field;
            }
        });
        return rewiredFields;
    }
    function rewireInputFields(fields) {
        var rewiredFields = {};
        Object.keys(fields).forEach(function (fieldName) {
            var field = fields[fieldName];
            var rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null) {
                field.type = rewiredFieldType;
                rewiredFields[fieldName] = field;
            }
        });
        return rewiredFields;
    }
    function rewireNamedTypes(namedTypes) {
        var rewiredTypes = [];
        namedTypes.forEach(function (namedType) {
            var rewiredType = rewireType(namedType);
            if (rewiredType != null) {
                rewiredTypes.push(rewiredType);
            }
        });
        return rewiredTypes;
    }
    function rewireType(type) {
        if (isListType(type)) {
            var rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new GraphQLList(rewiredType) : null;
        }
        else if (isNonNullType(type)) {
            var rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new GraphQLNonNull(rewiredType) : null;
        }
        else if (isNamedType(type)) {
            var rewiredType = referenceTypeMap[type.name];
            if (rewiredType === undefined) {
                rewiredType = isNamedStub(type) ? getBuiltInForStub(type) : rewireNamedType(type);
                newTypeMap[rewiredType.name] = referenceTypeMap[type.name] = rewiredType;
            }
            return rewiredType != null ? newTypeMap[rewiredType.name] : null;
        }
        return null;
    }
}

function transformInputValue(type, value, inputLeafValueTransformer, inputObjectValueTransformer) {
    if (inputLeafValueTransformer === void 0) { inputLeafValueTransformer = null; }
    if (inputObjectValueTransformer === void 0) { inputObjectValueTransformer = null; }
    if (value == null) {
        return value;
    }
    var nullableType = getNullableType(type);
    if (isLeafType(nullableType)) {
        return inputLeafValueTransformer != null ? inputLeafValueTransformer(nullableType, value) : value;
    }
    else if (isListType(nullableType)) {
        return value.map(function (listMember) {
            return transformInputValue(nullableType.ofType, listMember, inputLeafValueTransformer, inputObjectValueTransformer);
        });
    }
    else if (isInputObjectType(nullableType)) {
        var fields_1 = nullableType.getFields();
        var newValue_1 = {};
        Object.keys(value).forEach(function (key) {
            var field = fields_1[key];
            if (field != null) {
                newValue_1[key] = transformInputValue(field.type, value[key], inputLeafValueTransformer, inputObjectValueTransformer);
            }
        });
        return inputObjectValueTransformer != null ? inputObjectValueTransformer(nullableType, newValue_1) : newValue_1;
    }
    // unreachable, no other possible return value
}
function serializeInputValue(type, value) {
    return transformInputValue(type, value, function (t, v) { return t.serialize(v); });
}
function parseInputValue(type, value) {
    return transformInputValue(type, value, function (t, v) { return t.parseValue(v); });
}
function parseInputValueLiteral(type, value) {
    return transformInputValue(type, value, function (t, v) { return t.parseLiteral(v, {}); });
}

function mapSchema(schema, schemaMapper) {
    if (schemaMapper === void 0) { schemaMapper = {}; }
    var originalTypeMap = schema.getTypeMap();
    var newTypeMap = mapDefaultValues(originalTypeMap, schema, serializeInputValue);
    newTypeMap = mapTypes(newTypeMap, schema, schemaMapper, function (type) { return isLeafType(type); });
    newTypeMap = mapEnumValues(newTypeMap, schema, schemaMapper);
    newTypeMap = mapDefaultValues(newTypeMap, schema, parseInputValue);
    newTypeMap = mapTypes(newTypeMap, schema, schemaMapper, function (type) { return !isLeafType(type); });
    newTypeMap = mapFields(newTypeMap, schema, schemaMapper);
    newTypeMap = mapArguments(newTypeMap, schema, schemaMapper);
    var originalDirectives = schema.getDirectives();
    var newDirectives = mapDirectives(originalDirectives, schema, schemaMapper);
    var queryType = schema.getQueryType();
    var mutationType = schema.getMutationType();
    var subscriptionType = schema.getSubscriptionType();
    var newQueryTypeName = queryType != null ? (newTypeMap[queryType.name] != null ? newTypeMap[queryType.name].name : undefined) : undefined;
    var newMutationTypeName = mutationType != null
        ? newTypeMap[mutationType.name] != null
            ? newTypeMap[mutationType.name].name
            : undefined
        : undefined;
    var newSubscriptionTypeName = subscriptionType != null
        ? newTypeMap[subscriptionType.name] != null
            ? newTypeMap[subscriptionType.name].name
            : undefined
        : undefined;
    var _a = rewireTypes(newTypeMap, newDirectives), typeMap = _a.typeMap, directives = _a.directives;
    return new GraphQLSchema(__assign(__assign({}, schema.toConfig()), { query: newQueryTypeName ? typeMap[newQueryTypeName] : undefined, mutation: newMutationTypeName ? typeMap[newMutationTypeName] : undefined, subscription: newSubscriptionTypeName != null ? typeMap[newSubscriptionTypeName] : undefined, types: Object.keys(typeMap).map(function (typeName) { return typeMap[typeName]; }), directives: directives }));
}
function mapTypes(originalTypeMap, schema, schemaMapper, testFn) {
    if (testFn === void 0) { testFn = function () { return true; }; }
    var newTypeMap = {};
    Object.keys(originalTypeMap).forEach(function (typeName) {
        if (!typeName.startsWith('__')) {
            var originalType = originalTypeMap[typeName];
            if (originalType == null || !testFn(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var typeMapper = getTypeMapper(schema, schemaMapper, typeName);
            if (typeMapper == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var maybeNewType = typeMapper(originalType, schema);
            if (maybeNewType === undefined) {
                newTypeMap[typeName] = originalType;
                return;
            }
            newTypeMap[typeName] = maybeNewType;
        }
    });
    return newTypeMap;
}
function mapEnumValues(originalTypeMap, schema, schemaMapper) {
    var _a;
    var enumValueMapper = getEnumValueMapper(schemaMapper);
    if (!enumValueMapper) {
        return originalTypeMap;
    }
    return mapTypes(originalTypeMap, schema, (_a = {},
        _a[MapperKind.ENUM_TYPE] = function (type) {
            var config = type.toConfig();
            var originalEnumValueConfigMap = config.values;
            var newEnumValueConfigMap = {};
            Object.keys(originalEnumValueConfigMap).forEach(function (externalValue) {
                var originalEnumValueConfig = originalEnumValueConfigMap[externalValue];
                var mappedEnumValue = enumValueMapper(originalEnumValueConfig, type.name, schema, externalValue);
                if (mappedEnumValue === undefined) {
                    newEnumValueConfigMap[externalValue] = originalEnumValueConfig;
                }
                else if (Array.isArray(mappedEnumValue)) {
                    var _a = __read(mappedEnumValue, 2), newExternalValue = _a[0], newEnumValueConfig = _a[1];
                    newEnumValueConfigMap[newExternalValue] =
                        newEnumValueConfig === undefined ? originalEnumValueConfig : newEnumValueConfig;
                }
                else if (mappedEnumValue !== null) {
                    newEnumValueConfigMap[externalValue] = mappedEnumValue;
                }
            });
            return correctASTNodes(new GraphQLEnumType(__assign(__assign({}, config), { values: newEnumValueConfigMap })));
        },
        _a), function (type) { return isEnumType(type); });
}
function mapDefaultValues(originalTypeMap, schema, fn) {
    var _a, _b;
    var newTypeMap = mapArguments(originalTypeMap, schema, (_a = {},
        _a[MapperKind.ARGUMENT] = function (argumentConfig) {
            if (argumentConfig.defaultValue === undefined) {
                return argumentConfig;
            }
            var maybeNewType = getNewType(originalTypeMap, argumentConfig.type);
            if (maybeNewType != null) {
                return __assign(__assign({}, argumentConfig), { defaultValue: fn(maybeNewType, argumentConfig.defaultValue) });
            }
        },
        _a));
    return mapFields(newTypeMap, schema, (_b = {},
        _b[MapperKind.INPUT_OBJECT_FIELD] = function (inputFieldConfig) {
            if (inputFieldConfig.defaultValue === undefined) {
                return inputFieldConfig;
            }
            var maybeNewType = getNewType(newTypeMap, inputFieldConfig.type);
            if (maybeNewType != null) {
                return __assign(__assign({}, inputFieldConfig), { defaultValue: fn(maybeNewType, inputFieldConfig.defaultValue) });
            }
        },
        _b));
}
function getNewType(newTypeMap, type) {
    if (isListType(type)) {
        var newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new GraphQLList(newType) : null;
    }
    else if (isNonNullType(type)) {
        var newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new GraphQLNonNull(newType) : null;
    }
    else if (isNamedType(type)) {
        var newType = newTypeMap[type.name];
        return newType != null ? newType : null;
    }
    return null;
}
function mapFields(originalTypeMap, schema, schemaMapper) {
    var newTypeMap = {};
    Object.keys(originalTypeMap).forEach(function (typeName) {
        if (!typeName.startsWith('__')) {
            var originalType = originalTypeMap[typeName];
            if (!isObjectType(originalType) && !isInterfaceType(originalType) && !isInputObjectType(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var fieldMapper_1 = getFieldMapper(schema, schemaMapper, typeName);
            if (fieldMapper_1 == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var config = originalType.toConfig();
            var originalFieldConfigMap_1 = config.fields;
            var newFieldConfigMap_1 = {};
            Object.keys(originalFieldConfigMap_1).forEach(function (fieldName) {
                var originalFieldConfig = originalFieldConfigMap_1[fieldName];
                var mappedField = fieldMapper_1(originalFieldConfig, fieldName, typeName, schema);
                if (mappedField === undefined) {
                    newFieldConfigMap_1[fieldName] = originalFieldConfig;
                }
                else if (Array.isArray(mappedField)) {
                    var _a = __read(mappedField, 2), newFieldName = _a[0], newFieldConfig = _a[1];
                    if (newFieldConfig.astNode != null) {
                        newFieldConfig.astNode = __assign(__assign({}, newFieldConfig.astNode), { name: __assign(__assign({}, newFieldConfig.astNode.name), { value: newFieldName }) });
                    }
                    newFieldConfigMap_1[newFieldName] = newFieldConfig === undefined ? originalFieldConfig : newFieldConfig;
                }
                else if (mappedField !== null) {
                    newFieldConfigMap_1[fieldName] = mappedField;
                }
            });
            if (isObjectType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new GraphQLObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_1 })));
            }
            else if (isInterfaceType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new GraphQLInterfaceType(__assign(__assign({}, config), { fields: newFieldConfigMap_1 })));
            }
            else {
                newTypeMap[typeName] = correctASTNodes(new GraphQLInputObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_1 })));
            }
        }
    });
    return newTypeMap;
}
function mapArguments(originalTypeMap, schema, schemaMapper) {
    var newTypeMap = {};
    Object.keys(originalTypeMap).forEach(function (typeName) {
        if (!typeName.startsWith('__')) {
            var originalType = originalTypeMap[typeName];
            if (!isObjectType(originalType) && !isInterfaceType(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var argumentMapper_1 = getArgumentMapper(schemaMapper);
            if (argumentMapper_1 == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            var config = originalType.toConfig();
            var originalFieldConfigMap_2 = config.fields;
            var newFieldConfigMap_2 = {};
            Object.keys(originalFieldConfigMap_2).forEach(function (fieldName) {
                var originalFieldConfig = originalFieldConfigMap_2[fieldName];
                var originalArgumentConfigMap = originalFieldConfig.args;
                if (originalArgumentConfigMap == null) {
                    newFieldConfigMap_2[fieldName] = originalFieldConfig;
                    return;
                }
                var argumentNames = Object.keys(originalArgumentConfigMap);
                if (!argumentNames.length) {
                    newFieldConfigMap_2[fieldName] = originalFieldConfig;
                    return;
                }
                var newArgumentConfigMap = {};
                argumentNames.forEach(function (argumentName) {
                    var originalArgumentConfig = originalArgumentConfigMap[argumentName];
                    var mappedArgument = argumentMapper_1(originalArgumentConfig, fieldName, typeName, schema);
                    if (mappedArgument === undefined) {
                        newArgumentConfigMap[argumentName] = originalArgumentConfig;
                    }
                    else if (Array.isArray(mappedArgument)) {
                        var _a = __read(mappedArgument, 2), newArgumentName = _a[0], newArgumentConfig = _a[1];
                        newArgumentConfigMap[newArgumentName] = newArgumentConfig;
                    }
                    else if (mappedArgument !== null) {
                        newArgumentConfigMap[argumentName] = mappedArgument;
                    }
                });
                newFieldConfigMap_2[fieldName] = __assign(__assign({}, originalFieldConfig), { args: newArgumentConfigMap });
            });
            if (isObjectType(originalType)) {
                newTypeMap[typeName] = new GraphQLObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_2 }));
            }
            else if (isInterfaceType(originalType)) {
                newTypeMap[typeName] = new GraphQLInterfaceType(__assign(__assign({}, config), { fields: newFieldConfigMap_2 }));
            }
            else {
                newTypeMap[typeName] = new GraphQLInputObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_2 }));
            }
        }
    });
    return newTypeMap;
}
function mapDirectives(originalDirectives, schema, schemaMapper) {
    var directiveMapper = getDirectiveMapper(schemaMapper);
    if (directiveMapper == null) {
        return originalDirectives.slice();
    }
    var newDirectives = [];
    originalDirectives.forEach(function (directive) {
        var mappedDirective = directiveMapper(directive, schema);
        if (mappedDirective === undefined) {
            newDirectives.push(directive);
        }
        else if (mappedDirective !== null) {
            newDirectives.push(mappedDirective);
        }
    });
    return newDirectives;
}
function getTypeSpecifiers(schema, typeName) {
    var type = schema.getType(typeName);
    var specifiers = [MapperKind.TYPE];
    if (isObjectType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.OBJECT_TYPE);
        var query = schema.getQueryType();
        var mutation = schema.getMutationType();
        var subscription = schema.getSubscriptionType();
        if (query != null && typeName === query.name) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.QUERY);
        }
        else if (mutation != null && typeName === mutation.name) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.MUTATION);
        }
        else if (subscription != null && typeName === subscription.name) {
            specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.SUBSCRIPTION);
        }
    }
    else if (isInputObjectType(type)) {
        specifiers.push(MapperKind.INPUT_OBJECT_TYPE);
    }
    else if (isInterfaceType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.INTERFACE_TYPE);
    }
    else if (isUnionType(type)) {
        specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.UNION_TYPE);
    }
    else if (isEnumType(type)) {
        specifiers.push(MapperKind.ENUM_TYPE);
    }
    else if (isScalarType(type)) {
        specifiers.push(MapperKind.SCALAR_TYPE);
    }
    return specifiers;
}
function getTypeMapper(schema, schemaMapper, typeName) {
    var specifiers = getTypeSpecifiers(schema, typeName);
    var typeMapper;
    var stack = __spreadArray([], __read(specifiers));
    while (!typeMapper && stack.length > 0) {
        var next = stack.pop();
        typeMapper = schemaMapper[next];
    }
    return typeMapper != null ? typeMapper : null;
}
function getFieldSpecifiers(schema, typeName) {
    var type = schema.getType(typeName);
    var specifiers = [MapperKind.FIELD];
    if (isObjectType(type)) {
        specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.OBJECT_FIELD);
        var query = schema.getQueryType();
        var mutation = schema.getMutationType();
        var subscription = schema.getSubscriptionType();
        if (query != null && typeName === query.name) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.QUERY_ROOT_FIELD);
        }
        else if (mutation != null && typeName === mutation.name) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.MUTATION_ROOT_FIELD);
        }
        else if (subscription != null && typeName === subscription.name) {
            specifiers.push(MapperKind.ROOT_FIELD, MapperKind.SUBSCRIPTION_ROOT_FIELD);
        }
    }
    else if (isInterfaceType(type)) {
        specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.INTERFACE_FIELD);
    }
    else if (isInputObjectType(type)) {
        specifiers.push(MapperKind.INPUT_OBJECT_FIELD);
    }
    return specifiers;
}
function getFieldMapper(schema, schemaMapper, typeName) {
    var specifiers = getFieldSpecifiers(schema, typeName);
    var fieldMapper;
    var stack = __spreadArray([], __read(specifiers));
    while (!fieldMapper && stack.length > 0) {
        var next = stack.pop();
        fieldMapper = schemaMapper[next];
    }
    return fieldMapper != null ? fieldMapper : null;
}
function getArgumentMapper(schemaMapper) {
    var argumentMapper = schemaMapper[MapperKind.ARGUMENT];
    return argumentMapper != null ? argumentMapper : null;
}
function getDirectiveMapper(schemaMapper) {
    var directiveMapper = schemaMapper[MapperKind.DIRECTIVE];
    return directiveMapper != null ? directiveMapper : null;
}
function getEnumValueMapper(schemaMapper) {
    var enumValueMapper = schemaMapper[MapperKind.ENUM_VALUE];
    return enumValueMapper != null ? enumValueMapper : null;
}
function correctASTNodes(type) {
    if (isObjectType(type)) {
        var config = type.toConfig();
        if (config.astNode != null) {
            var fields_1 = [];
            Object.values(config.fields).forEach(function (fieldConfig) {
                if (fieldConfig.astNode != null) {
                    fields_1.push(fieldConfig.astNode);
                }
            });
            config.astNode = __assign(__assign({}, config.astNode), { kind: Kind.OBJECT_TYPE_DEFINITION, fields: fields_1 });
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { kind: Kind.OBJECT_TYPE_EXTENSION, fields: undefined })); });
        }
        return new GraphQLObjectType(config);
    }
    else if (isInterfaceType(type)) {
        var config = type.toConfig();
        if (config.astNode != null) {
            var fields_2 = [];
            Object.values(config.fields).forEach(function (fieldConfig) {
                if (fieldConfig.astNode != null) {
                    fields_2.push(fieldConfig.astNode);
                }
            });
            config.astNode = __assign(__assign({}, config.astNode), { kind: Kind.INTERFACE_TYPE_DEFINITION, fields: fields_2 });
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { kind: Kind.INTERFACE_TYPE_EXTENSION, fields: undefined })); });
        }
        return new GraphQLInterfaceType(config);
    }
    else if (isInputObjectType(type)) {
        var config = type.toConfig();
        if (config.astNode != null) {
            var fields_3 = [];
            Object.values(config.fields).forEach(function (fieldConfig) {
                if (fieldConfig.astNode != null) {
                    fields_3.push(fieldConfig.astNode);
                }
            });
            config.astNode = __assign(__assign({}, config.astNode), { kind: Kind.INPUT_OBJECT_TYPE_DEFINITION, fields: fields_3 });
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { kind: Kind.INPUT_OBJECT_TYPE_EXTENSION, fields: undefined })); });
        }
        return new GraphQLInputObjectType(config);
    }
    else if (isEnumType(type)) {
        var config = type.toConfig();
        if (config.astNode != null) {
            var values_1 = [];
            Object.values(config.values).forEach(function (enumValueConfig) {
                if (enumValueConfig.astNode != null) {
                    values_1.push(enumValueConfig.astNode);
                }
            });
            config.astNode = __assign(__assign({}, config.astNode), { values: values_1 });
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { values: undefined })); });
        }
        return new GraphQLEnumType(config);
    }
    else {
        return type;
    }
}

function filterSchema(_a) {
    var _b;
    var schema = _a.schema, _c = _a.typeFilter, typeFilter = _c === void 0 ? function () { return true; } : _c, _d = _a.fieldFilter, fieldFilter = _d === void 0 ? undefined : _d, _e = _a.rootFieldFilter, rootFieldFilter = _e === void 0 ? undefined : _e, _f = _a.objectFieldFilter, objectFieldFilter = _f === void 0 ? undefined : _f, _g = _a.interfaceFieldFilter, interfaceFieldFilter = _g === void 0 ? undefined : _g, _h = _a.inputObjectFieldFilter, inputObjectFieldFilter = _h === void 0 ? undefined : _h, _j = _a.argumentFilter, argumentFilter = _j === void 0 ? undefined : _j;
    var filteredSchema = mapSchema(schema, (_b = {},
        _b[MapperKind.QUERY] = function (type) { return filterRootFields(type, 'Query', rootFieldFilter, argumentFilter); },
        _b[MapperKind.MUTATION] = function (type) {
            return filterRootFields(type, 'Mutation', rootFieldFilter, argumentFilter);
        },
        _b[MapperKind.SUBSCRIPTION] = function (type) {
            return filterRootFields(type, 'Subscription', rootFieldFilter, argumentFilter);
        },
        _b[MapperKind.OBJECT_TYPE] = function (type) {
            return typeFilter(type.name, type)
                ? filterElementFields(GraphQLObjectType, type, objectFieldFilter || fieldFilter, argumentFilter)
                : null;
        },
        _b[MapperKind.INTERFACE_TYPE] = function (type) {
            return typeFilter(type.name, type)
                ? filterElementFields(GraphQLInterfaceType, type, interfaceFieldFilter || fieldFilter, argumentFilter)
                : null;
        },
        _b[MapperKind.INPUT_OBJECT_TYPE] = function (type) {
            return typeFilter(type.name, type)
                ? filterElementFields(GraphQLInputObjectType, type, inputObjectFieldFilter || fieldFilter)
                : null;
        },
        _b[MapperKind.UNION_TYPE] = function (type) { return (typeFilter(type.name, type) ? undefined : null); },
        _b[MapperKind.ENUM_TYPE] = function (type) { return (typeFilter(type.name, type) ? undefined : null); },
        _b[MapperKind.SCALAR_TYPE] = function (type) { return (typeFilter(type.name, type) ? undefined : null); },
        _b));
    return filteredSchema;
}
function filterRootFields(type, operation, rootFieldFilter, argumentFilter) {
    if (rootFieldFilter || argumentFilter) {
        var config_1 = type.toConfig();
        Object.entries(config_1.fields).forEach(function (_a) {
            var e_1, _b;
            var _c = __read(_a, 2), fieldName = _c[0], field = _c[1];
            if (rootFieldFilter && !rootFieldFilter(operation, fieldName, config_1.fields[fieldName])) {
                delete config_1.fields[fieldName];
            }
            else if (argumentFilter) {
                try {
                    for (var _d = __values(Object.keys(field.args)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var argName = _e.value;
                        if (!argumentFilter(operation, fieldName, argName, field.args[argName])) {
                            delete field.args[argName];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
        return new GraphQLObjectType(config_1);
    }
    return type;
}
function filterElementFields(ElementConstructor, type, fieldFilter, argumentFilter) {
    if (fieldFilter || argumentFilter) {
        var config_2 = type.toConfig();
        Object.entries(config_2.fields).forEach(function (_a) {
            var e_2, _b;
            var _c = __read(_a, 2), fieldName = _c[0], field = _c[1];
            if (fieldFilter && !fieldFilter(type.name, fieldName, config_2.fields[fieldName])) {
                delete config_2.fields[fieldName];
            }
            else if (argumentFilter && 'args' in field) {
                try {
                    for (var _d = __values(Object.keys(field.args)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var argName = _e.value;
                        if (!argumentFilter(type.name, fieldName, argName, field.args[argName])) {
                            delete field.args[argName];
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        });
        return new ElementConstructor(config_2);
    }
}

function cloneDirective(directive) {
    return isSpecifiedDirective(directive) ? directive : new GraphQLDirective(directive.toConfig());
}
function cloneType(type) {
    if (isObjectType(type)) {
        var config = type.toConfig();
        return new GraphQLObjectType(__assign(__assign({}, config), { interfaces: typeof config.interfaces === 'function' ? config.interfaces : config.interfaces.slice() }));
    }
    else if (isInterfaceType(type)) {
        var config = type.toConfig();
        var newConfig = __assign(__assign({}, config), { interfaces: __spreadArray([], __read(((typeof config.interfaces === 'function' ? config.interfaces() : config.interfaces) || []))) });
        return new GraphQLInterfaceType(newConfig);
    }
    else if (isUnionType(type)) {
        var config = type.toConfig();
        return new GraphQLUnionType(__assign(__assign({}, config), { types: config.types.slice() }));
    }
    else if (isInputObjectType(type)) {
        return new GraphQLInputObjectType(type.toConfig());
    }
    else if (isEnumType(type)) {
        return new GraphQLEnumType(type.toConfig());
    }
    else if (isScalarType(type)) {
        return isSpecifiedScalarType(type) ? type : new GraphQLScalarType(type.toConfig());
    }
    throw new Error("Invalid type " + type);
}
function cloneSchema(schema) {
    return mapSchema(schema);
}

// Update any references to named schema types that disagree with the named
// types found in schema.getTypeMap().
//
// healSchema and its callers (visitSchema/visitSchemaDirectives) all modify the schema in place.
// Therefore, private variables (such as the stored implementation map and the proper root types)
// are not updated.
//
// If this causes issues, the schema could be more aggressively healed as follows:
//
// healSchema(schema);
// const config = schema.toConfig()
// const healedSchema = new GraphQLSchema({
//   ...config,
//   query: schema.getType('<desired new root query type name>'),
//   mutation: schema.getType('<desired new root mutation type name>'),
//   subscription: schema.getType('<desired new root subscription type name>'),
// });
//
// One can then also -- if necessary --  assign the correct private variables to the initial schema
// as follows:
// Object.assign(schema, healedSchema);
//
// These steps are not taken automatically to preserve backwards compatibility with graphql-tools v4.
// See https://github.com/ardatan/graphql-tools/issues/1462
//
// They were briefly taken in v5, but can now be phased out as they were only required when other
// areas of the codebase were using healSchema and visitSchema more extensively.
//
function healSchema(schema) {
    healTypes(schema.getTypeMap(), schema.getDirectives());
    return schema;
}
function healTypes(originalTypeMap, directives) {
    var e_1, _a;
    var actualNamedTypeMap = Object.create(null);
    // If any of the .name properties of the GraphQLNamedType objects in
    // schema.getTypeMap() have changed, the keys of the type map need to
    // be updated accordingly.
    Object.entries(originalTypeMap).forEach(function (_a) {
        var _b = __read(_a, 2), typeName = _b[0], namedType = _b[1];
        if (namedType == null || typeName.startsWith('__')) {
            return;
        }
        var actualName = namedType.name;
        if (actualName.startsWith('__')) {
            return;
        }
        if (actualName in actualNamedTypeMap) {
            throw new Error("Duplicate schema type name " + actualName);
        }
        actualNamedTypeMap[actualName] = namedType;
        // Note: we are deliberately leaving namedType in the schema by its
        // original name (which might be different from actualName), so that
        // references by that name can be healed.
    });
    // Now add back every named type by its actual name.
    Object.entries(actualNamedTypeMap).forEach(function (_a) {
        var _b = __read(_a, 2), typeName = _b[0], namedType = _b[1];
        originalTypeMap[typeName] = namedType;
    });
    // Directive declaration argument types can refer to named types.
    directives.forEach(function (decl) {
        decl.args = decl.args.filter(function (arg) {
            arg.type = healType(arg.type);
            return arg.type !== null;
        });
    });
    Object.entries(originalTypeMap).forEach(function (_a) {
        var _b = __read(_a, 2), typeName = _b[0], namedType = _b[1];
        // Heal all named types, except for dangling references, kept only to redirect.
        if (!typeName.startsWith('__') && typeName in actualNamedTypeMap) {
            if (namedType != null) {
                healNamedType(namedType);
            }
        }
    });
    try {
        for (var _b = __values(Object.keys(originalTypeMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var typeName = _c.value;
            if (!typeName.startsWith('__') && !(typeName in actualNamedTypeMap)) {
                delete originalTypeMap[typeName];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    function healNamedType(type) {
        if (isObjectType(type)) {
            healFields(type);
            healInterfaces(type);
            return;
        }
        else if (isInterfaceType(type)) {
            healFields(type);
            if ('getInterfaces' in type) {
                healInterfaces(type);
            }
            return;
        }
        else if (isUnionType(type)) {
            healUnderlyingTypes(type);
            return;
        }
        else if (isInputObjectType(type)) {
            healInputFields(type);
            return;
        }
        else if (isLeafType(type)) {
            return;
        }
        throw new Error("Unexpected schema type: " + type);
    }
    function healFields(type) {
        var e_2, _a;
        var fieldMap = type.getFields();
        try {
            for (var _b = __values(Object.entries(fieldMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], field = _d[1];
                field.args
                    .map(function (arg) {
                    arg.type = healType(arg.type);
                    return arg.type === null ? null : arg;
                })
                    .filter(Boolean);
                field.type = healType(field.type);
                if (field.type === null) {
                    delete fieldMap[key];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function healInterfaces(type) {
        if ('getInterfaces' in type) {
            var interfaces = type.getInterfaces();
            interfaces.push.apply(interfaces, __spreadArray([], __read(interfaces
                .splice(0)
                .map(function (iface) { return healType(iface); })
                .filter(Boolean))));
        }
    }
    function healInputFields(type) {
        var e_3, _a;
        var fieldMap = type.getFields();
        try {
            for (var _b = __values(Object.entries(fieldMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], field = _d[1];
                field.type = healType(field.type);
                if (field.type === null) {
                    delete fieldMap[key];
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    function healUnderlyingTypes(type) {
        var types = type.getTypes();
        types.push.apply(types, __spreadArray([], __read(types
            .splice(0)
            .map(function (t) { return healType(t); })
            .filter(Boolean))));
    }
    function healType(type) {
        // Unwrap the two known wrapper types
        if (isListType(type)) {
            var healedType = healType(type.ofType);
            return healedType != null ? new GraphQLList(healedType) : null;
        }
        else if (isNonNullType(type)) {
            var healedType = healType(type.ofType);
            return healedType != null ? new GraphQLNonNull(healedType) : null;
        }
        else if (isNamedType(type)) {
            // If a type annotation on a field or an argument or a union member is
            // any `GraphQLNamedType` with a `name`, then it must end up identical
            // to `schema.getType(name)`, since `schema.getTypeMap()` is the source
            // of truth for all named schema types.
            // Note that new types can still be simply added by adding a field, as
            // the official type will be undefined, not null.
            var officialType = originalTypeMap[type.name];
            if (officialType && type !== officialType) {
                return officialType;
            }
        }
        return type;
    }
}

// Abstract base class of any visitor implementation, defining the available
// visitor methods along with their parameter types, and providing a static
// helper function for determining whether a subclass implements a given
// visitor method, as opposed to inheriting one of the stubs defined here.
var SchemaVisitor = /** @class */ (function () {
    function SchemaVisitor() {
    }
    // Determine if this SchemaVisitor (sub)class implements a particular
    // visitor method.
    SchemaVisitor.implementsVisitorMethod = function (methodName) {
        if (!methodName.startsWith('visit')) {
            return false;
        }
        var method = this.prototype[methodName];
        if (typeof method !== 'function') {
            return false;
        }
        if (this.name === 'SchemaVisitor') {
            // The SchemaVisitor class implements every visitor method.
            return true;
        }
        var stub = SchemaVisitor.prototype[methodName];
        if (method === stub) {
            // If this.prototype[methodName] was just inherited from SchemaVisitor,
            // then this class does not really implement the method.
            return false;
        }
        return true;
    };
    // Concrete subclasses of SchemaVisitor should override one or more of these
    // visitor methods, in order to express their interest in handling certain
    // schema types/locations. Each method may return null to remove the given
    // type from the schema, a non-null value of the same type to update the
    // type in the schema, or nothing to leave the type as it was.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    SchemaVisitor.prototype.visitSchema = function (_schema) { };
    SchemaVisitor.prototype.visitScalar = function (_scalar
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitObject = function (_object
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitFieldDefinition = function (_field, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitArgumentDefinition = function (_argument, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitInterface = function (_iface
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    SchemaVisitor.prototype.visitUnion = function (_union) { };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    SchemaVisitor.prototype.visitEnum = function (_type) { };
    SchemaVisitor.prototype.visitEnumValue = function (_value, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitInputObject = function (_object
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    SchemaVisitor.prototype.visitInputFieldDefinition = function (_field, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { };
    return SchemaVisitor;
}());

function isSchemaVisitor(obj) {
    if ('schema' in obj && isSchema(obj.schema)) {
        if ('visitSchema' in obj && typeof obj.visitSchema === 'function') {
            return true;
        }
    }
    return false;
}
// Generic function for visiting GraphQLSchema objects.
function visitSchema(schema, 
// To accommodate as many different visitor patterns as possible, the
// visitSchema function does not simply accept a single instance of the
// SchemaVisitor class, but instead accepts a function that takes the
// current VisitableSchemaType object and the name of a visitor method and
// returns an array of SchemaVisitor instances that implement the visitor
// method and have an interest in handling the given VisitableSchemaType
// object. In the simplest case, this function can always return an array
// containing a single visitor object, without even looking at the type or
// methodName parameters. In other cases, this function might sometimes
// return an empty array to indicate there are no visitors that should be
// applied to the given VisitableSchemaType object. For an example of a
// visitor pattern that benefits from this abstraction, see the
// SchemaDirectiveVisitor class below.
visitorOrVisitorSelector) {
    var visitorSelector = typeof visitorOrVisitorSelector === 'function' ? visitorOrVisitorSelector : function () { return visitorOrVisitorSelector; };
    // Helper function that calls visitorSelector and applies the resulting
    // visitors to the given type, with arguments [type, ...args].
    function callMethod(methodName, type) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var visitors = visitorSelector(type, methodName);
        visitors = Array.isArray(visitors) ? visitors : [visitors];
        var finalType = type;
        visitors.every(function (visitorOrVisitorDef) {
            var newType;
            if (isSchemaVisitor(visitorOrVisitorDef)) {
                newType = visitorOrVisitorDef[methodName].apply(visitorOrVisitorDef, __spreadArray([finalType], __read(args)));
            }
            else if (isNamedType(finalType) &&
                (methodName === 'visitScalar' ||
                    methodName === 'visitEnum' ||
                    methodName === 'visitObject' ||
                    methodName === 'visitInputObject' ||
                    methodName === 'visitUnion' ||
                    methodName === 'visitInterface')) {
                var specifiers = getTypeSpecifiers$1(finalType, schema);
                var typeVisitor = getVisitor(visitorOrVisitorDef, specifiers);
                newType = typeVisitor != null ? typeVisitor(finalType, schema) : undefined;
            }
            if (typeof newType === 'undefined') {
                // Keep going without modifying type.
                return true;
            }
            if (methodName === 'visitSchema' || isSchema(finalType)) {
                throw new Error("Method " + methodName + " cannot replace schema with " + newType);
            }
            if (newType === null) {
                // Stop the loop and return null form callMethod, which will cause
                // the type to be removed from the schema.
                finalType = null;
                return false;
            }
            // Update type to the new type returned by the visitor method, so that
            // later directives will see the new type, and callMethod will return
            // the final type.
            finalType = newType;
            return true;
        });
        // If there were no directives for this type object, or if all visitor
        // methods returned nothing, type will be returned unmodified.
        return finalType;
    }
    // Recursive helper function that calls any appropriate visitor methods for
    // each object in the schema, then traverses the object's children (if any).
    function visit(type) {
        var e_1, _a;
        if (isSchema(type)) {
            // Unlike the other types, the root GraphQLSchema object cannot be
            // replaced by visitor methods, because that would make life very hard
            // for SchemaVisitor subclasses that rely on the original schema object.
            callMethod('visitSchema', type);
            var typeMap_1 = type.getTypeMap();
            Object.entries(typeMap_1).forEach(function (_a) {
                var _b = __read(_a, 2), typeName = _b[0], namedType = _b[1];
                if (!typeName.startsWith('__') && namedType != null) {
                    // Call visit recursively to let it determine which concrete
                    // subclass of GraphQLNamedType we found in the type map.
                    // We do not use updateEachKey because we want to preserve
                    // deleted types in the typeMap so that other types that reference
                    // the deleted types can be healed.
                    typeMap_1[typeName] = visit(namedType);
                }
            });
            return type;
        }
        if (isObjectType(type)) {
            // Note that callMethod('visitObject', type) may not actually call any
            // methods, if there are no @directive annotations associated with this
            // type, or if this SchemaDirectiveVisitor subclass does not override
            // the visitObject method.
            var newObject = callMethod('visitObject', type);
            if (newObject != null) {
                visitFields(newObject);
            }
            return newObject;
        }
        if (isInterfaceType(type)) {
            var newInterface = callMethod('visitInterface', type);
            if (newInterface != null) {
                visitFields(newInterface);
            }
            return newInterface;
        }
        if (isInputObjectType(type)) {
            var newInputObject = callMethod('visitInputObject', type);
            if (newInputObject != null) {
                var fieldMap = newInputObject.getFields();
                try {
                    for (var _b = __values(Object.keys(fieldMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        fieldMap[key] = callMethod('visitInputFieldDefinition', fieldMap[key], {
                            // Since we call a different method for input object fields, we
                            // can't reuse the visitFields function here.
                            objectType: newInputObject,
                        });
                        if (!fieldMap[key]) {
                            delete fieldMap[key];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return newInputObject;
        }
        if (isScalarType(type)) {
            return callMethod('visitScalar', type);
        }
        if (isUnionType(type)) {
            return callMethod('visitUnion', type);
        }
        if (isEnumType(type)) {
            var newEnum_1 = callMethod('visitEnum', type);
            if (newEnum_1 != null) {
                var newValues = newEnum_1
                    .getValues()
                    .map(function (value) {
                    return callMethod('visitEnumValue', value, {
                        enumType: newEnum_1,
                    });
                })
                    .filter(Boolean);
                // Recreate the enum type if any of the values changed
                var valuesUpdated = newValues.some(function (value, index) { return value !== newEnum_1.getValues()[index]; });
                if (valuesUpdated) {
                    newEnum_1 = new GraphQLEnumType(__assign(__assign({}, newEnum_1.toConfig()), { values: newValues.reduce(function (prev, value) {
                            var _a;
                            return (__assign(__assign({}, prev), (_a = {}, _a[value.name] = {
                                value: value.value,
                                deprecationReason: value.deprecationReason,
                                description: value.description,
                                astNode: value.astNode,
                            }, _a)));
                        }, {}) }));
                }
            }
            return newEnum_1;
        }
        throw new Error("Unexpected schema type: " + type);
    }
    function visitFields(type) {
        var e_2, _a;
        var fieldMap = type.getFields();
        var _loop_1 = function (key, field) {
            // It would be nice if we could call visit(field) recursively here, but
            // GraphQLField is merely a type, not a value that can be detected using
            // an instanceof check, so we have to visit the fields in this lexical
            // context, so that TypeScript can validate the call to
            // visitFieldDefinition.
            var newField = callMethod('visitFieldDefinition', field, {
                // While any field visitor needs a reference to the field object, some
                // field visitors may also need to know the enclosing (parent) type,
                // perhaps to determine if the parent is a GraphQLObjectType or a
                // GraphQLInterfaceType. To obtain a reference to the parent, a
                // visitor method can have a second parameter, which will be an object
                // with an .objectType property referring to the parent.
                objectType: type,
            });
            if ((newField === null || newField === void 0 ? void 0 : newField.args) != null) {
                newField.args = newField.args
                    .map(function (arg) {
                    return callMethod('visitArgumentDefinition', arg, {
                        // Like visitFieldDefinition, visitArgumentDefinition takes a
                        // second parameter that provides additional context, namely the
                        // parent .field and grandparent .objectType. Remember that the
                        // current GraphQLSchema is always available via this.schema.
                        field: newField,
                        objectType: type,
                    });
                })
                    .filter(Boolean);
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (newField) {
                fieldMap[key] = newField;
            }
            else {
                delete fieldMap[key];
            }
        };
        try {
            for (var _b = __values(Object.entries(fieldMap)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], field = _d[1];
                _loop_1(key, field);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    visit(schema);
    // Automatically update any references to named schema types replaced
    // during the traversal, so implementers don't have to worry about that.
    healSchema(schema);
    // Return schema for convenience, even though schema parameter has all updated types.
    return schema;
}
function getTypeSpecifiers$1(type, schema) {
    var specifiers = [VisitSchemaKind.TYPE];
    if (isObjectType(type)) {
        specifiers.push(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.OBJECT_TYPE);
        var query = schema.getQueryType();
        var mutation = schema.getMutationType();
        var subscription = schema.getSubscriptionType();
        if (type === query) {
            specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.QUERY);
        }
        else if (type === mutation) {
            specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.MUTATION);
        }
        else if (type === subscription) {
            specifiers.push(VisitSchemaKind.ROOT_OBJECT, VisitSchemaKind.SUBSCRIPTION);
        }
    }
    else if (isInputType(type)) {
        specifiers.push(VisitSchemaKind.INPUT_OBJECT_TYPE);
    }
    else if (isInterfaceType(type)) {
        specifiers.push(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.ABSTRACT_TYPE, VisitSchemaKind.INTERFACE_TYPE);
    }
    else if (isUnionType(type)) {
        specifiers.push(VisitSchemaKind.COMPOSITE_TYPE, VisitSchemaKind.ABSTRACT_TYPE, VisitSchemaKind.UNION_TYPE);
    }
    else if (isEnumType(type)) {
        specifiers.push(VisitSchemaKind.ENUM_TYPE);
    }
    else if (isScalarType(type)) {
        specifiers.push(VisitSchemaKind.SCALAR_TYPE);
    }
    return specifiers;
}
function getVisitor(visitorDef, specifiers) {
    var typeVisitor;
    var stack = __spreadArray([], __read(specifiers));
    while (!typeVisitor && stack.length > 0) {
        var next = stack.pop();
        typeVisitor = visitorDef[next];
    }
    return typeVisitor != null ? typeVisitor : null;
}

// This class represents a reusable implementation of a @directive that may
// appear in a GraphQL schema written in Schema Definition Language.
//
// By overriding one or more visit{Object,Union,...} methods, a subclass
// registers interest in certain schema types, such as GraphQLObjectType,
// GraphQLUnionType, etc. When SchemaDirectiveVisitor.visitSchemaDirectives is
// called with a GraphQLSchema object and a map of visitor subclasses, the
// overridden methods of those subclasses allow the visitors to obtain
// references to any type objects that have @directives attached to them,
// enabling visitors to inspect or modify the schema as appropriate.
//
// For example, if a directive called @rest(url: "...") appears after a field
// definition, a SchemaDirectiveVisitor subclass could provide meaning to that
// directive by overriding the visitFieldDefinition method (which receives a
// GraphQLField parameter), and then the body of that visitor method could
// manipulate the field's resolver function to fetch data from a REST endpoint
// described by the url argument passed to the @rest directive:
//
//   const typeDefs = `
//   type Query {
//     people: [Person] @rest(url: "/api/v1/people")
//   }`;
//
//   const schema = makeExecutableSchema({ typeDefs });
//
//   SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
//     rest: class extends SchemaDirectiveVisitor {
//       public visitFieldDefinition(field: GraphQLField<any, any>) {
//         const { url } = this.args;
//         field.resolve = () => fetch(url);
//       }
//     }
//   });
//
// The subclass in this example is defined as an anonymous class expression,
// for brevity. A truly reusable SchemaDirectiveVisitor would most likely be
// defined in a library using a named class declaration, and then exported for
// consumption by other modules and packages.
//
// See below for a complete list of overridable visitor methods, their
// parameter types, and more details about the properties exposed by instances
// of the SchemaDirectiveVisitor class.
var SchemaDirectiveVisitor = /** @class */ (function (_super) {
    __extends(SchemaDirectiveVisitor, _super);
    // Mark the constructor protected to enforce passing SchemaDirectiveVisitor
    // subclasses (not instances) to visitSchemaDirectives.
    function SchemaDirectiveVisitor(config) {
        var _this = _super.call(this) || this;
        _this.name = config.name;
        _this.args = config.args;
        _this.visitedType = config.visitedType;
        _this.schema = config.schema;
        _this.context = config.context;
        return _this;
    }
    // Override this method to return a custom GraphQLDirective (or modify one
    // already present in the schema) to enforce argument types, provide default
    // argument values, or specify schema locations where this @directive may
    // appear. By default, any declaration found in the schema will be returned.
    SchemaDirectiveVisitor.getDirectiveDeclaration = function (directiveName, schema) {
        return schema.getDirective(directiveName);
    };
    // Call SchemaDirectiveVisitor.visitSchemaDirectives to visit every
    // @directive in the schema and create an appropriate SchemaDirectiveVisitor
    // instance to visit the object decorated by the @directive.
    SchemaDirectiveVisitor.visitSchemaDirectives = function (schema, 
    // The keys of this object correspond to directive names as they appear
    // in the schema, and the values should be subclasses (not instances!)
    // of the SchemaDirectiveVisitor class. This distinction is important
    // because a new SchemaDirectiveVisitor instance will be created each
    // time a matching directive is found in the schema AST, with arguments
    // and other metadata specific to that occurrence. To help prevent the
    // mistake of passing instances, the SchemaDirectiveVisitor constructor
    // method is marked as protected.
    directiveVisitors, 
    // Optional context object that will be available to all visitor instances
    // via this.context. Defaults to an empty null-prototype object.
    context, 
    // The visitSchemaDirectives method returns a map from directive names to
    // lists of SchemaDirectiveVisitors created while visiting the schema.
    pathToDirectivesInExtensions) {
        if (context === void 0) { context = Object.create(null); }
        if (pathToDirectivesInExtensions === void 0) { pathToDirectivesInExtensions = ['directives']; }
        // If the schema declares any directives for public consumption, record
        // them here so that we can properly coerce arguments when/if we encounter
        // an occurrence of the directive while walking the schema below.
        var declaredDirectives = this.getDeclaredDirectives(schema, directiveVisitors);
        // Map from directive names to lists of SchemaDirectiveVisitor instances
        // created while visiting the schema.
        var createdVisitors = Object.keys(directiveVisitors).reduce(function (prev, item) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[item] = [], _a)));
        }, {});
        var directiveVisitorMap = Object.entries(directiveVisitors).reduce(function (prev, _a) {
            var _b;
            var _c = __read(_a, 2), key = _c[0], value = _c[1];
            return (__assign(__assign({}, prev), (_b = {}, _b[key] = value, _b)));
        }, {});
        function visitorSelector(type, methodName) {
            var _a, _b;
            var directivesInExtensions = pathToDirectivesInExtensions.reduce(function (acc, pathSegment) { return (acc == null ? acc : acc[pathSegment]); }, type === null || type === void 0 ? void 0 : type.extensions);
            var directives = Object.create(null);
            if (directivesInExtensions != null) {
                Object.entries(directivesInExtensions).forEach(function (_a) {
                    var _b = __read(_a, 2), directiveName = _b[0], directiveValue = _b[1];
                    if (!directives[directiveName]) {
                        directives[directiveName] = [directiveValue];
                    }
                    else {
                        directives[directiveName].push([directiveValue]);
                    }
                });
            }
            else {
                var directiveNodes_1 = (_b = (_a = type === null || type === void 0 ? void 0 : type.astNode) === null || _a === void 0 ? void 0 : _a.directives) !== null && _b !== void 0 ? _b : [];
                var extensionASTNodes = type.extensionASTNodes;
                if (extensionASTNodes != null) {
                    extensionASTNodes.forEach(function (extensionASTNode) {
                        if (extensionASTNode.directives != null) {
                            directiveNodes_1 = directiveNodes_1.concat(extensionASTNode.directives);
                        }
                    });
                }
                directiveNodes_1.forEach(function (directiveNode) {
                    var directiveName = directiveNode.name.value;
                    var decl = declaredDirectives[directiveName];
                    var args;
                    if (decl != null) {
                        // If this directive was explicitly declared, use the declared
                        // argument types (and any default values) to check, coerce, and/or
                        // supply default values for the given arguments.
                        args = getArgumentValues(decl, directiveNode);
                    }
                    else {
                        // If this directive was not explicitly declared, just convert the
                        // argument nodes to their corresponding JavaScript values.
                        args = Object.create(null);
                        if (directiveNode.arguments != null) {
                            directiveNode.arguments.forEach(function (arg) {
                                args[arg.name.value] = valueFromASTUntyped(arg.value);
                            });
                        }
                    }
                    if (!directives[directiveName]) {
                        directives[directiveName] = [args];
                    }
                    else {
                        directives[directiveName].push(args);
                    }
                });
            }
            var visitors = [];
            Object.entries(directives).forEach(function (_a) {
                var _b = __read(_a, 2), directiveName = _b[0], directiveValues = _b[1];
                if (!(directiveName in directiveVisitorMap)) {
                    return;
                }
                var VisitorClass = directiveVisitorMap[directiveName];
                // Avoid creating visitor objects if visitorClass does not override
                // the visitor method named by methodName.
                if (!VisitorClass.implementsVisitorMethod(methodName)) {
                    return;
                }
                directiveValues.forEach(function (directiveValue) {
                    // As foretold in comments near the top of the visitSchemaDirectives
                    // method, this is where instances of the SchemaDirectiveVisitor class
                    // get created and assigned names. While subclasses could override the
                    // constructor method, the constructor is marked as protected, so
                    // these are the only arguments that will ever be passed.
                    visitors.push(new VisitorClass({
                        name: directiveName,
                        args: directiveValue,
                        visitedType: type,
                        schema: schema,
                        context: context,
                    }));
                });
            });
            if (visitors.length > 0) {
                visitors.forEach(function (visitor) {
                    createdVisitors[visitor.name].push(visitor);
                });
            }
            return visitors;
        }
        visitSchema(schema, visitorSelector);
        return createdVisitors;
    };
    SchemaDirectiveVisitor.getDeclaredDirectives = function (schema, directiveVisitors) {
        var declaredDirectives = schema.getDirectives().reduce(function (prev, curr) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[curr.name] = curr, _a)));
        }, {});
        // If the visitor subclass overrides getDirectiveDeclaration, and it
        // returns a non-null GraphQLDirective, use that instead of any directive
        // declared in the schema itself. Reasoning: if a SchemaDirectiveVisitor
        // goes to the trouble of implementing getDirectiveDeclaration, it should
        // be able to rely on that implementation.
        Object.entries(directiveVisitors).forEach(function (_a) {
            var _b = __read(_a, 2), directiveName = _b[0], visitorClass = _b[1];
            var decl = visitorClass.getDirectiveDeclaration(directiveName, schema);
            if (decl != null) {
                declaredDirectives[directiveName] = decl;
            }
        });
        Object.entries(declaredDirectives).forEach(function (_a) {
            var _b = __read(_a, 2), name = _b[0], decl = _b[1];
            if (!(name in directiveVisitors)) {
                // SchemaDirectiveVisitors.visitSchemaDirectives might be called
                // multiple times with partial directiveVisitors maps, so it's not
                // necessarily an error for directiveVisitors to be missing an
                // implementation of a directive that was declared in the schema.
                return;
            }
            var visitorClass = directiveVisitors[name];
            decl.locations.forEach(function (loc) {
                var visitorMethodName = directiveLocationToVisitorMethodName(loc);
                if (SchemaVisitor.implementsVisitorMethod(visitorMethodName) &&
                    !visitorClass.implementsVisitorMethod(visitorMethodName)) {
                    // While visitor subclasses may implement extra visitor methods,
                    // it's definitely a mistake if the GraphQLDirective declares itself
                    // applicable to certain schema locations, and the visitor subclass
                    // does not implement all the corresponding methods.
                    throw new Error("SchemaDirectiveVisitor for @" + name + " must implement " + visitorMethodName + " method");
                }
            });
        });
        return declaredDirectives;
    };
    return SchemaDirectiveVisitor;
}(SchemaVisitor));
// Convert a string like "FIELD_DEFINITION" to "visitFieldDefinition".
function directiveLocationToVisitorMethodName(loc) {
    return ('visit' +
        loc.replace(/([^_]*)_?/g, function (_wholeMatch, part) { return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(); }));
}

function getResolversFromSchema(schema) {
    var resolvers = Object.create({});
    var typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(function (typeName) {
        if (!typeName.startsWith('__')) {
            var type = typeMap[typeName];
            if (isScalarType(type)) {
                if (!isSpecifiedScalarType(type)) {
                    var config = type.toConfig();
                    delete config.astNode; // avoid AST duplication elsewhere
                    resolvers[typeName] = new GraphQLScalarType(config);
                }
            }
            else if (isEnumType(type)) {
                resolvers[typeName] = {};
                var values = type.getValues();
                values.forEach(function (value) {
                    resolvers[typeName][value.name] = value.value;
                });
            }
            else if (isInterfaceType(type)) {
                if (type.resolveType != null) {
                    resolvers[typeName] = {
                        __resolveType: type.resolveType,
                    };
                }
            }
            else if (isUnionType(type)) {
                if (type.resolveType != null) {
                    resolvers[typeName] = {
                        __resolveType: type.resolveType,
                    };
                }
            }
            else if (isObjectType(type)) {
                resolvers[typeName] = {};
                if (type.isTypeOf != null) {
                    resolvers[typeName].__isTypeOf = type.isTypeOf;
                }
                var fields_1 = type.getFields();
                Object.keys(fields_1).forEach(function (fieldName) {
                    var _a, _b;
                    var field = fields_1[fieldName];
                    if (field.subscribe != null) {
                        resolvers[typeName][fieldName] = resolvers[typeName][fieldName] || {};
                        resolvers[typeName][fieldName].subscribe = field.subscribe;
                    }
                    if (field.resolve != null && ((_a = field.resolve) === null || _a === void 0 ? void 0 : _a.name) !== 'defaultFieldResolver' && ((_b = field.resolve) === null || _b === void 0 ? void 0 : _b.name) !== 'defaultMergedResolver') {
                        resolvers[typeName][fieldName] = resolvers[typeName][fieldName] || {};
                        resolvers[typeName][fieldName].resolve = field.resolve;
                    }
                });
            }
        }
    });
    return resolvers;
}

function forEachField(schema, fn) {
    var typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(function (typeName) {
        var type = typeMap[typeName];
        // TODO: maybe have an option to include these?
        if (!getNamedType(type).name.startsWith('__') && isObjectType(type)) {
            var fields_1 = type.getFields();
            Object.keys(fields_1).forEach(function (fieldName) {
                var field = fields_1[fieldName];
                fn(field, typeName, fieldName);
            });
        }
    });
}

function forEachDefaultValue(schema, fn) {
    var typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(function (typeName) {
        var type = typeMap[typeName];
        if (!getNamedType(type).name.startsWith('__')) {
            if (isObjectType(type)) {
                var fields_1 = type.getFields();
                Object.keys(fields_1).forEach(function (fieldName) {
                    var field = fields_1[fieldName];
                    field.args.forEach(function (arg) {
                        arg.defaultValue = fn(arg.type, arg.defaultValue);
                    });
                });
            }
            else if (isInputObjectType(type)) {
                var fields_2 = type.getFields();
                Object.keys(fields_2).forEach(function (fieldName) {
                    var field = fields_2[fieldName];
                    field.defaultValue = fn(field.type, field.defaultValue);
                });
            }
        }
    });
}

// addTypes uses toConfig to create a new schema with a new or replaced
function addTypes(schema, newTypesOrDirectives) {
    var queryType = schema.getQueryType();
    var mutationType = schema.getMutationType();
    var subscriptionType = schema.getSubscriptionType();
    var queryTypeName = queryType != null ? queryType.name : undefined;
    var mutationTypeName = mutationType != null ? mutationType.name : undefined;
    var subscriptionTypeName = subscriptionType != null ? subscriptionType.name : undefined;
    var config = schema.toConfig();
    var originalTypeMap = {};
    config.types.forEach(function (type) {
        originalTypeMap[type.name] = type;
    });
    var originalDirectiveMap = {};
    config.directives.forEach(function (directive) {
        originalDirectiveMap[directive.name] = directive;
    });
    newTypesOrDirectives.forEach(function (newTypeOrDirective) {
        if (isNamedType(newTypeOrDirective)) {
            originalTypeMap[newTypeOrDirective.name] = newTypeOrDirective;
        }
        else if (isDirective(newTypeOrDirective)) {
            originalDirectiveMap[newTypeOrDirective.name] = newTypeOrDirective;
        }
    });
    var _a = rewireTypes(originalTypeMap, Object.keys(originalDirectiveMap).map(function (directiveName) { return originalDirectiveMap[directiveName]; })), typeMap = _a.typeMap, directives = _a.directives;
    return new GraphQLSchema(__assign(__assign({}, config), { query: queryTypeName ? typeMap[queryTypeName] : undefined, mutation: mutationTypeName ? typeMap[mutationTypeName] : undefined, subscription: subscriptionTypeName != null ? typeMap[subscriptionTypeName] : undefined, types: Object.keys(typeMap).map(function (typeName) { return typeMap[typeName]; }), directives: directives }));
}

/**
 * Prunes the provided schema, removing unused and empty types
 * @param schema The schema to prune
 * @param options Additional options for removing unused types from the schema
 */
function pruneSchema(schema, options) {
    var _a;
    if (options === void 0) { options = {}; }
    var pruningContext = {
        schema: schema,
        unusedTypes: Object.create(null),
        implementations: Object.create(null),
    };
    Object.keys(schema.getTypeMap()).forEach(function (typeName) {
        var type = schema.getType(typeName);
        if ('getInterfaces' in type) {
            type.getInterfaces().forEach(function (iface) {
                var implementations = getImplementations(pruningContext, iface);
                if (implementations == null) {
                    pruningContext.implementations[iface.name] = Object.create(null);
                }
                pruningContext.implementations[iface.name][type.name] = true;
            });
        }
    });
    visitTypes(pruningContext, schema);
    return mapSchema(schema, (_a = {},
        _a[MapperKind.TYPE] = function (type) {
            // If we should NOT prune the type, return it immediately as unmodified
            if (options.skipPruning && options.skipPruning(type)) {
                return type;
            }
            if (isObjectType(type) || isInputObjectType(type)) {
                if ((!Object.keys(type.getFields()).length && !options.skipEmptyCompositeTypePruning) ||
                    (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning)) {
                    return null;
                }
            }
            else if (isUnionType(type)) {
                if ((!type.getTypes().length && !options.skipEmptyUnionPruning) ||
                    (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning)) {
                    return null;
                }
            }
            else if (isInterfaceType(type)) {
                var implementations = getImplementations(pruningContext, type);
                if ((!Object.keys(type.getFields()).length && !options.skipEmptyCompositeTypePruning) ||
                    (implementations && !Object.keys(implementations).length && !options.skipUnimplementedInterfacesPruning) ||
                    (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning)) {
                    return null;
                }
            }
            else {
                if (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning) {
                    return null;
                }
            }
        },
        _a));
}
function visitOutputType(visitedTypes, pruningContext, type) {
    if (visitedTypes[type.name]) {
        return;
    }
    visitedTypes[type.name] = true;
    pruningContext.unusedTypes[type.name] = false;
    if (isObjectType(type) || isInterfaceType(type)) {
        var fields_1 = type.getFields();
        Object.keys(fields_1).forEach(function (fieldName) {
            var field = fields_1[fieldName];
            var namedType = getNamedType(field.type);
            visitOutputType(visitedTypes, pruningContext, namedType);
            var args = field.args;
            args.forEach(function (arg) {
                var type = getNamedType(arg.type);
                visitInputType(visitedTypes, pruningContext, type);
            });
        });
        if (isInterfaceType(type)) {
            var implementations = getImplementations(pruningContext, type);
            if (implementations) {
                Object.keys(implementations).forEach(function (typeName) {
                    visitOutputType(visitedTypes, pruningContext, pruningContext.schema.getType(typeName));
                });
            }
        }
        if ('getInterfaces' in type) {
            type.getInterfaces().forEach(function (type) {
                visitOutputType(visitedTypes, pruningContext, type);
            });
        }
    }
    else if (isUnionType(type)) {
        var types = type.getTypes();
        types.forEach(function (type) { return visitOutputType(visitedTypes, pruningContext, type); });
    }
}
/**
 * Get the implementations of an interface. May return undefined.
 */
function getImplementations(pruningContext, type) {
    return pruningContext.implementations[type.name];
}
function visitInputType(visitedTypes, pruningContext, type) {
    if (visitedTypes[type.name]) {
        return;
    }
    pruningContext.unusedTypes[type.name] = false;
    visitedTypes[type.name] = true;
    if (isInputObjectType(type)) {
        var fields_2 = type.getFields();
        Object.keys(fields_2).forEach(function (fieldName) {
            var field = fields_2[fieldName];
            var namedType = getNamedType(field.type);
            visitInputType(visitedTypes, pruningContext, namedType);
        });
    }
}
function visitTypes(pruningContext, schema) {
    Object.keys(schema.getTypeMap()).forEach(function (typeName) {
        if (!typeName.startsWith('__')) {
            pruningContext.unusedTypes[typeName] = true;
        }
    });
    var visitedTypes = Object.create(null);
    var rootTypes = [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()].filter(function (type) { return type != null; });
    rootTypes.forEach(function (rootType) { return visitOutputType(visitedTypes, pruningContext, rootType); });
    schema.getDirectives().forEach(function (directive) {
        directive.args.forEach(function (arg) {
            var type = getNamedType(arg.type);
            visitInputType(visitedTypes, pruningContext, type);
        });
    });
}

function mergeDeep(target) {
    var e_1, _a, _b, _c;
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    if (isScalarType(target)) {
        return target;
    }
    var output = __assign({}, target);
    try {
        for (var sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
            var source = sources_1_1.value;
            if (isObject(target) && isObject(source)) {
                for (var key in source) {
                    if (isObject(source[key])) {
                        if (!(key in target)) {
                            Object.assign(output, (_b = {}, _b[key] = source[key], _b));
                        }
                        else {
                            output[key] = mergeDeep(target[key], source[key]);
                        }
                    }
                    else {
                        Object.assign(output, (_c = {}, _c[key] = source[key], _c));
                    }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return output;
}
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function parseSelectionSet(selectionSet, options) {
    var query = parse(selectionSet, options).definitions[0];
    return query.selectionSet;
}

/**
 * Get the key under which the result of this resolver will be placed in the response JSON. Basically, just
 * resolves aliases.
 * @param info The info argument to the resolver.
 */
function getResponseKeyFromInfo(info) {
    return info.fieldNodes[0].alias != null ? info.fieldNodes[0].alias.value : info.fieldName;
}

function appendObjectFields(schema, typeName, additionalFields) {
    var _a;
    if (schema.getType(typeName) == null) {
        return addTypes(schema, [
            new GraphQLObjectType({
                name: typeName,
                fields: additionalFields,
            }),
        ]);
    }
    return mapSchema(schema, (_a = {},
        _a[MapperKind.OBJECT_TYPE] = function (type) {
            if (type.name === typeName) {
                var config = type.toConfig();
                var originalFieldConfigMap_1 = config.fields;
                var newFieldConfigMap_1 = {};
                Object.keys(originalFieldConfigMap_1).forEach(function (fieldName) {
                    newFieldConfigMap_1[fieldName] = originalFieldConfigMap_1[fieldName];
                });
                Object.keys(additionalFields).forEach(function (fieldName) {
                    newFieldConfigMap_1[fieldName] = additionalFields[fieldName];
                });
                return correctASTNodes(new GraphQLObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_1 })));
            }
        },
        _a));
}
function removeObjectFields(schema, typeName, testFn) {
    var _a;
    var removedFields = {};
    var newSchema = mapSchema(schema, (_a = {},
        _a[MapperKind.OBJECT_TYPE] = function (type) {
            if (type.name === typeName) {
                var config = type.toConfig();
                var originalFieldConfigMap_2 = config.fields;
                var newFieldConfigMap_2 = {};
                Object.keys(originalFieldConfigMap_2).forEach(function (fieldName) {
                    var originalFieldConfig = originalFieldConfigMap_2[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        removedFields[fieldName] = originalFieldConfig;
                    }
                    else {
                        newFieldConfigMap_2[fieldName] = originalFieldConfig;
                    }
                });
                return correctASTNodes(new GraphQLObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_2 })));
            }
        },
        _a));
    return [newSchema, removedFields];
}
function selectObjectFields(schema, typeName, testFn) {
    var _a;
    var selectedFields = {};
    mapSchema(schema, (_a = {},
        _a[MapperKind.OBJECT_TYPE] = function (type) {
            if (type.name === typeName) {
                var config = type.toConfig();
                var originalFieldConfigMap_3 = config.fields;
                Object.keys(originalFieldConfigMap_3).forEach(function (fieldName) {
                    var originalFieldConfig = originalFieldConfigMap_3[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        selectedFields[fieldName] = originalFieldConfig;
                    }
                });
            }
            return undefined;
        },
        _a));
    return selectedFields;
}
function modifyObjectFields(schema, typeName, testFn, newFields) {
    var _a;
    var removedFields = {};
    var newSchema = mapSchema(schema, (_a = {},
        _a[MapperKind.OBJECT_TYPE] = function (type) {
            if (type.name === typeName) {
                var config = type.toConfig();
                var originalFieldConfigMap_4 = config.fields;
                var newFieldConfigMap_3 = {};
                Object.keys(originalFieldConfigMap_4).forEach(function (fieldName) {
                    var originalFieldConfig = originalFieldConfigMap_4[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        removedFields[fieldName] = originalFieldConfig;
                    }
                    else {
                        newFieldConfigMap_3[fieldName] = originalFieldConfig;
                    }
                });
                Object.keys(newFields).forEach(function (fieldName) {
                    var fieldConfig = newFields[fieldName];
                    newFieldConfigMap_3[fieldName] = fieldConfig;
                });
                return correctASTNodes(new GraphQLObjectType(__assign(__assign({}, config), { fields: newFieldConfigMap_3 })));
            }
        },
        _a));
    return [newSchema, removedFields];
}

function renameType(type, newTypeName) {
    if (isObjectType(type)) {
        return new GraphQLObjectType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    else if (isInterfaceType(type)) {
        return new GraphQLInterfaceType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    else if (isUnionType(type)) {
        return new GraphQLUnionType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    else if (isInputObjectType(type)) {
        return new GraphQLInputObjectType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    else if (isEnumType(type)) {
        return new GraphQLEnumType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    else if (isScalarType(type)) {
        return new GraphQLScalarType(__assign(__assign({}, type.toConfig()), { name: newTypeName, astNode: type.astNode == null
                ? type.astNode
                : __assign(__assign({}, type.astNode), { name: __assign(__assign({}, type.astNode.name), { value: newTypeName }) }), extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(function (node) { return (__assign(__assign({}, node), { name: __assign(__assign({}, node.name), { value: newTypeName }) })); }) }));
    }
    throw new Error("Unknown type " + type + ".");
}

/**
 * Given a selectionSet, adds all of the fields in that selection to
 * the passed in map of fields, and returns it at the end.
 *
 * CollectFields requires the "runtime type" of an object. For a field which
 * returns an Interface or Union type, the "runtime type" will be the actual
 * Object type returned by that field.
 *
 * @internal
 */
function collectFields(exeContext, runtimeType, selectionSet, fields, visitedFragmentNames) {
    var e_1, _a;
    try {
        for (var _b = __values(selectionSet.selections), _c = _b.next(); !_c.done; _c = _b.next()) {
            var selection = _c.value;
            switch (selection.kind) {
                case Kind.FIELD: {
                    if (!shouldIncludeNode(exeContext, selection)) {
                        continue;
                    }
                    var name_1 = getFieldEntryKey(selection);
                    if (!(name_1 in fields)) {
                        fields[name_1] = [];
                    }
                    fields[name_1].push(selection);
                    break;
                }
                case Kind.INLINE_FRAGMENT: {
                    if (!shouldIncludeNode(exeContext, selection) ||
                        !doesFragmentConditionMatch(exeContext, selection, runtimeType)) {
                        continue;
                    }
                    collectFields(exeContext, runtimeType, selection.selectionSet, fields, visitedFragmentNames);
                    break;
                }
                case Kind.FRAGMENT_SPREAD: {
                    var fragName = selection.name.value;
                    if (visitedFragmentNames[fragName] || !shouldIncludeNode(exeContext, selection)) {
                        continue;
                    }
                    visitedFragmentNames[fragName] = true;
                    var fragment = exeContext.fragments[fragName];
                    if (!fragment || !doesFragmentConditionMatch(exeContext, fragment, runtimeType)) {
                        continue;
                    }
                    collectFields(exeContext, runtimeType, fragment.selectionSet, fields, visitedFragmentNames);
                    break;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return fields;
}
/**
 * Determines if a field should be included based on the @include and @skip
 * directives, where @skip has higher precedence than @include.
 */
function shouldIncludeNode(exeContext, node) {
    var skip = getDirectiveValues(GraphQLSkipDirective, node, exeContext.variableValues);
    if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
        return false;
    }
    var include = getDirectiveValues(GraphQLIncludeDirective, node, exeContext.variableValues);
    if ((include === null || include === void 0 ? void 0 : include.if) === false) {
        return false;
    }
    return true;
}
/**
 * Determines if a fragment is applicable to the given type.
 */
function doesFragmentConditionMatch(exeContext, fragment, type) {
    var typeConditionNode = fragment.typeCondition;
    if (!typeConditionNode) {
        return true;
    }
    var conditionalType = typeFromAST(exeContext.schema, typeConditionNode);
    if (conditionalType === type) {
        return true;
    }
    if (isAbstractType(conditionalType)) {
        return exeContext.schema.isPossibleType(conditionalType, type);
    }
    return false;
}
/**
 * Implements the logic to compute the key of a given field's entry
 */
function getFieldEntryKey(node) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return node.alias ? node.alias.value : node.name.value;
}

/**
 * Given an AsyncIterable and a callback function, return an AsyncIterator
 * which produces values mapped via calling the callback function.
 */
function mapAsyncIterator(iterator, callback, rejectCallback) {
    var _a;
    var $return;
    var abruptClose;
    if (typeof iterator.return === 'function') {
        $return = iterator.return;
        abruptClose = function (error) {
            var rethrow = function () { return Promise.reject(error); };
            return $return.call(iterator).then(rethrow, rethrow);
        };
    }
    function mapResult(result) {
        return result.done ? result : asyncMapValue(result.value, callback).then(iteratorResult, abruptClose);
    }
    var mapReject;
    if (rejectCallback) {
        // Capture rejectCallback to ensure it cannot be null.
        var reject_1 = rejectCallback;
        mapReject = function (error) { return asyncMapValue(error, reject_1).then(iteratorResult, abruptClose); };
    }
    return _a = {
            next: function () {
                return iterator.next().then(mapResult, mapReject);
            },
            return: function () {
                return $return
                    ? $return.call(iterator).then(mapResult, mapReject)
                    : Promise.resolve({ value: undefined, done: true });
            },
            throw: function (error) {
                if (typeof iterator.throw === 'function') {
                    return iterator.throw(error).then(mapResult, mapReject);
                }
                return Promise.reject(error).catch(abruptClose);
            }
        },
        _a[Symbol.asyncIterator] = function () {
            return this;
        },
        _a;
}
function asyncMapValue(value, callback) {
    return new Promise(function (resolve) { return resolve(callback(value)); });
}
function iteratorResult(value) {
    return { value: value, done: false };
}

function updateArgument(argName, argType, argumentNodes, variableDefinitionsMap, variableValues, newArg) {
    var varName;
    var numGeneratedVariables = 0;
    do {
        varName = "_v" + (numGeneratedVariables++).toString() + "_" + argName;
    } while (varName in variableDefinitionsMap);
    argumentNodes[argName] = {
        kind: Kind.ARGUMENT,
        name: {
            kind: Kind.NAME,
            value: argName,
        },
        value: {
            kind: Kind.VARIABLE,
            name: {
                kind: Kind.NAME,
                value: varName,
            },
        },
    };
    variableDefinitionsMap[varName] = {
        kind: Kind.VARIABLE_DEFINITION,
        variable: {
            kind: Kind.VARIABLE,
            name: {
                kind: Kind.NAME,
                value: varName,
            },
        },
        type: astFromType(argType),
    };
    if (newArg === undefined) {
        delete variableValues[varName];
    }
    else {
        variableValues[varName] = newArg;
    }
}

function implementsAbstractType(schema, typeA, typeB) {
    if (typeA === typeB) {
        return true;
    }
    else if (isCompositeType(typeA) && isCompositeType(typeB)) {
        return doTypesOverlap(schema, typeA, typeB);
    }
    return false;
}

function relocatedError(originalError, path) {
    return new GraphQLError(originalError.message, originalError.nodes, originalError.source, originalError.positions, path === null ? undefined : path === undefined ? originalError.path : path, originalError.originalError, originalError.extensions);
}

function inputFieldToFieldConfig(field) {
    return {
        description: field.description,
        type: field.type,
        defaultValue: field.defaultValue,
        extensions: field.extensions,
        astNode: field.astNode,
    };
}
function fieldToFieldConfig(field) {
    return {
        description: field.description,
        type: field.type,
        args: argsToFieldConfigArgumentMap(field.args),
        resolve: field.resolve,
        subscribe: field.subscribe,
        deprecationReason: field.deprecationReason,
        extensions: field.extensions,
        astNode: field.astNode,
    };
}
function argsToFieldConfigArgumentMap(args) {
    var newArguments = {};
    args.forEach(function (arg) {
        newArguments[arg.name] = argumentToArgumentConfig(arg);
    });
    return newArguments;
}
function argumentToArgumentConfig(arg) {
    return {
        description: arg.description,
        type: arg.type,
        defaultValue: arg.defaultValue,
        extensions: arg.extensions,
        astNode: arg.astNode,
    };
}

function observableToAsyncIterable(observable) {
    var _a;
    var pullQueue = [];
    var pushQueue = [];
    var listening = true;
    var pushValue = function (value) {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ value: value, done: false });
        }
        else {
            pushQueue.push({ value: value, done: false });
        }
    };
    var pushError = function (error) {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ value: { errors: [error] }, done: false });
        }
        else {
            pushQueue.push({ value: { errors: [error] }, done: false });
        }
    };
    var pushDone = function () {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ done: true });
        }
        else {
            pushQueue.push({ done: true });
        }
    };
    var pullValue = function () {
        return new Promise(function (resolve) {
            if (pushQueue.length !== 0) {
                var element = pushQueue.shift();
                // either {value: {errors: [...]}} or {value: ...}
                resolve(element);
            }
            else {
                pullQueue.push(resolve);
            }
        });
    };
    var subscription = observable.subscribe({
        next: function (value) {
            pushValue(value);
        },
        error: function (err) {
            pushError(err);
        },
        complete: function () {
            pushDone();
        },
    });
    var emptyQueue = function () {
        if (listening) {
            listening = false;
            subscription.unsubscribe();
            pullQueue.forEach(function (resolve) { return resolve({ value: undefined, done: true }); });
            pullQueue.length = 0;
            pushQueue.length = 0;
        }
    };
    return _a = {
            next: function () {
                return listening ? pullValue() : this.return();
            },
            return: function () {
                emptyQueue();
                return Promise.resolve({ value: undefined, done: true });
            },
            throw: function (error) {
                emptyQueue();
                return Promise.reject(error);
            }
        },
        _a[Symbol.asyncIterator] = function () {
            return this;
        },
        _a;
}

function visitData(data, enter, leave) {
    if (Array.isArray(data)) {
        return data.map(function (value) { return visitData(value, enter, leave); });
    }
    else if (typeof data === 'object') {
        var newData_1 = enter != null ? enter(data) : data;
        if (newData_1 != null) {
            Object.keys(newData_1).forEach(function (key) {
                var value = newData_1[key];
                newData_1[key] = visitData(value, enter, leave);
            });
        }
        return leave != null ? leave(newData_1) : newData_1;
    }
    return data;
}
function visitErrors(errors, visitor) {
    return errors.map(function (error) { return visitor(error); });
}
function visitResult(result, request, schema, resultVisitorMap, errorVisitorMap) {
    var partialExecutionContext = {
        schema: schema,
        fragments: request.document.definitions.reduce(function (acc, def) {
            if (def.kind === Kind.FRAGMENT_DEFINITION) {
                acc[def.name.value] = def;
            }
            return acc;
        }, {}),
        variableValues: request.variables,
    };
    var errorInfo = {
        segmentInfoMap: new Map(),
        unpathedErrors: new Set(),
    };
    var data = result.data;
    var errors = result.errors;
    var visitingErrors = errors != null && errorVisitorMap != null;
    if (data != null) {
        result.data = visitRoot(data, getOperationAST(request.document, undefined), partialExecutionContext, resultVisitorMap, visitingErrors ? errors : undefined, errorInfo);
    }
    if (visitingErrors) {
        result.errors = visitErrorsByType(errors, errorVisitorMap, errorInfo);
    }
    return result;
}
function visitErrorsByType(errors, errorVisitorMap, errorInfo) {
    var segmentInfoMap = errorInfo.segmentInfoMap;
    var unpathedErrors = errorInfo.unpathedErrors;
    var unpathedErrorVisitor = errorVisitorMap['__unpathed'];
    return errors.map(function (originalError) {
        var pathSegmentsInfo = segmentInfoMap.get(originalError);
        var newError = pathSegmentsInfo == null
            ? originalError
            : pathSegmentsInfo.reduceRight(function (acc, segmentInfo) {
                var typeName = segmentInfo.type.name;
                var typeVisitorMap = errorVisitorMap[typeName];
                if (typeVisitorMap == null) {
                    return acc;
                }
                var errorVisitor = typeVisitorMap[segmentInfo.fieldName];
                return errorVisitor == null ? acc : errorVisitor(acc, segmentInfo.pathIndex);
            }, originalError);
        if (unpathedErrorVisitor && unpathedErrors.has(originalError)) {
            return unpathedErrorVisitor(newError);
        }
        return newError;
    });
}
function visitRoot(root, operation, exeContext, resultVisitorMap, errors, errorInfo) {
    var operationRootType = getOperationRootType(exeContext.schema, operation);
    var collectedFields = collectFields(exeContext, operationRootType, operation.selectionSet, Object.create(null), Object.create(null));
    return visitObjectValue(root, operationRootType, collectedFields, exeContext, resultVisitorMap, 0, errors, errorInfo);
}
function visitObjectValue(object, type, fieldNodeMap, exeContext, resultVisitorMap, pathIndex, errors, errorInfo) {
    var fieldMap = type.getFields();
    var typeVisitorMap = resultVisitorMap === null || resultVisitorMap === void 0 ? void 0 : resultVisitorMap[type.name];
    var enterObject = typeVisitorMap === null || typeVisitorMap === void 0 ? void 0 : typeVisitorMap.__enter;
    var newObject = enterObject != null ? enterObject(object) : object;
    var sortedErrors;
    var errorMap;
    if (errors != null) {
        sortedErrors = sortErrorsByPathSegment(errors, pathIndex);
        errorMap = sortedErrors.errorMap;
        sortedErrors.unpathedErrors.forEach(function (error) { return errorInfo.unpathedErrors.add(error); });
    }
    Object.keys(fieldNodeMap).forEach(function (responseKey) {
        var subFieldNodes = fieldNodeMap[responseKey];
        var fieldName = subFieldNodes[0].name.value;
        var fieldType = fieldName === '__typename' ? TypeNameMetaFieldDef.type : fieldMap[fieldName].type;
        var newPathIndex = pathIndex + 1;
        var fieldErrors;
        if (errors != null) {
            fieldErrors = errorMap[responseKey];
            if (fieldErrors != null) {
                delete errorMap[responseKey];
            }
            addPathSegmentInfo(type, fieldName, newPathIndex, fieldErrors, errorInfo);
        }
        var newValue = visitFieldValue(object[responseKey], fieldType, subFieldNodes, exeContext, resultVisitorMap, newPathIndex, fieldErrors, errorInfo);
        updateObject(newObject, responseKey, newValue, typeVisitorMap, fieldName);
    });
    var oldTypename = newObject.__typename;
    if (oldTypename != null) {
        updateObject(newObject, '__typename', oldTypename, typeVisitorMap, '__typename');
    }
    if (errors != null) {
        Object.keys(errorMap).forEach(function (unknownResponseKey) {
            errorMap[unknownResponseKey].forEach(function (error) { return errorInfo.unpathedErrors.add(error); });
        });
    }
    var leaveObject = typeVisitorMap === null || typeVisitorMap === void 0 ? void 0 : typeVisitorMap.__leave;
    return leaveObject != null ? leaveObject(newObject) : newObject;
}
function updateObject(object, responseKey, newValue, typeVisitorMap, fieldName) {
    if (typeVisitorMap == null) {
        object[responseKey] = newValue;
        return;
    }
    var fieldVisitor = typeVisitorMap[fieldName];
    if (fieldVisitor == null) {
        object[responseKey] = newValue;
        return;
    }
    var visitedValue = fieldVisitor(newValue);
    if (visitedValue === undefined) {
        delete object[responseKey];
        return;
    }
    object[responseKey] = visitedValue;
}
function visitListValue(list, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors, errorInfo) {
    return list.map(function (listMember) {
        return visitFieldValue(listMember, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex + 1, errors, errorInfo);
    });
}
function visitFieldValue(value, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors, errorInfo) {
    if (errors === void 0) { errors = []; }
    if (value == null) {
        return value;
    }
    var nullableType = getNullableType(returnType);
    if (isListType(nullableType)) {
        return visitListValue(value, nullableType.ofType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    else if (isAbstractType(nullableType)) {
        var finalType = exeContext.schema.getType(value.__typename);
        var collectedFields = collectSubFields(exeContext, finalType, fieldNodes);
        return visitObjectValue(value, finalType, collectedFields, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    else if (isObjectType(nullableType)) {
        var collectedFields = collectSubFields(exeContext, nullableType, fieldNodes);
        return visitObjectValue(value, nullableType, collectedFields, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    var typeVisitorMap = resultVisitorMap === null || resultVisitorMap === void 0 ? void 0 : resultVisitorMap[nullableType.name];
    if (typeVisitorMap == null) {
        return value;
    }
    var visitedValue = typeVisitorMap(value);
    return visitedValue === undefined ? value : visitedValue;
}
function sortErrorsByPathSegment(errors, pathIndex) {
    var errorMap = Object.create(null);
    var unpathedErrors = new Set();
    errors.forEach(function (error) {
        var _a;
        var pathSegment = (_a = error.path) === null || _a === void 0 ? void 0 : _a[pathIndex];
        if (pathSegment == null) {
            unpathedErrors.add(error);
            return;
        }
        if (pathSegment in errorMap) {
            errorMap[pathSegment].push(error);
        }
        else {
            errorMap[pathSegment] = [error];
        }
    });
    return {
        errorMap: errorMap,
        unpathedErrors: unpathedErrors,
    };
}
function addPathSegmentInfo(type, fieldName, pathIndex, errors, errorInfo) {
    if (errors === void 0) { errors = []; }
    errors.forEach(function (error) {
        var segmentInfo = {
            type: type,
            fieldName: fieldName,
            pathIndex: pathIndex,
        };
        var pathSegmentsInfo = errorInfo.segmentInfoMap.get(error);
        if (pathSegmentsInfo == null) {
            errorInfo.segmentInfoMap.set(error, [segmentInfo]);
        }
        else {
            pathSegmentsInfo.push(segmentInfo);
        }
    });
}
function collectSubFields(exeContext, type, fieldNodes) {
    var subFieldNodes = Object.create(null);
    var visitedFragmentNames = Object.create(null);
    fieldNodes.forEach(function (fieldNode) {
        subFieldNodes = collectFields(exeContext, type, fieldNode.selectionSet, subFieldNodes, visitedFragmentNames);
    });
    return subFieldNodes;
}

function valueMatchesCriteria(value, criteria) {
    if (value == null) {
        return value === criteria;
    }
    else if (Array.isArray(value)) {
        return Array.isArray(criteria) && value.every(function (val, index) { return valueMatchesCriteria(val, criteria[index]); });
    }
    else if (typeof value === 'object') {
        return (typeof criteria === 'object' &&
            criteria &&
            Object.keys(criteria).every(function (propertyName) { return valueMatchesCriteria(value[propertyName], criteria[propertyName]); }));
    }
    else if (criteria instanceof RegExp) {
        return criteria.test(value);
    }
    return value === criteria;
}

function isAsyncIterable(value) {
    return typeof value === 'object' && value != null && Symbol.asyncIterator in value;
}

function isDocumentNode(object) {
    return object && typeof object === 'object' && 'kind' in object && object.kind === Kind.DOCUMENT;
}

function withCancel(asyncIteratorLike, onCancel) {
    var asyncIterator = asyncIteratorLike[Symbol.asyncIterator]();
    if (!asyncIterator.return) {
        asyncIterator.return = function () { return Promise.resolve({ value: undefined, done: true }); };
    }
    var savedReturn = asyncIterator.return.bind(asyncIterator);
    asyncIterator.return = function () {
        onCancel();
        return savedReturn();
    };
    return asyncIterator;
}

export { MapperKind, SchemaDirectiveVisitor, SchemaVisitor, VisitSchemaKind, addTypes, appendObjectFields, argsToFieldConfigArgumentMap, argumentToArgumentConfig, asArray, astFromArg, astFromDirective, astFromEnumType, astFromEnumValue, astFromField, astFromInputField, astFromInputObjectType, astFromInterfaceType, astFromObjectType, astFromScalarType, astFromSchema, astFromUnionType, astFromValueUntyped, buildOperationNodeForField, checkValidationErrors, cloneDirective, cloneSchema, cloneType, collectFields, compareNodes, compareStrings, correctASTNodes, createNamedStub, createSchemaDefinition, createStub, debugLog, fieldToFieldConfig, filterSchema, fixSchemaAst, fixWindowsPath, flattenArray, forEachDefaultValue, forEachField, getArgumentValues, getBuiltInForStub, getDeprecatableDirectiveNodes, getDirectiveNodes, getDirectives, getDirectivesInExtensions, getDocumentNodeFromSchema, getFieldsWithDirectives, getImplementingTypes, getLeadingCommentBlock, getResolversFromSchema, getResponseKeyFromInfo, getUserTypesFromSchema, healSchema, healTypes, implementsAbstractType, inputFieldToFieldConfig, isAsyncIterable, isDescribable, isDocumentNode, isDocumentString, isEqual, isNamedStub, isNotEqual, isValidPath, makeDeprecatedDirective, makeDirectiveNode, makeDirectiveNodes, mapAsyncIterator, mapSchema, mergeDeep, modifyObjectFields, nodeToString, observableToAsyncIterable, parseGraphQLJSON, parseGraphQLSDL, parseInputValue, parseInputValueLiteral, parseSelectionSet, printSchemaWithDirectives, pruneSchema, relocatedError, removeObjectFields, renameType, rewireTypes, selectObjectFields, serializeInputValue, transformCommentsToDescriptions, transformInputValue, updateArgument, validateGraphQlDocuments, valueMatchesCriteria, visitData, visitErrors, visitResult, visitSchema, withCancel };
//# sourceMappingURL=index.esm.js.map
