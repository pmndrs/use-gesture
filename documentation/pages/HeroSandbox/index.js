import React, { useState, useRef } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'
import { toast } from 'react-toastify'
import cn from 'classnames'
import { Leva, useControls } from 'leva'
import { tweaks } from './data'

import 'react-toastify/dist/ReactToastify.css'
import styles from './hero.module.css'

toast.configure({ position: 'bottom-right', pauseOnHover: false, draggable: false })

const _config = {
  stiff: { tension: 200, friction: 20 },
  soft: config.default
}

export default function Hero() {
  const [shadow, setShadow] = useState(false)
  const ref = useRef()
  const rect = useRef({})
  const prevAngleTurns = useRef([135, 0])

  const { threshold, activateBounds, vertical, horizontal, rubberband, ...rest } = useControls(tweaks)
  const [top, bottom] = vertical
  const [left, right] = horizontal

  const [props, api] = useSpring(() => ({ x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 0.8 }))

  const rotX = (py) => (py - props.y.get() - rect.current.y - rect.current.height / 2) / 5
  const rotY = (px) => -(px - props.x.get() - rect.current.x - rect.current.width / 2) / 5

  const defaultBgShine = () => {
    prevAngleTurns.current[0] = 135
    return `linear-gradient(${
      prevAngleTurns.current[0] - 360 * prevAngleTurns.current[1]
    }deg,rgba(255,255,255,0.25) 0%,rgba(255, 255, 255, 0) 60%)`
  }

  const bgShine = (px, py) => {
    const cx = rect.current.x + rect.current.width / 2
    const cy = rect.current.y + rect.current.height / 2
    // stolen from https://codesandbox.io/s/m434428q5y
    const arad = Math.atan2(py - cy, px - cx)
    const rawAngle = (arad * 180) / Math.PI - 90 // convert rad to degrees
    const [prevAngle, prevTurns] = prevAngleTurns.current

    const delta_a = rawAngle - prevAngle
    const turns = Math.abs(delta_a) > 270 ? prevTurns + Math.sign(delta_a) : prevTurns
    const angle = rawAngle - 360 * turns
    prevAngleTurns.current = [rawAngle, turns]

    const intensity = ((py - rect.current.y) / rect.current.height) * 0.6 + 0.2

    return `linear-gradient(${angle}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 80%)`
  }

  const yText = (py) => {
    const cy = rect.current.y + rect.current.height / 2
    return -((py - cy) / rect.current.height) * 10
  }

  const xText = (px) => {
    const cx = rect.current.x + rect.current.width / 2
    return -((px - cx) / rect.current.width) * 10
  }

  const defaultText = { x: 0, y: 0, scale: 1 }
  const [shine, apiShine] = useSpring(() => ({ background: defaultBgShine() }))
  const [text, apiText] = useSpring(() => defaultText)

  const reapiShineAndText = () => {
    apiShine.start({ background: defaultBgShine() })
    apiText.start(defaultText)
  }

  const bind = useGesture(
    {
      onDrag: ({ hovering, tap, swipe: [swipeX, swipeY], active, movement: [mx, my], offset: [x, y] }) => {
        if (tap) toast('Tap!')
        if (swipeX) toast(`Swipe ${swipeX > 0 ? 'Right' : 'Left'}`)
        if (swipeY) toast(`Swipe ${swipeY > 0 ? 'Bottom' : 'Top'}`)
        document.body.classList.toggle('dragged', active)

        if (active) {
          reapiShineAndText()
          api.start({
            x: x,
            y: y,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            config: _config.stiff
          })
          setShadow(true)
        } else {
          api.start({
            x: 0,
            y: 0,
            scale: hovering ? 0.9 : 0.8,
            config: _config.soft
          })
          setShadow(false)
        }
      },
      onHover: ({ dragging, active }) => {
        if (!dragging) {
          if (!active) reapiShineAndText()
          api.start({ scale: active ? 0.9 : 0.8, rotateX: 0, rotateY: 0 })
          setShadow(active)
        }
      },
      onMove: ({ dragging, hovering, first, xy: [px, py] }) => {
        if (first) rect.current = ref.current.getBoundingClientRect()
        if (!dragging && hovering) {
          api.start({ rotateX: rotX(py), rotateY: rotY(px) })
          apiText.start({ y: yText(py), x: xText(px), scale: 1.6 })
          apiShine.start({ background: bgShine(px, py) })
        }
      }
    },
    {
      drag: {
        ...rest,
        threshold: [threshold, threshold],
        bounds: activateBounds ? { bottom, right, left, top } : undefined,
        rubberband: activateBounds ? rubberband : 0,
        from: () => [props.x.get(), props.y.get()]
      }
    }
  )

  return (
    <div className={styles.header}>
      <div className={styles.gui}>
        <Leva theme={{ sizes: { controlWidth: '140px' } }} flat fill titleBar={false} />
      </div>
      <div className={styles.bg}>React UseGesture</div>
      <div className={styles.wrapper}>
        {activateBounds && (
          <div
            className={styles.bounds}
            style={{
              width: right - left + 240,
              height: bottom - top + 180,
              transform: `translate(${(right + left) / 2}px, ${(bottom + top) / 2}px)`
            }}
          ></div>
        )}
        <animated.div ref={ref} {...bind()} className={cn(styles.drag, { [styles.shadow]: shadow })} style={props}>
          <animated.div style={shine} />
          <animated.div style={text}>Drag me!</animated.div>
        </animated.div>
      </div>
    </div>
  )
}
