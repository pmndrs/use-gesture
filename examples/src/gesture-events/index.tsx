import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.module.css'

export default function GestureEvents() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotateZ: 0 }))
  const ref = React.useRef(null)

  useGesture(
    {
      onDrag: ({ event, offset: [x, y] }) => {
        event.preventDefault()
        set({ x, y })
      },
      onPinch: ({ event, offset: [d, a] }) => {
        event.preventDefault()
        set({ scale: 1 + d / 200, rotateZ: a })
      },
    },
    { domTarget: ref, eventOptions: { passive: false } }
  )

  return (
    <div className="flex">
      <animated.div ref={ref} className={styles.drag} style={style}>
        Drag and pinch
      </animated.div>
    </div>
  )
}
