import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DefaultProp, ActionProp, BindProps, GenuineHandlers } from './components/Api'
import Interactive from './components/Interactive'

afterEach(cleanup)

test('function passed as sole argument to useGesture should trigger drag (testing default prop)', () => {
  const { getByTestId } = render(<DefaultProp />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
})

test('onAction should trigger drag (testing onAction alias)', () => {
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

test('Genuine handlers should correctly execute', () => {
  const { getByTestId } = render(<GenuineHandlers />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
  expect(getByTestId('mouseDown')).toHaveTextContent('mouse down')

  fireEvent.click(element)
  expect(getByTestId('click')).toHaveTextContent(/^clicked$/)
})

test('Testing memo', () => {
  const { getByTestId, rerender } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('memo')
  rerender(<Interactive gestures={['Drag']} memoArg={0} />)
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('0')
  rerender(<Interactive gestures={['Drag']} memoArg={null} />)
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('null')
  rerender(<Interactive gestures={['Drag']} memoArg={''} />)
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent(/^$/)
})
