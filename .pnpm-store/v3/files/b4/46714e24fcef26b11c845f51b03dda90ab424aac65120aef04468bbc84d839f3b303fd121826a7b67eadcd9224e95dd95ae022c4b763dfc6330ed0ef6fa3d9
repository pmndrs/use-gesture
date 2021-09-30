'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const tslib = require('tslib');
const graphql = require('graphql');
const valueOrPromise = require('value-or-promise');
const utils = require('@graphql-tools/utils/es5');

// wraps all resolvers of query, mutation or subscription fields
// with the provided function to simulate a root schema level resolver
function addSchemaLevelResolver(schema, fn) {
    var _a;
    // TODO test that schema is a schema, fn is a function
    var fnToRunOnlyOnce = runAtMostOncePerRequest(fn);
    return utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.ROOT_FIELD] = function (fieldConfig, _fieldName, typeName, schema) {
            // XXX this should run at most once per request to simulate a true root resolver
            // for graphql-js this is an approximation that works with queries but not mutations
            // XXX if the type is a subscription, a same query AST will be ran multiple times so we
            // deactivate here the runOnce if it's a subscription. This may not be optimal though...
            var subscription = schema.getSubscriptionType();
            if (subscription != null && subscription.name === typeName) {
                return tslib.__assign(tslib.__assign({}, fieldConfig), { resolve: wrapResolver(fieldConfig.resolve, fn) });
            }
            return tslib.__assign(tslib.__assign({}, fieldConfig), { resolve: wrapResolver(fieldConfig.resolve, fnToRunOnlyOnce) });
        },
        _a));
}
// XXX badly named function. this doesn't really wrap, it just chains resolvers...
function wrapResolver(innerResolver, outerResolver) {
    return function (obj, args, ctx, info) {
        return new valueOrPromise.ValueOrPromise(function () { return outerResolver(obj, args, ctx, info); })
            .then(function (root) {
            if (innerResolver != null) {
                return innerResolver(root, args, ctx, info);
            }
            return graphql.defaultFieldResolver(root, args, ctx, info);
        })
            .resolve();
    };
}
// XXX this function only works for resolvers
// XXX very hacky way to remember if the function
// already ran for this request. This will only work
// if people don't actually cache the operation.
// if they do cache the operation, they will have to
// manually remove the __runAtMostOnce before every request.
function runAtMostOncePerRequest(fn) {
    var value;
    var randomNumber = Math.random();
    return function (root, args, ctx, info) {
        if (!info.operation['__runAtMostOnce']) {
            info.operation['__runAtMostOnce'] = {};
        }
        if (!info.operation['__runAtMostOnce'][randomNumber]) {
            info.operation['__runAtMostOnce'][randomNumber] = true;
            value = fn(root, args, ctx, info);
        }
        return value;
    };
}

function assertResolversPresent(schema, resolverValidationOptions) {
    if (resolverValidationOptions === void 0) { resolverValidationOptions = {}; }
    var requireResolversForArgs = resolverValidationOptions.requireResolversForArgs, requireResolversForNonScalar = resolverValidationOptions.requireResolversForNonScalar, requireResolversForAllFields = resolverValidationOptions.requireResolversForAllFields;
    if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
        throw new TypeError('requireResolversForAllFields takes precedence over the more specific assertions. ' +
            'Please configure either requireResolversForAllFields or requireResolversForArgs / ' +
            'requireResolversForNonScalar, but not a combination of them.');
    }
    utils.forEachField(schema, function (field, typeName, fieldName) {
        // requires a resolver for *every* field.
        if (requireResolversForAllFields) {
            expectResolver('requireResolversForAllFields', requireResolversForAllFields, field, typeName, fieldName);
        }
        // requires a resolver on every field that has arguments
        if (requireResolversForArgs && field.args.length > 0) {
            expectResolver('requireResolversForArgs', requireResolversForArgs, field, typeName, fieldName);
        }
        // requires a resolver on every field that returns a non-scalar type
        if (requireResolversForNonScalar !== 'ignore' && !graphql.isScalarType(graphql.getNamedType(field.type))) {
            expectResolver('requireResolversForNonScalar', requireResolversForNonScalar, field, typeName, fieldName);
        }
    });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
    if (!field.resolve) {
        var message = "Resolver missing for \"" + typeName + "." + fieldName + "\".\nTo disable this validator, use:\n  resolverValidationOptions: {\n    " + validator + ": 'ignore'\n  }";
        if (behavior === 'error') {
            throw new Error(message);
        }
        if (behavior === 'warn') {
            // eslint-disable-next-line no-console
            console.warn(message);
        }
        return;
    }
    if (typeof field.resolve !== 'function') {
        throw new Error("Resolver \"" + typeName + "." + fieldName + "\" must be a function");
    }
}

