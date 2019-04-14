import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

// TODO - fix act warning (probably caused by RAF in cancel)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe('onPinch', () => {
  const { getByTestId, queryByTestId, rerender } = render(<Interactive gesture="Pinch" />)
  const element = getByTestId('pinch-el')

  test('one-finger touch should NOT initiate the gesture', () => {
    fireEvent.touchStart(element)
    expect(queryByTestId('pinch-active')).not.toBeInTheDocument()
  })

  test('touch with two fingers should initiate the gesture', () => {
    fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 0, clientY: 40 }] })
    expect(getByTestId('pinch-active')).toHaveTextContent('true')
    expect(getByTestId('pinch-pinching')).toHaveTextContent('true')
    expect(getByTestId('pinch-first')).toHaveTextContent('true')
    expect(getByTestId('pinch-da')).toHaveTextContent(`40,0`)
    expect(getByTestId('pinch-initial')).toHaveTextContent(`40,0`)
  })

  test('initiating the gesture should fire onPinchStart', () => {
    expect(getByTestId('pinch-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('pinch-end')).toHaveTextContent(/^not fired$/)
  })

  test('moving should set first to false', () => {
    fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 30, clientY: 0 }] })
    expect(getByTestId('pinch-first')).toHaveTextContent('false')
  })

  test('moving should update kinematics', () => {
    expect(getByTestId('pinch-da')).toHaveTextContent(`30,90`)
    expect(getByTestId('pinch-local')).toHaveTextContent(`-10,-90`)
    expect(getByTestId('pinch-previous')).toHaveTextContent(`40,0`)
    expect(getByTestId('pinch-vdva')).not.toHaveTextContent('0,0')
  })

  test('touchEnd should terminate the gesture', () => {
    fireEvent.touchEnd(element)
    expect(getByTestId('pinch-pinching')).toHaveTextContent('false')
    expect(getByTestId('pinch-active')).toHaveTextContent('false')
    expect(getByTestId('pinch-last')).toHaveTextContent('true')
    expect(getByTestId('pinch-down')).toHaveTextContent('false')
  })

  test('terminating the gesture should fire onPinchEnd', () => {
    expect(getByTestId('pinch-end')).toHaveTextContent(/^fired$/)
  })

  test('restarting the gesture should book-keep local and reset delta', () => {
    fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 0, clientY: 40 }] })
    fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: -30, clientY: 0 }] })
    expect(getByTestId('pinch-da')).toHaveTextContent(`30,-90`)
    expect(getByTestId('pinch-local')).toHaveTextContent(`-20,0`)
    expect(getByTestId('pinch-delta')).toHaveTextContent(`-10,90`)
  })

  test('passing the 180° angle between clockwise between two move events should account for a new turn', () => {
    fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: 3, clientY: -30 }] })
    fireEvent.touchMove(element, { touches: [{ clientX: 0, clientY: 0 }, { clientX: -3, clientY: -30 }] })
    expect(getByTestId('pinch-turns')).toHaveTextContent(`1`)
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Interactive gesture="Pinch" canceled />)
    fireEvent.touchMove(element, { touches: [{}, {}] })
    await wait(() => {
      expect(getByTestId('pinch-canceled')).toHaveTextContent('true')
      expect(getByTestId('pinch-pinching')).toHaveTextContent('false')
    })
  })
})
