import React, { Suspense, useState, useEffect, useRef } from 'react'
import { useSpring, useSprings, animated, to } from 'react-spring'
import { a as a3f } from '@react-spring/three'
import { Canvas, useThree } from 'react-three-fiber'
import { useTexture } from '@react-three/drei'
import { useDrag, useScroll, useGesture, useWheel } from 'react-use-gesture'
import { Lethargy } from 'lethargy'
import cn from 'classnames'
import * as THREE from 'three'

import styles from './styles.module.css'

export function EasterDiv({ children }) {
  const [{ x, y, live }, set] = useSpring(() => ({ x: 0, y: 0, live: false }))

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    document.body.classList.toggle('dragged', down)
    set({ x: down ? mx : 0, y: down ? my : 0, live: down })
  })

  return (
    <animated.span className={styles.easter} {...bind()} style={{ x, y, zIndex: live.to(a => (a ? 10000 : 0)) }}>
      {children}
    </animated.span>
  )
}

export function PullRelease({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    setActive && setActive(down)
    set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  })
  return <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
}

export function Offset({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ down, offset: [x, y] }) => {
    setActive && setActive(down)
    set({ x, y })
  })
  return <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
}

export function Cancel({ setActive }) {
  const [{ x, bg }, set] = useSpring(() => ({ x: 0, bg: 'cornflowerblue' }))
  const bind = useDrag(({ down, movement: [mx], cancel, canceled }) => {
    setActive && setActive(down)
    if (mx > 200) cancel()
    set({
      x: down ? mx : 0,
      bg: canceled ? 'lightpink' : 'cornflowerblue',
      immediate: down,
    })
  })

  return (
    <>
      <div className={styles.cancelLimit} />
      <animated.div className={styles.drag} {...bind()} style={{ x, background: bg }} />
    </>
  )
}

export function Swipe({ setActive }) {
  const [position, setPosition] = useState(0)
  const space = 100

  const { x } = useSpring({ x: position * space })
  const bind = useDrag(({ movement, down, swipe: [swipeX], vxvy }) => {
    setPosition(p => Math.min(Math.max(-1, p + swipeX), 1))
    setActive && setActive(down)
  })

  return (
    <>
      <div
        className={cn(styles.square, { [styles.active]: position === -1 })}
        style={{ transform: `translateX(-${space}px) scale(1.1)` }}
      />
      <div className={cn(styles.square, { [styles.active]: position === 0 })} />
      <div
        className={cn(styles.square, { [styles.active]: position === 1 })}
        style={{ transform: `translateX(${space}px) scale(1.1)` }}
      />
      <animated.div className={styles.drag} {...bind()} style={{ x, touchAction: 'auto' }} />
    </>
  )
}

export function DomTarget() {
  const [{ width }, set] = useSpring(() => ({ width: '0%' }))
  useScroll(
    ({ xy: [, y] }) => {
      set({ width: (y / document.documentElement.scrollHeight) * 100 + '%' })
    },
    { domTarget: typeof window === 'object' ? window : null }
  )

  return <animated.div className={styles.scroll} style={{ width }} />
}

export function Initial({ setActive }) {
  const [usingInitial, setUsingInitial] = useState(true)
  const [{ x }, set] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      setActive && setActive(down)
      set({ x: down ? mx : 0, immediate: down, config: { duration: 3000 } })
    },
    {
      initial: usingInitial ? () => [x.get(), 0] : [0, 0],
    }
  )
  return (
    <>
      <div className={styles.ui}>
        <label>
          <input type="checkbox" checked={usingInitial} onChange={e => setUsingInitial(e.target.checked)} />
          Use initial
        </label>
      </div>
      <animated.div className={styles.drag} {...bind()} style={{ x }} />
    </>
  )
}

export function Threshold({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const [props, setL] = useSpring(() => ({ x: 0, y: 0, opacity: 0 }))

  const [movX, setMovX] = useState(false)
  const [movY, setMovY] = useState(false)

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
    { threshold: 100, triggerAllEvents: true }
  )

  const th = index => v => {
    const displ = Math.floor(100 - Math.abs(v))
    const axis = index === 0 ? 'x: ' : 'y: '
    const m = index === 0 ? movX : movY
    if (displ > 0 && !m) return axis + `${displ} px`
    return axis + 'moves!'
  }

  return (
    <>
      <animated.div className={styles.drag} {...bind()} style={{ x, y }}>
        <animated.div style={props}>
          <div>
            <animated.div style={{ color: movX ? 'red' : 'black' }}>{props.x.to(th(0))}</animated.div>
            <animated.div style={{ color: movY ? 'blue' : 'black' }}>{props.y.to(th(1))}</animated.div>
          </div>
        </animated.div>
      </animated.div>
    </>
  )
}

