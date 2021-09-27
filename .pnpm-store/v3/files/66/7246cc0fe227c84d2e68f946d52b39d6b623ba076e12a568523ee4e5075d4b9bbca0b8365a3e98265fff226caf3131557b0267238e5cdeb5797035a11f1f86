import v8n from 'v8n'
import { clamp } from '../../utils'
import { normalizeKeyedNumberSettings } from '../Vector/vector-utils'
import type { IntervalInput } from '../../types'
import type { InternalInterval, InternalIntervalSettings, Interval } from './interval-types'

const number = v8n().number()

export const schema = (o: any, s: any) =>
  v8n().array().length(2).every.number().test(o) && v8n().schema({ min: number, max: number }).test(s)

export const format = (v: Interval) => ({ min: v[0], max: v[1] })

export const sanitize = (
  value: InternalInterval,
  { bounds: [MIN, MAX] }: InternalIntervalSettings,
  prevValue: any
): Interval => {
  const _newValue = { min: prevValue[0], max: prevValue[1] }
  const { min, max } = { ..._newValue, ...value }
  return [clamp(Number(min), MIN, Math.max(MIN, max)), clamp(Number(max), Math.min(MAX, min), MAX)]
}

export const normalize = ({ value, min, max }: IntervalInput) => {
  const boundsSettings = { min, max }
  const _settings = normalizeKeyedNumberSettings(format(value), { min: boundsSettings, max: boundsSettings })
  const bounds: [number, number] = [min, max]
  const settings = { ..._settings, bounds }

  // sanitizing value to make sure it's withing interval bounds
  const _value = sanitize(format(value), settings, value)
  return { value: _value, settings }
}
