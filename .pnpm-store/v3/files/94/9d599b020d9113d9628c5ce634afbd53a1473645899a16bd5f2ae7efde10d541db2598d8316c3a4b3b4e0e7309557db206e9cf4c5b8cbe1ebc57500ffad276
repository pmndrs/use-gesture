import type { NumberSettings, GetKeys } from '../../types'
import type { InternalNumberSettings } from '../Number/number-types'

/**
 * A vector can either be number[] or Record<string, number>.
 */
export type Format = 'array' | 'object'

/**
 * Converts a Vector into the format provided as a generic.
 */
export type VectorType<K extends string = string, F extends Format = Format> = F extends 'object'
  ? { [key in K]: number }
  : number[]

/**
 * Converts a Value to a Vector Type matching the Format Generic:
 * - If Format is 'array', then it returns the type number[]
 * - If Format is 'object':
 *   - if Value is a number[], it uses the DefaultKeys to build a
 *     {[K in DefaultKeys]: number} type.
 *   - if Value is a Record<string, key> it returns Value
 */
export type VectorTypeFromValueFormatAndKeys<
  Value extends VectorType,
  F extends Format,
  DefaultKeys extends string
> = VectorType<GetKeys<Value> extends never ? DefaultKeys : GetKeys<Value>, F>

/**
 * Forms Settings type. If Value is provided as an array, then it forms the
 * settings type based on the DefaultKeys. If Value is provided as on object,
 * it extract the keys from Value and forms the Settings from the Value keys.
 */
export type VectorSettingsFromValueAndKeys<
  Value extends VectorType,
  DefaultKeys extends string
> = GetKeys<Value> extends never
  ? DefaultKeys extends never
    ? never
    : { [key in DefaultKeys]: NumberSettings }
  : { [key in GetKeys<Value>]: NumberSettings }

/**
 * VectorSettings are either NumberSettings that apply to all keys, or object
 * matching the Value keys or DefaultKeys if Value is provided as an array.
 */
export type VectorSettings<Value extends VectorType, DefaultKeys extends string> = (
  | NumberSettings
  | VectorSettingsFromValueAndKeys<Value, DefaultKeys>
) & {
  lock?: boolean
}

export type InternalVectorSettings<K extends string = string, Keys extends K[] = K[], F extends Format = Format> = {
  [key in K]: InternalNumberSettings
} & { keys: Keys; format: F; lock: boolean; locked: boolean }

export type CoordinateProps<T extends Record<string, number>> = {
  id?: string
  innerLabelTrim?: number
  value: T
  settings: InternalNumberSettings
  valueKey: keyof T
  onUpdate: (value: any) => void
}

export type VectorProps<T extends Record<string, number>> = {
  value: T
  settings: { [key in keyof T]: InternalNumberSettings } & { lock?: boolean; locked?: boolean }
  onUpdate: (value: T) => void
  innerLabelTrim?: number
}
