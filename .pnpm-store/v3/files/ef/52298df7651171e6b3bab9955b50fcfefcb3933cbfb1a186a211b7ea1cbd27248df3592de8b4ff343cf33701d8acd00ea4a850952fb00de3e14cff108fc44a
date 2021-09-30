import { useRef } from 'react'
import { dequal } from 'dequal/lite'
import shallow from 'zustand/shallow'

export function useCompareMemoize(value: any, deep: boolean) {
  const ref = useRef()
  const compare = deep ? dequal : shallow

  if (!compare(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}
