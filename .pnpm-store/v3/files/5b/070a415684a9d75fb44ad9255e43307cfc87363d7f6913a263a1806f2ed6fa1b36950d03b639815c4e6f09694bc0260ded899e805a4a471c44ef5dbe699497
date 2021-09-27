import { normalize } from '../Number/number-plugin'
import type { NumberSettings } from '../../types'
import type { InternalNumberSettings } from '../Number/number-types'

export const normalizeKeyedNumberSettings = <V extends Record<string, number>>(
  value: V,
  settings: { [key in keyof V]?: NumberSettings }
) => {
  const _settings = {} as { [key in keyof V]: InternalNumberSettings }

  let maxStep = 0
  let minPad = Infinity
  Object.entries(value).forEach(([key, v]: [keyof V, any]) => {
    _settings[key] = normalize({ value: v, ...settings[key] }).settings
    maxStep = Math.max(maxStep, _settings[key].step)
    minPad = Math.min(minPad, _settings[key].pad)
  })

  // makes sure we get a consistent step and pad on all vector components when
  // step is not specified in settings.
  for (let key in _settings) {
    const { step, min, max } = (settings[key] as any) || {}
    if (!isFinite(step) && (!isFinite(min) || !isFinite(max))) {
      _settings[key].step = maxStep
      _settings[key].pad = minPad
    }
  }

  return _settings
}
