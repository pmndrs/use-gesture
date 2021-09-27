import v8n from 'v8n'
import { Colord, colord, extend, getFormat } from 'colord'
import namesPlugin from 'colord/plugins/names'
import { omit } from '../../utils'
import type { InternalColorSettings, Format, ColorInput } from './color-types'

extend([namesPlugin])

const convertMap = {
  rgb: 'toRgb',
  hsl: 'toHsl',
  hsv: 'toHsv',
  hex: 'toHex',
}

v8n.extend({
  color: () => (value: any) => colord(value).isValid(),
})
// prettier-ignore
// @ts-expect-error
export const schema = (o: any) => v8n().color().test(o)

function convert(color: Colord, { format, hasAlpha, isString }: InternalColorSettings) {
  const convertFn = convertMap[format] + (isString && format !== 'hex' ? 'String' : '')
  // @ts-ignore
  const result = color[convertFn]()
  return typeof result === 'object' && !hasAlpha ? omit(result, ['a']) : result
}

export const sanitize = (v: any, settings: InternalColorSettings) => {
  const color = colord(v)
  if (!color.isValid()) throw Error('Invalid color')
  return convert(color, settings)
}

export const format = (v: any, settings: InternalColorSettings) => {
  return convert(colord(v), { ...settings, isString: true, format: 'hex' })
}

export const normalize = ({ value }: ColorInput) => {
  const _f = getFormat(value)
  const format = (_f === 'name' ? 'hex' : _f) as Format
  const hasAlpha =
    typeof value === 'object'
      ? 'a' in value
      : (_f === 'hex' && value.length === 8) || /^(rgba)|(hsla)|(hsva)/.test(value)

  const settings = { format, hasAlpha, isString: typeof value === 'string' }

  // by santizing the value we make sure the returned value is parsed and fixed,
  // consistent with future updates.
  return { value: sanitize(value, settings), settings }
}
