import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

// uses custom store
export function LevaPanel({ store, ...props }: LevaPanelProps) {
  const parentStore = useStoreContext()
  const _store = store === undefined ? parentStore : store
  return <LevaRoot store={_store} {...props} />
}
