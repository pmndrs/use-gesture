import React from 'react'
import { useGesture } from '../../index'
import { Common } from './Common'

export const DefaultProp = () => {
  const [state, set] = React.useState({})
  const bind = useGesture(({ event, transform, cancel, currentTarget, ...rest }) => void set(rest))

  return <Common listeners={{ ...bind() }} state={state} testKey="drag" />
}

export const ActionProp = () => {
  const [state, set] = React.useState({})
  const bind = useGesture({ onAction: ({ event, transform, cancel, currentTarget, ...rest }) => void set(rest) })

  return <Common listeners={{ ...bind() }} state={state} testKey="drag" />
}

export const BindProps = ({ args1 = [], args2 = [] }) => {
  const [state, set] = React.useState({})
  const bind = useGesture(({ event, transform, cancel, currentTarget, ...rest }) => void set(rest))

  return (
    <>
      <Common listeners={{ ...bind(...args1) }} state={state} testKey="drag" />
      <Common listeners={{ ...bind(...args2) }} state={state} testKey="2-drag" />
    </>
  )
}

export const GenuineHandlers = () => {
  const [state, set] = React.useState({})
  const [state2, set2] = React.useState('mouse not down')
  const [state3, set3] = React.useState('not clicked')

  const bind = useGesture({
    onDrag: ({ event, transform, cancel, currentTarget, ...rest }) => void set(rest),
    onMouseDown: () => set2('mouse down'),
    onClick: () => set3('clicked'),
  })

  return (
    <Common listeners={{ ...bind() }} state={state} testKey="drag">
      <div data-testid={`mouseDown`}>{state2}</div>
      <div data-testid={`click`}>{state3}</div>
    </Common>
  )
}
