import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import { later, patchCreateEvent } from './utils'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'

afterAll(cleanup)
patchCreateEvent(createEvent)

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-']
])('testing onTap %s', (_testName, C, prefix): any => {
  const Component = C as InteractiveType
  let getByTestId: any
  let rerender: any
  let element: HTMLElement

  beforeAll(() => {
    const result = render(<Component gestures={['Tap']} memoArg="memo" />)
    getByTestId = result.getByTestId
    rerender = result.rerender
    element = getByTestId(`${prefix}tap-el`)
  })

  test('pointerDown should initiate the gesture', () => {
    const event = createEvent.pointerDown(element, { pointerId: 1, clientX: 10, clientY: 20, buttons: 1 })
    fireEvent(element, event)

    expect(getByTestId(`${prefix}tap-tapping`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}tap-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}tap-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}tap-down`)).toHaveTextContent('true')
  })

  test('initiating the gesture should fire onTapStart', () => {
    expect(getByTestId(`${prefix}tap-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}tap-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}tap-memo`)).toHaveTextContent('memo')
  })

  test('pointerUp should trigger the tap', async () => {
    fireEvent.pointerUp(element, { pointerId: 1, clientX: 10, clientY: 20 })
    await later(50)

    expect(getByTestId(`${prefix}tap-tapCount`)).toHaveTextContent('1')
    expect(getByTestId(`${prefix}tap-tapping`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}tap-active`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}tap-last`)).toHaveTextContent('true')
  })

  test('terminating the gesture should fire onTapEnd', () => {
    expect(getByTestId(`${prefix}tap-end`)).toHaveTextContent(/^fired$/)
  })

  test('movement beyond threshold should cancel tap', async () => {
    rerender(<Component gestures={['Tap']} memoArg="memo" />)
    const downEvent = createEvent.pointerDown(element, { pointerId: 2, clientX: 0, clientY: 0, buttons: 1 })
    fireEvent(element, downEvent)
    const moveEvent = createEvent.pointerMove(element, { pointerId: 2, clientX: 50, clientY: 50, buttons: 1 })
    fireEvent(element, moveEvent)
    const upEvent = createEvent.pointerUp(element, { pointerId: 2, clientX: 50, clientY: 50 })
    fireEvent(element, upEvent)

    await later(50)

    // State should not have been updated (tap canceled)
    expect(getByTestId(`${prefix}tap-tapCount`)).toHaveTextContent('0')
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gestures={['Tap']} config={{ enabled: false }} />)
    const downEvent = createEvent.pointerDown(element, { pointerId: 3, buttons: 1 })
    fireEvent(element, downEvent)
    expect(getByTestId(`${prefix}tap-tapping`)).toHaveTextContent('false')
  })

  test('disabling the tap gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Tap']} config={{ tap: { enabled: false } }} />)
    const downEvent = createEvent.pointerDown(element, { pointerId: 4, buttons: 1 })
    fireEvent(element, downEvent)
    expect(getByTestId(`${prefix}tap-tapping`)).toHaveTextContent('false')
  })

  test('restart gesture with discrimination enabled', async () => {
    rerender(<Component gestures={['Tap']} config={{ tap: { tapDiscrimination: true, tapTimeout: 100 } }} />)
    const downEvent = createEvent.pointerDown(element, { pointerId: 10, clientX: 10, clientY: 20, buttons: 1 })
    fireEvent(element, downEvent)
    const upEvent = createEvent.pointerUp(element, { pointerId: 10, clientX: 10, clientY: 20 })
    fireEvent(element, upEvent)

    // Single tap shouldn't be confirmed immediately
    expect(getByTestId(`${prefix}tap-singleTap`)).toHaveTextContent('false')

    // Wait for timeout
    await later(150)

    expect(getByTestId(`${prefix}tap-singleTap`)).toHaveTextContent('true')
  })

  test('should detect double tap when two quick taps occur', async () => {
    rerender(<Component gestures={['Tap']} config={{ tap: { tapDiscrimination: true, tapTimeout: 300 } }} />)

    // First tap
    const downEvent1 = createEvent.pointerDown(element, { pointerId: 20, clientX: 10, clientY: 20, buttons: 1 })
    fireEvent(element, downEvent1)
    const upEvent1 = createEvent.pointerUp(element, { pointerId: 20, clientX: 10, clientY: 20 })
    fireEvent(element, upEvent1)

    await later(50)

    // Second tap (within timeout)
    const downEvent2 = createEvent.pointerDown(element, { pointerId: 21, clientX: 10, clientY: 20, buttons: 1 })
    fireEvent(element, downEvent2)
    const upEvent2 = createEvent.pointerUp(element, { pointerId: 21, clientX: 10, clientY: 20 })
    fireEvent(element, upEvent2)

    await later(50)

    expect(getByTestId(`${prefix}tap-doubleTap`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}tap-tapCount`)).toHaveTextContent('2')
  })

  test('should detect long press after timeout', async () => {
    rerender(<Component gestures={['Tap']} config={{ tap: { longPressTimeout: 100 } }} />)
    const downEvent = createEvent.pointerDown(element, { pointerId: 40, clientX: 10, clientY: 20, buttons: 1 })
    fireEvent(element, downEvent)

    // Wait for long press timeout
    await later(150)

    expect(getByTestId(`${prefix}tap-longPress`)).toHaveTextContent('true')
  })
})
