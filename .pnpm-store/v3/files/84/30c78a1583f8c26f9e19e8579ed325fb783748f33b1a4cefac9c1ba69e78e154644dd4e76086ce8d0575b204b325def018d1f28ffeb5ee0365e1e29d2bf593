import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLOutputType,
  GraphQLInputType,
  GraphQLIsTypeOfFn,
  GraphQLResolveInfo,
  GraphQLFieldResolver,
  FieldDefinitionNode,
  InputValueDefinitionNode,
} from 'graphql';
import {
  Resolver,
  ResolverNextRpCb,
  ResolverDefinition,
  ResolverWrapCb,
  ResolverMiddleware,
} from './Resolver';
import { SchemaComposer } from './SchemaComposer';
import {
  ObjMap,
  Thunk,
  ThunkWithSchemaComposer,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { ProjectionType } from './utils/projection';
import { TypeDefinitionString, TypeAsString } from './TypeMapper';
import {
  InterfaceTypeComposerDefinition,
  InterfaceTypeComposerThunked,
  InterfaceTypeComposer,
} from './InterfaceTypeComposer';
import {
  ComposeOutputTypeDefinition,
  ComposeOutputType,
  ComposeInputTypeDefinition,
  ComposeInputType,
  ComposeNamedOutputType,
  ComposeNamedInputType,
  NamedTypeComposer,
} from './utils/typeHelpers';
import { ThunkComposer } from './ThunkComposer';
import { InputTypeComposer } from './InputTypeComposer';
import { NonNullComposer } from './NonNullComposer';
import { ListComposer } from './ListComposer';
import { TypeInPath } from './utils/typeByPath';
import { SchemaPrinterOptions } from './utils/schemaPrinter';
import { ToInputTypeOpts } from './utils/toInputType';

export type ObjectTypeComposerDefinition<TSource, TContext> =
  | TypeAsString
  | TypeDefinitionString
  | ObjectTypeComposerAsObjectDefinition<TSource, TContext>
  | ObjectTypeComposer<TSource, TContext>
  | GraphQLObjectType;

export type ObjectTypeComposerAsObjectDefinition<TSource, TContext> = {
  name: string;
  interfaces?: null | ThunkWithSchemaComposer<
    Array<InterfaceTypeComposerDefinition<any, TContext>>,
    SchemaComposer<TContext>
  >;
  fields?: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>;
  isTypeOf?: null | GraphQLIsTypeOfFn<TSource, TContext>;
  description?: string | null;
  isIntrospection?: boolean;
  extensions?: Extensions;
};

export type ObjectTypeComposerFieldConfigMap<TSource, TContext> = ObjMap<
  ObjectTypeComposerFieldConfig<TSource, TContext>
>;
export type ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext> = ObjMap<
  ObjectTypeComposerFieldConfigDefinition<TSource, TContext>
>;

export type ObjectTypeComposerFieldConfigDefinition<
  TSource,
  TContext,
  TArgs = any
> = ThunkWithSchemaComposer<
  | ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext, TArgs>
  | ComposeOutputTypeDefinition<TContext>
  | Resolver<any, TContext, any>,
  SchemaComposer<TContext>
>;

export type ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext, TArgs = any> = {
  type: ThunkWithSchemaComposer<
    ComposeOutputTypeDefinition<TContext> | Resolver<any, TContext, any>,
    SchemaComposer<TContext>
  >;
  args?: ObjectTypeComposerArgumentConfigMapDefinition<TArgs>;
  resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
  subscribe?: GraphQLFieldResolver<TSource, TContext>;
  deprecationReason?: string | null;
  description?: string | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type ObjectTypeComposerFieldConfig<TSource, TContext, TArgs = any> = {
  type: ComposeOutputType<TContext>;
  args?: ObjectTypeComposerArgumentConfigMap<TArgs>;
  resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>;
  subscribe?: GraphQLFieldResolver<TSource, TContext>;
  deprecationReason?: string | null;
  description?: string | null;
  astNode?: FieldDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
};

// Compose Args -----------------------------

export type ObjectTypeComposerArgumentConfigMap<TArgs = any> = {
  [argName in keyof TArgs]: ObjectTypeComposerArgumentConfig;
};

export type ObjectTypeComposerArgumentConfigMapDefinition<TArgs = any> = {
  [argName in keyof TArgs]: ObjectTypeComposerArgumentConfigDefinition;
};

export type ObjectTypeComposerArgumentConfigAsObjectDefinition = {
  type: ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<any>>;
  defaultValue?: any;
  description?: string | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type ObjectTypeComposerArgumentConfig = {
  type: ComposeInputType;
  defaultValue?: any;
  description?: string | null;
  astNode?: InputValueDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type ObjectTypeComposerArgumentConfigDefinition =
  | ObjectTypeComposerArgumentConfigAsObjectDefinition
  | ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<any>>;

// RELATION -----------------------------

export type ObjectTypeComposerRelationMap<TSource, TContext> = {
  [fieldName: string]: ObjectTypeComposerRelationOpts<any, TSource, TContext>;
};
export type ObjectTypeComposerRelationOpts<TRelationSource, TSource, TContext, TArgs = any> =
  | ObjectTypeComposerRelationOptsWithResolver<TRelationSource, TSource, TContext, TArgs>
  | ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext, TArgs>;
export type ObjectTypeComposerRelationOptsWithResolver<
  TRelationSource,
  TSource,
  TContext,
  TArgs = any
> = {
  resolver: ThunkWithSchemaComposer<
    Resolver<TRelationSource, TContext, TArgs>,
    SchemaComposer<TContext>
  >;
  prepareArgs?: ObjectTypeComposerRelationArgsMapper<TSource, TContext, TArgs>;
  projection?: ProjectionType;
  description?: string | null;
  deprecationReason?: string | null;
  catchErrors?: boolean;
  extensions?: Extensions;
};

export type ObjectTypeComposerRelationArgsMapperFn<TSource, TContext, TArgs = any> = (
  source: TSource,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => any;
export type ObjectTypeComposerRelationArgsMapper<TSource, TContext, TArgs = any> = {
  [argName in keyof TArgs]:
    | { [key: string]: any }
    | ObjectTypeComposerRelationArgsMapperFn<TSource, TContext, TArgs>
    | null
    | void
    | string
    | number
    | any[];
};

export type ObjectTypeComposerGetRecordIdFn<TSource, TContext, TArgs = any> = (
  source: TSource,
  args?: TArgs,
  context?: TContext
) => string;

export type ObjectTypeComposerThunked<TReturn, TContext> =
  | ObjectTypeComposer<TReturn, TContext>
  | ThunkComposer<ObjectTypeComposer<TReturn, TContext>, GraphQLObjectType>;

/**
 * Main class that gets `GraphQLObjectType` and provide ability to change them.
 */
export class ObjectTypeComposer<TSource = any, TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected _gqType: GraphQLObjectType;
  protected _gqcInputTypeComposer: void | InputTypeComposer<TContext>;
  protected _gqcResolvers: void | Map<string, Resolver<TSource, TContext>>;
  protected _gqcGetRecordIdFn: void | ObjectTypeComposerGetRecordIdFn<TSource, TContext>;
  protected _gqcRelations: void | ObjectTypeComposerRelationMap<TSource, TContext>;
  protected _gqcFields: ObjectTypeComposerFieldConfigMap<TSource, TContext>;
  protected _gqcInterfaces: Array<InterfaceTypeComposerThunked<TSource, TContext>>;
  protected _gqcExtensions: void | Extensions;

  /**
   * Create `ObjectTypeComposer` with adding it by name to the `SchemaComposer`.
   */
  public static create<TSrc = any, TCtx = any>(
    typeDef: ObjectTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): ObjectTypeComposer<TSrc, TCtx>;

  /**
   * Create `ObjectTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TSrc = any, TCtx = any>(
    typeDef: ObjectTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): ObjectTypeComposer<TSrc, TCtx>;

  public constructor(graphqlType: GraphQLObjectType, schemaComposer: SchemaComposer<TContext>);

  /**
   * -----------------------------------------------
   * Field methods
   * -----------------------------------------------
   */

  public getFields(): ObjectTypeComposerFieldConfigMap<TSource, TContext>;

  public getFieldNames(): string[];

  public getField<TArgs = any>(
    fieldName: string
  ): ObjectTypeComposerFieldConfig<TSource, TContext, TArgs>;

  public hasField(fieldName: string): boolean;

  public setFields(fields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>): this;

  public setField<TArgs = any>(
    fieldName: string,
    fieldConfig: ObjectTypeComposerFieldConfigDefinition<TSource, TContext, TArgs>
  ): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newFields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>): this;

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  public addNestedFields(
    newFields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>
  ): this;

  /**
   * Remove fields from type by name or array of names.
   * You also may pass name in dot-notation, in such case will be removed nested field.
   *
   * @example
   *     removeField('field1'); // remove 1 field
   *     removeField(['field1', 'field2']); // remove 2 fields
   *     removeField('field1.subField1'); // remove 1 nested field
   */
  public removeField(fieldNameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField<TArgs = any>(
    fieldName: string,
    partialFieldConfig: Partial<
      ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext, TArgs>
    >
  ): this;

  public getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext>;

  public getFieldType(fieldName: string): GraphQLOutputType;

  public getFieldTypeName(fieldName: string): string;

  /**
   * Automatically unwrap from List, NonNull, ThunkComposer
   * It's important! Cause greatly helps to modify fields types in a real code
   * without manual unwrap writing.
   *
   * If you need to work with wrappers, you may use the following code:
   *   - `TC.getField().type` // returns real wrapped TypeComposer
   *   - `TC.isFieldNonNull()` // checks is field NonNull or not
   *   - `TC.makeFieldNonNull()` // for wrapping in NonNullComposer
   *   - `TC.makeFieldNullable()` // for unwrapping from NonNullComposer
   *   - `TC.isFieldPlural()` // checks is field wrapped in ListComposer or not
   *   - `TC.makeFieldPlural()` // for wrapping in ListComposer
   *   - `TC.makeFieldNonPlural()` // for unwrapping from ListComposer
   */
  public getFieldTC(fieldName: string): ComposeNamedOutputType<TContext>;

  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldOTC(fieldName: string): ObjectTypeComposer<TSource, TContext>;

  public isFieldNonNull(fieldName: string): boolean;

  public makeFieldNonNull(fieldNameOrArray: string | string[]): this;

  public makeFieldNullable(fieldNameOrArray: string | string[]): this;

  public isFieldPlural(fieldName: string): boolean;

  public makeFieldPlural(fieldNameOrArray: string | string[]): this;

  public makeFieldNonPlural(fieldNameOrArray: string | string[]): this;

  public deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this;

  /**
   * -----------------------------------------------
   * Field Args methods
   * -----------------------------------------------
   */

  public getFieldArgs<TArgs = any>(fieldName: string): ObjectTypeComposerArgumentConfigMap<TArgs>;

  public getFieldArgNames(fieldName: string): string[];

  public hasFieldArg(fieldName: string, argName: string): boolean;

  public getFieldArg(fieldName: string, argName: string): ObjectTypeComposerArgumentConfig;

  public getFieldArgType(fieldName: string, argName: string): GraphQLInputType;

  public getFieldArgTypeName(fieldName: string, argName: string): string;

  /**
   * Automatically unwrap from List, NonNull, ThunkComposer
   * It's important! Cause greatly helps to modify args types in a real code
   * without manual unwrap writing.
   *
   * If you need to work with wrappers, you may use the following code:
   *    `isFieldArgPlural()` – checks is arg wrapped in ListComposer or not
   *    `makeFieldArgPlural()` – for arg wrapping in ListComposer
   *    `makeFieldArgNonPlural()` – for arg unwrapping from ListComposer
   *    `isFieldArgNonNull()` – checks is arg wrapped in NonNullComposer or not
   *    `makeFieldArgNonNull()` – for arg wrapping in NonNullComposer
   *    `makeFieldArgNullable()` – for arg unwrapping from NonNullComposer
   */
  public getFieldArgTC(fieldName: string, argName: string): ComposeNamedInputType<TContext>;

  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldArgITC(fieldName: string, argName: string): InputTypeComposer<TContext>;

  public setFieldArgs(
    fieldName: string,
    args: ObjectTypeComposerArgumentConfigMapDefinition<any>
  ): this;

  public addFieldArgs(
    fieldName: string,
    newArgs: ObjectTypeComposerArgumentConfigMapDefinition<any>
  ): this;

  public setFieldArg(
    fieldName: string,
    argName: string,
    argConfig: ObjectTypeComposerArgumentConfigDefinition
  ): this;

  public removeFieldArg(fieldName: string, argNameOrArray: string | string[]): this;

  public removeFieldOtherArgs(fieldName: string, argNameOrArray: string | string[]): this;

  public isFieldArgPlural(fieldName: string, argName: string): boolean;

  public makeFieldArgPlural(fieldName: string, argNameOrArray: string | string[]): this;

  public makeFieldArgNonPlural(fieldName: string, argNameOrArray: string | string[]): this;

  public isFieldArgNonNull(fieldName: string, argName: string): boolean;

  public makeFieldArgNonNull(fieldName: string, argNameOrArray: string | string[]): this;

  public makeFieldArgNullable(fieldName: string, argNameOrArray: string | string[]): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLObjectType;

  public getTypePlural(): ListComposer<this>;

  public getTypeNonNull(): NonNullComposer<this>;

  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const UserTC = schemaComposer.createObjectTC(`type User { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [User]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [User!]
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [User!]!
   *   })
   */
  public get List(): ListComposer<ObjectTypeComposer<TSource, TContext>>;

  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const UserTC = schemaComposer.createObjectTC(`type User { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [User]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [User!]!
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [User!]!
   *   })
   */
  public get NonNull(): NonNullComposer<ObjectTypeComposer<TSource, TContext>>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  public clone<TCloneSource = TSource>(
    newTypeNameOrTC: string | ObjectTypeComposer<any, any>
  ): ObjectTypeComposer<TCloneSource, TContext>;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all sub-types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): ObjectTypeComposer<any, TCtx>;

  public getIsTypeOf(): GraphQLIsTypeOfFn<TSource, TContext> | null | void;

  public setIsTypeOf(fn: GraphQLIsTypeOfFn<any, any> | null | void): this;

  /**
   * Merge fields and interfaces from provided `GraphQLObjectType`, or `ObjectTypeComposer`.
   * Also you may provide `GraphQLInterfaceType` or `InterfaceTypeComposer` for adding fields.
   */
  public merge(
    type:
      | GraphQLObjectType
      | GraphQLInterfaceType
      | ObjectTypeComposer<any, any>
      | InterfaceTypeComposer<any, any>
  ): this;

  /**
   * -----------------------------------------------
   * InputType methods
   * -----------------------------------------------
   */

  public getInputType(): GraphQLInputObjectType;

  public hasInputTypeComposer(): boolean;

  public setInputTypeComposer(itc: InputTypeComposer<TContext>): this;

  public getInputTypeComposer(opts?: ToInputTypeOpts): InputTypeComposer<TContext>;

  public getITC(opts?: ToInputTypeOpts): InputTypeComposer<TContext>;

  public removeInputTypeComposer(): this;

  /**
   * -----------------------------------------------
   * Resolver methods
   * -----------------------------------------------
   */

  public getResolvers(): Map<string, Resolver<any, TContext, any>>;

  public hasResolver(name: string): boolean;

  /**
   * Returns existed Resolver by name.
   *
   * Resolver may be additionally wrapped by middlewares. Eg:
   *
   * @example
   *     async function authMiddleware(resolve, source, args, context, info) {
   *       if (somehowCheckAuthInContext(context)) {
   *         return resolve(source, args, context, info);
   *       }
   *       throw new Error('You must be authorized');
   *     }
   *
   *     schemaComposer.Query.addFields({
   *       userById: UserTC.getResolver('findById', [authMiddleware]),
   *       userByIds: UserTC.getResolver('findByIds', [authMiddleware]),
   *     });
   *
   * @param name
   * @param middlewares type ResolverMiddleware = (resolve, source, args, context, info) => any;
   */
  public getResolver<TResolverSource = any, TArgs = any>(
    name: string,
    middlewares?: Array<ResolverMiddleware<TResolverSource, TContext, TArgs>>
  ): Resolver<TResolverSource, TContext, TArgs>;

  public setResolver<TResolverSource = any, TArgs = any>(
    name: string,
    resolver: Resolver<TResolverSource, TContext, TArgs>
  ): this;

  public addResolver<TResolverSource = any, TArgs = any>(
    opts:
      | Resolver<TResolverSource, TContext, TArgs>
      | ResolverDefinition<TResolverSource, TContext, TArgs>
  ): this;

  public removeResolver(resolverName: string): this;

  public wrapResolver<TResolverSource = any, TArgs = any>(
    resolverName: string,
    cbResolver: ResolverWrapCb<TResolverSource, TSource, TContext, TArgs>
  ): this;

  public wrapResolverAs<TResolverSource = any, TArgs = any>(
    resolverName: string,
    fromResolverName: string,
    cbResolver: ResolverWrapCb<TResolverSource, TSource, TContext, TArgs>
  ): this;

  public wrapResolverResolve<TResolverSource = any, TArgs = any>(
    resolverName: string,
    cbNextRp: ResolverNextRpCb<TResolverSource, TContext, TArgs>
  ): this;

  /**
   * -----------------------------------------------
   * Interface methods
   * -----------------------------------------------
   */

  public getInterfaces(): Array<InterfaceTypeComposerThunked<TSource, TContext>>;

  public getInterfacesTypes(): GraphQLInterfaceType[];

  public setInterfaces(interfaces: Array<InterfaceTypeComposerDefinition<any, TContext>>): this;

  public hasInterface(iface: InterfaceTypeComposerDefinition<any, TContext>): boolean;

  public addInterface(
    iface:
      | InterfaceTypeComposerDefinition<any, TContext>
      | InterfaceTypeComposerThunked<any, TContext>
  ): this;

  public addInterfaces(
    ifaces: Array<
      InterfaceTypeComposerDefinition<any, TContext> | InterfaceTypeComposerThunked<any, TContext>
    >
  ): this;

  public removeInterface(iface: InterfaceTypeComposerDefinition<any, TContext>): this;

  /**
   * -----------------------------------------------
   * Extensions methods
   * -----------------------------------------------
   */

  public getExtensions(): Extensions;

  public setExtensions(extensions: Extensions): this;

  public extendExtensions(extensions: Extensions): this;

  public clearExtensions(): this;

  public getExtension(extensionName: string): any;

  public hasExtension(extensionName: string): boolean;

  public setExtension(extensionName: string, value: any): this;

  public removeExtension(extensionName: string): this;

  public getFieldExtensions(fieldName: string): Extensions;

  public setFieldExtensions(fieldName: string, extensions: Extensions): this;

  public extendFieldExtensions(fieldName: string, extensions: Extensions): this;

  public clearFieldExtensions(fieldName: string): this;

  public getFieldExtension(fieldName: string, extensionName: string): any;

  public hasFieldExtension(fieldName: string, extensionName: string): boolean;

  public setFieldExtension(fieldName: string, extensionName: string, value: any): this;

  public removeFieldExtension(fieldName: string, extensionName: string): this;

  public getFieldArgExtensions(fieldName: string, argName: string): Extensions;

  public setFieldArgExtensions(fieldName: string, argName: string, extensions: Extensions): this;

  public extendFieldArgExtensions(fieldName: string, argName: string, extensions: Extensions): this;

  public clearFieldArgExtensions(fieldName: string, argName: string): this;

  public getFieldArgExtension(fieldName: string, argName: string, extensionName: string): any;

  public hasFieldArgExtension(fieldName: string, argName: string, extensionName: string): boolean;

  public setFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string,
    value: any
  ): this;

  public removeFieldArgExtension(fieldName: string, argName: string, extensionName: string): this;

  /**
   * -----------------------------------------------
   * Directive methods
   *
   * Directive methods are usefull if you declare your schemas via SDL.
   * Users who actively use `graphql-tools` can open new abilities for writing
   * your own directive handlers.
   *
   * If you create your schemas via config objects, then probably you
   * no need in `directives`. Instead directives better to use `extensions`.
   * -----------------------------------------------
   */

  public getDirectives(): ExtensionsDirective[];

  public setDirectives(directives: ExtensionsDirective[]): this;

  public getDirectiveNames(): string[];

  public getDirectiveByName(directiveName: string): DirectiveArgs | void;

  public getDirectiveById(idx: number): DirectiveArgs | void;

  public getFieldDirectives(fieldName: string): ExtensionsDirective[];

  public setFieldDirectives(fieldName: string, directives: ExtensionsDirective[]): this;

  public getFieldDirectiveNames(fieldName: string): string[];

  public getFieldDirectiveByName(fieldName: string, directiveName: string): DirectiveArgs | void;

  public getFieldDirectiveById(fieldName: string, idx: number): DirectiveArgs | void;

  public getFieldArgDirectives(fieldName: string, argName: string): ExtensionsDirective[];

  public setFieldArgDirectives(
    fieldName: string,
    argName: string,
    directives: ExtensionsDirective[]
  ): this;

  public getFieldArgDirectiveNames(fieldName: string, argName: string): string[];

  public getFieldArgDirectiveByName(
    fieldName: string,
    argName: string,
    directiveName: string
  ): DirectiveArgs | void;

  public getFieldArgDirectiveById(
    fieldName: string,
    argName: string,
    idx: number
  ): DirectiveArgs | void;

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  public addRelation<TRelationSource = any, TArgs = any>(
    fieldName: string,
    opts: ObjectTypeComposerRelationOpts<TRelationSource, TSource, TContext, TArgs>
  ): this;

  public getRelations(): ObjectTypeComposerRelationMap<any, TContext>;

  public setRecordIdFn(fn: ObjectTypeComposerGetRecordIdFn<TSource, TContext>): this;

  public hasRecordIdFn(): boolean;

  public getRecordIdFn(): ObjectTypeComposerGetRecordIdFn<TSource, TContext>;

  /**
   * Get function that returns record id, from provided object.
   */
  public getRecordId(source: TSource, args?: any, context?: TContext): string | number;

  public get(path: string | string[]): TypeInPath<TContext> | void;

  /**
   * Returns all types which are used inside the current type
   */
  public getNestedTCs(opts?: { exclude?: string[] }): Set<NamedTypeComposer<any>>;

  /**
   * Prints SDL for current type. Or print with all used types if `deep: true` option was provided.
   */
  public toSDL(
    opts?: SchemaPrinterOptions & {
      deep?: boolean;
      sortTypes?: boolean;
      exclude?: string[];
    }
  ): string;
}
