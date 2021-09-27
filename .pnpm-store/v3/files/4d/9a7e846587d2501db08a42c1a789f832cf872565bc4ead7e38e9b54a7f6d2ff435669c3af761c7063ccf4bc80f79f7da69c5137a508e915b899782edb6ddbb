import { useState, useRef, useLayoutEffect, useCallback } from 'react'

export function usePopin(margin = 3) {
  const popinRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [shown, setShow] = useState(false)

  const show = useCallback(() => setShow(true), [])
  const hide = useCallback(() => setShow(false), [])

  useLayoutEffect(() => {
    if (shown) {
      const { bottom, top, left } = popinRef.current!.getBoundingClientRect()
      const { height } = wrapperRef.current!.getBoundingClientRect()
      const direction = bottom + height > window.innerHeight - 40 ? 'up' : 'down'

      wrapperRef.current!.style.position = 'fixed'
      wrapperRef.current!.style.zIndex = '10000'
      wrapperRef.current!.style.left = left + 'px'

      if (direction === 'down') wrapperRef.current!.style.top = bottom + margin + 'px'
      else wrapperRef.current!.style.bottom = window.innerHeight - top + margin + 'px'
    }
  }, [margin, shown])

  return { popinRef, wrapperRef, shown, show, hide }
}
