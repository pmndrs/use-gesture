"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printSchemaComposer = printSchemaComposer;
exports.printSchema = printSchema;
exports.printIntrospectionSchema = printIntrospectionSchema;
exports.isDefinedType = isDefinedType;
exports.printFilteredSchema = printFilteredSchema;
exports.printSchemaDefinition = printSchemaDefinition;
exports.isSchemaOfCommonNames = isSchemaOfCommonNames;
exports.printType = printType;
exports.printScalar = printScalar;
exports.printSpecifiedByUrl = printSpecifiedByUrl;
exports.printImplementedInterfaces = printImplementedInterfaces;
exports.printObject = printObject;
exports.printInterface = printInterface;
exports.printUnion = printUnion;
exports.printEnum = printEnum;
exports.printInputObject = printInputObject;
exports.printFields = printFields;
exports.printBlock = printBlock;
exports.printArgs = printArgs;
exports.printInputValue = printInputValue;
exports.printDirective = printDirective;
exports.printNodeDirectives = printNodeDirectives;
exports.printDeprecated = printDeprecated;
exports.printDescription = printDescription;
exports.printDescriptionWithComments = printDescriptionWithComments;

var _objectValues = _interopRequireDefault(require("graphql/polyfills/objectValues"));

var _inspect = _interopRequireDefault(require("graphql/jsutils/inspect"));

var _invariant = _interopRequireDefault(require("graphql/jsutils/invariant"));

var _printer = require("graphql/language/printer");

var _blockString = require("graphql/language/blockString");

var _introspection = require("graphql/type/introspection");

var _scalars = require("graphql/type/scalars");

var _directives = require("graphql/type/directives");

var _definition = require("graphql/type/definition");

var _astFromValue = require("graphql/utilities/astFromValue");

