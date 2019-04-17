import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { DefaultProp, ActionProp, BindProps } from './components/Api'

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

test('bind should dispatch its arguments', () => {
  const { getByTestId } = render(<BindProps args1={['args1']} args2={['args2']} />)
  const firstElement = getByTestId('drag-el')
  const secondElement = getByTestId('2-drag-el')
  fireEvent.mouseDown(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.mouseUp(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.mouseDown(secondElement)
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.mouseUp(secondElement)
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.mouseDown(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.mouseUp(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
})
