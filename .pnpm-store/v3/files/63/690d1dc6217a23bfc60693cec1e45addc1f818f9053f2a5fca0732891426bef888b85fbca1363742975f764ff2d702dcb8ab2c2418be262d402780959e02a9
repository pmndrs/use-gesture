import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { ThunkComposer } from '../ThunkComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { isSomeInputTypeComposer } from './typeHelpers';
import { inspect } from './misc';
import { UnionTypeComposer } from '../UnionTypeComposer';

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
export function toInputType(anyTC, opts) {
  let tc = anyTC;
  const wrappers = [];

  while (tc instanceof ListComposer || tc instanceof NonNullComposer || tc instanceof ThunkComposer) {
    if (tc instanceof ThunkComposer) {
      tc = tc.getUnwrappedTC();
    } else {
      wrappers.unshift(tc.constructor);
      tc = tc.ofType;
    }
  }

  if (!isSomeInputTypeComposer(tc)) {
    if (tc instanceof ObjectTypeComposer || tc instanceof InterfaceTypeComposer) {
      tc = toInputObjectType(tc, opts);
    } else {
      if (opts !== null && opts !== void 0 && opts.fallbackType) return opts.fallbackType;

      if (tc instanceof UnionTypeComposer) {
        throw new Error(`Cannot convert UnionTypeComposer(${tc.getTypeName()}) to Input type. Please use 'fallbackType' option for removing this error.`);
      } else {
        throw new Error(`Cannot convert '${inspect(tc)}' to InputType. Please use 'fallbackType' option for removing this error.`);
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

export function toInputObjectType(tc, opts) {
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
        throw new Error(`${`Can not convert field '${tc.getTypeName()}.${fieldName}' to InputType` + '\nIt should be ObjectType or InterfaceType, but got \n'}${inspect(fc.type)}`);
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

export function convertInputObjectField(field, opts) {
  return toInputType(field, opts);
}