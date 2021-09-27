import { GraphQLType } from 'graphql';
import { SchemaComposer } from './SchemaComposer';
import {
  InputTypeComposerFieldConfig,
  InputTypeComposerFieldConfigMap,
  InputTypeComposerFieldConfigDefinition,
  InputTypeComposerFieldConfigMapDefinition,
} from './InputTypeComposer';
import {
  ObjectTypeComposer,
  ObjectTypeComposerArgumentConfig,
  ObjectTypeComposerFieldConfig,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposerArgumentConfigDefinition,
  ObjectTypeComposerArgumentConfigMapDefinition,
  ObjectTypeComposerArgumentConfigMap,
  ObjectTypeComposerFieldConfigMap,
  ObjectTypeComposerDefinition,
} from './ObjectTypeComposer';
import {
  InterfaceTypeComposerDefinition,
  InterfaceTypeComposerThunked,
} from './InterfaceTypeComposer';
import { Thunk, ThunkWithSchemaComposer } from './utils/definitions';
import { Resolver } from './Resolver';
import { TypeStorage } from './TypeStorage';
import {
  AnyTypeComposer,
  ComposeOutputType,
  ComposeOutputTypeDefinition,
  ComposeInputType,
  ComposeInputTypeDefinition,
  NamedTypeComposer,
} from './utils/typeHelpers';

/**
 * Eg. `type Name { field: Int }`
 */
export type TypeDefinitionString = string;

/**
 * Eg. `Int`, `Int!`, `[Int]`
 */
export type TypeWrappedString = string;

/**
 * Eg. `Int`, `Float`
 */
export type TypeNameString = string;

export type TypeAsString = TypeDefinitionString | TypeWrappedString | TypeNameString;

/**
 * Type storage and type generator from `Schema Definition Language` (`SDL`).
 * This is slightly rewritten [buildASTSchema](https://github.com/graphql/graphql-js/blob/master/src/utilities/buildASTSchema.js)
 * utility from `graphql-js` that allows to create type from a string (SDL).
 */
declare class TypeMapper<TContext> {
  public schemaComposer: SchemaComposer<TContext>;

  public constructor(schemaComposer: SchemaComposer<TContext>);

  protected _initScalars(): void;

  public convertGraphQLTypeToComposer(type: GraphQLType): AnyTypeComposer<TContext>;

  public convertSDLWrappedTypeName(str: TypeWrappedString | TypeNameString): GraphQLType | null;

  public convertSDLTypeDefinition(str: TypeDefinitionString): NamedTypeComposer<TContext> | void;

  public convertOutputTypeDefinition(
    typeDef: ThunkWithSchemaComposer<
      | ComposeOutputTypeDefinition<any>
      | ObjectTypeComposerDefinition<any, any>
      | Resolver<any, any>,
      SchemaComposer<TContext>
    >,
    fieldName?: string,
    typeName?: string
  ): ComposeOutputType<TContext> | void;

  public convertOutputFieldConfig<TSource>(
    composeFC: ObjectTypeComposerFieldConfigDefinition<TSource, TContext> | Resolver<any, TContext>,
    fieldName?: string,
    typeName?: string
  ): ObjectTypeComposerFieldConfig<TSource, TContext>;

  public convertOutputFieldConfigMap<TSource>(
    composeFields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>,
    typeName?: string
  ): ObjectTypeComposerFieldConfigMap<TSource, TContext>;

  public convertArgConfig(
    composeAC: ObjectTypeComposerArgumentConfigDefinition,
    argName?: string,
    fieldName?: string,
    typeName?: string
  ): ObjectTypeComposerArgumentConfig;

  public convertArgConfigMap(
    composeArgsConfigMap: ObjectTypeComposerArgumentConfigMapDefinition<any>,
    fieldName?: string,
    typeName?: string
  ): ObjectTypeComposerArgumentConfigMap<any>;

  public convertInputTypeDefinition(
    typeDef: ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<TContext>>,
    fieldName?: string,
    typeName?: string
  ): ComposeInputType | void;

  public convertInputFieldConfig(
    composeIFC: InputTypeComposerFieldConfigDefinition,
    fieldName?: string,
    typeName?: string
  ): InputTypeComposerFieldConfig;

  public convertInputFieldConfigMap(
    composeFields: InputTypeComposerFieldConfigMapDefinition,
    typeName?: string
  ): InputTypeComposerFieldConfigMap;

  public convertInterfaceTypeDefinition(
    typeDef: InterfaceTypeComposerDefinition<any, TContext>
  ): InterfaceTypeComposerThunked<any, TContext>;

  public parseTypesFromString(str: string): TypeStorage<string, NamedTypeComposer<TContext>>;

  /**
   * -----------------------------------------------
   * Internal methods
   * -----------------------------------------------
   */
}
