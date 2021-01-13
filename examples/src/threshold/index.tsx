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
    ({ _movement: [mx, my], _intentional: [ix, iy], down, movement: [x, y], intentional }) => {
      if (intentional) {
        set({ x: down ? x : 0, y: down ? y : 0, immediate: down })
      }
      if (!down) {
        setMovX(false)
        setMovY(false)
        setL({ x: 0, y: 0, opacity: 0 })
      } else {
        setL({ opacity: 1 })
        ix ? setMovX(true) : setL({ x: mx })
        iy ? setMovY(true) : setL({ y: my })
      }
    },
    { threshold: 100, triggerAllEvents: true, transform: xy => [xy[0] / 2, xy[1] / 2] }
  )

  const th = (index: number) => (v: number) => {
    const displ = Math.floor(100 - Math.abs(v))
    const axis = index === 0 ? 'x: ' : 'y: '
    const m = index === 0 ? movX : movY
    if (displ > 0 && !m) return axis + `${displ} px`
    return axis + 'moves!'
  }

  return (
    <div className="flex" style={{ transform: 'scale(2)' }}>
      <animated.div className={styles.drag} {...bind()} style={{ x, y }}>
        <animated.div style={props}>
          <div>
            <animated.div style={{ color: movX ? 'red' : 'black' }}>{props.x.to(th(0))}</animated.div>
            <animated.div style={{ color: movY ? 'blue' : 'black' }}>{props.y.to(th(1))}</animated.div>
          </div>
        </animated.div>
      </animated.div>
    </div>
  )
}
