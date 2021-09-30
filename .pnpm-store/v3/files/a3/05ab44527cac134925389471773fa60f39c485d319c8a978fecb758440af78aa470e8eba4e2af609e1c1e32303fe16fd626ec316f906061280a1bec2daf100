function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
// import invariant from 'graphql/jsutils/invariant';
import { GraphQLUnionType, GraphQLObjectType } from './graphql';
import { isObject, isString, isFunction } from './utils/is';
import { inspect } from './utils/misc';
import { ObjectTypeComposer } from './ObjectTypeComposer';
import { SchemaComposer } from './SchemaComposer';
import { ListComposer } from './ListComposer';
import { NonNullComposer } from './NonNullComposer';
import { ThunkComposer } from './ThunkComposer';
import { convertObjectTypeArrayAsThunk } from './utils/configToDefine';
import { getGraphQLType, getComposeTypeName, unwrapOutputTC, isTypeNameString, cloneTypeTo } from './utils/typeHelpers';
import { graphqlVersion } from './utils/graphqlVersion';
import { printUnion } from './utils/schemaPrinter';
import { getUnionTypeDefinitionNode } from './utils/definitionNode';
export class UnionTypeComposer {
  // Also supported `GraphQLUnionType` but in such case FlowType force developers
  // to explicitly write annotations in their code. But it's bad.
  static create(typeDef, schemaComposer) {
    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `UnionTypeComposer.create(typeDef, schemaComposer)`');
    }

    if (schemaComposer.hasInstance(typeDef, UnionTypeComposer)) {
      return schemaComposer.getUTC(typeDef);
    }

