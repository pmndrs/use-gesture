import React from 'react'
import { render, cleanup, fireEvent, createEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'

// TODO - test drag with touch events
// TODO - test with pointerEvents

afterAll(cleanup)

const later = (fn: () => any, delay: number) => new Promise(resolve => setTimeout(() => resolve(fn()), delay))

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onDrag %s',
  (_testName, C, domTarget): any => {
    const Component = C as InteractiveType
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, queryByTestId, rerender } = render(<Component gestures={['Drag']} memoArg="memo" />)
    const element = getByTestId(`${prefix}drag-el`)
    let delta_t: number
    test('two-fingers touch should NOT initiate the gesture', () => {
      fireEvent.touchStart(element, { touches: [{}, {}] })
      expect(queryByTestId(`${prefix}drag-active`)).not.toBeInTheDocument()
    })
    test('mouseDown should initiate the gesture', () => {
      const event = createEvent.mouseDown(element, { clientX: 10, clientY: 20, buttons: 1 })
      fireEvent(element, event)
      delta_t = event.timeStamp
      expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('10,20')
      expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('0,0')
      expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('0,0')
      expect(getByTestId(`${prefix}drag-down`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-initial`)).toHaveTextContent('10,20')
    })
    test('initiating the gesture should fire onDragStart', () => {
      expect(getByTestId(`${prefix}drag-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}drag-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing memo value is passed', () => {
      expect(getByTestId(`${prefix}drag-memo`)).toHaveTextContent('memo')
    })
    test('moving should set first to false', () => {
      const event = createEvent.mouseMove(window, { clientX: 20, clientY: 50, buttons: 1 })
      fireEvent(window, event)
      delta_t = event.timeStamp - delta_t
      expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('false')
    })
    test('moving should update kinematics', () => {
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
      expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('10,30')
      expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('10,30')
      expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('10,30')
      expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('10,20')
      expect(getByTestId(`${prefix}drag-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}drag-vxvy`)).toHaveTextContent(`${10 / delta_t},${30 / delta_t}`)
    })
    test('moving again should further update xy and movement', () => {
      fireEvent.mouseMove(window, { clientX: -10, clientY: 30, buttons: 1 })
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('-10,30')
      expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-20,10')
      expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-20,10')
      expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('-30,-20')
      expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('20,50')
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
      rerender(<Component gestures={['Drag']} config={{ enabled: false }} />)
      fireEvent.mouseDown(element)
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    })
    test('disabling the drag gesture should prevent state from updating', () => {
      rerender(<Component gestures={['Drag']} config={{ drag: { enabled: false } }} />)
      fireEvent.mouseDown(element)
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    })
    test('restarting the gesture should book-keep offset and reset movement', () => {
      rerender(<Component gestures={['Drag']} />)
      fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
      expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('-10,30')
      fireEvent.mouseMove(window, { clientX: 20, clientY: 50, buttons: 1 })
      expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-30,0')
      expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-10,-10')
    })
    test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
      rerender(<Component gestures={['Drag']} canceled />)
      fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
      fireEvent.mouseDown(element, { clientX: 30, clientY: 60 })
      await wait(() => [
        expect(getByTestId(`${prefix}drag-canceled`)).toHaveTextContent('true'),
        expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'),
      ])
    })
    test('applying a dragDelay should start the gesture after a delay', async () => {
      rerender(<Component gestures={['Drag']} config={{ drag: { delay: 180 } }} />)
      fireEvent.mouseDown(element, { clientX: 100, clientY: 200 })
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
      await wait(() => [
        expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true'),
        expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('100,200'),
      ])
      fireEvent.mouseUp(window)
    })
    test('applying a dragDelay should start the gesture after a delay', () => {
      fireEvent.mouseDown(element, { clientX: 100, clientY: 200 })
      fireEvent.mouseMove(window, { clientX: 20, clientY: 50, buttons: 1 })
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
      fireEvent.mouseUp(window)
    })
    test(`quickly clicking shouldn't trigger a drag`, async () => {
      fireEvent.click(element, { clientX: 100, clientY: 200 })
      await later(() => expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'), 200)
    })
  }
)
