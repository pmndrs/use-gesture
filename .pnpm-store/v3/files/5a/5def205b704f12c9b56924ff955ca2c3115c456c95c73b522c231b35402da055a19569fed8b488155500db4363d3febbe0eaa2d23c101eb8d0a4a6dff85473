"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTypeComposer = void 0;

var _graphql = require("./graphql");

var _misc = require("./utils/misc");

var _is = require("./utils/is");

var _typeByPath = require("./utils/typeByPath");

var _SchemaComposer = require("./SchemaComposer");

var _ListComposer = require("./ListComposer");

var _NonNullComposer = require("./NonNullComposer");

var _graphqlVersion = require("./utils/graphqlVersion");

var _configToDefine = require("./utils/configToDefine");

var _typeHelpers = require("./utils/typeHelpers");

var _schemaPrinter = require("./utils/schemaPrinter");

var _definitionNode = require("./utils/definitionNode");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InputTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `InputTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, InputTypeComposer)) {
      return schemaComposer.getITC(typeDef);
    }

    const itc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(itc);
    return itc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new _SchemaComposer.SchemaComposer();
    let ITC;

    if ((0, _is.isString)(typeDef)) {
      const typeName = typeDef;

      if ((0, _typeHelpers.isTypeNameString)(typeName)) {
        ITC = new InputTypeComposer(new _graphql.GraphQLInputObjectType({
          name: typeName,
          fields: () => ({})
        }), sc);
      } else {
        ITC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(ITC instanceof InputTypeComposer)) {
          throw new Error('You should provide correct GraphQLInputObjectType type definition. ' + 'Eg. `input MyInputType { name: String! }`');
        }
      }
    } else if (typeDef instanceof _graphql.GraphQLInputObjectType) {
      ITC = new InputTypeComposer(typeDef, sc);
    } else if ((0, _is.isObject)(typeDef)) {
      const type = new _graphql.GraphQLInputObjectType({
        name: typeDef.name,
        description: typeDef.description,
        fields: () => ({})
      });
      ITC = new InputTypeComposer(type, sc);
      const fields = typeDef.fields;

      if ((0, _is.isFunction)(fields)) {
        // `convertInputFieldMapToConfig` helps to solve hoisting problems
        // rewrap fields `() => { f1: { type: A } }` -> `{ f1: { type: () => A } }`
        ITC.addFields((0, _configToDefine.convertInputFieldMapToConfig)(fields, sc));
      }

      if ((0, _is.isObject)(fields)) ITC.addFields(fields);
      ITC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide InputObjectConfig or string with type name to InputTypeComposer.create(typeDef). Provided:\n${(0, _misc.inspect)(typeDef)}`);
    }

    return ITC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new InputTypeComposer(GraphQLInputType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof _graphql.GraphQLInputObjectType)) {
      throw new Error('InputTypeComposer accept only GraphQLInputObjectType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);

    if (_graphqlVersion.graphqlVersion >= 14) {
      this._gqcFields = (0, _configToDefine.convertInputFieldMapToConfig)(this._gqType._fields, this.schemaComposer);
    } else {
      const fields = this._gqType._typeConfig.fields;
      this._gqcFields = this.schemaComposer.typeMapper.convertInputFieldConfigMap((0, _misc.resolveMaybeThunk)(fields) || {}, this.getTypeName());
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
    this._gqcFields[fieldName] = (0, _is.isFunction)(fieldConfig) ? fieldConfig : this.schemaComposer.typeMapper.convertInputFieldConfig(fieldConfig, fieldName, this.getTypeName());
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
          childTC = InputTypeComposer.create(`${this.getTypeName()}${(0, _misc.upperFirst)(name)}`, this.schemaComposer);
          this.setField(name, childTC);
        } else {
          childTC = this.getFieldTC(name);
        }

        if (childTC instanceof InputTypeComposer) {
          childTC.addNestedFields({
            [names.join('.')]: fc
          });
        }
      }
    });
    return this;
  }

  getField(fieldName) {
    // If FieldConfig is a Thunk then unwrap it on first read.
    // In most cases FieldConfig is an object,
    // but for solving hoisting problems it's quite good to wrap it in function.
    if ((0, _is.isFunction)(this._gqcFields[fieldName])) {
      // $FlowFixMe
      const unwrappedFieldConfig = this._gqcFields[fieldName](this.schemaComposer);

      this.setField(fieldName, unwrappedFieldConfig);
    }

    const field = this._gqcFields[fieldName];

    if (!field) {
      throw new Error(`Cannot get field '${fieldName}' from input type '${this.getTypeName()}'. Field does not exist.`);
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

          if (subTC instanceof InputTypeComposer) {
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

  extendField(fieldName, partialFieldConfig) {
    let prevFieldConfig;

    try {
      prevFieldConfig = this.getField(fieldName);
    } catch (e) {
      throw new Error(`Cannot extend field '${fieldName}' from input type '${this.getTypeName()}'. Field does not exist.`);
    }

    this.setField(fieldName, _objectSpread(_objectSpread(_objectSpread({}, prevFieldConfig), partialFieldConfig), {}, {
      extensions: _objectSpread(_objectSpread({}, prevFieldConfig.extensions || {}), partialFieldConfig.extensions || {})
    }));
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

  getFieldConfig(fieldName) {
    const _this$getField = this.getField(fieldName),
          {
      type
    } = _this$getField,
          rest = _objectWithoutProperties(_this$getField, ["type"]);

    return _objectSpread({
      type: type.getType()
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
    return (0, _typeHelpers.unwrapInputTC)(anyTC);
  }
  /**
   * Alias for `getFieldTC()` but returns statically checked InputTypeComposer.
   * If field have other type then error will be thrown.
   */


  getFieldITC(fieldName) {
    const tc = this.getFieldTC(fieldName);

    if (!(tc instanceof InputTypeComposer)) {
      throw new Error(`${this.getTypeName()}.getFieldITC('${fieldName}') must be InputTypeComposer, but received ${tc.constructor.name}. Maybe you need to use 'getFieldTC()' method which returns any type composer?`);
    }

    return tc;
  } // alias for `isFieldNonNull()` (may be deprecated in future)


  isRequired(fieldName) {
    return this.isFieldNonNull(fieldName);
  }

  isFieldNonNull(fieldName) {
    return this.getField(fieldName).type instanceof _NonNullComposer.NonNullComposer;
  }

  makeFieldNonNull(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && !(fc.type instanceof _NonNullComposer.NonNullComposer)) {
        fc.type = new _NonNullComposer.NonNullComposer(fc.type);
      }
    });
    return this;
  } // alias for makeFieldNonNull()


  makeRequired(fieldNameOrArray) {
    return this.makeFieldNonNull(fieldNameOrArray);
  }

  makeFieldNullable(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && fc.type instanceof _NonNullComposer.NonNullComposer) {
        fc.type = fc.type.ofType;
      }
    });
    return this;
  }

  makeOptional(fieldNameOrArray) {
    return this.makeFieldNullable(fieldNameOrArray);
  }

  isFieldPlural(fieldName) {
    const type = this.getField(fieldName).type;
    return type instanceof _ListComposer.ListComposer || type instanceof _NonNullComposer.NonNullComposer && type.ofType instanceof _ListComposer.ListComposer;
  }

  makeFieldPlural(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc && !(fc.type instanceof _ListComposer.ListComposer)) {
        fc.type = new _ListComposer.ListComposer(fc.type);
      }
    });
    return this;
  }

  makeFieldNonPlural(fieldNameOrArray) {
    const fieldNames = Array.isArray(fieldNameOrArray) ? fieldNameOrArray : [fieldNameOrArray];
    fieldNames.forEach(fieldName => {
      const fc = this._gqcFields[fieldName];

      if (fc) {
        if (fc.type instanceof _ListComposer.ListComposer) {
          fc.type = fc.type.ofType;
        } else if (fc.type instanceof _NonNullComposer.NonNullComposer && fc.type.ofType instanceof _ListComposer.ListComposer) {
          fc.type = fc.type.ofType.ofType instanceof _NonNullComposer.NonNullComposer ? fc.type.ofType.ofType : new _NonNullComposer.NonNullComposer(fc.type.ofType.ofType);
        }
      }
    });
    return this;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = (0, _definitionNode.getInputObjectTypeDefinitionNode)(this);

    if (_graphqlVersion.graphqlVersion >= 14) {
      this._gqType._fields = () => {
        return (0, _configToDefine.defineInputFieldMap)(this._gqType, (0, _misc.mapEachKey)(this._gqcFields, (fc, name) => this.getFieldConfig(name)), this._gqType.astNode);
      };
    } else {
      this._gqType._typeConfig.fields = () => {
        return (0, _misc.mapEachKey)(this._gqcFields, (fc, name) => this.getFieldConfig(name));
      };

      delete this._gqType._fields;
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


  get List() {
    return new _ListComposer.ListComposer(this);
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


  get NonNull() {
    return new _NonNullComposer.NonNullComposer(this);
  }

  getTypeName() {
    return this._gqType.name;
  }

  setTypeName(name) {
    this._gqType.name = name;
    this.schemaComposer.set(name, this);
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
      throw new Error('You should provide new type name for clone() method');
    }

    const cloned = newTypeNameOrTC instanceof InputTypeComposer ? newTypeNameOrTC : InputTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
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
      throw new Error('You should provide SchemaComposer for InputTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return cloneMap.get(this);
    const cloned = InputTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);
    cloned._gqcFields = (0, _misc.mapEachKey)(this._gqcFields, fieldConfig => _objectSpread(_objectSpread({}, fieldConfig), {}, {
      type: (0, _typeHelpers.cloneTypeTo)(fieldConfig.type, anotherSchemaComposer, cloneMap),
      extensions: _objectSpread({}, fieldConfig.extensions)
    }));
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned.setDescription(this.getDescription());
    return cloned;
  }

  merge(type) {
    let tc;

    if (type instanceof _graphql.GraphQLInputObjectType) {
      tc = InputTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof InputTypeComposer) {
      tc = type;
    } else {
      throw new Error(`Cannot merge ${(0, _misc.inspect)(type)} with InputObjectType(${this.getTypeName()}). Provided type should be GraphQLInputObjectType or InputTypeComposer.`);
    } // deep clone all fields


    const fields = _objectSpread({}, tc.getFields());

    Object.keys(fields).forEach(fieldName => {
      fields[fieldName] = _objectSpread(_objectSpread({}, fields[fieldName]), {}, {
        // set type as SDL string, it automatically will be remapped to the correct type instance in the current schema
        type: tc.getFieldTypeName(fieldName)
      });
    });
    this.addFields(fields);
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
  } // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------


  get(path) {
    return (0, _typeByPath.typeByPath)(this, path);
  }
  /**
   * Returns all types which are used inside the current type
   */


  getNestedTCs(opts = {}, passedTypes = new Set()) {
    const exclude = Array.isArray(opts.exclude) ? opts.exclude : [];
    this.getFieldNames().forEach(fieldName => {
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


  toSDL(opts) {
    const _ref = opts || {},
          {
      deep
    } = _ref,
          innerOpts = _objectWithoutProperties(_ref, ["deep"]);

    const exclude = Array.isArray(innerOpts.exclude) ? innerOpts.exclude : [];

    if (deep) {
      let r = '';
      r += (0, _schemaPrinter.printInputObject)(this.getType(), innerOpts);
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

    return (0, _schemaPrinter.printInputObject)(this.getType(), innerOpts);
  }

}

exports.InputTypeComposer = InputTypeComposer;