import React from 'react'
import { Vector } from '../Vector'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'
import type { Vector3dProps } from './vector3d-types'

export function Vector3dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
    </Row>
  )
}
