import React from 'react'
import { styled } from '../../styles'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { Joystick } from './Joystick'
import { useInputContext } from '../../context'
import type { Vector2dProps } from './vector2d-types'

export const Container = styled('div', {
  display: 'grid',
  columnGap: '$colGap',
  variants: {
    withJoystick: {
      true: { gridTemplateColumns: '$sizes$rowHeight auto' },
      false: { gridTemplateColumns: 'auto' },
    },
  },
})

export function Vector2dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector2dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Container withJoystick={!!settings.joystick}>
        {settings.joystick && <Joystick value={displayValue} settings={settings} onUpdate={onUpdate} />}
        <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
      </Container>
    </Row>
  )
}
