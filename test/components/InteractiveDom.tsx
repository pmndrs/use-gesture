import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../src/index'
import { InteractiveType } from './types'

const InteractiveDom: InteractiveType = ({ gestures, canceled, tempArg, config }) => {
  const domTarget = React.useRef<EventTarget>(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gestures, tempArg, set, setStartEnd, canceled }), { ...config, domTarget })
  React.useEffect(bind, [bind])

  const testKey = 'dom-' + gestures.join('').toLowerCase()

  return <Common ref={domTarget} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
