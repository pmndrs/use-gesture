import React from 'react'
import { Meta } from '@storybook/react'
import { Half2Icon } from '@radix-ui/react-icons'

import Reset from '../components/decorator-reset'

import { useControls, buttonGroup, Leva } from '../../src'

export default {
  title: 'Inputs/Button Group',
  decorators: [Reset],
} as Meta

export const ButtonGroup = () => {
  const [values, set] = useControls(() => ({
    Size: 1,
    ' ': buttonGroup({
      '0.25x': () => set({ Size: 0.25 }),
      '0.5x': () => set({ Size: 0.5 }),
      '1x': () => set({ Size: 1 }),
      '2x': () => set({ Size: 2 }),
      '3x': () => set({ Size: 3 }),
    }),
  }))

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const ButtonGroupAlternativeLabelApi = () => {
  const [values, set] = useControls(() => ({
    Size: 1,
    SizeButtonGroup: buttonGroup({
      label: 'Presets',
      opts: {
        '0.25x': () => set({ Size: 0.25 }),
        '0.5x': () => set({ Size: 0.5 }),
        '1x': () => set({ Size: 1 }),
        '2x': () => set({ Size: 2 }),
        '3x': () => set({ Size: 3 }),
      },
    }),
  }))

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const ButtonGroupLabelIcon = () => {
  const [values, set] = useControls(() => ({
    Size: 1,
    SizeButtonGroup: buttonGroup({
      label: <Half2Icon />,
      opts: {
        '0.25x': () => set({ Size: 0.25 }),
        '0.5x': () => set({ Size: 0.5 }),
        '1x': () => set({ Size: 1 }),
        '2x': () => set({ Size: 2 }),
        '3x': () => set({ Size: 3 }),
      },
    }),
  }))

  return (
    <div>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

export const ButtonGroupWithoutLabelHorizontal = () => {
  const [values, set] = useControls(() => ({
    Size: 1,
    ' ': buttonGroup({
      '0.25x': () => set({ Size: 0.25 }),
      '0.5x': () => set({ Size: 0.5 }),
      '1x': () => set({ Size: 1 }),
      '2x': () => set({ Size: 2 }),
      '3x': () => set({ Size: 3 }),
    }),
  }))

  return (
    <>
      <Leva oneLineLabels />
      <div>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
    </>
  )
}