var _SchemaComposer = require("../SchemaComposer");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _InputTypeComposer = require("../InputTypeComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _UnionTypeComposer = require("../UnionTypeComposer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Return schema as a SDL string.
 */
function printSchemaComposer(sc, // SchemaComposer<any>, // HATE FLOWTYPE for *** Recursion limit exceeded ***
options) {
  const _ref = options || {},
        {
    exclude = [],
    include,
    omitDirectiveDefinitions
  } = _ref,
        innerOpts = _objectWithoutProperties(_ref, ["exclude", "include", "omitDirectiveDefinitions"]);

  const includeTypes = new Set();

  if (Array.isArray(include) && include.length) {
    include.forEach(s => {
      if (s && typeof s === 'string') {
        includeTypes.add(sc.getAnyTC(s));
      }
    });
  } else {
    if (sc.has('Query')) includeTypes.add(sc.getOTC('Query'));
    if (sc.has('Mutation')) includeTypes.add(sc.getOTC('Mutation'));
    if (sc.has('Subscription')) includeTypes.add(sc.getOTC('Subscription'));
  }

  const res = [];

  if (!omitDirectiveDefinitions) {
    const directives = sc._directives.filter(d => !_SchemaComposer.BUILT_IN_DIRECTIVES.includes(d));

    res.push(...directives.map(d => printDirective(d, innerOpts))); // directives may have specific types in arguments, so add them to includeTypes

    directives.forEach(d => {
      if (!Array.isArray(d.args)) return;
      d.args.forEach(ac => {
        const tc = sc.getAnyTC(ac.type);

        if (!exclude.includes(tc.getTypeName())) {
          includeTypes.add(tc);
        }
      });
    });
  }

  const printTypeSet = new Set();
  includeTypes.forEach(tc => {
    if (tc instanceof _ObjectTypeComposer.ObjectTypeComposer || tc instanceof _InputTypeComposer.InputTypeComposer || tc instanceof _InterfaceTypeComposer.InterfaceTypeComposer || tc instanceof _UnionTypeComposer.UnionTypeComposer) {
      printTypeSet.add(tc);
      tc.getNestedTCs({
        exclude
      }, printTypeSet);
    } else {
      printTypeSet.add(tc);
    }
  });
  const printTypes = Array.from(printTypeSet).sort((tc1, tc2) => tc1.getTypeName().localeCompare(tc2.getTypeName()));
  res.push(...printTypes.map(tc => tc.toSDL(innerOpts)));
  return res.filter(Boolean).join('\n\n');
}
/**
 * Accepts options as a second argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */


function printSchema(schema, options) {
  return printFilteredSchema(schema, n => !(0, _directives.isSpecifiedDirective)(n), isDefinedType, options);
}

function printIntrospectionSchema(schema, options) {
  return printFilteredSchema(schema, _directives.isSpecifiedDirective, _introspection.isIntrospectionType, options);
}

function isDefinedType(type) {
  return !(0, _scalars.isSpecifiedScalarType)(type) && !(0, _introspection.isIntrospectionType)(type);
}

function printFilteredSchema(schema, directiveFilter, typeFilter, options) {
  const directives = schema.getDirectives().filter(directiveFilter);
  const typeMap = schema.getTypeMap();
  const types = (0, _objectValues.default)(typeMap).sort((type1, type2) => type1.name.localeCompare(type2.name)).filter(typeFilter);
  return `${[printSchemaDefinition(schema)].concat(directives.map(directive => printDirective(directive, options)), types.map(type => printType(type, options))).filter(Boolean).join('\n\n')}\n`;
}

function printSchemaDefinition(schema) {
  if (isSchemaOfCommonNames(schema)) {
    return;
  }

  const operationTypes = [];
  const queryType = schema.getQueryType();

  if (queryType) {
    operationTypes.push(`  query: ${queryType.name}`);
  }

  const mutationType = schema.getMutationType();

  if (mutationType) {
    operationTypes.push(`  mutation: ${mutationType.name}`);
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType) {
    operationTypes.push(`  subscription: ${subscriptionType.name}`);
  }

  return `schema {\n${operationTypes.join('\n')}\n}`;
}
/**
 * GraphQL schema define root types for each type of operation. These types are
 * the same as any other type and can be named in any manner, however there is
 * a common naming convention:
 *
 *   schema {
 *     query: Query
 *     mutation: Mutation
 *   }
 *
 * When using this naming convention, the schema description can be omitted.
 */


function isSchemaOfCommonNames(schema) {
  const queryType = schema.getQueryType();

  if (queryType && queryType.name !== 'Query') {
    return false;
  }

  const mutationType = schema.getMutationType();

  if (mutationType && mutationType.name !== 'Mutation') {
    return false;
  }

  const subscriptionType = schema.getSubscriptionType();

  if (subscriptionType && subscriptionType.name !== 'Subscription') {
    return false;
  }

  return true;
}

function printType(type, options) {
  if ((0, _definition.isScalarType)(type)) {
    return printScalar(type, options);
  } else if ((0, _definition.isObjectType)(type)) {
    return printObject(type, options);
  } else if ((0, _definition.isInterfaceType)(type)) {
    return printInterface(type, options);
  } else if ((0, _definition.isUnionType)(type)) {
    return printUnion(type, options);
  } else if ((0, _definition.isEnumType)(type)) {
    return printEnum(type, options);
  } else if ((0, _definition.isInputObjectType)(type)) {
    return printInputObject(type, options);
  } // Not reachable. All possible types have been considered.


  (0, _invariant.default)(false, `Unexpected type: ${(0, _inspect.default)(type)}`);
}

function printScalar(type, options) {
  if (options !== null && options !== void 0 && options.omitScalars) return '';
  return `${printDescription(type, options)}scalar ${type.name}${printSpecifiedByUrl(type, options)}${printNodeDirectives(type.astNode)}`;
}

function printSpecifiedByUrl(type, options) {
  if (!type.specifiedByUrl || options !== null && options !== void 0 && options.omitSpecifiedByUrl) {
    return '';
  }

  const url = type.specifiedByUrl;
  const urlAST = (0, _astFromValue.astFromValue)(url, _scalars.GraphQLString);
  if (!urlAST) return '';
  return ` @specifiedBy(url: ${(0, _printer.print)(urlAST)})`;
}

function printImplementedInterfaces(type, options) {
  const interfaces = type.getInterfaces ? type.getInterfaces() : [];
  if (!interfaces.length) return '';

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortInterfaces) {
    return ` implements ${interfaces.map(i => i.name).sort().join(' & ')}`;
  }

  return ` implements ${interfaces.map(i => i.name).join(' & ')}`;
}

function printObject(type, options) {
  return `${printDescription(type, options)}type ${type.name}${printImplementedInterfaces(type, options)}${printNodeDirectives(type.astNode)}${printFields(type, options)}`;
}

function printInterface(type, options) {
  return `${printDescription(type, options)}interface ${type.name}${printImplementedInterfaces(type, options)}${printNodeDirectives(type.astNode)}${printFields(type, options)}`;
}

function printUnion(type, options) {
  let types = type.getTypes();

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortUnions) {
    types = types.sort();
  }

  const possibleTypes = types.length ? ` = ${types.join(' | ')}` : '';
  return `${printDescription(type, options)}union ${type.name}${printNodeDirectives(type.astNode)}${possibleTypes}`;
}

