/* @flow strict */

import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { NonNullComposer } from '../NonNullComposer';
import { ListComposer } from '../ListComposer';
import { ThunkComposer } from '../ThunkComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import type { InputTypeComposer } from '../InputTypeComposer';
import {
  isSomeInputTypeComposer,
  type ComposeOutputType,
  type ComposeInputType,
  type ComposeInputTypeDefinition,
  type AnyTypeComposer,
} from './typeHelpers';
import { inspect } from './misc';
import { UnionTypeComposer } from '../UnionTypeComposer';

export type ToInputTypeOpts = {
  /** If ObjectType or Interface received then will be used `${prefix}ObjectTypeName` as name for new Input type */
  prefix?: string,
  /** If ObjectType or Interface received then will be used `ObjectTypeName${suffix}` as name for new Input type */
  postfix?: string,
  /** When Union type is met then Error will be throw. This option helps to return provided fallbackType instead of Error. */
  fallbackType?: ComposeInputTypeDefinition | null,
};

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
export function toInputType(anyTC: AnyTypeComposer<any>, opts?: ToInputTypeOpts): ComposeInputType {
  let tc: any = anyTC;

  const wrappers = [];
  while (
    tc instanceof ListComposer ||
    tc instanceof NonNullComposer ||
    tc instanceof ThunkComposer
  ) {
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
      if (opts?.fallbackType) return (opts.fallbackType: any);

      if (tc instanceof UnionTypeComposer) {
        throw new Error(
          `Cannot convert UnionTypeComposer(${tc.getTypeName()}) to Input type. Please use 'fallbackType' option for removing this error.`
        );
      } else {
        throw new Error(
          `Cannot convert '${inspect(
            tc
          )}' to InputType. Please use 'fallbackType' option for removing this error.`
        );
      }
    }
  }

  if (tc) {
    // wrap TypeComposer back
    tc = wrappers.reduce((type: any, Wrapper) => new Wrapper(type), tc);
  }

  return (tc: any);
}

/**
 * Convert ObjectTypeComposer or InterfaceTypeComposer to InputTypeComposer.
 * Also will be converted all Object types which are used for fields.
 */
export function toInputObjectType<TContext>(
  tc: ObjectTypeComposer<any, TContext> | InterfaceTypeComposer<any, TContext>,
  opts?: ToInputTypeOpts
): InputTypeComposer<TContext> {
  if (tc.hasInputTypeComposer()) {
    return tc.getInputTypeComposer();
  }

  const prefix: string = opts?.prefix || '';
  const postfix: string = opts?.postfix || 'Input';
  const inputTypeName = `${prefix}${tc.getTypeName()}${postfix}`;

  const inputTypeComposer = tc.schemaComposer.createInputTC(inputTypeName);
  tc.setInputTypeComposer(inputTypeComposer);

  const fieldNames = tc.getFieldNames();
  fieldNames.forEach((fieldName) => {
    const fc = tc.getField(fieldName);

    let fieldInputType: ?ComposeInputTypeDefinition;
    try {
      fieldInputType = toInputType(fc.type, opts);
    } catch (e) {
      if (opts?.fallbackType || opts?.fallbackType === null) {
        // Setting to null effectively skips this field
        fieldInputType = opts?.fallbackType;
      } else {
        throw new Error(
          `${
            `Can not convert field '${tc.getTypeName()}.${fieldName}' to InputType` +
            '\nIt should be ObjectType or InterfaceType, but got \n'
          }${inspect(fc.type)}`
        );
      }
    }

    if (fieldInputType) {
      inputTypeComposer.setField(
        fieldName,
        ({
          type: fieldInputType,
          description: fc.description,
        }: any)
      );
    }
  });

  return inputTypeComposer;
}

/**
 * @deprecated use `toInputType(anyTC, opts): ComposeInputType` method instead
 */
export function convertInputObjectField(
  field: ComposeOutputType<any>,
  opts: ToInputTypeOpts
  // schemaComposer: SchemaComposer<any>
): ComposeInputType {
  return toInputType(field, opts);
}
