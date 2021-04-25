import React from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

function Draggable() {
  const ref = React.useRef()

  const [color, setColor] = React.useState('black')
  const toggleColor = () => setColor((c) => (c === 'black' ? '#ec625c' : 'black'))

  const [style, api] = useSpring(() => ({ scale: 1, x: 50, y: 50 }))
  const [coords, set] = React.useState({ x: style.x.get(), y: style.y.get() })

  const { boundToParent, gesture, ...options } = useControls({
    enabled: true,
    gesture: { options: ['offset', 'movement'] },
    axis: { options: [undefined, 'x', 'y', 'lock'] },
    filterTaps: false,
    boundToParent: false
  })

  const pointerOptions = useControls('pointer', { touch: false, capture: true, lock: false })

  const bind = useDrag(
    ({ active, tap, ...state }) => {
      let [x, y] = state[gesture]
      set({ x, y })

      if (pointerOptions.lock) {
        const dx = window.innerWidth / 2 - 40
        const dy = window.innerHeight / 2 - 40
        x = ((x + Math.sign(x) * dx) % window.innerWidth) - Math.sign(x) * dx
        y = ((y + Math.sign(y) * dy) % window.innerHeight) - Math.sign(y) * dy
      }
      api.start({
        scale: active ? 1.2 : 1,
        x: active || gesture === 'offset' ? x : 0,
        y: active || gesture === 'offset' ? y : 0,
        immediate: pointerOptions.lock
      })
    },
    {
      ...options,
      pointer: pointerOptions,
      ...(boundToParent && { bounds: ref }),
      from: () => [style.x.get(), style.y.get()]
    }
  )

  return (
    <>
      <a.div tabIndex="-1" {...bind()} className={styles.drag} style={style}>
        <div onClick={toggleColor} style={{ backgroundColor: color }}>
          <span>bind</span>
          <span>
            x:{Math.round(coords.x)}, y:{Math.round(coords.y)}
          </span>
        </div>
      </a.div>
      <div ref={ref} className={styles.hover} />
    </>
  )
}

export default function App() {
  const { shown } = useControls({ shown: true })
  return <div className="flex fill center">{shown && <Draggable />}</div>
}
