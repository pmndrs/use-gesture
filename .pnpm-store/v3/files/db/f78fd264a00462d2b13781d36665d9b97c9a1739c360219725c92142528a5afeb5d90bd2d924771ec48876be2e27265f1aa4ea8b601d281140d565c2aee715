import shallow from 'zustand/shallow'
import { useStoreContext } from '../context'

export const useValue = (path: string) => {
  return useValues([path])[path]
}

export const useValues = <T extends string>(paths: T[]) => {
  const store = useStoreContext()
  const value = store.useStore(
    ({ data }) =>
      paths.reduce((acc, path) => {
        // @ts-expect-error
        if (data[path] && 'value' in data[path]) return Object.assign(acc, { [path]: data[path].value })
        return acc
      }, {} as { [key in T]: any }),
    shallow
  )
  return value
}
