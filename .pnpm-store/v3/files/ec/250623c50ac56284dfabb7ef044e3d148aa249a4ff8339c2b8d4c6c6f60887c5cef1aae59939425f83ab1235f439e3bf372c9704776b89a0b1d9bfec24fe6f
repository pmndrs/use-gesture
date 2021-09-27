"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScalarTypeComposer = void 0;

var _graphql = require("./graphql");

var _is = require("./utils/is");

var _SchemaComposer = require("./SchemaComposer");

var _ListComposer = require("./ListComposer");

var _NonNullComposer = require("./NonNullComposer");

var _typeHelpers = require("./utils/typeHelpers");

var _misc = require("./utils/misc");

var _graphqlVersion = require("./utils/graphqlVersion");

var _schemaPrinter = require("./utils/schemaPrinter");

var _definitionNode = require("./utils/definitionNode");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ScalarTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `ScalarTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, ScalarTypeComposer)) {
      return schemaComposer.getSTC(typeDef);
    }

    const stc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(stc);
    return stc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new _SchemaComposer.SchemaComposer();
    let STC;

    if ((0, _is.isString)(typeDef)) {
      const typeName = typeDef;

      if ((0, _typeHelpers.isTypeNameString)(typeName)) {
        STC = new ScalarTypeComposer(new _graphql.GraphQLScalarType({
          name: typeName,
          serialize: () => {}
        }), sc);
      } else {
        STC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(STC instanceof ScalarTypeComposer)) {
          throw new Error('You should provide correct GraphQLScalarType type definition. Eg. `scalar UInt`');
        }
      }
    } else if (typeDef instanceof _graphql.GraphQLScalarType) {
      STC = new ScalarTypeComposer(typeDef, sc);
    } else if ((0, _is.isObject)(typeDef)) {
      const type = new _graphql.GraphQLScalarType(_objectSpread({}, typeDef));
      STC = new ScalarTypeComposer(type, sc);
      STC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLScalarTypeConfig or string with scalar name or SDL. Provided:\n${(0, _misc.inspect)(typeDef)}`);
    }

    return STC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    if (!(schemaComposer instanceof _SchemaComposer.SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new ScalarTypeComposer(GraphQLScalarType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof _graphql.GraphQLScalarType)) {
      throw new Error('ScalarTypeComposer accept only GraphQLScalarType in constructor');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);
    let serialize;
    let parseValue;
    let parseLiteral;

    if (_graphqlVersion.graphqlVersion >= 14) {
      serialize = this._gqType.serialize;
      parseValue = this._gqType.parseValue;
      parseLiteral = this._gqType.parseLiteral;
    } else {
      serialize = this._gqType._scalarConfig.serialize;
      parseValue = this._gqType._scalarConfig.parseValue;
      parseLiteral = this._gqType._scalarConfig.parseLiteral;
    }

    this.setSerialize(serialize);
    this.setParseValue(parseValue);
    this.setParseLiteral(parseLiteral);

    if (graphqlType !== null && graphqlType !== void 0 && (_graphqlType$astNode = graphqlType.astNode) !== null && _graphqlType$astNode !== void 0 && _graphqlType$astNode.directives) {
      var _graphqlType$astNode2;

      this.setExtension('directives', this.schemaComposer.typeMapper.parseDirectives(graphqlType === null || graphqlType === void 0 ? void 0 : (_graphqlType$astNode2 = graphqlType.astNode) === null || _graphqlType$astNode2 === void 0 ? void 0 : _graphqlType$astNode2.directives));
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  } // -----------------------------------------------
  // Serialize methods
  // -----------------------------------------------


  setSerialize(fn) {
    this._gqcSerialize = fn;
  }

  getSerialize() {
    return this._gqcSerialize;
  }

  setParseValue(fn) {
    this._gqcParseValue = fn || (value => value);
  }

  getParseValue() {
    return this._gqcParseValue;
  }

  setParseLiteral(fn) {
    this._gqcParseLiteral = fn || _graphql.valueFromASTUntyped;
  }

  getParseLiteral() {
    return this._gqcParseLiteral;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = (0, _definitionNode.getScalarTypeDefinitionNode)(this);

    if (_graphqlVersion.graphqlVersion >= 14) {
      this._gqType.serialize = this._gqcSerialize;
      this._gqType.parseValue = this._gqcParseValue;
      this._gqType.parseLiteral = this._gqcParseLiteral;
    } else {
      this._gqType._scalarConfig = _objectSpread(_objectSpread({}, this._gqType._scalarConfig), {}, {
        serialize: this._gqcSerialize,
        parseValue: this._gqcParseValue,
        parseLiteral: this._gqcParseLiteral
      });
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
   *   const ColorTC = schemaComposer.createScalarTC(`scalar Color`);
   *   schemaComposer.Query.addFields({
   *     color1: { type: ColorTC.List }, // in SDL: color1: [Color]
   *     color2: { type: ColorTC.NonNull.List }, // in SDL: color2: [Color!]
   *     color3: { type: ColorTC.NonNull.List.NonNull }, // in SDL: color2: [Color!]!
   *   })
   */


  get List() {
    return new _ListComposer.ListComposer(this);
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

  getSpecifiedByUrl() {
    return this._gqType.specifiedByUrl;
  }

  setSpecifiedByUrl(url) {
    this._gqType.specifiedByUrl = url;
    return this;
  }
  /**
   * You may clone this type with a new provided name as string.
   * Or you may provide a new TypeComposer which will get all clonned
   * settings from this type.
   */


  clone(newTypeNameOrTC) {
    if (!newTypeNameOrTC) {
      throw new Error('You should provide newTypeName:string for ScalarTypeComposer.clone()');
    }

    const cloned = newTypeNameOrTC instanceof ScalarTypeComposer ? newTypeNameOrTC : ScalarTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
    cloned._gqcSerialize = this._gqcSerialize;
    cloned._gqcParseValue = this._gqcParseValue;
    cloned._gqcParseLiteral = this._gqcParseLiteral;
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned.setDescription(this.getDescription());
    cloned.setSpecifiedByUrl(this.getSpecifiedByUrl());
    return cloned;
  }

  merge(type) {
    let tc;

    if (type instanceof _graphql.GraphQLScalarType) {
      tc = ScalarTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof ScalarTypeComposer) {
      tc = type;
    }

    if (tc) {
      this.setSerialize(tc.getSerialize());
      this.setParseValue(tc.getParseValue());
      this.setParseLiteral(tc.getParseLiteral());
    } else {
      throw new Error(`Cannot merge ${(0, _misc.inspect)(type)} with ScalarType(${this.getTypeName()}). Provided type should be GraphQLScalarType or ScalarTypeComposer.`);
    }

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
  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */

  /**
   * Prints SDL for current type.
   */


  toSDL(opts) {
    return (0, _schemaPrinter.printScalar)(this.getType(), opts);
  }
  /**
   * Copy this scalar type to another SchemaComposer.
   *
   * Scalar types cannot be cloned.
   * It will be very strange if we clone for example Boolean or Date types.
   *
   * This methods exists for compatibility with other TypeComposers.
   */


  cloneTo(anotherSchemaComposer, cloneMap = new Map()) {
    if (!anotherSchemaComposer) {
      throw new Error('You should provide SchemaComposer for ObjectTypeComposer.cloneTo()');
    }

    if (cloneMap.has(this)) return cloneMap.get(this); // scalar cannot be cloned, so use the same instance

    cloneMap.set(this, this); // copy same type instance

    if (!anotherSchemaComposer.has(this.getTypeName())) {
      anotherSchemaComposer.add(this);
    }

    return this;
  }

}

exports.ScalarTypeComposer = ScalarTypeComposer;