import React from 'react'
import { Row } from '../UI'
import { StyledButton } from './StyledButton'

type ButtonProps = {
  label: string
  onClick: () => any
}

export function Button({ onClick, label }: ButtonProps) {
  return (
    <Row>
      <StyledButton onClick={() => onClick()}>{label}</StyledButton>
    </Row>
  )
}
