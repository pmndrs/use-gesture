import React from 'react'
import { render, cleanup, fireEvent, createEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onMove %s)',
  (testName, Component, domTarget) => {
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, rerender } = render(<Component gesture="Move" tempArg="temp" />)
    const element = getByTestId(`${prefix}move-el`)
    let delta_t

    test('mouseMove should initiate the gesture', () => {
      const event = createEvent.mouseMove(element, { clientX: 20, clientY: 50 })
      fireEvent(element, event)
      delta_t = event.timeStamp

      expect(getByTestId(`${prefix}move-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}move-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}move-values`)).toHaveTextContent('20,50')
      expect(getByTestId(`${prefix}move-initial`)).toHaveTextContent('20,50')
    })

    test('initiating the gesture should fire onMoveStart', () => {
      expect(getByTestId(`${prefix}move-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}move-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing temp value is passed', () => {
      expect(getByTestId(`${prefix}move-temp`)).toHaveTextContent('temp')
    })

    test('the second mouseMove event should set first to false', () => {
      const event = createEvent.mouseMove(element, { clientX: 30, clientY: 80 })
      fireEvent(element, event)
      delta_t = event.timeStamp - delta_t

      expect(getByTestId(`${prefix}move-first`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}move-last`)).toHaveTextContent('false')
    })

    test('values should update to latest mouse coordinates', () => {
      expect(getByTestId(`${prefix}move-values`)).toHaveTextContent('30,80')
      expect(getByTestId(`${prefix}move-delta`)).toHaveTextContent('10,30')
    })

    test('kinematics should update', () => {
      expect(getByTestId(`${prefix}move-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}move-velocities`)).toHaveTextContent(`${10 / delta_t},${30 / delta_t}`)
    })

    test('the last mouseMove event should debounce and terminate the gesture', async () => {
      await wait(() => [
        expect(getByTestId(`${prefix}move-last`)).toHaveTextContent('true'),
        expect(getByTestId(`${prefix}move-active`)).toHaveTextContent('false'),
        expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
      ])
    })

    test('terminating the gesture should fire onMoveEnd', async () => {
      await wait(() => expect(getByTestId(`${prefix}move-end`)).toHaveTextContent(/^fired$/))
    })

    test('disabling all gestures should prevent state from updating', () => {
      rerender(<Component gesture="Move" config={{ enabled: false }} />)
      fireEvent.mouseMove(element)
      expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
    })

    test('disabling the move gesture should prevent state from updating', () => {
      rerender(<Component gesture="Move" config={{ move: false }} />)
      fireEvent.mouseMove(element)
      expect(getByTestId(`${prefix}move-moving`)).toHaveTextContent('false')
    })
  }
)
