import React from 'react'
import { Story, Meta } from '@storybook/react'
import Reset from '../components/decorator-reset'

import { useControls } from '../../src'

type Color = { r: number; g: number; b: number; a?: number }

export default {
  title: 'Inputs/Color',
  decorators: [Reset],
} as Meta

const Template: Story<any> = (args: Color) => {
  const values = useControls({ color: args })

  const _color = React.useMemo(() => {
    if (typeof values.color !== 'string') {
      let c = values.color as Color

      if ('a' in c) return `rgb(${c.r}, ${c.g}, ${c.b}, ${c.a})`
      return `rgb(${c.r}, ${c.g}, ${c.b})`
    }

    return values.color
  }, [values.color])

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '2rem', backgroundColor: _color }}>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const Hexadecimal = Template.bind({})
Hexadecimal.args = {
  value: '#ff005b',
}

export const Hex8 = Template.bind({})
Hex8.args = {
  value: '#ff005b88',
}

export const RGBObject = Template.bind({})
RGBObject.args = {
  value: { r: 248, g: 214, b: 40 },
}

export const RGBAObject = Template.bind({})
RGBAObject.args = {
  value: { r: 248, g: 214, b: 40, a: 1 },
}

export const String = Template.bind({})
String.args = {
  value: 'royalblue',
}

export const AllTheColors = () => {
  const values = useControls({
    Name: 'royalblue',
    Hex: '#9442ff',
    Hex8: '#8b33ffaa',
    RgbString: 'rgb(255, 47, 162)',
    RgbaString: 'rgba(233, 30, 99, 0.9)',
    Rgb: { r: 0, g: 150, b: 136 },
    Rgba: { r: 139, g: 195, b: 74, a: 0.5 },
    Hsl: { h: 4, s: 0.9, l: 0.58 },
    Hsla: { h: 36, s: 1, l: 0.5, a: 1 },
    HslString: 'hsl(199,98%,48%)',
    HslaString: 'hsla(187,1%,42%,0.9)',
    Hsv: { h: 238, s: 1, v: 0.7 },
    Hsva: { h: 58, s: 0.92, v: 1, a: 0.3 },
  })

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '2rem' }}>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}
