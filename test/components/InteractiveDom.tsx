import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../packages/react/src'
import { InteractiveType } from './types'

const InteractiveDom: InteractiveType = ({ gestures, canceled, memoArg, config, target }) => {
  const targetRef = React.useRef<EventTarget>(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  useGesture(createHandlers({ gestures, memoArg, set, setStartEnd, canceled }), {
    ...config,
    target: target || targetRef
  })

  const testKey = 'dom-' + gestures.join('').toLowerCase()

  return <Common ref={targetRef} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
