import React from 'react'
import { Fn } from '../../src/types/common'
import { GestureConfig } from '../../src/types/config'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Fn
  canceled?: boolean
  tempArg?: any
  config?: Partial<GestureConfig>
}

export type InteractiveType = React.FunctionComponent<Props>
