import React from 'react'
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'
import { patchCreateEvent } from './utils'

afterAll(cleanup)

patchCreateEvent(createEvent)

// TODO test with gesturechange and touch

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-']
])('testing onPinch %s)', (_testName, C, prefix) => {
  const Component = C as InteractiveType
  const { getByTestId, queryByTestId, rerender } = render(<Component gestures={['Pinch']} memoArg="memo" />)
  const element = getByTestId(`${prefix}pinch-el`)
  let delta_t: number
  let offset: number

  test('one-finger touch should NOT initiate the gesture', () => {
    fireEvent.pointerDown(element, { pointerId: 1, clientX: 10, clientY: 20, buttons: 1 })
    expect(queryByTestId(`${prefix}pinch-active`)).not.toBeInTheDocument()
  })

  test('one-finger touch release should NOT trigger on end', () => {
    fireEvent.pointerUp(element, { pointerId: 1 })
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^not fired$/)
  })

  test('touch with two fingers should initiate the gesture', () => {
    fireEvent.pointerDown(element, { pointerId: 21, clientX: 0, clientY: 0, buttons: 1 })
    expect(queryByTestId(`${prefix}pinch-active`)).not.toBeInTheDocument()

    const event = createEvent.pointerDown(element, { pointerId: 22, clientX: 0, clientY: 40, buttons: 1 })
    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`40,0`)
    expect(getByTestId(`${prefix}pinch-delta`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}pinch-origin`)).toHaveTextContent(`0,20`)
    expect(getByTestId(`${prefix}pinch-initial`)).toHaveTextContent(`40,0`)
    expect(getByTestId(`${prefix}pinch-offset`)).toHaveTextContent(`1,0`)
    expect(getByTestId(`${prefix}pinch-movement`)).toHaveTextContent(`0,0`)
    expect(getByTestId(`${prefix}pinch-touches`)).toHaveTextContent('2')
  })

  test('initiating the gesture should fire onPinchStart', () => {
    expect(getByTestId(`${prefix}pinch-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}pinch-memo`)).toHaveTextContent('memo')
  })

  test('moving should set first to false', () => {
    const event = createEvent.pointerMove(element, { pointerId: 22, clientX: 30, clientY: 0, buttons: 1 })
    fireEvent(element, event)
    delta_t = event.timeStamp - delta_t
    expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('false')
  })

  test('moving should update distance/angle and movement', () => {
    const delta = (30 - 40) / 40
    offset = 1 + delta
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,-90`)
    expect(getByTestId(`${prefix}pinch-movement`)).toHaveTextContent(`${delta},-90`)
    expect(getByTestId(`${prefix}pinch-offset`)).toHaveTextContent(`${offset},-90`)
    expect(getByTestId(`${prefix}pinch-delta`)).toHaveTextContent(`${delta},-90`)
    expect(getByTestId(`${prefix}pinch-origin`)).toHaveTextContent(`15,0`)
    expect(getByTestId(`${prefix}pinch-direction`)).toHaveTextContent(`-1,-1`)
  })

  test('moving should update kinematics', () => {
    const delta = (30 - 40) / 40
    expect(getByTestId(`${prefix}pinch-velocity`)).toHaveTextContent(`${Math.abs(delta) / delta_t},${90 / delta_t}`)
  })
  // TODO potentially having three fingers on target and only ONE lifted up would trigger pinchEnd
  test('releasing ONE finger should terminate the gesture', () => {
    fireEvent.pointerUp(element, { pointerId: 21 })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}pinch-last`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-down`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-touches`)).toHaveTextContent('1')
  })

  test('terminating the gesture should fire onPinchEnd', () => {
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^fired$/)
    fireEvent.pointerUp(element, { pointerId: 22 })
  })

  test('restarting the gesture should book-keep offset and reset movement', () => {
    fireEvent.pointerDown(element, { pointerId: 31, clientX: 0, clientY: 0, buttons: 1 })
    fireEvent.pointerDown(element, { pointerId: 32, clientX: 0, clientY: 40, buttons: 1 })
    fireEvent.pointerMove(element, { pointerId: 32, clientX: -30, clientY: 0, buttons: 1 })

    const delta = (30 - 40) / 40
    offset *= 1 + delta

    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,90`)
    expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-movement`)).toHaveTextContent(`${delta},90`)
    expect(getByTestId(`${prefix}pinch-offset`)).toHaveTextContent(`${offset},0`)
  })

  test('using wheel with ctrl key pressed should update pinch distance/angle', () => {
    fireEvent.wheel(element, { deltaX: 4, deltaY: -5, ctrlKey: true })
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,90`)
  })

  test('passing the 180° angle between clockwise between two move events should account for a new turn', () => {
    fireEvent.pointerMove(element, { pointerId: 32, clientX: 3, clientY: -30, buttons: 1 })
    fireEvent.pointerMove(element, { pointerId: 32, clientX: -3, clientY: -30, buttons: 1 })
    expect(getByTestId(`${prefix}pinch-turns`)).toHaveTextContent(`1`)
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Component gestures={['Pinch']} canceled />)
    fireEvent.pointerMove(element, { pointerId: 32, clientX: -3, clientY: -30, buttons: 1 })
    await waitFor(() => {
      expect(getByTestId(`${prefix}pinch-canceled`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    })
    fireEvent.pointerUp(element, { pointerId: 31 })
    fireEvent.pointerUp(element, { pointerId: 32 })
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gestures={['Pinch']} config={{ enabled: false }} />)
    fireEvent.pointerDown(element, { pointerId: 41, clientX: 0, clientY: 0, buttons: 1 })
    fireEvent.pointerDown(element, { pointerId: 42, clientX: 0, clientY: 40, buttons: 1 })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 41 })
    fireEvent.pointerUp(element, { pointerId: 42 })
  })

  test('disabling the pinch gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Pinch']} config={{ pinch: { enabled: false } }} />)
    fireEvent.pointerDown(element, { pointerId: 51, clientX: 0, clientY: 0, buttons: 1 })
    fireEvent.pointerDown(element, { pointerId: 52, clientX: 0, clientY: 40, buttons: 1 })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 51 })
    fireEvent.pointerUp(element, { pointerId: 52 })
  })

  // this test uses bindArgs which are only accessible when attaching handlers to the component
  // (ie without the domTarget option)
  if (_testName === 'attached to component') {
    test(`scaleBounds and angleBounds should define _bounds in state`, () => {
      rerender(
        <Component
          gestures={['Pinch']}
          bindArgs={[2]}
          config={{
            pinch: {
              scaleBounds: ({ args: [i] }) => ({ min: i * 0.25, max: i * 2 }),
              angleBounds: ({ args: [i] }) => ({ min: i * -300 })
            }
          }}
        />
      )
      fireEvent.pointerDown(element, { pointerId: 61, clientX: 0, clientY: 0, buttons: 1 })
      fireEvent.pointerDown(element, { pointerId: 62, clientX: 0, clientY: 40, buttons: 1 })
      expect(getByTestId(`${prefix}pinch-_bounds`)).toHaveTextContent('0.5,4,-600,Infinity')
    })
  }
})
