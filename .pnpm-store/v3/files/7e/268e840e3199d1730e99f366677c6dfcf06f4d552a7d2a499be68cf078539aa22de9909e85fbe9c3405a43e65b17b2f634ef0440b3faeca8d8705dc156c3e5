import { useEffect, useRef } from 'react'
import { debounce } from '../utils'

export function useCanvas2d(
  fn: Function
): [React.RefObject<HTMLCanvasElement>, React.RefObject<CanvasRenderingContext2D>] {
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const hasFired = useRef(false)

  // TODO this is pretty much useless in 90% of cases since panels
  // have a fixed width
  useEffect(() => {
    const handleCanvas = debounce(() => {
      canvas.current!.width = canvas.current!.offsetWidth * window.devicePixelRatio
      canvas.current!.height = canvas.current!.offsetHeight * window.devicePixelRatio
      fn(canvas.current, ctx.current)
    }, 250)
    window.addEventListener('resize', handleCanvas)
    if (!hasFired.current) {
      handleCanvas()
      hasFired.current = true
    }
    return () => window.removeEventListener('resize', handleCanvas)
  }, [fn])

  useEffect(() => {
    ctx.current = canvas.current!.getContext('2d')
  }, [])

  return [canvas, ctx]
}
