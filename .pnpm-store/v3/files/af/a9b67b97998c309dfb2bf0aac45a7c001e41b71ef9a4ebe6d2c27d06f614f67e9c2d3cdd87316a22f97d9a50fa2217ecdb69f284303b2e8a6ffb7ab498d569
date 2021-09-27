import { SpecialInputs } from '../types'
import type { MonitorInput, MonitorSettings } from '../types'

const defaultSettings = { graph: false, interval: 100 }

export function monitor(objectOrFn: React.MutableRefObject<any> | Function, settings?: MonitorSettings): MonitorInput {
  return { type: SpecialInputs.MONITOR, objectOrFn, settings: { ...defaultSettings, ...settings } }
}
