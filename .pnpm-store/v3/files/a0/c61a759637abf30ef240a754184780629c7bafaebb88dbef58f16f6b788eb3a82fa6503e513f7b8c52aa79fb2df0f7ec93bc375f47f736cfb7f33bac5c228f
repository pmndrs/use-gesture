import React, { useState, useEffect, useCallback, useMemo, useRef, forwardRef, useImperativeHandle } from 'react'
import { colord } from 'colord'
import { Canvas } from './StyledMonitor'
import { Label, Row } from '../UI'
import { range } from '../../utils'
import { useCanvas2d } from '../../hooks'
import { useTh } from '../../styles'
import type { MonitorInput } from '../../types'

type MonitorProps = { label: string } & Omit<MonitorInput, 'type'>
type ObjectProps = { initialValue: any }

const POINTS = 100

function push(arr: any[], val: any) {
  arr.push(val)
  if (arr.length > POINTS) arr.shift()
}

const MonitorCanvas = forwardRef(function ({ initialValue }: ObjectProps, ref) {
  const accentColor = useTh('colors', 'highlight3')
  const backgroundColor = useTh('colors', 'elevation2')
  const fillColor = useTh('colors', 'highlight1')

  const [gradientTop, gradientBottom] = useMemo(() => {
    return [colord(fillColor).alpha(0.4).toRgbString(), colord(fillColor).alpha(0.1).toRgbString()]
  }, [fillColor])

  const points = useRef([initialValue])
  const min = useRef(initialValue)
  const max = useRef(initialValue)
  const raf = useRef<number | undefined>()

  const drawPlot = useCallback(
    (_canvas: HTMLCanvasElement, _ctx: CanvasRenderingContext2D) => {
      // fixes unmount potential bug
      if (!_canvas) return
      const { width, height } = _canvas

      // compute the path
      const path = new Path2D()
      const interval = width / POINTS
      const verticalPadding = height * 0.05
      for (let i = 0; i < points.current.length; i++) {
        const p = range(points.current[i], min.current!, max.current!)
        const x = interval * i
        const y = height - p * (height - verticalPadding * 2) - verticalPadding
        path.lineTo(x, y)
      }

      // clear
      _ctx.clearRect(0, 0, width, height)

      // draw gradient
      const gradientPath = new Path2D(path)
      gradientPath.lineTo(interval * (points.current.length + 1), height)
      gradientPath.lineTo(0, height)
      gradientPath.lineTo(0, 0)
      const gradient = _ctx.createLinearGradient(0, 0, 0, height)
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

  const [canvas, ctx] = useCanvas2d(drawPlot)

  useImperativeHandle(
    ref,
    () => ({
      frame: (val: any) => {
        if (min.current === undefined || val < min.current) min.current = val
        if (max.current === undefined || val > max.current) max.current = val
        push(points.current, val)
        raf.current = requestAnimationFrame(() => drawPlot(canvas.current!, ctx.current!))
      },
    }),
    [canvas, ctx, drawPlot]
  )

  useEffect(() => () => cancelAnimationFrame(raf.current!), [])

  return <Canvas ref={canvas} />
})

const parse = (val: any) => (Number.isFinite(val) ? val.toPrecision(2) : val.toString())

const MonitorLog = forwardRef(function ({ initialValue }: ObjectProps, ref) {
  const [val, set] = useState(parse(initialValue))
  useImperativeHandle(ref, () => ({ frame: (v: any) => set(parse(v)) }), [])
  return <div>{val}</div>
})

function getValue(o: React.MutableRefObject<any> | Function) {
  return typeof o === 'function' ? o() : o.current
}

export function Monitor({ label, objectOrFn, settings }: MonitorProps) {
  const ref = useRef<any>()
  const initialValue = useRef(getValue(objectOrFn))

  useEffect(() => {
    const timeout = window.setInterval(() => {
      if (document.hidden) return // prevent drawing when document is hidden
      ref.current?.frame(getValue(objectOrFn))
    }, settings.interval)
    return () => window.clearInterval(timeout)
  }, [objectOrFn, settings.interval])

  return (
    <Row input>
      <Label align="top">{label}</Label>
      {settings.graph ? (
        <MonitorCanvas ref={ref} initialValue={initialValue.current} />
      ) : (
        <MonitorLog ref={ref} initialValue={initialValue.current} />
      )}
    </Row>
  )
}
