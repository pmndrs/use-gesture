import React, { useState } from 'react'
import { useScroll } from 'react-use-gesture'

export default function Scroll() {
  const [scroll, setScroll] = useState([0, 0])
  useScroll(
    ({ xy, direction }) => {
      setScroll(direction)
    },
    { domTarget: window, eventOptions: { capture: true } }
  )

  return (
    <div>
      <div style={{ position: 'fixed' }}>{scroll.toString()}</div>
      <div style={{ height: '200px', overflow: 'scroll' }}>
        <div style={{ height: '1000px' }} />
      </div>
    </div>
  )
}