    const utc = this.createTemp(typeDef, schemaComposer);
    schemaComposer.add(utc);
    return utc;
  }

  static createTemp(typeDef, schemaComposer) {
    const sc = schemaComposer || new SchemaComposer();
    let UTC;

    if (isString(typeDef)) {
      const typeName = typeDef;

      if (isTypeNameString(typeName)) {
        UTC = new UnionTypeComposer(new GraphQLUnionType({
          name: typeName,
          types: () => []
        }), sc);
      } else {
        UTC = sc.typeMapper.convertSDLTypeDefinition(typeName);

        if (!(UTC instanceof UnionTypeComposer)) {
          throw new Error('You should provide correct GraphQLUnionType type definition. ' + 'Eg. `union MyType = Photo | Person`');
        }
      }
    } else if (typeDef instanceof GraphQLUnionType) {
      UTC = new UnionTypeComposer(typeDef, sc);
    } else if (isObject(typeDef)) {
      const type = new GraphQLUnionType(_objectSpread(_objectSpread({}, typeDef), {}, {
        types: () => []
      }));
      UTC = new UnionTypeComposer(type, sc);
      const types = typeDef.types;
      if (Array.isArray(types)) UTC.setTypes(types);else if (isFunction(types)) {
        // rewrap interfaces `() => [i1, i2]` -> `[()=>i1, ()=>i2]`
        // helps to solve hoisting problems
        UTC.setTypes(convertObjectTypeArrayAsThunk(types, sc));
      }
      UTC._gqcExtensions = typeDef.extensions || {};
    } else {
      throw new Error(`You should provide GraphQLUnionTypeConfig or string with union name or SDL definition. Provided:\n${inspect(typeDef)}`);
    }

    return UTC;
  }

  constructor(graphqlType, schemaComposer) {
    var _graphqlType$astNode;

    _defineProperty(this, "_gqcFallbackResolveType", null);

    if (!(schemaComposer instanceof SchemaComposer)) {
      throw new Error('You must provide SchemaComposer instance as a second argument for `new UnionTypeComposer(GraphQLUnionType, SchemaComposer)`');
    }

    if (!(graphqlType instanceof GraphQLUnionType)) {
      throw new Error('UnionTypeComposer accept only GraphQLUnionType in constructor. Try to use more flexible method `UnionTypeComposer.create()`.');
    }

    this.schemaComposer = schemaComposer;
    this._gqType = graphqlType; // add itself to TypeStorage on create
    // it avoids recursive type use errors

    this.schemaComposer.set(graphqlType, this);
    this.schemaComposer.set(graphqlType.name, this);
    let types = [];

    if (graphqlVersion >= 14) {
      types = this._gqType._types;
    } else {
      types = this._gqType._types || this._gqType._typeConfig.types;
    }

    types = convertObjectTypeArrayAsThunk(types, this.schemaComposer);
    this._gqcTypes = new Set();
    types.forEach(type => {
      this._gqcTypes.add(type);
    });

    if (!this._gqcTypeResolvers) {
      this._gqcTypeResolvers = new Map();
    }

    if (graphqlType !== null && graphqlType !== void 0 && (_graphqlType$astNode = graphqlType.astNode) !== null && _graphqlType$astNode !== void 0 && _graphqlType$astNode.directives) {
      var _graphqlType$astNode2;

      this.setExtension('directives', this.schemaComposer.typeMapper.parseDirectives(graphqlType === null || graphqlType === void 0 ? void 0 : (_graphqlType$astNode2 = graphqlType.astNode) === null || _graphqlType$astNode2 === void 0 ? void 0 : _graphqlType$astNode2.directives));
    } // alive proper Flow type casting in autosuggestions for class with Generics

    /* :: return this; */

  } // -----------------------------------------------
  // Union Types methods
  // -----------------------------------------------


  hasType(name) {
    const typeName = getComposeTypeName(name, this.schemaComposer);

    for (const type of this._gqcTypes) {
      if (type.getTypeName() === typeName) {
        return true;
      }
    }

    return false;
  }

  getTypes() {
    return Array.from(this._gqcTypes.values());
  }

  getTypeComposers() {
    return this.getTypes().map(t => unwrapOutputTC(t));
  }

  getTypeNames() {
    return this.getTypes().map(t => t.getTypeName());
  }

  clearTypes() {
    this._gqcTypes.clear();

    return this;
  }

  setTypes(types) {
    const tcs = convertObjectTypeArrayAsThunk(types, this.schemaComposer);
    this._gqcTypes = new Set(tcs);
    return this;
  }

  addType(type) {
    const tc = this._convertObjectType(type); // firstly remove type by name, cause Union may contain another thunk with the same name


    this.removeType(tc.getTypeName());

    this._gqcTypes.add(tc);

    return this;
  }

  addTypes(types) {
    if (!Array.isArray(types)) {
      throw new Error(`UnionTypeComposer[${this.getTypeName()}].addType() accepts only array`);
    }

    types.forEach(type => this.addType(type));
    return this;
  }

  removeType(nameOrArray) {
    const typeNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];
    typeNames.forEach(typeName => {
      for (const type of this._gqcTypes) {
        if (type.getTypeName() === typeName) {
          this._gqcTypes.delete(type);
        }
      }
    });
    return this;
  }

  removeOtherTypes(nameOrArray) {
    const keepTypeNames = Array.isArray(nameOrArray) ? nameOrArray : [nameOrArray];

    for (const type of this._gqcTypes) {
      if (keepTypeNames.indexOf(type.getTypeName()) === -1) {
        this._gqcTypes.delete(type);
      }
    }

    return this;
  } // -----------------------------------------------
  // Type methods
  // -----------------------------------------------


  getType() {
    this._gqType.astNode = getUnionTypeDefinitionNode(this);

    const prepareTypes = () => {
      try {
        return this.getTypes().map(tc => tc.getType());
      } catch (e) {
        e.message = `UnionError[${this.getTypeName()}]: ${e.message}`;
        throw e;
      }
    };

    if (graphqlVersion >= 14) {
      this._gqType._types = prepareTypes;
    } else {
      this._gqType._types = null;
      this._gqType._typeConfig.types = prepareTypes;
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
   *   const UserTC = schemaComposer.createUnionTC(`union User = Admin | Client`);
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
   *   const UserTC = schemaComposer.createUnionTC(`union User = Admin | Client`);
   *   schemaComposer.Query.addFields({
   *     users1: { type: UserTC.List }, // in SDL: users1: [User]
   *     users2: { type: UserTC.NonNull.List }, // in SDL: users2: [User!]
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
      throw new Error('You should provide newTypeName:string for UnionTypeComposer.clone()');
    }

    const cloned = newTypeNameOrTC instanceof UnionTypeComposer ? newTypeNameOrTC : UnionTypeComposer.create(newTypeNameOrTC, this.schemaComposer);
    cloned._gqcExtensions = _objectSpread({}, this._gqcExtensions);
    cloned._gqcTypes = new Set(this._gqcTypes);
    cloned._gqcTypeResolvers = new Map(this._gqcTypeResolvers);
    cloned._gqcFallbackResolveType = this._gqcFallbackResolveType;
    cloned.setDescription(this.getDescription());
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

    if (cloneMap.has(this)) return this;
    const cloned = UnionTypeComposer.create(this.getTypeName(), anotherSchemaComposer);
    cloneMap.set(this, cloned);
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
    } // this._gqcTypeMap


    const types = this.getTypes();

    if (types.length > 0) {
      cloned.setTypes(types.map(tc => cloneTypeTo(tc, anotherSchemaComposer, cloneMap)));
    }

    return cloned;
  }

  merge(type) {
    let tc;

    if (type instanceof GraphQLUnionType) {
      tc = UnionTypeComposer.createTemp(type, this.schemaComposer);
    } else if (type instanceof UnionTypeComposer) {
      tc = type;
    } else {
      throw new Error(`Cannot merge ${inspect(type)} with UnionType(${this.getTypeName()}). Provided type should be GraphQLUnionType or UnionTypeComposer.`);
    } // set types as SDL string, it automatically will be remapped to the correct type instance in the current schema


    this.addTypes(tc.getTypes().map(t => t.getTypeName()));
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

    const tc = this._convertObjectType(type);

    return typeResolversMap.has(tc);
  }

  getTypeResolvers() {
    return this._gqcTypeResolvers;
  }

  getTypeResolverCheckFn(type) {
    const typeResolversMap = this.getTypeResolvers();

    const tc = this._convertObjectType(type);

    if (!typeResolversMap.has(tc)) {
      throw new Error(`Type resolve function in union '${this.getTypeName()}' is not defined for type ${inspect(type)}.`);
    }

    return typeResolversMap.get(tc);
  }

  getTypeResolverNames() {
    const typeResolversMap = this.getTypeResolvers();
    const names = [];
    typeResolversMap.forEach((resolveFn, tc) => {
      names.push(tc.getTypeName());
    });
    return names;
  }

  getTypeResolverTypes() {
    const typeResolversMap = this.getTypeResolvers();
    return Array.from(typeResolversMap.keys());
  }

  setTypeResolvers(typeResolversMap) {
    this._gqcTypeResolvers = this._convertTypeResolvers(typeResolversMap);

    this._initResolveTypeFn();

    return this;
  }

  _initResolveTypeFn() {
    const fallbackType = this._gqcFallbackResolveType ? getGraphQLType(this._gqcFallbackResolveType) : null; // extract GraphQLObjectType from ObjectTypeComposer

    const fastEntries = [];

    for (const [composeType, checkFn] of this._gqcTypeResolvers.entries()) {
      fastEntries.push([getGraphQLType(composeType), checkFn]);
      this.addType(composeType);
    }

    let resolveType;

    const isAsyncRuntime = this._isTypeResolversAsync(this._gqcTypeResolvers);

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

  _convertObjectType(type) {
    const tc = this.schemaComposer.typeMapper.convertOutputTypeDefinition(type);

    if (tc instanceof ObjectTypeComposer || tc instanceof ThunkComposer) {
      return tc;
    }

    throw new Error(`Should be provided ObjectType but received ${inspect(type)}`);
  }

  _convertTypeResolvers(typeResolversMap) {
    if (!(typeResolversMap instanceof Map)) {
      throw new Error(`For union ${this.getTypeName()} you should provide Map object for type resolvers.`);
    }

    const result = new Map();

    for (const [composeType, checkFn] of typeResolversMap.entries()) {
      // checking composeType
      try {
        result.set(this._convertObjectType(composeType), checkFn);
      } catch (e) {
        throw new Error(`For union type resolver ${this.getTypeName()} you must provide GraphQLObjectType or ObjectTypeComposer, but provided ${inspect(composeType)}`);
      } // checking checkFn


      if (!isFunction(checkFn)) {
        throw new Error(`Union ${this.getTypeName()} has invalid check function for type ${inspect(composeType)}`);
      }
    }

    return result;
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

    const tc = this._convertObjectType(type);

    typeResolversMap.set(tc, checkFn);
    this.schemaComposer.addSchemaMustHaveType(tc);
    this.setTypeResolvers(typeResolversMap);
    return this;
  }

  removeTypeResolver(type) {
    const typeResolversMap = this.getTypeResolvers();

    const tc = this._convertObjectType(type);

    typeResolversMap.delete(tc);
    this.setTypeResolvers(typeResolversMap);
    return this;
  }

  setTypeResolverFallback(type) {
    if (type) {
      // ensure that interface added to ObjectType
      this.addType(type); // ensure that resolved type will be in Schema

      this.schemaComposer.addSchemaMustHaveType(type);
    }

    this._gqcFallbackResolveType = type;

    this._initResolveTypeFn();

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
  } // -----------------------------------------------
  // Misc methods
  // -----------------------------------------------
  // get(path: string | string[]): any {
  //   return typeByPath(this, path);
  // }

  /**
   * Returns all types which are used inside the current type
   */


  getNestedTCs(opts = {}, passedTypes = new Set()) {
    const exclude = Array.isArray(opts.exclude) ? opts.exclude : [];
    this.getTypeComposers().forEach(tc => {
      if (!passedTypes.has(tc) && !exclude.includes(tc.getTypeName())) {
        passedTypes.add(tc);

        if (tc instanceof ObjectTypeComposer) {
          tc.getNestedTCs(opts, passedTypes);
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
      r += printUnion(this.getType(), innerOpts);
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

    return printUnion(this.getType(), innerOpts);
  }

}