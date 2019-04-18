import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

// TODO - fix act warning (probably caused by RAF in cancel)
// https://github.com/facebook/react/issues/14769

// TODO - test drag with touch events
// TODO - test with pointerEvents

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onDrag %s)',
  (testName, Component, domTarget) => {
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, queryByTestId, rerender } = render(<Component gesture="Drag" tempArg="temp" />)
    const element = getByTestId(`${prefix}drag-el`)

    test('two-fingers touch should NOT initiate the gesture', () => {
      fireEvent.touchStart(element, { touches: [{}, {}] })
      expect(queryByTestId(`${prefix}drag-active`)).not.toBeInTheDocument()
    })

    test('mouseDown should initiate the gesture', () => {
      fireEvent.mouseDown(element, { clientX: 10, clientY: 20 })
      expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('10,20')
      expect(getByTestId(`${prefix}drag-down`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-initial`)).toHaveTextContent('10,20')
    })

    test('initiating the gesture should fire onDragStart', () => {
      expect(getByTestId(`${prefix}drag-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}drag-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing temp value is passed', () => {
      expect(getByTestId(`${prefix}drag-temp`)).toHaveTextContent('temp')
    })

    // TODO - not sure why using window as the mouseMove target doesn't work

    test('moving should set first to false', () => {
      fireEvent.mouseMove(window, { clientX: 20, clientY: 50 })
      expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('false')
    })

    test('moving should update kinematics', () => {
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
      expect(getByTestId(`${prefix}drag-local`)).toHaveTextContent('10,30')
      expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('10,20')
      expect(getByTestId(`${prefix}drag-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}drag-vxvy`)).not.toHaveTextContent('0,0')
    })

    test('mouseUp should terminate the gesture', () => {
      fireEvent.mouseUp(window)
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}drag-last`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-down`)).toHaveTextContent('false')
    })

    test('terminating the gesture should fire onDragEnd', () => {
      expect(getByTestId(`${prefix}drag-end`)).toHaveTextContent(/^fired$/)
    })

    test('disabling all gestures should prevent state from updating', () => {
      rerender(<Component gesture="Drag" config={{ enabled: false }} />)
      fireEvent.mouseDown(element)
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    })

    test('disabling the drag gesture should prevent state from updating', () => {
      rerender(<Component gesture="Drag" config={{ drag: false }} />)
      fireEvent.mouseDown(element)
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    })

    test('restarting the gesture should book-keep local and reset delta', () => {
      rerender(<Component gesture="Drag" />)
      fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
      fireEvent.mouseMove(document, { clientX: 20, clientY: 50 })
      expect(getByTestId(`${prefix}drag-local`)).toHaveTextContent('0,20')
      expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('-10,-10')
    })

    test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
      rerender(<Component gesture="Drag" canceled />)
      fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
      await wait(() => [
        expect(getByTestId(`${prefix}drag-canceled`)).toHaveTextContent('true'),
        expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
      ])
    })
  }
)
