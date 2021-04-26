import React from 'react'
import { usePinch } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

export default function App() {
  const target = React.useRef()
  const [style, api] = useSpring(() => ({ scale: 1, rotate: 0 }))
  const options = useControls({
    gesture: { options: ['offset', 'movement'] }
  })

  usePinch(
    ({ active, ...state }) => {
      let [scale, angle] = state[options.gesture]

      api.start({
        rotate: active || options.gesture === 'offset' ? angle : 0,
        scale: active || options.gesture === 'offset' ? scale : 1
      })
    },
    { target, eventOptions: { passive: false } }
  )

  return (
    <div className="flex fill center">
      <a.div ref={target} className={styles.drag} style={style}>
        <div>child</div>
      </a.div>
    </div>
  )
}
