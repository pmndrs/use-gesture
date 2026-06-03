import React from 'react'
import { render, cleanup, fireEvent, createEvent } from '@testing-library/react'
import { patchCreateEvent } from './utils'
import '@testing-library/jest-dom/extend-expect'
import InteractiveDom from './components/InteractiveDom'

afterAll(cleanup)
patchCreateEvent(createEvent)

// Regression for https://github.com/pmndrs/use-gesture/pull/705 (fixes #701).
// If setPointerCapture throws DOMException: InvalidPointerId (pointer already
// released or invalid by the time the engine fires), the drag must still start
// and not surface the exception to userland.
describe('DragEngine.pointerDown: setPointerCapture throwing InvalidPointerId', () => {
  const original = EventTarget.prototype.setPointerCapture

  afterEach(() => {
    EventTarget.prototype.setPointerCapture = original
  })

  test('swallows InvalidPointerId and still starts the gesture', () => {
    EventTarget.prototype.setPointerCapture = function () {
      // Mirrors the Safari/iOS quirk the PR addresses.
      const err = new Error('InvalidPointerId') as Error & { name: string }
      err.name = 'InvalidPointerId'
      throw err
    }

    const { getByTestId } = render(<InteractiveDom gestures={['Drag']} memoArg="memo" />)
    const element = getByTestId('dom-drag-el')

    expect(() =>
      fireEvent(element, createEvent.pointerDown(element, { pointerId: 42, clientX: 10, clientY: 20, buttons: 1 }))
    ).not.toThrow()

    // Without the try/catch in DragEngine.pointerDown the line above throws and
    // the gesture never starts. With the fix, the engine swallows the exception
    // and the drag proceeds normally.
    expect(getByTestId('dom-drag-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('dom-drag-dragging')).toHaveTextContent('true')
    expect(getByTestId('dom-drag-xy')).toHaveTextContent('10,20')

    fireEvent.pointerUp(element, { pointerId: 42 })
  })
})
