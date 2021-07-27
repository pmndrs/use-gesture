import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import styles from './styles.module.css'

export default function App() {
  const [props, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(({ event, active, movement: [x, y] }) => {
    event.preventDefault()
    api.start({
      x: active ? x : 0,
      y: active ? y : 0,
      scale: active ? 1.2 : 1,
      immediate: (k) => k !== 'scale' && active
    })
  })
  return (
    <div className="flex fill center">
      <animated.img
        className={styles.drag}
        src="https://images.unsplash.com/photo-1611149043085-c4d0a79304c6?&auto=format&fit=crop&w=400&q=80"
        {...bind()}
        style={props}
      />
    </div>
  )
}
