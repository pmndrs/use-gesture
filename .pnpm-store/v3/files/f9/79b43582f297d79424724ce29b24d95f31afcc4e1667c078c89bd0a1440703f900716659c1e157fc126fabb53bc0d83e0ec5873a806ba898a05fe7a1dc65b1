import {
  InputValueDefinitionNode,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInputFieldConfig,
} from './graphql';
import {
  Thunk,
  ThunkWithSchemaComposer,
  ObjMap,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { SchemaComposer } from './SchemaComposer';
import { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { TypeInPath } from './utils/typeByPath';
import {
  ComposeInputTypeDefinition,
  ComposeInputType,
  ComposeNamedInputType,
  NamedTypeComposer,
} from './utils/typeHelpers';
import { ThunkComposer } from './ThunkComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { SchemaPrinterOptions } from './utils/schemaPrinter';

export type InputTypeComposerDefinition =
  | TypeAsString
  | TypeDefinitionString
  | InputTypeComposerAsObjectDefinition
  | GraphQLInputObjectType;

export type InputTypeComposerAsObjectDefinition = {
  name: string;
  fields: ThunkWithSchemaComposer<InputTypeComposerFieldConfigMapDefinition, SchemaComposer<any>>;
  description?: null | string;
  extensions?: Extensions;
};

export type InputTypeComposerFieldConfigMap = ObjMap<InputTypeComposerFieldConfig>;
export type InputTypeComposerFieldConfigMapDefinition = ObjMap<InputTypeComposerFieldConfigDefinition>;

export type InputTypeComposerFieldConfigDefinition = ThunkWithSchemaComposer<
  InputTypeComposerFieldConfigAsObjectDefinition | ComposeInputTypeDefinition,
  SchemaComposer<any>
>;

export type InputTypeComposerFieldConfigAsObjectDefinition = {
  type: ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<any>>;
  defaultValue?: any;
  description?: string | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type InputTypeComposerFieldConfig = {
  type: ComposeInputType;
  defaultValue?: any;
  description?: string | null;
  astNode?: InputValueDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type InputTypeComposerThunked<TContext> =
  | InputTypeComposer<TContext>
  | ThunkComposer<InputTypeComposer<TContext>, GraphQLInputType>;

export class InputTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected _gqType: GraphQLInputObjectType;
  protected _gqcFields: InputTypeComposerFieldConfigMap;
  protected _gqcExtensions: Extensions | null;

  /**
   * Create `InputTypeComposer` with adding it by name to the `SchemaComposer`.
   */
  public static create<TCtx = any>(
    typeDef: InputTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx>;

  /**
   * Create `InputTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: InputTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx>;

  public constructor(graphqlType: GraphQLInputObjectType, schemaComposer: SchemaComposer<TContext>);

  /**
   * -----------------------------------------------
   * Field methods
   * -----------------------------------------------
   */

  public getFields(): InputTypeComposerFieldConfigMap;

  public getFieldNames(): string[];

  public hasField(fieldName: string): boolean;

  public setFields(fields: InputTypeComposerFieldConfigMapDefinition): this;

  public setField(fieldName: string, fieldConfig: InputTypeComposerFieldConfigDefinition): this;

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  public addFields(newFields: InputTypeComposerFieldConfigMapDefinition): this;

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  public addNestedFields(newFields: InputTypeComposerFieldConfigMapDefinition): this;

  public getField(fieldName: string): InputTypeComposerFieldConfig;

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

  public extendField(
    fieldName: string,
    partialFieldConfig: Partial<InputTypeComposerFieldConfigAsObjectDefinition>
  ): this;

  public reorderFields(names: string[]): this;

  public isFieldNonNull(fieldName: string): boolean;

  public getFieldConfig(fieldName: string): GraphQLInputFieldConfig;

  public getFieldType(fieldName: string): GraphQLInputType;

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
  public getFieldTC(fieldName: string): ComposeNamedInputType<TContext>;

  /**
   * Alias for `getFieldTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  public getFieldITC(fieldName: string): InputTypeComposer<TContext>;

  public makeFieldNonNull(fieldNameOrArray: string | string[]): this;

  /**
   * An alias for `makeFieldNonNull()`
   */
  public makeRequired(fieldNameOrArray: string | string[]): this;

  public makeFieldNullable(fieldNameOrArray: string | string[]): this;

  /**
   * An alias for `makeFieldNullable()`
   */
  public makeOptional(fieldNameOrArray: string | string[]): this;

  public isFieldPlural(fieldName: string): boolean;

  public makeFieldPlural(fieldNameOrArray: string | string[]): this;

  public makeFieldNonPlural(fieldNameOrArray: string | string[]): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLInputObjectType;

  public getTypePlural(): ListComposer<this>;

  public getTypeNonNull(): NonNullComposer<this>;

  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const UserTC = schemaComposer.createInputTC(`input UserInput { name: String }`);
   *   schemaComposer.Mutation.addFields({
   *     add: {
   *       args: {
   *         users1: UserTC.List, // in SDL: users1: [UserInput]
   *         users2: UserTC.NonNull.List, // in SDL: users2: [UserInput!]
   *         users3: UserTC.NonNull.List.NonNull, // in SDL: users2: [UserInput!]!
   *       }
   *     }
   *   })
   */
  public get List(): ListComposer<InputTypeComposer<TContext>>;

  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const UserTC = schemaComposer.createInputTC(`input UserInput { name: String }`);
   *   schemaComposer.Mutation.addFields({
   *     add: {
   *       args: {
   *         users1: UserTC.List, // in SDL: users1: [UserInput]
   *         users2: UserTC.NonNull.List, // in SDL: users2: [UserInput!]
   *         users3: UserTC.NonNull.List.NonNull, // in SDL: users2: [UserInput!]!
   *       }
   *     }
   *   })
   */
  public get NonNull(): NonNullComposer<InputTypeComposer<TContext>>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  public clone(newTypeNameOrTC: string | InputTypeComposer<any>): InputTypeComposer<TContext>;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all sub-types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): InputTypeComposer<TCtx>;

  public merge(type: GraphQLInputObjectType | InputTypeComposer<any>): this;

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

  /**
   *  -----------------------------------------------
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
