import {
  GraphQLSchema,
  GraphQLNamedType,
  GraphQLDirective,
  SchemaDefinitionNode,
  SchemaExtensionNode,
  GraphQLResolveInfo,
  GraphQLType,
} from 'graphql';
import { ObjectTypeComposer, ObjectTypeComposerDefinition } from './ObjectTypeComposer';
import { InputTypeComposer, InputTypeComposerDefinition } from './InputTypeComposer';
import { ScalarTypeComposer, ScalarTypeComposerDefinition } from './ScalarTypeComposer';
import { EnumTypeComposer, EnumTypeComposerDefinition } from './EnumTypeComposer';
import { InterfaceTypeComposer, InterfaceTypeComposerDefinition } from './InterfaceTypeComposer';
import { UnionTypeComposer, UnionTypeComposerDefinition } from './UnionTypeComposer';
import { TypeStorage } from './TypeStorage';
import { TypeMapper } from './TypeMapper';
import { Resolver, ResolverDefinition } from './Resolver';
import { NamedTypeComposer, AnyType } from './utils/typeHelpers';
import { SchemaComposerPrinterOptions, SchemaPrinterOptions } from './utils/schemaPrinter';

type ExtraSchemaConfig = {
  description?: string | null;
  types?: GraphQLNamedType[] | null;
  directives?: GraphQLDirective[] | null;
  extensions?: any | null; // should be `GraphQLSchemaExtensions` but it does not exists graphql@<15.0.0 (fix this when drop v14 support)
  astNode?: SchemaDefinitionNode | null;
  extensionASTNodes?: ReadonlyArray<SchemaExtensionNode> | null;
  /** You may pass all unused types from type registry to GraphQL schema if set this option to `true` */
  keepUnusedTypes?: boolean | null;
};

type GraphQLToolsResolveMethods<TContext> = {
  [typeName: string]: {
    [fieldName: string]: (
      source: any,
      args: object,
      context: TContext,
      info: GraphQLResolveInfo
    ) => any;
  };
};

/**
 * `SchemaComposer` is a class which helps to create `GraphQLSchema`.
 */
export class SchemaComposer<TContext> extends TypeStorage<any, NamedTypeComposer<TContext>> {
  public typeMapper: TypeMapper<TContext>;
  protected _schemaMustHaveTypes: Array<AnyType<TContext>>;
  protected _directives: GraphQLDirective[];
  protected _description: string | null | undefined;

  /**
   * Create SchemaComposer from
   *  - scratch
   *  - or from SDL
   *  - or from GraphQLSchema instance
   *
   * @param {undefined | GraphQLSchema | string} schema
   */
  public constructor(schemaOrSDL?: GraphQLSchema | string);

  /**
   * Returns `ObjectTypeComposer` of `Query` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Query.addFields({ field1: 'String' });
   */
  public readonly Query: ObjectTypeComposer<any, TContext>;

  /**
   * Returns `ObjectTypeComposer` of `Mutation` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Mutation.addFields({ field1: 'String' });
   */
  public readonly Mutation: ObjectTypeComposer<any, TContext>;

  /**
   * Returns `ObjectTypeComposer` of `Subscription` root type.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.Subscription.addFields({ field1: 'String' });
   */
  public readonly Subscription: ObjectTypeComposer<any, TContext>;

  /**
   * Create `GraphQLSchema` instance from defined types.
   * This instance can be provided to `express-graphql`, `apollo-server`, `graphql-yoga` etc.
   */
  public buildSchema(extraConfig?: ExtraSchemaConfig): GraphQLSchema;

  /**
   * When using Interfaces you may have such Types which are hidden under Interface.resolveType method. In such cases you should add these types explicitly. Cause `buildSchema()` will take only real used types and types which added via `addSchemaMustHaveType()` method.
   */
  public addSchemaMustHaveType(type: AnyType<TContext>): this;

  /**
   * Deeply traverse fields in Query, Mutation, Subscription & sub-objects
   * where will be removed all fields with empty object types (without sub-fields).
   */
  public removeEmptyTypes(tc: ObjectTypeComposer<any, TContext>, passedTypes: Set<string>): void;

  /**
   * Clone schema with deep clonning of all its types.
   * Except Scalar types which will be the same for both schemas.
   */
  public clone<TCtx = TContext>(): SchemaComposer<TCtx>;