function attachDirectiveResolvers(schema, directiveResolvers) {
    var _a;
    if (typeof directiveResolvers !== 'object') {
        throw new Error("Expected directiveResolvers to be of type object, got " + typeof directiveResolvers);
    }
    if (Array.isArray(directiveResolvers)) {
        throw new Error('Expected directiveResolvers to be of type object, got Array');
    }
    return utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.OBJECT_FIELD] = function (fieldConfig) {
            var newFieldConfig = tslib.__assign({}, fieldConfig);
            var directives = utils.getDirectives(schema, fieldConfig);
            Object.keys(directives).forEach(function (directiveName) {
                if (directiveResolvers[directiveName]) {
                    var resolver_1 = directiveResolvers[directiveName];
                    var originalResolver_1 = newFieldConfig.resolve != null ? newFieldConfig.resolve : graphql.defaultFieldResolver;
                    var directiveArgs_1 = directives[directiveName];
                    newFieldConfig.resolve = function (source, originalArgs, context, info) {
                        return resolver_1(function () {
                            return new Promise(function (resolve, reject) {
                                var result = originalResolver_1(source, originalArgs, context, info);
                                if (result instanceof Error) {
                                    reject(result);
                                }
                                resolve(result);
                            });
                        }, source, directiveArgs_1, context, info);
                    };
                }
            });
            return newFieldConfig;
        },
        _a));
}

var isExtensionNode = function (def) {
    return def.kind === graphql.Kind.OBJECT_TYPE_EXTENSION ||
        def.kind === graphql.Kind.INTERFACE_TYPE_EXTENSION ||
        def.kind === graphql.Kind.INPUT_OBJECT_TYPE_EXTENSION ||
        def.kind === graphql.Kind.UNION_TYPE_EXTENSION ||
        def.kind === graphql.Kind.ENUM_TYPE_EXTENSION ||
        def.kind === graphql.Kind.SCALAR_TYPE_EXTENSION ||
        def.kind === graphql.Kind.SCHEMA_EXTENSION;
};
function filterAndExtractExtensionDefinitions(ast) {
    var extensionDefs = [];
    var typesDefs = [];
    ast.definitions.forEach(function (def) {
        if (isExtensionNode(def)) {
            extensionDefs.push(def);
        }
        else {
            typesDefs.push(def);
        }
    });
    return {
        typesAst: tslib.__assign(tslib.__assign({}, ast), { definitions: typesDefs }),
        extensionsAst: tslib.__assign(tslib.__assign({}, ast), { definitions: extensionDefs }),
    };
}
function filterExtensionDefinitions(ast) {
    var typesAst = filterAndExtractExtensionDefinitions(ast).typesAst;
    return typesAst;
}
function extractExtensionDefinitions(ast) {
    var extensionsAst = filterAndExtractExtensionDefinitions(ast).extensionsAst;
    return extensionsAst;
}

function concatenateTypeDefs(typeDefinitionsAry, calledFunctionRefs) {
    if (calledFunctionRefs === void 0) { calledFunctionRefs = new Set(); }
    var resolvedTypeDefinitions = new Set();
    typeDefinitionsAry.forEach(function (typeDef) {
        if (typeof typeDef === 'function') {
            if (!calledFunctionRefs.has(typeDef)) {
                calledFunctionRefs.add(typeDef);
                resolvedTypeDefinitions.add(concatenateTypeDefs(typeDef(), calledFunctionRefs));
            }
        }
        else if (typeof typeDef === 'string') {
            resolvedTypeDefinitions.add(typeDef.trim());
        }
        else if (typeDef.kind !== undefined) {
            resolvedTypeDefinitions.add(graphql.print(typeDef).trim());
        }
        else {
            var type = typeof typeDef;
            throw new Error("typeDef array must contain only strings, documents, or functions, got " + type);
        }
    });
    return tslib.__spreadArray([], tslib.__read(resolvedTypeDefinitions)).join('\n');
}

