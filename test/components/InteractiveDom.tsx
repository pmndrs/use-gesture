import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../src/index'
import { InteractiveType } from './types'
import { Fn } from '../../src/types'

const InteractiveDom: InteractiveType = ({ gestures, canceled, memoArg, config }) => {
  const domTarget = React.useRef<EventTarget>(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gestures, memoArg, set, setStartEnd, canceled }), {
    ...config,
    domTarget,
  }) as (...args: any[]) => Fn

  React.useEffect(bind, [bind])

  const testKey = 'dom-' + gestures.join('').toLowerCase()

  return <Common ref={domTarget} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
