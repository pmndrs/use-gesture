/* eslint-disable no-use-before-define */
/* @flow strict */

import type { SchemaComposer } from '../SchemaComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { isNamedTypeComposer, type NamedTypeComposer } from './typeHelpers';

export type VisitorEmptyResult =
  | void // just move further
  | null // means remove type from registry
  | false; // halt processing other visit kinds for this current type. Eg `ObjectTypeComposer` will be visited via 3 kinds in following order `OBJECT_TYPE`, `COMPOSITE_TYPE`, `TYPE`; so `false` returned in `OBJECT_TYPE` informs visitor to not call 'COMPOSITE_TYPE' and 'TYPE'.

export type VisitKindFn<T, TContext> = (
  tc: T,
  schemaComposer: SchemaComposer<TContext>
) => VisitorEmptyResult | NamedTypeComposer<TContext>;

export type SchemaVisitor<TContext> = {
  TYPE?: VisitKindFn<NamedTypeComposer<TContext>, TContext>,
  SCALAR_TYPE?: VisitKindFn<ScalarTypeComposer<TContext>, TContext>,
  ENUM_TYPE?: VisitKindFn<EnumTypeComposer<TContext>, TContext>,
  COMPOSITE_TYPE?: VisitKindFn<
    | ObjectTypeComposer<any, TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>,
    TContext
  >,
  OBJECT_TYPE?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>,
  INPUT_OBJECT_TYPE?: VisitKindFn<InputTypeComposer<TContext>, TContext>,
  ABSTRACT_TYPE?: VisitKindFn<
    InterfaceTypeComposer<any, TContext> | UnionTypeComposer<any, TContext>,
    TContext
  >,
  UNION_TYPE?: VisitKindFn<UnionTypeComposer<any, TContext>, TContext>,
  INTERFACE_TYPE?: VisitKindFn<InterfaceTypeComposer<any, TContext>, TContext>,
  ROOT_OBJECT?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>,
  QUERY?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>,
  MUTATION?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>,
  SUBSCRIPTION?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>,
};

export type VisitSchemaKind =
  | 'TYPE'
  | 'SCALAR_TYPE'
  | 'ENUM_TYPE'
  | 'COMPOSITE_TYPE' // These types may describe the parent context of a selection set.
  | 'OBJECT_TYPE'
  | 'INPUT_OBJECT_TYPE'
  | 'ABSTRACT_TYPE'
  | 'UNION_TYPE'
  | 'INTERFACE_TYPE'
  | 'ROOT_OBJECT'
  | 'QUERY'
  | 'MUTATION'
  | 'SUBSCRIPTION';

/**
 * Get visit kinds for provided type.
 * Returns array of kind from specific to common.
 * Cause first visit operation may halt other visit calls (if visitor function returns false).
 */
export function getVisitKinds(
  tc: NamedTypeComposer<any>,
  schema: SchemaComposer<any>
): VisitSchemaKind[] {
  let kinds: VisitSchemaKind[] = [];
  if (tc instanceof ObjectTypeComposer) {
    kinds = ['OBJECT_TYPE', 'COMPOSITE_TYPE', 'TYPE'];

    // add to beginning
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

export function visitSchema<TContext>(
  schema: SchemaComposer<TContext>,
  visitor: SchemaVisitor<TContext>
): void {
  // The same type composer may be added several times under
  // different keys to TypeRegistry (eg. as key may be: TypeName, GraphQLType, SDL, ORM, ClassObject etc.)
  // So `visitedTCs` helps to skip already visited types.
  const visitedTCs = new WeakSet();

  schema.forEach((value, key) => {
    if (visitedTCs.has(value)) return;
    visitedTCs.add(value);

    let tc: NamedTypeComposer<any> = (value: any);
    const visitKinds = getVisitKinds(tc, schema);
    for (const kind of visitKinds) {
      const visitorFn = visitor[kind];
      if (visitorFn) {
        const result = visitorFn((tc: any), schema);
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
        }
        // `undefined` - just move further
        // `array` - not implemented, cause you have schema as a second arg,
        //           so you may add new types to it explicitly
      }
    }
  });
}

export function isScalarTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof ScalarTypeComposer;
}

export function isEnumTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof EnumTypeComposer;
}

export function isObjectTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof ObjectTypeComposer;
}

export function isInputTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof InputTypeComposer;
}

export function isInterfaceTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof InterfaceTypeComposer;
}

export function isUnionTypeComposer(type: NamedTypeComposer<any>): boolean %checks {
  return type instanceof UnionTypeComposer;
}
