import { dequal } from 'dequal/lite'
import { useState, useCallback, useEffect, useRef } from 'react'
import { format } from '../plugin'

type Props<V, Settings> = {
  type: string
  value: V
  settings?: Settings
  setValue: (v: V) => void
}

export function useInputSetters<V, Settings extends object>({ value, type, settings, setValue }: Props<V, Settings>) {
  // the value used by the panel vs the value
  const [displayValue, setDisplayValue] = useState(format(type, value, settings))
  const previousValueRef = useRef(value)
  const settingsRef = useRef(settings)
  settingsRef.current = settings
  const setFormat = useCallback((v) => setDisplayValue(format(type, v, settingsRef.current)), [type])

  const onUpdate = useCallback(
    (updatedValue: any) => {
      try {
        setValue(updatedValue)
      } catch (error) {
        const { type, previousValue } = error
        // make sure we throw an error if it's not a sanitization error
        if (type !== 'LEVA_ERROR') throw error
        setFormat(previousValue)
      }
    },
    [setFormat, setValue]
  )

  useEffect(() => {
    if (!dequal(value, previousValueRef.current)) {
      setFormat(value)
    }
    previousValueRef.current = value
  }, [value, setFormat])

  return { displayValue, onChange: setDisplayValue, onUpdate }
}
