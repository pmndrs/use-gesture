import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import { patchCreateEvent } from './utils'
import '@testing-library/jest-dom/extend-expect'
import { BindProps, GenuineHandlers } from './components/Api'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

afterEach(cleanup)

patchCreateEvent(createEvent)

test('bind should dispatch its arguments', () => {
  const { getByTestId } = render(<BindProps args1={['args1']} args2={['args2']} />)
  const firstElement = getByTestId('drag-el')
  const secondElement = getByTestId('2-drag-el')
  fireEvent.pointerDown(firstElement, { pointerId: 1, buttons: 1 })
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerUp(firstElement, { pointerId: 1 })
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerDown(secondElement, { pointerId: 2, buttons: 1 })
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.pointerUp(secondElement, { pointerId: 2 })
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.pointerDown(firstElement, { pointerId: 3, buttons: 1 })
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerUp(firstElement, { pointerId: 3 })
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
})

test('native handlers should correctly execute', () => {
  const { getByTestId } = render(<GenuineHandlers args="testArg" />)
  const element = getByTestId('drag-el')
  fireEvent.pointerDown(element, { pointerId: 4, buttons: 1 })
  expect(getByTestId('drag-active')).toHaveTextContent('true')
  expect(getByTestId('mouseDown')).toHaveTextContent('mouse down')
  fireEvent.pointerUp(element, { pointerId: 4 })

  fireEvent.click(element)
  expect(getByTestId('click')).toHaveTextContent(/^clicked testArg$/)
})

test('testing memo', () => {
  const { getByTestId, rerender } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  fireEvent.pointerDown(element, { pointerId: 5, buttons: 1 })
  expect(getByTestId('drag-memo')).toHaveTextContent('memo')
  fireEvent.pointerUp(element, { pointerId: 5 })
  rerender(<Interactive gestures={['Drag']} memoArg={0} />)
  fireEvent.pointerDown(element, { pointerId: 6, buttons: 1 })
  expect(getByTestId('drag-memo')).toHaveTextContent('0')
  fireEvent.pointerUp(element, { pointerId: 6 })
  rerender(<Interactive gestures={['Drag']} memoArg={null} />)
  fireEvent.pointerDown(element, { pointerId: 7, buttons: 1 })
  expect(getByTestId('drag-memo')).toHaveTextContent('null')
  fireEvent.pointerUp(element, { pointerId: 7 })
  rerender(<Interactive gestures={['Drag']} memoArg={''} />)
  fireEvent.pointerDown(element, { pointerId: 8, buttons: 1 })
  expect(getByTestId('drag-memo')).toHaveTextContent(/^$/)
  fireEvent.pointerUp(element, { pointerId: 8 })
})

test('testing timestamp', () => {
  const { getByTestId } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  let event = createEvent.pointerDown(element, { pointerId: 9, clientX: 10, clientY: 20, buttons: 1 })
  fireEvent(element, event)
  const start = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(start))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe('0')

  event = createEvent.pointerMove(element, { pointerId: 9, clientX: 20, clientY: 50, buttons: 1 })
  fireEvent(element, event)
  let time = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(time))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe(String(time - start))
})

test('testing unmount with domTarget', () => {
  const { getByTestId, unmount } = render(<InteractiveDom gestures={['Drag']} />)
  const element = getByTestId('dom-drag-el')
  fireEvent.pointerDown(element, { pointerId: 10, buttons: 1 })
  fireEvent.pointerMove(element, { pointerId: 10, clientX: 20, clientY: 50, buttons: 1 })
  expect(getByTestId('dom-drag-dragging')).toHaveTextContent('true')
  unmount()
})