function buildSchemaFromTypeDefinitions(typeDefinitions, parseOptions, noExtensionExtraction) {
    var document = buildDocumentFromTypeDefinitions(typeDefinitions, parseOptions);
    if (noExtensionExtraction) {
        return graphql.buildASTSchema(document);
    }
    var _a = filterAndExtractExtensionDefinitions(document), typesAst = _a.typesAst, extensionsAst = _a.extensionsAst;
    var backcompatOptions = { commentDescriptions: true };
    var schema = graphql.buildASTSchema(typesAst, backcompatOptions);
    if (extensionsAst.definitions.length > 0) {
        schema = graphql.extendSchema(schema, extensionsAst, backcompatOptions);
    }
    return schema;
}
function buildDocumentFromTypeDefinitions(typeDefinitions, parseOptions) {
    var document;
    if (typeof typeDefinitions === 'string') {
        document = utils.parseGraphQLSDL('', typeDefinitions, parseOptions).document;
    }
    else if (Array.isArray(typeDefinitions)) {
        document = utils.parseGraphQLSDL('', concatenateTypeDefs(typeDefinitions), parseOptions).document;
    }
    else if (utils.isDocumentNode(typeDefinitions)) {
        document = typeDefinitions;
    }
    else {
        var type = typeof typeDefinitions;
        throw new Error("typeDefs must be a string, array or schema AST, got " + type);
    }
    return document;
}

function chainResolvers(resolvers) {
    return function (root, args, ctx, info) {
        return resolvers.reduce(function (prev, curResolver) {
            if (curResolver != null) {
                return curResolver(prev, args, ctx, info);
            }
            return graphql.defaultFieldResolver(prev, args, ctx, info);
        }, root);
    };
}

/*
 * fn: The function to decorate with the logger
 * logger: an object instance of type Logger
 * hint: an optional hint to add to the error's message
 */
function decorateWithLogger(fn, logger, hint) {
    var resolver = fn != null ? fn : graphql.defaultFieldResolver;
    var logError = function (e) {
        // TODO: clone the error properly
        var newE = new Error();
        newE.stack = e.stack;
        /* istanbul ignore else: always get the hint from addErrorLoggingToSchema */
        if (hint) {
            newE['originalMessage'] = e.message;
            newE.message = "Error in resolver " + hint + "\n" + e.message;
        }
        logger.log(newE);
    };
    return function (root, args, ctx, info) {
        try {
            var result = resolver(root, args, ctx, info);
            // If the resolver returns a Promise log any Promise rejects.
            if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                result.catch(function (reason) {
                    // make sure that it's an error we're logging.
                    var error = reason instanceof Error ? reason : new Error(reason);
                    logError(error);
                    // We don't want to leave an unhandled exception so pass on error.
                    return reason;
                });
            }
            return result;
        }
        catch (e) {
            logError(e);
            // we want to pass on the error, just in case.
            throw e;
        }
    };
}

// If we have any union or interface types throw if no there is no resolveType resolver
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
    var _a;
    utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.ABSTRACT_TYPE] = function (type) {
            if (!type.resolveType) {
                var message = "Type \"" + type.name + "\" is missing a \"__resolveType\" resolver. Pass 'ignore' into " +
                    '"resolverValidationOptions.requireResolversForResolveType" to disable this error.';
                if (requireResolversForResolveType === 'error') {
                    throw new Error(message);
                }
                if (requireResolversForResolveType === 'warn') {
                    // eslint-disable-next-line no-console
                    console.warn(message);
                }
            }
            return undefined;
        },
        _a));
}

function extendResolversFromInterfaces(schema, resolvers) {
    var typeNames = Object.keys(tslib.__assign(tslib.__assign({}, schema.getTypeMap()), resolvers));
    var extendedResolvers = {};
    typeNames.forEach(function (typeName) {
        var type = schema.getType(typeName);
        if (type && 'getInterfaces' in type) {
            var allInterfaceResolvers = type
                .getInterfaces()
                .map(function (iFace) { return resolvers[iFace.name]; })
                .filter(function (interfaceResolvers) { return interfaceResolvers != null; });
            extendedResolvers[typeName] = {};
            allInterfaceResolvers.forEach(function (interfaceResolvers) {
                Object.keys(interfaceResolvers).forEach(function (fieldName) {
                    if (fieldName === '__isTypeOf' || !fieldName.startsWith('__')) {
                        extendedResolvers[typeName][fieldName] = interfaceResolvers[fieldName];
                    }
                });
            });
            var typeResolvers = resolvers[typeName];
            extendedResolvers[typeName] = tslib.__assign(tslib.__assign({}, extendedResolvers[typeName]), typeResolvers);
        }
        else {
            var typeResolvers = resolvers[typeName];
            if (typeResolvers != null) {
                extendedResolvers[typeName] = typeResolvers;
            }
        }
    });
    return extendedResolvers;
}

