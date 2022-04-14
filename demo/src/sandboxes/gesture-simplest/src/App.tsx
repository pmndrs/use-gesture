import React from 'react'
import { useDrag } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'

import styles from './styles.module.css'

export default function App() {
  const [style, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(
    ({ active, offset: [x, y] }) => {
      api.start({
        x: active ? x : 0,
        y: active ? y : 0,
        scale: active ? 1.2 : 1
      })
    },
    { bounds: { left: -30 } }
  )

  return (
    <div className="flex fill center">
      <a.div tabIndex={-1} {...bind()} className={styles.drag} style={style} />
    </div>
  )
}
