import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

afterAll(cleanup)

// TODO - fix act warning (probably caused by debounce)
// https://github.com/facebook/react/issues/14769

describe('onMove', () => {
  const { getByTestId } = render(<Interactive gesture="Move" />)
  const element = getByTestId('move-el')

  test('mouseMove should initiate the gesture', () => {
    fireEvent.mouseMove(element, { clientX: 20, clientY: 50 })
    expect(getByTestId('move-active')).toHaveTextContent('true')
    expect(getByTestId('move-moving')).toHaveTextContent('true')
    expect(getByTestId('move-first')).toHaveTextContent('true')
    expect(getByTestId('move-xy')).toHaveTextContent('20,50')
    expect(getByTestId('move-initial')).toHaveTextContent('20,50')
  })

  test('initiating the gesture should fire onMoveStart', () => {
    expect(getByTestId('move-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('move-end')).toHaveTextContent(/^not fired$/)
  })

  test('the second mouseMove event should set first to false', () => {
    fireEvent.mouseMove(element, { clientX: 30, clientY: 80 })
    expect(getByTestId('move-first')).toHaveTextContent('false')
    expect(getByTestId('move-last')).toHaveTextContent('false')
  })

  test('xy should update to latest mouse coordinates', () => {
    expect(getByTestId('move-xy')).toHaveTextContent('30,80')
    expect(getByTestId('move-delta')).toHaveTextContent('10,30')
  })

  test('kinematics should update', () => {
    expect(getByTestId('move-velocity')).not.toHaveTextContent(/^0$/)
    expect(getByTestId('move-vxvy')).not.toHaveTextContent('0,0')
  })

  test('the last mouseMove event should debounce and terminate the gesture', async () => {
    await wait(() => [
      expect(getByTestId('move-last')).toHaveTextContent('true'),
      expect(getByTestId('move-active')).toHaveTextContent('false'),
      expect(getByTestId('move-moving')).toHaveTextContent('false')
    ])
  })

  test('terminating the gesture should fire onMoveEnd', async () => {
    await wait(() => expect(getByTestId('move-end')).toHaveTextContent(/^fired$/))
  })
})
