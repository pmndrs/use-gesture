import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styles from './styles.css'

document.addEventListener('gesturestart', e => e.preventDefault())
document.addEventListener('gesturechange', e => e.preventDefault())

export default function Pinch() {
  const [style1, set1] = useSpring(() => ({ x: 0, y: 0, rotateZ: 0, scale: 1 }))
  const [style2, set2] = useSpring(() => ({ x: 0, y: 0, rotateZ: 0, scale: 1 }))
  const domTarget1 = React.useRef(null)
  const domTarget2 = React.useRef(null)

  const bind1 = useGesture(
    {
      // onHover: ({ hovering }) => {
      //   set({ scale: hovering ? 1.3 : 1 })
      // },
      onDrag: ({ offset: [x, y] }) => {
        set1({ x, y })
      },
      onPinch: ({ offset: [d, a] }) => {
        set1({ scale: 1 + d / 200, rotateZ: a })
      },
    }
    // { domTarget: domTarget1 }
  )

  const bind2 = useGesture(
    {
      // onHover: ({ hovering }) => {
      //   set({ scale: hovering ? 1.3 : 1 })
      // },
      onDrag: ({ offset: [x, y] }) => {
        set2({ x, y })
      },
      onPinch: ({ offset: [d, a] }) => {
        set2({ scale: 1 + d / 200, rotateZ: a })
      },
    }
    // { domTarget: domTarget2 }
  )

  return (
    <div className={`${styles.simple} flex`}>
      <animated.div id="one" ref={domTarget1} {...bind1()} style={style1} />
      <animated.div id="two" ref={domTarget2} {...bind2()} style={style2} />
    </div>
  )
}
