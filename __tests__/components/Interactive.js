import React from 'react'
import { Common, createHandlers } from './Common'
import useGesture from '../../index'

const Interactive = ({ bindArgs, gesture, canceled, tempArg, config, ...props }) => {
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gesture, tempArg, set, setStartEnd, canceled }), config)
  const output = bind(...bindArgs)

  const oldOutput = React.useRef(output)
  React.useEffect(() => void (oldOutput.current = output), [output])

  const testKey = Array.isArray(gesture) ? gesture.join('').toLowerCase() : gesture.toLowerCase()

  return (
    <Common
      listeners={{ ...output }}
      state={state}
      testKey={testKey}
      handlersChanged={oldOutput.current !== output}
      startFired={startFired}
      endFired={endFired}
    />
  )
}

export default Interactive
