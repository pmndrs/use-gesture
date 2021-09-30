function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable consistent-return */
// copied from https://github.com/graphql/graphql-js/blob/master/src/utilities/printSchema.js
// added printNodeDirectives() method
import objectValues from 'graphql/polyfills/objectValues';
import inspect from 'graphql/jsutils/inspect';
import invariant from 'graphql/jsutils/invariant';
import { print } from 'graphql/language/printer';
import { printBlockString } from 'graphql/language/blockString';
import { isIntrospectionType } from 'graphql/type/introspection';
import { GraphQLString, isSpecifiedScalarType } from 'graphql/type/scalars';
import { GraphQLDirective, DEFAULT_DEPRECATION_REASON, isSpecifiedDirective } from 'graphql/type/directives';
import { isScalarType, isObjectType, isInterfaceType, isUnionType, isEnumType, isInputObjectType } from 'graphql/type/definition';
import { astFromValue } from 'graphql/utilities/astFromValue';
import { BUILT_IN_DIRECTIVES } from '../SchemaComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';

/**
 * Return schema as a SDL string.
 */
export function printSchemaComposer(sc, // SchemaComposer<any>, // HATE FLOWTYPE for *** Recursion limit exceeded ***
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
    const directives = sc._directives.filter(d => !BUILT_IN_DIRECTIVES.includes(d));

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
    if (tc instanceof ObjectTypeComposer || tc instanceof InputTypeComposer || tc instanceof InterfaceTypeComposer || tc instanceof UnionTypeComposer) {
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

export function printSchema(schema, options) {
  return printFilteredSchema(schema, n => !isSpecifiedDirective(n), isDefinedType, options);
}
export function printIntrospectionSchema(schema, options) {
  return printFilteredSchema(schema, isSpecifiedDirective, isIntrospectionType, options);
}
export function isDefinedType(type) {
  return !isSpecifiedScalarType(type) && !isIntrospectionType(type);
}
export function printFilteredSchema(schema, directiveFilter, typeFilter, options) {
  const directives = schema.getDirectives().filter(directiveFilter);
  const typeMap = schema.getTypeMap();
  const types = objectValues(typeMap).sort((type1, type2) => type1.name.localeCompare(type2.name)).filter(typeFilter);
  return `${[printSchemaDefinition(schema)].concat(directives.map(directive => printDirective(directive, options)), types.map(type => printType(type, options))).filter(Boolean).join('\n\n')}\n`;
}
export function printSchemaDefinition(schema) {
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

export function isSchemaOfCommonNames(schema) {
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
export function printType(type, options) {
  if (isScalarType(type)) {
    return printScalar(type, options);
  } else if (isObjectType(type)) {
    return printObject(type, options);
  } else if (isInterfaceType(type)) {
    return printInterface(type, options);
  } else if (isUnionType(type)) {
    return printUnion(type, options);
  } else if (isEnumType(type)) {
    return printEnum(type, options);
  } else if (isInputObjectType(type)) {
    return printInputObject(type, options);
  } // Not reachable. All possible types have been considered.


  invariant(false, `Unexpected type: ${inspect(type)}`);
}
export function printScalar(type, options) {
  if (options !== null && options !== void 0 && options.omitScalars) return '';
  return `${printDescription(type, options)}scalar ${type.name}${printSpecifiedByUrl(type, options)}${printNodeDirectives(type.astNode)}`;
}
export function printSpecifiedByUrl(type, options) {
  if (!type.specifiedByUrl || options !== null && options !== void 0 && options.omitSpecifiedByUrl) {
    return '';
  }

  const url = type.specifiedByUrl;
  const urlAST = astFromValue(url, GraphQLString);
  if (!urlAST) return '';
  return ` @specifiedBy(url: ${print(urlAST)})`;
}
export function printImplementedInterfaces(type, options) {
  const interfaces = type.getInterfaces ? type.getInterfaces() : [];
  if (!interfaces.length) return '';

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortInterfaces) {
    return ` implements ${interfaces.map(i => i.name).sort().join(' & ')}`;
  }

  return ` implements ${interfaces.map(i => i.name).join(' & ')}`;
}
export function printObject(type, options) {
  return `${printDescription(type, options)}type ${type.name}${printImplementedInterfaces(type, options)}${printNodeDirectives(type.astNode)}${printFields(type, options)}`;
}
export function printInterface(type, options) {
  return `${printDescription(type, options)}interface ${type.name}${printImplementedInterfaces(type, options)}${printNodeDirectives(type.astNode)}${printFields(type, options)}`;
}
export function printUnion(type, options) {
  let types = type.getTypes();

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortUnions) {
    types = types.sort();
  }

  const possibleTypes = types.length ? ` = ${types.join(' | ')}` : '';
  return `${printDescription(type, options)}union ${type.name}${printNodeDirectives(type.astNode)}${possibleTypes}`;
}
export function printEnum(type, options) {
  let values = type.getValues();

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortEnums) {
    values = values.sort((a, b) => a.name.localeCompare(b.name));
  }

  const valuesList = values.map((value, i) => `${printDescription(value, options, '  ', !i)}  ${value.name}${printNodeDirectives(value.astNode)}${printDeprecated(value)}`);
  return `${printDescription(type, options)}enum ${type.name}${printNodeDirectives(type.astNode)}${printBlock(valuesList)}`;
}
export function printInputObject(type, options) {
  let fields = objectValues(type.getFields());

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortFields) {
    fields = fields.sort((a, b) => a.name.localeCompare(b.name));
  }

  const fieldsList = fields.map((f, i) => `${printDescription(f, options, '  ', !i)}  ${printInputValue(f)}`);
  return `${printDescription(type, options)}input ${type.name}${printNodeDirectives(type.astNode)}${printBlock(fieldsList)}`;
}
export function printFields(type, options) {
  let fields = objectValues(type.getFields());

  if (options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortFields) {
    fields = fields.sort((a, b) => a.name.localeCompare(b.name));
  }

  const fieldsList = fields.map((f, i) => `${printDescription(f, options, '  ', !i)}  ${f.name}${printArgs(f.args, options, '  ')}: ${String(f.type)}${printNodeDirectives(f.astNode)}${printDeprecated(f)}`);
  return printBlock(fieldsList);
}
export function printBlock(items) {
  return items.length !== 0 ? ` {\n${items.join('\n')}\n}` : '';
}
export function printArgs(_args, options, indentation = '') {
  if (_args.length === 0) {
    return '';
  }

  const args = options !== null && options !== void 0 && options.sortAll || options !== null && options !== void 0 && options.sortArgs ? _args.sort((a, b) => a.name.localeCompare(b.name)) : _args; // If every arg does not have a description, print them on one line.

  if (args.every(arg => !arg.description)) {
    return `(${args.map(printInputValue).join(', ')})`;
  }

  return `(\n${args.map((arg, i) => `${printDescription(arg, options, `  ${indentation}`, !i)}  ${indentation}${printInputValue(arg)}`).join('\n')}\n${indentation})`;
}
export function printInputValue(arg) {
  const defaultAST = astFromValue(arg.defaultValue, arg.type);
  let argDecl = `${arg.name}: ${String(arg.type)}`;

  if (defaultAST) {
    argDecl += ` = ${print(defaultAST)}`;
  }

  return `${argDecl}${printNodeDirectives(arg.astNode)}`;
}
export function printDirective(directive, options) {
  return `${printDescription(directive, options)}directive @${directive.name}${printArgs(directive.args, options)}${directive.isRepeatable ? ' repeatable' : ''} on ${directive.locations.join(' | ')}`;
}
export function printNodeDirectives(node) {
  if (!node || !node.directives || !node.directives.length) return '';
  return ` ${node.directives.map(d => {
    let args = '';

    if (d.arguments && d.arguments.length) {
      args = `(${d.arguments.map(a => `${a.name.value}: ${print(a.value)}`).join(', ')})`;
    }

    return `@${d.name.value}${args}`;
  }).join(' ')}`;
}
export function printDeprecated(fieldOrEnumVal) {
  if (!fieldOrEnumVal.isDeprecated) {
    return '';
  }

  const reason = fieldOrEnumVal.deprecationReason;
  const reasonAST = astFromValue(reason, GraphQLString);

  if (reasonAST && reason !== DEFAULT_DEPRECATION_REASON) {
    return ` @deprecated(reason: ${print(reasonAST)})`;
  }

  return ' @deprecated';
}
export function printDescription(def, options, indentation = '', firstInBlock = true) {
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
  const blockString = printBlockString(description, '', preferMultipleLines);
  const prefix = indentation && !firstInBlock ? `\n${indentation}` : indentation;
  return `${prefix + blockString.replace(/\n/g, `\n${indentation}`)}\n`;
}
export function printDescriptionWithComments(description, indentation, firstInBlock) {
  const prefix = indentation && !firstInBlock ? '\n' : '';
  const comment = description.split('\n').map(line => indentation + (line !== '' ? `# ${line}` : '#')).join('\n');
  return `${prefix + comment}\n`;
}