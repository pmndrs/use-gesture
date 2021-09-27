import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { a, useSpring } from '@react-spring/web'
import { useCanvas2d, useDrag, useInputContext, debounce, colord, useTh } from 'leva/plugin'
import { Canvas, SpringPreview } from './StyledSpring'
import { springFn } from './math'
import type { SpringProps } from './spring-types'

const SpringPreviewAnimated = a(SpringPreview)

export function SpringCanvas() {
  const { displayValue, value, onUpdate, settings } = useInputContext<SpringProps>()

  const springRef = useRef(displayValue)
  const accentColor = useTh('colors', 'highlight3')
  const backgroundColor = useTh('colors', 'elevation2')
  const fillColor = useTh('colors', 'highlight1')

  const [gradientTop, gradientBottom] = useMemo(() => {
    return [colord(fillColor).alpha(0.4).toRgbString(), colord(fillColor).alpha(0.1).toRgbString()]
  }, [fillColor])

  const { tension, friction, mass = 1 } = displayValue
  const { tension: ts, friction: fs } = settings!

  const [spring, api] = useSpring(() => ({
    scaleX: 0.5,
    opacity: 0.2,
    immediate: (k) => k === 'opacity',
  }))

  const bind = useDrag(({ movement: [x, y], memo = [tension, friction] }) => {
    onUpdate({
      ...value,
      tension: memo[0] - Math.round(x) * ts.step,
      friction: memo[1] - Math.round(y / 4) * fs.step,
    })
    return memo
  })

  const updateSpring = useMemo(
    () =>
      debounce(() => {
        const { tension, friction, mass } = springRef.current
        api.start({
          from: { scaleX: 0, opacity: 0.9 },
          to: [{ scaleX: 0.5 }, { opacity: 0.2 }],
          config: { friction, tension, mass },
        })
      }, 250),
    [api]
  )

  const drawSpring = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      const { tension, friction, mass } = springRef.current
      const { width, height } = _canvas
      const t = springFn(tension, friction, mass)

      // compute the path
      const path = new Path2D()
      let max = 0
      for (let i = 0; i < width; i++) {
        const v = (t(i * 8) * height) / 2
        if (Number.isFinite(v)) max = Math.max(max, v)
        path.lineTo(i, height - v)
      }

      // clear
      _ctx.clearRect(0, 0, width, height)

      // draw gradient
      const gradientPath = new Path2D(path)
      gradientPath.lineTo(width - 1, height)
      gradientPath.lineTo(0, height)
      const gradient = _ctx.createLinearGradient(0, height / 2, 0, height)
      gradient.addColorStop(0.0, gradientTop)
      gradient.addColorStop(1.0, gradientBottom)
      _ctx.fillStyle = gradient
      _ctx.fill(gradientPath)

      // draw the dark line
      _ctx.strokeStyle = backgroundColor
      _ctx.lineJoin = 'round'
      _ctx.lineWidth = 14
      _ctx.stroke(path)

      // draw the white line
      _ctx.strokeStyle = accentColor
      _ctx.lineWidth = 2
      _ctx.stroke(path)
    },
    [accentColor, backgroundColor, gradientTop, gradientBottom]
  )

  const [canvas, ctx] = useCanvas2d(drawSpring)

  useEffect(() => {
    springRef.current = { tension, friction, mass }
    drawSpring(canvas.current!, ctx.current!)
    updateSpring()
  }, [drawSpring, updateSpring, tension, friction, mass, canvas, ctx])

  return (
    <>
      <Canvas {...bind()} ref={canvas} />
      <SpringPreviewAnimated style={spring as any} />
    </>
  )
}
