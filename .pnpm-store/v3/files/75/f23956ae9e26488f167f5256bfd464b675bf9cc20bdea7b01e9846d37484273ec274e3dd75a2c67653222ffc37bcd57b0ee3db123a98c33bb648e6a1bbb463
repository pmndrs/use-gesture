import v8n from 'v8n'
import type { SelectInput, InternalSelectSettings } from './select-types'

// the options attribute is either an key value object or an array
export const schema = (_o: any, s: any) =>
  v8n()
    .schema({
      options: v8n().passesAnyOf(v8n().object(), v8n().array()),
    })
    .test(s)

export const sanitize = (value: any, { values }: InternalSelectSettings) => {
  if (values.indexOf(value) < 0) throw Error(`Selected value doesn't match Select options`)
  return value
}

export const format = (value: any, { values }: InternalSelectSettings) => {
  return values.indexOf(value)
}

export const normalize = (input: SelectInput) => {
  let { value, options } = input
  let keys
  let values

  if (Array.isArray(options)) {
    values = options
    keys = options.map((o) => String(o))
  } else {
    values = Object.values(options)
    keys = Object.keys(options)
  }

  if (!('value' in input)) value = values[0]
  else if (!values.includes(value)) {
    keys.unshift(String(value))
    values.unshift(value)
  }

  if (!Object.values(options).includes(value)) (options as any)[String(value)] = value
  return { value, settings: { keys, values } }
}
