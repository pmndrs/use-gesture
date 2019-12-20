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

describe.each([
  ['attached to component', Interactive, false],
  ['attached to node', InteractiveDom, true],
])('testing onDrag %s', (_testName, C, domTarget): any => {
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
    const event = createEvent.mouseDown(element, {
      clientX: 10,
      clientY: 20,
      buttons: 1,
    })
    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('10,20')
    expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('0,0')
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
    const event = createEvent.mouseMove(window, {
      clientX: 20,
      clientY: 50,
      buttons: 1,
    })
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

  test(`quickly tapping shouldn't trigger a drag`, async () => {
    fireEvent.click(element, { clientX: 100, clientY: 200 })
    await later(() => expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'), 200)
  })

  test(`applying a threshold should prevent the gesture from starting if it's NOT reached`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { threshold: 10 } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 5, clientY: 5, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-30,0')
  })

  test(`applying a threshold should allow the gesture to start when it's reached`, () => {
    fireEvent.mouseMove(window, { clientX: 12, clientY: 12, buttons: 1 })
    fireEvent.mouseMove(window, { clientX: 12, clientY: 12, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('2,2')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-28,2')
    fireEvent.mouseUp(window)
  })

  test(`applying an axis SHOULDN'T start the gesture if gesture is not detected first in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 0, clientY: 50, buttons: 1 })
    fireEvent.mouseMove(window, { clientX: 10, clientY: 0, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.mouseUp(window)
  })

  test(`applying an axis SHOULD start the gesture if gesture is detected in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 20, clientY: 10, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('19,0')
    fireEvent.mouseUp(window)
  })

  test(`applying a direction lock SHOULD only update the first detected direction`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { lockDirection: true } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 5, clientY: 15, buttons: 1 })
    fireEvent.mouseMove(window, { clientX: 50, clientY: 30, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,29')
    fireEvent.mouseUp(window)
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 20, clientY: 10, buttons: 1 })
    fireEvent.mouseMove(window, { clientX: 35, clientY: 40, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('34,0')
    fireEvent.mouseUp(window)
  })

  test(`filtering taps should NOT fire a tap if pointer has moved more than 3px`, () => {
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    rerender(<Component gestures={['Drag']} config={{ drag: { filterTaps: true, threshold: 10 } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 8, clientY: 1, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.mouseUp(window)
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
  })

  test(`filtering clicks should fire a click if pointer has moved less than 3px`, () => {
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    fireEvent.mouseMove(window, { clientX: 2, clientY: 1, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    fireEvent.mouseUp(window)
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
  })

  test(`bounds should limit both offset and movement`, () => {
    rerender(
      <Component
        gestures={['Drag']}
        config={{ drag: { bounds: { top: -100, bottom: 200, left: -150, right: 250 } } }}
      />
    )
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('25,31')
    fireEvent.mouseDown(element, { clientX: 200, clientY: 300 })
    fireEvent.mouseMove(window, { clientX: 10, clientY: 150, buttons: 1 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-150,-100')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-100')
    fireEvent.mouseUp(window)
    fireEvent.mouseDown(element, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(window, { clientX: 40, clientY: 160, buttons: 1 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-60,60')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-40')
  })

  test(`rubberbanding should apply rubberband main function with set min and max`, () => {
    rerender(
      <Component gestures={['Drag']} config={{ drag: { bounds: { top: -100, bottom: 200 }, rubberband: true } }} />
    )

    fireEvent.mouseDown(element, { clientX: 200, clientY: 300 })
    fireEvent.mouseMove(window, { clientX: 200, clientY: 550, buttons: 1 })

    const delta = 550 - 300
    const dimension = 200 - -100
    const rubberband = ((delta - 200) * dimension * 0.15) / (dimension + 0.15 * (delta - 200)) + 200

    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,${rubberband}`)
  })

  test(`releasing drag with rubberbanding should revert movement to its closest bound`, () => {
    fireEvent.mouseUp(window)
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,200`)
  })

  test(`rubberbanding should apply rubberband secondary function when only one bound is set`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { bounds: { bottom: 200 }, rubberband: true } }} />)

    fireEvent.mouseDown(element, { clientX: 200, clientY: 300 })
    fireEvent.mouseMove(window, { clientX: 200, clientY: 550, buttons: 1 })

    const delta = 550 - 300
    const rubberband = Math.pow(delta - 200, 0.15 * 5) + 200

    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,${rubberband}`)
    fireEvent.mouseUp(window)
  })

  test(`passing an initial position should affect the movement`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { initial: [() => 5, () => 10] } }} />)
    fireEvent.mouseDown(element, { clientX: 0, clientY: 0 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`5,10`)
    fireEvent.mouseMove(window, { clientX: 10, clientY: 20, buttons: 1 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`15,30`)
  })
})
