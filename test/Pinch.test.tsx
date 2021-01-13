import React from 'react'
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'

afterAll(cleanup)

// patching createEvent
for (let key in createEvent) {
  if (key.indexOf('touch') === 0) {
    // @ts-ignore
    const fn = createEvent[key]
    // prettier-ignore
    // @ts-ignore
    createEvent[key] = function (type, { targetTouches: _targetTouches = [], changedTouches: _changedTouches = [], id,...rest }:any) {
      // @ts-ignore
      const targetTouches = _targetTouches.map((t, i) => ({ ...t, identifier: id + i }))
      // @ts-ignore
      const changedTouches = _changedTouches.map((t, i) => ({ ...t, identifier: id + i + targetTouches.length }))
      const touches = targetTouches
      const event = fn(type, { targetTouches, changedTouches, touches, ...rest })
      return event
    }
  }
}

// TODO test with gesturechange

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-'],
])('testing onPinch %s)', (_testName, C, prefix) => {
  const Component = C as InteractiveType
  const { getByTestId, queryByTestId, rerender } = render(<Component gestures={['Pinch']} memoArg="memo" />)
  const element = getByTestId(`${prefix}pinch-el`)
  let delta_t: number

  test('one-finger touch should NOT initiate the gesture', () => {
    fireEvent.touchStart(element, { targetTouches: [{ clientX: 0, clientY: 0 }], id: 0 })
    expect(queryByTestId(`${prefix}pinch-active`)).not.toBeInTheDocument()
  })
  test('one-finger touch release should NOT trigger on end', () => {
    fireEvent.touchEnd(element, { changedTouches: [{}], id: 0 })
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^not fired$/)
  })

  test('touch with two fingers should initiate the gesture', () => {
    const event = createEvent.touchStart(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 40 },
      ],
      id: 10,
    })
    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`40,0`)
    expect(getByTestId(`${prefix}pinch-delta`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}pinch-origin`)).toHaveTextContent(`0,20`)
    expect(getByTestId(`${prefix}pinch-initial`)).toHaveTextContent(`40,0`)
  })

  test('initiating the gesture should fire onPinchStart', () => {
    expect(getByTestId(`${prefix}pinch-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}pinch-memo`)).toHaveTextContent('memo')
  })

  test('moving should set first to false', () => {
    const event = createEvent.touchMove(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 30, clientY: 0 },
      ],
      id: 10,
    })
    fireEvent(element, event)
    delta_t = event.timeStamp - delta_t
    expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('false')
  })

  test('moving should update distance/angle and movement', () => {
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,-90`)
    expect(getByTestId(`${prefix}pinch-movement`)).toHaveTextContent(`-10,-90`)
    expect(getByTestId(`${prefix}pinch-offset`)).toHaveTextContent(`-10,-90`)
    expect(getByTestId(`${prefix}pinch-origin`)).toHaveTextContent(`15,0`)
    expect(getByTestId(`${prefix}pinch-previous`)).toHaveTextContent(`40,0`)
  })

  test('moving should update kinematics', () => {
    expect(getByTestId(`${prefix}pinch-vdva`)).toHaveTextContent(`${-10 * (1 / delta_t)},${-90 * (1 / delta_t)}`)
  })

  // TODO potentially having three fingers on target and only ONE lifted up would trigger pinchEnd
  test('touchEnd should terminate the gesture', () => {
    fireEvent.touchEnd(element, { changedTouches: [{}, {}], id: 10 })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}pinch-last`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}pinch-down`)).toHaveTextContent('false')
  })

  test('terminating the gesture should fire onPinchEnd', () => {
    expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^fired$/)
  })

  test('restarting the gesture should book-keep offset and reset movement', () => {
    fireEvent.touchStart(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 40 },
      ],
      id: 20,
    })
    fireEvent.touchMove(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: -30, clientY: 0 },
      ],
      id: 20,
    })
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,90`)
    expect(getByTestId(`${prefix}pinch-offset`)).toHaveTextContent(`-20,0`)
    expect(getByTestId(`${prefix}pinch-movement`)).toHaveTextContent(`-10,90`)
  })

  test('using wheel with ctrl key pressed should update pinch distance/angle', () => {
    fireEvent.wheel(element, { deltaX: 4, deltaY: -5, ctrlKey: true })
    expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`35,90`)
  })

  test('passing the 180° angle between clockwise between two move events should account for a new turn', () => {
    fireEvent.touchMove(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 3, clientY: -30 },
      ],
      id: 20,
    })
    fireEvent.touchMove(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: -3, clientY: -30 },
      ],
      id: 20,
    })
    expect(getByTestId(`${prefix}pinch-turns`)).toHaveTextContent(`1`)
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Component gestures={['Pinch']} canceled />)
    fireEvent.touchMove(element, { targetTouches: [{}, {}], id: 20 })
    await waitFor(() => {
      expect(getByTestId(`${prefix}pinch-canceled`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    })
  })

  test('disabling all gestures should prevent state from updating', () => {
    fireEvent.touchEnd(element, { changedTouches: [{}, {}], id: 20 })
    rerender(<Component gestures={['Pinch']} config={{ enabled: false }} />)
    fireEvent.touchStart(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 40 },
      ],
      id: 30,
    })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    fireEvent.touchEnd(element, { changedTouches: [{}, {}], id: 30 })
  })

  test('disabling the pinch gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Pinch']} config={{ pinch: { enabled: false } }} />)
    fireEvent.touchStart(element, {
      targetTouches: [
        { clientX: 0, clientY: 0 },
        { clientX: 0, clientY: 40 },
      ],
      id: 40,
    })
    expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    fireEvent.touchEnd(element, { changedTouches: [{}, {}], id: 40 })
  })

  // this test uses bindArgs which are only accessible when attaching handlers to the component
  // (ie without the domTarget option)
  if (_testName === 'attached to component') {
    test(`distanceBounds and angleBounds should define _bounds in state`, () => {
      rerender(
        <Component
          gestures={['Pinch']}
          bindArgs={[2]}
          config={{
            pinch: {
              distanceBounds: ({ args: [i] }) => ({ min: i * 100, max: i * -200 }),
              angleBounds: ({ args: [i] }) => ({ min: i * -300 }),
            },
          }}
        />
      )
      fireEvent.touchStart(element, {
        targetTouches: [
          { clientX: 0, clientY: 0 },
          { clientX: 0, clientY: 40 },
        ],
        id: 50,
      })
      expect(getByTestId(`${prefix}pinch-_bounds`)).toHaveTextContent('200,-400,-600,Infinity')
    })
  }
})
