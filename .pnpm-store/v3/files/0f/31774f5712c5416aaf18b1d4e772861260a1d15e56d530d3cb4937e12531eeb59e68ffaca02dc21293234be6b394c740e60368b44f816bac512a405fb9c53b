import React from 'react'
import { Plugins } from '../../plugin'
import { warn, LevaErrors } from '../../utils/log'
import { InputContext } from '../../context'
import { useInputSetters } from '../../hooks'
import { StyledInputWrapper } from '../UI/StyledUI'
import type { DataInput } from '../../types'

type ControlInputProps = Omit<DataInput, '__refCount' | 'key'> & {
  valueKey: string
  path: string
  storeId: string
  setValue: (value: any) => void
  setSettings: (settings: any) => void
  disable: (flag: boolean) => void
  emitOnEditStart?: (...args: any) => void
  emitOnEditEnd?: (...args: any) => void
}

export function ControlInput({
  type,
  label,
  path,
  valueKey,
  value,
  settings,
  setValue,
  disabled,
  ...rest
}: ControlInputProps) {
  const { displayValue, onChange, onUpdate } = useInputSetters({ type, value, settings, setValue })

  const Input = Plugins[type].component
  if (!Input) {
    warn(LevaErrors.NO_COMPONENT_FOR_TYPE, type, path)
    return null
  }

  return (
    <InputContext.Provider
      value={{
        key: valueKey,
        path,
        id: '' + path,
        label,
        displayValue,
        value,
        onChange,
        onUpdate,
        settings,
        setValue,
        disabled,
        ...rest,
      }}>
      <StyledInputWrapper disabled={disabled}>
        <Input />
      </StyledInputWrapper>
    </InputContext.Provider>
  )
}