function addResolversToSchema(schemaOrOptions, legacyInputResolvers, legacyInputValidationOptions) {
    var options = graphql.isSchema(schemaOrOptions)
        ? {
            schema: schemaOrOptions,
            resolvers: legacyInputResolvers,
            resolverValidationOptions: legacyInputValidationOptions,
        }
        : schemaOrOptions;
    var schema = options.schema, inputResolvers = options.resolvers, defaultFieldResolver = options.defaultFieldResolver, _a = options.resolverValidationOptions, resolverValidationOptions = _a === void 0 ? {} : _a, _b = options.inheritResolversFromInterfaces, inheritResolversFromInterfaces = _b === void 0 ? false : _b, _c = options.updateResolversInPlace, updateResolversInPlace = _c === void 0 ? false : _c;
    var _d = resolverValidationOptions.requireResolversToMatchSchema, requireResolversToMatchSchema = _d === void 0 ? 'error' : _d, requireResolversForResolveType = resolverValidationOptions.requireResolversForResolveType;
    var resolvers = inheritResolversFromInterfaces
        ? extendResolversFromInterfaces(schema, inputResolvers)
        : inputResolvers;
    Object.keys(resolvers).forEach(function (typeName) {
        var resolverValue = resolvers[typeName];
        var resolverType = typeof resolverValue;
        if (typeName === '__schema') {
            if (resolverType !== 'function') {
                throw new Error("\"" + typeName + "\" defined in resolvers, but has invalid value \"" + resolverValue + "\". A schema resolver's value must be of type object or function.");
            }
        }
        else {
            if (resolverType !== 'object') {
                throw new Error("\"" + typeName + "\" defined in resolvers, but has invalid value \"" + resolverValue + "\". The resolver's value must be of type object.");
            }
            var type_1 = schema.getType(typeName);
            if (type_1 == null) {
                if (requireResolversToMatchSchema === 'ignore') {
                    return;
                }
                throw new Error("\"" + typeName + "\" defined in resolvers, but not in schema");
            }
            else if (graphql.isSpecifiedScalarType(type_1)) {
                // allow -- without recommending -- overriding of specified scalar types
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        type_1[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                    else {
                        type_1[fieldName] = resolverValue[fieldName];
                    }
                });
            }
            else if (graphql.isEnumType(type_1)) {
                var values_1 = type_1.getValues();
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (!fieldName.startsWith('__') &&
                        !values_1.some(function (value) { return value.name === fieldName; }) &&
                        requireResolversToMatchSchema &&
                        requireResolversToMatchSchema !== 'ignore') {
                        throw new Error(type_1.name + "." + fieldName + " was defined in resolvers, but not present within " + type_1.name);
                    }
                });
            }
            else if (graphql.isUnionType(type_1)) {
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (!fieldName.startsWith('__') &&
                        requireResolversToMatchSchema &&
                        requireResolversToMatchSchema !== 'ignore') {
                        throw new Error(type_1.name + "." + fieldName + " was defined in resolvers, but " + type_1.name + " is not an object or interface type");
                    }
                });
            }
            else if (graphql.isObjectType(type_1) || graphql.isInterfaceType(type_1)) {
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (!fieldName.startsWith('__')) {
                        var fields = type_1.getFields();
                        var field = fields[fieldName];
                        if (field == null && requireResolversToMatchSchema && requireResolversToMatchSchema !== 'ignore') {
                            throw new Error(typeName + "." + fieldName + " defined in resolvers, but not in schema");
                        }
                        var fieldResolve = resolverValue[fieldName];
                        if (typeof fieldResolve !== 'function' && typeof fieldResolve !== 'object') {
                            throw new Error("Resolver " + typeName + "." + fieldName + " must be object or function");
                        }
                    }
                });
            }
        }
    });
    schema = updateResolversInPlace
        ? addResolversToExistingSchema(schema, resolvers, defaultFieldResolver)
        : createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver);
    if (requireResolversForResolveType || requireResolversForResolveType !== 'ignore') {
        checkForResolveTypeResolver(schema, requireResolversForResolveType);
    }
    return schema;
}
function addResolversToExistingSchema(schema, resolvers, defaultFieldResolver) {
    var typeMap = schema.getTypeMap();
    Object.keys(resolvers).forEach(function (typeName) {
        if (typeName !== '__schema') {
            var type_2 = schema.getType(typeName);
            var resolverValue_1 = resolvers[typeName];
            if (graphql.isScalarType(type_2)) {
                Object.keys(resolverValue_1).forEach(function (fieldName) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    if (fieldName.startsWith('__')) {
                        type_2[fieldName.substring(2)] = resolverValue_1[fieldName];
                    }
                    else if (fieldName === 'astNode' && type_2.astNode != null) {
                        type_2.astNode = tslib.__assign(tslib.__assign({}, type_2.astNode), { description: (_c = (_b = (_a = resolverValue_1) === null || _a === void 0 ? void 0 : _a.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : type_2.astNode.description, directives: ((_d = type_2.astNode.directives) !== null && _d !== void 0 ? _d : []).concat((_g = (_f = (_e = resolverValue_1) === null || _e === void 0 ? void 0 : _e.astNode) === null || _f === void 0 ? void 0 : _f.directives) !== null && _g !== void 0 ? _g : []) });
                    }
                    else if (fieldName === 'extensionASTNodes' && type_2.extensionASTNodes != null) {
                        type_2.extensionASTNodes = ((_h = []) !== null && _h !== void 0 ? _h : type_2.extensionASTNodes).concat((_k = (_j = resolverValue_1) === null || _j === void 0 ? void 0 : _j.extensionASTNodes) !== null && _k !== void 0 ? _k : []);
                    }
                    else if (fieldName === 'extensions' &&
                        type_2.extensions != null &&
                        resolverValue_1.extensions != null) {
                        type_2.extensions = Object.assign({}, type_2.extensions, resolverValue_1.extensions);
                    }
                    else {
                        type_2[fieldName] = resolverValue_1[fieldName];
                    }
                });
            }
            else if (graphql.isEnumType(type_2)) {
                var config_1 = type_2.toConfig();
                var enumValueConfigMap_1 = config_1.values;
                Object.keys(resolverValue_1).forEach(function (fieldName) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    if (fieldName.startsWith('__')) {
                        config_1[fieldName.substring(2)] = resolverValue_1[fieldName];
                    }
                    else if (fieldName === 'astNode' && config_1.astNode != null) {
                        config_1.astNode = tslib.__assign(tslib.__assign({}, config_1.astNode), { description: (_c = (_b = (_a = resolverValue_1) === null || _a === void 0 ? void 0 : _a.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : config_1.astNode.description, directives: ((_d = config_1.astNode.directives) !== null && _d !== void 0 ? _d : []).concat((_g = (_f = (_e = resolverValue_1) === null || _e === void 0 ? void 0 : _e.astNode) === null || _f === void 0 ? void 0 : _f.directives) !== null && _g !== void 0 ? _g : []) });
                    }
                    else if (fieldName === 'extensionASTNodes' && config_1.extensionASTNodes != null) {
                        config_1.extensionASTNodes = config_1.extensionASTNodes.concat((_j = (_h = resolverValue_1) === null || _h === void 0 ? void 0 : _h.extensionASTNodes) !== null && _j !== void 0 ? _j : []);
                    }
                    else if (fieldName === 'extensions' &&
                        type_2.extensions != null &&
                        resolverValue_1.extensions != null) {
                        type_2.extensions = Object.assign({}, type_2.extensions, resolverValue_1.extensions);
                    }
                    else if (enumValueConfigMap_1[fieldName]) {
                        enumValueConfigMap_1[fieldName].value = resolverValue_1[fieldName];
                    }
                });
                typeMap[typeName] = new graphql.GraphQLEnumType(config_1);
            }
            else if (graphql.isUnionType(type_2)) {
                Object.keys(resolverValue_1).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        type_2[fieldName.substring(2)] = resolverValue_1[fieldName];
                    }
                });
            }
            else if (graphql.isObjectType(type_2) || graphql.isInterfaceType(type_2)) {
                Object.keys(resolverValue_1).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        // this is for isTypeOf and resolveType and all the other stuff.
                        type_2[fieldName.substring(2)] = resolverValue_1[fieldName];
                        return;
                    }
                    var fields = type_2.getFields();
                    var field = fields[fieldName];
                    if (field != null) {
                        var fieldResolve = resolverValue_1[fieldName];
                        if (typeof fieldResolve === 'function') {
                            // for convenience. Allows shorter syntax in resolver definition file
                            field.resolve = fieldResolve;
                        }
                        else {
                            setFieldProperties(field, fieldResolve);
                        }
                    }
                });
            }
        }
    });
    // serialize all default values prior to healing fields with new scalar/enum types.
    utils.forEachDefaultValue(schema, utils.serializeInputValue);
    // schema may have new scalar/enum types that require healing
    utils.healSchema(schema);
    // reparse all default values with new parsing functions.
    utils.forEachDefaultValue(schema, utils.parseInputValue);
    if (defaultFieldResolver != null) {
        utils.forEachField(schema, function (field) {
            if (!field.resolve) {
                field.resolve = defaultFieldResolver;
            }
        });
    }
    return schema;
}
function createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver) {
    var _a, _b;
    schema = utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.SCALAR_TYPE] = function (type) {
            var config = type.toConfig();
            var resolverValue = resolvers[type.name];
            if (!graphql.isSpecifiedScalarType(type) && resolverValue != null) {
                Object.keys(resolverValue).forEach(function (fieldName) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                    else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = tslib.__assign(tslib.__assign({}, config.astNode), { description: (_c = (_b = (_a = resolverValue) === null || _a === void 0 ? void 0 : _a.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : config.astNode.description, directives: ((_d = config.astNode.directives) !== null && _d !== void 0 ? _d : []).concat((_g = (_f = (_e = resolverValue) === null || _e === void 0 ? void 0 : _e.astNode) === null || _f === void 0 ? void 0 : _f.directives) !== null && _g !== void 0 ? _g : []) });
                    }
                    else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat((_j = (_h = resolverValue) === null || _h === void 0 ? void 0 : _h.extensionASTNodes) !== null && _j !== void 0 ? _j : []);
                    }
                    else if (fieldName === 'extensions' &&
                        config.extensions != null &&
                        resolverValue.extensions != null) {
                        config.extensions = Object.assign({}, type.extensions, resolverValue.extensions);
                    }
                    else {
                        config[fieldName] = resolverValue[fieldName];
                    }
                });
                return new graphql.GraphQLScalarType(config);
            }
        },
        _a[utils.MapperKind.ENUM_TYPE] = function (type) {
            var resolverValue = resolvers[type.name];
            var config = type.toConfig();
            var enumValueConfigMap = config.values;
            if (resolverValue != null) {
                Object.keys(resolverValue).forEach(function (fieldName) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    if (fieldName.startsWith('__')) {
                        config[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                    else if (fieldName === 'astNode' && config.astNode != null) {
                        config.astNode = tslib.__assign(tslib.__assign({}, config.astNode), { description: (_c = (_b = (_a = resolverValue) === null || _a === void 0 ? void 0 : _a.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : config.astNode.description, directives: ((_d = config.astNode.directives) !== null && _d !== void 0 ? _d : []).concat((_g = (_f = (_e = resolverValue) === null || _e === void 0 ? void 0 : _e.astNode) === null || _f === void 0 ? void 0 : _f.directives) !== null && _g !== void 0 ? _g : []) });
                    }
                    else if (fieldName === 'extensionASTNodes' && config.extensionASTNodes != null) {
                        config.extensionASTNodes = config.extensionASTNodes.concat((_j = (_h = resolverValue) === null || _h === void 0 ? void 0 : _h.extensionASTNodes) !== null && _j !== void 0 ? _j : []);
                    }
                    else if (fieldName === 'extensions' &&
                        config.extensions != null &&
                        resolverValue.extensions != null) {
                        config.extensions = Object.assign({}, type.extensions, resolverValue.extensions);
                    }
                    else if (enumValueConfigMap[fieldName]) {
                        enumValueConfigMap[fieldName].value = resolverValue[fieldName];
                    }
                });
                return new graphql.GraphQLEnumType(config);
            }
        },
        _a[utils.MapperKind.UNION_TYPE] = function (type) {
            var resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                var config_2 = type.toConfig();
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        config_2[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                });
                return new graphql.GraphQLUnionType(config_2);
            }
        },
        _a[utils.MapperKind.OBJECT_TYPE] = function (type) {
            var resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                var config_3 = type.toConfig();
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        config_3[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                });
                return new graphql.GraphQLObjectType(config_3);
            }
        },
        _a[utils.MapperKind.INTERFACE_TYPE] = function (type) {
            var resolverValue = resolvers[type.name];
            if (resolverValue != null) {
                var config_4 = type.toConfig();
                Object.keys(resolverValue).forEach(function (fieldName) {
                    if (fieldName.startsWith('__')) {
                        config_4[fieldName.substring(2)] = resolverValue[fieldName];
                    }
                });
                return new graphql.GraphQLInterfaceType(config_4);
            }
        },
        _a[utils.MapperKind.COMPOSITE_FIELD] = function (fieldConfig, fieldName, typeName) {
            var resolverValue = resolvers[typeName];
            if (resolverValue != null) {
                var fieldResolve = resolverValue[fieldName];
                if (fieldResolve != null) {
                    var newFieldConfig = tslib.__assign({}, fieldConfig);
                    if (typeof fieldResolve === 'function') {
                        // for convenience. Allows shorter syntax in resolver definition file
                        newFieldConfig.resolve = fieldResolve;
                    }
                    else {
                        setFieldProperties(newFieldConfig, fieldResolve);
                    }
                    return newFieldConfig;
                }
            }
        },
        _a));
    if (defaultFieldResolver != null) {
        schema = utils.mapSchema(schema, (_b = {},
            _b[utils.MapperKind.OBJECT_FIELD] = function (fieldConfig) { return (tslib.__assign(tslib.__assign({}, fieldConfig), { resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver })); },
            _b));
    }
    return schema;
}
function setFieldProperties(field, propertiesObj) {
    Object.keys(propertiesObj).forEach(function (propertyName) {
        field[propertyName] = propertiesObj[propertyName];
    });
}

