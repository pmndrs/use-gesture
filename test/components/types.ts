import React from 'react'
import { Fn, UseGestureConfig } from '../../src/types'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Fn
  canceled?: boolean
  memoArg?: any
  config?: UseGestureConfig
}

export type InteractiveType = React.FunctionComponent<Props>