const bounds = { left: -85, right: 85, top: -50, bottom: 50 }

export function Bounds({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) => {
      setActive && setActive(down)
      set({ x: ox, y: oy, immediate: down })
    },
    { bounds }
  )
  return (
    <>
      <div className={styles.limits} />
      <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
    </>
  )
}

const xBounds = [bounds.left, bounds.right]
const yBounds = [bounds.top, bounds.bottom]
const limitFn = (b, y) =>
  b.reduce(
    (acc, v) =>
      Math.max(
        acc,
        y !== 0 && Math.sign(v) === Math.sign(y) && Math.sign(v - y) !== Math.sign(y) ? Math.abs(v - y) : 0
      ),
    0
  )

const closestLimit = (x, y) => Math.max(limitFn(xBounds, x), limitFn(yBounds, y))

export function Rubberband({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) => {
      setActive && setActive(down)
      set({ x: ox, y: oy, immediate: down })
    },
    { bounds, rubberband: true }
  )
  return (
    <>
      <animated.div
        className={styles.limits}
        style={{
          background: to([x, y], closestLimit).to([0, 100], ['transparent', 'blue']),
        }}
      />
      <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
    </>
  )
}

export function Axis({ setActive }) {
  const [axis, setAxis] = useState('x')
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      setActive && setActive(down)
      set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    },
    { axis: axis === 'false' ? undefined : axis }
  )

  return (
    <>
      <div className={cn(styles.ui, styles.horizontal)}>
        <label>
          <input type="radio" checked={axis === 'x'} value="x" onChange={e => setAxis(e.target.value)} />X axis
        </label>
        <label>
          <input type="radio" checked={axis === 'y'} value="y" onChange={e => setAxis(e.target.value)} />Y axis
        </label>
        <label>
          <input type="radio" checked={axis === 'false'} value="false" onChange={e => setAxis(e.target.value)} />
          No axis lock
        </label>
      </div>
      <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
    </>
  )
}

export function Axis2({ setActive }) {
  const [axis, setAxis] = useState('false')
  const [{ x }, set] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      setActive && setActive(down)
      set({ x: down ? mx : 0, immediate: down })
    },
    { axis: axis === 'false' ? undefined : axis }
  )

  return (
    <>
      <div className={cn(styles.ui, styles.horizontal)}>
        <label>
          <input type="radio" checked={axis === 'x'} value="x" onChange={e => setAxis(e.target.value)} />X axis
        </label>
        <label>
          <input type="radio" checked={axis === 'false'} value="false" onChange={e => setAxis(e.target.value)} />
          No axis lock
        </label>
      </div>
      <animated.div className={styles.drag} {...bind()} style={{ x }} />
    </>
  )
}

export function LockDirection({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ down, movement: [mx, my] }) => {
      setActive && setActive(down)
      set({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    },
    { lockDirection: true }
  )
  return <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
}

export function FilterTaps({ setActive }) {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const [status, setStatus] = useState('idle')
  const bind = useDrag(
    ({ down, movement: [mx, my], tap, elapsedTime }) => {
      if (tap) {
        setStatus(`tap registered in ${~~elapsedTime}ms`)
        setTimeout(() => setStatus('idle'), 1000)
        return
      } else {
        setStatus(down ? 'dragging' : 'idle')

        setActive && setActive(down)
        set({ x: down ? mx : 0, y: down ? my : 0 })
      }
    },
    { filterTaps: true }
  )

  return (
    <>
      <div className={styles.ui}>
        <div>status: {status}</div>
      </div>
      <animated.div className={styles.drag} {...bind()} style={{ x, y }} />
    </>
  )
}

