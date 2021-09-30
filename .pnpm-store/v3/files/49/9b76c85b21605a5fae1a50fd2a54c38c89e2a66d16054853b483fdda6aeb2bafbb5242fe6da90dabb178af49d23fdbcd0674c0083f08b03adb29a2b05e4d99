import { warn, LevaErrors } from './utils/log'
import type {
  Plugin,
  CustomInput,
  InputWithSettings,
  InternalPlugin,
  StoreType,
  Data,
  LevaInputs,
  InputOptions,
} from './types'

const Schemas: ((v: any, settings?: any) => false | string)[] = []

export const Plugins: Record<string, Plugin<any, any, any>> = {}

export function getValueType({ value, ...settings }: any) {
  for (let checker of Schemas) {
    const type = checker(value, settings)
    if (type) return type
  }
  return undefined
}

/**
 * Populates Schemas and Plugins singletons that are used globally.
 *
 * @param type
 * @param plugin
 */
export function register<Input, Value, InternalSettings, Settings>(
  type: LevaInputs,
  { schema, ...plugin }: InternalPlugin<Input, Value, Settings, InternalSettings>
) {
  if (type in Plugins) {
    warn(LevaErrors.ALREADY_REGISTERED_TYPE, type)
    return
  }
  Schemas.push((value: any, settings?: any) => schema(value, settings) && type)
  Plugins[type] = plugin
}

const getUniqueType = () => '__CUSTOM__PLUGIN__' + Math.random().toString(36).substr(2, 9)

/**
 * helper function for types
 * @param plugin
 */
export function createInternalPlugin<Input, Value, InternalSettings, Settings>(
  plugin: InternalPlugin<Input, Value, InternalSettings, Settings>
) {
  return plugin
}

type PluginInput<Input> = Input extends object ? Input & InputOptions : Input

/**
 * This function should be used by custom plugins. It is mostly used as a way
 * to properly type the input return value.
 *
 * @param plugin
 */
export function createPlugin<Input, Value, InternalSettings>(plugin: Plugin<Input, Value, InternalSettings>) {
  const type = getUniqueType()
  Plugins[type] = plugin
  return (input?: PluginInput<Input>) => {
    return ({ type, __customInput: input } as unknown) as CustomInput<Value>
  }
}

export function normalize<V, Settings extends object = {}>(
  type: string,
  input: InputWithSettings<V, Settings>,
  path: string,
  data: Data
) {
  const { normalize: _normalize } = Plugins[type]
  if (_normalize) return _normalize(input, path, data)

  if (typeof input !== 'object' || !('value' in input)) return { value: input }

  const { value, ...settings } = input
  return { value, settings }
}

export function sanitize<Settings extends object | undefined>(
  type: string,
  value: any,
  settings: Settings,
  prevValue: any,
  path: string,
  store: StoreType
) {
  const { sanitize } = Plugins[type]
  if (sanitize) return sanitize(value, settings, prevValue, path, store)
  return value
}

export function format<Settings extends object>(type: string, value: any, settings?: Settings) {
  const { format } = Plugins[type]
  if (format) return format(value, settings)
  return value
}
