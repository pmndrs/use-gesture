"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toInputType = toInputType;
exports.toInputObjectType = toInputObjectType;
exports.convertInputObjectField = convertInputObjectField;

var _ObjectTypeComposer = require("../ObjectTypeComposer");

var _NonNullComposer = require("../NonNullComposer");

var _ListComposer = require("../ListComposer");

var _ThunkComposer = require("../ThunkComposer");

var _InterfaceTypeComposer = require("../InterfaceTypeComposer");

var _typeHelpers = require("./typeHelpers");

var _misc = require("./misc");

var _UnionTypeComposer = require("../UnionTypeComposer");

/**
 * Convert any TypeComposer to InputType.
 *
 * Type may be wrapped with modifiers NonNull, List.
 *
 * Scalars and Input types returned without changes.
 *
 * ObjectTypeComposer & InterfaceTypeComposer converted to InputTypeComposer
 * under name `{ObjectTypeName}Input`. Prefix & suffix can be overridden via opts.
 *
 * UnionTypeComposer throws Error, if opts?.fallbackType is not provided.
 */
function toInputType(anyTC, opts) {
  let tc = anyTC;
  const wrappers = [];

  while (tc instanceof _ListComposer.ListComposer || tc instanceof _NonNullComposer.NonNullComposer || tc instanceof _ThunkComposer.ThunkComposer) {
    if (tc instanceof _ThunkComposer.ThunkComposer) {
      tc = tc.getUnwrappedTC();
    } else {
      wrappers.unshift(tc.constructor);
      tc = tc.ofType;
    }
  }

  if (!(0, _typeHelpers.isSomeInputTypeComposer)(tc)) {
    if (tc instanceof _ObjectTypeComposer.ObjectTypeComposer || tc instanceof _InterfaceTypeComposer.InterfaceTypeComposer) {
      tc = toInputObjectType(tc, opts);
    } else {
      if (opts !== null && opts !== void 0 && opts.fallbackType) return opts.fallbackType;

      if (tc instanceof _UnionTypeComposer.UnionTypeComposer) {
        throw new Error(`Cannot convert UnionTypeComposer(${tc.getTypeName()}) to Input type. Please use 'fallbackType' option for removing this error.`);
      } else {
        throw new Error(`Cannot convert '${(0, _misc.inspect)(tc)}' to InputType. Please use 'fallbackType' option for removing this error.`);
      }
    }
  }

  if (tc) {
    // wrap TypeComposer back
    tc = wrappers.reduce((type, Wrapper) => new Wrapper(type), tc);
  }

  return tc;
}
/**
 * Convert ObjectTypeComposer or InterfaceTypeComposer to InputTypeComposer.
 * Also will be converted all Object types which are used for fields.
 */


function toInputObjectType(tc, opts) {
  if (tc.hasInputTypeComposer()) {
    return tc.getInputTypeComposer();
  }

  const prefix = (opts === null || opts === void 0 ? void 0 : opts.prefix) || '';
  const postfix = (opts === null || opts === void 0 ? void 0 : opts.postfix) || 'Input';
  const inputTypeName = `${prefix}${tc.getTypeName()}${postfix}`;
  const inputTypeComposer = tc.schemaComposer.createInputTC(inputTypeName);
  tc.setInputTypeComposer(inputTypeComposer);
  const fieldNames = tc.getFieldNames();
  fieldNames.forEach(fieldName => {
    const fc = tc.getField(fieldName);
    let fieldInputType;

    try {
      fieldInputType = toInputType(fc.type, opts);
    } catch (e) {
      if (opts !== null && opts !== void 0 && opts.fallbackType || (opts === null || opts === void 0 ? void 0 : opts.fallbackType) === null) {
        // Setting to null effectively skips this field
        fieldInputType = opts === null || opts === void 0 ? void 0 : opts.fallbackType;
      } else {
        throw new Error(`${`Can not convert field '${tc.getTypeName()}.${fieldName}' to InputType` + '\nIt should be ObjectType or InterfaceType, but got \n'}${(0, _misc.inspect)(fc.type)}`);
      }
    }

    if (fieldInputType) {
      inputTypeComposer.setField(fieldName, {
        type: fieldInputType,
        description: fc.description
      });
    }
  });
  return inputTypeComposer;
}
/**
 * @deprecated use `toInputType(anyTC, opts): ComposeInputType` method instead
 */


function convertInputObjectField(field, opts) {
  return toInputType(field, opts);
}