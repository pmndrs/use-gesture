import React from 'react'
import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

const colors = ['lightcoral', 'cadetblue', 'mediumpurple', 'darkorange']

export default function TouchAction() {
  const [springs, set] = useSprings(colors.length, i => ({
    x: 0,
    opacity: 1,
    moving: false,
    background: colors[i],
  }))
  const bind = useDrag(
    ({ active, intentional, movement: [x], args: [index] }) => {
      if (intentional) {
        set(
          i =>
            i === index && {
              x: active ? x : 0,
              moving: active,
              opacity: active ? 0.6 : 1,
              immediate: k => active && k !== 'opacity',
            }
        )
      }
    },
    { axis: 'x', threshold: [30, 0] }
  )

  return (
    <div className={`${styles.touchAction} flex`}>
      {springs.map(({ moving, ...style }, i) => (
        <animated.div key={i} className={styles.drag} {...bind(i)} style={{ ...style, touchAction: 'pan-y' }}>
          {moving.to(m => (m ? 'body scroll is frozen' : '← Drag me →'))}
        </animated.div>
      ))}
    </div>
  )
}
