import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../index'

const Interactive = ({ bindArgs = [], gesture, canceled, tempArg, config, ...props }) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gesture, tempArg, set, setStartEnd, canceled }), config)
  const testKey = Array.isArray(gesture) ? gesture.join('').toLowerCase() : gesture.toLowerCase()

  return <Common listeners={{ ...bind(...bindArgs) }} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default Interactive
