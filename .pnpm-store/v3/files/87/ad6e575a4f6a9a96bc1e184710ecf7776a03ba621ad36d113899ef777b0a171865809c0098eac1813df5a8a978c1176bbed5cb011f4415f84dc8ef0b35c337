import v8n from 'v8n'
import { mapArrayToKeys } from '../../utils'
import { sanitize } from '../Number/number-plugin'
import { normalizeKeyedNumberSettings } from './vector-utils'
import type { InputWithSettings } from '../../types'
import type {
  VectorType,
  Format,
  InternalVectorSettings,
  VectorSettings,
  VectorTypeFromValueFormatAndKeys,
} from './vector-types'

export function getVectorSchema(dimension: number) {
  // Check if vector matches dimension and that every item is a number
  // prettier-ignore
  const isVectorArray = v8n().array().length(dimension).every.number()

  // check if vector is an object and that all its keys are finite numbers
  const isVectorObject = (o: any) => {
    if (!o || typeof o !== 'object') return false
    const values = Object.values(o)
    return values.length === dimension && values.every((v: any) => isFinite(v))
  }
  return (o: any) => {
    return isVectorArray.test(o) || isVectorObject(o)
  }
}

/**
 * Returns 'array' if value is an array, 'object' if it's an object.
 * @param value
 * @returns
 */
export function getVectorType(value: VectorType): Format {
  return Array.isArray(value) ? 'array' : 'object'
}

/**
 * Converts a value to either an object or an array.
 * @param value
 * @param format
 * @param keys
 * @returns
 */
function convert<Value extends VectorType, F extends Format, K extends string>(
  value: Value,
  format: F,
  keys: K[]
): VectorTypeFromValueFormatAndKeys<Value, F, K> {
  if (getVectorType(value) === format) return value as any
  return (format === 'array' ? Object.values(value) : mapArrayToKeys(value as number[], keys)) as any
}

/**
 * This function will check if the value argument is the full vector or only
 * a slice of it. If it's only a slice, then it will merge it with the
 * previousValue, preserving ratio if settings.lock is set.
 * @param value
 * @param settings
 * @param previousValue
 * @returns
 */
export const sanitizeVector = <K extends string, F extends Format>(
  value: VectorType<K>,
  settings: InternalVectorSettings<K, K[], F>,
  previousValue: any
): VectorType<K, F> => {
  // 1. We convert the value to a keyed object
  const _value = convert(value, 'object', settings.keys) as any
  for (let key in _value) _value[key] = sanitize(_value[key], settings[key as K])

  // 2. We extract the keys
  const _valueKeys = Object.keys(_value)
  // will be the new value
  let newValue: any = {}

  // 3.a. if _value includes all keys of the vector input then _value is
  // complete and can be considered as the new value.
  if (_valueKeys.length === settings.keys.length) newValue = _value
  // 3.b if _value is only a slice of the vector, therefore we need to merge
  // it with the previous value.
  else {
    // 3.b.i We convert the previous value to an object.
    const _previousValue = convert(previousValue, 'object', settings.keys) as any
    // 3.b.i.1 if there's only one key and lock is true we keep the aspect ratio
    // on all keys, then we keep the aspect ratio on all keys.
    if (_valueKeys.length === 1 && settings.locked) {
      // the only key from _value, which holds the base value for aspect ratio.
      const lockedKey = _valueKeys[0]
      // the base value for aspect ratio.
      const lockedCoordinate = _value[lockedKey]
      // the previous base value for aspect ratio
      const previousLockedCoordinate = _previousValue[lockedKey]
      // iterate through the previous value keys
      const ratio = previousLockedCoordinate !== 0 ? lockedCoordinate / previousLockedCoordinate : 1
      for (let key in _previousValue) {
        // if key is the lockedKey, then its new value should be the locked
        // value.
        if (key === lockedKey) newValue[lockedKey] = lockedCoordinate
        // if not then the other key should change by the same ratio as the
        // lockedValue
        else newValue[key] = _previousValue[key] * ratio
      }
    } else {
      // _value is incomplete so we merge the previous value with the new one
      newValue = { ..._previousValue, ..._value }
    }
  }
  return convert(newValue, settings.format, settings.keys) as any
}

/**
 * Formats a vector into an object to be displayed.
 * @param value
 * @param settings
 * @returns
 */
export const formatVector = <K extends string, F extends Format>(
  value: VectorType<K>,
  settings: InternalVectorSettings<K, K[], F>
) => convert(value, 'object', settings.keys)

/**
 * Checks if an object matches the format of the settings object for a number
 * input.
 * @param o
 * @returns
 */

const isNumberSettings = (o?: object) => !!o && ('step' in o || 'min' in o || 'max' in o)

/**
 * Normalizes a vector by extracting its keys and creating a number settings
 * for each of them.
 * @param _value
 * @param settings
 * @param defaultKeys
 * @returns
 */
export function normalizeVector<Value extends VectorType, K extends string>(
  value: Value,
  settings: VectorSettings<Value, K>,
  defaultKeys: K[] = []
) {
  const { lock = false, ..._settings } = settings
  const format: Format = Array.isArray(value) ? 'array' : 'object'
  const keys = format === 'object' ? Object.keys(value) : defaultKeys
  const _value = convert(value, 'object', keys)

  // vector can accept either { value: { x, y }, { x: settings, y: settings } }
  // or { value: { x, y }, { settings } } where settings will apply to both keys
  // merged settings will recognize a unified settings and dispatch it to all keys

  const mergedSettings = isNumberSettings(_settings)
    ? keys.reduce((acc, k) => Object.assign(acc, { [k]: _settings }), {})
    : _settings

  const numberSettings = normalizeKeyedNumberSettings(_value, mergedSettings)
  return {
    value: (format === 'array' ? value : _value) as Value,
    settings: { ...numberSettings, format, keys, lock, locked: false },
  }
}

export function getVectorPlugin<K extends string>(defaultKeys: K[]) {
  return {
    schema: getVectorSchema(defaultKeys.length),
    normalize: <Value extends VectorType>({ value, ...settings }: InputWithSettings<Value, VectorSettings<Value, K>>) =>
      normalizeVector(value, settings, defaultKeys),
    format: (value: any, settings: InternalVectorSettings) => formatVector(value, settings),
    sanitize: (value: any, settings: InternalVectorSettings, prevValue: any) =>
      sanitizeVector(value, settings, prevValue),
  }
}
