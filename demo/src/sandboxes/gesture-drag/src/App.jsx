import React from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

export default function App() {
  const [style, api] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))
  const options = useControls({
    gesture: { options: ['offset', 'movement'] },
    touch: false,
    capture: true,
    lock: false
  })

  const bind = useDrag(({ active, ...state }) => {
    let [x, y] = state[options.gesture]

    if (options.lock) {
      const dx = window.innerWidth / 2 - 40
      const dy = window.innerHeight / 2 - 40
      x = ((x + Math.sign(x) * dx) % window.innerWidth) - Math.sign(x) * dx
      y = ((y + Math.sign(y) * dy) % window.innerHeight) - Math.sign(y) * dy
    }
    api.start({
      scale: active ? 1.2 : 1,
      x: active || options.gesture === 'offset' ? x : 0,
      y: active || options.gesture === 'offset' ? y : 0,
      immediate: options.lock
    })
  }, options)

  return (
    <div className="flex fill center">
      <a.div tabIndex="-1" {...bind()} className={styles.drag} style={style}>
        <div>child</div>
      </a.div>
      <div className={styles.hover} />
    </div>
  )
}