  /**
   * Load all types from GraphQLSchema and merge with current SchemaComposer's types.
   *
   * @example
   *     import { schemaComposer } from 'graphql-compose';
   *     schemaComposer.merge(someSchema1);
   *     schemaComposer.merge(someSchema2);
   *     schemaComposer.merge(someSchema3);
   *     const schemaComposer.getOTC('User').removeField('password');
   *     const newSchema = schemaComposer.buildSchema();
   */
  public merge(schema: GraphQLSchema | SchemaComposer<any>): this;

  public getDescription(): string | undefined;

  public setDescription(description: string | undefined): this;

  /**
   * -----------------------------------------------
   * Like graphql-tools methods
   * -----------------------------------------------
   */

  /**
   * Add types to Schema via SDL string. Returns a Map of parsed types.
   *
   * @example
   *     const schemaComposer = new SchemaComposer();
   *     schemaComposer.addTypeDefs(`
   *       type Post {
   *         id: Int!
   *         title: String
   *         votes: Int
   *       }
   *       enum Sort {
   *         ASC
   *         DESC
   *       }
   *     `);
   *
   * @description
   * After that your added types will be avaliable for referencing via string, eg.
   *
   * @example
   *     ObjectTypeComposer.create({
   *       name: 'Author',
   *       fields: {
   *         posts: {
   *           type: '[Post!]',
   *           args: {
   *             sort: 'Sort',
   *           },
   *           resolve: () => {},
   *         }
   *       }
   *     });
   */
  public addTypeDefs(typeDefs: string): TypeStorage<string, NamedTypeComposer<any>>;

  /**
   * Define `resolve` methods for Types in `graphql-tools` manner.
   *
   * @example
   *     declare function addResolveMethods(typesFieldsResolve: {
   *       [typeName: string]: {
   *         [fieldName: string]: (
   *           source: any,
   *           args: Object,
   *           context: TContext,
   *           info: GraphQLResolveInfo
   *         ) => any,
   *       },
   *     }): void
   *
   * @description
   * More details can be found in [issue #142](https://github.com/graphql-compose/graphql-compose/issues/142).
   */
  public addResolveMethods(typesFieldsResolve: GraphQLToolsResolveMethods<TContext>): void;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public createObjectTC<TSource = any>(
    typeDef: ObjectTypeComposerDefinition<TSource, TContext>
  ): ObjectTypeComposer<TSource, TContext>;

  public createInputTC(typeDef: InputTypeComposerDefinition): InputTypeComposer<TContext>;

  public createEnumTC(typeDef: EnumTypeComposerDefinition): EnumTypeComposer<TContext>;

