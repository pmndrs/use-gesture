import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.module.css'

export default function GestureEvents() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotateZ: 0 }))
  const ref = React.useRef(null)
  const [dragState, setDragState] = React.useState('No')
  const [pinchState, setPinchState] = React.useState('No')
  const [log, setLog] = React.useState('still')

  useGesture(
    {
      onDrag: ({ pinching, dragging, cancel, canceled, event, offset: [x, y] }) => {
        if (canceled) return setDragState('Canceled')
        if (pinching) return cancel()
        setDragState(dragging ? 'Yes' : 'No')
        setLog(dragging ? 'dragging' : 'still')
        set({ x, y })
      },
      onPinch: ({ _pointerIds, touches, pinching, offset: [d, a] }) => {
        setPinchState(pinching ? 'Yes' : 'No')
        set({ scale: 1 + d / 200, rotateZ: a })
      },
    },
    { domTarget: ref, eventOptions: { passive: false }, drag: { threshold: 3 } }
  )

  return (
    <div className="flex">
      <animated.div ref={ref} className={styles.drag} style={style}>
        <span id="drag">Drag: {dragState}</span>
        <span id="pinch">Pinch: {pinchState}</span>
      </animated.div>
    </div>
  )
}
