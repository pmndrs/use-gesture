/* eslint-disable no-use-before-define */
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { isNamedTypeComposer } from './typeHelpers';

/**
 * Get visit kinds for provided type.
 * Returns array of kind from specific to common.
 * Cause first visit operation may halt other visit calls (if visitor function returns false).
 */
export function getVisitKinds(tc, schema) {
  let kinds = [];

  if (tc instanceof ObjectTypeComposer) {
    kinds = ['OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE']; // add to beginning

    if (schema.Query === tc) kinds.unshift('QUERY', 'ROOT_OBJECT');
    if (schema.Mutation === tc) kinds.unshift('MUTATION', 'ROOT_OBJECT');
    if (schema.Subscription === tc) kinds.unshift('SUBSCRIPTION', 'ROOT_OBJECT');
  } else if (tc instanceof InputTypeComposer) {
    kinds = ['INPUT_OBJECT_TYPE', 'TYPE'];
  } else if (tc instanceof InterfaceTypeComposer) {
    kinds = ['INTERFACE_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE'];
  } else if (tc instanceof UnionTypeComposer) {
    kinds = ['UNION_TYPE', 'ABSTRACT_TYPE', 'COMPOSITE_TYPE', 'TYPE'];
  } else if (tc instanceof ScalarTypeComposer) {
    kinds = ['SCALAR_TYPE', 'TYPE'];
  } else if (tc instanceof EnumTypeComposer) {
    kinds = ['ENUM_TYPE', 'TYPE'];
  }

  return kinds;
}
export function visitSchema(schema, visitor) {
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
        } else if (isNamedTypeComposer(result)) {
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
export function isScalarTypeComposer(type) {
  return type instanceof ScalarTypeComposer;
}
export function isEnumTypeComposer(type) {
  return type instanceof EnumTypeComposer;
}
export function isObjectTypeComposer(type) {
  return type instanceof ObjectTypeComposer;
}
export function isInputTypeComposer(type) {
  return type instanceof InputTypeComposer;
}
export function isInterfaceTypeComposer(type) {
  return type instanceof InterfaceTypeComposer;
}
export function isUnionTypeComposer(type) {
  return type instanceof UnionTypeComposer;
}