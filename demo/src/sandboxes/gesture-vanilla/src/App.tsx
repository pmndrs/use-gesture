import { useEffect, useState } from 'react'
import { Gesture } from '@use-gesture/vanilla'

export default function App() {
  const [wheel, setWheel] = useState({ direction: [0, 0], delta: [0, 0], _movement: [0, 0], offset: [0, 0] })
  useEffect(() => {
    const gesture = new Gesture(
      window,
      {
        onWheel: ({ event, direction, delta, _movement, offset }) => {
          event.preventDefault()
          setWheel({ direction, delta, _movement, offset })
        }
      },
      {
        eventOptions: { passive: false }
      }
    )
    return () => gesture.destroy()
  }, [])

  return (
    <div className="center fill">
      <pre style={{ position: 'fixed', padding: 40 }}>{JSON.stringify(wheel, null, '  ')}</pre>
    </div>
  )
}
