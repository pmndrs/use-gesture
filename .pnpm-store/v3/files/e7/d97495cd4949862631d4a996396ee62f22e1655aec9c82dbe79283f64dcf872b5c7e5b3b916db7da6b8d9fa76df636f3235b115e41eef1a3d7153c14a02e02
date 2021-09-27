"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineFieldMap = defineFieldMap;
exports.convertObjectFieldMapToConfig = convertObjectFieldMapToConfig;
exports.defineEnumValues = defineEnumValues;
exports.convertEnumValuesToConfig = convertEnumValuesToConfig;
exports.defineInputFieldMap = defineInputFieldMap;
exports.convertInputFieldMapToConfig = convertInputFieldMapToConfig;
exports.convertObjectTypeArrayAsThunk = convertObjectTypeArrayAsThunk;
exports.convertInterfaceArrayAsThunk = convertInterfaceArrayAsThunk;

var _invariant = _interopRequireDefault(require("graphql/jsutils/invariant"));

var _misc = require("./misc");

var _is = require("./is");

var _SchemaComposer = require("../SchemaComposer");

var _ThunkComposer = require("../ThunkComposer");

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _typeHelpers = require("./typeHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isPlainObj(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

function defineFieldMap(config, fieldMap, parentAstNode) {
  (0, _invariant.default)(isPlainObj(fieldMap), `${config.name} fields must be an object with field names as keys or a ` + 'function which returns such an object.'); // Perf: prepare AST node maps to avoid costly lookups

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
    (0, _invariant.default)(isPlainObj(fieldConfig), `${config.name}.${fieldName} field config must be an object`);

    const field = _objectSpread(_objectSpread({}, fieldConfig), {}, {
      isDeprecated: Boolean(fieldConfig.deprecationReason),
      name: fieldName,
      astNode: fieldNodeAst
    });

    (0, _invariant.default)(field.resolve == null || typeof field.resolve === 'function', `${config.name}.${fieldName} field resolver must be a function if ` + `provided, but got: ${(0, _misc.inspect)(field.resolve)}.`);
    const argsConfig = fieldConfig.args;

    if (!argsConfig) {
      field.args = [];
    } else {
      var _argAstNodeMap$fieldN;

      (0, _invariant.default)(isPlainObj(argsConfig), `${config.name}.${fieldName} args must be an object with argument names as keys.`);
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

function convertObjectFieldMapToConfig(fieldMap, schemaComposer) {
  const fields = {};
  const isThunk = (0, _is.isFunction)(fieldMap);

  const _fields = isThunk ? fieldMap(schemaComposer) : fieldMap;

  if (!(0, _is.isObject)(_fields)) return {};
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
          type: isThunk ? new _ThunkComposer.ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(ac.type || arg)) : schemaComposer.typeMapper.convertInputTypeDefinition(ac.type || arg)
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
    } else if ((0, _is.isObject)(fc.args)) {
      // `fc.args` is Object in `ObjectTypeComposerFieldConfigMapDefinition`
      Object.keys(fc.args).forEach(argName => {
        const sourceArgs = fc.args;
        args[argName] = _objectSpread(_objectSpread({}, (0, _is.isObject)(sourceArgs[argName]) ? sourceArgs[argName] : null), {}, {
          type: isThunk ? new _ThunkComposer.ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(sourceArgs[argName].type || sourceArgs[argName])) : schemaComposer.typeMapper.convertInputTypeDefinition(sourceArgs[argName].type || sourceArgs[argName])
        });
      });
      fc.args = args;
    }

    fields[n] = _objectSpread(_objectSpread({}, fc), {}, {
      type: isThunk ? new _ThunkComposer.ThunkComposer(() => schemaComposer.typeMapper.convertOutputTypeDefinition(fc.type || _fields[n])) : schemaComposer.typeMapper.convertOutputTypeDefinition(fc.type || _fields[n])
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

function defineEnumValues(type, valueMap,
/* <T> */
parentAstNode) {
  (0, _invariant.default)(isPlainObj(valueMap), `${type.name} values must be an object with value names as keys.`);
  const astNodeMap = Object.create(null);

  for (const valueNode of (_parentAstNode$values = parentAstNode === null || parentAstNode === void 0 ? void 0 : parentAstNode.values) !== null && _parentAstNode$values !== void 0 ? _parentAstNode$values : []) {
    var _parentAstNode$values;

    astNodeMap[valueNode.name.value] = valueNode;
  }

  return Object.keys(valueMap).map(valueName => {
    const value = valueMap[valueName];
    (0, _invariant.default)(isPlainObj(value), `${type.name}.${valueName} must refer to an object with a "value" key ` + `representing an internal value but got: ${(0, _misc.inspect)(value)}.`);
    (0, _invariant.default)(!value.hasOwnProperty('isDeprecated'), `${type.name}.${valueName} should provide "deprecationReason" instead of "isDeprecated".`);
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

function convertEnumValuesToConfig(values, schemaComposer) {
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

function defineInputFieldMap(config, fieldMap, parentAstNode) {
  (0, _invariant.default)(isPlainObj(fieldMap), `${config.name} fields must be an object with field names as keys or a ` + 'function which returns such an object.');
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

    (0, _invariant.default)(!field.hasOwnProperty('resolve'), `${config.name}.${fieldName} field has a resolve property, but ` + 'Input Types cannot define resolvers.');
    resultFieldMap[fieldName] = field;
  }

  return resultFieldMap;
}

function convertInputFieldMapToConfig(fieldMap, schemaComposer) {
  const fields = {};
  const isThunk = (0, _is.isFunction)(fieldMap);

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
      type: isThunk ? new _ThunkComposer.ThunkComposer(() => schemaComposer.typeMapper.convertInputTypeDefinition(fc.type || _fields[n])) : schemaComposer.typeMapper.convertInputTypeDefinition(fc.type || _fields[n])
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

function convertObjectTypeArrayAsThunk(types, sc) {
  const isThunk = (0, _is.isFunction)(types);
  const t = isThunk ? types(sc) : types;
  if (!Array.isArray(t)) return [];
  return t.map(type => {
    if (type instanceof _ObjectTypeComposer.ObjectTypeComposer || type instanceof _ThunkComposer.ThunkComposer) {
      return type;
    }

    const tc = sc.typeMapper.convertOutputTypeDefinition(type);

    if (!tc && isThunk) {
      return new _ThunkComposer.ThunkComposer(() => sc.typeMapper.convertOutputTypeDefinition(type), (0, _typeHelpers.getComposeTypeName)(type, sc));
    }

    if (!(tc instanceof _ObjectTypeComposer.ObjectTypeComposer) && !(tc instanceof _ThunkComposer.ThunkComposer)) {
      throw new Error(`Should be provided ObjectType but received ${(0, _misc.inspect)(type)}`);
    }

    return tc;
  });
}

function convertInterfaceArrayAsThunk(types, sc) {
  const isThunk = (0, _is.isFunction)(types);
  const t = isThunk ? types(sc) : types;
  if (!Array.isArray(t)) return [];
  return t.map(type => {
    if (type instanceof _InterfaceTypeComposer.InterfaceTypeComposer || type instanceof _ThunkComposer.ThunkComposer) {
      return type;
    }

    return isThunk ? new _ThunkComposer.ThunkComposer(() => sc.typeMapper.convertInterfaceTypeDefinition(type), (0, _typeHelpers.getComposeTypeName)(type, sc)) : sc.typeMapper.convertInterfaceTypeDefinition(type);
  });
}