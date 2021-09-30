/* @flow strict */

import * as graphql from './graphql';
import { SchemaComposer } from './SchemaComposer';

export { graphql };

const schemaComposer = new SchemaComposer<any>();
const sc = schemaComposer;
export {
  SchemaComposer, // SchemaComposer class
  schemaComposer, // SchemaComposer default global instance
  sc, // SchemaComposer default global instance (alias for schemaComposer)
};

export { ObjectTypeComposer } from './ObjectTypeComposer';
export { InputTypeComposer } from './InputTypeComposer';
export { EnumTypeComposer } from './EnumTypeComposer';
export { ScalarTypeComposer } from './ScalarTypeComposer';
export { InterfaceTypeComposer } from './InterfaceTypeComposer';
export { UnionTypeComposer } from './UnionTypeComposer';
export { Resolver } from './Resolver';

export { TypeStorage } from './TypeStorage';
export { TypeMapper } from './TypeMapper';
export { NonNullComposer } from './NonNullComposer';
export { ListComposer } from './ListComposer';
export { ThunkComposer } from './ThunkComposer';

// Scalar types
export { GraphQLDate, GraphQLBuffer, GraphQLJSON, GraphQLJSONObject } from './type';

// Utils
export { getProjectionFromAST, getFlatProjectionFromAST } from './utils/projection';
export { toInputType, toInputObjectType, convertInputObjectField } from './utils/toInputType';
export * from './utils/misc';
export * from './utils/typeHelpers';
export * from './utils/is';
export * from './utils/definitions';
export * from './utils/graphqlVersion';
export * from './utils/schemaPrinter';
export { toDottedObject } from './utils/toDottedObject';
export { createThunkedObjectProxy } from './utils/createThunkedObjectProxy';
export { deepmerge } from './utils/deepmerge';
export { filterByDotPaths } from './utils/filterByDotPaths';
export { pluralize } from './utils/pluralize';
export { dedent } from './utils/dedent';

export type {
  ObjectTypeComposerThunked,
  ObjectTypeComposerDefinition,
  ObjectTypeComposerAsObjectDefinition,
  ObjectTypeComposerFieldConfigMap,
  ObjectTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigAsObjectDefinition,
  ObjectTypeComposerFieldConfig,
  ObjectTypeComposerArgumentConfigMap,
  ObjectTypeComposerArgumentConfigMapDefinition,
  ObjectTypeComposerArgumentConfigAsObjectDefinition,
  ObjectTypeComposerArgumentConfig,
  ObjectTypeComposerArgumentConfigDefinition,
  ObjectTypeComposerRelationMap,
  ObjectTypeComposerRelationOpts,
  ObjectTypeComposerRelationOptsWithResolver,
  ObjectTypeComposerRelationArgsMapperFn,
  ObjectTypeComposerRelationArgsMapper,
  ObjectTypeComposerGetRecordIdFn,
} from './ObjectTypeComposer';

export type {
  InputTypeComposerThunked,
  InputTypeComposerDefinition,
  InputTypeComposerAsObjectDefinition,
  InputTypeComposerFieldConfigMap,
  InputTypeComposerFieldConfigMapDefinition,
  InputTypeComposerFieldConfigDefinition,
  InputTypeComposerFieldConfigAsObjectDefinition,
  InputTypeComposerFieldConfig,
} from './InputTypeComposer';

export type {
  ScalarTypeComposerDefinition,
  ScalarTypeComposerAsObjectDefinition,
} from './ScalarTypeComposer';

export type {
  EnumTypeComposerDefinition,
  EnumTypeComposerAsObjectDefinition,
  EnumTypeComposerValueConfig,
  EnumTypeComposerValueConfigDefinition,
  EnumTypeComposerValueConfigMap,
  EnumTypeComposerValueConfigMapDefinition,
} from './EnumTypeComposer';

export type {
  UnionTypeComposerThunked,
  UnionTypeComposerDefinition,
  UnionTypeComposerAsObjectDefinition,
  UnionTypeComposerResolversMap,
  UnionTypeComposerResolversMapDefinition,
  UnionTypeComposerResolverCheckFn,
} from './UnionTypeComposer';

export type {
  InterfaceTypeComposerThunked,
  InterfaceTypeComposerDefinition,
  InterfaceTypeComposerAsObjectDefinition,
  InterfaceTypeComposerResolversMap,
  InterfaceTypeComposerResolverCheckFn,
} from './InterfaceTypeComposer';

export type {
  ResolverDefinition,
  ResolverResolveParams,
  ResolverKinds,
  ResolverFilterArgFn,
  ResolverFilterArgConfigDefinition,
  ResolverSortArgFn,
  ResolverSortArgConfig,
  ResolverWrapCb,
  ResolverRpCb,
  ResolverNextRpCb,
  ResolverDebugOpts,
  ResolverMiddleware,
} from './Resolver';

export type { ProjectionType, ProjectionNode } from './utils/projection';

export type { TypeDefinitionString, TypeWrappedString, TypeNameString } from './TypeMapper';
