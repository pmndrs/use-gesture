import { dequal } from 'dequal/lite'
import { getValueType, normalize, sanitize } from '../plugin'
import { CommonOptions, Data, DataInput, DataInputOptions, PanelInputOptions, SpecialInputs, StoreType } from '../types'

type ParsedOptions = {
  type?: string
  input: any
  options: CommonOptions | DataInputOptions | PanelInputOptions
}

export function parseOptions(_input: any, key: string, mergedOptions = {}, customType?: string): ParsedOptions {
  // if input isn't an object then we just need to assing default options to it.
  if (typeof _input !== 'object' || Array.isArray(_input)) {
    return {
      type: customType,
      input: _input,
      options: {
        key,
        label: key,
        optional: false,
        disabled: false,
        ...mergedOptions,
      },
    }
  }

  // if it's a custom input, then the input will be under the __customInput key
  // so we run the parseOptions function on that key and for its type.
  if ('__customInput' in _input) {
    /**
     * If a custom input uses a non object arg, the only way to parse options
     * is { ...myPlugin('value'), label: 'my label' }.
     * In that case, the input will be shaped like so:
     * { type, __customInput, label }
     */
    const { type, __customInput, ...options } = _input
    return parseOptions(__customInput, key, options, type)
  }

  // parse generic options from input object
  const {
    render,
    label,
    optional,
    disabled,
    hint,
    onChange,
    onEditStart,
    onEditEnd,
    transient,
    ...inputWithType
  } = _input
  const commonOptions = {
    render,
    key,
    label: label ?? key,
    hint,
    transient: transient ?? !!onChange,
    onEditStart,
    onEditEnd,
    ...mergedOptions,
  }

  let { type, ...input } = inputWithType
  type = customType ?? type

  if (type in SpecialInputs) {
    return { type, input, options: commonOptions }
  }

  return {
    type,
    input,
    options: {
      ...commonOptions,
      onChange,
      optional: optional ?? false,
      disabled: disabled ?? false,
    },
  }
}

/**
 * This function is used to normalize the way an input is stored in the store.
 * Returns a value in the form of { type, value, settings} by doing different
 * checks depending on the input structure.
 *
 * @param input
 * @param path
 */
export function normalizeInput(_input: any, key: string, path: string, data: Data) {
  const parsedInputAndOptions = parseOptions(_input, key)
  const { type, input: parsedInput, options } = parsedInputAndOptions
  if (type) {
    if (type in SpecialInputs)
      // If the input is a special input then we return it as it is.
      return parsedInputAndOptions

    // If the type key exists at this point, it must be a forced type or a
    // custom plugin defined by the user.
    return { type, input: normalize(type, parsedInput, path, data), options }
  }
  let inputType = getValueType(parsedInput)
  if (inputType) return { type: inputType, input: normalize(inputType, parsedInput, path, data), options }

  inputType = getValueType({ value: parsedInput })

  if (inputType) return { type: inputType, input: normalize(inputType, { value: parsedInput }, path, data), options }

  // At this point, the input is not recognized and we return false.
  return false
}

export function updateInput(input: DataInput, newValue: any, path: string, store: StoreType, fromPanel: boolean) {
  const { value, type, settings } = input
  input.value = sanitizeValue({ type, value, settings }, newValue, path, store)
  input.fromPanel = fromPanel
}

type SanitizeProps = {
  type: string
  value: any
  settings: object | undefined
}

type ValueErrorType = { type: string; message: string; previousValue: any; error?: Error }

const ValueError = (function (this: ValueErrorType, message: string, value: any, error?: Error) {
  this.type = 'LEVA_ERROR'
  this.message = 'LEVA: ' + message
  this.previousValue = value
  this.error = error
} as unknown) as { new (message: string, value: any, error?: Error): ValueErrorType }

export function sanitizeValue({ type, value, settings }: SanitizeProps, newValue: any, path: string, store: StoreType) {
  // sanitizeValue can accept a new value in the form of fn(oldValue). This
  // allows inputs to run onUpdate(oldValue => oldValue + 1). However, this
  // issue makes the case of a SELECT input with functions as options:
  // https://github.com/pmndrs/leva/issues/165
  // In that situation, functions passed as options would be ran and we don't
  // want that. So in case of the SELECT input, we never compute the functions.
  const _newValue = type !== 'SELECT' && typeof newValue === 'function' ? newValue(value) : newValue
  let sanitizedNewValue
  try {
    sanitizedNewValue = sanitize(type, _newValue, settings, value, path, store)
  } catch (e) {
    throw new ValueError(`The value \`${newValue}\` did not result in a correct value.`, value, e)
  }
  if (dequal(sanitizedNewValue, value)) {
    /**
     * @note This makes the update function throw when the new value is the same
     * as the previous one. This can happen for example, if the minimum value of
     * a number is 30, and the user inputs 15. Then the newValue will be sanitized
     * to 30 and subsequent calls like 14, 0, etc. won't result in the component displaying
     * the value to be notified (ie there wouldn't be a new render)
     */

    throw new ValueError(
      `The value \`${newValue}\` did not result in a value update, which remained the same: \`${value}\`.
        You can ignore this warning if this is the intended behavior.`,
      value
    )
  }
  return sanitizedNewValue
}
