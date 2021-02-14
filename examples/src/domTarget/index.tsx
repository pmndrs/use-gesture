import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag, useGesture } from 'react-use-gesture'
import styles from './styles.css'

export default function DomTarget() {
  const [id, setId] = React.useState(0)
  const domTarget = React.useRef(null)
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))

  useGesture(
    {
      onDrag: ({ movement: [mx, my], down }) => {
        console.log({ id })
        set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
      },
      onPointerEnter: state => console.log({ state, id }),
    },
    { domTarget }
  )

  // React.useEffect(bind, [bind]) <-- shows deprecation notice

  return (
    <div className={`${styles.simple} flex`}>
      <button onClick={() => setId(v => v + 1)}>Increment</button>
      <animated.div ref={domTarget} style={{ x, y }} />
    </div>
  )
}
