import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { toast } from 'react-toastify'
import cn from 'classnames'
import GUI, { initialConfig } from './GUI'

import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.css'

toast.configure({
  position: 'bottom-right',
  pauseOnHover: false,
  draggable: false
})

export default function Hero() {
  const [config, setConfig] = useState(initialConfig)
  const [shadow, setShadow] = useState(false)
  const [dragging, setDragging] = useState(false)
  const ref = useRef(null)
  const rect = useRef({})
  const prevAngleTurns = useRef([135, 0])

  const {
    threshold,
    swipeDist,
    swipeVel,
    bounds,
    activateBounds,
    rubberband,
    ...rest
  } = config

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 0.8
  }))

  const rotX = py =>
    (py - props.y.get() - rect.current.y - rect.current.height / 2) / 5
  const rotY = px =>
    -(px - props.x.get() - rect.current.x - rect.current.width / 2) / 5

  const defaultBgShine = () => {
    prevAngleTurns.current[0] = 135
    return `linear-gradient(${prevAngleTurns.current[0] -
      360 *
        prevAngleTurns
          .current[1]}deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)`
  }

  const bgShine = (px, py) => {
    const cx = rect.current.x + rect.current.width / 2
    const cy = rect.current.y + rect.current.height / 2
    // stolen from https://codesandbox.io/s/m434428q5y
    const arad = Math.atan2(py - cy, px - cx)
    const rawAngle = (arad * 180) / Math.PI - 90 // convert rad to degrees
    const [prevAngle, prevTurns] = prevAngleTurns.current

    const delta_a = rawAngle - prevAngle
    const turns =
      Math.abs(delta_a) > 270 ? prevTurns + Math.sign(delta_a) : prevTurns
    const angle = rawAngle - 360 * turns
    prevAngleTurns.current = [rawAngle, turns]

    const intensity = ((py - rect.current.y) / rect.current.height) * 0.6 + 0.2

    return `linear-gradient(${angle}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 80%)`
  }

  const yText = py => {
    const cy = rect.current.y + rect.current.height / 2
    return -((py - cy) / rect.current.height) * 10
  }

  const xText = px => {
    const cx = rect.current.x + rect.current.width / 2
    return -((px - cx) / rect.current.width) * 10
  }

  const defaultText = { x: 0, y: 0, scale: 1 }
  const [shine, setShine] = useSpring(() => ({ background: defaultBgShine() }))
  const [text, setText] = useSpring(() => defaultText)

  const resetShineAndText = () => {
    setShine({ background: defaultBgShine() })
    setText(defaultText)
  }

  const bind = useGesture(
    {
      onDrag: ({
        hovering,
        delta,
        first,
        last,
        click,
        currentTarget,
        swipe: [swipeX, swipeY],
        down,
        elapsedTime,
        movement: [mx, my],
        offset: [x, y]
      }) => {
        if (click) toast('Click!')
        if (swipeX) toast(`Swipe ${swipeX > 0 ? 'Right' : 'Left'}`)
        if (swipeY) toast(`Swipe ${swipeY > 0 ? 'Bottom' : 'Top'}`)
        if (down) {
          resetShineAndText()
          set({ x: mx, y: my, scale: 1, rotateX: 0, rotateY: 0 })
          setDragging(true)
          setShadow(true)
        } else {
          set({
            x: 0,
            y: 0,
            scale: hovering ? 0.9 : 0.8,
            onRest: () => setDragging(false)
          })
          setShadow(false)
        }
      },
      onHover: ({ active }) => {
        if (!dragging) {
          if (!active) resetShineAndText()
          set({ scale: active ? 0.9 : 0.8, rotateX: 0, rotateY: 0 })
          setShadow(active)
        }
      },
      onMove: ({ first, xy: [px, py] }) => {
        if (first) rect.current = ref.current.getBoundingClientRect()
        if (!dragging) {
          set({ rotateX: rotX(py), rotateY: rotY(px) })
          setText({ y: yText(py), x: xText(px), scale: 1.6 })
          setShine({ background: bgShine(px, py) })
        }
      }
    },
    {
      drag: {
        ...rest,
        swipeVelocity: [swipeVel, swipeVel],
        swipeDistance: [swipeDist, swipeDist],
        threshold: threshold < 0 ? undefined : [threshold, threshold],
        bounds: activateBounds ? bounds : undefined,
        rubberband: activateBounds ? rubberband : 0
      }
    }
  )

  return (
    <>
      <GUI
        data={config}
        onUpdate={setConfig}
        style={{ position: 'absolute', zIndex: 100 }}
      />
      <div className={styles.wrapper}>
        {activateBounds && (
          <div
            className={styles.bounds}
            style={{
              width: bounds.right - bounds.left,
              height: bounds.bottom - bounds.top,
              transform: `translate3d(${bounds.left}, ${bounds.top})`
            }}
          ></div>
        )}
        <animated.div
          ref={ref}
          {...bind()}
          className={cn(styles.drag, { [styles.shadow]: shadow })}
          style={props}
        >
          <animated.div style={shine} />
          <animated.div style={text}>Drag me!</animated.div>
        </animated.div>
      </div>
    </>
  )
}
