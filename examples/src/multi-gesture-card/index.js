import React from 'react'
import { useSpring, animated, to } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'
import imgs from './imgs'

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20

const wheel = y => {
  const imgHeight = window.innerWidth * 0.3 - 20
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`
}

export default function Card() {
  const root = React.useRef(null)
  const domTarget = React.useRef(null)
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, set] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  )

  const [{ wheelY }, setWheel] = useSpring(() => ({ wheelY: 0 }))
  const [drag, setDrag] = React.useState(false)

  const bind = useGesture(
    {
      onDragStart: () => setDrag(true),
      onDrag: ({ offset: [x, y] }) => {
        console.log('dragging')
        set({ x, y, rotateX: 0, rotateY: 0, scale: 1 })
      },
      onDragEnd: () => setDrag(false),
      onPinch: ({ active, offset: [d, a] }) => {
        console.log(active, d)
        set({ zoom: d / 200, rotateZ: a, immediate: active })
      },
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        set({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.1,
        }),
      onHover: ({ hovering }) => {
        !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 }),
          console.log({ hovering })
      },
      onWheel: ({ active, offset: [, y] }) => {
        setWheel({ wheelY: y, immediate: active })
      },
      onMouseEnter: e => console.log('mouseover'),
    },
    {
      domTarget,
      eventOptions: { passive: false },
      // pinch: { distanceBounds: { min: 0, max: 100 }, rubberband: true },
      // wheel: { bounds: { bottom: 0 }, rubberband: true },
    }
  )

  React.useEffect(bind, [bind])

  // React.useEffect(() => {
  //   root.current.addEventListener('gesturestart', e => e.preventDefault(), {
  //     passive: false,
  //   })
  //   return () =>
  //     root.current.removeEventListener(
  //       'gesturestart',
  //       e => e.preventDefault(),
  //       { passive: false }
  //     )
  // }, [])

  return (
    <div ref={root} className="multi-gesture-card flex-content">
      <animated.div
        ref={domTarget}
        className={`${drag ? 'dragging' : ''}`}
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}>
        <animated.div style={{ transform: wheelY.to(wheel) }}>
          {imgs.map((img, i) => (
            <div key={i} style={{ backgroundImage: `url(${img})` }} />
          ))}
        </animated.div>
      </animated.div>
    </div>
  )
}
