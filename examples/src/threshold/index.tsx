import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import styles from './styles.css'

export default function Threshold() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0, immediate: true }))
  const [props, setL] = useSpring(() => ({ x: 0, y: 0, opacity: 0, immediate: true }))

  const [movX, setMovX] = React.useState(false)
  const [movY, setMovY] = React.useState(false)

  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    },
    { threshold: 100 }
  )

  const bindL = useDrag(({ down, movement: [mx, my] }) => {
    if (!down) {
      setMovX(false)
      setMovY(false)
      setL({ x: 0, y: 0, opacity: 0 })
      return
    }
    setL({ opacity: 1 })
    if (Math.abs(mx) >= 100) setMovX(true)
    else if (!movX) setL({ x: mx })
    if (Math.abs(my) >= 100) setMovY(true)
    else if (!movY) setL({ y: my })
  })

  const th = (index: number) => (v: number) => {
    const displ = Math.floor(100 - Math.abs(v))
    const axis = index === 0 ? 'x: ' : 'y: '
    const m = index === 0 ? movX : movY
    if (displ > 0 && !m) return axis + `${displ} px`
    return axis + 'moves!'
  }

  return (
    <div className="flex">
      <animated.div className={styles.drag} {...bind()} style={{ x, y }}>
        <animated.div {...bindL()} style={props}>
          <div>
            <animated.div style={{ color: movX ? 'red' : 'black' }}>{props.x.to(th(0))}</animated.div>
            <animated.div style={{ color: movY ? 'blue' : 'black' }}>{props.y.to(th(1))}</animated.div>
          </div>
        </animated.div>
      </animated.div>
    </div>
  )
}
