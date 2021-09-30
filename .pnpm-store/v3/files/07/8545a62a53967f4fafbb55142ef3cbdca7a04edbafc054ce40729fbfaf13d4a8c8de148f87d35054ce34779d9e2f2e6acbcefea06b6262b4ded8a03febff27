function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
// This is internal methods of graphql-js (introduced in 14.0.0)
// required for correct config conversion to internal field definition of types
// copy pasted from https://github.com/graphql/graphql-js/blame/master/src/type/definition.js
import invariant from 'graphql/jsutils/invariant';
import { inspect } from './misc';
import { isFunction, isObject } from './is';
import { SchemaComposer } from '../SchemaComposer';
import { ThunkComposer } from '../ThunkComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { getComposeTypeName } from './typeHelpers';

function isPlainObj(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function defineFieldMap(config, fieldMap, parentAstNode) {
  invariant(isPlainObj(fieldMap), `${config.name} fields must be an object with field names as keys or a ` + 'function which returns such an object.'); // Perf: prepare AST node maps to avoid costly lookups

  const fieldAstNodeMap = Object.create(null);
  const argAstNodeMap = Object.create(null);

  for (const fieldNode of (_parentAstNode$fields = parentAstNode === null || parentAstNode === void 0 ? void 0 : parentAstNode.fields) !== null && _parentAstNode$fields !== void 0 ? _parentAstNode$fields : []) {
    var _parentAstNode$fields;

    if (!fieldAstNodeMap[fieldNode.name.value]) {
      fieldAstNodeMap[fieldNode.name.value] = fieldNode;
      argAstNodeMap[fieldNode.name.value] = Object.create(null);
    }

    for (const argAstNode of (_fieldNode$arguments = fieldNode === null || fieldNode === void 0 ? void 0 : fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : []) {
      var _fieldNode$arguments;

      if (!argAstNodeMap[fieldNode.name.value][argAstNode.name.value]) {
        argAstNodeMap[fieldNode.name.value][argAstNode.name.value] = argAstNode;
      }
    }
  }

  const resultFieldMap = Object.create(null);

  for (const fieldName of Object.keys(fieldMap)) {
    const fieldConfig = fieldMap[fieldName]; // $FlowFixMe

    const fieldNodeAst = fieldAstNodeMap[fieldName];
    invariant(isPlainObj(fieldConfig), `${config.name}.${fieldName} field config must be an object`);

    const field = _objectSpread(_objectSpread({}, fieldConfig), {}, {
      isDeprecated: Boolean(fieldConfig.deprecationReason),
      name: fieldName,
      astNode: fieldNodeAst
    });

    invariant(field.resolve == null || typeof field.resolve === 'function', `${config.name}.${fieldName} field resolver must be a function if ` + `provided, but got: ${inspect(field.resolve)}.`);
    const argsConfig = fieldConfig.args;

    if (!argsConfig) {
      field.args = [];
    } else {
      var _argAstNodeMap$fieldN;

      invariant(isPlainObj(argsConfig), `${config.name}.${fieldName} args must be an object with argument names as keys.`);
      const fieldArgNodeMap = (_argAstNodeMap$fieldN = argAstNodeMap[fieldName]) !== null && _argAstNodeMap$fieldN !== void 0 ? _argAstNodeMap$fieldN : {};
      field.args = Object.keys(argsConfig).map(argName => {
        const arg = argsConfig[argName];
        return {
          name: argName,
          description: arg.description === undefined ? null : arg.description,
          type: arg.type,
          defaultValue: arg.defaultValue,
          astNode: fieldArgNodeMap[argName]
        };
      });
    }

    resultFieldMap[fieldName] = field;
  }

  return resultFieldMap;
}
export function convertObjectFieldMapToConfig(fieldMap, schemaComposer) {
  const fields = {};
  const isThunk = isFunction(fieldMap);

  const _fields = isThunk ? fieldMap(schemaComposer) : fieldMap;

  if (!isObject(_fields)) return {};
  Object.keys(_fields).forEach(n => {
    var _fc$astNode;

    const _fields$n = _fields[n],
          {
      name,
      isDeprecated
    } = _fields$n,
          fc = _objectWithoutProperties(_fields$n, ["name", "isDeprecated"]);

    const args = {};

    if (Array.isArray(fc.args)) {
      // `fc.args` is an Array in `GraphQLFieldMap`
      fc.args.forEach(arg => {
        var _ac$astNode;

        const {
          name: argName
        } = arg,
              ac = _objectWithoutProperties(arg, ["name"]);

        args[argName] = _objectSpread(_objectSpread({}, ac), {}, {
          type: isThunk ? new ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(ac.type || arg)) : schemaComposer.typeMapper.convertInputTypeDefinition(ac.type || arg)
        });

        if (ac !== null && ac !== void 0 && (_ac$astNode = ac.astNode) !== null && _ac$astNode !== void 0 && _ac$astNode.directives) {
          const directives = schemaComposer.typeMapper.parseDirectives(ac.astNode.directives);

          if (directives) {
            if (!args[argName].extensions) args[argName].extensions = {};
            args[argName].extensions.directives = directives;
          }
        }
      });
      fc.args = args;
    } else if (isObject(fc.args)) {
      // `fc.args` is Object in `ObjectTypeComposerFieldConfigMapDefinition`
      Object.keys(fc.args).forEach(argName => {
        const sourceArgs = fc.args;
        args[argName] = _objectSpread(_objectSpread({}, isObject(sourceArgs[argName]) ? sourceArgs[argName] : null), {}, {
          type: isThunk ? new ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(sourceArgs[argName].type || sourceArgs[argName])) : schemaComposer.typeMapper.convertInputTypeDefinition(sourceArgs[argName].type || sourceArgs[argName])
        });
      });
      fc.args = args;
    }

    fields[n] = _objectSpread(_objectSpread({}, fc), {}, {
      type: isThunk ? new ThunkComposer(() => schemaComposer.typeMapper.convertOutputTypeDefinition(fc.type || _fields[n])) : schemaComposer.typeMapper.convertOutputTypeDefinition(fc.type || _fields[n])
    });

    if (fc !== null && fc !== void 0 && (_fc$astNode = fc.astNode) !== null && _fc$astNode !== void 0 && _fc$astNode.directives) {
      const directives = schemaComposer.typeMapper.parseDirectives(fc.astNode.directives);

      if (directives) {
        if (!fields[n].extensions) fields[n].extensions = {};
        fields[n].extensions.directives = directives;
      }
    }
  });
  return fields;
}
export function defineEnumValues(type, valueMap,
/* <T> */
parentAstNode) {
  invariant(isPlainObj(valueMap), `${type.name} values must be an object with value names as keys.`);
  const astNodeMap = Object.create(null);

  for (const valueNode of (_parentAstNode$values = parentAstNode === null || parentAstNode === void 0 ? void 0 : parentAstNode.values) !== null && _parentAstNode$values !== void 0 ? _parentAstNode$values : []) {
    var _parentAstNode$values;

    astNodeMap[valueNode.name.value] = valueNode;
  }

  return Object.keys(valueMap).map(valueName => {
    const value = valueMap[valueName];
    invariant(isPlainObj(value), `${type.name}.${valueName} must refer to an object with a "value" key ` + `representing an internal value but got: ${inspect(value)}.`);
    invariant(!value.hasOwnProperty('isDeprecated'), `${type.name}.${valueName} should provide "deprecationReason" instead of "isDeprecated".`);
    return {
      name: valueName,
      description: value.description,
      isDeprecated: Boolean(value.deprecationReason),
      deprecationReason: value.deprecationReason,
      astNode: astNodeMap[valueName],
      value: value.hasOwnProperty('value') ? value.value : valueName,
      extensions: undefined
    };
  });
}
export function convertEnumValuesToConfig(values, schemaComposer) {
  const fields = {};
  values.forEach((_ref) => {
    var _fc$astNode2;

    let {
      name,
      isDeprecated
    } = _ref,
        fc = _objectWithoutProperties(_ref, ["name", "isDeprecated"]);

    fields[name] = fc;

    if (fc !== null && fc !== void 0 && (_fc$astNode2 = fc.astNode) !== null && _fc$astNode2 !== void 0 && _fc$astNode2.directives) {
      const directives = schemaComposer.typeMapper.parseDirectives(fc.astNode.directives);

      if (directives) {
        if (!fields[name].extensions) fields[name].extensions = {};
        fields[name].extensions.directives = directives;
      }
    }
  });
  return fields;
}
export function defineInputFieldMap(config, fieldMap, parentAstNode) {
  invariant(isPlainObj(fieldMap), `${config.name} fields must be an object with field names as keys or a ` + 'function which returns such an object.');
  const astNodeMap = Object.create(null);

  for (const fieldNode of (_parentAstNode$fields2 = parentAstNode === null || parentAstNode === void 0 ? void 0 : parentAstNode.fields) !== null && _parentAstNode$fields2 !== void 0 ? _parentAstNode$fields2 : []) {
    var _parentAstNode$fields2;

    astNodeMap[fieldNode.name.value] = fieldNode;
  }

  const resultFieldMap = Object.create(null);

  for (const fieldName of Object.keys(fieldMap)) {
    const field = _objectSpread(_objectSpread({}, fieldMap[fieldName]), {}, {
      name: fieldName,
      astNode: astNodeMap[fieldName]
    });

    invariant(!field.hasOwnProperty('resolve'), `${config.name}.${fieldName} field has a resolve property, but ` + 'Input Types cannot define resolvers.');
    resultFieldMap[fieldName] = field;
  }

  return resultFieldMap;
}
export function convertInputFieldMapToConfig(fieldMap, schemaComposer) {
  const fields = {};
  const isThunk = isFunction(fieldMap);

  const _fields = isThunk ? fieldMap(schemaComposer) : fieldMap;

  Object.keys(_fields).forEach(n => {
    var _fc$astNode3;

    const _fields$n2 = _fields[n],
          {
      name,
      isDeprecated
    } = _fields$n2,
          fc = _objectWithoutProperties(_fields$n2, ["name", "isDeprecated"]);

    fields[n] = _objectSpread(_objectSpread({}, fc), {}, {
      type: isThunk ? new ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(fc.type || _fields[n])) : schemaComposer.typeMapper.convertInputTypeDefinition(fc.type || _fields[n])
    });

    if (fc !== null && fc !== void 0 && (_fc$astNode3 = fc.astNode) !== null && _fc$astNode3 !== void 0 && _fc$astNode3.directives) {
      const directives = schemaComposer.typeMapper.parseDirectives(fc.astNode.directives);

      if (directives) {
        if (!fields[n].extensions) fields[n].extensions = {};
        fields[n].extensions.directives = directives;
      }
    }
  });
  return fields;
}
export function convertObjectTypeArrayAsThunk(types, sc) {
  const isThunk = isFunction(types);
  const t = isThunk ? types(sc) : types;
  if (!Array.isArray(t)) return [];
  return t.map(type => {
    if (type instanceof ObjectTypeComposer || type instanceof ThunkComposer) {
      return type;
    }

    const tc = sc.typeMapper.convertOutputTypeDefinition(type);

    if (!tc && isThunk) {
      return new ThunkComposer(() => sc.typeMapper.convertOutputTypeDefinition(type), getComposeTypeName(type, sc));
    }

    if (!(tc instanceof ObjectTypeComposer) && !(tc instanceof ThunkComposer)) {
      throw new Error(`Should be provided ObjectType but received ${inspect(type)}`);
    }

    return tc;
  });
}
export function convertInterfaceArrayAsThunk(types, sc) {
  const isThunk = isFunction(types);
  const t = isThunk ? types(sc) : types;
  if (!Array.isArray(t)) return [];
  return t.map(type => {
    if (type instanceof InterfaceTypeComposer || type instanceof ThunkComposer) {
      return type;
    }

    return isThunk ? new ThunkComposer(() => sc.typeMapper.convertInterfaceTypeDefinition(type), getComposeTypeName(type, sc)) : sc.typeMapper.convertInterfaceTypeDefinition(type);
  });
}