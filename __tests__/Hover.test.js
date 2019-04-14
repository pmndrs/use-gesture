import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

afterAll(cleanup)

describe('onHover', () => {
  const { getByTestId } = render(<Interactive gesture="Hover" />)
  const element = getByTestId('hover-el')

  test('mouseEnter should initiate hover', () => {
    fireEvent.mouseEnter(element, { clientX: 10, clientY: 20 })
    expect(getByTestId('hover-active')).toHaveTextContent('true')
    expect(getByTestId('hover-hovering')).toHaveTextContent('true')
    expect(getByTestId('hover-xy')).toHaveTextContent('10,20')
  })

  test('mouseLeave should terminate hover', () => {
    fireEvent.mouseLeave(element, { clientX: 20, clientY: 40 })
    expect(getByTestId('hover-active')).toHaveTextContent('false')
    expect(getByTestId('hover-hovering')).toHaveTextContent('false')
    expect(getByTestId('hover-xy')).toHaveTextContent('20,40')
  })
})
