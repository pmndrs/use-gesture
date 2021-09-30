import { useMemo } from 'react'
import { useCompareMemoize } from './useCompareMemoize'

export function useDeepMemo<T>(fn: () => T, deps: React.DependencyList | undefined) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, useCompareMemoize(deps, true))
}
