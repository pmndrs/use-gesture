/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLInputObjectType } from './graphql';
import { resolveMaybeThunk, upperFirst, inspect, mapEachKey } from './utils/misc';
import { isObject, isFunction, isString } from './utils/is';
import { typeByPath, type TypeInPath } from './utils/typeByPath';
import type {
  Thunk,
  ThunkWithSchemaComposer,
  ObjMap,
  ObjMapReadOnly,
  Extensions,
  ExtensionsDirective,
  DirectiveArgs,
} from './utils/definitions';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import type { ThunkComposer } from './ThunkComposer';
import type { TypeAsString, TypeDefinitionString } from './TypeMapper';
import type {
  GraphQLInputFieldConfig,
  GraphQLInputFieldConfigMap,
  GraphQLInputType,
  InputValueDefinitionNode,
} from './graphql';
import { graphqlVersion } from './utils/graphqlVersion';
import { defineInputFieldMap, convertInputFieldMapToConfig } from './utils/configToDefine';
import {
  unwrapInputTC,
  isTypeNameString,
  cloneTypeTo,
  type NamedTypeComposer,
  type ComposeInputType,
  type ComposeNamedInputType,
  type ComposeInputTypeDefinition,
} from './utils/typeHelpers';
import { printInputObject, type SchemaPrinterOptions } from './utils/schemaPrinter';
import { getInputObjectTypeDefinitionNode } from './utils/definitionNode';

export type InputTypeComposerDefinition =
  | TypeAsString
  | TypeDefinitionString
  | InputTypeComposerAsObjectDefinition
  | $ReadOnly<GraphQLInputObjectType>;

export type InputTypeComposerAsObjectDefinition = {
  name: string,
  fields: ThunkWithSchemaComposer<InputTypeComposerFieldConfigMapDefinition, SchemaComposer<any>>,
  description?: null | string,
  extensions?: Extensions,
};

export type InputTypeComposerFieldConfigMap = ObjMap<InputTypeComposerFieldConfig>;
export type InputTypeComposerFieldConfigMapDefinition = ObjMapReadOnly<InputTypeComposerFieldConfigDefinition>;

export type InputTypeComposerFieldConfigDefinition =
  | InputTypeComposerFieldConfigAsObjectDefinition
  | ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<any>>;

export type InputTypeComposerFieldConfigAsObjectDefinition = {
  type: ThunkWithSchemaComposer<ComposeInputTypeDefinition, SchemaComposer<any>>,
  defaultValue?: any,
  description?: string | null,
  extensions?: Extensions,
  [key: string]: any,
};

export type InputTypeComposerFieldConfig = {
  type: ComposeInputType,
  defaultValue?: any,
  description?: string | null,
  astNode?: InputValueDefinitionNode | null,
  extensions?: Extensions,
  [key: string]: any,
};

export type InputTypeComposerThunked<TContext> =
  | InputTypeComposer<TContext>
  | ThunkComposer<InputTypeComposer<TContext>, GraphQLInputType>;

export class InputTypeComposer<TContext> {
  schemaComposer: SchemaComposer<TContext>;
  _gqType: GraphQLInputObjectType;
  _gqcFields: InputTypeComposerFieldConfigMap;
  _gqcExtensions: Extensions | null;

