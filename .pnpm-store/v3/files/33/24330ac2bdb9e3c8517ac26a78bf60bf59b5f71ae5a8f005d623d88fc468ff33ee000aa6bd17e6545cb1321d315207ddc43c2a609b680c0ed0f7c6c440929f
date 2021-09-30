import shallow from 'zustand/shallow'
import { getValuesForPaths } from '../utils/data'
import type { Data, StoreType } from '../types'

/**
 * Hook that returns the values from the zustand store for the given paths.
 * @param paths paths for which to return values
 * @param initialData
 */
export function useValuesForPath(store: StoreType, paths: string[], initialData: Data) {
  const valuesForPath = store.useStore((s) => {
    const data = { ...initialData, ...s.data }
    return getValuesForPaths(data, paths)
  }, shallow)

  return valuesForPath
}
