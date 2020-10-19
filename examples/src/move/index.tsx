import React, { useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.css'

const data: [string, [number, number]][] = [
  ['steelblue', [0.5, 1]],
  ['hotpink', [1, 0.8]],
  ['coral', [1, 1]],
]

export default function Move() {
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    backgroundColor: '#ffffff00',
    opacity: 0,
    scale: 1,
  }))

  const hovering = useRef(false)

  const bind = useGesture<{ move: Event; onClick: string }>({
    onDrag: ({ event }) => console.log(event),
    onMove: ({ xy: [x, y] }) => set({ x, y }),
    onHover: ({ active, xy: [x, y], args: [backgroundColor, scale] }) => {
      if (active) {
        if (!hovering.current) {
          props.x.set(x)
          props.y.set(y)
        }
        hovering.current = true
        set({ opacity: 1, backgroundColor, scale })
      } else set({ opacity: 0, onRest: () => (hovering.current = false) })
    },
    onClick: ({ event }) => console.log(event),
  })

  return (
    <div className={`${styles.move} flex`}>
      <animated.div style={props} />
      {data.map(([color, scale], i) => (
        <a key={i} href="#link" {...bind(color, scale)}>
          This link is <span style={{ color }}>{color}</span>
        </a>
      ))}
    </div>
  )
}
