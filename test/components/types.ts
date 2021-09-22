import React from 'react'
import { UserGestureConfig } from '../../packages/core/src/types'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Function
  canceled?: boolean
  memoArg?: any
  config?: UserGestureConfig
  target?: EventTarget | React.RefObject<EventTarget>
}

export type InteractiveType = React.FunctionComponent<Props>
