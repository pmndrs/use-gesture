import React from 'react'
import { Fn, PartialUserConfig } from '../../src/types'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Fn
  canceled?: boolean
  memoArg?: any
  config?: PartialUserConfig
}

export type InteractiveType = React.FunctionComponent<Props>
