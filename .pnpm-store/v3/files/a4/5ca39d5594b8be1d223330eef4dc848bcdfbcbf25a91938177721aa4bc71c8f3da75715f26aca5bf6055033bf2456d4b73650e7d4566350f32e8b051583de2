import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLFieldConfig,
  GraphQLOutputType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from 'graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import {
  ObjectTypeComposerFieldConfig,
  ObjectTypeComposerFieldConfigMap,
  ObjectTypeComposer,
  ObjectTypeComposerArgumentConfig,
  ObjectTypeComposerArgumentConfigMap,
  ObjectTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigAsObjectDefinition,
  ObjectTypeComposerArgumentConfigMapDefinition,
  ObjectTypeComposerArgumentConfigDefinition,
} from './ObjectTypeComposer';
import {
  MaybePromise,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
  ThunkWithSchemaComposer,
} from './utils/definitions';
import { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { ThunkComposer } from './ThunkComposer';
import {
  ComposeNamedOutputType,
  ComposeNamedInputType,
  NamedTypeComposer,
} from './utils/typeHelpers';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { TypeInPath } from './utils/typeByPath';
import { SchemaPrinterOptions } from './utils/schemaPrinter';
import { ToInputTypeOpts } from './utils/toInputType';

export type InterfaceTypeComposerDefinition<TSource, TContext> =
  | TypeAsString
  | TypeDefinitionString
  | InterfaceTypeComposerAsObjectDefinition<TSource, TContext>
  | GraphQLInterfaceType
  | InterfaceTypeComposerThunked<any, TContext>;

export type InterfaceTypeComposerAsObjectDefinition<TSource, TContext> = {
  name: string;
  interfaces?: null | ThunkWithSchemaComposer<
    Array<InterfaceTypeComposerDefinition<any, TContext>>,
    SchemaComposer<TContext>
  >;
  fields?: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>;
  resolveType?: null | GraphQLTypeResolver<TSource, TContext>;
  description?: null | string;
  extensions?: Extensions;
};

export type InterfaceTypeComposerResolversMap<TContext> = Map<
  ObjectTypeComposer<any, TContext> | GraphQLObjectType,
  InterfaceTypeComposerResolverCheckFn<any, TContext>
>;

export type InterfaceTypeComposerResolverCheckFn<TSource, TContext> = (
  value: TSource,
  context: TContext,
  info: GraphQLResolveInfo
) => MaybePromise<boolean | null | void>;

export type InterfaceTypeComposerThunked<TReturn, TContext> =
  | InterfaceTypeComposer<TReturn, TContext>
  | ThunkComposer<InterfaceTypeComposer<TReturn, TContext>, GraphQLInterfaceType>;

/**
 * Class that helps to create `GraphQLInterfaceType`s and provide ability to modify them.
 */
export class InterfaceTypeComposer<TSource = any, TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected _gqType: GraphQLInterfaceType;
  protected _gqcFields: ObjectTypeComposerFieldConfigMap<TSource, TContext>;
  protected _gqcInputTypeComposer: void | InputTypeComposer<TContext>;
  protected _gqcTypeResolvers: void | InterfaceTypeComposerResolversMap<TContext>;
  protected _gqcFallbackResolveType: ObjectTypeComposer<any, TContext> | GraphQLObjectType | null;
  protected _gqcInterfaces: Array<InterfaceTypeComposerThunked<TSource, TContext>>;
  protected _gqcExtensions: void | Extensions;

  /**
   * Create `InterfaceTypeComposer` with adding it by name to the `SchemaComposer`.
   */
  public static create<TSrc = any, TCtx = any>(
    typeDef: InterfaceTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx>;

  /**
   * Create `InterfaceTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TSrc = any, TCtx = any>(
    typeDef: InterfaceTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx>;

  public constructor(graphqlType: GraphQLInterfaceType, schemaComposer: SchemaComposer<TContext>);

  /**
   * -----------------------------------------------
   * Field methods
   * -----------------------------------------------
   */

  public getFields(): ObjectTypeComposerFieldConfigMap<TSource, TContext>;

  public getFieldNames(): string[];

  public getField(name: string): ObjectTypeComposerFieldConfig<TSource, TContext>;

  public hasField(name: string): boolean;

  public setFields(fields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>): this;

  public setField(
    name: string,
    fieldConfig: ObjectTypeComposerFieldConfigDefinition<TSource, TContext, any>
  ): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newValues: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>): this;

  /**
   * Remove fields from type by name or array of names.
   * You also may pass name in dot-notation, in such case will be removed nested field.
   *
   * @example
   *     removeField('field1'); // remove 1 field
   *     removeField(['field1', 'field2']); // remove 2 fields
   *     removeField('field1.subField1'); // remove 1 nested field
   */
  public removeField(nameOrArray: string | string[]): this;

  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField(
    fieldName: string,
    partialFieldConfig: Partial<ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext>>
  ): this;

  public getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext>;

  public getFieldType(fieldName: string): GraphQLOutputType;

  public getFieldTypeName(fieldName: string): string;

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

  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const UserTC = schemaComposer.createInterfaceTC(`interface UserIface { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [UserIface]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [UserIface!]
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [UserIface!]!
   *   })
   */
  public get List(): ListComposer<InterfaceTypeComposer<TSource, TContext>>;

  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const UserTC = schemaComposer.createInterfaceTC(`interface UserIface { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [UserIface]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [UserIface!]!
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [UserIface!]!
   *   })
   */
  public get NonNull(): NonNullComposer<InterfaceTypeComposer<TSource, TContext>>;

  public makeFieldNonPlural(fieldNameOrArray: string | string[]): this;

  public deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this;

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

  public getType(): GraphQLInterfaceType;

  public getTypePlural(): ListComposer<this>;

  public getTypeNonNull(): NonNullComposer<this>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  public clone(newTypeNameOrTC: string | InterfaceTypeComposer<any, any>): this;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all sub-types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): InterfaceTypeComposer<any, TCtx>;

  public merge(
    type:
      | GraphQLInterfaceType
      | GraphQLObjectType
      | InterfaceTypeComposer<any, any>
      | ObjectTypeComposer<any, any>
  ): InterfaceTypeComposer<TSource, TContext>;

  /**
   * -----------------------------------------------
   * InputType methods
   * -----------------------------------------------
   */

  public getInputType(): GraphQLInputObjectType;

  public hasInputTypeComposer(): boolean;

  public setInputTypeComposer(itc: InputTypeComposer<TContext>): this;

  public getInputTypeComposer(opts?: ToInputTypeOpts): InputTypeComposer<TContext>;

  /**
   * An alias for `getInputTypeComposer()`
   */
  public getITC(opts?: ToInputTypeOpts): InputTypeComposer<TContext>;

  public removeInputTypeComposer(): this;

  /**
   * -----------------------------------------------
   * ResolveType methods
   * -----------------------------------------------
   */

  public getResolveType(): GraphQLTypeResolver<TSource, TContext> | null | void;

  public setResolveType(fn: GraphQLTypeResolver<TSource, TContext> | null | void): this;

  public hasTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): boolean;

  public getTypeResolvers(): InterfaceTypeComposerResolversMap<TContext>;

  public getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeComposerResolverCheckFn<TSource, TContext>;

  public getTypeResolverNames(): string[];

  public getTypeResolverTypes(): GraphQLObjectType[];

  public setTypeResolvers(typeResolversMap: InterfaceTypeComposerResolversMap<TContext>): this;

  public addTypeResolver<TSrc = any>(
    type: ObjectTypeComposer<TSrc, TContext> | GraphQLObjectType,
    checkFn: InterfaceTypeComposerResolverCheckFn<TSrc, TContext>
  ): this;

  public removeTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): this;

  public setTypeResolverFallback(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType | null
  ): this;

  /**
   * -----------------------------------------------
   * Sub-interfaces methods
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
   *  -----------------------------------------------
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
