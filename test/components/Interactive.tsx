import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../packages/react/src'
import { InteractiveType } from './types'

const Interactive: InteractiveType = ({ bindArgs = [], gestures, canceled, memoArg, config }) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind: any = useGesture(createHandlers({ gestures, memoArg, set, setStartEnd, canceled }), config)
  const testKey = gestures.join('').toLowerCase()

  return (
    <Common
      listeners={{ ...bind(...bindArgs) }}
      state={state}
      testKey={testKey}
      startFired={startFired}
      endFired={endFired}
    />
  )
}

export default Interactive
