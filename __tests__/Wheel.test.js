import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

// TODO - fix act warning (probably caused by debounce)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe('onWheel', () => {
  const { getByTestId } = render(<Interactive gesture="Wheel" />)
  const element = getByTestId('wheel-el')

  test('wheel event should initiate the gesture', () => {
    fireEvent.wheel(element, { deltaX: 1, deltaY: -1 })
    expect(getByTestId('wheel-active')).toHaveTextContent('true')
    expect(getByTestId('wheel-wheeling')).toHaveTextContent('true')
    expect(getByTestId('wheel-first')).toHaveTextContent('true')
    expect(getByTestId('wheel-xy')).toHaveTextContent('1,-1')
    expect(getByTestId('wheel-initial')).toHaveTextContent('1,-1')
  })

  test('initiating the gesture should fire onWheelStart', () => {
    expect(getByTestId('wheel-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('wheel-end')).toHaveTextContent(/^not fired$/)
  })

  test('the second wheel event should set first to false', () => {
    fireEvent.wheel(element, { deltaX: 4, deltaY: -5 })
    expect(getByTestId('wheel-first')).toHaveTextContent('false')
    expect(getByTestId('wheel-last')).toHaveTextContent('false')
  })

  test('xy should add wheel event deltas', () => {
    expect(getByTestId('wheel-xy')).toHaveTextContent('5,-6')
    expect(getByTestId('wheel-delta')).toHaveTextContent('4,-5')
  })

  test('kinematics should update', () => {
    expect(getByTestId('wheel-velocity')).not.toHaveTextContent(/^0$/)
    expect(getByTestId('wheel-vxvy')).not.toHaveTextContent('0,0')
  })

  test('the last wheel event should debounce and terminate the gesture', async () => {
    await wait(() => {
      expect(getByTestId('wheel-last')).toHaveTextContent('true')
      expect(getByTestId('wheel-active')).toHaveTextContent('false')
      expect(getByTestId('wheel-wheeling')).toHaveTextContent('false')
    })
  })

  test('terminating the gesture should fire onWheelEnd', async () => {
    await wait(() => expect(getByTestId('wheel-end')).toHaveTextContent(/^fired$/))
  })
})
