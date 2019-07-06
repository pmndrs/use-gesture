import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../src/index'
import { InteractiveType } from './types'

const Interactive: InteractiveType = ({ bindArgs = [], gestures, canceled, tempArg, config }) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gestures, tempArg, set, setStartEnd, canceled }), config)
  const testKey = gestures.join('').toLowerCase()

  return <Common listeners={{ ...bind(...bindArgs) }} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default Interactive
