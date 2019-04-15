import React from 'react'
import useGesture from '../../index'

const InteractiveDom = ({ bindArgs, gesture, canceled, tempArg, config, ...props }) => {
  const domTarget = React.useRef(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(
    {
      [`on${gesture}Start`]: () => void setStartEnd([startFired + 1, 0]),
      [`on${gesture}End`]: () => void setStartEnd([0, endFired + 1]),
      [`on${gesture}`]: ({ event, transform, cancel, currentTarget, temp = tempArg, ...rest }) => {
        set({ ...rest, temp })
        if (canceled) {
          cancel()
        }
        return temp
      }
    },
    { domTarget, ...config }
  )

  React.useEffect(bind, [bind])

  const testKey = 'dom-' + gesture.toLowerCase()

  return (
    <div ref={domTarget} data-testid={`${testKey}-el`} style={{ height: 30, width: 30, background: 'blue', overflow: 'scroll' }}>
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

export default InteractiveDom
