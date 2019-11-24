import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BindProps } from './components/Api'
import Interactive from './components/Interactive'

afterEach(cleanup)

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

// TODO remove comments

/*
test('genuine handlers should correctly execute', () => {
  const { getByTestId } = render(<GenuineHandlers />)
  const element = getByTestId('drag-el')
  fireEvent.mouseDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
  expect(getByTestId('mouseDown')).toHaveTextContent('mouse down')

  fireEvent.click(element)
  expect(getByTestId('click')).toHaveTextContent(/^clicked$/)
})
*/

test('testing memo', () => {
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

test('testing timestamp', () => {
  const { getByTestId } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  let event = createEvent.mouseDown(element, {
    clientX: 10,
    clientY: 20,
    buttons: 1,
  })
  fireEvent(element, event)
  const start = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(start))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe('0')

  event = createEvent.mouseMove(window, {
    clientX: 20,
    clientY: 50,
    buttons: 1,
  })
  fireEvent(window, event)
  let time = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(time))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe(String(time - start))
})
