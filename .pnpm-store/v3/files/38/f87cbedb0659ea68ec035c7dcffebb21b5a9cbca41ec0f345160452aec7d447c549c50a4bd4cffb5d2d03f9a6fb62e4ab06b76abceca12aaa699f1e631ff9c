import React from 'react'
import { ValueInput } from '../ValueInput'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'
import type { StringProps } from './string-types'

type BaseStringProps = Pick<StringProps, 'displayValue' | 'onUpdate' | 'onChange'> &
  Omit<React.ComponentProps<typeof ValueInput>, 'value'>

export function String({ displayValue, onUpdate, onChange, ...props }: BaseStringProps) {
  return <ValueInput value={displayValue} onUpdate={onUpdate} onChange={onChange} {...props} />
}

export function StringComponent() {
  const { label, displayValue, onUpdate, onChange } = useInputContext<StringProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}
