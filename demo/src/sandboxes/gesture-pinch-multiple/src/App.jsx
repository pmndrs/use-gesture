import React, { useEffect } from 'react'
import { useGesture } from '@use-gesture/react'
import { a, useSpring } from '@react-spring/web'

import styles from './styles.module.css'

export default function Two() {
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

  const [style1, api1] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotate: 0 }))
  const [style2, api2] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotate: 0 }))

  const bind1 = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      api1.start({ x, y })
    },
    onPinch: ({ offset: [s, a] }) => {
      api1.start({ scale: s, rotate: a })
    }
  })

  const bind2 = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      api2.start({ x, y })
    },
    onPinch: ({ offset: [s, a] }) => {
      api2.start({ scale: s, rotate: a })
    }
  })

  return (
    <div className="flex fill center">
      <a.div {...bind1()} className={styles.drag} style={style1}></a.div>
      <a.div {...bind2()} className={styles.drag} style={{ ...style2, background: 'hotpink' }}></a.div>
    </div>
  )
}
