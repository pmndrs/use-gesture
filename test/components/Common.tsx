import React, { ReactChild } from 'react'
import { Fn, TransformType } from '../../src/types/common'
import { GestureHandlersPartial } from '../../src/types/'

export const createHandlers = ({
  gestures,
  tempArg,
  canceled,
  set,
  setStartEnd,
}: {
  gestures: string[]
  tempArg: any[]
  canceled?: boolean
  set: Fn
  setStartEnd: React.Dispatch<React.SetStateAction<[number, number]>>
}): GestureHandlersPartial => {
  return gestures.reduce(
    (acc: GestureHandlersPartial, g) => {
      const gesture = {
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
          temp: any
        }) => {
          set({ ...rest, temp })
          if (canceled) {
            cancel()
          }
          return temp
        },
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
        ...gesture,
      }
    },
    {} as GestureHandlersPartial
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
      children,
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
      <div ref={ref as React.RefObject<HTMLDivElement>} {...listeners} data-testid={`${testKey}-el`} style={{ height: 400, width: 400 }}>
        <div data-testid={`${testKey}-start`}>{startFired === 0 ? 'not fired' : startFired > 1 ? 'fired too much' : 'fired'}</div>
        <div data-testid={`${testKey}-end`}>{endFired === 0 ? 'not fired' : endFired > 1 ? 'fired too much' : 'fired'}</div>
        {Object.entries(state).map(([k, v]) => (
          <div key={k} data-testid={`${testKey}-${k}`}>
            {v !== undefined ? v.toString() : 'undefined'}
          </div>
        ))}
        {children}
      </div>
    )
  }
)
