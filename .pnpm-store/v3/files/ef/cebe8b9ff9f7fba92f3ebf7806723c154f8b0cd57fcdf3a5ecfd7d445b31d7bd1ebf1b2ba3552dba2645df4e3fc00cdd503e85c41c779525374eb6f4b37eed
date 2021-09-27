import React from 'react'
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { Meta, Story } from '@storybook/react'
import Reset from './components/decorator-reset'

import { useControls } from '../src'

export default {
  title: 'Misc/Controlled inputs',
  decorators: [Reset],
} as Meta

const formStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.5em' }

export const ExternalUpdatesWithSet: Story = () => {
  const [{ username, counter }, set] = useControls(() => ({ username: 'Mario', counter: { value: 0, step: 1 } }))

  return (
    <form style={formStyles}>
      <label>
        username: <input type="text" value={username} onChange={(e) => set({ username: e.target.value })} />
      </label>
      <label>
        counter: {counter}{' '}
        <button type="button" onClick={() => set({ counter: counter + 1 })}>
          ➕ inc
        </button>
      </label>
    </form>
  )
}

const Circle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        top: 100,
        left: 100,
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#eee',
        border: '1px solid #222',
        touchAction: 'none',
      }}
      {...props}
    />
  )
})

ExternalUpdatesWithSet.storyName = 'External Updates With set'

export const OnChangeAndSet: Story = () => {
  const circleRef = useRef<HTMLDivElement>(null)
  const [, set] = useControls(() => ({
    position: {
      value: { x: 0, y: 0 },
      onChange: (position) => {
        if (circleRef.current) {
          circleRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`
        }
      },
    },
  }))

  useDrag(
    ({ first, last, offset: [x, y] }) => {
      if (first) circleRef.current.style.cursor = 'grabbing'
      if (last) circleRef.current.style.removeProperty('cursor')
      set({ position: { x, y } })
    },
    { domTarget: circleRef }
  )

  return (
    <div style={{ padding: '2em' }}>
      <p>Drag the circle around or change its position from leva input.</p>
      <Circle ref={circleRef} />
    </div>
  )
}

OnChangeAndSet.storyName = 'onChange And set'
