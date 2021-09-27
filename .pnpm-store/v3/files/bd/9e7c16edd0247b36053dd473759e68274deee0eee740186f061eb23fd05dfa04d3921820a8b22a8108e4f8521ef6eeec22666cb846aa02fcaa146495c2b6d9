/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLScalarType, valueFromASTUntyped } from './graphql';
import { isObject, isString } from './utils/is';
import type {
  GraphQLScalarTypeConfig,
  GraphQLScalarSerializer,
  GraphQLScalarValueParser,
  GraphQLScalarLiteralParser,
} from './graphql';
import type { TypeAsString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { isTypeNameString } from './utils/typeHelpers';
import type { Extensions, ExtensionsDirective, DirectiveArgs } from './utils/definitions';
import { inspect } from './utils/misc';
import { graphqlVersion } from './utils/graphqlVersion';
import { printScalar, type SchemaPrinterOptions } from './utils/schemaPrinter';
import { getScalarTypeDefinitionNode } from './utils/definitionNode';

export type ScalarTypeComposerDefinition =
  | TypeAsString
  | $ReadOnly<ScalarTypeComposerAsObjectDefinition>
  | $ReadOnly<GraphQLScalarType>;

export type ScalarTypeComposerAsObjectDefinition = GraphQLScalarTypeConfig<any, any> & {
  +extensions?: Extensions,
};

export class ScalarTypeComposer<TContext> {
  schemaComposer: SchemaComposer<TContext>;
  _gqType: GraphQLScalarType;
  _gqcExtensions: Extensions | void;
  _gqcSerialize: GraphQLScalarSerializer<any>;
  _gqcParseValue: GraphQLScalarValueParser<any>;
  _gqcParseLiteral: GraphQLScalarLiteralParser<any>;

  static create<TCtx>(
    typeDef: ScalarTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `ScalarTypeComposer.create(typeDef, schemaComposer)`'
      );
    }

    if (schemaComposer.hasInstance(typeDef, ScalarTypeComposer)) {
      return schemaComposer.getSTC(typeDef);
    }

    const stc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(stc);
    return stc;
  }

  static createTemp<TCtx>(
    typeDef: ScalarTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): ScalarTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let STC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      if (isTypeNameString(typeName)) {
        STC = new ScalarTypeComposer(
          new GraphQLScalarType({
            name: typeName,
            serialize: () => {},
          }),
          sc
        );
      } else {
        STC = sc.typeMapper.convertSDLTypeDefinition(typeName);
        if (!(STC instanceof ScalarTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLScalarType type definition. Eg. `scalar UInt`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLScalarType) {
      STC = new ScalarTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLScalarType({
        ...(typeDef: any),
      });
      STC = new ScalarTypeComposer(type, sc);
      STC._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLScalarTypeConfig or string with scalar name or SDL. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return STC;
  }

  constructor(
    graphqlType: GraphQLScalarType,
    schemaComposer: SchemaComposer<TContext>
  ): ScalarTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new ScalarTypeComposer(GraphQLScalarType, SchemaComposer)`'
      );
    }
    if (!(graphqlType instanceof GraphQLScalarType)) {
      throw new Error('ScalarTypeComposer accept only GraphQLScalarType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType;

    // add itself to TypeStorage on create
    // it avoids recursive type use errors
    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    let serialize;
    let parseValue;
    let parseLiteral;
    if (graphqlVersion >= 14) {
      serialize = this._gqType.serialize;
      parseValue = this._gqType.parseValue;
      parseLiteral = this._gqType.parseLiteral;
    } else {
      serialize = (this._gqType: any)._scalarConfig.serialize;
      parseValue = (this._gqType: any)._scalarConfig.parseValue;
      parseLiteral = (this._gqType: any)._scalarConfig.parseLiteral;
    }
    this.setSerialize(serialize);
    this.setParseValue(parseValue);
    this.setParseLiteral(parseLiteral);

    if (graphqlType?.astNode?.directives) {
      this.setExtension(
        'directives',
        this.schemaComposer.typeMapper.parseDirectives(graphqlType?.astNode?.directives)
      );
    }

    // alive proper Flow type casting in autosuggestions for class with Generics
    /* :: return this; */
  }

  // -----------------------------------------------
  // Serialize methods
  // -----------------------------------------------

  setSerialize(fn: GraphQLScalarSerializer<any>) {
    this._gqcSerialize = fn;
  }

  getSerialize(): GraphQLScalarSerializer<any> {
    return this._gqcSerialize;
  }

  setParseValue(fn: ?GraphQLScalarValueParser<any>) {
    this._gqcParseValue = fn || ((value) => value);
  }

  getParseValue(): GraphQLScalarValueParser<any> | void {
    return this._gqcParseValue;
  }

  setParseLiteral(fn: ?GraphQLScalarLiteralParser<any>) {
    this._gqcParseLiteral = fn || valueFromASTUntyped;
  }

  getParseLiteral(): GraphQLScalarLiteralParser<any> | void {
    return this._gqcParseLiteral;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLScalarType {
    this._gqType.astNode = getScalarTypeDefinitionNode(this);
    if (graphqlVersion >= 14) {
      this._gqType.serialize = this._gqcSerialize;
      this._gqType.parseValue = this._gqcParseValue;
      this._gqType.parseLiteral = this._gqcParseLiteral;
    } else {
      (this._gqType: any)._scalarConfig = {
        ...(this._gqType: any)._scalarConfig,
        serialize: this._gqcSerialize,
        parseValue: this._gqcParseValue,
        parseLiteral: this._gqcParseLiteral,
      };
    }
    return this._gqType;
  }

  getTypePlural(): ListComposer<ScalarTypeComposer<TContext>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<ScalarTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

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
  get List(): ListComposer<ScalarTypeComposer<TContext>> {
    return new ListComposer(this);
  }

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
  get NonNull(): NonNullComposer<ScalarTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

  getTypeName(): string {
    return this._gqType.name;
  }

  setTypeName(name: string): ScalarTypeComposer<TContext> {
    this._gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this._gqType.description || '';
  }

  setDescription(description: string): ScalarTypeComposer<TContext> {
    this._gqType.description = description;
    return this;
  }

  getSpecifiedByUrl(): string | void | null {
    return this._gqType.specifiedByUrl;
  }

  setSpecifiedByUrl(url: string | void | null): ScalarTypeComposer<TContext> {
    this._gqType.specifiedByUrl = url;
    return this;
  }

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */
  clone(newTypeNameOrTC: string | ScalarTypeComposer<any>): ScalarTypeComposer<TContext> {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide newTypeName:string for ScalarTypeComposer.clone()');
    }

    const cloned =
      newTypeNameOrTC instanceof ScalarTypeComposer
        ? newTypeNameOrTC
        : ScalarTypeComposer.create(newTypeNameOrTC, this.schemaComposer);

    cloned._gqcSerialize = this._gqcSerialize;
    cloned._gqcParseValue = this._gqcParseValue;
    cloned._gqcParseLiteral = this._gqcParseLiteral;
    cloned._gqcExtensions = { ...this._gqcExtensions };
    cloned.setDescription(this.getDescription());
    cloned.setSpecifiedByUrl(this.getSpecifiedByUrl());

    return cloned;
  }

  merge(type: GraphQLScalarType | ScalarTypeComposer<any>): ScalarTypeComposer<TContext> {
    let tc: ?ScalarTypeComposer<any>;
    if (type instanceof GraphQLScalarType) {
      tc = ScalarTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof ScalarTypeComposer) {
      tc = type;
    }

    if (tc) {
      this.setSerialize(tc.getSerialize());
      this.setParseValue(tc.getParseValue());
      this.setParseLiteral(tc.getParseLiteral());
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with ScalarType(${this.getTypeName()}). Provided type should be GraphQLScalarType or ScalarTypeComposer.`
      );
    }

    return this;
  }

  // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------

  getExtensions(): Extensions {
    if (!this._gqcExtensions) {
      return {};
    } else {
      return this._gqcExtensions;
    }
  }

  setExtensions(extensions: Extensions): ScalarTypeComposer<TContext> {
    this._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): ScalarTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearExtensions(): ScalarTypeComposer<TContext> {
    this.setExtensions({});
    return this;
  }

  getExtension(extensionName: string): ?any {
    const extensions = this.getExtensions();
    return extensions[extensionName];
  }

  hasExtension(extensionName: string): boolean {
    const extensions = this.getExtensions();
    return extensionName in extensions;
  }

  setExtension(extensionName: string, value: any): ScalarTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): ScalarTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  // -----------------------------------------------
  // Directive methods
  // -----------------------------------------------

  getDirectives(): Array<ExtensionsDirective> {
    const directives = this.getExtension('directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  setDirectives(directives: Array<ExtensionsDirective>): ScalarTypeComposer<TContext> {
    this.setExtension('directives', directives);
    return this;
  }

  getDirectiveNames(): string[] {
    return this.getDirectives().map((d) => d.name);
  }

  getDirectiveByName(directiveName: string): ?DirectiveArgs {
    const directive = this.getDirectives().find((d) => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getDirectiveById(idx: number): ?DirectiveArgs {
    const directive = this.getDirectives()[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  /**
   * Prints SDL for current type.
   */
  toSDL(opts?: SchemaPrinterOptions): string {
    return printScalar(this.getType(), opts);
  }

  /**
   * Copy this scalar type to another SchemaComposer.
   *
   * Scalar types cannot be cloned.
   * It will be very strange if we clone for example Boolean or Date types.
   *
   * This methods exists for compatibility with other TypeComposers.
   */
  cloneTo(
    anotherSchemaComposer: SchemaComposer<any>,
    cloneMap?: Map<any, any> = new Map()
  ): ScalarTypeComposer<any> {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for ObjectTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return (cloneMap.get(this): any);
    // scalar cannot be cloned, so use the same instance
    cloneMap.set(this, this);

    // copy same type instance
    if (!anotherSchemaComposer.has(this.getTypeName())) {
      anotherSchemaComposer.add(this);
    }

    return this;
  }
}
