import React from 'react'
import { GestureKey } from '../../../types/states'
import { Fn, TransformType, AtLeastOneOf } from '../../../types/common'
import { GestureHandlers } from '../../../types'

export const createHandlers = ({
  gestures,
  tempArg,
  canceled,
  set,
  setStartEnd,
}: {
  gestures: GestureKey[]
  tempArg: any[]
  canceled: boolean
  set: Fn
  setStartEnd: React.Dispatch<React.SetStateAction<[number, number]>>
}): AtLeastOneOf<GestureHandlers> => {
  return gestures.reduce(
    (acc: AtLeastOneOf<GestureHandlers>, g) => ({
      ...acc,
      [`on${g}Start`]: () => void setStartEnd(([startFired, endFired]) => [startFired + 1, endFired]),
      [`on${g}End`]: () => void setStartEnd(([, endFired]) => [0, endFired + 1]),
      [`on${g}`]: ({
        event,
        transform,
        cancel,
        currentTarget,
        temp = tempArg,
        ...rest
      }: {
        event: Event
        transform: TransformType
        cancel: Fn
        currentTarget: EventTarget
        temp: any[]
      }) => {
        set({ ...rest, temp })
        if (canceled) {
          cancel()
        }
        return temp
      },
    }),
    {} as GestureHandlers
  )
}

export const Common = React.forwardRef(
  (
    {
      listeners = {},
      testKey,
      state,
      startFired = 0,
      endFired = 0,
    }: { listeners?: object; testKey: string; state: object; startFired?: number; endFired?: number },
    ref
  ) => {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} {...listeners} data-testid={`${testKey}-el`} style={{ height: 400, width: 400 }}>
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
)
