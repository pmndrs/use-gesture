"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaComposer = exports.BUILT_IN_DIRECTIVES = void 0;

var _deprecate = _interopRequireDefault(require("./utils/deprecate"));

var _TypeStorage = require("./TypeStorage");

var _TypeMapper = require("./TypeMapper");

var _ObjectTypeComposer = require("./ObjectTypeComposer");

var _InputTypeComposer = require("./InputTypeComposer");

var _ScalarTypeComposer = require("./ScalarTypeComposer");

var _EnumTypeComposer = require("./EnumTypeComposer");

var _InterfaceTypeComposer = require("./InterfaceTypeComposer");

var _UnionTypeComposer = require("./UnionTypeComposer");

var _ListComposer = require("./ListComposer");

var _NonNullComposer = require("./NonNullComposer");

var _ThunkComposer = require("./ThunkComposer");

var _Resolver = require("./Resolver");

var _is = require("./utils/is");

var _misc = require("./utils/misc");

var _dedent = require("./utils/dedent");

var _typeHelpers = require("./utils/typeHelpers");

var _graphql = require("./graphql");

var _schemaPrinter = require("./utils/schemaPrinter");

var _schemaVisitor = require("./utils/schemaVisitor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const BUILT_IN_DIRECTIVES = [_graphql.GraphQLSkipDirective, _graphql.GraphQLIncludeDirective, _graphql.GraphQLDeprecatedDirective];
exports.BUILT_IN_DIRECTIVES = BUILT_IN_DIRECTIVES;

class SchemaComposer extends _TypeStorage.TypeStorage {
  /**
   * Create SchemaComposer from
   *  - scratch
   *  - or from SDL
   *  - or from GraphQLSchema instance
   *
   * @param {undefined | GraphQLSchema | string} schema
   */
  constructor(schemaOrSDL) {
    super();

    _defineProperty(this, "_schemaMustHaveTypes", []);

    _defineProperty(this, "_directives", [...BUILT_IN_DIRECTIVES]);

    this.typeMapper = new _TypeMapper.TypeMapper(this);
    let schema;

    if (typeof schemaOrSDL === 'string') {
      schema = (0, _graphql.buildSchema)(schemaOrSDL);
    } else {
      schema = schemaOrSDL;
    }

    if (schema instanceof _graphql.GraphQLSchema) {
      schema.getDirectives().forEach(directive => {
        this.addDirective(directive);
      });
      (0, _misc.forEachKey)(schema.getTypeMap(), (v, k) => {
        // skip internal types
        if (k.startsWith('__')) return; // under the hood adds types to type storage

        this.typeMapper.convertGraphQLTypeToComposer(v);
      });
      const q = schema.getQueryType();
      if (q) this.set('Query', this.get(q));
      const m = schema.getMutationType();
      if (m) this.set('Mutation', this.get(m));
      const s = schema.getSubscriptionType();
      if (s) this.set('Subscription', this.get(s)); // $FlowFixMe `description` was added only in graphql@15.0.0

      if (schema.description) this.setDescription(schema.description);
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  }

  get Query() {
    return this.getOrCreateOTC('Query');
  }

  get Mutation() {
    return this.getOrCreateOTC('Mutation');
  }

  get Subscription() {
    return this.getOrCreateOTC('Subscription');
  }

  buildSchema(extraConfig) {
    const roots = {};

    if (this.has('Query')) {
      const tc = this.getOTC('Query');
      this.removeEmptyTypes(tc, new Set());
      roots.query = tc.getType();
    }

    if (this.has('Mutation')) {
      const tc = this.getOTC('Mutation');
      this.removeEmptyTypes(tc, new Set());

      if (tc.getFieldNames().length) {
        roots.mutation = tc.getType();
      }
    }

    if (this.has('Subscription')) {
      const tc = this.getOTC('Subscription');
      this.removeEmptyTypes(tc, new Set());

      if (tc.getFieldNames().length) {
        roots.subscription = tc.getType();
      }
    }

    const _ref = extraConfig || {},
          {
      keepUnusedTypes
    } = _ref,
          reducedConfig = _objectWithoutProperties(_ref, ["keepUnusedTypes"]);

    const typesSet = new Set();

    if (keepUnusedTypes) {
      this.types.forEach(type => {
        typesSet.add((0, _graphql.getNamedType)((0, _typeHelpers.getGraphQLType)(type)));
      });
    } // additional types, eg. used in Interfaces


    this._schemaMustHaveTypes.forEach(type => {
      typesSet.add((0, _graphql.getNamedType)((0, _typeHelpers.getGraphQLType)(type)));
    });

    if (Array.isArray(extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.types)) {
      extraConfig.types.forEach(type => {
        typesSet.add((0, _graphql.getNamedType)((0, _typeHelpers.getGraphQLType)(type)));
      });
    }

    const directives = [...this._directives, ...(Array.isArray(extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.directives) ? [...extraConfig.directives] : [])];
    const description = this.getDescription() || reducedConfig.description || undefined; // $FlowFixMe `description` was added only in graphql@15.0.0

    return new _graphql.GraphQLSchema(_objectSpread(_objectSpread(_objectSpread({}, reducedConfig), roots), {}, {
      types: Array.from(typesSet),
      directives,
      description
    }));
  }

  addSchemaMustHaveType(type) {
    this._schemaMustHaveTypes.push(type);

    return this;
  }

  removeEmptyTypes(tc, passedTypes = new Set()) {
    tc.getFieldNames().forEach(fieldName => {
      const fieldTC = tc.getFieldTC(fieldName);

      if (!fieldTC) {
        throw new Error(`fieldTC "${fieldName}" is not defined.`);
      }

      const typeName = fieldTC.getTypeName();

      if (!passedTypes.has(typeName)) {
        passedTypes.add(typeName);

        if (fieldTC instanceof _ObjectTypeComposer.ObjectTypeComposer) {
          if (fieldTC.getFieldNames().length > 0) {
            this.removeEmptyTypes(fieldTC, passedTypes);
          } else {
            // eslint-disable-next-line
            console.log(`graphql-compose: Delete field '${tc.getTypeName()}.${fieldName}' ` + `with type '${fieldTC.getTypeName()}', cause it does not have fields.`);
            tc.removeField(fieldName);
          }
        }
      }
    });
  }
  /**
   * Clone schema with deep cloning of all its types.
   * Except Scalar types which will be the same for both schemas.
   */


  clone() {
    const sc = new SchemaComposer();
    const cloneMap = new Map();
    this.forEach((type, key) => {
      sc.set(key, (0, _typeHelpers.cloneTypeTo)(type, sc, cloneMap));
    });
    sc._schemaMustHaveTypes = this._schemaMustHaveTypes.map(t => (0, _typeHelpers.cloneTypeTo)(t, sc, cloneMap));
    sc._directives = [...this._directives];
    return sc;
  }

  merge(schema) {
    let sc;

    if (schema instanceof SchemaComposer) {
      sc = schema;
    } else if (schema instanceof _graphql.GraphQLSchema) {
      sc = new SchemaComposer(schema);
    } else {
      throw new Error('SchemaComposer.merge() accepts only GraphQLSchema or SchemaComposer instances.');
    } // Root types may have any name, so import them manually.


    this.Query.merge(sc.Query);
    this.Mutation.merge(sc.Mutation);
    this.Subscription.merge(sc.Subscription); // Merging non-root types

    sc.types.forEach((type, key) => {
      // skip internal and root types
      if (typeof key === 'string' && key.startsWith('__') || type === sc.Query || type === sc.Mutation || type === sc.Subscription) {
        return;
      }

      let typeName;

      if ((0, _typeHelpers.isComposeNamedType)(type)) {
        typeName = (0, _typeHelpers.getComposeTypeName)(type, this);
      } // merge regular types


      if (this.has(key)) {
        // merge by key (key prefer, cause it may be reference and types not yet resolved)
        this.getAnyTC(key).merge(type);
      } else if (typeName && this.has(typeName)) {
        // merge by type name (key may be different)
        this.getAnyTC(typeName).merge(type);
      } else {
        // add a new type
        const tc = type.cloneTo(this);
        this.set(key, tc);

        if (typeName && typeName !== key) {
          this.set(typeName, tc);
        }
      }
    });
    sc.getDirectives().forEach(directive => {
      this.addDirective(directive);
    });
    return this;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
    return this;
  }
  /**
   * -----------------------------------------------
   * Like graphql-tools methods
   * -----------------------------------------------
   */


  addTypeDefs(typeDefs) {
    const types = this.typeMapper.parseTypesFromString(typeDefs);
    types.forEach(type => {
      const name = type.getTypeName();

      if (name !== 'Query' && name !== 'Mutation' && name !== 'Subscription') {
        this.add(type);
      }
    });

    if (types.has('Query')) {
      const tc = types.get('Query');

      if (!(tc instanceof _ObjectTypeComposer.ObjectTypeComposer)) {
        throw new Error(`Type Query in typedefs isn't an Object Type.`);
      }

      this.Query.addFields(tc.getFields());
    }

    if (types.has('Mutation')) {
      const tc = types.get('Mutation');

      if (!(tc instanceof _ObjectTypeComposer.ObjectTypeComposer)) {
        throw new Error(`Type Mutation in typedefs isn't an Object Type.`);
      }

      this.Mutation.addFields(tc.getFields());
    }

    if (types.has('Subscription')) {
      const tc = types.get('Subscription');

      if (!(tc instanceof _ObjectTypeComposer.ObjectTypeComposer)) {
        throw new Error(`Type Subscription in typedefs isn't an Object Type.`);
      }

      this.Subscription.addFields(tc.getFields());
    }

    return types;
  }

  addResolveMethods(typesFieldsResolve) {
    const typeNames = Object.keys(typesFieldsResolve);
    typeNames.forEach(typeName => {
      const tc = this.get(typeName);

      if (tc instanceof _ScalarTypeComposer.ScalarTypeComposer) {
        const maybeScalar = typesFieldsResolve[typeName];

        if (maybeScalar instanceof _graphql.GraphQLScalarType) {
          tc.merge(maybeScalar);
          if (maybeScalar.name !== typeName) this.set(typeName, tc);
          return;
        } else if (typeof maybeScalar.name === 'string' && typeof maybeScalar.serialize === 'function') {
          tc.merge(new _graphql.GraphQLScalarType(maybeScalar));
          if (maybeScalar.name !== typeName) this.set(typeName, tc);
          return;
        }
      } else if (tc instanceof _ObjectTypeComposer.ObjectTypeComposer) {
        const fieldsResolve = typesFieldsResolve[typeName];
        const fieldNames = Object.keys(fieldsResolve);
        fieldNames.forEach(fieldName => {
          tc.extendField(fieldName, {
            resolve: fieldsResolve[fieldName]
          });
        });
        return;
      } else if (tc instanceof _EnumTypeComposer.EnumTypeComposer) {
        const enumValuesMap = typesFieldsResolve[typeName];
        const fieldNames = Object.keys(enumValuesMap);
        fieldNames.forEach(fieldName => {
          tc.extendField(fieldName, {
            value: enumValuesMap[fieldName]
          });
        });
        return;
      }

      throw new Error((0, _dedent.dedent)`
        Cannot add resolver to the following type: 
          ${(0, _misc.inspect)(tc)}
      `);
    });
  }
  /**
   * -----------------------------------------------
   * Type methods
   * -----------------------------------------------
   */


  createObjectTC(typeDef) {
    return _ObjectTypeComposer.ObjectTypeComposer.create(typeDef, this);
  }

  createInputTC(typeDef) {
    return _InputTypeComposer.InputTypeComposer.create(typeDef, this);
  }

  createEnumTC(typeDef) {
    return _EnumTypeComposer.EnumTypeComposer.create(typeDef, this);
  }

  createInterfaceTC(typeDef) {
    return _InterfaceTypeComposer.InterfaceTypeComposer.create(typeDef, this);
  }

  createUnionTC(typeDef) {
    return _UnionTypeComposer.UnionTypeComposer.create(typeDef, this);
  }

  createScalarTC(typeDef) {
    return _ScalarTypeComposer.ScalarTypeComposer.create(typeDef, this);
  }

  createResolver(opts) {
    return new _Resolver.Resolver(opts, this);
  }

  createTC(typeOrSDL) {
    if (this.has(typeOrSDL)) {
      return this.get(typeOrSDL);
    }

    const tc = (0, _typeHelpers.isNamedTypeComposer)(typeOrSDL) ? typeOrSDL : this.createTempTC(typeOrSDL);
    const typeName = tc.getTypeName();
    this.set(typeName, tc);
    this.set(typeOrSDL, tc);
    return tc;
  }

  createTempTC(typeOrSDL) {
    let type;

    if (typeof typeOrSDL === 'string') {
      type = this.typeMapper.convertSDLTypeDefinition(typeOrSDL);
    } else {
      type = typeOrSDL;
    }

    if ((0, _typeHelpers.isTypeComposer)(type)) {
      if (type instanceof _NonNullComposer.NonNullComposer || type instanceof _ListComposer.ListComposer || type instanceof _ThunkComposer.ThunkComposer) {
        const unwrappedTC = type.getUnwrappedTC();
        return unwrappedTC;
      }

      return type;
    } else if (type instanceof _graphql.GraphQLObjectType) {
      return _ObjectTypeComposer.ObjectTypeComposer.createTemp(type, this);
    } else if (type instanceof _graphql.GraphQLInputObjectType) {
      return _InputTypeComposer.InputTypeComposer.createTemp(type, this);
    } else if (type instanceof _graphql.GraphQLScalarType) {
      return _ScalarTypeComposer.ScalarTypeComposer.createTemp(type, this);
    } else if (type instanceof _graphql.GraphQLEnumType) {
      return _EnumTypeComposer.EnumTypeComposer.createTemp(type, this);
    } else if (type instanceof _graphql.GraphQLInterfaceType) {
      return _InterfaceTypeComposer.InterfaceTypeComposer.createTemp(type, this);
    } else if (type instanceof _graphql.GraphQLUnionType) {
      return _UnionTypeComposer.UnionTypeComposer.createTemp(type, this);
    }

    throw new Error((0, _dedent.dedent)`
      Cannot create as TypeComposer the following value: 
        ${(0, _misc.inspect)(type)}.
    `);
  }
  /* @deprecated 8.0.0 */


  getOrCreateTC(typeName, onCreate) {
    (0, _deprecate.default)(`Use SchemaComposer.getOrCreateOTC() method instead`);
    return this.getOrCreateOTC(typeName, onCreate);
  }

  getOrCreateOTC(typeName, onCreate) {
    try {
      return this.getOTC(typeName);
    } catch (e) {
      const tc = _ObjectTypeComposer.ObjectTypeComposer.create(typeName, this);

      this.set(typeName, tc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(tc);
      return tc;
    }
  }

  getOrCreateITC(typeName, onCreate) {
    try {
      return this.getITC(typeName);
    } catch (e) {
      const itc = _InputTypeComposer.InputTypeComposer.create(typeName, this);

      this.set(typeName, itc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(itc);
      return itc;
    }
  }

  getOrCreateETC(typeName, onCreate) {
    try {
      return this.getETC(typeName);
    } catch (e) {
      const etc = _EnumTypeComposer.EnumTypeComposer.create(typeName, this);

      this.set(typeName, etc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(etc);
      return etc;
    }
  }

  getOrCreateIFTC(typeName, onCreate) {
    try {
      return this.getIFTC(typeName);
    } catch (e) {
      const iftc = _InterfaceTypeComposer.InterfaceTypeComposer.create(typeName, this);

      this.set(typeName, iftc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(iftc);
      return iftc;
    }
  }

  getOrCreateUTC(typeName, onCreate) {
    try {
      return this.getUTC(typeName);
    } catch (e) {
      const utc = _UnionTypeComposer.UnionTypeComposer.create(typeName, this);

      this.set(typeName, utc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(utc);
      return utc;
    }
  }

  getOrCreateSTC(typeName, onCreate) {
    try {
      return this.getSTC(typeName);
    } catch (e) {
      const stc = _ScalarTypeComposer.ScalarTypeComposer.create(typeName, this);

      this.set(typeName, stc);
      if (onCreate && (0, _is.isFunction)(onCreate)) onCreate(stc);
      return stc;
    }
  }

  getOTC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLObjectType)) {
      return _ObjectTypeComposer.ObjectTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _ObjectTypeComposer.ObjectTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find ObjectTypeComposer with name ${typeName}`);
  }

  getITC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLInputObjectType)) {
      return _InputTypeComposer.InputTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _InputTypeComposer.InputTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find InputTypeComposer with name ${typeName}`);
  }

  getETC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLEnumType)) {
      return _EnumTypeComposer.EnumTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _EnumTypeComposer.EnumTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find EnumTypeComposer with name ${typeName}`);
  }

  getIFTC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLInterfaceType)) {
      return _InterfaceTypeComposer.InterfaceTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _InterfaceTypeComposer.InterfaceTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find InterfaceTypeComposer with name ${typeName}`);
  }

  getUTC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLUnionType)) {
      return _UnionTypeComposer.UnionTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _UnionTypeComposer.UnionTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find UnionTypeComposer with name ${typeName}`);
  }

  getSTC(typeName) {
    if (this.hasInstance(typeName, _graphql.GraphQLScalarType)) {
      return _ScalarTypeComposer.ScalarTypeComposer.create(this.get(typeName), this);
    }

    if (this.hasInstance(typeName, _ScalarTypeComposer.ScalarTypeComposer)) {
      return this.get(typeName);
    }

    throw new Error(`Cannot find ScalarTypeComposer with name ${typeName}`);
  }

  getAnyTC(typeOrName) {
    let type;

    if (typeof typeOrName === 'string') {
      type = this.get(typeOrName);
    } else {
      type = typeOrName;
    }

    if (type == null) {
      throw new Error(`Cannot find type with name ${typeOrName}`);
    } else if ((0, _typeHelpers.isNamedTypeComposer)(type)) {
      return type;
    }

    while (type instanceof _graphql.GraphQLList || type instanceof _graphql.GraphQLNonNull) {
      type = type.ofType;
    }

    if (type instanceof _graphql.GraphQLObjectType) {
      return _ObjectTypeComposer.ObjectTypeComposer.create(type, this);
    } else if (type instanceof _graphql.GraphQLInputObjectType) {
      return _InputTypeComposer.InputTypeComposer.create(type, this);
    } else if (type instanceof _graphql.GraphQLScalarType) {
      return _ScalarTypeComposer.ScalarTypeComposer.create(type, this);
    } else if (type instanceof _graphql.GraphQLEnumType) {
      return _EnumTypeComposer.EnumTypeComposer.create(type, this);
    } else if (type instanceof _graphql.GraphQLInterfaceType) {
      return _InterfaceTypeComposer.InterfaceTypeComposer.create(type, this);
    } else if (type instanceof _graphql.GraphQLUnionType) {
      return _UnionTypeComposer.UnionTypeComposer.create(type, this);
    }

    throw new Error((0, _dedent.dedent)`
      Type with name ${(0, _misc.inspect)(typeOrName)} cannot be obtained as any Composer helper.
      Put something strange?
    `);
  }
  /* @deprecated 8.0.0 */


  addAsComposer(typeOrSDL) {
    (0, _deprecate.default)('Use schemaComposer.add() method instead. From v7 all types in storage saved as TypeComposers.');
    return this.add(typeOrSDL);
  }

  isObjectType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isOutputTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _ObjectTypeComposer.ObjectTypeComposer;
  }

  isInputObjectType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isInputTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _InputTypeComposer.InputTypeComposer;
  }

  isScalarType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isScalarTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _ScalarTypeComposer.ScalarTypeComposer;
  }

  isEnumType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isEnumTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _EnumTypeComposer.EnumTypeComposer;
  }

  isInterfaceType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isInterfaceTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _InterfaceTypeComposer.InterfaceTypeComposer;
  }

  isUnionType(type) {
    if (typeof type === 'string' && (0, _typeHelpers.isUnionTypeDefinitionString)(type)) return true;
    if (!this.has(type)) return false;
    return this.getAnyTC(type) instanceof _UnionTypeComposer.UnionTypeComposer;
  }
  /**
   * -----------------------------------------------
   * Storage methods
   * -----------------------------------------------
   */


  clear() {
    super.clear();
    this._schemaMustHaveTypes = [];
    this._directives = BUILT_IN_DIRECTIVES;
  }

  add(typeOrSDL) {
    const tc = this.createTC(typeOrSDL);
    return tc.getTypeName();
  }

  set(key, value) {
    if (!(0, _typeHelpers.isNamedTypeComposer)(value)) {
      // eslint-disable-next-line
      (0, _deprecate.default)(`SchemaComposer.set() accept only TypeComposers. ` + `You provide with key ${(0, _misc.inspect)(key)} the following wrong value ${(0, _misc.inspect)(value)}.`);
    }

    super.set(key, value);
    return this;
  }
  /**
   * -----------------------------------------------
   * Directive methods
   * -----------------------------------------------
   */


  addDirective(directive) {
    if (!(directive instanceof _graphql.GraphQLDirective)) {
      throw new Error((0, _dedent.dedent)`
        You should provide GraphQLDirective to schemaComposer.addDirective(), but received: 
          ${(0, _misc.inspect)(directive)}
      `);
    }

    if (!this.hasDirective(directive)) {
      this._directives.push(directive);
    }

    return this;
  }

  removeDirective(directive) {
    this._directives = this._directives.filter(o => o !== directive);
    return this;
  }

  getDirectives() {
    return this._directives;
  }
  /**
   * This method used in TypeMapper and for fast parsing
   */


  _getDirective(name) {
    const directives = this.getDirectives();
    return directives.find(d => d.name === name);
  }

  getDirective(name) {
    const directive = this._getDirective(name);

    if (!directive) {
      throw new Error(`Directive instance with name ${name} does not exists.`);
    }

    return directive;
  }

  hasDirective(directive) {
    if (!directive) return false;

    if (typeof directive === 'string') {
      const name = directive.startsWith('@') ? directive.slice(1) : directive;
      return !!this._directives.find(o => o.name === name);
    } else if (directive instanceof _graphql.GraphQLDirective) {
      return !!this._directives.find(o => o === directive);
    }

    return false;
  }
  /**
   * -----------------------------------------------
   * Misc methods
   * -----------------------------------------------
   */
  // disable redundant noise in console.logs


  toString() {
    return 'SchemaComposer';
  }

  toJSON() {
    return 'SchemaComposer';
  }

  inspect() {
    return 'SchemaComposer';
  }
  /**
   * Prints SDL for any type in schema by its name.
   *
   * Can print all used sub-types if provided `deep: true` option.
   * Also you may omit some sub-types via `exclude: string[]` option.
   */


  getTypeSDL(typeName, opts) {
    return this.getAnyTC(typeName).toSDL(opts);
  }
  /**
   * Return schema as a SDL string.
   * This SDL can be used with graphql-tools and Apollo Federation.
   *
   * @param {Object} options
   * @param {String[]} options.include - add to SDL only provided types
   * @param {String[]} options.exclude - do not add provided types to SDL
   * @param {Boolean} options.omitScalars - do not add Scalar types to SDL
   * @param {Boolean} options.omitDescriptions - do not add descriptions to SDL
   * @param {Boolean} options.omitDirectiveDefinitions - do not add directives definitions to SDL
   * @param {Boolean} options.commentDescriptions - print descriptions like comments, starting with #
   * @param {Boolean} options.sortAll - sort fields, args, values, interfaces by its names. Useful for snapshot testing.
   * @param {Boolean} options.sortFields - sort fields by name
   * @param {Boolean} options.sortArgs - sort args by name
   * @param {Boolean} options.sortInterfaces  - sort interfaces by name
   * @param {Boolean} options.sortUnions - sort union types by name
   * @param {Boolean} options.sortEnums - sort enum values by name
   */


  toSDL(options) {
    return (0, _schemaPrinter.printSchemaComposer)(this, options);
  }
  /**
   * Returns a map of resolvers for each relevant GraphQL Object Type.
   *
   * This map of Resolvers can be used with graphql-tools and Apollo Federation.
   *
   * @param {Object} options
   * @param {String[]} options.exclude - do not add resolvers from provided types
   */


  getResolveMethods(opts) {
    const resolveMethods = {};
    const exclude = (opts === null || opts === void 0 ? void 0 : opts.exclude) || [];
    (0, _schemaVisitor.visitSchema)(this, {
      OBJECT_TYPE: tc => {
        const typename = tc.getTypeName();
        if (exclude.includes(typename)) return;
        (0, _misc.forEachKey)(tc.getFields(), (fc, fieldName) => {
          if (!fc.resolve || fc.resolve === _graphql.defaultFieldResolver) return;
          if (!resolveMethods[typename]) resolveMethods[typename] = {};
          resolveMethods[typename][fieldName] = fc.resolve;
        });
      },
      ENUM_TYPE: tc => {
        const typename = tc.getTypeName();
        if (exclude.includes(typename)) return;
        let hasDifferentIntervalValues = false;
        const internalValues = {};
        (0, _misc.forEachKey)(tc.getFields(), (fc, fieldName) => {
          if (fc.value !== fieldName) hasDifferentIntervalValues = true;
          internalValues[fieldName] = fc.value;
        });

        if (hasDifferentIntervalValues) {
          resolveMethods[typename] = internalValues;
        }
      }
    });
    return resolveMethods;
  }

}

exports.SchemaComposer = SchemaComposer;