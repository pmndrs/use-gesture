import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

// TODO - fix act warning (probably caused by RAF in cancel)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onPinch %s)',
  (testName, Component, domTarget) => {
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, queryByTestId, rerender } = render(<Component gesture="Pinch" tempArg="temp" />)
    const element = getByTestId(`${prefix}pinch-el`)

    test('one-finger touch should NOT initiate the gesture', () => {
      fireEvent.touchStart(element)
      expect(queryByTestId(`${prefix}pinch-active`)).not.toBeInTheDocument()
    })

    test('touch with two fingers should initiate the gesture', () => {
      fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 0, clientY: 40 }] })
      expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`40,0`)
      expect(getByTestId(`${prefix}pinch-initial`)).toHaveTextContent(`40,0`)
    })

    test('initiating the gesture should fire onPinchStart', () => {
      expect(getByTestId(`${prefix}pinch-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing temp value is passed', () => {
      expect(getByTestId(`${prefix}pinch-temp`)).toHaveTextContent('temp')
    })

    test('moving should set first to false', () => {
      fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 30, clientY: 0 }] })
      expect(getByTestId(`${prefix}pinch-first`)).toHaveTextContent('false')
    })

    test('moving should update kinematics', () => {
      expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,90`)
      expect(getByTestId(`${prefix}pinch-local`)).toHaveTextContent(`-10,-90`)
      expect(getByTestId(`${prefix}pinch-previous`)).toHaveTextContent(`40,0`)
      expect(getByTestId(`${prefix}pinch-vdva`)).not.toHaveTextContent('0,0')
    })

    test('touchEnd should terminate the gesture', () => {
      fireEvent.touchEnd(element)
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}pinch-active`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}pinch-last`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}pinch-down`)).toHaveTextContent('false')
    })

    test('terminating the gesture should fire onPinchEnd', () => {
      expect(getByTestId(`${prefix}pinch-end`)).toHaveTextContent(/^fired$/)
    })

    test('restarting the gesture should book-keep local and reset delta', () => {
      fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 0, clientY: 40 }] })
      fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: -30, clientY: 0 }] })
      expect(getByTestId(`${prefix}pinch-da`)).toHaveTextContent(`30,-90`)
      expect(getByTestId(`${prefix}pinch-local`)).toHaveTextContent(`-20,0`)
      expect(getByTestId(`${prefix}pinch-delta`)).toHaveTextContent(`-10,90`)
    })

    test('passing the 180° angle between clockwise between two move events should account for a new turn', () => {
      fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 3, clientY: -30 }] })
      fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: -3, clientY: -30 }] })
      expect(getByTestId(`${prefix}pinch-turns`)).toHaveTextContent(`1`)
    })

    test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
      rerender(<Component gesture="Pinch" canceled />)
      fireEvent.touchMove(element, { touches: [{}, {}] })
      await wait(() => {
        expect(getByTestId(`${prefix}pinch-canceled`)).toHaveTextContent('true')
        expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
      })
    })

    test('disabling all gestures should prevent state from updating', () => {
      rerender(<Component gesture="Pinch" config={{ enabled: false }} />)
      fireEvent.mouseMove(element)
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    })

    test('disabling the pinch gesture should prevent state from updating', () => {
      rerender(<Component gesture="Pinch" config={{ pinch: false }} />)
      fireEvent.mouseMove(element)
      expect(getByTestId(`${prefix}pinch-pinching`)).toHaveTextContent('false')
    })
  }
)
