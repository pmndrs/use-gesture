import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BindProps, GenuineHandlers } from './components/Api'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

// import InteractiveDomBackwardCompat from './components/InteractiveDomBackwardCompat'

afterEach(cleanup)

// patching createEvent
for (let key in createEvent) {
  if (key.indexOf('pointer') === 0) {
    // @ts-ignore
    const fn = createEvent[key.replace('pointer', 'mouse')]
    if (!fn) break
    // @ts-ignore
    createEvent[key] = function (type, { pointerId = Date.now(), ...rest } = {}) {
      const event = fn(type, rest)
      event.pointerId = pointerId
      return event
    }
  }
}

test('bind should dispatch its arguments', () => {
  const { getByTestId } = render(<BindProps args1={['args1']} args2={['args2']} />)
  const firstElement = getByTestId('drag-el')
  const secondElement = getByTestId('2-drag-el')
  fireEvent.pointerDown(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerUp(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerDown(secondElement)
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.pointerUp(secondElement)
  expect(getByTestId('2-drag-args')).toHaveTextContent('args2')
  fireEvent.pointerDown(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
  fireEvent.pointerUp(firstElement)
  expect(getByTestId('drag-args')).toHaveTextContent('args1')
})

test('native handlers should correctly execute', () => {
  const { getByTestId } = render(<GenuineHandlers args="testArg" />)
  const element = getByTestId('drag-el')
  fireEvent.pointerDown(element)
  expect(getByTestId('drag-active')).toHaveTextContent('true')
  expect(getByTestId('mouseDown')).toHaveTextContent('mouse down')
  fireEvent.pointerUp(element)

  fireEvent.click(element)
  expect(getByTestId('click')).toHaveTextContent(/^clicked testArg$/)
})

test('testing memo', () => {
  const { getByTestId, rerender } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  fireEvent.pointerDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('memo')
  fireEvent.pointerUp(element)
  rerender(<Interactive gestures={['Drag']} memoArg={0} />)
  fireEvent.pointerDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('0')
  fireEvent.pointerUp(element)
  rerender(<Interactive gestures={['Drag']} memoArg={null} />)
  fireEvent.pointerDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent('null')
  fireEvent.pointerUp(element)
  rerender(<Interactive gestures={['Drag']} memoArg={''} />)
  fireEvent.pointerDown(element)
  expect(getByTestId('drag-memo')).toHaveTextContent(/^$/)
  fireEvent.pointerUp(element)
})

test('testing timestamp', () => {
  const { getByTestId } = render(<Interactive gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId('drag-el')
  let event = createEvent.pointerDown(element, { clientX: 10, clientY: 20, buttons: 1 })
  fireEvent(element, event)
  const start = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(start))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe('0')

  event = createEvent.pointerMove(element, { clientX: 20, clientY: 50, buttons: 1 })
  fireEvent(element, event)
  let time = event.timeStamp
  expect(getByTestId('drag-timeStamp').innerHTML).toBe(String(time))
  expect(getByTestId('drag-startTime').innerHTML).toBe(String(start))
  expect(getByTestId('drag-elapsedTime').innerHTML).toBe(String(time - start))
})

test('testing unmount with domTarget', () => {
  const { getByTestId, unmount } = render(<InteractiveDom gestures={['Drag']} />)
  const element = getByTestId('dom-drag-el')
  fireEvent.pointerDown(element)
  fireEvent.pointerMove(element, { clientX: 20, clientY: 50, buttons: 1 })
  expect(getByTestId('dom-drag-dragging')).toHaveTextContent('true')
  unmount()
})
