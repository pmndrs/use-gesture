import { useState, useRef, useEffect } from 'react'
import { DragGesture } from '@use-gesture/vanilla'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

function Draggable() {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)

  const [color, setColor] = useState('black')
  const toggleColor = () => setColor((c) => (c === 'black' ? '#ec625c' : 'black'))

  const [coords, set] = useState({ x: 0, y: 0 })
  const dragGesture = useRef<DragGesture>()
  const [style, api] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))

  const options = useControls({
    enabled: true,
    gesture: { options: ['offset', 'movement'] },
    axis: { options: [undefined, 'x', 'y', 'lock'] },
    filterTaps: false,
    boundToParent: false
  })

  const pointerOptions = useControls('pointer', { touch: false, capture: true, lock: false, keys: true })

  useEffect(() => {
    dragGesture.current = new DragGesture(target.current!, ({ active, ...state }) => {
      // @ts-ignore
      let [x, y] = state[options.gesture]
      set({ x, y })

      if (pointerOptions.lock) {
        const dx = window.innerWidth / 2 - 40
        const dy = window.innerHeight / 2 - 40
        x = ((x + Math.sign(x) * dx) % window.innerWidth) - Math.sign(x) * dx
        y = ((y + Math.sign(y) * dy) % window.innerHeight) - Math.sign(y) * dy
      }
      api.start({
        scale: active ? 1.2 : 1,
        x: active || options.gesture === 'offset' ? x : 0,
        y: active || options.gesture === 'offset' ? y : 0,
        immediate: pointerOptions.lock
      })
    })
    return () => dragGesture.current?.destroy()
  }, [api, options.gesture, pointerOptions.lock])

  useEffect(() => {
    if (!dragGesture.current) return
    api.set({ scale: 1, x: 0, y: 0 })
    const { boundToParent, gesture, ...rest } = options
    dragGesture.current.setConfig({ ...rest, pointer: pointerOptions, ...(boundToParent && { bounds: ref }) })
  }, [api, options, pointerOptions])

  return (
    <>
      <a.div ref={target} tabIndex={-1} className={styles.drag} style={style}>
        <div onClick={toggleColor} style={{ backgroundColor: color }}>
          <span>vanilla</span>
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
