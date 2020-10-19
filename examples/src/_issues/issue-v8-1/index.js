import React from 'react'
import { usePinch } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
import styles from './styles.module.css'

export default function Issue() {
  const domTarget = React.useRef(null)
  const [style, set] = useSpring(() => ({ rotate: 0, scale: 1, transformOrigin: '100px 100px' }))

  const bind = usePinch(({ event, origin, first, offset: [d, a] }) => {
    if (first) {
      const { layerX, layerY } = event.nativeEvent
      // set({ transformOrigin: `${layerX}px ${layerY}px` })
    }
    console.log({ origin })
    set({ scale: 1 + d / 200, rotate: a })
  })

  return (
    <div className="flex">
      <animated.div {...bind()} className={styles.drag} ref={domTarget} style={style} />
    </div>
  )
}
