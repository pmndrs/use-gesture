import { useRef } from 'react'
import { useGesture } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'

import styles from './styles.module.css'

const data: [string, [number, number]][] = [
  ['steelblue', [0.5, 1]],
  ['hotpink', [1, 0.8]],
  ['coral', [1, 1]]
]

export default function App() {
  const hovering = useRef(false)
  const [props, api] = useSpring(() => ({
    x: 0,
    y: 0,
    backgroundColor: '#ffffff00',
    opacity: 1,
    scale: [1, 1]
  }))

  const bind = useGesture({
    onMove: ({ xy: [x, y] }) => api.start({ x, y }),
    onHover: ({ active, xy: [x, y], args: [backgroundColor, scale] }) => {
      if (active) {
        if (!hovering.current) {
          props.x.set(x)
          props.y.set(y)
        }
        hovering.current = true
        api.start({ opacity: 1, backgroundColor, scale })
      } else api.start({ opacity: 0, onRest: () => (hovering.current = false) })
    }
  })

  return (
    <div className={`flex fill center ${styles.container}`}>
      {/* @ts-ignore */}
      <a.div style={props} />
      {data.map(([color, scale], i) => (
        <a key={i} href="#link" {...bind(color, scale)}>
          This link is <span style={{ color }}>{color}</span>
        </a>
      ))}
    </div>
  )
}
