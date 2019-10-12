import React from 'react'
import { render, cleanup, fireEvent, createEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onWheel %s)',
  (_testName, C, domTarget) => {
    const Component = C as InteractiveType
    const prefix = domTarget ? 'dom-' : ''
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
      expect(getByTestId(`${prefix}wheel-xy`)).toHaveTextContent('1,-1')
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
      expect(getByTestId(`${prefix}wheel-xy`)).toHaveTextContent('5,-6')
      expect(getByTestId(`${prefix}wheel-delta`)).toHaveTextContent('4,-5')
      expect(getByTestId(`${prefix}wheel-offset`)).toHaveTextContent('5,-6')
    })

    test('kinematics should update', () => {
      expect(getByTestId(`${prefix}wheel-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}wheel-vxvy`)).toHaveTextContent(`${4 / delta_t},${-5 / delta_t}`)
    })

    test('the last wheel event should debounce and terminate the gesture', async () => {
      await wait(() => {
        expect(getByTestId(`${prefix}wheel-last`)).toHaveTextContent('true')
        expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('false')
        expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
      })
    })

    test('terminating the gesture should fire onWheelEnd', async () => {
      await wait(() => expect(getByTestId(`${prefix}wheel-end`)).toHaveTextContent(/^fired$/))
    })

    test('disabling all gestures should prevent state from updating', () => {
      rerender(<Component gestures={['Wheel']} config={{ enabled: false }} />)
      fireEvent.wheel(element)
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
    })

    test('disabling the wheel gesture should prevent state from updating', () => {
      rerender(<Component gestures={['Wheel']} config={{ wheel: false }} />)
      fireEvent.wheel(element)
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
    })
  }
)
