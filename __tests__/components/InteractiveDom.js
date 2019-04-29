import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../index'

const InteractiveDom = ({ bindArgs = [], gesture, canceled, tempArg, config, ...props }) => {
  const domTarget = React.useRef(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gesture, tempArg, set, setStartEnd, canceled }), { domTarget, ...config })
  React.useEffect(bind, [bind])

  const testKey = 'dom-' + (Array.isArray(gesture) ? gesture.join('').toLowerCase() : gesture.toLowerCase())

  return <Common ref={domTarget} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
