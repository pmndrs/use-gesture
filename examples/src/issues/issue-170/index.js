import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.module.css'

export default function Issue() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const [style2, set2] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))

  const bind = useGesture(
    {
      onDrag: ({ down, offset: [x, y], tap }) => {
        console.log({ tap })
        set({ scale: down ? 1.2 : 1, x, y })
      },
    },
    { drag: { filterTaps: true } }
  )

  const bind2 = useGesture({
    onDrag: ({ down, offset: [x, y], tap }) => {
      console.log('2', { tap })

      set2({ scale: down ? 1.2 : 1, x, y })
    },
  })

  return (
    <>
      <animated.div {...bind()} className={styles.drag} style={style}></animated.div>
      <animated.div {...bind2()} className={styles.drag} style={style2}></animated.div>
    </>
  )
}
