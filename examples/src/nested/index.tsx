import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.module.css'

export default function Inner() {
  const [innerSpring, setInner] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const [spring, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))

  const bindInner = useDrag(
    ({ event, down, offset: [x, y] }) => {
      event.stopPropagation()
      console.log('hello2')

      setInner({ x, y, scale: down ? 1.2 : 1, immediate: key => key !== 'scale' })
    },
    { threshold: 100, triggerAllEvents: true }
  )

  const bind = useDrag(({ offset: [x, y] }) => {
    set({ x, y })
  })

  return (
    <div className="flex">
      <animated.div className={styles.drag} {...bind()} style={spring}>
        <animated.div {...bindInner()} style={innerSpring} />
      </animated.div>
    </div>
  )
}
