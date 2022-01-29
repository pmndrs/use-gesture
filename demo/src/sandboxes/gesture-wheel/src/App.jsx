import React, { useState } from 'react'
import { useWheel } from '@use-gesture/react'

export default function App() {
  const [wheel, setWheel] = useState({ direction: [0, 0], delta: [0, 0], _movement: [0, 0], offset: [0, 0] })
  useWheel(
    ({ direction, delta, _movement, offset }) => {
      setWheel({ direction, delta, _movement, offset })
    },
    { target: window, bounds: { top: -500, bottom: 500 } }
  )

  return (
    <div className="center fill">
      <pre style={{ position: 'fixed', padding: 40 }}>{JSON.stringify(wheel, null, '  ')}</pre>
    </div>
  )
}
