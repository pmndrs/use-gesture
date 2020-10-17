import React from 'react'
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import InteractiveDomBackwardCompat from './components/InteractiveDomBackwardCompat'
import { InteractiveType } from './components/types'

afterAll(cleanup)

// patching createEvent
for (let key in createEvent) {
  if (key.indexOf('pointer') === 0) {
    // @ts-ignore
    const fn = createEvent[key.replace('pointer', 'mouse')]
    if (!fn) break
    // @ts-ignore
    createEvent[key] = function (type, { pointerId = Date.now(), ...rest }) {
      const event = fn(type, rest)
      event.pointerId = pointerId
      return event
    }
  }
}

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-'],
  ['attached to node and called effect', InteractiveDomBackwardCompat, 'backward-dom-'],
])('testing onDrag %s', (_testName, C, prefix): any => {
  const Component = C as InteractiveType
  const { getByTestId, queryByTestId, rerender } = render(<Component gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId(`${prefix}drag-el`)
  let delta_t: number
  test('two-fingers touch should NOT initiate the gesture', () => {
    fireEvent.touchStart(element, { touches: [{}, {}] })
    expect(queryByTestId(`${prefix}drag-active`)).not.toBeInTheDocument()
  })

  test('pointerDown should initiate the gesture', () => {
    const event = createEvent.pointerDown(element, { clientX: 10, clientY: 20, buttons: 1, pointerId: 1 })

    fireEvent(element, event)
    delta_t = event.timeStamp

    // @ts-ignore
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
    const event = createEvent.pointerMove(window, { clientX: 20, clientY: 50, buttons: 1, pointerId: 1 })

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
    expect(getByTestId(`${prefix}drag-vxvy`)).toHaveTextContent(`${10 * (1 / delta_t)},${30 * (1 / delta_t)}`)
  })

  test('moving again should further update xy and movement', () => {
    fireEvent.pointerMove(window, { clientX: -10, clientY: 30, buttons: 1, pointerId: 1 })
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('-10,30')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-20,10')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-20,10')
    expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('-30,-20')
    expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('20,50')
  })

  test('mouseUp should terminate the gesture', () => {
    fireEvent.pointerUp(window, { pointerId: 1 })
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
    fireEvent.pointerDown(element, { pointerId: 2 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 2 })
  })

  test('disabling the drag gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { enabled: false } }} />)
    fireEvent.pointerDown(element, { pointerId: 3 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 3 })
  })

  test('restarting the gesture should book-keep offset and reset movement', () => {
    rerender(<Component gestures={['Drag']} />)
    fireEvent.pointerDown(element, { clientX: 30, clientY: 60, pointerId: 4 })
    expect(getByTestId(`${prefix}drag-previous`)).toHaveTextContent('-10,30')
    fireEvent.pointerMove(window, { clientX: 20, clientY: 50, buttons: 1, pointerId: 4 })
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-30,0')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-10,-10')
    fireEvent.pointerUp(element, { pointerId: 4 })
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Component gestures={['Drag']} canceled />)
    fireEvent.pointerDown(element, { clientX: 30, clientY: 60, pointerId: 5 })
    await waitFor(() => [
      expect(getByTestId(`${prefix}drag-canceled`)).toHaveTextContent('true'),
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'),
    ])
  })

  test('applying a dragDelay should start the gesture after a delay', async () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { delay: 180 } }} />)
    fireEvent.pointerDown(element, { clientX: 100, clientY: 200, pointerId: 6 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    await waitFor(() => [
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true'),
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('100,200'),
    ])
    fireEvent.pointerUp(window, { pointerId: 6 })
  })

  test('applying a dragDelay should start the gesture after a delay', () => {
    fireEvent.pointerDown(element, { clientX: 100, clientY: 200, pointerId: 7 })
    fireEvent.pointerMove(window, { clientX: 20, clientY: 50, buttons: 1, pointerId: 7 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
    fireEvent.pointerUp(window, { pointerId: 7 })
  })

  test(`quickly tapping shouldn't trigger a drag`, async () => {
    fireEvent.click(element, { clientX: 100, clientY: 200 })
    await waitFor(() => expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'), { timeout: 200 })
  })

  test(`applying a threshold should prevent the gesture from starting if it's NOT reached`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { threshold: 10 } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 8 })
    fireEvent.pointerMove(window, { clientX: 5, clientY: 5, buttons: 1, pointerId: 8 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-30,0')
  })

  test(`applying a threshold should allow the gesture to start when it's reached`, () => {
    fireEvent.pointerMove(window, { clientX: 12, clientY: 12, buttons: 1, pointerId: 8 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('2,2')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-28,2')
    fireEvent.pointerUp(window, { pointerId: 8 })
  })

  test(`applying an axis SHOULDN'T start the gesture if gesture is not detected first in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 9 })
    fireEvent.pointerMove(window, { clientX: 0, clientY: 50, buttons: 1, pointerId: 9 })
    fireEvent.pointerMove(window, { clientX: 10, clientY: 0, buttons: 1, pointerId: 9 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(window, { pointerId: 9 })
  })

  test(`applying an axis SHOULD start the gesture if gesture is detected in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 10 })
    fireEvent.pointerMove(window, { clientX: 20, clientY: 10, buttons: 1, pointerId: 10 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('19,0')
    fireEvent.pointerUp(window, { pointerId: 10 })
  })

  test(`applying a direction lock SHOULD only update the first detected direction`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { lockDirection: true } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 11 })
    fireEvent.pointerMove(window, { clientX: 5, clientY: 15, buttons: 1, pointerId: 11 })
    fireEvent.pointerMove(window, { clientX: 50, clientY: 30, buttons: 1, pointerId: 11 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,29')
    fireEvent.pointerUp(window, { pointerId: 11 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 12 })
    fireEvent.pointerMove(window, { clientX: 20, clientY: 10, buttons: 1, pointerId: 12 })
    fireEvent.pointerMove(window, { clientX: 35, clientY: 40, buttons: 1, pointerId: 12 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('34,0')
    fireEvent.pointerUp(window, { pointerId: 12 })
  })

  test(`filtering taps should NOT fire a tap if pointer has moved more than 3px`, () => {
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    rerender(<Component gestures={['Drag']} config={{ drag: { filterTaps: true, threshold: 10 } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 13 })
    fireEvent.pointerMove(window, { clientX: 8, clientY: 1, buttons: 1, pointerId: 13 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(window, { pointerId: 13 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
  })

  // TODO add a test to verify underlying children's onClick handler is not triggered
  // when filterTaps is true

  test(`filtering clicks should fire a click if pointer has moved less than 3px`, async () => {
    let event = createEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 14 })
    fireEvent(element, event)
    delta_t = event.timeStamp
    fireEvent.pointerMove(window, { clientX: 2, clientY: 1, buttons: 1, pointerId: 14 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    event = createEvent.pointerUp(window, { pointerId: 14 })
    delta_t = event.timeStamp - delta_t
    fireEvent(window, event)
    await waitFor(
      () => {
        expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('true')
        expect(getByTestId(`${prefix}drag-elapsedTime`)).toHaveTextContent(String(delta_t))
        expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
      },
      { timeout: 200 }
    )
    fireEvent.pointerUp(window, { pointerId: 14 })
  })

  test(`bounds should limit both offset and movement`, () => {
    rerender(
      <Component
        gestures={['Drag']}
        config={{ drag: { bounds: { top: -100, bottom: 200, left: -150, right: 250 } } }}
      />
    )
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('25,31')

    fireEvent.pointerDown(element, { clientX: 200, clientY: 300, pointerId: 15 })
    fireEvent.pointerMove(window, { clientX: 10, clientY: 150, buttons: 1, pointerId: 15 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-150,-100')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-100')

    fireEvent.pointerUp(window, { pointerId: 15 })
    fireEvent.pointerDown(element, { clientX: 100, clientY: 100, pointerId: 16 })
    fireEvent.pointerMove(window, { clientX: 40, clientY: 160, buttons: 1, pointerId: 16 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-60,60')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-40')
    fireEvent.pointerUp(window, { pointerId: 16 })
  })

  test(`rubberbanding should apply rubberband main function with set min and max`, () => {
    rerender(
      <Component gestures={['Drag']} config={{ drag: { bounds: { top: -100, bottom: 200 }, rubberband: true } }} />
    )

    fireEvent.pointerDown(element, { clientX: 200, clientY: 300, pointerId: 17 })
    fireEvent.pointerMove(window, { clientX: 200, clientY: 550, buttons: 1, pointerId: 17 })

    const delta = 550 - 300
    const dimension = 200 - -100
    const rubberband = ((delta - 200) * dimension * 0.15) / (dimension + 0.15 * (delta - 200)) + 200

    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,${rubberband}`)
  })

  test(`releasing drag with rubberbanding should revert movement to its closest bound`, () => {
    fireEvent.pointerUp(window, { pointerId: 17 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,200`)
  })

  test(`rubberbanding should apply rubberband secondary function when only one bound is set`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { bounds: { bottom: 200 }, rubberband: true } }} />)

    fireEvent.pointerDown(element, { clientX: 200, clientY: 300, pointerId: 18 })
    fireEvent.pointerMove(window, { clientX: 200, clientY: 550, buttons: 1, pointerId: 18 })

    const delta = 550 - 300
    const rubberband = Math.pow(delta - 200, 0.15 * 5) + 200

    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,${rubberband}`)
    fireEvent.pointerUp(window, { pointerId: 18 })
  })

  test(`passing an initial position should affect the movement`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { initial: () => [5, 10] } }} />)
    fireEvent.pointerDown(element, { clientX: 0, clientY: 0, pointerId: 19 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`5,10`)
    fireEvent.pointerMove(window, { clientX: 10, clientY: 20, buttons: 1, pointerId: 19 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`15,30`)
    fireEvent.pointerUp(window, { pointerId: 19 })
  })
})
