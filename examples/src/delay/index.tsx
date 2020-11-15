import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

export default function Delay() {
  const [{ x, y, scale }, set] = useSpring(() => ({ x: 0, y: 0, scale: 1, immediate: true }))

  const bind = useDrag(
    ({ down, movement: [x, y] }) => {
      set({ x: down ? x : 0, y: down ? y : 0, scale: down ? 1.2 : 1, immediate: k => k !== 'scale' && down })
    }
    // { delay: 1000 }
  )

  return (
    <div className="flex">
      <animated.div className={styles.drag} {...bind()} style={{ x, y, scale }} />
    </div>
  )
}
