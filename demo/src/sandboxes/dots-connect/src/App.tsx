import React, { useState, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import styles from './styles.module.css'

export default function App() {
  const targetRef = useRef(null)
  const [{ x2, y2 }, api] = useSpring(() => ({ x2: 0, y2: 0 }))
  const [dragging, setDragging] = useState(false)
  const [attached, setAttached] = useState(false)

  const bind = useDrag(({ xy: [x, y], active, last, movement: [mx, my] }) => {
    setDragging(active)
    setAttached(document.elementFromPoint(x, y) === targetRef.current)
    if (last) {
      api.start({ x2: attached ? 300 : 0, y2: 0 })
    } else {
      api.start({ x2: mx, y2: my, immediate: true })
    }
  })

  return (
    <div className="flex fill center">
      <svg className={styles.svg} viewBox="-14.5 -14.5 328 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <animated.line x1="0" y1="0" x2={x2} y2={y2} stroke="hotpink" strokeLinecap="square" strokeWidth="2" />
        <circle className={styles.from} {...bind()} fill="hotpink" cx="0" cy="0" r="12" />
        <circle ref={targetRef} className={styles.target} cx="300" cy="0" r="12" fill={attached ? 'hotpink' : 'blue'} />
      </svg>
      <div className={styles.status}>
        {attached
          ? dragging
            ? 'You can release the pointer'
            : 'Dots are connected!'
          : 'Connect the pink dot to the blue dot'}
      </div>
    </div>
  )
}
