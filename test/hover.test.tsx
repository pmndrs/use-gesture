import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import { InteractiveType } from './components/types'
import { patchCreateEvent } from './utils'
import InteractiveDom from './components/InteractiveDom'

afterAll(cleanup)
patchCreateEvent(createEvent)

// TODO - should be able to test on a node component
// but for some reason, the tests don't work with pointerEnter/mouseLeave

describe.each([
  ['attached to component', Interactive, false],
  ['attached to node', InteractiveDom, true]
])('testing onHover %s)', (_testName, C, domTarget) => {
  const Component = C as InteractiveType
  const prefix = domTarget ? 'dom-' : ''
  const { getByTestId, rerender } = render(<Component gestures={['Hover']} />)
  const element = getByTestId(`${prefix}hover-el`)

  test('pointerEnter should initiate hover', () => {
    fireEvent.pointerEnter(element, { clientX: 10, clientY: 20 })
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}hover-xy`)).toHaveTextContent('10,20')
  })

  test('pointerLeave should terminate hover', () => {
    fireEvent.pointerLeave(element, { clientX: 20, clientY: 40 })
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}hover-xy`)).toHaveTextContent('20,40')
  })

  test(`pointerType touch shouldn't trigger hover by default`, () => {
    fireEvent.pointerEnter(element, { pointerType: 'touch' })
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })

  test(`pointerType touch should trigger hover with mouseOnly false`, () => {
    rerender(<Component gestures={['Hover']} config={{ hover: { mouseOnly: false } }} />)
    fireEvent.pointerEnter(element, { pointerType: 'touch' })
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('true')
    fireEvent.pointerLeave(element, { pointerType: 'touch' })
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gestures={['Hover']} config={{ enabled: false }} />)
    fireEvent.pointerEnter(element)
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })

  test('disabling the hover gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Hover']} config={{ hover: { enabled: false } }} />)
    fireEvent.pointerEnter(element)
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })
})
