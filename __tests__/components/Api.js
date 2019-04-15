import React from 'react'
import useGesture from '../../index'

export const DefaultProp = () => {
  const [state, set] = React.useState({})
  const bind = useGesture(({ event, transform, cancel, currentTarget, ...rest }) => void set(rest))

  return (
    <div {...bind()} data-testid={`drag-el`} style={{ height: 30, width: 30, background: 'blue', overflow: 'scroll' }}>
      {Object.entries(state).map(([k, v]) => (
        <div key={k} data-testid={`drag-${k}`} title={k}>
          {v !== undefined ? v.toString() : 'undefined'}
        </div>
      ))}
    </div>
  )
}

export const ActionProp = () => {
  const [state, set] = React.useState({})
  const bind = useGesture({ onAction: ({ event, transform, cancel, currentTarget, ...rest }) => void set(rest) })

  return (
    <div {...bind()} data-testid={`drag-el`} style={{ height: 30, width: 30, background: 'blue', overflow: 'scroll' }}>
      {Object.entries(state).map(([k, v]) => (
        <div key={k} data-testid={`drag-${k}`} title={k}>
          {v !== undefined ? v.toString() : 'undefined'}
        </div>
      ))}
    </div>
  )
}
