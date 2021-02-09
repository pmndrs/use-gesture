import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.module.css'

export default function Two() {
  const [style, set] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotateZ: 0 }))
  const [style2, set2] = useSpring(() => ({ x: 0, y: 0, scale: 1, rotateZ: 0 }))

  const bind = useGesture(
    {
      onDrag: ({ event, down, movement: [x, y], _bounds, touches, initial, _initial }) => {
        console.log(touches)
        set({ x, y })
      },
      onTouchStart: ({ event }) => console.log('start', event.nativeEvent),
      onTouchEnd: ({ event }) => console.log('end', event.nativeEvent),
      // onPinch: ({ offset: [d, a], _bounds }) => {
      //   set({ scale: 1 + d / 200, rotateZ: a })
      // },
    },
    {
      drag: {
        useTouch: true,
        initial: () => {
          return [style.x.get(), style.y.get()]
        },
      },
    }
  )

  const bind2 = useGesture(
    {
      onDrag: ({ _pointerId, down, offset: [x, y] }) => {
        // set2({ scale: down ? 1.2 : 1, x, y })
      },
      onPinch: ({ movement: [d, a], turns, touches }) => {
        // console.log({ d, a, turns, touches })
        set2({ scale: d / 100, rotateZ: a })
      },
    },
    {
      pinch: {
        initial: () => {
          console.log('Initial movement angle', style2.rotateZ.get())
          console.log('Initial movement distance', 100 * style2.scale.get())
          return [100 * style2.scale.get(), style2.rotateZ.get()]
        },
      },
    }
  )

  return (
    <div className="flex">
      <animated.div {...bind()} className={styles.drag} style={style}></animated.div>
      <animated.div {...bind2()} className={styles.drag} style={{ ...style2, background: 'hotpink' }}></animated.div>
    </div>
  )
}