  public createInterfaceTC<TSource = any>(
    typeDef: InterfaceTypeComposerDefinition<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext>;

  public createUnionTC<TSource = any>(
    typeDef: UnionTypeComposerDefinition<TSource, TContext>
  ): UnionTypeComposer<TSource, TContext>;

  public createScalarTC(typeDef: ScalarTypeComposerDefinition): ScalarTypeComposer<TContext>;

  public createResolver<TSource = any, TArgs = any>(
    opts: ResolverDefinition<TSource, TContext, TArgs>
  ): Resolver<TSource, TContext, TArgs>;

  /**
   * Creates or return existed TypeComposer from SDL or object.
   * If you call this method again with same params should be returned the same TypeComposer instance.
   */
  public createTC(typeOrSDL: any): NamedTypeComposer<TContext>;

  /**
   * Creates TypeComposer from SDL or object without adding it to the type storage.
   */
  public createTempTC(typeOrSDL: any): NamedTypeComposer<TContext>;

  public getOrCreateOTC<TSource = any>(
    typeName: string,
    onCreate?: (tc: ObjectTypeComposer<TSource, TContext>) => any
  ): ObjectTypeComposer<TSource, TContext>;

  public getOrCreateITC(
    typeName: string,
    onCreate?: (itc: InputTypeComposer<TContext>) => any
  ): InputTypeComposer<TContext>;

  public getOrCreateETC(
    typeName: string,
    onCreate?: (etc: EnumTypeComposer<TContext>) => any
  ): EnumTypeComposer<TContext>;

  public getOrCreateIFTC<TSource = any>(
    typeName: string,
    onCreate?: (iftc: InterfaceTypeComposer<TSource, TContext>) => any
  ): InterfaceTypeComposer<TSource, TContext>;

  public getOrCreateUTC<TSource = any>(
    typeName: string,
    onCreate?: (utc: UnionTypeComposer<TSource, TContext>) => any
  ): UnionTypeComposer<TSource, TContext>;

  public getOrCreateSTC(
    typeName: string,
    onCreate?: (stc: ScalarTypeComposer<TContext>) => any
  ): ScalarTypeComposer<TContext>;

  public getOTC<TSource = any>(typeName: any): ObjectTypeComposer<TSource, TContext>;

  public getITC(typeName: any): InputTypeComposer<TContext>;

  public getETC(typeName: any): EnumTypeComposer<TContext>;

  public getIFTC<TSource = any>(typeName: any): InterfaceTypeComposer<TSource, TContext>;

  public getUTC<TSource = any>(typeName: any): UnionTypeComposer<TSource, TContext>;

  public getSTC(typeName: any): ScalarTypeComposer<TContext>;

  public getAnyTC(typeName: string | AnyType<any> | GraphQLType): NamedTypeComposer<TContext>;

  public isObjectType(type: string | AnyType<any> | GraphQLType): boolean;

  public isInputType(type: string | AnyType<any> | GraphQLType): boolean;

  public isScalarType(type: string | AnyType<any> | GraphQLType): boolean;

  public isEnumType(type: string | AnyType<any> | GraphQLType): boolean;

  public isInterfaceType(type: string | AnyType<any> | GraphQLType): boolean;

  public isUnionType(type: string | AnyType<any> | GraphQLType): boolean;

  /**
   * -----------------------------------------------
   * Storage methods
   * -----------------------------------------------
   */

  public clear(): void;

  public add(typeOrSDL: any): string;

  public delete(key: any): boolean;

  public entries(): Iterator<[any, NamedTypeComposer<TContext>]>;

  public forEach(
    callbackfn: (
      value: NamedTypeComposer<TContext>,
      index: any,
      map: Map<any, NamedTypeComposer<TContext>>
    ) => any,
    thisArg?: any
  ): void;

  public get(key: any): NamedTypeComposer<TContext>;

  public has(key: any): boolean;

  public keys(): Iterator<any>;

  public set(key: any, value: AnyType<TContext>): this;

  public values(): Iterator<NamedTypeComposer<TContext>>;

  public hasInstance(key: any, ClassObj: any): boolean;

  public getOrSet(
    key: any,
    typeOrThunk: NamedTypeComposer<TContext> | (() => NamedTypeComposer<TContext>)
  ): NamedTypeComposer<TContext>;

  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */

  public addDirective(directive: GraphQLDirective): this;

  public removeDirective(directive: GraphQLDirective): this;

  public getDirectives(): GraphQLDirective[];

  public getDirective(name: string): GraphQLDirective;

  public hasDirective(directive: string | GraphQLDirective): boolean;

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  /**
   * Prints SDL for any type in schema by its name.
   *
   * Can print all used sub-types if provided `deep: true` option.
   * Also you may omit some sub-types via `exclude: string[]` option.
   */
  public getTypeSDL(
    typeName: string,
    opts?: SchemaPrinterOptions & {
      deep?: boolean;
      sortTypes?: boolean;
      exclude?: string[] | null;
    }
  ): string;

  /**
   * Return schema as a SDL string.
   * This SDL can be used with graphql-tools and Apollo Federation.
   *
   * @param {Object} options
   * @param {String[]} options.include - add to SDL only provided types
   * @param {String[]} options.exclude - do not add provided types to SDL
   * @param {Boolean} options.omitScalars - do not add Scalars to SDL
   * @param {Boolean} options.omitDescriptions - do not add descriptions to SDL
   * @param {Boolean} options.omitDirectiveDefinitions - do not add directives definitions to SDL
   * @param {Boolean} options.commentDescriptions - print descriptions like comments, starting with #
   * @param {Boolean} options.sortAll - sort fields, args, values, interfaces by its names. Useful for snapshot testing.
   * @param {Boolean} options.sortFields - sort fields by name
   * @param {Boolean} options.sortArgs - sort args by name
   * @param {Boolean} options.sortInterfaces  - sort interfaces by name
   * @param {Boolean} options.sortUnions - sort union types by name
   * @param {Boolean} options.sortEnums - sort enum values by name
   */
  public toSDL(options?: SchemaComposerPrinterOptions): string;

  /**
   * Returns a map of resolvers for each relevant GraphQL Object Type.
   *
   * This map of Resolvers can be used with graphql-tools and Apollo Federation.
   *
   * @param {Object} options
   * @param {String[]} options.exclude - do not add resolvers from provided types
   */
  public getResolveMethods(opts?: {
    exclude?: string[] | null;
  }): GraphQLToolsResolveMethods<TContext>;
}
