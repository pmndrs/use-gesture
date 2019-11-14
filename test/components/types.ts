import React from 'react'
import { Fn, GenericConfig, DragConfig } from '../../src/types'

interface Props {
  bindArgs?: any[]
  gestures: string[]
  cancel?: Fn
  canceled?: boolean
  memoArg?: any
  config?: Partial<GenericConfig> & { drag?: Partial<DragConfig> }
}

export type InteractiveType = React.FunctionComponent<Props>
