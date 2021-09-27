/* @flow strict */
/* eslint-disable no-use-before-define */

import keyMap from 'graphql/jsutils/keyMap';
import { GraphQLEnumType } from './graphql';
import { isObject, isString } from './utils/is';
import { inspect, mapEachKey } from './utils/misc';
import type { EnumValueDefinitionNode } from './graphql';
import { defineEnumValues, convertEnumValuesToConfig } from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';
import type { TypeAsString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import type {
  ObjMap,
  ObjMapReadOnly,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { isTypeNameString } from './utils/typeHelpers';
import { printEnum, type SchemaPrinterOptions } from './utils/schemaPrinter';
import { getEnumTypeDefinitionNode } from './utils/definitionNode';

export type EnumTypeComposerDefinition =
  | TypeAsString
  | EnumTypeComposerAsObjectDefinition
  | GraphQLEnumType;

export type EnumTypeComposerAsObjectDefinition = {
  name: string,
  values?: EnumTypeComposerValueConfigMapDefinition,
  description?: string | null,
  extensions?: Extensions,
};

export type EnumTypeComposerValueConfig = {
  value: any /* T */,
  deprecationReason?: string | null,
  description?: string | null,
  astNode?: EnumValueDefinitionNode | null | void,
  extensions?: Extensions,
  [key: string]: any,
};

export type EnumTypeComposerValueConfigDefinition = {
  value?: any,
  deprecationReason?: string | null,
  description?: string | null,
  extensions?: Extensions,
  [key: string]: any,
};

export type EnumTypeComposerValueConfigMap = ObjMap<EnumTypeComposerValueConfig>;
export type EnumTypeComposerValueConfigMapDefinition = ObjMapReadOnly<EnumTypeComposerValueConfigDefinition>;

export class EnumTypeComposer<TContext> {
  schemaComposer: SchemaComposer<TContext>;
  _gqType: GraphQLEnumType;
  _gqcExtensions: Extensions | void;
  _gqcFields: EnumTypeComposerValueConfigMap;

  static create<TCtx>(
    typeDef: EnumTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `EnumTypeComposer.create(typeDef, schemaComposer)`'
      );
    }

    if (schemaComposer.hasInstance(typeDef, EnumTypeComposer)) {
      return schemaComposer.getETC(typeDef);
    }

    const etc = this.createTemp(typeDef, schemaComposer);
    if (schemaComposer) schemaComposer.add(etc);
    return etc;
  }

  static createTemp<TCtx>(
    typeDef: EnumTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): EnumTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let ETC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      if (isTypeNameString(typeName)) {
        ETC = new EnumTypeComposer(
          new GraphQLEnumType({
            name: typeName,
            values: graphqlVersion < 13 ? { _OldGraphqlStubValue_: {} } : {},
          }),
          sc
        );
      } else {
        ETC = sc.typeMapper.convertSDLTypeDefinition(typeName);
        if (!(ETC instanceof EnumTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLEnumType type definition. ' +
              'Eg. `enum MyType { KEY1 KEY2 KEY3 }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLEnumType) {
      ETC = new EnumTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLEnumType({
        ...(typeDef: any),
      });
      ETC = new EnumTypeComposer(type, sc);
      ETC.setFields((typeDef: any).values || {});
      ETC._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLEnumTypeConfig or string with enum name or SDL. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return ETC;
  }

  constructor(
    graphqlType: GraphQLEnumType,
    schemaComposer: SchemaComposer<TContext>
  ): EnumTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new EnumTypeComposer(GraphQLEnumType, SchemaComposer)`'
      );
    }
    if (!(graphqlType instanceof GraphQLEnumType)) {
      throw new Error('EnumTypeComposer accept only GraphQLEnumType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType;

    // add itself to TypeStorage on create
    // it avoids recursive type use errors
    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    this._gqcFields = convertEnumValuesToConfig(this._gqType.getValues(), this.schemaComposer);

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
  // Value methods
  // -----------------------------------------------

  hasField(name: string): boolean {
    const values = this.getFields();
    return !!values[name];
  }

  getFields(): EnumTypeComposerValueConfigMap {
    return this._gqcFields;
  }

  getField(name: string): EnumTypeComposerValueConfig {
    const values = this.getFields();

    if (!values[name]) {
      throw new Error(
        `Cannot get value '${name}' from enum type '${this.getTypeName()}'. Value with such name does not exist.`
      );
    }

    return values[name];
  }

  getFieldNames(): string[] {
    return Object.keys(this._gqcFields);
  }

  /**
   * Completely replace all values in GraphQL enum type
   * WARNING: this method rewrite an internal GraphQL instance properties.
   */
  setFields(values: EnumTypeComposerValueConfigMapDefinition): EnumTypeComposer<TContext> {
    this._gqcFields = {};
    Object.keys(values).forEach((valueName) => {
      this.setField(valueName, values[valueName]);
    });
    return this;
  }

  setField(
    name: string,
    valueConfig: EnumTypeComposerValueConfigDefinition
  ): EnumTypeComposer<TContext> {
    this._gqcFields[name] = {
      value: valueConfig.hasOwnProperty('value') ? valueConfig.value : name,
      description: valueConfig.description,
      deprecationReason: valueConfig.deprecationReason,
      extensions: valueConfig.extensions || {},
      astNode: valueConfig.astNode,
    };
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(newValues: EnumTypeComposerValueConfigMapDefinition): EnumTypeComposer<TContext> {
    Object.keys(newValues).forEach((valueName) => {
      this.setField(valueName, newValues[valueName]);
    });
    return this;
  }

  removeField(nameOrArray: string | string[]): EnumTypeComposer<TContext> {
    const valueNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    valueNames.forEach((valueName) => {
      delete this._gqcFields[valueName];
    });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): EnumTypeComposer<TContext> {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    Object.keys(this._gqcFields).forEach((fieldName) => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete this._gqcFields[fieldName];
      }
    });
    return this;
  }

  reorderFields(names: string[]): EnumTypeComposer<TContext> {
    const orderedFields = {};
    const fields = this._gqcFields;
    names.forEach((name) => {
      if (fields[name]) {
        orderedFields[name] = fields[name];
        delete fields[name];
      }
    });
    this._gqcFields = { ...orderedFields, ...fields };
    return this;
  }

  extendField(
    name: string,
    partialValueConfig: $Shape<EnumTypeComposerValueConfigDefinition>
  ): EnumTypeComposer<TContext> {
    let prevValueConfig;
    try {
      prevValueConfig = this.getField(name);
    } catch (e) {
      throw new Error(
        `Cannot extend value '${name}' from enum '${this.getTypeName()}'. Value does not exist.`
      );
    }

    const valueConfig: EnumTypeComposerValueConfig = {
      ...(prevValueConfig: any),
      ...(partialValueConfig: any),
    };
    this.setField(name, valueConfig);
    return this;
  }

  deprecateFields(fields: { [fieldName: string]: string } | string[] | string): this {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate non-existent value '${fields}' from enum '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach((field) => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate non-existent value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach((field) => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate non-existent value '${field}' from enum '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
    }

    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLEnumType {
    this._gqType.astNode = getEnumTypeDefinitionNode(this);
    if (graphqlVersion >= 14) {
      this._gqType._values = defineEnumValues(
        this._gqType,
        (this._gqcFields: any),
        this._gqType.astNode
      );
      this._gqType._valueLookup = new Map(
        this._gqType._values.map((enumValue) => [enumValue.value, enumValue])
      );
      this._gqType._nameLookup = keyMap(this._gqType._values, (value) => value.name);
    } else {
      // clear builded fields in type
      delete (this._gqType: any)._valueLookup;
      delete (this._gqType: any)._nameLookup;
      this._gqType._values = defineEnumValues(
        this._gqType,
        (this._gqcFields: any),
        this._gqType.astNode
      );
    }

    return this._gqType;
  }

  getTypePlural(): ListComposer<EnumTypeComposer<TContext>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<EnumTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

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
  get List(): ListComposer<EnumTypeComposer<TContext>> {
    return new ListComposer(this);
  }

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
  get NonNull(): NonNullComposer<EnumTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

  getTypeName(): string {
    return this._gqType.name;
  }

  setTypeName(name: string): EnumTypeComposer<TContext> {
    this._gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this._gqType.description || '';
  }

  setDescription(description: string): EnumTypeComposer<TContext> {
    this._gqType.description = description;
    return this;
  }

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all cloned
   * settings from this type.
   */
  clone(newTypeNameOrTC: string | EnumTypeComposer<any>): EnumTypeComposer<TContext> {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide newTypeName:string for EnumTypeComposer.clone()');
    }

    const cloned =
      newTypeNameOrTC instanceof EnumTypeComposer
        ? newTypeNameOrTC
        : EnumTypeComposer.create(newTypeNameOrTC, this.schemaComposer);

    cloned._gqcFields = mapEachKey(this._gqcFields, (fieldConfig) => ({
      ...fieldConfig,
      extensions: { ...fieldConfig.extensions },
    }));
    cloned._gqcExtensions = { ...this._gqcExtensions };
    cloned.setDescription(this.getDescription());

    return cloned;
  }

  /**
   * Clone this type to another SchemaComposer.
   * Also will be cloned all sub-types.
   */
  cloneTo(
    anotherSchemaComposer: SchemaComposer<any>,
    cloneMap?: Map<any, any> = new Map()
  ): EnumTypeComposer<any> {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for EnumTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return (cloneMap.get(this): any);
    const cloned = EnumTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);

    return this.clone(cloned);
  }

  merge(type: GraphQLEnumType | EnumTypeComposer<any>): EnumTypeComposer<TContext> {
    let tc: ?EnumTypeComposer<any>;
    if (type instanceof GraphQLEnumType) {
      tc = EnumTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof EnumTypeComposer) {
      tc = type;
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with EnumType(${this.getTypeName()}). Provided type should be GraphQLEnumType or EnumTypeComposer.`
      );
    }

    this.addFields(tc.getFields());

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

  setExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    this._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): EnumTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearExtensions(): EnumTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): EnumTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): EnumTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName: string, extensions: Extensions): EnumTypeComposer<TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(fieldName: string, extensions: Extensions): EnumTypeComposer<TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): EnumTypeComposer<TContext> {
    this.setFieldExtensions(fieldName, {});
    return this;
  }

  getFieldExtension(fieldName: string, extensionName: string): ?any {
    const extensions = this.getFieldExtensions(fieldName);
    return extensions[extensionName];
  }

  hasFieldExtension(fieldName: string, extensionName: string): boolean {
    const extensions = this.getFieldExtensions(fieldName);
    return extensionName in extensions;
  }

  setFieldExtension(
    fieldName: string,
    extensionName: string,
    value: any
  ): EnumTypeComposer<TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(fieldName: string, extensionName: string): EnumTypeComposer<TContext> {
    const extensions = { ...this.getFieldExtensions(fieldName) };
    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
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

  setDirectives(directives: Array<ExtensionsDirective>): EnumTypeComposer<TContext> {
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

  getFieldDirectives(fieldName: string): Array<ExtensionsDirective> {
    const directives = this.getFieldExtension(fieldName, 'directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  setFieldDirectives(
    fieldName: string,
    directives: Array<ExtensionsDirective>
  ): EnumTypeComposer<TContext> {
    this.setFieldExtension(fieldName, 'directives', directives);
    return this;
  }

  getFieldDirectiveNames(fieldName: string): string[] {
    return this.getFieldDirectives(fieldName).map((d) => d.name);
  }

  getFieldDirectiveByName(fieldName: string, directiveName: string): ?DirectiveArgs {
    const directive = this.getFieldDirectives(fieldName).find((d) => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectiveById(fieldName: string, idx: number): ?DirectiveArgs {
    const directive = this.getFieldDirectives(fieldName)[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  toSDL(opts?: SchemaPrinterOptions): string {
    return printEnum(this.getType(), opts);
  }
}
