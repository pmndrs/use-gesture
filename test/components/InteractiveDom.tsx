import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../src/index'
import { InteractiveType } from './types'

const InteractiveDom: InteractiveType = ({ gestures, canceled, memoArg, config, domTarget }) => {
  const target = React.useRef<EventTarget>(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  useGesture(createHandlers({ gestures, memoArg, set, setStartEnd, canceled }), {
    ...config,
    domTarget: domTarget || target,
  })

  const testKey = 'dom-' + gestures.join('').toLowerCase()

  return <Common ref={target} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
