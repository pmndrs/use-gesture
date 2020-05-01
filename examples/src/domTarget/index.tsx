import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

export default function Simple() {
  const domTarget = React.useRef(null)
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  useDrag(
    ({ movement: [mx, my], down }) => {
      set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    },
    { domTarget }
  )

  // React.useEffect(bind, [bind]) <-- shows deprecation notics

  return (
    <div className={`${styles.simple} flex`}>
      <animated.div ref={domTarget} style={{ x, y }} />
    </div>
  )
}
