"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisitKinds = getVisitKinds;
exports.visitSchema = visitSchema;
exports.isScalarTypeComposer = isScalarTypeComposer;
exports.isEnumTypeComposer = isEnumTypeComposer;
exports.isObjectTypeComposer = isObjectTypeComposer;
exports.isInputTypeComposer = isInputTypeComposer;
exports.isInterfaceTypeComposer = isInterfaceTypeComposer;
exports.isUnionTypeComposer = isUnionTypeComposer;

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _InputTypeComposer = require("../InputTypeComposer");

var _ScalarTypeComposer = require("../ScalarTypeComposer");

var _EnumTypeComposer = require("../EnumTypeComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _UnionTypeComposer = require("../UnionTypeComposer");

var _typeHelpers = require("./typeHelpers");

/* eslint-disable no-use-before-define */

/**
 * Get visit kinds for provided type.
 * Returns array of kind from specific to common.
 * Cause first visit operation may halt other visit calls (if visitor function returns false).
 */
function getVisitKinds(tc, schema) {
  let kinds = [];

  if (tc instanceof _ObjectTypeComposer.ObjectTypeComposer) {
    kinds = ['OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']; // add to beginning

    if (schema.Query === tc) kinds.unshift('QUERY', 'ROOT_OBJECT');
    if (schema.Mutation === tc) kinds.unshift('MUTATION', 'ROOT_OBJECT');
    if (schema.Subscription === tc) kinds.unshift('SUBSCRIPTION', 'ROOT_OBJECT');
  } else if (tc instanceof _InputTypeComposer.InputTypeComposer) {
    kinds = ['INPUT_OBJECT_TYPE', 'TYPE'];
  } else if (tc instanceof _InterfaceTypeComposer.InterfaceTypeComposer) {
    kinds = ['INTERFACE_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE'];
  } else if (tc instanceof _UnionTypeComposer.UnionTypeComposer) {
    kinds = ['UNION_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE'];
  } else if (tc instanceof _ScalarTypeComposer.ScalarTypeComposer) {
    kinds = ['SCALAR_TYPE', 'TYPE'];
  } else if (tc instanceof _EnumTypeComposer.EnumTypeComposer) {
    kinds = ['ENUM_TYPE', 'TYPE'];
  }

  return kinds;
}

function visitSchema(schema, visitor) {
  // The same type composer may be added several times under
  // different keys to TypeRegistry (eg. as key may be: TypeName, GraphQLType, SDL, ORM, ClassObject etc.)
  // So `visitedTCs` helps to skip already visited types.
  const visitedTCs = new WeakSet();
  schema.forEach((value, key) => {
    if (visitedTCs.has(value)) return;
    visitedTCs.add(value);
    let tc = value;
    const visitKinds = getVisitKinds(tc, schema);

    for (const kind of visitKinds) {
      const visitorFn = visitor[kind];

      if (visitorFn) {
        const result = visitorFn(tc, schema);

        if (result === null) {
          // `null` - means remove type from registry
          schema.delete(key);
        } else if (result === false) {
          // `false` - halt processing other visit kinds
          break;
        } else if ((0, _typeHelpers.isNamedTypeComposer)(result)) {
          // `AnyTC` - replace type in registry
          tc = result;
          schema.set(key, tc);
        } // `undefined` - just move further
        // `array` - not implemented, cause you have schema as a second arg,
        //           so you may add new types to it explicitly

      }
    }
  });
}

function isScalarTypeComposer(type) {
  return type instanceof _ScalarTypeComposer.ScalarTypeComposer;
}

function isEnumTypeComposer(type) {
  return type instanceof _EnumTypeComposer.EnumTypeComposer;
}

function isObjectTypeComposer(type) {
  return type instanceof _ObjectTypeComposer.ObjectTypeComposer;
}

function isInputTypeComposer(type) {
  return type instanceof _InputTypeComposer.InputTypeComposer;
}

function isInterfaceTypeComposer(type) {
  return type instanceof _InterfaceTypeComposer.InterfaceTypeComposer;
}

function isUnionTypeComposer(type) {
  return type instanceof _UnionTypeComposer.UnionTypeComposer;
}