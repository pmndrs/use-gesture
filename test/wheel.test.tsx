import React from 'react'
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'
import { later } from './utils'

afterAll(cleanup)

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-']
])('testing onWheel %s)', (_testName, C, prefix) => {
  const Component = C as InteractiveType
  const { getByTestId, rerender } = render(<Component gestures={['Wheel']} memoArg="memo" />)
  const element = getByTestId(`${prefix}wheel-el`)

  let delta_t: number

  test('wheel event should initiate the gesture', () => {
    const event = createEvent.wheel(element, { deltaX: 1, deltaY: -1 })
    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}wheel-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}wheel-delta`)).toHaveTextContent('1,-1')
    expect(getByTestId(`${prefix}wheel-initial`)).toHaveTextContent('0,0')
  })

  test('initiating the gesture should fire onWheelStart', () => {
    expect(getByTestId(`${prefix}wheel-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}wheel-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}wheel-memo`)).toHaveTextContent('memo')
  })

  test('the second wheel event should set first to false', () => {
    const event = createEvent.wheel(element, { deltaX: 4, deltaY: -5 })
    fireEvent(element, event)
    delta_t = event.timeStamp - delta_t
    expect(getByTestId(`${prefix}wheel-first`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}wheel-last`)).toHaveTextContent('false')
  })

  test('xy should add wheel event offset', () => {
    expect(getByTestId(`${prefix}wheel-delta`)).toHaveTextContent('4,-5')
    expect(getByTestId(`${prefix}wheel-offset`)).toHaveTextContent('5,-6')
  })

  test('kinematics should update', () => {
    expect(getByTestId(`${prefix}wheel-direction`)).toHaveTextContent(`1,-1`)
    expect(getByTestId(`${prefix}wheel-velocity`)).toHaveTextContent(`${4 / delta_t},${5 / delta_t}`)
  })

  test('the last wheel event should debounce and terminate the gesture', async () => {
    await waitFor(() => {
      expect(getByTestId(`${prefix}wheel-last`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}wheel-velocity`)).toHaveTextContent(`${4 / delta_t},${5 / delta_t}`)
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
    })
  })

  test('terminating the gesture should fire onWheelEnd', async () => {
    await waitFor(() => expect(getByTestId(`${prefix}wheel-end`)).toHaveTextContent(/^fired$/))
  })

  test('wheeling again should restart the gesture', async () => {
    fireEvent.wheel(element, { deltaX: 10, deltaY: 0 })
    expect(getByTestId(`${prefix}wheel-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}wheel-lastOffset`)).toHaveTextContent('5,-6')
    await waitFor(() => expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('false'))
  })

  test(`applying an axis SHOULDN'T start the gesture if gesture is not detected first in the right axis`, async () => {
    rerender(<Component gestures={['Wheel']} config={{ wheel: { axis: 'x' } }} />)
    fireEvent.wheel(element, { deltaX: 0, deltaY: 10 })
    fireEvent.wheel(element, { deltaX: 4, deltaY: 0 })
    expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('false')
    // allow gesture to finish
    await later(200)
  })

  test(`applying an axis SHOULD start the gesture if gesture is detected in the right axis`, async () => {
    fireEvent.wheel(element, { deltaX: 10, deltaY: 0 })
    fireEvent.wheel(element, { deltaX: 0, deltaY: 4 })
    fireEvent.wheel(element, { deltaX: 3, deltaY: 0 })
    expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}wheel-movement`)).toHaveTextContent('13,0')
    await waitFor(() => expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false'))
  })
  test('disabling all gestures should prevent state from updating', async () => {
    rerender(<Component gestures={['Wheel']} config={{ enabled: false }} />)
    fireEvent.wheel(element)
    expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
  })

  test('disabling the wheel gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Wheel']} config={{ wheel: { enabled: false } }} />)
    fireEvent.wheel(element)
    expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
  })
})
