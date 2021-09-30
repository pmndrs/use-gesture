import React, { useState } from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'

import { useControls } from '../src'

export default {
  title: 'Hook/Dependency',
  decorators: [Reset],
} as Meta

/**
 * 1. A mounts. A change deps → inputs change
 * 2. A mounts. B mounts → inputs don't change
 * 3. A mounts. B mounts. A deps change → inputs change
 * 4. A mounts. B mounts. B deps change → inputs change
 * 5. A mounts. A unmounts. B mounts → inputs change
 * 6. Multiple instances of A mounts. A change deps → inputs change
 */

// 1. A mounts. A change deps → inputs change
export const AddingInputs = () => {
  const [n, setN] = React.useState(1)
  const inputs = Array(n)
    .fill(0)
    .reduce((acc, _, i) => Object.assign(acc, { [`input${i}`]: i }), {})

  const values = useControls(inputs, [n])

  return (
    <div>
      <button onClick={() => setN((n) => n + 1)}>Add input</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

// 1. A mounts. A change deps → inputs change
export const UpdateSelect = () => {
  const [toggle, setToggle] = React.useState(true)
  const options = toggle ? ['foo', 'bar'] : ['x', 'y', 'z']

  const values = useControls(
    {
      select: { value: options[0], options: options },
    },
    [options]
  )

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>Update options</button>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
      <pre>{JSON.stringify(options, null, '  ')}</pre>
    </div>
  )
}

function A() {
  const [label, setLabel] = useState('number (A)')
  useControls({ number: { value: 3, label } }, [label])

  return (
    <button onClick={() => setLabel((l) => (l === 'number (A)' ? 'n (A)' : 'number (A)'))}>Change Label for A</button>
  )
}

function B() {
  const [label, setLabel] = useState('number (B)')
  useControls({ number: { value: 5, label } }, [label])

  return (
    <button onClick={() => setLabel((l) => (l === 'number (B)' ? 'n (B)' : 'number (B)'))}>Change Label for B</button>
  )
}

// 2. A mounts. B mounts → inputs don't change
// 3. A mounts. B mounts. A deps change → inputs change
// 4. A mounts. B mounts. B deps change → inputs change
export const Siblings = () => {
  const [showB, setShowB] = React.useState(false)
  return (
    <>
      <button onClick={() => setShowB(!showB)}>{showB ? 'Hide B' : 'Show B'}</button>
      <A />
      {showB && <B />}
      <pre>Showing component {showB ? 'A & B' : 'A'}</pre>
    </>
  )
}

// 5. A mounts. A unmounts. B mounts → inputs change
export const SwitchComponents = () => {
  const [showB, setShowB] = React.useState(false)
  return (
    <>
      <button onClick={() => setShowB(!showB)}>Switch A & B</button>
      {showB ? <B /> : <A />}
      <pre>Showing component {showB ? 'B' : 'A'}</pre>
    </>
  )
}
