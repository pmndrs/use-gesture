"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypeNameString = isTypeNameString;
exports.isWrappedTypeNameString = isWrappedTypeNameString;
exports.isTypeDefinitionString = isTypeDefinitionString;
exports.isSomeOutputTypeDefinitionString = isSomeOutputTypeDefinitionString;
exports.isSomeInputTypeDefinitionString = isSomeInputTypeDefinitionString;
exports.isOutputTypeDefinitionString = isOutputTypeDefinitionString;
exports.isInputTypeDefinitionString = isInputTypeDefinitionString;
exports.isEnumTypeDefinitionString = isEnumTypeDefinitionString;
exports.isScalarTypeDefinitionString = isScalarTypeDefinitionString;
exports.isInterfaceTypeDefinitionString = isInterfaceTypeDefinitionString;
exports.isUnionTypeDefinitionString = isUnionTypeDefinitionString;
exports.isSomeOutputTypeComposer = isSomeOutputTypeComposer;
exports.isSomeInputTypeComposer = isSomeInputTypeComposer;
exports.isComposeNamedType = isComposeNamedType;
exports.isComposeType = isComposeType;
exports.isComposeOutputType = isComposeOutputType;
exports.isComposeInputType = isComposeInputType;
exports.isNamedTypeComposer = isNamedTypeComposer;
exports.isTypeComposer = isTypeComposer;
exports.getGraphQLType = getGraphQLType;
exports.getComposeTypeName = getComposeTypeName;
exports.unwrapTC = unwrapTC;
exports.unwrapInputTC = unwrapInputTC;
exports.unwrapOutputTC = unwrapOutputTC;
exports.changeUnwrappedTC = changeUnwrappedTC;
exports.replaceTC = replaceTC;
exports.unwrapTypeNameString = unwrapTypeNameString;
exports.cloneTypeTo = cloneTypeTo;

var _graphql = require("../graphql");

var _is = require("./is");

var _misc = require("./misc");

var _dedent = require("./dedent");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _InputTypeComposer = require("../InputTypeComposer");

var _ScalarTypeComposer = require("../ScalarTypeComposer");

