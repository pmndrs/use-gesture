import React from 'react'
import { StyledRow, StyledInputRow } from './StyledUI'

type RowProps = React.ComponentProps<typeof StyledRow> & { input?: boolean }

export function Row({ input, ...props }: RowProps) {
  if (input) return <StyledInputRow {...props} />
  return <StyledRow {...props} />
}
