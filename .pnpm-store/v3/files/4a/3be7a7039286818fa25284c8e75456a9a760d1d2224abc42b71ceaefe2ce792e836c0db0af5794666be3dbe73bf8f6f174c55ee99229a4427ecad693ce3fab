import type { UseStore } from 'zustand'
import type { SpecialInput, RenderFn, FolderSettings, Plugin, OnChangeHandler } from './public'

export type State = { data: Data }

export type MappedPaths = Record<
  string,
  {
    path: string
    onChange?: OnChangeHandler
    onEditStart?: (...args: any) => void
    onEditEnd?: (...args: any) => void
    transient: boolean
  }
>

type Dispose = () => void

export type StoreType = {
  useStore: UseStore<State>
  storeId: string
  orderPaths: (paths: string[]) => string[]
  setOrderedPaths: (newPaths: string[]) => void
  disposePaths: (paths: string[]) => void
  dispose: () => void
  getVisiblePaths: () => string[]
  getFolderSettings: (path: string) => FolderSettings
  getData: () => Data
  addData: (newData: Data, override: boolean) => void
  setValueAtPath: (path: string, value: any, fromPanel: boolean) => void
  setSettingsAtPath: (path: string, settings: any) => void
  disableInputAtPath: (path: string, flag: boolean) => void
  // TODO possibly better type this
  set: (values: Record<string, any>, fromPanel: boolean) => void
  getInput: (path: string) => DataInput | undefined
  get: (path: string) => any
  getDataFromSchema: (schema: any) => [Data, MappedPaths]
  subscribeToEditStart: (path: string, listener: (value: any) => void) => Dispose
  subscribeToEditEnd: (path: string, listener: (value: any) => void) => Dispose
  emitOnEditStart: (path: string) => void
  emitOnEditEnd: (path: string) => void
}

export type CommonOptions = {
  key: string
  label: string | JSX.Element
  hint?: string
  render?: RenderFn
}

export type DataInputOptions = CommonOptions & {
  optional: boolean
  disabled: boolean
}

export type PanelInputOptions = {
  onChange?: (...args: any) => void
  onEditStart?: (...args: any) => void
  onEditEnd?: (...args: any) => void
}

export type DataInput = {
  __refCount: number
  type: string
  value: unknown
  /**
   * Whether the onChange handler invocation is caused internally via the panel or  externally via a set call.
   */
  fromPanel: boolean
  settings?: object
} & DataInputOptions

export type DataItem = DataInput | (SpecialInput & CommonOptions & { __refCount: number })

export type Data = Record<string, DataItem>

export type Tree = {
  [key: string]: { __levaInput: true; path: string } | Tree
}

/**
 * Internal plugin type including schema.
 * @internal
 */
export interface InternalPlugin<Input, Value = Input, Settings = {}, InternalSettings = {}>
  extends Plugin<Input, Value, InternalSettings> {
  schema: (value: any, settings?: Settings) => boolean
}

export type PanelSettingsType = {
  hideCopyButton: boolean
}
