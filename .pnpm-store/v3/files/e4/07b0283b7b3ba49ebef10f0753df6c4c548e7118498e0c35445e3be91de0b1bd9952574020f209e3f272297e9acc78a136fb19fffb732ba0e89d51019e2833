'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

const graphql = require('graphql');
const AggregateError = _interopDefault(require('@ardatan/aggregate-error'));
const camelCase = require('camel-case');

const asArray = (fns) => (Array.isArray(fns) ? fns : fns ? [fns] : []);
function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let index = 0; index < a.length; index++) {
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
        graphql.parse(str);
        return true;
    }
    catch (e) { }
    return false;
}
const invalidPathRegex = /[‘“!%&^<=>`]/;
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
    const aStr = nodeToString(a);
    const bStr = nodeToString(b);
    if (typeof customFn === 'function') {
        return customFn(aStr, bStr);
    }
    return compareStrings(aStr, bStr);
}

function debugLog(...args) {
    if (process && process.env && process.env.DEBUG && !process.env.GQL_tools_NODEBUG) {
        // tslint:disable-next-line: no-console
        console.log(...args);
    }
}

const fixWindowsPath = (path) => path.replace(/\\/g, '/');

const flattenArray = (arr) => arr.reduce((acc, next) => acc.concat(Array.isArray(next) ? flattenArray(next) : next), []);

const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
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
            return value.name ? `[function ${value.name}]` : '[function]';
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
    const seenValues = [...previouslySeenValues, value];
    const customInspectFn = getCustomFn(value);
    if (customInspectFn !== undefined) {
        const customValue = customInspectFn.call(value);
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
    const keys = Object.keys(object);
    if (keys.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    const properties = keys.map(key => {
        const value = formatValue(object[key], seenValues);
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
    const len = Math.min(MAX_ARRAY_LENGTH, array.length);
    const remaining = array.length - len;
    const items = [];
    for (let i = 0; i < len; ++i) {
        items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
        items.push('... 1 more item');
    }
    else if (remaining > 1) {
        items.push(`... ${remaining.toString(10)} more items`);
    }
    return '[' + items.join(', ') + ']';
}
function getCustomFn(obj) {
    if (typeof obj.inspect === 'function') {
        return obj.inspect;
    }
}
function getObjectTag(obj) {
    const tag = Object.prototype.toString
        .call(obj)
        .replace(/^\[object /, '')
        .replace(/]$/, '');
    if (tag === 'Object' && typeof obj.constructor === 'function') {
        const name = obj.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
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
function getArgumentValues(def, node, variableValues = {}) {
    var _a;
    const variableMap = Object.entries(variableValues).reduce((prev, [key, value]) => ({
        ...prev,
        [key]: value,
    }), {});
    const coercedValues = {};
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const argumentNodes = (_a = node.arguments) !== null && _a !== void 0 ? _a : [];
    const argNodeMap = argumentNodes.reduce((prev, arg) => ({
        ...prev,
        [arg.name.value]: arg,
    }), {});
    for (const argDef of def.args) {
        const name = argDef.name;
        const argType = argDef.type;
        const argumentNode = argNodeMap[name];
        if (!argumentNode) {
            if (argDef.defaultValue !== undefined) {
                coercedValues[name] = argDef.defaultValue;
            }
            else if (graphql.isNonNullType(argType)) {
                throw new graphql.GraphQLError(`Argument "${name}" of required type "${inspect(argType)}" ` + 'was not provided.', node);
            }
            continue;
        }
        const valueNode = argumentNode.value;
        let isNull = valueNode.kind === graphql.Kind.NULL;
        if (valueNode.kind === graphql.Kind.VARIABLE) {
            const variableName = valueNode.name.value;
            if (variableValues == null || !(variableName in variableMap)) {
                if (argDef.defaultValue !== undefined) {
                    coercedValues[name] = argDef.defaultValue;
                }
                else if (graphql.isNonNullType(argType)) {
                    throw new graphql.GraphQLError(`Argument "${name}" of required type "${inspect(argType)}" ` +
                        `was provided the variable "$${variableName}" which was not provided a runtime value.`, valueNode);
                }
                continue;
            }
            isNull = variableValues[variableName] == null;
        }
        if (isNull && graphql.isNonNullType(argType)) {
            throw new graphql.GraphQLError(`Argument "${name}" of non-null type "${inspect(argType)}" ` + 'must not be null.', valueNode);
        }
        const coercedValue = graphql.valueFromAST(valueNode, argType, variableValues);
        if (coercedValue === undefined) {
            // Note: ValuesOfCorrectTypeRule validation should catch this before
            // execution. This is a runtime check to ensure execution does not
            // continue with an invalid argument value.
            throw new graphql.GraphQLError(`Argument "${name}" has invalid value ${graphql.print(valueNode)}.`, valueNode);
        }
        coercedValues[name] = coercedValue;
    }
    return coercedValues;
}

function getDirectivesInExtensions(node, pathToDirectivesInExtensions = ['directives']) {
    const directivesInExtensions = pathToDirectivesInExtensions.reduce((acc, pathSegment) => (acc == null ? acc : acc[pathSegment]), node === null || node === void 0 ? void 0 : node.extensions);
    return directivesInExtensions;
}
function getDirectives(schema, node, pathToDirectivesInExtensions = ['directives']) {
    const directivesInExtensions = getDirectivesInExtensions(node, pathToDirectivesInExtensions);
    if (directivesInExtensions != null) {
        return directivesInExtensions;
    }
    const schemaDirectives = schema && schema.getDirectives ? schema.getDirectives() : [];
    const schemaDirectiveMap = schemaDirectives.reduce((schemaDirectiveMap, schemaDirective) => {
        schemaDirectiveMap[schemaDirective.name] = schemaDirective;
        return schemaDirectiveMap;
    }, {});
    let astNodes = [];
    if (node.astNode) {
        astNodes.push(node.astNode);
    }
    if ('extensionASTNodes' in node && node.extensionASTNodes) {
        astNodes = [...astNodes, ...node.extensionASTNodes];
    }
    const result = {};
    astNodes.forEach(astNode => {
        if (astNode.directives) {
            astNode.directives.forEach(directiveNode => {
                var _a;
                const schemaDirective = schemaDirectiveMap[directiveNode.name.value];
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
        case graphql.Kind.INT:
            return parseInt(value.value);
        case graphql.Kind.FLOAT:
            return parseFloat(value.value);
        case graphql.Kind.BOOLEAN:
            return Boolean(value.value);
        case graphql.Kind.STRING:
        case graphql.Kind.ENUM:
            return value.value;
        case graphql.Kind.LIST:
            return value.values.map(v => parseDirectiveValue(v));
        case graphql.Kind.OBJECT:
            return value.fields.reduce((prev, v) => ({ ...prev, [v.name.value]: parseDirectiveValue(v.value) }), {});
        case graphql.Kind.NULL:
            return null;
        default:
            return null;
    }
}
function getFieldsWithDirectives(documentNode, options = {}) {
    const result = {};
    let selected = ['ObjectTypeDefinition', 'ObjectTypeExtension'];
    if (options.includeInputTypes) {
        selected = [...selected, 'InputObjectTypeDefinition', 'InputObjectTypeExtension'];
    }
    const allTypes = documentNode.definitions.filter(obj => selected.includes(obj.kind));
    for (const type of allTypes) {
        const typeName = type.name.value;
        for (const field of type.fields) {
            if (field.directives && field.directives.length > 0) {
                const fieldName = field.name.value;
                const key = `${typeName}.${fieldName}`;
                const directives = field.directives.map(d => ({
                    name: d.name.value,
                    args: (d.arguments || []).reduce((prev, arg) => ({ ...prev, [arg.name.value]: parseDirectiveValue(arg.value) }), {}),
                }));
                result[key] = directives;
            }
        }
    }
    return result;
}

function getImplementingTypes(interfaceName, schema) {
    const allTypesMap = schema.getTypeMap();
    const result = [];
    for (const graphqlTypeName in allTypesMap) {
        const graphqlType = allTypesMap[graphqlTypeName];
        if (graphql.isObjectType(graphqlType)) {
            const allInterfaces = graphqlType.getInterfaces();
            if (allInterfaces.find(int => int.name === interfaceName)) {
                result.push(graphqlType.name);
            }
        }
    }
    return result;
}

function astFromType(type) {
    if (graphql.isNonNullType(type)) {
        const innerType = astFromType(type.ofType);
        if (innerType.kind === graphql.Kind.NON_NULL_TYPE) {
            throw new Error(`Invalid type node ${JSON.stringify(type)}. Inner type of non-null type cannot be a non-null type.`);
        }
        return {
            kind: graphql.Kind.NON_NULL_TYPE,
            type: innerType,
        };
    }
    else if (graphql.isListType(type)) {
        return {
            kind: graphql.Kind.LIST_TYPE,
            type: astFromType(type.ofType),
        };
    }
    return {
        kind: graphql.Kind.NAMED_TYPE,
        name: {
            kind: graphql.Kind.NAME,
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
        return { kind: graphql.Kind.NULL };
    }
    // undefined
    if (value === undefined) {
        return null;
    }
    // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
    // the value is not an array, convert the value using the list's item type.
    if (Array.isArray(value)) {
        const valuesNodes = [];
        value.forEach(item => {
            const itemNode = astFromValueUntyped(item);
            if (itemNode != null) {
                valuesNodes.push(itemNode);
            }
        });
        return { kind: graphql.Kind.LIST, values: valuesNodes };
    }
    if (typeof value === 'object') {
        const fieldNodes = [];
        Object.entries(value).forEach(([fieldName, fieldValue]) => {
            const ast = astFromValueUntyped(fieldValue);
            if (ast) {
                fieldNodes.push({
                    kind: graphql.Kind.OBJECT_FIELD,
                    name: { kind: graphql.Kind.NAME, value: fieldName },
                    value: ast,
                });
            }
        });
        return { kind: graphql.Kind.OBJECT, fields: fieldNodes };
    }
    // Others serialize based on their corresponding JavaScript scalar types.
    if (typeof value === 'boolean') {
        return { kind: graphql.Kind.BOOLEAN, value };
    }
    // JavaScript numbers can be Int or Float values.
    if (typeof value === 'number' && isFinite(value)) {
        const stringNum = String(value);
        return integerStringRegExp.test(stringNum)
            ? { kind: graphql.Kind.INT, value: stringNum }
            : { kind: graphql.Kind.FLOAT, value: stringNum };
    }
    if (typeof value === 'string') {
        return { kind: graphql.Kind.STRING, value };
    }
    throw new TypeError(`Cannot convert value to AST: ${value}.`);
}
/**
 * IntValue:
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit ( Digit+ )?
 */
const integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

function getDocumentNodeFromSchema(schema, options = {}) {
    const pathToDirectivesInExtensions = options.pathToDirectivesInExtensions;
    const typesMap = schema.getTypeMap();
    const schemaNode = astFromSchema(schema, pathToDirectivesInExtensions);
    const definitions = schemaNode != null ? [schemaNode] : [];
    const directives = schema.getDirectives();
    for (const directive of directives) {
        if (graphql.isSpecifiedDirective(directive)) {
            continue;
        }
        definitions.push(astFromDirective(directive, schema, pathToDirectivesInExtensions));
    }
    for (const typeName in typesMap) {
        const type = typesMap[typeName];
        const isPredefinedScalar = graphql.isSpecifiedScalarType(type);
        const isIntrospection = graphql.isIntrospectionType(type);
        if (isPredefinedScalar || isIntrospection) {
            continue;
        }
        if (graphql.isObjectType(type)) {
            definitions.push(astFromObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (graphql.isInterfaceType(type)) {
            definitions.push(astFromInterfaceType(type, schema, pathToDirectivesInExtensions));
        }
        else if (graphql.isUnionType(type)) {
            definitions.push(astFromUnionType(type, schema, pathToDirectivesInExtensions));
        }
        else if (graphql.isInputObjectType(type)) {
            definitions.push(astFromInputObjectType(type, schema, pathToDirectivesInExtensions));
        }
        else if (graphql.isEnumType(type)) {
            definitions.push(astFromEnumType(type, schema, pathToDirectivesInExtensions));
        }
        else if (graphql.isScalarType(type)) {
            definitions.push(astFromScalarType(type, schema, pathToDirectivesInExtensions));
        }
        else {
            throw new Error(`Unknown type ${type}.`);
        }
    }
    return {
        kind: graphql.Kind.DOCUMENT,
        definitions,
    };
}
// this approach uses the default schema printer rather than a custom solution, so may be more backwards compatible
// currently does not allow customization of printSchema options having to do with comments.
function printSchemaWithDirectives(schema, options = {}) {
    const documentNode = getDocumentNodeFromSchema(schema, options);
    return graphql.print(documentNode);
}
function astFromSchema(schema, pathToDirectivesInExtensions) {
    var _a, _b;
    const operationTypeMap = {
        query: undefined,
        mutation: undefined,
        subscription: undefined,
    };
    let nodes = [];
    if (schema.astNode != null) {
        nodes.push(schema.astNode);
    }
    if (schema.extensionASTNodes != null) {
        nodes = nodes.concat(schema.extensionASTNodes);
    }
    nodes.forEach(node => {
        if (node.operationTypes) {
            node.operationTypes.forEach(operationTypeDefinitionNode => {
                operationTypeMap[operationTypeDefinitionNode.operation] = operationTypeDefinitionNode;
            });
        }
    });
    const rootTypeMap = {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
    };
    Object.keys(operationTypeMap).forEach(operationTypeNode => {
        if (rootTypeMap[operationTypeNode] != null) {
            if (operationTypeMap[operationTypeNode] != null) {
                operationTypeMap[operationTypeNode].type = astFromType(rootTypeMap[operationTypeNode]);
            }
            else {
                operationTypeMap[operationTypeNode] = {
                    kind: graphql.Kind.OPERATION_TYPE_DEFINITION,
                    operation: operationTypeNode,
                    type: astFromType(rootTypeMap[operationTypeNode]),
                };
            }
        }
    });
    const operationTypes = Object.values(operationTypeMap).filter(operationTypeDefinitionNode => operationTypeDefinitionNode != null);
    const directives = getDirectiveNodes(schema, schema, pathToDirectivesInExtensions);
    if (!operationTypes.length && !directives.length) {
        return null;
    }
    const schemaNode = {
        kind: operationTypes != null ? graphql.Kind.SCHEMA_DEFINITION : graphql.Kind.SCHEMA_EXTENSION,
        operationTypes,
        directives,
    };
    schemaNode.description =
        ((_b = (_a = schema.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : schema.description != null)
            ? {
                kind: graphql.Kind.STRING,
                value: schema.description,
                block: true,
            }
            : undefined;
    return schemaNode;
}
function astFromDirective(directive, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.DIRECTIVE_DEFINITION,
        description: (_b = (_a = directive.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : (directive.description
            ? {
                kind: graphql.Kind.STRING,
                value: directive.description,
            }
            : undefined),
        name: {
            kind: graphql.Kind.NAME,
            value: directive.name,
        },
        arguments: (directive === null || directive === void 0 ? void 0 : directive.args)
            ? directive.args.map(arg => astFromArg(arg, schema, pathToDirectivesInExtensions))
            : undefined,
        repeatable: directive.isRepeatable,
        locations: (directive === null || directive === void 0 ? void 0 : directive.locations)
            ? directive.locations.map(location => ({
                kind: graphql.Kind.NAME,
                value: location,
            }))
            : undefined,
    };
}
function getDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    let nodes = [];
    if (entity.astNode != null) {
        nodes.push(entity.astNode);
    }
    if ('extensionASTNodes' in entity && entity.extensionASTNodes != null) {
        nodes = nodes.concat(entity.extensionASTNodes);
    }
    let directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = [].concat(...nodes.filter(node => node.directives != null).map(node => node.directives));
    }
    return directives;
}
function getDeprecatableDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    let directiveNodesBesidesDeprecated = [];
    let deprecatedDirectiveNode;
    const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
    let directives;
    if (directivesInExtensions != null) {
        directives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        directives = (_a = entity.astNode) === null || _a === void 0 ? void 0 : _a.directives;
    }
    if (directives != null) {
        directiveNodesBesidesDeprecated = directives.filter(directive => directive.name.value !== 'deprecated');
        if (entity.deprecationReason != null) {
            deprecatedDirectiveNode = (_b = directives.filter(directive => directive.name.value === 'deprecated')) === null || _b === void 0 ? void 0 : _b[0];
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
        kind: graphql.Kind.INPUT_VALUE_DEFINITION,
        description: ((_b = (_a = arg.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : arg.description)
            ? {
                kind: graphql.Kind.STRING,
                value: arg.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: arg.name,
        },
        type: astFromType(arg.type),
        defaultValue: arg.defaultValue !== undefined ? graphql.astFromValue(arg.defaultValue, arg.type) : undefined,
        directives: getDeprecatableDirectiveNodes(arg, schema, pathToDirectivesInExtensions),
    };
}
function astFromObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.OBJECT_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromField(field, schema, pathToDirectivesInExtensions)),
        interfaces: Object.values(type.getInterfaces()).map(iFace => astFromType(iFace)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromInterfaceType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    const node = {
        kind: graphql.Kind.INTERFACE_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromField(field, schema, pathToDirectivesInExtensions)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
    if ('getInterfaces' in type) {
        node.interfaces = Object.values(type.getInterfaces()).map(iFace => astFromType(iFace));
    }
    return node;
}
function astFromUnionType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.UNION_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
        types: type.getTypes().map(type => astFromType(type)),
    };
}
function astFromInputObjectType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        fields: Object.values(type.getFields()).map(field => astFromInputField(field, schema, pathToDirectivesInExtensions)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromEnumType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.ENUM_TYPE_DEFINITION,
        description: ((_b = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        values: Object.values(type.getValues()).map(value => astFromEnumValue(value, schema, pathToDirectivesInExtensions)),
        directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    };
}
function astFromScalarType(type, schema, pathToDirectivesInExtensions) {
    var _a, _b, _c, _d;
    let directiveNodesBesidesSpecifiedBy = [];
    let specifiedByDirectiveNode;
    const directivesInExtensions = getDirectivesInExtensions(type, pathToDirectivesInExtensions);
    let allDirectives;
    if (directivesInExtensions != null) {
        allDirectives = makeDirectiveNodes(schema, directivesInExtensions);
    }
    else {
        allDirectives = (_a = type.astNode) === null || _a === void 0 ? void 0 : _a.directives;
    }
    if (allDirectives != null) {
        directiveNodesBesidesSpecifiedBy = allDirectives.filter(directive => directive.name.value !== 'specifiedBy');
        if (type.specifiedByUrl != null) {
            specifiedByDirectiveNode = (_b = allDirectives.filter(directive => directive.name.value === 'specifiedBy')) === null || _b === void 0 ? void 0 : _b[0];
        }
    }
    if (type.specifiedByUrl != null && specifiedByDirectiveNode == null) {
        specifiedByDirectiveNode = makeDirectiveNode('specifiedBy', {
            url: type.specifiedByUrl,
        });
    }
    const directives = specifiedByDirectiveNode == null
        ? directiveNodesBesidesSpecifiedBy
        : [specifiedByDirectiveNode].concat(directiveNodesBesidesSpecifiedBy);
    return {
        kind: graphql.Kind.SCALAR_TYPE_DEFINITION,
        description: ((_d = (_c = type.astNode) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : type.description)
            ? {
                kind: graphql.Kind.STRING,
                value: type.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: type.name,
        },
        directives,
    };
}
function astFromField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.FIELD_DEFINITION,
        description: ((_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : field.description)
            ? {
                kind: graphql.Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: field.name,
        },
        arguments: field.args.map(arg => astFromArg(arg, schema, pathToDirectivesInExtensions)),
        type: astFromType(field.type),
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
    };
}
function astFromInputField(field, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.INPUT_VALUE_DEFINITION,
        description: ((_b = (_a = field.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : field.description)
            ? {
                kind: graphql.Kind.STRING,
                value: field.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: field.name,
        },
        type: astFromType(field.type),
        directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
        defaultValue: graphql.astFromValue(field.defaultValue, field.type),
    };
}
function astFromEnumValue(value, schema, pathToDirectivesInExtensions) {
    var _a, _b;
    return {
        kind: graphql.Kind.ENUM_VALUE_DEFINITION,
        description: ((_b = (_a = value.astNode) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : value.description)
            ? {
                kind: graphql.Kind.STRING,
                value: value.description,
                block: true,
            }
            : undefined,
        name: {
            kind: graphql.Kind.NAME,
            value: value.name,
        },
        directives: getDirectiveNodes(value, schema, pathToDirectivesInExtensions),
    };
}
function makeDeprecatedDirective(deprecationReason) {
    return makeDirectiveNode('deprecated', { reason: deprecationReason }, graphql.GraphQLDeprecatedDirective);
}
function makeDirectiveNode(name, args, directive) {
    const directiveArguments = [];
    if (directive != null) {
        directive.args.forEach(arg => {
            const argName = arg.name;
            const argValue = args[argName];
            if (argValue !== undefined) {
                directiveArguments.push({
                    kind: graphql.Kind.ARGUMENT,
                    name: {
                        kind: graphql.Kind.NAME,
                        value: argName,
                    },
                    value: graphql.astFromValue(argValue, arg.type),
                });
            }
        });
    }
    else {
        Object.entries(args).forEach(([argName, argValue]) => {
            directiveArguments.push({
                kind: graphql.Kind.ARGUMENT,
                name: {
                    kind: graphql.Kind.NAME,
                    value: argName,
                },
                value: astFromValueUntyped(argValue),
            });
        });
    }
    return {
        kind: graphql.Kind.DIRECTIVE,
        name: {
            kind: graphql.Kind.NAME,
            value: name,
        },
        arguments: directiveArguments,
    };
}
function makeDirectiveNodes(schema, directiveValues) {
    const directiveNodes = [];
    Object.entries(directiveValues).forEach(([directiveName, arrayOrSingleValue]) => {
        const directive = schema === null || schema === void 0 ? void 0 : schema.getDirective(directiveName);
        if (Array.isArray(arrayOrSingleValue)) {
            arrayOrSingleValue.forEach(value => {
                directiveNodes.push(makeDirectiveNode(directiveName, value, directive));
            });
        }
        else {
            directiveNodes.push(makeDirectiveNode(directiveName, arrayOrSingleValue, directive));
        }
    });
    return directiveNodes;
}

async function validateGraphQlDocuments(schema, documentFiles, effectiveRules) {
    effectiveRules = effectiveRules || createDefaultRules();
    const allFragments = [];
    documentFiles.forEach(documentFile => {
        if (documentFile.document) {
            for (const definitionNode of documentFile.document.definitions) {
                if (definitionNode.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                    allFragments.push(definitionNode);
                }
            }
        }
    });
    const allErrors = [];
    await Promise.all(documentFiles.map(async (documentFile) => {
        const documentToValidate = {
            kind: graphql.Kind.DOCUMENT,
            definitions: [...allFragments, ...documentFile.document.definitions].filter((definition, index, list) => {
                if (definition.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                    const firstIndex = list.findIndex(def => def.kind === graphql.Kind.FRAGMENT_DEFINITION && def.name.value === definition.name.value);
                    const isDuplicated = firstIndex !== index;
                    if (isDuplicated) {
                        return false;
                    }
                }
                return true;
            }),
        };
        const errors = graphql.validate(schema, documentToValidate, effectiveRules);
        if (errors.length > 0) {
            allErrors.push({
                filePath: documentFile.location,
                errors,
            });
        }
    }));
    return allErrors;
}
function checkValidationErrors(loadDocumentErrors) {
    if (loadDocumentErrors.length > 0) {
        const errors = [];
        for (const loadDocumentError of loadDocumentErrors) {
            for (const graphQLError of loadDocumentError.errors) {
                const error = new Error();
                error.name = 'GraphQLDocumentError';
                error.message = `${error.name}: ${graphQLError.message}`;
                error.stack = error.message;
                graphQLError.locations.forEach(location => (error.stack += `\n    at ${loadDocumentError.filePath}:${location.line}:${location.column}`));
                errors.push(error);
            }
        }
        throw new AggregateError(errors);
    }
}
function createDefaultRules() {
    const ignored = ['NoUnusedFragmentsRule', 'NoUnusedVariablesRule', 'KnownDirectivesRule'];
    // GraphQL v14 has no Rule suffix in function names
    // Adding `*Rule` makes validation backwards compatible
    ignored.forEach(rule => {
        ignored.push(rule.replace(/Rule$/, ''));
    });
    return graphql.specifiedRules.filter((f) => !ignored.includes(f.name));
}

function buildFixedSchema(schema, options) {
    return graphql.buildSchema(printSchemaWithDirectives(schema), {
        noLocation: true,
        ...(options || {}),
    });
}
function fixSchemaAst(schema, options) {
    let schemaWithValidAst;
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

function parseGraphQLSDL(location, rawSDL, options = {}) {
    let document;
    const sdl = rawSDL;
    let sdlModified = false;
    try {
        if (options.commentDescriptions && sdl.includes('#')) {
            sdlModified = true;
            document = transformCommentsToDescriptions(rawSDL, options);
            // If noLocation=true, we need to make sure to print and parse it again, to remove locations,
            // since `transformCommentsToDescriptions` must have locations set in order to transform the comments
            // into descriptions.
            if (options.noLocation) {
                document = graphql.parse(graphql.print(document), options);
            }
        }
        else {
            document = graphql.parse(new graphql.Source(sdl, location), options);
        }
    }
    catch (e) {
        if (e.message.includes('EOF') && sdl.replace(/(\#[^*]*)/g, '').trim() === '') {
            document = {
                kind: graphql.Kind.DOCUMENT,
                definitions: [],
            };
        }
        else {
            throw e;
        }
    }
    return {
        location,
        document,
        rawSDL: sdlModified ? graphql.print(document) : sdl,
    };
}
function getLeadingCommentBlock(node) {
    const loc = node.loc;
    if (!loc) {
        return;
    }
    const comments = [];
    let token = loc.startToken.prev;
    while (token != null &&
        token.kind === graphql.TokenKind.COMMENT &&
        token.next &&
        token.prev &&
        token.line + 1 === token.next.line &&
        token.line !== token.prev.line) {
        const value = String(token.value);
        comments.push(value);
        token = token.prev;
    }
    return comments.length > 0 ? comments.reverse().join('\n') : undefined;
}
function transformCommentsToDescriptions(sourceSdl, options = {}) {
    const parsedDoc = graphql.parse(sourceSdl, {
        ...options,
        noLocation: false,
    });
    const modifiedDoc = graphql.visit(parsedDoc, {
        leave: (node) => {
            if (isDescribable(node)) {
                const rawValue = getLeadingCommentBlock(node);
                if (rawValue !== undefined) {
                    const commentsBlock = dedentBlockStringValue('\n' + rawValue);
                    const isBlock = commentsBlock.includes('\n');
                    if (!node.description) {
                        return {
                            ...node,
                            description: {
                                kind: graphql.Kind.STRING,
                                value: commentsBlock,
                                block: isBlock,
                            },
                        };
                    }
                    else {
                        return {
                            ...node,
                            description: {
                                ...node.description,
                                value: node.description.value + '\n' + commentsBlock,
                                block: true,
                            },
                        };
                    }
                }
            }
        },
    });
    return modifiedDoc;
}
function isDescribable(node) {
    return (graphql.isTypeSystemDefinitionNode(node) ||
        node.kind === graphql.Kind.FIELD_DEFINITION ||
        node.kind === graphql.Kind.INPUT_VALUE_DEFINITION ||
        node.kind === graphql.Kind.ENUM_VALUE_DEFINITION);
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
    let parsedJson = parseBOM(jsonContent);
    if (parsedJson.data) {
        parsedJson = parsedJson.data;
    }
    if (parsedJson.kind === 'Document') {
        const document = parsedJson;
        return {
            location,
            document,
        };
    }
    else if (parsedJson.__schema) {
        const schema = graphql.buildClientSchema(parsedJson, options);
        const rawSDL = printSchemaWithDirectives(schema, options);
        return {
            location,
            document: parseGraphQLSDL(location, rawSDL, options).document,
            rawSDL,
            schema,
        };
    }
    throw new Error(`Not valid JSON content`);
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
    const allTypesMap = schema.getTypeMap();
    // tslint:disable-next-line: no-unnecessary-local-variable
    const modelTypes = Object.values(allTypesMap).filter((graphqlType) => {
        if (graphql.isObjectType(graphqlType)) {
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
    const schemaRoot = {};
    if (def.query) {
        schemaRoot.query = def.query.toString();
    }
    if (def.mutation) {
        schemaRoot.mutation = def.mutation.toString();
    }
    if (def.subscription) {
        schemaRoot.subscription = def.subscription.toString();
    }
    const fields = Object.keys(schemaRoot)
        .map(rootType => (schemaRoot[rootType] ? `${rootType}: ${schemaRoot[rootType]}` : null))
        .filter(a => a);
    if (fields.length) {
        return `schema { ${fields.join('\n')} }`;
    }
    if (config && config.force) {
        return ` schema { query: Query } `;
    }
    return undefined;
}

let operationVariables = [];
let fieldTypeMap = new Map();
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
    return camelCase.camelCase(name);
}
function buildOperationNodeForField({ schema, kind, field, models, ignore, depthLimit, circularReferenceDepth, argNames, selectedFields = true, }) {
    resetOperationVariables();
    resetFieldMap();
    const operationNode = buildOperationAndCollectVariables({
        schema,
        fieldName: field,
        kind,
        models: models || [],
        ignore: ignore || [],
        depthLimit: depthLimit || Infinity,
        circularReferenceDepth: circularReferenceDepth || 1,
        argNames,
        selectedFields,
    });
    // attach variables
    operationNode.variableDefinitions = [...operationVariables];
    resetOperationVariables();
    resetFieldMap();
    return operationNode;
}
function buildOperationAndCollectVariables({ schema, fieldName, kind, models, ignore, depthLimit, circularReferenceDepth, argNames, selectedFields, }) {
    const typeMap = {
        query: schema.getQueryType(),
        mutation: schema.getMutationType(),
        subscription: schema.getSubscriptionType(),
    };
    const type = typeMap[kind];
    const field = type.getFields()[fieldName];
    const operationName = buildOperationName(`${fieldName}_${kind}`);
    if (field.args) {
        field.args.forEach(arg => {
            const argName = arg.name;
            if (!argNames || argNames.includes(argName)) {
                addOperationVariable(resolveVariable(arg, argName));
            }
        });
    }
    return {
        kind: graphql.Kind.OPERATION_DEFINITION,
        operation: kind,
        name: {
            kind: 'Name',
            value: operationName,
        },
        variableDefinitions: [],
        selectionSet: {
            kind: graphql.Kind.SELECTION_SET,
            selections: [
                resolveField({
                    type,
                    field,
                    models,
                    firstCall: true,
                    path: [],
                    ancestors: [],
                    ignore,
                    depthLimit,
                    circularReferenceDepth,
                    schema,
                    depth: 0,
                    argNames,
                    selectedFields,
                }),
            ],
        },
    };
}
function resolveSelectionSet({ parent, type, models, firstCall, path, ancestors, ignore, depthLimit, circularReferenceDepth, schema, depth, argNames, selectedFields, }) {
    if (typeof selectedFields === 'boolean' && depth > depthLimit) {
        return;
    }
    if (graphql.isUnionType(type)) {
        const types = type.getTypes();
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: types
                .filter(t => !hasCircularRef([...ancestors, t], {
                depth: circularReferenceDepth,
            }))
                .map(t => {
                return {
                    kind: graphql.Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: graphql.Kind.NAMED_TYPE,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models,
                        path,
                        ancestors,
                        ignore,
                        depthLimit,
                        circularReferenceDepth,
                        schema,
                        depth,
                        argNames,
                        selectedFields,
                    }),
                };
            })
                .filter(fragmentNode => { var _a, _b; return ((_b = (_a = fragmentNode === null || fragmentNode === void 0 ? void 0 : fragmentNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length) > 0; }),
        };
    }
    if (graphql.isInterfaceType(type)) {
        const types = Object.values(schema.getTypeMap()).filter((t) => graphql.isObjectType(t) && t.getInterfaces().includes(type));
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: types
                .filter(t => !hasCircularRef([...ancestors, t], {
                depth: circularReferenceDepth,
            }))
                .map(t => {
                return {
                    kind: graphql.Kind.INLINE_FRAGMENT,
                    typeCondition: {
                        kind: graphql.Kind.NAMED_TYPE,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: t.name,
                        },
                    },
                    selectionSet: resolveSelectionSet({
                        parent: type,
                        type: t,
                        models,
                        path,
                        ancestors,
                        ignore,
                        depthLimit,
                        circularReferenceDepth,
                        schema,
                        depth,
                        argNames,
                        selectedFields,
                    }),
                };
            })
                .filter(fragmentNode => { var _a, _b; return ((_b = (_a = fragmentNode === null || fragmentNode === void 0 ? void 0 : fragmentNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections) === null || _b === void 0 ? void 0 : _b.length) > 0; }),
        };
    }
    if (graphql.isObjectType(type)) {
        const isIgnored = ignore.includes(type.name) || ignore.includes(`${parent.name}.${path[path.length - 1]}`);
        const isModel = models.includes(type.name);
        if (!firstCall && isModel && !isIgnored) {
            return {
                kind: graphql.Kind.SELECTION_SET,
                selections: [
                    {
                        kind: graphql.Kind.FIELD,
                        name: {
                            kind: graphql.Kind.NAME,
                            value: 'id',
                        },
                    },
                ],
            };
        }
        const fields = type.getFields();
        return {
            kind: graphql.Kind.SELECTION_SET,
            selections: Object.keys(fields)
                .filter(fieldName => {
                return !hasCircularRef([...ancestors, graphql.getNamedType(fields[fieldName].type)], {
                    depth: circularReferenceDepth,
                });
            })
                .map(fieldName => {
                const selectedSubFields = typeof selectedFields === 'object' ? selectedFields[fieldName] : true;
                if (selectedSubFields) {
                    return resolveField({
                        type: type,
                        field: fields[fieldName],
                        models,
                        path: [...path, fieldName],
                        ancestors,
                        ignore,
                        depthLimit,
                        circularReferenceDepth,
                        schema,
                        depth,
                        argNames,
                        selectedFields: selectedSubFields,
                    });
                }
                return null;
            })
                .filter(f => {
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
        if (graphql.isListType(type)) {
            return {
                kind: graphql.Kind.LIST_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        if (graphql.isNonNullType(type)) {
            return {
                kind: graphql.Kind.NON_NULL_TYPE,
                type: resolveVariableType(type.ofType),
            };
        }
        return {
            kind: graphql.Kind.NAMED_TYPE,
            name: {
                kind: graphql.Kind.NAME,
                value: type.name,
            },
        };
    }
    return {
        kind: graphql.Kind.VARIABLE_DEFINITION,
        variable: {
            kind: graphql.Kind.VARIABLE,
            name: {
                kind: graphql.Kind.NAME,
                value: name || arg.name,
            },
        },
        type: resolveVariableType(arg.type),
    };
}
function getArgumentName(name, path) {
    return camelCase.camelCase([...path, name].join('_'));
}
function resolveField({ type, field, models, firstCall, path, ancestors, ignore, depthLimit, circularReferenceDepth, schema, depth, argNames, selectedFields, }) {
    const namedType = graphql.getNamedType(field.type);
    let args = [];
    let removeField = false;
    if (field.args && field.args.length) {
        args = field.args
            .map(arg => {
            const argumentName = getArgumentName(arg.name, path);
            if (argNames && !argNames.includes(argumentName)) {
                if (graphql.isNonNullType(arg.type)) {
                    removeField = true;
                }
                return null;
            }
            if (!firstCall) {
                addOperationVariable(resolveVariable(arg, argumentName));
            }
            return {
                kind: graphql.Kind.ARGUMENT,
                name: {
                    kind: graphql.Kind.NAME,
                    value: arg.name,
                },
                value: {
                    kind: graphql.Kind.VARIABLE,
                    name: {
                        kind: graphql.Kind.NAME,
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
    const fieldPath = [...path, field.name];
    const fieldPathStr = fieldPath.join('.');
    let fieldName = field.name;
    if (fieldTypeMap.has(fieldPathStr) && fieldTypeMap.get(fieldPathStr) !== field.type.toString()) {
        fieldName += field.type.toString().replace('!', 'NonNull');
    }
    fieldTypeMap.set(fieldPathStr, field.type.toString());
    if (!graphql.isScalarType(namedType) && !graphql.isEnumType(namedType)) {
        return {
            kind: graphql.Kind.FIELD,
            name: {
                kind: graphql.Kind.NAME,
                value: field.name,
            },
            ...(fieldName !== field.name && { alias: { kind: graphql.Kind.NAME, value: fieldName } }),
            selectionSet: resolveSelectionSet({
                parent: type,
                type: namedType,
                models,
                firstCall,
                path: fieldPath,
                ancestors: [...ancestors, type],
                ignore,
                depthLimit,
                circularReferenceDepth,
                schema,
                depth: depth + 1,
                argNames,
                selectedFields,
            }) || undefined,
            arguments: args,
        };
    }
    return {
        kind: graphql.Kind.FIELD,
        name: {
            kind: graphql.Kind.NAME,
            value: field.name,
        },
        ...(fieldName !== field.name && { alias: { kind: graphql.Kind.NAME, value: fieldName } }),
        arguments: args,
    };
}
function hasCircularRef(types, config = {
    depth: 1,
}) {
    const type = types[types.length - 1];
    if (graphql.isScalarType(type)) {
        return false;
    }
    const size = types.filter(t => t.name === type.name).length;
    return size > config.depth;
}

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
})(exports.VisitSchemaKind || (exports.VisitSchemaKind = {}));
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
})(exports.MapperKind || (exports.MapperKind = {}));

function createNamedStub(name, type) {
    let constructor;
    if (type === 'object') {
        constructor = graphql.GraphQLObjectType;
    }
    else if (type === 'interface') {
        constructor = graphql.GraphQLInterfaceType;
    }
    else {
        constructor = graphql.GraphQLInputObjectType;
    }
    return new constructor({
        name,
        fields: {
            _fake: {
                type: graphql.GraphQLString,
            },
        },
    });
}
function createStub(node, type) {
    switch (node.kind) {
        case graphql.Kind.LIST_TYPE:
            return new graphql.GraphQLList(createStub(node.type, type));
        case graphql.Kind.NON_NULL_TYPE:
            return new graphql.GraphQLNonNull(createStub(node.type, type));
        default:
            if (type === 'output') {
                return createNamedStub(node.name.value, 'object');
            }
            return createNamedStub(node.name.value, 'input');
    }
}
function isNamedStub(type) {
    if (graphql.isObjectType(type) || graphql.isInterfaceType(type) || graphql.isInputObjectType(type)) {
        const fields = type.getFields();
        const fieldNames = Object.keys(fields);
        return fieldNames.length === 1 && fields[fieldNames[0]].name === '_fake';
    }
    return false;
}
function getBuiltInForStub(type) {
    switch (type.name) {
        case graphql.GraphQLInt.name:
            return graphql.GraphQLInt;
        case graphql.GraphQLFloat.name:
            return graphql.GraphQLFloat;
        case graphql.GraphQLString.name:
            return graphql.GraphQLString;
        case graphql.GraphQLBoolean.name:
            return graphql.GraphQLBoolean;
        case graphql.GraphQLID.name:
            return graphql.GraphQLID;
        default:
            return type;
    }
}

function rewireTypes(originalTypeMap, directives) {
    const referenceTypeMap = Object.create(null);
    Object.keys(originalTypeMap).forEach(typeName => {
        referenceTypeMap[typeName] = originalTypeMap[typeName];
    });
    const newTypeMap = Object.create(null);
    Object.keys(referenceTypeMap).forEach(typeName => {
        const namedType = referenceTypeMap[typeName];
        if (namedType == null || typeName.startsWith('__')) {
            return;
        }
        const newName = namedType.name;
        if (newName.startsWith('__')) {
            return;
        }
        if (newTypeMap[newName] != null) {
            throw new Error(`Duplicate schema type name ${newName}`);
        }
        newTypeMap[newName] = namedType;
    });
    Object.keys(newTypeMap).forEach(typeName => {
        newTypeMap[typeName] = rewireNamedType(newTypeMap[typeName]);
    });
    const newDirectives = directives.map(directive => rewireDirective(directive));
    return {
        typeMap: newTypeMap,
        directives: newDirectives,
    };
    function rewireDirective(directive) {
        if (graphql.isSpecifiedDirective(directive)) {
            return directive;
        }
        const directiveConfig = directive.toConfig();
        directiveConfig.args = rewireArgs(directiveConfig.args);
        return new graphql.GraphQLDirective(directiveConfig);
    }
    function rewireArgs(args) {
        const rewiredArgs = {};
        Object.keys(args).forEach(argName => {
            const arg = args[argName];
            const rewiredArgType = rewireType(arg.type);
            if (rewiredArgType != null) {
                arg.type = rewiredArgType;
                rewiredArgs[argName] = arg;
            }
        });
        return rewiredArgs;
    }
    function rewireNamedType(type) {
        if (graphql.isObjectType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireFields(config.fields),
                interfaces: () => rewireNamedTypes(config.interfaces),
            };
            return new graphql.GraphQLObjectType(newConfig);
        }
        else if (graphql.isInterfaceType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireFields(config.fields),
            };
            if ('interfaces' in newConfig) {
                newConfig.interfaces = () => rewireNamedTypes(config.interfaces);
            }
            return new graphql.GraphQLInterfaceType(newConfig);
        }
        else if (graphql.isUnionType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                types: () => rewireNamedTypes(config.types),
            };
            return new graphql.GraphQLUnionType(newConfig);
        }
        else if (graphql.isInputObjectType(type)) {
            const config = type.toConfig();
            const newConfig = {
                ...config,
                fields: () => rewireInputFields(config.fields),
            };
            return new graphql.GraphQLInputObjectType(newConfig);
        }
        else if (graphql.isEnumType(type)) {
            const enumConfig = type.toConfig();
            return new graphql.GraphQLEnumType(enumConfig);
        }
        else if (graphql.isScalarType(type)) {
            if (graphql.isSpecifiedScalarType(type)) {
                return type;
            }
            const scalarConfig = type.toConfig();
            return new graphql.GraphQLScalarType(scalarConfig);
        }
        throw new Error(`Unexpected schema type: ${type}`);
    }
    function rewireFields(fields) {
        const rewiredFields = {};
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null) {
                field.type = rewiredFieldType;
                field.args = rewireArgs(field.args);
                rewiredFields[fieldName] = field;
            }
        });
        return rewiredFields;
    }
    function rewireInputFields(fields) {
        const rewiredFields = {};
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const rewiredFieldType = rewireType(field.type);
            if (rewiredFieldType != null) {
                field.type = rewiredFieldType;
                rewiredFields[fieldName] = field;
            }
        });
        return rewiredFields;
    }
    function rewireNamedTypes(namedTypes) {
        const rewiredTypes = [];
        namedTypes.forEach(namedType => {
            const rewiredType = rewireType(namedType);
            if (rewiredType != null) {
                rewiredTypes.push(rewiredType);
            }
        });
        return rewiredTypes;
    }
    function rewireType(type) {
        if (graphql.isListType(type)) {
            const rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new graphql.GraphQLList(rewiredType) : null;
        }
        else if (graphql.isNonNullType(type)) {
            const rewiredType = rewireType(type.ofType);
            return rewiredType != null ? new graphql.GraphQLNonNull(rewiredType) : null;
        }
        else if (graphql.isNamedType(type)) {
            let rewiredType = referenceTypeMap[type.name];
            if (rewiredType === undefined) {
                rewiredType = isNamedStub(type) ? getBuiltInForStub(type) : rewireNamedType(type);
                newTypeMap[rewiredType.name] = referenceTypeMap[type.name] = rewiredType;
            }
            return rewiredType != null ? newTypeMap[rewiredType.name] : null;
        }
        return null;
    }
}

function transformInputValue(type, value, inputLeafValueTransformer = null, inputObjectValueTransformer = null) {
    if (value == null) {
        return value;
    }
    const nullableType = graphql.getNullableType(type);
    if (graphql.isLeafType(nullableType)) {
        return inputLeafValueTransformer != null ? inputLeafValueTransformer(nullableType, value) : value;
    }
    else if (graphql.isListType(nullableType)) {
        return value.map((listMember) => transformInputValue(nullableType.ofType, listMember, inputLeafValueTransformer, inputObjectValueTransformer));
    }
    else if (graphql.isInputObjectType(nullableType)) {
        const fields = nullableType.getFields();
        const newValue = {};
        Object.keys(value).forEach(key => {
            const field = fields[key];
            if (field != null) {
                newValue[key] = transformInputValue(field.type, value[key], inputLeafValueTransformer, inputObjectValueTransformer);
            }
        });
        return inputObjectValueTransformer != null ? inputObjectValueTransformer(nullableType, newValue) : newValue;
    }
    // unreachable, no other possible return value
}
function serializeInputValue(type, value) {
    return transformInputValue(type, value, (t, v) => t.serialize(v));
}
function parseInputValue(type, value) {
    return transformInputValue(type, value, (t, v) => t.parseValue(v));
}
function parseInputValueLiteral(type, value) {
    return transformInputValue(type, value, (t, v) => t.parseLiteral(v, {}));
}

function mapSchema(schema, schemaMapper = {}) {
    const originalTypeMap = schema.getTypeMap();
    let newTypeMap = mapDefaultValues(originalTypeMap, schema, serializeInputValue);
    newTypeMap = mapTypes(newTypeMap, schema, schemaMapper, type => graphql.isLeafType(type));
    newTypeMap = mapEnumValues(newTypeMap, schema, schemaMapper);
    newTypeMap = mapDefaultValues(newTypeMap, schema, parseInputValue);
    newTypeMap = mapTypes(newTypeMap, schema, schemaMapper, type => !graphql.isLeafType(type));
    newTypeMap = mapFields(newTypeMap, schema, schemaMapper);
    newTypeMap = mapArguments(newTypeMap, schema, schemaMapper);
    const originalDirectives = schema.getDirectives();
    const newDirectives = mapDirectives(originalDirectives, schema, schemaMapper);
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    const newQueryTypeName = queryType != null ? (newTypeMap[queryType.name] != null ? newTypeMap[queryType.name].name : undefined) : undefined;
    const newMutationTypeName = mutationType != null
        ? newTypeMap[mutationType.name] != null
            ? newTypeMap[mutationType.name].name
            : undefined
        : undefined;
    const newSubscriptionTypeName = subscriptionType != null
        ? newTypeMap[subscriptionType.name] != null
            ? newTypeMap[subscriptionType.name].name
            : undefined
        : undefined;
    const { typeMap, directives } = rewireTypes(newTypeMap, newDirectives);
    return new graphql.GraphQLSchema({
        ...schema.toConfig(),
        query: newQueryTypeName ? typeMap[newQueryTypeName] : undefined,
        mutation: newMutationTypeName ? typeMap[newMutationTypeName] : undefined,
        subscription: newSubscriptionTypeName != null ? typeMap[newSubscriptionTypeName] : undefined,
        types: Object.keys(typeMap).map(typeName => typeMap[typeName]),
        directives,
    });
}
function mapTypes(originalTypeMap, schema, schemaMapper, testFn = () => true) {
    const newTypeMap = {};
    Object.keys(originalTypeMap).forEach(typeName => {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (originalType == null || !testFn(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const typeMapper = getTypeMapper(schema, schemaMapper, typeName);
            if (typeMapper == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const maybeNewType = typeMapper(originalType, schema);
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
    const enumValueMapper = getEnumValueMapper(schemaMapper);
    if (!enumValueMapper) {
        return originalTypeMap;
    }
    return mapTypes(originalTypeMap, schema, {
        [exports.MapperKind.ENUM_TYPE]: type => {
            const config = type.toConfig();
            const originalEnumValueConfigMap = config.values;
            const newEnumValueConfigMap = {};
            Object.keys(originalEnumValueConfigMap).forEach(externalValue => {
                const originalEnumValueConfig = originalEnumValueConfigMap[externalValue];
                const mappedEnumValue = enumValueMapper(originalEnumValueConfig, type.name, schema, externalValue);
                if (mappedEnumValue === undefined) {
                    newEnumValueConfigMap[externalValue] = originalEnumValueConfig;
                }
                else if (Array.isArray(mappedEnumValue)) {
                    const [newExternalValue, newEnumValueConfig] = mappedEnumValue;
                    newEnumValueConfigMap[newExternalValue] =
                        newEnumValueConfig === undefined ? originalEnumValueConfig : newEnumValueConfig;
                }
                else if (mappedEnumValue !== null) {
                    newEnumValueConfigMap[externalValue] = mappedEnumValue;
                }
            });
            return correctASTNodes(new graphql.GraphQLEnumType({
                ...config,
                values: newEnumValueConfigMap,
            }));
        },
    }, type => graphql.isEnumType(type));
}
function mapDefaultValues(originalTypeMap, schema, fn) {
    const newTypeMap = mapArguments(originalTypeMap, schema, {
        [exports.MapperKind.ARGUMENT]: argumentConfig => {
            if (argumentConfig.defaultValue === undefined) {
                return argumentConfig;
            }
            const maybeNewType = getNewType(originalTypeMap, argumentConfig.type);
            if (maybeNewType != null) {
                return {
                    ...argumentConfig,
                    defaultValue: fn(maybeNewType, argumentConfig.defaultValue),
                };
            }
        },
    });
    return mapFields(newTypeMap, schema, {
        [exports.MapperKind.INPUT_OBJECT_FIELD]: inputFieldConfig => {
            if (inputFieldConfig.defaultValue === undefined) {
                return inputFieldConfig;
            }
            const maybeNewType = getNewType(newTypeMap, inputFieldConfig.type);
            if (maybeNewType != null) {
                return {
                    ...inputFieldConfig,
                    defaultValue: fn(maybeNewType, inputFieldConfig.defaultValue),
                };
            }
        },
    });
}
function getNewType(newTypeMap, type) {
    if (graphql.isListType(type)) {
        const newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new graphql.GraphQLList(newType) : null;
    }
    else if (graphql.isNonNullType(type)) {
        const newType = getNewType(newTypeMap, type.ofType);
        return newType != null ? new graphql.GraphQLNonNull(newType) : null;
    }
    else if (graphql.isNamedType(type)) {
        const newType = newTypeMap[type.name];
        return newType != null ? newType : null;
    }
    return null;
}
function mapFields(originalTypeMap, schema, schemaMapper) {
    const newTypeMap = {};
    Object.keys(originalTypeMap).forEach(typeName => {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (!graphql.isObjectType(originalType) && !graphql.isInterfaceType(originalType) && !graphql.isInputObjectType(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const fieldMapper = getFieldMapper(schema, schemaMapper, typeName);
            if (fieldMapper == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const config = originalType.toConfig();
            const originalFieldConfigMap = config.fields;
            const newFieldConfigMap = {};
            Object.keys(originalFieldConfigMap).forEach(fieldName => {
                const originalFieldConfig = originalFieldConfigMap[fieldName];
                const mappedField = fieldMapper(originalFieldConfig, fieldName, typeName, schema);
                if (mappedField === undefined) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                }
                else if (Array.isArray(mappedField)) {
                    const [newFieldName, newFieldConfig] = mappedField;
                    if (newFieldConfig.astNode != null) {
                        newFieldConfig.astNode = {
                            ...newFieldConfig.astNode,
                            name: {
                                ...newFieldConfig.astNode.name,
                                value: newFieldName,
                            },
                        };
                    }
                    newFieldConfigMap[newFieldName] = newFieldConfig === undefined ? originalFieldConfig : newFieldConfig;
                }
                else if (mappedField !== null) {
                    newFieldConfigMap[fieldName] = mappedField;
                }
            });
            if (graphql.isObjectType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new graphql.GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
            else if (graphql.isInterfaceType(originalType)) {
                newTypeMap[typeName] = correctASTNodes(new graphql.GraphQLInterfaceType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
            else {
                newTypeMap[typeName] = correctASTNodes(new graphql.GraphQLInputObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
        }
    });
    return newTypeMap;
}
function mapArguments(originalTypeMap, schema, schemaMapper) {
    const newTypeMap = {};
    Object.keys(originalTypeMap).forEach(typeName => {
        if (!typeName.startsWith('__')) {
            const originalType = originalTypeMap[typeName];
            if (!graphql.isObjectType(originalType) && !graphql.isInterfaceType(originalType)) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const argumentMapper = getArgumentMapper(schemaMapper);
            if (argumentMapper == null) {
                newTypeMap[typeName] = originalType;
                return;
            }
            const config = originalType.toConfig();
            const originalFieldConfigMap = config.fields;
            const newFieldConfigMap = {};
            Object.keys(originalFieldConfigMap).forEach(fieldName => {
                const originalFieldConfig = originalFieldConfigMap[fieldName];
                const originalArgumentConfigMap = originalFieldConfig.args;
                if (originalArgumentConfigMap == null) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                    return;
                }
                const argumentNames = Object.keys(originalArgumentConfigMap);
                if (!argumentNames.length) {
                    newFieldConfigMap[fieldName] = originalFieldConfig;
                    return;
                }
                const newArgumentConfigMap = {};
                argumentNames.forEach(argumentName => {
                    const originalArgumentConfig = originalArgumentConfigMap[argumentName];
                    const mappedArgument = argumentMapper(originalArgumentConfig, fieldName, typeName, schema);
                    if (mappedArgument === undefined) {
                        newArgumentConfigMap[argumentName] = originalArgumentConfig;
                    }
                    else if (Array.isArray(mappedArgument)) {
                        const [newArgumentName, newArgumentConfig] = mappedArgument;
                        newArgumentConfigMap[newArgumentName] = newArgumentConfig;
                    }
                    else if (mappedArgument !== null) {
                        newArgumentConfigMap[argumentName] = mappedArgument;
                    }
                });
                newFieldConfigMap[fieldName] = {
                    ...originalFieldConfig,
                    args: newArgumentConfigMap,
                };
            });
            if (graphql.isObjectType(originalType)) {
                newTypeMap[typeName] = new graphql.GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
            else if (graphql.isInterfaceType(originalType)) {
                newTypeMap[typeName] = new graphql.GraphQLInterfaceType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
            else {
                newTypeMap[typeName] = new graphql.GraphQLInputObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                });
            }
        }
    });
    return newTypeMap;
}
function mapDirectives(originalDirectives, schema, schemaMapper) {
    const directiveMapper = getDirectiveMapper(schemaMapper);
    if (directiveMapper == null) {
        return originalDirectives.slice();
    }
    const newDirectives = [];
    originalDirectives.forEach(directive => {
        const mappedDirective = directiveMapper(directive, schema);
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
    const type = schema.getType(typeName);
    const specifiers = [exports.MapperKind.TYPE];
    if (graphql.isObjectType(type)) {
        specifiers.push(exports.MapperKind.COMPOSITE_TYPE, exports.MapperKind.OBJECT_TYPE);
        const query = schema.getQueryType();
        const mutation = schema.getMutationType();
        const subscription = schema.getSubscriptionType();
        if (query != null && typeName === query.name) {
            specifiers.push(exports.MapperKind.ROOT_OBJECT, exports.MapperKind.QUERY);
        }
        else if (mutation != null && typeName === mutation.name) {
            specifiers.push(exports.MapperKind.ROOT_OBJECT, exports.MapperKind.MUTATION);
        }
        else if (subscription != null && typeName === subscription.name) {
            specifiers.push(exports.MapperKind.ROOT_OBJECT, exports.MapperKind.SUBSCRIPTION);
        }
    }
    else if (graphql.isInputObjectType(type)) {
        specifiers.push(exports.MapperKind.INPUT_OBJECT_TYPE);
    }
    else if (graphql.isInterfaceType(type)) {
        specifiers.push(exports.MapperKind.COMPOSITE_TYPE, exports.MapperKind.ABSTRACT_TYPE, exports.MapperKind.INTERFACE_TYPE);
    }
    else if (graphql.isUnionType(type)) {
        specifiers.push(exports.MapperKind.COMPOSITE_TYPE, exports.MapperKind.ABSTRACT_TYPE, exports.MapperKind.UNION_TYPE);
    }
    else if (graphql.isEnumType(type)) {
        specifiers.push(exports.MapperKind.ENUM_TYPE);
    }
    else if (graphql.isScalarType(type)) {
        specifiers.push(exports.MapperKind.SCALAR_TYPE);
    }
    return specifiers;
}
function getTypeMapper(schema, schemaMapper, typeName) {
    const specifiers = getTypeSpecifiers(schema, typeName);
    let typeMapper;
    const stack = [...specifiers];
    while (!typeMapper && stack.length > 0) {
        const next = stack.pop();
        typeMapper = schemaMapper[next];
    }
    return typeMapper != null ? typeMapper : null;
}
function getFieldSpecifiers(schema, typeName) {
    const type = schema.getType(typeName);
    const specifiers = [exports.MapperKind.FIELD];
    if (graphql.isObjectType(type)) {
        specifiers.push(exports.MapperKind.COMPOSITE_FIELD, exports.MapperKind.OBJECT_FIELD);
        const query = schema.getQueryType();
        const mutation = schema.getMutationType();
        const subscription = schema.getSubscriptionType();
        if (query != null && typeName === query.name) {
            specifiers.push(exports.MapperKind.ROOT_FIELD, exports.MapperKind.QUERY_ROOT_FIELD);
        }
        else if (mutation != null && typeName === mutation.name) {
            specifiers.push(exports.MapperKind.ROOT_FIELD, exports.MapperKind.MUTATION_ROOT_FIELD);
        }
        else if (subscription != null && typeName === subscription.name) {
            specifiers.push(exports.MapperKind.ROOT_FIELD, exports.MapperKind.SUBSCRIPTION_ROOT_FIELD);
        }
    }
    else if (graphql.isInterfaceType(type)) {
        specifiers.push(exports.MapperKind.COMPOSITE_FIELD, exports.MapperKind.INTERFACE_FIELD);
    }
    else if (graphql.isInputObjectType(type)) {
        specifiers.push(exports.MapperKind.INPUT_OBJECT_FIELD);
    }
    return specifiers;
}
function getFieldMapper(schema, schemaMapper, typeName) {
    const specifiers = getFieldSpecifiers(schema, typeName);
    let fieldMapper;
    const stack = [...specifiers];
    while (!fieldMapper && stack.length > 0) {
        const next = stack.pop();
        fieldMapper = schemaMapper[next];
    }
    return fieldMapper != null ? fieldMapper : null;
}
function getArgumentMapper(schemaMapper) {
    const argumentMapper = schemaMapper[exports.MapperKind.ARGUMENT];
    return argumentMapper != null ? argumentMapper : null;
}
function getDirectiveMapper(schemaMapper) {
    const directiveMapper = schemaMapper[exports.MapperKind.DIRECTIVE];
    return directiveMapper != null ? directiveMapper : null;
}
function getEnumValueMapper(schemaMapper) {
    const enumValueMapper = schemaMapper[exports.MapperKind.ENUM_VALUE];
    return enumValueMapper != null ? enumValueMapper : null;
}
function correctASTNodes(type) {
    if (graphql.isObjectType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            Object.values(config.fields).forEach(fieldConfig => {
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            });
            config.astNode = {
                ...config.astNode,
                kind: graphql.Kind.OBJECT_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: graphql.Kind.OBJECT_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new graphql.GraphQLObjectType(config);
    }
    else if (graphql.isInterfaceType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            Object.values(config.fields).forEach(fieldConfig => {
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            });
            config.astNode = {
                ...config.astNode,
                kind: graphql.Kind.INTERFACE_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: graphql.Kind.INTERFACE_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new graphql.GraphQLInterfaceType(config);
    }
    else if (graphql.isInputObjectType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const fields = [];
            Object.values(config.fields).forEach(fieldConfig => {
                if (fieldConfig.astNode != null) {
                    fields.push(fieldConfig.astNode);
                }
            });
            config.astNode = {
                ...config.astNode,
                kind: graphql.Kind.INPUT_OBJECT_TYPE_DEFINITION,
                fields,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                kind: graphql.Kind.INPUT_OBJECT_TYPE_EXTENSION,
                fields: undefined,
            }));
        }
        return new graphql.GraphQLInputObjectType(config);
    }
    else if (graphql.isEnumType(type)) {
        const config = type.toConfig();
        if (config.astNode != null) {
            const values = [];
            Object.values(config.values).forEach(enumValueConfig => {
                if (enumValueConfig.astNode != null) {
                    values.push(enumValueConfig.astNode);
                }
            });
            config.astNode = {
                ...config.astNode,
                values,
            };
        }
        if (config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.map(node => ({
                ...node,
                values: undefined,
            }));
        }
        return new graphql.GraphQLEnumType(config);
    }
    else {
        return type;
    }
}

function filterSchema({ schema, typeFilter = () => true, fieldFilter = undefined, rootFieldFilter = undefined, objectFieldFilter = undefined, interfaceFieldFilter = undefined, inputObjectFieldFilter = undefined, argumentFilter = undefined, }) {
    const filteredSchema = mapSchema(schema, {
        [exports.MapperKind.QUERY]: (type) => filterRootFields(type, 'Query', rootFieldFilter, argumentFilter),
        [exports.MapperKind.MUTATION]: (type) => filterRootFields(type, 'Mutation', rootFieldFilter, argumentFilter),
        [exports.MapperKind.SUBSCRIPTION]: (type) => filterRootFields(type, 'Subscription', rootFieldFilter, argumentFilter),
        [exports.MapperKind.OBJECT_TYPE]: (type) => typeFilter(type.name, type)
            ? filterElementFields(graphql.GraphQLObjectType, type, objectFieldFilter || fieldFilter, argumentFilter)
            : null,
        [exports.MapperKind.INTERFACE_TYPE]: (type) => typeFilter(type.name, type)
            ? filterElementFields(graphql.GraphQLInterfaceType, type, interfaceFieldFilter || fieldFilter, argumentFilter)
            : null,
        [exports.MapperKind.INPUT_OBJECT_TYPE]: (type) => typeFilter(type.name, type)
            ? filterElementFields(graphql.GraphQLInputObjectType, type, inputObjectFieldFilter || fieldFilter)
            : null,
        [exports.MapperKind.UNION_TYPE]: (type) => (typeFilter(type.name, type) ? undefined : null),
        [exports.MapperKind.ENUM_TYPE]: (type) => (typeFilter(type.name, type) ? undefined : null),
        [exports.MapperKind.SCALAR_TYPE]: (type) => (typeFilter(type.name, type) ? undefined : null),
    });
    return filteredSchema;
}
function filterRootFields(type, operation, rootFieldFilter, argumentFilter) {
    if (rootFieldFilter || argumentFilter) {
        const config = type.toConfig();
        Object.entries(config.fields).forEach(([fieldName, field]) => {
            if (rootFieldFilter && !rootFieldFilter(operation, fieldName, config.fields[fieldName])) {
                delete config.fields[fieldName];
            }
            else if (argumentFilter) {
                for (const argName of Object.keys(field.args)) {
                    if (!argumentFilter(operation, fieldName, argName, field.args[argName])) {
                        delete field.args[argName];
                    }
                }
            }
        });
        return new graphql.GraphQLObjectType(config);
    }
    return type;
}
function filterElementFields(ElementConstructor, type, fieldFilter, argumentFilter) {
    if (fieldFilter || argumentFilter) {
        const config = type.toConfig();
        Object.entries(config.fields).forEach(([fieldName, field]) => {
            if (fieldFilter && !fieldFilter(type.name, fieldName, config.fields[fieldName])) {
                delete config.fields[fieldName];
            }
            else if (argumentFilter && 'args' in field) {
                for (const argName of Object.keys(field.args)) {
                    if (!argumentFilter(type.name, fieldName, argName, field.args[argName])) {
                        delete field.args[argName];
                    }
                }
            }
        });
        return new ElementConstructor(config);
    }
}

function cloneDirective(directive) {
    return graphql.isSpecifiedDirective(directive) ? directive : new graphql.GraphQLDirective(directive.toConfig());
}
function cloneType(type) {
    if (graphql.isObjectType(type)) {
        const config = type.toConfig();
        return new graphql.GraphQLObjectType({
            ...config,
            interfaces: typeof config.interfaces === 'function' ? config.interfaces : config.interfaces.slice(),
        });
    }
    else if (graphql.isInterfaceType(type)) {
        const config = type.toConfig();
        const newConfig = {
            ...config,
            interfaces: [...((typeof config.interfaces === 'function' ? config.interfaces() : config.interfaces) || [])],
        };
        return new graphql.GraphQLInterfaceType(newConfig);
    }
    else if (graphql.isUnionType(type)) {
        const config = type.toConfig();
        return new graphql.GraphQLUnionType({
            ...config,
            types: config.types.slice(),
        });
    }
    else if (graphql.isInputObjectType(type)) {
        return new graphql.GraphQLInputObjectType(type.toConfig());
    }
    else if (graphql.isEnumType(type)) {
        return new graphql.GraphQLEnumType(type.toConfig());
    }
    else if (graphql.isScalarType(type)) {
        return graphql.isSpecifiedScalarType(type) ? type : new graphql.GraphQLScalarType(type.toConfig());
    }
    throw new Error(`Invalid type ${type}`);
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
    const actualNamedTypeMap = Object.create(null);
    // If any of the .name properties of the GraphQLNamedType objects in
    // schema.getTypeMap() have changed, the keys of the type map need to
    // be updated accordingly.
    Object.entries(originalTypeMap).forEach(([typeName, namedType]) => {
        if (namedType == null || typeName.startsWith('__')) {
            return;
        }
        const actualName = namedType.name;
        if (actualName.startsWith('__')) {
            return;
        }
        if (actualName in actualNamedTypeMap) {
            throw new Error(`Duplicate schema type name ${actualName}`);
        }
        actualNamedTypeMap[actualName] = namedType;
        // Note: we are deliberately leaving namedType in the schema by its
        // original name (which might be different from actualName), so that
        // references by that name can be healed.
    });
    // Now add back every named type by its actual name.
    Object.entries(actualNamedTypeMap).forEach(([typeName, namedType]) => {
        originalTypeMap[typeName] = namedType;
    });
    // Directive declaration argument types can refer to named types.
    directives.forEach((decl) => {
        decl.args = decl.args.filter(arg => {
            arg.type = healType(arg.type);
            return arg.type !== null;
        });
    });
    Object.entries(originalTypeMap).forEach(([typeName, namedType]) => {
        // Heal all named types, except for dangling references, kept only to redirect.
        if (!typeName.startsWith('__') && typeName in actualNamedTypeMap) {
            if (namedType != null) {
                healNamedType(namedType);
            }
        }
    });
    for (const typeName of Object.keys(originalTypeMap)) {
        if (!typeName.startsWith('__') && !(typeName in actualNamedTypeMap)) {
            delete originalTypeMap[typeName];
        }
    }
    function healNamedType(type) {
        if (graphql.isObjectType(type)) {
            healFields(type);
            healInterfaces(type);
            return;
        }
        else if (graphql.isInterfaceType(type)) {
            healFields(type);
            if ('getInterfaces' in type) {
                healInterfaces(type);
            }
            return;
        }
        else if (graphql.isUnionType(type)) {
            healUnderlyingTypes(type);
            return;
        }
        else if (graphql.isInputObjectType(type)) {
            healInputFields(type);
            return;
        }
        else if (graphql.isLeafType(type)) {
            return;
        }
        throw new Error(`Unexpected schema type: ${type}`);
    }
    function healFields(type) {
        const fieldMap = type.getFields();
        for (const [key, field] of Object.entries(fieldMap)) {
            field.args
                .map(arg => {
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
    function healInterfaces(type) {
        if ('getInterfaces' in type) {
            const interfaces = type.getInterfaces();
            interfaces.push(...interfaces
                .splice(0)
                .map(iface => healType(iface))
                .filter(Boolean));
        }
    }
    function healInputFields(type) {
        const fieldMap = type.getFields();
        for (const [key, field] of Object.entries(fieldMap)) {
            field.type = healType(field.type);
            if (field.type === null) {
                delete fieldMap[key];
            }
        }
    }
    function healUnderlyingTypes(type) {
        const types = type.getTypes();
        types.push(...types
            .splice(0)
            .map(t => healType(t))
            .filter(Boolean));
    }
    function healType(type) {
        // Unwrap the two known wrapper types
        if (graphql.isListType(type)) {
            const healedType = healType(type.ofType);
            return healedType != null ? new graphql.GraphQLList(healedType) : null;
        }
        else if (graphql.isNonNullType(type)) {
            const healedType = healType(type.ofType);
            return healedType != null ? new graphql.GraphQLNonNull(healedType) : null;
        }
        else if (graphql.isNamedType(type)) {
            // If a type annotation on a field or an argument or a union member is
            // any `GraphQLNamedType` with a `name`, then it must end up identical
            // to `schema.getType(name)`, since `schema.getTypeMap()` is the source
            // of truth for all named schema types.
            // Note that new types can still be simply added by adding a field, as
            // the official type will be undefined, not null.
            const officialType = originalTypeMap[type.name];
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
class SchemaVisitor {
    // Determine if this SchemaVisitor (sub)class implements a particular
    // visitor method.
    static implementsVisitorMethod(methodName) {
        if (!methodName.startsWith('visit')) {
            return false;
        }
        const method = this.prototype[methodName];
        if (typeof method !== 'function') {
            return false;
        }
        if (this.name === 'SchemaVisitor') {
            // The SchemaVisitor class implements every visitor method.
            return true;
        }
        const stub = SchemaVisitor.prototype[methodName];
        if (method === stub) {
            // If this.prototype[methodName] was just inherited from SchemaVisitor,
            // then this class does not really implement the method.
            return false;
        }
        return true;
    }
    // Concrete subclasses of SchemaVisitor should override one or more of these
    // visitor methods, in order to express their interest in handling certain
    // schema types/locations. Each method may return null to remove the given
    // type from the schema, a non-null value of the same type to update the
    // type in the schema, or nothing to leave the type as it was.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    visitSchema(_schema) { }
    visitScalar(_scalar
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitObject(_object
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitFieldDefinition(_field, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitArgumentDefinition(_argument, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitInterface(_iface
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    visitUnion(_union) { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    visitEnum(_type) { }
    visitEnumValue(_value, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitInputObject(_object
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
    visitInputFieldDefinition(_field, _details
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) { }
}

function isSchemaVisitor(obj) {
    if ('schema' in obj && graphql.isSchema(obj.schema)) {
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
    const visitorSelector = typeof visitorOrVisitorSelector === 'function' ? visitorOrVisitorSelector : () => visitorOrVisitorSelector;
    // Helper function that calls visitorSelector and applies the resulting
    // visitors to the given type, with arguments [type, ...args].
    function callMethod(methodName, type, ...args) {
        let visitors = visitorSelector(type, methodName);
        visitors = Array.isArray(visitors) ? visitors : [visitors];
        let finalType = type;
        visitors.every(visitorOrVisitorDef => {
            let newType;
            if (isSchemaVisitor(visitorOrVisitorDef)) {
                newType = visitorOrVisitorDef[methodName](finalType, ...args);
            }
            else if (graphql.isNamedType(finalType) &&
                (methodName === 'visitScalar' ||
                    methodName === 'visitEnum' ||
                    methodName === 'visitObject' ||
                    methodName === 'visitInputObject' ||
                    methodName === 'visitUnion' ||
                    methodName === 'visitInterface')) {
                const specifiers = getTypeSpecifiers$1(finalType, schema);
                const typeVisitor = getVisitor(visitorOrVisitorDef, specifiers);
                newType = typeVisitor != null ? typeVisitor(finalType, schema) : undefined;
            }
            if (typeof newType === 'undefined') {
                // Keep going without modifying type.
                return true;
            }
            if (methodName === 'visitSchema' || graphql.isSchema(finalType)) {
                throw new Error(`Method ${methodName} cannot replace schema with ${newType}`);
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
        if (graphql.isSchema(type)) {
            // Unlike the other types, the root GraphQLSchema object cannot be
            // replaced by visitor methods, because that would make life very hard
            // for SchemaVisitor subclasses that rely on the original schema object.
            callMethod('visitSchema', type);
            const typeMap = type.getTypeMap();
            Object.entries(typeMap).forEach(([typeName, namedType]) => {
                if (!typeName.startsWith('__') && namedType != null) {
                    // Call visit recursively to let it determine which concrete
                    // subclass of GraphQLNamedType we found in the type map.
                    // We do not use updateEachKey because we want to preserve
                    // deleted types in the typeMap so that other types that reference
                    // the deleted types can be healed.
                    typeMap[typeName] = visit(namedType);
                }
            });
            return type;
        }
        if (graphql.isObjectType(type)) {
            // Note that callMethod('visitObject', type) may not actually call any
            // methods, if there are no @directive annotations associated with this
            // type, or if this SchemaDirectiveVisitor subclass does not override
            // the visitObject method.
            const newObject = callMethod('visitObject', type);
            if (newObject != null) {
                visitFields(newObject);
            }
            return newObject;
        }
        if (graphql.isInterfaceType(type)) {
            const newInterface = callMethod('visitInterface', type);
            if (newInterface != null) {
                visitFields(newInterface);
            }
            return newInterface;
        }
        if (graphql.isInputObjectType(type)) {
            const newInputObject = callMethod('visitInputObject', type);
            if (newInputObject != null) {
                const fieldMap = newInputObject.getFields();
                for (const key of Object.keys(fieldMap)) {
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
            return newInputObject;
        }
        if (graphql.isScalarType(type)) {
            return callMethod('visitScalar', type);
        }
        if (graphql.isUnionType(type)) {
            return callMethod('visitUnion', type);
        }
        if (graphql.isEnumType(type)) {
            let newEnum = callMethod('visitEnum', type);
            if (newEnum != null) {
                const newValues = newEnum
                    .getValues()
                    .map(value => callMethod('visitEnumValue', value, {
                    enumType: newEnum,
                }))
                    .filter(Boolean);
                // Recreate the enum type if any of the values changed
                const valuesUpdated = newValues.some((value, index) => value !== newEnum.getValues()[index]);
                if (valuesUpdated) {
                    newEnum = new graphql.GraphQLEnumType({
                        ...newEnum.toConfig(),
                        values: newValues.reduce((prev, value) => ({
                            ...prev,
                            [value.name]: {
                                value: value.value,
                                deprecationReason: value.deprecationReason,
                                description: value.description,
                                astNode: value.astNode,
                            },
                        }), {}),
                    });
                }
            }
            return newEnum;
        }
        throw new Error(`Unexpected schema type: ${type}`);
    }
    function visitFields(type) {
        const fieldMap = type.getFields();
        for (const [key, field] of Object.entries(fieldMap)) {
            // It would be nice if we could call visit(field) recursively here, but
            // GraphQLField is merely a type, not a value that can be detected using
            // an instanceof check, so we have to visit the fields in this lexical
            // context, so that TypeScript can validate the call to
            // visitFieldDefinition.
            const newField = callMethod('visitFieldDefinition', field, {
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
                    .map(arg => callMethod('visitArgumentDefinition', arg, {
                    // Like visitFieldDefinition, visitArgumentDefinition takes a
                    // second parameter that provides additional context, namely the
                    // parent .field and grandparent .objectType. Remember that the
                    // current GraphQLSchema is always available via this.schema.
                    field: newField,
                    objectType: type,
                }))
                    .filter(Boolean);
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (newField) {
                fieldMap[key] = newField;
            }
            else {
                delete fieldMap[key];
            }
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
    const specifiers = [exports.VisitSchemaKind.TYPE];
    if (graphql.isObjectType(type)) {
        specifiers.push(exports.VisitSchemaKind.COMPOSITE_TYPE, exports.VisitSchemaKind.OBJECT_TYPE);
        const query = schema.getQueryType();
        const mutation = schema.getMutationType();
        const subscription = schema.getSubscriptionType();
        if (type === query) {
            specifiers.push(exports.VisitSchemaKind.ROOT_OBJECT, exports.VisitSchemaKind.QUERY);
        }
        else if (type === mutation) {
            specifiers.push(exports.VisitSchemaKind.ROOT_OBJECT, exports.VisitSchemaKind.MUTATION);
        }
        else if (type === subscription) {
            specifiers.push(exports.VisitSchemaKind.ROOT_OBJECT, exports.VisitSchemaKind.SUBSCRIPTION);
        }
    }
    else if (graphql.isInputType(type)) {
        specifiers.push(exports.VisitSchemaKind.INPUT_OBJECT_TYPE);
    }
    else if (graphql.isInterfaceType(type)) {
        specifiers.push(exports.VisitSchemaKind.COMPOSITE_TYPE, exports.VisitSchemaKind.ABSTRACT_TYPE, exports.VisitSchemaKind.INTERFACE_TYPE);
    }
    else if (graphql.isUnionType(type)) {
        specifiers.push(exports.VisitSchemaKind.COMPOSITE_TYPE, exports.VisitSchemaKind.ABSTRACT_TYPE, exports.VisitSchemaKind.UNION_TYPE);
    }
    else if (graphql.isEnumType(type)) {
        specifiers.push(exports.VisitSchemaKind.ENUM_TYPE);
    }
    else if (graphql.isScalarType(type)) {
        specifiers.push(exports.VisitSchemaKind.SCALAR_TYPE);
    }
    return specifiers;
}
function getVisitor(visitorDef, specifiers) {
    let typeVisitor;
    const stack = [...specifiers];
    while (!typeVisitor && stack.length > 0) {
        const next = stack.pop();
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
class SchemaDirectiveVisitor extends SchemaVisitor {
    // Mark the constructor protected to enforce passing SchemaDirectiveVisitor
    // subclasses (not instances) to visitSchemaDirectives.
    constructor(config) {
        super();
        this.name = config.name;
        this.args = config.args;
        this.visitedType = config.visitedType;
        this.schema = config.schema;
        this.context = config.context;
    }
    // Override this method to return a custom GraphQLDirective (or modify one
    // already present in the schema) to enforce argument types, provide default
    // argument values, or specify schema locations where this @directive may
    // appear. By default, any declaration found in the schema will be returned.
    static getDirectiveDeclaration(directiveName, schema) {
        return schema.getDirective(directiveName);
    }
    // Call SchemaDirectiveVisitor.visitSchemaDirectives to visit every
    // @directive in the schema and create an appropriate SchemaDirectiveVisitor
    // instance to visit the object decorated by the @directive.
    static visitSchemaDirectives(schema, 
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
    context = Object.create(null), 
    // The visitSchemaDirectives method returns a map from directive names to
    // lists of SchemaDirectiveVisitors created while visiting the schema.
    pathToDirectivesInExtensions = ['directives']) {
        // If the schema declares any directives for public consumption, record
        // them here so that we can properly coerce arguments when/if we encounter
        // an occurrence of the directive while walking the schema below.
        const declaredDirectives = this.getDeclaredDirectives(schema, directiveVisitors);
        // Map from directive names to lists of SchemaDirectiveVisitor instances
        // created while visiting the schema.
        const createdVisitors = Object.keys(directiveVisitors).reduce((prev, item) => ({
            ...prev,
            [item]: [],
        }), {});
        const directiveVisitorMap = Object.entries(directiveVisitors).reduce((prev, [key, value]) => ({
            ...prev,
            [key]: value,
        }), {});
        function visitorSelector(type, methodName) {
            var _a, _b;
            const directivesInExtensions = pathToDirectivesInExtensions.reduce((acc, pathSegment) => (acc == null ? acc : acc[pathSegment]), type === null || type === void 0 ? void 0 : type.extensions);
            const directives = Object.create(null);
            if (directivesInExtensions != null) {
                Object.entries(directivesInExtensions).forEach(([directiveName, directiveValue]) => {
                    if (!directives[directiveName]) {
                        directives[directiveName] = [directiveValue];
                    }
                    else {
                        directives[directiveName].push([directiveValue]);
                    }
                });
            }
            else {
                let directiveNodes = (_b = (_a = type === null || type === void 0 ? void 0 : type.astNode) === null || _a === void 0 ? void 0 : _a.directives) !== null && _b !== void 0 ? _b : [];
                const extensionASTNodes = type.extensionASTNodes;
                if (extensionASTNodes != null) {
                    extensionASTNodes.forEach(extensionASTNode => {
                        if (extensionASTNode.directives != null) {
                            directiveNodes = directiveNodes.concat(extensionASTNode.directives);
                        }
                    });
                }
                directiveNodes.forEach(directiveNode => {
                    const directiveName = directiveNode.name.value;
                    const decl = declaredDirectives[directiveName];
                    let args;
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
                            directiveNode.arguments.forEach(arg => {
                                args[arg.name.value] = graphql.valueFromASTUntyped(arg.value);
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
            const visitors = [];
            Object.entries(directives).forEach(([directiveName, directiveValues]) => {
                if (!(directiveName in directiveVisitorMap)) {
                    return;
                }
                const VisitorClass = directiveVisitorMap[directiveName];
                // Avoid creating visitor objects if visitorClass does not override
                // the visitor method named by methodName.
                if (!VisitorClass.implementsVisitorMethod(methodName)) {
                    return;
                }
                directiveValues.forEach(directiveValue => {
                    // As foretold in comments near the top of the visitSchemaDirectives
                    // method, this is where instances of the SchemaDirectiveVisitor class
                    // get created and assigned names. While subclasses could override the
                    // constructor method, the constructor is marked as protected, so
                    // these are the only arguments that will ever be passed.
                    visitors.push(new VisitorClass({
                        name: directiveName,
                        args: directiveValue,
                        visitedType: type,
                        schema,
                        context,
                    }));
                });
            });
            if (visitors.length > 0) {
                visitors.forEach(visitor => {
                    createdVisitors[visitor.name].push(visitor);
                });
            }
            return visitors;
        }
        visitSchema(schema, visitorSelector);
        return createdVisitors;
    }
    static getDeclaredDirectives(schema, directiveVisitors) {
        const declaredDirectives = schema.getDirectives().reduce((prev, curr) => ({
            ...prev,
            [curr.name]: curr,
        }), {});
        // If the visitor subclass overrides getDirectiveDeclaration, and it
        // returns a non-null GraphQLDirective, use that instead of any directive
        // declared in the schema itself. Reasoning: if a SchemaDirectiveVisitor
        // goes to the trouble of implementing getDirectiveDeclaration, it should
        // be able to rely on that implementation.
        Object.entries(directiveVisitors).forEach(([directiveName, visitorClass]) => {
            const decl = visitorClass.getDirectiveDeclaration(directiveName, schema);
            if (decl != null) {
                declaredDirectives[directiveName] = decl;
            }
        });
        Object.entries(declaredDirectives).forEach(([name, decl]) => {
            if (!(name in directiveVisitors)) {
                // SchemaDirectiveVisitors.visitSchemaDirectives might be called
                // multiple times with partial directiveVisitors maps, so it's not
                // necessarily an error for directiveVisitors to be missing an
                // implementation of a directive that was declared in the schema.
                return;
            }
            const visitorClass = directiveVisitors[name];
            decl.locations.forEach(loc => {
                const visitorMethodName = directiveLocationToVisitorMethodName(loc);
                if (SchemaVisitor.implementsVisitorMethod(visitorMethodName) &&
                    !visitorClass.implementsVisitorMethod(visitorMethodName)) {
                    // While visitor subclasses may implement extra visitor methods,
                    // it's definitely a mistake if the GraphQLDirective declares itself
                    // applicable to certain schema locations, and the visitor subclass
                    // does not implement all the corresponding methods.
                    throw new Error(`SchemaDirectiveVisitor for @${name} must implement ${visitorMethodName} method`);
                }
            });
        });
        return declaredDirectives;
    }
}
// Convert a string like "FIELD_DEFINITION" to "visitFieldDefinition".
function directiveLocationToVisitorMethodName(loc) {
    return ('visit' +
        loc.replace(/([^_]*)_?/g, (_wholeMatch, part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()));
}

function getResolversFromSchema(schema) {
    const resolvers = Object.create({});
    const typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(typeName => {
        if (!typeName.startsWith('__')) {
            const type = typeMap[typeName];
            if (graphql.isScalarType(type)) {
                if (!graphql.isSpecifiedScalarType(type)) {
                    const config = type.toConfig();
                    delete config.astNode; // avoid AST duplication elsewhere
                    resolvers[typeName] = new graphql.GraphQLScalarType(config);
                }
            }
            else if (graphql.isEnumType(type)) {
                resolvers[typeName] = {};
                const values = type.getValues();
                values.forEach(value => {
                    resolvers[typeName][value.name] = value.value;
                });
            }
            else if (graphql.isInterfaceType(type)) {
                if (type.resolveType != null) {
                    resolvers[typeName] = {
                        __resolveType: type.resolveType,
                    };
                }
            }
            else if (graphql.isUnionType(type)) {
                if (type.resolveType != null) {
                    resolvers[typeName] = {
                        __resolveType: type.resolveType,
                    };
                }
            }
            else if (graphql.isObjectType(type)) {
                resolvers[typeName] = {};
                if (type.isTypeOf != null) {
                    resolvers[typeName].__isTypeOf = type.isTypeOf;
                }
                const fields = type.getFields();
                Object.keys(fields).forEach(fieldName => {
                    var _a, _b;
                    const field = fields[fieldName];
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
    const typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(typeName => {
        const type = typeMap[typeName];
        // TODO: maybe have an option to include these?
        if (!graphql.getNamedType(type).name.startsWith('__') && graphql.isObjectType(type)) {
            const fields = type.getFields();
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                fn(field, typeName, fieldName);
            });
        }
    });
}

function forEachDefaultValue(schema, fn) {
    const typeMap = schema.getTypeMap();
    Object.keys(typeMap).forEach(typeName => {
        const type = typeMap[typeName];
        if (!graphql.getNamedType(type).name.startsWith('__')) {
            if (graphql.isObjectType(type)) {
                const fields = type.getFields();
                Object.keys(fields).forEach(fieldName => {
                    const field = fields[fieldName];
                    field.args.forEach(arg => {
                        arg.defaultValue = fn(arg.type, arg.defaultValue);
                    });
                });
            }
            else if (graphql.isInputObjectType(type)) {
                const fields = type.getFields();
                Object.keys(fields).forEach(fieldName => {
                    const field = fields[fieldName];
                    field.defaultValue = fn(field.type, field.defaultValue);
                });
            }
        }
    });
}

// addTypes uses toConfig to create a new schema with a new or replaced
function addTypes(schema, newTypesOrDirectives) {
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    const queryTypeName = queryType != null ? queryType.name : undefined;
    const mutationTypeName = mutationType != null ? mutationType.name : undefined;
    const subscriptionTypeName = subscriptionType != null ? subscriptionType.name : undefined;
    const config = schema.toConfig();
    const originalTypeMap = {};
    config.types.forEach(type => {
        originalTypeMap[type.name] = type;
    });
    const originalDirectiveMap = {};
    config.directives.forEach(directive => {
        originalDirectiveMap[directive.name] = directive;
    });
    newTypesOrDirectives.forEach(newTypeOrDirective => {
        if (graphql.isNamedType(newTypeOrDirective)) {
            originalTypeMap[newTypeOrDirective.name] = newTypeOrDirective;
        }
        else if (graphql.isDirective(newTypeOrDirective)) {
            originalDirectiveMap[newTypeOrDirective.name] = newTypeOrDirective;
        }
    });
    const { typeMap, directives } = rewireTypes(originalTypeMap, Object.keys(originalDirectiveMap).map(directiveName => originalDirectiveMap[directiveName]));
    return new graphql.GraphQLSchema({
        ...config,
        query: queryTypeName ? typeMap[queryTypeName] : undefined,
        mutation: mutationTypeName ? typeMap[mutationTypeName] : undefined,
        subscription: subscriptionTypeName != null ? typeMap[subscriptionTypeName] : undefined,
        types: Object.keys(typeMap).map(typeName => typeMap[typeName]),
        directives,
    });
}

/**
 * Prunes the provided schema, removing unused and empty types
 * @param schema The schema to prune
 * @param options Additional options for removing unused types from the schema
 */
function pruneSchema(schema, options = {}) {
    const pruningContext = {
        schema,
        unusedTypes: Object.create(null),
        implementations: Object.create(null),
    };
    Object.keys(schema.getTypeMap()).forEach(typeName => {
        const type = schema.getType(typeName);
        if ('getInterfaces' in type) {
            type.getInterfaces().forEach(iface => {
                const implementations = getImplementations(pruningContext, iface);
                if (implementations == null) {
                    pruningContext.implementations[iface.name] = Object.create(null);
                }
                pruningContext.implementations[iface.name][type.name] = true;
            });
        }
    });
    visitTypes(pruningContext, schema);
    return mapSchema(schema, {
        [exports.MapperKind.TYPE]: (type) => {
            // If we should NOT prune the type, return it immediately as unmodified
            if (options.skipPruning && options.skipPruning(type)) {
                return type;
            }
            if (graphql.isObjectType(type) || graphql.isInputObjectType(type)) {
                if ((!Object.keys(type.getFields()).length && !options.skipEmptyCompositeTypePruning) ||
                    (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning)) {
                    return null;
                }
            }
            else if (graphql.isUnionType(type)) {
                if ((!type.getTypes().length && !options.skipEmptyUnionPruning) ||
                    (pruningContext.unusedTypes[type.name] && !options.skipUnusedTypesPruning)) {
                    return null;
                }
            }
            else if (graphql.isInterfaceType(type)) {
                const implementations = getImplementations(pruningContext, type);
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
    });
}
function visitOutputType(visitedTypes, pruningContext, type) {
    if (visitedTypes[type.name]) {
        return;
    }
    visitedTypes[type.name] = true;
    pruningContext.unusedTypes[type.name] = false;
    if (graphql.isObjectType(type) || graphql.isInterfaceType(type)) {
        const fields = type.getFields();
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const namedType = graphql.getNamedType(field.type);
            visitOutputType(visitedTypes, pruningContext, namedType);
            const args = field.args;
            args.forEach(arg => {
                const type = graphql.getNamedType(arg.type);
                visitInputType(visitedTypes, pruningContext, type);
            });
        });
        if (graphql.isInterfaceType(type)) {
            const implementations = getImplementations(pruningContext, type);
            if (implementations) {
                Object.keys(implementations).forEach(typeName => {
                    visitOutputType(visitedTypes, pruningContext, pruningContext.schema.getType(typeName));
                });
            }
        }
        if ('getInterfaces' in type) {
            type.getInterfaces().forEach(type => {
                visitOutputType(visitedTypes, pruningContext, type);
            });
        }
    }
    else if (graphql.isUnionType(type)) {
        const types = type.getTypes();
        types.forEach(type => visitOutputType(visitedTypes, pruningContext, type));
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
    if (graphql.isInputObjectType(type)) {
        const fields = type.getFields();
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const namedType = graphql.getNamedType(field.type);
            visitInputType(visitedTypes, pruningContext, namedType);
        });
    }
}
function visitTypes(pruningContext, schema) {
    Object.keys(schema.getTypeMap()).forEach(typeName => {
        if (!typeName.startsWith('__')) {
            pruningContext.unusedTypes[typeName] = true;
        }
    });
    const visitedTypes = Object.create(null);
    const rootTypes = [schema.getQueryType(), schema.getMutationType(), schema.getSubscriptionType()].filter(type => type != null);
    rootTypes.forEach(rootType => visitOutputType(visitedTypes, pruningContext, rootType));
    schema.getDirectives().forEach(directive => {
        directive.args.forEach(arg => {
            const type = graphql.getNamedType(arg.type);
            visitInputType(visitedTypes, pruningContext, type);
        });
    });
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function mergeDeep(target, ...sources) {
    if (graphql.isScalarType(target)) {
        return target;
    }
    const output = {
        ...target,
    };
    for (const source of sources) {
        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    }
                    else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                }
                else {
                    Object.assign(output, { [key]: source[key] });
                }
            }
        }
    }
    return output;
}
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

function parseSelectionSet(selectionSet, options) {
    const query = graphql.parse(selectionSet, options).definitions[0];
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
    if (schema.getType(typeName) == null) {
        return addTypes(schema, [
            new graphql.GraphQLObjectType({
                name: typeName,
                fields: additionalFields,
            }),
        ]);
    }
    return mapSchema(schema, {
        [exports.MapperKind.OBJECT_TYPE]: type => {
            if (type.name === typeName) {
                const config = type.toConfig();
                const originalFieldConfigMap = config.fields;
                const newFieldConfigMap = {};
                Object.keys(originalFieldConfigMap).forEach(fieldName => {
                    newFieldConfigMap[fieldName] = originalFieldConfigMap[fieldName];
                });
                Object.keys(additionalFields).forEach(fieldName => {
                    newFieldConfigMap[fieldName] = additionalFields[fieldName];
                });
                return correctASTNodes(new graphql.GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
        },
    });
}
function removeObjectFields(schema, typeName, testFn) {
    const removedFields = {};
    const newSchema = mapSchema(schema, {
        [exports.MapperKind.OBJECT_TYPE]: type => {
            if (type.name === typeName) {
                const config = type.toConfig();
                const originalFieldConfigMap = config.fields;
                const newFieldConfigMap = {};
                Object.keys(originalFieldConfigMap).forEach(fieldName => {
                    const originalFieldConfig = originalFieldConfigMap[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        removedFields[fieldName] = originalFieldConfig;
                    }
                    else {
                        newFieldConfigMap[fieldName] = originalFieldConfig;
                    }
                });
                return correctASTNodes(new graphql.GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
        },
    });
    return [newSchema, removedFields];
}
function selectObjectFields(schema, typeName, testFn) {
    const selectedFields = {};
    mapSchema(schema, {
        [exports.MapperKind.OBJECT_TYPE]: type => {
            if (type.name === typeName) {
                const config = type.toConfig();
                const originalFieldConfigMap = config.fields;
                Object.keys(originalFieldConfigMap).forEach(fieldName => {
                    const originalFieldConfig = originalFieldConfigMap[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        selectedFields[fieldName] = originalFieldConfig;
                    }
                });
            }
            return undefined;
        },
    });
    return selectedFields;
}
function modifyObjectFields(schema, typeName, testFn, newFields) {
    const removedFields = {};
    const newSchema = mapSchema(schema, {
        [exports.MapperKind.OBJECT_TYPE]: type => {
            if (type.name === typeName) {
                const config = type.toConfig();
                const originalFieldConfigMap = config.fields;
                const newFieldConfigMap = {};
                Object.keys(originalFieldConfigMap).forEach(fieldName => {
                    const originalFieldConfig = originalFieldConfigMap[fieldName];
                    if (testFn(fieldName, originalFieldConfig)) {
                        removedFields[fieldName] = originalFieldConfig;
                    }
                    else {
                        newFieldConfigMap[fieldName] = originalFieldConfig;
                    }
                });
                Object.keys(newFields).forEach(fieldName => {
                    const fieldConfig = newFields[fieldName];
                    newFieldConfigMap[fieldName] = fieldConfig;
                });
                return correctASTNodes(new graphql.GraphQLObjectType({
                    ...config,
                    fields: newFieldConfigMap,
                }));
            }
        },
    });
    return [newSchema, removedFields];
}

function renameType(type, newTypeName) {
    if (graphql.isObjectType(type)) {
        return new graphql.GraphQLObjectType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    else if (graphql.isInterfaceType(type)) {
        return new graphql.GraphQLInterfaceType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    else if (graphql.isUnionType(type)) {
        return new graphql.GraphQLUnionType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    else if (graphql.isInputObjectType(type)) {
        return new graphql.GraphQLInputObjectType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    else if (graphql.isEnumType(type)) {
        return new graphql.GraphQLEnumType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    else if (graphql.isScalarType(type)) {
        return new graphql.GraphQLScalarType({
            ...type.toConfig(),
            name: newTypeName,
            astNode: type.astNode == null
                ? type.astNode
                : {
                    ...type.astNode,
                    name: {
                        ...type.astNode.name,
                        value: newTypeName,
                    },
                },
            extensionASTNodes: type.extensionASTNodes == null
                ? type.extensionASTNodes
                : type.extensionASTNodes.map(node => ({
                    ...node,
                    name: {
                        ...node.name,
                        value: newTypeName,
                    },
                })),
        });
    }
    throw new Error(`Unknown type ${type}.`);
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
    for (const selection of selectionSet.selections) {
        switch (selection.kind) {
            case graphql.Kind.FIELD: {
                if (!shouldIncludeNode(exeContext, selection)) {
                    continue;
                }
                const name = getFieldEntryKey(selection);
                if (!(name in fields)) {
                    fields[name] = [];
                }
                fields[name].push(selection);
                break;
            }
            case graphql.Kind.INLINE_FRAGMENT: {
                if (!shouldIncludeNode(exeContext, selection) ||
                    !doesFragmentConditionMatch(exeContext, selection, runtimeType)) {
                    continue;
                }
                collectFields(exeContext, runtimeType, selection.selectionSet, fields, visitedFragmentNames);
                break;
            }
            case graphql.Kind.FRAGMENT_SPREAD: {
                const fragName = selection.name.value;
                if (visitedFragmentNames[fragName] || !shouldIncludeNode(exeContext, selection)) {
                    continue;
                }
                visitedFragmentNames[fragName] = true;
                const fragment = exeContext.fragments[fragName];
                if (!fragment || !doesFragmentConditionMatch(exeContext, fragment, runtimeType)) {
                    continue;
                }
                collectFields(exeContext, runtimeType, fragment.selectionSet, fields, visitedFragmentNames);
                break;
            }
        }
    }
    return fields;
}
/**
 * Determines if a field should be included based on the @include and @skip
 * directives, where @skip has higher precedence than @include.
 */
function shouldIncludeNode(exeContext, node) {
    const skip = graphql.getDirectiveValues(graphql.GraphQLSkipDirective, node, exeContext.variableValues);
    if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
        return false;
    }
    const include = graphql.getDirectiveValues(graphql.GraphQLIncludeDirective, node, exeContext.variableValues);
    if ((include === null || include === void 0 ? void 0 : include.if) === false) {
        return false;
    }
    return true;
}
/**
 * Determines if a fragment is applicable to the given type.
 */
function doesFragmentConditionMatch(exeContext, fragment, type) {
    const typeConditionNode = fragment.typeCondition;
    if (!typeConditionNode) {
        return true;
    }
    const conditionalType = graphql.typeFromAST(exeContext.schema, typeConditionNode);
    if (conditionalType === type) {
        return true;
    }
    if (graphql.isAbstractType(conditionalType)) {
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
    let $return;
    let abruptClose;
    if (typeof iterator.return === 'function') {
        $return = iterator.return;
        abruptClose = (error) => {
            const rethrow = () => Promise.reject(error);
            return $return.call(iterator).then(rethrow, rethrow);
        };
    }
    function mapResult(result) {
        return result.done ? result : asyncMapValue(result.value, callback).then(iteratorResult, abruptClose);
    }
    let mapReject;
    if (rejectCallback) {
        // Capture rejectCallback to ensure it cannot be null.
        const reject = rejectCallback;
        mapReject = (error) => asyncMapValue(error, reject).then(iteratorResult, abruptClose);
    }
    return {
        next() {
            return iterator.next().then(mapResult, mapReject);
        },
        return() {
            return $return
                ? $return.call(iterator).then(mapResult, mapReject)
                : Promise.resolve({ value: undefined, done: true });
        },
        throw(error) {
            if (typeof iterator.throw === 'function') {
                return iterator.throw(error).then(mapResult, mapReject);
            }
            return Promise.reject(error).catch(abruptClose);
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
}
function asyncMapValue(value, callback) {
    return new Promise(resolve => resolve(callback(value)));
}
function iteratorResult(value) {
    return { value, done: false };
}

function updateArgument(argName, argType, argumentNodes, variableDefinitionsMap, variableValues, newArg) {
    let varName;
    let numGeneratedVariables = 0;
    do {
        varName = `_v${(numGeneratedVariables++).toString()}_${argName}`;
    } while (varName in variableDefinitionsMap);
    argumentNodes[argName] = {
        kind: graphql.Kind.ARGUMENT,
        name: {
            kind: graphql.Kind.NAME,
            value: argName,
        },
        value: {
            kind: graphql.Kind.VARIABLE,
            name: {
                kind: graphql.Kind.NAME,
                value: varName,
            },
        },
    };
    variableDefinitionsMap[varName] = {
        kind: graphql.Kind.VARIABLE_DEFINITION,
        variable: {
            kind: graphql.Kind.VARIABLE,
            name: {
                kind: graphql.Kind.NAME,
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
    else if (graphql.isCompositeType(typeA) && graphql.isCompositeType(typeB)) {
        return graphql.doTypesOverlap(schema, typeA, typeB);
    }
    return false;
}

function relocatedError(originalError, path) {
    return new graphql.GraphQLError(originalError.message, originalError.nodes, originalError.source, originalError.positions, path === null ? undefined : path === undefined ? originalError.path : path, originalError.originalError, originalError.extensions);
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
    const newArguments = {};
    args.forEach(arg => {
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
    const pullQueue = [];
    const pushQueue = [];
    let listening = true;
    const pushValue = (value) => {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ value, done: false });
        }
        else {
            pushQueue.push({ value, done: false });
        }
    };
    const pushError = (error) => {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ value: { errors: [error] }, done: false });
        }
        else {
            pushQueue.push({ value: { errors: [error] }, done: false });
        }
    };
    const pushDone = () => {
        if (pullQueue.length !== 0) {
            pullQueue.shift()({ done: true });
        }
        else {
            pushQueue.push({ done: true });
        }
    };
    const pullValue = () => new Promise(resolve => {
        if (pushQueue.length !== 0) {
            const element = pushQueue.shift();
            // either {value: {errors: [...]}} or {value: ...}
            resolve(element);
        }
        else {
            pullQueue.push(resolve);
        }
    });
    const subscription = observable.subscribe({
        next(value) {
            pushValue(value);
        },
        error(err) {
            pushError(err);
        },
        complete() {
            pushDone();
        },
    });
    const emptyQueue = () => {
        if (listening) {
            listening = false;
            subscription.unsubscribe();
            pullQueue.forEach(resolve => resolve({ value: undefined, done: true }));
            pullQueue.length = 0;
            pushQueue.length = 0;
        }
    };
    return {
        next() {
            return listening ? pullValue() : this.return();
        },
        return() {
            emptyQueue();
            return Promise.resolve({ value: undefined, done: true });
        },
        throw(error) {
            emptyQueue();
            return Promise.reject(error);
        },
        [Symbol.asyncIterator]() {
            return this;
        },
    };
}

function visitData(data, enter, leave) {
    if (Array.isArray(data)) {
        return data.map(value => visitData(value, enter, leave));
    }
    else if (typeof data === 'object') {
        const newData = enter != null ? enter(data) : data;
        if (newData != null) {
            Object.keys(newData).forEach(key => {
                const value = newData[key];
                newData[key] = visitData(value, enter, leave);
            });
        }
        return leave != null ? leave(newData) : newData;
    }
    return data;
}
function visitErrors(errors, visitor) {
    return errors.map(error => visitor(error));
}
function visitResult(result, request, schema, resultVisitorMap, errorVisitorMap) {
    const partialExecutionContext = {
        schema,
        fragments: request.document.definitions.reduce((acc, def) => {
            if (def.kind === graphql.Kind.FRAGMENT_DEFINITION) {
                acc[def.name.value] = def;
            }
            return acc;
        }, {}),
        variableValues: request.variables,
    };
    const errorInfo = {
        segmentInfoMap: new Map(),
        unpathedErrors: new Set(),
    };
    const data = result.data;
    const errors = result.errors;
    const visitingErrors = errors != null && errorVisitorMap != null;
    if (data != null) {
        result.data = visitRoot(data, graphql.getOperationAST(request.document, undefined), partialExecutionContext, resultVisitorMap, visitingErrors ? errors : undefined, errorInfo);
    }
    if (visitingErrors) {
        result.errors = visitErrorsByType(errors, errorVisitorMap, errorInfo);
    }
    return result;
}
function visitErrorsByType(errors, errorVisitorMap, errorInfo) {
    const segmentInfoMap = errorInfo.segmentInfoMap;
    const unpathedErrors = errorInfo.unpathedErrors;
    const unpathedErrorVisitor = errorVisitorMap['__unpathed'];
    return errors.map(originalError => {
        const pathSegmentsInfo = segmentInfoMap.get(originalError);
        const newError = pathSegmentsInfo == null
            ? originalError
            : pathSegmentsInfo.reduceRight((acc, segmentInfo) => {
                const typeName = segmentInfo.type.name;
                const typeVisitorMap = errorVisitorMap[typeName];
                if (typeVisitorMap == null) {
                    return acc;
                }
                const errorVisitor = typeVisitorMap[segmentInfo.fieldName];
                return errorVisitor == null ? acc : errorVisitor(acc, segmentInfo.pathIndex);
            }, originalError);
        if (unpathedErrorVisitor && unpathedErrors.has(originalError)) {
            return unpathedErrorVisitor(newError);
        }
        return newError;
    });
}
function visitRoot(root, operation, exeContext, resultVisitorMap, errors, errorInfo) {
    const operationRootType = graphql.getOperationRootType(exeContext.schema, operation);
    const collectedFields = collectFields(exeContext, operationRootType, operation.selectionSet, Object.create(null), Object.create(null));
    return visitObjectValue(root, operationRootType, collectedFields, exeContext, resultVisitorMap, 0, errors, errorInfo);
}
function visitObjectValue(object, type, fieldNodeMap, exeContext, resultVisitorMap, pathIndex, errors, errorInfo) {
    const fieldMap = type.getFields();
    const typeVisitorMap = resultVisitorMap === null || resultVisitorMap === void 0 ? void 0 : resultVisitorMap[type.name];
    const enterObject = typeVisitorMap === null || typeVisitorMap === void 0 ? void 0 : typeVisitorMap.__enter;
    const newObject = enterObject != null ? enterObject(object) : object;
    let sortedErrors;
    let errorMap;
    if (errors != null) {
        sortedErrors = sortErrorsByPathSegment(errors, pathIndex);
        errorMap = sortedErrors.errorMap;
        sortedErrors.unpathedErrors.forEach(error => errorInfo.unpathedErrors.add(error));
    }
    Object.keys(fieldNodeMap).forEach(responseKey => {
        const subFieldNodes = fieldNodeMap[responseKey];
        const fieldName = subFieldNodes[0].name.value;
        const fieldType = fieldName === '__typename' ? graphql.TypeNameMetaFieldDef.type : fieldMap[fieldName].type;
        const newPathIndex = pathIndex + 1;
        let fieldErrors;
        if (errors != null) {
            fieldErrors = errorMap[responseKey];
            if (fieldErrors != null) {
                delete errorMap[responseKey];
            }
            addPathSegmentInfo(type, fieldName, newPathIndex, fieldErrors, errorInfo);
        }
        const newValue = visitFieldValue(object[responseKey], fieldType, subFieldNodes, exeContext, resultVisitorMap, newPathIndex, fieldErrors, errorInfo);
        updateObject(newObject, responseKey, newValue, typeVisitorMap, fieldName);
    });
    const oldTypename = newObject.__typename;
    if (oldTypename != null) {
        updateObject(newObject, '__typename', oldTypename, typeVisitorMap, '__typename');
    }
    if (errors != null) {
        Object.keys(errorMap).forEach(unknownResponseKey => {
            errorMap[unknownResponseKey].forEach(error => errorInfo.unpathedErrors.add(error));
        });
    }
    const leaveObject = typeVisitorMap === null || typeVisitorMap === void 0 ? void 0 : typeVisitorMap.__leave;
    return leaveObject != null ? leaveObject(newObject) : newObject;
}
function updateObject(object, responseKey, newValue, typeVisitorMap, fieldName) {
    if (typeVisitorMap == null) {
        object[responseKey] = newValue;
        return;
    }
    const fieldVisitor = typeVisitorMap[fieldName];
    if (fieldVisitor == null) {
        object[responseKey] = newValue;
        return;
    }
    const visitedValue = fieldVisitor(newValue);
    if (visitedValue === undefined) {
        delete object[responseKey];
        return;
    }
    object[responseKey] = visitedValue;
}
function visitListValue(list, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors, errorInfo) {
    return list.map(listMember => visitFieldValue(listMember, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex + 1, errors, errorInfo));
}
function visitFieldValue(value, returnType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors = [], errorInfo) {
    if (value == null) {
        return value;
    }
    const nullableType = graphql.getNullableType(returnType);
    if (graphql.isListType(nullableType)) {
        return visitListValue(value, nullableType.ofType, fieldNodes, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    else if (graphql.isAbstractType(nullableType)) {
        const finalType = exeContext.schema.getType(value.__typename);
        const collectedFields = collectSubFields(exeContext, finalType, fieldNodes);
        return visitObjectValue(value, finalType, collectedFields, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    else if (graphql.isObjectType(nullableType)) {
        const collectedFields = collectSubFields(exeContext, nullableType, fieldNodes);
        return visitObjectValue(value, nullableType, collectedFields, exeContext, resultVisitorMap, pathIndex, errors, errorInfo);
    }
    const typeVisitorMap = resultVisitorMap === null || resultVisitorMap === void 0 ? void 0 : resultVisitorMap[nullableType.name];
    if (typeVisitorMap == null) {
        return value;
    }
    const visitedValue = typeVisitorMap(value);
    return visitedValue === undefined ? value : visitedValue;
}
function sortErrorsByPathSegment(errors, pathIndex) {
    const errorMap = Object.create(null);
    const unpathedErrors = new Set();
    errors.forEach(error => {
        var _a;
        const pathSegment = (_a = error.path) === null || _a === void 0 ? void 0 : _a[pathIndex];
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
        errorMap,
        unpathedErrors,
    };
}
function addPathSegmentInfo(type, fieldName, pathIndex, errors = [], errorInfo) {
    errors.forEach(error => {
        const segmentInfo = {
            type,
            fieldName,
            pathIndex,
        };
        const pathSegmentsInfo = errorInfo.segmentInfoMap.get(error);
        if (pathSegmentsInfo == null) {
            errorInfo.segmentInfoMap.set(error, [segmentInfo]);
        }
        else {
            pathSegmentsInfo.push(segmentInfo);
        }
    });
}
function collectSubFields(exeContext, type, fieldNodes) {
    let subFieldNodes = Object.create(null);
    const visitedFragmentNames = Object.create(null);
    fieldNodes.forEach(fieldNode => {
        subFieldNodes = collectFields(exeContext, type, fieldNode.selectionSet, subFieldNodes, visitedFragmentNames);
    });
    return subFieldNodes;
}

function valueMatchesCriteria(value, criteria) {
    if (value == null) {
        return value === criteria;
    }
    else if (Array.isArray(value)) {
        return Array.isArray(criteria) && value.every((val, index) => valueMatchesCriteria(val, criteria[index]));
    }
    else if (typeof value === 'object') {
        return (typeof criteria === 'object' &&
            criteria &&
            Object.keys(criteria).every(propertyName => valueMatchesCriteria(value[propertyName], criteria[propertyName])));
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
    return object && typeof object === 'object' && 'kind' in object && object.kind === graphql.Kind.DOCUMENT;
}

function withCancel(asyncIteratorLike, onCancel) {
    const asyncIterator = asyncIteratorLike[Symbol.asyncIterator]();
    if (!asyncIterator.return) {
        asyncIterator.return = () => Promise.resolve({ value: undefined, done: true });
    }
    const savedReturn = asyncIterator.return.bind(asyncIterator);
    asyncIterator.return = () => {
        onCancel();
        return savedReturn();
    };
    return asyncIterator;
}

exports.SchemaDirectiveVisitor = SchemaDirectiveVisitor;
exports.SchemaVisitor = SchemaVisitor;
exports.addTypes = addTypes;
exports.appendObjectFields = appendObjectFields;
exports.argsToFieldConfigArgumentMap = argsToFieldConfigArgumentMap;
exports.argumentToArgumentConfig = argumentToArgumentConfig;
exports.asArray = asArray;
exports.astFromArg = astFromArg;
exports.astFromDirective = astFromDirective;
exports.astFromEnumType = astFromEnumType;
exports.astFromEnumValue = astFromEnumValue;
exports.astFromField = astFromField;
exports.astFromInputField = astFromInputField;
exports.astFromInputObjectType = astFromInputObjectType;
exports.astFromInterfaceType = astFromInterfaceType;
exports.astFromObjectType = astFromObjectType;
exports.astFromScalarType = astFromScalarType;
exports.astFromSchema = astFromSchema;
exports.astFromUnionType = astFromUnionType;
exports.astFromValueUntyped = astFromValueUntyped;
exports.buildOperationNodeForField = buildOperationNodeForField;
exports.checkValidationErrors = checkValidationErrors;
exports.cloneDirective = cloneDirective;
exports.cloneSchema = cloneSchema;
exports.cloneType = cloneType;
exports.collectFields = collectFields;
exports.compareNodes = compareNodes;
exports.compareStrings = compareStrings;
exports.correctASTNodes = correctASTNodes;
exports.createNamedStub = createNamedStub;
exports.createSchemaDefinition = createSchemaDefinition;
exports.createStub = createStub;
exports.debugLog = debugLog;
exports.fieldToFieldConfig = fieldToFieldConfig;
exports.filterSchema = filterSchema;
exports.fixSchemaAst = fixSchemaAst;
exports.fixWindowsPath = fixWindowsPath;
exports.flattenArray = flattenArray;
exports.forEachDefaultValue = forEachDefaultValue;
exports.forEachField = forEachField;
exports.getArgumentValues = getArgumentValues;
exports.getBuiltInForStub = getBuiltInForStub;
exports.getDeprecatableDirectiveNodes = getDeprecatableDirectiveNodes;
exports.getDirectiveNodes = getDirectiveNodes;
exports.getDirectives = getDirectives;
exports.getDirectivesInExtensions = getDirectivesInExtensions;
exports.getDocumentNodeFromSchema = getDocumentNodeFromSchema;
exports.getFieldsWithDirectives = getFieldsWithDirectives;
exports.getImplementingTypes = getImplementingTypes;
exports.getLeadingCommentBlock = getLeadingCommentBlock;
exports.getResolversFromSchema = getResolversFromSchema;
exports.getResponseKeyFromInfo = getResponseKeyFromInfo;
exports.getUserTypesFromSchema = getUserTypesFromSchema;
exports.healSchema = healSchema;
exports.healTypes = healTypes;
exports.implementsAbstractType = implementsAbstractType;
exports.inputFieldToFieldConfig = inputFieldToFieldConfig;
exports.isAsyncIterable = isAsyncIterable;
exports.isDescribable = isDescribable;
exports.isDocumentNode = isDocumentNode;
exports.isDocumentString = isDocumentString;
exports.isEqual = isEqual;
exports.isNamedStub = isNamedStub;
exports.isNotEqual = isNotEqual;
exports.isValidPath = isValidPath;
exports.makeDeprecatedDirective = makeDeprecatedDirective;
exports.makeDirectiveNode = makeDirectiveNode;
exports.makeDirectiveNodes = makeDirectiveNodes;
exports.mapAsyncIterator = mapAsyncIterator;
exports.mapSchema = mapSchema;
exports.mergeDeep = mergeDeep;
exports.modifyObjectFields = modifyObjectFields;
exports.nodeToString = nodeToString;
exports.observableToAsyncIterable = observableToAsyncIterable;
exports.parseGraphQLJSON = parseGraphQLJSON;
exports.parseGraphQLSDL = parseGraphQLSDL;
exports.parseInputValue = parseInputValue;
exports.parseInputValueLiteral = parseInputValueLiteral;
exports.parseSelectionSet = parseSelectionSet;
exports.printSchemaWithDirectives = printSchemaWithDirectives;
exports.pruneSchema = pruneSchema;
exports.relocatedError = relocatedError;
exports.removeObjectFields = removeObjectFields;
exports.renameType = renameType;
exports.rewireTypes = rewireTypes;
exports.selectObjectFields = selectObjectFields;
exports.serializeInputValue = serializeInputValue;
exports.transformCommentsToDescriptions = transformCommentsToDescriptions;
exports.transformInputValue = transformInputValue;
exports.updateArgument = updateArgument;
exports.validateGraphQlDocuments = validateGraphQlDocuments;
exports.valueMatchesCriteria = valueMatchesCriteria;
exports.visitData = visitData;
exports.visitErrors = visitErrors;
exports.visitResult = visitResult;
exports.visitSchema = visitSchema;
exports.withCancel = withCancel;
//# sourceMappingURL=index.cjs.js.map