function addErrorLoggingToSchema(schema, logger) {
    var _a;
    if (!logger) {
        throw new Error('Must provide a logger');
    }
    if (typeof logger.log !== 'function') {
        throw new Error('Logger.log must be a function');
    }
    return utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.OBJECT_FIELD] = function (fieldConfig, fieldName, typeName) { return (tslib.__assign(tslib.__assign({}, fieldConfig), { resolve: decorateWithLogger(fieldConfig.resolve, logger, typeName + "." + fieldName) })); },
        _a));
}

function decorateToCatchUndefined(fn, hint) {
    var resolve = fn == null ? graphql.defaultFieldResolver : fn;
    return function (root, args, ctx, info) {
        var result = resolve(root, args, ctx, info);
        if (typeof result === 'undefined') {
            throw new Error("Resolver for \"" + hint + "\" returned undefined");
        }
        return result;
    };
}
function addCatchUndefinedToSchema(schema) {
    var _a;
    return utils.mapSchema(schema, (_a = {},
        _a[utils.MapperKind.OBJECT_FIELD] = function (fieldConfig, fieldName, typeName) { return (tslib.__assign(tslib.__assign({}, fieldConfig), { resolve: decorateToCatchUndefined(fieldConfig.resolve, typeName + "." + fieldName) })); },
        _a));
}

