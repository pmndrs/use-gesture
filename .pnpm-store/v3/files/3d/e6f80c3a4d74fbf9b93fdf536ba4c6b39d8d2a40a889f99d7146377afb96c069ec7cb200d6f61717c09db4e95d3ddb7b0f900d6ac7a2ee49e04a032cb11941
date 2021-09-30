import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { levaStore } from './store'
import { folder } from './helpers'
import { useDeepMemo, useValuesForPath } from './hooks'
import { useRenderRoot } from './components/Leva'
import type { FolderSettings, Schema, SchemaToValues, StoreType, OnChangeHandler } from './types'
import shallow from 'zustand/shallow'

type HookSettings = { store?: StoreType }
type SchemaOrFn<S extends Schema = Schema> = S | (() => S)

type FunctionReturnType<S extends Schema> = [
  SchemaToValues<S>,
  (
    value: {
      [K in keyof Partial<SchemaToValues<S, true>>]: any
    }
  ) => void
]

type ReturnType<F extends SchemaOrFn> = F extends SchemaOrFn<infer S>
  ? F extends Function
    ? FunctionReturnType<S>
    : SchemaToValues<S>
  : never

type HookReturnType<F extends SchemaOrFn | string, G extends SchemaOrFn> = F extends SchemaOrFn
  ? ReturnType<F>
  : ReturnType<G>

function parseArgs(
  schemaOrFolderName: string | SchemaOrFn,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | SchemaOrFn,
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
) {
  let schema: SchemaOrFn
  let folderName: string | undefined = undefined
  let folderSettings: FolderSettings | undefined
  let hookSettings: HookSettings | undefined
  let deps: React.DependencyList | undefined

  if (typeof schemaOrFolderName === 'string') {
    folderName = schemaOrFolderName
    schema = settingsOrDepsOrSchema as SchemaOrFn
    if (Array.isArray(depsOrSettingsOrFolderSettings)) {
      deps = depsOrSettingsOrFolderSettings
    } else {
      if (depsOrSettingsOrFolderSettings) {
        if ('store' in depsOrSettingsOrFolderSettings) {
          hookSettings = depsOrSettingsOrFolderSettings as HookSettings
          deps = depsOrSettings as React.DependencyList
        } else {
          folderSettings = depsOrSettingsOrFolderSettings as FolderSettings
          if (Array.isArray(depsOrSettings)) {
            deps = depsOrSettings as React.DependencyList
          } else {
            hookSettings = depsOrSettings as HookSettings
            deps = depsOrUndefined
          }
        }
      }
    }
  } else {
    schema = schemaOrFolderName as SchemaOrFn
    if (Array.isArray(settingsOrDepsOrSchema)) {
      deps = settingsOrDepsOrSchema as React.DependencyList
    } else {
      hookSettings = settingsOrDepsOrSchema as HookSettings
      deps = depsOrSettingsOrFolderSettings as React.DependencyList
    }
  }

  return { schema, folderName, folderSettings, hookSettings, deps: deps || [] }
}

/**
 *
 * @param schemaOrFolderName
 * @param settingsOrDepsOrSchema
 * @param folderSettingsOrDeps
 * @param depsOrUndefined
 */
