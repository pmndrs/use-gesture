import { useRef } from 'react'
import { useDrag } from '@use-gesture/react'

function TestDrag() {
  const bind = useDrag(({ offset: [x, y], event }) => {
    event.currentTarget.style.transform = `translate(${x}px,${y}px)`
  })

  return (
    <div
      {...bind()}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#ff0000',
        touchAction: 'none'
      }}
    />
  )
}
function TestNaiveDrag() {
  const dragging = useRef(false)
  const initial = useRef([0, 0])
  const px = useRef(0)
  const py = useRef(0)
  const x = useRef(0)
  const y = useRef(0)

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    initial.current = [e.clientX, e.clientY]
    px.current = x.current
    py.current = y.current
    dragging.current = true
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    x.current = px.current + e.clientX - initial.current[0]
    y.current = py.current + e.clientY - initial.current[1]
    e.currentTarget.style.transform = `translate(${x.current}px,${y.current}px)`
  }

  const onPointerUp = (e) => {
    dragging.current = false
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#00ff00',
        touchAction: 'none'
      }}
    />
  )
}

export default function App() {
  return (
    <div>
      <TestDrag />
      <TestNaiveDrag />
    </div>
  )
}
