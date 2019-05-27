import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../index'
import { GestureKey } from '../../../types/states'
import { Fn } from '../../../types/common'
import { GestureConfig } from '../../../types/config'

const Interactive = ({
  bindArgs = [],
  gestures,
  canceled,
  tempArg,
  config,
}: {
  bindArgs: any[]
  gestures: GestureKey[]
  cancel: Fn
  canceled: boolean
  tempArg: any[]
  config?: Partial<GestureConfig>
}) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gestures, tempArg, set, setStartEnd, canceled }), config)
  const testKey = gestures.join('').toLowerCase()

  return <Common listeners={{ ...bind(...bindArgs) }} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default Interactive
