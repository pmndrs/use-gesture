import React from 'react'
import { styled } from '../../styles'

// TODO remove as any when this is corrected by stitches
const Svg = styled('svg', {
  fill: 'currentColor',
  transition: 'transform 350ms ease, fill 250ms ease',
}) as any

export function Chevron({ toggled, ...props }: React.SVGProps<SVGSVGElement> & { toggled?: boolean }) {
  return (
    <Svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${toggled ? 0 : -90}deg)` }}
      {...props}>
      <path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z" />
    </Svg>
  )
}