/**
 * Builds a schema from the provided type definitions and resolvers.
 *
 * The type definitions are written using Schema Definition Language (SDL). They
 * can be provided as a string, a `DocumentNode`, a function, or an array of any
 * of these. If a function is provided, it will be passed no arguments and
 * should return an array of strings or `DocumentNode`s.
 *
 * Note: You can use `graphql-tag` to not only parse a string into a
 * `DocumentNode` but also to provide additional syntax highlighting in your
 * editor (with the appropriate editor plugin).
 *
 * ```js
 * const typeDefs = gql`
 *   type Query {
 *     posts: [Post]
 *     author(id: Int!): Author
 *   }
 * `;
 * ```
 *
 * The `resolvers` object should be a map of type names to nested object, which
 * themselves map the type's fields to their appropriate resolvers.
 * See the [Resolvers](/docs/resolvers) section of the documentation for more details.
 *
 * ```js
 * const resolvers = {
 *   Query: {
 *     posts: (obj, args, ctx, info) => getAllPosts(),
 *     author: (obj, args, ctx, info) => getAuthorById(args.id)
 *   }
 * };
 * ```
 *
 * Once you've defined both the `typeDefs` and `resolvers`, you can create your
 * schema:
 *
 * ```js
 * const schema = makeExecutableSchema({
 *   typeDefs,
 *   resolvers,
 * })
 * ```
 */
