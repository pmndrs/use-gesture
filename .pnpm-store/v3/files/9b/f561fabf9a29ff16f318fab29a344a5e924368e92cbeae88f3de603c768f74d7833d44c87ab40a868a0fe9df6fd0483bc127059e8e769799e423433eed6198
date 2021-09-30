import { SpecialInputs } from '../types'
import type { FolderInput, Schema, SchemaToValues, FolderSettings } from '../types'

const defaultSettings = { collapsed: false }

export function folder<S extends Schema>(schema: S, settings?: FolderSettings): FolderInput<SchemaToValues<S>> {
  return {
    type: SpecialInputs.FOLDER,
    schema,
    settings: { ...defaultSettings, ...settings },
  } as any
}
