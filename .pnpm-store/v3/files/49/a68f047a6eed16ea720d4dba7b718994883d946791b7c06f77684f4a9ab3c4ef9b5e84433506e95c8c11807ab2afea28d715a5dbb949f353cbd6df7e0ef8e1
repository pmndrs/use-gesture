function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLInterfaceType } from './graphql';
import { InputTypeComposer } from './InputTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { InterfaceTypeComposer } from './InterfaceTypeComposer';
import { Resolver } from './Resolver';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { ThunkComposer } from './ThunkComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { resolveMaybeThunk, upperFirst, inspect, mapEachKey } from './utils/misc';
import { isObject, isFunction, isString } from './utils/is';
import { defineFieldMap, convertObjectFieldMapToConfig, convertInterfaceArrayAsThunk } from './utils/configToDefine';
import { toInputObjectType } from './utils/toInputType';
import { typeByPath } from './utils/typeByPath';
import { getComposeTypeName, unwrapOutputTC, unwrapInputTC, isTypeNameString, cloneTypeTo, replaceTC } from './utils/typeHelpers';
import { graphqlVersion } from './utils/graphqlVersion';
import { createThunkedObjectProxy } from './utils/createThunkedObjectProxy';
import { printObject } from './utils/schemaPrinter';
import { getObjectTypeDefinitionNode } from './utils/definitionNode';
export class ObjectTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `ObjectTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, ObjectTypeComposer)) {
      return schemaComposer.getOTC(typeDef);
    }

    const tc = this.createTemp(typeDef, schemaComposer);
    const typeName = tc.getTypeName();

    if (typeName !== 'Query' && typeName !== 'Mutation' && typeName !== 'Subscription') {
      schemaComposer.add(tc);
    }

    return tc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new SchemaComposer();
    let TC;

    if (isString(typeDef)) {
      const typeName = typeDef;

      if (isTypeNameString(typeName)) {
        TC = new ObjectTypeComposer(new GraphQLObjectType({
          name: typeName,
          fields: () => ({})
        }), sc);
      } else {
        TC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(TC instanceof ObjectTypeComposer)) {
          throw new Error('You should provide correct GraphQLObjectType type definition. ' + 'Eg. `type MyType { name: String }`');
        }
      }
    } else if (typeDef instanceof GraphQLObjectType) {
      TC = new ObjectTypeComposer(typeDef, sc);
    } else if (typeDef instanceof ObjectTypeComposer) {
      return typeDef;
    } else if (isObject(typeDef)) {
      const type = new GraphQLObjectType(_objectSpread(_objectSpread({}, typeDef), {}, {
        fields: () => ({})
      }));
      TC = new ObjectTypeComposer(type, sc);
      const fields = typeDef.fields;

      if (isFunction(fields)) {
        // `convertOutputFieldMapToConfig` helps to solve hoisting problems
        // rewrap fields `() => { f1: { type: A } }` -> `{ f1: { type: () => A } }`
        TC.addFields(convertObjectFieldMapToConfig(fields, sc));
      } else if (isObject(fields)) {
        TC.addFields(fields);
      }

      const interfaces = typeDef.interfaces;
      if (Array.isArray(interfaces)) TC.setInterfaces(interfaces);else if (isFunction(interfaces)) {
        // rewrap interfaces `() => [i1, i2]` -> `[()=>i1, ()=>i2]`
        // helps to solve hoisting problems
        TC.setInterfaces(convertInterfaceArrayAsThunk(interfaces, sc));
      }
      TC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLObjectTypeConfig or string with type name to ObjectTypeComposer.create(opts). Provided:\n${inspect(typeDef)}`);
    }

    return TC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new ObjectTypeComposer(GraphQLObjectType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof GraphQLObjectType)) {
      throw new Error('ObjectTypeComposer accept only GraphQLObjectType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    const typename = graphqlType.name;

    if (typename !== 'Query' && typename !== 'Mutation' && typename !== 'Subscription') {
      this.schemaComposer.set(typename, this);
    }

    if (graphqlVersion >= 14) {
      this._gqcFields = convertObjectFieldMapToConfig(this._gqType._fields, this.schemaComposer);
      this._gqcInterfaces = convertInterfaceArrayAsThunk(this._gqType._interfaces, this.schemaComposer);
    } else {
      const fields = this._gqType._typeConfig.fields;
      this._gqcFields = this.schemaComposer.typeMapper.convertOutputFieldConfigMap(resolveMaybeThunk(fields) || {}, this.getTypeName());
      this._gqcInterfaces = convertInterfaceArrayAsThunk(this._gqType._interfaces || this._gqType._typeConfig.interfaces, this.schemaComposer);
    }

    if (graphqlType !== null && graphqlType !== void 0 && (_graphqlType$astNode = graphqlType.astNode) !== null && _graphqlType$astNode !== void 0 && _graphqlType$astNode.directives) {
      var _graphqlType$astNode2;

      this.setExtension('directives', this.schemaComposer.typeMapper.parseDirectives(graphqlType === null || graphqlType === void 0 ? void 0 : (_graphqlType$astNode2 = graphqlType.astNode) === null || _graphqlType$astNode2 === void 0 ? void 0 : _graphqlType$astNode2.directives));
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  } // -----------------------------------------------
  // Field methods
  // -----------------------------------------------


  getFields() {
    return this._gqcFields;
  }

  getFieldNames() {
    return Object.keys(this._gqcFields);
  }

  getField(fieldName) {
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
      throw new Error(`Cannot get field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`);
    }

    return field;
  }

  hasField(fieldName) {
    return !!this._gqcFields[fieldName];
  }

  setFields(fields) {
    this._gqcFields = {};
    Object.keys(fields).forEach(name => {
      this.setField(name, fields[name]);
    });
    return this;
  }

  setField(fieldName, fieldConfig) {
    this._gqcFields[fieldName] = isFunction(fieldConfig) ? fieldConfig : this.schemaComposer.typeMapper.convertOutputFieldConfig(fieldConfig, fieldName, this.getTypeName());
    return this;
  }
  /**
   * Add new fields or replace existed in a GraphQL type
   */


  addFields(newFields) {
    Object.keys(newFields).forEach(name => {
      this.setField(name, newFields[name]);
    });
    return this;
  }
  /**
   * Add new fields or replace existed (where field name may have dots)
   */


  addNestedFields(newFields) {
    Object.keys(newFields).forEach(fieldName => {
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
          childTC = ObjectTypeComposer.create(`${this.getTypeName()}${upperFirst(name)}`, this.schemaComposer);
          this.setField(name, {
            type: childTC,
            resolve: () => ({})
          });
        } else {
          childTC = this.getFieldTC(name);
        }

        if (childTC instanceof ObjectTypeComposer) {
          childTC.addNestedFields({
            [names.join('.')]: fc
          });
        }
      }
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


  removeField(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
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

  removeOtherFields(fieldNameOrArray) {
    const keepFieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    Object.keys(this._gqcFields).forEach(fieldName => {
      if (keepFieldNames.indexOf(fieldName) === -1) {
        delete this._gqcFields[fieldName];
      }
    });
    return this;
  }

  reorderFields(names) {
    const orderedFields = {};
    const fields = this._gqcFields;
    names.forEach(name => {
      if (fields[name]) {
        orderedFields[name] = fields[name];
        delete fields[name];
      }
    });
    this._gqcFields = _objectSpread(_objectSpread({}, orderedFields), fields);
    return this;
  }

  extendField(fieldName, partialFieldConfig) {
    let prevFieldConfig;

    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(`Cannot extend field '${fieldName}' from type '${this.getTypeName()}'. Field does not exist.`);
    }

    this.setField(fieldName, _objectSpread(_objectSpread(_objectSpread({}, prevFieldConfig), partialFieldConfig), {}, {
      extensions: _objectSpread(_objectSpread({}, prevFieldConfig.extensions || {}), partialFieldConfig.extensions || {})
    }));
    return this;
  }

  getFieldConfig(fieldName) {
    const _this$getField = this.getField(fieldName),
          {
      type,
      args
    } = _this$getField,
          rest = _objectWithoutProperties(_this$getField, ["type", "args"]);

    return _objectSpread({
      type: type.getType(),
      args: args && mapEachKey(args, ac => _objectSpread(_objectSpread({}, ac), {}, {
        type: ac.type.getType()
      }))
    }, rest);
  }

  getFieldType(fieldName) {
    return this.getField(fieldName).type.getType();
  }

  getFieldTypeName(fieldName) {
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


  getFieldTC(fieldName) {
    const anyTC = this.getField(fieldName).type;
    return unwrapOutputTC(anyTC);
  }
  /**
   * Alias for `getFieldTC()` but returns statically checked ObjectTypeComposer.
   * If field have other type then error will be thrown.
   */


  getFieldOTC(fieldName) {
    const tc = this.getFieldTC(fieldName);

    if (!(tc instanceof ObjectTypeComposer)) {
      throw new Error(`${this.getTypeName()}.getFieldOTC('${fieldName}') must be ObjectTypeComposer, but received ${tc.constructor.name}. Maybe you need to use 'getFieldTC()' method which returns any type composer?`);
    }

    return tc;
  }

  isFieldNonNull(fieldName) {
    return this.getField(fieldName).type instanceof NonNullComposer;
  }

  makeFieldNonNull(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && !(fc.type instanceof NonNullComposer)) {
        fc.type = new NonNullComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNullable(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && fc.type instanceof NonNullComposer) {
        fc.type = fc.type.ofType;
      }
    });
    return this;
  }

  isFieldPlural(fieldName) {
    const type = this.getField(fieldName).type;
    return type instanceof ListComposer || type instanceof NonNullComposer && type.ofType instanceof ListComposer;
  }

  makeFieldPlural(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && !(fc.type instanceof ListComposer)) {
        fc.type = new ListComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNonPlural(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc) {
        if (fc.type instanceof ListComposer) {
          fc.type = fc.type.ofType;
        } else if (fc.type instanceof NonNullComposer && fc.type.ofType instanceof ListComposer) {
          fc.type = fc.type.ofType.ofType instanceof NonNullComposer ? fc.type.ofType.ofType : new NonNullComposer(fc.type.ofType.ofType);
        }
      }
    });
    return this;
  }

  deprecateFields(fields) {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(`Cannot deprecate non-existent field '${fields}' from type '${this.getTypeName()}'`);
      }

      this.extendField(fields, {
        deprecationReason: 'deprecated'
      });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent field '${field}' from type '${this.getTypeName()}'`);
        }

        this.extendField(field, {
          deprecationReason: 'deprecated'
        });
      });
    } else {
      const fieldMap = fields;
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent field '${field}' from type '${this.getTypeName()}'`);
        }

        const deprecationReason = fieldMap[field];
        this.extendField(field, {
          deprecationReason
        });
      });
    }

    return this;
  }
  /**
   * -----------------------------------------------
   * Field Args methods
   * -----------------------------------------------
   */


  getFieldArgs(fieldName) {
    try {
      const fc = this.getField(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(`Cannot get args from '${this.getTypeName()}.${fieldName}'. Field does not exist.`);
    }
  }

  getFieldArgNames(fieldName) {
    return Object.keys(this.getFieldArgs(fieldName));
  }

  hasFieldArg(fieldName, argName) {
    try {
      const fieldArgs = this.getFieldArgs(fieldName);
      return !!fieldArgs[argName];
    } catch (e) {
      return false;
    }
  }

  getFieldArg(fieldName, argName) {
    const fieldArgs = this.getFieldArgs(fieldName);
    const arg = fieldArgs[argName];

    if (!arg) {
      throw new Error(`Cannot get '${this.getTypeName()}.${fieldName}@${argName}'. Argument does not exist.`);
    }

    return arg;
  }

  getFieldArgType(fieldName, argName) {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.type.getType();
  }

  getFieldArgTypeName(fieldName, argName) {
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


  getFieldArgTC(fieldName, argName) {
    const anyTC = this.getFieldArg(fieldName, argName).type; // Unwrap from List, NonNull and ThunkComposer

    return unwrapInputTC(anyTC);
  }
  /**
   * Alias for `getFieldArgTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */


  getFieldArgITC(fieldName, argName) {
    const tc = this.getFieldArgTC(fieldName, argName);

    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(`${this.getTypeName()}.getFieldArgITC('${fieldName}', '${argName}') must be InputTypeComposer, but received ${tc.constructor.name}. Maybe you need to use 'getFieldArgTC()' method which returns any type composer?`);
    }

    return tc;
  }

  setFieldArgs(fieldName, args) {
    const fc = this.getField(fieldName);
    fc.args = this.schemaComposer.typeMapper.convertArgConfigMap(args, fieldName, this.getTypeName());
    return this;
  }

  addFieldArgs(fieldName, newArgs) {
    const fc = this.getField(fieldName);
    fc.args = _objectSpread(_objectSpread({}, fc.args), this.schemaComposer.typeMapper.convertArgConfigMap(newArgs, fieldName, this.getTypeName()));
    return this;
  }

  setFieldArg(fieldName, argName, argConfig) {
    const fc = this.getField(fieldName);
    fc.args = fc.args || {};
    fc.args[argName] = this.schemaComposer.typeMapper.convertArgConfig(argConfig, argName, fieldName, this.getTypeName());
    return this;
  }

  removeFieldArg(fieldName, argNameOrArray) {
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    const args = this._gqcFields[fieldName] && this._gqcFields[fieldName].args;

    if (args) {
      argNames.forEach(argName => delete args[argName]);
    }

    return this;
  }

  removeFieldOtherArgs(fieldName, argNameOrArray) {
    const keepArgNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    const args = this._gqcFields[fieldName] && this._gqcFields[fieldName].args;

    if (args) {
      Object.keys(args).forEach(argName => {
        if (keepArgNames.indexOf(argName) === -1) {
          delete args[argName];
        }
      });
    }

    return this;
  }

  isFieldArgPlural(fieldName, argName) {
    const type = this.getFieldArg(fieldName, argName).type;
    return type instanceof ListComposer || type instanceof NonNullComposer && type.ofType instanceof ListComposer;
  }

  makeFieldArgPlural(fieldName, argNameOrArray) {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      const ac = args[argName];

      if (ac && !(ac.type instanceof ListComposer)) {
        ac.type = new ListComposer(ac.type);
      }
    });
    return this;
  }

  makeFieldArgNonPlural(fieldName, argNameOrArray) {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      const ac = args[argName];

      if (ac) {
        if (ac.type instanceof ListComposer) {
          ac.type = ac.type.ofType;
        } else if (ac.type instanceof NonNullComposer && ac.type.ofType instanceof ListComposer) {
          ac.type = ac.type.ofType.ofType instanceof NonNullComposer ? ac.type.ofType.ofType : new NonNullComposer(ac.type.ofType.ofType);
        }
      }
    });
    return this;
  }

  isFieldArgNonNull(fieldName, argName) {
    const type = this.getFieldArg(fieldName, argName).type;
    return type instanceof NonNullComposer;
  }

  makeFieldArgNonNull(fieldName, argNameOrArray) {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      const ac = args[argName];

      if (ac && !(ac.type instanceof NonNullComposer)) {
        ac.type = new NonNullComposer(ac.type);
      }
    });
    return this;
  }

  makeFieldArgNullable(fieldName, argNameOrArray) {
    const args = this.getField(fieldName).args;
    if (!args) return this;
    const argNames = Array.isArray(argNameOrArray) ? argNameOrArray : [argNameOrArray];
    argNames.forEach(argName => {
      const ac = args[argName];

      if (ac && ac.type instanceof NonNullComposer) {
        ac.type = ac.type.ofType;
      }
    });
    return this;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = getObjectTypeDefinitionNode(this);

    if (graphqlVersion >= 14) {
      this._gqType._fields = () => defineFieldMap(this._gqType, mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)), this._gqType.astNode);

      this._gqType._interfaces = () => this.getInterfacesTypes();
    } else {
      this._gqType._typeConfig.fields = () => {
        return mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name));
      };

      this._gqType._typeConfig.interfaces = () => this.getInterfacesTypes();

      delete this._gqType._fields; // clear builded fields in type

      delete this._gqType._interfaces;
    }

    return this._gqType;
  }

  getTypePlural() {
    return new ListComposer(this);
  }

  getTypeNonNull() {
    return new NonNullComposer(this);
  }
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


  get List() {
    return new ListComposer(this);
  }
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


  get NonNull() {
    return new NonNullComposer(this);
  }

  getTypeName() {
    return this._gqType.name;
  }

  setTypeName(name) {
    this._gqType.name = name;
    this.schemaComposer.add(this);
    return this;
  }

  getDescription() {
    return this._gqType.description || '';
  }

  setDescription(description) {
    this._gqType.description = description;
    return this;
  }
  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all cloned
   * settings from this type.
   */


  clone(newTypeNameOrTC) {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide newTypeName:string for ObjectTypeComposer.clone()');
    }

    const cloned = newTypeNameOrTC instanceof ObjectTypeComposer ? newTypeNameOrTC : ObjectTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
    cloned._gqcFields = mapEachKey(this._gqcFields, fieldConfig => _objectSpread(_objectSpread({}, fieldConfig), {}, {
      args: mapEachKey(fieldConfig.args, argConfig => _objectSpread(_objectSpread({}, argConfig), {}, {
        extensions: _objectSpread({}, argConfig.extensions)
      })),
      extensions: _objectSpread({}, fieldConfig.extensions)
    }));
    cloned._gqcInterfaces = [...this._gqcInterfaces];
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned._gqcGetRecordIdFn = this._gqcGetRecordIdFn;
    cloned.setDescription(this.getDescription());
    this.getResolvers().forEach(resolver => {
      const newResolver = resolver.clone(); // in cloned resolvers we also replace cloned ObjectTypeComposer

      newResolver.type = replaceTC(newResolver.type, tc => {
        return tc === this ? cloned : tc;
      });
      cloned.addResolver(newResolver);
    });
    return cloned;
  }
  /**
   * Clone this type to another SchemaComposer.
   * Also will be cloned all sub-types.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for ObjectTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return cloneMap.get(this);
    const cloned = ObjectTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);
    cloned._gqcFields = mapEachKey(this._gqcFields, fieldConfig => _objectSpread(_objectSpread({}, fieldConfig), {}, {
      type: cloneTypeTo(fieldConfig.type, anotherSchemaComposer, cloneMap),
      args: mapEachKey(fieldConfig.args, argConfig => _objectSpread(_objectSpread({}, argConfig), {}, {
        type: cloneTypeTo(argConfig.type, anotherSchemaComposer, cloneMap),
        extensions: _objectSpread({}, argConfig.extensions)
      })),
      extensions: _objectSpread({}, fieldConfig.extensions)
    }));
    cloned._gqcInterfaces = this._gqcInterfaces.map(i => i.cloneTo(anotherSchemaComposer, cloneMap));
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned._gqcGetRecordIdFn = this._gqcGetRecordIdFn;
    cloned.setDescription(this.getDescription());
    this.getResolvers().forEach(resolver => {
      const clonedResolver = resolver.cloneTo(anotherSchemaComposer, cloneMap);
      cloned.addResolver(clonedResolver);
    });
    return cloned;
  }

  getIsTypeOf() {
    return this._gqType.isTypeOf;
  }

  setIsTypeOf(fn) {
    this._gqType.isTypeOf = fn;
    return this;
  }

  merge(type) {
    let tc;

    if (type instanceof ObjectTypeComposer || type instanceof InterfaceTypeComposer) {
      tc = type;
    } else if (type instanceof GraphQLObjectType) {
      tc = ObjectTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof GraphQLInterfaceType) {
      tc = InterfaceTypeComposer.createTemp(type, this.schemaComposer);
    } else {
      throw new Error(`Cannot merge ${inspect(type)} with ObjectType(${this.getTypeName()}). Provided type should be GraphQLInterfaceType, GraphQLObjectType, InterfaceTypeComposer or ObjectTypeComposer.`);
    } // deep clone all fields with args


    const fields = _objectSpread({}, tc.getFields());

    Object.keys(fields).forEach(fieldName => {
      fields[fieldName] = _objectSpread(_objectSpread({}, fields[fieldName]), {}, {
        args: _objectSpread({}, fields[fieldName].args),
        // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
        type: tc.getFieldTypeName(fieldName)
      });
      tc.getFieldArgNames(fieldName).forEach(argName => {
        fields[fieldName].args[argName] = _objectSpread(_objectSpread({}, fields[fieldName].args[argName]), {}, {
          // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
          type: tc.getFieldArgTypeName(fieldName, argName)
        });
      });
    });
    this.addFields(fields); // set interfaces as SDL string, it automatically will be remapped to the correct type instance in the current schema

    this.addInterfaces(tc.getInterfaces().map(i => i.getTypeName())); // Feel free to add other properties for merging two TypeComposers.
    // For simplicity it just merge fields and interfaces.

    return this;
  } // -----------------------------------------------
  // InputType methods
  // -----------------------------------------------


  getInputType() {
    return this.getInputTypeComposer().getType();
  }

  hasInputTypeComposer() {
    return !!this._gqcInputTypeComposer;
  }

  setInputTypeComposer(itc) {
    this._gqcInputTypeComposer = itc;
    return this;
  }

  getInputTypeComposer(opts) {
    if (!this._gqcInputTypeComposer) {
      this._gqcInputTypeComposer = toInputObjectType(this, opts);
    }

    return this._gqcInputTypeComposer;
  } // Alias for getInputTypeComposer()


  getITC(opts) {
    return this.getInputTypeComposer(opts);
  }

  removeInputTypeComposer() {
    this._gqcInputTypeComposer = undefined;
    return this;
  } // -----------------------------------------------
  // Resolver methods
  // -----------------------------------------------


  getResolvers() {
    if (!this._gqcResolvers) {
      this._gqcResolvers = new Map();
    }

    return this._gqcResolvers;
  }

  hasResolver(name) {
    if (!this._gqcResolvers) {
      return false;
    }

    return this._gqcResolvers.has(name);
  }

  getResolver(name, middlewares) {
    if (!this.hasResolver(name)) {
      throw new Error(`Type ${this.getTypeName()} does not have resolver with name '${name}'`);
    }

    const resolverMap = this._gqcResolvers;
    const resolver = resolverMap.get(name);

    if (Array.isArray(middlewares)) {
      return resolver.withMiddlewares(middlewares);
    }

    return resolver;
  }

  setResolver(name, resolver) {
    if (!this._gqcResolvers) {
      this._gqcResolvers = new Map();
    }

    if (!(resolver instanceof Resolver)) {
      throw new Error('setResolver() accept only Resolver instance');
    }

    this._gqcResolvers.set(name, resolver);

    resolver.setDisplayName(`${this.getTypeName()}.${resolver.name}`);
    return this;
  }

  addResolver(opts) {
    if (!opts) {
      throw new Error('addResolver called with empty Resolver');
    }

    let resolver;

    if (!(opts instanceof Resolver)) {
      const resolverOpts = _objectSpread({}, opts); // add resolve method, otherwise added resolver will not return any data by graphql-js


      if (!resolverOpts.hasOwnProperty('resolve')) {
        resolverOpts.resolve = () => ({});
      }

      resolver = new Resolver(resolverOpts, this.schemaComposer);
    } else {
      resolver = opts;
    }

    if (!resolver.name) {
      throw new Error('resolver should have non-empty `name` property');
    }

    this.setResolver(resolver.name, resolver);
    return this;
  }

  removeResolver(resolverName) {
    if (resolverName) {
      this.getResolvers().delete(resolverName);
    }

    return this;
  }

  wrapResolver(resolverName, cbResolver) {
    const resolver = this.getResolver(resolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverAs(resolverName, fromResolverName, cbResolver) {
    const resolver = this.getResolver(fromResolverName);
    const newResolver = resolver.wrap(cbResolver);
    this.setResolver(resolverName, newResolver);
    return this;
  }

  wrapResolverResolve(resolverName, cbNextRp) {
    const resolver = this.getResolver(resolverName);
    this.setResolver(resolverName, resolver.wrapResolve(cbNextRp));
    return this;
  } // -----------------------------------------------
  // Interface methods
  // -----------------------------------------------


  getInterfaces() {
    return this._gqcInterfaces;
  }

  getInterfacesTypes() {
    return this._gqcInterfaces.map(i => i.getType());
  }

  setInterfaces(interfaces) {
    this._gqcInterfaces = convertInterfaceArrayAsThunk(interfaces, this.schemaComposer);
    return this;
  }

  hasInterface(iface) {
    const typeName = getComposeTypeName(iface, this.schemaComposer);
    return !!this._gqcInterfaces.find(i => i.getTypeName() === typeName);
  }

  addInterface(iface) {
    if (!this.hasInterface(iface)) {
      this._gqcInterfaces.push(this.schemaComposer.typeMapper.convertInterfaceTypeDefinition(iface));
    }

    return this;
  }

  addInterfaces(ifaces) {
    if (!Array.isArray(ifaces)) {
      throw new Error(`ObjectTypeComposer[${this.getTypeName()}].addInterfaces() accepts only array`);
    }

    ifaces.forEach(iface => this.addInterface(iface));
    return this;
  }

  removeInterface(iface) {
    const typeName = getComposeTypeName(iface, this.schemaComposer);
    this._gqcInterfaces = this._gqcInterfaces.filter(i => i.getTypeName() !== typeName);
    return this;
  } // -----------------------------------------------
  // Extensions methods
  // -----------------------------------------------


  getExtensions() {
    if (!this._gqcExtensions) {
      return {};
    } else {
      return this._gqcExtensions;
    }
  }

  setExtensions(extensions) {
    this._gqcExtensions = extensions;
    return this;
  }

  extendExtensions(extensions) {
    const current = this.getExtensions();
    this.setExtensions(_objectSpread(_objectSpread({}, current), extensions));
    return this;
  }

  clearExtensions() {
    this.setExtensions({});
    return this;
  }

  getExtension(extensionName) {
    const extensions = this.getExtensions();
    return extensions[extensionName];
  }

  hasExtension(extensionName) {
    const extensions = this.getExtensions();
    return extensionName in extensions;
  }

  setExtension(extensionName, value) {
    this.extendExtensions({
      [extensionName]: value
    });
    return this;
  }

  removeExtension(extensionName) {
    const extensions = _objectSpread({}, this.getExtensions());

    delete extensions[extensionName];
    this.setExtensions(extensions);
    return this;
  }

  getFieldExtensions(fieldName) {
    const field = this.getField(fieldName);
    return field.extensions || {};
  }

  setFieldExtensions(fieldName, extensions) {
    const field = this.getField(fieldName);
    this.setField(fieldName, _objectSpread(_objectSpread({}, field), {}, {
      extensions
    }));
    return this;
  }

  extendFieldExtensions(fieldName, extensions) {
    const current = this.getFieldExtensions(fieldName);
    this.setFieldExtensions(fieldName, _objectSpread(_objectSpread({}, current), extensions));
    return this;
  }

  clearFieldExtensions(fieldName) {
    this.setFieldExtensions(fieldName, {});
    return this;
  }

  getFieldExtension(fieldName, extensionName) {
    const extensions = this.getFieldExtensions(fieldName);
    return extensions[extensionName];
  }

  hasFieldExtension(fieldName, extensionName) {
    const extensions = this.getFieldExtensions(fieldName);
    return extensionName in extensions;
  }

  setFieldExtension(fieldName, extensionName, value) {
    this.extendFieldExtensions(fieldName, {
      [extensionName]: value
    });
    return this;
  }

  removeFieldExtension(fieldName, extensionName) {
    const extensions = _objectSpread({}, this.getFieldExtensions(fieldName));

    delete extensions[extensionName];
    this.setFieldExtensions(fieldName, extensions);
    return this;
  }

  getFieldArgExtensions(fieldName, argName) {
    const ac = this.getFieldArg(fieldName, argName);
    return ac.extensions || {};
  }

  setFieldArgExtensions(fieldName, argName, extensions) {
    const ac = this.getFieldArg(fieldName, argName);
    this.setFieldArg(fieldName, argName, _objectSpread(_objectSpread({}, ac), {}, {
      extensions
    }));
    return this;
  }

  extendFieldArgExtensions(fieldName, argName, extensions) {
    const current = this.getFieldArgExtensions(fieldName, argName);
    this.setFieldArgExtensions(fieldName, argName, _objectSpread(_objectSpread({}, current), extensions));
    return this;
  }

  clearFieldArgExtensions(fieldName, argName) {
    this.setFieldArgExtensions(fieldName, argName, {});
    return this;
  }

  getFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensions[extensionName];
  }

  hasFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = this.getFieldArgExtensions(fieldName, argName);
    return extensionName in extensions;
  }

  setFieldArgExtension(fieldName, argName, extensionName, value) {
    this.extendFieldArgExtensions(fieldName, argName, {
      [extensionName]: value
    });
    return this;
  }

  removeFieldArgExtension(fieldName, argName, extensionName) {
    const extensions = _objectSpread({}, this.getFieldArgExtensions(fieldName, argName));

    delete extensions[extensionName];
    this.setFieldArgExtensions(fieldName, argName, extensions);
    return this;
  } // -----------------------------------------------
  // Directive methods
  // -----------------------------------------------


  getDirectives() {
    const directives = this.getExtension('directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  setDirectives(directives) {
    this.setExtension('directives', directives);
    return this;
  }

  getDirectiveNames() {
    return this.getDirectives().map(d => d.name);
  }

  getDirectiveByName(directiveName) {
    const directive = this.getDirectives().find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getDirectiveById(idx) {
    const directive = this.getDirectives()[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectives(fieldName) {
    const directives = this.getFieldExtension(fieldName, 'directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  setFieldDirectives(fieldName, directives) {
    this.setFieldExtension(fieldName, 'directives', directives);
    return this;
  }

  getFieldDirectiveNames(fieldName) {
    return this.getFieldDirectives(fieldName).map(d => d.name);
  }

  getFieldDirectiveByName(fieldName, directiveName) {
    const directive = this.getFieldDirectives(fieldName).find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldDirectiveById(fieldName, idx) {
    const directive = this.getFieldDirectives(fieldName)[idx];
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectives(fieldName, argName) {
    const directives = this.getFieldArgExtension(fieldName, argName, 'directives');

    if (Array.isArray(directives)) {
      return directives;
    }

    return [];
  }

  setFieldArgDirectives(fieldName, argName, directives) {
    this.setFieldArgExtension(fieldName, argName, 'directives', directives);
    return this;
  }

  getFieldArgDirectiveNames(fieldName, argName) {
    return this.getFieldArgDirectives(fieldName, argName).map(d => d.name);
  }

  getFieldArgDirectiveByName(fieldName, argName, directiveName) {
    const directive = this.getFieldArgDirectives(fieldName, argName).find(d => d.name === directiveName);
    if (!directive) return undefined;
    return directive.args;
  }

  getFieldArgDirectiveById(fieldName, argName, idx) {
    const directive = this.getFieldArgDirectives(fieldName, argName)[idx];
    if (!directive) return undefined;
    return directive.args;
  } // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------


  addRelation(fieldName, opts) {
    if (!this._gqcRelations) {
      this._gqcRelations = {};
    }

    this._gqcRelations[fieldName] = opts;

    if (opts.hasOwnProperty('resolver')) {
      if (isFunction(opts.resolver)) {
        this._gqcFields[fieldName] = createThunkedObjectProxy(() => this._relationWithResolverToFC(opts, fieldName));
      } else {
        this._gqcFields[fieldName] = this._relationWithResolverToFC(opts, fieldName);
      }
    } else if (opts.hasOwnProperty('type')) {
      const fc = opts;
      this.setField(fieldName, fc);
    }

    return this;
  }

  getRelations() {
    if (!this._gqcRelations) {
      this._gqcRelations = {};
    }

    return this._gqcRelations;
  }

  _relationWithResolverToFC(opts, fieldName = '') {
    const resolver = isFunction(opts.resolver) ? opts.resolver(this.schemaComposer) : opts.resolver;

    if (!(resolver instanceof Resolver)) {
      throw new Error('You should provide correct Resolver object for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    if (opts.type) {
      throw new Error('You can not use `resolver` and `type` properties simultaneously for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    if (opts.resolve) {
      throw new Error('You can not use `resolver` and `resolve` properties simultaneously for relation ' + `${this.getTypeName()}.${fieldName}`);
    }

    const argsConfig = _objectSpread({}, resolver.args);

    const argsProto = {};
    const argsRuntime = []; // remove args from config, if arg name provided in args
    //    if `argMapVal`
    //       is `undefined`, then keep arg field in config
    //       is `null`, then just remove arg field from config
    //       is `function`, then remove arg field and run it in resolve
    //       is any other value, then put it to args prototype for resolve

    const optsArgs = opts.prepareArgs || {};
    Object.keys(optsArgs).forEach(argName => {
      const argMapVal = optsArgs[argName];

      if (argMapVal !== undefined) {
        delete argsConfig[argName];

        if (isFunction(argMapVal)) {
          argsRuntime.push([argName, argMapVal]);
        } else if (argMapVal !== null) {
          argsProto[argName] = argMapVal;
        }
      }
    }); // if opts.catchErrors is undefined then set true, otherwise take it value

    const {
      catchErrors = true
    } = opts;
    const fieldConfig = resolver.getFieldConfig();

    const resolve = (source, args, context, info) => {
      const newArgs = _objectSpread(_objectSpread({}, args), argsProto);

      argsRuntime.forEach(([argName, argFn]) => {
        newArgs[argName] = argFn(source, args, context, info);
      });
      const payload = fieldConfig.resolve ? fieldConfig.resolve(source, newArgs, context, info) : null;
      return catchErrors ? Promise.resolve(payload).catch(e => {
        // eslint-disable-next-line
        console.log(`GQC ERROR: relation for ${this.getTypeName()}.${fieldName} throws error:`);
        console.log(e); // eslint-disable-line

        return null;
      }) : payload;
    };

    return {
      type: resolver.type,
      description: opts.description || resolver.description,
      deprecationReason: opts.deprecationReason,
      args: argsConfig,
      resolve,
      projection: opts.projection,
      extensions: _objectSpread(_objectSpread({}, resolver.extensions), opts.extensions)
    };
  }

  setRecordIdFn(fn) {
    this._gqcGetRecordIdFn = fn;
    return this;
  }

  hasRecordIdFn() {
    return !!this._gqcGetRecordIdFn;
  }

  getRecordIdFn() {
    if (!this._gqcGetRecordIdFn) {
      throw new Error(`Type ${this.getTypeName()} does not have RecordIdFn`);
    }

    return this._gqcGetRecordIdFn;
  }
  /**
   * Get function that returns record id, from provided object.
   */


  getRecordId(source, args, context) {
    return this.getRecordIdFn()(source, args, context);
  }

  get(path) {
    return typeByPath(this, path);
  }
  /**
   * Returns all types which are used inside the current type
   */


  getNestedTCs(opts = {}, passedTypes = new Set()) {
    const exclude = Array.isArray(opts.exclude) ? opts.exclude : [];
    this.getFieldNames().forEach(fieldName => {
      const tc = this.getFieldTC(fieldName);

      if (!passedTypes.has(tc) && !exclude.includes(tc.getTypeName())) {
        passedTypes.add(tc);

        if (tc instanceof ObjectTypeComposer || tc instanceof UnionTypeComposer) {
          tc.getNestedTCs(opts, passedTypes);
        }
      }

      this.getFieldArgNames(fieldName).forEach(argName => {
        const itc = this.getFieldArgTC(fieldName, argName);

        if (!passedTypes.has(itc) && !exclude.includes(itc.getTypeName())) {
          passedTypes.add(itc);

          if (itc instanceof InputTypeComposer) {
            itc.getNestedTCs(opts, passedTypes);
          }
        }
      });
    });
    this.getInterfaces().forEach(t => {
      const iftc = t instanceof ThunkComposer ? t.ofType : t;

      if (!passedTypes.has(iftc) && !exclude.includes(iftc.getTypeName())) {
        passedTypes.add(iftc);
        iftc.getNestedTCs(opts, passedTypes);
      }
    });
    return passedTypes;
  }
  /**
   * Prints SDL for current type. Or print with all used types if `deep: true` option was provided.
   */


  toSDL(opts) {
    const _ref = opts || {},
          {
      deep
    } = _ref,
          innerOpts = _objectWithoutProperties(_ref, ["deep"]);

    const exclude = Array.isArray(innerOpts.exclude) ? innerOpts.exclude : [];

    if (deep) {
      let r = '';
      r += printObject(this.getType(), innerOpts);
      let nestedTypes = Array.from(this.getNestedTCs({
        exclude
      }));

      if (opts !== null && opts !== void 0 && opts.sortAll || opts !== null && opts !== void 0 && opts.sortTypes) {
        nestedTypes = nestedTypes.sort((a, b) => a.getTypeName().localeCompare(b.getTypeName()));
      }

      nestedTypes.forEach(t => {
        if (t !== this && !exclude.includes(t.getTypeName())) {
          const sdl = t.toSDL(innerOpts);
          if (sdl) r += `\n\n${sdl}`;
        }
      });
      return r;
    }

    return printObject(this.getType(), innerOpts);
  }

}