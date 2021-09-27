/* @flow strict */
/* eslint-disable no-use-before-define */

import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarLiteralParser,
} from './graphql';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { TypeAsString } from './TypeMapper';
import { Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';
import { SchemaPrinterOptions } from './utils/schemaPrinter';

export type ScalarTypeComposerDefinition =
  | TypeAsString
  | ScalarTypeComposerAsObjectDefinition
  | GraphQLScalarType;

export type ScalarTypeComposerAsObjectDefinition = GraphQLScalarTypeConfig<any, any> & {
  extensions?: Extensions;
};

/**
 * `ScalarTypeComposer` is a class which helps to create and modify `GraphQLScalarType`.
 */
export class ScalarTypeComposer<TContext = any> {
  public schemaComposer: SchemaComposer<TContext>;
  protected _gqcExtensions: Extensions | void;
  protected _gqType: GraphQLScalarType;

  /**
   * Create `ScalarTypeComposer` with adding it by name to the `SchemaComposer`. This type became avaliable in SDL by its name.
   */
  public static create<TCtx = any>(
    typeDef: ScalarTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx>;

  /**
   * Create `ScalarTypeComposer` without adding it to the `SchemaComposer`. This method may be usefull in plugins, when you need to create type temporary.
   */
  public static createTemp<TCtx = any>(
    typeDef: ScalarTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx>;

  public constructor(graphqlType: GraphQLScalarType, schemaComposer: SchemaComposer<TContext>);

  /**
   *  -----------------------------------------------
   * Serialize methods
   * -----------------------------------------------
   */

  public setSerialize(fn: GraphQLScalarSerializer<any>): void;

  public getSerialize(): GraphQLScalarSerializer<any>;

  public setParseValue(fn: GraphQLScalarValueParser<any> | void): void;

  public getParseValue(): GraphQLScalarValueParser<any>;

  public setParseLiteral(fn: GraphQLScalarLiteralParser<any> | void): void;

  public getParseLiteral(): GraphQLScalarLiteralParser<any>;

  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */

  public getType(): GraphQLScalarType;

  public getTypePlural(): ListComposer<ScalarTypeComposer<TContext>>;

  public getTypeNonNull(): NonNullComposer<ScalarTypeComposer<TContext>>;

  /**
   * Get Type wrapped in List modifier
   *
   * @example
   *   const ColorTC = schemaComposer.createScalarTC(`scalar Color`);
   *   schemaComposer.Query.addFields({
   *     color1: { type: ColorTC.List }, // in SDL: color1: [Color]
   *     color2: { type: ColorTC.NonNull.List }, // in SDL: color2: [Color!]
   *     color3: { type: ColorTC.NonNull.List.NonNull }, // in SDL: color2: [Color!]!
   *   })
   */
  public get List(): ListComposer<ScalarTypeComposer<TContext>>;

  /**
   * Get Type wrapped in NonNull modifier
   *
   * @example
   *   const ColorTC = schemaComposer.createScalarTC(`scalar Color`);
   *   schemaComposer.Query.addFields({
   *     color1: { type: ColorTC.List }, // in SDL: color1: [Color]
   *     color2: { type: ColorTC.NonNull.List }, // in SDL: color2: [Color!]
   *     color3: { type: ColorTC.NonNull.List.NonNull }, // in SDL: color2: [Color!]!
   *   })
   */
  public get NonNull(): NonNullComposer<ScalarTypeComposer<TContext>>;

  public getTypeName(): string;

  public setTypeName(name: string): this;

  public getDescription(): string;

  public setDescription(description: string): this;

  public getSpecifiedByUrl(): string | void | null;

  public setSpecifiedByUrl(url: string | void | null): this;

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  public clone(newTypeNameOrTC: string | ScalarTypeComposer<any>): ScalarTypeComposer<TContext>;

  /**
   * Copy this scalar type to another SchemaComposer.
   *
   * Scalar types cannot be cloned.
   * It will be very strange if we clone for example Boolean or Date types.
   *
   * This methods exists for compatibility with other TypeComposers.
   */
  public cloneTo<TCtx = any>(
    anotherSchemaComposer: SchemaComposer<TCtx>,
    cloneMap?: Map<any, any>
  ): ScalarTypeComposer<TCtx>;

  public merge(type: GraphQLScalarType | ScalarTypeComposer<any>): this;

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
