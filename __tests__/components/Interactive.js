import React from 'react'
import useGesture from '../../index'

const Interactive = ({ bindArgs, gesture, canceled, tempArg, ...props }) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture({
    [`on${gesture}Start`]: () => void setStartEnd([startFired + 1, 0]),
    [`on${gesture}End`]: () => void setStartEnd([0, endFired + 1]),
    [`on${gesture}`]: ({ event, transform, cancel, currentTarget, temp = tempArg, ...rest }) => {
      set({ ...rest, temp })
      if (canceled) {
        cancel()
      }
      return temp
    }
  })

  const output = bind(...bindArgs)
  const oldOutput = React.useRef(output)
  React.useEffect(() => void (oldOutput.current = output), [output])

  const testKey = gesture.toLowerCase()

  return (
    <div {...output} data-testid={`${testKey}-el`} style={{ height: 30, width: 30, background: 'blue', overflow: 'scroll' }}>
      <div data-testid="handlers">{oldOutput.current === output ? 'memo' : 'changed'}</div>
      <div data-testid={`${testKey}-start`}>{startFired === 0 ? 'not fired' : startFired > 1 ? 'fired too much' : 'fired'}</div>
      <div data-testid={`${testKey}-end`}>{endFired === 0 ? 'not fired' : endFired > 1 ? 'fired too much' : 'fired'}</div>
      {Object.entries(state).map(([k, v]) => (
        <div key={k} data-testid={`${testKey}-${k}`}>
          {v !== undefined ? v.toString() : 'undefined'}
        </div>
      ))}
    </div>
  )
}

export default Interactive
