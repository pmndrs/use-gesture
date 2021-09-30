function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
import { GraphQLInterfaceType, GraphQLObjectType } from './graphql';
import { isObject, isString, isFunction } from './utils/is';
import { resolveMaybeThunk, inspect, mapEachKey } from './utils/misc';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import { InputTypeComposer } from './InputTypeComposer';
import { UnionTypeComposer } from './UnionTypeComposer';
import { EnumTypeComposer } from './EnumTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { ThunkComposer } from './ThunkComposer';
import { toInputObjectType } from './utils/toInputType';
import { typeByPath } from './utils/typeByPath';
import { getComposeTypeName, getGraphQLType, unwrapOutputTC, unwrapInputTC, isTypeNameString, cloneTypeTo } from './utils/typeHelpers';
import { defineFieldMap, convertObjectFieldMapToConfig, convertInterfaceArrayAsThunk } from './utils/configToDefine';
import { graphqlVersion } from './utils/graphqlVersion';
import { printInterface } from './utils/schemaPrinter';
import { getInterfaceTypeDefinitionNode } from './utils/definitionNode';
export class InterfaceTypeComposer {
  // Also supported `GraphQLInterfaceType` but in such case FlowType force developers
  // to explicitly write annotations in their code. But it's bad.
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `InterfaceTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, InterfaceTypeComposer)) {
      return schemaComposer.getIFTC(typeDef);
    }

    const iftc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(iftc);
    return iftc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new SchemaComposer();
    let IFTC;

    if (isString(typeDef)) {
      const typeName = typeDef;

      if (isTypeNameString(typeName)) {
        IFTC = new InterfaceTypeComposer(new GraphQLInterfaceType({
          name: typeName,
          fields: () => ({})
        }), sc);
      } else {
        IFTC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(IFTC instanceof InterfaceTypeComposer)) {
          throw new Error('You should provide correct GraphQLInterfaceType type definition. ' + 'Eg. `interface MyType { id: ID!, name: String! }`');
        }
      }
    } else if (typeDef instanceof GraphQLInterfaceType) {
      IFTC = new InterfaceTypeComposer(typeDef, sc);
    } else if (typeDef instanceof InterfaceTypeComposer) {
      IFTC = typeDef;
    } else if (isObject(typeDef) && !(typeDef instanceof InterfaceTypeComposer) // hate Flow 😈
    ) {
        const type = new GraphQLInterfaceType(_objectSpread(_objectSpread({}, typeDef), {}, {
          fields: () => ({})
        }));
        IFTC = new InterfaceTypeComposer(type, sc);
        const fields = typeDef.fields;

        if (isFunction(fields)) {
          // `convertOutputFieldMapToConfig` helps to solve hoisting problems
          // rewrap fields `() => { f1: { type: A } }` -> `{ f1: { type: () => A } }`
          IFTC.addFields(convertObjectFieldMapToConfig(fields, sc));
        } else if (isObject(fields)) {
          IFTC.addFields(fields);
        }

        const interfaces = typeDef.interfaces;
        if (Array.isArray(interfaces)) IFTC.setInterfaces(interfaces);else if (isFunction(interfaces)) {
          // rewrap interfaces `() => [i1, i2]` -> `[()=>i1, ()=>i2]`
          // helps to solve hoisting problems
          IFTC.setInterfaces(convertInterfaceArrayAsThunk(interfaces, sc));
        }
        IFTC._gqcExtensions = typeDef.extensions || {};
      } else {
      throw new Error(`You should provide GraphQLInterfaceTypeConfig or string with interface name or SDL definition. Provided:\n${inspect(typeDef)}`);
    }

    return IFTC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    _defineProperty(this, "_gqcInterfaces", []);

    _defineProperty(this, "_gqcFallbackResolveType", null);

    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new InterfaceTypeComposer(GraphQLInterfaceType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof GraphQLInterfaceType)) {
      throw new Error('InterfaceTypeComposer accept only GraphQLInterfaceType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    if (graphqlVersion >= 15) {
      this._gqcFields = convertObjectFieldMapToConfig(this._gqType._fields, this.schemaComposer);
      this._gqcInterfaces = convertInterfaceArrayAsThunk(this._gqType._interfaces, this.schemaComposer);
    } else if (graphqlVersion >= 14) {
      this._gqcFields = convertObjectFieldMapToConfig(this._gqType._fields, this.schemaComposer);
    } else {
      // read
      const fields = this._gqType._typeConfig.fields;
      this._gqcFields = this.schemaComposer.typeMapper.convertOutputFieldConfigMap(resolveMaybeThunk(fields) || {}, this.getTypeName());
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
        throw new Error(`Cannot deprecate non-existent field '${fields}' from interface type '${this.getTypeName()}'`);
      }

      this.extendField(fields, {
        deprecationReason: 'deprecated'
      });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent field '${field}' from interface type '${this.getTypeName()}'`);
        }

        this.extendField(field, {
          deprecationReason: 'deprecated'
        });
      });
    } else {
      const fieldMap = fields;
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent field '${field}' from interface type '${this.getTypeName()}'`);
        }

        const deprecationReason = fieldMap[field];
        this.extendField(field, {
          deprecationReason
        });
      });
    }

    return this;
  }

  getFieldArgs(fieldName) {
    try {
      const fc = this.getField(fieldName);
      return fc.args || {};
    } catch (e) {
      throw new Error(`Cannot get field args. Field '${fieldName}' from type '${this.getTypeName()}' does not exist.`);
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
    const anyTC = this.getFieldArg(fieldName, argName).type;
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
    this._gqType.astNode = getInterfaceTypeDefinitionNode(this);

    if (graphqlVersion >= 15) {
      this._gqType._fields = () => defineFieldMap(this._gqType, mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)), this._gqType.astNode);

      this._gqType._interfaces = () => this.getInterfacesTypes();
    } else if (graphqlVersion >= 14) {
      this._gqType._fields = () => defineFieldMap(this._gqType, mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name)), this._gqType.astNode);
    } else {
      this._gqType._typeConfig.fields = () => {
        return mapEachKey(this._gqcFields, (fc, name) => this.getFieldConfig(name));
      };

      this._gqType._fields = {}; // clear builded fields in type
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
   *   const UserTC = schemaComposer.createInterfaceTC(`interface UserIface { name: String }`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [UserIface]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [UserIface!]
   *     users3: { type: UserTC.NonNull.List.NonNull }, // in SDL: users2: [UserIface!]!
   *   })
   */


  get List() {
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
      throw new Error('You should provide newTypeName:string for InterfaceTypeComposer.clone()');
    }

    const cloned = newTypeNameOrTC instanceof InterfaceTypeComposer ? newTypeNameOrTC : InterfaceTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
    cloned._gqcFields = mapEachKey(this._gqcFields, fieldConfig => _objectSpread(_objectSpread({}, fieldConfig), {}, {
      args: mapEachKey(fieldConfig.args, argConfig => _objectSpread(_objectSpread({}, argConfig), {}, {
        extensions: _objectSpread({}, argConfig.extensions)
      })),
      extensions: _objectSpread({}, fieldConfig.extensions)
    }));
    cloned._gqcInterfaces = [...this._gqcInterfaces];
    cloned._gqcTypeResolvers = new Map(this._gqcTypeResolvers);
    cloned._gqcFallbackResolveType = this._gqcFallbackResolveType;
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned.setDescription(this.getDescription());
    return cloned;
  }
  /**
   * Clone this type to another SchemaComposer.
   * Also will be cloned all sub-types.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for InterfaceTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return cloneMap.get(this);
    const cloned = InterfaceTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
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
    cloned.setDescription(this.getDescription()); // clone this._gqcTypeResolvers

    const typeResolversMap = this.getTypeResolvers();

    if (typeResolversMap.size > 0) {
      const clonedTypeResolvers = new Map();
      typeResolversMap.forEach((fn, tc) => {
        const clonedTC = cloneTypeTo(tc, anotherSchemaComposer, cloneMap);
        clonedTypeResolvers.set(clonedTC, fn);
      });
      cloned.setTypeResolvers(clonedTypeResolvers);
    }

    if (this._gqcFallbackResolveType) {
      cloned._gqcFallbackResolveType = cloneTypeTo(this._gqcFallbackResolveType, anotherSchemaComposer, cloneMap);
    }

    return cloned;
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
      throw new Error(`Cannot merge ${inspect(type)} with InterfaceType(${this.getTypeName()}). Provided type should be GraphQLInterfaceType, GraphQLObjectType, InterfaceTypeComposer or ObjectTypeComposer.`);
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
  }

  getITC(opts) {
    return this.getInputTypeComposer(opts);
  }

  removeInputTypeComposer() {
    this._gqcInputTypeComposer = undefined;
    return this;
  } // -----------------------------------------------
  // ResolveType methods
  // -----------------------------------------------


  getResolveType() {
    return this._gqType.resolveType;
  }

  setResolveType(fn) {
    this._gqType.resolveType = fn;
    return this;
  }

  hasTypeResolver(type) {
    const typeResolversMap = this.getTypeResolvers();
    return typeResolversMap.has(type);
  }

  getTypeResolvers() {
    if (!this._gqcTypeResolvers) {
      this._gqcTypeResolvers = new Map();
    }

    return this._gqcTypeResolvers;
  }

  getTypeResolverCheckFn(type) {
    const typeResolversMap = this.getTypeResolvers();

    if (!typeResolversMap.has(type)) {
      throw new Error(`Type resolve function in interface '${this.getTypeName()}' is not defined for type ${inspect(type)}.`);
    }

    return typeResolversMap.get(type);
  }

  getTypeResolverNames() {
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

  getTypeResolverTypes() {
    const typeResolversMap = this.getTypeResolvers();
    const types = [];
    typeResolversMap.forEach((resolveFn, composeType) => {
      types.push(getGraphQLType(composeType));
    });
    return types;
  }

  setTypeResolvers(typeResolversMap) {
    this._isTypeResolversValid(typeResolversMap);

    this._gqcTypeResolvers = typeResolversMap;

    this._initResolveTypeFn();

    return this;
  }

  _initResolveTypeFn() {
    const typeResolversMap = this._gqcTypeResolvers || new Map();
    const fallbackType = this._gqcFallbackResolveType ? getGraphQLType(this._gqcFallbackResolveType) : null; // extract GraphQLObjectType from ObjectTypeComposer

    const fastEntries = [];

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      fastEntries.push([getGraphQLType(composeType), checkFn]);
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

  _isTypeResolversValid(typeResolversMap) {
    if (!(typeResolversMap instanceof Map)) {
      throw new Error(`For interface ${this.getTypeName()} you should provide Map object for type resolvers.`);
    }

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      this._isTypeResolverValid(composeType, checkFn);
    }

    return true;
  }

  _isTypeResolverValid(composeType, checkFn) {
    // checking composeType
    try {
      const type = getGraphQLType(composeType);
      if (!(type instanceof GraphQLObjectType)) throw new Error('Must be GraphQLObjectType');
    } catch (e) {
      throw new Error(`For interface type resolver ${this.getTypeName()} you must provide GraphQLObjectType or ObjectTypeComposer, but provided ${inspect(composeType)}`);
    } // checking checkFn


    if (!isFunction(checkFn)) {
      throw new Error(`Interface ${this.getTypeName()} has invalid check function for type ${inspect(composeType)}`);
    }

    return true;
  } // eslint-disable-next-line class-methods-use-this


  _isTypeResolversAsync(typeResolversMap) {
    let res = false;

    for (const [, checkFn] of typeResolversMap.entries()) {
      try {
        const r = checkFn({}, {}, {});

        if (r instanceof Promise) {
          r.catch(() => {});
          res = true;
        }
      } catch (e) {// noop
      }
    }

    return res;
  }

  addTypeResolver(type, checkFn) {
    const typeResolversMap = this.getTypeResolvers();

    this._isTypeResolverValid(type, checkFn);

    typeResolversMap.set(type, checkFn);

    this._initResolveTypeFn(); // ensure that interface added to ObjectType


    if (type instanceof ObjectTypeComposer) {
      type.addInterface(this);
    } // ensure that resolved type will be in Schema


    this.schemaComposer.addSchemaMustHaveType(type);
    return this;
  }

  removeTypeResolver(type) {
    const typeResolversMap = this.getTypeResolvers();
    typeResolversMap.delete(type);

    this._initResolveTypeFn();

    return this;
  }

  setTypeResolverFallback(type) {
    if (type) {
      // ensure that interface added to ObjectType
      if (type instanceof ObjectTypeComposer) {
        type.addInterface(this);
      } // ensure that resolved type will be in Schema


      this.schemaComposer.addSchemaMustHaveType(type);
    }

    this._gqcFallbackResolveType = type;

    this._initResolveTypeFn();

    return this;
  } // -----------------------------------------------
  // Sub-Interface methods
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
      throw new Error(`InterfaceTypeComposer[${this.getTypeName()}].addInterfaces() accepts only array`);
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
      this.getInterfaces().forEach(t => {
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


  toSDL(opts) {
    const _ref = opts || {},
          {
      deep
    } = _ref,
          innerOpts = _objectWithoutProperties(_ref, ["deep"]);

    const exclude = Array.isArray(innerOpts.exclude) ? innerOpts.exclude : [];

    if (deep) {
      let r = '';
      r += printInterface(this.getType(), innerOpts);
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

    return printInterface(this.getType(), innerOpts);
  }

}