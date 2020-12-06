import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.css'

export default function Pinch() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, rotateZ: 0, scale: 1 }))
  const domTarget = React.useRef<HTMLDivElement>(null)

  // React.useEffect(() => {
  //   domTarget.current.requestPointerLock()
  // }, [])

  const bind = useGesture({
    onDrag: ({ first, last, offset: [x, y] }) => {
      if (first) domTarget.current!.requestPointerLock()
      if (last) document.exitPointerLock()
      set({ x, y })
    },
    onPinch: ({ last, offset: [d, a] }) => {
      if (last) console.log('last pinch')
      set({ scale: 1 + d / 200, rotateZ: a })
    },
  })

  return (
    <>
      <div className={`${styles.simple} flex`}>
        <animated.div ref={domTarget} {...bind()} style={style} />
      </div>
    </>
  )
}
