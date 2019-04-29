import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
// import InteractiveDom from './components/InteractiveDom'

afterAll(cleanup)

// TODO - should be able to test on a node component
// but for some reason, the tests don't work with mouseEnter/mouseLeave

describe.each([
  ['attached to component', Interactive, false]
  // ['attached to node', InteractiveDom, true]
])('testing onHover %s)', (testName, Component, domTarget) => {
  const prefix = domTarget ? 'dom-' : ''
  const { getByTestId, rerender } = render(<Component gesture="Hover" />)
  const element = getByTestId(`${prefix}hover-el`)

  test('mouseEnter should initiate hover', () => {
    fireEvent.mouseEnter(element, { clientX: 10, clientY: 20 })
    expect(getByTestId(`${prefix}hover-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}hover-xy`)).toHaveTextContent('10,20')
  })

  test('mouseLeave should terminate hover', () => {
    fireEvent.mouseLeave(element, { clientX: 20, clientY: 40 })
    expect(getByTestId(`${prefix}hover-active`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}hover-xy`)).toHaveTextContent('20,40')
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gesture="Hover" config={{ enabled: false }} />)
    fireEvent.mouseEnter(element)
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })

  test('disabling the hover gesture should prevent state from updating', () => {
    rerender(<Component gesture="Hover" config={{ hover: false }} />)
    fireEvent.mouseEnter(element)
    expect(getByTestId(`${prefix}hover-hovering`)).toHaveTextContent('false')
  })
})
