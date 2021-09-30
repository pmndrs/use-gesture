/* @flow strict */
/* eslint-disable no-use-before-define */

import { GraphQLInterfaceType, GraphQLObjectType } from './graphql';
import { isObject, isString, isFunction } from './utils/is';
import { resolveMaybeThunk, inspect, mapEachKey } from './utils/misc';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import type {
  GraphQLFieldConfig,
  GraphQLFieldConfigMap,
  GraphQLOutputType,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
} from './graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import type { TypeAsString, TypeDefinitionString } from './TypeMapper';
import { SchemaComposer } from './SchemaComposer';
import type {
  ObjectTypeComposerFieldConfigMap,
  ObjectTypeComposerFieldConfig,
  ObjectTypeComposerFieldConfigDefinition,
  ObjectTypeComposerFieldConfigAsObjectDefinition,
  ObjectTypeComposerFieldConfigMapDefinition,
  ObjectTypeComposerArgumentConfigMapDefinition,
  ObjectTypeComposerArgumentConfig,
  ObjectTypeComposerArgumentConfigDefinition,
  ObjectTypeComposerArgumentConfigMap,
} from './ObjectTypeComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { ThunkComposer } from './ThunkComposer';
import type {
  Thunk,
  Extensions,
  MaybePromise,
  DirectiveArgs,
  ExtensionsDirective,
} from './utils/definitions';
import { toInputObjectType } from './utils/toInputType';
import type { ToInputTypeOpts } from './utils/toInputType';
import { typeByPath, type TypeInPath } from './utils/typeByPath';
import {
  getComposeTypeName,
  getGraphQLType,
  unwrapOutputTC,
  unwrapInputTC,
  isTypeNameString,
  cloneTypeTo,
  type NamedTypeComposer,
} from './utils/typeHelpers';
import {
  defineFieldMap,
  convertObjectFieldMapToConfig,
  convertInterfaceArrayAsThunk,
} from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';
import type { ComposeNamedInputType, ComposeNamedOutputType } from './utils/typeHelpers';
import { printInterface, type SchemaPrinterOptions } from './utils/schemaPrinter';
import { getInterfaceTypeDefinitionNode } from './utils/definitionNode';

export type InterfaceTypeComposerDefinition<TSource, TContext> =
  | TypeAsString
  | TypeDefinitionString
  | InterfaceTypeComposerAsObjectDefinition<TSource, TContext>
  | GraphQLInterfaceType
  | $ReadOnly<InterfaceTypeComposerThunked<any, TContext>>;

