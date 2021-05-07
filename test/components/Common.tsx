import React, { ReactChild } from 'react'
import { UserHandlers } from '../../packages/core/src'

export const createHandlers = ({
  gestures,
  memoArg,
  canceled,
  set,
  setStartEnd
}: {
  gestures: string[]
  memoArg: any[]
  canceled?: boolean
  set: Function
  setStartEnd: React.Dispatch<React.SetStateAction<[number, number]>>
}): UserHandlers => {
  return gestures.reduce((acc: UserHandlers, g) => {
    const gesture = {
      [`on${g}`]: ({
        event,
        cancel,
        target,
        memo = memoArg,
        ...rest
      }: {
        event: Event
        cancel: Function
        target: EventTarget
        memo: any
      }) => {
        set({ ...rest, memo })
        if (canceled) {
          cancel()
        }
        return memo
      }
    }
    if (g !== 'Hover') {
      gesture[`on${g}Start`] = () => {
        setStartEnd(([startFired, endFired]) => [startFired + 1, endFired])
      }
      gesture[`on${g}End`] = () => {
        setStartEnd(([, endFired]) => [0, endFired + 1])
      }
    }
    return {
      ...acc,
      ...gesture
    }
  }, {} as UserHandlers)
}

export const Common = React.forwardRef(
  (
    {
      listeners = {},
      testKey,
      state,
      startFired = 0,
      endFired = 0,
      children
    }: {
      listeners?: object
      testKey: string
      state: object
      startFired?: number
      endFired?: number
      children?: ReactChild | ReactChild[]
    },
    ref
  ) => {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        {...listeners}
        data-testid={`${testKey}-el`}
        style={{ height: 400, width: 400 }}
      >
        <div data-testid={`${testKey}-start`}>
          {startFired === 0 ? 'not fired' : startFired > 1 ? 'fired too much' : 'fired'}
        </div>
        <div data-testid={`${testKey}-end`}>
          {endFired === 0 ? 'not fired' : endFired > 1 ? 'fired too much' : 'fired'}
        </div>
        {Object.entries(state).map(([k, v]) => (
          <div key={k} data-testid={`${testKey}-${k}`}>
            {String(v)}
          </div>
        ))}
        {children}
      </div>
    )
  }
)
