import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

// TODO - fix act warning (probably caused by debounce)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onWheel %s)',
  (testName, Component, domTarget) => {
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, rerender } = render(<Component gesture="Wheel" tempArg="temp" />)
    const element = getByTestId(`${prefix}wheel-el`)

    test('wheel event should initiate the gesture', () => {
      fireEvent.wheel(element, { deltaX: 1, deltaY: -1 })
      expect(getByTestId(`${prefix}wheel-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}wheel-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}wheel-xy`)).toHaveTextContent('1,-1')
      expect(getByTestId(`${prefix}wheel-initial`)).toHaveTextContent('1,-1')
    })

    test('initiating the gesture should fire onWheelStart', () => {
      expect(getByTestId(`${prefix}wheel-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}wheel-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing temp value is passed', () => {
      expect(getByTestId(`${prefix}wheel-temp`)).toHaveTextContent('temp')
    })

    test('the second wheel event should set first to false', () => {
      fireEvent.wheel(element, { deltaX: 4, deltaY: -5 })
      expect(getByTestId(`${prefix}wheel-first`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}wheel-last`)).toHaveTextContent('false')
    })

    test('xy should add wheel event deltas', () => {
      expect(getByTestId(`${prefix}wheel-xy`)).toHaveTextContent('5,-6')
      expect(getByTestId(`${prefix}wheel-delta`)).toHaveTextContent('4,-5')
    })

    test('kinematics should update', () => {
      expect(getByTestId(`${prefix}wheel-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}wheel-vxvy`)).not.toHaveTextContent('0,0')
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
      rerender(<Component gesture="Wheel" config={{ enabled: false }} />)
      fireEvent.wheel(element)
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
    })

    test('disabling the wheel gesture should prevent state from updating', () => {
      rerender(<Component gesture="Wheel" config={{ wheel: false }} />)
      fireEvent.wheel(element)
      expect(getByTestId(`${prefix}wheel-wheeling`)).toHaveTextContent('false')
    })
  }
)