export type InterfaceTypeComposerAsObjectDefinition<TSource, TContext> = {
  name: string,
  fields?: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>,
  resolveType?: null | GraphQLTypeResolver<TSource, TContext>,
  description?: null | string,
  extensions?: Extensions,
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
  | ThunkComposer<InterfaceTypeComposer<any, any>, GraphQLInterfaceType>;

export class InterfaceTypeComposer<TSource, TContext> {
  schemaComposer: SchemaComposer<TContext>;
  _gqType: GraphQLInterfaceType;
  _gqcFields: ObjectTypeComposerFieldConfigMap<TSource, TContext>;
  _gqcInputTypeComposer: void | InputTypeComposer<TContext>;
  _gqcInterfaces: Array<InterfaceTypeComposerThunked<TSource, TContext>> = [];
  _gqcTypeResolvers: void | InterfaceTypeComposerResolversMap<TContext>;
  _gqcFallbackResolveType: ObjectTypeComposer<any, TContext> | GraphQLObjectType | null = null;
  _gqcExtensions: void | Extensions;

  // Also supported `GraphQLInterfaceType` but in such case FlowType force developers
  // to explicitly write annotations in their code. But it's bad.
  static create<TSrc, TCtx>(
    typeDef: InterfaceTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `InterfaceTypeComposer.create(typeDef, schemaComposer)`'
      );
    }

    if (schemaComposer.hasInstance(typeDef, InterfaceTypeComposer)) {
      return schemaComposer.getIFTC(typeDef);
    }

    const iftc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(iftc);
    return iftc;
  }

  static createTemp<TSrc, TCtx>(
    typeDef: InterfaceTypeComposerDefinition<TSrc, TCtx>,
    schemaComposer?: SchemaComposer<TCtx>
  ): InterfaceTypeComposer<TSrc, TCtx> {
    const sc = schemaComposer || new SchemaComposer();

    let IFTC;

    if (isString(typeDef)) {
      const typeName: string = typeDef;
      if (isTypeNameString(typeName)) {
        IFTC = new InterfaceTypeComposer(
          new GraphQLInterfaceType({
            name: typeName,
            fields: () => ({}),
          }),
          sc
        );
      } else {
        IFTC = sc.typeMapper.convertSDLTypeDefinition(typeName);
        if (!(IFTC instanceof InterfaceTypeComposer)) {
          throw new Error(
            'You should provide correct GraphQLInterfaceType type definition. ' +
              'Eg. `interface MyType { id: ID!, name: String! }`'
          );
        }
      }
    } else if (typeDef instanceof GraphQLInterfaceType) {
      IFTC = new InterfaceTypeComposer(typeDef, sc);
    } else if (typeDef instanceof InterfaceTypeComposer) {
      IFTC = typeDef;
    } else if (
      isObject(typeDef) &&
      !(typeDef instanceof InterfaceTypeComposer) // hate Flow 😈
    ) {
      const type = new GraphQLInterfaceType({
        ...(typeDef: any),
        fields: () => ({}),
      });
      IFTC = new InterfaceTypeComposer(type, sc);

      const fields = (typeDef: any).fields;
      if (isFunction(fields)) {
        // `convertOutputFieldMapToConfig` helps to solve hoisting problems
        // rewrap fields `() => { f1: { type: A } }` -> `{ f1: { type: () => A } }`
        IFTC.addFields(convertObjectFieldMapToConfig(fields, sc));
      } else if (isObject(fields)) {
        IFTC.addFields(fields);
      }

      const interfaces = (typeDef: any).interfaces;
      if (Array.isArray(interfaces)) IFTC.setInterfaces(interfaces);
      else if (isFunction(interfaces)) {
        // rewrap interfaces `() => [i1, i2]` -> `[()=>i1, ()=>i2]`
        // helps to solve hoisting problems
        IFTC.setInterfaces(convertInterfaceArrayAsThunk(interfaces, sc));
      }

      IFTC._gqcExtensions = (typeDef: any).extensions || {};
    } else {
      throw new Error(
        `You should provide GraphQLInterfaceTypeConfig or string with interface name or SDL definition. Provided:\n${inspect(
          typeDef
        )}`
      );
    }

    return IFTC;
  }

  constructor(
    graphqlType: GraphQLInterfaceType,
    schemaComposer: SchemaComposer<TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error(
        'You must provide SchemaComposer instance as a second argument for `new InterfaceTypeComposer(GraphQLInterfaceType, SchemaComposer)`'
      );
    }
    if (!(graphqlType instanceof GraphQLInterfaceType)) {
      throw new Error('InterfaceTypeComposer accept only GraphQLInterfaceType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType;

    // add itself to TypeStorage on create
    // it avoids recursive type use errors
    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    if (graphqlVersion >= 15) {
      this._gqcFields = convertObjectFieldMapToConfig(this._gqType._fields, this.schemaComposer);
      this._gqcInterfaces = convertInterfaceArrayAsThunk(
        this._gqType._interfaces,
        this.schemaComposer
      );
    } else if (graphqlVersion >= 14) {
      this._gqcFields = convertObjectFieldMapToConfig(this._gqType._fields, this.schemaComposer);
    } else {
      // read
      const fields: Thunk<GraphQLFieldConfigMap<any, TContext>> = (this._gqType: any)._typeConfig
        .fields;
      this._gqcFields = this.schemaComposer.typeMapper.convertOutputFieldConfigMap(
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

  getFields(): ObjectTypeComposerFieldConfigMap<TSource, TContext> {
    return this._gqcFields;
  }

  getFieldNames(): string[] {
    return Object.keys(this._gqcFields);
  }

  getField(fieldName: string): ObjectTypeComposerFieldConfig<TSource, TContext> {
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
        `Cannot get field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
      );
    }
    return field;
  }

  hasField(fieldName: string): boolean {
    return !!this._gqcFields[fieldName];
  }

  setFields(
    fields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._gqcFields = {};
    Object.keys(fields).forEach((name) => {
      this.setField(name, fields[name]);
    });
    return this;
  }

  setField(
    fieldName: string,
    fieldConfig: ObjectTypeComposerFieldConfigDefinition<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._gqcFields[fieldName] = isFunction(fieldConfig)
      ? (fieldConfig: any)
      : this.schemaComposer.typeMapper.convertOutputFieldConfig(
          fieldConfig,
          fieldName,
          this.getTypeName()
        );
    return this;
  }

  /**
   * Add new fields or replace existed in a GraphQL type
   */
  addFields(
    newFields: ObjectTypeComposerFieldConfigMapDefinition<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    Object.keys(newFields).forEach((name) => {
      this.setField(name, newFields[name]);
    });
    return this;
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
  removeField(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
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
          if (subTC instanceof ObjectTypeComposer || subTC instanceof EnumTypeComposer) {
            subTC.removeField(names.join('.'));
          }
        }
      }
    });
    return this;
  }

  removeOtherFields(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    Object.keys(this._gqcFields).forEach((fieldName) => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete this._gqcFields[fieldName];
      }
    });
    return this;
  }

  reorderFields(names: string[]): InterfaceTypeComposer<TSource, TContext> {
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
    fieldName: string,
    partialFieldConfig: $Shape<ObjectTypeComposerFieldConfigAsObjectDefinition<TSource, TContext>>
  ): InterfaceTypeComposer<TSource, TContext> {
    let prevFieldConfig;
    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(
        `Cannot extend field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`
      );
    }

    this.setField(fieldName, {
      ...prevFieldConfig,
      ...(partialFieldConfig: any),
      extensions: {
        ...(prevFieldConfig.extensions || {}),
        ...((partialFieldConfig.extensions: any) || {}),
      },
    });
    return this;
  }

  getFieldConfig(fieldName: string): GraphQLFieldConfig<TSource, TContext> {
    const { type, args, ...rest } = this.getField(fieldName);
    return ({
      type: type.getType(),
      args:
        args &&
        mapEachKey(args, (ac) => ({
          ...ac,
          type: ac.type.getType(),
        })),
      ...(rest: any),
    }: any);
  }

  getFieldType(fieldName: string): GraphQLOutputType {
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
  getFieldTC(fieldName: string): ComposeNamedOutputType<TContext> {
    const anyTC = this.getField(fieldName).type;
    return unwrapOutputTC(anyTC);
  }

  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldOTC(fieldName: string): ObjectTypeComposer<TSource, TContext> {
    const tc = this.getFieldTC(fieldName);
    if (!(tc instanceof ObjectTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldOTC('${fieldName}') must be ObjectTypeComposer, but received ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  isFieldNonNull(fieldName: string): boolean {
    return this.getField(fieldName).type instanceof NonNullComposer;
  }

  makeFieldNonNull(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && !(fc.type instanceof NonNullComposer)) {
        fc.type = new NonNullComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNullable(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && fc.type instanceof NonNullComposer) {
        fc.type = fc.type.ofType;
      }
    });
    return this;
  }

  isFieldPlural(fieldName: string): boolean {
    const type = this.getField(fieldName).type;
    return (
      type instanceof ListComposer ||
      (type instanceof NonNullComposer && type.ofType instanceof ListComposer)
    );
  }

  makeFieldPlural(fieldNameOrArray: string | string[]): InterfaceTypeComposer<TSource, TContext> {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach((fieldName) => {
      const fc = this._gqcFields[fieldName];
      if (fc && !(fc.type instanceof ListComposer)) {
        fc.type = new ListComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNonPlural(
    fieldNameOrArray: string | string[]
  ): InterfaceTypeComposer<TSource, TContext> {
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

  deprecateFields(
    fields: { [fieldName: string]: string } | string[] | string
  ): InterfaceTypeComposer<TSource, TContext> {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(
          `Cannot deprecate non-existent field '${fields}' from interface type '${this.getTypeName()}'`
        );
      }
      this.extendField(fields, { deprecationReason: 'deprecated' });
    } else if (Array.isArray(fields)) {
      fields.forEach((field) => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate non-existent field '${field}' from interface type '${this.getTypeName()}'`
          );
        }
        this.extendField(field, { deprecationReason: 'deprecated' });
      });
    } else {
      const fieldMap: Object = (fields: any);
      Object.keys(fieldMap).forEach((field) => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(
            `Cannot deprecate non-existent field '${field}' from interface type '${this.getTypeName()}'`
          );
        }
        const deprecationReason: string = fieldMap[field];
        this.extendField(field, { deprecationReason });
      });
    }

    return this;
  }

  getFieldArgs<TArgs = any>(fieldName: string): ObjectTypeComposerArgumentConfigMap<TArgs> {
    try {
      const fc = this.getField(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(
        `Cannot get field args. Field '${fieldName}' from type '${this.getTypeName()}' does not exist.`
      );
    }
  }

  getFieldArgNames(fieldName: string): string[] {
    return Object.keys(this.getFieldArgs(fieldName));
  }

  hasFieldArg(fieldName: string, argName: string): boolean {
    try {
      const fieldArgs = this.getFieldArgs(fieldName);
      return !!fieldArgs[argName];
    } catch (e) {
      return false;
    }
  }

  getFieldArg(fieldName: string, argName: string): ObjectTypeComposerArgumentConfig {
    const fieldArgs = this.getFieldArgs(fieldName);
    const arg = fieldArgs[argName];
    if (!arg) {
      throw new Error(
        `Cannot get '${this.getTypeName()}.${fieldName}@${argName}'. Argument does not exist.`
      );
    }
    return arg;
  }

  getFieldArgType(fieldName: string, argName: string): GraphQLInputType {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.type.getType();
  }

  getFieldArgTypeName(fieldName: string, argName: string): string {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.type.getTypeName();
  }

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
  getFieldArgTC(fieldName: string, argName: string): ComposeNamedInputType<TContext> {
    const anyTC = this.getFieldArg(fieldName, argName).type;
    return unwrapInputTC(anyTC);
  }

  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */
  getFieldArgITC(fieldName: string, argName: string): InputTypeComposer<TContext> {
    const tc = this.getFieldArgTC(fieldName, argName);
    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(
        `${this.getTypeName()}.getFieldArgITC('${fieldName}', '${argName}') must be InputTypeComposer, but received ${
          tc.constructor.name
        }. Maybe you need to use 'getFieldArgTC()' method which returns any type composer?`
      );
    }
    return tc;
  }

  setFieldArgs(
    fieldName: string,
    args: ObjectTypeComposerArgumentConfigMapDefinition<any>
  ): InterfaceTypeComposer<TSource, TContext> {
    const fc = this.getField(fieldName);
    fc.args = this.schemaComposer.typeMapper.convertArgConfigMap(
      args,
      fieldName,
      this.getTypeName()
    );
    return this;
  }

  addFieldArgs(
    fieldName: string,
    newArgs: ObjectTypeComposerArgumentConfigMapDefinition<any>
  ): InterfaceTypeComposer<TSource, TContext> {
    const fc = this.getField(fieldName);
    fc.args = {
      ...fc.args,
      ...this.schemaComposer.typeMapper.convertArgConfigMap(newArgs, fieldName, this.getTypeName()),
    };
    return this;
  }

  setFieldArg(
    fieldName: string,
    argName: string,
    argConfig: ObjectTypeComposerArgumentConfigDefinition
  ): InterfaceTypeComposer<TSource, TContext> {
    const fc = this.getField(fieldName);
    fc.args = fc.args || {};
    (fc.args: any)[argName] = this.schemaComposer.typeMapper.convertArgConfig(
      argConfig,
      argName,
      fieldName,
      this.getTypeName()
    );
    return this;
  }

  isFieldArgPlural(fieldName: string, argName: string): boolean {
    const type = this.getFieldArg(fieldName, argName).type;
    return (
      type instanceof ListComposer ||
      (type instanceof NonNullComposer && type.ofType instanceof ListComposer)
    );
  }

  makeFieldArgPlural(
    fieldName: string,
    argNameOrArray: string | string[]
  ): InterfaceTypeComposer<TSource, TContext> {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach((argName) => {
      const ac = args[argName];
      if (ac && !(ac.type instanceof ListComposer)) {
        ac.type = new ListComposer(ac.type);
      }
    });
    return this;
  }

  makeFieldArgNonPlural(
    fieldName: string,
    argNameOrArray: string | string[]
  ): InterfaceTypeComposer<TSource, TContext> {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach((argName) => {
      const ac = args[argName];
      if (ac) {
        if (ac.type instanceof ListComposer) {
          ac.type = ac.type.ofType;
        } else if (ac.type instanceof NonNullComposer && ac.type.ofType instanceof ListComposer) {
          ac.type =
            ac.type.ofType.ofType instanceof NonNullComposer
              ? ac.type.ofType.ofType
              : new NonNullComposer(ac.type.ofType.ofType);
        }
      }
    });
    return this;
  }

  isFieldArgNonNull(fieldName: string, argName: string): boolean {
    const type = this.getFieldArg(fieldName, argName).type;
    return type instanceof NonNullComposer;
  }

  makeFieldArgNonNull(
    fieldName: string,
    argNameOrArray: string | string[]
  ): InterfaceTypeComposer<TSource, TContext> {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach((argName) => {
      const ac = args[argName];
      if (ac && !(ac.type instanceof NonNullComposer)) {
        ac.type = new NonNullComposer(ac.type);
      }
    });
    return this;
  }

  makeFieldArgNullable(
    fieldName: string,
    argNameOrArray: string | string[]
  ): InterfaceTypeComposer<TSource, TContext> {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach((argName) => {
      const ac = args[argName];
      if (ac && ac.type instanceof NonNullComposer) {
        ac.type = ac.type.ofType;
      }
    });
    return this;
  }

  // -----------------------------------------------
  // Type methods
  // -----------------------------------------------

  getType(): GraphQLInterfaceType {
    this._gqType.astNode = getInterfaceTypeDefinitionNode(this);
    if (graphqlVersion >= 15) {
      this._gqType._fields = () =>
        defineFieldMap(
          this._gqType,
          mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)),
          this._gqType.astNode
        );
      this._gqType._interfaces = () => this.getInterfacesTypes();
    } else if (graphqlVersion >= 14) {
      this._gqType._fields = () =>
        defineFieldMap(
          this._gqType,
          mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)),
          this._gqType.astNode
        );
    } else {
      (this._gqType: any)._typeConfig.fields = () => {
        return mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name));
      };
      this._gqType._fields = {}; // clear builded fields in type
    }
    return this._gqType;
  }

  getTypePlural(): ListComposer<InterfaceTypeComposer<TSource, TContext>> {
    return new ListComposer(this);
  }

  getTypeNonNull(): NonNullComposer<InterfaceTypeComposer<TSource, TContext>> {
    return new NonNullComposer(this);
  }

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
  get List(): ListComposer<InterfaceTypeComposer<TSource, TContext>> {
    return new ListComposer(this);
  }

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
  get NonNull(): NonNullComposer<InterfaceTypeComposer<TSource, TContext>> {
    return new NonNullComposer(this);
  }

  getTypeName(): string {
    return this._gqType.name;
  }

  setTypeName(name: string): InterfaceTypeComposer<TSource, TContext> {
    this._gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription(): string {
    return this._gqType.description || '';
  }

  setDescription(description: string): InterfaceTypeComposer<TSource, TContext> {
    this._gqType.description = description;
    return this;
  }

  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all cloned
   * settings from this type.
   */
  clone(
    newTypeNameOrTC: string | InterfaceTypeComposer<any, any>
  ): InterfaceTypeComposer<TSource, TContext> {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide newTypeName:string for InterfaceTypeComposer.clone()');
    }

    const cloned =
      newTypeNameOrTC instanceof InterfaceTypeComposer
        ? newTypeNameOrTC
        : InterfaceTypeComposer.create(newTypeNameOrTC, this.schemaComposer);

    cloned._gqcFields = mapEachKey(this._gqcFields, (fieldConfig) => ({
      ...fieldConfig,
      args: mapEachKey(fieldConfig.args, (argConfig) => ({
        ...argConfig,
        extensions: { ...argConfig.extensions },
      })),
      extensions: { ...fieldConfig.extensions },
    }));
    cloned._gqcInterfaces = [...this._gqcInterfaces];
    cloned._gqcTypeResolvers = new Map(this._gqcTypeResolvers);
    cloned._gqcFallbackResolveType = this._gqcFallbackResolveType;
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
  ): InterfaceTypeComposer<any, any> {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for InterfaceTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return (cloneMap.get(this): any);
    const cloned = InterfaceTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);

    cloned._gqcFields = mapEachKey(this._gqcFields, (fieldConfig) => ({
      ...fieldConfig,
      type: cloneTypeTo(fieldConfig.type, anotherSchemaComposer, cloneMap),
      args: mapEachKey(fieldConfig.args, (argConfig) => ({
        ...argConfig,
        type: cloneTypeTo(argConfig.type, anotherSchemaComposer, cloneMap),
        extensions: { ...argConfig.extensions },
      })),
      extensions: { ...fieldConfig.extensions },
    }));
    cloned._gqcInterfaces = (this._gqcInterfaces.map((i) =>
      i.cloneTo(anotherSchemaComposer, cloneMap)
    ): any);
    cloned._gqcExtensions = { ...this._gqcExtensions };
    cloned.setDescription(this.getDescription());

    // clone this._gqcTypeResolvers
    const typeResolversMap = this.getTypeResolvers();
    if (typeResolversMap.size > 0) {
      const clonedTypeResolvers: InterfaceTypeComposerResolversMap<any> = new Map();
      typeResolversMap.forEach((fn, tc) => {
        const clonedTC: ObjectTypeComposer<any, any> | GraphQLObjectType = (cloneTypeTo(
          tc,
          anotherSchemaComposer,
          cloneMap
        ): any);
        clonedTypeResolvers.set(clonedTC, fn);
      });
      cloned.setTypeResolvers(clonedTypeResolvers);
    }
    if (this._gqcFallbackResolveType) {
      cloned._gqcFallbackResolveType = (cloneTypeTo(
        this._gqcFallbackResolveType,
        anotherSchemaComposer,
        cloneMap
      ): any);
    }

    return cloned;
  }

  merge(
    type:
      | GraphQLInterfaceType
      | GraphQLObjectType
      | InterfaceTypeComposer<any, any>
      | ObjectTypeComposer<any, any>
  ): InterfaceTypeComposer<TSource, TContext> {
    let tc;
    if (type instanceof ObjectTypeComposer || type instanceof InterfaceTypeComposer) {
      tc = type;
    } else if (type instanceof GraphQLObjectType) {
      tc = ObjectTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof GraphQLInterfaceType) {
      tc = InterfaceTypeComposer.createTemp(type, this.schemaComposer);
    } else {
      throw new Error(
        `Cannot merge ${inspect(
          type
        )} with InterfaceType(${this.getTypeName()}). Provided type should be GraphQLInterfaceType, GraphQLObjectType, InterfaceTypeComposer or ObjectTypeComposer.`
      );
    }

    // deep clone all fields with args
    const fields = ({ ...tc.getFields() }: any);
    Object.keys(fields).forEach((fieldName) => {
      fields[fieldName] = {
        ...fields[fieldName],
        args: {
          ...fields[fieldName].args,
        },
        // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
        type: tc.getFieldTypeName(fieldName),
      };
      tc.getFieldArgNames(fieldName).forEach((argName) => {
        fields[fieldName].args[argName] = {
          ...fields[fieldName].args[argName],
          // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
          type: tc.getFieldArgTypeName(fieldName, argName),
        };
      });
    });
    this.addFields(fields);

    // set interfaces as SDL string, it automatically will be remapped to the correct type instance in the current schema
    this.addInterfaces(tc.getInterfaces().map((i) => i.getTypeName()));

    // Feel free to add other properties for merging two TypeComposers.
    // For simplicity it just merge fields and interfaces.

    return this;
  }

  // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------

  getInputType(): GraphQLInputObjectType {
    return this.getInputTypeComposer().getType();
  }

  hasInputTypeComposer(): boolean {
    return !!this._gqcInputTypeComposer;
  }

  setInputTypeComposer(itc: InputTypeComposer<TContext>): InterfaceTypeComposer<TSource, TContext> {
    this._gqcInputTypeComposer = itc;
    return this;
  }

  getInputTypeComposer(opts?: ToInputTypeOpts): InputTypeComposer<TContext> {
    if (!this._gqcInputTypeComposer) {
      this._gqcInputTypeComposer = toInputObjectType(this, opts);
    }

    return this._gqcInputTypeComposer;
  }

  getITC(opts?: ToInputTypeOpts): InputTypeComposer<TContext> {
    return this.getInputTypeComposer(opts);
  }

  removeInputTypeComposer(): InterfaceTypeComposer<TSource, TContext> {
    this._gqcInputTypeComposer = undefined;
    return this;
  }

  // -----------------------------------------------
  // ResolveType methods
  // -----------------------------------------------

  getResolveType(): ?GraphQLTypeResolver<TSource, TContext> {
    return (this._gqType.resolveType: any);
  }

  setResolveType(
    fn: ?GraphQLTypeResolver<TSource, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._gqType.resolveType = fn;
    return this;
  }

  hasTypeResolver(type: ObjectTypeComposer<any, TContext> | GraphQLObjectType): boolean {
    const typeResolversMap = this.getTypeResolvers();
    return typeResolversMap.has(type);
  }

  getTypeResolvers(): InterfaceTypeComposerResolversMap<TContext> {
    if (!this._gqcTypeResolvers) {
      this._gqcTypeResolvers = new Map();
    }
    return this._gqcTypeResolvers;
  }

  getTypeResolverCheckFn(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeComposerResolverCheckFn<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();

    if (!typeResolversMap.has(type)) {
      throw new Error(
        `Type resolve function in interface '${this.getTypeName()}' is not defined for type ${inspect(
          type
        )}.`
      );
    }

    return (typeResolversMap.get(type): any);
  }

  getTypeResolverNames(): string[] {
    const typeResolversMap = this.getTypeResolvers();
    const names = [];
    typeResolversMap.forEach((resolveFn, composeType) => {
      if (composeType instanceof ObjectTypeComposer) {
        names.push(composeType.getTypeName());
      } else if (composeType && composeType.name) {
        names.push(composeType.name);
      }
    });
    return names;
  }

  getTypeResolverTypes(): GraphQLObjectType[] {
    const typeResolversMap = this.getTypeResolvers();
    const types = [];
    typeResolversMap.forEach((resolveFn, composeType) => {
      types.push(((getGraphQLType(composeType): any): GraphQLObjectType));
    });
    return types;
  }

  setTypeResolvers(
    typeResolversMap: InterfaceTypeComposerResolversMap<TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._isTypeResolversValid(typeResolversMap);
    this._gqcTypeResolvers = typeResolversMap;
    this._initResolveTypeFn();
    return this;
  }

  _initResolveTypeFn(): InterfaceTypeComposer<TSource, TContext> {
    const typeResolversMap = this._gqcTypeResolvers || new Map();
    const fallbackType = this._gqcFallbackResolveType
      ? (getGraphQLType(this._gqcFallbackResolveType): any)
      : null;

    // extract GraphQLObjectType from ObjectTypeComposer
    const fastEntries = [];
    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      fastEntries.push([((getGraphQLType(composeType): any): GraphQLObjectType), checkFn]);
    }

    let resolveType;
    const isAsyncRuntime = this._isTypeResolversAsync(typeResolversMap);
    if (isAsyncRuntime) {
      resolveType = async (value, context, info) => {
        for (const [_gqType, checkFn] of fastEntries) {
          // should we run checkFn simultaneously or in serial?
          // Current decision is: don't SPIKE event loop - run in serial (it may be changed in future)
          // eslint-disable-next-line no-await-in-loop
          if (await checkFn(value, context, info)) return _gqType;
        }
        return fallbackType;
      };
    } else {
      resolveType = (value, context, info) => {
        for (const [_gqType, checkFn] of fastEntries) {
          if (checkFn(value, context, info)) return _gqType;
        }
        return fallbackType;
      };
    }

    this.setResolveType(resolveType);
    return this;
  }

  _isTypeResolversValid(typeResolversMap: InterfaceTypeComposerResolversMap<TContext>): true {
    if (!(typeResolversMap instanceof Map)) {
      throw new Error(
        `For interface ${this.getTypeName()} you should provide Map object for type resolvers.`
      );
    }

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      this._isTypeResolverValid(composeType, checkFn);
    }

    return true;
  }

  _isTypeResolverValid(
    composeType: ObjectTypeComposer<any, TContext> | GraphQLObjectType,
    checkFn: InterfaceTypeComposerResolverCheckFn<any, TContext>
  ): true {
    // checking composeType
    try {
      const type = getGraphQLType(composeType);
      if (!(type instanceof GraphQLObjectType)) throw new Error('Must be GraphQLObjectType');
    } catch (e) {
      throw new Error(
        `For interface type resolver ${this.getTypeName()} you must provide GraphQLObjectType or ObjectTypeComposer, but provided ${inspect(
          composeType
        )}`
      );
    }

    // checking checkFn
    if (!isFunction(checkFn)) {
      throw new Error(
        `Interface ${this.getTypeName()} has invalid check function for type ${inspect(
          composeType
        )}`
      );
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  _isTypeResolversAsync(typeResolversMap: InterfaceTypeComposerResolversMap<TContext>): boolean {
    let res = false;
    for (const [, checkFn] of typeResolversMap.entries()) {
      try {
        const r = checkFn(({}: any), ({}: any), ({}: any));
        if (r instanceof Promise) {
          r.catch(() => {});
          res = true;
        }
      } catch (e) {
        // noop
      }
    }
    return res;
  }

  addTypeResolver<TSrc>(
    type: ObjectTypeComposer<TSrc, TContext> | GraphQLObjectType,
    checkFn: InterfaceTypeComposerResolverCheckFn<TSrc, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();
    this._isTypeResolverValid(type, checkFn);
    typeResolversMap.set(type, checkFn);
    this._initResolveTypeFn();

    // ensure that interface added to ObjectType
    if (type instanceof ObjectTypeComposer) {
      type.addInterface(this);
    }

    // ensure that resolved type will be in Schema
    this.schemaComposer.addSchemaMustHaveType(type);

    return this;
  }

  removeTypeResolver(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType
  ): InterfaceTypeComposer<TSource, TContext> {
    const typeResolversMap = this.getTypeResolvers();
    typeResolversMap.delete(type);
    this._initResolveTypeFn();
    return this;
  }

  setTypeResolverFallback(
    type: ObjectTypeComposer<any, TContext> | GraphQLObjectType | null
  ): InterfaceTypeComposer<TSource, TContext> {
    if (type) {
      // ensure that interface added to ObjectType
      if (type instanceof ObjectTypeComposer) {
        type.addInterface(this);
      }
      // ensure that resolved type will be in Schema
      this.schemaComposer.addSchemaMustHaveType(type);
    }

    this._gqcFallbackResolveType = type;
    this._initResolveTypeFn();
    return this;
  }

  // -----------------------------------------------
  // Sub-Interface methods
  // -----------------------------------------------

  getInterfaces(): Array<InterfaceTypeComposerThunked<TSource, TContext>> {
    return this._gqcInterfaces;
  }

  getInterfacesTypes(): Array<GraphQLInterfaceType> {
    return this._gqcInterfaces.map((i) => i.getType());
  }

  setInterfaces(
    interfaces: $ReadOnlyArray<InterfaceTypeComposerDefinition<any, TContext>>
  ): InterfaceTypeComposer<TSource, TContext> {
    this._gqcInterfaces = convertInterfaceArrayAsThunk(interfaces, this.schemaComposer);
    return this;
  }

  hasInterface(iface: InterfaceTypeComposerDefinition<any, TContext>): boolean {
    const typeName = getComposeTypeName(iface, this.schemaComposer);
    return !!this._gqcInterfaces.find((i) => i.getTypeName() === typeName);
  }

  addInterface(
    iface:
      | InterfaceTypeComposerDefinition<any, TContext>
      | InterfaceTypeComposerThunked<any, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    if (!this.hasInterface(iface)) {
      this._gqcInterfaces.push(
        this.schemaComposer.typeMapper.convertInterfaceTypeDefinition(iface)
      );
    }
    return this;
  }

  addInterfaces(
    ifaces: $ReadOnlyArray<
      InterfaceTypeComposerDefinition<any, TContext> | InterfaceTypeComposerThunked<any, TContext>
    >
  ): InterfaceTypeComposer<TSource, TContext> {
    if (!Array.isArray(ifaces)) {
      throw new Error(
        `InterfaceTypeComposer[${this.getTypeName()}].addInterfaces() accepts only array`
      );
    }
    ifaces.forEach((iface) => this.addInterface(iface));
    return this;
  }

  removeInterface(
    iface: InterfaceTypeComposerDefinition<any, TContext>
  ): InterfaceTypeComposer<TSource, TContext> {
    const typeName = getComposeTypeName(iface, this.schemaComposer);
    this._gqcInterfaces = this._gqcInterfaces.filter((i) => i.getTypeName() !== typeName);
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

  setExtensions(extensions: Extensions): InterfaceTypeComposer<TSource, TContext> {
    this._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions: Extensions): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getExtensions();
    this.setExtensions({
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearExtensions(): InterfaceTypeComposer<TSource, TContext> {
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

  setExtension(extensionName: string, value: any): InterfaceTypeComposer<TSource, TContext> {
    this.extendExtensions({
      [extensionName]: value,
    });
    return this;
  }

  removeExtension(extensionName: string): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getExtensions() };
    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName: string): Extensions {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const field = this.getField(fieldName);
    this.setField(fieldName, { ...field, extensions });
    return this;
  }

  extendFieldExtensions(
    fieldName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, {
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearFieldExtensions(fieldName: string): InterfaceTypeComposer<TSource, TContext> {
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
  ): InterfaceTypeComposer<TSource, TContext> {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldExtension(
    fieldName: string,
    extensionName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getFieldExtensions(fieldName) };
    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
    return this;
  }

  getFieldArgExtensions(fieldName: string, argName: string): Extensions {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.extensions || {};
  }

  setFieldArgExtensions(
    fieldName: string,
    argName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const ac = this.getFieldArg(fieldName, argName);
    this.setFieldArg(fieldName, argName, { ...ac, extensions });
    return this;
  }

  extendFieldArgExtensions(
    fieldName: string,
    argName: string,
    extensions: Extensions
  ): InterfaceTypeComposer<TSource, TContext> {
    const current = this.getFieldArgExtensions(fieldName, argName);
    this.setFieldArgExtensions(fieldName, argName, {
      ...current,
      ...(extensions: any),
    });
    return this;
  }

  clearFieldArgExtensions(
    fieldName: string,
    argName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    this.setFieldArgExtensions(fieldName, argName, {});
    return this;
  }

  getFieldArgExtension(fieldName: string, argName: string, extensionName: string): ?any {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensions[extensionName];
  }

  hasFieldArgExtension(fieldName: string, argName: string, extensionName: string): boolean {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensionName in extensions;
  }

  setFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string,
    value: any
  ): InterfaceTypeComposer<TSource, TContext> {
    this.extendFieldArgExtensions(fieldName, argName, {
      [extensionName]: value,
    });
    return this;
  }

  removeFieldArgExtension(
    fieldName: string,
    argName: string,
    extensionName: string
  ): InterfaceTypeComposer<TSource, TContext> {
    const extensions = { ...this.getFieldArgExtensions(fieldName, argName) };
    delete extensions[extensionName];
    this.setFieldArgExtensions(fieldName, argName, extensions);
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

  setDirectives(directives: Array<ExtensionsDirective>): InterfaceTypeComposer<TSource, TContext> {
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
  ): InterfaceTypeComposer<TSource, TContext> {
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

  getFieldArgDirectives(fieldName: string, argName: string): Array<ExtensionsDirective> {
    const directives = this.getFieldArgExtension(fieldName, argName, 'directives');
    if (Array.isArray(directives)) {
      return directives;
    }
    return [];
  }

  setFieldArgDirectives(
    fieldName: string,
    argName: string,
    directives: Array<ExtensionsDirective>
  ): InterfaceTypeComposer<TSource, TContext> {
    this.setFieldArgExtension(fieldName, argName, 'directives', directives);
    return this;
  }

  getFieldArgDirectiveNames(fieldName: string, argName: string): string[] {
    return this.getFieldArgDirectives(fieldName, argName).map((d) => d.name);
  }

  getFieldArgDirectiveByName(
    fieldName: string,
    argName: string,
    directiveName: string
  ): ?DirectiveArgs {
    const directive = this.getFieldArgDirectives(fieldName, argName).find(
      (d) => d.name === directiveName
    );
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectiveById(fieldName: string, argName: string, idx: number): ?DirectiveArgs {
    const directive = this.getFieldArgDirectives(fieldName, argName)[idx];
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
      const tc = this.getFieldTC(fieldName);
      if (!passedTypes.has(tc) && !exclude.includes(tc.getTypeName())) {
        passedTypes.add(tc);
        if (tc instanceof ObjectTypeComposer || tc instanceof UnionTypeComposer) {
          tc.getNestedTCs(opts, passedTypes);
        }
      }

      this.getFieldArgNames(fieldName).forEach((argName) => {
        const itc = this.getFieldArgTC(fieldName, argName);
        if (!passedTypes.has(itc) && !exclude.includes(itc.getTypeName())) {
          passedTypes.add(itc);
          if (itc instanceof InputTypeComposer) {
            itc.getNestedTCs(opts, passedTypes);
          }
        }
      });

      this.getInterfaces().forEach((t) => {
        const iftc = t instanceof ThunkComposer ? t.ofType : t;
        if (!passedTypes.has(iftc) && !exclude.includes(iftc.getTypeName())) {
          passedTypes.add(iftc);
          iftc.getNestedTCs(opts, passedTypes);
        }
      });
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
      r += printInterface(this.getType(), innerOpts);

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

    return printInterface(this.getType(), innerOpts);
  }
}