function makeExecutableSchema(_a) {
    var typeDefs = _a.typeDefs, _b = _a.resolvers, resolvers = _b === void 0 ? {} : _b, logger = _a.logger, _c = _a.allowUndefinedInResolve, allowUndefinedInResolve = _c === void 0 ? true : _c, _d = _a.resolverValidationOptions, resolverValidationOptions = _d === void 0 ? {} : _d, directiveResolvers = _a.directiveResolvers, schemaDirectives = _a.schemaDirectives, userProvidedSchemaTransforms = _a.schemaTransforms, _e = _a.parseOptions, parseOptions = _e === void 0 ? {} : _e, _f = _a.inheritResolversFromInterfaces, inheritResolversFromInterfaces = _f === void 0 ? false : _f, pruningOptions = _a.pruningOptions, _g = _a.updateResolversInPlace, updateResolversInPlace = _g === void 0 ? false : _g, _h = _a.noExtensionExtraction, noExtensionExtraction = _h === void 0 ? false : _h;
    // Validate and clean up arguments
    if (typeof resolverValidationOptions !== 'object') {
        throw new Error('Expected `resolverValidationOptions` to be an object');
    }
    if (!typeDefs) {
        throw new Error('Must provide typeDefs');
    }
    // Arguments are now validated and cleaned up
    var schemaTransforms = [
        function (schema) {
            // We allow passing in an array of resolver maps, in which case we merge them
            var resolverMap = Array.isArray(resolvers) ? resolvers.reduce(utils.mergeDeep, {}) : resolvers;
            var schemaWithResolvers = addResolversToSchema({
                schema: schema,
                resolvers: resolverMap,
                resolverValidationOptions: resolverValidationOptions,
                inheritResolversFromInterfaces: inheritResolversFromInterfaces,
                updateResolversInPlace: updateResolversInPlace,
            });
            if (Object.keys(resolverValidationOptions).length > 0) {
                assertResolversPresent(schemaWithResolvers, resolverValidationOptions);
            }
            return schemaWithResolvers;
        },
    ];
    if (!allowUndefinedInResolve) {
        schemaTransforms.push(addCatchUndefinedToSchema);
    }
    if (logger != null) {
        schemaTransforms.push(function (schema) { return addErrorLoggingToSchema(schema, logger); });
    }
    if (typeof resolvers['__schema'] === 'function') {
        // TODO a bit of a hack now, better rewrite generateSchema to attach it there.
        // not doing that now, because I'd have to rewrite a lot of tests.
        schemaTransforms.push(function (schema) {
            return addSchemaLevelResolver(schema, resolvers['__schema']);
        });
    }
    if (userProvidedSchemaTransforms) {
        schemaTransforms.push(function (schema) {
            return userProvidedSchemaTransforms.reduce(function (s, schemaTransform) { return schemaTransform(s); }, schema);
        });
    }
    // directive resolvers are implemented using SchemaDirectiveVisitor.visitSchemaDirectives
    // schema visiting modifies the schema in place
    if (directiveResolvers != null) {
        schemaTransforms.push(function (schema) { return attachDirectiveResolvers(schema, directiveResolvers); });
    }
    if (schemaDirectives != null) {
        schemaTransforms.push(function (schema) {
            utils.SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);
            return schema;
        });
    }
    if (pruningOptions) {
        schemaTransforms.push(utils.pruneSchema);
    }
    var schemaFromTypeDefs = buildSchemaFromTypeDefinitions(typeDefs, parseOptions, noExtensionExtraction);
    return schemaTransforms.reduce(function (schema, schemaTransform) { return schemaTransform(schema); }, schemaFromTypeDefs);
}

exports.addCatchUndefinedToSchema = addCatchUndefinedToSchema;
exports.addErrorLoggingToSchema = addErrorLoggingToSchema;
exports.addResolversToSchema = addResolversToSchema;
exports.addSchemaLevelResolver = addSchemaLevelResolver;
exports.assertResolversPresent = assertResolversPresent;
exports.attachDirectiveResolvers = attachDirectiveResolvers;
exports.buildDocumentFromTypeDefinitions = buildDocumentFromTypeDefinitions;
exports.buildSchemaFromTypeDefinitions = buildSchemaFromTypeDefinitions;
exports.chainResolvers = chainResolvers;
exports.checkForResolveTypeResolver = checkForResolveTypeResolver;
exports.concatenateTypeDefs = concatenateTypeDefs;
exports.decorateWithLogger = decorateWithLogger;
exports.extendResolversFromInterfaces = extendResolversFromInterfaces;
exports.extractExtensionDefinitions = extractExtensionDefinitions;
exports.filterAndExtractExtensionDefinitions = filterAndExtractExtensionDefinitions;
exports.filterExtensionDefinitions = filterExtensionDefinitions;
exports.makeExecutableSchema = makeExecutableSchema;
//# sourceMappingURL=index.cjs.js.map