function printEnum(type, options) {
  let values = type.getValues();

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortEnums) {
    values = values.sort((a, b) => a.name.localeCompare(b.name));
  }

  const valuesList = values.map((value, i) => `${printDescription(value, options, '  ', !i)}  ${value.name}${printNodeDirectives(value.astNode)}${printDeprecated(value)}`);
  return `${printDescription(type, options)}enum ${type.name}${printNodeDirectives(type.astNode)}${printBlock(valuesList)}`;
}

function printInputObject(type, options) {
  let fields = (0, _objectValues.default)(type.getFields());

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortFields) {
    fields = fields.sort((a, b) => a.name.localeCompare(b.name));
  }

  const fieldsList = fields.map((f, i) => `${printDescription(f, options, '  ', !i)}  ${printInputValue(f)}`);
  return `${printDescription(type, options)}input ${type.name}${printNodeDirectives(type.astNode)}${printBlock(fieldsList)}`;
}

function printFields(type, options) {
  let fields = (0, _objectValues.default)(type.getFields());

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortFields) {
    fields = fields.sort((a, b) => a.name.localeCompare(b.name));
  }

  const fieldsList = fields.map((f, i) => `${printDescription(f, options, '  ', !i)}  ${f.name}${printArgs(f.args, options, '  ')}: ${String(f.type)}${printNodeDirectives(f.astNode)}${printDeprecated(f)}`);
  return printBlock(fieldsList);
}

function printBlock(items) {
  return items.length !== 0 ? ` {\n${items.join('\n')}\n}` : '';
}

function printArgs(_args, options, indentation = '') {
  if (_args.length === 0) {
    return '';
  }

  const args = options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortArgs ? _args.sort((a, b) => a.name.localeCompare(b.name)) : _args; // If every arg does not have a description, print them on one line.

  if (args.every(arg => !arg.description)) {
    return `(${args.map(printInputValue).join(', ')})`;
  }

  return `(\n${args.map((arg, i) => `${printDescription(arg, options, `  ${indentation}`, !i)}  ${indentation}${printInputValue(arg)}`).join('\n')}\n${indentation})`;
}

function printInputValue(arg) {
  const defaultAST = (0, _astFromValue.astFromValue)(arg.defaultValue, arg.type);
  let argDecl = `${arg.name}: ${String(arg.type)}`;

  if (defaultAST) {
    argDecl += ` = ${(0, _printer.print)(defaultAST)}`;
  }

  return `${argDecl}${printNodeDirectives(arg.astNode)}`;
}

function printDirective(directive, options) {
  return `${printDescription(directive, options)}directive @${directive.name}${printArgs(directive.args, options)}${directive.isRepeatable ? ' repeatable' : ''} on ${directive.locations.join(' | ')}`;
}

function printNodeDirectives(node) {
  if (!node || !node.directives || !node.directives.length) return '';
  return ` ${node.directives.map(d => {
    let args = '';

    if (d.arguments && d.arguments.length) {
      args = `(${d.arguments.map(a => `${a.name.value}: ${(0, _printer.print)(a.value)}`).join(', ')})`;
    }

    return `@${d.name.value}${args}`;
  }).join(' ')}`;
}

function printDeprecated(fieldOrEnumVal) {
  if (!fieldOrEnumVal.isDeprecated) {
    return '';
  }

  const reason = fieldOrEnumVal.deprecationReason;
  const reasonAST = (0, _astFromValue.astFromValue)(reason, _scalars.GraphQLString);

  if (reasonAST && reason !== _directives.DEFAULT_DEPRECATION_REASON) {
    return ` @deprecated(reason: ${(0, _printer.print)(reasonAST)})`;
  }

  return ' @deprecated';
}

function printDescription(def, options, indentation = '', firstInBlock = true) {
  const {
    description
  } = def;

  if (description == null || options !== null && options !== void 0 && options.omitDescriptions) {
    return '';
  }

  if (options && options.commentDescriptions) {
    return printDescriptionWithComments(description, indentation, firstInBlock);
  }

  const preferMultipleLines = description.length > 70;
  const blockString = (0, _blockString.printBlockString)(description, '', preferMultipleLines);
  const prefix = indentation && !firstInBlock ? `\n${indentation}` : indentation;
  return `${prefix + blockString.replace(/\n/g, `\n${indentation}`)}\n`;
}

function printDescriptionWithComments(description, indentation, firstInBlock) {
  const prefix = indentation && !firstInBlock ? '\n' : '';
  const comment = description.split('\n').map(line => indentation + (line !== '' ? `# ${line}` : '#')).join('\n');
  return `${prefix + comment}\n`;
}