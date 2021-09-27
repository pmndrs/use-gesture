"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnumTypeComposer = void 0;

var _keyMap = _interopRequireDefault(require("graphql/jsutils/keyMap"));

var _graphql = require("./graphql");

var _is = require("./utils/is");

var _misc = require("./utils/misc");

var _configToDefine = require("./utils/configToDefine");

var _graphqlVersion = require("./utils/graphqlVersion");

var _SchemaComposer = require("./SchemaComposer");

var _ListComposer = require("./ListComposer");

var _NonNullComposer = require("./NonNullComposer");

var _typeHelpers = require("./utils/typeHelpers");

var _schemaPrinter = require("./utils/schemaPrinter");

var _definitionNode = require("./utils/definitionNode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EnumTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `EnumTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, EnumTypeComposer)) {
      return schemaComposer.getETC(typeDef);
    }

    const etc = this.createTemp(typeDef, schemaComposer);
    if (schemaComposer) schemaComposer.add(etc);
    return etc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new _SchemaComposer.SchemaComposer();
    let ETC;

    if ((0, _is.isString)(typeDef)) {
      const typeName = typeDef;

      if ((0, _typeHelpers.isTypeNameString)(typeName)) {
        ETC = new EnumTypeComposer(new _graphql.GraphQLEnumType({
          name: typeName,
          values: _graphqlVersion.graphqlVersion < 13 ? {
            _OldGraphqlStubValue_: {}
          } : {}
        }), sc);
      } else {
        ETC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(ETC instanceof EnumTypeComposer)) {
          throw new Error('You should provide correct GraphQLEnumType type definition. ' + 'Eg. `enum MyType { KEY1 KEY2 KEY3 }`');
        }
      }
    } else if (typeDef instanceof _graphql.GraphQLEnumType) {
      ETC = new EnumTypeComposer(typeDef, sc);
    } else if ((0, _is.isObject)(typeDef)) {
      const type = new _graphql.GraphQLEnumType(_objectSpread({}, typeDef));
      ETC = new EnumTypeComposer(type, sc);
      ETC.setFields(typeDef.values || {});
      ETC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLEnumTypeConfig or string with enum name or SDL. Provided:\n${(0, _misc.inspect)(typeDef)}`);
    }

    return ETC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new EnumTypeComposer(GraphQLEnumType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof _graphql.GraphQLEnumType)) {
      throw new Error('EnumTypeComposer accept only GraphQLEnumType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);
    this._gqcFields = (0, _configToDefine.convertEnumValuesToConfig)(this._gqType.getValues(), this.schemaComposer);

    if (graphqlType !== null && graphqlType !== void 0 && (_graphqlType$astNode = graphqlType.astNode) !== null && _graphqlType$astNode !== void 0 && _graphqlType$astNode.directives) {
      var _graphqlType$astNode2;

      this.setExtension('directives', this.schemaComposer.typeMapper.parseDirectives(graphqlType === null || graphqlType === void 0 ? void 0 : (_graphqlType$astNode2 = graphqlType.astNode) === null || _graphqlType$astNode2 === void 0 ? void 0 : _graphqlType$astNode2.directives));
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  } // -----------------------------------------------
  // Value methods
  // -----------------------------------------------


  hasField(name) {
    const values = this.getFields();
    return !!values[name];
  }

  getFields() {
    return this._gqcFields;
  }

  getField(name) {
    const values = this.getFields();

    if (!values[name]) {
      throw new Error(`Cannot get value '${name}' from enum type '${this.getTypeName()}'. Value with such name does not exist.`);
    }

    return values[name];
  }

  getFieldNames() {
    return Object.keys(this._gqcFields);
  }
  /**
   * Completely replace all values in GraphQL enum type
   * WARNING: this method rewrite an internal GraphQL instance properties.
   */


  setFields(values) {
    this._gqcFields = {};
    Object.keys(values).forEach(valueName => {
      this.setField(valueName, values[valueName]);
    });
    return this;
  }

  setField(name, valueConfig) {
    this._gqcFields[name] = {
      value: valueConfig.hasOwnProperty('value') ? valueConfig.value : name,
      description: valueConfig.description,
      deprecationReason: valueConfig.deprecationReason,
      extensions: valueConfig.extensions || {},
      astNode: valueConfig.astNode
    };
    return this;
  }
  /**
   * Add new fields or replace existed in a GraphQL type
   */


  addFields(newValues) {
    Object.keys(newValues).forEach(valueName => {
      this.setField(valueName, newValues[valueName]);
    });
    return this;
  }

  removeField(nameOrArray) {
    const valueNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    valueNames.forEach(valueName => {
      delete this._gqcFields[valueName];
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

  extendField(name, partialValueConfig) {
    let prevValueConfig;

    try {
      prevValueConfig = this.getField(name);
    } catch (e) {
      throw new Error(`Cannot extend value '${name}' from enum '${this.getTypeName()}'. Value does not exist.`);
    }

    const valueConfig = _objectSpread(_objectSpread({}, prevValueConfig), partialValueConfig);

    this.setField(name, valueConfig);
    return this;
  }

  deprecateFields(fields) {
    const existedFieldNames = this.getFieldNames();

    if (typeof fields === 'string') {
      if (existedFieldNames.indexOf(fields) === -1) {
        throw new Error(`Cannot deprecate non-existent value '${fields}' from enum '${this.getTypeName()}'`);
      }

      this.extendField(fields, {
        deprecationReason: 'deprecated'
      });
    } else if (Array.isArray(fields)) {
      fields.forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent value '${field}' from enum '${this.getTypeName()}'`);
        }

        this.extendField(field, {
          deprecationReason: 'deprecated'
        });
      });
    } else {
      const fieldMap = fields;
      Object.keys(fieldMap).forEach(field => {
        if (existedFieldNames.indexOf(field) === -1) {
          throw new Error(`Cannot deprecate non-existent value '${field}' from enum '${this.getTypeName()}'`);
        }

        const deprecationReason = fieldMap[field];
        this.extendField(field, {
          deprecationReason
        });
      });
    }

    return this;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = (0, _definitionNode.getEnumTypeDefinitionNode)(this);

    if (_graphqlVersion.graphqlVersion >= 14) {
      this._gqType._values = (0, _configToDefine.defineEnumValues)(this._gqType, this._gqcFields, this._gqType.astNode);
      this._gqType._valueLookup = new Map(this._gqType._values.map(enumValue => [enumValue.value, enumValue]));
      this._gqType._nameLookup = (0, _keyMap.default)(this._gqType._values, value => value.name);
    } else {
      // clear builded fields in type
      delete this._gqType._valueLookup;
      delete this._gqType._nameLookup;
      this._gqType._values = (0, _configToDefine.defineEnumValues)(this._gqType, this._gqcFields, this._gqType.astNode);
    }

    return this._gqType;
  }

  getTypePlural() {
    return new _ListComposer.ListComposer(this);
  }

  getTypeNonNull() {
    return new _NonNullComposer.NonNullComposer(this);
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


  get List() {
    return new _ListComposer.ListComposer(this);
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


  get NonNull() {
    return new _NonNullComposer.NonNullComposer(this);
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
      throw new Error('You should provide newTypeName:string for EnumTypeComposer.clone()');
    }

    const cloned = newTypeNameOrTC instanceof EnumTypeComposer ? newTypeNameOrTC : EnumTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
    cloned._gqcFields = (0, _misc.mapEachKey)(this._gqcFields, fieldConfig => _objectSpread(_objectSpread({}, fieldConfig), {}, {
      extensions: _objectSpread({}, fieldConfig.extensions)
    }));
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
      throw new Error('You should provide SchemaComposer for EnumTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return cloneMap.get(this);
    const cloned = EnumTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);
    return this.clone(cloned);
  }

  merge(type) {
    let tc;

    if (type instanceof _graphql.GraphQLEnumType) {
      tc = EnumTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof EnumTypeComposer) {
      tc = type;
    } else {
      throw new Error(`Cannot merge ${(0, _misc.inspect)(type)} with EnumType(${this.getTypeName()}). Provided type should be GraphQLEnumType or EnumTypeComposer.`);
    }

    this.addFields(tc.getFields());
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

  toSDL(opts) {
    return (0, _schemaPrinter.printEnum)(this.getType(), opts);
  }

}

exports.EnumTypeComposer = EnumTypeComposer;