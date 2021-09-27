import { normalizeVector, sanitizeVector } from 'leva/plugin'
import type { InternalSpring, InternalSpringSettings, SpringInput } from './spring-types'

const defaultTensionSettings = { min: 1, step: 1 }
const defaultFrictionSettings = { min: 1, step: 0.5 }
const defaultMassSettings = { min: 0.1, step: 0.1 }
const defaultValue = { tension: 100, friction: 30, mass: 1 }

export const normalize = (input: SpringInput = {}) => {
  const { value: _value, ..._settings } = 'value' in input ? input : { value: input }
  const mergedSettings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }

  const { value, settings } = normalizeVector({ ...defaultValue, ..._value }, mergedSettings)
  return { value, settings: settings as InternalSpringSettings }
}

export const sanitize = (value: InternalSpring, settings: InternalSpringSettings, prevValue?: any) =>
  sanitizeVector(value, settings, prevValue)
