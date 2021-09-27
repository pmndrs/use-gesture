import React, { Fragment, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import useMeasure from 'react-use-measure'
import { useSpring, animated as a } from 'react-spring'
import { Global, Box, ScrollArea, ScrollContent } from './styles'

function ScrollBox({ size, color, children }: { size: number | string; color: string; children: any }) {
  const scrollBoxRef = React.useRef<HTMLDivElement | null>(null)

  React.useLayoutEffect(() => {
    if (!scrollBoxRef.current) return
    const { width, height } = scrollBoxRef.current!.getBoundingClientRect()
    scrollBoxRef.current.scrollTop = 1000 / 2 - height / 2
    scrollBoxRef.current.scrollLeft = 1000 / 2 - width / 2
  }, [])

  return (
    <ScrollArea ref={scrollBoxRef} size={size} color={color}>
      <ScrollContent>{children}</ScrollContent>
    </ScrollArea>
  )
}

function MeasuredBox({ color }: { color: string }) {
  // This line is all you need ...
  const [ref, bounds] = useMeasure({ scroll: true, debounce: { scroll: 0, resize: 0 } })
  // The rest is just for effects, hover and mouse tracking
  const prev = useRef(bounds)
  const [big, setBig] = useState(false)
  const [hovered, setHover] = useState(false)
  const [xy, setXY] = useState([0, 0])
  const [springs, set] = useSpring(() => Object.keys(bounds).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}))
  useEffect(() => {
    set(Object.keys(bounds).reduce((acc, key) => ({ ...acc, [key]: prev.current[key] !== bounds[key] ? 1 : 0 }), {}))
    prev.current = { ...bounds }
  }, [bounds, set])

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={({ clientX, clientY }) => setXY([clientX, clientY])}
      onClick={() => setBig(!big)}
      size={big ? 270 : 235}
      color={color}>
      {Object.keys(bounds).map(key => (
        <Fragment key={key}>
          <span>{key}</span>
          <a.span style={{ background: (springs as any)[key].interpolate((o: any) => `rgba(0,0,0,${o})`) }}>
            {Math.round(bounds[key])}px
          </a.span>
        </Fragment>
      ))}
      {hovered && (
        <>
          <span>mouse x</span>
          <span>{Math.round(xy[0] - bounds.left)}px</span>
          <span>mouse y</span>
          <span>{Math.round(xy[1] - bounds.top)}px</span>
        </>
      )}
    </Box>
  )
}

function Example() {
  return (
    <>
      <Global color="white" />
      <div style={{ width: '150vw', height: '150vh', marginLeft: '-25vw', paddingTop: '20vh' }}>
        <ScrollBox size="60vh" color="#272730">
          <ScrollBox size="50vh" color="#676770">
            <MeasuredBox color="#F7567C" />
          </ScrollBox>
        </ScrollBox>
      </div>
    </>
  )
}

ReactDOM.render(<Example />, document.getElementById('root'))
