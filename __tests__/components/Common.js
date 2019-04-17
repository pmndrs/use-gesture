import React from 'react'

export const createHandlers = ({ gesture, tempArg, canceled, set, setStartEnd }) => {
  gesture = Array.isArray(gesture) ? gesture : [gesture]
  return gesture.reduce(
    (acc, g) => ({
      ...acc,
      [`on${g}Start`]: () => void setStartEnd(([startFired]) => [startFired + 1, 0]),
      [`on${g}End`]: () => void setStartEnd(([, endFired]) => [0, endFired + 1]),
      [`on${g}`]: ({ event, transform, cancel, currentTarget, temp = tempArg, ...rest }) => {
        set({ ...rest, temp })
        if (canceled) {
          cancel()
        }
        return temp
      }
    }),
    {}
  )
}

export const Common = React.forwardRef(({ listeners, testKey, state, startFired, endFired }, ref) => {
  return (
    <div ref={ref} {...listeners} data-testid={`${testKey}-el`} style={{ height: 400, width: 400 }}>
      <div data-testid={`${testKey}-start`}>{startFired === 0 ? 'not fired' : startFired > 1 ? 'fired too much' : 'fired'}</div>
      <div data-testid={`${testKey}-end`}>{endFired === 0 ? 'not fired' : endFired > 1 ? 'fired too much' : 'fired'}</div>
      {Object.entries(state).map(([k, v]) => (
        <div key={k} data-testid={`${testKey}-${k}`}>
          {v !== undefined ? v.toString() : 'undefined'}
        </div>
      ))}
    </div>
  )
})