  static create<TCtx>(
    typeDef: InputTypeComposerDefinition,
    schemaComposer: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `InputTypeComposer.create(typeDef, schemaComposer)`'
      );
    }

    if (schemaComposer.hasInstance(typeDef, InputTypeComposer)) {
      return schemaComposer.getITC(typeDef);
    }

    const itc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(itc);
    return itc;
  }

  static createTemp<TCtx>(
    typeDef: InputTypeComposerDefinition,
    schemaComposer?: SchemaComposer<TCtx>
  ): InputTypeComposer<TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let ITC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      if (isTypeNameString(typeName)) {
        ITC = new InputTypeComposer(
          new GraphQLInputObjectType({
            name: typeName,
            fields: () => ({}),
          }),
          sc
        );
      } else {
        ITC = sc.typeMapper.convertSDLTypeDefinition(typeName);
        if (!(ITC instanceof InputTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLInputObjectType type definition. ' +
              'Eg. `input MyInputType { name: String! }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLInputObjectType) {
      ITC = new InputTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLInputObjectType({
        name: typeDef.name,
        description: typeDef.description,
        fields: () => ({}),
      });
      ITC = new InputTypeComposer(type, sc);
      const fields = (typeDef: any).fields;
      if (isFunction(fields)) {
        // `convertInputFieldMapToConfig` helps to solve hoisting problems
        // rewrap fields `() => { f1: { type: A } }` -> `{ f1: { type: () => A } }`
        ITC.addFields(convertInputFieldMapToConfig(fields, sc));
      }
      if (isObject(fields)) ITC.addFields(fields);
      ITC._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide InputObjectConfig or string with type name to InputTypeComposer.create(typeDef). Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return ITC;
  }

  constructor(
    graphqlType: GraphQLInputObjectType,
    schemaComposer: SchemaComposer<TContext>
  ): InputTypeComposer<TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new InputTypeComposer(GraphQLInputType, SchemaComposer)`'
      );
    }
    if (!(graphqlType instanceof GraphQLInputObjectType)) {
      throw new Error('InputTypeComposer accept only GraphQLInputObjectType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType;

    // add itself to TypeStorage on create
    // it avoids recursive type use errors
    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    if (graphqlVersion >= 14) {
      this._gqcFields = convertInputFieldMapToConfig(this._gqType._fields, this.schemaComposer);
    } else {
      const fields: Thunk<GraphQLInputFieldConfigMap> = (this._gqType: any)._typeConfig.fields;
      this._gqcFields = this.schemaComposer.typeMapper.convertInputFieldConfigMap(
        (resolveMaybeThunk(fields) || {}: any),
        this.getTypeName()
      );
    }

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
  // Field methods
  // -----------------------------------------------

  getFields(): InputTypeComposerFieldConfigMap {
    return this._gqcFields;
  }

  getFieldNames(): string[] {
    return Object.keys(this._gqcFields);
  }

  hasField(fieldName: string): boolean {
    return !!this._gqcFields[fieldName];
  }

  setFields(fields: InputTypeComposerFieldConfigMapDefinition): InputTypeComposer<TContext> {
    this._gqcFields = {};
    Object.keys(fields).forEach((name) => {
      this.setField(name, fields[name]);
    });
    return this;
  }

  setField(
    fieldName: string,
    fieldConfig: InputTypeComposerFieldConfigDefinition
  ): InputTypeComposer<TContext> {
    this._gqcFields[fieldName] = isFunction(fieldConfig)
      ? (fieldConfig: any)
      : this.schemaComposer.typeMapper.convertInputFieldConfig(
          fieldConfig,
          fieldName,
          this.getTypeName()
        );
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(newFields: InputTypeComposerFieldConfigMapDefinition): InputTypeComposer<TContext> {
    Object.keys(newFields).forEach((name) => {
      this.setField(name, newFields[name]);
    });
    return this;
  }

  /**
   * Add new fields or replace existed (where field name may have dots)
   */
  addNestedFields(
    newFields: InputTypeComposerFieldConfigMapDefinition
  ): InputTypeComposer<TContext> {
    Object.keys(newFields).forEach((fieldName) => {
      const fc = newFields[fieldName];
      const names = fieldName.split('.');
      const name = names.shift();

      if (names.length === 0) {
        // single field
        this.setField(name, fc);
      } else {
        // nested field
        let childTC;
        if (!this.hasField(name)) {
          childTC = InputTypeComposer.create(
            `${this.getTypeName()}${upperFirst(name)}`,
            this.schemaComposer
          );
          this.setField(name, childTC);
        } else {
          childTC = this.getFieldTC(name);
        }
        if (childTC instanceof InputTypeComposer) {
          childTC.addNestedFields({ [names.join('.')]: fc });
        }
      }
    });

    return this;
  }

  getField(fieldName: string): InputTypeComposerFieldConfig {
    // If FieldConfig is a Thunk then unwrap it on first read.
    // In most cases FieldConfig is an object,
    // but for solving hoisting problems it's quite good to wrap it in function.
    if (isFunction(this._gqcFields[fieldName])) {
      // $FlowFixMe
      const unwrappedFieldConfig = this._gqcFields[fieldName](this.schemaComposer);
      this.setField(fieldName, unwrappedFieldConfig);
    }

    const field = this._gqcFields[fieldName];
    if (!field) {
      throw new Error(
        `Cannot get field '${fieldName}' from input type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    return field;
  }

  /**
   * Remove fields from type by name or array of names.
   * You also may pass name in dot-notation, in such case will be removed nested field.
   *
   * @example
   *     removeField('field1'); // remove 1 field
   *     removeField(['field1', 'field2']); // remove 2 fields
   *     removeField('field1.subField1'); // remove 1 nested field
   */
  removeField(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const names = fieldName.split('.');
      const name = names.shift();
      if (names.length === 0) {
        // single field
        delete this._gqcFields[name];
      } else {
        // nested field
        // eslint-disable-next-line no-lonely-if
        if (this.hasField(name)) {
          const subTC = this.getFieldTC(name);
          if (subTC instanceof InputTypeComposer) {
            subTC.removeField(names.join('.'));
          }
        }
      }
    });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    Object.keys(this._gqcFields).forEach((fieldName) => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete this._gqcFields[fieldName];
      }
    });
    return this;
  }

  extendField(
    fieldName: string,
    partialFieldConfig: $Shape<InputTypeComposerFieldConfigAsObjectDefinition>
  ): InputTypeComposer<TContext> {
    let prevFieldConfig;
    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(
        `Cannot extend field '${fieldName}' from input type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    this.setField(fieldName, {
      ...prevFieldConfig,
      ...(partialFieldConfig: any),
      extensions: {
        ...((prevFieldConfig.extensions: any) || {}),
        ...(partialFieldConfig.extensions || {}),
      },
    });
    return this;
  }

  reorderFields(names: string[]): InputTypeComposer<TContext> {
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

  getFieldConfig(fieldName: string): GraphQLInputFieldConfig {
    const { type, ...rest } = this.getField(fieldName);
    return ({
      type: type.getType(),
      ...(rest: any),
    }: any);
  }

  getFieldType(fieldName: string): GraphQLInputType {
    return this.getField(fieldName).type.getType();
  }

  getFieldTypeName(fieldName: string): string {
    return this.getField(fieldName).type.getTypeName();
  }

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
  getFieldTC(fieldName: string): ComposeNamedInputType<TContext> {
    const anyTC = this.getField(fieldName).type;
    return unwrapInputTC(anyTC);
  }

  /**
   * Alias for `getFieldTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldITC(fieldName: string): InputTypeComposer<TContext> {
    const tc = this.getFieldTC(fieldName);
    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldITC('${fieldName}') must be InputTypeComposer, but received ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  // alias for `isFieldNonNull()` (may be deprecated in future)
  isRequired(fieldName: string): boolean {
    return this.isFieldNonNull(fieldName);
  }

  isFieldNonNull(fieldName: string): boolean {
    return this.getField(fieldName).type instanceof NonNullComposer;
  }

  makeFieldNonNull(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && !(fc.type instanceof NonNullComposer)) {
        fc.type = new NonNullComposer(fc.type);
      }
    });
    return this;
  }

  // alias for makeFieldNonNull()
  makeRequired(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    return this.makeFieldNonNull(fieldNameOrArray);
  }

  makeFieldNullable(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && fc.type instanceof NonNullComposer) {
        fc.type = fc.type.ofType;
      }
    });
    return this;
  }

  makeOptional(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    return this.makeFieldNullable(fieldNameOrArray);
  }

  isFieldPlural(fieldName: string): boolean {
    const type = this.getField(fieldName).type;
    return (
      type instanceof ListComposer ||
      (type instanceof NonNullComposer && type.ofType instanceof ListComposer)
    );
  }

  makeFieldPlural(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && !(fc.type instanceof ListComposer)) {
        fc.type = new ListComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNonPlural(fieldNameOrArray: string | string[]): InputTypeComposer<TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc) {
        if (fc.type instanceof ListComposer) {
          fc.type = fc.type.ofType;
        } else if (fc.type instanceof NonNullComposer && fc.type.ofType instanceof ListComposer) {
          fc.type =
            fc.type.ofType.ofType instanceof NonNullComposer
              ? fc.type.ofType.ofType
              : new NonNullComposer(fc.type.ofType.ofType);
        }
      }
    });
    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLInputObjectType {
    this._gqType.astNode = getInputObjectTypeDefinitionNode(this);
    if (graphqlVersion >= 14) {
      this._gqType._fields = () => {
        return defineInputFieldMap(
          this._gqType,
          mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)),
          this._gqType.astNode
        );
      };
    } else {
      (this._gqType: any)._typeConfig.fields = () => {
        return mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name));
      };
      delete (this._gqType: any)._fields;
    }
    return this._gqType;
  }

  getTypePlural(): ListComposer<InputTypeComposer<TContext>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<InputTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

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
  get List(): ListComposer<InputTypeComposer<TContext>> {
    return new ListComposer(this);
  }

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
  get NonNull(): NonNullComposer<InputTypeComposer<TContext>> {
    return new NonNullComposer(this);
  }

  getTypeName(): string {
    return this._gqType.name;
  }

  setTypeName(name: string): InputTypeComposer<TContext> {
    this._gqType.name = name;
    this.schemaComposer.set(name, this);
    return this;
  }

  getDescription(): string {
    return this._gqType.description || '';
  }

  setDescription(description: string): InputTypeComposer<TContext> {
    this._gqType.description = description;
    return this;
  }

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all cloned
   * settings from this type.
   */
  clone(newTypeNameOrTC: string | InputTypeComposer<any>): InputTypeComposer<TContext> {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide new type name for clone() method');
    }

    const cloned =
      newTypeNameOrTC instanceof InputTypeComposer
        ? newTypeNameOrTC
        : InputTypeComposer.create(newTypeNameOrTC, this.schemaComposer);

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
  ): InputTypeComposer<any> {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for InputTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return (cloneMap.get(this): any);
    const cloned = InputTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);

    cloned._gqcFields = mapEachKey(this._gqcFields, (fieldConfig) => ({
      ...fieldConfig,
      type: cloneTypeTo(fieldConfig.type, anotherSchemaComposer, cloneMap),
      extensions: { ...fieldConfig.extensions },
    }));
    cloned._gqcExtensions = { ...this._gqcExtensions };
    cloned.setDescription(this.getDescription());

    return cloned;
  }

  merge(type: GraphQLInputObjectType | InputTypeComposer<any>): InputTypeComposer<TContext> {
    let tc;
    if (type instanceof GraphQLInputObjectType) {
      tc = InputTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof InputTypeComposer) {
      tc = type;
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with InputObjectType(${this.getTypeName()}). Provided type should be GraphQLInputObjectType or InputTypeComposer.`
      );
    }

    // deep clone all fields
    const fields = ({ ...tc.getFields() }: any);
    Object.keys(fields).forEach((fieldName) => {
      fields[fieldName] = {
        ...fields[fieldName],
        // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
        type: tc.getFieldTypeName(fieldName),
      };
    });
    this.addFields(fields);

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

  setExtensions(extensions: Extensions): InputTypeComposer<TContext> {
    this._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): InputTypeComposer<TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearExtensions(): InputTypeComposer<TContext> {
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

  setExtension(extensionName: string, value: any): InputTypeComposer<TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): InputTypeComposer<TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName: string, extensions: Extensions): InputTypeComposer<TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(fieldName: string, extensions: Extensions): InputTypeComposer<TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): InputTypeComposer<TContext> {
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
  ): InputTypeComposer<TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(fieldName: string, extensionName: string): InputTypeComposer<TContext> {
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

  setDirectives(directives: Array<ExtensionsDirective>): InputTypeComposer<TContext> {
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
  ): InputTypeComposer<TContext> {
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

  // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------

  get(path: string | string[]): TypeInPath<TContext> | void {
    return typeByPath(this, path);
  }

  /**
   * Returns all types which are used inside the current type
   */
  getNestedTCs(
    opts: {
      exclude?: string[],
    } = {},
    passedTypes: Set<NamedTypeComposer<any>> = new Set()
  ): Set<NamedTypeComposer<any>> {
    const exclude = Array.isArray(opts.exclude) ? (opts: any).exclude : [];
    this.getFieldNames().forEach((fieldName) => {
      const itc = this.getFieldTC(fieldName);
      if (!passedTypes.has(itc) && !exclude.includes(itc.getTypeName())) {
        passedTypes.add(itc);
        if (itc instanceof InputTypeComposer) {
          itc.getNestedTCs(opts, passedTypes);
        }
      }
    });
    return passedTypes;
  }

  /**
   * Prints SDL for current type. Or print with all used types if `deep: true` option was provided.
   */
  toSDL(
    opts?: SchemaPrinterOptions & {
      deep?: ?boolean,
      sortTypes?: ?boolean,
      exclude?: ?(string[]),
    }
  ): string {
    const { deep, ...innerOpts } = opts || {};
    const exclude = Array.isArray((innerOpts: any).exclude) ? (innerOpts: any).exclude : [];
    if (deep) {
      let r = '';
      r += printInputObject(this.getType(), innerOpts);

      let nestedTypes = Array.from(this.getNestedTCs({ exclude }));
      if (opts?.sortAll || opts?.sortTypes) {
        nestedTypes = nestedTypes.sort((a, b) => a.getTypeName().localeCompare(b.getTypeName()));
      }
      nestedTypes.forEach((t) => {
        if (t !== this && !exclude.includes(t.getTypeName())) {
          const sdl = t.toSDL(innerOpts);
          if (sdl) r += `\n\n${sdl}`;
        }
      });
      return r;
    }

    return printInputObject(this.getType(), innerOpts);
  }
}
