import React from 'react'
import { Fn, UseGestureConfig } from '../../src/types'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Fn
  canceled?: boolean
  memoArg?: any
  config?: UseGestureConfig
  domTarget?: EventTarget | React.RefObject<EventTarget>
}

export type InteractiveType = React.FunctionComponent<Props>