export function useControls<S extends Schema, F extends SchemaOrFn<S> | string, G extends SchemaOrFn<S>>(
  schemaOrFolderName: F,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G,
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
): HookReturnType<F, G> {
  // We parse the args
  const { folderName, schema, folderSettings, hookSettings, deps } = parseArgs(
    schemaOrFolderName,
    settingsOrDepsOrSchema,
    depsOrSettingsOrFolderSettings,
    depsOrSettings,
    depsOrUndefined
  )

  const schemaIsFunction = typeof schema === 'function'

  // Keep track of deps to see if they changed and if there's need to recompute.
  const depsChanged = useRef(false)
  // We will only override the store settings and options when deps have changed
  // and it isn't the first render
  const firstRender = useRef(true)

  // Since the schema object would change on every render, we let the user have
  // control over when it should trigger a reset of the hook inputs.
  const _schema = useDeepMemo(() => {
    depsChanged.current = true
    const s = typeof schema === 'function' ? schema() : schema
    return folderName ? { [folderName]: folder(s, folderSettings) } : s
  }, deps)

  // GlobalPanel means that no store was provided, therefore we're using the levaStore
  const isGlobalPanel = !hookSettings?.store

  useRenderRoot(isGlobalPanel)
  const [store] = useState(() => hookSettings?.store || levaStore)

  /**
   * Parses the schema to extract the inputs initial data.
   *
   * This initial data will be used to initialize the store.
   *
   * Note that getDataFromSchema recursively
   * parses the schema inside nested folder.
   */
  const [initialData, mappedPaths] = useMemo(() => store.getDataFromSchema(_schema), [store, _schema])
  const [allPaths, renderPaths, onChangePaths, onEditStartPaths, onEditEndPaths] = useMemo(() => {
    const allPaths: string[] = []
    const renderPaths: string[] = []
    const onChangePaths: Record<string, OnChangeHandler> = {}
    const onEditStartPaths: Record<string, (...args: any) => void> = {}
    const onEditEndPaths: Record<string, (...args: any) => void> = {}

    Object.values(mappedPaths).forEach(({ path, onChange, onEditStart, onEditEnd, transient }) => {
      allPaths.push(path)
      if (!!onChange) {
        onChangePaths[path] = onChange
        if (!transient) {
          renderPaths.push(path)
        }
      } else {
        renderPaths.push(path)
      }

      if (onEditStart) {
        onEditStartPaths[path] = onEditStart
      }
      if (onEditEnd) {
        onEditEndPaths[path] = onEditEnd
      }
    })
    return [allPaths, renderPaths, onChangePaths, onEditStartPaths, onEditEndPaths]
  }, [mappedPaths])

  // Extracts the paths from the initialData and ensures order of paths.
  const paths = useMemo(() => store.orderPaths(allPaths), [allPaths, store])

  /**
   * Reactive hook returning the values from the store at given paths.
   * Essentially it flattens the keys of a nested structure.
   * For example { "folder.subfolder.valueKey": value } becomes { valueKey: value }
   *
   * initalData is going to be returned on the first render. Subsequent renders
   * will call the store data.
   * */
  const values = useValuesForPath(store, renderPaths, initialData)

  const set = useCallback(
    (values: Record<string, any>) => {
      const _values = Object.entries(values).reduce(
        (acc, [p, v]) => Object.assign(acc, { [mappedPaths[p].path]: v }),
        {}
      )
      store.set(_values, false)
    },
    [store, mappedPaths]
  )

  useEffect(() => {
    // We initialize the store with the initialData in useEffect.
    // Note that doing this while rendering (ie in useMemo) would make
    // things easier and remove the need for initializing useValuesForPath but
    // it breaks the ref from Monitor.

    // we override the settings when deps have changed and this isn't the first
    // render
    const shouldOverrideSettings = !firstRender.current && depsChanged.current
    store.addData(initialData, shouldOverrideSettings)
    firstRender.current = false
    depsChanged.current = false
    return () => store.disposePaths(paths)
  }, [store, paths, initialData])

  useEffect(() => {
    // let's handle transient subscriptions
    const unsubscriptions: (() => void)[] = []
    Object.entries(onChangePaths).forEach(([path, onChange]) => {
      onChange(store.get(path), path, { initial: true, get: store.get, ...store.getInput(path)! })
      const unsub = store.useStore.subscribe(
        ([value, input]: any) => onChange(value, path, { initial: false, get: store.get, ...input }),
        (s) => {
          const input = s.data[path]
          // @ts-ignore
          const value = input.disabled ? undefined : input.value
          return [value, input]
        },
        shallow
      )
      unsubscriptions.push(unsub)
    })
    return () => unsubscriptions.forEach((unsub) => unsub())
  }, [store, onChangePaths])

  useEffect(() => {
    const unsubscriptions: Array<() => void> = []
    Object.entries(onEditStartPaths).forEach(([path, onEditStart]) =>
      unsubscriptions.push(store.subscribeToEditStart(path, onEditStart))
    )
    Object.entries(onEditEndPaths).forEach(([path, onEditEnd]) =>
      unsubscriptions.push(store.subscribeToEditEnd(path, onEditEnd))
    )
    return () => unsubscriptions.forEach((unsub) => unsub())
  }, [onEditStartPaths, onEditEndPaths, store])

  if (schemaIsFunction) return [values, set] as any
  return values as any
}
