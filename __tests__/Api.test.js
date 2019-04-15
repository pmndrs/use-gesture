import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { DefaultProp, ActionProp } from './components/Api'

afterEach(cleanup)

test('function passed as sole argument to useGesture should trigger drag (testing default prop)', () => {
  const { getByTestId } = render(<DefaultProp />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
})

test('onAction should propshould trigger drag (testing onAction alias)', () => {
  const { getByTestId } = render(<ActionProp />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
})
