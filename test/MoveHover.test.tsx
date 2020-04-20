import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import { InteractiveType } from './components/types'
// import InteractiveDom from './components/InteractiveDom'
// import InteractiveDomBackwardCompat from './components/InteractiveDomBackwardCompat'

afterAll(cleanup)

// TODO: should be able to test on a node component
// but for some reason, the tests don't work with mouseEnter/mouseLeave

describe.each([
  ['attached to component', Interactive, false],
  // ['attached to node', InteractiveDom, true]
])('testing onMove and onHover %s)', (_testName, C, domTarget) => {
  const Component = C as InteractiveType
  const prefix = domTarget ? 'dom-' : ''
  const { getByTestId } = render(<Component gestures={['Move', 'Hover']} />)
  const element = getByTestId(`${prefix}movehover-el`)

  test('mouseEnter/mouseMove should initiate the move gesture', () => {
    fireEvent.mouseEnter(element)
    fireEvent.mouseMove(element)
    expect(getByTestId(`${prefix}movehover-hovering`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}movehover-moving`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}movehover-end`)).toHaveTextContent(/^not fired$/)
  })

  test('mouseLeave should immediately terminate the move gesture and call onMoveEnd', () => {
    fireEvent.mouseLeave(element)
    expect(getByTestId(`${prefix}movehover-moving`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}movehover-hovering`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}movehover-end`)).toHaveTextContent(/^fired$/)
  })
})
