import { useMemo } from 'react'
import create from 'zustand'
import { normalizeInput, join, updateInput, warn, LevaErrors, getUid } from './utils'
import { SpecialInputs, MappedPaths, DataInput } from './types'
import type { Data, FolderSettings, State, StoreType } from './types'
import { createEventEmitter } from './eventEmitter'

export const Store = function (this: StoreType) {
  const store = create<State>(() => ({ data: {} }))

  const eventEmitter = createEventEmitter()

  this.storeId = getUid()
  this.useStore = store
  /**
   * Folders will hold the folder settings for the pane.
   * @note possibly make this reactive
   */
  const folders: Record<string, FolderSettings> = {}

  /**
   * OrderedPaths will hold all the paths in a parent -> children order.
   * This will ensure we can display the controls in a predictable order.
   */
  const orderedPaths = new Set<String>()

  /**
   * For a given data structure, gets all paths for which inputs have
   * a reference __refCount superior to zero. This function is used by the
   * root pane to only display the inputs that are consumed by mounted
   * components.
   *
   * @param data
   */
  this.getVisiblePaths = () => {
    const data = this.getData()
    const paths = Object.keys(data)
    // identifies hiddenFolders
    const hiddenFolders: string[] = []
    Object.entries(folders).forEach(([path, settings]) => {
      if (
        // the folder settings have a render function
        settings.render &&
        // and the folder path matches a data path
        // (this can happen on first mount and could probably be solved if folder settings
        // were set together with the store data. In fact, the store data is set in useEffect
        // while folders settings are set in useMemo).
        paths.some((p) => p.indexOf(path) === 0) &&
        // the folder settings is supposed to be hidden
        !settings.render(this.get)
      )
        // then folder is hidden
        hiddenFolders.push(path + '.')
    })

    const visiblePaths: string[] = []
    orderedPaths.forEach((path: any) => {
      if (
        path in data &&
        // if input is mounted
        data[path].__refCount > 0 &&
        // if it's not included in a hidden folder
        hiddenFolders.every((p) => path.indexOf(p) === -1) &&
        // if its render functions doesn't exists or returns true
        (!data[path].render || data[path].render!(this.get))
      )
        // then the input path is visible
        visiblePaths.push(path)
    })

    return visiblePaths
  }

  // adds paths to OrderedPaths
  this.setOrderedPaths = (newPaths) => {
    newPaths.forEach((p) => orderedPaths.add(p))
  }

  this.orderPaths = (paths) => {
    this.setOrderedPaths(paths)
    return paths
  }

  /**
   * When the useControls hook unmmounts, it will call this function that will
   * decrease the __refCount of all the inputs. When an input __refCount reaches 0, it
   * should no longer be displayed in the panel.
   *
   * @param paths
   */
  this.disposePaths = (paths) => {
    store.setState((s) => {
      const data = s.data
      paths.forEach((path) => {
        if (path in data) {
          const input = data[path]
          input.__refCount--
          if (input.__refCount === 0 && input.type in SpecialInputs) {
            // this makes sure special inputs such as buttons are properly
            // refreshed. This might need some attention though.
            delete data[path]
          }
        }
      })
      return { data }
    })
  }

  this.dispose = () => {
    store.setState(() => {
      return { data: {} }
    })
  }

  this.getFolderSettings = (path) => {
    return folders[path] || {}
  }

  // Shorthand to get zustand store data
  this.getData = () => {
    return store.getState().data
  }

  /**
   * Merges the data passed as an argument with the store data.
   * If an input path from the data already exists in the store,
   * the function doesn't update the data but increments __refCount
   * to keep track of how many components use that input key.
   *
   * Uses depsChanged to trigger a recompute and update inputs
   * settings if needed.
   *
   * @param newData the data to update
   * @param depsChanged to keep track of dependencies
   */
  this.addData = (newData, override) => {
    store.setState((s) => {
      const data = s.data
      Object.entries(newData).forEach(([path, newInputData]) => {
        let input = data[path]

        // If an input already exists compare its values and increase the reference __refCount.
        if (!!input) {
          // @ts-ignore
          const { type, value, ...rest } = newInputData
          if (type !== input.type) {
            warn(LevaErrors.INPUT_TYPE_OVERRIDE, type)
          } else {
            if (input.__refCount === 0 || override) {
              Object.assign(input, rest)
            }
            // Else we increment the ref count
            input.__refCount++
          }
        } else {
          data[path] = { ...newInputData, __refCount: 1 }
        }
      })

      // Since we're returning a new object, direct mutation of data
      // Should trigger a re-render so we're good!
      return { data }
    })
  }

  /**
   * Shorthand function to set the value of an input at a given path.
   *
   * @param path path of the input
   * @param value new value of the input
   */
  this.setValueAtPath = (path, value, fromPanel) => {
    store.setState((s) => {
      const data = s.data
      //@ts-expect-error (we always update inputs with a value)
      updateInput(data[path], value, path, this, fromPanel)
      return { data }
    })
  }

  this.setSettingsAtPath = (path, settings) => {
    store.setState((s) => {
      const data = s.data
      //@ts-expect-error (we always update inputs with settings)
      data[path].settings = { ...data[path].settings, ...settings }
      return { data }
    })
  }

  this.disableInputAtPath = (path, flag) => {
    store.setState((s) => {
      const data = s.data
      //@ts-expect-error (we always update inputs with a value)
      data[path].disabled = flag
      return { data }
    })
  }

  this.set = (values, fromPanel: boolean) => {
    store.setState((s) => {
      const data = s.data
      Object.entries(values).forEach(([path, value]) => {
        try {
          //@ts-expect-error (we always update inputs with a value)
          updateInput(data[path], value, undefined, undefined, fromPanel)
        } catch {}
      })
      return { data }
    })
  }

  this.getInput = (path) => {
    try {
      return this.getData()[path] as DataInput
    } catch (e) {
      warn(LevaErrors.PATH_DOESNT_EXIST, path)
    }
  }

  this.get = (path) => {
    return this.getInput(path)?.value
  }

  this.emitOnEditStart = (path: string) => {
    eventEmitter.emit(`onEditStart:${path}`, this.get(path), path, { ...this.getInput(path), get: this.get })
  }

  this.emitOnEditEnd = (path: string) => {
    eventEmitter.emit(`onEditEnd:${path}`, this.get(path), path, { ...this.getInput(path), get: this.get })
  }

  this.subscribeToEditStart = (path: string, listener: (value: any) => void): (() => void) => {
    eventEmitter.on(`onEditStart:${path}`, listener)
    return () => eventEmitter.off(path, listener)
  }

  this.subscribeToEditEnd = (path: string, listener: (value: any) => void): (() => void) => {
    eventEmitter.on(`onEditEnd:${path}`, listener)
    return () => eventEmitter.off(path, listener)
  }

  /**
   * Recursively extract the data from the schema, sets folder initial
   * preferences and normalize the inputs (normalizing an input means parsing the
   * input object, identify its type and normalize its settings).
   *
   * @param schema
   * @param rootPath used for recursivity
   */
  const _getDataFromSchema = (schema: any, rootPath: string, mappedPaths: MappedPaths): Data => {
    const data: Data = {}

    Object.entries(schema).forEach(([key, rawInput]: [string, any]) => {
      // if the key is empty, skip schema parsing and prompt an error.
      if (key === '') return warn(LevaErrors.EMPTY_KEY)

      let newPath = join(rootPath, key)

      // If the input is a folder, then we recursively parse its schema and assign
      // it to the current data.
      if (rawInput.type === SpecialInputs.FOLDER) {
        const newData = _getDataFromSchema(rawInput.schema, newPath, mappedPaths)
        Object.assign(data, newData)

        // Sets folder preferences if it wasn't set before
        if (!(newPath in folders)) folders[newPath] = rawInput.settings as FolderSettings
      } else if (key in mappedPaths) {
        // if a key already exists, prompt an error.
        warn(LevaErrors.DUPLICATE_KEYS, key, newPath, mappedPaths[key].path)
      } else {
        const normalizedInput = normalizeInput(rawInput, key, newPath, data)
        if (normalizedInput) {
          const { type, options, input } = normalizedInput
          // @ts-ignore
          const { onChange, transient, onEditStart, onEditEnd, ..._options } = options
          data[newPath] = { type, ..._options, ...input, fromPanel: true }
          mappedPaths[key] = { path: newPath, onChange, transient, onEditStart, onEditEnd }
        } else {
          warn(LevaErrors.UNKNOWN_INPUT, newPath, rawInput)
        }
      }
    })

    return data
  }

  this.getDataFromSchema = (schema) => {
    const mappedPaths: MappedPaths = {}
    const data = _getDataFromSchema(schema, '', mappedPaths)
    return [data, mappedPaths]
  }
} as any as { new (): StoreType }

export const levaStore = new Store()

export function useCreateStore() {
  return useMemo(() => new Store(), [])
}

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // TODO remove store from window
  // @ts-expect-error
  window.__STORE = levaStore
}
