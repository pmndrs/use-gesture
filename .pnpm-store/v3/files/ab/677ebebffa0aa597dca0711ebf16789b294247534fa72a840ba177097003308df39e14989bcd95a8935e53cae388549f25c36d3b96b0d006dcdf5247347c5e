import { InputTypeComposer } from '../InputTypeComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { SchemaComposer } from '../SchemaComposer';
import { AnyTypeComposer, ComposeOutputType, ComposeInputType } from './typeHelpers';

export interface ToInputTypeOpts {
  /** If ObjectType or Interface received then will be used `${prefix}ObjectTypeName` as name for new Input type */
  prefix?: string;
  /** If ObjectType or Interface received then will be used `ObjectTypeName${suffix}` as name for new Input type */
  postfix?: string;
  /** When Union type is met then Error will be throw. This option helps to return provided fallbackType instead of Error. */
  fallbackType?: ComposeInputType | null;
}

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
export function toInputType(anyTC: AnyTypeComposer<any>, opts?: ToInputTypeOpts): ComposeInputType;

/**
 * Convert ObjectTypeComposer or InterfaceTypeComposer to InputTypeComposer.
 * Also will be converted all Object types which are used for fields.
 */
export function toInputObjectType<TContext>(
  tc: ObjectTypeComposer<any, TContext> | InterfaceTypeComposer<any, TContext>,
  opts?: ToInputTypeOpts
): InputTypeComposer<TContext>;

export function convertInputObjectField(
  field: ComposeOutputType<any>,
  opts: ToInputTypeOpts
): ComposeInputType | null;