export function Delay({ setActive }) {
  const [style, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    backgroundColor: 'lightskyblue',
  }))
  const [{ countdown }, setCountdown] = useSpring(() => ({
    countdown: 1000,
  }))

  const [status, setStatus] = useState('idle')

  const timer = useRef()

  const startCountdown = () => {
    setActive(true)
    const start = performance.now()
    timer.current = setInterval(() => {
      const elapsedTime = Math.max(0, Math.floor(1000 - performance.now() + start))
      if (elapsedTime === 0) {
        clearInterval(timer.current)
        setStatus('elapsed')
      }
      setCountdown({ countdown: elapsedTime, immediate: true })
    }, 10)
  }

  const clearCountdown = () => {
    setActive(false)
    clearInterval(timer.current)
    setCountdown({ countdown: 1000, immediate: true })
    setStatus('idle')
  }

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], distance, last }) => {
        if (distance > 0 && down && status !== 'elapsed') {
          clearInterval(timer.current)
          setStatus('moved')
        }
        if (last) clearCountdown()

        set({
          x: down ? mx : 0,
          y: down ? my : 0,
          scale: down ? 1.2 : 1,
          backgroundColor: down ? 'hotpink' : 'lightskyblue',
        })
      },
      onMouseDown: startCountdown,
      onTouchStart: startCountdown,
      onMouseUp: clearCountdown,
      onTouchEnd: startCountdown,
    },
    { drag: { delay: 1000 } }
  )

  useEffect(() => () => clearInterval(timer.current), [])

  let StatusElement
  switch (status) {
    case 'elapsed':
      StatusElement = <span style={{ color: 'hotpink' }}>Drag started after 1000ms delay</span>
      break
    case 'moved':
      StatusElement = <span style={{ color: 'hotpink' }}>Drag started because you moved!</span>
      break
    default:
      StatusElement = (
        <>
          <animated.span>{countdown}</animated.span>ms before drag starts
        </>
      )
  }

  return (
    <>
      <div className={styles.ui}>{StatusElement}</div>
      <animated.div className={styles.drag} {...bind()} style={style} />
    </>
  )
}

const colors = ['lightcoral', 'cadetblue', 'mediumpurple', 'darkorange']

export function TouchAction() {
  const [springs, set] = useSprings(colors.length, i => ({
    x: 0,
    opacity: 1,
    moving: false,
    background: colors[i],
  }))
  const bind = useDrag(
    ({ active, down, movement: [x], args: [index] }) =>
      set(i => {
        if (i === index) return { x: active ? x : 0, moving: active, immediate: down }
        else return { opacity: down ? 0.6 : 1 }
      }),
    { axis: 'x', threshold: 20 }
  )

  return springs.map(({ moving, ...style }, i) => (
    <animated.div key={i} className={styles.drag} {...bind(i)} style={{ ...style, touchAction: 'pan-y' }}>
      {moving.to(m => (m ? `body shouldn't scroll` : '← Drag me →'))}
    </animated.div>
  ))
}

const clamp = (value, min, max) => Math.max(Math.min(max, value), min)

const slides = [0, 1, 2, 3, 4, 5]
const lethargy = new Lethargy()

export function LethargyWheel() {
  const [index, setIndex] = useState(0)
  const ref = useRef()

  useWheel(
    ({ event, last, memo: wait = false }) => {
      if (last) return
      event.preventDefault()
      event.stopPropagation()
      const s = lethargy.check(event)
      if (s) {
        if (!wait) setIndex(i => clamp(i - s, 0, slides.length - 1))
        return true
      }
      return false
    },
    { domTarget: ref, eventOptions: { passive: false } }
  )

  return (
    <div ref={ref} style={{ transform: `translateY(${-index * 330}px)` }}>
      {slides.map(i => (
        <div key={i}>{i}</div>
      ))}
    </div>
  )
}

function Environment() {
  const { gl, scene } = useThree()
  const map = useTexture('/equirectangular.png')

  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl)
    const pngCubeRenderTarget = generator.fromEquirectangular(map).texture

    // scene.background = texture
    scene.environment = pngCubeRenderTarget

    map.dispose()
    generator.dispose()

    return () => {
      scene.environment = scene.background = null
    }
  }, [gl, map, scene])

  return null
}
const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  envMapIntensity: 1.0,
})

export function PreventWindowScrollY() {
  const [{ rot, scale }, set] = useSpring(() => ({ rot: [0, 0, 0], scale: [0.8, 0.8, 0.8] }))
  const ref = useRef()
  const bind = useGesture(
    {
      onDrag: ({ active, offset: [y, z] }) => {
        set({ rot: [z / 50, y / 50, 0], scale: active ? [1, 1, 1] : [0.8, 0.8, 0.8] })
        ref.current.style.cursor = active ? 'grabbing' : 'initial'
      },
      onHover: ({ dragging, hovering }) => !dragging && (ref.current.style.cursor = hovering ? 'grab' : 'initial'),
    },
    { drag: { experimental_preventWindowScrollY: true } }
  )
  return (
    <Canvas concurrent camera={{ position: [0, 0, 16], fov: 50 }} onCreated={({ gl }) => (ref.current = gl.domElement)}>
      <Suspense fallback={null}>
        <a3f.mesh {...bind()} rotation={rot} geometry={torusknot} material={material} scale={scale} />
        <Environment />
      </Suspense>
    </Canvas>
  )
}
