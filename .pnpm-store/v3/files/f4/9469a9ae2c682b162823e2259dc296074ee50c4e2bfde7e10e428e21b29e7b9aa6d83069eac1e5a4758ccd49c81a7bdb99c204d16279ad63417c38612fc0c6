import React from 'react'
import { Row, Label } from '../UI'
import { StyledButtonGroup } from './StyledButtonGroup'
import { StyledButtonGroupButton } from './StyledButtonGroupButton'
import { ButtonGroupInputOpts, ButtonGroupOpts } from '../../types'

export type ButtonGroupInternalOpts = {
  label: null | JSX.Element | string
  opts: ButtonGroupInputOpts
}

const getOpts = ({ label: _label, opts: _opts }: ButtonGroupInternalOpts) => {
  let label = typeof _label === 'string' ? (_label.trim() === '' ? null : _label) : _label
  let opts = _opts
  if (typeof _opts.opts === 'object') {
    if (opts.label !== undefined) {
      label = _opts.label as any
    }
    opts = _opts.opts
  }

  return { label, opts: opts as ButtonGroupOpts }
}

export function ButtonGroup(props: ButtonGroupInternalOpts) {
  const { label, opts } = getOpts(props)
  return (
    <Row input={!!label}>
      {label && <Label>{label}</Label>}
      <StyledButtonGroup>
        {Object.entries(opts).map(([label, onClick]) => (
          <StyledButtonGroupButton key={label} onClick={() => onClick()}>
            {label}
          </StyledButtonGroupButton>
        ))}
      </StyledButtonGroup>
    </Row>
  )
}
