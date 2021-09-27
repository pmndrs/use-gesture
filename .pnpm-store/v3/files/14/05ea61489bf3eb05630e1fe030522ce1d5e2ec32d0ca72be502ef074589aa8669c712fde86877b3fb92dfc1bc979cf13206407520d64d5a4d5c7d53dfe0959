function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
import { GraphQLScalarType, valueFromASTUntyped } from './graphql';
import { isObject, isString } from './utils/is';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { isTypeNameString } from './utils/typeHelpers';
import { inspect } from './utils/misc';
import { graphqlVersion } from './utils/graphqlVersion';
import { printScalar } from './utils/schemaPrinter';
import { getScalarTypeDefinitionNode } from './utils/definitionNode';
export class ScalarTypeComposer {
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
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
    const sc = schemaComposer || new SchemaComposer();
    let STC;

    if (isString(typeDef)) {
      const typeName = typeDef;

      if (isTypeNameString(typeName)) {
        STC = new ScalarTypeComposer(new GraphQLScalarType({
          name: typeName,
          serialize: () => {}
        }), sc);
      } else {
        STC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(STC instanceof ScalarTypeComposer)) {
          throw new Error('You should provide correct GraphQLScalarType type definition. Eg. `scalar UInt`');
        }
      }
    } else if (typeDef instanceof GraphQLScalarType) {
      STC = new ScalarTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLScalarType(_objectSpread({}, typeDef));
      STC = new ScalarTypeComposer(type, sc);
      STC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLScalarTypeConfig or string with scalar name or SDL. Provided:\n${inspect(typeDef)}`);
    }

    return STC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new ScalarTypeComposer(GraphQLScalarType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof GraphQLScalarType)) {
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

    if (graphqlVersion >= 14) {
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
    this._gqcParseLiteral = fn || valueFromASTUntyped;
  }

  getParseLiteral() {
    return this._gqcParseLiteral;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = getScalarTypeDefinitionNode(this);

    if (graphqlVersion >= 14) {
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
    return new ListComposer(this);
  }

  getTypeNonNull() {
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


  get List() {
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
      throw new Error(`Cannot merge ${inspect(type)} with ScalarType(${this.getTypeName()}). Provided type should be GraphQLScalarType or ScalarTypeComposer.`);
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