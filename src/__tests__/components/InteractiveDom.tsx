import React from 'react'
import { Common, createHandlers } from './Common'
import { useGesture } from '../../index'
import { GestureKey } from '../../../types/states'
import { Fn } from '../../../types/common'
import { GestureConfig } from '../../../types/config'

const InteractiveDom = ({
  // bindArgs = [],
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
  const domTarget = React.useRef<EventTarget>(null)
  const [state, set] = React.useState({})
  const [[startFired, endFired], setStartEnd] = React.useState([0, 0])

  const bind = useGesture(createHandlers({ gestures, tempArg, set, setStartEnd, canceled }), { ...config, domTarget })
  React.useEffect(bind, [bind])

  const testKey = 'dom-' + gestures.join('').toLowerCase()

  return <Common ref={domTarget} state={state} testKey={testKey} startFired={startFired} endFired={endFired} />
}

export default InteractiveDom