var _EnumTypeComposer = require("../EnumTypeComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _UnionTypeComposer = require("../UnionTypeComposer");

var _Resolver = require("../Resolver");

var _NonNullComposer = require("../NonNullComposer");

var _ListComposer = require("../ListComposer");

var _ThunkComposer = require("../ThunkComposer");

var _deprecate = _interopRequireDefault(require("./deprecate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */

/**
 * Check that string is a valid GraphQL Type name.
 * According to spec valid mask is `/^[_A-Za-z][_0-9A-Za-z]*$/`.
 *
 * Valid names: Person, _Type, Zone51
 * Invalid names: 123, 1c, String!, @Type, A-
 */
function isTypeNameString(str) {
  return /^[_A-Za-z][_0-9A-Za-z]*$/.test(str);
}
/**
 * Check that provided string is a valid GraphQL type name
 * which can be wrapped by modifiers `[]` or `!`
 *
 * Valid names: Person, Type!, [[Zone51]!]!
 * Invalid names: !1c, [String, @Type
 */


function isWrappedTypeNameString(str) {
  return isTypeNameString(unwrapTypeNameString(str));
}

function isTypeDefinitionString(str) {
  return isOutputTypeDefinitionString(str) || isInputTypeDefinitionString(str) || isEnumTypeDefinitionString(str) || isScalarTypeDefinitionString(str) || isInterfaceTypeDefinitionString(str) || isUnionTypeDefinitionString(str);
}

function isSomeOutputTypeDefinitionString(str) {
  return isOutputTypeDefinitionString(str) || isEnumTypeDefinitionString(str) || isScalarTypeDefinitionString(str) || isInterfaceTypeDefinitionString(str) || isUnionTypeDefinitionString(str);
}

function isSomeInputTypeDefinitionString(str) {
  return isInputTypeDefinitionString(str) || isEnumTypeDefinitionString(str) || isScalarTypeDefinitionString(str);
}

function isOutputTypeDefinitionString(str) {
  return /type\s[^{]+\{[^}]+\}/im.test(str);
}

function isInputTypeDefinitionString(str) {
  return /input\s[^{]+\{[^}]+\}/im.test(str);
}

function isEnumTypeDefinitionString(str) {
  return /enum\s[^{]+\{[^}]+\}/im.test(str);
}

function isScalarTypeDefinitionString(str) {
  return /scalar\s/im.test(str);
}

function isInterfaceTypeDefinitionString(str) {
  return /interface\s/im.test(str);
}

function isUnionTypeDefinitionString(str) {
  return /union\s/im.test(str);
}

function isSomeOutputTypeComposer(type) {
  return type instanceof _ObjectTypeComposer.ObjectTypeComposer || type instanceof _InterfaceTypeComposer.InterfaceTypeComposer || type instanceof _EnumTypeComposer.EnumTypeComposer || type instanceof _UnionTypeComposer.UnionTypeComposer || type instanceof _ScalarTypeComposer.ScalarTypeComposer || type instanceof _NonNullComposer.NonNullComposer && isSomeOutputTypeComposer(type.ofType) || type instanceof _ListComposer.ListComposer && isSomeOutputTypeComposer(type.ofType) || type instanceof _ThunkComposer.ThunkComposer;
}

function isSomeInputTypeComposer(type) {
  return type instanceof _InputTypeComposer.InputTypeComposer || type instanceof _EnumTypeComposer.EnumTypeComposer || type instanceof _ScalarTypeComposer.ScalarTypeComposer || type instanceof _NonNullComposer.NonNullComposer && isSomeInputTypeComposer(type.ofType) || type instanceof _ListComposer.ListComposer && isSomeInputTypeComposer(type.ofType) || type instanceof _ThunkComposer.ThunkComposer;
}

function isComposeNamedType(type) {
  return (0, _graphql.isNamedType)(type) || type instanceof _ObjectTypeComposer.ObjectTypeComposer || type instanceof _InputTypeComposer.InputTypeComposer || type instanceof _InterfaceTypeComposer.InterfaceTypeComposer || type instanceof _EnumTypeComposer.EnumTypeComposer || type instanceof _UnionTypeComposer.UnionTypeComposer || type instanceof _ScalarTypeComposer.ScalarTypeComposer;
}

function isComposeType(type) {
  return isComposeNamedType(type) || Array.isArray(type) && isComposeType(type[0]) || type instanceof _NonNullComposer.NonNullComposer || type instanceof _ListComposer.ListComposer || type instanceof _ThunkComposer.ThunkComposer || type instanceof _Resolver.Resolver || (0, _graphql.isType)(type);
}

function isComposeOutputType(type) {
  return (0, _graphql.isOutputType)(type) || Array.isArray(type) && isComposeOutputType(type[0]) || isSomeOutputTypeComposer(type) || type instanceof _Resolver.Resolver;
}

function isComposeInputType(type) {
  return (0, _graphql.isInputType)(type) || Array.isArray(type) && isComposeInputType(type[0]) || isSomeInputTypeComposer(type);
}

function isNamedTypeComposer(type) {
  return type instanceof _ObjectTypeComposer.ObjectTypeComposer || type instanceof _InputTypeComposer.InputTypeComposer || type instanceof _ScalarTypeComposer.ScalarTypeComposer || type instanceof _EnumTypeComposer.EnumTypeComposer || type instanceof _InterfaceTypeComposer.InterfaceTypeComposer || type instanceof _UnionTypeComposer.UnionTypeComposer;
}

function isTypeComposer(type) {
  return isNamedTypeComposer(type) || type instanceof _ListComposer.ListComposer || type instanceof _NonNullComposer.NonNullComposer || type instanceof _ThunkComposer.ThunkComposer;
}

function getGraphQLType(anyType) {
  let type = anyType; // extract type from ObjectTypeComposer, InputTypeComposer, EnumTypeComposer and Resolver

  if (type && (0, _is.isFunction)(type.getType)) {
    type = type.getType();
  }

  if (!(0, _graphql.isType)(type)) {
    throw new Error(`You provide incorrect type for 'getGraphQLType' method: ${(0, _misc.inspect)(type)}`);
  }

  return type;
}

function getComposeTypeName(type, sc) {
  if (typeof type === 'string') {
    if (/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(type)) {
      // single type name
      return type;
    } else {
      // parse type name from `type Name { f: Int }`
      const docNode = (0, _graphql.parse)(type);

      if (docNode.definitions[0] && docNode.definitions[0].name && typeof docNode.definitions[0].name.value === 'string') {
        return docNode.definitions[0].name.value;
      }
    }

    throw new Error(`Cannot get type name from string: ${(0, _misc.inspect)(type)}`);
  } else if ((0, _is.isFunction)(type)) {
    return getComposeTypeName(type(sc), sc);
  } else {
    try {
      const gqlType = getGraphQLType(type);

      if (typeof gqlType.name === 'string') {
        return gqlType.name;
      }
    } catch (e) {
      throw new Error(`Cannot get type name from ${(0, _misc.inspect)(type)}`);
    }
  }

  throw new Error(`Cannot get type name from ${(0, _misc.inspect)(type)}`);
}

function unwrapTC(anyTC) {
  if (anyTC instanceof _NonNullComposer.NonNullComposer || anyTC instanceof _ListComposer.ListComposer || anyTC instanceof _ThunkComposer.ThunkComposer) {
    const unwrappedTC = anyTC.getUnwrappedTC();
    return unwrapTC(unwrappedTC);
  }

  return anyTC;
}

function unwrapInputTC(inputTC) {
  return unwrapTC(inputTC);
}

function unwrapOutputTC(outputTC) {
  return unwrapTC(outputTC);
}
/**
 * @deprecated 8.0.0
 */


function changeUnwrappedTC(anyTC, cb) {
  (0, _deprecate.default)('Please use `replaceTC()` function instead.');
  return replaceTC(anyTC, cb);
}
/**
 * Replace one TC to another.
 * If type is wrapped with List, NonNull, Thunk then will be replaced inner type and all wrappers will be preserved in the same order.
 *
 * @example
 *   1) replaceTC(A, B)
 *      // returns `B`
 *   2) replaceTC(ListComposer(NonNullComposer(A)), B)
 *      // returns `ListComposer(NonNullComposer(B))`
 *   3) replaceTC(ListComposer(A), (A) => { A.addFields({ f: 'Int' }); return A; })
 *      // returns `ListComposer(A)` where A will be with new field
 *   4) replaceTC(ListComposer(A), (A) => { return someCheck(A) ? B : C; })
 *      // returns `ListComposer(B or C)` B or C depends on `someCheck`
 *
 * @param anyTC may be AnyTypeComposer
 * @param replaceByTC can be a NamedTypeComposer or a callback which gets NamedTypeComposer and should return updated or new NamedTypeComposer
 */


function replaceTC(anyTC, replaceByTC) {
  let tc = anyTC;
  const wrappers = [];

  while (tc instanceof _ListComposer.ListComposer || tc instanceof _NonNullComposer.NonNullComposer || tc instanceof _ThunkComposer.ThunkComposer) {
    if (tc instanceof _ThunkComposer.ThunkComposer) {
      tc = tc.getUnwrappedTC();
    } else {
      wrappers.unshift(tc.constructor);
      tc = tc.ofType;
    }
  } // call callback for TC


  tc = (0, _is.isFunction)(replaceByTC) ? replaceByTC(tc) : replaceByTC;

  if (tc) {
    // wrap TypeComposer back
    tc = wrappers.reduce((type, Wrapper) => new Wrapper(type), tc);
  }

  return tc;
}
/**
 * Remove modifiers `[]` and `!` from type name.
 *
 * Eg. Int! -> Int, [String]! -> String
 */


function unwrapTypeNameString(str) {
  if (str.endsWith('!')) {
    return unwrapTypeNameString(str.slice(0, -1));
  } else if (str.startsWith('[') && str.endsWith(']')) {
    return unwrapTypeNameString(str.slice(1, -1));
  }

  return str;
}
/**
 * Clone any type to the new SchemaComposer.
 * It may be: ComposeType, string, Wrapped ComposeType, GraphQL any type
 */


function cloneTypeTo(type, anotherSchemaComposer, cloneMap = new Map()) {
  if (cloneMap.has(type)) {
    return cloneMap.get(type);
  } else if (typeof type === 'string') {
    return type;
  } else if (isComposeType(type)) {
    if (Array.isArray(type)) return type[0].cloneTo(anotherSchemaComposer, cloneMap);else return type.cloneTo(anotherSchemaComposer, cloneMap);
  } else if ((0, _graphql.isType)(type)) {
    // create new TC directly in new schema
    const tc = anotherSchemaComposer.typeMapper.convertGraphQLTypeToComposer(type);
    cloneMap.set(type, tc);
    return tc;
  } else {
    throw new Error((0, _dedent.dedent)`
      Something strange was provided to utils cloneTypeTo() method:
        ${(0, _misc.inspect)(type)}
    `);
  }
}