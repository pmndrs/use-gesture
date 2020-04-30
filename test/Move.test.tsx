import React from 'react'
import { render, cleanup, fireEvent, createEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import InteractiveDomBackwardCompat from './components/InteractiveDomBackwardCompat'
import { InteractiveType } from './components/types'
import { later } from './utils'

afterAll(cleanup)

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-'],
  ['attached to node and called effect', InteractiveDomBackwardCompat, 'backward-dom-'],
])('testing onMove %s)', (_testName, C, prefix) => {
  const Component = C as InteractiveType
  const { getByTestId, rerender } = render(<Component gestures={['Move']} memoArg="memo" />)
  const element = getByTestId(`${prefix}move-el`)
  let delta_t: number

  test('mouseMove should initiate the gesture', () => {
    const event = createEvent.mouseMove(element, { clientX: 20, clientY: 50 })
    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}move-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}move-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}move-xy`)).toHaveTextContent('20,50')
    expect(getByTestId(`${prefix}move-delta`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}move-initial`)).toHaveTextContent('20,50')
  })

  test('initiating the gesture should fire onMoveStart', () => {
    expect(getByTestId(`${prefix}move-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}move-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}move-memo`)).toHaveTextContent('memo')
  })

  test('the second mouseMove event should set first to false', () => {
    const event = createEvent.mouseMove(element, { clientX: 30, clientY: 80 })
    fireEvent(element, event)
    delta_t = event.timeStamp - delta_t

    expect(getByTestId(`${prefix}move-first`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}move-last`)).toHaveTextContent('false')
  })

  test('xy should update to latest mouse coordinates', () => {
    expect(getByTestId(`${prefix}move-xy`)).toHaveTextContent('30,80')
    expect(getByTestId(`${prefix}move-movement`)).toHaveTextContent('10,30')
  })

  test('kinematics should update', () => {
    expect(getByTestId(`${prefix}move-velocity`)).not.toHaveTextContent(/^0$/)
    expect(getByTestId(`${prefix}move-vxvy`)).toHaveTextContent(`${10 * (1 / delta_t)},${30 * (1 / delta_t)}`)
  })

  test('the last mouseMove event should debounce and terminate the gesture', async () => {
    await wait(() => {
      expect(getByTestId(`${prefix}move-last`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}move-active`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}move-vxvy`)).toHaveTextContent('0,0')
      expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
    })
  })

  test('terminating the gesture should fire onMoveEnd', async () => {
    await wait(() => expect(getByTestId(`${prefix}move-end`)).toHaveTextContent(/^fired$/))
  })

  test(`applying an axis SHOULDN'T start the gesture if gesture is not detected first in the right axis`, async () => {
    rerender(<Component gestures={['Move']} config={{ move: { axis: 'x' } }} />)
    fireEvent.mouseMove(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(element, { clientX: 0, clientY: 10 })
    fireEvent.mouseMove(element, { clientX: 4, clientY: 10 })
    expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
    // allow gesture to finish
    await later(200)
  })

  test(`applying an axis SHOULD start the gesture if gesture is detected in the right axis`, async () => {
    fireEvent.mouseMove(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(element, { clientX: 10, clientY: 4 })
    fireEvent.mouseMove(element, { clientX: 13, clientY: 4 })
    expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}move-movement`)).toHaveTextContent('13,0')
    await wait(() => expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false'))
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gestures={['Move']} config={{ enabled: false }} />)
    fireEvent.mouseMove(element)
    expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
  })

  test('disabling the move gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Move']} config={{ move: { enabled: false } }} />)
    fireEvent.mouseMove(element)
    expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
  })
})
