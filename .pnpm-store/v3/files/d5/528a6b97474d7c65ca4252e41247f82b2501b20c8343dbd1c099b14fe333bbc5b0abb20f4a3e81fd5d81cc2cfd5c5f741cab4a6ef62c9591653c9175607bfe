import { SchemaComposer } from '../SchemaComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InputTypeComposer } from '../InputTypeComposer';
import { ScalarTypeComposer } from '../ScalarTypeComposer';
import { EnumTypeComposer } from '../EnumTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { UnionTypeComposer } from '../UnionTypeComposer';
import { NamedTypeComposer } from './typeHelpers';

export type VisitorEmptyResult =
  | void // just move further
  | null // means remove type from registry
  | false; // halt processing other visit kinds for this current type. Eg `ObjectTypeComposer` will be visited via 3 kinds in following order `OBJECT_TYPE`, `COMPOSITE_TYPE`, `TYPE`; so `false` returned in `OBJECT_TYPE` informs visitor to not call 'COMPOSITE_TYPE' and 'TYPE'.

export type VisitKindFn<T, TContext> = (
  tc: T,
  schemaComposer: SchemaComposer<TContext>
) => VisitorEmptyResult | NamedTypeComposer<TContext>;

export type SchemaVisitor<TContext> = {
  TYPE?: VisitKindFn<NamedTypeComposer<TContext>, TContext>;
  SCALAR_TYPE?: VisitKindFn<ScalarTypeComposer<TContext>, TContext>;
  ENUM_TYPE?: VisitKindFn<EnumTypeComposer<TContext>, TContext>;
  COMPOSITE_TYPE?: VisitKindFn<
    | ObjectTypeComposer<any, TContext>
    | InterfaceTypeComposer<any, TContext>
    | UnionTypeComposer<any, TContext>,
    TContext
  >;
  OBJECT_TYPE?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>;
  INPUT_OBJECT_TYPE?: VisitKindFn<InputTypeComposer<TContext>, TContext>;
  ABSTRACT_TYPE?: VisitKindFn<
    InterfaceTypeComposer<any, TContext> | UnionTypeComposer<any, TContext>,
    TContext
  >;
  UNION_TYPE?: VisitKindFn<UnionTypeComposer<any, TContext>, TContext>;
  INTERFACE_TYPE?: VisitKindFn<InterfaceTypeComposer<any, TContext>, TContext>;
  ROOT_OBJECT?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>;
  QUERY?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>;
  MUTATION?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>;
  SUBSCRIPTION?: VisitKindFn<ObjectTypeComposer<any, TContext>, TContext>;
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
 * Cause first visit operation may halt other visit calls.
 */
export function getVisitKinds(
  tc: NamedTypeComposer<any>,
  schema: SchemaComposer<any>
): VisitSchemaKind[];

export function visitSchema<TContext>(
  schema: SchemaComposer<TContext>,
  visitor: SchemaVisitor<TContext>
): void;

export function isScalarTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is ScalarTypeComposer<TContext>;

export function isEnumTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is EnumTypeComposer<TContext>;

export function isObjectTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is ObjectTypeComposer<any, TContext>;

export function isInputTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is InputTypeComposer<TContext>;

export function isInterfaceTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is InterfaceTypeComposer<any, TContext>;

export function isUnionTypeComposer<TContext>(
  type: NamedTypeComposer<TContext>
): type is UnionTypeComposer<any, TContext>;
