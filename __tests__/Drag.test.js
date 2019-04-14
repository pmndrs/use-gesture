import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

// TODO - fix act warning (probably caused by RAF in cancel)
// https://github.com/facebook/react/issues/14769

// TODO - test when attaching to a dom element
// TODO - test temp
// TODO - test drag with touch events

afterAll(cleanup)

describe('onDrag', () => {
  const { getByTestId, rerender } = render(<Interactive gesture="Drag" />)
  const element = getByTestId('drag-el')

  test('mouseDown should initiate the gesture', () => {
    fireEvent.mouseDown(element, { clientX: 10, clientY: 20 })
    expect(getByTestId('drag-active')).toHaveTextContent('true')
    expect(getByTestId('drag-dragging')).toHaveTextContent('true')
    expect(getByTestId('drag-first')).toHaveTextContent('true')
    expect(getByTestId('drag-xy')).toHaveTextContent('10,20')
    expect(getByTestId('drag-down')).toHaveTextContent('true')
    expect(getByTestId('drag-initial')).toHaveTextContent('10,20')
  })

  test('initiating the gesture should fire onDragStart', () => {
    expect(getByTestId('drag-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('drag-end')).toHaveTextContent(/^not fired$/)
  })

  test('moving should set first to false', () => {
    fireEvent.mouseMove(element, { clientX: 20, clientY: 50 })
    expect(getByTestId('drag-first')).toHaveTextContent('false')
  })

  test('moving should update kinematics', () => {
    expect(getByTestId('drag-xy')).toHaveTextContent('20,50')
    expect(getByTestId('drag-local')).toHaveTextContent('10,30')
    expect(getByTestId('drag-previous')).toHaveTextContent('10,20')
    expect(getByTestId('drag-velocity')).not.toHaveTextContent(/^0$/)
    expect(getByTestId('drag-vxvy')).not.toHaveTextContent('0,0')
  })

  test('mouseUp should terminate the gesture', () => {
    fireEvent.mouseUp(element)
    expect(getByTestId('drag-dragging')).toHaveTextContent('false')
    expect(getByTestId('drag-active')).toHaveTextContent('false')
    expect(getByTestId('drag-last')).toHaveTextContent('true')
    expect(getByTestId('drag-down')).toHaveTextContent('false')
  })

  test('terminating the gesture should fire onDragEnd', () => {
    expect(getByTestId('drag-end')).toHaveTextContent(/^fired$/)
  })

  test('restarting the gesture should book-keep local and reset delta', () => {
    fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
    fireEvent.mouseMove(element, { clientX: 20, clientY: 50 })
    expect(getByTestId('drag-local')).toHaveTextContent('0,20')
    expect(getByTestId('drag-delta')).toHaveTextContent('-10,-10')
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Interactive gesture="Drag" canceled />)
    fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
    await wait(() => [
      expect(getByTestId('drag-canceled')).toHaveTextContent('true'),
      expect(getByTestId('drag-dragging')).toHaveTextContent('false')
    ])
  })
})
