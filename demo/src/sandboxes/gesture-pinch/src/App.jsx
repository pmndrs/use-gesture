import React, { useEffect } from 'react'
import { usePinch } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'
import { useControls } from 'leva'

import styles from './styles.module.css'

export default function App() {
  const target = React.useRef()
  const [style, api] = useSpring(() => ({ scale: 1, rotate: 0 }))
  const { gesture, touch, ...rest } = useControls({
    gesture: { options: ['offset', 'movement'] },
    touch: false,
    axis: { options: [undefined, 'lock'] }
  })

  useEffect(() => {
    const handler = (e) => e.preventDefault()
    document.addEventListener('gesturestart', handler)
    document.addEventListener('gesturechange', handler)
    document.addEventListener('gestureend', handler)
    return () => {
      document.removeEventListener('gesturestart', handler)
      document.removeEventListener('gesturechange', handler)
      document.removeEventListener('gestureend', handler)
    }
  }, [])

  usePinch(
    ({ active, turns, ...state }) => {
      const [scale, angle] = state[gesture]
      api.start({
        scale: active || gesture === 'offset' ? scale : 1,
        rotate: active || gesture === 'offset' ? angle : 0
      })
    },
    { target, eventOptions: { passive: false }, pointer: { touch }, ...rest }
  )

  return (
    <div className="flex fill center">
      <a.div ref={target} className={styles.drag} style={style}>
        <div>
          <div>child3</div>
        </div>
        <div>child2</div>
      </a.div>
    </div>
  )
}
