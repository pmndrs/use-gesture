import React, { useRef } from 'react'
import { useInputContext } from '../../context'
import { Label, Row, Chevron } from '../UI'
import { NativeSelect, PresentationalSelect, SelectContainer } from './StyledSelect'
import type { SelectProps } from './select-types'

export function Select({
  displayValue,
  value,
  onUpdate,
  id,
  settings,
}: Pick<SelectProps, 'value' | 'displayValue' | 'onUpdate' | 'id' | 'settings'>) {
  const { keys, values } = settings
  const lastDisplayedValue = useRef<any>()

  // in case the value isn't present in values (possibly when changing options
  // via deps), remember the last correct display value.
  if (value === values[displayValue]) {
    lastDisplayedValue.current = keys[displayValue]
  }

  return (
    <SelectContainer>
      <NativeSelect id={id} value={displayValue} onChange={(e) => onUpdate(values[Number(e.currentTarget.value)])}>
        {keys.map((key, index) => (
          <option key={key} value={index}>
            {key}
          </option>
        ))}
      </NativeSelect>
      <PresentationalSelect>{lastDisplayedValue.current}</PresentationalSelect>
      <Chevron toggled />
    </SelectContainer>
  )
}

export function SelectComponent() {
  const { label, value, displayValue, onUpdate, id, settings } = useInputContext<SelectProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Select id={id} value={value} displayValue={displayValue} onUpdate={onUpdate} settings={settings} />
    </Row>
  )
}
