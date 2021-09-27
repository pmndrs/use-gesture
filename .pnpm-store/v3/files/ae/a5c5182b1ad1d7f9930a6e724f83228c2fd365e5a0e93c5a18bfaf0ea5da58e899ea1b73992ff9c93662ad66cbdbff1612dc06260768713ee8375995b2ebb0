/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLEnumType } from './graphql';
import {
  GraphQLEnumValueConfig,
  GraphQLEnumTypeConfig,
  GraphQLEnumValueConfigMap,
  EnumValueDefinitionNode,
} from './graphql';
import { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { ObjMap, Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';
import { NamedTypeComposer } from './utils/typeHelpers';
import { SchemaPrinterOptions } from './utils/schemaPrinter';

export type EnumTypeComposerDefinition =
  | TypeAsString
  | EnumTypeComposerAsObjectDefinition
  | GraphQLEnumType;

export type EnumTypeComposerAsObjectDefinition = {
  name: string;
  values?: EnumTypeComposerValueConfigMapDefinition;
  description?: string | null;
  extensions?: Extensions;
};

export type EnumTypeComposerValueConfig = {
  value: any /* T */;
  deprecationReason?: string | null;
  description?: string | null;
  astNode?: EnumValueDefinitionNode | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type EnumTypeComposerValueConfigDefinition = {
  value?: any;
  deprecationReason?: string | null;
  description?: string | null;
  extensions?: Extensions;
  [key: string]: any;
};

export type EnumTypeComposerValueConfigMap = ObjMap<EnumTypeComposerValueConfig>;
export type EnumTypeComposerValueConfigMapDefinition = ObjMap<EnumTypeComposerValueConfigDefinition>;

/**
 * `EnumTypeComposer` is a class which helps to create and modify `GraphQLEnumType`.
 */
export class EnumTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected _gqType: GraphQLEnumType;
  protected _gqcExtensions: Extensions | void;
  protected _gqcFields: EnumTypeComposerValueConfigMap;

  /**
   * Create `EnumTypeComposer` with adding it by name to the `SchemaComposer`. This type became avaliable in SDL by its name.
   */
  public static create<TCtx = any>(
    typeDef: EnumTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx>;

  /**
   * Create `EnumTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: EnumTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx>;

  public constructor(graphqlType: GraphQLEnumType, schemaComposer: SchemaComposer<TContext>);

  /**
   * -----------------------------------------------
   * Value methods
   * -----------------------------------------------
   */

  /**
   * For similar naming with `ObjectTypeComposer` and `InputTypeComposer` for working with Enum values used methods with name `*field*` instead of `*value*`.
   */
  public hasField(name: string): boolean;

  public getFields(): EnumTypeComposerValueConfigMap;

  public getField(name: string): EnumTypeComposerValueConfig;

  public getFieldNames(): string[];

  /**
   * Completely replace all values in the type with a new set.
   */
  public setFields(values: EnumTypeComposerValueConfigMapDefinition): this;

  public setField(name: string, valueConfig: EnumTypeComposerValueConfigDefinition): this;

  /**
   * Add new fields or replace existed, other fields keep untouched.
   */
  public addFields(newValues: EnumTypeComposerValueConfigMapDefinition): this;

  /**
   * Remove one value by its name, or by array of field names.
   */
  public removeField(nameOrArray: string | string[]): this;

  /**
   * Keep only provided fields in type, other fields will be removed.
   */
  public removeOtherFields(fieldNameOrArray: string | string[]): this;

  public reorderFields(names: string[]): this;

  public extendField(
    name: string,
    partialValueConfig: Partial<EnumTypeComposerValueConfigDefinition>
  ): this;

  /**
   * Mark value or map of values as deprecated
   */
  public deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLEnumType;

  public getTypePlural(): ListComposer<this>;

  public getTypeNonNull(): NonNullComposer<this>;

  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const ColorTC = schemaComposer.createEnumTC(`enum Color { RED GREEN }`);
   *   schemaComposer.Query.addFields({
   *     color1: { type: ColorTC.List }  // in SDL: color1: [Color]
   *     color2: { type: ColorTC.NonNull.List }  // in SDL: color2: [Color!]
   *     color3: { type: ColorTC.NonNull.List.NonNull }  // in SDL: color2: [Color!]!
   *   })
   */
  public get List(): ListComposer<EnumTypeComposer<TContext>>;

  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const ColorTC = schemaComposer.createEnumTC(`enum Color { RED GREEN }`);
   *   schemaComposer.Query.addFields({
   *     color1: { type: ColorTC.List }  // in SDL: color1: [Color]
   *     color2: { type: ColorTC.NonNull.List }  // in SDL: color2: [Color!]
   *     color3: { type: ColorTC.NonNull.List.NonNull }  // in SDL: color2: [Color!]!
   *   })
   */
  public get NonNull(): NonNullComposer<EnumTypeComposer<TContext>>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  public clone(newTypeNameOrTC: string | EnumTypeComposer<any>): EnumTypeComposer<TContext>;

  /**
   * Clone this type to another SchemaComposer.
   * Also will be clonned all sub-types.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): EnumTypeComposer<TCtx>;

  public merge(type: GraphQLEnumType | EnumTypeComposer<any>): this;

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
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  /**
   * Prints SDL for current type.
   */
  public toSDL(opts?: SchemaPrinterOptions): string;
}
